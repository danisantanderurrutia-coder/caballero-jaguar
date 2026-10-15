/* ==========================================================================
   JAGUAR ROSA - NEON CHILLWAVE LOGIC ORCHESTRATOR
   Gamificación por Niveles (21 Días Total: 3 Escalas de 7 Días)
   ========================================================================== */

const STORAGE_KEY = "JAGUAR_ROSA_APP_DATA_V2";

let appState = {
  activeProfileId: "profile-default",
  profiles: [
    {
      id: "profile-default",
      name: "Daniel Santander",
      avatar: "🐆",
      currentLevel: 1,      // Nivel 1 a 5
      currentSublevel: 1,   // Subnivel / Escala 1, 2 o 3 (Cada una 7 días)
      currentDayInLevel: 1, // Día actual en el nivel (1 a 21)
      completedDays: [],    // Días completados del nivel actual (inicia limpio en Día 1)
      xp: 0,
      streak: 1,
      noPornDays: 1
    }
  ],
  tasks: [
    { id: "t1", title: "🛡️ 0 Porno & Control Dopaminérgico Inquebrantable (Siempre activo)", timeScope: "daily", category: "ejercicios", completed: true },
    { id: "t2", title: "🥊 100 Abs, 100 Sentadillas, 100 Flexiones o Correr (09:00 AM o 18:00)", timeScope: "daily", category: "ejercicios", completed: false },
    { id: "t3", title: "👑 Búsqueda Empleo: Trabajos de mi Profesión (Ciencias / Clima / Carrera)", timeScope: "daily", category: "proyectos", completed: false },
    { id: "t4", title: "👑 Búsqueda Empleo: Trabajos Locales Hannover (Minijobs / Servicios / Inmediatez)", timeScope: "daily", category: "proyectos", completed: false },
    { id: "t5", title: "🇩🇪 Alemán 10 min al mediodía (Vocabulario & Gramática)", timeScope: "daily", category: "proyectos", completed: false },
    { id: "t6", title: "📖 Lectura Estoica 10 min antes de dormir (Marco Aurelio / Códices)", timeScope: "daily", category: "lectura", completed: false },
    { id: "t7", title: "🧘 Meditación Somática 5 min antes de dormir (Vipassana / Calma)", timeScope: "daily", category: "meditacion", completed: false },
    { id: "t8", title: "Renovar trámite vehicular o bancario", timeScope: "weekly", category: "tramites", completed: false },
    { id: "t9", title: "Redactar borrador de paper o propuesta", timeScope: "weekly", category: "proyectos", completed: true },
    { id: "t10", title: "Cita especial de fin de semana con mi novia", timeScope: "weekly", category: "pareja", completed: false }
  ],
  activityLogs: [
    { id: "a1", activity: "Estudio y lectura estoica", duration: 45, category: "Lectura", date: cjToday() },
    { id: "a2", activity: "Rutina Caballero + Calistenia", duration: 25, category: "Ejercicios", date: cjToday() },
    { id: "a3", activity: "Desarrollo de proyecto de Ingresos", duration: 90, category: "Proyectos", date: cjToday() }
  ],
  screenTimeLogs: {
    work: 240,
    social: 45,
    learning: 60,
    entertainment: 30
  },
  booksStatus: {
    "fil-1": { read: true, rating: 5, notes: "Excelente sobre dicotomía del control." },
    "psi-1": { read: true, rating: 5, notes: "La regla del 1% diario es clave." }
  },
  coupleData: {
    girlfriendName: "Mi Novia",
    sweetMemories: [
      { id: "m1", text: "Cena romántica de aniversario y caminata nocturna.", date: "2026-08-15" },
      { id: "m2", text: "Ver película juntos y cocinar pasta casera.", date: "2026-08-17" }
    ],
    sharedGoals: [
      { id: "g1", title: "Viaje de fin de semana a la montaña", completed: false },
      { id: "g2", title: "Aprender un nuevo hobbie juntos", completed: true }
    ],
    activitiesLog: [
      { id: "ca1", title: "Caminata en el parque", duration: 60, date: "2026-08-18" }
    ]
  },
  projects: [
    { id: "lauwersmeer", title: "🌊 Climate Risk en Lauwersmeer", category: "academia", status: "en_desarrollo", desc: "Artículo científico sobre evaluación y modelación de riesgo climático costero." },
    { id: "rewild", title: "🔥 ReWild: Libro de Incendios & Modelo Forestal", category: "politica", status: "en_desarrollo", desc: "Libro de análisis ecológico y propuesta de reconversión del monocultivo forestal + App." },
    { id: "incel", title: "🎭 Los Manejadores (Agencia Digital & IA)", category: "ingresos", status: "en_desarrollo", desc: "Gestión de avatares IA, storytelling para YouTube y arquitectura de presencia digital." },
    { id: "piratas", title: "🏴‍☠️ Cómic de Piratas: Guerra del Pacífico", category: "academia", status: "en_desarrollo", desc: "Cómic histórico-fantástico sobre contienda naval y mitología del Pacífico Sur." },
    { id: "divulgacion", title: "🎙️ Ciencia & Territorios", category: "politica", status: "en_desarrollo", desc: "Plataforma de divulgación científica territorial y comunicación pública de la ciencia." },
    { id: "permacultura", title: "🌾 Chile Agrotech (Tecnología de Precisión)", category: "ingresos", status: "en_desarrollo", desc: "Gemelo digital AgriTwin, sensores IoT y analítica satelital multiespectral en el Maule." },
    { id: "maule_red", title: "📻 Red Comunitaria de Medios Maule Sur", category: "politica", status: "en_desarrollo", desc: "Radio en vivo, avisador de emergencias de APR y periodismo territorial (Fase: Crear equipo)." },
    { id: "museo_memoria", title: "🏛️ Museo de la Memoria y Dignidad Maule", category: "politica", status: "en_desarrollo", desc: "Museo virtual, mapa interactivo de 23 sitios de memoria y archivo popular (Fase: Crear equipo)." }
  ],
  chatHistories: {
    therapist: { addictions: [], empathy: [], sexaffective: [] },
    scifi: {}
  }
};

function loadAppState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState = Object.assign({}, appState, JSON.parse(saved));
      // Garantizar que la racha del Caballero Jaguar Challenge arranque en Día 1 limpio hoy
      if (appState.profiles && appState.profiles[0]) {
        const p = appState.profiles[0];
        if (localStorage.getItem("CABALLERO_JAGUAR_CHALLENGE_RESET_DAY1_DONE_V3") !== "true") {
          p.completedDays = [];
          p.currentDayInLevel = 1;
          p.currentSublevel = 1;
          p.streak = 1;
          p.noPornDays = 1;
          p.xp = 0;
          localStorage.setItem("CABALLERO_JAGUAR_CHALLENGE_RESET_DAY1_DONE_V3", "true");
          saveAppState();
        }
      }
    } catch (e) { console.error("Error al cargar estado local:", e); }
  } else {
    localStorage.setItem("CABALLERO_JAGUAR_CHALLENGE_RESET_DAY1_DONE_V3", "true");
  }
}

function saveAppState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

// --- ESTRUCTURA DE NIVELES DE CABALLERÍA (21 DÍAS EN 3 ESCALAS DE 7 DÍAS) ---
const RANKS_STRUCTURE = [
  {
    level: 1,
    name: "Caballero Jaguar",
    icon: "🛡️",
    sublevels: [
      { sub: 1, name: "Escala 1: Iniciación (Días 1-7)", req: "0 Porno + 5 min Ejercicio Diario", days: 7 },
      { sub: 2, name: "Escala 2: Consolidación (Días 8-14)", req: "Escala 1 + 5 min Meditación / Respiración", days: 7 },
      { sub: 3, name: "Escala 3: Anclaje de Disciplina (Días 15-21)", req: "Escala 2 + 10 min Lectura Diaria", days: 7 }
    ]
  },
  {
    level: 2,
    name: "Caballero Explorador",
    icon: "⚔️",
    sublevels: [
      { sub: 1, name: "Escala 1: Templanza (Días 1-7)", req: "0 Porno + 15 min Calistenia + 15 min Lectura", days: 7 },
      { sub: 2, name: "Escala 2: Enfoque (Días 8-14)", req: "Escala 1 + Pomodoro 25 min diario", days: 7 },
      { sub: 3, name: "Escala 3: Dominio (Días 15-21)", req: "Escala 2 + Registro de Trámites al día", days: 7 }
    ]
  },
  {
    level: 3,
    name: "Caballero de Línea Imperial",
    icon: "⚜️",
    sublevels: [
      { sub: 1, name: "Escala 1: Resistencia (Días 1-7)", req: "0 Porno + 30 min Ejercicio + 0 Procrastinación", days: 7 },
      { sub: 2, name: "Escala 2: Disciplina (Días 8-14)", req: "Escala 1 + 30 min Trabajo Profundo", days: 7 },
      { sub: 3, name: "Escala 3: Firmeza Imperial (Días 15-21)", req: "Escala 2 + Control Emocional Diario", days: 7 }
    ]
  },
  {
    level: 4,
    name: "Capitán de Caballería Jaguar",
    icon: "🐎",
    sublevels: [
      { sub: 1, name: "Escala 1: Conquista (Días 1-7)", req: "Firmeza + Avance en Proyectos", days: 7 },
      { sub: 2, name: "Escala 2: Armonía (Días 8-14)", req: "Escala 1 + Registro Vida de Pareja Activo", days: 7 },
      { sub: 3, name: "Escala 3: Maestría (Días 15-21)", req: "Escala 2 + Balance Integral", days: 7 }
    ]
  },
  {
    level: 5,
    name: "Gran Maestre Caballero Jaguar",
    icon: "👑",
    sublevels: [
      { sub: 1, name: "Escala 1: Soberanía Matutina (Días 1-7)", req: "Dominio de las 7 áreas de vida", days: 7 },
      { sub: 2, name: "Escala 2: Soberanía Nocturna (Días 8-14)", req: "Dominio continuo de hábitos", days: 7 },
      { sub: 3, name: "Escala 3: Consagración de la Orden (Días 15-21)", req: "Hábitos reprogramados en identidad", days: 7 }
    ]
  }
];

function getActiveProfile() {
  return appState.profiles.find(p => p.id === appState.activeProfileId) || appState.profiles[0];
}

function playSoundEffect(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "levelup") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {}
}

function updateLevelProgress() {
  // El nivel, grado y racha se derivan del motor único de XP (CJProgress)
  if (window.CJProgress) {
    window.CJProgress.sync();
    renderLevelsGrid();
    return;
  }
  const profile = getActiveProfile();
  const levelInfo = RANKS_STRUCTURE.find(r => r.level === profile.currentLevel) || RANKS_STRUCTURE[0];
  
  // Determinar subnivel según los días completados (Días 1-7 -> Sub 1, Días 8-14 -> Sub 2, Días 15-21 -> Sub 3)
  const daysCount = profile.completedDays.length;
  if (daysCount >= 14) profile.currentSublevel = 3;
  else if (daysCount >= 7) profile.currentSublevel = 2;
  else profile.currentSublevel = 1;

  if (daysCount >= 21) {
    if (profile.currentLevel < 5) {
      profile.currentLevel++;
      profile.currentSublevel = 1;
      profile.completedDays = [];
      playSoundEffect("levelup");
      showNotification(`🎉 ¡FELICIDADES! Has completado los 21 Días y Ascendido al NIVEL ${profile.currentLevel}: ${RANKS_STRUCTURE[profile.currentLevel - 1].name}`);
    }
  }

  saveAppState();
  renderHeaderStatus();
  renderLevelsGrid();
}

function toggleDayCompleted(dayNum) {
  dayNum = Number(dayNum) || 1;
  const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : (appState.profiles && appState.profiles[0]);
  if (!profile) return;
  if (!Array.isArray(profile.completedDays)) profile.completedDays = [];

  const isAlreadyDone = profile.completedDays.includes(dayNum);
  if (isAlreadyDone) {
    // Si desmarca, quitarlo (manteniendo al menos el día 1 si todo queda vacío)
    profile.completedDays = profile.completedDays.filter(d => d !== dayNum);
    if (profile.completedDays.length === 0) profile.completedDays = [1];
  } else {
    // Si marca el día (e.g. Día 2), asegurar que todos los días hasta ese número queden registrados
    for (let i = 1; i <= dayNum; i++) {
      if (!profile.completedDays.includes(i)) {
        profile.completedDays.push(i);
      }
    }
    profile.completedDays.sort((a, b) => a - b);
    if (window.CJProgress && typeof window.CJProgress.reconcileVirtueDay === 'function') {
      window.CJProgress.reconcileVirtueDay(dayNum);
    } else {
      profile.xp = (profile.xp || 0) + 50;
    }
    if (typeof playSoundEffect === 'function') playSoundEffect("success");
    if (typeof showNotification === 'function') {
      showNotification(`🦅 ¡Día ${dayNum} en Virtud Conquistado! Matriz actualizada con honores.`);
    }
  }

  const effectiveDays = Math.max(1, profile.completedDays.length);
  profile.streak = effectiveDays;
  if (window.reyJaguarState && window.reyJaguarState.character) {
    window.reyJaguarState.character.streakDays = Math.max(effectiveDays, Number(window.reyJaguarState.character.streakDays) || 1);
    window.reyJaguarState.character.noPornDays = Math.max(effectiveDays, Number(window.reyJaguarState.character.noPornDays) || 1);
    if (typeof window.saveReyJaguarState === 'function') window.saveReyJaguarState();
  }

  updateLevelProgress();
  if (typeof renderLevelsGrid === 'function') renderLevelsGrid();
  if (typeof renderHeaderStatus === 'function') renderHeaderStatus();
}

function renderHeaderStatus() {
  const profile = getActiveProfile();
  const currentRank = RANKS_STRUCTURE.find(r => r.level === profile.currentLevel) || RANKS_STRUCTURE[0];
  
  const levelNameEl = document.getElementById("header-level-name");
  const streakEl = document.getElementById("header-streak-text");
  const xpFillEl = document.getElementById("header-xp-fill");

  if (levelNameEl) {
    const xp = (window.imperivmEngine && typeof window.imperivmEngine.getCharacterXP === 'function')
      ? window.imperivmEngine.getCharacterXP()
      : ((window.reyJaguarState && window.reyJaguarState.character && typeof window.reyJaguarState.character.xp === 'number')
          ? window.reyJaguarState.character.xp
          : (profile.currentXp || 0));
    if (window.CJProgress) {
      const lv = window.CJProgress.levelInfo(xp);
      levelNameEl.innerHTML = `<strong>${xp.toLocaleString()} XP</strong> · ${lv.latin} ${lv.gradeRoman}`;
    } else {
      levelNameEl.innerHTML = `<strong>${xp.toLocaleString()} XP</strong>`;
    }
  }
  if (window.CJProgress) {
    const snap = window.CJProgress.snapshot();
    if (streakEl) streakEl.innerText = `🔥 Racha: ${snap.streak.days} días · Hoy ${snap.today.xp}/${snap.today.cap} XP`;
    if (xpFillEl) xpFillEl.style.width = `${Math.max(4, snap.level.progress)}%`;
  } else {
    if (streakEl) streakEl.innerText = `🦅 Vexillum: ${profile.completedDays.length} / 21 Días`;
    if (xpFillEl) {
      const pct = (profile.completedDays.length / 21) * 100;
      xpFillEl.style.width = `${Math.max(8, pct)}%`;
    }
  }
  if (window.imperivmEngine && typeof window.imperivmEngine.updateVexillumVisuals === 'function') {
    window.imperivmEngine.updateVexillumVisuals();
    if (typeof window.imperivmEngine.renderHeaderCategoryPennants === 'function') {
      window.imperivmEngine.renderHeaderCategoryPennants();
    }
  }
}

