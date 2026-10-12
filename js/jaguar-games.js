/* ==========================================================================
   JAGUAR ROSA - ARCADE & MOTOR DE MINIJUEGOS DE AUTODOMINIO ESTOICO
   Laberinto de la Voluntad, Duelos Filosoficos, Árbol de Habilidades RPG
   ========================================================================== */

const GAMES_STORAGE_KEY = "JAGUAR_ROSA_GAMES_V1";

let gamesState = {
  skillPoints: 5,
  skills: {
    fuerza: 1,      // 🛡️ Rama del Guerrero (Ejercicios & Calistenia)
    sabiduria: 1,   // 🧠 Rama del Sabio (Lectura Estoica)
    vitalidad: 1,  // 🌿 Rama del Chamán (Ayurveda & Salud)
    proyectos: 1    // 🚀 Rama del Imperator (6 Proyectos & Finanzas)
  },
  unlockedAvatars: ["renaissance-default"],
  duelWins: 0,
  mazeHighScore: 0
};

function loadGamesState() {
  const saved = localStorage.getItem(GAMES_STORAGE_KEY);
  if (saved) {
    try {
      gamesState = Object.assign({}, gamesState, JSON.parse(saved));
    } catch (e) { console.error("Error al cargar estado de juegos:", e); }
  }
}

function saveGamesState() {
  localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(gamesState));
}

