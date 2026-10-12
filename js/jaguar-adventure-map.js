/* ==========================================================================
   JAGUAR ROSA - MOTOR DE MAPA DE AVENTURA 80s (DONKEY KONG STYLE)
   Nivel 1: Nieve (Oldenburg -> Hannover), Nivel 2: Bilbao, Nivel 3: Selva, Nivel 4: Desierto
   ========================================================================== */

const MAP_STORAGE_KEY = "JAGUAR_ROSA_MAP_DATA_V2";

let mapState = {
  currentBiome: "hannover", // 'hannover' (snow), 'bilbao' (coast), 'selva' (jungle), 'desierto' (desert)
  characterStep: 1,         // 1 to 5
  hannoverTasks: [
    { id: "h1", title: "📦 Mudarme a Hannover con mi novia", category: "vida", mandatory: true, completed: false },
    { id: "h2", title: "🏋️‍♂️ Encontrar Gym de Muay Thai / Kickboxing", category: "deporte", mandatory: true, completed: false },
    { id: "h3", title: "💼 Encontrar Trabajo en Alemania / Europa", category: "proyectos", mandatory: true, completed: false },
    { id: "h4", title: "🎓 Defender Tesis con Éxito", category: "academia", mandatory: true, completed: false },
    { id: "h5", title: "🛂 Gestionar Visa Española para mudanza", category: "tramites", mandatory: true, completed: false }
  ],
  practiceCards: [
    { id: "c1", title: "🧘‍♂️ Lección Chamánica: Respiración Circadiana", category: "ayurveda", offline: true, desc: "Momento fuera de pantalla: 10 min de respiración al sol de la mañana.", completed: false },
    { id: "c2", title: "🎵 Práctica de Trompeta / Saxofón / Armónica", category: "musica", offline: true, desc: "Momento fuera de pantalla: Ensaya 15 min de embocadura, escalas o improvisación de jazz.", completed: false },
    { id: "c3", title: "🏛️ Lección Estoica: Dicotomía del Control", category: "estoicismo", offline: false, desc: "Acepta lo que no puedes controlar y actúa con firmeza.", completed: true },
    { id: "c4", title: "🏃‍♂️ Calistenia & Running de Resistencia", category: "deporte", offline: true, desc: "Momento fuera de pantalla: Sal a entrenar 30 min al aire libre.", completed: false }
  ]
};

function loadMapState() {
  const saved = localStorage.getItem(MAP_STORAGE_KEY);
  if (saved) {
    try {
      mapState = Object.assign({}, mapState, JSON.parse(saved));
    } catch (e) { console.error("Error al cargar estado del mapa:", e); }
  }
}

function saveMapState() {
  localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(mapState));
}

