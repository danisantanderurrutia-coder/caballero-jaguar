/**
 * SANTUARIO SOMÁTICO • MAPA CORPORAL INTERACTIVO (BODYMAP)
 * Traído e integrado desde la arquitectura de Marie para el Caballero Jaguar.
 * Permite registrar sensaciones físicas, tensiones, mapa de calor a 7/30 días,
 * ejercicios de descompresión somática y micro-prácticas reflexivas estoicas.
 */

(function () {
  const STORAGE_KEY = "caballero_somatic_bodymap_log";

  const ZONE_IDS = ['head', 'throat', 'shoulders', 'chest', 'belly', 'hands', 'back', 'legs'];

  const SENSATIONS = {
    tension: { label: 'Tensión', color: '#C0504D', emoji: '🔴' },
    warmth: { label: 'Calor', color: '#E39A4B', emoji: '🟠' },
    emptiness: { label: 'Vacío', color: '#9AA5B1', emoji: '⚪' },
    calm: { label: 'Calma', color: '#7DA3BE', emoji: '🔵' },
    tingling: { label: 'Hormigueo', color: '#B58BD6', emoji: '🟣' },
    heaviness: { label: 'Pesadez', color: '#6F6A66', emoji: '🟤' },
    pressure: { label: 'Presión', color: '#B5726B', emoji: '🟫' },
    lightness: { label: 'Ligereza', color: '#9CC7A8', emoji: '🟢' },
    numbness: { label: 'Entumecimiento', color: '#C9C5C0', emoji: '🔘' },
    nothing: { label: 'Sin molestia / Neutro', color: '#D9CFC2', emoji: '✨' }
  };

  const BASE_FILL = '#2A241F';

  const ZONE_DATA = {
    head: {
      name: 'Cabeza & Mandíbula',
      practice: 'Inhala e imagina que tu mandíbula se ablanda por completo. Al exhalar largo, relaja el entrecejo y la frente. Tres respiraciones lentas con los párpados relajados.',
      question: '¿Qué pensamiento o dilema da vueltas en tu mente que puedes soltar por hoy?',
      shape: '<circle cx="100" cy="40" r="27" />'
    },
    throat: {
      name: 'Garganta & Cuello Frontal',
      practice: 'Inhala por la nariz y tararea suave al exhalar (tono grave "Om" o zumbido), haciendo vibrar la laringe. Libera el nudo de expresión.',
      question: '¿Qué verdad o sentimiento no expresaste hoy que necesita salir con calma?',
      shape: '<rect x="90" y="66" width="20" height="20" rx="9" />'
    },
    shoulders: {
      name: 'Hombros, Trapecio & Nuca',
      practice: 'Sube los hombros hacia las orejas inhalando en 4 segundos, y déjalos caer de golpe con un suspiro audible al exhalar. Repite 5 veces.',
      question: '¿Qué carga o expectativa ajena estás sosteniendo que no te corresponde?',
      shape: '<path d="M48 96 Q100 78 152 96 L152 110 Q100 94 48 110 Z" />'
    },
    chest: {
      name: 'Pecho & Centro del Corazón',
      practice: 'Coloca tu palma derecha sobre el esternón. Inhala sintiendo cómo se expande la caja torácica y exhala como si enfriaras una infusión caliente.',
      question: '¿Qué anhelo o vulnerabilidad late hoy bajo tu coraza de guerrero?',
      shape: '<rect x="68" y="108" width="64" height="56" rx="22" />'
    },
    belly: {
      name: 'Vientre & Plexo Solar (Agni)',
      practice: 'Mano sobre el abdomen. Inhala inflando la barriga suavemente en 4 segundos, exhala en 6 segundos dejando que se desinfle sin tensión.',
      question: '¿Qué emoción instintiva o digestión pesada está pidiéndote reposo en el vientre?',
      shape: '<rect x="72" y="166" width="56" height="52" rx="22" />'
    },
    hands: {
      name: 'Manos & Muñecas',
      practice: 'Cierra los puños apretando con fuerza al inhalar y ábrelos despacio estirando los dedos al exhalar. Sacude las muñecas 10 segundos.',
      question: '¿A qué te estás aferrando con exceso de control, y qué te toca abrir?',
      shape: '<circle cx="32" cy="244" r="16" /><circle cx="168" cy="244" r="16" />'
    },
    back: {
      name: 'Espalda & Columna Dorsal/Lumbar',
      practice: 'Apoya la espalda contra una pared firme o el respaldo de la silla. Inhala ensanchando las costillas posteriores y siente el soporte sólido de la tierra.',
      question: '¿Te sientes sostenido en tu camino o sientes que todo recae sobre tu espalda?',
      shape: '<rect x="60" y="98" width="80" height="124" rx="30" stroke-dasharray="4 4" />'
    },
    legs: {
      name: 'Piernas, Rodillas & Pies (Enraizamiento)',
      practice: 'Planta los pies descalzos sobre el suelo. Exhala descargando todo el peso del cuerpo hacia la tierra. Tres respiraciones profundas sintiendo la gravedad.',
      question: '¿Hacia qué dirección te pide avanzar tu cuerpo, y qué paso conviene pausar?',
      shape: '<rect x="74" y="224" width="24" height="150" rx="12" /><rect x="102" y="224" width="24" height="150" rx="12" /><ellipse cx="82" cy="388" rx="18" ry="9" /><ellipse cx="118" cy="388" rx="18" ry="9" />'
    }
  };

  const INTENSITY_LEVELS = [
    'Apenas perceptible',
    'Sensación leve / suave',
    'Sensación clara / moderada',
    'Tensión o molestia fuerte',
    'Muy intensa / Aguda'
  ];

  class SantuarioSomatico {
    constructor() {
      this.selectedZone = 'shoulders';
      this.selectedSensations = ['tension'];
      this.currentIntensity = 2;
      this.currentNote = '';
      this.evolutionRange = 7; // 7 o 30 días
      this.isBreathGuideRunning = false;
      this.breathPhase = 'Inhala';
      this.breathTimer = null;

      this.init();
    }

    getLogs() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error("Error al leer logs somáticos:", e);
        return [];
      }
    }

    saveLogs(logs) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
      } catch (e) {
        console.error("Error al guardar logs somáticos:", e);
      }
    }

    init() {
      // Si la base no tiene registros, inicializar con un registro base de demostración
      const logs = this.getLogs();
      if (!logs.length) {
        const now = Date.now();
        const demoLogs = [
          {
            id: 'log_' + (now - 86400000 * 2),
            at: new Date(now - 86400000 * 2).toISOString(),
            zone: 'shoulders',
            sensations: ['tension', 'heaviness'],
            intensity: 3,
            note: 'Tensión en trapecio tras largas horas redactando frente a pantalla.'
          },
          {
            id: 'log_' + (now - 86400000),
            at: new Date(now - 86400000).toISOString(),
            zone: 'belly',
            sensations: ['warmth', 'calm'],
            intensity: 1,
            note: 'Digestión en calma tras infusión caliente de jengibre.'
          }
        ];
        this.saveLogs(demoLogs);
      }
    }

    calculateHeatmap(days = 7) {
      const logs = this.getLogs();
      const cutoff = Date.now() - days * 86400000;
      const inRange = logs.filter(e => new Date(e.at).getTime() >= cutoff);

      const heat = {};
      ZONE_IDS.forEach(z => {
        const zoneEntries = inRange.filter(e => e.zone === z);
        if (!zoneEntries.length) return;

        const counts = {};
        zoneEntries.forEach(e => {
          (e.sensations || []).forEach(s => {
            counts[s] = (counts[s] || 0) + 1;
          });
        });

        const topSens = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
        const avgIntensity = zoneEntries.reduce((acc, curr) => acc + (Number(curr.intensity) || 1), 0) / zoneEntries.length;

        heat[z] = {
          top: topSens ? topSens[0] : 'nothing',
          avg: avgIntensity,
          count: zoneEntries.length
        };
      });

      return { heat, totalEntries: inRange.length };
    }

    selectZone(zoneId) {
      if (!ZONE_DATA[zoneId]) return;
      this.selectedZone = zoneId;
      this.render();
      if (typeof playTibetanBellChime === "function") {
        // play soft bell or tap
      }
    }

    toggleSensation(sensKey) {
      if (!SENSATIONS[sensKey]) return;
      if (this.selectedSensations.includes(sensKey)) {
        this.selectedSensations = this.selectedSensations.filter(s => s !== sensKey);
      } else {
        this.selectedSensations.push(sensKey);
      }
      this.render();
    }

    setIntensity(val) {
      this.currentIntensity = Math.max(0, Math.min(4, Number(val)));
      this.render();
    }

    setEvolutionRange(days) {
      this.evolutionRange = days;
      this.render();
    }

    saveEntry() {
      if (!this.selectedZone) return;
      const sensations = this.selectedSensations.length ? this.selectedSensations : ['nothing'];
      const logs = this.getLogs();

      const newEntry = {
        id: 'soma_' + Date.now(),
        at: new Date().toISOString(),
        zone: this.selectedZone,
        sensations: sensations,
        intensity: this.currentIntensity,
        note: (this.currentNote || '').trim()
      };

      logs.unshift(newEntry);
      this.saveLogs(logs);

      // Sonar campana tibetana
      if (typeof playTibetanBellChime === "function") {
        playTibetanBellChime();
      }

      // Otorgar XP al Banderín Rosa (Calma Somática / Espiritualidad)
      if (window.scoringEngine && typeof window.scoringEngine.awardXP === "function") {
        window.scoringEngine.awardXP(
          "espiritualidad",
          25,
          `Mapa Somático: ${ZONE_DATA[this.selectedZone].name}`
        );
      } else if (typeof window.showNotification === "function") {
        window.showNotification(`✨ +25 XP • Registro en Mapa Somático guardado`);
      }

      this.currentNote = '';
      this.render();

      const toast = document.getElementById("bodymap-save-toast");
      if (toast) {
        toast.style.display = "inline-flex";
        setTimeout(() => { if (toast) toast.style.display = "none"; }, 3500);
      }
    }

    deleteEntry(id) {
      let logs = this.getLogs();
      logs = logs.filter(e => e.id !== id);
      this.saveLogs(logs);
      this.render();
    }

    toggleBreathGuide() {
      const ring = document.getElementById("soma-mini-breath-ring");
      const text = document.getElementById("soma-mini-breath-text");
      const btn = document.getElementById("soma-mini-breath-btn");

      if (this.isBreathGuideRunning) {
        clearInterval(this.breathTimer);
        this.isBreathGuideRunning = false;
        if (ring) ring.style.transform = "scale(1)";
        if (text) text.innerText = "Listo";
        if (btn) btn.innerText = "▶️ Iniciar Respiración Guiada";
        return;
      }

      this.isBreathGuideRunning = true;
      if (btn) btn.innerText = "⏹️ Detener";

      let isInhaling = true;
      const cycle = () => {
        if (!this.isBreathGuideRunning) return;
        if (isInhaling) {
          if (text) text.innerText = "Inhala...";
          if (ring) {
            ring.style.transform = "scale(1.28)";
            ring.style.borderColor = "#F4E5B2";
          }
        } else {
          if (text) text.innerText = "Exhala...";
          if (ring) {
            ring.style.transform = "scale(0.88)";
            ring.style.borderColor = "#9B2C3B";
          }
        }
        isInhaling = !isInhaling;
      };

      cycle();
      this.breathTimer = setInterval(cycle, 4000);
    }

    render(targetContainerId = "santuario-somatico-bodymap-root") {
      const root = document.getElementById(targetContainerId);
      if (!root) return;

      const { heat, totalEntries } = this.calculateHeatmap(this.evolutionRange);
      const zoneInfo = ZONE_DATA[this.selectedZone] || ZONE_DATA.shoulders;
      const logs = this.getLogs();
      const zoneEntries = logs.filter(e => e.zone === this.selectedZone);

      root.innerHTML = `
        <div style="background: linear-gradient(145deg, rgba(28, 22, 18, 0.98) 0%, rgba(14, 10, 8, 0.99) 100%); border: 2px solid #C59A28; border-radius: 14px; padding: 22px; box-shadow: 0 12px 35px rgba(0,0,0,0.6);">
          
          <!-- HEADER DEL MAPA SOMÁTICO -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(197, 154, 40, 0.3); padding-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle, #9B2C3B 0%, #1A0B10 100%); border: 2px solid #C59A28; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 0 18px rgba(197, 154, 40, 0.4);">
                🧘
              </div>
              <div>
                <span class="badge-tag badge-gold" style="font-size: 0.68rem; letter-spacing: 1.5px;">SANTUARIO SOMÁTICO • MARIE ARCHITECTURE</span>
                <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #FFF; margin: 3px 0 0 0; font-weight: 800;">
                  El Mapa Somático Corporal Interactivo
                </h3>
              </div>
            </div>
            
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 0.78rem; color: #C59A28; font-family: 'Cinzel', serif;">HISTORIAL:</span>
              <button class="btn-jaguar ${this.evolutionRange === 7 ? 'btn-gold-chrome' : 'btn-secondary-dark'}" style="font-size: 0.75rem; padding: 5px 12px;" onclick="santuarioSomatico.setEvolutionRange(7)">7 Días</button>
              <button class="btn-jaguar ${this.evolutionRange === 30 ? 'btn-gold-chrome' : 'btn-secondary-dark'}" style="font-size: 0.75rem; padding: 5px 12px;" onclick="santuarioSomatico.setEvolutionRange(30)">30 Días</button>
            </div>
          </div>

          <!-- GRID PRINCIPAL: SILUETA ANATÓMICA (IZQ) + INSPECTOR DE ZONA & REGISTRO (DER) -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px; align-items: start;">
            
            <!-- COLUMNA IZQUIERDA: SILUETA SVG INTERACTIVA + BOTONES DE ZONA -->
            <div style="background: rgba(0, 0, 0, 0.45); border: 1.5px solid rgba(197, 154, 40, 0.25); border-radius: 12px; padding: 18px; text-align: center;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 0.75rem; color: #C59A28; font-weight: 700; text-transform: uppercase; font-family: 'Cinzel', serif;">
                  Silueta & Mapa de Calor
                </span>
                <span style="font-size: 0.72rem; color: #94A3B8;">
                  ${totalEntries} registros en ${this.evolutionRange}d
                </span>
              </div>

              <!-- SVG DEL CUERPO HUMANO INTERACTIVO -->
              <div style="position: relative; max-width: 260px; margin: 0 auto;">
                <svg viewBox="0 0 200 410" style="width: 100%; height: auto; max-height: 380px; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.8));">
                  <!-- Brazos estéticos de unión -->
                  <path d="M54 104 Q38 170 34 230 M146 104 Q162 170 166 230" fill="none" stroke="rgba(197, 154, 40, 0.25)" stroke-width="7" stroke-linecap="round" />
                  
                  ${ZONE_IDS.map(z => {
                    const h = heat[z];
                    const isSelected = this.selectedZone === z;
                    const fill = h ? SENSATIONS[h.top]?.color || BASE_FILL : BASE_FILL;
                    const opacity = h ? 0.45 + (Math.min(h.avg, 4) / 4) * 0.5 : 0.85;
                    const strokeColor = isSelected ? '#F4E5B2' : (h ? fill : '#523824');
                    const strokeWidth = isSelected ? 3.5 : 1.5;
                    const filterGlow = isSelected ? 'drop-shadow(0 0 8px #C59A28)' : 'none';

                    return `
                      <g class="bodymap-svg-zone" 
                         style="cursor: pointer; fill: ${fill}; fill-opacity: ${opacity}; stroke: ${strokeColor}; stroke-width: ${strokeWidth}; filter: ${filterGlow}; transition: all 0.25s ease;"
                         onclick="santuarioSomatico.selectZone('${z}')">
                        ${ZONE_DATA[z].shape}
                      </g>
                    `;
                  }).join('')}
                </svg>
              </div>

              <!-- BOTONES DE ACCESO RÁPIDO A ZONAS -->
              <div style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 16px;">
                ${ZONE_IDS.map(z => {
                  const isSel = this.selectedZone === z;
                  const h = heat[z];
                  return `
                    <button class="btn-jaguar ${isSel ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                            style="font-size: 0.72rem; padding: 5px 10px; ${isSel ? 'color: #0E0905; font-weight: 800;' : ''}"
                            onclick="santuarioSomatico.selectZone('${z}')">
                      ${h ? (SENSATIONS[h.top]?.emoji || '•') : ''} ${ZONE_DATA[z].name.split('&')[0]}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- COLUMNA DERECHA: REGISTRO DE SENSACIONES, INTENSIDAD & PRÁCTICA SOMÁTICA -->
            <div style="background: rgba(0, 0, 0, 0.45); border: 1.5px solid rgba(197, 154, 40, 0.25); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
              
              <!-- TÍTULO DE LA ZONA SELECCIONADA -->
              <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.7rem; color: #C59A28; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    ZONA ACTIVA
                  </span>
                  <span id="bodymap-save-toast" style="display: none; color: #34D399; font-size: 0.75rem; font-weight: 700; align-items: center; gap: 4px;">
                    ✓ Registrado con éxito (+25 XP)
                  </span>
                </div>
                <h4 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #FFF; margin: 4px 0 0 0; font-weight: 800;">
                  ${zoneInfo.name}
                </h4>
              </div>

              <!-- PREGUNTA REFLEXIVA ESTOICA (HEREDADA DE MARIE) -->
              <div style="background: rgba(155, 44, 59, 0.12); border-left: 3px solid #C53D52; padding: 10px 14px; border-radius: 0 8px 8px 0;">
                <span style="font-size: 0.68rem; color: #F4E5B2; font-weight: 700; text-transform: uppercase; font-family: 'Cinzel', serif;">
                  🏛️ Pregunta de Indagación Somática:
                </span>
                <p style="font-size: 0.86rem; color: #FFF; margin: 4px 0 0 0; font-style: italic; line-height: 1.4;">
                  "${zoneInfo.question}"
                </p>
              </div>

              <!-- MICRO-PRÁCTICA SOMÁTICA & BREATH GUIDE -->
              <div style="background: rgba(30, 58, 95, 0.18); border-left: 3px solid #60A5FA; padding: 10px 14px; border-radius: 0 8px 8px 0;">
                <span style="font-size: 0.68rem; color: #93C5FD; font-weight: 700; text-transform: uppercase; font-family: 'Cinzel', serif;">
                  🌊 Micro-Ejercicio de Regulación Vagal:
                </span>
                <p style="font-size: 0.82rem; color: #E2E8F0; margin: 4px 0 8px 0; line-height: 1.4;">
                  ${zoneInfo.practice}
                </p>
                <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
                  <button id="soma-mini-breath-btn" class="btn-jaguar btn-secondary-dark" style="font-size: 0.75rem; padding: 4px 10px;" onclick="santuarioSomatico.toggleBreathGuide()">
                    ▶️ Iniciar Respiración Guiada
                  </button>
                  <div id="soma-mini-breath-ring" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #C59A28; display: flex; align-items: center; justify-content: center; transition: all 3.8s ease-in-out;">
                  </div>
                  <span id="soma-mini-breath-text" style="font-size: 0.75rem; color: #F4E5B2; font-weight: bold;">Listo</span>
                </div>
              </div>

              <!-- SELECTOR MULTI-SENSACIÓN (CHIPS CON COLOR) -->
              <div>
                <label style="font-size: 0.75rem; color: #C59A28; font-weight: 700; display: block; margin-bottom: 8px; font-family: 'Cinzel', serif;">
                  ¿Qué sientes en esta zona? (Selecciona una o más):
                </label>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${Object.entries(SENSATIONS).map(([key, item]) => {
                    const isSelected = this.selectedSensations.includes(key);
                    return `
                      <button class="btn-jaguar" 
                              style="font-size: 0.74rem; padding: 5px 10px; border-radius: 20px; border: 1px solid ${isSelected ? item.color : 'rgba(255,255,255,0.12)'}; background: ${isSelected ? item.color : 'rgba(255,255,255,0.03)'}; color: ${isSelected ? '#FFF' : '#CBD5E1'}; font-weight: ${isSelected ? '800' : '500'};"
                              onclick="santuarioSomatico.toggleSensation('${key}')">
                        ${item.emoji} ${item.label}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- SLIDER DE INTENSIDAD -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <label style="font-size: 0.75rem; color: #C59A28; font-weight: 700; font-family: 'Cinzel', serif;">
                    Intensidad de la Sensación:
                  </label>
                  <span style="font-size: 0.78rem; color: #FFF; font-weight: 700;">
                    ${INTENSITY_LEVELS[this.currentIntensity]} (${this.currentIntensity + 1}/5)
                  </span>
                </div>
                <input type="range" min="0" max="4" step="1" value="${this.currentIntensity}" 
                       style="width: 100%; accent-color: #C59A28; cursor: pointer;"
                       oninput="santuarioSomatico.setIntensity(this.value)">
              </div>

              <!-- NOTA LIBRE SOMÁTICA -->
              <div>
                <label style="font-size: 0.75rem; color: #CBD5E1; font-weight: 600; display: block; margin-bottom: 4px;">
                  Nota o pensamiento asociado:
                </label>
                <textarea id="soma-note-input" class="kcd-task-input" rows="2" 
                          placeholder="Ej: Nudo en garganta antes de la presentación, o pesadez tras entrenar..."
                          style="width: 100%; font-size: 0.82rem; padding: 8px; border-radius: 6px;"
                          oninput="santuarioSomatico.currentNote = this.value">${this.currentNote}</textarea>
              </div>

              <!-- BOTÓN GUARDAR -->
              <div style="display: flex; justify-content: flex-end; gap: 10px; align-items: center;">
                <button class="btn-jaguar btn-gold-chrome" 
                        style="color: #0E0905; font-weight: 900; padding: 10px 22px; font-size: 0.85rem;"
                        onclick="santuarioSomatico.saveEntry()">
                  ✨ Guardar en el Mapa Somático (+25 XP)
                </button>
              </div>

            </div>

          </div>

          <!-- HISTORIAL DETALLADO DE LA ZONA SELECCIONADA -->
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(197,154,40,0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h5 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFF; margin: 0;">
                📜 Historial Reciente en: ${zoneInfo.name}
              </h5>
              <span style="font-size: 0.72rem; color: #94A3B8;">${zoneEntries.length} registros</span>
            </div>

            ${zoneEntries.length === 0 ? `
              <p style="font-size: 0.8rem; color: #94A3B8; font-style: italic; margin: 0;">
                No hay registros previos en esta zona. Guarda tu primera observación para comenzar a tejer el mapa de calor.
              </p>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px;">
                ${zoneEntries.slice(0, 4).map(e => {
                  const d = new Date(e.at);
                  const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                  return `
                    <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 6px;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.7rem; color: #C59A28; font-weight: 700;">${dateStr}</span>
                        <button onclick="santuarioSomatico.deleteEntry('${e.id}')" style="background: none; border: none; color: #EF4444; font-size: 0.8rem; cursor: pointer;" title="Eliminar registro">✕</button>
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${(e.sensations || []).map(s => `
                          <span style="background: ${SENSATIONS[s]?.color || '#888'}; color: #FFF; font-size: 0.65rem; padding: 1px 6px; border-radius: 4px; font-weight: 700;">
                            ${SENSATIONS[s]?.label || s}
                          </span>
                        `).join('')}
                        <span style="font-size: 0.68rem; color: #94A3B8;">• ${INTENSITY_LEVELS[e.intensity] || ''}</span>
                      </div>
                      ${e.note ? `<p style="font-size: 0.76rem; color: #E2E8F0; margin: 2px 0 0 0; line-height: 1.3;">"${e.note}"</p>` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

        </div>
      `;
    }
  }

  window.santuarioSomatico = new SantuarioSomatico();

  document.addEventListener("DOMContentLoaded", function () {
    if (window.santuarioSomatico) {
      window.santuarioSomatico.render();
    }
  });
})();