// --- RENDERIZADO PRINCIPAL DE LA ARCADE ---
function renderGamesArcade() {
  const container = document.getElementById("arcade-main-container");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- HERO BANNER DE LA ARCADE DE JUEGOS -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 260px; border: 2px solid var(--border-rose-gold); box-shadow: var(--shadow-rose); background: var(--bg-dark-card);">
        <img src="assets/jaguar_logo_renaissance.jpg" alt="Arcade Jaguar" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.35) blur(1px);" class="animated-jaguar-bg">
        <div style="position: absolute; inset: 0; padding: 32px; background: linear-gradient(135deg, rgba(11,10,13,0.94) 0%, rgba(31,26,36,0.65) 60%, transparent 100%); display: flex; flex-direction: column; justify-content: center;">
          <span class="badge-tag badge-pink" style="align-self: flex-start; margin-bottom: 8px;">🎮 Zona de Diversión & Autodominio</span>
          <h2 class="title-rose-neon" style="font-size: 2.3rem; font-family: 'Cinzel', serif; margin-bottom: 8px;">Arcade del Jaguar Renacentista</h2>
          <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 750px; line-height: 1.5;">
            Fortalece tu voluntad jugando: vence las distracciones en el Laberinto, derrota la ansiedad en Duelos Estoicos y desbloquea talentos en tu Árbol de Habilidades RPG.
          </p>
        </div>
      </div>

      <!-- SECCIÓN 1: ÁRBOL DE HABILIDADES RPG -->
      <div class="jaguar-card" style="border-color: var(--neon-gold); background: linear-gradient(135deg, rgba(229, 193, 88, 0.05) 0%, var(--bg-dark-card) 100%);">
        <div class="card-title-bar">
          <h3 class="card-title">🌳 Árbol de Habilidades RPG de Soberanía</h3>
          <span class="badge-tag badge-gold">Puntos Disponibles: <strong id="skill-points-count">${gamesState.skillPoints}</strong> SP</span>
        </div>

        <div class="grid-2 mb-14" style="margin-top: 14px;">
          
          <div class="jaguar-card" style="background: rgba(0,0,0,0.3); border-color: var(--border-neon-pink);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 1.1rem; color: var(--neon-pink-bright); font-weight: 800;">🛡️ Rama del Guerrero</h4>
              <span class="badge-tag badge-pink">Niv. ${gamesState.skills.fuerza}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Mejora tu resistencia física, fuerza en calistenia y disciplina de 0 Porno.</p>
            <button class="btn-jaguar btn-sm btn-primary-pink" onclick="upgradeSkill('fuerza')">Subir Guerrero (+1 SP)</button>
          </div>

          <div class="jaguar-card" style="background: rgba(0,0,0,0.3); border-color: var(--border-neon-cyan);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 1.1rem; color: var(--neon-cyan); font-weight: 800;">🧠 Rama del Sabio</h4>
              <span class="badge-tag badge-cyan">Niv. ${gamesState.skills.sabiduria}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Aumenta la claridad mental con lecturas de Marco Aurelio y enfoque estoico.</p>
            <button class="btn-jaguar btn-sm btn-electric-cyan" onclick="upgradeSkill('sabiduria')">Subir Sabio (+1 SP)</button>
          </div>

          <div class="jaguar-card" style="background: rgba(0,0,0,0.3); border-color: var(--emerald-bright);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 1.1rem; color: var(--emerald-bright); font-weight: 800;">🌿 Rama del Chamán</h4>
              <span class="badge-tag badge-emerald">Niv. ${gamesState.skills.vitalidad}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Optimiza tu energía vital con secretos de Ayurveda, sueño circadiano y nutrición.</p>
            <button class="btn-jaguar btn-sm btn-emerald-neon" onclick="upgradeSkill('vitalidad')">Subir Chamán (+1 SP)</button>
          </div>

          <div class="jaguar-card" style="background: rgba(0,0,0,0.3); border-color: var(--neon-gold);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 1.1rem; color: var(--neon-gold); font-weight: 800;">🚀 Rama del Imperator</h4>
              <span class="badge-tag badge-gold">Niv. ${gamesState.skills.proyectos}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Acelera tus 6 proyectos de vida y expande tu fondo de reserva económico.</p>
            <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #000; font-weight: 800;" onclick="upgradeSkill('proyectos')">Subir Imperator (+1 SP)</button>
          </div>

        </div>
      </div>

      <!-- SECCIÓN 2: MINIJUEGO DUELO ESTOICO -->
      <div class="grid-2">
        
        <div class="jaguar-card card-highlight">
          <div class="card-title-bar">
            <h3 class="card-title">⚔️ Duelo Estoico: Batalla contra la Ansiedad</h3>
            <span class="badge-tag badge-pink">Victorias: ${gamesState.duelWins}</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
            Enfréntate al <em>Monstruo de la Procrastinación</em> usando cartas de filosofía y dicotomía del control.
          </p>

          <div id="duel-game-box" style="padding: 16px; background: rgba(0,0,0,0.4); border-radius: var(--radius-md); border: 1px dashed var(--border-neon-pink); min-height: 180px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">👹</div>
            <h4 style="font-size: 1.1rem; color: var(--neon-pink-bright); margin-bottom: 6px;">¡Apareció la Sombra del Deseo Impulsivo!</h4>
            <p style="font-size: 0.82rem; color: var(--text-dim); margin-bottom: 14px;">"No tengo ganas de entrenar ni leer hoy, mejor miremos redes..."</p>
            <button class="btn-jaguar btn-primary-pink" onclick="startStoicDuel()">⚔️ Luchar con Carta Estoica</button>
          </div>
        </div>

        <!-- SECCIÓN 3: MINIJUEGO LABERINTO DE LA VOLUNTAD -->
        <div class="jaguar-card card-highlight">
          <div class="card-title-bar">
            <h3 class="card-title">🎮 El Laberinto de la Voluntad</h3>
            <span class="badge-tag badge-cyan">Récord: ${gamesState.mazeHighScore} pts</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
            Esquiva distracciones dopaminérgicas y atrapa las gemas de hábito antes de que expire el tiempo.
          </p>

          <div id="maze-game-box" style="padding: 16px; background: rgba(0,0,0,0.4); border-radius: var(--radius-md); border: 1px dashed var(--border-neon-cyan); min-height: 180px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🐆⚡</div>
            <h4 style="font-size: 1.1rem; color: var(--neon-cyan); margin-bottom: 6px;">Desafío de Enfoque Rápido</h4>
            <p style="font-size: 0.82rem; color: var(--text-dim); margin-bottom: 14px;">Mueve al Jaguar para juntar 5 orbes de meditación.</p>
            <button class="btn-jaguar btn-electric-cyan" onclick="playMazeGame()">🕹️ Iniciar Mini-Laberinto</button>
          </div>
        </div>

      </div>

      <!-- SECCIÓN 4: TYCOON DE TERRITORIO Y FINANZAS -->
      <div class="jaguar-card" style="border-color: var(--emerald-bright); background: linear-gradient(135deg, rgba(52, 211, 153, 0.08) 0%, var(--bg-dark-card) 100%);">
        <div class="card-title-bar">
          <h3 class="card-title">🌱 Tycoon Predial: Urrutia Agrotech & ReWild</h3>
          <span class="badge-tag badge-emerald">Mapa de Desarrollo</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
          Tus ahorros reales y avances en proyectos desbloquean infraestructura ecológica virtual en tu mapa predial:
        </p>

        <div class="grid-3">
          <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--emerald-bright); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🌲</div>
            <strong style="color: var(--emerald-bright); font-size: 0.92rem;">Parche de Bosque ReWild</strong>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">Desbloqueado al ahorrar > 500€</div>
          </div>

          <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-cyan); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">📡</div>
            <strong style="color: var(--neon-cyan); font-size: 0.92rem;">Nodo Satelital Agrotech</strong>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">Desbloqueado con 3 hitos completados</div>
          </div>

          <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-gold); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🌊</div>
            <strong style="color: var(--neon-gold); font-size: 0.92rem;">Estación Lauwersmeer</strong>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">Desbloqueado al nivel 3 de Imperator</div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// --- MEJORAR HABILIDAD EN EL ÁRBOL ---
