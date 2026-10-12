/* ==========================================================================
   JAGUAR ROSA - COMBAT & EXTREME SPORTS HUB
   Muay Thai & Kickboxing Europa (Gimnasios >4.0★), Colección de Sparrings, Triatlón y Maratón
   ========================================================================== */

const COMBAT_STORAGE_KEY = "JAGUAR_ROSA_COMBAT_HUB_V1";

let combatState = {
  gyms: [
    { id: "g1", name: "Kickboxen Hannover / Kenpokan", city: "Hannover", country: "Alemania", rating: 4.8, type: "Kickboxing & Muay Thai", desc: "Instalaciones de alto nivel, excelente grupo de sparring y sacos pesados." },
    { id: "g2", name: "Kanku Club Bilbao", city: "Bilbao", country: "España", rating: 4.7, type: "Muay Thai & K1", desc: "Gimnasio legendario de deportes de contacto en el País Vasco." },
    { id: "g3", name: "Vos Gym Amsterdam", city: "Ámsterdam", country: "Países Bajos", rating: 4.9, type: "Dutch Kickboxing", desc: "Cuna del kickboxing estilo holandés, alta intensidad técnica." },
    { id: "g4", name: "Ringside Gym Berlin", city: "Berlín", country: "Alemania", rating: 4.6, type: "Muay Thai", desc: "Entrenadores de Tailandia y clases avanzadas de clinch." }
  ],
  sparringPartners: [
    { id: "s1", name: "Alexander K.", gym: "Kenpokan Hannover", date: "2026-08-10", discipline: "Kickboxing", notes: "Buen jab de izquierda, fuerte combinación de low kicks." }
  ],
  triathlonMetrics: {
    targetEvent: "Triatlón Olímpico / Medio Ironman 2027",
    weeklySwimKm: 4.5,
    weeklyBikeKm: 85,
    weeklyRunKm: 28
  },
  marathonMetrics: {
    targetMarathon: "Maratón de Berlín / Hamburgo 2027",
    targetPace: "4:45 min/km",
    weeklyKm: 42,
    longestRun: 24
  },
  climbingMetrics: {
    targetBoulder: "V6 (7A) en Muro / Panel",
    targetSport: "7a en Roca Natural",
    hangboardEdge: "20 mm (Semi-arqueo estricto)",
    sessions: [
      { id: "c1", date: "2026-09-03", type: "Muro Indoor (Boulder)", location: "Boulderwelt Hannover", grade: "V5", notes: "Bloques desplomados con talonajes limpios y suspensión controlada." },
      { id: "c2", date: "2026-08-27", type: "Outdoor Roca Natural", location: "Frankenjura", grade: "6b+", notes: "Placa vertical de caliza con bidedos y adherencia en micro-apoyos." }
    ]
  }
};

function loadCombatState() {
  const saved = localStorage.getItem(COMBAT_STORAGE_KEY);
  if (saved) {
    try {
      combatState = Object.assign({}, combatState, JSON.parse(saved));
    } catch (e) { console.error("Error al cargar estado de combate:", e); }
  }
}

function saveCombatState() {
  localStorage.setItem(COMBAT_STORAGE_KEY, JSON.stringify(combatState));
}