// --- RENDERIZADO DE LA MATRIZ DE 21 DÍAS Y SUBNIVELES ---
function renderLevelsGrid() {
  const container = document.getElementById("levels-detail-container");
  if (!container) return;

  const profile = getActiveProfile();
  container.innerHTML = "";

  RANKS_STRUCTURE.forEach(rank => {
    const isCurrentLevel = rank.level === profile.currentLevel;
    const isUnlocked = rank.level <= profile.currentLevel;

    const levelCard = document.createElement("div");
    levelCard.className = `jaguar-card ${isCurrentLevel ? 'card-highlight' : ''}`;

    let sublevelsHTML = rank.sublevels.map(sub => {
      const isCurrentSub = isCurrentLevel && sub.sub === profile.currentSublevel;
      
      // Crear cajas de días para este subnivel
      let daysHTML = "";
      const startDay = (sub.sub - 1) * 7 + 1;
      const endDay = sub.sub * 7;

      for (let d = startDay; d <= endDay; d++) {
        const isDone = isCurrentLevel && profile.completedDays.includes(d);
        daysHTML += `
          <div class="day-box ${isDone ? 'completed' : ''}" onclick="toggleDayCompleted(${d})">
            <span>Día ${d}</span>
            <span style="font-size: 0.9rem;">${isDone ? '✓' : '⚡'}</span>
          </div>
        `;
      }

      return `
        <div class="sublevel-card ${isCurrentSub ? 'active-sublevel' : ''}">
          <div class="flex-between">
            <h4 style="font-size: 0.95rem; color: var(--neon-cyan);">${sub.name}</h4>
            <span class="badge-tag ${isCurrentSub ? 'badge-pink' : 'badge-cyan'}">7 Días</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Requisito: ${sub.req}</p>
          
          ${isCurrentLevel ? `
            <div style="margin-top: 10px; font-size: 0.78rem; color: var(--neon-gold); font-weight: 700;">
              PROGRESO EN ESCALA DE 7 DÍAS:
            </div>
            <div class="day-grid-21">${daysHTML}</div>
          ` : ''}
        </div>
      `;
    }).join("");

    levelCard.innerHTML = `
      <div class="card-title-bar">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 2rem;">${rank.icon}</span>
          <div>
            <h3 class="card-title" style="font-size: 1.3rem;">Nivel ${rank.level}: ${rank.name}</h3>
            <div style="font-size: 0.8rem; color: var(--neon-pink-bright); font-weight: 700;">
              Ciclo de Neuro-Habituación: 21 Días Total (3 Escalas de 7 Días)
            </div>
          </div>
        </div>
        <span class="badge-tag ${isCurrentLevel ? 'badge-pink' : (isUnlocked ? 'badge-cyan' : 'badge-gold')}">
          ${isCurrentLevel ? 'NIVEL ACTIVO' : (isUnlocked ? 'COMPLETADO' : 'BLOQUEADO')}
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${sublevelsHTML}
      </div>
    `;

    container.appendChild(levelCard);
  });
}

// --- PESTAÑAS DE NAVEGACIÓN Y MENÚS DESPLEGABLES ---
function selectMainTab(tabKey) {
  if (tabKey === "ritos") {
    openRitosModal();
    return;
  }
  if (tabKey === "mapa") {
    tabKey = "legado";
  }
  if (tabKey === "ejercicios" || tabKey === "deporte" || tabKey === "combate") {
    tabKey = "ejercicio";
  }

  if (tabKey === "cuerpo") {
    selectMainTab("dashboard");
    const targetBtn = document.querySelector(`.tab-btn[data-tab="cuerpo"]`);
    if (targetBtn) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      targetBtn.classList.add("active");
    }
    setTimeout(() => {
      const el = document.getElementById("rail-cuerpo-salud");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return;
  }
  if (tabKey === "exploracion") {
    selectMainTab("dashboard");
    const targetBtn = document.querySelector(`.tab-btn[data-tab="exploracion"]`);
    if (targetBtn) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      targetBtn.classList.add("active");
    }
    setTimeout(() => {
      const el = document.getElementById("rail-exploracion-personal");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return;
  }
  if (tabKey === "misiones") {
    selectMainTab("dashboard");
    const targetBtn = document.querySelector(`.tab-btn[data-tab="misiones"]`);
    if (targetBtn) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      targetBtn.classList.add("active");
    }
    setTimeout(() => {
      const el = document.getElementById("rail-misiones-unificadas");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return;
  }

  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(t => t.classList.remove("active"));

  // Mapear pestañas a su botón activo
  let btnDataTab = tabKey;
  if (["dashboard", "niveles"].includes(tabKey)) {
    btnDataTab = "dashboard";
  } else if (["cuerpo"].includes(tabKey)) {
    btnDataTab = "cuerpo";
  } else if (["exploracion"].includes(tabKey)) {
    btnDataTab = "exploracion";
  } else if (["misiones", "campanas"].includes(tabKey)) {
    btnDataTab = "misiones";
  } else if (tabKey === "inventario") {
    btnDataTab = "inventario";
  } else if (tabKey === "lifestyle") {
    btnDataTab = "lifestyle";
  } else if (tabKey === "finanzas") {
    btnDataTab = "finanzas";
  } else if (tabKey === "legado") {
    btnDataTab = "legado";
  } else if (tabKey === "bitacoras") {
    btnDataTab = "bitacoras";
  } else {
    // Si se accede a una bitácora individual o secundaria
    btnDataTab = "bitacoras";
  }

  const targetTabBtn = document.querySelector(`.tab-btn[data-tab="${btnDataTab}"]`);
  if (targetTabBtn) targetTabBtn.classList.add("active");

  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(c => c.classList.remove("active"));

  const activeContent = document.getElementById(`tab-${tabKey}`);
  if (activeContent) activeContent.classList.add("active");

  const projectView = document.getElementById("tab-project-detail");
  if (projectView) projectView.classList.remove("active");

  if (tabKey === "bitacoras") {
    openBitacorasModal();
  } else if (tabKey === "dashboard") {
    if (typeof imperivmEngine !== "undefined" && typeof imperivmEngine.render === "function") {
      imperivmEngine.render();
    }
  } else if (tabKey === "ejercicio") {
    if (typeof renderWorkouts === "function") renderWorkouts();
    if (typeof renderCombatHub === "function") renderCombatHub();
  } else if (tabKey === "legado") {
    if (typeof renderLegadoTab === "function") {
      renderLegadoTab();
    }
  } else if (tabKey === "campanas" && typeof renderCampanasTab === "function") {
    renderCampanasTab();
  } else if (tabKey === "lifestyle" && typeof renderLifestyleArchitectApp === "function") {
    renderLifestyleArchitectApp();
  } else if (tabKey === "finanzas" && typeof renderFinanceDashboard === "function") {
    renderFinanceDashboard();
  } else if (tabKey === "inventario" && typeof renderInventoryTab === "function") {
    renderInventoryTab();
  } else if (tabKey === "proyectos" && typeof renderProjects === "function") {
    renderProjects();
  } else if (["lectura", "conocimiento"].includes(tabKey) && typeof renderBooks === "function") {
    renderBooks();
  } else if (tabKey === "fotografia" && typeof renderFotografiaApp === "function") {
    renderFotografiaApp();
  } else if (tabKey === "pintura" && typeof renderPinturaApp === "function") {
    renderPinturaApp();
  } else if (tabKey === "musica" && typeof renderMusicLearningTab === "function") {
    renderMusicLearningTab();
  } else if (tabKey === "meditacion" && typeof initMeditationStudio === "function") {
    initMeditationStudio();
  } else if (tabKey === "masajes" && typeof initMassageStudio === "function") {
    initMassageStudio();
  } else if (tabKey === "progresion" && typeof renderSistemaMaestroPitch === "function") {
    renderSistemaMaestroPitch();
  } else if (tabKey === "astral" && typeof astralObservatory !== "undefined" && typeof astralObservatory.init === "function") {
    astralObservatory.init();
  }

  if (typeof window.scrollTo === "function") {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
window.selectMainTab = selectMainTab;

function openDeporteSubTab(sportId) {
  console.log("[DEBUG] openDeporteSubTab called with:", sportId);
  selectMainTab("ejercicio");
  setTimeout(() => {
    const workoutsContainer = document.getElementById("workouts-container");
    const combatContainer = document.getElementById("combat-hub-container");
    console.log("[DEBUG] workoutsContainer:", !!workoutsContainer, "combatContainer:", !!combatContainer);
    if (!workoutsContainer || !combatContainer) return;

    if (sportId === "calistenia" || sportId === "fuerza") {
      workoutsContainer.style.display = "grid";
      combatContainer.style.display = "none";
      if (typeof renderWorkouts === "function") renderWorkouts();
    } else {
      workoutsContainer.style.display = "none";
      combatContainer.style.display = "block";
      const targetSubTab = (sportId === "muaythai") ? "muaythai" :
                           (sportId === "escalada") ? "escalada" :
                           (sportId === "ciclismo" || sportId === "triatlon") ? "triatlon" : "maraton";
      if (typeof renderCombatHub === "function") renderCombatHub(targetSubTab);
    }
  }, 40);
}
window.openDeporteSubTab = openDeporteSubTab;

function scrollTo21DaysMatrix() {
  setTimeout(() => {
    const el = document.getElementById("neuro-matrix-21days");
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
}
window.scrollTo21DaysMatrix = scrollTo21DaysMatrix;

// --- GOOGLE CALENDAR WIDGET UTILITIES ---
function saveGoogleCalendarUrl() {
  const urlInput = document.getElementById("gcal-embed-url");
  const iframe = document.getElementById("gcal-iframe-display");
  if (urlInput && urlInput.value.trim()) {
    let url = urlInput.value.trim();
    if (url.includes("calendar.google.com")) {
      localStorage.setItem("JAGUAR_GCAL_EMBED_URL", url);
      if (iframe) iframe.src = url;
      showNotification("¡URL de Google Calendar guardada correctamente!");
    } else {
      showNotification("Ingresa una URL válida de Google Calendar.");
    }
  }
}

function loadGoogleCalendarUrl() {
  const savedUrl = localStorage.getItem("JAGUAR_GCAL_EMBED_URL");
  const iframe = document.getElementById("gcal-iframe-display");
  const urlInput = document.getElementById("gcal-embed-url");
  if (savedUrl) {
    if (iframe) iframe.src = savedUrl;
    if (urlInput) urlInput.value = savedUrl;
  }
}


function initTabNavigation() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const container = tab.closest(".dropdown-container");
      if (container) {
        e.stopPropagation();
        const isOpen = container.classList.contains("open");
        document.querySelectorAll(".dropdown-container").forEach(c => c.classList.remove("open"));
        if (!isOpen) container.classList.add("open");
      } else {
        document.querySelectorAll(".dropdown-container").forEach(c => c.classList.remove("open"));
      }
      const targetId = tab.dataset.tab;
      if (targetId) selectMainTab(targetId);
    });
  });

  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-container").forEach(c => c.classList.remove("open"));
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-container")) {
      document.querySelectorAll(".dropdown-container").forEach(c => c.classList.remove("open"));
    }
  });
}

// --- CONSEJEROS DESHABILITADOS ---
function updateTabSciFiAdvisor(tabKey) {
  // Conversational advisor interactions removed per user request
}

function sendAdvisorMessage(agentKey) {
  // Conversational advisor interactions removed per user request
}

