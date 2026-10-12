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
    title: "🎭 Los Manejadores (Agencia Digital & IA)",
    subtitle: "Conectamos talentos con el mundo · Arquitectura de presencia e influencers virtuales",
    collaborators: "Equipo de Medios Digitales, Producción IA & Storytelling",
    category: "Inteligencia Artificial & Media Agency",
    bannerImg: "assets/img_incel_ai_influencer.jpg",
    desc: "Agencia de comunicación digital y arquitectura de presencia web. Une precisión analítica europea con energía emprendedora americana para gestionar influencers virtuales generados por IA (Mateo, Alina, Freya, Julia, Laura), canales de YouTube (storytelling de ciencia, historia y entretenimiento) y asesorías comunicacionales estratégicas.",
    gantt: [
      { id: "g1", stage: "Modelado y Biblia de Personajes IA (Avatares)", startDate: "2026-06-01", endDate: "2026-07-15", progress: 100, status: "Completado" },
      { id: "g2", stage: "Pipeline de Producción & Storytelling YouTube", startDate: "2026-07-16", endDate: "2026-09-01", progress: 85, status: "En Ejecución" },
      { id: "g3", stage: "Landing Page Completa & Presencia en Redes", startDate: "2026-08-15", endDate: "2026-10-30", progress: 60, status: "En Ejecución" },
      { id: "g4", stage: "Pitch Deck de Inversores/Clientes & Scripts Comerciales", startDate: "2026-10-01", endDate: "2026-12-31", progress: 35, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Definir set de influencers digitales e identidades de marca", completed: true },
      { id: "chk2", text: "Producir primeros guiones y carruseles para redes sociales", completed: true },
      { id: "chk3", text: "Desarrollar landing page completa y conectar pipeline de difusión", completed: false },
      { id: "chk4", text: "Finalizar pitch deck de 10 diapositivas para inversores y clientes", completed: false }
    ],
    notes: "Los Manejadores democratiza el poder de la influencia auténtica: IA + storytelling + resultados medibles."
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
    title: "🌾 Chile Agrotech (Tecnología de Precisión)",
    subtitle: "Tecnología Agrícola de Precisión & Gemelo Digital (AgriTwin) — Maule, Chile",
    collaborators: "Productores Agrícolas del Maule, Ingenieros IoT & Especialistas ESG",
    category: "Agrotech, IoT & Inteligencia Satelital",
    bannerImg: "assets/img_urrutia_agrotech.jpg",
    desc: "Plataforma de ingeniería y tecnología agrícola de precisión para el campo chileno y la Región del Maule. Integra el gemelo digital AgriTwin, sensores de suelo IoT, analítica satelital multiespectral (Sentinel/NDVI, índices hídricos) y diseño regenerativo ReWild.",
    subsections: {
      agrotech: {
        name: "🚜 Chile Agrotech & AgriTwin",
        desc: "Optimización inteligente de procesos agrícolas en el Maule mediante gemelos digitales (AgriTwin), sensores de humedad de suelo IoT y análisis satelital multiespectral (NDVI, NDRE) para la máxima eficiencia hídrica y nutricional."
      },
      predios: {
        name: "📐 Diseño Regenerativo & ReWild",
        desc: "Planificación predial basada en escala de permanencia Keyline, cosecha e infiltración hídrica, restauración de suelo biológico y transición ecológica para huertos y viñas."
      }
    },
    gantt: [
      { id: "g1", stage: "Arquitectura de Plataforma AgroTech Chile (React + Vite)", startDate: "2026-04-01", endDate: "2026-07-01", progress: 100, status: "Completado" },
      { id: "g2", stage: "Dashboard Satelital & Gemelo Digital AgriTwin", startDate: "2026-07-02", endDate: "2026-09-15", progress: 85, status: "En Ejecución" },
      { id: "g3", stage: "Despliegue de Nodos IoT en Terreno & Sincronización Maule", startDate: "2026-08-15", endDate: "2026-11-01", progress: 55, status: "En Ejecución" },
      { id: "g4", stage: "Brochure Ejecutivo & Comercialización con Viñas/Predios", startDate: "2026-10-01", endDate: "2026-12-31", progress: 30, status: "Planificación" }
    ],
    checklist: [
      { id: "chk1", text: "Configurar entorno oficial y arquitectura de microservicios AgroTech Chile", completed: true },
      { id: "chk2", text: "Integrar capas satelitales multispectrales (Sentinel-2 / NDVI)", completed: true },
      { id: "chk3", text: "Conectar telemetría de sensores de humedad de suelo IoT al AgriTwin Hub", completed: false },
      { id: "chk4", text: "Presentar Brochure Ejecutivo a viñas y predios agrícolas del Maule", completed: false }
    ],
    notes: "Chile Agrotech une tecnología de frontera con la realidad productiva y ecológica del campo chileno."
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
    title: "📻 Red Comunitaria de Medios Maule Sur (Maule Red)",
    subtitle: "Radio en vivo, información popular, emergencias rurales (APR) y periodismo territorial",
    collaborators: "Reporteros Locales, Comunidades Campesinas & Redes de APR (Fase: Crear Equipo)",
    category: "Comunicación Popular & Medios Territoriales",
    bannerImg: "assets/img_maule_red.jpg",
    desc: "Plataforma comunitaria de información para el Maule Sur. Integra radio comunitaria en vivo, avisador de emergencias de Agua Potable Rural (APR) y cortes de suministro eléctrico, mapa territorial colaborativo y periodismo de utilidad cotidiana para sectores rurales y urbanos del Maule. Actualmente en fase de convocatoria y conformación de equipo fundador.",
    gantt: [
      { id: "g1", stage: "Diseño y Arquitectura de Plataforma Maule Red", startDate: "2026-08-01", endDate: "2026-09-30", progress: 100, status: "Completado" },
      { id: "g2", stage: "Convocatoria y Formación de Equipo Comunitario", startDate: "2026-10-01", endDate: "2026-12-15", progress: 40, status: "En Ejecución" },
      { id: "g3", stage: "Integración de Transmisión Radial y Nodos APR", startDate: "2026-11-01", endDate: "2027-01-30", progress: 25, status: "Planificación" },
      { id: "g4", stage: "Lanzamiento y Cobertura Territorial Maule Sur", startDate: "2027-02-01", endDate: "2027-04-30", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Prototipar plataforma web y mapa de cortes y emergencias APR", completed: true },
      { id: "chk2", text: "Elaborar perfil de roles y convocatoria abierta para reporteros locales", completed: true },
      { id: "chk3", text: "Realizar primera asamblea o reunión de equipo fundador", completed: false },
      { id: "chk4", text: "Conectar señal streaming para la radio comunitaria en vivo", completed: false }
    ],
    notes: "Maule Red responde a la desconexión informativa de los territorios rurales: comunicación hecha por y para las comunidades."
  },

  museo_memoria: {
    id: "museo_memoria",
    title: "🏛️ Museo de la Memoria y Dignidad Maule",
    subtitle: "Museo virtual interactivo y archivo de memoria histórica y DD.HH. de la Región del Maule",
    collaborators: "Investigadores Históricos, Colectivos de DDHH & Pedagogos (Fase: Crear Equipo)",
    category: "Memoria Histórica & Derechos Humanos",
    bannerImg: "assets/img_museo_memoria_maule.jpg",
    desc: "Plataforma digital y museo interactivo orientado al rescate, divulgación y reflexión crítica sobre la memoria histórica, los derechos humanos y las expresiones populares de la Región del Maule (Talca, Curicó, Linares y Cauquenes). Incluye mapa interactivo con más de 23 sitios georreferenciados, escenarios multimedia, relatos orales, archivo documental y caja de herramientas comunitarias. Actualmente en fase de conformación de equipo.",
    gantt: [
      { id: "g1", stage: "Despliegue del Museo Digital & Mapa de 23 Sitios", startDate: "2026-07-01", endDate: "2026-09-30", progress: 100, status: "Completado" },
      { id: "g2", stage: "Convocatoria de Equipo Multidisciplinario de Memoria", startDate: "2026-10-01", endDate: "2026-12-31", progress: 40, status: "En Ejecución" },
      { id: "g3", stage: "Talleres Comunitarios & Caja de Herramientas en Escuelas", startDate: "2027-01-01", endDate: "2027-03-31", progress: 15, status: "Planificación" },
      { id: "g4", stage: "Digitalización de Archivos & Testimonios Orales Inéditos", startDate: "2027-03-01", endDate: "2027-06-30", progress: 0, status: "Pendiente" }
    ],
    checklist: [
      { id: "chk1", text: "Publicar sitio web oficial y visor de mapa interactivo regional", completed: true },
      { id: "chk2", text: "Redactar manifiesto de convocatoria para equipo de investigación y archivo", completed: true },
      { id: "chk3", text: "Coordinar primeros lazos con agrupaciones de memoria y familiares de DDHH", completed: false },
      { id: "chk4", text: "Activar caja de herramientas pedagógicas para talleres en juntas de vecinos", completed: false }
    ],
    notes: "Memoria viva, territorial y participativa para las 4 provincias del Maule: https://danisantanderurrutia-coder.github.io/memoria-y-dignidad-maule/"
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
      const parsed = JSON.parse(saved);
      // Migración automática a los nombres oficiales
      if (parsed.incel && parsed.incel.title && parsed.incel.title.includes("INCEL")) {
        delete parsed.incel.title;
        delete parsed.incel.subtitle;
        delete parsed.incel.desc;
      }
      if (parsed.permacultura && parsed.permacultura.title && parsed.permacultura.title.includes("Urrutia")) {
        delete parsed.permacultura.title;
        delete parsed.permacultura.subtitle;
        delete parsed.permacultura.desc;
        delete parsed.permacultura.subsections;
      }
      if (parsed.red_maule && parsed.red_maule.title && parsed.red_maule.title.includes("Eventual")) {
        delete parsed.red_maule.title;
        delete parsed.red_maule.subtitle;
        delete parsed.red_maule.desc;
      }
      projectsData = Object.assign({}, projectsData, parsed);
    } catch (e) { console.error("Error al cargar datos de proyectos:", e); }
  }
  // Alias de compatibilidad
  projectsData.manejadores = projectsData.incel;
  projectsData.agrotech = projectsData.permacultura;
  projectsData.chile_agrotech = projectsData.permacultura;
  projectsData.maule_red = projectsData.red_maule;
  projectsData.museo = projectsData.museo_memoria;
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
