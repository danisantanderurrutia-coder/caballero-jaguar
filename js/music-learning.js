/* ==========================================================================
   JAGUAR ROSA - MÓDULO DE APRENDIZAJE MUSICAL & INSTRUMENTOS DE VIAJE
   Selección de Viento & Jazz: Trompeta, Saxofón, Armónica y Melódica
   Grilla 2x2 con Fotos de Perfil Unsplash & Ranking de Dificultad (1/10 Estrellas)
   ========================================================================== */

const TRAVEL_INSTRUMENTS_DATA = [
  {
    id: "trompeta",
    title: "🎺 Trompeta de Jazz & Bebop",
    subtitle: "Pocket Trumpet / Viento Metal",
    rank: 1,
    badge: "🥇 PUESTO 1 EN DIFICULTAD",
    difficultyScore: 9,
    difficultyStars: "⭐⭐⭐⭐⭐⭐⭐⭐⭐☆",
    difficultyLabel: "9/10 • Dificultad Muy Alta (Nivel Maestro)",
    portability: "⭐⭐⭐⭐ (Pocket Trumpet / Estuche compacto)",
    genres: "Jazz, Bebop, Hard Bop, Cool Jazz, Neo-Soul, Funk",
    bannerImg: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=85",
    profileImg: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=240&h=240&q=85",
    challengeText: "Embocadura de copa de metal estrecha, fatiga labial rápida y control de armónicos por tensión de labios.",
    whyCool: "El instrumento rey de Miles Davis, Chet Baker y Dizzy Gillespie. A diferencia de otros instrumentos, la trompeta solo tiene 3 pistones: el 80% del sonido, la afinación y el registro se generan puramente con la tensión de tus labios (embocadura/buzzing) y la presión de la columna de aire diafragmático.",
    lessons: [
      { step: "Paso 1: El Zumbido Labial (Buzzing)", text: "Junta los labios relajados pero firmes en las comisuras y expulsa aire haciendo 'buzz' continuo. Practica solo con la boquilla hasta sostener un tono afinado y estable durante 10 segundos." },
      { step: "Paso 2: Serie de Armónicos Naturales", text: "Sin presionar ningún pistón (posición 0), varía la velocidad del aire y la firmeza labial para producir Do4, Sol4 y Do5. El labio es la verdadera cuerda del instrumento." },
      { step: "Paso 3: Escala Pentatónica Menor de Blues en Bb", text: "Do (0) ➔ Mi♭ (1-3) ➔ Fa (1) ➔ Sol♭ (1-2-3) ➔ Sol (0) ➔ Si♭ (1). Toca notas largas con vibrato diafragmático." }
    ]
  },
  {
    id: "saxofon",
    title: "🎷 Saxofón Alto & Tenor",
    subtitle: "Saxo de Caña / Xaphoon de Viaje",
    rank: 2,
    badge: "🥈 PUESTO 2 EN DIFICULTAD",
    difficultyScore: 7,
    difficultyStars: "⭐⭐⭐⭐⭐⭐⭐☆☆☆",
    difficultyLabel: "7/10 • Dificultad Media-Alta (Intermedio Avanzado)",
    portability: "⭐⭐⭐ (Saxo estándar en maletín; versión Xaphoon cabe en mochila)",
    genres: "Jazz, Soul, Blues, Funk, Lofi Hip-Hop, Bossa Nova",
    bannerImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1000&q=85",
    profileImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=240&h=240&q=85",
    challengeText: "Ajuste milimétrico de la caña sobre la boquilla, embocadura sin morder y afinación en cambios de registro.",
    whyCool: "El alma expresiva de John Coltrane y Charlie Parker. La caña de madera natural vibra sola con el aire, pero lograr una afinación dulce y consistente (sin graznidos) y controlar el registro grave exige un oído bien entrenado y control de la embocadura.",
    lessons: [
      { step: "Paso 1: Embocadura de Caña Clásica", text: "Apoya los dientes superiores en la parte alta de la boquilla; enrolla el labio inferior ligeramente sobre los dientes inferiores como un cojín para sostener la caña. Presión lateral pareja como un anillo." },
      { step: "Paso 2: Digitación Inicial (Do, Si, La, Sol)", text: "Mano izquierda en las llaves superiores. Al levantar los dedos sucesivamente descubres la escala mayor natural, similar a una flauta dulce pero con la resonancia acústica del latón." },
      { step: "Paso 3: El Sonido 'Subtone' de Jazz Nocturno", text: "Baja levemente la mandíbula hacia la punta de la caña y sopla aire caliente y amplio. Obtendrás ese sonido aterciopelado y humoso característico de los clubes de jazz." }
    ]
  },
  {
    id: "armonica",
    title: "🎶 Armónica de Blues Diatónica",
    subtitle: "Blues Harp en C (10 Celdas)",
    rank: 3,
    badge: "🥉 PUESTO 3 EN DIFICULTAD",
    difficultyScore: 4,
    difficultyStars: "⭐⭐⭐⭐☆☆☆☆☆☆",
    difficultyLabel: "4/10 • Dificultad Principiante-Media (Accesible)",
    portability: "⭐⭐⭐⭐⭐ (Ultra-portátil, cabe en el bolsillo de tu chaqueta)",
    genres: "Delta Blues, Chicago Blues, Folk, Rock acústico, Country",
    bannerImg: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=85",
    profileImg: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=240&h=240&q=85",
    challengeText: "Aislar celdas individuales limpias y dominar el 'bending' (doblar notas con la lengua y cavidad bucal).",
    whyCool: "Es el instrumento de viaje definitivo. Puedes llevarlo en la chaqueta a cualquier parte del mundo. Sin conocimientos previos puedes hacer melodías expresivas y ritmos de tren en cuestión de horas. En Hip-Hop y Lofi le da una textura analógica nostálgica y profunda.",
    lessons: [
      { step: "Paso 1: Agarre & Respiración Diafragmática", text: "Sostén la armónica con la mano izquierda formando una caja de resonancia con la derecha. Respira con calma desde el diafragma, sin soplar con fuerza bruta." },
      { step: "Paso 2: Embocadura de Celda Única", text: "Aísla el orificio 4 (Do). Sopla para sonar Do y aspira para sonar Re. Practica sonar una sola nota limpia sin rozar las adyacentes." },
      { step: "Paso 3: Escala Pentatónica de Blues (Cross Harp en Sol)", text: "Orificio 2 aspirado (Sol), 3 aspirado con bend (Si♭), 4 soplado (Do), 4 aspirado (Re), 5 soplado (Mi), 6 soplado (Sol)." }
    ]
  },
  {
    id: "melodica",
    title: "🎹 Melódica de Aire (32 Teclas)",
    subtitle: "Teclado de Lengüetas & Soplo",
    rank: 4,
    badge: "🏅 PUESTO 4 EN DIFICULTAD",
    difficultyScore: 2,
    difficultyStars: "⭐⭐☆☆☆☆☆☆☆☆",
    difficultyLabel: "2/10 • Dificultad Muy Fácil (Entrada Inmediata)",
    portability: "⭐⭐⭐⭐ (Ligera, sin cables, amplificadores ni baterías)",
    genres: "Jazz Melancólico, Christian Löffler Style, Dub, Reggae, Ambient",
    bannerImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=85",
    profileImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=240&h=240&q=85",
    challengeText: "Dosificar la presión del aire para que los acordes de 3 notas no pierdan volumen ni afinación.",
    whyCool: "Afinación instantánea de piano con la calidez y dinámica del soplo humano. No requiere electricidad ni afinación previa. Su tono melancólico es perfecto para música ambient minimalista y solos expresivos.",
    lessons: [
      { step: "Paso 1: Control de Presión & Dinámica de Aire", text: "Modula la intensidad del soplido para controlar volumen, crescendos y vibrato natural con la lengua o labios." },
      { step: "Paso 2: Acordes de 7ma en Teclado", text: "Presiona Do - Mi - Sol - Si♭ para formar un acorde C7 instantáneo con sonoridad de jazz antiguo." }
    ]
  }
];

