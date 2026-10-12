/* ==========================================================================
   JAGUAR IMPERIAL ART ACADEMY: FOTOGRAFÍA & PINTURA
   Módulos de Aprendizaje, Simuladores Interactivos & Bitácoras de Taller
   ========================================================================== */

// --- ESTADO DE FOTOGRAFÍA ---
const FOTO_STORAGE_KEY = "JAGUAR_FOTO_ACADEMY_V1";
let fotoState = {
  activeSubTab: "triangulo",
  apertureIndex: 1, // f/2.8
  shutterIndex: 2,  // 1/500s
  isoIndex: 1,      // 400
  challenges: [
    { id: "f1", title: "Claroscuro en Blanco & Negro", desc: "Buscar una fuente de luz única lateral y medir para las altas luces.", completed: true },
    { id: "f2", title: "Profundidad de Campo Reducida (Retrato)", desc: "f/1.8 - f/2.8 a 50mm, enfoque crítico a los ojos.", completed: true },
    { id: "f3", title: "Líneas de Fuga en Arquitectura Gótica", desc: "Composición con punto de fuga central y simetría en castillos.", completed: false },
    { id: "f4", title: "Textura & Micro-relieve de Roca (Escalada)", desc: "Capturar el grano del granito o magnesio en dedos y regletas.", completed: false },
    { id: "f5", title: "Hora Azul en Ciudad Medieval Alemana", desc: "Cielo cobalto equilibrado con farolas cálidas (trípode, 2s, f/8, ISO 100).", completed: false }
  ],
  logs: [
    { id: "fl-1", date: "2026-09-01", lens: "50mm f/1.8", params: "f/2.2 • 1/320s • ISO 200", spot: "Parque Herrenhausen, Hannover", notes: "Luz de atardecer filtrada entre robles centenarios. Enfoque nítido y bokeh circular." },
    { id: "fl-2", date: "2026-08-25", lens: "24-70mm f/2.8", params: "f/8 • 1/125s • ISO 100", spot: "Pared de Roca Frankenjura", notes: "Medición puntual en roca caliza, textura de microfisuras y ángulo en contrapicado." }
  ]
};

const APERTURE_STOPS = ["f/1.4", "f/2.8", "f/5.6", "f/8", "f/11", "f/16"];
const SHUTTER_STOPS = ["1/2000s", "1/1000s", "1/500s", "1/125s", "1/30s", "1s", "10s"];
const ISO_STOPS = ["100", "400", "800", "1600", "3200", "6400"];

// --- ESTADO DE PINTURA ---
const PINTURA_STORAGE_KEY = "JAGUAR_PINTURA_ACADEMY_V1";
let pinturaState = {
  activeSubTab: "color",
  selectedPigmentA: "blanco",
  selectedPigmentB: "ocre",
  activeValueStep: 5,
  exercises: [
    { id: "p1", title: "Escala Tonal de 9 Pasos Munsell", desc: "Degradado uniforme desde blanco puro a negro marfil en 9 tonos discretos.", completed: true },
    { id: "p2", title: "Esfera con Luz, Terminador y Sombra Reflejada", desc: "Modelado tridimensional volumétrico con bordes suaves y duros.", completed: true },
    { id: "p3", title: "Retrato Somático con Paleta de Zorn", desc: "Solo 4 pigmentos: Blanco Titanio, Ocre Amarillo, Bermellón y Negro Marfil.", completed: false },
    { id: "p4", title: "Estudio Botánico en Acuarela (Húmedo sobre Húmedo)", desc: "Transición de color translúcida sin emborronar el pigmento.", completed: false },
    { id: "p5", title: "Grisalla y Veladura al Óleo (Graso sobre Magro)", desc: "Capa monocroma inicial en umber y veladura transparente de color.", completed: false }
  ],
  studies: [
    { id: "ps-1", date: "2026-08-30", title: "Estudio de Cráneo & Proporciones", medium: "Carboncillo & Sanguina sobre papel verjurado", palette: "Bicolor Clásico", status: "Terminada", notes: "Énfasis en el arco cigomático y fosa temporal. Luces acentuadas con creta blanca." },
    { id: "ps-2", date: "2026-08-20", title: "Paisaje Rocoso & Bruma Nórdica", medium: "Óleo sobre tabla entelada", palette: "Paleta Zorn Modificada", status: "Secando Veladuras", notes: "Capa magra con aguarrás; veladura superior en aceite de lino con ocre dorado." }
  ]
};

// --- CARGA & GUARDADO LOCAL ---
function loadArtAcademyState() {
  try {
    const savedFoto = localStorage.getItem(FOTO_STORAGE_KEY);
    if (savedFoto) fotoState = Object.assign({}, fotoState, JSON.parse(savedFoto));

    const savedPintura = localStorage.getItem(PINTURA_STORAGE_KEY);
    if (savedPintura) pinturaState = Object.assign({}, pinturaState, JSON.parse(savedPintura));
  } catch (e) {
    console.error("Error al cargar estado de Bellas Artes:", e);
  }
}

function saveFotoState() {
  localStorage.setItem(FOTO_STORAGE_KEY, JSON.stringify(fotoState));
}

function savePinturaState() {
  localStorage.setItem(PINTURA_STORAGE_KEY, JSON.stringify(pinturaState));
}

/* ==========================================================================
   RENDERER: APRENDER FOTOGRAFÍA (ACADEMIA DE ÓPTICA & VISIÓN)
   ========================================================================== */
