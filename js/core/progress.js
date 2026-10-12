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

  // --- FECHAS LOCALES ---
  function dateKey(d) {
    d = d || new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function todayLocal() { return dateKey(new Date()); }
  function addDays(key, n) {
    const [y, m, d] = key.split("-").map(Number);
    return dateKey(new Date(y, m - 1, d + n));
  }

  // --- ESTADO ---
  let state = { v: 1, ledger: [], migrated: false };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && Array.isArray(p.ledger)) state = Object.assign(state, p);
      }
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
    const active = (d) => dayXP(d) >= CONFIG.activeDayXP;
    let cursor = active(today) ? today : addDays(today, -1);
    let n = 0;
    while (active(cursor) && n < 3650) { n++; cursor = addDays(cursor, -1); }
    const start = n ? addDays(active(today) ? today : addDays(today, -1), -(n - 1)) : null;
    return { days: n, start, todayActive: active(today) };
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
      if (st) {
        if (!st.character) st.character = {};
        st.character.xp = snap.xp;
        st.character.level = snap.level.rank;
        st.character.currentRankIndex = snap.level.rank - 1;
        st.character.streakDays = snap.streak.days;
        if (typeof window.saveReyJaguarState === "function") window.saveReyJaguarState();
      }
      if (typeof appState !== "undefined" && appState.profiles && appState.profiles[0]) {
        const p = appState.profiles[0];
        p.xp = snap.xp;
        p.currentLevel = snap.level.rank;
        p.currentSublevel = snap.level.grade;
        p.streak = snap.streak.days;
        p.completedDays = Array.from({ length: Math.min(21, snap.streak.days) }, (_, i) => i + 1);
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
    todayLocal, dateKey, addDays,
    award, revoke, revokeById,
    totalXP, dayXP, levelInfo, streakInfo, snapshot,
    xpByAura, lastDays, recent, sync, init
  };
  window.CJDates = { todayLocal, dateKey, addDays };

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