// --- RENDERIZADO DEL MAPA DE AVENTURA 80s ---
function renderAdventureMap() {
  const container = document.getElementById("arcade-main-container");
  if (!container) return;

  const hannoverDoneCount = mapState.hannoverTasks.filter(t => t.completed).length;
  const isBilbaoUnlocked = hannoverDoneCount >= 5;

  let tasksHTML = mapState.hannoverTasks.map(t => `
    <div class="task-item ${t.completed ? 'completed' : ''}" style="background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 8px; border: 1px solid var(--border-neon-pink);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="custom-checkbox ${t.completed ? 'checked' : ''}" onclick="toggleHannoverTask('${t.id}')">
          ${t.completed ? '✓' : ''}
        </div>
        <div>
          <span style="font-weight: 700; color: #FFF; font-size: 0.92rem;">${t.title}</span>
          <div style="font-size: 0.72rem; color: var(--neon-gold);">⚠️ Misión Obligatoria para Bilbao</div>
        </div>
      </div>
    </div>
  `).join("");

  let cardsHTML = mapState.practiceCards.map(c => `
    <div class="jaguar-card" style="background: rgba(0,0,0,0.4); border-color: ${c.offline ? 'var(--neon-cyan)' : 'var(--border-rose-gold)'};">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span class="badge-tag ${c.offline ? 'badge-cyan' : 'badge-gold'}">${c.offline ? '🌿 PRACTICAR (Offline)' : '📖 Lección Teórica'}</span>
        <div class="custom-checkbox ${c.completed ? 'checked' : ''}" onclick="togglePracticeCard('${c.id}')">
          ${c.completed ? '✓' : ''}
        </div>
      </div>
      <h4 style="font-size: 1rem; color: #FFF; font-weight: 700; margin-bottom: 4px;">${c.title}</h4>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${c.desc}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- HERO BANNER DEL MAPA 80s (ESTILO DONKEY KONG COUNTRY) -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 320px; border: 2px solid var(--neon-gold); box-shadow: var(--shadow-rose); background: #000;">
        <img src="assets/jaguar_world_map_80s.jpg" alt="Mapa 80s Arcade Odyssey" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) contrast(1.15);">
        
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(to top, rgba(11,10,13,0.95) 0%, transparent 100%); display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="badge-tag badge-gold" style="font-size: 0.82rem;">🕹️ Arcade Odyssey - Nivel 1: Hannover (Nieve)</span>
            <h2 class="title-rose-neon" style="font-size: 2rem; font-family: 'Cinzel', serif; margin-top: 4px;">Ruta a Bilbao, Selva & Desierto</h2>
          </div>

          <div style="display: flex; gap: 10px;">
            <span class="badge-tag badge-pink">Paso Actual: ${hannoverDoneCount + 1} / 5</span>
            <span class="badge-tag ${isBilbaoUnlocked ? 'badge-emerald' : 'badge-gold'}">
              ${isBilbaoUnlocked ? '🔓 Bilbao Desbloqueado!' : '🔒 Bilbao Bloqueado'}
            </span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 1: MISIONES OBLIGATORIAS DE HANNOVER -->
      <div class="jaguar-card" style="border-color: var(--neon-pink); background: linear-gradient(135deg, rgba(255, 0, 127, 0.06) 0%, var(--bg-dark-card) 100%);">
        <div class="card-title-bar">
          <h3 class="card-title">❄️ Nivel 1 (Oldenburg ➔ Hannover): 5 Misiones Obligatorias</h3>
          <span class="badge-tag badge-pink">Progreso: ${hannoverDoneCount} / 5 Pasos</span>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
          Debes completar estos 5 pasos indispensables para avanzar tu personaje hasta el bioma de <strong>Bilbao (Costa & Montaña)</strong>:
        </p>

        <div style="margin-bottom: 16px;">
          ${tasksHTML}
        </div>
      </div>

      <!-- SECCIÓN 2: CARTAS DE LECCIONES & PRÁCTICA OFFLINE -->
      <div class="jaguar-card" style="border-color: var(--neon-cyan);">
        <div class="card-title-bar">
          <h3 class="card-title">🎴 Cartas de Lección & Práctica Fuera de Pantalla</h3>
          <span class="badge-tag badge-cyan">Momentos Offline</span>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
          Ejecuta estos pasos prácticos lejos de la computadora para fortalecer tu mente, música y deporte:
        </p>

        <div class="grid-2">
          ${cardsHTML}
        </div>
      </div>

      <!-- VISTA DE NIVELES DEL MUNDO -->
      <div class="jaguar-card">
        <div class="card-title-bar">
          <h3 class="card-title">🗺️ Biomas del Mundo Jaguar</h3>
        </div>

        <div class="grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
          <div style="padding: 14px; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 2px solid var(--neon-cyan); text-align: center;">
            <div style="font-size: 1.8rem;">❄️</div>
            <strong style="color: var(--neon-cyan); font-size: 0.9rem;">1. Hannover (Nieve)</strong>
            <div style="font-size: 0.72rem; color: var(--emerald-bright); margin-top: 4px;">Etapa Actual</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--text-dim); text-align: center; opacity: ${isBilbaoUnlocked ? '1' : '0.6'};">
            <div style="font-size: 1.8rem;">🌊</div>
            <strong style="color: var(--neon-gold); font-size: 0.9rem;">2. Bilbao (Costa)</strong>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">${isBilbaoUnlocked ? 'Disponible' : 'Requiere 5/5 Misiones'}</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--text-dim); text-align: center; opacity: 0.5;">
            <div style="font-size: 1.8rem;">🌴</div>
            <strong style="color: var(--emerald-bright); font-size: 0.9rem;">3. Selva ReWild</strong>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">Siguiente Etapa</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--text-dim); text-align: center; opacity: 0.5;">
            <div style="font-size: 1.8rem;">🏜️</div>
            <strong style="color: var(--rose-gold); font-size: 0.9rem;">4. Desierto (Vacaciones)</strong>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">Modo Extra</div>
          </div>
        </div>
      </div>

    </div>
  `;
}

function toggleHannoverTask(id) {
  const t = mapState.hannoverTasks.find(x => x.id === id);
  if (t) {
    t.completed = !t.completed;
    saveMapState();
    renderAdventureMap();
    if (t.completed) {
      playSoundEffect("levelup");
      showNotification(`¡Misión cumplida: ${t.title}! Avanzas un paso en Hannover.`);
    }
  }
}

function togglePracticeCard(id) {
  const c = mapState.practiceCards.find(x => x.id === id);
  if (c) {
    c.completed = !c.completed;
    saveMapState();
    renderAdventureMap();
    if (c.completed) {
      playSoundEffect("success");
      showNotification(`¡Lección práctica completada: ${c.title}!`);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMapState();
});