function renderFotografiaApp() {
  const container = document.getElementById("tab-fotografia");
  if (!container) return;

  const currentAperture = APERTURE_STOPS[fotoState.apertureIndex] || "f/2.8";
  const currentShutter = SHUTTER_STOPS[fotoState.shutterIndex] || "1/500s";
  const currentISO = ISO_STOPS[fotoState.isoIndex] || "400";

  // Cálculo descriptivo del simulador
  let dofText = "Poca profundidad de campo (Bokeh suave, fondo desenfocado ideal para retrato o escalador aislado).";
  if (fotoState.apertureIndex >= 3) {
    dofText = "Gran profundidad de campo (Hiperfocal nítida desde el primer plano hasta las montañas en el horizonte).";
  } else if (fotoState.apertureIndex === 2) {
    dofText = "Profundidad equilibrada (Sujeto nítido con separación sutil del fondo).";
  }

  let motionText = "Congela cualquier movimiento rápido (salto de combate, pegue dinámico de escalada o aleteo).";
  if (fotoState.shutterIndex >= 4) {
    motionText = "Exposición prolongada / Movimiento sedoso (Requiere trípode imperativo; agua sedosa o estelas de luz nocturna).";
  } else if (fotoState.shutterIndex === 3) {
    motionText = "Velocidad estándar de calle (Movimiento natural sin trepidación a pulso).";
  }

  let noiseText = "Grano limpio, máximo rango dinámico y nitidez de detalles a la luz del día.";
  if (fotoState.isoIndex >= 3) {
    noiseText = "Sensibilidad alta para penumbra o noche. Genera ruido digital o textura analógica.";
  }

  // Lista de Retos
  const challengesHTML = fotoState.challenges.map(c => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <input type="checkbox" id="chk-${c.id}" ${c.completed ? 'checked' : ''} onchange="toggleFotoChallenge('${c.id}')" style="cursor: pointer; transform: scale(1.2);">
        <div>
          <strong style="color: ${c.completed ? 'var(--parchment-light)' : '#FFF'}; text-decoration: ${c.completed ? 'line-through' : 'none'}; font-size: 0.95rem;">
            ${c.title}
          </strong>
          <div style="font-size: 0.80rem; color: var(--text-dim); margin-top: 2px;">${c.desc}</div>
        </div>
      </div>
      <span class="badge-tag ${c.completed ? 'badge-emerald' : 'badge-gold'}" style="font-size: 0.72rem;">
        ${c.completed ? 'Completado' : 'Pendiente'}
      </span>
    </div>
  `).join("");

  // Lista de Logs de Campo
  const logsHTML = fotoState.logs.map(l => `
    <div style="padding: 12px 14px; background: rgba(0,0,0,0.3); border-left: 3px solid var(--neon-cyan); border-radius: var(--radius-xs); margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="color: var(--neon-cyan); font-size: 0.92rem;">📍 ${l.spot}</strong>
        <small style="color: var(--text-dim);">${l.date}</small>
      </div>
      <div style="font-size: 0.78rem; color: var(--imperial-gold-light); font-family: monospace; margin-bottom: 4px;">
        📷 ${l.lens} • ⚙️ ${l.params}
      </div>
      <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${l.notes}</div>
    </div>
  `).join("");

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 22px;">
      
      <!-- CABECERA PRINCIPAL CON BOTÓN DE REGRESO AL CÓDICE -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; padding: 26px 30px; border: 1.5px solid var(--border-gold); background: linear-gradient(145deg, rgba(23,30,40,0.98) 0%, rgba(11,14,20,0.99) 100%); box-shadow: var(--shadow-metallic);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge-tag badge-gold">📷 ACADEMIA DE ÓPTICA & VISIÓN</span>
            <span class="badge-tag badge-cyan">Códice del Caballero Jaguar</span>
          </div>
          <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="openBitacorasModal();" style="color: #0E0905; font-weight: 800;">
            📜 Abrir Códice de Bitácoras
          </button>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #FFF; margin: 0 0 6px 0;">
          Aprender Fotografía & Visión Territorial
        </h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 860px; line-height: 1.6; margin: 0;">
          Dominar la cámara es dominar la luz y el tiempo. Entrena tu percepción para encuadrar con geometría sagrada, controlar la óptica manual sin automatismos y registrar expediciones y arquitectura europea.
        </p>
      </div>

      <!-- BARRA DE SUB-PESTAÑAS DE FOTOGRAFÍA -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn-jaguar ${fotoState.activeSubTab === 'triangulo' ? 'btn-electric-cyan active' : 'btn-secondary-dark'}" onclick="setFotoSubTab('triangulo')">
          🔍 Triángulo de Exposición Interactivo
        </button>
        <button class="btn-jaguar ${fotoState.activeSubTab === 'composicion' ? 'btn-electric-cyan active' : 'btn-secondary-dark'}" onclick="setFotoSubTab('composicion')">
          📐 Composición Sagrada & Encuadre
        </button>
        <button class="btn-jaguar ${fotoState.activeSubTab === 'luz' ? 'btn-electric-cyan active' : 'btn-secondary-dark'}" onclick="setFotoSubTab('luz')">
          ☀️ Dominio de la Luz Natural
        </button>
        <button class="btn-jaguar ${fotoState.activeSubTab === 'retos' ? 'btn-gold-chrome active' : 'btn-secondary-dark'}" style="${fotoState.activeSubTab === 'retos' ? 'color: #000; font-weight: 800;' : ''}" onclick="setFotoSubTab('retos')">
          🎯 Retos Semanales & Bitácora de Campo
        </button>
      </div>

      <!-- CONTENIDO DINÁMICO POR SUB-PESTAÑA -->
      ${fotoState.activeSubTab === 'triangulo' ? `
        <!-- SUBTAB: TRIÁNGULO DE EXPOSICIÓN -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="jaguar-card" style="border-color: var(--neon-cyan);">
            <div class="card-title-bar">
              <h3 class="card-title">🎛️ Simulador Óptico del Triángulo de Exposición</h3>
              <span class="badge-tag badge-cyan">Modo Manual Puro</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 18px;">
              Ajusta los 3 parámetros cardinales para entender el comportamiento de la luz, el desenfoque óptico y la congelación del movimiento:
            </p>

            <!-- SELECTORES DE LOS 3 EJES -->
            <div class="grid-3 mb-14" style="gap: 16px;">
              
              <!-- APERTURA -->
              <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--neon-cyan);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--neon-cyan); font-size: 0.95rem;">1. Apertura (Diafragma)</strong>
                  <span class="badge-tag badge-cyan" style="font-size: 0.9rem; font-weight: 900;">${currentAperture}</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-dim); margin-bottom: 10px;">Controla la profundidad de campo y luz que entra al sensor.</div>
                <input type="range" min="0" max="5" value="${fotoState.apertureIndex}" oninput="setFotoParam('apertureIndex', this.value)" style="width: 100%; accent-color: var(--neon-cyan); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; font-size: 0.70rem; color: var(--text-dim); margin-top: 4px;">
                  <span>f/1.4 (Luz / Bokeh)</span>
                  <span>f/16 (Nitidez total)</span>
                </div>
              </div>

              <!-- VELOCIDAD -->
              <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--imperial-gold);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--imperial-gold-light); font-size: 0.95rem;">2. Velocidad Obturación</strong>
                  <span class="badge-tag badge-gold" style="font-size: 0.9rem; font-weight: 900;">${currentShutter}</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-dim); margin-bottom: 10px;">Controla el congelamiento del tiempo o estela de movimiento.</div>
                <input type="range" min="0" max="6" value="${fotoState.shutterIndex}" oninput="setFotoParam('shutterIndex', this.value)" style="width: 100%; accent-color: var(--imperial-gold); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; font-size: 0.70rem; color: var(--text-dim); margin-top: 4px;">
                  <span>1/2000s (Congelar)</span>
                  <span>10s (Larga exp.)</span>
                </div>
              </div>

              <!-- ISO -->
              <div style="background: rgba(0,0,0,0.4); padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--emerald-bright);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--emerald-bright); font-size: 0.95rem;">3. Sensibilidad ISO</strong>
                  <span class="badge-tag badge-emerald" style="font-size: 0.9rem; font-weight: 900;">ISO ${currentISO}</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-dim); margin-bottom: 10px;">Amplificación electrónica de la señal lumínica.</div>
                <input type="range" min="0" max="5" value="${fotoState.isoIndex}" oninput="setFotoParam('isoIndex', this.value)" style="width: 100%; accent-color: var(--emerald-bright); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; font-size: 0.70rem; color: var(--text-dim); margin-top: 4px;">
                  <span>100 (Limpio)</span>
                  <span>6400 (Noche/Grano)</span>
                </div>
              </div>

            </div>

            <!-- ANÁLISIS DE LA TOMA RESULTANTE -->
            <div style="background: rgba(14,20,28,0.9); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 16px;">
              <h4 style="color: var(--imperial-gold-light); margin: 0 0 10px 0; font-family: 'Cinzel', serif; font-size: 1.05rem;">
                🔮 Diagnóstico Somático de la Exposición
              </h4>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: var(--parchment-warm);">
                <div><strong>• Profundidad de Campo:</strong> ${dofText}</div>
                <div><strong>• Movimiento / Tiempo:</strong> ${motionText}</div>
                <div><strong>• Pureza de Señal (Ruido):</strong> ${noiseText}</div>
              </div>
            </div>

          </div>

          <!-- TABLA RÁPIDA DE REGLAS DE ORO -->
          <div class="grid-3">
            <div class="jaguar-card" style="border-color: var(--border-glass);">
              <h4 style="color: var(--neon-cyan); font-size: 0.95rem; margin-top: 0;">📸 Regla de la Recíproca</h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
                Para disparar a pulso sin trepidación, la velocidad mínima debe ser igual o más rápida que la longitud focal. Ej: con lente de 50mm, mínimo <strong>1/50s</strong> (o 1/100s para seguridad total).
              </p>
            </div>
            <div class="jaguar-card" style="border-color: var(--border-glass);">
              <h4 style="color: var(--imperial-gold-light); font-size: 0.95rem; margin-top: 0;">☀️ Regla Sunny 16</h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
                A pleno sol de mediodía despejado: fija el diafragma en <strong>f/16</strong> y la velocidad será exactamente el inverso del ISO. Ej: ISO 100 = <strong>1/125s</strong>.
              </p>
            </div>
            <div class="jaguar-card" style="border-color: var(--border-glass);">
              <h4 style="color: var(--emerald-bright); font-size: 0.95rem; margin-top: 0;">🎯 Punto Dulce Óptico</h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
                Casi todos los objetivos alcanzan su máxima nitidez de centro a esquina cerrando 2 pasos desde la apertura máxima: típicamente entre <strong>f/5.6 y f/8</strong>.
              </p>
            </div>
          </div>

        </div>
      ` : ''}

      ${fotoState.activeSubTab === 'composicion' ? `
        <!-- SUBTAB: COMPOSICIÓN SAGRADA -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="jaguar-card" style="border-color: var(--imperial-gold);">
            <div class="card-title-bar">
              <h3 class="card-title">📐 Geometría Sagrada & Principios Renacentistas de Composición</h3>
              <span class="badge-tag badge-gold">Ojo de Jaguar</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 18px;">
              El encuadre no es casualidad; es la arquitectura mental que guía la mirada del espectador.
            </p>

            <div class="grid-2" style="gap: 16px;">
              
              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-gold);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--imperial-gold-light); font-size: 1.05rem;">1. La Espiral Áurea (Fibonacci)</strong>
                  <span class="badge-tag badge-gold">φ = 1.618</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Basada en la proporción divina de la naturaleza. Coloca el punto de mayor interés (el ojo del caballero, el cruce del castillo o la mano en el agarre) en el centro de la espiral, guiando el recorrido visual desde la periferia con suavidad orgánica.
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--neon-cyan);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--neon-cyan); font-size: 1.05rem;">2. Líneas Conductoras (Leading Lines)</strong>
                  <span class="badge-tag badge-cyan">Perspectiva</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Utiliza caminos empedrados, vías de tren, paredes de roca vertical o molduras arquitectónicas para obligar al cerebro a viajar hacia el sujeto en el horizonte. Genera profundidad tridimensional instantánea.
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--neon-pink);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--neon-pink-bright); font-size: 1.05rem;">3. Enmarcado Natural (Frame within a Frame)</strong>
                  <span class="badge-tag badge-pink">Misterio</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Fotografiar a través de un arco gótico, el marco de una ventana de piedra o ramas tupidas de bosque. Aísla el sujeto, añade capas de profundidad y produce una sensación de observación íntima y contemplativa.
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--emerald-bright);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--emerald-bright); font-size: 1.05rem;">4. Espacio Negativo & Soledad Estoica</strong>
                  <span class="badge-tag badge-emerald">Minimalismo</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Dejar grandes porciones del fotograma libres (un cielo plomizo invernal, la niebla de un lago o una pared inmensa de roca). Transmite majestuosidad, serenidad estoica y destaca la presencia física del sujeto.
                </p>
              </div>

            </div>

          </div>

        </div>
      ` : ''}

      ${fotoState.activeSubTab === 'luz' ? `
        <!-- SUBTAB: DOMINIO DE LA LUZ -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="jaguar-card" style="border-color: var(--neon-gold);">
            <div class="card-title-bar">
              <h3 class="card-title">☀️ La Anatomía de la Luz Natural & Horas Mágicas</h3>
              <span class="badge-tag badge-gold">Fotones Somáticos</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 18px;">
              La fotografía es escribir con luz. Cada momento del día posee una temperatura de color e intensidad con impacto biológico y estético:
            </p>

            <div class="grid-2" style="gap: 16px;">
              
              <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1.5px solid #FFB830;">
                <h4 style="color: #FFB830; margin: 0 0 6px 0;">🌅 Hora Dorada (Golden Hour)</h4>
                <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 8px;">30-60 min tras el amanecer o antes del ocaso • 3000K - 3800K</div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Ángulo rasante con sombras largas y suaves. Tonos ámbar, miel y dorados. Los volúmenes se esculpen naturalmente y la piel humana cobra una calidez heroica sin contrastes agresivos.
                </p>
              </div>

              <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1.5px solid #3B82F6;">
                <h4 style="color: #60A5FA; margin: 0 0 6px 0;">🌌 Hora Azul (Blue Hour)</h4>
                <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 8px;">20-40 min tras la puesta del sol • 8000K - 10000K</div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  El sol está bajo el horizonte. El cielo se tiñe de un cobalto profundo y frío que contrasta perfectamente con las luces de velas, castillos y farolas urbanas de tungsteno cálido (armonía complementaria natural).
                </p>
              </div>

              <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1.5px solid var(--parchment-warm);">
                <h4 style="color: var(--parchment-light); margin: 0 0 6px 0;">☁️ Luz Difusa de Día Nublado</h4>
                <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 8px;">Cielo cubierto de nubes • Caja de luz infinita</div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Las nubes actúan como el mayor difusor del mundo. Elimina sombras duras bajo los ojos y la nariz. Ideal para capturar detalles intrincados en piedra, bosques verdes profundos y retratos de mirada intensa.
                </p>
              </div>

              <div style="padding: 16px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1.5px solid var(--neon-cyan);">
                <h4 style="color: var(--neon-cyan); margin: 0 0 6px 0;">🕯️ Iluminación Lateral Rembrandt</h4>
                <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 8px;">Luz lateral a 45° • Triángulo de luz en la mejilla</div>
                <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                  Herencia pictórica de los maestros clásicos. Una única ventana lateral proyecta sombra sobre media cara, dejando un pequeño triángulo luminoso debajo del ojo del lado en sombra. Máxima profundidad psicológica.
                </p>
              </div>

            </div>

          </div>

        </div>
      ` : ''}

      ${fotoState.activeSubTab === 'retos' ? `
        <!-- SUBTAB: RETOS & BITÁCORA -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <!-- SECCIÓN DE RETOS PRÁCTICOS -->
          <div class="jaguar-card" style="border-color: var(--imperial-gold);">
            <div class="card-title-bar">
              <h3 class="card-title">🎯 Desafíos Prácticos de Fotografía</h3>
              <span class="badge-tag badge-gold">${fotoState.challenges.filter(c => c.completed).length} de ${fotoState.challenges.length} Superados</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
              La maestría técnica solo se forja en el campo. Cumple cada misión con tu cámara o móvil en modo Pro:
            </p>
            <div>${challengesHTML}</div>
          </div>

          <!-- BITÁCORA DE SALIDAS & DISPAROS -->
          <div class="jaguar-card" style="border-color: var(--neon-cyan);">
            <div class="card-title-bar">
              <h3 class="card-title">📖 Bitácora Territorial de Campo</h3>
              <span class="badge-tag badge-cyan">${fotoState.logs.length} Salidas Registradas</span>
            </div>

            <!-- FORMULARIO RÁPIDO DE SALIDA -->
            <div style="display: grid; grid-template-columns: 140px 140px 1fr 1fr auto; gap: 8px; margin-bottom: 14px;" class="foto-form-responsive">
              <input type="text" id="new-foto-spot" class="input-jaguar" placeholder="Ubicación / Spot..." style="font-size: 0.82rem;">
              <input type="text" id="new-foto-lens" class="input-jaguar" placeholder="Lente / Focal (ej. 50mm)" style="font-size: 0.82rem;">
              <input type="text" id="new-foto-params" class="input-jaguar" placeholder="Parámetros (f/2.8, 1/500s, ISO 100)" style="font-size: 0.82rem;">
              <input type="text" id="new-foto-notes" class="input-jaguar" placeholder="Notas de luz, composición..." style="font-size: 0.82rem;">
              <button class="btn-jaguar btn-gold-chrome" style="color: #000; font-weight: 800; font-size: 0.82rem; padding: 6px 14px;" onclick="addFotoLog()">+ Registrar</button>
            </div>

            <div>${logsHTML}</div>
          </div>

        </div>
      ` : ''}

    </div>
  `;
}