function upgradeSkill(skillKey) {
  if (gamesState.skillPoints <= 0) {
    showNotification("⚠️ No tienes puntos de habilidad (SP) disponibles. Completa tus hábitos diarios para ganar SP.");
    return;
  }

  gamesState.skillPoints--;
  gamesState.skills[skillKey] = (gamesState.skills[skillKey] || 1) + 1;
  saveGamesState();
  renderGamesArcade();
  playSoundEffect("levelup");
  showNotification(`¡Habilidad subida con éxito! ${skillKey.toUpperCase()} ahora es Nivel ${gamesState.skills[skillKey]}.`);
}

// --- MINIJUEGO 1: DUELO ESTOICO ---
function startStoicDuel() {
  const box = document.getElementById("duel-game-box");
  if (!box) return;

  const duelQuestions = [
    {
      impulse: "Sientes el impulso irresistible de abrir redes sociales o contenido inapropiado.",
      options: [
        { text: "🛡️ Aplicar Dicotomía de Marco Aurelio: Las tentaciones externas no controlan mi voluntad.", correct: true },
        { text: "🙈 Ceder 'solo por 5 minutos'...", correct: false }
      ]
    },
    {
      impulse: "Estás cansado y quieres posponer el ejercicio y la lectura para mañana.",
      options: [
        { text: "⚡ Principio de Séneca: El sufrimiento de la disciplina es menor al pesar del arrepentimiento.", correct: true },
        { text: "🛋️ Quedarse viendo videos sin rumbo...", correct: false }
      ]
    }
  ];

  const q = duelQuestions[Math.floor(Math.random() * duelQuestions.length)];

  box.innerHTML = `
    <div style="font-weight: 800; color: var(--neon-gold); margin-bottom: 8px;">⚔️ DUELO TÁCTICO</div>
    <p style="font-size: 0.9rem; color: #FFF; margin-bottom: 12px; font-weight: 600;">${q.impulse}</p>
    <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
      ${q.options.map((opt, idx) => `
        <button class="btn-jaguar btn-sm ${opt.correct ? 'btn-emerald-neon' : 'btn-secondary-dark'}" onclick="resolveStoicDuel(${opt.correct})">
          ${opt.text}
        </button>
      `).join("")}
    </div>
  `;
}

function resolveStoicDuel(isCorrect) {
  const box = document.getElementById("duel-game-box");
  if (!box) return;

  if (isCorrect) {
    gamesState.duelWins++;
    gamesState.skillPoints += 1;
    saveGamesState();
    playSoundEffect("levelup");

    box.innerHTML = `
      <div style="font-size: 2.2rem; color: var(--emerald-bright); margin-bottom: 6px;">💥 ¡VICTORIA CRÍTICA!</div>
      <p style="font-size: 0.88rem; color: #FFF; margin-bottom: 10px;">Derrotaste la tentación con autodominio estoico. ¡Ganaste **+1 SP** y **+100 XP**!</p>
      <button class="btn-jaguar btn-primary-pink" onclick="renderGamesArcade()">Continuar Arcade</button>
    `;
  } else {
    box.innerHTML = `
      <div style="font-size: 2.2rem; color: var(--neon-pink-bright); margin-bottom: 6px;">⚠️ LA SOMBRA GANÓ TERRENO</div>
      <p style="font-size: 0.88rem; color: var(--text-dim); margin-bottom: 10px;">No te desanimes. Respira profundo y retoma la racha.</p>
      <button class="btn-jaguar btn-secondary-dark" onclick="renderGamesArcade()">Reintentar Duelo</button>
    `;
  }
}

// --- MINIJUEGO 2: MINI LABERINTO ---
function playMazeGame() {
  const box = document.getElementById("maze-game-box");
  if (!box) return;

  playSoundEffect("success");
  let score = Math.floor(Math.random() * 50) + 50;
  if (score > gamesState.mazeHighScore) gamesState.mazeHighScore = score;
  gamesState.skillPoints += 1;
  saveGamesState();

  box.innerHTML = `
    <div style="font-size: 2rem; color: var(--neon-cyan); margin-bottom: 6px;">⚡ ¡LABERINTO SUPERADO!</div>
    <p style="font-size: 0.88rem; color: #FFF; margin-bottom: 10px;">Recolectaste los orbes de meditación. Puntuación: **${score} pts**. ¡+1 SP ganado!</p>
    <button class="btn-jaguar btn-electric-cyan" onclick="renderGamesArcade()">Jugar de Nuevo</button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  loadGamesState();
});
