/**
 * ============================================================================
 * IMPERIVM ENGINE • MOTOR CINEMÁTICO & VISOR HORIZONTAL STREAMING (NETFLIX UX)
 * Filosofía: Roma Imperial Clásica, Senado, Cursus Honorum, Vexilla & Modo Flow
 * ============================================================================
 */

// 1. BANCO DE IMÁGENES CURADAS EN ALTA RESOLUCIÓN (LOCAL ASSETS & UNSPLASH)
const IMPERIVM_MEDIA = {
  // Modo Flow & Ritmo Circadiano (Banners generados)
  aurora: "assets/banner_meditacion.jpg",
  meridies: "assets/banner_progresion.jpg",
  vespera: "assets/banner_lectura.jpg",
  nutricion: "assets/banner_ayurveda.jpg",
  nutricion_ayurveda: "assets/banner_ayurveda.jpg",
  gym: "assets/banner_entrenamiento_campus.jpg",
  outfit: "assets/outfit_look_jueves.jpg",
  tareas: "assets/banner_proyectos.jpg",

  // Outfits representativos por día (Assets generados)
  outfit_lunes: "assets/outfit_look_lunes.jpg",
  outfit_martes: "assets/outfit_look_martes.jpg",
  outfit_miercoles: "assets/outfit_look_miercoles.jpg",
  outfit_jueves: "assets/outfit_look_jueves.jpg",
  outfit_viernes: "assets/outfit_look_viernes.jpg",
  outfit_sabado: "assets/outfit_look_sabado.jpg",
  outfit_domingo: "assets/outfit_look_domingo.jpg",

  // Las 10 Bitácoras Imperiales (LOS 12 NUEVOS BANNERS ESTOICOS)
  bitacora_lectura: "assets/banner_lectura.jpg",
  bitacora_ayurveda: "assets/banner_ayurveda.jpg",
  bitacora_meditacion: "assets/banner_meditacion.jpg",
  bitacora_masajes: "assets/banner_masajes.jpg",
  bitacora_idiomas: "assets/banner_idiomas.jpg",
  bitacora_musica: "assets/banner_musica.jpg",
  bitacora_fotografia: "assets/banner_fotografia.jpg",
  bitacora_pintura: "assets/banner_pintura.jpg",
  bitacora_astral: "assets/banner_astral.jpg",
  bitacora_progresion: "assets/banner_progresion.jpg",

  // Finanzas & Provincias
  finanzas_fiscus: "assets/banner_finanzas_aerarium.jpg",
  finanzas_sparkasse: "assets/banner_finanzas_sparkasse.jpg",
  finanzas_chile: "assets/banner_finanzas_chile.jpg",
  finanzas_cashflow: "assets/banner_finanzas_cashflow.jpg",

  // Provincias & Campañas
  provincia_hannover: "assets/german_castle_snow_day.jpg",
  provincia_bilbao: "assets/img_lauwersmeer_coastal.jpg",
  provincia_vacaciones: "assets/banner_provincia_vacaciones.jpg",
  provincia_rewild: "assets/img_rewild_forest.jpg",
  provincia_agrotech: "assets/img_urrutia_agrotech.jpg",
  provincia_manejadores: "assets/img_incel_ai_influencer.jpg",
  provincia_piratas: "assets/img_pirates_pacific.jpg",
  provincia_divulgacion: "assets/img_ciencia_territorios.jpg",

  // Objetos & Legado
  objetos_grid: "assets/jaguar_40_items_sprite_grid.jpg",
  legado_kcd: "assets/banner_legado.jpg",
  legado_mapa: "assets/jaguar_world_map_80s.jpg",
  legado_mapa_pergamino: "assets/banner_mapa_aventuras_pergamino.jpg",

  // Deportes & Combate Legionario
  deporte_muaythai: "assets/banner_deporte_muaythai.jpg",
  deporte_escalada: "assets/banner_deporte_escalada.jpg",
  deporte_calistenia: "assets/banner_deporte_calistenia.jpg",
  deporte_running: "assets/banner_deporte_running.jpg",
  deporte_ciclismo: "assets/banner_deporte_ciclismo.jpg",

  // Los 4 Ritos Ancestrales
  rito_navajo: "assets/banner_rito_navajo.jpg",
  rito_andino: "assets/banner_rito_andino.jpg",
  rito_amazonico: "assets/banner_rito_amazonico.jpg",
  rito_jaguar: "assets/banner_rito_jaguar.jpg",

  // Módulos de Construcción (DateMaster Apex)
  construccion_nietzsche: "assets/banner_construccion_nietzsche.jpg",
  construccion_tscore: "assets/banner_construccion_tscore.jpg",
  construccion_monk: "assets/banner_construccion_monk.jpg",
  construccion_filosofia: "assets/banner_construccion_filosofia.jpg",
  construccion_biohacking: "assets/banner_construccion_biohacking.jpg",
  construccion_honor: "assets/banner_construccion_honor.jpg",

  // Academia Tantra & Maestría Sexual (DateMaster)
  tantra_breathwork: "assets/tantra_breathwork.jpg",
  tantra_touch: "assets/tantra_touch.jpg",
  tantra_karezza: "assets/tantra_karezza.jpg",
  tantra_eyegazing: "assets/tantra_eyegazing.jpg"
};

// Tabla de rangos: fuente única en js/core/progress.js (CJProgress.LEVELS)
const IMPERIVM_ROMAN_RANKS = window.CJProgress ? window.CJProgress.LEVELS : [
  { rank: 1, latin: "Tiro Legionis", title: "Legionario Iniciado", desc: "Disciplina base, templanza y cumplimiento diario.", threshold: 0, next: 1000 },
  { rank: 2, latin: "Centurio Ordinarius", title: "Centurión de Línea", desc: "Consagración profesional y dominio técnico.", threshold: 1000, next: 3500 },
  { rank: 3, latin: "Tribunus Cohortis", title: "Tribuno de Estrategia", desc: "Mando ejecutivo, investigación y proyectos.", threshold: 3500, next: 8500 },
  { rank: 4, latin: "Legatus Legionis", title: "Legado Pretoriano", desc: "Soberanía sobre frentes provinciales de vida.", threshold: 8500, next: 18000 },
  { rank: 5, latin: "Consul & Imperator", title: "Cónsul Supremo", desc: "Soberanía patrimonial, legado y maestría plena.", threshold: 18000, next: null }
];

const STOIC_QUOTES = [
  { text: "No gastes más tiempo argumentando lo que debería ser un buen hombre. Sé uno.", author: "Marco Aurelio, Meditaciones" },
  { text: "No es que tengamos poco tiempo, sino que perdemos mucho.", author: "Séneca, De la Brevedad de la Vida" },
  { text: "Primero di a ti mismo lo que serías; y luego haz lo que tengas que hacer.", author: "Epicteto, Discursos" },
  { text: "La tranquilidad perfecta consiste en el buen orden de la mente, tu propio reino.", author: "Marco Aurelio" },
  { text: "La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.", author: "Séneca" },
  { text: "El alma se tiñe del color de sus pensamientos.", author: "Marco Aurelio" }
];

// Misiones de Campaña por defecto para garantizar que NUNCA aparezcan vacías
const DEFAULT_MAIN_QUESTS = [
  {
    id: "q1",
    stage: "Alemania (Hannover)",
    title: "🎓 Misión 1: Tesis (Defensa & Graduación de Máster)",
    desc: "Cierre académico del Doble Máster en Ciencias, redacción final y defensa oral aprobada con éxito.",
    completed: true,
    rewardItemId: 2,
    rewardItemName: "Delantal Académico",
    img: "assets/german_castle_snow_day.jpg",
    subQuests: [
      { id: "sq1_1", text: "📄 Entregar documento final de tesis a la comisión", completed: true },
      { id: "sq1_2", text: "📖 10 Tardes de lectura crítica y estudio profundo", completed: true },
      { id: "sq1_3", text: "🎤 Ensayar presentación oral de defensa 3 veces", completed: true },
      { id: "sq1_4", text: "🔍 Revisión minuciosa de diapositivas y bibliografía", completed: true },
      { id: "sq1_5", text: "🍷 Ceremonia y celebración formal de graduación", completed: true }
    ]
  },
  {
    id: "q2",
    stage: "Alemania (Hannover)",
    title: "🇩🇪 Misión 2: Hannover (Mudanza & Encontrar Trabajo)",
    desc: "Asentamiento residencial en Hannover y obtención de empleo formal o técnico.",
    completed: false,
    rewardItemId: 3,
    rewardItemName: "Moneda de Oro",
    img: "assets/german_castle_snow_day.jpg",
    subQuests: [
      { id: "sq2_1", text: "🏠 Encontrar piso o estudio en Hannover", completed: false },
      { id: "sq2_2", text: "🚚 Mudanza e instalación logística en Hannover", completed: false },
      { id: "sq2_3", text: "📝 Redactar Lebenslauf (CV alemán) impecable", completed: false },
      { id: "sq2_4", text: "📩 Enviar 10 postulaciones de empleo cualificadas", completed: false },
      { id: "sq2_5", text: "✒️ Firma de contrato laboral formal en Alemania", completed: false }
    ]
  },
  {
    id: "q3",
    stage: "España (Bilbao)",
    title: "🇪🇸 Misión 3: España (Trabajo, Visa 2027 & Mudanza)",
    desc: "Proceso migratorio, inserción laboral y radicación en el País Vasco (Bilbao).",
    completed: false,
    rewardItemId: 4,
    rewardItemName: "Maletín Ejecutivo",
    img: "assets/img_lauwersmeer_coastal.jpg",
    subQuests: [
      { id: "sq3_1", text: "📝 Adaptar CV al mercado de Bilbao y España", completed: false },
      { id: "sq3_2", text: "📨 Enviar 20 postulaciones a empresas e instituciones", completed: false },
      { id: "sq3_3", text: "💬 Completar 3 entrevistas técnicas de selección", completed: false },
      { id: "sq3_4", text: "✒️ Firma de contrato laboral en España", completed: false },
      { id: "sq3_5", text: "🛂 Tramitar Visa Española (Plazo límite: 30 Junio 2027)", completed: false },
      { id: "sq3_6", text: "🏡 Encontrar piso o domicilio en Bilbao", completed: false },
      { id: "sq3_7", text: "✈️ Mudanza definitiva y empadronamiento", completed: false }
    ]
  },
  {
    id: "q4",
    stage: "Europa / Internacional",
    title: "🌴 Misión 4: Vacaciones (Descanso & Desconexión Plena)",
    desc: "Restauración somática, viaje a la naturaleza marina y desconexión absoluta.",
    completed: false,
    rewardItemId: 17,
    rewardItemName: "Gafas de Viajero",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    subQuests: [
      { id: "sq4_1", text: "🗺️ Elegir destino y fijar fechas de vacaciones", completed: false },
      { id: "sq4_2", text: "🎫 Reservar pasajes y alojamiento con anticipación", completed: false },
      { id: "sq4_3", text: "🎒 Preparar equipaje minimalista de aventura", completed: false },
      { id: "sq4_4", text: "🌊 Disfrutar de 7 días de descanso y naturaleza viva", completed: false }
    ]
  }
];

let imperivmState = {
  activeViewCategory: "todo",
  activeFocusDuration: 50 * 60,
  focusTimeRemaining: 50 * 60,
  focusTimerInterval: null,
  isFocusRunning: false,
  activeDrawerTab: "nutricion",
  currentQuoteIndex: 0,
  clockInterval: null,
  activeArmamentariumFilter: "all",
  misionesView: "principales", // "principales" | "secundarias" | "conquistadas"
  cuerpoTab: "entrenamiento", // "entrenamiento" | "habitos" | "bienestar"
  cuerpoFilter: "entrenamiento", // compatibilidad con llamadas previas
  exploracionFilter: "todos", // "todos" | "intelecto" | "artes"
  activeDayTabKey: "momentos", // "momentos" | "nutricion" | "entrenamiento" | "dieta" | "outfit" | "tareas"
  savedScrollY: 0
};