function setFotoSubTab(subTab) {
  fotoState.activeSubTab = subTab;
  renderFotografiaApp();
}

function setFotoParam(paramKey, value) {
  fotoState[paramKey] = parseInt(value, 10);
  saveFotoState();
  renderFotografiaApp();
}

function toggleFotoChallenge(id) {
  const ch = fotoState.challenges.find(c => c.id === id);
  if (ch) {
    ch.completed = !ch.completed;
    saveFotoState();
    renderFotografiaApp();
    if (ch.completed && typeof showNotification === "function") {
      showNotification(`¡Reto fotográfico superado: ${ch.title}!`);
    }
  }
}

function addFotoLog() {
  const spotEl = document.getElementById("new-foto-spot");
  const lensEl = document.getElementById("new-foto-lens");
  const paramsEl = document.getElementById("new-foto-params");
  const notesEl = document.getElementById("new-foto-notes");

  if (!spotEl || !spotEl.value.trim()) {
    if (typeof showNotification === "function") showNotification("Indica al menos la ubicación de la toma.");
    return;
  }

  fotoState.logs.unshift({
    id: "fl-" + Date.now(),
    date: new Date().toISOString().split('T')[0],
    spot: spotEl.value.trim(),
    lens: lensEl && lensEl.value.trim() ? lensEl.value.trim() : "Lente fija",
    params: paramsEl && paramsEl.value.trim() ? paramsEl.value.trim() : "Modo Manual",
    notes: notesEl && notesEl.value.trim() ? notesEl.value.trim() : "Sesión de fotografía completada."
  });

  spotEl.value = "";
  if (lensEl) lensEl.value = "";
  if (paramsEl) paramsEl.value = "";
  if (notesEl) notesEl.value = "";

  saveFotoState();
  renderFotografiaApp();
  if (typeof showNotification === "function") showNotification("¡Disparo registrado en tu Bitácora Territorial!");
}

