/**
 * ============================================================================
 * CJ PROGRESS — MOTOR ÚNICO DE EXPERIENCIA, NIVELES Y RACHAS
 * ============================================================================
 * Fuente única de verdad para el XP. Todo lo demás (HUD, cabecera, perfil,
 * banderines) LEE de aquí; nadie debe escribir `character.xp` ni `profile.xp`.
 *
 *  - Libro de movimientos (ledger): cada XP ganado queda registrado con fecha,
 *    aura, fuente y descripción. El XP total es la suma del ledger.
 *  - Rangos (5) y grados (I-II-III) calculados a partir del XP total.
 *  - Racha = días consecutivos con >= ACTIVE_DAY_XP de experiencia.
 *  - Tope diario blando: pasado DAILY_SOFT_CAP, el XP vale la mitad.
 *  - Fechas SIEMPRE en hora local (no UTC).
 */
(function (window) {
  "use strict";

  const KEY = "CJ_PROGRESS_V1";

  // --- CONFIGURACIÓN (única fuente; el manual de reglas lee de aquí) ---
  const CONFIG = {
    difficultyXP: { facil: 25, medio: 50, dificil: 75 },
    dailySoftCap: 600,
    overCapFactor: 0.5,
    activeDayXP: 100,
    streakBonus: { 7: 100, 14: 200, 21: 300, 30: 400, 60: 800, 100: 1500 },
    gradesPerRank: 3
  };

  const LEVELS = [
    { rank: 1, latin: "Tiro Legionis",       title: "Legionario Iniciado",  desc: "Disciplina base, templanza y cumplimiento diario.",   threshold: 0 },
    { rank: 2, latin: "Centurio Ordinarius", title: "Centurión de Línea",   desc: "Consagración profesional y dominio técnico.",         threshold: 1000 },
    { rank: 3, latin: "Tribunus Cohortis",   title: "Tribuno de Estrategia", desc: "Mando ejecutivo, investigación y proyectos.",         threshold: 3500 },
    { rank: 4, latin: "Legatus Legionis",    title: "Legado Pretoriano",    desc: "Soberanía sobre frentes provinciales de vida.",       threshold: 8500 },
    { rank: 5, latin: "Consul & Imperator",  title: "Cónsul Supremo",       desc: "Soberanía patrimonial, legado y maestría plena.",     threshold: 18000 }
  ];
  LEVELS.forEach((l, i) => { l.next = LEVELS[i + 1] ? LEVELS[i + 1].threshold : null; });

  const AURAS = ["vida", "exploracion", "amor", "salud", "soberania", "espiritualidad", "naturaleza", "deporte", "mente"];
  const AURA_ALIASES = {
    foco: "mente", lectura: "mente", estudio: "mente", filosofia: "mente", aleman: "mente",
    vitalidad: "salud", nutricion: "salud", somatica: "salud", sueno: "salud",
    meditacion: "espiritualidad", ritos: "espiritualidad", detox: "espiritualidad",
    territorio: "naturaleza", bosque: "naturaleza", rewild: "naturaleza", airelibre: "naturaleza", botanica: "naturaleza",
    ejercicios: "deporte", combate: "deporte", gym: "deporte", cardio: "deporte",
    pareja: "amor", amor: "amor", intimidad: "amor", acuerdos: "amor", aftercare: "amor", citas: "amor",
    proyectos: "exploracion", idiomas: "exploracion", musica: "exploracion", arte: "exploracion", lauwersmeer: "exploracion", red_maule: "exploracion", agrotech: "exploracion",
    finanzas: "soberania", ahorro: "soberania", auditoria: "soberania",
    tramites: "vida", empleo: "vida", tesis: "vida", general: "vida"
  };

  // --- FECHAS LOCALES CON CORTE CIRCADIANO A LAS 03:00 AM ---
  // Todo lo registrado entre las 00:00 y las 02:59 AM pertenece al día anterior.
  const CIRCADIAN_CUTOFF_HOUR = 3;

  function dateKey(d) {
    d = d || new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function circadianDate(dOrTs) {
    const ms = dOrTs instanceof Date ? dOrTs.getTime() : (typeof dOrTs === "number" ? dOrTs : Date.now());
    return new Date(ms - CIRCADIAN_CUTOFF_HOUR * 3600 * 1000);
  }

  function circadianDateKey(dOrTs) {
    return dateKey(circadianDate(dOrTs));
  }

  function todayLocal() {
    return circadianDateKey(new Date());
  }

  function addDays(key, n) {
    const [y, m, d] = key.split("-").map(Number);
    return dateKey(new Date(y, m - 1, d + n, 12, 0, 0));
  }

  // --- ESTADO ---
  let state = { v: 1, ledger: [], migrated: false, testudoDays: {} };

  function reconcileCircadianHistory() {
    let changed = false;
    // 1. Reconciliar entradas del ledger registradas antes de las 03:00 AM
    if (Array.isArray(state.ledger)) {
      state.ledger.forEach((e) => {
        if (!e || !e.ts || e.source === "migracion") return;
        const dt = new Date(e.ts);
        if (dt.getHours() < CIRCADIAN_CUTOFF_HOUR) {
          const trueDate = circadianDateKey(e.ts);
          if (e.date && e.date !== trueDate) {
            const oldDate = e.date;
            e.date = trueDate;
            if (typeof e.key === "string" && e.key.endsWith(oldDate)) {
              e.key = e.key.slice(0, -oldDate.length) + trueDate;
            }
            changed = true;
          }
        }
      });
    }
    // 2. Reconciliar días Testudo / Kintsugi registrados antes de las 03:00 AM
    if (state.testudoDays && typeof state.testudoDays === "object") {
      Object.keys(state.testudoDays).forEach((dKey) => {
        const rec = state.testudoDays[dKey];
        if (!rec || !rec.ts) return;
        const dt = new Date(rec.ts);
        if (dt.getHours() < CIRCADIAN_CUTOFF_HOUR) {
          const trueDate = circadianDateKey(rec.ts);
          if (trueDate !== dKey) {
            state.testudoDays[trueDate] = Object.assign({}, state.testudoDays[trueDate] || {}, rec);
            delete state.testudoDays[dKey];
            changed = true;
          }
        }
      });
    }
    if (changed) save();
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && Array.isArray(p.ledger)) state = Object.assign(state, p);
        if (!state.testudoDays || typeof state.testudoDays !== "object") state.testudoDays = {};
      }
      reconcileCircadianHistory();
    } catch (e) { console.error("[CJProgress] carga:", e); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { console.error("[CJProgress] guardado:", e); }
  }

  function normAura(a) {
    a = String(a || "vida").toLowerCase().trim();
    if (a.includes(":")) {
      const parts = a.split(":");
      if (AURAS.includes(parts[0])) return parts[0];
      a = parts[1] || parts[0];
    }
    if (a.includes("_")) {
      const parts = a.split("_");
      if (AURAS.includes(parts[0])) return parts[0];
    }
    if (AURAS.includes(a)) return a;
    return AURA_ALIASES[a] || "vida";
  }

  // Entradas que NO cuentan para el tope diario ni para "día activo"
  const isSystem = (e) => e.source === "migracion" || e.source === "bonus";

  function dayXP(date) {
    return state.ledger.reduce((s, e) => s + (e.date === date && !isSystem(e) ? e.xp : 0), 0);
  }
  function totalXP() {
    return state.ledger.reduce((s, e) => s + e.xp, 0);
  }

  // --- GUARDIA TESTUDO / DÍAS KINTSUGI (DÍAS DE QUIEBRE Y CONTENCIÓN) ---
  function isTestudoDay(date) {
    date = date || todayLocal();
    return Boolean(state.testudoDays && state.testudoDays[date] && state.testudoDays[date].active);
  }

  function getTestudoInfo(date) {
    date = date || todayLocal();
    const rec = (state.testudoDays && state.testudoDays[date]) || null;
    const shields = (rec && rec.shields) || { dilacion: false, somatica: false, descarga: false };
    const shieldsDone = (shields.dilacion ? 1 : 0) + (shields.somatica ? 1 : 0) + (shields.descarga ? 1 : 0);
    return {
      date,
      active: Boolean(rec && rec.active),
      reason: (rec && rec.reason) || "Momento de quiebre / Contención emocional",
      ts: (rec && rec.ts) || null,
      shields,
      shieldsDone
    };
  }

  function levelInfo(xp) {
    xp = Math.max(0, Number(xp) || 0);
    let idx = 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) { if (xp >= LEVELS[i].threshold) { idx = i; break; } }
    const cur = LEVELS[idx];
    let progress = 100, grade = CONFIG.gradesPerRank, span, into;
    if (cur.next) {
      span = cur.next - cur.threshold;
      into = xp - cur.threshold;
      progress = Math.min(100, Math.round((into / span) * 100));
      grade = Math.min(CONFIG.gradesPerRank, Math.floor((into / span) * CONFIG.gradesPerRank) + 1);
    } else {
      into = xp - cur.threshold;
      grade = Math.min(CONFIG.gradesPerRank, Math.floor(into / 6000) + 1);
    }
    return Object.assign({}, cur, {
      xp, progress, grade,
      gradeRoman: ["I", "II", "III"][grade - 1],
      toNext: cur.next ? cur.next - xp : 0
    });
  }

  function streakInfo() {
    const today = todayLocal();
    const active = (d) => dayXP(d) >= CONFIG.activeDayXP || isTestudoDay(d);
    let cursor = active(today) ? today : addDays(today, -1);
    let n = 0;
    let testudoInStreak = 0;
    while (active(cursor) && n < 3650) {
      n++;
      if (isTestudoDay(cursor)) testudoInStreak++;
      cursor = addDays(cursor, -1);
    }
    const start = n ? addDays(active(today) ? today : addDays(today, -1), -(n - 1)) : null;

    // Estadísticas de últimos 30 días y velocidad de recuperación Kintsugi
    let testudoTotal30 = 0;
    let recSum = 0, recCount = 0;
    for (let i = 29; i >= 0; i--) {
      const d = addDays(today, -i);
      if (isTestudoDay(d)) {
        testudoTotal30++;
        for (let k = 1; k <= 7 && (i - k) >= 0; k++) {
          const nextD = addDays(d, k);
          if (dayXP(nextD) >= CONFIG.activeDayXP && !isTestudoDay(nextD)) {
            recSum += k;
            recCount++;
            break;
          }
        }
      }
    }
    const recoveryDaysAvg = recCount ? Number((recSum / recCount).toFixed(1)) : 1.0;

    return {
      days: n,
      start,
      todayActive: active(today),
      todayTestudo: isTestudoDay(today),
      testudoInStreak,
      testudoTotal30,
      recoveryDaysAvg
    };
  }

  function mosaic(days) {
    days = Math.max(7, Math.min(90, Number(days) || 21));
    const t = todayLocal(), out = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = addDays(t, -i);
      const xp = dayXP(d);
      const tInfo = getTestudoInfo(d);
      let status = "empty";
      if (tInfo.active) status = "kintsugi";
      else if (xp >= CONFIG.activeDayXP) status = "conquest";
      else if (xp > 0) status = "partial";
      out.push({
        date: d,
        xp,
        status,
        isTestudo: tInfo.active,
        shieldsDone: tInfo.shieldsDone,
        reason: tInfo.reason
      });
    }
    return out;
  }

  // --- API PÚBLICA ---
  function award(opts) {
    opts = opts || {};
    const raw = Math.round(Number(opts.xp) || 0);
    if (raw <= 0) return null;
    const date = todayLocal();
    if (opts.key && state.ledger.some((e) => e.key === opts.key && e.date === date)) return null;

    const sys = opts.source === "bonus" || opts.source === "migracion";
    let eff = raw;
    if (!sys) {
      const done = dayXP(date), cap = CONFIG.dailySoftCap;
      if (done >= cap) eff = Math.round(raw * CONFIG.overCapFactor);
      else if (done + raw > cap) eff = (cap - done) + Math.round((done + raw - cap) * CONFIG.overCapFactor);
    }

    const before = levelInfo(totalXP());
    const entry = {
      id: "x" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ts: Date.now(), date,
      aura: normAura(opts.aura),
      raw, xp: eff,
      source: opts.source || "accion",
      desc: String(opts.desc || "Acción").slice(0, 140),
      key: opts.key || null
    };
    state.ledger.push(entry);

    // Bono de racha (una vez por hito y por racha)
    const st = streakInfo();
    const bonus = CONFIG.streakBonus[st.days];
    if (!sys && bonus) {
      const bkey = "streak-" + st.days + "-" + st.start;
      if (!state.ledger.some((e) => e.key === bkey)) {
        state.ledger.push({ id: "b" + entry.id, ts: Date.now(), date, aura: "vida", raw: bonus, xp: bonus,
          source: "bonus", desc: "🔥 Racha de " + st.days + " días", key: bkey });
        notify("🔥 ¡Racha de " + st.days + " días! +" + bonus + " XP de bono");
      }
    }

    save();
    const after = levelInfo(totalXP());
    sync();
    if (after.rank > before.rank) {
      sound("levelup");
      notify("🎉 ¡ASCENSO! Ahora eres " + after.title + " (" + after.latin + ")");
    } else if (after.grade > before.grade) {
      notify("⬆️ Grado " + after.gradeRoman + " de " + after.title);
    }
    return entry;
  }

  /** Revierte la última entrada que coincida (por key, o por aura+xp bruto+desc). */
  function revoke(match) {
    match = match || {};
    let idx = -1;
    for (let i = state.ledger.length - 1; i >= 0; i--) {
      const e = state.ledger[i];
      if (isSystem(e)) continue;
      if (match.key) { if (e.key === match.key) { idx = i; break; } }
      else if ((!match.aura || e.aura === normAura(match.aura)) &&
               (!match.xp || e.raw === Math.round(match.xp)) &&
               (!match.desc || e.desc === String(match.desc).slice(0, 140))) { idx = i; break; }
    }
    if (idx < 0) return null;
    const removed = state.ledger.splice(idx, 1)[0];
    save();
    sync();
    return removed;
  }

  function revokeById(id) {
    const i = state.ledger.findIndex((e) => e.id === id && !isSystem(e));
    if (i < 0) return null;
    const r = state.ledger.splice(i, 1)[0];
    save(); sync();
    return r;
  }

  function xpByAura(days) {
    const from = addDays(todayLocal(), -(days - 1));
    const out = {};
    AURAS.forEach((a) => (out[a] = 0));
    state.ledger.forEach((e) => { if (e.date >= from && !isSystem(e)) out[e.aura] = (out[e.aura] || 0) + e.xp; });
    return out;
  }
  function lastDays(n) {
    const t = todayLocal(), out = [];
    for (let i = n - 1; i >= 0; i--) { const d = addDays(t, -i); out.push({ date: d, xp: dayXP(d) }); }
    return out;
  }
  function recent(n) {
    return state.ledger.filter((e) => !isSystem(e)).slice(-n).reverse();
  }

  function snapshot() {
    const xp = totalXP();
    const today = todayLocal();
    return {
      xp, level: levelInfo(xp), streak: streakInfo(),
      today: { date: today, xp: dayXP(today), cap: CONFIG.dailySoftCap, activeAt: CONFIG.activeDayXP }
    };
  }

  // --- SINCRONIZACIÓN: los viejos contenedores pasan a ser VISTAS derivadas ---
  function sync() {
    const snap = snapshot();
    try {
      const st = window.reyJaguarState;
      let effectiveStreak = snap.streak.days;
      if (st && st.character) {
        if (!st.character) st.character = {};
        st.character.xp = snap.xp;
        st.character.level = snap.level.rank;
        st.character.currentRankIndex = snap.level.rank - 1;
        effectiveStreak = Math.max(effectiveStreak, Number(st.character.streakDays) || 1, Number(st.character.noPornDays) || 1);
        st.character.streakDays = effectiveStreak;
        st.character.noPornDays = Math.max(Number(st.character.noPornDays) || 1, effectiveStreak);
        if (typeof window.saveReyJaguarState === "function") window.saveReyJaguarState();
      }
      if (typeof appState !== "undefined" && appState.profiles && appState.profiles[0]) {
        const p = appState.profiles[0];
        p.xp = snap.xp;
        p.currentLevel = snap.level.rank;
        p.currentSublevel = snap.level.grade;
        effectiveStreak = Math.max(effectiveStreak, Number(p.streak) || 1, (Array.isArray(p.completedDays) ? p.completedDays.length : 1));
        p.streak = effectiveStreak;
        if (!Array.isArray(p.completedDays) || p.completedDays.length < effectiveStreak) {
          p.completedDays = Array.from({ length: Math.min(21, effectiveStreak) }, (_, i) => i + 1);
        }
        if (typeof saveAppState === "function") saveAppState();
      }
    } catch (e) { console.error("[CJProgress] sync:", e); }

    ["renderHeaderStatus", "renderCharacterHUD"].forEach((fn) => {
      try { if (typeof window[fn] === "function") window[fn](); } catch (e) {}
    });
    try {
      if (window.imperivmEngine && typeof window.imperivmEngine.renderHeaderCategoryPennants === "function") {
        window.imperivmEngine.renderHeaderCategoryPennants();
      }
    } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("cj:progress", { detail: snap })); } catch (e) {}
  }

  function reconcileVirtueDay(targetDay) {
    targetDay = Math.min(21, Math.max(1, Number(targetDay) || 1));
    const date = todayLocal();
    const yesterday = addDays(date, -1);
    // Si targetDay >= 2 y ayer tenía < 100 XP, asegurar entrada de reconciliación para ayer
    if (targetDay >= 2 && dayXP(yesterday) < CONFIG.activeDayXP) {
      if (!state.ledger.some(e => e.date === yesterday && e.source === "virtud")) {
        state.ledger.push({
          id: "vrec-" + Date.now().toString(36),
          ts: Date.now() - 86400000,
          date: yesterday,
          aura: "espiritualidad",
          raw: 100,
          xp: 100,
          source: "virtud",
          desc: "Día de Templanza & Virtud (Reconciliado con honores)",
          key: "virtud-reconciled-" + yesterday
        });
        save();
      }
    }
    // Registrar día de virtud de hoy
    award({
      xp: 75,
      aura: "espiritualidad",
      desc: `Día ${targetDay} de Virtud Conquistado (0 Porno)`,
      source: "virtud",
      key: `virtud-day-${targetDay}-${date}`
    });
    // Actualizar estados locales inmediatamente
    if (window.reyJaguarState && window.reyJaguarState.character) {
      window.reyJaguarState.character.noPornDays = Math.max(targetDay, Number(window.reyJaguarState.character.noPornDays) || 1);
      window.reyJaguarState.character.streakDays = Math.max(targetDay, Number(window.reyJaguarState.character.streakDays) || 1);
      if (typeof window.saveReyJaguarState === 'function') window.saveReyJaguarState();
    }
    if (typeof appState !== "undefined" && appState.profiles && appState.profiles[0]) {
      const p = appState.profiles[0];
      p.streak = Math.max(targetDay, Number(p.streak) || 1);
      const curLen = Array.isArray(p.completedDays) ? p.completedDays.length : 0;
      p.completedDays = Array.from({ length: Math.min(21, Math.max(targetDay, curLen)) }, (_, i) => i + 1);
      if (typeof saveAppState === 'function') saveAppState();
    }
    sync();
  }

  function setTestudoDay(date, active, reason) {
    date = date || todayLocal();
    if (!state.testudoDays || typeof state.testudoDays !== "object") state.testudoDays = {};
    const cur = state.testudoDays[date] || {
      active: false,
      ts: Date.now(),
      reason: "Momento de quiebre / Contención emocional",
      shields: { dilacion: false, somatica: false, descarga: false }
    };
    cur.active = Boolean(active);
    cur.ts = Date.now();
    if (reason) cur.reason = String(reason).slice(0, 140);
    state.testudoDays[date] = cur;
    save();

    if (cur.active) {
      award({
        xp: 35,
        aura: "espiritualidad",
        desc: "🛡️ Formación Testudo Activada (Guardia Kintsugi de Contención)",
        source: "testudo",
        key: "testudo-activate-" + date
      });
      notify("🛡️ Guardia Testudo activada para " + date + " (+35 XP)");
    } else {
      notify("🛡️ Guardia Testudo desactivada para " + date);
    }
    sync();
    return getTestudoInfo(date);
  }

  function toggleTestudoDay(date, reason) {
    date = date || todayLocal();
    const currentlyActive = isTestudoDay(date);
    return setTestudoDay(date, !currentlyActive, reason);
  }

  function moveTestudoToPreviousDay(fromDate) {
    fromDate = fromDate || todayLocal();
    const prevDate = addDays(fromDate, -1);
    if (!state.testudoDays || typeof state.testudoDays !== "object") state.testudoDays = {};
    const rec = state.testudoDays[fromDate] || {
      active: true,
      ts: Date.now(),
      reason: "Momento de quiebre / Contención emocional",
      shields: { dilacion: false, somatica: false, descarga: false }
    };
    state.testudoDays[prevDate] = Object.assign({}, state.testudoDays[prevDate] || {}, rec, { active: true });
    delete state.testudoDays[fromDate];

    // Mover también entradas del ledger de fuente "testudo" de fromDate a prevDate
    if (Array.isArray(state.ledger)) {
      state.ledger.forEach((e) => {
        if (e && e.date === fromDate && e.source === "testudo") {
          e.date = prevDate;
          if (typeof e.key === "string" && e.key.endsWith(fromDate)) {
            e.key = e.key.slice(0, -fromDate.length) + prevDate;
          }
        }
      });
    }
    save();
    notify("🏺 Guardia Kintsugi trasladada al día anterior (" + prevDate + "). Hoy queda libre.");
    sync();
    return getTestudoInfo(prevDate);
  }

  function toggleTestudoShield(shieldKey, date) {
    date = date || todayLocal();
    if (!["dilacion", "somatica", "descarga"].includes(shieldKey)) return null;
    if (!state.testudoDays || typeof state.testudoDays !== "object") state.testudoDays = {};
    const cur = state.testudoDays[date] || {
      active: true,
      ts: Date.now(),
      reason: "Momento de quiebre / Contención emocional",
      shields: { dilacion: false, somatica: false, descarga: false }
    };
    cur.active = true;
    if (!cur.shields) cur.shields = { dilacion: false, somatica: false, descarga: false };
    cur.shields[shieldKey] = !cur.shields[shieldKey];
    state.testudoDays[date] = cur;
    save();

    const shieldMeta = {
      dilacion: { xp: 35, aura: "espiritualidad", desc: "🛡️ Escudo I (Dilación de Séneca): No escalar en caliente ni ceder al impulso" },
      somatica: { xp: 35, aura: "salud", desc: "💧 Escudo II (Trinchera Somática): Hidratación, calma física y sueño" },
      descarga: { xp: 35, aura: "mente", desc: "📜 Escudo III (Catarsis Estoica): Desahogo consciente en Diario o Terapia" }
    }[shieldKey];

    const key = "testudo-shield-" + shieldKey + "-" + date;
    if (cur.shields[shieldKey] && shieldMeta) {
      award({
        xp: shieldMeta.xp,
        aura: shieldMeta.aura,
        desc: shieldMeta.desc,
        source: "testudo",
        key
      });
      notify("🛡️ " + shieldMeta.desc + " (+35 XP)");
    } else {
      revoke({ key });
    }
    sync();
    return getTestudoInfo(date);
  }

  function notify(msg) { if (typeof window.showNotification === "function") window.showNotification(msg); }
  function sound(k) { if (typeof window.playSoundEffect === "function") { try { window.playSoundEffect(k); } catch (e) {} } }

  // --- MIGRACIÓN ÚNICA: reinicia el XP pero conserva el rango actual ---
  function migrate() {
    if (state.migrated) return;
    let oldRank = 1;
    try {
      const c = window.reyJaguarState && window.reyJaguarState.character;
      if (c && Number(c.level) > 0) oldRank = Math.max(oldRank, Number(c.level));
      if (typeof appState !== "undefined" && appState.profiles && appState.profiles[0]) {
        oldRank = Math.max(oldRank, Number(appState.profiles[0].currentLevel) || 1);
      }
    } catch (e) {}
    oldRank = Math.min(LEVELS.length, Math.max(1, Math.floor(oldRank)));
    const base = LEVELS[oldRank - 1].threshold;
    if (base > 0) {
      state.ledger.push({ id: "m0", ts: Date.now(), date: todayLocal(), aura: "vida", raw: base, xp: base,
        source: "migracion", desc: "Rango conservado (" + LEVELS[oldRank - 1].title + "): XP reiniciado", key: "migracion-v1" });
    }
    state.migrated = true;
    save();
  }

  function init() {
    migrate();
    sync();
  }

  load();
  window.addEventListener("load", init);

  window.CJProgress = {
    CONFIG, LEVELS, AURAS, normAura,
    CIRCADIAN_CUTOFF_HOUR, circadianDate, circadianDateKey,
    todayLocal, dateKey, addDays,
    award, revoke, revokeById, reconcileVirtueDay,
    isTestudoDay, getTestudoInfo, setTestudoDay, toggleTestudoDay, moveTestudoToPreviousDay, toggleTestudoShield, mosaic,
    totalXP, dayXP, levelInfo, streakInfo, snapshot,
    xpByAura, lastDays, recent, sync, init
  };
  window.CJDates = { todayLocal, dateKey, addDays, circadianDate, circadianDateKey };

  /** Compatibilidad: awardXP(cantidad, descripción, aura?, clave?) */
  window.awardXP = function (amount, description, aura, key) {
    const e = award({ xp: amount, aura: aura || "vida", desc: description, key: key });
    if (e) notify("✨ +" + e.xp + " XP • " + e.desc);
    return e;
  };
})(window);

// Helpers globales de fecha local (reemplazan new Date().toISOString().split('T')[0], que da fecha UTC)
window.cjToday = function () { return window.CJDates.todayLocal(); };
window.cjDateKey = function (d) { return window.CJDates.dateKey(d); };
