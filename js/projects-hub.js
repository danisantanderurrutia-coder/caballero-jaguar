/* ==========================================================================
   JAGUAR ROSA - HUB DE PROYECTOS DE VIDA & DESARROLLO INTEGRAL COMO PERSONA
   Manejo de Gantt, Checklists Dinámicos, Etapas, Subproyectos e Imágenes
   ========================================================================== */

const PROJECTS_HUB_STORAGE_KEY = "JAGUAR_ROSA_PROJECTS_HUB_V1";

let projectsData = {
  lauwersmeer: {
    id: "lauwersmeer",
    title: "🌊 Climate Risk en Lauwersmeer",
    subtitle: "Artículo científico sobre evaluación y modelación de riesgo climático costero",
    collaborators: "Co-autoría con 2 colegas investigadores",
    category: "Investigación Científica",
    bannerImg: "assets/img_lauwersmeer_coastal.jpg",
    desc: "Estudio de evaluación de vulnerabilidad, eventos de inundación extrema y modelación de ascenso del nivel del mar en la cuenca y ecosistema de Lauwersmeer (Países Bajos).",
    gantt: [
      { id: "g1", stage: "Recopilación de Datos Hidrológicos", startDate: "2026-05-01", endDate: "2026-06-30", progress: 100, status: "Completado" },
      { id: "g2", stage: "Modelación de Riesgo & Escenarios", startDate: "2026-07-01", endDate: "2026-09-15", progress: 75, status: "En Ejecución" },
      { id: "g3", stage: "Redacción del Borrador con Co-autores", startDate: "2026-09-16", endDate: "2026-11-01", progress: 30, status: "Planificación" },
      { id: "g4", stage: "Revisión por Pares & Envío a Journal", startDate: "2026-11-02", endDate: "2026-12-31", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Consolidar base de datos climáticos de Lauwersmeer (1990-2025)", completed: true },
      { id: "chk2", text: "Ejecutar simulaciones de eventos de marejada de tempestad", completed: true },
      { id: "chk3", text: "Reunión de coordinación con los 2 colegas co-autores", completed: false },
      { id: "chk4", text: "Escribir la sección de Métodos y Discusión del artículo", completed: false }
    ],
    notes: "Paper enfocado en resiliencia costera. Integración con modelos de elevación digital y simulaciones de marejadas."
  },

  rewild: {
    id: "rewild",
    title: "🔥 ReWild: Libro de Incendios & Modelo Forestal",
    subtitle: "Libro de análisis ecológico y propuesta de reconversión del monocultivo forestal",
    collaborators: "Red por la Superación del Modelo Forestal + 2 Autores Co-editores Principales + Múltiples Autores Colaboradores",
    category: "Ecología & Transición Territorial",
    bannerImg: "assets/img_rewild_forest.jpg",
    desc: "Preparación y edición colectiva de obra crítica y propositiva sobre incendios forestales en Chile, restauración ecológica de bosques nativos y superación del modelo de sustitución forestal.",
    subprojectApp: {
      title: "🌲 Subproyecto: App para ReWild de Bosques",
      desc: "Plataforma digital para la restauración ecológica participativa, monitoreo comunal de parches nativos, prevención comunitaria de incendios y mapas de cuencas de agua."
    },
    gantt: [
      { id: "g1", stage: "Convocatoria y Recepción de Capítulos", startDate: "2026-03-01", endDate: "2026-06-15", progress: 100, status: "Completado" },
      { id: "g2", stage: "Co-edición con la Red & Co-autores", startDate: "2026-06-16", endDate: "2026-09-30", progress: 65, status: "En Ejecución" },
      { id: "g3", stage: "Diseño & Prototipo App ReWild de Bosques", startDate: "2026-08-01", endDate: "2026-11-15", progress: 40, status: "En Ejecución" },
      { id: "g4", stage: "Diagramación, Impresión & Lanzamiento", startDate: "2026-10-01", endDate: "2026-12-20", progress: 10, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Revisar y editar capítulos de la Red por la Superación del Modelo Forestal", completed: true },
      { id: "chk2", text: "Redactar prólogo e introducción en conjunto con los 2 co-editores", completed: true },
      { id: "chk3", text: "Definir arquitectura de datos de la App ReWild (monitoreo de bosque nativo)", completed: false },
      { id: "chk4", text: "Diseñar mapas cartográficos de zonas afectadas por megaincendios", completed: false }
    ],
    notes: "ReWild aborda la restauración activa versus pasiva del matorral y bosque esclerófilo y templado."
  },

  incel: {
    id: "incel",
    title: "🤖 Proyecto INCEL: AI Influencers & YouTube Kids",
    subtitle: "Gestión de avatares IA y producción de contenidos educativos para niños",
    collaborators: "Equipo de Medios Digitales & Producción IA",
    category: "Inteligencia Artificial & Edutainment",
    bannerImg: "assets/img_incel_ai_influencer.jpg",
    desc: "Administración estratégica de influencers generadas mediante Inteligencia Artificial y producción canalizada de videos educativos pedagógicos de alta calidad para YouTube Infantil.",
    gantt: [
      { id: "g1", stage: "Modelado y Diseño de Personajes IA", startDate: "2026-06-01", endDate: "2026-07-15", progress: 100, status: "Completado" },
      { id: "g2", stage: "Guionizado de Serie YouTube Kids", startDate: "2026-07-16", endDate: "2026-09-01", progress: 80, status: "En Ejecución" },
      { id: "g3", stage: "Generación de Videos & Animación IA", startDate: "2026-08-15", endDate: "2026-10-30", progress: 50, status: "En Ejecución" },
      { id: "g4", stage: "Estrategia de Crecimiento & Monetización", startDate: "2026-10-01", endDate: "2026-12-31", progress: 20, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Generar biblia de avatares e identidades visuales de influencers IA", completed: true },
      { id: "chk2", text: "Escribir primeros 10 guiones sobre ciencia y naturaleza para niños", completed: true },
      { id: "chk3", text: "Renderizar pistas de voz y animación facial mediante difusores IA", completed: false },
      { id: "chk4", text: "Publicar y optimizar SEO de los primeros 5 episodios en YouTube Kids", completed: false }
    ],
    notes: "Combinación de contenido educativo riguroso con avatares atractivos e hiperrealistas."
  },

  piratas: {
    id: "piratas",
    title: "🏴‍☠️ Cómic de Piratas: Guerra del Pacífico & Leyendas del Mar",
    subtitle: "Cómic histórico-fantástico sobre la contienda naval y mitología del Pacífico Sur",
    collaborators: "Ilustradores, Historiadores & Guionistas",
    category: "Arte, Narrativa & Historia Naval",
    bannerImg: "assets/img_pirates_pacific.jpg",
    desc: "Creación de novela gráfica ambientada en el marco de la Guerra del Pacífico chilena, entrelazando batallas navales históricos, piratas del Pacífico sur y mitos náuticos de las costas chilenas.",
    gantt: [
      { id: "g1", stage: "Investigación Histórica & Mítica", startDate: "2026-04-01", endDate: "2026-06-01", progress: 100, status: "Completado" },
      { id: "g2", stage: "Guión Estructurado Tomo 1 (6 Capítulos)", startDate: "2026-06-02", endDate: "2026-08-30", progress: 90, status: "En Ejecución" },
      { id: "g3", stage: "Character Sheets & Storyboard", startDate: "2026-08-01", endDate: "2026-10-15", progress: 45, status: "En Ejecución" },
      { id: "g4", stage: "Entintado, Color & Maquetación Final", startDate: "2026-10-16", endDate: "2026-12-31", progress: 10, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Definir arco de personajes (corsarios, marinos y criaturas del mar)", completed: true },
      { id: "chk2", text: "Finalizar guión literario de los primeros 3 capítulos", completed: true },
      { id: "chk3", text: "Aprobar bocetos de embarcaciones navales históricas y seres fantásticos", completed: false },
      { id: "chk4", text: "Coordinar maquetación con la editorial o plataforma webcomic", completed: false }
    ],
    notes: "Enfoque en el choque entre realismo militar histórico y leyendas populares del mar de Chile."
  },

  divulgacion: {
    id: "divulgacion",
    title: "🎙️ Ciencia & Territorios",
    subtitle: "Plataforma de divulgación científica territorial y comunicación pública de la ciencia",
    collaborators: "Comunidades Locales, Científicos & Comunicadores",
    category: "Divulgación Científica & Comunicación Pública",
    bannerImg: "assets/img_ciencia_territorios.jpg",
    desc: "Iniciativa transmedia para acercar el conocimiento científico a las realidades territoriales chilenas mediante reportajes, podcasts, cápsulas para redes y cartografía socio-ambiental participativa.",
    gantt: [
      { id: "g1", stage: "Lanzamiento de Plataforma & Identidad", startDate: "2026-05-15", endDate: "2026-07-01", progress: 100, status: "Completado" },
      { id: "g2", stage: "Grabación de Temporada 1 de Podcast", startDate: "2026-07-02", endDate: "2026-09-30", progress: 70, status: "En Ejecución" },
      { id: "g3", stage: "Mapeo Participativo de Conflictos Ambientales", startDate: "2026-08-15", endDate: "2026-11-30", progress: 35, status: "En Ejecución" },
      { id: "g4", stage: "Talleres en Terreno con Comunidades", startDate: "2026-10-01", endDate: "2026-12-15", progress: 0, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Producir primeros 4 episodios del podcast Ciencia & Territorios", completed: true },
      { id: "chk2", text: "Publicar reportaje sobre biodiversidad y escasez hídrica local", completed: true },
      { id: "chk3", text: "Diseñar plataforma web para visualización de mapas socio-ecológicos", completed: false },
      { id: "chk4", text: "Gestión de alianzas con centros de investigación universitarios", completed: false }
    ],
    notes: "Conectar el conocimiento académico con los saberes y luchas de los territorios."
  },

  permacultura: {
    id: "permacultura",
    title: "🌱 Permacultura Online & Urrutia Agrotech",
    subtitle: "Emprendimiento agrotecnológico de base ecológica, IA, satélites, IoE y diseño predial",
    collaborators: "Productores Agrícolas, Ingenieros IoE & Ecólogos",
    category: "Agrotech & Ecología Aplicada",
    bannerImg: "assets/img_urrutia_agrotech.jpg",
    desc: "Plataforma integral de Permacultura Online combinada con el emprendimiento de base tecnológica Urrutia Agrotech para la transformación regenerativa del campo.",
    subsections: {
      agrotech: {
        name: "🚜 Urrutia Agrotech",
        desc: "Optimización inteligente de procesos agrícolas mediante la integración de Inteligencia Artificial (IA), datos satelitales multispectrales (NDVI, índices de humedad), Internet de las Cosas Agrícola (IoE / sensores de suelo) y principios profundos de ecología de suelos."
      },
      predios: {
        name: "📐 Diseño Ecológico de Predios",
        desc: "Planificación predial basada en escala de permanencia de Keyline (línea clave), zonificación permacultural (Zonas 0 a 5), cosecha e infiltración de agua de lluvia, y bosques comestibles (Food Forests)."
      }
    },
    gantt: [
      { id: "g1", stage: "Desarrollo del Algoritmo de IA Urrutia Agrotech", startDate: "2026-04-01", endDate: "2026-07-01", progress: 100, status: "Completado" },
      { id: "g2", stage: "Integración de Capas Satelitales (Sentinel/NDVI)", startDate: "2026-07-02", endDate: "2026-09-15", progress: 80, status: "En Ejecución" },
      { id: "g3", stage: "Despliegue de Nodos IoE en Predio Piloto", startDate: "2026-08-15", endDate: "2026-11-01", progress: 50, status: "En Ejecución" },
      { id: "g4", stage: "Curso Online de Diseño de Predios & Permacultura", startDate: "2026-10-01", endDate: "2026-12-31", progress: 15, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Probar modelo de IA para predicción de requerimientos hídricos de suelo", completed: true },
      { id: "chk2", text: "Diseñar plano maestro en Keyline para el primer predio cliente", completed: true },
      { id: "chk3", text: "Conectar API de imágenes satelitales al dashboard de Urrutia Agrotech", completed: false },
      { id: "chk4", text: "Lanzar plataforma de formación online en Permacultura", completed: false }
    ],
    notes: "Urrutia Agrotech une la precisión tecnológica del siglo XXI con la sabiduría de la permacultura."
  },

  paper_fisica: {
    id: "paper_fisica",
    title: "⚛️ Paper en Física & Sistemas Complejos",
    subtitle: "Investigación en termodinámica de no equilibrio o sistemas complejos (Eventual)",
    collaborators: "Investigación Autónoma & Asesores Físicos",
    category: "Investigación Científica (Eventual)",
    bannerImg: "assets/img_financial_balance.jpg",
    desc: "Exploración teórica rigurosa, modelación matemática y desarrollo de un paper de física aplicada a procesos territoriales o termodinámicos.",
    gantt: [
      { id: "g1", stage: "Revisión Bibliográfica & Pregunta de Investigación", startDate: "2026-10-01", endDate: "2026-12-01", progress: 0, status: "Planificación" },
      { id: "g2", stage: "Modelación Numérica & Simulaciones", startDate: "2026-12-02", endDate: "2027-03-01", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Definir marco conceptual y ecuaciones gobernantes", completed: false },
      { id: "chk2", text: "Compilar referencias de física estadística y sistemas no lineales", completed: false }
    ],
    notes: "Proyecto intelectual eventual para profundizar en ciencia dura."
  },

  red_maule: {
    id: "red_maule",
    title: "📰 Red de Noticias Maule",
    subtitle: "Plataforma de periodismo territorial independiente y comunitario (Eventual)",
    collaborators: "Periodistas Locales & Colectivos del Maule",
    category: "Periodismo Territorial (Eventual)",
    bannerImg: "assets/img_ciencia_territorios.jpg",
    desc: "Red de información ciudadana, fiscalización ambiental y crónicas territoriales para visibilizar la realidad del Maule.",
    gantt: [
      { id: "g1", stage: "Diseño Editorial & Alianzas Regionales", startDate: "2026-11-01", endDate: "2027-01-15", progress: 0, status: "Planificación" },
      { id: "g2", stage: "Lanzamiento del Boletín Digital Maule", startDate: "2027-01-16", endDate: "2027-04-01", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Mapear temas críticos: agua, salud, monocultivos y cultura maulina", completed: false },
      { id: "chk2", text: "Crear estructura de financiamiento ético y boletín semanal", completed: false }
    ],
    notes: "Medio comprometido con el territorio de origen."
  },

  manager_daniela: {
    id: "manager_daniela",
    title: "⭐ Manager & Editor de Daniela",
    subtitle: "Acompañamiento estratégico, edición de contenidos y gestión profesional (Eventual)",
    collaborators: "Daniela & Caballero Jaguar",
    category: "Gestión Estratégica & Creativa (Eventual)",
    bannerImg: "assets/img_incel_ai_influencer.jpg",
    desc: "Soporte integral en estrategia de marca, edición de video/audio, curaduría de piezas artísticas y gestión comercial de proyectos.",
    gantt: [
      { id: "g1", stage: "Estructuración de Estrategia & Calendario de Publicación", startDate: "2026-10-15", endDate: "2026-12-01", progress: 0, status: "Planificación" },
      { id: "g2", stage: "Pipeline de Producción & Edición Avanzada", startDate: "2026-12-02", endDate: "2027-03-01", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Configurar flujo de trabajo de edición y revisión de piezas", completed: false },
      { id: "chk2", text: "Planificar lanzamientos y presencia en plataformas", completed: false }
    ],
    notes: "Apoyo fraterno y profesional para potenciar sus dones."
  }
};

function loadProjectsHubData() {
  const saved = localStorage.getItem(PROJECTS_HUB_STORAGE_KEY);
  if (saved) {
    try {
      projectsData = Object.assign({}, projectsData, JSON.parse(saved));
    } catch (e) { console.error("Error al cargar datos de proyectos:", e); }
  }
}

function saveProjectsHubData() {
  localStorage.setItem(PROJECTS_HUB_STORAGE_KEY, JSON.stringify(projectsData));
}

// --- RENDERIZADO DE UN PROYECTO SELECCIONADO ---
let currentActiveProjectKey = "lauwersmeer";

function selectProjectView(projectKey) {
  currentActiveProjectKey = projectKey;
  const project = projectsData[projectKey];
  if (!project) return;

  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(t => t.classList.remove("active"));

  const projectView = document.getElementById("tab-project-detail");
  if (projectView) projectView.classList.add("active");

  renderProjectDetail();
}

function renderProjectDetail() {
  const p = projectsData[currentActiveProjectKey];
  const container = document.getElementById("project-detail-content");
  if (!container || !p) return;

  let ganttRowsHTML = p.gantt.map(g => `
    <div class="gantt-row">
      <div>
        <strong style="color: #FFF; font-size: 0.92rem;">${g.stage}</strong>
        <div style="font-size: 0.75rem; color: var(--text-muted);">📅 ${g.startDate} ➔ ${g.endDate}</div>
      </div>
      <div>
        <div class="gantt-bar-bg">
          <div class="gantt-bar-fill" style="width: ${g.progress}%;"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="badge-tag ${g.progress === 100 ? 'badge-emerald' : 'badge-gold'}">${g.progress}%</span>
      </div>
    </div>
  `).join("");

  let checklistHTML = p.checklist.map(c => `
    <div class="task-item ${c.completed ? 'completed' : ''}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="custom-checkbox ${c.completed ? 'checked' : ''}" onclick="toggleProjectTask('${p.id}', '${c.id}')">
          ${c.completed ? '✓' : ''}
        </div>
        <span style="font-weight: 600; color: #FFF;">${c.text}</span>
      </div>
      <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="deleteProjectTask('${p.id}', '${c.id}')">✕</button>
    </div>
  `).join("");

  let subprojectsHTML = "";
  if (p.subprojectApp) {
    subprojectsHTML = `
      <div class="jaguar-card card-highlight mb-14" style="border-color: var(--neon-pink); background: rgba(255, 0, 127, 0.08);">
        <h4 style="font-size: 1.1rem; color: var(--neon-pink-bright); font-weight: 800; margin-bottom: 6px;">${p.subprojectApp.title}</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">${p.subprojectApp.desc}</p>
      </div>
    `;
  } else if (p.subsections) {
    subprojectsHTML = `
      <div class="grid-2 mb-14">
        <div class="jaguar-card" style="border-color: var(--neon-cyan); background: rgba(0, 240, 255, 0.08);">
          <h4 style="font-size: 1.1rem; color: var(--neon-cyan); font-weight: 800; margin-bottom: 6px;">${p.subsections.agrotech.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${p.subsections.agrotech.desc}</p>
        </div>
        <div class="jaguar-card" style="border-color: var(--emerald-bright); background: rgba(52, 211, 153, 0.08);">
          <h4 style="font-size: 1.1rem; color: var(--emerald-bright); font-weight: 800; margin-bottom: 6px;">${p.subsections.predios.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${p.subsections.predios.desc}</p>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 22px;">
      
      <!-- HERO BANNER INSPIRACIONAL DE PROYECTO -->
      <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 380px; border: 2px solid var(--neon-pink); box-shadow: var(--shadow-rose);">
        <img src="${p.bannerImg}" alt="${p.title}" class="animated-jaguar-bg" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.68) contrast(1.1);">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 28px; background: linear-gradient(to top, rgba(7,3,18,0.96) 0%, rgba(7,3,18,0.4) 65%, transparent 100%);">
          <div class="flex-between mb-14" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge-tag badge-pink" style="font-size: 0.85rem;">${p.category}</span>
            <span class="badge-tag badge-cyan" style="font-size: 0.85rem;">👥 ${p.collaborators}</span>
          </div>
          <h2 class="title-rose-neon" style="font-size: 2.3rem; margin-bottom: 6px; text-shadow: 0 0 25px rgba(255, 0, 127, 0.6);">${p.title}</h2>
          <h4 style="font-size: 1.15rem; color: var(--neon-cyan); font-weight: 700;">${p.subtitle}</h4>
        </div>
      </div>

      <div class="jaguar-card">
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${p.desc}</p>
      </div>

      ${subprojectsHTML}

      <!-- Carta Gantt del Proyecto -->
      <div class="jaguar-card">
        <div class="card-title-bar">
          <h3 class="card-title">📊 Cronograma & Carta Gantt de Etapas</h3>
          <span class="badge-tag badge-gold">Planificación Temporal</span>
        </div>
        <div class="gantt-container">
          ${ganttRowsHTML}
        </div>
      </div>

      <!-- Checklist Dinámico del Proyecto -->
      <div class="jaguar-card">
        <div class="card-title-bar">
          <h3 class="card-title">✅ Checklist Dinámico & Hitos de Proyecto</h3>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <input type="text" id="new-project-task-input" class="input-jaguar" placeholder="Añadir nueva tarea o hito a este proyecto...">
          <button class="btn-jaguar btn-primary-pink" onclick="addProjectTask('${p.id}')">Agregar Hito</button>
        </div>

        <div class="project-checklist">
          ${checklistHTML}
        </div>
      </div>

      <!-- Bitácora & Notas del Proyecto -->
      <div class="jaguar-card">
        <div class="card-title-bar">
          <h3 class="card-title">📝 Bitácora de Notas & Documentación</h3>
        </div>
        <textarea id="project-notes-input" class="input-jaguar" style="min-height: 100px;" onchange="saveProjectNotes('${p.id}')">${p.notes}</textarea>
      </div>
    </div>
  `;
}

function toggleProjectTask(projId, taskId) {
  const p = projectsData[projId];
  if (p) {
    const task = p.checklist.find(c => c.id === taskId);
    if (task) {
      task.completed = !task.completed;
      if (task.completed && typeof CaballeroScoringEngine !== 'undefined') {
        CaballeroScoringEngine.awardAction('exploracion', 'medio', `Hito: ${task.text} (${p.title})`);
      }
      saveProjectsHubData();
      renderProjectDetail();
    }
  }
}

function addProjectTask(projId) {
  const input = document.getElementById("new-project-task-input");
  if (!input || !input.value.trim()) return;

  const p = projectsData[projId];
  if (p) {
    p.checklist.push({
      id: "chk-" + Date.now(),
      text: input.value.trim(),
      completed: false
    });
    input.value = "";
    saveProjectsHubData();
    renderProjectDetail();
    showNotification("Hito añadido al proyecto.");
  }
}

function deleteProjectTask(projId, taskId) {
  const p = projectsData[projId];
  if (p) {
    p.checklist = p.checklist.filter(c => c.id !== taskId);
    saveProjectsHubData();
    renderProjectDetail();
  }
}

function saveProjectNotes(projId) {
  const textarea = document.getElementById("project-notes-input");
  if (textarea && projectsData[projId]) {
    projectsData[projId].notes = textarea.value;
    saveProjectsHubData();
    showNotification("Notas de bitácora guardadas.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjectsHubData();
});