// --- MÉTODOS DEL MOTOR CINEMÁTICO IMPERIVM ---
const imperivmEngine = {

  init() {
    this.startLiveClock();
    this.updateVexillumVisuals();
    this.renderHeaderCategoryPennants();
    this.ensureDrawerInDOM();
    this.initDevSectionLabels();
    this.render();
    this.setupKeyboardShortcuts();
    this.setupScrollLockGuards();
    console.log("🏛️ IMPERIVM Streaming Engine v3.2 initialized.");
  },

  // --- INSPECTOR DE SECCIONES DEV (AMPOLLETA 💡) ---
  initDevSectionLabels() {
    const isVisible = localStorage.getItem("IMPERIVM_DEV_LABELS") === "true";
    if (isVisible) {
      document.body.classList.add("dev-labels-visible");
    } else {
      document.body.classList.remove("dev-labels-visible");
    }
  },

  toggleDevSectionLabels() {
    const isNowVisible = document.body.classList.toggle("dev-labels-visible");
    localStorage.setItem("IMPERIVM_DEV_LABELS", isNowVisible ? "true" : "false");
    console.log(`💡 Modo Etiquetas de Referencia: ${isNowVisible ? 'ACTIVADO' : 'DESACTIVADO'}`);
  },

  // --- RELOJ EN VIVO QUE MANTIENE DÍA Y HORA ACTUALIZADOS CADA SEGUNDO ---
  startLiveClock() {
    clearInterval(imperivmState.clockInterval);
    const tick = () => {
      const now = new Date();
      const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const yearTwoDigits = String(year).slice(-2);

      const liveClockEl = document.getElementById("imperivm-live-clock-text");
      if (liveClockEl) {
        liveClockEl.textContent = `${hours}:${mins} • ${day}/${month}/${yearTwoDigits}`;
      }

      const celTimeEl = document.getElementById("celestial-live-time");
      if (celTimeEl) celTimeEl.textContent = `${hours}:${mins}`;

      const celDateEl = document.getElementById("celestial-live-date");
      if (celDateEl) celDateEl.textContent = `${day}/${month}/${yearTwoDigits}`;
    };

    tick();
    imperivmState.clockInterval = setInterval(tick, 1000);
  },

  getTodayKey() {
    const dayNames = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    return dayNames[new Date().getDay()];
  },

  getCharacterXP() {
    if (window.CJProgress) return window.CJProgress.totalXP();
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    if (st && st.character) {
      return Number(st.character.xp) || 0;
    }
    return 0;
  },

  getCurrentRank(xp) {
    const numericXP = Math.max(0, Number(xp) || 0);
    for (let i = IMPERIVM_ROMAN_RANKS.length - 1; i >= 0; i--) {
      if (numericXP >= IMPERIVM_ROMAN_RANKS[i].threshold) {
        const cur = IMPERIVM_ROMAN_RANKS[i];
        let progress = 100;
        if (cur.next) {
          progress = Math.min(100, Math.max(0, Math.round(((numericXP - cur.threshold) / (cur.next - cur.threshold)) * 100)));
        }
        return { ...cur, progress, currentXP: numericXP };
      }
    }
    return { ...IMPERIVM_ROMAN_RANKS[0], progress: 0, currentXP: numericXP };
  },

  // --- RENDERIZA LOS 9 BANDERINES HERÁLDICOS POR CATEGORÍA EN EL HEADER ---
  renderHeaderCategoryPennants() {
    const el = document.getElementById("header-category-pennants-bar");
    if (!el) return;

    if (typeof CaballeroScoringEngine !== "undefined" && typeof CaballeroScoringEngine.renderHangingPennantsHTML === "function") {
      el.innerHTML = CaballeroScoringEngine.renderHangingPennantsHTML();
    } else {
      const auras = [
        { key: "exploracion", name: "Exploración", icon: "🧭", color: "#0D1525", border: "rgba(92, 137, 212, 0.45)", ribbon: "#4A6999", pts: 0 },
        { key: "naturaleza", name: "Naturaleza", icon: "🌲", color: "#0C1C14", border: "rgba(76, 175, 80, 0.45)",  ribbon: "#38734C", pts: 0 },
        { key: "deporte", name: "Deporte", icon: "🥊", color: "#220D12", border: "rgba(217, 83, 79, 0.45)",  ribbon: "#A63342", pts: 0 },
        { key: "salud", name: "Salud", icon: "🌿", color: "#0B1D1D", border: "rgba(64, 180, 160, 0.45)", ribbon: "#32887C", pts: 0 },
        { key: "vida", name: "Vida", icon: "👑", color: "#250B12", border: "rgba(243, 208, 121, 0.85)", ribbon: "#E5BE53", isCentral: true, pts: 0 },
        { key: "soberania", name: "Soberanía", icon: "🪙", color: "#241408", border: "rgba(229, 190, 83, 0.55)", ribbon: "#B8860B", pts: 0 },
        { key: "amor", name: "Amor", icon: "❤️", color: "#220A1A", border: "rgba(216, 75, 148, 0.45)", ribbon: "#8E2866", pts: 0 },
        { key: "mente", name: "Mente", icon: "🧠", color: "#170E24", border: "rgba(156, 89, 219, 0.45)", ribbon: "#6C399E", pts: 0 },
        { key: "espiritualidad", name: "Espiritual", icon: "🕯️", color: "#13151D", border: "rgba(160, 174, 192, 0.45)", ribbon: "#5D6679", pts: 0 }
      ];
      el.innerHTML = `
        <div class="kcd-hanging-heraldic-pennants-row">
          ${auras.map((a, idx) => `
            <div class="kcd-heraldic-pennant-item kcd-pennant-idx-${idx} ${a.isCentral ? 'kcd-pennant-central-maestro' : ''}" 
                 onclick="openKCDInspector({ type: 'category', categoryKey: '${a.key}' })"
                 title="${a.name}: ${a.pts} Puntos • Haz clic para abrir Códice">
              <div class="kcd-pennant-hanger-ring" style="width: ${a.isCentral ? '12px' : '9px'}; height: ${a.isCentral ? '12px' : '9px'}; border: 1.5px solid ${a.ribbon}; background: #07090E; border-radius: 50%; margin-bottom: -4px; z-index: 5; box-shadow: 0 2px 4px rgba(0,0,0,0.8);"></div>
              <div class="kcd-pennant-cloth" style="height: ${a.isCentral ? '64px' : '56px'}; background: linear-gradient(180deg, ${a.color} 0%, #0A0D15 100%); border: ${a.isCentral ? '1.5px solid rgba(243, 208, 121, 0.85)' : `1px solid ${a.border}`}; box-shadow: 0 10px 24px rgba(0,0,0,0.85);">
                <span class="kcd-pennant-icon" style="font-size: ${a.isCentral ? '1.15rem' : '0.98rem'}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.9)); line-height: 1; margin-top: 3px;">${a.icon}</span>
                <div class="kcd-pennant-name-tag" style="color: ${a.isCentral ? '#F6E2A3' : '#CBD5E1'}; font-weight: ${a.isCentral ? '800' : '700'};">${a.name.slice(0, 5)}</div>
                <div class="kcd-pennant-points-badge ${a.pts > 0 ? 'badge-earned' : ''}">${a.pts}p</div>
                <div class="kcd-pennant-v-fringe" style="border-top-color: #0A0D15;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  updateVexillumVisuals() {
    const pennantEl = document.querySelector(".header-challenge-hanging-pennant");
    const daysTextEl = document.getElementById("header-challenge-days-text");
    if (!pennantEl) return;

    let days = 1;
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    if (st && st.character) {
      days = Math.max(1, Number(st.character.noPornDays || st.character.streakDays || 1));
    }

    if (daysTextEl) {
      daysTextEl.textContent = `DÍA ${days} EN VIRTUD`;
    }

    pennantEl.classList.remove("vexillum-streak-tier-1", "vexillum-streak-tier-2", "vexillum-streak-tier-3", "vexillum-streak-tier-4");

    if (days >= 15) {
      pennantEl.classList.add("vexillum-streak-tier-4");
      pennantEl.title = `🦅 Vexillum Triumphale: ${days} Días en hilo. Corona Cívica y Soberanía Plena.`;
    } else if (days >= 8) {
      pennantEl.classList.add("vexillum-streak-tier-3");
      pennantEl.title = `⚔️ Vexillum Legionis: ${days} Días en hilo. Falera de Plata & Laureles.`;
    } else if (days >= 4) {
      pennantEl.classList.add("vexillum-streak-tier-2");
      pennantEl.title = `🛡️ Vexillum Ordinarius: ${days} Días en hilo. Falera de Bronce.`;
    } else {
      pennantEl.classList.add("vexillum-streak-tier-1");
      pennantEl.title = `⚜️ Vexillum Base: Día ${days} de Templanza.`;
    }
  },

  // --- RENDERIZADO DEL VISOR MAESTRO ---
  render() {
    const container = document.getElementById("rpg-landing-master-container");
    if (!container) return;

    this.updateVexillumVisuals();
    this.renderHeaderCategoryPennants();

    container.innerHTML = `
      <div class="imperivm-ide-layout">
        
        <!-- Barra de comandos ahora integrada en la Pirámide Invertida del Hero -->

        <!-- ====================================================================
             1. HOY: PLAN DEL DÍA (CON EXPLORADOR SEMANAL DESPLEGABLE)
             ==================================================================== -->
        ${this.renderTodayFlowRail()}

        <!-- ====================================================================
             2. MISIONES Y PROYECTOS (incluye pestaña maestra: Maestría, Rangos y Armamentum)
             ==================================================================== -->
        ${this.renderMisionesRail()}

        <!-- ====================================================================
             3. CUERPO Y SALUD: DEPORTES, HÁBITOS, BIENESTAR, DATEMASTER
             ==================================================================== -->
        ${this.renderCuerpoYSaludRail()}

        <!-- ====================================================================
             4. EXPLORACIÓN PERSONAL: LECTURA, IDIOMAS, ARTES, MÚSICA & MEDITACIÓN
             ==================================================================== -->
        ${this.renderExploracionPersonalRail()}

        <!-- ====================================================================
             5. RITOS DE TEMPLANZA: LOS 4 RITOS ANCESTRALES
             ==================================================================== -->
        ${this.renderRitosAncestralesRail()}

        <!-- ====================================================================
             8. ARCHIVO DE LEGADO: BOTÓN DISCRETO AL PIE DE PÁGINA
             ==================================================================== -->
        ${this.renderLegadoFooterButton()}

      </div>

      <!-- MODAL RÁPIDO: AGREGAR TAREA (SEMANAL O DIARIA) -->
      <div id="imperivm-add-task-modal" class="imperivm-focus-overlay">
        <div class="imperivm-focus-modal" style="max-width: 480px; text-align: left; background: #0E121D; border: 1.5px solid var(--imperivm-border-gold); padding: 24px; border-radius: 12px; box-shadow: 0 12px 36px rgba(0,0,0,0.85);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="font-family: var(--imperivm-font-title); color: #FFF; margin: 0; font-size: 1.15rem;" id="add-task-modal-title">➕ Nueva Tarea</h3>
            <button onclick="imperivmEngine.closeAddTaskModal();" style="background: none; border: none; color: #FFF; font-size: 1.3rem; cursor: pointer;">&times;</button>
          </div>
          
          <input type="text" id="quick-task-title-input" placeholder="Nombre de la tarea o hito..." style="width: 100%; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 10px 12px; color: #FFF; font-size: 0.9rem; margin-bottom: 12px; outline: none;">
          
          <div style="display: flex; gap: 10px; margin-bottom: 14px;">
            <select id="quick-task-scope-select" style="flex: 1; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 8px 10px; color: #FFF; font-size: 0.82rem;">
              <option value="daily">Tarea para Hoy</option>
              <option value="weekly">Tarea Semanal</option>
            </select>
            <select id="quick-task-cat-select" style="flex: 1; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 8px 10px; color: #FFF; font-size: 0.82rem;">
              <option value="foco">Foco / Deep Work</option>
              <option value="tesis">Tesis Máster</option>
              <option value="idiomas">Alemán / Idiomas</option>
              <option value="musica">Trompeta / Jazz</option>
              <option value="finanzas">Finanzas / Sparkasse</option>
              <option value="salud">Somática / Gym</option>
            </select>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeAddTaskModal();">Cancelar</button>
            <button class="btn-imperivm-primary" onclick="imperivmEngine.saveQuickTask();">Guardar Tarea</button>
          </div>
        </div>
      </div>

      <!-- OVERLAY DE MODO FLOW / PANTALLA DE CINE -->
      <div id="imperivm-focus-overlay" class="imperivm-focus-overlay">
        <div class="imperivm-focus-modal">
          <span class="imperivm-focus-label">🏛️ IMPERIVM • MODO FLOW & CONCENTRACIÓN MONOLÍTICA</span>
          <div class="imperivm-focus-timer" id="imperivm-focus-clock">50:00</div>
          <h2 class="imperivm-focus-task-title" id="imperivm-focus-task">Deep Work & Foco de Campaña</h2>
          <p class="imperivm-focus-quote" id="imperivm-focus-quote">"El alma se tiñe del color de sus pensamientos." — Marco Aurelio</p>

          <div class="imperivm-focus-presets">
            <button class="btn-focus-preset" onclick="imperivmEngine.setFocusPreset(25);">25 MIN (Pomodoro)</button>
            <button class="btn-focus-preset active" onclick="imperivmEngine.setFocusPreset(50);">50 MIN (Deep Work)</button>
            <button class="btn-focus-preset" onclick="imperivmEngine.setFocusPreset(90);">90 MIN (Ciclo Ultratiano)</button>
          </div>

          <div class="imperivm-focus-controls">
            <button class="btn-imperivm-primary" id="btn-focus-toggle" onclick="imperivmEngine.toggleFocusTimer();">
              <span>▶ INICIAR ENFOQUE</span>
            </button>
            <button class="btn-imperivm-secondary" onclick="imperivmEngine.completeFocusEarly();">
              <span>✓ CONCLUIR (+75 XP)</span>
            </button>
            <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeFocusMode();">
              <span>✕ SALIR</span>
            </button>
        </div>
      </div>
    `;

    this.ensureDrawerInDOM();
  },

  ensureDrawerInDOM() {
  },

  // ==========================================================================
  // FILA 1: FLOW MODE DEL DÍA ACTUAL (CON EXPLORADOR SEMANAL DESPLEGABLE)
  // ==========================================================================
  renderTodayFlowRail() {
    const today = this.getTodayKey();
    const completedMap = (typeof completedSomaticBlocks !== "undefined") ? completedSomaticBlocks : JSON.parse(localStorage.getItem("completedSomaticBlocks") || "{}");

    let dayData = (typeof LIFESTYLE_ARCHITECT_DATA !== "undefined" && LIFESTYLE_ARCHITECT_DATA.dias) ? LIFESTYLE_ARCHITECT_DATA.dias[today] : null;
    let nutData = (typeof NUTRITION_PLAN_DATA !== "undefined" && NUTRITION_PLAN_DATA.dias) ? (NUTRITION_PLAN_DATA.dias[today] || NUTRITION_PLAN_DATA.dias.lunes) : null;
    let gymData = (typeof HYPERTROPHY_WORKOUT_DATA !== "undefined" && HYPERTROPHY_WORKOUT_DATA.dias) ? (HYPERTROPHY_WORKOUT_DATA.dias[today] || HYPERTROPHY_WORKOUT_DATA.dias.lunes) : null;

    // Gym safe fields
    const gymTitle = gymData ? (gymData.titulo ? gymData.titulo.split('•')[0].trim() : 'Fuerza & Musculación') : 'Fuerza & Musculación';
    const gymEnfoque = gymData ? (gymData.enfoque || 'Rutina de pesas y calistenia') : 'Rutina de pesas y calistenia';
    const gymDuracion = gymData ? (gymData.duracion || '60 min') : '60 min';

    // Tareas del día
    const allTasks = (typeof appState !== "undefined" && Array.isArray(appState.tasks)) ? appState.tasks : [];
    const dailyTasks = allTasks.filter(t => t.timeScope === "daily");

    // Outfit del día
    const outfitImg = IMPERIVM_MEDIA['outfit_' + today] || IMPERIVM_MEDIA.outfit;

    const days = [
      { key: "lunes", label: "LUNES", tema: "Fuerza Base & Inicio de Semana", img: IMPERIVM_MEDIA.outfit_lunes },
      { key: "martes", label: "MARTES", tema: "Cardio, Resistencia & Fondo", img: IMPERIVM_MEDIA.outfit_martes },
      { key: "miercoles", label: "MIÉRCOLES", tema: "Movilidad, Respiración & Core", img: IMPERIVM_MEDIA.outfit_miercoles },
      { key: "jueves", label: "JUEVES", tema: "Fuerza & Enfoque Profundo", img: IMPERIVM_MEDIA.outfit_jueves },
      { key: "viernes", label: "VIERNES", tema: "Recuperación Activa & Social", img: IMPERIVM_MEDIA.outfit_viernes },
      { key: "sabado", label: "SÁBADO", tema: "Actividad Outdoor & Combate", img: IMPERIVM_MEDIA.outfit_sabado },
      { key: "domingo", label: "DOMINGO", tema: "Descanso, Lectura & Cierre", img: IMPERIVM_MEDIA.outfit_domingo }
    ];

    return `
      <div class="imperivm-rail-section" id="rail-today-flow">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">🌅 Plan de Hoy • ${today.toUpperCase()} <span class="dev-section-label">#rail-today-flow</span></h3>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="btn-toggle-weekly-explorer" class="btn-imperivm-primary" style="padding: 6px 14px; font-size: 0.78rem; border-radius: 6px; cursor: pointer;" onclick="imperivmEngine.toggleWeeklyExplorer();">
              ${imperivmState.weeklyExplorerOpen ? '📅 Ocultar semana ▲' : '📅 Ver resto de la semana ▾'}
            </button>
            <div class="imperivm-rail-controls">
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('today-flow-track', -360);" title="Anterior">◀</button>
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('today-flow-track', 360);" title="Siguiente">▶</button>
            </div>
          </div>
        </div>

        <div class="imperivm-carousel-track" id="today-flow-track">
          
          <!-- 1. MOMENTOS DEL DÍA -->
          <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openFlowBlockModal('aurora');">
            <div class="imperivm-card-media">
              <img src="${IMPERIVM_MEDIA.aurora}" alt="Momentos del Día">
            </div>
            <div class="imperivm-card-body">
              <h4 class="imperivm-card-title">🌅 Momentos del Día</h4>
            </div>
          </div>

          <!-- 2. ROPA DEL DÍA -->
          <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openFlowBlockModal('outfit');">
            <div class="imperivm-card-media">
              <img src="${outfitImg}" alt="Vestimenta del Día" style="object-position: center 10% !important;">
            </div>
            <div class="imperivm-card-body">
              <h4 class="imperivm-card-title">🧥 Ropa del Día</h4>
            </div>
          </div>

          <!-- 3. TAREAS DEL DÍA -->
          <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openFlowBlockModal('tareas');">
            <div class="imperivm-card-media">
              <img src="${IMPERIVM_MEDIA.tareas}" alt="Tareas de Hoy">
            </div>
            <div class="imperivm-card-body">
              <h4 class="imperivm-card-title">📋 Tareas de Hoy</h4>
            </div>
          </div>

          <!-- 4. NUTRICIÓN -->
          <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openFlowBlockModal('nutricion');">
            <div class="imperivm-card-media">
              <img src="${IMPERIVM_MEDIA.nutricion}" alt="Nutrición y Comidas">
            </div>
            <div class="imperivm-card-body">
              <h4 class="imperivm-card-title">🥑 Nutrición y Comidas</h4>
            </div>
          </div>

          <!-- 5. ENTRENAMIENTO -->
          <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openFlowBlockModal('entrenamiento');">
            <div class="imperivm-card-media">
              <img src="${IMPERIVM_MEDIA.gym}" alt="Entrenamiento de Hoy" style="object-position: center top !important;">
            </div>
            <div class="imperivm-card-body">
              <h4 class="imperivm-card-title">🏋️‍♂️ ${gymTitle}</h4>
            </div>
          </div>

        </div>

        <!-- EXPLORADOR SEMANAL DESPLEGABLE DENTRO DE HOY -->
        <div id="weekly-explorer-container" style="${imperivmState.weeklyExplorerOpen ? 'display: block;' : 'display: none;'} margin-top: 24px; padding-top: 18px; border-top: 1px dashed rgba(212,175,55,0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--imperivm-text-gold); text-transform: uppercase; letter-spacing: 0.05em;">
              📅 Los 7 Días de la Semana
            </div>
            <div class="imperivm-rail-controls">
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('other-days-track', -360);" title="Anterior">◀</button>
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('other-days-track', 360);" title="Siguiente">▶</button>
            </div>
          </div>
          <div class="imperivm-carousel-track" id="other-days-track">
            ${days.map(d => `
              <div class="imperivm-card" style="cursor: pointer; ${d.key === today ? 'border-color: var(--imperivm-border-gold); box-shadow: 0 0 16px rgba(155, 35, 53, 0.25);' : ''}" onclick="imperivmEngine.openFullDayDrawer('${d.key}');">
                <div class="imperivm-card-media">
                  <img src="${d.img}" alt="${d.label}">
                </div>
                <div class="imperivm-card-body">
                  <h4 class="imperivm-card-title">${d.label}${d.key === today ? ' (Hoy)' : ''}</h4>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  },

  toggleWeeklyExplorer() {
    imperivmState.weeklyExplorerOpen = !imperivmState.weeklyExplorerOpen;
    const container = document.getElementById('weekly-explorer-container');
    const btn = document.getElementById('btn-toggle-weekly-explorer');
    if (container) {
      container.style.display = imperivmState.weeklyExplorerOpen ? 'block' : 'none';
      if (imperivmState.weeklyExplorerOpen) {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    if (btn) {
      btn.innerHTML = imperivmState.weeklyExplorerOpen ? '📅 Ocultar semana ▲' : '📅 Ver resto de la semana ▾';
    }
  },

  // ==========================================================================
  // FILA UNIFICADA: CUERPO Y SALUD (ENTRENAMIENTO, HÁBITOS & BIENESTAR)
  // ==========================================================================
  renderCuerpoYSaludRail() {
    let tab = imperivmState.cuerpoTab || imperivmState.cuerpoFilter || 'entrenamiento';
    if (tab === 'todos' || tab === 'deportes') tab = 'entrenamiento';
    if (tab === 'construccion') tab = 'habitos';
    if (tab === 'somatica') tab = 'bienestar';

    const sportsItems = [
      { id: "muaythai", title: "🥊 Muay Thai & Combate", img: IMPERIVM_MEDIA.deporte_muaythai, type: "deporte" },
      { id: "escalada", title: "🧗‍♂️ Escalada en Roca & Muro", img: IMPERIVM_MEDIA.deporte_escalada, type: "deporte" },
      { id: "calistenia", title: "🐆 Calistenia & Fuerza", img: IMPERIVM_MEDIA.deporte_calistenia, type: "deporte" },
      { id: "running", title: "🏃‍♂️ Running & Cardio", img: IMPERIVM_MEDIA.deporte_running, type: "deporte" },
      { id: "ciclismo", title: "🚴‍♂️ Ciclismo & Ruta", img: IMPERIVM_MEDIA.deporte_ciclismo, type: "deporte" }
    ];

    const habitosItems = [
      { id: "nietzsche", title: "🏛️ Conexión & Pareja", img: IMPERIVM_MEDIA.construccion_nietzsche, type: "construccion" },
      { id: "tscore", title: "📊 Vitalidad & Energía", img: IMPERIVM_MEDIA.construccion_tscore, type: "construccion" },
      { id: "monk", title: "🧠 Enfoque & Cero Distracciones", img: IMPERIVM_MEDIA.construccion_monk, type: "construccion" },
      { id: "estoicismo", title: "🏛️ Calma & Control Emocional", img: IMPERIVM_MEDIA.construccion_filosofia, type: "construccion" },
      { id: "biohacking", title: "⚡ Energía, Frío & Descanso", img: IMPERIVM_MEDIA.construccion_biohacking, type: "construccion" },
      { id: "honor", title: "👑 Código de Conducta", img: IMPERIVM_MEDIA.construccion_honor, type: "construccion" },
      { id: "tantra", title: "🔥 Presencia & Conexión Íntima", img: IMPERIVM_MEDIA.tantra_karezza, type: "construccion" },
      { id: "finanzas", title: "⚖️ Finanzas & Ahorro", img: IMPERIVM_MEDIA.finanzas_sparkasse, type: "finanzas" }
    ];

    const bienestarItems = [
      { id: "ayurveda", title: "🌿 Hábitos Digestivos & Hierbas", img: IMPERIVM_MEDIA.bitacora_ayurveda, type: "bitacora" },
      { id: "masajes", title: "💆 Alivio Muscular & Fascia", img: IMPERIVM_MEDIA.bitacora_masajes, type: "bitacora" },
      { id: "meditacion", title: "🧘 Meditación & Respiración", img: IMPERIVM_MEDIA.bitacora_meditacion, type: "bitacora" }
    ];

    const datemasterItems = [
      { id: "datemaster", title: "💘 DateMaster Apex", img: "assets/datemaster_logo.png", type: "datemaster" }
    ];

    let activeItems = sportsItems;
    if (tab === 'habitos') activeItems = habitosItems;
    else if (tab === 'bienestar') activeItems = bienestarItems;
    else if (tab === 'datemaster') activeItems = datemasterItems;

    return `
      <div class="imperivm-rail-section" id="rail-cuerpo-salud">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">🏃 Cuerpo y Salud <span class="dev-section-label">#rail-cuerpo-salud</span></h3>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div class="campaign-view-toggle-bar">
              <button class="btn-campaign-toggle ${tab === 'entrenamiento' ? 'active' : ''}" onclick="imperivmEngine.switchCuerpoTab('entrenamiento');">
                🏋️ Entrenamiento (${sportsItems.length})
              </button>
              <button class="btn-campaign-toggle ${tab === 'habitos' ? 'active' : ''}" onclick="imperivmEngine.switchCuerpoTab('habitos');">
                🏛️ Hábitos (${habitosItems.length})
              </button>
              <button class="btn-campaign-toggle ${tab === 'bienestar' ? 'active' : ''}" onclick="imperivmEngine.switchCuerpoTab('bienestar');">
                🌿 Bienestar (${bienestarItems.length})
              </button>
              <button class="btn-campaign-toggle ${tab === 'datemaster' ? 'active' : ''}" onclick="imperivmEngine.switchCuerpoTab('datemaster');" style="display: inline-flex; align-items: center; gap: 6px;">
                <img src="assets/datemaster_logo.png" alt="DateMaster" style="width: 18px; height: 18px; border-radius: 4px; object-fit: cover;" onerror="this.style.display='none'"> DateMaster
              </button>
            </div>

            <div class="imperivm-rail-controls">
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('cuerpo-salud-track', -360);" title="Anterior">◀</button>
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('cuerpo-salud-track', 360);" title="Siguiente">▶</button>
            </div>
          </div>
        </div>

        <div class="imperivm-carousel-track" id="cuerpo-salud-track">
          ${activeItems.map(it => {
            let clickHandler = '';
            if (it.type === 'deporte') {
              clickHandler = `window.openDeporteSubTab('${it.id}');`;
            } else if (it.type === 'construccion') {
              clickHandler = `imperivmEngine.openConstruccionModal('${it.id}');`;
            } else if (it.type === 'bitacora') {
              clickHandler = `imperivmEngine.openBitacoraDrawer('${it.id}');`;
            } else if (it.type === 'finanzas') {
              clickHandler = `imperivmEngine.openUnifiedFinanceDrawer();`;
            } else if (it.type === 'datemaster') {
              clickHandler = `launchDateMasterApex(event);`;
            }

            return `
              <div class="imperivm-card" style="cursor: pointer;" onclick="${clickHandler}">
                <div class="imperivm-card-media">
                  <img src="${it.img}" alt="${it.title}">
                </div>
                <div class="imperivm-card-body">
                  <h4 class="imperivm-card-title">${it.title}</h4>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  switchCuerpoTab(tab) {
    imperivmState.cuerpoTab = tab;
    imperivmState.cuerpoFilter = tab;
    const rail = document.getElementById('rail-cuerpo-salud');
    if (rail) {
      rail.outerHTML = this.renderCuerpoYSaludRail();
    }
  },

  filterCuerpoYSalud(category) {
    this.switchCuerpoTab(category);
  },

  // ==========================================================================
  // FILA 4: LOS 4 RITOS ANCESTRALES (CONEXIÓN, TEMPLANZA & DESINTOXICACIÓN)
  // ==========================================================================
  renderRitosAncestralesRail() {
    const ritos = [
      {
        key: "navaho",
        title: "Rito Navajo Diné: Hózhó",
        pueblo: "Navajo Diné • Gran Suroeste",
        badge: "NAVAJO DINÉ",
        status: "INICIACIÓN",
        tag: "🏜️ HÓZHÓ // BELLEZA PURA",
        desc: "Cabaña de humo, sahumado de cedro y comunión solemne con el Gran Espíritu.",
        img: IMPERIVM_MEDIA.rito_navajo,
        actionText: "Abrir Rito Navajo"
      },
      {
        key: "andino",
        title: "Rito Andino Quechua: Ayni",
        pueblo: "Quechua & Aymara • Los Andes",
        badge: "QUECHUA ANDINO",
        status: "INICIACIÓN",
        tag: "🏔️ AYNI // RECIPROCIDAD",
        desc: "Kintu de 3 hojas sagradas a los Apus y entrega humilde de apegos a la Pachamama.",
        img: IMPERIVM_MEDIA.rito_andino,
        actionText: "Abrir Rito Andino"
      },
      {
        key: "amazona",
        title: "Rito Vegetalista Amazónico",
        pueblo: "Shipibo & Asháninka • Selva",
        badge: "AMAZÓNICO",
        status: "INICIACIÓN",
        tag: "🌿 MAPACHO // PURGA FLORAL",
        desc: "Apertura de dieta de 21 días, cerco protector de humo puro (sin tragar) y purga floral.",
        img: IMPERIVM_MEDIA.rito_amazonico,
        actionText: "Abrir Rito Amazónico"
      },
      {
        key: "jaguar",
        title: "Rito Caballero Jaguar: Fuego Nuevo",
        pueblo: "Caballero Jaguar • Orden Imperial",
        badge: "CABALLERO JAGUAR",
        status: "INICIACIÓN",
        tag: "🐆 FUEGO NUEVO // 0 PORNO",
        desc: "Consagración del altar imperial, espejo de Tezcatlipoca y pacto de 21 días de autodominio.",
        img: IMPERIVM_MEDIA.rito_jaguar,
        actionText: "Abrir Rito Jaguar"
      }
    ];

    return `
      <div class="imperivm-rail-section" id="rail-ritos-ancestrales">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">🕯️ Ritos de Templanza & Conexión <span class="dev-section-label">#rail-ritos-ancestrales</span></h3>
          </div>
          <div class="imperivm-rail-controls">
            <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('ritos-track', -360);" title="Anterior">◀</button>
            <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('ritos-track', 360);" title="Siguiente">▶</button>
          </div>
        </div>

        <div class="imperivm-carousel-track" id="ritos-track">
          ${ritos.map(r => `
            <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openRitoModal('${r.key}');">
              <div class="imperivm-card-media">
                <img src="${r.img}" alt="${r.title}">
              </div>
              <div class="imperivm-card-body">
                <h4 class="imperivm-card-title">${r.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  openRitoModal(ritoKey) {
    console.log("[DEBUG] openRitoModal called with:", ritoKey);
    console.log("[DEBUG] window.openRitosModal type:", typeof window.openRitosModal);
    console.log("[DEBUG] window.selectRitoTab type:", typeof window.selectRitoTab);
    window.activeRitoKey = ritoKey;
    if (typeof window.openRitosModal === "function") {
      console.log("[DEBUG] Calling window.openRitosModal()");
      window.openRitosModal();
    } else {
      console.error("[DEBUG] ❌ window.openRitosModal NOT a function!");
    }
    if (typeof window.selectRitoTab === "function") {
      console.log("[DEBUG] Calling window.selectRitoTab(", ritoKey, ")");
      window.selectRitoTab(ritoKey);
    } else {
      console.error("[DEBUG] ❌ window.selectRitoTab NOT a function!");
    }
  },

  switchMisionesView(view) {
    imperivmState.misionesView = view;
    const rail = document.getElementById('rail-misiones-unificadas');
    if (rail) {
      rail.outerHTML = this.renderMisionesRail();
    }
  },

  switchCampaignView(view) {
    this.switchMisionesView(view === 'history' ? 'conquistadas' : 'principales');
  },

  // ==========================================================================
  // FILA UNIFICADA: MISIONES (PRINCIPALES, SECUNDARIAS & CONQUISTADAS)
  // ==========================================================================
  renderMisionesRail() {
    const currentView = imperivmState.misionesView || 'principales';

    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    let mainQuests = (st && Array.isArray(st.mainQuests) && st.mainQuests.length > 0) ? st.mainQuests : DEFAULT_MAIN_QUESTS;

    const activeMainQuests = mainQuests.filter(q => !q.completed);
    const completedMainQuests = mainQuests.filter(q => q.completed);

    const secondaryProjects = [
      { id: "lauwersmeer", title: "🌊 Climate Risk Lauwersmeer", category: "Investigación", desc: "Paper científico sobre modelación de riesgo climático en Holanda.", img: IMPERIVM_MEDIA.provincia_bilbao },
      { id: "rewild", title: "🔥 ReWild: Bosques & Ecosistemas", category: "Ecología", desc: "Propuesta de restauración activa del bosque nativo y plataforma.", img: IMPERIVM_MEDIA.provincia_rewild },
      { id: "urrutia", title: "🌾 Urrutia Agrotech", category: "Tecnología", desc: "Diseño predial permacultural y análisis satelital.", img: IMPERIVM_MEDIA.provincia_agrotech },
      { id: "manejadores", title: "🎭 Privacidad & Datos", category: "Software", desc: "Herramientas de soberanía de datos y privacidad digital.", img: IMPERIVM_MEDIA.provincia_manejadores },
      { id: "piratas", title: "🏴‍☠️ Cómic Piratas del Pacífico", category: "Arte", desc: "Narrativa gráfica, guión y dibujo histórico naval.", img: IMPERIVM_MEDIA.provincia_piratas },
      { id: "divulgacion", title: "🎙️ Ciencia & Territorio", category: "Divulgación", desc: "Podcast independiente, salidas de campo y difusión.", img: IMPERIVM_MEDIA.provincia_divulgacion }
    ];

    let itemsToDisplay = [];
    if (currentView === 'maestria') {
      itemsToDisplay = [];
    } else if (currentView === 'principales') {
      itemsToDisplay = activeMainQuests;
    } else if (currentView === 'secundarias') {
      itemsToDisplay = secondaryProjects;
    } else if (currentView === 'conquistadas') {
      itemsToDisplay = completedMainQuests;
    }

    return `
      <div class="imperivm-rail-section" id="rail-misiones-unificadas">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">🎯 Misiones y Proyectos <span class="dev-section-label">#rail-misiones-unificadas</span></h3>
          </div>

          <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
            <div class="campaign-view-toggle-bar">
              <button class="btn-campaign-toggle ${currentView === 'principales' ? 'active' : ''}" onclick="imperivmEngine.switchMisionesView('principales');" title="Ver misiones principales en curso">
                ⭐ Principales (${activeMainQuests.length})
              </button>
              <button class="btn-campaign-toggle ${currentView === 'secundarias' ? 'active' : ''}" onclick="imperivmEngine.switchMisionesView('secundarias');" title="Ver proyectos secundarios">
                📁 Secundarias (${secondaryProjects.length})
              </button>
              <button class="btn-campaign-toggle ${currentView === 'conquistadas' ? 'active' : ''}" onclick="imperivmEngine.switchMisionesView('conquistadas');" title="Ver misiones completadas">
                🏆 Conquistadas (${completedMainQuests.length})
              </button>
              <button class="btn-campaign-toggle ${currentView === 'maestria' ? 'active' : ''}" onclick="imperivmEngine.switchMisionesView('maestria');" title="Títulos, contratítulos, reglas de experiencia y Armamentum Imperial">
                👑 Maestría y Rangos
              </button>
            </div>

            <div class="imperivm-rail-controls">
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('misiones-track', -380);" title="Anterior">◀</button>
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('misiones-track', 380);" title="Siguiente">▶</button>
            </div>
          </div>
        </div>

        ${currentView === 'maestria' ? this.renderMaestriaStatusPanel() : ''}
        <div class="imperivm-carousel-track" id="misiones-track">
          ${currentView === 'maestria' ? this.renderMaestriaCards() : (itemsToDisplay.length > 0 ? itemsToDisplay.map((item) => {
            if (currentView === 'secundarias') {
              return `
                <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openSecondaryQuestModal('${item.id}');">
                  <div class="imperivm-card-media">
                    <img src="${item.img}" alt="${item.title}">
                  </div>
                  <div class="imperivm-card-body">
                    <h4 class="imperivm-card-title">${item.title}</h4>
                  </div>
                </div>
              `;
            } else {
              const q = item;
              const img = q.img || (q.id === 'q1' ? IMPERIVM_MEDIA.provincia_hannover : (q.id === 'q2' ? IMPERIVM_MEDIA.provincia_hannover : (q.id === 'q3' ? IMPERIVM_MEDIA.provincia_bilbao : IMPERIVM_MEDIA.provincia_vacaciones)));

              return `
                <div class="imperivm-card ${q.completed ? 'quest-conquered-card' : ''}" style="cursor: pointer;" onclick="imperivmEngine.openMainQuestModal('${q.id}');">
                  <div class="imperivm-card-media">
                    <img src="${img}" alt="${q.title}">
                  </div>
                  <div class="imperivm-card-body">
                    <h4 class="imperivm-card-title">${q.title}</h4>
                  </div>
                </div>
              `;
            }
          }).join('') : `
            <div style="padding: 24px; color: var(--imperivm-text-muted); font-size: 0.88rem; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed var(--imperivm-border); width: 100%;">
              No hay elementos en esta vista.
            </div>
          `)}
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // PESTAÑA MAESTRA (dentro de Misiones y Proyectos): MAESTRÍA, RANGOS & ARMAMENTUM
  // Reúne: 1. Títulos de Maestría · 2. Contratítulos de Vulnerabilidad ·
  //        3. Reglas de Experiencia y Rango · 4. Armamentum Imperial (objetos)
  // ==========================================================================
  renderMaestriaStatusPanel() {
    const P = window.CJProgress;
    if (!P) return "";
    const snap = P.snapshot();
    const lv = snap.level;
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    const items = (st && Array.isArray(st.inventory)) ? st.inventory : [];
    const unlocked = items.filter(i => i.unlocked).length;
    const equipped = items.filter(i => i.equipped).length;
    const titles = (st && Array.isArray(st.titles)) ? st.titles : [];
    const counterTitles = (st && Array.isArray(st.counterTitles)) ? st.counterTitles : [];
    const titlesOn = titles.filter(t => t.unlocked).length;
    const counterOn = counterTitles.filter(t => t.unlocked).length;
    const byAura = P.xpByAura(7);
    const maxAura = Math.max(1, ...Object.values(byAura));
    const auras = (window.CaballeroScoringEngine && window.CaballeroScoringEngine.auras) || {};
    const week = P.lastDays(7);
    const maxDay = Math.max(P.CONFIG.dailySoftCap, ...week.map(d => d.xp));
    const todayPct = Math.min(100, Math.round((snap.today.xp / snap.today.cap) * 100));
    const box = "background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 10px; padding: 14px;";
    const recent = P.recent(5);

    return `
      <div id="cj-maestria-panel" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin: 4px 0 14px 0;">
        <div style="${box}">
          <div style="font-size: 0.7rem; letter-spacing: 1.5px; color: var(--imperivm-text-muted);">RANGO ACTUAL</div>
          <div style="font-family: var(--imperivm-font-title); font-size: 1.15rem; color: #FFF; margin: 4px 0;">${lv.latin} · Grado ${lv.gradeRoman}</div>
          <div style="font-size: 0.8rem; color: var(--imperivm-text-muted); margin-bottom: 8px;">${lv.title} — ${lv.desc}</div>
          <div style="height: 7px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden;"><div style="height: 100%; width: ${lv.progress}%; background: linear-gradient(90deg, #B8860B, #F3D079);"></div></div>
          <div style="font-size: 0.75rem; color: #E8A0A8; margin-top: 6px;">${snap.xp.toLocaleString()} XP total ${lv.next ? `· faltan ${lv.toNext.toLocaleString()} XP para ${P.LEVELS[lv.rank].latin}` : '· rango máximo'}</div>
        </div>

        <div style="${box}">
          <div style="font-size: 0.7rem; letter-spacing: 1.5px; color: var(--imperivm-text-muted);">HOY · ${snap.today.date}</div>
          <div style="font-size: 1.15rem; color: #FFF; margin: 4px 0;">${snap.today.xp} / ${snap.today.cap} XP <span style="font-size: 0.75rem; color: var(--imperivm-text-muted);">(tope blando)</span></div>
          <div style="height: 7px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden;"><div style="height: 100%; width: ${todayPct}%; background: linear-gradient(90deg, #2E7D32, #81C784);"></div></div>
          <div style="font-size: 0.78rem; margin-top: 8px; color: ${snap.streak.todayActive ? '#81C784' : '#E8A0A8'};">
            🔥 Racha: <strong>${snap.streak.days}</strong> día(s) ${snap.streak.todayActive ? '· hoy ya cuenta ✔' : `· hoy aún no cuenta (faltan ${Math.max(0, snap.today.activeAt - snap.today.xp)} XP)`}
          </div>
          <div style="display: flex; gap: 3px; align-items: flex-end; height: 34px; margin-top: 8px;">
            ${week.map(d => `<div title="${d.date}: ${d.xp} XP" style="flex: 1; background: ${d.xp >= snap.today.activeAt ? '#B8860B' : 'rgba(255,255,255,0.15)'}; height: ${Math.max(4, Math.round((d.xp / maxDay) * 100))}%; border-radius: 2px;"></div>`).join('')}
          </div>
        </div>

        <div style="${box}">
          <div style="font-size: 0.7rem; letter-spacing: 1.5px; color: var(--imperivm-text-muted);">XP POR AURA · ÚLTIMOS 7 DÍAS</div>
          <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px;">
            ${P.AURAS.map(k => `
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: #DDD;">
                <span style="width: 92px;">${(auras[k] && auras[k].icon) || ''} ${(auras[k] && auras[k].shortName) || k}</span>
                <div style="flex: 1; height: 6px; background: rgba(0,0,0,0.5); border-radius: 3px; overflow: hidden;"><div style="height: 100%; width: ${Math.round((byAura[k] / maxAura) * 100)}%; background: ${(auras[k] && auras[k].baseColor) || '#B8860B'};"></div></div>
                <span style="width: 40px; text-align: right;">${byAura[k]}</span>
              </div>`).join('')}
          </div>
        </div>

        <div style="${box}">
          <div style="font-size: 0.7rem; letter-spacing: 1.5px; color: var(--imperivm-text-muted);">ÚLTIMOS MOVIMIENTOS DE XP</div>
          <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 8px; font-size: 0.75rem; color: #DDD;">
            ${recent.length ? recent.map(e => `
              <div style="display: flex; justify-content: space-between; gap: 8px; align-items: center;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${e.desc}">${e.date.slice(5)} · ${e.desc}</span>
                <span style="white-space: nowrap;"><strong style="color: #F3D079;">+${e.xp}</strong>
                  <button onclick="imperivmEngine.undoXPEntry('${e.id}')" title="Deshacer este movimiento" style="background: none; border: none; color: #E8A0A8; cursor: pointer;">↩</button></span>
              </div>`).join('') : '<em style="color: var(--imperivm-text-muted);">Aún no hay movimientos. Completa una tarea o bloque del plan de hoy.</em>'}
          </div>
          <div style="font-size: 0.72rem; color: var(--imperivm-text-muted); margin-top: 10px;">🎒 Armamentum: ${unlocked} desbloqueados · ${equipped} equipados${titles.length ? ` · 👑 Títulos: ${titlesOn}/${titles.length}` : ''}${counterTitles.length ? ` · 💧 Contratítulos: ${counterOn}/${counterTitles.length}` : ''}</div>
        </div>
      </div>
    `;
  },

  undoXPEntry(id) {
    if (window.CJProgress && window.CJProgress.revokeById(id)) {
      if (typeof showNotification === "function") showNotification("↩️ Movimiento de XP deshecho.");
      this.switchMisionesView('maestria');
    }
  },

  renderMaestriaCards() {
    return `
      <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openTitlesModal('virtudes');">
        <div class="imperivm-card-media"><img src="assets/jaguar_logo_renaissance.jpg" alt="Títulos de Maestría"></div>
        <div class="imperivm-card-body"><h4 class="imperivm-card-title">👑 Títulos de Maestría</h4></div>
      </div>
      <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openTitlesModal('sombras');">
        <div class="imperivm-card-media"><img src="${IMPERIVM_MEDIA.vespera}" alt="Contratítulos"></div>
        <div class="imperivm-card-body"><h4 class="imperivm-card-title">💧 Contratítulos de Vulnerabilidad</h4></div>
      </div>
      <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openRulesModal();">
        <div class="imperivm-card-media"><img src="${IMPERIVM_MEDIA.legado_kcd}" alt="Reglas de XP"></div>
        <div class="imperivm-card-body"><h4 class="imperivm-card-title">🏛️ Reglas de Experiencia & Rango</h4></div>
      </div>
      <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openArmamentariumModal();">
        <div class="imperivm-card-media"><img src="${IMPERIVM_MEDIA.objetos_grid}" alt="Armamentum Imperial"></div>
        <div class="imperivm-card-body"><h4 class="imperivm-card-title">🎒 Armamentum Imperial</h4></div>
      </div>
    `;
  },

  // ==========================================================================
  // FILA UNIFICADA: EXPLORACIÓN PERSONAL (INTELECTO, IDIOMAS, ARTES & MÚSICA)
  // ==========================================================================
  renderExploracionPersonalRail() {
    const currentFilter = (!imperivmState.exploracionFilter || imperivmState.exploracionFilter === 'all') ? 'todos' : imperivmState.exploracionFilter;

    const items = [
      // Intelecto & Filosofía
      { id: "lectura", cat: "intelecto", badge: "LECTURA", title: "📚 Lectura & Biblioteca", desc: "Obras clásicas, notas al margen y hábito diario de lectura.", img: IMPERIVM_MEDIA.bitacora_lectura },
      { id: "idiomas", cat: "intelecto", badge: "POLÍGLOTA", title: "🌐 Idiomas en Práctica", desc: "Alemán B1, Euskera A1, Portugués e Italiano activo.", img: IMPERIVM_MEDIA.bitacora_idiomas },
      { id: "astral", cat: "intelecto", badge: "CICLOS", title: "🔮 Observación & Ciclos", desc: "Tránsitos celestes, calendario y momentos de pausa.", img: IMPERIVM_MEDIA.bitacora_astral },
      { id: "progresion", cat: "intelecto", badge: "HÁBITOS", title: "📜 Sistema de Hábitos", desc: "Los 5 pilares de constancia y niveles personales.", img: IMPERIVM_MEDIA.bitacora_progresion },

      // Artes & Música
      { id: "musica", cat: "artes", badge: "MÚSICA", title: "🎺 Trompeta & Viento", desc: "Práctica de trompeta jazz, afinación y técnica de aire.", img: IMPERIVM_MEDIA.bitacora_musica },
      { id: "pintura", cat: "artes", badge: "ATELIER", title: "🎨 Pintura al Óleo", desc: "Paleta limitada de 4 colores, veladuras y bocetos.", img: IMPERIVM_MEDIA.bitacora_pintura },
      { id: "fotografia", cat: "artes", badge: "FOTOGRAFÍA", title: "📷 Fotografía de Campo", desc: "Composición de luz natural, regla áurea y archivo visual.", img: IMPERIVM_MEDIA.bitacora_fotografia }
    ];

    const filteredItems = currentFilter === 'todos' ? items : items.filter(it => it.cat === currentFilter);

    return `
      <div class="imperivm-rail-section" id="rail-exploracion-personal">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">🧭 Exploración Personal <span class="dev-section-label">#rail-exploracion-personal</span></h3>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div class="campaign-view-toggle-bar">
              <button class="btn-campaign-toggle ${currentFilter === 'todos' ? 'active' : ''}" onclick="imperivmEngine.filterExploracion('todos');">
                Todos (${items.length})
              </button>
              <button class="btn-campaign-toggle ${currentFilter === 'intelecto' ? 'active' : ''}" onclick="imperivmEngine.filterExploracion('intelecto');">
                📚 Intelecto (4)
              </button>
              <button class="btn-campaign-toggle ${currentFilter === 'artes' ? 'active' : ''}" onclick="imperivmEngine.filterExploracion('artes');">
                🎨 Arte & Música (3)
              </button>
            </div>

            <div class="imperivm-rail-controls">
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('exploracion-track', -360);" title="Anterior">◀</button>
              <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('exploracion-track', 360);" title="Siguiente">▶</button>
            </div>
          </div>
        </div>

        <div class="imperivm-carousel-track" id="exploracion-track">
          ${filteredItems.map(b => `
            <div class="imperivm-card" style="cursor: pointer;" onclick="imperivmEngine.openBitacoraDrawer('${b.id}');">
              <div class="imperivm-card-media">
                <img src="${b.img}" alt="${b.title}">
              </div>
              <div class="imperivm-card-body">
                <h4 class="imperivm-card-title">${b.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterExploracion(category) {
    imperivmState.exploracionFilter = category;
    const rail = document.getElementById('rail-exploracion-personal');
    if (rail) {
      rail.outerHTML = this.renderExploracionPersonalRail();
    }
  },

  // ==========================================================================
  // FILA 12: FISCUS & AERARIUM IMPERIAL (FINANZAS Y TESORERÍA)
  // Reúne las 4 pestañas financieras solicitadas
  // ==========================================================================
  renderFinanzasRail() {
    const finanzas = [
      { id: "sparkasse", label: "Alemania EUR", title: "🇩🇪 Sparkasse Konto", desc: "Cuenta corriente principal en Alemania para manutención, matrícula máster y vida europea.", status: "✓ AUDITADO", img: IMPERIVM_MEDIA.finanzas_sparkasse },
      { id: "chile", label: "Chile CLP", title: "🇨🇱 Banco de Chile", desc: "Fondo de solvencia patrimonial, cuentas locales en pesos chilenos y reserva de emergencia.", status: "✓ AUDITADO", img: IMPERIVM_MEDIA.finanzas_chile },
      { id: "cashflow", label: "Flujo Mensual", title: "📊 Cashflow & Presupuesto", desc: "Control de ingresos y egresos, regla 50/30/20, costos fijos y balance neto del mes.", status: "ESTRATEGIA", img: IMPERIVM_MEDIA.finanzas_cashflow },
      { id: "fiscus", label: "Patrimonio", title: "⚖️ Fiscus Imperial & Metas", desc: "Fondo para mudanza a Hannover, fondo de transición a Bilbao 2027 y blindaje contra gastos superfluos.", status: "SOBERANÍA", img: IMPERIVM_MEDIA.finanzas_fiscus }
    ];

    return `
      <div class="imperivm-rail-section" id="rail-finanzas-tesoreria">
        <div class="imperivm-rail-header">
          <div class="imperivm-rail-title-group">
            <h3 class="imperivm-rail-title">⚖️ Finanzas y Ahorro <span class="dev-section-label">#rail-finanzas-tesoreria</span></h3>
          </div>
          <div class="imperivm-rail-controls">
            <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('finanzas-track', -360);" title="Anterior">◀</button>
            <button class="imperivm-nav-arrow" onclick="imperivmEngine.scrollTrack('finanzas-track', 360);" title="Siguiente">▶</button>
          </div>
        </div>

        <div class="imperivm-carousel-track" id="finanzas-track">
          ${finanzas.map(f => `
            <div class="imperivm-card" style="flex: 0 0 320px; min-width: 320px; cursor: pointer;" onclick="imperivmEngine.openFinanceDrawer('${f.id}');">
              <div class="imperivm-card-media">
                <img src="${f.img}" alt="${f.title}">
                <span class="imperivm-card-badge">${f.label}</span>
                <span class="imperivm-card-status-pill status-active">${f.status}</span>
                <span class="dev-section-label dev-card-label">card: ${f.id}</span>
              </div>
              <div class="imperivm-card-body">
                <h4 class="imperivm-card-title">${f.title}</h4>
                <p class="imperivm-card-desc">${f.desc}</p>
                <div class="imperivm-card-footer">
                  <span style="font-size: 0.74rem; color: var(--imperivm-text-gold); font-weight: 700;">Auditoría: Al Día</span>
                  <button class="imperivm-card-action-btn" onclick="event.stopPropagation(); imperivmEngine.openFinanceDrawer('${f.id}');">
                    Abrir Conciliador
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // FILA DISCRETA AL PIE: ARCHIVO LEGADO (BOTÓN PEQUEÑO AL FONDO)
  // ==========================================================================
  renderLegadoFooterButton() {
    return `
      <div class="imperivm-legado-footer-dock" style="text-align: center; margin: 48px auto 28px auto; padding: 20px 0 10px 0; border-top: 1px dashed rgba(212,175,55,0.22); max-width: 680px;">
        <span style="display: block; font-size: 0.76rem; color: var(--imperivm-text-muted); margin-bottom: 8px;">Diseños históricos, mapas pergamino y modos anteriores</span>
        <button class="btn-imperivm-secondary" onclick="selectMainTab('legado');" style="font-size: 0.8rem; padding: 7px 18px; border-radius: 20px; border-color: rgba(212,175,55,0.35); color: var(--imperivm-text-gold); cursor: pointer;" title="Abrir archivo de legado">
          📜 Abrir Archivo de Legado
        </button>
      </div>
    `;
  },

  renderLegadoRail() {
    return this.renderLegadoFooterButton();
  },

  // ==========================================================================
  // MODALES Y DRAWERS DETALLADOS (INTERACTIVOS & COMPLETOS)
  // ==========================================================================

  // --- CONMUTADOR DE PESTAÑAS EN DRAWER DE DÍA ---
  switchDayDrawerTab(dayKey, subTab) {
    imperivmState.activeDayTabKey = subTab;
    this.openFullDayDrawer(dayKey, subTab);
  },

  // Fallback para llamadas previas
  switchDrawerTab(subTab) {
    this.switchDayDrawerTab(this.getTodayKey(), subTab);
  },

  // --- MODAL DE BLOQUE DE FLOW MODE DE HOY ---
  openFlowBlockModal(blockKey) {
    const today = this.getTodayKey();
    const map = {
      aurora: "momentos",
      meridies: "momentos",
      vespera: "momentos",
      nutricion: "nutricion",
      entrenamiento: "entrenamiento",
      dieta: "dieta",
      outfit: "outfit",
      tareas: "tareas"
    };
    const targetSubTab = map[blockKey] || "momentos";
    this.openFullDayDrawer(today, targetSubTab);
  },

  // --- DRAWER DE DÍA COMPLETO (REÚNE TODA LA INFORMACIÓN DE ESE DÍA EN UNA SOLA VISTA) ---
  openFullDayDrawer(dayKey, subTab = null) {
    if (!subTab) subTab = imperivmState.activeDayTabKey || "momentos";
    imperivmState.activeDayTabKey = subTab;

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    const isToday = dayKey === this.getTodayKey();
    titleEl.textContent = `📅 CÓDICE • ${dayKey.toUpperCase()} ${isToday ? '(HOY)' : ''}`;

    let dayData = (typeof LIFESTYLE_ARCHITECT_DATA !== "undefined" && LIFESTYLE_ARCHITECT_DATA.dias) ? LIFESTYLE_ARCHITECT_DATA.dias[dayKey] : null;
    let nutData = (typeof NUTRITION_PLAN_DATA !== "undefined" && NUTRITION_PLAN_DATA.dias) ? (NUTRITION_PLAN_DATA.dias[dayKey] || NUTRITION_PLAN_DATA.dias.lunes) : null;
    let gymData = (typeof HYPERTROPHY_WORKOUT_DATA !== "undefined" && HYPERTROPHY_WORKOUT_DATA.dias) ? (HYPERTROPHY_WORKOUT_DATA.dias[dayKey] || HYPERTROPHY_WORKOUT_DATA.dias.lunes) : null;
    const outfitImg = IMPERIVM_MEDIA['outfit_' + dayKey] || IMPERIVM_MEDIA.outfit;

    const bM = (dayData && dayData.bloques && dayData.bloques.manana) || { momento: "07:00 - 09:00", actividad: "Luz solar matutina + Caminata activa 40 min + Hidratación isotónica" };
    const bT = (dayData && dayData.bloques && dayData.bloques.tarde) || { momento: "17:30 - 19:30", actividad: "Sesión de fuerza funcional (Campus Martius) + Concentración profunda" };
    const bN = (dayData && dayData.bloques && dayData.bloques.noche) || { momento: "21:30 - 23:00", actividad: "Protocolo luz ámbar, lectura estoica, magnesio quelado y sueño reparador" };

    const completedMap = (typeof completedSomaticBlocks !== "undefined") ? completedSomaticBlocks : JSON.parse(localStorage.getItem("completedSomaticBlocks") || "{}");
    const allTasks = (typeof appState !== "undefined" && Array.isArray(appState.tasks)) ? appState.tasks : [];
    const dailyTasks = allTasks.filter(t => t.timeScope === "daily");

    // Subpestañas contextuales limpias e integradas
    const subtabsHTML = `
      <div class="day-contextual-subtabs">
        <button class="btn-day-subtab ${subTab === 'momentos' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'momentos');">🌅 Momentos</button>
        <button class="btn-day-subtab ${subTab === 'nutricion' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'nutricion');">🥑 Nutrición</button>
        <button class="btn-day-subtab ${subTab === 'entrenamiento' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'entrenamiento');">🏋️‍♂️ Entrenamiento</button>
        <button class="btn-day-subtab ${subTab === 'dieta' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'dieta');">🥗 Dieta</button>
        <button class="btn-day-subtab ${subTab === 'outfit' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'outfit');">🧥 Indumentaria</button>
        <button class="btn-day-subtab ${subTab === 'tareas' ? 'active' : ''}" onclick="imperivmEngine.switchDayDrawerTab('${dayKey}', 'tareas');">📋 Tareas</button>
      </div>
    `;

    let contentHTML = "";

    if (subTab === "momentos") {
      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- AURORA -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge-tag badge-gold" style="font-size: 0.68rem;">06:00 - 12:00 • Calibración Circadiana</span>
              <button class="imperivm-card-action-btn" onclick="imperivmEngine.toggleCurrentBlock('${dayKey}-manana'); imperivmEngine.switchDayDrawerTab('${dayKey}', 'momentos');">
                ${completedMap[`${dayKey}-manana`] ? '✓ Cumplido (+25 Virtus)' : 'Marcar Aurora'}
              </button>
            </div>
            <h5 style="color: #FFF; margin: 0 0 6px 0; font-size: 1rem;">🌅 Vigilia de la Aurora</h5>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.45; margin: 0 0 8px 0;">${bM.actividad}</p>
            <div style="background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 6px; font-size: 0.76rem; color: var(--imperivm-text-muted);">
              <strong style="color: var(--imperivm-text-gold);">🔬 Fisiología:</strong> Luz solar directa para activación del núcleo supraquiasmático y pico de dopamina matutino.
            </div>
          </div>

          <!-- MERIDIES -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge-tag badge-gold" style="font-size: 0.68rem;">12:00 - 19:00 • Cénit de Producción</span>
              <button class="imperivm-card-action-btn" onclick="imperivmEngine.toggleCurrentBlock('${dayKey}-tarde'); imperivmEngine.switchDayDrawerTab('${dayKey}', 'momentos');">
                ${completedMap[`${dayKey}-tarde`] ? '✓ Cumplido (+50 Virtus)' : 'Marcar Meridies'}
              </button>
            </div>
            <h5 style="color: #FFF; margin: 0 0 6px 0; font-size: 1rem;">☀️ Cénit de Meridies</h5>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.45; margin: 0 0 8px 0;">${bT.actividad}</p>
            <div style="background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 6px; font-size: 0.76rem; color: var(--imperivm-text-muted);">
              <strong style="color: var(--imperivm-text-gold);">🔬 Fisiología:</strong> Pico de fuerza neuromuscular, síntesis de glucógeno y trabajo intelectual enfocado.
            </div>
          </div>

          <!-- VESPERA -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge-tag badge-pink" style="font-size: 0.68rem;">19:00 - 23:00 • Vespera Parasimpática</span>
              <button class="imperivm-card-action-btn" onclick="imperivmEngine.toggleCurrentBlock('${dayKey}-noche'); imperivmEngine.switchDayDrawerTab('${dayKey}', 'momentos');">
                ${completedMap[`${dayKey}-noche`] ? '✓ Cumplido (+25 Virtus)' : 'Marcar Vespera'}
              </button>
            </div>
            <h5 style="color: #FFF; margin: 0 0 6px 0; font-size: 1rem;">🌙 Vespera & Reposo Somático</h5>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.45; margin: 0 0 8px 0;">${bN.actividad}</p>
            <div style="background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 6px; font-size: 0.76rem; color: var(--imperivm-text-muted);">
              <strong style="color: var(--imperivm-text-gold);">🔬 Fisiología:</strong> Supresión de luz azul, secreción de melatonina y descanso delta profundo.
            </div>
          </div>
        </div>
      `;
    } else if (subTab === "nutricion" || subTab === "dieta") {
      const allDaysKeys = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
      const activeNutDay = dayKey;
      const dayMealsData = (typeof NUTRITION_PLAN_DATA !== "undefined" && NUTRITION_PLAN_DATA.dias && NUTRITION_PLAN_DATA.dias[activeNutDay]) ? NUTRITION_PLAN_DATA.dias[activeNutDay] : (NUTRITION_PLAN_DATA.dias.lunes);

      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1.5px solid rgba(155, 35, 53, 0.4);">
            <img src="${IMPERIVM_MEDIA.nutricion}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 0;">🥑 Nutrición & Dieta Imperial</h4>
            <span class="badge-tag badge-gold">2,950 kcal • 170g Prot</span>
          </div>

          <!-- SELECTOR DE LOS 7 DÍAS DE LA SEMANA -->
          <div style="display: flex; gap: 6px; flex-wrap: wrap; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
            ${allDaysKeys.map(dKey => `
              <button class="btn-day-subtab ${dKey === activeNutDay ? 'active' : ''}" 
                      style="padding: 4px 10px; font-size: 0.74rem;"
                      onclick="imperivmEngine.switchDayDrawerTab('${dKey}', 'nutricion');">
                ${dKey.slice(0, 3).toUpperCase()}
              </button>
            `).join('')}
          </div>

          <h5 style="color: #FFF; margin: 4px 0 0 0; font-size: 0.98rem; font-family: 'Cinzel', serif;">
            📋 Menú del ${dayMealsData.nombre || activeNutDay.toUpperCase()}: <span style="color: #D4464E; font-size: 0.85rem;">${dayMealsData.titulo || ''}</span>
          </h5>

          <!-- LAS 5 COMIDAS DEL DÍA -->
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${dayMealsData.comidas && Array.isArray(dayMealsData.comidas) ? dayMealsData.comidas.map((c, i) => `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #9B2335; border-radius: 6px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: #FFFFFF; font-size: 0.88rem;">${c.momento}</strong>
                  <span style="font-size: 0.72rem; color: #D4464E; font-weight: 700; background: rgba(155,35,53,0.15); padding: 2px 8px; border-radius: 4px;">${c.macros}</span>
                </div>
                <div style="font-size: 0.84rem; color: #E2E8F0; font-weight: 600; margin-bottom: 4px;">${c.plato}</div>
                <p style="font-size: 0.78rem; color: #94A3B8; margin: 0; line-height: 1.4;">${c.detalle}</p>
              </div>
            `).join('') : '<p style="font-size: 0.8rem; color: #94A3B8;">5 Comidas balanceadas: Avena con huevos, pollo y batata, yogur griego, aislado de proteína y cena de salmón salvaje.</p>'}
          </div>

          <!-- HIDRATACIÓN Y SUPLEMENTOS -->
          <div style="background: rgba(155, 35, 53, 0.08); border: 1px solid rgba(192, 57, 43, 0.3); border-radius: 8px; padding: 12px;">
            <strong style="color: #FFF; font-size: 0.82rem; display: block; margin-bottom: 4px;">💧 Hidratación & Biohacking:</strong>
            <p style="font-size: 0.78rem; color: #CBD5E1; margin: 0;">3.5 Litros de agua mineralizada con electrolitos + Bisglicinato de Magnesio (400mg) 45 min antes de dormir.</p>
          </div>
        </div>
      `;
    } else if (subTab === "entrenamiento") {
      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1px solid var(--imperivm-border);">
            <img src="${IMPERIVM_MEDIA.gym}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 0;">${gymData ? gymData.sesion : "Campus Martius • Hipertrofia Funcional"}</h4>
          
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.84rem; margin-bottom: 6px;">
              <span>Músculos Principales:</span>
              <strong style="color: var(--imperivm-text-gold);">${gymData ? gymData.musculos_principales : "Fuerza Integral"}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.84rem;">
              <span>Duración Programada:</span>
              <strong>${gymData ? gymData.duracion_min : 50} minutos</strong>
            </div>
          </div>

          <h5 style="color: #FFF; margin: 4px 0 0 0; font-size: 0.95rem;">Tabla de Ejercicios Prescritos:</h5>
          ${gymData && Array.isArray(gymData.ejercicios) ? gymData.ejercicios.map(e => `
            <div style="border-left: 2px solid #52C41A; padding-left: 12px; margin-bottom: 8px;">
              <strong style="font-size: 0.84rem; color: #FFF;">${e.nombre}</strong>
              <div style="font-size: 0.76rem; color: var(--imperivm-text-muted);">${e.series} series × ${e.repeticiones} repeticiones • RPE ${e.rpe || '8'}</div>
            </div>
          `).join('') : '<p style="font-size: 0.8rem; color: var(--imperivm-text-muted);">Sentadillas búlgaras, dominadas estrictas, fondos en paralelas y movilidad articular.</p>'}
        </div>
      `;
    } else if (subTab === "dieta") {
      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1px solid var(--imperivm-border);">
            <img src="${IMPERIVM_MEDIA.nutricion}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 0;">${nutData ? nutData.titulo : "Ración & Menú Somático"}</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px; text-align: center;">
              <span style="font-size: 0.72rem; color: var(--imperivm-text-muted); text-transform: uppercase;">Calorías Meta</span>
              <h5 style="color: var(--imperivm-text-gold); margin: 4px 0 0 0; font-size: 1.2rem;">${nutData ? nutData.calorias_meta : "2,400 kcal"}</h5>
            </div>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px; text-align: center;">
              <span style="font-size: 0.72rem; color: var(--imperivm-text-muted); text-transform: uppercase;">Proteína Meta</span>
              <h5 style="color: #52C41A; margin: 4px 0 0 0; font-size: 1.2rem;">${nutData ? nutData.proteina_meta : "160g"}</h5>
            </div>
          </div>

          <h5 style="color: #FFF; margin: 4px 0 0 0; font-size: 0.95rem;">Distribución de Comidas:</h5>
          ${nutData && Array.isArray(nutData.comidas) ? nutData.comidas.map(c => `
            <div style="border-left: 2px solid var(--imperivm-border-gold); padding-left: 12px; margin-bottom: 8px;">
              <strong style="font-size: 0.84rem; color: #FFF;">${c.nombre}:</strong>
              <p style="font-size: 0.78rem; color: var(--imperivm-text-muted); margin: 2px 0 0 0;">${c.plato || c.descripcion}</p>
            </div>
          `).join('') : '<p style="font-size: 0.8rem; color: var(--imperivm-text-muted);">Huevos de pastoreo, verduras salteadas, carnes magras, arroz integral y aguacate.</p>'}
        </div>
      `;
    } else if (subTab === "outfit") {
      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-radius: 8px; overflow: hidden; height: 260px; border: 1.5px solid var(--imperivm-border-gold);">
            <img src="${outfitImg}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 0;">Prescripción de Indumentaria Somática</h4>
          
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <strong style="color: var(--imperivm-text-gold); font-size: 0.85rem; display: block; margin-bottom: 4px;">🧥 Capa Exterior:</strong>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); margin: 0;">Gabardina de lana tweed corte Peaky Blinders o sobretodo sobrio. Elegancia militar y estructura postural firme.</p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <strong style="color: var(--imperivm-text-gold); font-size: 0.85rem; display: block; margin-bottom: 4px;">👔 Capa Base & Pantalón:</strong>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); margin: 0;">Camiseta de algodón pima o camisa de corte recto sin exceso de tela. Pantalón chino o sastre técnico con libertad de movimiento articular.</p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <strong style="color: var(--imperivm-text-gold); font-size: 0.85rem; display: block; margin-bottom: 4px;">🥾 Calzado Biomecánico:</strong>
            <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); margin: 0;">Botas de cuero limpias o calzado de horma ancha con drop cero que estimule la propiocepción del pie y la postura erguida.</p>
          </div>
        </div>
      `;
    } else if (subTab === "tareas") {
      contentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-family: var(--imperivm-font-title); font-size: 1.2rem; color: #FFF; margin: 0;">Checklist Diario Activo</h4>
            <button class="btn-imperivm-primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="imperivmEngine.openAddTaskModal('daily');">+ Nueva Tarea</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; max-height: 50vh; overflow-y: auto;">
            ${dailyTasks.length > 0 ? dailyTasks.map(t => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 6px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; ${t.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="imperivmEngine.toggleTaskInline('${t.id}')">
                  <span style="font-size: 0.85rem; color: #FFF;">${t.title}</span>
                </label>
                <span class="badge-tag badge-gold" style="font-size: 0.68rem;">+20 XP</span>
              </div>
            `).join('') : '<p style="font-size: 0.85rem; color: var(--imperivm-text-muted);">No hay tareas asignadas para hoy. Haz clic arriba para crear una.</p>'}
          </div>
        </div>
      `;
    }

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${subtabsHTML}
        ${contentHTML}
        <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();" style="margin-top: 10px;">Cerrar Drawer</button>
      </div>
    `;

    this.openDrawer();
  },

  // --- MODAL DE MISIÓN PRINCIPAL DE CAMPAÑA (INTERACTIVO CON CHECKBOXES) ---
  openMainQuestModal(questId) {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    let mainQuests = (st && Array.isArray(st.mainQuests) && st.mainQuests.length > 0) ? st.mainQuests : DEFAULT_MAIN_QUESTS;
    const q = mainQuests.find(x => x.id === questId) || mainQuests[0];
    if (!q) return;

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    titleEl.textContent = `🚀 CAMPAÑA • ${q.title}`;

    const subCount = q.subQuests ? q.subQuests.length : 0;
    const completedCount = q.subQuests ? q.subQuests.filter(sq => sq.completed).length : 0;
    const pct = q.completed ? 100 : (subCount > 0 ? Math.round((completedCount / subCount) * 100) : 0);

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1.5px solid ${q.completed ? 'var(--imperivm-gold)' : 'var(--imperivm-border-gold)'};">
          <img src="${q.img || IMPERIVM_MEDIA.provincia_hannover}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge-tag badge-gold" style="font-size: 0.72rem;">${q.stage || 'Alemania / Europa'}</span>
            ${q.completed ? '<span class="badge-tag badge-emerald" style="font-size: 0.72rem;">✓ CONQUISTADA EN EL HISTORIAL</span>' : '<span class="badge-tag badge-gold" style="font-size: 0.72rem;">⚡ FRENTE EN CURSO</span>'}
          </div>
          <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">${q.title}</h4>
          <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.5; margin: 6px 0 0 0;">${q.desc || "Campaña estratégica de vida y soberanía personal."}</p>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.84rem; margin-bottom: 6px;">
            <span>Progreso de Conquista:</span>
            <strong style="color: var(--imperivm-text-gold);">${pct}% (${completedCount}/${subCount})</strong>
          </div>
          <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="background: var(--imperivm-gold-gradient); height: 100%; width: ${pct}%;"></div>
          </div>
        </div>

        <div style="background: rgba(155, 35, 53, 0.08); border: 1.5px solid var(--imperivm-border-gold); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.8rem;">🏆</span>
          <div>
            <span style="font-size: 0.7rem; color: var(--imperivm-text-gold); text-transform: uppercase; font-weight: 800;">Recompensa Imperial</span>
            <h5 style="color: #FFF; margin: 2px 0 0 0; font-size: 0.95rem;">Objeto #${q.rewardItemId}: ${q.rewardItemName || 'Instrumento de la Orden'}</h5>
          </div>
        </div>

        <h5 style="color: #FFF; margin: 6px 0 0 0; font-size: 0.95rem;">Hitos & Sub-Misiones:</h5>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${q.subQuests ? q.subQuests.map(sq => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 6px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; ${sq.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                <input type="checkbox" ${sq.completed ? 'checked' : ''} onchange="imperivmEngine.toggleSubQuest('${q.id}', '${sq.id}');">
                <span style="font-size: 0.82rem; color: #FFF;">${sq.text}</span>
              </label>
              <span class="badge-tag badge-gold" style="font-size: 0.65rem;">+50 XP</span>
            </div>
          `).join('') : ''}
        </div>

        <div style="display: flex; gap: 10px; margin-top: 10px;">
          ${!q.completed && completedCount === subCount ? `
            <button class="btn-imperivm-primary" style="flex: 1; justify-content: center;" onclick="imperivmEngine.markQuestConquered('${q.id}');">
              🏆 Consagrar Victoria & Archivar
            </button>
          ` : ''}
          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar Misión</button>
        </div>
      </div>
    `;

    this.openDrawer();
  },

  markQuestConquered(questId) {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    let mainQuests = (st && Array.isArray(st.mainQuests)) ? st.mainQuests : DEFAULT_MAIN_QUESTS;
    const q = mainQuests.find(x => x.id === questId);
    if (!q) return;

    q.completed = true;
    if (q.subQuests) q.subQuests.forEach(sq => sq.completed = true);
    if (q.rewardItemId && st && Array.isArray(st.inventory)) {
      const item = st.inventory.find(i => i.id === q.rewardItemId);
      if (item) {
        item.unlocked = true;
        item.equipped = true;
      }
    }
    this.awardVirtus(150, `Campaña Conquistada: ${q.title}`);
    if (typeof playSoundEffect === "function") playSoundEffect("levelup");
    if (typeof showNotification === "function") showNotification(`🏆 ¡Campaña Conquistada: ${q.title}! (+150 Virtus)`);
    if (typeof saveReyJaguarState === "function") saveReyJaguarState();
    this.closeDrawer();
    imperivmState.campaignView = "history";
    this.render();
  },

  toggleSubQuest(questId, sqId) {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    let mainQuests = (st && Array.isArray(st.mainQuests)) ? st.mainQuests : DEFAULT_MAIN_QUESTS;
    const q = mainQuests.find(x => x.id === questId);
    if (!q || !q.subQuests) return;

    const sq = q.subQuests.find(x => x.id === sqId);
    if (sq) {
      sq.completed = !sq.completed;
      if (sq.completed) {
        this.awardVirtus(50, `Hito cumplido: ${sq.text}`);
        if (typeof playSoundEffect === "function") playSoundEffect("success");
        if (typeof showNotification === "function") showNotification(`✓ Hito de Campaña: ${sq.text} (+50 Virtus)`);
      }
      if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      this.openMainQuestModal(questId);
      this.render();
    }
  },

  // --- MODAL DE PROYECTO SECUNDARIO ---
  openSecondaryQuestModal(projectId) {
    let p = null;
    if (typeof projectsData !== "undefined" && projectsData[projectId]) {
      p = projectsData[projectId];
    }

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    titleEl.textContent = `📁 EXPEDICIÓN • ${p ? p.title : projectId.toUpperCase()}`;

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1.5px solid var(--imperivm-border);">
          <img src="${p && p.bannerImg ? p.bannerImg : IMPERIVM_MEDIA.provincia_bilbao}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div>
          <span class="badge-tag badge-gold" style="font-size: 0.72rem;">${p ? p.category : 'Ecosistema de Vida'}</span>
          <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">${p ? p.title : projectId}</h4>
          <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.5; margin: 6px 0 0 0;">${p ? p.desc : 'Proyecto en ejecución continua.'}</p>
        </div>

        ${p && p.collaborators ? `
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px;">
            <strong style="color: var(--imperivm-text-gold); font-size: 0.82rem;">🤝 Colaboradores:</strong>
            <p style="font-size: 0.78rem; color: var(--imperivm-text-muted); margin: 2px 0 0 0;">${p.collaborators}</p>
          </div>
        ` : ''}

        ${p && Array.isArray(p.checklist) ? `
          <h5 style="color: #FFF; margin: 6px 0 0 0; font-size: 0.95rem;">Checklist Operativo:</h5>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${p.checklist.map(chk => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 6px;">
                <span style="font-size: 0.82rem; color: #FFF; ${chk.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                  ${chk.completed ? '✓' : '○'} ${chk.text}
                </span>
                <span class="badge-tag ${chk.completed ? 'badge-emerald' : 'badge-pink'}" style="font-size: 0.65rem;">
                  ${chk.completed ? 'Hecho' : 'Pendiente'}
                </span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button class="btn-imperivm-primary" style="flex: 1; justify-content: center;" onclick="imperivmEngine.closeDrawer(); selectMainTab('proyectos');">
            Ver Módulo de Proyectos
          </button>
          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar</button>
        </div>
      </div>
    `;

    this.openDrawer();
  },

  // --- MODAL DE TÍTULOS Y CONTRATÍTULOS ---
  openTitlesModal(type = "virtudes") {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    const titles = (st && Array.isArray(st.titles)) ? st.titles : [];
    const counterTitles = (st && Array.isArray(st.counterTitles)) ? st.counterTitles : [];

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const tabsBar = document.getElementById("imperivm-drawer-tabs-bar");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    if (tabsBar) tabsBar.style.display = "none";

    if (type === "virtudes") {
      titleEl.textContent = "👑 TÍTULOS DE MAESTRÍA MASCULINA";
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.5; margin: 0;">
            Los 6 títulos nobles consagran las virtudes del Caballero Jaguar en la ciencia, la docencia, la soberanía marcial y la presencia tántrica.
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${titles.map(t => `
              <div style="background: rgba(255,255,255,0.04); border: 1px solid ${t.unlocked ? 'var(--imperivm-border-gold)' : 'var(--imperivm-border)'}; border-radius: 8px; padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span class="badge-tag ${t.unlocked ? 'badge-gold' : 'badge-pink'}" style="font-size: 0.68rem;">
                    ${t.unlocked ? '⚡ CONSAGRADO' : 'PENDIENTE'}
                  </span>
                  <button class="imperivm-card-action-btn" onclick="imperivmEngine.toggleTitleStatus('${t.id}', 'titles'); imperivmEngine.openTitlesModal('virtudes');">
                    ${t.unlocked ? 'Desconsagrar' : 'Consagrar (+40 XP)'}
                  </button>
                </div>
                <h5 style="color: #FFF; margin: 0 0 4px 0; font-size: 1rem;">${t.name}</h5>
                <p style="font-size: 0.78rem; color: var(--imperivm-text-muted); margin: 0;">${t.desc}</p>
              </div>
            `).join('')}
          </div>

          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar</button>
        </div>
      `;
    } else {
      titleEl.textContent = "💧 CONTRATÍTULOS DE VULNERABILIDAD";
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); line-height: 1.5; margin: 0;">
            Los 5 contratítulos rescatan la integración de la sombra, la ternura masculina, el cuidado del hogar y el desarme del ego competitivo.
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${counterTitles.map(ct => `
              <div style="background: rgba(255,255,255,0.04); border: 1px solid ${ct.unlocked ? '#F48FB1' : 'var(--imperivm-border)'}; border-radius: 8px; padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span class="badge-tag ${ct.unlocked ? 'badge-pink' : 'badge-gold'}" style="font-size: 0.68rem;">
                    ${ct.unlocked ? '💧 INTEGRADO' : 'POR INTEGRAR'}
                  </span>
                  <button class="imperivm-card-action-btn" onclick="imperivmEngine.toggleTitleStatus('${ct.id}', 'counterTitles'); imperivmEngine.openTitlesModal('sombras');">
                    ${ct.unlocked ? 'Desintegrar' : 'Integrar (+40 XP)'}
                  </button>
                </div>
                <h5 style="color: #FFF; margin: 0 0 4px 0; font-size: 1rem;">${ct.name}</h5>
                <p style="font-size: 0.78rem; color: var(--imperivm-text-muted); margin: 0;">${ct.desc}</p>
              </div>
            `).join('')}
          </div>

          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar</button>
        </div>
      `;
    }

    this.openDrawer();
  },

  // --- MODAL DE REGLAS DE EXPERIENCIA & MANTENIMIENTO DE RANGO ---
  openRulesModal() {
    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const tabsBar = document.getElementById("imperivm-drawer-tabs-bar");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    if (tabsBar) tabsBar.style.display = "none";
    titleEl.textContent = "🏛️ REGLAS DE EXPERIENCIA, RANGO & STATS";

    const P = window.CJProgress;
    const C = P ? P.CONFIG : { difficultyXP: { facil: 25, medio: 50, dificil: 75 }, dailySoftCap: 600, overCapFactor: 0.5, activeDayXP: 100, streakBonus: {} };
    const L = P ? P.LEVELS : IMPERIVM_ROMAN_RANKS;
    const snap = P ? P.snapshot() : null;
    const box = 'background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;';
    const h5 = 'color: var(--imperivm-text-gold); margin: 0 0 8px 0; font-size: 0.95rem;';
    const small = 'font-size: 0.8rem; color: var(--imperivm-text-muted); line-height: 1.55; margin: 0;';
    const bonus = Object.entries(C.streakBonus).map(([d, x]) => `${d} días → +${x} XP`).join(' · ');
    const rankRows = L.map(r => {
      const span = r.next ? (r.next - r.threshold) : null;
      const g = span ? Math.round(span / 3) : 6000;
      return `<div><strong>${r.rank}. ${r.latin}</strong> — ${r.title} · desde ${r.threshold.toLocaleString()} XP${r.next ? ` (grado I → II → III cada ~${g.toLocaleString()} XP)` : ' (grados cada 6.000 XP)'}</div>`;
    }).join('');

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">

        ${snap ? `<div style="${box} border-color: var(--imperivm-border-gold);">
          <h5 style="${h5}">📍 Tu estado ahora</h5>
          <p style="${small}">${snap.level.latin} · Grado ${snap.level.gradeRoman} — <strong>${snap.xp.toLocaleString()} XP</strong> · racha de <strong>${snap.streak.days}</strong> días · hoy <strong>${snap.today.xp}/${snap.today.cap}</strong> XP.</p>
        </div>` : ''}

        <div style="${box}">
          <h5 style="${h5}">⚡ 1. Cómo se gana experiencia (XP)</h5>
          <p style="${small}">Cada acción completada da XP según su dificultad o duración. Todo XP queda anotado en un <strong>libro de movimientos</strong> (puedes deshacerlo con ↩ en la pestaña Maestría). Desmarcar una tarea o bloque revierte su XP.</p>
          <div style="display: flex; flex-direction: column; gap: 5px; font-size: 0.82rem; margin-top: 8px;">
            <div>• <strong style="color: #52C41A;">Fácil +${C.difficultyXP.facil} XP</strong> · hasta 20 min (hidratación, caminata, 15 págs de lectura).</div>
            <div>• <strong style="color: #E8A0A8;">Medio +${C.difficultyXP.medio} XP</strong> · 21–50 min (fuerza, Deep Work, idiomas).</div>
            <div>• <strong style="color: #FF6B6B;">Difícil +${C.difficultyXP.dificil} XP</strong> · más de 50 min o hitos (tesis, sparring, revisión financiera semanal).</div>
            <div>• <strong>Fijos:</strong> tarea del día +20 · bloque somático +15 · tarea de proyecto +20 · mejora de atributo +50 · avance de misión +30 · misión conquistada +150 · título/contratítulo +40.</div>
            <div>• Cada acción mantiene una <strong>clave por día</strong>: no se puede cobrar dos veces lo mismo el mismo día.</div>
          </div>
        </div>

        <div style="${box}">
          <h5 style="${h5}">🔥 2. Tope diario y racha</h5>
          <p style="${small}">
            • <strong>Tope blando:</strong> pasadas las <strong>${C.dailySoftCap} XP</strong> de un día, cada acción vale la <strong>mitad</strong> (premia la constancia, no el atracón).<br>
            • <strong>Día activo:</strong> un día cuenta para la racha si sumas <strong>${C.activeDayXP}+ XP</strong>.<br>
            • <strong>Racha:</strong> días activos consecutivos (en tu hora local). Se rompe si un día no llegas al mínimo.<br>
            • <strong>Bonos de racha (una vez):</strong> ${bonus}.<br>
            • El estandarte <strong>Vexillum</strong> de la cabecera crece con tu racha (hasta 21 días).
          </p>
        </div>

        <div style="${box}">
          <h5 style="${h5}">🏛️ 3. Rangos y grados (Cursus Honorum)</h5>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; color: var(--imperivm-text-muted);">${rankRows}</div>
          <p style="${small} margin-top: 8px;">El <strong>rango</strong> sube solo por XP total. Dentro de cada rango hay 3 <strong>grados</strong> (I, II, III). Tu nivel anterior se conservó al reiniciar el XP.</p>
        </div>

        <div style="${box}">
          <h5 style="${h5}">🎌 4. Auras y banderines (9 frentes de vida)</h5>
          <p style="${small}">
            Cada acción pertenece a un <strong>aura</strong> (Vida, Exploración, Amor, Salud, Soberanía, Espiritualidad, Naturaleza, Deporte, Mente): suma <strong>+1 punto</strong> y alarga ese banderín. Sin actividad, un aura pierde 1 punto por día.<br>
            La <strong>Vibra</strong> mide tu constancia semanal por aura:
          </p>
          <div style="font-family: monospace; font-size: 0.85rem; color: #E8A0A8; background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 6px; border-left: 3px solid var(--imperivm-gold); margin: 8px 0;">
            Vibra = [ Σ (0.82^i · √P_i · 12) ] × [ 1 + 0.40 · (días_activos / 7) ]
          </div>
          <p style="${small}">Suma más hacer poco varios días que mucho en uno solo: √P amortigua picos, 0.82^i resta 18% por cada día de antigüedad y estar activo 7/7 da +40%.</p>
        </div>

        <div style="${box}">
          <h5 style="${h5}">📊 5. Stats, títulos y objetos</h5>
          <p style="${small}">
            • <strong>Stats (atributos):</strong> cada acción sube +1 el atributo asociado (p. ej. Muay Thai, Lectura).<br>
            • <strong>Títulos de Maestría</strong> (virtudes logradas) y <strong>Contratítulos de Vulnerabilidad</strong> (romper rigideces con consciencia): al consagrarlos dan +40 XP.<br>
            • <strong>Armamentum Imperial:</strong> los objetos se desbloquean al conquistar misiones u hitos y se equipan para vestir a tu Caballero.
          </p>
        </div>

        <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar Manual</button>
      </div>
    `;

    this.openDrawer();
  },

  getAuraColorClass(auraKey = "") {
    const map = {
      exploracion: "gold",
      naturaleza: "emerald",
      deporte: "pink",
      salud: "emerald",
      ciencia: "gold",
      musica: "pink",
      filosofia: "gold",
      riqueza: "gold",
      virtud: "gold"
    };
    return map[auraKey] || "gold";
  },

  // --- MODAL DE ARMAMENTARIUM COMPLETO (PEDESTAL DE ÉLITE & 48 OBJETOS) ---
  openArmamentariumModal(filter = "all", selectedItemId = null) {
    imperivmState.activeArmamentariumFilter = filter;
    if (selectedItemId !== null) {
      imperivmState.selectedArmamentariumItemId = selectedItemId;
    }
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    const items = (st && Array.isArray(st.inventory)) ? st.inventory : [];

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    titleEl.textContent = `🎒 ARSENAL IMPERIAL (${items.length} OBJETOS)`;

    // Objeto activo en el Pedestal Heroico
    const curId = imperivmState.selectedArmamentariumItemId || 1;
    const selectedItem = items.find(i => i.id === curId) || items[0] || {};
    const isSelEquipped = !!selectedItem.equipped;
    const isSelUnlocked = !!selectedItem.unlocked;

    let filteredItems = items;
    if (filter === "equipped") {
      filteredItems = items.filter(i => i.equipped);
    } else if (filter === "unlocked") {
      filteredItems = items.filter(i => i.unlocked && !i.equipped);
    } else if (filter === "blocked") {
      filteredItems = items.filter(i => !i.unlocked);
    }

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        
        <!-- 1. PEDESTAL HEROICO ILUMINADO DEL OBJETO SELECCIONADO -->
        <div class="armamentarium-hero-pedestal">
          <div class="armamentarium-medallion ${!isSelUnlocked ? 'is-blocked' : ''}">
            <span>${this.getItemIcon(selectedItem.name)}</span>
          </div>
          
          <div style="flex: 1; min-width: 0; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
              <span class="badge-tag badge-gold" style="font-size: 0.68rem; font-weight: 800;">#${String(selectedItem.id || 1).padStart(2, '0')}</span>
              <span class="aura-tag-pill badge-${this.getAuraColorClass(selectedItem.auraKey)}">Aura ${selectedItem.auraKey || 'Somática'}</span>
              <span class="badge-tag ${isSelEquipped ? 'badge-gold' : (isSelUnlocked ? 'badge-emerald' : 'badge-pink')}" style="font-size: 0.68rem;">
                ${isSelEquipped ? '⚡ EN SERVICIO' : (isSelUnlocked ? '✓ DISPONIBLE' : '🔴 SELLADO IMPERIAL')}
              </span>
            </div>

            <h4 style="font-family: var(--imperivm-font-title); font-size: 1.15rem; color: #FFF; margin: 0 0 6px 0; letter-spacing: 0.5px;">
              ${selectedItem.name || 'Objeto de la Orden'}
            </h4>

            <p style="font-size: 0.78rem; color: var(--imperivm-text-muted); line-height: 1.45; margin: 0 0 10px 0;">
              ${selectedItem.lore || 'Instrumento de alta precisión para el desarrollo del Cursus Honorum.'}
            </p>

            <div style="background: ${isSelUnlocked ? 'rgba(82, 196, 26, 0.08)' : 'rgba(255, 59, 48, 0.08)'}; border: 1px solid ${isSelUnlocked ? 'rgba(82, 196, 26, 0.3)' : 'rgba(255, 59, 48, 0.3)'}; border-radius: 6px; padding: 8px 10px; margin-bottom: 12px; font-size: 0.75rem;">
              <strong style="color: ${isSelUnlocked ? '#52C41A' : '#FF6B6B'}; display: block; margin-bottom: 2px;">
                ${isSelUnlocked ? '✓ Consagración Cumplida:' : '🎯 Requisito de Victoria:'}
              </strong>
              <span style="color: #ECEFF1;">${selectedItem.howToObtain || 'Misiones de campaña o hábitos.'}</span>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn-imperivm-primary" style="padding: 7px 16px; font-size: 0.78rem;" onclick="imperivmEngine.toggleEquipItem(${selectedItem.id}); imperivmEngine.openArmamentariumModal('${filter}', ${selectedItem.id});">
                ${isSelEquipped ? '📦 Desactivar a Reserva' : (isSelUnlocked ? '⚡ Equipar en Servicio' : '🔓 Desbloquear (+50 XP)')}
              </button>
            </div>
          </div>
        </div>

        <!-- 2. BARRA DE FILTROS METÁLICOS -->
        <div class="armamentarium-filter-bar">
          <button class="btn-armamentarium-filter ${filter === 'all' ? 'active' : ''}" onclick="imperivmEngine.openArmamentariumModal('all');">
            Todos (${items.length})
          </button>
          <button class="btn-armamentarium-filter ${filter === 'equipped' ? 'active' : ''}" onclick="imperivmEngine.openArmamentariumModal('equipped');">
            ⚡ Equipados (${items.filter(i => i.equipped).length})
          </button>
          <button class="btn-armamentarium-filter ${filter === 'unlocked' ? 'active' : ''}" onclick="imperivmEngine.openArmamentariumModal('unlocked');">
            ✓ Disponibles (${items.filter(i => i.unlocked && !i.equipped).length})
          </button>
          <button class="btn-armamentarium-filter ${filter === 'blocked' ? 'active' : ''}" onclick="imperivmEngine.openArmamentariumModal('blocked');">
            🔴 Sellados (${items.filter(i => !i.unlocked).length})
          </button>
        </div>

        <!-- 3. CUADRÍCULA DE ARCOS IMPERIALES (48 OBJETOS) -->
        <div class="armamentarium-48-grid">
          ${filteredItems.map(item => {
            const isEquipped = !!item.equipped;
            const isUnlocked = !!item.unlocked;
            const isSelected = item.id === curId;

            return `
              <div class="armamentarium-grid-card ${isEquipped ? 'is-equipped' : (isUnlocked ? '' : 'is-blocked')}" 
                   style="${isSelected ? 'outline: 2px solid #FFF; outline-offset: 2px; transform: scale(1.03);' : ''}"
                   onclick="imperivmEngine.openArmamentariumModal('${filter}', ${item.id});" 
                   title="${item.name}: Clic para inspeccionar en el Pedestal">
                
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2px;">
                  <span style="font-size: 0.65rem; color: var(--imperivm-text-gold); font-weight: 800;">#${String(item.id).padStart(2, '0')}</span>
                  ${isEquipped ? '<span style="font-size: 0.65rem;">⚡</span>' : (!isUnlocked ? '<span style="font-size: 0.65rem;">🔴</span>' : '')}
                </div>

                <div style="font-size: 1.8rem; margin: 4px 0;">
                  ${this.getItemIcon(item.name)}
                </div>

                <strong style="font-size: 0.74rem; color: #FFF; margin-bottom: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.15; text-align: center;">
                  ${item.name}
                </strong>

                <span style="font-size: 0.62rem; color: ${isEquipped ? 'var(--imperivm-text-gold)' : (isUnlocked ? '#52C41A' : '#FF6B6B')}; font-weight: 800; text-transform: uppercase;">
                  ${isEquipped ? 'EN SERVICIO' : (isUnlocked ? 'DISPONIBLE' : 'SELLADO')}
                </span>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">Cerrar Armería</button>
      </div>
    `;

    this.openDrawer();
  },

  // --- MODAL DETALLE DE OBJETO BLOQUEADO O DESBLOQUEADO ---
  openItemDetailsModal(itemId) {
    this.openArmamentariumModal("all", itemId);
  },

  // --- DRAWER DE BITÁCORA IMPERIAL ---
  openBitacoraDrawer(bitacoraId) {
    const titlesMap = {
      lectura: { title: "📚 Biblioteca Estoica & Lecturas", desc: "50+ Obras de Marco Aurelio, Séneca, Epicteto y Ryan Holiday con registro de páginas y notas.", img: IMPERIVM_MEDIA.bitacora_lectura, tab: "lectura" },
      ayurveda: { title: "🌿 Ayurveda & Dinacharya Sagrado", desc: "Diagnóstico interactivo de Doshas, botica botánica y rituales de purificación somática.", img: IMPERIVM_MEDIA.bitacora_ayurveda, tab: "ayurveda" },
      meditacion: { title: "🧘 Meditación Somática & Box Breathing", desc: "Box Breathing 4x4 interactivo, meditación Vipassana somática, Zazen y campana tibetana.", img: IMPERIVM_MEDIA.bitacora_meditacion, tab: "meditacion" },
      masajes: { title: "💆 Masajes & Recuperación Miofascial", desc: "Guías de masaje tántrico, puntos gatillo miofasciales, automasaje y drenaje linfático.", img: IMPERIVM_MEDIA.bitacora_masajes, tab: "masajes" },
      idiomas: { title: "🌐 Studium Linguarum (Alemán & Euskera)", desc: "Práctica de vocabulario activo, fonética y frases de supervivencia en Hannover y Bilbao.", img: IMPERIVM_MEDIA.bitacora_idiomas, tab: "idiomas" },
      musica: { title: "🎺 Academia Musici & Trompeta Jazz", desc: "Trompeta de Jazz, escalas pentatónicas, armónica blues y metrónomo acústico.", img: IMPERIVM_MEDIA.bitacora_musica, tab: "musica" },
      fotografia: { title: "📷 Fotografía & Visión Óptica", desc: "Triángulo de exposición (f/, Velocidad, ISO), encuadre y documentación de campo.", img: IMPERIVM_MEDIA.bitacora_fotografia, tab: "fotografia" },
      pintura: { title: "🎨 Atelier de Bellas Artes (Zorn & Óleo)", desc: "Paleta limitada de Anders Zorn, claroscuro, veladuras al óleo y retrato vivo.", img: IMPERIVM_MEDIA.bitacora_pintura, tab: "pintura" },
      astral: { title: "🔮 Observatorio Celeste & Carta Natal", desc: "Carta astral de Aries, decanato de fuego, conjunción Marte y los 4 horóscopos.", img: IMPERIVM_MEDIA.bitacora_astral, tab: "astral" },
      progresion: { title: "📜 Códice Maestro de Caballería", desc: "Arquitectura integral del Caballero Jaguar, los 5 pilares de virtud y manifiesto.", img: IMPERIVM_MEDIA.bitacora_progresion, tab: "progresion" }
    };

    const b = titlesMap[bitacoraId] || titlesMap.lectura;

    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    drawer.scrollTop = 0;
    titleEl.textContent = b.title;

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="border-radius: 8px; overflow: hidden; height: 180px; border: 1.5px solid var(--imperivm-border);">
          <img src="${b.img}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h4 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 0;">${b.title}</h4>
        <p style="font-size: 0.84rem; color: var(--imperivm-text-muted); line-height: 1.55; margin: 0;">
          ${b.desc}
        </p>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <strong style="color: var(--imperivm-text-gold); font-size: 0.82rem; display: block; margin-bottom: 4px;">🎯 Beneficio al Entrar:</strong>
          <span style="font-size: 0.8rem; color: var(--imperivm-text-muted);">Registro interactivo de sesiones, cronómetro especializado y acumulación directa de Virtus al estandarte.</span>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button class="btn-imperivm-primary" style="flex: 1; justify-content: center;" onclick="imperivmEngine.launchBitacoraModule('${b.tab}');">
            ▶ ENTRAR AL MÓDULO INTERACTIVO
          </button>
          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">
            Cerrar
          </button>
        </div>
      </div>
    `;

    this.openDrawer();
  },

  // Abre el módulo interactivo y añade un banner superior y botón flotante para volver fácilmente
  launchBitacoraModule(tabKey) {
    this.closeDrawer();
    if (typeof window.selectMainTab === "function") {
      window.selectMainTab(tabKey);
    } else if (typeof selectMainTab === "function") {
      selectMainTab(tabKey);
    } else {
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const el = document.getElementById('tab-' + tabKey);
      if (el) el.classList.add('active');
    }

    // Inicializadores específicos por módulo
    if (["lectura", "conocimiento"].includes(tabKey) && typeof window.renderBooks === "function") {
      window.renderBooks();
    } else if (tabKey === "fotografia" && typeof window.renderFotografiaApp === "function") {
      window.renderFotografiaApp();
    } else if (tabKey === "pintura" && typeof window.renderPinturaApp === "function") {
      window.renderPinturaApp();
    } else if (tabKey === "musica" && typeof window.renderMusicLearningTab === "function") {
      window.renderMusicLearningTab();
    } else if (tabKey === "meditacion" && typeof window.initMeditationStudio === "function") {
      window.initMeditationStudio();
    } else if (tabKey === "masajes" && typeof window.initMassageStudio === "function") {
      window.initMassageStudio();
    } else if (tabKey === "progresion" && typeof window.renderSistemaMaestroPitch === "function") {
      window.renderSistemaMaestroPitch();
    }

    this.injectReturnBannerToTab(tabKey);
    this.ensureReturnButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  injectReturnBannerToTab(tabKey) {
    const titlesMap = {
      lectura: "Biblioteca Estoica & Lecturas",
      ayurveda: "Ayurveda & Dinacharya Sagrado",
      meditacion: "Meditación Somática & Box Breathing",
      masajes: "Masajes & Recuperación Miofascial",
      idiomas: "Studium Linguarum (Alemán & Euskera)",
      musica: "Academia Musici & Trompeta Jazz",
      fotografia: "Fotografía & Visión Territorial",
      pintura: "Atelier de Bellas Artes & Color",
      astral: "Observatorio Celeste & Carta Natal",
      progresion: "Sistema Maestro de Progresión"
    };
    const title = titlesMap[tabKey] || tabKey.toUpperCase();
    const tabEl = document.getElementById("tab-" + tabKey);
    if (!tabEl) return;

    let banner = tabEl.querySelector(".imperivm-module-top-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "imperivm-module-top-banner";
      banner.style.cssText = "background: rgba(14, 18, 29, 0.96); border: 1.5px solid var(--imperivm-border-gold); padding: 14px 20px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.8);";
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.6rem;">🏛️</span>
          <div>
            <span style="font-size: 0.72rem; color: var(--imperivm-text-gold); font-weight: 800; text-transform: uppercase;">IMPERIVM • CÓDICE DE LA ORDEN</span>
            <h4 style="font-family: var(--imperivm-font-title); font-size: 1.15rem; color: #FFF; margin: 2px 0 0 0;">${title}</h4>
          </div>
        </div>
        <button class="btn-imperivm-primary" style="padding: 8px 18px; font-size: 0.8rem;" onclick="selectMainTab('dashboard');">
          <span>← Volver al Visor Imperivm</span>
        </button>
      `;
      tabEl.insertBefore(banner, tabEl.firstChild);
    }
  },

  ensureReturnButton() {
    let btn = document.getElementById("imperivm-floating-return-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "imperivm-floating-return-btn";
      btn.className = "btn-imperivm-return-floating";
      btn.innerHTML = `<span>🏛️</span> <span>Volver a Imperivm</span>`;
      btn.onclick = () => {
        selectMainTab('dashboard');
        btn.remove();
      };
      document.body.appendChild(btn);
    }
  },

  // --- DRAWER UNIFICADO DE FINANZAS & AHORRO ---
  openUnifiedFinanceDrawer() {
    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    const titleEl = document.getElementById("imperivm-drawer-title");
    const tabsBar = document.getElementById("imperivm-drawer-tabs-bar");
    const body = document.getElementById("imperivm-drawer-body");
    if (!drawer || !backdrop || !body) return;

    if (tabsBar) tabsBar.innerHTML = "";
    drawer.scrollTop = 0;
    titleEl.textContent = "⚖️ ANÁLISIS UNIFICADO DE FINANZAS";

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        
        <!-- HEADER HERO -->
        <div style="position: relative; border-radius: 8px; overflow: hidden; height: 150px; border: 1.5px solid var(--imperivm-border-gold);">
          <img src="${IMPERIVM_MEDIA.finanzas_fiscus}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65);">
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 20%, rgba(7,9,14,0.92) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 14px 18px;">
            <span style="font-size: 0.72rem; color: var(--imperivm-text-gold); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Soberanía Económica Consolidada</span>
            <h3 style="font-family: var(--imperivm-font-title); font-size: 1.25rem; color: #FFF; margin: 2px 0 0 0;">Patrimonio, Flujo & Metas 2026 - 2027</h3>
          </div>
        </div>

        <!-- RESUMEN DE SALDOS GLOBALES -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 0.7rem; color: var(--imperivm-text-muted); text-transform: uppercase; margin-bottom: 4px;">🇩🇪 Alemania (EUR)</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--imperivm-text-gold);">€ 2.450,00</div>
            <div style="font-size: 0.68rem; color: #52C41A; margin-top: 2px;">✓ Sparkasse Activa</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 0.7rem; color: var(--imperivm-text-muted); text-transform: uppercase; margin-bottom: 4px;">🇨🇱 Chile (CLP)</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #FFF;">$ 1.850.000</div>
            <div style="font-size: 0.68rem; color: var(--imperivm-text-muted); margin-top: 2px;">Banco de Chile</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: 0.7rem; color: var(--imperivm-text-muted); text-transform: uppercase; margin-bottom: 4px;">💳 Crédito CLP</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #FF6B6B;">-$ 320.000</div>
            <div style="font-size: 0.68rem; color: #FF6B6B; margin-top: 2px;">Por Liquidar</div>
          </div>
        </div>

        <!-- 4 PILARES INTEGRADOS -->
        
        <!-- 1. SPARKASSE -->
        <div style="background: rgba(14, 18, 29, 0.75); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #FFF; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
              🇩🇪 Sparkasse Hannover (Cuenta Principal EUR)
            </strong>
            <span style="font-size: 0.72rem; color: #52C41A; border: 1px solid #52C41A; border-radius: 12px; padding: 2px 8px;">Al Día</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--imperivm-text-muted); margin: 0 0 10px 0; line-height: 1.45;">
            Manutención, matrícula máster de investigación y vida europea. Saldo estimado: <strong>€ 2,450.00 EUR</strong>.
          </p>
          <div style="background: rgba(82, 196, 26, 0.08); border: 1px solid rgba(82, 196, 26, 0.3); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #E2E8F0;">
            📥 Compatible con extractos bancarios <code>Ejemplo_Sparkasse_Extracto.csv</code>.
          </div>
        </div>

        <!-- 2. BANCO DE CHILE -->
        <div style="background: rgba(14, 18, 29, 0.75); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #FFF; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
              🇨🇱 Banco de Chile (Fondo de Emergencia CLP)
            </strong>
            <span style="font-size: 0.72rem; color: var(--imperivm-text-gold); border: 1px solid var(--imperivm-border-gold); border-radius: 12px; padding: 2px 8px;">Reserva</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--imperivm-text-muted); margin: 0 0 10px 0; line-height: 1.45;">
            Solvencia patrimonial y cuenta de reserva. Saldo líquido en cuenta: <strong>$ 1.850.000 CLP</strong> (Tarjeta: -$ 320.000 CLP).
          </p>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #E2E8F0;">
            📥 Compatible con extractos <code>Ejemplo_Banco_Chile_Extracto.csv</code>.
          </div>
        </div>

        <!-- 3. CASHFLOW & PRESPUESTO 50/30/20 -->
        <div style="background: rgba(14, 18, 29, 0.75); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #FFF; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
              📊 Cashflow & Presupuesto (Regla 50/30/20)
            </strong>
            <span style="font-size: 0.72rem; color: #FFA940; border: 1px solid #FFA940; border-radius: 12px; padding: 2px 8px;">Estrategia</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--imperivm-text-muted);">50% Gastos Fijos Básicos:</span>
              <strong style="color: #FFF;">Alquiler, alimentación, transporte</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--imperivm-text-muted);">30% Desarrollo & Salud:</span>
              <strong style="color: var(--imperivm-text-gold);">Muay Thai, escalada, libros, idiomas</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--imperivm-text-muted);">20% Ahorro Blindado:</span>
              <strong style="color: #52C41A;">Fondo de reserva intocable</strong>
            </div>
          </div>
        </div>

        <!-- 4. METAS DE SOBERANÍA Y MUDANZA -->
        <div style="background: rgba(14, 18, 29, 0.75); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #FFF; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
              🎯 Metas de Soberanía & Migración
            </strong>
            <span style="font-size: 0.72rem; color: var(--imperivm-text-gold); border: 1px solid var(--imperivm-border-gold); border-radius: 12px; padding: 2px 8px;">2026 - 2027</span>
          </div>
          <ul style="font-size: 0.8rem; color: var(--imperivm-text-muted); line-height: 1.5; margin: 0; padding-left: 18px;">
            <li><strong style="color: #FFF;">Fondo Hannover:</strong> Coste de mudanza y fianza asegurados.</li>
            <li><strong style="color: #FFF;">Transición a Bilbao (2027):</strong> Fondo de trámites y radicación.</li>
            <li><strong style="color: #FFF;">Regla Estoica:</strong> Revisión dominical y cero compras impulsivas.</li>
          </ul>
        </div>

        <!-- BOTONES DE ACCIÓN -->
        <div style="display: flex; gap: 10px; margin-top: 6px;">
          <button class="btn-imperivm-primary" style="flex: 1; justify-content: center; padding: 10px 16px;" onclick="imperivmEngine.closeDrawer(); selectMainTab('finanzas'); imperivmEngine.ensureReturnButton();">
            📊 Abrir Panel Maestro Completo (CSV) ▶
          </button>
          <button class="btn-imperivm-secondary" onclick="imperivmEngine.closeDrawer();">
            Cerrar
          </button>
        </div>

      </div>
    `;

    this.openDrawer();
  },

  openFinanceDrawer(type) {
    return this.openUnifiedFinanceDrawer();
  },

  // ==========================================================================
  // MÓDULOS DE CONSTRUCCIÓN & FORJA APOLÍNEA (DATEMASTER APEX)
  // ==========================================================================
  activeConstruccionModule: "nietzsche",

  openConstruccionModal(moduleKey = "nietzsche") {
    this.activeConstruccionModule = moduleKey;
    const modal = document.getElementById("construccion-apex-modal");
    if (!modal) return;
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    this.renderConstruccionModalContent(moduleKey);
  },

  closeConstruccionModal() {
    const modal = document.getElementById("construccion-apex-modal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  },

  switchConstruccionModule(moduleKey) {
    this.activeConstruccionModule = moduleKey;
    this.renderConstruccionModalContent(moduleKey);
  },

  renderConstruccionModalContent(moduleKey) {
    const container = document.getElementById("construccion-modal-content");
    if (!container) return;

    const modulesData = {
      nietzsche: {
        title: "La Síntesis Nietzscheana",
        tag: "🏛️🍷 VOLUNTAD DE PODER // APEX",
        badge: "SÍNTESIS",
        color: "#E5A93C",
        banner: IMPERIVM_MEDIA.construccion_nietzsche,
        subtitle: "Apolo encauzando el fuego salvaje de Dionisio",
        desc: "La integración suprema del hombre: la estructura estoica y sobria de Apolo dando cauce a la fuerza vital, erótica y creativa de Dionisio. Todo articulado desde la lealtad y complicidad con tu pareja pilar, Marie Langer."
      },
      tscore: {
        title: "Tablero T-Score & Bio-Feedback",
        tag: "📊 BIOLOGÍA // MODO TRAIN",
        badge: "BIO-FEEDBACK",
        color: "#4ADE80",
        banner: IMPERIVM_MEDIA.construccion_tscore,
        subtitle: "Optimización Hormonal, Fuerza & Sistema Nervioso",
        desc: "El magnetismo masculino es el subproducto biológico inevitable de un hombre con testosterona optimizada, cuerpo entrenado, sistema nervioso regulado y misión clara."
      },
      monk: {
        title: "Monk Mode & Reset Dopamina",
        tag: "🧠 ENFOQUE // DISCIPLINA",
        badge: "MONK MODE",
        color: "#60A5FA",
        banner: IMPERIVM_MEDIA.construccion_monk,
        subtitle: "Protocolo 21 Días de Desintoxicación Radical",
        desc: "Eliminación estricta de gratificación instantánea, pornografía y estímulos vacíos. Recupera el hambre voraz por tus metas y la calma mental inquebrantable."
      },
      estoicismo: {
        title: "Filosofía Estoica & Poder",
        tag: "🏛️ ESTOICISMO // MARCO DE ACERO",
        badge: "ESTOICISMO",
        color: "#C59A28",
        banner: IMPERIVM_MEDIA.construccion_filosofia,
        subtitle: "Dicotomía del Control & Presencia Sobria",
        desc: "Principios de Marco Inquebrantable basados en Epicteto, Séneca y Marco Aurelio. El control absoluto de tus juicios y la templanza inalterable ante cualquier escenario."
      },
      biohacking: {
        title: "Biohacking & Suplementos",
        tag: "⚡ BIOTECNOLOGÍA // NUTRICIÓN",
        badge: "BIOHACKING",
        color: "#A78BFA",
        banner: IMPERIVM_MEDIA.construccion_biohacking,
        subtitle: "Stacks, Frío, Sauna & Circadianos",
        desc: "Protocolos biomecánicos y nutricionales avanzados para maximizar tu vitalidad matutina, concentración ejecutiva y recuperación muscular."
      },
      honor: {
        title: "Código de Honor APEX",
        tag: "👑 CÓDIGO // PRINCIPIOS APEX",
        badge: "CÓDIGO DE HONOR",
        color: "#F87171",
        banner: IMPERIVM_MEDIA.construccion_honor,
        subtitle: "Los 10 Preceptos No Negociables del Caballero",
        desc: "El mapa de comportamiento del hombre completo: palabra empeñada inviolable, autodisciplina estoica, protección de los tuyos y magnanimidad soberana."
      },
      tantra: {
        title: "Academia Tantra & Maestría Sexual",
        tag: "🔥 TANTRA // SOBERANÍA",
        badge: "TANTRA APEX",
        color: "#FB7185",
        banner: IMPERIVM_MEDIA.tantra_karezza,
        subtitle: "4 Pilares de Maestría Erótica Masculina & Karezza",
        desc: "Integración de energía vital, control orgásmico sin eyaculación involuntaria, presencia tántrica profunda y conexión íntima con tu pareja pilar."
      }
    };

    const mod = modulesData[moduleKey] || modulesData.nietzsche;
    const navKeys = Object.keys(modulesData);

    let specificContentHTML = "";

    // 1. NIETZSCHE
    if (moduleKey === "nietzsche") {
      const savedApo = localStorage.getItem("APEX_APOLINEO_LEVEL") || 8;
      const savedDion = localStorage.getItem("APEX_DIONISIACO_LEVEL") || 7;
      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(229,169,60,0.08); border: 1.5px solid rgba(229,169,60,0.3); border-radius: 10px; padding: 18px;">
            <h4 style="font-family: var(--imperivm-font-title); color: #E5A93C; margin: 0 0 10px 0; font-size: 1.05rem;">⚖️ Calibrador de Integración Apolíneo / Dionisíaco</h4>
            <p style="font-size: 0.8rem; color: #CCC; margin-bottom: 16px;">
              El error del hombre débil es reprimirse (falso ascetismo) o entregarse al desenfreno caótico. La grandeza nace de la tensión fértil: Apolo construye la copa de cristal, Dionisio vierte el vino de la pasión.
            </p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 14px;">
              <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: 8px; border-left: 3px solid #60A5FA;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="color: #93C5FD; font-size: 0.85rem;">🏛️ Orden Apolíneo</strong>
                  <span id="label-apolineo" style="font-weight: 800; color: #FFF; font-size: 0.95rem;">${savedApo} / 10</span>
                </div>
                <input type="range" min="1" max="10" value="${savedApo}" id="slider-apolineo" oninput="imperivmEngine.updateNietzscheBalance();" style="width: 100%; accent-color: #60A5FA; cursor: pointer;">
                <span style="font-size: 0.72rem; color: #888; display: block; margin-top: 4px;">Disciplina, estructura, razón, contención estoica</span>
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: 8px; border-left: 3px solid #F87171;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="color: #FCA5A5; font-size: 0.85rem;">🍷 Fuego Dionisíaco</strong>
                  <span id="label-dionisiaco" style="font-weight: 800; color: #FFF; font-size: 0.95rem;">${savedDion} / 10</span>
                </div>
                <input type="range" min="1" max="10" value="${savedDion}" id="slider-dionisiaco" oninput="imperivmEngine.updateNietzscheBalance();" style="width: 100%; accent-color: #F87171; cursor: pointer;">
                <span style="font-size: 0.72rem; color: #888; display: block; margin-top: 4px;">Pasión vital, libido, magnetismo, arrojo salvaje</span>
              </div>
            </div>

            <div id="nietzsche-diagnostic-box" style="background: rgba(0,0,0,0.6); padding: 12px 16px; border-radius: 6px; font-size: 0.82rem; color: #FAF6EE; border: 1px solid rgba(229,169,60,0.2);">
              <!-- Inyectado por updateNietzscheBalance() -->
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
              <h5 style="color: var(--imperivm-text-gold); font-size: 0.85rem; margin: 0 0 6px 0;">👑 Voluntad de Poder & Amor Fati</h5>
              <p style="font-size: 0.78rem; color: #AAA; line-height: 1.5; margin: 0;">
                "Mi fórmula para la grandeza del hombre es amor fati: no querer que nada sea distinto ni en el pasado ni en el futuro. No solo soportar lo necesario, sino amarlo." — F. Nietzsche
              </p>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
              <h5 style="color: #F472B6; font-size: 0.85rem; margin: 0 0 6px 0;">❤️ Complicidad Pilar (Marie Langer)</h5>
              <p style="font-size: 0.78rem; color: #AAA; line-height: 1.5; margin: 0;">
                El hombre soberano no busca validación ajena: construye un santuario de amor, erotismo sano y complicidad leal con su compañera de vida.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // 2. TSCORE
    else if (moduleKey === "tscore") {
      const savedSleep = localStorage.getItem("APEX_TSCORE_SLEEP") || 8;
      const savedEnergy = localStorage.getItem("APEX_TSCORE_ENERGY") || 9;
      const savedVitality = localStorage.getItem("APEX_TSCORE_VITALITY") || 8;
      const savedClean = localStorage.getItem("APEX_TSCORE_CLEAN") === "1" ? true : false;
      const lastScore = localStorage.getItem("APEX_TSCORE_CURRENT") || 88;

      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(74,222,128,0.08); border: 1.5px solid rgba(74,222,128,0.3); border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
              <h4 style="font-family: var(--imperivm-font-title); color: #4ADE80; margin: 0; font-size: 1.1rem;">📊 Check-in Diario de Bio-Feedback Hormonal</h4>
              <div style="background: #0B0E14; border: 1.5px solid #4ADE80; padding: 6px 14px; border-radius: 8px; text-align: center;">
                <span style="font-size: 0.68rem; color: #888; text-transform: uppercase;">T-Score Actual</span>
                <div id="tscore-big-display" style="font-size: 1.5rem; font-weight: 900; color: #4ADE80; font-family: var(--imperivm-font-title);">${lastScore} / 100</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 16px;">
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px;">
                <label style="font-size: 0.8rem; color: #DDD; display: flex; justify-content: space-between;">
                  <span>😴 Calidad de Sueño</span>
                  <strong id="label-tscore-sleep" style="color: #4ADE80;">${savedSleep}/10</strong>
                </label>
                <input type="range" min="1" max="10" value="${savedSleep}" id="slider-tscore-sleep" oninput="imperivmEngine.calculateTScore();" style="width: 100%; accent-color: #4ADE80; margin-top: 6px;">
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px;">
                <label style="font-size: 0.8rem; color: #DDD; display: flex; justify-content: space-between;">
                  <span>🏋️ Fuerza & Energía</span>
                  <strong id="label-tscore-energy" style="color: #4ADE80;">${savedEnergy}/10</strong>
                </label>
                <input type="range" min="1" max="10" value="${savedEnergy}" id="slider-tscore-energy" oninput="imperivmEngine.calculateTScore();" style="width: 100%; accent-color: #4ADE80; margin-top: 6px;">
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px;">
                <label style="font-size: 0.8rem; color: #DDD; display: flex; justify-content: space-between;">
                  <span>☀️ Vitalidad Matutina</span>
                  <strong id="label-tscore-vitality" style="color: #4ADE80;">${savedVitality}/10</strong>
                </label>
                <input type="range" min="1" max="10" value="${savedVitality}" id="slider-tscore-vitality" oninput="imperivmEngine.calculateTScore();" style="width: 100%; accent-color: #4ADE80; margin-top: 6px;">
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.4); padding: 12px 16px; border-radius: 8px; flex-wrap: wrap; gap: 10px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.84rem; color: #FFF;">
                <input type="checkbox" id="check-tscore-clean" ${savedClean ? 'checked' : ''} onchange="imperivmEngine.calculateTScore();" style="transform: scale(1.2); accent-color: #4ADE80;">
                <span>🕊️ Día Limpio Sin Porno (+5 Puntos T-Score Boost)</span>
              </label>
              <button class="btn-imperivm-primary" onclick="imperivmEngine.saveTScoreCheckin();" style="padding: 8px 18px; font-size: 0.8rem;">
                💾 Guardar Check-in de Hoy
              </button>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 14px;">
            <strong style="color: var(--imperivm-text-gold); font-size: 0.85rem; display: block; margin-bottom: 6px;">🧪 Pilares Biomecánicos Pro-Testosterona:</strong>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.78rem; color: #AAA;">
              <div>• Levantamientos compuestos pesados (RPE 8-9)</div>
              <div>• Grasas saturadas y monoinsaturadas nobles</div>
              <div>• Luz solar directa matutina en ojos y piel</div>
              <div>• 0 Microplásticos ni estrógenos ambientales</div>
            </div>
          </div>
        </div>
      `;
    }

    // 3. MONK MODE
    else if (moduleKey === "monk") {
      const completedDays = JSON.parse(localStorage.getItem("APEX_MONK_DAYS") || "[1,2,3,4,5]");
      const daysHTML = Array.from({ length: 21 }, (_, i) => i + 1).map(d => {
        const isDone = completedDays.includes(d);
        return `
          <button onclick="imperivmEngine.toggleMonkDay(${d});" style="background: ${isDone ? '#2563EB' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${isDone ? '#60A5FA' : 'rgba(255,255,255,0.1)'}; color: ${isDone ? '#FFF' : '#888'}; padding: 8px 4px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer; transition: all 0.2s;">
            ${d} ${isDone ? '✓' : ''}
          </button>
        `;
      }).join('');

      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(96,165,250,0.08); border: 1.5px solid rgba(96,165,250,0.3); border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-family: var(--imperivm-font-title); color: #60A5FA; margin: 0; font-size: 1.1rem;">🧠 Matriz Monk Mode (21 Días de Reset Sináptico)</h4>
              <span style="font-size: 0.76rem; color: #93C5FD; font-weight: 700;">Conquistados: ${completedDays.length} / 21 Días</span>
            </div>
            
            <p style="font-size: 0.8rem; color: #CCC; margin-bottom: 14px;">
              El Monk Mode es un período de aislamiento estratégico y sobriedad radical. No negocias con la mediocridad. Cada día conquistado reconstruye tus receptores de dopamina D2.
            </p>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 16px;">
              ${daysHTML}
            </div>

            <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: 8px;">
              <strong style="color: #60A5FA; font-size: 0.85rem; display: block; margin-bottom: 8px;">🛡️ Las 5 Leyes Inquebrantables del Monk Mode:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem; color: #DDD;">
                <div>1. 🕊️ 0 Pornografía ni estímulos eróticos artificiales.</div>
                <div>2. 📵 0 Scroll infinito en redes ni dopamina barata.</div>
                <div>3. 🥗 0 Azúcar refinada, comida chatarra ni ultraprocesados.</div>
                <div>4. 🏋️ 60+ min de entrenamiento de alta intensidad.</div>
                <div style="grid-column: span 2;">5. 📖 90+ min de Deep Work / Estudio monolítico sin teléfono cerca.</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 4. ESTOICISMO
    else if (moduleKey === "estoicismo") {
      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(197,154,40,0.08); border: 1.5px solid rgba(197,154,40,0.3); border-radius: 10px; padding: 18px;">
            <h4 style="font-family: var(--imperivm-font-title); color: #C59A28; margin: 0 0 10px 0; font-size: 1.1rem;">🏛️ El Filtro de Epicteto: Dicotomía del Control</h4>
            <p style="font-size: 0.8rem; color: #CCC; margin-bottom: 14px;">
              "De las cosas que existen, unas dependen de nosotros, y otras no." — Ingresa cualquier juicio, fricción o problema para someterlo al tribunal estoico.
            </p>

            <div style="display: flex; gap: 10px; margin-bottom: 12px;">
              <input type="text" id="estoicismo-dilemma-input" placeholder="Ej: Me preocupa el resultado de una postulación o examen..." style="flex: 1; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 10px 12px; color: #FFF; font-size: 0.85rem; outline: none;">
              <button class="btn-imperivm-primary" onclick="imperivmEngine.evaluateEstoicismoDichotomy();" style="padding: 10px 18px; font-size: 0.8rem;">
                ⚔️ Analizar
              </button>
            </div>

            <div id="estoicismo-result-box" style="display: none; background: rgba(0,0,0,0.5); border-left: 3px solid #C59A28; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 0.82rem; color: #FAF6EE; margin-bottom: 14px;">
              <!-- Inyectado dinámicamente -->
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 1.2rem;">🧘</span>
                <strong style="display: block; color: #C59A28; font-size: 0.78rem; margin-top: 4px;">Templanza</strong>
                <span style="font-size: 0.7rem; color: #888;">Sophrosyne</span>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 1.2rem;">🛡️</span>
                <strong style="display: block; color: #C59A28; font-size: 0.78rem; margin-top: 4px;">Coraje</strong>
                <span style="font-size: 0.7rem; color: #888;">Andreia</span>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 1.2rem;">⚖️</span>
                <strong style="display: block; color: #C59A28; font-size: 0.78rem; margin-top: 4px;">Justicia</strong>
                <span style="font-size: 0.7rem; color: #888;">Dikaiosyne</span>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 1.2rem;">🦉</span>
                <strong style="display: block; color: #C59A28; font-size: 0.78rem; margin-top: 4px;">Sabiduría</strong>
                <span style="font-size: 0.7rem; color: #888;">Phronesis</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 5. BIOHACKING
    else if (moduleKey === "biohacking") {
      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(167,139,250,0.08); border: 1.5px solid rgba(167,139,250,0.3); border-radius: 10px; padding: 18px;">
            <h4 style="font-family: var(--imperivm-font-title); color: #A78BFA; margin: 0 0 10px 0; font-size: 1.1rem;">⚡ Protocolo Circadiano & Stacks Clínicos</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px;">
                <strong style="color: #FCD34D; font-size: 0.85rem; display: block; margin-bottom: 6px;">☀️ Mañana (06:00 - 12:00)</strong>
                <ul style="font-size: 0.78rem; color: #CCC; margin: 0; padding-left: 18px; line-height: 1.5;">
                  <li>Luz solar en ojos 10-15 min (fijación cortisol matutino).</li>
                  <li>500ml agua templada + sal marina celta / electrolitos.</li>
                  <li>Ducha fría 2-3 min a 10°C (dopamina basal +250%).</li>
                  <li>Retrasar café 90 min tras despertar (evita bajón vespertino).</li>
                </ul>
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px;">
                <strong style="color: #818CF8; font-size: 0.85rem; display: block; margin-bottom: 6px;">🌙 Noche (20:00 - 23:00)</strong>
                <ul style="font-size: 0.78rem; color: #CCC; margin: 0; padding-left: 18px; line-height: 1.5;">
                  <li>Corte de luz azul: modo noche y luces cálidas bajas.</li>
                  <li>Magnesio Bisglicinato 400mg + L-Teanina 200mg.</li>
                  <li>Temperatura habitación a 18°C (induce sueño REM).</li>
                  <li>Última ingesta calórica 3 horas antes de acostarse.</li>
                </ul>
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 12px;">
              <strong style="color: #A78BFA; font-size: 0.84rem; display: block; margin-bottom: 6px;">💊 Stacks Clínicos de Alto Rendimiento:</strong>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 0.76rem; color: #DDD;">
                <div style="background: rgba(255,255,255,0.04); padding: 8px; border-radius: 6px;">
                  <strong style="color: #FFF;">Creatina Creapure</strong><br>5g diarios continuos (ATP y cerebro).
                </div>
                <div style="background: rgba(255,255,255,0.04); padding: 8px; border-radius: 6px;">
                  <strong style="color: #FFF;">Ashwagandha KSM-66</strong><br>600mg (reducción cortisol).
                </div>
                <div style="background: rgba(255,255,255,0.04); padding: 8px; border-radius: 6px;">
                  <strong style="color: #FFF;">Omega 3 EPA/DHA</strong><br>2g grado farmacéutico IFOS.
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 6. HONOR
    else if (moduleKey === "honor") {
      const oaths = [
        "1. La palabra empeñada es una ley de bronce inquebrantable.",
        "2. El cuerpo es el templo y el escudo; el entrenamiento no se negocia.",
        "3. El autodominio sexual es la raíz del magnetismo masculino.",
        "4. Amor leal, transparente y protector con tu pareja pilar.",
        "5. Soberanía financiera: gastar con sobriedad e invertir en libertad.",
        "6. Calma bajo el fuego: la emoción no nubla el juicio pretoriano.",
        "7. Excelencia intelectual: lectura crítica y oficio diario.",
        "8. Protección del vulnerable y generosidad con tus hermanos.",
        "9. Aceptación del destino (Amor Fati) sin quejas ni victimismo.",
        "10. Vivir cada jornada como si de ella dependiera el legado de la Orden."
      ];

      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(248,113,113,0.08); border: 1.5px solid rgba(248,113,113,0.3); border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-family: var(--imperivm-font-title); color: #F87171; margin: 0; font-size: 1.1rem;">👑 Los 10 Mandamientos del Código de Honor APEX</h4>
              <button class="btn-imperivm-primary" onclick="imperivmEngine.swearApexHonorOath();" style="padding: 6px 14px; font-size: 0.78rem;">
                ⚔️ Sellar Juramento (+30 XP)
              </button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${oaths.map(o => `
                <div style="background: rgba(0,0,0,0.4); border-left: 2px solid #F87171; padding: 10px 12px; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: #DDD;">
                  ${o}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // 7. TANTRA & MAESTRÍA SEXUAL
    else if (moduleKey === "tantra") {
      const tantraLessons = [
        {
          id: 1,
          title: "Respiración Somática & Circulación Microcósmica",
          cat: "Energía & Presencia",
          duracion: "15 min",
          desc: "Transmuta la excitación en vitalidad para multiplicar la sensibilidad y evitar la fatiga.",
          img: IMPERIVM_MEDIA.tantra_breathwork,
          steps: [
            "Siéntate erguido o recuéstate sin almohada.",
            "Inhala en 4s subiendo energía luminosa desde el perineo hacia el entrecejo.",
            "Sostén 2s contrayendo suavemente el suelo pélvico (Mula Bandha).",
            "Exhala en 6s expandiendo la energía vital por el pecho y extremidades."
          ]
        },
        {
          id: 2,
          title: "El Arte del Toque Lento & Mapeo Corporal (Somatic Touch)",
          cat: "Toque & Conexión",
          duracion: "30 min",
          desc: "Desacelera la mente, disuelve la ansiedad de rendimiento y despierta la piel completa.",
          img: IMPERIVM_MEDIA.tantra_touch,
          steps: [
            "Crea atmósfera con luz cálida tenue y aceite botánico.",
            "Acuerden 15 min donde uno solo brinda toque sin esperar nada a cambio.",
            "Usa palmas y yemas rozando a 1 cm/segundo desde la periferia.",
            "Sincroniza tu ritmo respiratorio con el de tu pareja."
          ]
        },
        {
          id: 3,
          title: "Dominio Orgásmico & Inyaculación (Karezza)",
          cat: "Maestría Sexual Masculina",
          duracion: "20 min",
          desc: "Diferenciación biológica entre orgasmo y eyaculación. Valles orgásmicos sostenidos.",
          img: IMPERIVM_MEDIA.tantra_karezza,
          steps: [
            "Identifica tu nivel de excitación en escala 1 a 10.",
            "Al alcanzar el 8, detén la estimulación física de inmediato.",
            "Exhala largo por la boca y efectúa 3 contracciones de perineo hacia arriba.",
            "Reanuda solo cuando la excitación descienda al nivel 6."
          ]
        },
        {
          id: 4,
          title: "Ritual de Mirada de Alma (Eye-Gazing & Sintonización)",
          cat: "Intimidad Profunda",
          duracion: "10 min",
          desc: "Disuelve la timidez, dispara la oxitocina y genera polaridad magnética instantánea.",
          img: IMPERIVM_MEDIA.tantra_eyegazing,
          steps: [
            "Siéntense frente a frente a 50 cm de distancia.",
            "Mano izquierda sobre el corazón del otro en conexión recíproca.",
            "Mirada fija al ojo izquierdo del otro (ojo receptivo del alma).",
            "5 minutos de silencio absoluto respirando en un solo compás."
          ]
        }
      ];

      specificContentHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: rgba(251,113,133,0.08); border: 1.5px solid rgba(251,113,133,0.3); border-radius: 10px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h4 style="font-family: var(--imperivm-font-title); color: #FB7185; margin: 0; font-size: 1.15rem;">🔥 4 Protocolos Maestros de Tantra & Polaridad</h4>
                <p style="font-size: 0.8rem; color: #CCC; margin: 4px 0 0 0;">Lecciones maestras importadas de DateMaster Apex para soberanía erótica.</p>
              </div>
              <button class="btn-imperivm-primary" onclick="imperivmEngine.recordTantraPractice();" style="padding: 6px 14px; font-size: 0.78rem;">
                🧘 Registrar Sesión Tantra (+40 XP)
              </button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
              ${tantraLessons.map(l => `
                <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(251,113,133,0.25); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                  <div style="height: 120px; overflow: hidden; position: relative;">
                    <img src="${l.img}" alt="${l.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    <span style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.75); color: #FB7185; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; border: 1px solid #FB7185;">${l.cat}</span>
                    <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #FFF; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px;">⏱️ ${l.duracion}</span>
                  </div>
                  <div style="padding: 12px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <h5 style="color: #FFF; font-size: 0.85rem; margin: 0 0 6px 0; font-weight: 700; line-height: 1.3;">${l.title}</h5>
                      <p style="color: #BBB; font-size: 0.76rem; margin: 0 0 10px 0; line-height: 1.4;">${l.desc}</p>
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px;">
                      <strong style="color: #FB7185; font-size: 0.7rem; display: block; margin-bottom: 4px; text-transform: uppercase;">Pasos Clave:</strong>
                      <ol style="margin: 0; padding-left: 14px; color: #EEE; font-size: 0.72rem; line-height: 1.45;">
                        ${l.steps.map(s => `<li>${s}</li>`).join('')}
                      </ol>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <!-- HEADER DEL MODAL CON BOTÓN CERRAR -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge-tag" style="border-color: ${mod.color}; color: ${mod.color}; background: rgba(255,255,255,0.05); font-size: 0.72rem; padding: 2px 8px; font-weight: 800;">
              ${mod.tag}
            </span>
            <span class="badge-tag" style="background: rgba(255,255,255,0.08); color: #FFF; font-size: 0.72rem; padding: 2px 8px;">
              DateMaster Apex
            </span>
          </div>
          <h2 style="font-family: var(--imperivm-font-title); color: #FFF; font-size: 1.5rem; margin: 4px 0 0 0;">
            ${mod.title}
          </h2>
          <p style="font-size: 0.82rem; color: var(--imperivm-text-muted); margin: 4px 0 0 0;">
            ${mod.subtitle}
          </p>
        </div>

        <button onclick="imperivmEngine.closeConstruccionModal();" style="background: rgba(255,255,255,0.08); border: 1px solid var(--imperivm-border); color: #FFF; border-radius: 8px; padding: 8px 14px; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
          <span>✕</span> <span>Cerrar</span>
        </button>
      </div>

      <!-- SELECTOR TIPO SUB-TABS DE LOS 7 MÓDULOS -->
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 16px;">
        ${navKeys.map(k => {
          const m = modulesData[k];
          const isCurrent = k === moduleKey;
          return `
            <button onclick="imperivmEngine.switchConstruccionModule('${k}');" style="padding: 8px 6px; border-radius: 6px; border: 1px solid ${isCurrent ? m.color : 'rgba(255,255,255,0.08)'}; background: ${isCurrent ? m.color + '22' : 'rgba(0,0,0,0.3)'}; color: ${isCurrent ? m.color : '#888'}; font-weight: ${isCurrent ? '800' : '500'}; font-size: 0.72rem; cursor: pointer; transition: all 0.2s; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${m.badge}
            </button>
          `;
        }).join('')}
      </div>

      <!-- BANNER SUPERIOR CON IMAGEN GENERADA Y RECORTADA -->
      <div style="position: relative; border-radius: 10px; overflow: hidden; border: 1.5px solid ${mod.color}; margin-bottom: 18px; max-height: 240px; box-shadow: 0 4px 20px rgba(0,0,0,0.6);">
        <img src="${mod.banner}" alt="${mod.title}" style="width: 100%; height: 240px; object-fit: cover; display: block;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 18px; background: linear-gradient(to top, rgba(11,14,20,0.95) 0%, transparent 100%);">
          <p style="font-size: 0.82rem; color: #FAF6EE; margin: 0; line-height: 1.4; max-width: 820px;">
            ${mod.desc}
          </p>
        </div>
      </div>

      <!-- CONTENIDO ESPECÍFICO INTERACTIVO -->
      ${specificContentHTML}
    `;

    if (moduleKey === "nietzsche") {
      this.updateNietzscheBalance();
    }
  },

  updateNietzscheBalance() {
    const apoEl = document.getElementById("slider-apolineo");
    const dionEl = document.getElementById("slider-dionisiaco");
    const labelApo = document.getElementById("label-apolineo");
    const labelDion = document.getElementById("label-dionisiaco");
    const box = document.getElementById("nietzsche-diagnostic-box");
    if (!apoEl || !dionEl || !box) return;

    const apo = Number(apoEl.value);
    const dion = Number(dionEl.value);

    localStorage.setItem("APEX_APOLINEO_LEVEL", apo);
    localStorage.setItem("APEX_DIONISIACO_LEVEL", dion);

    if (labelApo) labelApo.textContent = `${apo} / 10`;
    if (labelDion) labelDion.textContent = `${dion} / 10`;

    let diag = "";
    if (apo >= 7 && dion >= 7) {
      diag = "👑 <strong>Equilibrio Trágico Sublime:</strong> Tienes la estructura de un emperador estoico y el magnetismo voraz del creador. Canalización óptima de la energía vital en tus misiones y con tu pareja pilar.";
    } else if (apo > dion) {
      diag = "🏛️ <strong>Predominio Apolíneo:</strong> Máxima disciplina y templanza mental, pero cuida no volverte rígido o frío. Permite que la llama del deseo y la espontaneidad erótica respire.";
    } else if (dion > apo) {
      diag = "🍷 <strong>Fervor Dionisíaco Elevado:</strong> Pasión y energía desbordante. Necesitas reforzar el marco estoico para no dispersar tu semilla y foco en distracciones.";
    } else {
      diag = "⚖️ <strong>Nivel Basal Equilibrado:</strong> Ambos frentes alineados. Aumenta la intensidad gradual en tus proyectos y entrenamientos.";
    }

    box.innerHTML = diag;
  },

  calculateTScore() {
    const sleepEl = document.getElementById("slider-tscore-sleep");
    const energyEl = document.getElementById("slider-tscore-energy");
    const vitalityEl = document.getElementById("slider-tscore-vitality");
    const cleanEl = document.getElementById("check-tscore-clean");
    const display = document.getElementById("tscore-big-display");
    const labelSleep = document.getElementById("label-tscore-sleep");
    const labelEnergy = document.getElementById("label-tscore-energy");
    const labelVitality = document.getElementById("label-tscore-vitality");

    if (!sleepEl || !energyEl || !vitalityEl) return;

    const sleep = Number(sleepEl.value);
    const energy = Number(energyEl.value);
    const vitality = Number(vitalityEl.value);
    const isClean = cleanEl && cleanEl.checked;

    if (labelSleep) labelSleep.textContent = `${sleep}/10`;
    if (labelEnergy) labelEnergy.textContent = `${energy}/10`;
    if (labelVitality) labelVitality.textContent = `${vitality}/10`;

    let score = Math.round((sleep * 3.5) + (energy * 3.5) + (vitality * 3.0));
    if (isClean) score = Math.min(100, score + 5);

    if (display) {
      display.textContent = `${score} / 100`;
    }
  },

  saveTScoreCheckin() {
    const sleepEl = document.getElementById("slider-tscore-sleep");
    const energyEl = document.getElementById("slider-tscore-energy");
    const vitalityEl = document.getElementById("slider-tscore-vitality");
    const cleanEl = document.getElementById("check-tscore-clean");

    if (!sleepEl || !energyEl || !vitalityEl) return;

    const sleep = Number(sleepEl.value);
    const energy = Number(energyEl.value);
    const vitality = Number(vitalityEl.value);
    const isClean = cleanEl && cleanEl.checked;

    let score = Math.round((sleep * 3.5) + (energy * 3.5) + (vitality * 3.0));
    if (isClean) score = Math.min(100, score + 5);

    localStorage.setItem("APEX_TSCORE_SLEEP", sleep);
    localStorage.setItem("APEX_TSCORE_ENERGY", energy);
    localStorage.setItem("APEX_TSCORE_VITALITY", vitality);
    localStorage.setItem("APEX_TSCORE_CLEAN", isClean ? "1" : "0");
    localStorage.setItem("APEX_TSCORE_CURRENT", score);

    if (typeof awardXP === "function") {
      awardXP(40, "Check-in Bio-Feedback T-Score", "salud", "tscore-checkin");
    }

    if (typeof showNotification === "function") {
      showNotification(`📊 Check-in T-Score guardado: ${score}/100 (+40 XP). Vitalidad optimizada.`);
    }
  },

  toggleMonkDay(day) {
    let completedDays = JSON.parse(localStorage.getItem("APEX_MONK_DAYS") || "[1,2,3,4,5]");
    if (completedDays.includes(day)) {
      completedDays = completedDays.filter(d => d !== day);
    } else {
      completedDays.push(day);
      if (typeof awardXP === "function") {
        awardXP(50, `Monk Mode Día ${day}`, "mente", `monk-day-${day}`);
      }
      if (typeof showNotification === "function") {
        showNotification(`🧠 Día ${day} de Monk Mode Conquistado (+50 XP). Foco de acero.`);
      }
    }
    localStorage.setItem("APEX_MONK_DAYS", JSON.stringify(completedDays));
    this.renderConstruccionModalContent("monk");
  },

  evaluateEstoicismoDichotomy() {
    const input = document.getElementById("estoicismo-dilemma-input");
    const box = document.getElementById("estoicismo-result-box");
    if (!input || !box) return;

    const val = input.value.trim();
    if (!val) return;

    box.style.display = "block";
    box.innerHTML = `
      <strong style="color: #C59A28; display: block; margin-bottom: 4px;">⚖️ Dictamen de la Ciudadela Interior:</strong>
      <p style="margin: 0; line-height: 1.45;">
        Ante la situación: <em>"${val}"</em>.<br>
        <strong>1. Separa lo externo:</strong> El resultado final, la opinión de otros o el azar están FUERA de tu control. Preocuparte por ellos es desgastar tu espíritu en humo.<br>
        <strong>2. Aférrate a tu virtud:</strong> Tu preparación, tu compostura, tu rectitud y tu esfuerzo presente están 100% BAJO tu control. Actúa con impecabilidad y acepta el resto con Amor Fati.
      </p>
    `;
  },

  swearApexHonorOath() {
    if (typeof awardXP === "function") {
      awardXP(30, "Juramento de Honor APEX", "mente", "honor-oath");
    }
    if (typeof showNotification === "function") {
      showNotification("👑 Voto de Honor APEX Sellado (+30 XP). La palabra es ley de bronce.");
    }
  },

  recordTantraPractice() {
    if (typeof awardXP === "function") {
      awardXP(40, "Sesión de Maestría Tántrica & Polaridad", "amor");
    }
    if (typeof showNotification === "function") {
      showNotification("🔥 Sesión de Maestría Tántrica registrada (+40 XP). Vitalidad y presencia integradas.");
    }
  },

  ensureDrawerInDOM() {
    let backdrop = document.getElementById("imperivm-drawer-backdrop");
    let drawer = document.getElementById("imperivm-drawer");

    if (backdrop && backdrop.parentElement !== document.body) {
      document.body.appendChild(backdrop);
    }
    if (drawer && drawer.parentElement !== document.body) {
      document.body.appendChild(drawer);
    }

    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "imperivm-drawer-backdrop";
      backdrop.className = "imperivm-drawer-backdrop";
      backdrop.onclick = () => this.closeDrawer();
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement("div");
      drawer.id = "imperivm-drawer";
      drawer.className = "imperivm-drawer";
      drawer.innerHTML = `
        <div class="imperivm-drawer-header">
          <h3 class="imperivm-drawer-title" id="imperivm-drawer-title">🏛️ ORDO VIVENDI</h3>
          <button class="imperivm-drawer-close" onclick="imperivmEngine.closeDrawer();">&times;</button>
        </div>
        <div class="imperivm-drawer-content" id="imperivm-drawer-body"></div>
      `;
      document.body.appendChild(drawer);
    }
  },

  lockBackgroundScroll() {
    document.body.classList.add("imperivm-drawer-open");
    document.documentElement.classList.add("imperivm-drawer-open");
  },

  unlockBackgroundScroll() {
    document.body.classList.remove("imperivm-drawer-open");
    document.documentElement.classList.remove("imperivm-drawer-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  },

  setupScrollLockGuards() {
    if (this._scrollGuardsAttached) return;
    this._scrollGuardsAttached = true;

    const preventExternalScroll = (e) => {
      if (document.body.classList.contains("imperivm-drawer-open")) {
        const drawer = document.getElementById("imperivm-drawer");
        if (drawer && !drawer.contains(e.target)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", preventExternalScroll, { passive: false });
    window.addEventListener("touchmove", preventExternalScroll, { passive: false });
  },

  openDrawer() {
    this.ensureDrawerInDOM();
    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    if (drawer) drawer.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    this.lockBackgroundScroll();
  },

  closeDrawer() {
    const drawer = document.getElementById("imperivm-drawer");
    const backdrop = document.getElementById("imperivm-drawer-backdrop");
    if (drawer) drawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    this.unlockBackgroundScroll();
  },

  // --- GESTIÓN DE TAREAS RÁPIDAS ---
  openAddTaskModal(scope = "daily") {
    const modal = document.getElementById("imperivm-add-task-modal");
    const titleEl = document.getElementById("add-task-modal-title");
    const scopeSelect = document.getElementById("quick-task-scope-select");
    const input = document.getElementById("quick-task-title-input");

    if (modal) {
      if (titleEl) titleEl.textContent = scope === "daily" ? "➕ Nueva Tarea para Hoy" : "➕ Nueva Tarea Semanal";
      if (scopeSelect) scopeSelect.value = scope;
      if (input) { input.value = ""; setTimeout(() => input.focus(), 100); }
      modal.classList.add("active");
    }
  },

  closeAddTaskModal() {
    const modal = document.getElementById("imperivm-add-task-modal");
    if (modal) modal.classList.remove("active");
  },

  saveQuickTask() {
    const input = document.getElementById("quick-task-title-input");
    const scopeSelect = document.getElementById("quick-task-scope-select");
    const catSelect = document.getElementById("quick-task-cat-select");

    if (!input || !input.value.trim()) return;

    const newTask = {
      id: "task-" + Date.now(),
      title: input.value.trim(),
      category: catSelect ? catSelect.value : "foco",
      timeScope: scopeSelect ? scopeSelect.value : "daily",
      completed: false
    };

    if (typeof appState !== "undefined" && Array.isArray(appState.tasks)) {
      appState.tasks.push(newTask);
      if (typeof saveAppState === "function") saveAppState();
    }

    if (typeof showNotification === "function") {
      showNotification(`✨ Tarea agregada: ${newTask.title}`);
    }

    this.closeAddTaskModal();
    this.render();
  },

  toggleTaskInline(taskId) {
    if (typeof appState !== "undefined" && Array.isArray(appState.tasks)) {
      const t = appState.tasks.find(x => x.id === taskId);
      if (t) {
        t.completed = !t.completed;
        if (t.completed) {
          this.awardVirtus(20, `Deber cumplido: ${t.title}`);
          if (typeof playSoundEffect === "function") playSoundEffect("success");
          if (typeof showNotification === "function") showNotification(`✓ Cumplido: ${t.title} (+20 Virtus)`);
        }
        if (typeof saveAppState === "function") saveAppState();
        this.render();
      }
    }
  },

  // --- MODO FOCUS MONOLÍTICO ---
  startFocusMode() {
    const overlay = document.getElementById("imperivm-focus-overlay");
    if (!overlay) return;

    overlay.classList.add("active");
    imperivmState.focusTimeRemaining = imperivmState.activeFocusDuration;
    this.updateFocusClockDisplay();

    imperivmState.currentQuoteIndex = (imperivmState.currentQuoteIndex + 1) % STOIC_QUOTES.length;
    const q = STOIC_QUOTES[imperivmState.currentQuoteIndex];
    const qEl = document.getElementById("imperivm-focus-quote");
    if (qEl) qEl.textContent = `"${q.text}" — ${q.author}`;

    this.startFocusTimer();
  },

  closeFocusMode() {
    this.pauseFocusTimer();
    const overlay = document.getElementById("imperivm-focus-overlay");
    if (overlay) overlay.classList.remove("active");
  },

  setFocusPreset(minutes) {
    this.pauseFocusTimer();
    imperivmState.activeFocusDuration = minutes * 60;
    imperivmState.focusTimeRemaining = minutes * 60;
    this.updateFocusClockDisplay();

    const presets = document.querySelectorAll(".btn-focus-preset");
    presets.forEach(p => p.classList.remove("active"));
    if (event && event.target) event.target.classList.add("active");

    this.startFocusTimer();
  },

  startFocusTimer() {
    clearInterval(imperivmState.focusTimerInterval);
    imperivmState.isFocusRunning = true;
    
    const btn = document.getElementById("btn-focus-toggle");
    if (btn) btn.innerHTML = `<span>⏸ PAUSAR ENFOQUE</span>`;

    imperivmState.focusTimerInterval = setInterval(() => {
      if (imperivmState.focusTimeRemaining > 0) {
        imperivmState.focusTimeRemaining--;
        this.updateFocusClockDisplay();
      } else {
        this.completeFocusEarly();
      }
    }, 1000);
  },

  pauseFocusTimer() {
    clearInterval(imperivmState.focusTimerInterval);
    imperivmState.isFocusRunning = false;
    const btn = document.getElementById("btn-focus-toggle");
    if (btn) btn.innerHTML = `<span>▶ REANUDAR</span>`;
  },

  toggleFocusTimer() {
    if (imperivmState.isFocusRunning) {
      this.pauseFocusTimer();
    } else {
      this.startFocusTimer();
    }
  },

  updateFocusClockDisplay() {
    const clock = document.getElementById("imperivm-focus-clock");
    if (!clock) return;
    const mins = Math.floor(imperivmState.focusTimeRemaining / 60);
    const secs = imperivmState.focusTimeRemaining % 60;
    clock.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },

  completeFocusEarly() {
    this.pauseFocusTimer();
    this.awardVirtus(75, "Bloque de Flow Monolítico Completado");
    
    if (typeof playSoundEffect === "function") playSoundEffect("levelup");
    if (typeof showNotification === "function") showNotification("🏆 ¡Bloque de Flow Completado! +75 Virtus acumulada.");

    setTimeout(() => {
      this.closeFocusMode();
      this.render();
    }, 400);
  },

  toggleCurrentBlock(blockId) {
    const completedMap = (typeof completedSomaticBlocks !== "undefined") ? completedSomaticBlocks : JSON.parse(localStorage.getItem("completedSomaticBlocks") || "{}");
    const isNow = !completedMap[blockId];
    completedMap[blockId] = isNow;
    localStorage.setItem("completedSomaticBlocks", JSON.stringify(completedMap));
    
    if (typeof completedSomaticBlocks !== "undefined") {
      completedSomaticBlocks[blockId] = isNow;
    }

    if (isNow) {
      this.awardVirtus(50, `Bloque Somático Cumplido (${blockId})`);
      if (typeof playSoundEffect === "function") playSoundEffect("success");
      if (typeof showNotification === "function") showNotification("✨ ¡Bloque Somático Registrado! +50 Virtus.");
    }

    this.render();
  },

  toggleEquipItem(itemId) {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    if (!st || !Array.isArray(st.inventory)) return;
    const item = st.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (!item.unlocked) {
      item.unlocked = true;
      item.equipped = true;
      this.awardVirtus(50, `Objeto Conquistado: ${item.name}`);
      if (typeof showNotification === "function") showNotification(`🏆 ¡Objeto Desbloqueado y Equipado: ${item.name}!`);
    } else {
      item.equipped = !item.equipped;
      if (typeof showNotification === "function") {
        showNotification(`${item.equipped ? '⚡ Instrumento Activo en Servicio' : '📦 Instrumento en Reserva'}: ${item.name}`);
      }
    }

    if (typeof saveReyJaguarState === "function") saveReyJaguarState();
    this.render();
  },

  toggleTitleStatus(titleId, listKey = "titles") {
    const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
    if (!st || !Array.isArray(st[listKey])) return;
    const item = st[listKey].find(x => x.id === titleId);
    if (!item) return;

    item.unlocked = !item.unlocked;
    const titleKey = `title-${listKey}-${item.id}`;
    if (!item.unlocked && window.CJProgress) {
      window.CJProgress.revoke({ key: titleKey });
    }
    if (item.unlocked) {
      this.awardVirtus(40, `Título Consagrado: ${item.name}`, "vida", titleKey);
      if (typeof playSoundEffect === "function") playSoundEffect("success");
      if (typeof showNotification === "function") showNotification(`🏆 ¡Título Consagrado: ${item.name}!`);
    }

    if (typeof saveReyJaguarState === "function") saveReyJaguarState();
    this.render();
  },

  awardVirtus(amount, description = "Acción Imperial", aura = "vida", key = null) {
    if (typeof window.awardXP === "function") {
      window.awardXP(amount, description, aura, key);
    } else {
      const st = (typeof reyJaguarState !== "undefined") ? reyJaguarState : (window.reyJaguarState || null);
      if (st && st.character) {
        st.character.xp = (st.character.xp || 0) + amount;
        if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      }
    }
  },

  scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if (track) {
      track.scrollBy({ left: amount, behavior: 'smooth' });
    }
  },

  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeFocusMode();
        this.closeDrawer();
        this.closeAddTaskModal();
      }
    });
  },

  getItemIcon(name = "") {
    if (name.includes("Gabardina")) return "🧥";
    if (name.includes("Trompeta")) return "🎺";
    if (name.includes("MacBook") || name.includes("Portátil")) return "💻";
    if (name.includes("Pasaporte") || name.includes("Visa")) return "🛂";
    if (name.includes("Libro")) return "📖";
    if (name.includes("Maletín")) return "💼";
    if (name.includes("Moneda") || name.includes("Monedero")) return "🪙";
    if (name.includes("Cámara")) return "📷";
    if (name.includes("Zapatos") || name.includes("Trekking") || name.includes("Zapatillas")) return "🥾";
    if (name.includes("Guantes") || name.includes("Muay")) return "🥊";
    if (name.includes("Mancuerna") || name.includes("Pesa")) return "🏋️";
    if (name.includes("Micrófono")) return "🎙️";
    if (name.includes("Gorro")) return "🏴‍☠️";
    if (name.includes("Traje")) return "👔";
    if (name.includes("Máscara")) return "🎭";
    if (name.includes("Esterilla") || name.includes("Yoga")) return "🧘";
    if (name.includes("Paleta")) return "🎨";
    if (name.includes("Busto")) return "🏛️";
    if (name.includes("Reloj")) return "⏱️";
    if (name.includes("Incensario")) return "🏺";
    if (name.includes("Matcha") || name.includes("Té")) return "🍵";
    if (name.includes("Jade")) return "🪨";
    if (name.includes("Antifaz")) return "😴";
    if (name.includes("Carpa")) return "⛺";
    if (name.includes("Antiparras")) return "🥽";
    if (name.includes("Tijeras")) return "✂️";
    if (name.includes("Pluma")) return "✒️";
    if (name.includes("Astrolabio")) return "🔭";
    if (name.includes("Sándalo")) return "🧴";
    if (name.includes("Ajedrez")) return "♞";
    if (name.includes("Elixir")) return "🧪";
    if (name.includes("Daga")) return "🗡️";
    if (name.includes("Ukelele")) return "🪕";
    if (name.includes("Cáliz")) return "🏆";
    if (name.includes("Escudo")) return "🛡️";
    if (name.includes("Rollo")) return "📜";
    if (name.includes("Águila")) return "🦅";
    if (name.includes("Corona")) return "👑";
    return "⚔️";
  }
};

window.imperivmEngine = imperivmEngine;

// --- RENDERIZADO DE LA PESTAÑA LEGADO ---
function renderLegadoTab() {
  const container = document.getElementById("legado-master-container");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div class="legado-banner">
        <div>
          <span style="font-size: 0.74rem; text-transform: uppercase; letter-spacing: 1px; color: var(--imperivm-text-gold); font-weight: 800;">🏛️ Códice de la Orden • Archivo Histórico</span>
          <h2 style="font-family: var(--imperivm-font-title); font-size: 1.5rem; color: #FFF; margin: 4px 0 0 0;">Modo Legado: Retablo Medieval, Mapa 80s & Inventario Clásico</h2>
          <p style="font-size: 0.8rem; color: var(--imperivm-text-muted); margin: 6px 0 0 0;">
            Preservado íntegramente para consulta, nostalgia o reactivación futura. Todos tus datos y objetos siguen aquí intactos.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-imperivm-primary" onclick="selectMainTab('dashboard');">
            <span>← VOLVER AL VISOR IMPERIVM</span>
          </button>
        </div>
      </div>

      <div style="background: rgba(15, 12, 18, 0.75); border: 1.5px solid #9B2335; border-radius: 10px; padding: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 16px;">
          <h3 style="font-family: var(--imperivm-font-title); color: #9B2335; font-size: 1.25rem; margin: 0;">⚔️ Retablo KCD del Caballero Jaguar (Ranuras 1 a 16 & Sprite)</h3>
          <span style="font-size: 0.74rem; color: var(--imperivm-text-gold); font-weight: 700;">Modo Retablo Clásico</span>
        </div>
        <div id="legado-rpg-mount"></div>
      </div>

      <div style="background: rgba(15, 12, 18, 0.75); border: 1.5px solid var(--imperivm-border-gold); border-radius: 10px; padding: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 16px;">
          <h3 style="font-family: var(--imperivm-font-title); color: var(--imperivm-text-gold); font-size: 1.25rem; margin: 0;">🗺️ Mapa de Aventuras (Misiones de Hannover & Bilbao en Pergamino)</h3>
          <span style="font-size: 0.74rem; color: #5CD696; font-weight: 700;">Campaña Territorial Oficial</span>
        </div>
        <div id="adventure-map-tab-container"></div>
      </div>

      <div style="background: rgba(15, 12, 18, 0.75); border: 1.5px solid #9B2335; border-radius: 10px; padding: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 16px;">
          <h3 style="font-family: var(--imperivm-font-title); color: #9B2335; font-size: 1.25rem; margin: 0;">🕹️ Mapa de Aventuras 80s (Nieve, Bilbao, Selva & Desierto)</h3>
          <span style="font-size: 0.74rem; color: var(--imperivm-text-gold); font-weight: 700;">Modo Arcade Clásico</span>
        </div>
        <div id="arcade-main-container"></div>
      </div>
    </div>
  `;

  if (typeof renderRPGLandingHubLegacy === "function") {
    renderRPGLandingHubLegacy("legado-rpg-mount");
  }

  if (typeof renderAdventureMapTab === "function") {
    renderAdventureMapTab();
  }

  if (typeof renderAdventureMap === "function") {
    renderAdventureMap();
  }
}

window.renderLegadoTab = renderLegadoTab;
window.toggleDevSectionLabels = function() { imperivmEngine.toggleDevSectionLabels(); };