// --- RENDERIZADO DEL PANELES DE ENTRENAMIENTO DE COMBATE & RESISTENCIA ---
function renderCombatHub(subTab = "muaythai") {
  const container = document.getElementById("combat-hub-container");
  if (!container) return;

  if (subTab === "muaythai") {
    let gymsHTML = combatState.gyms.map(g => `
      <div class="jaguar-card" style="background: rgba(0,0,0,0.3); border-color: var(--border-neon-pink);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h4 style="font-size: 1.05rem; color: #FFF; font-weight: 800;">🥊 ${g.name}</h4>
          <span class="badge-tag badge-gold">⭐ ${g.rating} / 5</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--neon-cyan); font-weight: 700; margin-bottom: 6px;">📍 ${g.city}, ${g.country} • ${g.type}</div>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${g.desc}</p>
      </div>
    `).join("");

    let sparringsHTML = combatState.sparringPartners.map(s => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px dashed rgba(255,255,255,0.1); font-size: 0.86rem;">
        <div>
          <strong style="color: var(--neon-pink-bright);">🥋 ${s.name}</strong> <small style="color: var(--text-dim);">(${s.gym} • ${s.date})</small>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${s.notes}</div>
        </div>
        <span class="badge-tag badge-pink">${s.discipline}</span>
      </div>
    `).join("");

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- SECCIÓN 1: MAPA & DIRECTORIO DE GIMNASIOS DE EUROPA -->
        <div class="jaguar-card" style="border-color: var(--neon-pink);">
          <div class="card-title-bar">
            <h3 class="card-title">🥊 Gimnasios Destacados de Muay Thai & Kickboxing en Europa</h3>
            <span class="badge-tag badge-gold">⭐ Recomendados > 4.0</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
            Colección de gimnasios evaluados en Hannover, Bilbao, Ámsterdam, Berlín y principales capitales europeas:
          </p>

          <div class="grid-2 mb-14">
            ${gymsHTML}
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="text" id="new-gym-name" class="input-jaguar" placeholder="Nombre del Gimnasio...">
            <input type="text" id="new-gym-city" class="input-jaguar" placeholder="Ciudad / País..." style="width: 160px;">
            <button class="btn-jaguar btn-primary-pink" onclick="addGymEntry()">+ Agregar Gimnasio</button>
          </div>
        </div>

        <!-- SECCIÓN 2: COLECCIÓN DE RIVALES & SPARRINGS -->
        <div class="jaguar-card" style="border-color: var(--neon-gold);">
          <div class="card-title-bar">
            <h3 class="card-title">⚔️ Colección de Rivales & Companeros de Sparring</h3>
            <span class="badge-tag badge-pink">${combatState.sparringPartners.length} Sparrings Registrados</span>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 14px;">
            <input type="text" id="new-sparring-name" class="input-jaguar" placeholder="Nombre del rival / sparring...">
            <input type="text" id="new-sparring-notes" class="input-jaguar" placeholder="Notas técnicas / impresiones...">
            <button class="btn-jaguar btn-gold-chrome" style="color: #000; font-weight: 800;" onclick="addSparringPartner()">+ Registrar Sparring</button>
          </div>

          <div>
            ${sparringsHTML}
          </div>
        </div>

      </div>
    `;
  } else if (subTab === "triatlon") {
    container.innerHTML = `
      <div class="jaguar-card" style="border-color: var(--neon-cyan);">
        <div class="card-title-bar">
          <h3 class="card-title">🏊‍♂️ Plan de Entrenamiento: Triatlón</h3>
          <span class="badge-tag badge-cyan">${combatState.triathlonMetrics.targetEvent}</span>
        </div>

        <div class="grid-3 mb-14">
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-cyan); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🏊‍♂️</div>
            <strong style="color: var(--neon-cyan);">Natación</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.triathlonMetrics.weeklySwimKm} km</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Volumen Semanal</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-gold); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🚴‍♂️</div>
            <strong style="color: var(--neon-gold);">Ciclismo de Ruta</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.triathlonMetrics.weeklyBikeKm} km</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Volumen Semanal</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-pink-bright); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🏃‍♂️</div>
            <strong style="color: var(--neon-pink-bright);">Pedestrismo / Carrera</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.triathlonMetrics.weeklyRunKm} km</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Volumen Semanal</div>
          </div>
        </div>

        <div style="padding: 12px; background: rgba(0,240,255,0.06); border-radius: var(--radius-md); border: 1px dashed var(--neon-cyan);">
          <strong style="color: var(--neon-cyan);">💡 Consejo de Transición (Brick Workouts):</strong> Realiza sesiones combinadas de Ciclismo 40km + Carrera 5km los sábados para acostumbrar a las piernas a la transición biológica.
        </div>
      </div>
    `;
  } else if (subTab === "maraton") {
    container.innerHTML = `
      <div class="jaguar-card" style="border-color: var(--emerald-bright);">
        <div class="card-title-bar">
          <h3 class="card-title">🏃‍♂️ Plan de Preparación: Maratón 42K</h3>
          <span class="badge-tag badge-emerald">${combatState.marathonMetrics.targetMarathon}</span>
        </div>

        <div class="grid-3 mb-14">
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--emerald-bright); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">⏱️</div>
            <strong style="color: var(--emerald-bright);">Ritmo Objetivo (Pace)</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.marathonMetrics.targetPace}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Meta de Maratón</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-cyan); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">📊</div>
            <strong style="color: var(--neon-cyan);">Kilometraje Semanal</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.marathonMetrics.weeklyKm} km</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Acumulado Objetivo</div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--neon-gold); text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 4px;">🏔️</div>
            <strong style="color: var(--neon-gold);">Tirada Más Larga (Long Run)</strong>
            <div style="font-size: 1.4rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.marathonMetrics.longestRun} km</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Fondo de Fin de Semana</div>
          </div>
        </div>
      </div>
    `;
  } else if (subTab === "escalada") {
    const sessions = (combatState.climbingMetrics && combatState.climbingMetrics.sessions) || [];
    let sessionsHTML = sessions.map(s => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px dashed rgba(255,255,255,0.1); font-size: 0.86rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); margin-bottom: 6px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="color: var(--imperial-gold-light); font-size: 0.95rem;">${s.type.includes('Muro') ? '🧗‍♂️' : '🏔️'} ${s.location}</strong>
            <span class="badge-tag badge-gold" style="font-size: 0.72rem; padding: 2px 7px;">${s.grade}</span>
            <small style="color: var(--text-dim);">(${s.date})</small>
          </div>
          <div style="font-size: 0.80rem; color: var(--text-muted); margin-top: 4px;">${s.notes}</div>
        </div>
        <span class="badge-tag ${s.type.includes('Muro') ? 'badge-cyan' : 'badge-emerald'}" style="font-size: 0.74rem;">${s.type}</span>
      </div>
    `).join("");

    if (!sessionsHTML) {
      sessionsHTML = `<div style="text-align: center; color: var(--text-dim); padding: 14px; font-size: 0.85rem;">No hay sesiones registradas aún. ¡Registra tu primer pegue en muro u outdoor!</div>`;
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- HEADER DUAL: ESCALADA DE MURO & ESCALADA OUTDOOR -->
        <div class="jaguar-card" style="border-color: var(--imperial-gold); background: linear-gradient(135deg, rgba(23,30,40,0.95) 0%, rgba(14,20,28,0.98) 100%);">
          <div class="card-title-bar">
            <div>
              <span class="badge-tag badge-gold">🧗‍♂️ ESCALADA INTEGRAL • FUERZA, AGARRE & ADHERENCIA</span>
              <h3 class="card-title" style="margin-top: 6px; font-size: 1.45rem;">Escalada de Muro (Indoor) & Escalada Outdoor (Roca Natural)</h3>
            </div>
            <span class="badge-tag badge-cyan">Hangboard 20mm • V6 / 7a Target</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--parchment-warm); line-height: 1.55; margin-top: 6px;">
            La escalada es la integración suprema de la fuerza relativa del Caballero Jaguar: tensión isométrica de dedos, colocación milimétrica de pies, temple psicológico y lectura espacial del terreno en resina y roca viva.
          </p>

          <!-- MÉTRICAS DE ESCALADA -->
          <div class="grid-3 mb-14" style="margin-top: 14px;">
            <div style="padding: 14px; background: rgba(0,0,0,0.4); border-radius: var(--radius-md); border: 1px solid var(--neon-cyan); text-align: center;">
              <div style="font-size: 1.8rem; margin-bottom: 2px;">🧗‍♂️</div>
              <strong style="color: var(--neon-cyan);">Muro / Boulder Indoor</strong>
              <div style="font-size: 1.35rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.climbingMetrics.targetBoulder}</div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">Rocódromo: Boulderwelt</div>
            </div>

            <div style="padding: 14px; background: rgba(0,0,0,0.4); border-radius: var(--radius-md); border: 1px solid var(--imperial-gold); text-align: center;">
              <div style="font-size: 1.8rem; margin-bottom: 2px;">🏔️</div>
              <strong style="color: var(--imperial-gold-light);">Outdoor / Roca Natural</strong>
              <div style="font-size: 1.35rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.climbingMetrics.targetSport}</div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">Frankenjura & Siurana</div>
            </div>

            <div style="padding: 14px; background: rgba(0,0,0,0.4); border-radius: var(--radius-md); border: 1px solid var(--emerald-bright); text-align: center;">
              <div style="font-size: 1.8rem; margin-bottom: 2px;">🖐️</div>
              <strong style="color: var(--emerald-bright);">Suspensiones Dedos</strong>
              <div style="font-size: 1.35rem; font-weight: 900; color: #FFF; margin-top: 4px;">${combatState.climbingMetrics.hangboardEdge}</div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">Protocolo 7s / 3s x 6</div>
            </div>
          </div>
        </div>

        <!-- PROTOCOLOS DE ENTRENAMIENTO COMPARATIVOS: MURO VS OUTDOOR -->
        <div class="grid-2">
          
          <!-- COLUMNA 1: ESCALADA DE MURO (INDOOR) -->
          <div class="jaguar-card" style="border-color: var(--neon-cyan); background: rgba(14,20,28,0.85);">
            <div class="card-title-bar">
              <h4 style="color: var(--neon-cyan); font-size: 1.1rem; margin: 0; font-family: 'Cinzel', serif;">🧗‍♂️ Escalada de Muro & Boulder (Indoor)</h4>
              <span class="badge-tag badge-cyan">Resina & Volúmenes</span>
            </div>
            <ul style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.6; padding-left: 18px; margin: 10px 0;">
              <li><strong>Fuerza de Agarre Específica:</strong> Entrenamiento en tabla multipresa (Hangboard/Beastmaker) con agarre semi-arqueo (half-crimp) estricto de 20mm para proteger poleas A2.</li>
              <li><strong>Desplomes & Techos:</strong> Activación de cadena posterior y talonajes (heel-hooks) para evitar que el tren inferior caiga en voladizo.</li>
              <li><strong>Coordinación & Parkour:</strong> Movimientos de compresión sobre volúmenes dual-texture y dinámicos a dos manos.</li>
              <li><strong>Salas en Europa:</strong> Boulderwelt (Hannover/Múnich), Der Kegel (Berlín), Sharma Climbing (Barcelona/Madrid).</li>
            </ul>
          </div>

          <!-- COLUMNA 2: ESCALADA OUTDOOR (ROCA NATURAL) -->
          <div class="jaguar-card" style="border-color: var(--imperial-gold); background: rgba(14,20,28,0.85);">
            <div class="card-title-bar">
              <h4 style="color: var(--imperial-gold-light); font-size: 1.1rem; margin: 0; font-family: 'Cinzel', serif;">🏔️ Escalada Outdoor (Roca Natural)</h4>
              <span class="badge-tag badge-gold">Caliza, Granito & Arenisca</span>
            </div>
            <ul style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.6; padding-left: 18px; margin: 10px 0;">
              <li><strong>Lectura de Relieve Natural:</strong> Sin colores ni presas evidentes. Se entrena la visión periférica para detectar regletas ciegas, cristales y fisuras.</li>
              <li><strong>Confianza de Pies en Adherencia:</strong> Apoyo con la suela de los pies de gato sobre roca lisa sin canteo, bajando talones para maximizar fricción.</li>
              <li><strong>Seguridad & Cadena de Seguridad:</strong> Nudo ocho doble resecado, chequeo cruzado de arnés, uso de asegurador asistido (Grigri) y gestión de rozamiento de cuerda.</li>
              <li><strong>Escuelas Emblemáticas:</strong> Frankenjura (Alemania - bidedos calizos), Siurana/Margalef (España), Cochamó y Las Chilcas (Chile).</li>
            </ul>
          </div>

        </div>

        <!-- LOG INTERACTIVO DE SESIONES DE ESCALADA -->
        <div class="jaguar-card" style="border-color: var(--border-gold);">
          <div class="card-title-bar">
            <h3 class="card-title">📖 Bitácora de Sesiones de Escalada</h3>
            <span class="badge-tag badge-gold">${sessions.length} Sesiones Registradas</span>
          </div>

          <!-- FORMULARIO RÁPIDO DE REGISTRO -->
          <div style="display: grid; grid-template-columns: 140px 100px 1fr 1fr auto; gap: 8px; margin-bottom: 14px;" class="climbing-form-responsive">
            <select id="new-climb-type" class="input-jaguar" style="padding: 6px 10px; font-size: 0.82rem;">
              <option value="Muro Indoor (Boulder)">Muro Indoor (Boulder)</option>
              <option value="Muro Indoor (Vías)">Muro Indoor (Vías)</option>
              <option value="Outdoor Roca (Deportiva)">Outdoor Roca (Deportiva)</option>
              <option value="Outdoor Bloque (Roca)">Outdoor Bloque (Roca)</option>
            </select>
            <input type="text" id="new-climb-grade" class="input-jaguar" placeholder="Grado (ej. V5, 6c)" style="font-size: 0.82rem;">
            <input type="text" id="new-climb-loc" class="input-jaguar" placeholder="Spot / Rocódromo..." style="font-size: 0.82rem;">
            <input type="text" id="new-climb-notes" class="input-jaguar" placeholder="Sensaciones técnicas, agarres..." style="font-size: 0.82rem;">
            <button class="btn-jaguar btn-gold-chrome" style="color: #000; font-weight: 800; font-size: 0.82rem; padding: 6px 14px;" onclick="addClimbingSession()">+ Registrar</button>
          </div>

          <!-- LISTA DE SESIONES -->
          <div>
            ${sessionsHTML}
          </div>
        </div>

      </div>
    `;
  }
}

function addClimbingSession() {
  const typeEl = document.getElementById("new-climb-type");
  const gradeEl = document.getElementById("new-climb-grade");
  const locEl = document.getElementById("new-climb-loc");
  const notesEl = document.getElementById("new-climb-notes");

  if (!gradeEl || !gradeEl.value.trim()) {
    showNotification("Por favor especifica al menos el grado alcanzado.");
    return;
  }

  if (!combatState.climbingMetrics) {
    combatState.climbingMetrics = { sessions: [] };
  }
  if (!combatState.climbingMetrics.sessions) {
    combatState.climbingMetrics.sessions = [];
  }

  combatState.climbingMetrics.sessions.unshift({
    id: "c-" + Date.now(),
    date: cjToday(),
    type: typeEl ? typeEl.value : "Muro Indoor (Boulder)",
    grade: gradeEl.value.trim().toUpperCase(),
    location: locEl && locEl.value.trim() ? locEl.value.trim() : "Rocódromo / Roca Natural",
    notes: notesEl && notesEl.value.trim() ? notesEl.value.trim() : "Sesión de escalada completada."
  });

  gradeEl.value = "";
  if (locEl) locEl.value = "";
  if (notesEl) notesEl.value = "";

  saveCombatState();
  renderCombatHub("escalada");
  showNotification("¡Sesión de escalada registrada en tu Códice!");
}

function addGymEntry() {
  const nameEl = document.getElementById("new-gym-name");
  const cityEl = document.getElementById("new-gym-city");
  if (!nameEl || !nameEl.value.trim()) return;

  combatState.gyms.push({
    id: "g-" + Date.now(),
    name: nameEl.value.trim(),
    city: cityEl && cityEl.value.trim() ? cityEl.value.trim() : "Europa",
    country: "Europa",
    rating: 4.8,
    type: "Muay Thai & Kickboxing",
    desc: "Gimnasio recomendado agregado por el usuario."
  });

  nameEl.value = "";
  if (cityEl) cityEl.value = "";
  saveCombatState();
  renderCombatHub("muaythai");
  showNotification("¡Gimnasio agregado a tu directorio europeo!");
}

function addSparringPartner() {
  const nameEl = document.getElementById("new-sparring-name");
  const notesEl = document.getElementById("new-sparring-notes");
  if (!nameEl || !nameEl.value.trim()) return;

  combatState.sparringPartners.push({
    id: "s-" + Date.now(),
    name: nameEl.value.trim(),
    gym: "Gimnasio de Europa",
    date: cjToday(),
    discipline: "Muay Thai / Sparring",
    notes: notesEl && notesEl.value.trim() ? notesEl.value.trim() : "Sesión de sparring intensa."
  });

  nameEl.value = "";
  if (notesEl) notesEl.value = "";
  saveCombatState();
  renderCombatHub("muaythai");
  showNotification("¡Sparring agregado a tu colección de rivales!");
}

document.addEventListener("DOMContentLoaded", () => {
  loadCombatState();
});