/* ==========================================================================
   RENDERER: APRENDER PINTURA (ATELIER DE BELLAS ARTES & COLOR)
   ========================================================================== */
const ZORN_PIGMENTS = {
  blanco: { name: "Blanco de Titanio", hex: "#F5F5F0", role: "Aumenta el valor (aclara) y enfría ligeramente las mezclas." },
  ocre: { name: "Ocre Amarillo (Yellow Ochre)", hex: "#C59B27", role: "Tierra cálida primordial. Modela luz cálida y tonos medios dorados." },
  rojo: { name: "Rojo Bermellón / Cadmio", hex: "#BA2D1D", role: "Rojo ardiente. Aporta rubor, flujo sanguíneo y contrastes vivos." },
  negro: { name: "Negro Marfil (Ivory Black)", hex: "#1A1A1A", role: "El gran secreto: al ser frío, actúa como el 'Azul' de la paleta." }
};

const ZORN_MIXES = {
  "blanco-ocre": { name: "Amarillo Nápoles / Carne Clara", hex: "#E8D39E", note: "Resaltes de frente, nariz y pómulos con luz cálida." },
  "blanco-rojo": { name: "Rosa Veneciano Pálido", hex: "#E09489", note: "Labios, orejas, nudillos y rubor somático." },
  "blanco-negro": { name: "Gris Perla / Azulado", hex: "#8E9399", note: "Sombras frías de barba, sienes y medios tonos plateados." },
  "ocre-rojo": { name: "Naranja Siena Quemada", hex: "#C45524", note: "Tierras cálidas, sombras intensas de piel y reflejos de fuego." },
  "ocre-negro": { name: "Verde Oliva Profundo", hex: "#555227", note: "¡Milagro de Zorn! Al mezclar amarillo con negro marfil frío, surge un verde vegetal perfecto para paisajes y sombras neutras." },
  "rojo-negro": { name: "Castaño Púrpura / Chocolate", hex: "#5C201C", note: "Pelo castaño oscuro, pliegues profundos y orificios nasales." }
};

