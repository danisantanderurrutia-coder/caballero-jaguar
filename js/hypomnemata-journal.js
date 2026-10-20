/**
 * ============================================================================
 * HYPOMNÉMATA — EL DIARIO IMPERIAL, GUARDIA TESTUDO & OBSERVATORIO INTERIOR
 * ============================================================================
 * - Gestiona el Códice de entradas personales (Hypomnémata de Marco Aurelio)
 *   con variables estructuradas (Clima Interior, Energía, Calma, Sueño, Tags,
 *   Cuidado Somático, Sello Kintsugi y Acción Controlable).
 * - Renderiza la métrica visual «Mosaico Kintsugi de Soberanía» y el protocolo
 *   «Formación Testudo» (3 Escudos de Contención para días de quiebre).
 * - Cruza las entradas del diario con el motor de experiencia (CJProgress) y
 *   las sesiones de Terapia Estoica (CJ_THERAPY_V1) para revelar correlaciones.
 */
(function (window) {
  "use strict";

  const STORAGE_KEY = "CJ_HYPOMNEMATA_V1";

  // --- MAPA DE SPRITES 3x3 (assets/sprites_hypomnemata_seals.jpg) ---
  // Fila 1: claridad (0% 0%), templanza (50% 0%), tension (100% 0%)
  // Fila 2: ira (0% 50%), quiebre (50% 50%), niebla (100% 50%)
  // Fila 3: testudo (0% 100%), pluma (50% 100%), jaguar (100% 100%)
  const SEALS = {
    claridad: {
      id: "claridad",
      name: "Claridad & Flow",
      latin: "Sol Invictus",
      pos: "0% 0%",
      color: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.14)",
      border: "rgba(245, 158, 11, 0.45)",
      desc: "Mente despejada, propósito firme y energía dirigida."
    },
    templanza: {
      id: "templanza",
      name: "Templanza & Paz",
      latin: "Aequanimitas",
      pos: "50% 0%",
      color: "#10B981",
      bg: "rgba(16, 185, 129, 0.14)",
      border: "rgba(16, 185, 129, 0.45)",
      desc: "Serenidad estoica, equilibrio interior y presencia."
    },
    tension: {
      id: "tension",
      name: "Tensión & Ansiedad",
      latin: "Fulmen Mentis",
      pos: "100% 0%",
      color: "#38BDF8",
      bg: "rgba(56, 189, 248, 0.14)",
      border: "rgba(56, 189, 248, 0.45)",
      desc: "Incertidumbre, sobrecarga eléctrica o proyección al futuro."
    },
    ira: {
      id: "ira",
      name: "Fricción & Conflicto",
      latin: "Flamma Martis",
      pos: "0% 50%",
      color: "#F43F5E",
      bg: "rgba(244, 63, 94, 0.14)",
      border: "rgba(244, 63, 94, 0.45)",
      desc: "Choque relacional, enojo o indignación que pide dilación."
    },
    quiebre: {
      id: "quiebre",
      name: "Quiebre & Kintsugi",
      latin: "Aurum in Fractura",
      pos: "50% 50%",
      color: "#E5BE53",
      bg: "rgba(197, 154, 40, 0.18)",
      border: "rgba(229, 190, 83, 0.65)",
      desc: "Golpe emocional, duelo o agotamiento sostenido con oro y templanza."
    },
    niebla: {
      id: "niebla",
      name: "Fatiga & Niebla",
      latin: "Noctis Nebula",
      pos: "100% 50%",
      color: "#94A3B8",
      bg: "rgba(148, 163, 184, 0.14)",
      border: "rgba(148, 163, 184, 0.4)",
      desc: "Batería física baja, apatía o necesidad de reposo biológico."
    }
  };

  const EXTRA_SEALS = {
    testudo: { pos: "0% 100%", name: "Escudo Testudo" },
    pluma:   { pos: "50% 100%", name: "Sello de Crónica" },
    jaguar:  { pos: "100% 100%", name: "Soberanía Jaguar" }
  };

  const TAGS = [
    { id: "pareja", label: "#pareja", icon: "❤️" },
    { id: "tesis", label: "#tesis", icon: "🎓" },
    { id: "empleo-hannover", label: "#empleo-hannover", icon: "👑" },
    { id: "finanzas", label: "#finanzas", icon: "🪙" },
    { id: "sueno", label: "#sueño", icon: "😴" },
    { id: "entrenamiento", label: "#entrenamiento", icon: "🥊" },
    { id: "soledad", label: "#soledad", icon: "🕯️" },
    { id: "impulso", label: "#impulso", icon: "⚡" },
    { id: "familia", label: "#familia", icon: "🏛️" },
    { id: "naturaleza", label: "#naturaleza", icon: "🌲" },
    { id: "quiebre", label: "#quiebre", icon: "🏺" },
    { id: "victoria", label: "#victoria", icon: "🦅" }
  ];

  const TEMPLATES = {
    kintsugi: {
      title: "Crónica de Trinchera (Kintsugi tras Quiebre)",
      mood: "quiebre",
      isKintsugi: true,
      tags: ["pareja", "quiebre"],
      energy: 3,
      calm: 3,
      body:
        "1. LOS HECHOS DESNUDOS (sin adjetivos ni lecturas de mente):\n" +
        "— Hoy ocurrió una discusión / momento de quiebre: \n\n" +
        "2. LO QUE ME DUELE O PESA EN EL CUERPO:\n" +
        "— Siento el desgaste en: \n\n" +
        "3. EL JUICIO QUE DEBO DILATAR (Séneca: no decidir en la tormenta):\n" +
        "— Mi mente quiere concluir que «...», pero elijo posponer cualquier conclusión hasta haber dormido.\n\n" +
        "4. MI VICTORIA DE CONTENCIÓN HOY:\n" +
        "— Aunque hoy no avancé en tareas externas, sostuve la línea al no empeorar el conflicto ni caer en impulsos destructivos.",
      actionNext: "Descansar hoy sin culpa; mañana hablar o actuar desde la calma con una sola acción de 15 minutos."
    },
    seneca: {
      title: "Examen Vespertino de Séneca (De Ira III)",
      mood: "templanza",
      isKintsugi: false,
      tags: [],
      energy: 7,
      calm: 8,
      body:
        "1. ¿QUÉ HICE BIEN HOY CONFORME A LA VIRTUD?\n" +
        "— \n\n" +
        "2. ¿DÓNDE FLAQUEÉ O PERDÍ EL CENTRO?\n" +
        "— \n\n" +
        "3. ¿QUÉ QUEDA EN PAZ ANTES DE DORMIR?\n" +
        "— ",
      actionNext: "Empezar mañana con mi bloque principal de foco."
    },
    carta_dilacion: {
      title: "Carta de Dilación (Para vaciar la mente sin enviarla)",
      mood: "ira",
      isKintsugi: true,
      tags: ["pareja"],
      energy: 4,
      calm: 3,
      body:
        "[CARTA QUE NO ENVIARÉ EN CALIENTE — DESCARGA PURA]\n" +
        "Lo que querría decir ahora mismo desde la herida o el enojo:\n" +
        "— \n\n" +
        "[TRADUCCIÓN ESTOICA PARA CUANDO BAJE LA MAREA]\n" +
        "Cuando ambos estemos en calma, lo que realmente necesito pedir o acordar con afecto y firmeza es:\n" +
        "— ",
      actionNext: "Esperar a estar regulado antes de tener la conversación importante."
    }
  };

  // --- ESTADO ---
  let state = {
    v: 1,
    entries: [],
    paperMode: "obsidian" // 'obsidian' | 'parchment'
  };

  let ui = {
    subtab: "escribir", // 'escribir' | 'archivo' | 'observatorio'
    editingId: null,
    selectedEntryId: null,
    filterMood: "all",
    filterTag: "all",
    onlyKintsugi: false,
    searchQuery: "",
    draft: null
  };

  const todayStr = () => (window.cjToday ? window.cjToday() : new Date().toISOString().slice(0, 10));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function defaultDraft() {
    const isTestudo = window.CJProgress && typeof window.CJProgress.isTestudoDay === "function" && window.CJProgress.isTestudoDay(todayStr());
    return {
      date: todayStr(),
      title: "",
      mood: isTestudo ? "quiebre" : "templanza",
      energy: isTestudo ? 4 : 7,
      calm: isTestudo ? 4 : 7,
      sleepHours: 7.5,
      somatic: { hidratacion: true, nutricion: true, detox: true },
      tags: isTestudo ? ["quiebre"] : [],
      isKintsugi: Boolean(isTestudo),
      body: "",
      actionNext: ""
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.entries)) {
          state = Object.assign(state, parsed);
        }
      }
    } catch (e) {
      console.error("[Hypomnemata] Error cargando estado:", e);
    }
    if (!ui.draft) ui.draft = defaultDraft();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("[Hypomnemata] Error guardando estado:", e);
    }
  }

  // --- INYECCIÓN DE ESTILOS CSS (SPRITES, KINTSUGI Y PERGAMINO) ---
  function injectStyles() {
    if (document.getElementById("hypomnemata-styles")) return;
    const st = document.createElement("style");
    st.id = "hypomnemata-styles";
    st.textContent = `
      .hypo-seal {
        display: inline-block;
        background-image: url('assets/sprites_hypomnemata_seals.jpg');
        background-size: 300% 300%;
        background-repeat: no-repeat;
        border-radius: 50%;
        box-shadow: 0 4px 14px rgba(0,0,0,0.65), inset 0 0 0 1.5px rgba(229,190,83,0.45);
        flex-shrink: 0;
      }
      .hypo-mood-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 12px;
        background: rgba(13, 18, 29, 0.85);
        border: 1.5px solid rgba(255, 255, 255, 0.08);
        color: #E2E8F0;
        cursor: pointer;
        transition: all 0.22s ease;
        text-align: left;
      }
      .hypo-mood-btn:hover {
        transform: translateY(-2px);
        border-color: rgba(229, 190, 83, 0.45);
        background: rgba(20, 27, 42, 0.95);
      }
      .hypo-mood-btn.active {
        border-width: 2px;
        box-shadow: 0 8px 22px rgba(0, 0, 0, 0.6), 0 0 16px rgba(197, 154, 40, 0.28);
      }
      /* Teselas del Mosaico Kintsugi de Soberanía */
      .kintsugi-mosaic-grid {
        display: grid;
        grid-template-columns: repeat(21, minmax(22px, 1fr));
        gap: 6px;
        align-items: center;
      }
      @media (max-width: 900px) {
        .kintsugi-mosaic-grid {
          grid-template-columns: repeat(7, 1fr);
        }
      }
      .mosaic-tessera {
        height: 36px;
        border-radius: 7px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.66rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
      }
      .mosaic-tessera:hover {
        transform: translateY(-3px) scale(1.06);
        z-index: 3;
      }
      .mosaic-tessera.conquest {
        background: linear-gradient(145deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.75) 100%);
        border: 1.5px solid #34D399;
        color: #ECFDF5;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
      }
      .mosaic-tessera.kintsugi {
        background:
          linear-gradient(125deg, transparent 36%, rgba(246, 226, 163, 0.95) 48%, #C59A28 51%, transparent 62%),
          linear-gradient(25deg, transparent 42%, rgba(229, 190, 83, 0.85) 49%, transparent 56%),
          radial-gradient(circle at 50% 50%, #1E1B2E 0%, #090B10 100%);
        border: 1.5px solid #F3D079;
        color: #FFFBEB;
        box-shadow: 0 0 14px rgba(197, 154, 40, 0.55), inset 0 0 8px rgba(243, 208, 121, 0.35);
      }
      .mosaic-tessera.partial {
        background: rgba(197, 154, 40, 0.14);
        border: 1px dashed rgba(197, 154, 40, 0.45);
        color: #CBD5E1;
      }
      .mosaic-tessera.empty {
        background: rgba(15, 23, 42, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.07);
        color: #64748B;
      }
      /* Hoja de Códice: Pergamino vs Obsidiana */
      .hypo-codex-sheet.parchment {
        background: radial-gradient(circle at 50% 20%, #FAF6EE 0%, #EFE4CE 70%, #E2D2B5 100%) !important;
        color: #231B12 !important;
        border: 2px solid #8C6514 !important;
        box-shadow: 0 16px 40px rgba(0,0,0,0.75), inset 0 0 32px rgba(138, 100, 36, 0.18) !important;
      }
      .hypo-codex-sheet.parchment .hypo-input,
      .hypo-codex-sheet.parchment .hypo-textarea {
        background: rgba(255, 252, 245, 0.78) !important;
        color: #1E160E !important;
        border-color: rgba(138, 100, 36, 0.45) !important;
      }
      .hypo-codex-sheet.parchment .hypo-sheet-label {
        color: #5C4018 !important;
      }
      .hypo-codex-sheet.obsidian {
        background: linear-gradient(160deg, #0D121D 0%, #090D16 100%) !important;
        color: #F4F6F9 !important;
        border: 1.5px solid rgba(197, 154, 40, 0.38) !important;
        box-shadow: 0 16px 40px rgba(0,0,0,0.75) !important;
      }
      .hypo-input, .hypo-textarea {
        width: 100%;
        box-sizing: border-box;
        background: rgba(7, 9, 14, 0.78);
        border: 1px solid rgba(197, 154, 40, 0.32);
        border-radius: 10px;
        padding: 12px 16px;
        color: #F8FAFC;
        font-size: 0.96rem;
        line-height: 1.65;
        font-family: 'Georgia', 'Times New Roman', serif;
        transition: border-color 0.2s;
      }
      .hypo-input:focus, .hypo-textarea:focus {
        outline: none;
        border-color: #E5BE53;
        box-shadow: 0 0 12px rgba(197, 154, 40, 0.25);
      }
      .hypo-tag-pill {
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 700;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(148, 163, 184, 0.25);
        color: #CBD5E1;
        cursor: pointer;
        transition: all 0.18s;
      }
      .hypo-tag-pill.active {
        background: rgba(197, 154, 40, 0.22);
        border-color: #E5BE53;
        color: #F6E2A3;
        box-shadow: 0 0 10px rgba(197, 154, 40, 0.25);
      }
      .testudo-shield-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 15px;
        border-radius: 10px;
        background: rgba(10, 13, 22, 0.78);
        border: 1px solid rgba(197, 154, 40, 0.28);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .testudo-shield-card:hover {
        border-color: #E5BE53;
        transform: translateY(-1px);
      }
      .testudo-shield-card.done {
        background: linear-gradient(135deg, rgba(197, 154, 40, 0.22) 0%, rgba(16, 185, 129, 0.12) 100%);
        border-color: #F3D079;
        box-shadow: 0 4px 14px rgba(197, 154, 40, 0.22);
      }
    `;
    document.head.appendChild(st);
  }

  function renderSealHTML(sealKey, sizePx = 42) {
    const s = SEALS[sealKey] || EXTRA_SEALS[sealKey] || SEALS.templanza;
    return `<span class="hypo-seal" style="width:${sizePx}px;height:${sizePx}px;background-position:${s.pos};" title="${esc(s.name || "")}"></span>`;
  }

  // --- RADIOGRAFÍA AUTOMÁTICA DE UN DÍA (CRUCE CON CJPROGRESS & TERAPIA) ---
  function getDayRadiography(date) {
    let xp = 0;
    const auras = {};
    let isTestudo = false;
    let shieldsDone = 0;

    if (window.CJProgress) {
      xp = window.CJProgress.dayXP(date);
      isTestudo = window.CJProgress.isTestudoDay ? window.CJProgress.isTestudoDay(date) : false;
      const tInfo = window.CJProgress.getTestudoInfo ? window.CJProgress.getTestudoInfo(date) : null;
      shieldsDone = tInfo ? tInfo.shieldsDone : 0;
    }

    try {
      const raw = localStorage.getItem("CJ_PROGRESS_V1");
      if (raw) {
        const p = JSON.parse(raw);
        if (p && Array.isArray(p.ledger)) {
          p.ledger.forEach((e) => {
            if (e.date === date && e.source !== "migracion" && e.source !== "bonus") {
              auras[e.aura] = (auras[e.aura] || 0) + (Number(e.xp) || 0);
            }
          });
        }
      }
    } catch (e) {}

    // Sesiones de Terapia Estoica en esa fecha
    let therapySessions = [];
    try {
      const traw = localStorage.getItem("CJ_THERAPY_V1");
      if (traw) {
        const tp = JSON.parse(traw);
        if (tp && Array.isArray(tp.sessions)) {
          therapySessions = tp.sessions.filter((s) => s.date === date);
        }
      }
    } catch (e) {}

    return { date, xp, auras, isTestudo, shieldsDone, therapySessions };
  }

  // --- COMPONENTE VISUAL COMPARTIDO: MOSAICO KINTSUGI & GUARDIA TESTUDO ---
  function renderMosaicBannerHTML(compact = false) {
    injectStyles();
    if (!window.CJProgress || typeof window.CJProgress.mosaic !== "function") return "";
    const today = todayStr();
    const st = window.CJProgress.streakInfo();
    const tInfo = window.CJProgress.getTestudoInfo(today);
    const tiles = window.CJProgress.mosaic(21);

    const shieldsList = [
      {
        key: "dilacion",
        title: "Escudo I · Dilación de Séneca",
        desc: "No reaccionar en caliente, no herir ni caer en válvulas dopaminérgicas.",
        aura: "Espiritualidad (+35 XP)"
      },
      {
        key: "somatica",
        title: "Escudo II · Trinchera Somática",
        desc: "Hidratación, comida limpia, bajar pulsaciones y priorizar el sueño.",
        aura: "Salud (+35 XP)"
      },
      {
        key: "descarga",
        title: "Escudo III · Catarsis en el Códice",
        desc: "Vaciar el juicio en el Diario Hypomnémata o en Terapia Estoica.",
        aura: "Mente (+35 XP)"
      }
    ];

    return `
      <div class="kintsugi-sovereignty-card" style="background: linear-gradient(145deg, rgba(16, 21, 34, 0.96) 0%, rgba(9, 12, 20, 0.98) 100%); border: 1.5px solid ${tInfo.active ? '#F3D079' : 'rgba(197, 154, 40, 0.35)'}; border-radius: 14px; padding: ${compact ? '16px 20px' : '22px 26px'}; margin-bottom: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
        <!-- CABECERA DEL MOSAICO -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            ${renderSealHTML(tInfo.active ? "quiebre" : "testudo", 52)}
            <div>
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <span style="font-family: 'Cinzel', serif; font-size: 1.12rem; font-weight: 800; color: #FFF; letter-spacing: 0.04em;">
                  🏛️ MOSAICO KINTSUGI DE SOBERANÍA (21 DÍAS)
                </span>
                <span class="badge-tag" style="background: rgba(197,154,40,0.2); border: 1px solid #E5BE53; color: #F6E2A3; font-size: 0.72rem; padding: 3px 10px;">
                  🔥 Racha: ${st.days} día(s) ${st.testudoInStreak > 0 ? `• 🏺 ${st.testudoInStreak} Guardia(s) Kintsugi` : ""}
                </span>
                <span class="badge-tag" style="background: rgba(16,185,129,0.14); border: 1px solid rgba(16,185,129,0.4); color: #6EE7B7; font-size: 0.72rem; padding: 3px 10px;" title="Promedio de días para volver a >=100 XP tras un quiebre">
                  ⚡ Recuperación: ~${st.recoveryDaysAvg}d
                </span>
              </div>
              <div style="font-size: 0.82rem; color: #94A3B8; margin-top: 4px;">
                ${tInfo.active
                  ? '🛡️ <strong style="color:#F6E2A3;">Formación Testudo Activa Hoy:</strong> Tu racha está protegida con oro Kintsugi. En días de quiebre, sostener la templanza es victoria.'
                  : 'Los días de avance brillan en <strong style="color:#34D399;">Esmeralda</strong>; los días de quiebre sostenidos con templanza se sellan en <strong style="color:#F3D079;">Obsidiana & Oro Kintsugi</strong> sin romper tu racha.'}
              </div>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN RÁPIDA -->
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button onclick="hypomnemataJournal.toggleTodayTestudo();" style="background: ${tInfo.active ? 'linear-gradient(135deg, #F3D079 0%, #C59A28 100%)' : 'rgba(197, 154, 40, 0.16)'}; color: ${tInfo.active ? '#0B0E16' : '#F6E2A3'}; border: 1.5px solid #E5BE53; padding: 8px 15px; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: all 0.2s;">
              <span>${tInfo.active ? '🏺 Guardia Kintsugi Activa (Protegido)' : '🛡️ Activar Día de Quiebre / Testudo'}</span>
            </button>
            ${compact ? `
              <button onclick="if(window.imperivmEngine && imperivmEngine.openFlowBlockModal) imperivmEngine.openFlowBlockModal('diario'); else selectMainTab('diario');" style="background: rgba(255,255,255,0.06); color: #E2E8F0; border: 1px solid rgba(255,255,255,0.18); padding: 8px 14px; border-radius: 8px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                📜 Abrir Diario Hypomnémata
              </button>
            ` : ""}
          </div>
        </div>

        <!-- FILA DE 21 TESELAS ROMANAS -->
        <div class="kintsugi-mosaic-grid" style="margin-bottom: ${tInfo.active ? '16px' : '6px'};">
          ${tiles.map((t) => {
            const dShort = t.date.slice(8, 10) + "/" + t.date.slice(5, 7);
            const isToday = t.date === today;
            const icon = t.status === "kintsugi" ? "🏺" : (t.status === "conquest" ? "✓" : (t.status === "partial" ? "•" : ""));
            const labelStatus =
              t.status === "kintsugi"
                ? `Guardia Kintsugi (${t.xp} XP)`
                : t.status === "conquest"
                ? `Conquista (${t.xp} XP)`
                : `${t.xp} XP`;
            return `
              <div class="mosaic-tessera ${t.status}"
                   style="${isToday ? 'outline: 2px solid #FFF; outline-offset: 2px;' : ''}"
                   onclick="hypomnemataJournal.inspectDate('${t.date}');"
                   title="${t.date} • ${labelStatus}">
                <span style="font-size: 0.72rem; line-height: 1;">${icon}</span>
                <span style="font-size: 0.58rem; opacity: 0.85; margin-top: 2px;">${dShort}</span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- LEYENDA COMPACTA -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.73rem; color: #94A3B8; padding-top: 6px;">
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <span><strong style="color:#34D399;">■ Esmeralda:</strong> Conquista (≥100 XP)</span>
            <span><strong style="color:#F3D079;">🏺 Kintsugi (Oro sobre Obsidiana):</strong> Quiebre sostenido con Templanza (Protege Racha)</span>
            <span><strong style="color:#CBD5E1;">▫ Bronce:</strong> Avance parcial</span>
          </div>
          <span style="color:#E5BE53;">Haz clic en cualquier tesela para ver o escribir la crónica de ese día</span>
        </div>

        <!-- PROTOCOLO DE LOS 3 ESCUDOS DE CONTENCIÓN (VISIBLE CUANDO TESTUDO ESTÁ ACTIVO) -->
        ${tInfo.active ? `
          <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(229, 190, 83, 0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #F6E2A3; letter-spacing: 0.06em; text-transform: uppercase;">
                🛡️ Protocolo de Contención en Trinchera (${tInfo.shieldsDone}/3 Escudos Completados)
              </span>
              <button onclick="hypomnemataJournal.openKintsugiTemplate();" style="background: rgba(197,154,40,0.2); border: 1px solid #E5BE53; color: #F6E2A3; border-radius: 6px; padding: 4px 10px; font-size: 0.74rem; font-weight: 700; cursor: pointer;">
                ✍️ Cargar Plantilla de Desahogo Kintsugi en el Diario
              </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px;">
              ${shieldsList.map((sh) => {
                const done = Boolean(tInfo.shields && tInfo.shields[sh.key]);
                return `
                  <div class="testudo-shield-card ${done ? 'done' : ''}" onclick="hypomnemataJournal.toggleShield('${sh.key}');">
                    <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; background: ${done ? '#F3D079' : 'rgba(255,255,255,0.08)'}; color: ${done ? '#090D16' : '#94A3B8'}; flex-shrink: 0;">
                      ${done ? "✓" : "🛡️"}
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 0.83rem; font-weight: 800; color: #FFF;">${sh.title}</div>
                      <div style="font-size: 0.74rem; color: #CBD5E1; margin-top: 2px;">${sh.desc}</div>
                      <div style="font-size: 0.68rem; color: #E5BE53; margin-top: 3px; font-weight: 700;">${sh.aura}</div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  // --- CÁLCULO DE CORRELACIONES & PATRONES PARA EL OBSERVATORIO ---
  function computeInsights() {
    const entries = state.entries || [];
    const tagStats = {};
    const moodCounts = {};
    Object.keys(SEALS).forEach((k) => (moodCounts[k] = 0));

    let totalEnergy = 0, totalCalm = 0, kintsugiEntries = 0;

    entries.forEach((e) => {
      if (moodCounts[e.mood] != null) moodCounts[e.mood]++;
      totalEnergy += Number(e.energy) || 5;
      totalCalm += Number(e.calm) || 5;
      if (e.isKintsugi || e.mood === "quiebre") kintsugiEntries++;

      const dayXP = window.CJProgress ? window.CJProgress.dayXP(e.date) : 0;
      (e.tags || []).forEach((t) => {
        if (!tagStats[t]) tagStats[t] = { count: 0, energySum: 0, calmSum: 0, xpSum: 0 };
        tagStats[t].count++;
        tagStats[t].energySum += Number(e.energy) || 5;
        tagStats[t].calmSum += Number(e.calm) || 5;
        tagStats[t].xpSum += dayXP;
      });
    });

    const tagRows = Object.entries(tagStats)
      .map(([tag, d]) => ({
        tag,
        count: d.count,
        avgEnergy: (d.energySum / d.count).toFixed(1),
        avgCalm: (d.calmSum / d.count).toFixed(1),
        avgXP: Math.round(d.xpSum / d.count)
      }))
      .sort((a, b) => b.count - a.count);

    return {
      total: entries.length,
      avgEnergy: entries.length ? (totalEnergy / entries.length).toFixed(1) : "—",
      avgCalm: entries.length ? (totalCalm / entries.length).toFixed(1) : "—",
      kintsugiEntries,
      moodCounts,
      tagRows
    };
  }

  // --- VISTAS DEL DIARIO HYPOMNÉMATA ---
  function renderWriteSubtab() {
    const d = ui.draft || defaultDraft();
    const activeSeal = SEALS[d.mood] || SEALS.templanza;
    const radio = getDayRadiography(d.date);

    return `
      <div style="display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(300px, 1fr); gap: 20px; align-items: start;">
        <!-- COLUMNA IZQUIERDA: HOJA DEL CÓDICE (ESCRITURA Y CLIMA INTERIOR) -->
        <div class="hypo-codex-sheet ${state.paperMode}" style="border-radius: 16px; padding: 26px;">
          <!-- BARRA SUPERIOR DE LA HOJA -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid rgba(197, 154, 40, 0.28); margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              ${renderSealHTML(d.mood, 48)}
              <div>
                <div style="font-family: 'Cinzel', serif; font-size: 1.18rem; font-weight: 800;">
                  ${ui.editingId ? "✏️ Editando Crónica del Códice" : "🖋️ Nueva Entrada en Hypomnémata"}
                </div>
                <div class="hypo-sheet-label" style="font-size: 0.8rem; color: #94A3B8;">
                  Clima Seleccionado: <strong>${activeSeal.name} (${activeSeal.latin})</strong>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <input type="date" value="${esc(d.date)}" onchange="hypomnemataJournal.updateDraft('date', this.value);"
                     style="background: rgba(0,0,0,0.45); color: #F6E2A3; border: 1px solid #C59A28; border-radius: 8px; padding: 6px 10px; font-weight: 700; font-size: 0.82rem;">
              <button onclick="hypomnemataJournal.togglePaperMode();"
                      style="background: rgba(197, 154, 40, 0.18); border: 1px solid #C59A28; color: ${state.paperMode === 'parchment' ? '#3B280C' : '#F6E2A3'}; border-radius: 8px; padding: 6px 12px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                ${state.paperMode === "parchment" ? "🌑 Vista Obsidiana" : "📜 Vista Pergamino"}
              </button>
            </div>
          </div>

          <!-- 1. SELECTOR DE CLIMA INTERIOR (6 MEDALLONES SPRITES) -->
          <div style="margin-bottom: 20px;">
            <label class="hypo-sheet-label" style="display: block; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #E5BE53; margin-bottom: 10px;">
              1. Sello de Clima Interior (¿Cómo está tu mundo interno hoy?)
            </label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 10px;">
              ${Object.values(SEALS).map((s) => {
                const isAct = d.mood === s.id;
                return `
                  <button type="button" class="hypo-mood-btn ${isAct ? 'active' : ''}"
                          style="${isAct ? `background:${s.bg}; border-color:${s.color};` : ''}"
                          onclick="hypomnemataJournal.selectMood('${s.id}');">
                    ${renderSealHTML(s.id, 40)}
                    <div>
                      <div style="font-weight: 800; font-size: 0.86rem; color: #FFF;">${s.name}</div>
                      <div style="font-size: 0.7rem; color: #94A3B8; font-style: italic;">${s.latin}</div>
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <!-- 2. VARIABLES SOMÁTICAS Y EMOCIONALES PARA ESTUDIO FUTURO -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; margin-bottom: 18px; background: rgba(0,0,0,0.28); padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(197,154,40,0.2);">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 6px;">
                <span>⚡ Energía Vital / Batería</span>
                <strong style="color: #F59E0B;" id="hypo-energy-val">${d.energy}/10</strong>
              </div>
              <input type="range" min="1" max="10" value="${d.energy}" style="width: 100%; accent-color: #F59E0B;"
                     oninput="document.getElementById('hypo-energy-val').textContent = this.value + '/10'; hypomnemataJournal.updateDraftSilent('energy', Number(this.value));">
              <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: #94A3B8;">
                <span>Agotado (1)</span><span>Pleno (10)</span>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 6px;">
                <span>🌊 Calma vs. Turbulencia</span>
                <strong style="color: #10B981;" id="hypo-calm-val">${d.calm}/10</strong>
              </div>
              <input type="range" min="1" max="10" value="${d.calm}" style="width: 100%; accent-color: #10B981;"
                     oninput="document.getElementById('hypo-calm-val').textContent = this.value + '/10'; hypomnemataJournal.updateDraftSilent('calm', Number(this.value));">
              <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: #94A3B8;">
                <span>Tormenta (1)</span><span>Templanza (10)</span>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 6px;">
                <span>😴 Sueño & Cuidado Base</span>
                <strong style="color: #38BDF8;" id="hypo-sleep-val">${d.sleepHours}h</strong>
              </div>
              <input type="range" min="3" max="10" step="0.5" value="${d.sleepHours}" style="width: 100%; accent-color: #38BDF8;"
                     oninput="document.getElementById('hypo-sleep-val').textContent = this.value + 'h'; hypomnemataJournal.updateDraftSilent('sleepHours', Number(this.value));">
              <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <button type="button" onclick="hypomnemataJournal.toggleSomatic('hidratacion');"
                        style="font-size: 0.68rem; padding: 3px 8px; border-radius: 6px; cursor: pointer; border: 1px solid ${d.somatic.hidratacion ? '#38BDF8' : 'rgba(255,255,255,0.15)'}; background: ${d.somatic.hidratacion ? 'rgba(56,189,248,0.2)' : 'transparent'}; color: #FFF;">
                  💧 Agua
                </button>
                <button type="button" onclick="hypomnemataJournal.toggleSomatic('nutricion');"
                        style="font-size: 0.68rem; padding: 3px 8px; border-radius: 6px; cursor: pointer; border: 1px solid ${d.somatic.nutricion ? '#10B981' : 'rgba(255,255,255,0.15)'}; background: ${d.somatic.nutricion ? 'rgba(16,185,129,0.2)' : 'transparent'}; color: #FFF;">
                  🥗 Nutrición
                </button>
                <button type="button" onclick="hypomnemataJournal.toggleSomatic('detox');"
                        style="font-size: 0.68rem; padding: 3px 8px; border-radius: 6px; cursor: pointer; border: 1px solid ${d.somatic.detox ? '#F59E0B' : 'rgba(255,255,255,0.15)'}; background: ${d.somatic.detox ? 'rgba(245,158,11,0.2)' : 'transparent'}; color: #FFF;">
                  📵 0 Impulso
                </button>
              </div>
            </div>
          </div>

          <!-- 3. DETONANTES Y VARIABLES DE CONTEXTO (#TAGS) -->
          <div style="margin-bottom: 18px;">
            <label class="hypo-sheet-label" style="display: block; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #E5BE53; margin-bottom: 8px;">
              2. Frentes y Detonantes Involucrados (Para cruzar patrones a futuro)
            </label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${TAGS.map((t) => {
                const act = (d.tags || []).includes(t.id);
                return `
                  <button type="button" class="hypo-tag-pill ${act ? 'active' : ''}"
                          onclick="hypomnemataJournal.toggleTag('${t.id}');">
                    ${t.icon} ${t.label}
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <!-- 4. PLANTILLAS RÁPIDAS DE 1 CLIC -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
            <span class="hypo-sheet-label" style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #E5BE53;">
              3. Crónica Escrita (Hypomnémata)
            </span>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" onclick="hypomnemataJournal.applyTemplate('kintsugi');"
                      style="background: rgba(197,154,40,0.2); border: 1px solid #E5BE53; color: #F6E2A3; padding: 5px 10px; border-radius: 6px; font-size: 0.73rem; font-weight: 700; cursor: pointer;">
                🏺 Plantilla Quiebre / Pelea
              </button>
              <button type="button" onclick="hypomnemataJournal.applyTemplate('carta_dilacion');"
                      style="background: rgba(244,63,94,0.16); border: 1px solid rgba(244,63,94,0.45); color: #FDA4AF; padding: 5px 10px; border-radius: 6px; font-size: 0.73rem; font-weight: 700; cursor: pointer;">
                🔥 Carta de Dilación (Séneca)
              </button>
              <button type="button" onclick="hypomnemataJournal.applyTemplate('seneca');"
                      style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4); color: #6EE7B7; padding: 5px 10px; border-radius: 6px; font-size: 0.73rem; font-weight: 700; cursor: pointer;">
                🏛️ Examen Vespertino
              </button>
            </div>
          </div>

          <input type="text" class="hypo-input" placeholder="Título de la entrada (ej. Tormenta y contención tras discusión · Reflexión nocturna)..."
                 value="${esc(d.title)}"
                 oninput="hypomnemataJournal.updateDraftSilent('title', this.value);"
                 style="margin-bottom: 12px; font-family: 'Cinzel', serif; font-weight: 700;">

          <textarea class="hypo-textarea" rows="9"
                    placeholder="Escribe con total honestidad para ti mismo, como Marco Aurelio en su tienda de campaña. Separa los hechos desnudos de los juicios..."
                    oninput="hypomnemataJournal.updateDraftSilent('body', this.value);"
                    style="margin-bottom: 14px;">${esc(d.body)}</textarea>

          <!-- 5. DICOTOMÍA DEL CONTROL: PRÓXIMO PASO -->
          <div style="margin-bottom: 18px;">
            <label class="hypo-sheet-label" style="display: block; font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #10B981; margin-bottom: 6px;">
              🎯 Dicotomía del Control: ¿Cuál es la ÚNICA acción pequeña que depende de mí ahora o mañana?
            </label>
            <input type="text" class="hypo-input" placeholder="Ej. Dormir 8h hoy sin mirar el móvil y mañana hablar con calma usando 'Cuando pasa X, siento Y'..."
                   value="${esc(d.actionNext)}"
                   oninput="hypomnemataJournal.updateDraftSilent('actionNext', this.value);"
                   style="font-family: var(--imperivm-font-body); font-size: 0.9rem;">
          </div>

          <!-- CHECKBOX KINTSUGI + GUARDAR -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; padding-top: 14px; border-top: 1px solid rgba(197,154,40,0.28);">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.84rem; font-weight: 700;">
              <input type="checkbox" ${d.isKintsugi ? "checked" : ""}
                     onchange="hypomnemataJournal.updateDraft('isKintsugi', this.checked);"
                     style="width: 18px; height: 18px; accent-color: #C59A28;">
              <span>🏺 Sellar este día como <strong>Guardia Kintsugi / Día de Quiebre</strong> (Protege tu racha con honores)</span>
            </label>

            <div style="display: flex; gap: 10px;">
              ${ui.editingId ? `
                <button type="button" onclick="hypomnemataJournal.cancelEdit();"
                        style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #CBD5E1; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer;">
                  Cancelar
                </button>
              ` : ""}
              <button type="button" onclick="hypomnemataJournal.saveEntry();"
                      style="background: linear-gradient(135deg, #F3D079 0%, #C59A28 100%); color: #090D16; border: none; padding: 11px 24px; border-radius: 10px; font-family: 'Cinzel', serif; font-weight: 900; font-size: 0.9rem; cursor: pointer; box-shadow: 0 6px 20px rgba(197,154,40,0.4);">
                📜 Sellar en el Códice (+35 XP)
              </button>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA: RADIOGRAFÍA DEL DÍA & ESPEJO ESTOICO -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- TARJETA: RADIOGRAFÍA AUTOMÁTICA DEL DÍA -->
          <div style="background: rgba(13, 18, 29, 0.95); border: 1.5px solid rgba(197, 154, 40, 0.32); border-radius: 14px; padding: 20px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              ${renderSealHTML("jaguar", 38)}
              <div>
                <div style="font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.98rem; color: #FFF;">
                  Radiografía del Día (${esc(d.date)})
                </div>
                <div style="font-size: 0.75rem; color: #94A3B8;">Datos automáticos del motor Jaguar</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
              <div style="background: rgba(0,0,0,0.35); padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.7rem; color: #94A3B8;">XP DEL DÍA</div>
                <div style="font-size: 1.25rem; font-weight: 900; color: #F6E2A3;">${radio.xp} XP</div>
              </div>
              <div style="background: rgba(0,0,0,0.35); padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.7rem; color: #94A3B8;">ESTADO DE RACHA</div>
                <div style="font-size: 0.9rem; font-weight: 800; color: ${radio.isTestudo ? '#F3D079' : (radio.xp >= 100 ? '#34D399' : '#CBD5E1')}; margin-top: 4px;">
                  ${radio.isTestudo ? "🏺 Guardia Kintsugi" : (radio.xp >= 100 ? "✓ Día Conquistado" : "En curso")}
                </div>
              </div>
            </div>

            ${Object.keys(radio.auras).length > 0 ? `
              <div style="font-size: 0.75rem; font-weight: 700; color: #E5BE53; margin-bottom: 6px; text-transform: uppercase;">Auras Cultivadas en esta Fecha:</div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
                ${Object.entries(radio.auras).map(([aura, val]) => `
                  <span style="background: rgba(197,154,40,0.15); border: 1px solid rgba(197,154,40,0.35); color: #F8FAFC; border-radius: 6px; padding: 3px 8px; font-size: 0.73rem; font-weight: 700;">
                    ${esc(aura.toUpperCase())}: +${val} XP
                  </span>
                `).join("")}
              </div>
            ` : `
              <div style="font-size: 0.78rem; color: #94A3B8; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px; margin-bottom: 12px;">
                Aún no hay XP productivo registrado en esta fecha. Si hoy fue un día de sobrecarga o pelea, activa el <strong>Sello Kintsugi</strong> o escribe tu crónica para convertir la contención en virtud.
              </div>
            `}

            <button type="button" onclick="if(window.StoicTherapy && StoicTherapy.open) StoicTherapy.open();"
                    style="width: 100%; background: rgba(92, 107, 192, 0.18); border: 1px solid rgba(129, 140, 248, 0.45); color: #E0E7FF; padding: 10px 14px; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
              🏛️ Abrir Diálogo Socrático en Terapia Estoica
            </button>
          </div>

          <!-- TARJETA: ÚLTIMAS ENTRADAS DEL CÓDICE -->
          <div style="background: rgba(13, 18, 29, 0.95); border: 1.5px solid rgba(197, 154, 40, 0.25); border-radius: 14px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.92rem; color: #F6E2A3;">
                📚 Crónicas Recientes (${state.entries.length})
              </span>
              <button type="button" onclick="hypomnemataJournal.setSubtab('archivo');"
                      style="background: transparent; border: none; color: #E5BE53; font-size: 0.76rem; font-weight: 700; cursor: pointer; text-decoration: underline;">
                Ver todas →
              </button>
            </div>
            ${state.entries.length === 0 ? `
              <p style="font-size: 0.82rem; color: #94A3B8; margin: 0;">
                Tu Códice espera su primera entrada. Usa la plantilla <strong>«🏺 Quiebre / Pelea»</strong> si quieres vaciar lo vivido hoy.
              </p>
            ` : state.entries.slice(0, 4).map((e) => {
              const s = SEALS[e.mood] || SEALS.templanza;
              return `
                <div onclick="hypomnemataJournal.openEntryDetail('${e.id}');"
                     style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; cursor: pointer; transition: all 0.18s;">
                  ${renderSealHTML(e.mood, 34)}
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.83rem; font-weight: 700; color: #FFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${esc(e.title || s.name)}
                    </div>
                    <div style="font-size: 0.7rem; color: #94A3B8;">
                      ${esc(e.date)} • ⚡${e.energy}/10 • 🌊${e.calm}/10 ${e.isKintsugi ? "• 🏺 Kintsugi" : ""}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderArchiveSubtab() {
    const filtered = state.entries.filter((e) => {
      if (ui.filterMood !== "all" && e.mood !== ui.filterMood) return false;
      if (ui.filterTag !== "all" && !(e.tags || []).includes(ui.filterTag)) return false;
      if (ui.onlyKintsugi && !e.isKintsugi && e.mood !== "quiebre") return false;
      if (ui.searchQuery) {
        const q = ui.searchQuery.toLowerCase();
        const blob = `${e.title || ""} ${e.body || ""} ${e.actionNext || ""} ${(e.tags || []).join(" ")}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    const selected = state.entries.find((e) => e.id === ui.selectedEntryId) || filtered[0] || null;

    return `
      <!-- BARRA DE FILTROS Y BUSCADOR -->
      <div style="background: rgba(13, 18, 29, 0.94); border: 1px solid rgba(197, 154, 40, 0.3); border-radius: 12px; padding: 14px 18px; margin-bottom: 18px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; flex: 1;">
          <input type="text" placeholder="🔍 Buscar palabra, reflexión o #tag..."
                 value="${esc(ui.searchQuery)}"
                 oninput="hypomnemataJournal.setSearch(this.value);"
                 style="background: rgba(0,0,0,0.45); border: 1px solid rgba(197,154,40,0.35); border-radius: 8px; padding: 8px 14px; color: #FFF; font-size: 0.84rem; min-width: 220px;">

          <select onchange="hypomnemataJournal.setFilterMood(this.value);"
                  style="background: rgba(0,0,0,0.55); border: 1px solid rgba(197,154,40,0.35); border-radius: 8px; padding: 8px 12px; color: #F6E2A3; font-size: 0.82rem; font-weight: 700;">
            <option value="all" ${ui.filterMood === "all" ? "selected" : ""}>Todos los Climas (${state.entries.length})</option>
            ${Object.values(SEALS).map((s) => `<option value="${s.id}" ${ui.filterMood === s.id ? "selected" : ""}>${s.name}</option>`).join("")}
          </select>

          <select onchange="hypomnemataJournal.setFilterTag(this.value);"
                  style="background: rgba(0,0,0,0.55); border: 1px solid rgba(197,154,40,0.35); border-radius: 8px; padding: 8px 12px; color: #CBD5E1; font-size: 0.82rem;">
            <option value="all" ${ui.filterTag === "all" ? "selected" : ""}>Todos los #Tags</option>
            ${TAGS.map((t) => `<option value="${t.id}" ${ui.filterTag === t.id ? "selected" : ""}>${t.icon} ${t.label}</option>`).join("")}
          </select>

          <button type="button" onclick="hypomnemataJournal.toggleOnlyKintsugi();"
                  style="background: ${ui.onlyKintsugi ? 'rgba(197,154,40,0.28)' : 'rgba(0,0,0,0.4)'}; border: 1px solid ${ui.onlyKintsugi ? '#F3D079' : 'rgba(255,255,255,0.15)'}; color: ${ui.onlyKintsugi ? '#F6E2A3' : '#CBD5E1'}; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
            🏺 Solo Días Kintsugi / Quiebre
          </button>
        </div>

        <button type="button" onclick="hypomnemataJournal.startNewEntry();"
                style="background: linear-gradient(135deg, #F3D079 0%, #C59A28 100%); color: #090D16; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">
          ➕ Nueva Crónica
        </button>
      </div>

      ${filtered.length === 0 ? `
        <div style="background: rgba(13,18,29,0.9); border: 1px dashed rgba(197,154,40,0.35); border-radius: 14px; padding: 40px; text-align: center;">
          <div style="margin-bottom: 12px;">${renderSealHTML("pluma", 56)}</div>
          <h3 style="font-family: 'Cinzel', serif; color: #FFF; margin: 0 0 8px 0;">Sin crónicas que coincidan con este filtro</h3>
          <p style="color: #94A3B8; font-size: 0.9rem; margin-bottom: 16px;">Cada entrada que selles aquí construirá tu archivo histórico y alimentará el Observatorio de Patrones.</p>
          <button onclick="hypomnemataJournal.setSubtab('escribir');" class="btn-jaguar btn-gold-chrome" style="color:#090D16; font-weight:800;">
            🖋️ Escribir en el Códice Ahora
          </button>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: minmax(280px, 380px) minmax(0, 1fr); gap: 20px; align-items: start;">
          <!-- LISTA LATERAL DE ENTRADAS -->
          <div style="display: flex; flex-direction: column; gap: 10px; max-height: 680px; overflow-y: auto; padding-right: 4px;">
            ${filtered.map((e) => {
              const s = SEALS[e.mood] || SEALS.templanza;
              const isSel = selected && selected.id === e.id;
              return `
                <div onclick="hypomnemataJournal.selectEntry('${e.id}');"
                     style="background: ${isSel ? 'linear-gradient(135deg, rgba(197,154,40,0.22) 0%, rgba(16,21,34,0.98) 100%)' : 'rgba(13,18,29,0.92)'}; border: 1.5px solid ${isSel ? '#F3D079' : 'rgba(255,255,255,0.08)'}; border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.18s;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    ${renderSealHTML(e.mood, 42)}
                    <div style="flex: 1; min-width: 0;">
                      <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                        <span style="font-size: 0.72rem; color: #E5BE53; font-weight: 800;">${esc(e.date)}</span>
                        ${e.isKintsugi ? `<span style="font-size: 0.65rem; background: rgba(197,154,40,0.25); border: 1px solid #F3D079; color: #F6E2A3; padding: 1px 6px; border-radius: 99px;">🏺 Kintsugi</span>` : ""}
                      </div>
                      <div style="font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.92rem; color: #FFF; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${esc(e.title || s.name)}
                      </div>
                      <div style="font-size: 0.74rem; color: #94A3B8; margin-top: 4px;">
                        ⚡ Energía ${e.energy}/10 · 🌊 Calma ${e.calm}/10 · 😴 ${e.sleepHours || 7.5}h
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <!-- VISOR DE LECTURA DEL CÓDICE -->
          ${selected ? renderSelectedEntrySheet(selected) : ""}
        </div>
      `}
    `;
  }

  function renderSelectedEntrySheet(e) {
    const s = SEALS[e.mood] || SEALS.templanza;
    const radio = getDayRadiography(e.date);
    return `
      <div class="hypo-codex-sheet ${state.paperMode}" style="border-radius: 16px; padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; padding-bottom: 16px; border-bottom: 1px solid rgba(197,154,40,0.3); margin-bottom: 18px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            ${renderSealHTML(e.mood, 56)}
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: 0.78rem; font-weight: 800; color: #C59A28; letter-spacing: 0.08em;">📅 ${esc(e.date)}</span>
                <span style="font-size: 0.74rem; padding: 2px 10px; border-radius: 99px; background: ${s.bg}; border: 1px solid ${s.color}; color: #FFF; font-weight: 700;">
                  ${s.name} (${s.latin})
                </span>
                ${e.isKintsugi ? `<span style="font-size: 0.74rem; padding: 2px 10px; border-radius: 99px; background: rgba(197,154,40,0.25); border: 1px solid #F3D079; color: #F6E2A3; font-weight: 800;">🏺 Guardia Kintsugi</span>` : ""}
              </div>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; margin: 6px 0 0 0;">
                ${esc(e.title || s.name)}
              </h3>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <button type="button" onclick="hypomnemataJournal.togglePaperMode();"
                    style="background: rgba(197,154,40,0.16); border: 1px solid #C59A28; color: ${state.paperMode === 'parchment' ? '#3B280C' : '#F6E2A3'}; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; font-weight: 700; cursor: pointer;">
              ${state.paperMode === "parchment" ? "🌑 Obsidiana" : "📜 Pergamino"}
            </button>
            <button type="button" onclick="hypomnemataJournal.editEntry('${e.id}');"
                    style="background: rgba(255,255,255,0.08); border: 1px solid rgba(197,154,40,0.4); color: inherit; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; font-weight: 700; cursor: pointer;">
              ✏️ Editar
            </button>
            <button type="button" onclick="hypomnemataJournal.deleteEntry('${e.id}');"
                    style="background: rgba(244,63,94,0.15); border: 1px solid rgba(244,63,94,0.4); color: #F43F5E; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; font-weight: 700; cursor: pointer;">
              🗑️
            </button>
          </div>
        </div>

        <!-- MÉTRICAS DEL DÍA DE LA ENTRADA -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px;">
          <span style="background: rgba(0,0,0,0.22); border: 1px solid rgba(197,154,40,0.3); padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">
            ⚡ Energía: <strong>${e.energy}/10</strong>
          </span>
          <span style="background: rgba(0,0,0,0.22); border: 1px solid rgba(197,154,40,0.3); padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">
            🌊 Calma: <strong>${e.calm}/10</strong>
          </span>
          <span style="background: rgba(0,0,0,0.22); border: 1px solid rgba(197,154,40,0.3); padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">
            😴 Sueño: <strong>${e.sleepHours || 7.5}h</strong>
          </span>
          <span style="background: rgba(0,0,0,0.22); border: 1px solid rgba(197,154,40,0.3); padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">
            🏆 XP Ganado ese día: <strong>${radio.xp} XP</strong>
          </span>
          ${(e.tags || []).map((tid) => {
            const tObj = TAGS.find((x) => x.id === tid) || { icon: "#", label: "#" + tid };
            return `<span style="background: rgba(197,154,40,0.18); border: 1px solid #C59A28; padding: 5px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">${tObj.icon} ${tObj.label}</span>`;
          }).join("")}
        </div>

        <!-- TEXTO DE LA CRÓNICA -->
        <div style="font-family: 'Georgia', serif; font-size: 1.02rem; line-height: 1.78; white-space: pre-wrap; padding: 18px 20px; border-radius: 12px; background: rgba(0,0,0,0.16); border-left: 4px solid #C59A28; margin-bottom: 18px;">${esc(e.body || "(Sin texto adicional)")}</div>

        ${e.actionNext ? `
          <div style="padding: 14px 18px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); margin-bottom: 16px;">
            <div style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; color: #10B981; margin-bottom: 4px;">
              🎯 Acción Controlable Acordada
            </div>
            <div style="font-size: 0.92rem; font-weight: 600;">${esc(e.actionNext)}</div>
          </div>
        ` : ""}

        ${radio.therapySessions.length > 0 ? `
          <div style="padding: 14px 18px; border-radius: 10px; background: rgba(92, 107, 192, 0.14); border: 1px solid rgba(129, 140, 248, 0.35);">
            <div style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; color: #818CF8; margin-bottom: 6px;">
              🏛️ Sesiones de Terapia Estoica Registradas este Día (${radio.therapySessions.length})
            </div>
            ${radio.therapySessions.map((ts) => `
              <div style="font-size: 0.84rem; margin-top: 4px;">
                • ${esc((ts.summary && ts.summary.text) || ts.facts || "Sesión de diálogo estoico")}
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderObservatorySubtab() {
    const ins = computeInsights();
    const st = window.CJProgress ? window.CJProgress.streakInfo() : { days: 0, testudoTotal30: 0, recoveryDaysAvg: 1 };

    return `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- KPIs SUPERIORES DEL OBSERVATORIO -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px;">
          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(197,154,40,0.35); border-radius: 14px; padding: 18px;">
            <div style="font-size: 0.74rem; color: #94A3B8; font-weight: 700;">CRÓNICAS SELLADAS</div>
            <div style="font-family: 'Cinzel', serif; font-size: 1.9rem; font-weight: 900; color: #FFF; margin-top: 4px;">${ins.total}</div>
            <div style="font-size: 0.75rem; color: #E5BE53; margin-top: 4px;">Archivo acumulativo de vida</div>
          </div>

          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(245,158,11,0.35); border-radius: 14px; padding: 18px;">
            <div style="font-size: 0.74rem; color: #94A3B8; font-weight: 700;">ENERGÍA VITAL MEDIA</div>
            <div style="font-family: 'Cinzel', serif; font-size: 1.9rem; font-weight: 900; color: #F59E0B; margin-top: 4px;">${ins.avgEnergy}<span style="font-size:1rem;">/10</span></div>
            <div style="font-size: 0.75rem; color: #94A3B8; margin-top: 4px;">Batería física y mental</div>
          </div>

          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(16,185,129,0.35); border-radius: 14px; padding: 18px;">
            <div style="font-size: 0.74rem; color: #94A3B8; font-weight: 700;">ÍNDICE DE TEMPLANZA / CALMA</div>
            <div style="font-family: 'Cinzel', serif; font-size: 1.9rem; font-weight: 900; color: #10B981; margin-top: 4px;">${ins.avgCalm}<span style="font-size:1rem;">/10</span></div>
            <div style="font-size: 0.75rem; color: #94A3B8; margin-top: 4px;">Regulación del sistema nervioso</div>
          </div>

          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(229,190,83,0.5); border-radius: 14px; padding: 18px;">
            <div style="font-size: 0.74rem; color: #F6E2A3; font-weight: 700;">GUARDIAS KINTSUGI (30 DÍAS)</div>
            <div style="font-family: 'Cinzel', serif; font-size: 1.9rem; font-weight: 900; color: #F3D079; margin-top: 4px;">
              ${st.testudoTotal30} <span style="font-size: 0.85rem; font-weight: 700; color: #6EE7B7;">(~${st.recoveryDaysAvg}d recup.)</span>
            </div>
            <div style="font-size: 0.75rem; color: #94A3B8; margin-top: 4px;">Quiebres contenidos sin perder la línea</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 20px;">
          <!-- TABLA DE IMPACTO POR DETONANTE (#TAG) CRUZADO CON XP -->
          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(197,154,40,0.3); border-radius: 14px; padding: 22px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
              ${renderSealHTML("jaguar", 38)}
              <div>
                <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #FFF; margin: 0;">
                  Correlación de Frentes (#Tags) vs. Estado Interno & XP
                </h4>
                <div style="font-size: 0.76rem; color: #94A3B8;">
                  Cómo afecta cada tema a tu energía, tu calma nerviosa y tu rendimiento diario de XP
                </div>
              </div>
            </div>

            ${ins.tagRows.length === 0 ? `
              <p style="color: #94A3B8; font-size: 0.86rem;">Etiqueta tus entradas con <code>#pareja</code>, <code>#tesis</code>, <code>#entrenamiento</code>, etc. para ver aquí qué factores elevan o drenan tu energía y XP.</p>
            ` : `
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(197,154,40,0.3); color: #E5BE53; text-align: left;">
                      <th style="padding: 8px;">Detonante / Tag</th>
                      <th style="padding: 8px;">Entradas</th>
                      <th style="padding: 8px;">Energía Media</th>
                      <th style="padding: 8px;">Calma Media</th>
                      <th style="padding: 8px;">XP Diario Medio</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ins.tagRows.map((r) => {
                      const tObj = TAGS.find((x) => x.id === r.tag) || { icon: "#", label: "#" + r.tag };
                      return `
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <td style="padding: 10px 8px; font-weight: 700; color: #FFF;">${tObj.icon} ${tObj.label}</td>
                          <td style="padding: 10px 8px; color: #CBD5E1;">${r.count}</td>
                          <td style="padding: 10px 8px; color: #F59E0B; font-weight: 700;">⚡ ${r.avgEnergy}/10</td>
                          <td style="padding: 10px 8px; color: ${Number(r.avgCalm) < 5 ? '#F43F5E' : '#10B981'}; font-weight: 700;">🌊 ${r.avgCalm}/10</td>
                          <td style="padding: 10px 8px; color: #F6E2A3; font-weight: 800;">${r.avgXP} XP</td>
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>

          <!-- DISTRIBUCIÓN DE CLIMAS INTERIORES -->
          <div style="background: rgba(13,18,29,0.95); border: 1.5px solid rgba(197,154,40,0.3); border-radius: 14px; padding: 22px;">
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #FFF; margin: 0 0 14px 0;">
              Distribución de Climas Interiores
            </h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${Object.values(SEALS).map((s) => {
                const count = ins.moodCounts[s.id] || 0;
                const pct = ins.total ? Math.round((count / ins.total) * 100) : 0;
                return `
                  <div style="display: flex; align-items: center; gap: 10px;">
                    ${renderSealHTML(s.id, 32)}
                    <div style="flex: 1;">
                      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 4px;">
                        <span style="color: #FFF;">${s.name}</span>
                        <span style="color: ${s.color};">${count} (${pct}%)</span>
                      </div>
                      <div style="height: 7px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
                        <div style="width: ${pct}%; height: 100%; background: ${s.color}; border-radius: 99px;"></div>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildJournalHTML(inDrawer = false) {
    return `
      <!-- BANNER CINEMATOGRÁFICO DEL DIARIO HYPOMNÉMATA -->
      <div style="position: relative; border-radius: 16px; overflow: hidden; min-height: ${inDrawer ? '140px' : '165px'}; border: 1.5px solid var(--imperivm-border-gold); box-shadow: 0 12px 32px rgba(0,0,0,0.7); margin-bottom: 18px; background: #07090E;">
        <img src="assets/banner_hypomnemata.jpg" alt="Hypomnémata Codex" style="width: 100%; height: ${inDrawer ? '155px' : '185px'}; object-fit: cover; object-position: center 45%; filter: brightness(0.68) contrast(1.08);">
        <div style="position: absolute; inset: 0; padding: 18px 24px; background: linear-gradient(90deg, rgba(7,9,14,0.94) 0%, rgba(13,18,29,0.78) 55%, rgba(7,9,14,0.35) 100%); display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
            <span class="badge-tag badge-gold" style="font-size: 0.72rem;">📜 HYPOMNÉMATA • CÓDICE PERSONAL & KINTSUGI</span>
            ${inDrawer ? `
              <button type="button" onclick="if(window.imperivmEngine) imperivmEngine.closeDrawer(); selectMainTab('diario');"
                      style="background: rgba(197,154,40,0.22); border: 1px solid #F3D079; color: #F6E2A3; border-radius: 6px; padding: 4px 10px; font-size: 0.72rem; font-weight: 800; cursor: pointer;">
                ⛶ Expandir en Pantalla Completa
              </button>
            ` : `
              <button type="button" onclick="selectMainTab('dashboard');"
                      style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #FFF; border-radius: 6px; padding: 5px 12px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                ← Volver al Plan de Hoy
              </button>
            `}
          </div>
          <h2 style="font-family: 'Cinzel', serif; font-size: ${inDrawer ? '1.45rem' : '1.85rem'}; color: #FFF; margin: 6px 0 4px 0; text-shadow: 0 2px 12px rgba(0,0,0,0.9);">
            Hypomnémata — El Diario & Observatorio Interior
          </h2>
          <p style="font-size: 0.84rem; color: #CBD5E1; max-width: 720px; margin: 0;">
            «No nos perturban las cosas, sino los juicios que hacemos sobre ellas.» — Registra tus días de victoria y convierte tus días de quiebre en cicatrices de oro (Kintsugi) sin perder tu racha.
          </p>
        </div>
      </div>

      <!-- MÉTRICA VISUAL: MOSAICO KINTSUGI DE SOBERANÍA & PROTOCOLO TESTUDO -->
      ${renderMosaicBannerHTML(false)}

      <!-- BARRA DE SUB-PESTAÑAS DEL DIARIO -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; border-bottom: 1px solid rgba(197,154,40,0.25); padding-bottom: 12px;">
        <button type="button" onclick="hypomnemataJournal.setSubtab('escribir');"
                style="padding: 10px 20px; border-radius: 10px; font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.86rem; cursor: pointer; border: 1.5px solid ${ui.subtab === 'escribir' ? '#F3D079' : 'rgba(255,255,255,0.12)'}; background: ${ui.subtab === 'escribir' ? 'linear-gradient(135deg, rgba(197,154,40,0.28), rgba(13,18,29,0.95))' : 'rgba(13,18,29,0.8)'}; color: ${ui.subtab === 'escribir' ? '#F6E2A3' : '#CBD5E1'};">
          🖋️ Escribir en el Códice
        </button>
        <button type="button" onclick="hypomnemataJournal.setSubtab('archivo');"
                style="padding: 10px 20px; border-radius: 10px; font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.86rem; cursor: pointer; border: 1.5px solid ${ui.subtab === 'archivo' ? '#F3D079' : 'rgba(255,255,255,0.12)'}; background: ${ui.subtab === 'archivo' ? 'linear-gradient(135deg, rgba(197,154,40,0.28), rgba(13,18,29,0.95))' : 'rgba(13,18,29,0.8)'}; color: ${ui.subtab === 'archivo' ? '#F6E2A3' : '#CBD5E1'};">
          📚 Archivo de Crónicas (${state.entries.length})
        </button>
        <button type="button" onclick="hypomnemataJournal.setSubtab('observatorio');"
                style="padding: 10px 20px; border-radius: 10px; font-family: 'Cinzel', serif; font-weight: 800; font-size: 0.86rem; cursor: pointer; border: 1.5px solid ${ui.subtab === 'observatorio' ? '#F3D079' : 'rgba(255,255,255,0.12)'}; background: ${ui.subtab === 'observatorio' ? 'linear-gradient(135deg, rgba(197,154,40,0.28), rgba(13,18,29,0.95))' : 'rgba(13,18,29,0.8)'}; color: ${ui.subtab === 'observatorio' ? '#F6E2A3' : '#CBD5E1'};">
          🔭 Observatorio de Patrones & Correlaciones
        </button>
      </div>

      <!-- CONTENIDO DE LA SUB-PESTAÑA ACTIVA -->
      <div>
        ${ui.subtab === "escribir" ? renderWriteSubtab() : (ui.subtab === "archivo" ? renderArchiveSubtab() : renderObservatorySubtab())}
      </div>
    `;
  }

  function render() {
    injectStyles();
    const container = document.getElementById("hypomnemata-master-container");
    if (container) {
      container.innerHTML = buildJournalHTML(false);
    }
    const drawerMount = document.getElementById("hypomnemata-drawer-mount");
    if (drawerMount) {
      drawerMount.innerHTML = buildJournalHTML(true);
    }
  }

  // --- CONTROLADORES PÚBLICOS ---
  const api = {
    SEALS,
    TAGS,
    init() {
      load();
      injectStyles();
      render();
    },
    render,
    buildJournalHTML,
    renderMosaicBannerHTML,
    renderSealHTML,
    setSubtab(tab) {
      ui.subtab = tab;
      render();
    },
    togglePaperMode() {
      state.paperMode = state.paperMode === "parchment" ? "obsidian" : "parchment";
      save();
      render();
    },
    selectMood(moodId) {
      if (!ui.draft) ui.draft = defaultDraft();
      ui.draft.mood = moodId;
      if (moodId === "quiebre") ui.draft.isKintsugi = true;
      render();
    },
    updateDraft(key, val) {
      if (!ui.draft) ui.draft = defaultDraft();
      ui.draft[key] = val;
      render();
    },
    updateDraftSilent(key, val) {
      if (!ui.draft) ui.draft = defaultDraft();
      ui.draft[key] = val;
    },
    toggleSomatic(key) {
      if (!ui.draft) ui.draft = defaultDraft();
      if (!ui.draft.somatic) ui.draft.somatic = { hidratacion: true, nutricion: true, detox: true };
      ui.draft.somatic[key] = !ui.draft.somatic[key];
      render();
    },
    toggleTag(tagId) {
      if (!ui.draft) ui.draft = defaultDraft();
      if (!Array.isArray(ui.draft.tags)) ui.draft.tags = [];
      const i = ui.draft.tags.indexOf(tagId);
      if (i >= 0) ui.draft.tags.splice(i, 1);
      else ui.draft.tags.push(tagId);
      render();
    },
    applyTemplate(tplKey) {
      const tpl = TEMPLATES[tplKey];
      if (!tpl) return;
      if (!ui.draft) ui.draft = defaultDraft();
      ui.draft.title = tpl.title;
      ui.draft.mood = tpl.mood;
      ui.draft.isKintsugi = tpl.isKintsugi;
      ui.draft.energy = tpl.energy;
      ui.draft.calm = tpl.calm;
      ui.draft.tags = tpl.tags.slice();
      ui.draft.body = tpl.body;
      ui.draft.actionNext = tpl.actionNext;
      render();
    },
    openKintsugiTemplate() {
      ui.subtab = "escribir";
      this.applyTemplate("kintsugi");
      if (window.imperivmEngine && typeof window.imperivmEngine.openFlowBlockModal === "function") {
        window.imperivmEngine.openFlowBlockModal("diario");
      } else if (typeof window.selectMainTab === "function") {
        window.selectMainTab("diario");
      }
    },
    saveEntry() {
      if (!ui.draft) return;
      const d = ui.draft;
      if (!d.body.trim() && !d.title.trim()) {
        if (typeof window.showNotification === "function") {
          window.showNotification("⚠️ Escribe al menos unas líneas o elige una plantilla antes de sellar la entrada.");
        }
        return;
      }

      const entryObj = {
        id: ui.editingId || ("h" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)),
        ts: Date.now(),
        date: d.date || todayStr(),
        title: d.title.trim() || (SEALS[d.mood] ? SEALS[d.mood].name : "Crónica del Día"),
        mood: d.mood || "templanza",
        energy: Number(d.energy) || 5,
        calm: Number(d.calm) || 5,
        sleepHours: Number(d.sleepHours) || 7.5,
        somatic: Object.assign({ hidratacion: true, nutricion: true, detox: true }, d.somatic),
        tags: Array.isArray(d.tags) ? d.tags.slice() : [],
        isKintsugi: Boolean(d.isKintsugi),
        body: d.body.trim(),
        actionNext: (d.actionNext || "").trim()
      };

      if (ui.editingId) {
        const idx = state.entries.findIndex((x) => x.id === ui.editingId);
        if (idx >= 0) state.entries[idx] = entryObj;
        else state.entries.unshift(entryObj);
      } else {
        state.entries.unshift(entryObj);
      }

      state.entries.sort((a, b) => (b.date.localeCompare(a.date) || (b.ts - a.ts)));
      save();

      // Si marcó Guardia Kintsugi, activar Testudo y el Escudo III (Descarga en el Códice)
      if (entryObj.isKintsugi && window.CJProgress) {
        if (!window.CJProgress.isTestudoDay(entryObj.date)) {
          window.CJProgress.toggleTestudoDay(entryObj.date, entryObj.title);
        }
        const tInfo = window.CJProgress.getTestudoInfo(entryObj.date);
        if (tInfo && (!tInfo.shields || !tInfo.shields.descarga)) {
          window.CJProgress.toggleTestudoShield("descarga", entryObj.date);
        }
      }

      if (window.awardXP) {
        window.awardXP(
          35,
          `Crónica sellada en Hypomnémata: ${entryObj.title.slice(0, 48)}`,
          entryObj.isKintsugi ? "espiritualidad" : "mente",
          "hypomnemata-entry-" + entryObj.date
        );
      }

      ui.editingId = null;
      ui.selectedEntryId = entryObj.id;
      ui.draft = defaultDraft();
      ui.subtab = "archivo";
      render();
      if (window.imperivmEngine && typeof window.imperivmEngine.render === "function") {
        window.imperivmEngine.render();
      }
    },
    openEntryDetail(id) {
      ui.selectedEntryId = id;
      ui.subtab = "archivo";
      render();
    },
    selectEntry(id) {
      ui.selectedEntryId = id;
      render();
    },
    editEntry(id) {
      const e = state.entries.find((x) => x.id === id);
      if (!e) return;
      ui.editingId = e.id;
      ui.draft = JSON.parse(JSON.stringify(e));
      ui.subtab = "escribir";
      render();
    },
    cancelEdit() {
      ui.editingId = null;
      ui.draft = defaultDraft();
      render();
    },
    deleteEntry(id) {
      state.entries = state.entries.filter((x) => x.id !== id);
      if (ui.selectedEntryId === id) ui.selectedEntryId = state.entries[0] ? state.entries[0].id : null;
      save();
      render();
    },
    startNewEntry() {
      ui.editingId = null;
      ui.draft = defaultDraft();
      ui.subtab = "escribir";
      render();
    },
    setSearch(q) {
      ui.searchQuery = q;
      render();
    },
    setFilterMood(m) {
      ui.filterMood = m;
      render();
    },
    setFilterTag(t) {
      ui.filterTag = t;
      render();
    },
    toggleOnlyKintsugi() {
      ui.onlyKintsugi = !ui.onlyKintsugi;
      render();
    },
    toggleTodayTestudo() {
      if (window.CJProgress && typeof window.CJProgress.toggleTestudoDay === "function") {
        const info = window.CJProgress.toggleTestudoDay(todayStr(), "Día de Contención / Guardia Kintsugi");
        if (ui.draft && ui.draft.date === todayStr()) {
          ui.draft.isKintsugi = info.active;
          if (info.active) ui.draft.mood = "quiebre";
        }
        if (window.imperivmEngine && typeof window.imperivmEngine.switchWeeklyMood === "function") {
          window.imperivmEngine.switchWeeklyMood(info.active ? "testudo" : "emergency", true);
        }
      }
      render();
      if (window.imperivmEngine && typeof window.imperivmEngine.render === "function") {
        window.imperivmEngine.render();
      }
    },
    toggleShield(shieldKey) {
      if (window.CJProgress && typeof window.CJProgress.toggleTestudoShield === "function") {
        window.CJProgress.toggleTestudoShield(shieldKey, todayStr());
      }
      render();
      if (window.imperivmEngine && typeof window.imperivmEngine.render === "function") {
        window.imperivmEngine.render();
      }
    },
    inspectDate(dateStr) {
      const existing = state.entries.find((e) => e.date === dateStr);
      if (existing) {
        ui.selectedEntryId = existing.id;
        ui.subtab = "archivo";
      } else {
        ui.editingId = null;
        ui.draft = defaultDraft();
        ui.draft.date = dateStr;
        if (window.CJProgress && window.CJProgress.isTestudoDay(dateStr)) {
          ui.draft.isKintsugi = true;
          ui.draft.mood = "quiebre";
        }
        ui.subtab = "escribir";
      }
      if (window.imperivmEngine && typeof window.imperivmEngine.openFlowBlockModal === "function") {
        window.imperivmEngine.openFlowBlockModal("diario");
      } else if (typeof window.selectMainTab === "function") {
        window.selectMainTab("diario");
      }
      render();
    }
  };

  load();
  window.hypomnemataJournal = api;
})(window);
