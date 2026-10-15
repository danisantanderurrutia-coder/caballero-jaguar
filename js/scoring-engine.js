/**
 * ============================================================================
 * SCORING ENGINE - SISTEMA MAESTRO DE PUNTUACIÓN DE CABALLERÍA JAGUAR (V3)
 * ============================================================================
 * Centraliza las 9 Auras de Caballería, el cálculo de Experiencia (XP: 25/50/75),
 * el cómputo algebraico de la VIBRA diaria y semanal, el radar de 9 ejes
 * y la renderización en cascada superpuesta de los 9 Banderines Heráldicos.
 */

(function (window) {
  "use strict";

  const SCORING_STORAGE_KEY = "CABALLERO_JAGUAR_SCORING_STATE_V3";

  // --- 1. ESTRUCTURA DE LAS 9 AURAS DE CABALLERÍA JAGUAR ---
  const CABALLERO_AURAS = {
    vida: {
      id: "vida",
      order: 4, // Central
      name: "Vida (Misiones Principales)",
      shortName: "Vida",
      icon: "👑",
      baseColor: "#C0392B",
      accent: "#E8A0A8",
      pennantColor: "#9B2335",
      goldBorder: "#E8A0A8",
      desc: "Mantener el 'shit together': Tesis Hannover, Búsqueda de empleo, Visa española y Vacaciones.",
      defaultDominant: "tesis"
    },
    exploracion: {
      id: "exploracion",
      order: 0, // Extremo Izquierdo
      name: "Exploración (Misiones Secundarias)",
      shortName: "Exploración",
      icon: "🧭",
      baseColor: "#3F51B5",
      accent: "#9FA8DA",
      pennantColor: "#3949AB",
      goldBorder: "#C5CAE9",
      desc: "Expandir las fronteras del yo: Idiomas (Alemán/Euskera), Música (Trompeta jazz), Fotografía y Proyectos secundarios.",
      defaultDominant: "idiomas"
    },
    amor: {
      id: "amor",
      order: 6,
      name: "Amor & Goce",
      shortName: "Amor",
      icon: "❤️",
      baseColor: "#C2185B",
      accent: "#F48FB1",
      pennantColor: "#AD1457",
      goldBorder: "#F8BBD0",
      desc: "Amor de pareja, intimidad consciente, Pintura al óleo, Escritura y Masajes en pareja.",
      defaultDominant: "pareja"
    },
    salud: {
      id: "salud",
      order: 3,
      name: "Salud Somática",
      shortName: "Salud",
      icon: "🌿",
      baseColor: "#00897B",
      accent: "#80CBC4",
      pennantColor: "#00796B",
      goldBorder: "#B2DFDB",
      desc: "Regeneración celular: Nutrición limpia, hidratación 3.2L, sueño 7-8h, masajes faciales y yoga.",
      defaultDominant: "nutricion"
    },
    soberania: {
      id: "soberania",
      order: 5,
      name: "Soberanía Financiera",
      shortName: "Soberanía",
      icon: "🪙",
      baseColor: "#9B2335",
      accent: "#D4464E",
      pennantColor: "#9B2335",
      goldBorder: "#E8A0A8",
      desc: "Control de gastos semanal cada domingo, paneo mensual Sparkasse/Chile y cero gastos tontos.",
      defaultDominant: "finanzas"
    },
    espiritualidad: {
      id: "espiritualidad",
      order: 8, // Extremo Derecho
      name: "Espiritualidad & Ritos",
      shortName: "Espiritual",
      icon: "🕯️",
      baseColor: "#5C6BC0",
      accent: "#E8EAF6",
      pennantColor: "#455A64",
      goldBorder: "#CFD8DC",
      desc: "Conexión sagrada: Ritos ancestrales (Navaho, Andino, Amazónico), Meditación Vipassana y Detox de porno.",
      defaultDominant: "detox"
    },
    naturaleza: {
      id: "naturaleza",
      order: 1,
      name: "Naturaleza & Ecosistemas",
      shortName: "Naturaleza",
      icon: "🌲",
      baseColor: "#2E7D32",
      accent: "#A5D6A7",
      pennantColor: "#1B5E20",
      goldBorder: "#C8E6C9",
      desc: "ReWild bosque nativo, acampar, nadar en el mar, correr en el bosque, caminatas y jardinería.",
      defaultDominant: "bosque"
    },
    deporte: {
      id: "deporte",
      order: 2,
      name: "Deporte & Combate",
      shortName: "Deporte",
      icon: "🥊",
      baseColor: "#C62828",
      accent: "#EF9A9A",
      pennantColor: "#8B0000",
      goldBorder: "#FFCDD2",
      desc: "Artes marciales (Muay Thai / Kickboxing), Gym e hipertrofia, Running cardiovascular y Bouldering.",
      defaultDominant: "combate"
    },
    mente: {
      id: "mente",
      order: 7,
      name: "Mente & Foco Estoico",
      shortName: "Mente",
      icon: "🧠",
      baseColor: "#6A1B9A",
      accent: "#CE93D8",
      pennantColor: "#4A148C",
      goldBorder: "#E1BEE7",
      desc: "Filosofía estoica (Marco Aurelio/Séneca), bloques Deep Work, lectura de códices y estudio.",
      defaultDominant: "lectura"
    }
  };

  // --- 2. ESCALAS DE EXPERIENCIA POR DIFICULTAD ---
  const XP_LEVELS = {
    facil: 25,
    medio: 50,
    dificil: 75
  };

  // --- 3. GESTIÓN DEL ESTADO LOCAL DE PUNTOS Y VIBRA ---
  let scoringState = {
    today: cjToday(),
    auraPoints: {
      vida: 0,
      exploracion: 0,
      amor: 0,
      salud: 0,
      soberania: 0,
      espiritualidad: 0,
      naturaleza: 0,
      deporte: 0,
      mente: 0
    },
    lastActiveDate: {},
    // Registro diario de puntos para la fórmula algebraica de Vibra: { '2026-09-14': { vida: 2, ... } }
    dailyLog: {},
    dominantActivity: {
      deporte: "combate", // 'combate' = rojo oscuro (#8B0000), 'running' = rojo claro (#FF4500)
      vida: "tesis",
      exploracion: "idiomas",
      amor: "pareja",
      salud: "nutricion",
      soberania: "finanzas",
      espiritualidad: "detox",
      naturaleza: "bosque",
      mente: "lectura"
    }
  };

  function applyDailyDecay() {
    const todayStr = cjToday();
    if (!scoringState.lastActiveDate) scoringState.lastActiveDate = {};

    let modified = false;
    Object.keys(CABALLERO_AURAS).forEach(key => {
      const lastDate = scoringState.lastActiveDate[key];
      const pts = scoringState.auraPoints[key] || 0;
      if (pts > 0 && lastDate) {
        const last = new Date(lastDate);
        const curr = new Date(todayStr);
        const diffMs = curr - last;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          // Decaimiento natural: restar puntos proporcionales a los días transcurridos sin actividad
          const decay = Math.min(pts, diffDays);
          scoringState.auraPoints[key] = Math.max(0, pts - decay);
          scoringState.lastActiveDate[key] = todayStr;
          modified = true;
        }
      } else if (pts > 0 && !lastDate) {
        // Asignar hoy como ancla inicial si había puntos previos
        scoringState.lastActiveDate[key] = todayStr;
        modified = true;
      }
    });

    if (modified) {
      saveScoringState();
    }
  }

  function loadScoringState() {
    try {
      const saved = localStorage.getItem(SCORING_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          scoringState = Object.assign({}, scoringState, parsed);
        }
      }
      applyDailyDecay();
    } catch (e) {
      console.error("Error al cargar estado de puntuación:", e);
    }
  }

  function saveScoringState() {
    try {
      localStorage.setItem(SCORING_STORAGE_KEY, JSON.stringify(scoringState));
    } catch (e) {
      console.error("Error al guardar estado de puntuación:", e);
    }
  }

  loadScoringState();

  // --- 4. MOTOR MATEMÁTICO DE LA VIBRA ---
  const ScoringEngine = {
    auras: CABALLERO_AURAS,
    xpLevels: XP_LEVELS,
    ranks: [
      { rank: 1, level: 1, title: "Rango 1: Caballero Explorador", desc: "Compromiso territorial, disciplina base y defensa comunitaria.", threshold: 0 },
      { rank: 2, level: 2, title: "Rango 2: Caballero de Línea", desc: "Consagración profesional y cumplimiento de deberes en tu especialidad.", threshold: 1000 },
      { rank: 3, level: 3, title: "Rango 3: Capitán de Caballería", desc: "A cargo de equipos humanos, investigación y estrategias.", threshold: 3500 },
      { rank: 4, level: 4, title: "Rango 4: Mariscal de Campaña", desc: "Coordinación ejecutiva y soberanía en tus propios proyectos de vida.", threshold: 8500 },
      { rank: 5, level: 5, title: "Rango 5: Gran Maestre de la Orden", desc: "Soberanía total, capital autónomo y legado de la Orden Jaguar.", threshold: 18000 }
    ],

    /**
     * Evalúa la experiencia acumulada contra los umbrales de XP de la Orden
     * Retorna { rank, level, title, desc, threshold, nextXP, progress }
     */
    getRankForXP(xp = 0) {
      const numericXP = Math.max(0, Number(xp) || 0);
      const thresholds = [0, 1000, 3500, 8500, 18000];
      let rankIndex = 0;
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (numericXP >= thresholds[i]) {
          rankIndex = i;
          break;
        }
      }
      const currentRank = this.ranks[rankIndex] || this.ranks[0];
      const nextRank = this.ranks[rankIndex + 1] || null;
      return {
        rank: rankIndex + 1,
        level: rankIndex + 1,
        title: currentRank.title,
        desc: currentRank.desc,
        threshold: thresholds[rankIndex],
        nextXP: nextRank ? nextRank.threshold : null,
        progress: nextRank 
          ? Math.min(100, Math.max(0, Math.round(((numericXP - thresholds[rankIndex]) / (nextRank.threshold - thresholds[rankIndex])) * 100))) 
          : 100
      };
    },

    /**
     * Calcula la Vibra de un Aura específica a partir de la expresión algebraica:
     * Vibra = ( Sum_i [ 0.82^i * sqrt(P_i) * 12 ] ) * ( 1 + 0.4 * (D_activos / 7) )
     */
    calculateVibra(auraKey) {
      const today = new Date();
      const lambda = 0.82;
      let weightedSum = 0;
      let activeDaysCount = 0;
      const historyBreakdown = [];

      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = cjDateKey(d);
        const dayPoints = (scoringState.dailyLog[dateStr] && scoringState.dailyLog[dateStr][auraKey]) || 0;
        
        if (dayPoints > 0) activeDaysCount++;

        const weight = Math.pow(lambda, i);
        const energyDay = Math.sqrt(dayPoints) * 12 * weight;
        weightedSum += energyDay;

        historyBreakdown.push({
          dayIndex: i,
          dateStr,
          points: dayPoints,
          weight: weight.toFixed(2),
          energy: energyDay.toFixed(1)
        });
      }

      const consistencyBonus = 1 + (0.4 * (activeDaysCount / 7));
      const rawVibra = weightedSum * consistencyBonus;
      const finalScore = Math.round(rawVibra);

      return {
        auraKey,
        score: finalScore,
        activeDays: activeDaysCount,
        consistencyBonus: consistencyBonus.toFixed(2),
        history: historyBreakdown,
        formulaText: `Vibra = [ Σ (0.82^i · √P_i · 12) ] × [ 1 + 0.40 · (${activeDaysCount}/7) ]`
      };
    },

    /**
     * Retorna los puntos acumulados de un aura
     */
    getAuraPoints(auraKey) {
      return scoringState.auraPoints[auraKey] || 0;
    },

    getScore() {
      return scoringState;
    },

    getState() {
      return scoringState;
    },

    applyDailyDecay() {
      applyDailyDecay();
    },

    // ------------------------------------------------------------------
    // API DE REGISTRO UNIFICADA (antes llamada desde la app pero inexistente)
    // ------------------------------------------------------------------
    /** Tramo de XP según minutos: ≤20 → 25 · ≤50 → 50 · >50 → 75 */
    xpForMinutes(mins) {
      const m = Number(mins) || 0;
      return m <= 20 ? XP_LEVELS.facil : (m <= 50 ? XP_LEVELS.medio : XP_LEVELS.dificil);
    },

    calculateTimeXP(duration, category) {
      return { xp: this.xpForMinutes(duration), pillar: (window.CJProgress ? window.CJProgress.normAura(category) : "vida") };
    },

    /** Otorga `xp` exactos a un pilar/aura: +1 punto de aura, log diario y libro de XP. */
    awardXP(pillar, xp, description = "", key = null) {
      const auraKey = window.CJProgress ? window.CJProgress.normAura(pillar) : (CABALLERO_AURAS[pillar] ? pillar : "vida");
      const entry = window.CJProgress
        ? window.CJProgress.award({ xp, aura: auraKey, desc: description || ("Acción en " + CABALLERO_AURAS[auraKey].shortName), key })
        : null;
      if (!entry) return null; // duplicado (misma clave hoy) o XP inválido

      const todayStr = window.CJProgress.todayLocal();
      scoringState.auraPoints[auraKey] = (scoringState.auraPoints[auraKey] || 0) + 1;
      if (!scoringState.lastActiveDate) scoringState.lastActiveDate = {};
      scoringState.lastActiveDate[auraKey] = todayStr;
      if (!scoringState.dailyLog[todayStr]) scoringState.dailyLog[todayStr] = {};
      scoringState.dailyLog[todayStr][auraKey] = (scoringState.dailyLog[todayStr][auraKey] || 0) + 1;
      saveScoringState();

      if (typeof imperivmEngine !== "undefined" && typeof imperivmEngine.renderHeaderCategoryPennants === "function") {
        imperivmEngine.renderHeaderCategoryPennants();
      }
      if (typeof window.showNotification === "function") {
        window.showNotification(`✨ +${entry.xp} XP • ${CABALLERO_AURAS[auraKey].shortName}`);
      }
      return entry;
    },

    logMeditation(mins, technique = "Meditación") {
      return this.awardXP("espiritualidad", this.xpForMinutes(mins), `${technique} (${mins} min)`);
    },

    logMassage(label, mins) {
      return this.awardXP("salud", this.xpForMinutes(mins), `Masaje: ${label} (${mins} min)`);
    },

    logReading(title, pages, mins) {
      const xp = this.xpForMinutes(mins || Math.round((Number(pages) || 0) * 2));
      const entry = this.awardXP("mente", xp, `Lectura: ${title} (${pages} págs / ${mins} min)`);
      return { totalXP: entry ? entry.xp : 0, entry };
    },

    /**
     * Asigna actividad, otorga XP al personaje, suma +1 punto al aura respectiva
     * y guarda en el registro diario para el cálculo de Vibra.
     */
    awardAction(auraKey, difficulty = "medio", description = "", secondaryAuraKey = null, dominantSubKey = null) {
      if (!CABALLERO_AURAS[auraKey]) auraKey = "vida";

      const xpAmount = XP_LEVELS[difficulty] || XP_LEVELS.medio;
      const todayStr = cjToday();

      // 1. Incrementar puntos de aura (+1 punto)
      scoringState.auraPoints[auraKey] = (scoringState.auraPoints[auraKey] || 0) + 1;
      if (!scoringState.lastActiveDate) scoringState.lastActiveDate = {};
      scoringState.lastActiveDate[auraKey] = todayStr;
      
      // 2. Registrar en log diario
      if (!scoringState.dailyLog[todayStr]) scoringState.dailyLog[todayStr] = {};
      scoringState.dailyLog[todayStr][auraKey] = (scoringState.dailyLog[todayStr][auraKey] || 0) + 1;

      // Si hay aura secundaria (ej. Yoga: Salud + Espiritualidad)
      if (secondaryAuraKey && CABALLERO_AURAS[secondaryAuraKey]) {
        scoringState.auraPoints[secondaryAuraKey] = (scoringState.auraPoints[secondaryAuraKey] || 0) + 1;
        scoringState.lastActiveDate[secondaryAuraKey] = todayStr;
        scoringState.dailyLog[todayStr][secondaryAuraKey] = (scoringState.dailyLog[todayStr][secondaryAuraKey] || 0) + 1;
      }

      // Si especifica actividad dominante interna (ej. Muay Thai vs Running)
      if (dominantSubKey) {
        scoringState.dominantActivity[auraKey] = dominantSubKey;
      }

      saveScoringState();

      // 3. Otorgar XP por el motor único (libro de movimientos) y sincronizar el stat del atributo
      if (window.CJProgress) {
        window.CJProgress.award({
          xp: xpAmount,
          aura: auraKey,
          desc: description || `Acción en Aura ${CABALLERO_AURAS[auraKey].shortName}`,
          key: arguments[5] || null
        });
      }
      if (window.reyJaguarState && window.reyJaguarState.character) {
        if (!window.reyJaguarState.stats) window.reyJaguarState.stats = {};
        const statKeys = new Set([dominantSubKey, auraKey, arguments[5], arguments[6]].filter(Boolean));
        statKeys.forEach(k => {
          if (!window.reyJaguarState.stats[k]) {
            window.reyJaguarState.stats[k] = { name: description || k, value: 0, icon: "⚡" };
          }
          window.reyJaguarState.stats[k].value = (window.reyJaguarState.stats[k].value || 0) + 1;
        });

        // Sincronizar pilar de movilidad y calistenia en el registro diario
        if (statKeys.has('movilidad') || statKeys.has('gym') || statKeys.has('fuerza')) {
          if (!window.reyJaguarState.dailyChallengeActions) window.reyJaguarState.dailyChallengeActions = {};
          if (!window.reyJaguarState.dailyChallengeActions[todayStr]) window.reyJaguarState.dailyChallengeActions[todayStr] = {};
          window.reyJaguarState.dailyChallengeActions[todayStr]['pillar_ejercicio'] = true;
          window.reyJaguarState.dailyChallengeActions[todayStr]['movilidad'] = true;
        }

        if (typeof window.saveReyJaguarState === "function") window.saveReyJaguarState();
      }

      // Re-renderizar banderines heráldicos en tiempo real
      if (typeof imperivmEngine !== "undefined" && typeof imperivmEngine.renderHeaderCategoryPennants === "function") {
        imperivmEngine.renderHeaderCategoryPennants();
      }

      if (typeof window.showNotification === "function") {
        window.showNotification(`✨ +${xpAmount} XP • +1 Punto Aura ${CABALLERO_AURAS[auraKey].shortName}`);
      }

      return { xp: xpAmount, points: scoringState.auraPoints[auraKey] };
    },

    /**
     * Revoca una acción marcada por error o deseleccionada:
     * Disminuye -1 punto en el aura y descuenta la XP correspondiente.
     */
    revokeAction(auraKey, difficulty = "medio", description = "", secondaryAuraKey = null, dominantSubKey = null) {
      if (!CABALLERO_AURAS[auraKey]) auraKey = "vida";

      const xpAmount = XP_LEVELS[difficulty] || XP_LEVELS.medio;
      const todayStr = cjToday();

      // 1. Decrementar puntos de aura (sin bajar de 0)
      scoringState.auraPoints[auraKey] = Math.max(0, (scoringState.auraPoints[auraKey] || 0) - 1);

      // 2. Decrementar en log diario si existe
      if (scoringState.dailyLog[todayStr] && scoringState.dailyLog[todayStr][auraKey]) {
        scoringState.dailyLog[todayStr][auraKey] = Math.max(0, scoringState.dailyLog[todayStr][auraKey] - 1);
      }

      if (secondaryAuraKey && CABALLERO_AURAS[secondaryAuraKey]) {
        scoringState.auraPoints[secondaryAuraKey] = Math.max(0, (scoringState.auraPoints[secondaryAuraKey] || 0) - 1);
        if (scoringState.dailyLog[todayStr] && scoringState.dailyLog[todayStr][secondaryAuraKey]) {
          scoringState.dailyLog[todayStr][secondaryAuraKey] = Math.max(0, scoringState.dailyLog[todayStr][secondaryAuraKey] - 1);
        }
      }

      saveScoringState();

      // 3. Revertir el movimiento en el libro único de XP y el stat interno
      if (window.CJProgress) {
        window.CJProgress.revoke({ aura: auraKey, xp: xpAmount, desc: description || undefined }) ||
          window.CJProgress.revoke({ aura: auraKey, xp: xpAmount });
      }
      if (window.reyJaguarState && window.reyJaguarState.character) {
        const statKey = dominantSubKey || auraKey;
        if (statKey && window.reyJaguarState.stats && window.reyJaguarState.stats[statKey]) {
          window.reyJaguarState.stats[statKey].value = Math.max(0, (window.reyJaguarState.stats[statKey].value || 0) - 1);
        }
        if (typeof window.saveReyJaguarState === "function") window.saveReyJaguarState();
      }

      // Re-renderizar banderines en tiempo real
      if (typeof imperivmEngine !== "undefined" && typeof imperivmEngine.renderHeaderCategoryPennants === "function") {
        imperivmEngine.renderHeaderCategoryPennants();
      }

      if (typeof window.showNotification === "function") {
        window.showNotification(`↩️ -${xpAmount} XP • -1 Punto Aura ${CABALLERO_AURAS[auraKey].shortName}`);
      }

      return { xp: -xpAmount, points: scoringState.auraPoints[auraKey] };
    },

    /**
     * Obtiene el color dinámico del banderín según la actividad dominante
     */
    getDynamicPennantColor(auraKey) {
      const a = CABALLERO_AURAS[auraKey];
      if (!a) return "#9B2335";

      if (auraKey === "deporte") {
        const dom = scoringState.dominantActivity.deporte || "combate";
        if (dom === "combate") return { base: "#7A0C16", border: "#9B2335", text: "Muay Thai Dominante" };
        if (dom === "running") return { base: "#D35400", border: "#FFD54F", text: "Running Dominante" };
        if (dom === "bouldering") return { base: "#8D6E63", border: "#D7CCC8", text: "Escalada Dominante" };
        return { base: "#B71C1C", border: "#EF9A9A", text: "Gym Dominante" };
      }

      if (auraKey === "vida") {
        const dom = scoringState.dominantActivity.vida || "tesis";
        if (dom === "tesis") return { base: "#B8860B", border: "#E8A0A8", text: "Tesis Dominante" };
        if (dom === "hannover") return { base: "#9B2335", border: "#D4464E", text: "Hannover Dominante" };
        return { base: "#9B2335", border: "#E8A0A8", text: "España Dominante" };
      }

      return { base: a.pennantColor, border: a.goldBorder, text: a.shortName };
    },

    /**
     * Renderiza los 9 Banderines Heráldicos superpuestos al 50% en cascada
     */
    renderHangingPennantsHTML() {
      // Orden geométrico de izquierda a derecha con VIDA en el centro (índice 4)
      const orderKeys = [
        "exploracion",   // 0
        "naturaleza",    // 1
        "deporte",       // 2
        "salud",         // 3
        "vida",          // 4 (CENTRAL)
        "soberania",     // 5
        "amor",          // 6
        "mente",         // 7
        "espiritualidad" // 8
      ];

      // Paleta Imperial Romana: terciopelos oscuros con matices nobles y ribetes metálicos de latón/oro
      const imperialThemes = {
        exploracion:   { base: '#0D1525', accent: '#3F629B', gold: 'rgba(92, 137, 212, 0.45)', ribbon: '#4A6999' },
        naturaleza:    { base: '#0C1C14', accent: '#2A663E', gold: 'rgba(76, 175, 80, 0.45)',  ribbon: '#38734C' },
        deporte:       { base: '#220D12', accent: '#8F2633', gold: 'rgba(217, 83, 79, 0.45)',  ribbon: '#A63342' },
        salud:         { base: '#0B1D1D', accent: '#267368', gold: 'rgba(64, 180, 160, 0.45)', ribbon: '#32887C' },
        vida:          { base: '#250B12', accent: '#C59A28', gold: 'rgba(243, 208, 121, 0.85)', ribbon: '#E5BE53', isCentral: true },
        soberania:     { base: '#241408', accent: '#8C6514', gold: 'rgba(229, 190, 83, 0.55)', ribbon: '#B8860B' },
        amor:          { base: '#220A1A', accent: '#7B1F56', gold: 'rgba(216, 75, 148, 0.45)', ribbon: '#8E2866' },
        mente:         { base: '#170E24', accent: '#582B82', gold: 'rgba(156, 89, 219, 0.45)', ribbon: '#6C399E' },
        espiritualidad:{ base: '#13151D', accent: '#4E576B', gold: 'rgba(160, 174, 192, 0.45)', ribbon: '#5D6679' }
      };

      return `
        <div class="kcd-hanging-heraldic-pennants-row">
          ${orderKeys.map((key, idx) => {
            const aura = CABALLERO_AURAS[key];
            const pts = scoringState.auraPoints[key] || 0;
            const theme = imperialThemes[key];
            const isCentral = !!theme.isCentral;

            // Altura dinámica: de 56px base hasta 115px según puntos
            const heightPx = Math.min(115, Math.round((isCentral ? 64 : 56) + (pts * 3.8)));
            
            // Halo y ribete dorado según maestría
            const borderGlow = isCentral 
              ? `1.5px solid rgba(243, 208, 121, 0.85)` 
              : `1px solid ${theme.gold}`;
            const centralShadow = isCentral 
              ? `0 0 20px rgba(197, 154, 40, 0.4), inset 0 0 15px rgba(197, 154, 40, 0.2)` 
              : `inset 0 0 12px rgba(0,0,0,0.85)`;

            return `
              <div class="kcd-heraldic-pennant-item kcd-pennant-idx-${idx} ${isCentral ? 'kcd-pennant-central-maestro' : ''}" 
                   onclick="openKCDInspector({ type: 'category', categoryKey: '${key}' })"
                   title="${aura.name}: ${pts} Puntos • Haz clic para abrir Códice">
                
                <!-- Anilla de suspensión romana en latón forjado -->
                <div class="kcd-pennant-hanger-ring" style="width: ${isCentral ? '12px' : '9px'}; height: ${isCentral ? '12px' : '9px'}; border: 1.5px solid ${theme.ribbon}; background: #07090E; border-radius: 50%; margin-bottom: -4px; z-index: 5; box-shadow: 0 2px 4px rgba(0,0,0,0.8);"></div>
                
                <!-- Paño del Estandarte Imperial -->
                <div class="kcd-pennant-cloth" style="height: ${heightPx}px; background: linear-gradient(180deg, ${theme.base} 0%, #0A0D15 100%); border: ${borderGlow}; box-shadow: 0 10px 24px rgba(0,0,0,0.85), ${centralShadow};">
                  
                  <!-- Ícono heráldico con relieve -->
                  <span class="kcd-pennant-icon" style="font-size: ${isCentral ? '1.15rem' : '0.98rem'}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9)); line-height: 1; margin-top: 3px;">${aura.icon}</span>
                  
                  <!-- Nombre del Pilar -->
                  <div class="kcd-pennant-name-tag" style="color: ${isCentral ? '#F6E2A3' : '#CBD5E1'}; font-weight: ${isCentral ? '800' : '700'};">${aura.shortName}</div>
                  
                  <!-- Falera / Medalla Romana de Bronce con Puntos -->
                  <div class="kcd-pennant-points-badge ${pts > 0 ? 'badge-earned' : ''}">
                    ${pts}p
                  </div>
                  
                  <!-- Punta en V de lanza legionaria recortada con borde continuo -->
                  <div class="kcd-pennant-v-fringe" style="border-top-color: #0A0D15;"></div>
                  <div class="kcd-pennant-v-border-left" style="border-left-color: ${theme.ribbon};"></div>
                  <div class="kcd-pennant-v-border-right" style="border-right-color: ${theme.ribbon};"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    },

    /**
     * Despliega modal explicativo de la expresión algebraica de la Vibra
     */
    openVibraExplanationModal(auraKey) {
      const v = this.calculateVibra(auraKey);
      const aura = CABALLERO_AURAS[auraKey];

      const modal = document.getElementById("kcd-inspector-modal");
      const content = document.getElementById("kcd-inspector-content");
      if (!modal || !content) return;

      content.classList.add("codex-wide");
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2.2rem;">${aura.icon}</span>
            <div>
              <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">MOTOR MATEMÁTICO • EXPRESIÓN ALGEBRAICA</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #0E0E13; margin: 0;">Fórmula de la Vibra: ${aura.name}</h3>
            </div>
          </div>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>

        <div class="pitch-formula-box" style="margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-size: 0.75rem; color: #C0392B; letter-spacing: 1px;">ÍNDICE DE VIBRA ACTUAL:</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: #FFF; text-shadow: 0 0 12px rgba(229,193,88,0.6);">${v.score} Hz / Pts</div>
            </div>
            <div style="text-align: right; background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(229,193,88,0.3);">
              <div style="font-size: 0.7rem; color: #C0392B;">Días Activos (Últimos 7): <strong>${v.activeDays}/7</strong></div>
              <div style="font-size: 0.7rem; color: #FFF;">Bonus Constancia: <strong>+${Math.round((v.consistencyBonus - 1) * 100)}%</strong></div>
            </div>
          </div>

          <div style="font-size: 1.15rem; color: #E8A0A8; margin: 16px 0 10px 0; background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; font-family: monospace; border-left: 3px solid #C0392B;">
            Vibra = [ Σ (0.82^i · √P_i · 12) ] × [ 1 + 0.40 · (D_activos / 7) ]
          </div>

          <p style="font-size: 0.85rem; color: #D7CCC8; line-height: 1.5; margin: 0;">
            <strong>Principio Fundamental:</strong> <em>"Suma más hacer poco durante varios días que mucho durante un solo día"</em>. La raíz cuadrada amortigua picos aislados (hacer 1 punto en 4 días rinde el doble de base que 4 puntos en 1 día), mientras que el factor de decaimiento 0.82^i y el bono de racha premian mantener viva la energía cotidiana.
          </p>
        </div>

        <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #0E0E13; margin: 14px 0 8px 0;">📜 Historial Ponderado de los Últimos 7 Días:</h4>
        <table class="kcd-comparison-table" style="margin-bottom: 16px;">
          <thead>
            <tr>
              <th>Día</th>
              <th>Fecha</th>
              <th>Puntos Realizados</th>
              <th>Factor Decaimiento</th>
              <th>Energía Calculada</th>
            </tr>
          </thead>
          <tbody>
            ${v.history.map(h => `
              <tr>
                <td style="font-weight: 700;">${h.dayIndex === 0 ? 'Hoy (Día 0)' : `Hace ${h.dayIndex} días`}</td>
                <td>${h.dateStr}</td>
                <td style="font-weight: 800; color: ${h.points > 0 ? '#2E7D32' : '#718096'};">${h.points} pts</td>
                <td>0.82^${h.dayIndex} (${h.weight}x)</td>
                <td style="font-weight: 800; color: #9B2335;">+${h.energy}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn-jaguar btn-secondary-dark" onclick="openKCDInspector({ type: 'category', categoryKey: '${auraKey}' })">
            ⬅️ Volver al Pergamino de ${aura.shortName}
          </button>
        </div>
      `;
      modal.style.display = "flex";
    },

    /**
     * Gráfico de Radar / Telaraña de 9 Auras para el Códice de Daniel Santander
     */
    renderEvaluationMixChartSVG() {
      const keys = ["vida", "exploracion", "amor", "salud", "soberania", "espiritualidad", "naturaleza", "deporte", "mente"];
      const cx = 160, cy = 135, r = 85;
      const numAuras = keys.length;

      // Calcular puntos máximos y normalizar
      const points = keys.map(k => scoringState.auraPoints[k] || 0);
      const maxPt = Math.max(10, ...points);

      // Calcular vértices del polígono
      const polygonCoords = keys.map((k, i) => {
        const angle = (i * (2 * Math.PI / numAuras)) - (Math.PI / 2);
        const val = scoringState.auraPoints[k] || 0;
        const normalized = Math.max(0.12, val / maxPt);
        const px = cx + (r * normalized * Math.cos(angle));
        const py = cy + (r * normalized * Math.sin(angle));
        return `${px.toFixed(1)},${py.toFixed(1)}`;
      }).join(" ");

      // Vértices de la telaraña externa
      const outerCoords = keys.map((_, i) => {
        const angle = (i * (2 * Math.PI / numAuras)) - (Math.PI / 2);
        const px = cx + (r * Math.cos(angle));
        const py = cy + (r * Math.sin(angle));
        return { px, py, angle };
      });

      return `
        <div style="text-align: center; background: #FAF6EE; border: 1.5px solid rgba(197,154,40,0.4); border-radius: var(--radius-md); padding: 14px;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #0E0E13; margin: 0 0 6px 0;">
            🕸️ Mezcla de Evaluación de las 9 Auras
          </h4>
          <p style="font-size: 0.75rem; color: rgba(255,255,255,0.4); margin: 0 0 10px 0;">
            Equilibrio vital del Caballero Jaguar entre las 9 energías sagradas:
          </p>
          <svg viewBox="0 0 320 270" style="width: 100%; max-width: 320px; height: auto;">
            <!-- Anillos concéntricos -->
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(197,154,40,0.3)" stroke-width="1" />
            <circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="rgba(197,154,40,0.2)" stroke-width="1" stroke-dasharray="3,3" />
            <circle cx="${cx}" cy="${cy}" r="${r * 0.33}" fill="none" stroke="rgba(197,154,40,0.15)" stroke-width="1" />

            <!-- Ejes de las 9 Auras -->
            ${outerCoords.map((c, i) => {
              const k = keys[i];
              const a = CABALLERO_AURAS[k];
              const labelRadius = r + 18;
              const lx = cx + (labelRadius * Math.cos(c.angle));
              const ly = cy + (labelRadius * Math.sin(c.angle)) + 3;
              return `
                <line x1="${cx}" y1="${cy}" x2="${c.px.toFixed(1)}" y2="${c.py.toFixed(1)}" stroke="${a.baseColor}" stroke-width="1.2" opacity="0.6" />
                <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="#0E0E13" font-size="8" font-family="'Cinzel', serif" font-weight="bold" text-anchor="middle">
                  ${a.icon} ${a.shortName} (${scoringState.auraPoints[k] || 0}p)
                </text>
              `;
            }).join("")}

            <!-- Polígono de desempeño del personaje -->
            <polygon points="${polygonCoords}" fill="rgba(197,154,40,0.35)" stroke="#9B2335" stroke-width="2.2" />
          </svg>
          <div style="font-size: 0.72rem; color: #7A6347; margin-top: 6px;">
            💡 <em>Mantener las 9 auras activas expande armónicamente el escudo de caballería.</em>
          </div>
        </div>
      `;
    },

    /**
     * Reseteo de estadísticas a Día 1 (0 puntos)
     */
    resetAllStatsToDayOne() {
      scoringState.auraPoints = {
        vida: 0,
        exploracion: 0,
        amor: 0,
        salud: 0,
        soberania: 0,
        espiritualidad: 0,
        naturaleza: 0,
        deporte: 0,
        mente: 0
      };
      scoringState.dailyLog = {};
      scoringState.today = cjToday();
      saveScoringState();
    }
  };

  // Exponer globalmente
  window.CaballeroScoringEngine = ScoringEngine;

})(window);