const MUSIC_PRACTICE_STORAGE_KEY = "JAGUAR_ROSA_MUSIC_PRACTICE_V1";
let musicPracticeLog = [];

function loadMusicPracticeState() {
  const saved = localStorage.getItem(MUSIC_PRACTICE_STORAGE_KEY);
  if (saved) {
    try { musicPracticeLog = JSON.parse(saved) || []; } catch (e) {}
  }
}

function saveMusicPracticeState() {
  localStorage.setItem(MUSIC_PRACTICE_STORAGE_KEY, JSON.stringify(musicPracticeLog));
}

function renderMusicLearningTab() {
  const container = document.getElementById("music-instruments-container");
  if (!container) return;

  // Ordenar instrumentos por dificultad de mayor a menor para el ranking
  const sortedByDifficulty = [...TRAVEL_INSTRUMENTS_DATA].sort((a, b) => b.difficultyScore - a.difficultyScore);

  // Generar HTML del Ranking de Dificultad (1/10 estrellas)
  const rankingHTML = sortedByDifficulty.map((inst) => {
    let medal = inst.rank === 1 ? "🥇" : inst.rank === 2 ? "🥈" : inst.rank === 3 ? "🥉" : "🏅";
    let badgeColor = inst.difficultyScore >= 8 ? "badge-pink" : inst.difficultyScore >= 6 ? "badge-gold" : inst.difficultyScore >= 4 ? "badge-cyan" : "badge-emerald";
    let barColor = inst.difficultyScore >= 8 ? "linear-gradient(90deg, #FF007F, #FF5E00)" : inst.difficultyScore >= 6 ? "linear-gradient(90deg, #C5A059, #F4C430)" : inst.difficultyScore >= 4 ? "linear-gradient(90deg, #00F0FF, #00A3FF)" : "linear-gradient(90deg, #34D399, #10B981)";

    return `
      <div style="background: rgba(14,20,28,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 12px 18px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.4rem;">${medal}</span>
            <img src="${inst.profileImg}" alt="${inst.title}" style="width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--imperial-gold); object-fit: cover;">
            <div>
              <strong style="color: #FFF; font-size: 1.02rem; font-family: 'Cinzel', serif;">${inst.title}</strong>
              <div style="font-size: 0.76rem; color: var(--text-dim);">${inst.challengeText}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.95rem; color: var(--neon-gold); font-weight: 800; letter-spacing: 1px;">
              ${inst.difficultyStars} <span style="font-size: 0.88rem; color: #FFF;">(${inst.difficultyScore}/10)</span>
            </div>
            <span class="badge-tag ${badgeColor}" style="font-size: 0.70rem; margin-top: 2px;">
              ${inst.difficultyLabel.split('•')[1]?.trim() || inst.difficultyLabel}
            </span>
          </div>
        </div>

        <!-- Barra visual de dificultad 1 a 10 -->
        <div style="width: 100%; background: rgba(255,255,255,0.06); height: 7px; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: ${inst.difficultyScore * 10}%; height: 100%; background: ${barColor}; border-radius: 4px;"></div>
        </div>
      </div>
    `;
  }).join("");

  // Generar HTML de la GRILLA DE 2x2 para los 4 instrumentos con Fotos de Perfil Unsplash
  const instrumentsGrid2x2HTML = sortedByDifficulty.map(inst => {
    let badgeColor = inst.difficultyScore >= 8 ? "badge-pink" : inst.difficultyScore >= 6 ? "badge-gold" : inst.difficultyScore >= 4 ? "badge-cyan" : "badge-emerald";
    
    return `
      <div class="jaguar-card instrument-card-2x2" style="overflow: hidden; padding: 0; border: 1.5px solid var(--border-gold); background: linear-gradient(145deg, rgba(23,30,40,0.95) 0%, rgba(14,20,28,0.98) 100%); display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 25px rgba(0,0,0,0.6); transition: transform 0.3s ease, border-color 0.3s ease;">
        
        <div>
          <!-- COVER / BANNER DE UNSPLASH -->
          <div style="height: 180px; width: 100%; overflow: hidden; position: relative; border-bottom: 2px solid var(--border-gold);">
            <img src="${inst.bannerImg}" alt="${inst.title}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) contrast(1.15); transition: transform 0.4s ease;" class="instrument-banner-img">
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(14,20,28,0.95) 0%, rgba(14,20,28,0.2) 60%, transparent 100%);"></div>
          </div>

          <!-- FILA DE FOTO DE PERFIL DE UNSPLASH & TÍTULO -->
          <div style="position: relative; padding: 0 18px; display: flex; justify-content: space-between; align-items: flex-end; margin-top: -38px; margin-bottom: 12px; z-index: 2;">
            <div style="display: flex; align-items: flex-end; gap: 12px;">
              <!-- FOTO DE PERFIL CIRCULAR UNSPLASH -->
              <div style="width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 2.5px solid var(--imperial-gold); box-shadow: 0 4px 18px rgba(0,0,0,0.8); background: #0B0E14; flex-shrink: 0;">
                <img src="${inst.profileImg}" alt="Perfil ${inst.title}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div>
                <span class="badge-tag ${badgeColor}" style="font-size: 0.68rem; font-weight: 800; letter-spacing: 0.5px;">${inst.badge}</span>
                <h3 style="margin: 4px 0 0 0; font-family: 'Cinzel', serif; font-size: 1.18rem; color: #FFF; line-height: 1.2;">${inst.title}</h3>
                <span style="font-size: 0.74rem; color: var(--imperial-gold-light); font-weight: 600;">${inst.subtitle}</span>
              </div>
            </div>

            <!-- ESTRELLAS DE DIFICULTAD -->
            <div style="text-align: right;">
              <div style="font-size: 0.95rem; color: var(--neon-gold); font-weight: 900; letter-spacing: 1px;">
                ${inst.difficultyStars}
              </div>
              <div style="font-size: 0.75rem; color: #FFF; font-weight: 800;">${inst.difficultyScore}/10</div>
            </div>
          </div>

          <!-- CUERPO DE LA TARJETA -->
          <div style="padding: 0 18px 16px 18px;">
            
            <!-- METADATOS TÉCNICOS -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; background: rgba(7,3,18,0.6); padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); font-size: 0.78rem;">
              <div><strong style="color: var(--neon-cyan);">Nivel:</strong> ${inst.difficultyLabel.split('•')[1]?.trim()}</div>
              <div><strong style="color: var(--neon-gold);">Portabilidad:</strong> ${inst.portability.split('(')[0].trim()}</div>
            </div>

            <p style="font-size: 0.85rem; color: var(--parchment-warm); line-height: 1.55; margin-bottom: 14px;">
              ${inst.whyCool}
            </p>

            <!-- CALLOUT DEL RETO TÉCNICO -->
            <div style="background: rgba(255,255,255,0.03); border-left: 3px solid var(--imperial-gold); padding: 8px 12px; border-radius: var(--radius-xs); margin-bottom: 14px; font-size: 0.80rem; color: var(--text-dim);">
              <strong style="color: var(--imperial-gold-light);">Desafío Clave:</strong> ${inst.challengeText}
            </div>

            <!-- LECCIONES DEL INSTRUMENTO -->
            <div style="background: rgba(197, 160, 89, 0.05); border: 1px dashed var(--border-gold); padding: 12px 14px; border-radius: var(--radius-md);">
              <h4 style="font-size: 0.88rem; color: var(--imperial-gold-light); margin: 0 0 8px 0; font-family: 'Cinzel', serif;">
                🎓 Fundamentos & Lecciones
              </h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${inst.lessons.map(l => `
                  <div>
                    <strong style="color: #FFF; font-size: 0.82rem;">${l.step}</strong>
                    <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 2px; line-height: 1.45;">${l.text}</div>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>
        </div>

        <div style="padding: 0 18px 16px 18px;">
          <button class="btn-jaguar btn-sm btn-gold-chrome" style="width: 100%; color: #000; font-weight: 800; font-size: 0.78rem; padding: 7px 0;" onclick="selectPracticeInstrument('${inst.title}')">
            🎵 Practicar ${inst.title.split(' ')[1]} Hoy (+15 XP)
          </button>
        </div>

      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- BANNER DE ENCABEZADO -->
      <div class="jaguar-card card-highlight" style="border-color: var(--imperial-gold); background: linear-gradient(135deg, rgba(23,30,40,0.98) 0%, rgba(11,14,20,0.99) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge-tag badge-gold">🎵 CÁMARA MUSICAL & VIENTO</span>
            <span class="badge-tag badge-cyan">Jazz & Blues • Grilla 2x2</span>
          </div>
          <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="openBitacorasModal();" style="color: #0E0905; font-weight: 800;">
            📜 Abrir Códice de Bitácoras
          </button>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.85rem; color: #FFF; margin: 0 0 6px 0;">
          Laboratorio Musical & Instrumentos Portátiles de Viaje
        </h2>
        <p style="color: var(--parchment-warm); font-size: 0.95rem; line-height: 1.6; margin: 0; max-width: 860px;">
          Cuatro instrumentos legendarios de viento y acústica de viaje: <strong>Trompeta de Jazz, Saxofón, Armónica Blues y Melódica de Aire</strong>, presentados en formato grilla 2x2 con fotos de perfil de alta calidad y ranking técnico de dificultad (1/10 estrellas).
        </p>
      </div>

      <!-- SECCIÓN: RANKING DE DIFICULTAD (ESTRELLAS 1/10) -->
      <div class="jaguar-card" style="border-color: var(--border-gold);">
        <div class="card-title-bar">
          <div>
            <span class="badge-tag badge-gold">🏆 ESCALAFÓN TÉCNICO</span>
            <h3 class="card-title" style="margin-top: 4px; font-size: 1.35rem;">
              Ranking de Dificultad de los Instrumentos (1/10 Estrellas)
            </h3>
          </div>
          <span class="badge-tag badge-cyan">Desde Nivel Maestro hasta Entrada Inmediata</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">
          Evaluación técnica basada en exigencia de embocadura (buzzing/caña), control de columna de aire diafragmático, afinación acústica y tiempo de práctica requerido para un sonido limpio:
        </p>

        <!-- LISTA DEL RANKING -->
        <div>
          ${rankingHTML}
        </div>
      </div>

      <!-- SECCIÓN: GRILLA DE 2x2 DE INSTRUMENTOS -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #FFF; margin: 0;">
            🎺 Grilla 2x2 de Instrumentos & Fotos de Perfil
          </h3>
          <span class="badge-tag badge-gold" style="font-size: 0.76rem;">4 Instrumentos de Viaje</span>
        </div>

        <!-- CONTENEDOR GRID 2X2 -->
        <div class="instruments-grid-2x2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          ${instrumentsGrid2x2HTML}
        </div>
      </div>

      <!-- REGISTRO DE PRÁCTICA MUSICAL -->
      <div class="jaguar-card" style="border-color: var(--neon-cyan);">
        <div class="card-title-bar">
          <h3 class="card-title">⏱️ Registro de Práctica Diario (15-20 Minutos)</h3>
          <span class="badge-tag badge-cyan">Constancia de Caballero</span>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr 2fr auto; gap: 10px; margin-bottom: 14px;" class="music-form-responsive">
          <select id="music-practice-inst" class="input-jaguar">
            <option value="Trompeta de Jazz (9/10)">🎺 Trompeta de Jazz (9/10)</option>
            <option value="Saxofón Alto/Tenor (7/10)">🎷 Saxofón Alto/Tenor (7/10)</option>
            <option value="Armónica de Blues (4/10)">🎶 Armónica de Blues (4/10)</option>
            <option value="Melódica de Aire (2/10)">🎹 Melódica de Aire (2/10)</option>
          </select>
          <input type="number" id="music-practice-time" class="input-jaguar" placeholder="Minutos" value="15" min="1" max="180">
          <input type="text" id="music-practice-notes" class="input-jaguar" placeholder="¿Qué escala, tema o embocadura practicaste?">
          <button class="btn-jaguar btn-gold-chrome" style="color: #000; font-weight: 800;" onclick="logMusicPractice()">Registrar Práctica</button>
        </div>

        <div id="music-practice-log-list"></div>
      </div>

    </div>
  `;

  renderMusicPracticeLog();
}

function selectPracticeInstrument(instTitle) {
  const select = document.getElementById("music-practice-inst");
  if (select) {
    for (let opt of select.options) {
      if (instTitle.includes("Trompeta") && opt.value.includes("Trompeta")) opt.selected = true;
      else if (instTitle.includes("Saxofón") && opt.value.includes("Saxofón")) opt.selected = true;
      else if (instTitle.includes("Armónica") && opt.value.includes("Armónica")) opt.selected = true;
      else if (instTitle.includes("Melódica") && opt.value.includes("Melódica")) opt.selected = true;
    }
    select.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (typeof showNotification === "function") {
      showNotification(`Listo para registrar sesión de ${instTitle.split('(')[0].trim()}.`);
    }
  }
}

function logMusicPractice() {
  const inst = document.getElementById("music-practice-inst")?.value.trim();
  const time = document.getElementById("music-practice-time")?.value || 15;
  const notes = document.getElementById("music-practice-notes")?.value.trim();

  if (!inst) return;

  musicPracticeLog.unshift({
    date: new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    inst,
    time,
    notes: notes || "Sesión de embocadura, afinación y ritmo"
  });

  if (document.getElementById("music-practice-notes")) {
    document.getElementById("music-practice-notes").value = "";
  }

  saveMusicPracticeState();
  renderMusicPracticeLog();
  if (typeof showNotification === "function") {
    showNotification(`¡Gran trabajo! Práctica de ${inst.split('(')[0].trim()} registrada (+15 XP).`);
  }
}

function renderMusicPracticeLog() {
  const list = document.getElementById("music-practice-log-list");
  if (!list) return;

  if (musicPracticeLog.length === 0) {
    list.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-dim); font-style: italic;">No has registrado sesiones de práctica hoy. ¡Inicia con 15 minutos diarios de embocadura o escalas!</div>`;
    return;
  }

  list.innerHTML = musicPracticeLog.map(m => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(7,3,18,0.7); border: 1px solid var(--border-glass); border-radius: var(--radius-md); margin-bottom: 8px;">
      <div>
        <strong style="color: var(--imperial-gold-light);">${m.inst}</strong>
        <span style="font-size: 0.8rem; color: var(--text-dim); margin-left: 8px;">(${m.time} min) - ${m.notes}</span>
      </div>
      <span style="font-size: 0.75rem; color: var(--text-dim);">${m.date}</span>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadMusicPracticeState();
  renderMusicLearningTab();
});