// --- TAREAS DÍA & SEMANA ---
function renderTasks() {
  const dailyContainer = document.getElementById("daily-tasks-list");
  const weeklyContainer = document.getElementById("weekly-tasks-list");

  if (!dailyContainer || !weeklyContainer) return;
  dailyContainer.innerHTML = "";
  weeklyContainer.innerHTML = "";

  appState.tasks.forEach(task => {
    const item = document.createElement("div");
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="custom-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')">
          ${task.completed ? '✓' : ''}
        </div>
        <div>
          <span style="font-weight: 700;">${task.title}</span>
          <div style="font-size: 0.75rem; color: var(--neon-cyan); text-transform: uppercase;">${task.category}</div>
        </div>
      </div>
      <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="deleteTask('${task.id}')">✕</button>
    `;

    if (task.timeScope === "daily") dailyContainer.appendChild(item);
    else weeklyContainer.appendChild(item);
  });
}

function toggleTask(id) {
  const task = appState.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    if (task.completed) {
      playSoundEffect("success");
      if (typeof CaballeroScoringEngine !== "undefined") {
        CaballeroScoringEngine.awardXP(task.category || "foco", 20, `Deber cumplido: ${task.title}`, `task-${task.id}`);
      }
    } else if (window.CJProgress) {
      // Desmarcar revierte el XP (evita farmeo marcando/desmarcando)
      window.CJProgress.revoke({ key: `task-${task.id}` });
    }
    saveAppState();
    renderTasks();
  }
}

function addTask(timeScope) {
  const inputId = timeScope === 'daily' ? 'new-daily-task-title' : 'new-weekly-task-title';
  const categoryId = timeScope === 'daily' ? 'new-daily-task-cat' : 'new-weekly-task-cat';
  const input = document.getElementById(inputId);
  const cat = document.getElementById(categoryId);

  if (!input || !input.value.trim()) return;

  appState.tasks.push({
    id: "task-" + Date.now(),
    title: input.value.trim(),
    timeScope: timeScope,
    category: cat ? cat.value : "otras",
    completed: false
  });

  input.value = "";
  saveAppState();
  renderTasks();
  showNotification("Tarea registrada.");
}

function deleteTask(id) {
  appState.tasks = appState.tasks.filter(t => t.id !== id);
  saveAppState();
  renderTasks();
}

function exportGoogleCalendarICS() {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Jaguar Rosa Personal Development//ES\n";
  appState.tasks.forEach((t, i) => {
    const now = new Date();
    const startDate = new Date(now.getTime() + (i * 3600000)).toISOString().replace(/-|:|\.\d\d\d/g, "");
    icsContent += `BEGIN:VEVENT\nSUMMARY:[Jaguar Rosa] ${t.title}\nDESCRIPTION:Categoría: ${t.category}\nDTSTART:${startDate}\nDTEND:${startDate}\nEND:VEVENT\n`;
  });
  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Jaguar_Rosa_Tareas_GoogleCalendar.ics";
  link.click();
  showNotification("Archivo .ics descargado para Google Calendar.");
}

// --- BIBLIOTECA DE LIBROS (CÓDICE RENACENTISTA ORDENADO) ---
let activeBookCategoryFilter = "all";
let librarySearchQuery = "";

function onLibrarySearchInput(val) {
  librarySearchQuery = (val || "").toLowerCase().trim();
  renderBooks();
}
window.onLibrarySearchInput = onLibrarySearchInput;

function clearLibrarySearch() {
  librarySearchQuery = "";
  const input = document.getElementById("library-search-input");
  if (input) input.value = "";
  renderBooks();
}
window.clearLibrarySearch = clearLibrarySearch;

function renderBooks() {
  const container = document.getElementById("books-grid");
  if (!container) return;
  container.innerHTML = "";

  const totalBooks = (typeof JAGUAR_BOOKS_DB !== "undefined") ? JAGUAR_BOOKS_DB.length : 0;
  const readCount = Object.values(appState.booksStatus || {}).filter(s => s && s.read).length;
  const pendingCount = Math.max(0, totalBooks - readCount);
  const readPct = totalBooks > 0 ? Math.round((readCount / totalBooks) * 100) : 0;

  // Actualizar barra de estadísticas
  const statsBar = document.getElementById("library-stats-bar");
  if (statsBar) {
    statsBar.innerHTML = `
      <span>📚 Acervo: <strong>${totalBooks} Obras</strong></span>
      <span>•</span>
      <span style="color: #4A79A7;">✅ Leídos: <strong>${readCount}</strong> (${readPct}%)</span>
      <span>•</span>
      <span style="color: var(--parchment-warm);">⏳ Pendientes: <strong>${pendingCount}</strong></span>
      ${librarySearchQuery ? `<span>•</span> <span style="color: #E2DACB;">🔍 Filtrando: "<em>${librarySearchQuery}</em>"</span>` : ''}
    `;
  }

  const filtered = JAGUAR_BOOKS_DB.filter(b => {
    const matchesCat = (activeBookCategoryFilter === "all" || b.category === activeBookCategoryFilter);
    if (!matchesCat) return false;
    if (!librarySearchQuery) return true;
    const q = librarySearchQuery;
    return (b.title && b.title.toLowerCase().includes(q)) ||
           (b.author && b.author.toLowerCase().includes(q)) ||
           (b.desc && b.desc.toLowerCase().includes(q)) ||
           (b.categoryLabel && b.categoryLabel.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(8, 13, 22, 0.6); border-radius: var(--radius-md); border: 1px dashed var(--border-glass);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📖</div>
        <h4 style="font-size: 1.1rem; color: #FFF; font-family: 'Cinzel', serif;">Ninguna obra coincide con la búsqueda</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Intenta con otro término o limpia el buscador para ver todo el acervo.</p>
        <button class="btn-jaguar btn-sm btn-secondary-dark" style="margin-top: 12px;" onclick="clearLibrarySearch()">Ver Todos los Libros</button>
      </div>
    `;
    return;
  }

  filtered.forEach(book => {
    const status = appState.booksStatus[book.id] || { read: false, rating: 0 };
    const card = document.createElement("div");
    card.className = `book-codex-card ${status.read ? 'read' : ''}`;
    
    card.innerHTML = `
      <div>
        <div class="flex-between" style="margin-bottom: 10px;">
          <span class="badge-tag ${status.read ? 'badge-emerald' : 'badge-cyan'}" style="font-size: 0.72rem;">${book.categoryLabel}</span>
          <span style="font-size: 1.6rem;">${book.coverIcon || '📜'}</span>
        </div>
        
        <h4 style="font-size: 1.05rem; font-family: 'Cinzel', serif; font-weight: 700; margin-bottom: 4px; color: #FFF; line-height: 1.3;">${book.title}</h4>
        
        <div style="font-size: 0.8rem; color: var(--parchment-muted); font-weight: 600; margin-bottom: 6px;">
          ✍️ ${book.author} • 📄 ${book.pages} págs.
        </div>
        
        <p class="book-synopsis-clamp">${book.desc}</p>
      </div>

      <div style="margin-top: 14px; border-top: 1px solid var(--border-glass); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
        <button class="btn-jaguar btn-sm ${status.read ? 'btn-electric-cyan' : 'btn-secondary-dark'}" style="padding: 5px 12px; font-size: 0.78rem;" onclick="toggleBookRead('${book.id}')">
          ${status.read ? '✓ Leído' : '📖 Marcar Leído'}
        </button>
        <span style="color: var(--parchment-light); font-size: 0.85rem; letter-spacing: 2px;">★ ★ ★ ★ ★</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterBooks(category) {
  activeBookCategoryFilter = category;
  const btns = document.querySelectorAll(".book-filter-btn");
  btns.forEach(b => b.classList.remove("active"));
  if (event && event.target) event.target.classList.add("active");
  renderBooks();
}

function toggleBookRead(bookId) {
  if (!appState.booksStatus[bookId]) appState.booksStatus[bookId] = { read: true, rating: 5 };
  else appState.booksStatus[bookId].read = !appState.booksStatus[bookId].read;
  
  if (appState.booksStatus[bookId].read) {
    playSoundEffect("success");
    showNotification("✓ Libro marcado como leído en tu acervo personal (+20 XP)!");
  }
  saveAppState();
  renderBooks();
}

// --- RUTINAS DE EJERCICIO ---
function renderWorkouts() {
  const container = document.getElementById("workouts-container");
  if (!container) return;
  container.innerHTML = "";

  JAGUAR_WORKOUTS_DB.forEach(routine => {
    const card = document.createElement("div");
    card.className = `jaguar-card ${routine.id === 'routine-caballero' ? 'card-highlight' : ''}`;
    
    let exercisesHTML = routine.exercises.map(ex => `
      <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--border-glass); font-size: 0.88rem;">
        <span><strong>${ex.name}</strong></span>
        <span style="color: var(--neon-pink-bright);">${ex.time || ex.reps}</span>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="card-title-bar">
        <h3 class="card-title">${routine.title}</h3>
        <span class="badge-tag badge-pink">${routine.duration}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">${routine.desc}</p>
      <div style="background: rgba(7, 3, 18, 0.6); padding: 12px; border-radius: var(--radius-md); margin-bottom: 14px;">
        ${exercisesHTML}
      </div>
      <button class="btn-jaguar btn-primary-pink" style="width: 100%;" onclick="completeWorkoutRoutine('${routine.id}')">
        Completar Sesión de ${routine.title.split(" ")[1] || 'Ejercicio'}
      </button>
    `;
    container.appendChild(card);
  });
}

function completeWorkoutRoutine(routineId) {
  const routine = (typeof JAGUAR_WORKOUTS_DB !== 'undefined') ? JAGUAR_WORKOUTS_DB.find(r => r.id === routineId) : null;
  const routineTitle = routine ? routine.title : "Sesión de Ejercicio";
  const xp = (routine && routine.duration && parseInt(routine.duration) >= 20) ? 50 : 25;

  if (typeof CaballeroScoringEngine !== 'undefined' && typeof CaballeroScoringEngine.awardAction === 'function') {
    CaballeroScoringEngine.awardAction('deporte', xp >= 50 ? 'medio' : 'facil', routineTitle, null, 'movilidad', null, 'movilidad');
  } else if (typeof awardXP === 'function') {
    awardXP(xp, routineTitle, 'deporte');
  }

  const todayStr = (typeof cjToday === 'function') ? cjToday() : new Date().toISOString().slice(0, 10);
  if (window.reyJaguarState) {
    if (!reyJaguarState.dailyChallengeActions) reyJaguarState.dailyChallengeActions = {};
    if (!reyJaguarState.dailyChallengeActions[todayStr]) reyJaguarState.dailyChallengeActions[todayStr] = {};
    reyJaguarState.dailyChallengeActions[todayStr]['pillar_ejercicio'] = true;
    reyJaguarState.dailyChallengeActions[todayStr]['movilidad'] = true;
    if (!reyJaguarState.stats) reyJaguarState.stats = {};
    if (!reyJaguarState.stats['movilidad']) reyJaguarState.stats['movilidad'] = { name: "Movilidad Articular & Calistenia", value: 0, icon: "🤸" };
    reyJaguarState.stats['movilidad'].value = (reyJaguarState.stats['movilidad'].value || 0) + 1;
    if (typeof saveReyJaguarState === 'function') saveReyJaguarState();
  }

  if (typeof playSoundEffect === 'function') playSoundEffect("success");
  if (typeof showNotification === 'function') {
    showNotification(`¡${routineTitle} completada con honores! (+${xp} XP en Deporte & Movilidad).`);
  }
  if (typeof renderRPGLandingHub === 'function') renderRPGLandingHub();
}

// --- VIDA DE PAREJA ---
function renderCoupleSection() {
  const memoriesList = document.getElementById("sweet-memories-list");
  const goalsList = document.getElementById("couple-goals-list");

  if (memoriesList) {
    memoriesList.innerHTML = appState.coupleData.sweetMemories.map(m => `
      <div style="background: rgba(255, 0, 127, 0.08); border: 1px solid var(--border-neon-pink); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 10px;">
        <div style="font-size: 0.92rem; color: #FFF; font-weight: 500;">"${m.text}"</div>
        <div style="font-size: 0.75rem; color: var(--neon-cyan); margin-top: 4px;">📅 ${m.date}</div>
      </div>
    `).join("");
  }

  if (goalsList) {
    goalsList.innerHTML = appState.coupleData.sharedGoals.map(g => `
      <div class="task-item ${g.completed ? 'completed' : ''}">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="custom-checkbox ${g.completed ? 'checked' : ''}" onclick="toggleCoupleGoal('${g.id}')">
            ${g.completed ? '✓' : ''}
          </div>
          <span>${g.title}</span>
        </div>
      </div>
    `).join("");
  }
}

function addSweetMemory() {
  const input = document.getElementById("new-sweet-memory");
  if (!input || !input.value.trim()) return;

  appState.coupleData.sweetMemories.unshift({
    id: "m-" + Date.now(),
    text: input.value.trim(),
    date: cjToday()
  });

  input.value = "";
  saveAppState();
  renderCoupleSection();
  showNotification("Recuerdo lindo guardado.");
}

function generateDateIdea() {
  const ideas = [
    "🍕 Noche de pizza artesanal casera + Maratón de cine Cyberpunk.",
    "🍷 Picnic nocturno bajo las estrellas en un parque tranquilo.",
    "🎨 Clase de pintura / cerámica improvisada con música Neon Chillwave.",
    "🚲 Ruta nocturna en bicicleta por la ciudad y parar por un café.",
    "☕ Recorrido de cafeterías de especialidad y sesión de fotos casual.",
    "🍳 Desayuno romántico sorpresa en la cama el domingo."
  ];
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  const display = document.getElementById("date-idea-display");
  if (display) display.innerText = randomIdea;
}

// --- TERAPIA ESTOICA (Puente / Compatibilidad) ---
function selectTherapist(key) {
  if (window.therapyStoic) window.therapyStoic.open();
}

function renderTherapyChat() {
  // Manejado por js/therapy-stoic.js
}

function sendTherapyMessage() {
  if (window.therapyStoic) window.therapyStoic.submit();
}

// --- PROYECTOS DE VIDA: GRILLA DE 3 COLUMNAS CON BARRA DE PROGRESO Y +1 TAREA ---
function renderProjects() {
  const container = document.getElementById("projects-grid-3col");
  if (!container) return;
  container.innerHTML = "";

  if (typeof loadProjectsHubData === "function") loadProjectsHubData();

  const projectsList = typeof getCanonicalProjectsList === "function"
    ? getCanonicalProjectsList()
    : Object.keys(projectsData).map(k => projectsData[k]);

  projectsList.forEach(p => {
    const checklist = p.checklist || [];
    const totalTasks = checklist.length;
    const completedTasks = checklist.filter(c => c.completed).length;
    const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const card = document.createElement("div");
    card.className = "project-card-codex";
    card.id = `proj-card-${p.id}`;

    card.innerHTML = `
      <div class="project-codex-banner">
        <img src="${p.bannerImg}" alt="${p.title}" onerror="this.onerror=null; this.src='assets/img_financial_balance.jpg';">
        <div class="project-codex-banner-overlay">
          <span class="badge-tag badge-cyan">${p.category || 'Ecosistema'}</span>
          <span class="badge-tag badge-gold" style="align-self: flex-end;">${completedTasks} / ${totalTasks} Tareas</span>
        </div>
      </div>

      <div class="project-codex-body">
        <div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #FFF; margin-bottom: 4px;">${p.title}</h3>
          <div style="font-size: 0.82rem; color: var(--parchment-muted); line-height: 1.4;">${p.subtitle || ''}</div>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 8px; line-height: 1.4;">${p.desc}</p>
        </div>

        <!-- BARRA DE PROGRESO Y BOTÓN +1 ASOCIADO A TAREAS -->
        <div class="project-progress-wrapper">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem;">
            <strong style="color: var(--parchment-light);">Avance Estratégico</strong>
            <span style="font-weight: 800; color: #8A9BA8;">${progressPct}%</span>
          </div>
          <div class="project-progress-bar-track">
            <div class="project-progress-bar-fill" style="width: ${progressPct}%;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
            <button class="btn-plus-task" onclick="incrementProjectTask('${p.id}')" title="Completar siguiente tarea y subir +20 XP">
              <span>⚡ +1 Tarea</span>
            </button>
            
            <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem; padding: 5px 12px;" onclick="selectProjectView('${p.id}')">
              Detalle & Gantt ➔
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
window.renderProjects = renderProjects;

function incrementProjectTask(projId) {
  if (typeof loadProjectsHubData === "function") loadProjectsHubData();
  const p = projectsData[projId];
  if (!p) return;

  if (!p.checklist) p.checklist = [];
  
  // Buscar la primera tarea pendiente
  const nextTask = p.checklist.find(c => !c.completed);
  let taskText = "";
  if (nextTask) {
    nextTask.completed = true;
    taskText = nextTask.text;
  } else {
    // Si todas están completadas, agregar un nuevo hito cumplido
    const hitoNum = p.checklist.length + 1;
    taskText = `Hito cumplido #${hitoNum}`;
    p.checklist.push({
      id: "chk-" + Date.now(),
      text: taskText,
      completed: true
    });
  }

  if (typeof saveProjectsHubData === "function") saveProjectsHubData();

  // Otorgar XP y feedback sensorial
  window.awardXP(20, `Proyecto «${p.title}»: ${taskText}`, "exploracion");

  if (typeof playSoundEffect === "function") playSoundEffect("success");
  if (typeof showNotification === "function") {
    showNotification(`✓ Tarea completada en "${p.title}": "${taskText}" (+20 XP)!`);
  }

  renderProjects();
}
window.incrementProjectTask = incrementProjectTask;

function addProject() {
  const title = document.getElementById("new-proj-title");
  const cat = document.getElementById("new-proj-cat");
  const desc = document.getElementById("new-proj-desc");

  if (!title || !title.value.trim()) return;

  const newId = "proj_" + Date.now();
  projectsData[newId] = {
    id: newId,
    title: title.value.trim(),
    subtitle: "Nuevo proyecto estratégico del Rey Jaguar",
    collaborators: "Daniel Santander",
    category: cat ? cat.value : "Investigación Científica",
    bannerImg: "assets/img_financial_balance.jpg",
    desc: desc ? desc.value.trim() : "Plan estratégico y ejecución de metas.",
    gantt: [
      { id: "g1", stage: "Fase 1: Concepción y Diseño", startDate: "2026-09-01", endDate: "2026-10-15", progress: 50, status: "En Ejecución" },
      { id: "g2", stage: "Fase 2: Despliegue y Resultados", startDate: "2026-10-16", endDate: "2026-12-31", progress: 0, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Definir alcance y primeros entregables", completed: true },
      { id: "chk2", text: "Ejecutar pruebas iniciales de validación", completed: false },
      { id: "chk3", text: "Presentación de resultados y consolidación", completed: false }
    ],
    notes: "Proyecto añadido desde el Códice de Proyectos."
  };

  title.value = "";
  if (desc) desc.value = "";

  if (typeof saveProjectsHubData === "function") saveProjectsHubData();
  renderProjects();
  if (typeof showNotification === "function") showNotification("Nuevo proyecto añadido al códice.");
}
window.addProject = addProject;

function deleteProject(id) {
  if (projectsData[id]) {
    delete projectsData[id];
    if (typeof saveProjectsHubData === "function") saveProjectsHubData();
  }
  renderProjects();
}

// --- REGISTRO DE TIEMPO & PANTALLA ---
function renderTimeTracker() {
  const list = document.getElementById("activity-logs-list");
  if (!list) return;

  if (!appState.activityLogs || appState.activityLogs.length === 0) {
    list.innerHTML = `<div style="text-align: center; color: #7A6347; padding: 20px; font-size: 0.85rem;">No hay sesiones registradas hoy. ¡Inicia un bloque de foco!</div>`;
    return;
  }

  list.innerHTML = appState.activityLogs.map(log => {
    const xpShown = log.xpAwarded || Math.round((log.duration || 15) * 1.3);
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #F0E8D6; border: 1px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm); margin-bottom: 6px; font-size: 0.85rem;">
        <div>
          <strong style="color: #0E0E13;">${log.activity}</strong>
          <span style="font-size: 0.7rem; color: #7A6347; margin-left: 6px;">(${log.category})</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #7A6347; font-weight: 600; font-size: 0.78rem;">${log.duration} min</span>
          <span class="badge-tag badge-gold" style="font-size: 0.68rem; font-weight: 800;">+${xpShown} XP</span>
        </div>
      </div>
    `;
  }).join("");
}

function logActivity() {
  const name = document.getElementById("log-act-name");
  const dur = document.getElementById("log-act-dur");
  const cat = document.getElementById("log-act-cat");

  if (!name || !name.value.trim()) return;

  const duration = parseInt(dur.value) || 15;
  const category = cat ? cat.value : "general";

  let earnedXP = Math.round(duration * 1.2);
  if (typeof CaballeroScoringEngine !== "undefined") {
    const calc = CaballeroScoringEngine.calculateTimeXP(duration, category, false);
    earnedXP = calc.xp;
    CaballeroScoringEngine.awardXP(calc.pillar, earnedXP, `${name.value.trim()} (${duration} min)`);
  }

  appState.activityLogs.unshift({
    id: "act-" + Date.now(),
    activity: name.value.trim(),
    duration: duration,
    category: category,
    xpAwarded: earnedXP,
    date: cjToday()
  });

  name.value = "";
  saveAppState();
  renderTimeTracker();
}

// --- TEMPORIZADOR POMODORO (MODO FOCO CYBERPUNK) ---
let pomodoroTimer = null;
let pomodoroSeconds = 25 * 60;
let pomodoroDefaultSeconds = 25 * 60;

function togglePomodoro() {
  const btn = document.getElementById("pomo-btn");
  if (pomodoroTimer) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    if (btn) btn.innerText = "Reanudar Bloque";
    updatePomodoroDisplay();
  } else {
    pomodoroTimer = setInterval(() => {
      pomodoroSeconds--;
      updatePomodoroDisplay();
      if (pomodoroSeconds <= 0) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
        playSoundEffect("levelup");
        showNotification("¡Sesión de Foco Cyberpunk completada!");
        if (btn) btn.innerText = "Iniciar Nuevo Bloque";
        updatePomodoroDisplay();
      }
    }, 1000);
    if (btn) btn.innerText = "Pausar Bloque";
    updatePomodoroDisplay();
  }
}

function resetPomodoro() {
  if (pomodoroTimer) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
  }
  pomodoroSeconds = pomodoroDefaultSeconds || (25 * 60);
  updatePomodoroDisplay();
  const btn = document.getElementById("pomo-btn");
  const mins = Math.floor(pomodoroSeconds / 60);
  if (btn) btn.innerText = `Iniciar Bloque ${mins} Min`;
}

function setPomodoroDuration(mins, btnEl) {
  if (pomodoroTimer) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
  }
  pomodoroDefaultSeconds = mins * 60;
  pomodoroSeconds = pomodoroDefaultSeconds;
  updatePomodoroDisplay();

  const btn = document.getElementById("pomo-btn");
  if (btn) btn.innerText = `Iniciar Bloque ${mins} Min`;

  const statusLabel = document.getElementById("pomo-status-label");
  if (statusLabel) {
    statusLabel.innerText = mins >= 20 ? "⚡ BLOQUE DE ENFOQUE INTENSO" : "☕ PAUSA / RECUPERACIÓN";
  }

  document.querySelectorAll(".pomo-preset-btn").forEach(b => {
    b.classList.remove("active");
    b.style.borderColor = "var(--border-glass)";
  });
  if (btnEl) {
    btnEl.classList.add("active");
    btnEl.style.borderColor = "var(--neon-pink)";
  }
}

function updatePomodoroDisplay() {
  const mins = Math.floor(pomodoroSeconds / 60);
  const secs = pomodoroSeconds % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const disp = document.getElementById("pomo-display");
  if (disp) disp.innerText = timeStr;

  const headerBadge = document.getElementById("header-pomo-badge");
  if (headerBadge) {
    headerBadge.innerText = timeStr;
    headerBadge.style.display = pomodoroTimer ? "inline-block" : "none";
  }

  const menuBadge = document.getElementById("menu-pomo-badge");
  if (menuBadge) {
    menuBadge.innerText = timeStr;
    menuBadge.style.display = pomodoroTimer ? "inline-block" : "none";
  }
}

function openPomodoroModal() {
  const modal = document.getElementById("pomodoro-modal");
  if (modal) {
    modal.classList.add("active");
    updatePomodoroDisplay();
  }
}

function closePomodoroModal() {
  const modal = document.getElementById("pomodoro-modal");
  if (modal) modal.classList.remove("active");
}

window.togglePomodoro = togglePomodoro;
window.resetPomodoro = resetPomodoro;
window.setPomodoroDuration = setPomodoroDuration;
window.openPomodoroModal = openPomodoroModal;
window.closePomodoroModal = closePomodoroModal;


function showNotification(msg) {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.background = "linear-gradient(135deg, #150A2D 0%, #070312 100%)";
  toast.style.border = "1px solid var(--neon-pink)";
  toast.style.color = "#FFF";
  toast.style.padding = "14px 22px";
  toast.style.borderRadius = "var(--radius-md)";
  toast.style.boxShadow = "var(--shadow-neon-pink)";
  toast.style.zIndex = "99999";
  toast.style.fontFamily = "'Orbitron', sans-serif";
  toast.style.fontSize = "0.85rem";
  toast.innerText = `🐆 ${msg}`;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// --- RULETA / COFRE DE RECOMPENSAS DE DOPAMINA SANA ---
const DOPAMINE_REWARDS = [
  { title: "🎁 +150 XP Extra de Soberanía", bonusXP: 150, msg: "¡Recompensa desbloqueada! +150 XP añadidos a tu perfil." },
  { title: "🛡️ Insignia: Blindaje Dopaminérgico Definitivo", bonusXP: 100, msg: "¡Insignia Desbloqueada! Tu fuerza de voluntad frente a impulsos aumenta un 20%." },
  { title: "⚡ Boost de Enfoque: 1 Bloque Pomodoro Extra", bonusXP: 75, msg: "¡Excelente! Has ganado un bonus de concentración para tus proyectos de vida." },
  { title: "🌟 +1 Día de Racha de Soberanía", bonusXP: 200, msg: "¡Impresionante! Racha incrementada con éxito." },
  { title: "🎵 Pista Sonora Exclusiva: Deep Focus 432Hz", bonusXP: 50, msg: "Frecuencia binaural 432Hz lista para acompañar tu trabajo profundo." }
];

function spinDopamineReward() {
  const resultEl = document.getElementById("reward-result-display");
  if (!resultEl) return;

  playSoundEffect("levelup");
  resultEl.innerText = "🎰 Girando Ruleta de Dopamina Sana...";
  resultEl.style.color = "var(--neon-gold)";

  setTimeout(() => {
    const randomReward = DOPAMINE_REWARDS[Math.floor(Math.random() * DOPAMINE_REWARDS.length)];
    window.awardXP(randomReward.bonusXP, `Ruleta de dopamina sana: ${randomReward.title}`, "vida");

    resultEl.innerHTML = `
      <div style="font-weight: 800; font-size: 1.05rem; color: var(--neon-pink-bright); margin-bottom: 4px;">${randomReward.title}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">${randomReward.msg}</div>
    `;
    showNotification(`¡Recompensa de Dopamina Sana activada: +${randomReward.bonusXP} XP!`);
  }, 800);
}

// --- GENERADOR DE CITAS ESTOICAS E INSPIRACIONALES ---
var APP_STOIC_QUOTES = (typeof STOIC_QUOTES !== "undefined" && Array.isArray(STOIC_QUOTES)) ? STOIC_QUOTES : [
  { text: "No tienes dominio sobre los eventos externos, pero sí sobre tu mente. Comprende esto y hallarás la verdadera fuerza.", author: "Marco Aurelio" },
  { text: "La libertad es la única meta digna en la vida. Se gana ignorando las cosas que están fuera de nuestro control.", author: "Epicteto" },
  { text: "Sufrimos más a menudo en la imaginación que en la realidad.", author: "Séneca" },
  { text: "Quien vence a otros es fuerte; quien se vence a sí mismo es invencible.", author: "Lao Tse" },
  { text: "No es porque las cosas sean difíciles que no nos atrevemos; es porque no nos atrevemos que son difíciles.", author: "Séneca" }
];

function generateRandomStoicQuote() {
  const displays = document.querySelectorAll("#stoic-quote-display, .stoic-quote-display");
  if (!displays || displays.length === 0) return;

  if (typeof playSoundEffect === "function") playSoundEffect("success");
  const random = APP_STOIC_QUOTES[Math.floor(Math.random() * APP_STOIC_QUOTES.length)];
  displays.forEach(display => {
    display.innerHTML = `
      <blockquote style="font-size: 1.02rem; font-style: italic; color: #FFF; line-height: 1.5; margin-bottom: 8px;">
        "${random.text}"
      </blockquote>
      <div style="font-size: 0.85rem; font-weight: 800; color: var(--neon-gold, #C59A28); text-align: right;">
        — ${random.author}
      </div>
    `;
  });
}

// --- GESTOR DE TEMAS VISUALES (Renacimiento, Neonwave, Dark Gold) ---
function changeAppTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  localStorage.setItem("JAGUAR_ROSA_THEME", themeName);
  
  const selector = document.getElementById("app-palette-selector");
  if (selector) selector.value = themeName;
}

function initTheme() {
  const savedTheme = localStorage.getItem("JAGUAR_ROSA_THEME") || "renaissance";
  changeAppTheme(savedTheme);
}

function runMainAppInit() {
  initCelestialClock();
  initTheme();
  loadAppState();
  if (typeof loadReyJaguarState === "function") {
    try { loadReyJaguarState(); } catch (e) { console.error("Error loading rey jaguar state:", e); }
  }
  try { renderHeaderStatus(); } catch (e) { console.error(e); }
  try { initTabNavigation(); } catch (e) { console.error(e); }
  try { loadGoogleCalendarUrl(); } catch (e) { console.error(e); }
  
  try { renderLevelsGrid(); } catch (e) { console.error(e); }
  try { renderTasks(); } catch (e) { console.error(e); }
  try { renderBooks(); } catch (e) { console.error(e); }
  try { renderWorkouts(); } catch (e) { console.error(e); }
  try { renderCoupleSection(); } catch (e) { console.error(e); }
  try { renderProjects(); } catch (e) { console.error(e); }
  try { renderTimeTracker(); } catch (e) { console.error(e); }
  try { renderTherapyChat(); } catch (e) { console.error(e); }

  if (typeof renderCharacterHUD === "function") {
    try { renderCharacterHUD(); } catch (e) { console.error(e); }
  }

  // Inicializar Motor Cinemático IMPERIVM
  if (typeof imperivmEngine !== "undefined" && typeof imperivmEngine.init === "function") {
    try { imperivmEngine.init(); } catch (e) { console.error("Error al inicializar imperivmEngine:", e); }
  }

  try { selectMainTab("dashboard"); } catch (e) { console.error(e); }
  try { renderLanguagePracticeTab(); } catch (e) { console.error(e); }
}

// --- RELOJ CELESTIAL & DIAL SOL/LUNA EN VIVO ---
function initCelestialClock() {
  updateCelestialClock();
  setInterval(updateCelestialClock, 1000);
}
window.initCelestialClock = initCelestialClock;

function updateCelestialClock() {
  const now = new Date();
  const timeEl = document.getElementById("celestial-live-time");
  const dateEl = document.getElementById("celestial-live-date");
  const dialIcon = document.getElementById("celestial-dial-icon");

  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const yearTwoDigits = String(now.getFullYear()).slice(-2);

  if (timeEl) {
    timeEl.textContent = `${hours}:${mins}`;
  }

  if (dateEl) {
    dateEl.textContent = `${day}/${month}/${yearTwoDigits}`;
  }

  if (dialIcon) {
    const hour = now.getHours();
    // Sol durante el día (06:00 - 19:00), Luna en la noche
    if (hour >= 6 && hour < 19) {
      dialIcon.textContent = "☀️";
    } else {
      dialIcon.textContent = "🌙";
    }
  }
}
window.updateCelestialClock = updateCelestialClock;

// --- MODAL: HORÓSCOPOS & COSMOGRAFÍA CELESTIAL (GRIEGO, MAYA, CHINO, VÉDICO) ---
function openCelestialHoroscopesModal() {
  const modal = document.getElementById("celestial-horoscopes-modal");
  const content = document.getElementById("celestial-horoscopes-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #9B2335; padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge-tag badge-gold">🌌 COSMOGRAFÍA CELESTIAL</span>
          <span class="badge-tag badge-cyan">4 Horóscopos & Tránsitos Astrales</span>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.55rem; color: #0E0E13; margin: 4px 0 0 0;">
          Cosmovisiones & Lectura de Cosmogonías
        </h2>
      </div>
      <button onclick="closeCelestialHoroscopesModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
    </div>

    <!-- BANNER COMPUESTO 4 COLUMNAS (GRIEGO, MAYA, CHINO, VÉDICO) -->
    <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid #9B2335; margin-bottom: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">
      <img src="assets/horoscopes_quad_composite.jpg" alt="4 Horóscopos: Griego, Maya, Chino, Védico" style="width: 100%; height: auto; max-height: 200px; object-fit: cover; display: block;">
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 14px; background: linear-gradient(to top, rgba(14,9,5,0.92) 0%, transparent 100%); display: flex; justify-content: space-around; font-size: 0.72rem; font-weight: 800; color: #FAF6EE; font-family: 'Cinzel', serif;">
        <span>♈ ZODÍACO GRIEGO</span>
        <span>🌞 TZOLKIN MAYA</span>
        <span>🐉 ZODÍACO CHINO</span>
        <span>✨ JYOTISH VÉDICO</span>
      </div>
    </div>

    <!-- LECTURAS DE LAS 4 TRADICIONES COSMOLÓGICAS PARA DANIEL SANTANDER -->
    <div class="grid-2" style="gap: 14px; margin-bottom: 16px;">
      <!-- 1. GRIEGO / TROPICAL -->
      <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-left: 3.5px solid #E5A93C; border-radius: var(--radius-sm); padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #0E0E13;">♈ 1. Horóscopo Griego (Sol en Aries)</strong>
          <span class="badge-tag badge-gold" style="font-size: 0.62rem;">23 Mar 1996</span>
        </div>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
          <strong>Regente Marte (Fuego Cardinal):</strong> Impulso de conquista, audacia implacable y coraje ante la incertidumbre. Hoy la energía solar favorece la ejecución directa de la Tesis, el corte de deliberaciones improductivas y la consolidación de tu soberanía material.
        </p>
      </div>

      <!-- 2. MAYA / TZOLKIN -->
      <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-left: 3.5px solid #2B6847; border-radius: var(--radius-sm); padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #0E0E13;">🌞 2. Tzolkin Maya (Chicchan / Tijax)</strong>
          <span class="badge-tag badge-emerald" style="font-size: 0.62rem;">Serpiente de Luz</span>
        </div>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
          <strong>Nawal de Sabiduría & Cuchillo de Obsidiana:</strong> Conexión con la fuerza vital telúrica (Kundalini mesoamericano). Capacidad de discernimiento quirúrgico para separar lo sagrado de lo trivial, disolver la dispersión y consagrar el templo corporal a la Madre Tierra.
        </p>
      </div>

      <!-- 3. CHINO -->
      <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-left: 3.5px solid #C62828; border-radius: var(--radius-sm); padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #0E0E13;">🐉 3. Horóscopo Chino (Rata de Fuego 1996)</strong>
          <span class="badge-tag badge-pink" style="font-size: 0.62rem;">Elemento Fuego</span>
        </div>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
          <strong>Astucia, Alquimia & Liderazgo Racional:</strong> Agudeza mental suprema para detectar oportunidades financieras, versatilidad estratégica y magnetismo. En conjunción con el Dragón, potencia la capacidad de concretar la tesis y la mudanza a Hannover y Bilbao.
        </p>
      </div>

      <!-- 4. VÉDICO / JYOTISH -->
      <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-left: 3.5px solid #3F51B5; border-radius: var(--radius-sm); padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #0E0E13;">✨ 4. Jyotish Védico (Mesha Rashi & Mangala)</strong>
          <span class="badge-tag badge-cyan" style="font-size: 0.62rem;">Kshatriya / Guerrero</span>
        </div>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
          <strong>Dharma del Guerrero Noble:</strong> Purificación mediante Tapas (austeridad voluntaria, abstinencia y Muay Thai). Alineación de los 7 chakras hacia la soberanía de la voluntad, disolviendo toda sombra de adicción barata y cultivando la mirada serena.
        </p>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(197,154,40,0.3); padding-top: 12px; flex-wrap: wrap; gap: 10px;">
      <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 800; font-size: 0.78rem;" onclick="closeCelestialHoroscopesModal(); selectMainTab('astral');">
        🔮 Ver Carta Astral & Revolución Solar Completa
      </button>
      <button class="btn-jaguar btn-secondary-dark" onclick="closeCelestialHoroscopesModal()">
        Cerrar Horóscopo
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openCelestialHoroscopesModal = openCelestialHoroscopesModal;

function closeCelestialHoroscopesModal() {
  const modal = document.getElementById("celestial-horoscopes-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
window.closeCelestialHoroscopesModal = closeCelestialHoroscopesModal;


/* ==========================================================================
   BITÁCORAS FULLSCREEN MODAL (INSPIRADO EN DIABLO II LORD OF DESTRUCTION - CODEX RENACENTISTA)
   ========================================================================== */
let currentDiabloSelectedTab = "finanzas";

const DIABLO_TAB_PREVIEWS = {
  finanzas: {
    badge: "💰 TESORERÍA IMPERIAL",
    title: "💰 Control de Tesorería & Bancos",
    desc: "Plataforma de soberanía financiera del Caballero Jaguar. Conciliación bancaria en CSV de Sparkasse Alemania y Banco de Chile, cálculo de ahorro neto mensual y proyecciones de presupuesto.",
    req: "Nivel Caballero • Acceso Ilimitado a la Caja Real"
  },
  ejercicio: {
    badge: "🏋️‍♂️ TEMPLO DE CABALLERÍA & COMBATE",
    title: "🏋️‍♂️ Disciplina & Combat Hub",
    desc: "Centro de acondicionamiento físico del Caballero Jaguar, sparrings de Muay Thai, rutinas de calistenia de 5 minutos y racha innegociable de disciplina.",
    req: "Nivel Caballero • Misión 5 Minutos Diarios Innegociables"
  },
  ritos: {
    badge: "🕯️ RITOS DE INICIACIÓN SAGRADA",
    title: "🕯️ Ritos Ancestrales de Desintoxicación (21 Días)",
    desc: "Ceremonias sagradas de conexión con el Gran Misterio y purificación profunda para consagrar los 21 días de templanza. Cosmovisiones Navaho (Diné: Hózhó y Sahumado de Salvia/Cedro), Andina (Ayni, Kintu de Hojas y Despacho a Pachamama) y Amazónica (Soplo de Tabaco Mapacho y Purga Floral). Protocolos 100% realizables sin drogas ni psicoactivos.",
    req: "Iniciación de Templanza • 21 Días • Ofrenda Sagrada"
  },
  lectura: {
    badge: "📚 BIBLIOTECA ESTOICA",
    title: "📚 Biblioteca Estoica & Lecturas",
    desc: "50+ Obras maestras de filosofía estoica (Marco Aurelio, Séneca, Epicteto, Ryan Holiday), psicología y hábitos de élite. Incluye selector de códices, registro de páginas leídas, notas personales y otorgamiento directo de XP al Banderín Café.",
    req: "Nivel Caballero • 15 Páginas Diarias de Lectura"
  },
  ayurveda: {
    badge: "🌿 MEDICINA HOLÍSTICA & VITALIDAD",
    title: "🌿 Ayurveda & Medicina Holística",
    desc: "La ciencia milenaria del equilibrio vital: diagnóstico interactivo de Doshas (Vata, Pitta, Kapha), protocolos sagrados de Dinacharya (raspado de lengua, enjuague en aceite Gandusha, automasaje Abhyanga), botica herbaria y nutrición biológica.",
    req: "Nivel Caballero • Armonía Dosha & Autocuidado Somático"
  },
  meditacion: {
    badge: "🧘 CALMA SOMÁTICA & PRESENCIA",
    title: "🧘 Meditación & Calma Somática",
    desc: "Centro de regulación del sistema nervioso y serenidad marcial: Box Breathing (4x4x4x4 con círculo reactivo animado), Meditación Vipassana somática, Zazen y campana tibetana acústica. Otorga XP directo al Banderín Rosa.",
    req: "Nivel Caballero • Presencia Plena & 10 Minutos Diarios"
  },
  masajes: {
    badge: "💆 RECUPERACIÓN & MIOFASCIAL",
    title: "💆 Masajes (Pareja & Auto-Masaje)",
    desc: "Guías ilustradas de masaje tántrico y terapéutico en pareja (espalda, hombros, aromaterapia relajante) y protocolos de auto-masaje miofascial (foam roller, puntos gatillo, fascia plantar) para alivio de tensión muscular y recuperación marcial.",
    req: "Nivel Caballero • Regeneración Fascial & Cuidado Corporal"
  },
  progresion: {
    badge: "📜 SISTEMA MAESTRO DE CABALLERÍA",
    title: "📜 Sistema Maestro de Progresión (Pitch)",
    desc: "Manifiesto y arquitectura completa de progresión: Los 5 Pilares de Caballería Jaguar (Mente, Fuerza, Territorio, Soberanía, Vitalidad), fórmula matemática de cálculo ponderado de XP, multiplicadores de novedad y escalafón de 5 rangos RPG.",
    req: "Nivel Caballero • Códice Fundamental de la Orden"
  },
  conocimiento: {
    badge: "📚 BIBLIOTECA ESTOICA",
    title: "📚 Biblioteca Estoica & Lecturas",
    desc: "Biblioteca digital de lecturas estoicas (Marco Aurelio, Séneca, Epicteto, Psicología) y Oráculo de sabiduría diaria.",
    req: "Nivel Caballero • 15 Páginas Diarias de Lectura"
  },
  juegos: {
    badge: "🎮 SALA DE TEMPLANZA",
    title: "🎮 Arcade & Desafíos Mentales",
    desc: "Mini-juegos de Breakout de enfoque y Trivia estoica para templar la voluntad y el autodominio de recompensas dopaminérgicas.",
    req: "Nivel Caballero • Enfoque & Autocontrol"
  },
  astral: {
    badge: "🔮 OBSERVATORIO CELESTE",
    title: "🔮 Análisis Astrológico Profundo",
    desc: "Carta natal de Aries (23 Mar 1996 - Parral). Conjunción Marte/Sol y decanatos de fuego primordial del Caballero Jaguar.",
    req: "Nivel Caballero • Estudio Astral Completo"
  },
  idiomas: {
    badge: "🌐 ACADEMIA POLÍGLOTA",
    title: "🌐 Práctica Interactiva de Idiomas",
    desc: "Laboratorio de vocabulario y frases en Alemán (Deutsch B1), Euskera, Portugués e Italiano con sintetizador de voz en tiempo real.",
    req: "Nivel Caballero • Entrenador de Pronunciación"
  },
  niveles: {
    badge: "🏆 ESCALAFÓN DE LA ORDEN",
    title: "🏆 Matriz de Caballería (21 Días)",
    desc: "Sistema de progresión de 21 días (Caballero Jaguar, Caballero Explorador, Gran Maestre). Estado de racha y medidor de experiencia XP.",
    req: "Nivel Caballero • Matriz de Caballería Imperial"
  },
  musica: {
    badge: "🎵 CÁMARA MUSICAL & VIENTO",
    title: "🎵 Música, Trompeta & Saxofón (Jazz & Blues)",
    desc: "Laboratorio de instrumentos de viento y beatmaking: Trompeta de Jazz, Saxofón, Armónica blues, Melódica y Samplers de bolsillo. Incluye ranking técnico de dificultad (1/10 estrellas) y registro de práctica diaria.",
    req: "Nivel Caballero • Embocadura & Armonía"
  },
  fotografia: {
    badge: "📷 ACADEMIA DE ÓPTICA & VISIÓN",
    title: "📷 Aprender Fotografía & Visión Territorial",
    desc: "Laboratorio de dominio óptico: triángulo de exposición (Apertura f/, Velocidad de obturación, ISO), composición áurea, dominio de la luz natural (hora dorada y azul), fotografía de expedición territorial y revelado digital.",
    req: "Nivel Caballero • Ojo Entrenado & Composición Sagrada"
  },
  pintura: {
    badge: "🎨 ATELIER DE BELLAS ARTES",
    title: "🎨 Aprender Pintura & Teoría del Color",
    desc: "Atelier clásico de bellas artes: teoría del color y armonías cromáticas, paleta limitada de Anders Zorn, técnica de claroscuro (chiaroscuro), veladuras al óleo sobre grisalla, acuarela botánica y pintura de paisaje en plein air.",
    req: "Nivel Caballero • Maestría Tonal & Sensibilidad Cromática"
  }
};

function selectDiabloPreview(tabKey) {
  currentDiabloSelectedTab = tabKey;
  
  document.querySelectorAll(".diablo-menu-btn").forEach(btn => btn.classList.remove("active-preview"));
  const activeBtn = document.getElementById(`btn-diablo-${tabKey}`);
  if (activeBtn) activeBtn.classList.add("active-preview");

  const data = DIABLO_TAB_PREVIEWS[tabKey];
  if (!data) return;

  const badgeEl = document.getElementById("diablo-preview-badge");
  const titleEl = document.getElementById("diablo-preview-title");
  const descEl = document.getElementById("diablo-preview-desc");
  const reqEl = document.getElementById("diablo-preview-req");

  if (badgeEl) badgeEl.textContent = data.badge;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (reqEl) reqEl.textContent = data.req;
}

function executeDiabloNavigation() {
  if (currentDiabloSelectedTab === 'ritos') {
    closeBitacorasModal();
    openRitosModal();
  } else if (currentDiabloSelectedTab) {
    navigateToBitacora(currentDiabloSelectedTab);
  }
}

function openBitacorasModal() {
  const modal = document.getElementById("bitacoras-fullscreen-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    selectDiabloPreview(currentDiabloSelectedTab || 'finanzas');
  }
}

function closeBitacorasModal() {
  const modal = document.getElementById("bitacoras-fullscreen-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function navigateToBitacora(tabKey) {
  closeBitacorasModal();
  selectMainTab(tabKey);
}

/* ==========================================================================
   RITOS ANCESTRALES DE INICIACIÓN (21 DÍAS DE DESINTOXICACIÓN & TEMPLANZA)
   Cosmovisiones: Navaho (Diné), Andino (Quechua/Aymara), Amazónico (Vegetalista)
   Protocolos sobrios sin sustancias psicoactivas
   ========================================================================== */
let activeRitoKey = "navaho";
window.activeRitoKey = activeRitoKey;

const RITOS_ANCESTRALES_DATA = {
  navaho: {
    id: "navaho",
    pueblo: "Diné (Navajo) • Cuatro Montañas Sagradas",
    titulo: "Hózhó & Sahumado del Alba",
    icono: "🦅",
    deidad: "Diyin Dine'é (El Pueblo Sagrado) & El Gran Misterio (Níłch'i / Viento Santo)",
    color: "#E2A93B",
    bannerBg: "linear-gradient(135deg, rgba(226,169,59,0.15) 0%, rgba(20,16,10,0.95) 100%)",
    cosmovision: "En la cosmovisión Diné, el cosmos existe en un orden armónico perfecto llamado Hózhó (belleza, equilibrio, salud mental, rectitud y armonía cósmica). Dios o el Gran Misterio no es un juez exterior, sino el Viento Sagrado (Níłch'i) que respira en todos los seres vivientes y une las cuatro direcciones. Toda intoxicación, adicción o dispersión es vista como una pérdida transitoria de Hózhó. Para iniciar los 21 días, no se 'lucha' contra el vicio; se restablece la belleza primordial alineando mente, cuerpo y habla.",
    paraLos21Dias: "Este rito se consagra al alba del Día 1. Funciona como un reajuste somático del sistema nervioso, invocando la protección de los cuatro rumbos cardinales para blindar la mente frente a los impulsos y dispersiones dopaminérgicas.",
    elementos: [
      "🌿 Salvia blanca seca, cedro o enebro (para sahumado purificador)",
      "🌽 Una pequeña cucharada de harina de maíz blanco o amarillo (Tádídíín simbólico de gratitud)",
      "🔥 Cerilla de madera o concha/recipiente de barro resistente al fuego",
      "🌅 Mirada hacia el Este (T’áá Hózhóogo - dirección del amanecer y los nuevos comienzos)"
    ],
    protocolo: [
      {
        paso: "1. Saludo al Alba y las Cuatro Direcciones",
        detalle: "Párate descalzo frente al Este al amanecer o temprano en la mañana. Respira profundamente 4 veces llenando el vientre con el aire puro del alba. Reconoce la presencia del Gran Misterio que anima tu respiración."
      },
      {
        paso: "2. Sahumado Somático de Purificación",
        detalle: "Enciende la salvia blanca o cedro. Con la mano o una pluma, lleva el humo sagrado primero hacia tus ojos (para ver con claridad), luego hacia tus oídos (para escuchar la verdad), hacia tu boca (para hablar con sobriedad) y finalmente de pies a cabeza bañando tu cuerpo físico."
      },
      {
        paso: "3. Ofrenda de Maíz (Tádídíín) y Plegaria Diné",
        detalle: "Toma la pizca de harina de maíz con tu mano derecha. Espárcela suavemente al viento hacia el cielo y la tierra, recitando en voz alta el principio del Canto de la Noche: 'Belleza ante mí camino. Belleza detrás de mí camino. Belleza debajo de mí camino. Belleza encima de mí camino. En belleza y sobriedad inicio mis 21 días de fuerza'."
      },
      {
        paso: "4. Voto de Templanza del Caballero Jaguar",
        detalle: "Declara tu compromiso inquebrantable de 21 días de claridad mental, ayuno de toxicidad y disciplina férrea. Bebe un vaso de agua fresca de manantial para asentar el compromiso."
      }
    ]
  },
  andino: {
    id: "andino",
    pueblo: "Quechua & Aymara • Los Andes y Apus Sagrados",
    titulo: "Ayni, Kintu & Despacho a Pachamama",
    icono: "🏔️",
    deidad: "Pachamama (Madre Tierra), Apus (Espíritus Tutelares de la Montaña) & Wiraqocha (Fuerza Creadora)",
    color: "#2B8255",
    bannerBg: "linear-gradient(135deg, rgba(43,130,85,0.18) 0%, rgba(10,20,15,0.95) 100%)",
    cosmovision: "En los Andes, la vida se sostiene sobre el principio fundamental del Ayni: reciprocidad sagrada ('Hoy por ti, mañana por mí'). Nadie puede sanar ni desintoxicarse en soledad o desde el egoísmo mental. La salud y la templanza son el fruto de una relación armónica de intercambio con la Madre Tierra (Pachamama) y las montañas tutelares (Apus). Acercarse a la divinidad andina no requiere intermediarios ni dogmas, sino un acto humilde de ofrenda y respeto a la naturaleza viva.",
    paraLos21Dias: "Se utiliza para entregar a la tierra las cargas del ciclo anterior (apegos, vicios, estrés somático y toxinas acumuladas) y recibir a cambio la fuerza inamovible de la roca y la cordillera para sostener los 21 días de disciplina.",
    elementos: [
      "🍃 Kintu: 3 hojas sanas e intactas (hojas de laurel, romero, menta fresca o coca si está disponible)",
      "🌾 Puñado de semillas o granos (arroz, maíz o quinoa) y una pizca de azúcar o panela",
      "🪵 Madera de Palo Santo o carbón con resina de copal para sahumado dulce",
      "🪴 Una maceta con tierra viva o el pie de un árbol en un parque o jardín"
    ],
    protocolo: [
      {
        paso: "1. Armado del Kintu Sagrado",
        detalle: "Toma las 3 hojas con las yemas de tus dedos pulgar e índice de la mano derecha, formando un abanico que representa los tres mundos: Hanan Pacha (mundo superior/visión), Kay Pacha (mundo presente/acción) y Uku Pacha (mundo interior/raíces inconscientes)."
      },
      {
        paso: "2. El Phukuy (Soplo Sagrado de Intención)",
        detalle: "Acerca el Kintu a tus labios a la altura del corazón. Sopla suavemente tres veces sobre las hojas (Phukuy), transfiriendo tu agradecimiento a la Pachamama y entregando tu debilidad para transformarla en fuerza de voluntad."
      },
      {
        paso: "3. Entrega de la Ofrenda (Mini-Despacho)",
        detalle: "Coloca las 3 hojas sobre la tierra fértil junto con los granos de cereal y la pizca dulce. Cúbrelas suavemente con un puñado de tierra mientras dices: 'Pachamama, recibe lo que ya no me sirve; dame la firmeza del Apu para estos 21 días de templanza'."
      },
      {
        paso: "4. Sahumado de Palo Santo y Sellado",
        detalle: "Enciende el Palo Santo o resina aromática. Pasa el humo por tus manos, tu pecho y tu coronilla. Toca la tierra con la palma de tu mano derecha para sellar el pacto de Ayni."
      }
    ]
  },
  amazona: {
    id: "amazona",
    pueblo: "Vegetalistas de la Cuenca Amazónica (Shipibo / Asháninka)",
    titulo: "Soplo de Mapacho & Purga Floral de Limpieza",
    icono: "🌿",
    deidad: "El Gran Misterio en los Espíritus del Bosque, las Plantas Maestras & la Ceiba Primordial",
    color: "#00E5FF",
    bannerBg: "linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(6,18,22,0.95) 100%)",
    cosmovision: "En la cosmovisión vegetalista amazónica, el Creador se manifiesta directamente en la inteligencia sensible de la selva. El cuerpo humano es concebido como un recipiente energético que acumula pesadez, malas energías y toxinas por malos hábitos. El tabaco rústico curativo (Mapacho o puro natural) es considerado el 'Gran Abuelo Protector' y la medicina por excelencia para limpiar, enfocar y ahuyentar la distracción mental. Su uso ceremonial no es para fumar con adicción ni tragar al pulmón, sino para rezar y trazar un cerco protector alrededor del iniciado.",
    paraLos21Dias: "Este rito marca la 'Apertura de Dieta'. En la tradición de la selva, dietar 21 días significa apartarse de excesos, sal pesada, azúcares refinadas y dispersión mental para que el espíritu recobre su agudeza de jaguar.",
    elementos: [
      "🍂 1 cigarro de tabaco puro sin aditivos ni químicos (Mapacho o puro de tabaco negro)",
      "🥣 Baño / Lavado Floral: Recipiente con agua fresca y hierbas aromáticas frescas maceradas (romero, albahaca, ruda o menta y unas gotas de limón)",
      "🕯️ Vela blanca o de cera natural",
      "💧 1 vaso grande de agua pura de manantial"
    ],
    protocolo: [
      {
        paso: "1. Macerado y Lavado Facial / Coronilla (Purga Floral)",
        detalle: "Frota enérgicamente las hojas de albahaca, romero o menta entre tus manos dentro del cuenco de agua con limón hasta que liberen sus aceites esenciales. Lávate las manos, la nuca, el rostro y la coronilla con esta agua fresca para despejar la niebla mental."
      },
      {
        paso: "2. Consagración del Tabaco Protector (Sin Inhalar)",
        detalle: "Sostén el tabaco en tu mano derecha. Respira su aroma terroso natural. Enciende el tabaco con la vela. Llena tu boca de humo denso sin tragarlo al pulmón (actúa como vehículo de limpieza somática y rezo)."
      },
      {
        paso: "3. La Soplada Ritual (Escudo Somático)",
        detalle: "Sopla el humo firmemente sobre el dorso de tus manos, tus antebrazos y tu pecho en forma de cruz o círculo protector. Pide al Abuelo Tabaco y a la naturaleza que corten cualquier tentación de dispersión o recaída durante los 21 días."
      },
      {
        paso: "4. Apertura Solemne de la Dieta de Templanza",
        detalle: "Apaga el tabaco con respeto. Bebe el vaso de agua fresca lentamente sintiendo la pureza ingresar en tu torrente sanguíneo. Declara iniciada tu 'Dieta de 21 Días del Caballero Jaguar'."
      }
    ]
  },
  jaguar: {
    id: "jaguar",
    pueblo: "Orden Imperial del Caballero Jaguar (Cosmovisión Mesoamericana & Estoica)",
    titulo: "Fuego Nuevo & Consagración del Altar",
    icono: "🐆",
    deidad: "Tezcatlipoca (Espejo Humeante del Autoconocimiento), Ometéotl & Fuego Sagrado",
    color: "#9B2335",
    bannerBg: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(20,12,6,0.96) 100%)",
    cosmovision: "El Caballero Jaguar encarna la transmutación de la sombra en luz mediante el espejo de obsidiana. Al igual que la ceremonia tolteca del Fuego Nuevo, cada ciclo de 21 días es una muerte de la pereza y un renacimiento de la voluntad soberana. No hay victoria externa sin autodominio interior.",
    paraLos21Dias: "Rito de consagración del altar personal del Caballero Jaguar. Enciende la chispa inquebrantable de la templanza, el amor propio y la protección del hogar.",
    elementos: [
      "🕯️ Vela dorada o roja sobre el altar",
      "🪙 Moneda o reliquia de metal que simbolice tu Soberanía Financiera",
      "📜 El Códice de Deberes abierto con tus metas del ciclo",
      "☕ Infusión caliente o agua fresca con gotas de limón"
    ],
    protocolo: [
      {
        paso: "1. Encendido del Fuego Sagrado",
        detalle: "Enciende la vela en tu altar con intención deliberada. Respira en 4 tiempos (Box Breathing) sintiendo el calor del fuego iluminar tu rostro y disipar cualquier duda."
      },
      {
        paso: "2. Examen del Espejo Humeante",
        detalle: "Mírate fijamente o reflexiona frente al fuego sobre los hábitos que dejas atrás. Reconoce que tu identidad no es tu pasado ni tus impulsos, sino tu libre albedrío presente."
      },
      {
        paso: "3. Toque de la Reliquia y Voto Imperial",
        detalle: "Toma la reliquia o moneda con tu mano derecha y colócala sobre tu pecho: 'Por el fuego del Caballero Jaguar, declaro iniciados mis 21 días de dominio y soberanía'."
      },
      {
        paso: "4. Asentamiento en Silencio Testigo",
        detalle: "Permanece 3 minutos en silencio completo contemplando la llama. Siente la serenidad estoica instalarse en tu sistema nervioso."
      }
    ]
  }
};

function openRitosModal() {
  console.log("[DEBUG] openRitosModal() in app.js called");
  const modal = document.getElementById("ritos-sacred-modal");
  console.log("[DEBUG] ritos-sacred-modal element:", modal);
  if (!modal) { console.error("[DEBUG] ❌ #ritos-sacred-modal NOT found in DOM!"); return; }
  modal.classList.add("active");
  modal.style.display = "flex";
  modal.style.setProperty("display", "flex", "important");
  modal.style.setProperty("opacity", "1", "important");
  modal.style.setProperty("pointer-events", "auto", "important");
  modal.style.setProperty("z-index", "100000", "important");
  document.body.style.overflow = "hidden";
  console.log("[DEBUG] Modal display set to flex, calling renderRitosModalContent");
  renderRitosModalContent();
}
window.openRitosModal = openRitosModal;

function closeRitosModal() {
  const modal = document.getElementById("ritos-sacred-modal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.style.display = "none";
  document.body.style.overflow = "";
}
window.closeRitosModal = closeRitosModal;

function selectRitoTab(ritoKey) {
  if (RITOS_ANCESTRALES_DATA[ritoKey]) {
    activeRitoKey = ritoKey;
    window.activeRitoKey = ritoKey;
    renderRitosModalContent();
  }
}
window.selectRitoTab = selectRitoTab;

function completeRitoInitiation(ritoKey) {
  const rito = RITOS_ANCESTRALES_DATA[ritoKey];
  if (!rito) return;

  localStorage.setItem("JAGUAR_RITO_INICIACION_ACTIVO", JSON.stringify({
    key: ritoKey,
    titulo: rito.titulo,
    fecha: new Date().toISOString()
  }));

  if (typeof awardXP === "function") {
    awardXP(50, `Iniciación Sagrada Rito ${rito.pueblo.split('•')[0].trim()}`, "espiritualidad");
  }

  showNotification(`🕯️ Rito de Iniciación completado: Consagrados los 21 Días de Templanza (+50 XP).`);
  renderRitosModalContent();
}
window.completeRitoInitiation = completeRitoInitiation;

function renderRitosModalContent() {
  const container = document.getElementById("ritos-modal-content");
  if (!container) return;

  const currentRito = RITOS_ANCESTRALES_DATA[activeRitoKey] || RITOS_ANCESTRALES_DATA.navaho;
  const storedInitiation = localStorage.getItem("JAGUAR_RITO_INICIACION_ACTIVO");
  let initiationData = null;
  if (storedInitiation) {
    try { initiationData = JSON.parse(storedInitiation); } catch(e){}
  }

  container.innerHTML = `
    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid var(--border-gold); padding-bottom: 16px; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="badge-tag badge-gold">🕯️ CÓDICE DEL CABALLERO JAGUAR</span>
          <span class="badge-tag badge-emerald">Iniciación 21 Días • 100% Sobrio</span>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #FFF; margin: 4px 0 0 0; text-shadow: 0 0 20px rgba(197,154,40,0.5);">
          🕯️ Ritos Sagrados de Conexión & Desintoxicación
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; max-width: 720px; line-height: 1.4;">
          Cosmovisiones originarias para aproximarse al Gran Misterio y a la Divinidad. Ceremonias solemnes sin sustancias psicoactivas para consagrar el inicio del ciclo de 21 días de templanza.
        </p>
      </div>
      <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="closeRitosModal()" style="font-size: 1.1rem; padding: 6px 14px;">
        ✕ Cerrar
      </button>
    </div>

    <!-- BANNER COMPUESTO 4 COLUMNAS DE RITOS SAGRADOS ORIGINARIOS -->
    <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid var(--border-gold); margin-bottom: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">
      <img src="assets/sacred_rites_quad_composite.jpg" alt="Ritos Sagrados: Navaho, Andino, Amazónico, Caballero Jaguar" onerror="this.onerror=null; this.src='assets/img_habituation_21days.jpg';" style="width: 100%; height: auto; max-height: 200px; object-fit: cover; display: block;">
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 14px; background: linear-gradient(to top, rgba(11,14,20,0.92) 0%, transparent 100%); display: flex; justify-content: space-around; font-size: 0.72rem; font-weight: 800; color: #FAF6EE; font-family: 'Cinzel', serif;">
        <span>🏜️ NAVAJO DINÉ</span>
        <span>🏔️ QUECHUA ANDINO</span>
        <span>🌿 VEGETALISMO AMAZÓNICO</span>
        <span>🐆 CABALLERO JAGUAR</span>
      </div>
    </div>

    <!-- SELECTOR DE LAS 4 COSMOVISIONES -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
      ${Object.keys(RITOS_ANCESTRALES_DATA).map(key => {
        const r = RITOS_ANCESTRALES_DATA[key];
        const isActive = activeRitoKey === key;
        return `
          <button class="btn-jaguar ${isActive ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                  onclick="selectRitoTab('${key}')"
                  style="display: flex; flex-direction: column; align-items: center; padding: 10px 8px; border-radius: var(--radius-md); text-align: center; gap: 4px; ${isActive ? 'color: #0B0E14; font-weight: 800;' : 'color: #FFF;'}">
            <span style="font-size: 1.4rem;">${r.icono}</span>
            <span style="font-family: 'Cinzel', serif; font-size: 0.85rem;">${key.toUpperCase()}</span>
            <span style="font-size: 0.68rem; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${r.titulo}</span>
          </button>
        `;
      }).join("")}
    </div>

    <!-- TARJETA PRINCIPAL DEL RITO SELECCIONADO -->
    <div style="background: ${currentRito.bannerBg}; border: 1.5px solid ${currentRito.color}; border-radius: var(--radius-md); padding: 22px; margin-bottom: 20px; box-shadow: 0 0 30px rgba(0,0,0,0.8);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
        <div>
          <span style="font-size: 0.75rem; color: ${currentRito.color}; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">
            ${currentRito.pueblo}
          </span>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #FFF; margin: 4px 0 0 0;">
            ${currentRito.icono} Rito ${currentRito.titulo}
          </h3>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.7rem; color: var(--text-dim); display: block;">Aproximación al Gran Espíritu:</span>
          <strong style="font-size: 0.82rem; color: ${currentRito.color}; font-family: 'Cinzel', serif;">
            ${currentRito.deidad}
          </strong>
        </div>
      </div>

      <!-- COSMOVISIÓN & SIGNIFICADO -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div style="background: rgba(0,0,0,0.45); border-left: 3px solid ${currentRito.color}; padding: 14px 16px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 0.88rem; color: ${currentRito.color}; margin-bottom: 6px;">
            🌌 Cosmovisión & Acercamiento a la Deidad
          </h4>
          <p style="font-size: 0.82rem; color: #E8E8E8; line-height: 1.55; margin: 0;">
            ${currentRito.cosmovision}
          </p>
        </div>

        <div style="background: rgba(0,0,0,0.45); border-left: 3px solid #2B8255; padding: 14px 16px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 0.88rem; color: #5CD696; margin-bottom: 6px;">
            🛡️ Función en los 21 Días de Desintoxicación
          </h4>
          <p style="font-size: 0.82rem; color: #E8E8E8; line-height: 1.55; margin: 0;">
            ${currentRito.paraLos21Dias}
          </p>
        </div>
      </div>

      <!-- ELEMENTOS REQUERIDOS (SOBRIOS Y REALIZABLES) -->
      <div style="background: rgba(11,14,20,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px;">
        <h4 style="font-family: 'Cinzel', serif; font-size: 0.9rem; color: #FFF; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>📦</span> Elementos Sagrados & Preparaciones (100% Sin Drogas)
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${currentRito.elementos.map(elem => `
            <div style="font-size: 0.8rem; color: #CCC; display: flex; align-items: flex-start; gap: 8px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: var(--radius-xs);">
              <span>•</span>
              <span>${elem}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- PROTOCOLO CEREMONIAL PASO A PASO -->
      <div style="background: rgba(11,14,20,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px;">
        <h4 style="font-family: 'Cinzel', serif; font-size: 0.9rem; color: #FFF; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🔥</span> Protocolo Ceremonial Paso a Paso
        </h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${currentRito.protocolo.map(p => `
            <div style="background: rgba(255,255,255,0.03); border-left: 2px solid ${currentRito.color}; padding: 10px 14px; border-radius: 0 var(--radius-xs) var(--radius-xs) 0;">
              <strong style="font-size: 0.85rem; color: #FFF; font-family: 'Cinzel', serif; display: block; margin-bottom: 4px;">
                ${p.paso}
              </strong>
              <p style="font-size: 0.8rem; color: #BBB; line-height: 1.45; margin: 0;">
                ${p.detalle}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- BOTÓN DE INICIACIÓN -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
        <div>
          ${initiationData && initiationData.key === activeRitoKey ? `
            <span style="font-size: 0.8rem; color: #5CD696; font-weight: 700;">
              ✓ Rito Consagrado el ${new Date(initiationData.fecha).toLocaleDateString()}
            </span>
          ` : `
            <span style="font-size: 0.78rem; color: var(--text-dim);">
              Consagra este rito para abrir tu ciclo de 21 días de templanza inquebrantable.
            </span>
          `}
        </div>
        <button class="btn-jaguar btn-gold-chrome" 
                onclick="completeRitoInitiation('${activeRitoKey}')"
                style="padding: 10px 24px; font-weight: 800; color: #0B0E14; font-family: 'Cinzel', serif; font-size: 0.9rem; box-shadow: 0 0 20px rgba(197,154,40,0.5);">
          ✨ Consagrar los 21 Días con este Rito (+50 XP)
        </button>
      </div>

    </div>
  `;
}

/* ==========================================================================
   CENTRO DE PRÁCTICA INTERACTIVO DE IDIOMAS (ALEMÁN, EUSKERA, PORTUGUÉS, ITALIANO)
   ========================================================================== */
const languagePracticeData = {
  de: {
    name: "Alemán (Deutsch B1)",
    code: "de-DE",
    badge: "🇩🇪 Hannover • B1",
    flashcards: [
      {
        prompt: "¿Cómo pedir café y pastel amablemente en una panadería en Hannover?",
        target: "Ich hätte gerne einen Kaffee und ein Stück Kuchen, bitte.",
        notes: "Uso de 'hätte gerne' (Konjunktiv II de haben) para peticiones de cortesía en comercios."
      },
      {
        prompt: "¿Cómo preguntar en la oficina de registro (Bürgeramt) por tu cita?",
        target: "Guten Tag, ich habe einen Termin für die Anmeldung meiner Wohnung.",
        notes: "Die Anmeldung (empadronamiento) es el trámite inicial obligatorio en Alemania."
      },
      {
        prompt: "¿Cómo preguntar en la universidad por la biblioteca central?",
        target: "Entschuldigung, wo befindet sich die Universitätsbibliothek?",
        notes: "'Sich befinden' es formal y preciso para ubicar edificios universitarios."
      },
      {
        prompt: "¿Cómo proponer salir a cenar con compañeros de proyecto?",
        target: "Haben Sie heute Abend Zeit für ein gemeinsames Abendessen?",
        notes: "'Gemeinsam' (juntos/en equipo) demuestra excelente cortesía profesional."
      }
    ],
    quizzes: [
      {
        question: "¿Cuál es la traducción correcta de 'Muchas gracias por su valiosa ayuda'?",
        options: [
          "Vielen Dank für Ihre wertvolle Hilfe!",
          "Bitte schön für alles Hilfe!",
          "Danke sehr mit deine Unterstützung!"
        ],
        correct: 0,
        explanation: "'Ihre wertvolle Hilfe' utiliza el pronombre de tratamiento formal en acusativo."
      },
      {
        question: "En una cafetería en Alemania te preguntan 'Mit Karte oder bar?' ¿Qué significa?",
        options: [
          "¿Con salsa o sin salsa?",
          "¿Con tarjeta de crédito/débito o en efectivo?",
          "¿Para consumir aquí o llevar?"
        ],
        correct: 1,
        explanation: "'Bar' significa dinero en efectivo, y 'Karte' pago con tarjeta de débito o débito bancario."
      }
    ]
  },
  eu: {
    name: "Euskera (Euskara A1)",
    code: "eu-ES",
    badge: "🇪🇸 Bilbao • A1",
    flashcards: [
      {
        prompt: "¿Cómo saludar y desear un buen día en Bilbao?",
        target: "Egun on! Zer moduz zaude?",
        notes: "'Egun on' (Buenos días). 'Zer moduz zaude?' (¿Cómo estás?)."
      },
      {
        prompt: "¿Cómo pedir un pintxo y un txakoli en el Casco Viejo de Bilbao?",
        target: "Mesedez, pintxo bat eta txakoli bat nahi ditut.",
        notes: "'Mesedez' (Por favor). 'Nahi ditut' (Quiero los elementos)."
      },
      {
        prompt: "¿Cómo expresar un agradecimiento sincero?",
        target: "Eskerrik asko bihotz-bihotzez!",
        notes: "'Bihotz-bihotzez' significa literalmente 'de todo corazón'."
      }
    ],
    quizzes: [
      {
        question: "¿Qué significa la despedida tradicional vasca 'Gero arte'?",
        options: [
          "Hasta luego",
          "Buenas noches",
          "Buen provecho"
        ],
        correct: 0,
        explanation: "'Gero arte' es la expresión habitual para decir 'Hasta luego'."
      }
    ]
  },
  pt: {
    name: "Portugués (A2)",
    code: "pt-PT",
    badge: "🇵🇹 Lisboa / Brasil • A2",
    flashcards: [
      {
        prompt: "¿Cómo saludar y pedir un café expreso en Portugal?",
        target: "Olá, bom dia! Uma bica, por favor.",
        notes: "En Lisboa un café expreso concentrado se llama cariñosamente 'uma bica'."
      },
      {
        prompt: "¿Cómo expresar satisfacción por el avance del día?",
        target: "Estou muito orgulhoso do nosso progresso hoje!",
        notes: "'Orgulhoso' (orgulloso), frase ideal de automotivación personal."
      }
    ],
    quizzes: [
      {
        question: "¿Cómo responder educadamente tras recibir un 'Muito obrigado'?",
        options: [
          "De nada, é um prazer!",
          "Até amanhã",
          "Sem dúvida"
        ],
        correct: 0,
        explanation: "'De nada, é um prazer' es la respuesta amable estándar."
      }
    ]
  },
  it: {
    name: "Italiano (A2)",
    code: "it-IT",
    badge: "🇮🇹 Italia • A2",
    flashcards: [
      {
        prompt: "¿Cómo saludar respetuosamente por la tarde al entrar a un establecimiento?",
        target: "Buonasera! Come sta?",
        notes: "'Buonasera' se utiliza formalmente a partir de la tarde."
      },
      {
        prompt: "¿Cómo solicitar la cuenta al terminar de cenar?",
        target: "Il conto, per favore.",
        notes: "'Il conto' es el término preciso para pedir el importe de la comida."
      }
    ],
    quizzes: [
      {
        question: "¿Qué expresa la frase 'Piacere di conoscerti'?",
        options: [
          "Encantado de conocerte",
          "Nos vemos mañana",
          "Buen viaje"
        ],
        correct: 0,
        explanation: "'Piacere di conoscerti' es la expresión de saludo afectivo al conocer a alguien."
      }
    ]
  }
};

let currentPracticeLang = "de";
let currentFlashcardIdx = 0;
let isFlashcardFlipped = false;
let currentQuizIdx = 0;
let langQuizStreak = 3;
let langJournalEntries = [];

function selectPracticeLanguage(langKey) {
  if (!languagePracticeData[langKey]) return;
  currentPracticeLang = langKey;
  currentFlashcardIdx = 0;
  isFlashcardFlipped = false;
  currentQuizIdx = 0;

  // Actualizar botones de idioma activos
  const btns = document.querySelectorAll(".lang-tab-btn");
  btns.forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-lang") === langKey);
  });

  renderLanguagePracticeTab();
}

function renderLanguagePracticeTab() {
  const langObj = languagePracticeData[currentPracticeLang];
  if (!langObj) return;

  // Render Flashcard
  const cardBadge = document.getElementById("flashcard-badge");
  const promptText = document.getElementById("flashcard-prompt-text");
  const targetText = document.getElementById("flashcard-target-text");
  const notesText = document.getElementById("flashcard-notes-text");
  const frontBox = document.getElementById("flashcard-front");
  const backBox = document.getElementById("flashcard-back");

  if (cardBadge) cardBadge.textContent = `${langObj.badge} • Tarjeta ${currentFlashcardIdx + 1} / ${langObj.flashcards.length}`;
  
  const currentCard = langObj.flashcards[currentFlashcardIdx % langObj.flashcards.length];
  if (currentCard) {
    if (promptText) promptText.textContent = currentCard.prompt;
    if (targetText) targetText.textContent = `"${currentCard.target}"`;
    if (notesText) notesText.textContent = currentCard.notes;
  }

  if (frontBox && backBox) {
    if (isFlashcardFlipped) {
      frontBox.style.display = "none";
      backBox.style.display = "block";
    } else {
      frontBox.style.display = "block";
      backBox.style.display = "none";
    }
  }

  // Render Quiz Question
  renderQuizQuestion();
}

function flipCurrentFlashcard() {
  isFlashcardFlipped = !isFlashcardFlipped;
  const frontBox = document.getElementById("flashcard-front");
  const backBox = document.getElementById("flashcard-back");
  if (frontBox && backBox) {
    frontBox.style.display = isFlashcardFlipped ? "none" : "block";
    backBox.style.display = isFlashcardFlipped ? "block" : "none";
  }
}

function speakCurrentFlashcard() {
  const langObj = languagePracticeData[currentPracticeLang];
  if (!langObj || !langObj.flashcards[currentFlashcardIdx]) return;

  const textToSpeak = langObj.flashcards[currentFlashcardIdx].target;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Detener audios anteriores
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langObj.code;
    utterance.rate = 0.9; // Velocidad de aprendizaje pausada
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no soporta síntesis de voz en audio.");
  }
}

function rateFlashcard(rating) {
  const langObj = languagePracticeData[currentPracticeLang];
  if (rating === 'easy') {
    window.awardXP(10, "Flashcard dominada", "exploracion");
  }
  
  isFlashcardFlipped = false;
  currentFlashcardIdx = (currentFlashcardIdx + 1) % langObj.flashcards.length;
  renderLanguagePracticeTab();
}

function renderQuizQuestion() {
  const langObj = languagePracticeData[currentPracticeLang];
  if (!langObj || !langObj.quizzes.length) return;

  const quizObj = langObj.quizzes[currentQuizIdx % langObj.quizzes.length];
  const qTitle = document.getElementById("quiz-question-title");
  const optsContainer = document.getElementById("quiz-options-container");
  const feedbackBox = document.getElementById("quiz-feedback-box");
  const scoreBadge = document.getElementById("quiz-score-badge");

  if (scoreBadge) scoreBadge.textContent = `Racha: ${langQuizStreak} ⚡`;
  if (qTitle) qTitle.innerHTML = `Pregunta (${langObj.name}): <strong>${quizObj.question}</strong>`;
  if (feedbackBox) feedbackBox.style.display = "none";

  if (optsContainer) {
    optsContainer.innerHTML = quizObj.options.map((opt, idx) => `
      <button class="btn-jaguar" style="text-align: left; padding: 10px 14px; background: rgba(15,39,27,0.8); border: 1.5px solid var(--neon-cyan); font-size: 0.88rem; font-weight: 600;" onclick="submitQuizAnswer(${idx})">
        ${['A', 'B', 'C'][idx]}) ${opt}
      </button>
    `).join("");
  }
}

function submitQuizAnswer(optIdx) {
  const langObj = languagePracticeData[currentPracticeLang];
  const quizObj = langObj.quizzes[currentQuizIdx % langObj.quizzes.length];
  const feedbackBox = document.getElementById("quiz-feedback-box");
  if (!quizObj || !feedbackBox) return;

  if (optIdx === quizObj.correct) {
    langQuizStreak += 1;
    window.awardXP(15, "Quiz de idioma acertado", "exploracion");

    feedbackBox.style.display = "block";
    feedbackBox.style.background = "rgba(52,211,153,0.2)";
    feedbackBox.style.border = "1px solid var(--neon-cyan)";
    feedbackBox.style.color = "var(--neon-cyan)";
    feedbackBox.innerHTML = `✨ ¡CORRECTO! (+15 XP) • ${quizObj.explanation}`;

    setTimeout(() => {
      currentQuizIdx = (currentQuizIdx + 1) % langObj.quizzes.length;
      renderQuizQuestion();
    }, 2200);
  } else {
    langQuizStreak = Math.max(0, langQuizStreak - 1);
    feedbackBox.style.display = "block";
    feedbackBox.style.background = "rgba(217,56,80,0.2)";
    feedbackBox.style.border = "1px solid var(--neon-pink)";
    feedbackBox.style.color = "#FFC0C8";
    feedbackBox.innerHTML = `❌ Casi. Revisa el concepto: ${quizObj.explanation}`;
  }
}

function saveLanguageJournalEntry() {
  const input = document.getElementById("lang-journal-input");
  const historyBox = document.getElementById("lang-journal-history");
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const dateStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const langObj = languagePracticeData[currentPracticeLang];

  langJournalEntries.unshift({
    lang: langObj.name,
    text: text,
    time: dateStr
  });

  input.value = "";

  window.awardXP(15, "Entrada en diario de idiomas", "exploracion");

  if (historyBox) {
    historyBox.innerHTML = langJournalEntries.map(e => `
      <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--neon-gold); padding: 8px 12px; border-radius: 4px; font-size: 0.85rem;">
        <div style="font-weight: 700; color: var(--neon-gold); font-size: 0.78rem;">${e.lang} • ${e.time}</div>
        <div style="color: #FFF; margin-top: 2px;">"${e.text}"</div>
      </div>
    `).join("");
  }
}

/* ==========================================================================
   DATEMASTER APEX LAUNCHER & REDIRECTION (LOCAL ON DEMAND)
   ========================================================================== */
function launchDateMasterApex(e) {
  if (e) e.preventDefault();

  const targetUrl = "http://127.0.0.1:8000";
  const protocolUrl = "datemaster://open";

  if (typeof showNotification === "function") {
    showNotification("🚀 Conectando con DateMaster Apex...");
  }

  // Disparar el ejecutable nativo de macOS (DateMaster Apex.app) de forma síncrona
  // para evitar bloqueos de popups o tokens de interacción del navegador
  try {
    window.location.href = protocolUrl;
  } catch (err) {
    console.warn("Error al invocar datemaster://", err);
  }

  // Sondeo para confirmar respuesta y notificar al usuario
  let attempts = 0;
  const pollInterval = setInterval(() => {
    attempts++;
    const pollCtrl = new AbortController();
    const pollTimeout = setTimeout(() => pollCtrl.abort(), 600);

    fetch(targetUrl, { mode: "no-cors", signal: pollCtrl.signal })
      .then(() => {
        clearTimeout(pollTimeout);
        clearInterval(pollInterval);
        if (typeof showNotification === "function") {
          showNotification("✨ ¡DateMaster Apex listo y respondiendo en 127.0.0.1:8000!");
        }
      })
      .catch(() => {
        clearTimeout(pollTimeout);
        if (attempts >= 15) {
          clearInterval(pollInterval);
        }
      });
  }, 1000);
}
window.launchDateMasterApex = launchDateMasterApex;

/* ==========================================================================
   CAMPANA TIBETANA ACÚSTICA (SÍNTESIS WEB AUDIO API - 432 Hz HARMÓNICO)
   ========================================================================== */
function playTibetanBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const fundamental = 432; // Tono sagrado de relajación somática
    const harmonics = [1, 2.76, 5.4, 8.93];
    const gains = [0.55, 0.22, 0.1, 0.04];

    harmonics.forEach((h, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(fundamental * h, ctx.currentTime);
      gain.gain.setValueAtTime(gains[i], ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.3);
    });
  } catch (e) {
    console.warn("Audio chime no soportado:", e);
  }
}
window.playTibetanBellChime = playTibetanBellChime;

/* ==========================================================================
   ESTUDIO DE MEDITACIÓN & CALMA SOMÁTICA (BANDERÍN ROSA)
   ========================================================================== */
let meditationTimerInterval = null;
let meditationBreathingInterval = null;
let meditationSecondsRemaining = 0;
let meditationTotalDurationSecs = 0;
let currentMeditationTech = "box";

function initMeditationStudio() {
  const ring = document.getElementById("meditation-ring");
  const phaseText = document.getElementById("meditation-phase-text");
  const timerText = document.getElementById("meditation-timer-display");
  if (!ring) return;

  // Restaurar estado inicial
  if (!meditationTimerInterval) {
    if (phaseText) phaseText.textContent = "Listo para iniciar";
    if (timerText) timerText.textContent = "15:00";
  }
}
window.initMeditationStudio = initMeditationStudio;

function startMeditationSession(minutes, technique) {
  const mins = parseInt(minutes) || 15;
  currentMeditationTech = technique || "box";
  meditationSecondsRemaining = mins * 60;
  meditationTotalDurationSecs = mins * 60;

  clearInterval(meditationTimerInterval);
  clearInterval(meditationBreathingInterval);

  playTibetanBellChime();
  if (typeof showNotification === "function") {
    showNotification(`🧘 Iniciando ${mins} min de Meditación (${technique.toUpperCase()})`);
  }

  const ring = document.getElementById("meditation-ring");
  const phaseText = document.getElementById("meditation-phase-text");
  const timerText = document.getElementById("meditation-timer-display");
  const startBtn = document.getElementById("btn-start-meditation");
  const stopBtn = document.getElementById("btn-stop-meditation");

  if (startBtn) startBtn.style.display = "none";
  if (stopBtn) stopBtn.style.display = "inline-flex";

  // Ciclo de respiración animada
  if (currentMeditationTech === "box") {
    let phaseStep = 0; // 0: Inhala, 1: Retén, 2: Exhala, 3: Vacío
    const phases = [
      { text: "INHALA (4s)", cls: "inhale" },
      { text: "RETÉN EL AIRE (4s)", cls: "hold" },
      { text: "EXHALA (4s)", cls: "exhale" },
      { text: "PULMONES VACÍOS (4s)", cls: "hold" }
    ];

    const runPhase = () => {
      const p = phases[phaseStep % 4];
      if (phaseText) phaseText.textContent = p.text;
      if (ring) {
        ring.className = "meditation-pulse-ring " + p.cls;
      }
      phaseStep++;
    };

    runPhase();
    meditationBreathingInterval = setInterval(runPhase, 4000);
  } else {
    if (phaseText) phaseText.textContent = "PRESENCIA & ATENCIÓN PLENA";
    if (ring) ring.className = "meditation-pulse-ring inhale";
  }

  // Contador regresivo
  const updateTimer = () => {
    if (meditationSecondsRemaining <= 0) {
      clearInterval(meditationTimerInterval);
      clearInterval(meditationBreathingInterval);
      playTibetanBellChime();
      if (phaseText) phaseText.textContent = "SESIÓN CONCLUIDA ✨";
      if (ring) ring.className = "meditation-pulse-ring";
      if (startBtn) startBtn.style.display = "inline-flex";
      if (stopBtn) stopBtn.style.display = "none";

      // Premiar XP
      if (window.CaballeroScoringEngine) {
        window.CaballeroScoringEngine.logMeditation(mins, currentMeditationTech === "box" ? "Box Breathing 4x4x4x4" : "Meditación Vipassana");
      }
      return;
    }

    meditationSecondsRemaining--;
    const m = Math.floor(meditationSecondsRemaining / 60);
    const s = meditationSecondsRemaining % 60;
    if (timerText) timerText.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  updateTimer();
  meditationTimerInterval = setInterval(updateTimer, 1000);
}
window.startMeditationSession = startMeditationSession;

function stopMeditationSession() {
  clearInterval(meditationTimerInterval);
  clearInterval(meditationBreathingInterval);
  meditationTimerInterval = null;

  const elapsedMins = Math.max(1, Math.round((meditationTotalDurationSecs - meditationSecondsRemaining) / 60));
  const ring = document.getElementById("meditation-ring");
  const phaseText = document.getElementById("meditation-phase-text");
  const startBtn = document.getElementById("btn-start-meditation");
  const stopBtn = document.getElementById("btn-stop-meditation");

  if (phaseText) phaseText.textContent = `Sesión pausada (${elapsedMins} min completados)`;
  if (ring) ring.className = "meditation-pulse-ring";
  if (startBtn) startBtn.style.display = "inline-flex";
  if (stopBtn) stopBtn.style.display = "none";

  if (elapsedMins >= 2 && window.CaballeroScoringEngine) {
    window.CaballeroScoringEngine.logMeditation(elapsedMins, "Práctica de Meditación Somática");
  }
}
window.stopMeditationSession = stopMeditationSession;

function submitCustomMeditation() {
  const durEl = document.getElementById("meditation-custom-mins");
  const techEl = document.getElementById("meditation-tech-select");
  const mins = durEl ? parseInt(durEl.value) : 15;
  const tech = techEl ? techEl.options[techEl.selectedIndex].text : "Box Breathing";

  if (window.CaballeroScoringEngine) {
    window.CaballeroScoringEngine.logMeditation(mins, tech);
    if (typeof showNotification === "function") {
      showNotification(`✨ Sesión registrada: ${mins} min de ${tech} (+XP al Banderín Rosa)`);
    }
  }
}
window.submitCustomMeditation = submitCustomMeditation;

/* ==========================================================================
   ESTUDIO DE MASAJES (PAREJA & AUTO-MASAJE MIOFASCIAL)
   ========================================================================== */
let activeMassageMode = "pareja";
let massageTimerInterval = null;
let massageSecondsRemaining = 0;

function initMassageStudio() {
  switchMassageMode("pareja");
}
window.initMassageStudio = initMassageStudio;

function switchMassageMode(mode) {
  activeMassageMode = mode;
  const parejaContainer = document.getElementById("massage-pareja-container");
  const autoContainer = document.getElementById("massage-automasaje-container");
  const btnPareja = document.getElementById("btn-mode-pareja");
  const btnAuto = document.getElementById("btn-mode-automasaje");

  if (mode === "pareja") {
    if (parejaContainer) parejaContainer.style.display = "grid";
    if (autoContainer) autoContainer.style.display = "none";
    if (btnPareja) {
      btnPareja.className = "btn-jaguar btn-gold-chrome";
      btnPareja.style.color = "#0E0905";
      btnPareja.style.fontWeight = "900";
    }
    if (btnAuto) {
      btnAuto.className = "btn-jaguar btn-secondary-dark";
      btnAuto.style.color = "";
      btnAuto.style.fontWeight = "700";
    }
  } else {
    if (parejaContainer) parejaContainer.style.display = "none";
    if (autoContainer) autoContainer.style.display = "grid";
    if (btnAuto) {
      btnAuto.className = "btn-jaguar btn-gold-chrome";
      btnAuto.style.color = "#0E0905";
      btnAuto.style.fontWeight = "900";
    }
    if (btnPareja) {
      btnPareja.className = "btn-jaguar btn-secondary-dark";
      btnPareja.style.color = "";
      btnPareja.style.fontWeight = "700";
    }
  }
}
window.switchMassageMode = switchMassageMode;

function startMassageRoutineTimer(mins, label) {
  const duration = parseInt(mins) || 20;
  massageSecondsRemaining = duration * 60;
  clearInterval(massageTimerInterval);

  playTibetanBellChime();
  if (typeof showNotification === "function") {
    showNotification(`💆 Temporizador de Masaje iniciado: ${label} (${duration} min)`);
  }

  const timerEl = document.getElementById("massage-active-timer-display");
  const labelEl = document.getElementById("massage-active-routine-label");
  const barEl = document.getElementById("massage-timer-bar");
  if (barEl) barEl.style.display = "flex";
  if (labelEl) labelEl.textContent = label;

  massageTimerInterval = setInterval(() => {
    if (massageSecondsRemaining <= 0) {
      clearInterval(massageTimerInterval);
      playTibetanBellChime();
      if (labelEl) labelEl.textContent = `¡Rutina completada! (${label})`;
      if (window.CaballeroScoringEngine) {
        window.CaballeroScoringEngine.logMassage(label, duration);
      }
      return;
    }
    massageSecondsRemaining--;
    const m = Math.floor(massageSecondsRemaining / 60);
    const s = massageSecondsRemaining % 60;
    if (timerEl) timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}
window.startMassageRoutineTimer = startMassageRoutineTimer;

function submitQuickMassage(label, mins) {
  if (window.CaballeroScoringEngine) {
    window.CaballeroScoringEngine.logMassage(label, mins);
    if (typeof showNotification === "function") {
      showNotification(`✨ Masaje registrado: ${label} (+XP en Vitalidad)`);
    }
  }
}
window.submitQuickMassage = submitQuickMassage;

/* ==========================================================================
   REGISTRO DE LECTURA ESTOICA (BANDERÍN CAFÉ)
   ========================================================================== */
function submitReadingLog() {
  const bookSelect = document.getElementById("reading-book-select");
  const customBook = document.getElementById("reading-custom-book");
  const pagesInput = document.getElementById("reading-pages-input");
  const minsInput = document.getElementById("reading-mins-input");

  let title = bookSelect ? bookSelect.value : "Códice Estoico";
  if (title === "custom" && customBook && customBook.value.trim()) {
    title = customBook.value.trim();
  } else if (bookSelect && bookSelect.selectedIndex >= 0) {
    title = bookSelect.options[bookSelect.selectedIndex].text;
  }

  const pages = pagesInput ? parseInt(pagesInput.value) || 15 : 15;
  const mins = minsInput ? parseInt(minsInput.value) || 25 : 25;

  if (window.CaballeroScoringEngine) {
    const res = window.CaballeroScoringEngine.logReading(title, pages, mins);
    if (typeof showNotification === "function") {
      showNotification(`📖 Lectura registrada: ${pages} págs / ${mins} min de "${title}" (+${res.totalXP} XP al Banderín Café)`);
    }
    // Limpiar campos
    if (pagesInput) pagesInput.value = "";
    if (minsInput) minsInput.value = "";
  }
}
window.submitReadingLog = submitReadingLog;

/* ==========================================================================
   SISTEMA MAESTRO DE PROGRESIÓN, MISIONES & CABALLERÍA JAGUAR (PITCH DECK)
   ========================================================================== */
let currentPitchSlide = 0;
const TOTAL_PITCH_SLIDES = 5;

function openSistemaMaestroModal() {
  const modal = document.getElementById("sistema-maestro-modal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    showPitchSlide(0);
  }
}
window.openSistemaMaestroModal = openSistemaMaestroModal;

function closeSistemaMaestroModal() {
  const modal = document.getElementById("sistema-maestro-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}
window.closeSistemaMaestroModal = closeSistemaMaestroModal;

function showPitchSlide(index) {
  currentPitchSlide = Math.max(0, Math.min(TOTAL_PITCH_SLIDES - 1, index));
  for (let i = 0; i < TOTAL_PITCH_SLIDES; i++) {
    // Diapositivas del modal
    const modalSlide = document.getElementById(`modal-pitch-slide-${i}`);
    if (modalSlide) modalSlide.style.display = (i === currentPitchSlide) ? "block" : "none";

    // Diapositivas de la pestaña (tab-progresion)
    const tabSlide = document.getElementById(`pitch-slide-${i}`);
    if (tabSlide) tabSlide.style.display = (i === currentPitchSlide) ? "block" : "none";

    // Puntos indicadores del modal
    const modalDot = document.getElementById(`modal-pitch-dot-${i}`);
    if (modalDot) {
      modalDot.style.background = (i === currentPitchSlide) ? "#9B2335" : "rgba(197,154,40,0.3)";
      modalDot.style.transform = (i === currentPitchSlide) ? "scale(1.3)" : "scale(1)";
      modalDot.style.boxShadow = (i === currentPitchSlide) ? "0 0 10px rgba(197,154,40,0.8)" : "none";
    }

    // Puntos indicadores de la pestaña
    const tabDot = document.getElementById(`pitch-dot-${i}`);
    if (tabDot) {
      tabDot.style.background = (i === currentPitchSlide) ? "#9B2335" : "rgba(197,154,40,0.3)";
      tabDot.style.transform = (i === currentPitchSlide) ? "scale(1.3)" : "scale(1)";
    }
  }

  // Contador textual del modal
  const modalCounter = document.getElementById("modal-pitch-counter");
  if (modalCounter) {
    modalCounter.textContent = `DIAPOSITIVA ${currentPitchSlide + 1} DE ${TOTAL_PITCH_SLIDES}`;
  }

  // Botones del modal
  const modalPrevBtn = document.getElementById("modal-pitch-prev-btn");
  const modalNextBtn = document.getElementById("modal-pitch-next-btn");
  if (modalPrevBtn) modalPrevBtn.disabled = (currentPitchSlide === 0);
  if (modalNextBtn) modalNextBtn.disabled = (currentPitchSlide === TOTAL_PITCH_SLIDES - 1);

  // Botones de la pestaña
  const tabPrevBtn = document.getElementById("pitch-prev-btn");
  const tabNextBtn = document.getElementById("pitch-next-btn");
  if (tabPrevBtn) tabPrevBtn.disabled = (currentPitchSlide === 0);
  if (tabNextBtn) tabNextBtn.disabled = (currentPitchSlide === TOTAL_PITCH_SLIDES - 1);
}
window.showPitchSlide = showPitchSlide;

function nextPitchSlide() {
  showPitchSlide(currentPitchSlide + 1);
}
window.nextPitchSlide = nextPitchSlide;

function prevPitchSlide() {
  showPitchSlide(currentPitchSlide - 1);
}
window.prevPitchSlide = prevPitchSlide;

function renderSistemaMaestroPitch() {
  // Asegura que las diapositivas estén renderizadas y listas
  showPitchSlide(0);
}
window.renderSistemaMaestroPitch = renderSistemaMaestroPitch;

// Navegación con teclado para Pitch y Ritos
document.addEventListener("keydown", (e) => {
  const pitchModal = document.getElementById("sistema-maestro-modal");
  if (pitchModal && (pitchModal.classList.contains("active") || pitchModal.style.display === "flex")) {
    if (e.key === "ArrowRight") {
      nextPitchSlide();
    } else if (e.key === "ArrowLeft") {
      prevPitchSlide();
    } else if (e.key === "Escape") {
      closeSistemaMaestroModal();
    }
  }
  const ritosModal = document.getElementById("ritos-sacred-modal");
  if (ritosModal && (ritosModal.classList.contains("active") || ritosModal.style.display === "flex")) {
    if (e.key === "Escape") {
      closeRitosModal();
    }
  }
  const construccionModal = document.getElementById("construccion-apex-modal");
  if (construccionModal && (construccionModal.classList.contains("active") || construccionModal.style.display === "flex")) {
    if (e.key === "Escape") {
      if (window.imperivmEngine && typeof window.imperivmEngine.closeConstruccionModal === "function") {
        window.imperivmEngine.closeConstruccionModal();
      }
    }
  }
  const outfitModal = document.getElementById("outfit-lightbox-modal");
  if (outfitModal && (outfitModal.classList.contains("active") || outfitModal.style.display === "flex")) {
    if (e.key === "Escape") {
      if (typeof closeOutfitLightbox === "function") closeOutfitLightbox();
    }
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runMainAppInit);
} else {
  runMainAppInit();
}