function renderPinturaApp() {
  const container = document.getElementById("tab-pintura");
  if (!container) return;

  const pigA = pinturaState.selectedPigmentA || "blanco";
  const pigB = pinturaState.selectedPigmentB || "ocre";
  const mixKey = [pigA, pigB].sort().join("-");
  const currentMix = ZORN_MIXES[mixKey] || { name: "Matiz Puro / Neutro", hex: ZORN_PIGMENTS[pigA].hex, note: "Color directo del tubo sin mezcla adicional." };

  // Lista de Ejercicios
  const exercisesHTML = pinturaState.exercises.map(e => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <input type="checkbox" id="pchk-${e.id}" ${e.completed ? 'checked' : ''} onchange="togglePinturaExercise('${e.id}')" style="cursor: pointer; transform: scale(1.2);">
        <div>
          <strong style="color: ${e.completed ? 'var(--parchment-light)' : '#FFF'}; text-decoration: ${e.completed ? 'line-through' : 'none'}; font-size: 0.95rem;">
            ${e.title}
          </strong>
          <div style="font-size: 0.80rem; color: var(--text-dim); margin-top: 2px;">${e.desc}</div>
        </div>
      </div>
      <span class="badge-tag ${e.completed ? 'badge-emerald' : 'badge-gold'}" style="font-size: 0.72rem;">
        ${e.completed ? 'Completado' : 'Por Realizar'}
      </span>
    </div>
  `).join("");

  // Lista de Estudios de Taller
  const studiesHTML = pinturaState.studies.map(s => `
    <div style="padding: 12px 14px; background: rgba(0,0,0,0.3); border-left: 3px solid var(--imperial-gold); border-radius: var(--radius-xs); margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="color: var(--imperial-gold-light); font-size: 0.95rem;">🎨 ${s.title}</strong>
        <span class="badge-tag badge-gold" style="font-size: 0.72rem;">${s.status}</span>
      </div>
      <div style="font-size: 0.78rem; color: var(--neon-cyan); font-family: monospace; margin-bottom: 4px;">
        Técnica: ${s.medium} • Paleta: ${s.palette} • ${s.date}
      </div>
      <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${s.notes}</div>
    </div>
  `).join("");

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 22px;">
      
      <!-- CABECERA PRINCIPAL CON BOTÓN DE REGRESO AL CÓDICE -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; padding: 26px 30px; border: 1.5px solid var(--border-gold); background: linear-gradient(145deg, rgba(23,30,40,0.98) 0%, rgba(11,14,20,0.99) 100%); box-shadow: var(--shadow-metallic);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge-tag badge-gold">🎨 ATELIER DE BELLAS ARTES</span>
            <span class="badge-tag badge-cyan">Códice del Caballero Jaguar</span>
          </div>
          <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="openBitacorasModal();" style="color: #0E0905; font-weight: 800;">
            📜 Abrir Códice de Bitácoras
          </button>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #FFF; margin: 0 0 6px 0;">
          Aprender Pintura & Teoría Clásica del Color
        </h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 860px; line-height: 1.6; margin: 0;">
          El atelier tradicional de los grandes maestros: domina la escala tonal de claroscuro, la mítica Paleta de Zorn de 4 pigmentos, las veladuras al óleo sobre grisalla y la acuarela de paisaje.
        </p>
      </div>

      <!-- BARRA DE SUB-PESTAÑAS DE PINTURA -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn-jaguar ${pinturaState.activeSubTab === 'color' ? 'btn-gold-chrome active' : 'btn-secondary-dark'}" style="${pinturaState.activeSubTab === 'color' ? 'color: #000; font-weight: 800;' : ''}" onclick="setPinturaSubTab('color')">
          🎨 Teoría del Color & Mezclador Zorn
        </button>
        <button class="btn-jaguar ${pinturaState.activeSubTab === 'valor' ? 'btn-electric-cyan active' : 'btn-secondary-dark'}" onclick="setPinturaSubTab('valor')">
          🎭 Claroscuro & Escala de Valores (Munsell)
        </button>
        <button class="btn-jaguar ${pinturaState.activeSubTab === 'tecnicas' ? 'btn-electric-cyan active' : 'btn-secondary-dark'}" onclick="setPinturaSubTab('tecnicas')">
          🖌️ Técnicas Clásicas: Óleo, Acuarela & Dibujo
        </button>
        <button class="btn-jaguar ${pinturaState.activeSubTab === 'estudios' ? 'btn-primary-pink active' : 'btn-secondary-dark'}" onclick="setPinturaSubTab('estudios')">
          🖼️ Estudios de Taller & Obras
        </button>
      </div>

      <!-- CONTENIDO DINÁMICO POR SUB-PESTAÑA -->
      ${pinturaState.activeSubTab === 'color' ? `
        <!-- SUBTAB: TEORÍA DEL COLOR & PALETA ZORN -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="jaguar-card" style="border-color: var(--imperial-gold);">
            <div class="card-title-bar">
              <h3 class="card-title">🧪 El Laboratorio de Anders Zorn (4 Pigmentos Legendarios)</h3>
              <span class="badge-tag badge-gold">Armonía Infinita</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">
              El pintor sueco Anders Zorn demostró que con solo <strong>4 colores</strong> se puede pintar cualquier piel humana, atmósfera y paisaje sin saturaciones estridentes.
            </p>

            <!-- SELECTORES DE PIGMENTOS -->
            <div class="grid-2" style="gap: 16px; margin-bottom: 16px;">
              
              <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-gold);">
                <label style="font-size: 0.82rem; color: var(--imperial-gold-light); font-weight: 700; display: block; margin-bottom: 8px;">
                  1. Selecciona Pigmento Base A:
                </label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  ${Object.keys(ZORN_PIGMENTS).map(k => {
                    const p = ZORN_PIGMENTS[k];
                    const isSel = pigA === k;
                    return `
                      <button onclick="setPinturaPigment('selectedPigmentA', '${k}')" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: var(--radius-sm); border: ${isSel ? '2px solid var(--imperial-gold)' : '1px solid var(--border-glass)'}; background: ${isSel ? 'rgba(197,160,89,0.2)' : 'rgba(0,0,0,0.4)'}; color: #FFF; cursor: pointer; text-align: left;">
                        <span style="display: inline-block; width: 18px; height: 18px; border-radius: 50%; background: ${p.hex}; border: 1px solid rgba(255,255,255,0.3);"></span>
                        <span style="font-size: 0.78rem; font-weight: 700;">${p.name.split(' ')[0]}</span>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--neon-cyan);">
                <label style="font-size: 0.82rem; color: var(--neon-cyan); font-weight: 700; display: block; margin-bottom: 8px;">
                  2. Selecciona Pigmento Secundario B:
                </label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  ${Object.keys(ZORN_PIGMENTS).map(k => {
                    const p = ZORN_PIGMENTS[k];
                    const isSel = pigB === k;
                    return `
                      <button onclick="setPinturaPigment('selectedPigmentB', '${k}')" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: var(--radius-sm); border: ${isSel ? '2px solid var(--neon-cyan)' : '1px solid var(--border-glass)'}; background: ${isSel ? 'rgba(0,240,255,0.15)' : 'rgba(0,0,0,0.4)'}; color: #FFF; cursor: pointer; text-align: left;">
                        <span style="display: inline-block; width: 18px; height: 18px; border-radius: 50%; background: ${p.hex}; border: 1px solid rgba(255,255,255,0.3);"></span>
                        <span style="font-size: 0.78rem; font-weight: 700;">${p.name.split(' ')[0]}</span>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

            </div>

            <!-- RESULTADO DE LA MEZCLA -->
            <div style="display: flex; align-items: center; gap: 20px; background: rgba(14,20,28,0.9); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px; flex-wrap: wrap;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: ${currentMix.hex}; border: 2px solid var(--imperial-gold); box-shadow: 0 0 20px ${currentMix.hex}66; flex-shrink: 0;"></div>
              <div style="flex: 1; min-width: 240px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                  <h4 style="color: #FFF; margin: 0; font-family: 'Cinzel', serif; font-size: 1.25rem;">${currentMix.name}</h4>
                  <span class="badge-tag badge-gold" style="font-family: monospace;">${currentMix.hex}</span>
                </div>
                <div style="font-size: 0.88rem; color: var(--parchment-warm); line-height: 1.5;">
                  ${currentMix.note}
                </div>
              </div>
            </div>

          </div>

          <!-- LEY DE TEMPERATURAS OPUESTAS -->
          <div class="grid-2">
            <div class="jaguar-card" style="border-color: var(--neon-gold);">
              <h4 style="color: var(--imperial-gold-light); font-size: 1.05rem; margin: 0 0 8px 0;">☀️ Luz Cálida = Sombra Fría</h4>
              <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                Si la fuente lumínica es cálida (el sol poniente, una vela o una chimenea), las sombras proyectadas y propias serán automáticamente <strong>frías</strong> (azules, violáceas o grises neutros). Esta vibración complementaria crea vida en el lienzo.
              </p>
            </div>
            <div class="jaguar-card" style="border-color: var(--neon-cyan);">
              <h4 style="color: var(--neon-cyan); font-size: 1.05rem; margin: 0 0 8px 0;">❄️ Luz Fría = Sombra Cálida</h4>
              <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55;">
                Si la fuente es fría (ventana al norte o cielo plomizo nublado), las luces en el sujeto serán plateadas o azuladas, y las sombras interiores se tornarán <strong>cálidas</strong> por el reflejo de la piel y los objetos del suelo (ocres y tierras).
              </p>
            </div>
          </div>

        </div>
      ` : ''}

      ${pinturaState.activeSubTab === 'valor' ? `
        <!-- SUBTAB: CLAROSCURO & ESCALA DE VALORES -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="jaguar-card" style="border-color: var(--neon-cyan);">
            <div class="card-title-bar">
              <h3 class="card-title">🎭 La Escala Tonal de 9 Pasos & Chiaroscuro (Caravaggio)</h3>
              <span class="badge-tag badge-cyan">El Valor Hace el Volumen</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">
              *"El valor hace todo el trabajo tridimensional; el color se lleva el crédito visual."* Si los valores de luz y sombra son correctos, la pintura funciona incluso en blanco y negro.
            </p>

            <!-- ESCALA VISUAL DE 9 PASOS -->
            <div style="display: flex; border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--border-gold); height: 50px; margin-bottom: 16px;">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(step => {
                const brightness = Math.round(255 - ((step - 1) * 28));
                const bgHex = `rgb(${brightness}, ${brightness}, ${brightness})`;
                const textColor = step <= 4 ? '#000' : '#FFF';
                const isSelected = pinturaState.activeValueStep === step;
                return `
                  <div onclick="setPinturaValueStep(${step})" style="flex: 1; background: ${bgHex}; color: ${textColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; border: ${isSelected ? '3px solid var(--neon-pink)' : 'none'}; font-weight: 800; font-size: 0.85rem; transition: transform 0.2s;" title="Paso ${step}">
                    ${step}
                  </div>
                `;
              }).join("")}
            </div>

            <!-- ANATOMÍA DE UNA ESFERA EN SOMBRA -->
            <div style="background: rgba(0,0,0,0.4); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <h4 style="color: var(--imperial-gold-light); margin: 0 0 12px 0; font-family: 'Cinzel', serif;">
                🧭 Las 6 Zonas Cardinales del Modelado de Volumen:
              </h4>
              <div class="grid-2" style="gap: 12px; font-size: 0.84rem; color: var(--text-muted); line-height: 1.5;">
                <div><strong>1. Brillo Especular (Highlight):</strong> Reflejo directo de la fuente de luz. Máximo valor (Paso 1, blanco puro).</div>
                <div><strong>2. Centro de Luz & Medios Tonos:</strong> El color local verdadero del objeto bajo la luz (Pasos 2 al 4).</div>
                <div><strong>3. La Línea del Terminador (Cresta):</strong> La frontera donde la luz ya no puede tocar la superficie curva. Comienza la familia de sombras (Paso 6-7).</div>
                <div><strong>4. Luz Reflejada (Bounce Light):</strong> Luz ambiental que rebota desde el suelo o pared hacia la sombra. Nunca debe ser más clara que los medios tonos (Paso 6).</div>
                <div><strong>5. Sombra Proyectada (Cast Shadow):</strong> La sombra que el objeto arroja en el suelo. Borde más nítido cerca de la base y difuso al alejarse.</div>
                <div><strong>6. Sombra de Oclusión (Crevice Shadow):</strong> El punto de contacto exacto donde no entra ningún fotón. Valor más oscuro (Paso 9, negro puro).</div>
              </div>
            </div>

          </div>

        </div>
      ` : ''}

      ${pinturaState.activeSubTab === 'tecnicas' ? `
        <!-- SUBTAB: TÉCNICAS CLÁSICAS -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="grid-3">
            
            <!-- ÓLEO -->
            <div class="jaguar-card" style="border-color: var(--border-gold);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--imperial-gold-light); font-size: 1.1rem; margin: 0;">🎨 Óleo Clásico</h4>
                <span class="badge-tag badge-gold">Maestría</span>
              </div>
              <ul style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; padding-left: 16px; margin: 0;">
                <li><strong>Graso sobre Magro (Fat over Lean):</strong> Las primeras capas se diluyen con aguarrás puro (secado rápido); las capas superiores llevan más aceite de lino (más grasa, secado lento para no cuartear).</li>
                <li><strong>Grisalla & Veladuras (Glazing):</strong> Construir primero todo el volumen en monocromo (tierra de sombra tostada y blanco) y colorear después con veladuras translúcidas luminosas.</li>
                <li><strong>Empaste (Impasto):</strong> Aplicar pintura densa a espátula únicamente en las zonas de mayor luz para crear relieve físico real.</li>
              </ul>
            </div>

            <!-- ACUARELA -->
            <div class="jaguar-card" style="border-color: var(--neon-cyan);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--neon-cyan); font-size: 1.1rem; margin: 0;">💧 Acuarela & Plein Air</h4>
                <span class="badge-tag badge-cyan">Transparencia</span>
              </div>
              <ul style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; padding-left: 16px; margin: 0;">
                <li><strong>Reserva de Blancos:</strong> En la acuarela no existe el blanco cubriente; la luz más intensa es el blanco puro del papel que debes proteger desde el inicio.</li>
                <li><strong>Húmedo sobre Húmedo (Wet-in-Wet):</strong> Humedecer el papel con agua limpia antes de soltar pigmento para crear cielos y nieblas con bordes difuminados infinitos.</li>
                <li><strong>Pincel Seco (Dry Brush):</strong> Arrastrar el pincel casi seco de forma rasante sobre papel de grano grueso para simular espuma marina o roca áspera de escalada.</li>
              </ul>
            </div>

            <!-- DIBUJO ANATÓMICO -->
            <div class="jaguar-card" style="border-color: var(--neon-pink);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--neon-pink-bright); font-size: 1.1rem; margin: 0;">✏️ Dibujo & Anatomía</h4>
                <span class="badge-tag badge-pink">Estructura</span>
              </div>
              <ul style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; padding-left: 16px; margin: 0;">
                <li><strong>Canon de 8 Cabezas:</strong> Proporción heroica clásica. La distancia de la barbilla a los pezones es 1 cabeza; hasta el ombligo 2 cabezas; hasta el pubis 3 cabezas.</li>
                <li><strong>Línea de Acción & Gesto:</strong> Capturar la curva rítmica del cuerpo en 30 segundos antes de dibujar cualquier contorno o músculo individual.</li>
                <li><strong>Técnica de los 3 Lápices:</strong> Papel de tono medio (gris o sepia) con piedra negra para sombras, sanguina para medios tonos y creta blanca para brillos.</li>
              </ul>
            </div>

          </div>

        </div>
      ` : ''}

      ${pinturaState.activeSubTab === 'estudios' ? `
        <!-- SUBTAB: ESTUDIOS & OBRAS -->
        <div style="display: flex; flex-direction: column; gap: 18px;">
          
          <!-- EJERCICIOS DE TALLER -->
          <div class="jaguar-card" style="border-color: var(--imperial-gold);">
            <div class="card-title-bar">
              <h3 class="card-title">📜 Currículo Práctico del Atelier</h3>
              <span class="badge-tag badge-gold">${pinturaState.exercises.filter(e => e.completed).length} de ${pinturaState.exercises.length} Completados</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
              Pasa de aprendiz a maestro completando las pruebas fundamentales de dibujo, valor y pintura:
            </p>
            <div>${exercisesHTML}</div>
          </div>

          <!-- REGISTRO DE OBRAS & ESTUDIOS -->
          <div class="jaguar-card" style="border-color: var(--neon-cyan);">
            <div class="card-title-bar">
              <h3 class="card-title">🖼️ Registro de Estudios & Cuadros en Proceso</h3>
              <span class="badge-tag badge-cyan">${pinturaState.studies.length} Obras en Catálogo</span>
            </div>

            <!-- FORMULARIO RÁPIDO DE OBRA -->
            <div style="display: grid; grid-template-columns: 140px 140px 140px 1fr auto; gap: 8px; margin-bottom: 14px;" class="pintura-form-responsive">
              <input type="text" id="new-study-title" class="input-jaguar" placeholder="Título del estudio..." style="font-size: 0.82rem;">
              <select id="new-study-medium" class="input-jaguar" style="padding: 6px 10px; font-size: 0.82rem;">
                <option value="Óleo sobre lienzo">Óleo sobre lienzo</option>
                <option value="Óleo sobre tabla">Óleo sobre tabla</option>
                <option value="Acuarela sobre papel 300g">Acuarela sobre papel 300g</option>
                <option value="Carboncillo & Sanguina">Carboncillo & Sanguina</option>
                <option value="Gouache / Acrílico">Gouache / Acrílico</option>
              </select>
              <input type="text" id="new-study-palette" class="input-jaguar" placeholder="Paleta (ej. Zorn, Cálida)" style="font-size: 0.82rem;">
              <input type="text" id="new-study-notes" class="input-jaguar" placeholder="Notas de mezcla, capas, soporte..." style="font-size: 0.82rem;">
              <button class="btn-jaguar btn-gold-chrome" style="color: #000; font-weight: 800; font-size: 0.82rem; padding: 6px 14px;" onclick="addPinturaStudy()">+ Registrar</button>
            </div>

            <div>${studiesHTML}</div>
          </div>

        </div>
      ` : ''}

    </div>
  `;
}

function setPinturaSubTab(subTab) {
  pinturaState.activeSubTab = subTab;
  renderPinturaApp();
}

function setPinturaPigment(key, pigment) {
  pinturaState[key] = pigment;
  savePinturaState();
  renderPinturaApp();
}

function setPinturaValueStep(step) {
  pinturaState.activeValueStep = step;
  savePinturaState();
  renderPinturaApp();
}

function togglePinturaExercise(id) {
  const ex = pinturaState.exercises.find(e => e.id === id);
  if (ex) {
    ex.completed = !ex.completed;
    savePinturaState();
    renderPinturaApp();
    if (ex.completed && typeof showNotification === "function") {
      showNotification(`¡Ejercicio de pintura completado: ${ex.title}!`);
    }
  }
}

function addPinturaStudy() {
  const titleEl = document.getElementById("new-study-title");
  const mediumEl = document.getElementById("new-study-medium");
  const paletteEl = document.getElementById("new-study-palette");
  const notesEl = document.getElementById("new-study-notes");

  if (!titleEl || !titleEl.value.trim()) {
    if (typeof showNotification === "function") showNotification("Indica al menos el título de tu obra.");
    return;
  }

  pinturaState.studies.unshift({
    id: "ps-" + Date.now(),
    date: new Date().toISOString().split('T')[0],
    title: titleEl.value.trim(),
    medium: mediumEl ? mediumEl.value : "Óleo sobre lienzo",
    palette: paletteEl && paletteEl.value.trim() ? paletteEl.value.trim() : "Paleta de Zorn",
    status: "En Proceso",
    notes: notesEl && notesEl.value.trim() ? notesEl.value.trim() : "Estudio iniciado en el atelier."
  });

  titleEl.value = "";
  if (paletteEl) paletteEl.value = "";
  if (notesEl) notesEl.value = "";

  savePinturaState();
  renderPinturaApp();
  if (typeof showNotification === "function") showNotification("¡Estudio registrado en el catálogo de tu Atelier!");
}

document.addEventListener("DOMContentLoaded", () => {
  loadArtAcademyState();
});
