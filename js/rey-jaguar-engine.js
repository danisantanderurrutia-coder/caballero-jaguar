/* ==========================================================================
   JAGUAR ROSA - MOTOR MAESTRO "REY JAGUAR" (RPG & PLATAFORMA HÍBRIDA)
   Estilo Renacentista Exclusivo, Landing Hub 2-Columnas, Ficha +1, Banco & Pergaminos
   ========================================================================= */

const REY_JAGUAR_STORAGE_KEY = "REY_JAGUAR_MASTER_STATE_V2";

let reyJaguarState = {
  character: {
    name: "Daniel Santander",
    avatarStyle: "ff7", // Avatar Oficial Final Fantasy 7 (Low-Poly 3D)
    height: "1.73 m",
    weight: "80 kg",
    hair: "Café (Corte Peaky Blinders / Thomas Shelby)",
    beard: "Pelirroja",
    eyes: "Marrón",
    level: 1,
    xp: 0, // Día 1: Inicia en 0 XP
    currentRankIndex: 0, // 0: Activista, 1: Trabajador, 2: Líder, 3: Visionario, 4: Boss
    streakDays: 1,
    noPornDays: 1 // Cuenta a partir de hoy
  },
  stats: {
    foco: { name: "Foco (Pomodoros)", value: 0, icon: "🎯", auraKey: "mente" },
    sabiduria: { name: "Estoicismo & Sabiduría", value: 0, icon: "🧠", auraKey: "mente" },
    autodominio: { name: "Detox de Porno", value: 0, icon: "🔇", auraKey: "espiritualidad" },
    fuerza: { name: "Fuerza Gym & Hipertrofia", value: 0, icon: "💪", auraKey: "deporte" },
    resistencia: { name: "Resistencia Cardiovascular", value: 0, icon: "🏃", auraKey: "deporte" },
    combate: { name: "Muay Thai & Kickboxing", value: 0, icon: "🥊", auraKey: "deporte" },
    tesis: { name: "Tesis Hannover", value: 0, icon: "🎓", auraKey: "vida" },
    idiomas: { name: "Alemán B1 & Políglota", value: 0, icon: "🌐", auraKey: "exploracion" },
    agrotech: { name: "Agrotech & Permacultura", value: 0, icon: "🌱", auraKey: "exploracion" },
    finanzas: { name: "Finanzas (Gasto Tonto Evitado)", value: 0, icon: "🪙", auraKey: "soberania" },
    salud: { name: "Salud Somática", value: 0, icon: "🛡️", auraKey: "salud" },
    nutricion: { name: "Nutrición Limpia / 3.2L Agua", value: 0, icon: "🥑", auraKey: "salud" },
    mente: { name: "Mente & Foco Estoico", value: 0, icon: "🧠", auraKey: "mente" },
    lectura: { name: "Lectura Estoica (Biblioteca)", value: 0, icon: "📖", auraKey: "mente" },
    meditacion: { name: "Meditación & Calma Somática", value: 0, icon: "🧘", auraKey: "espiritualidad" },
    masajes: { name: "Masajes de Pareja & Facial", value: 0, icon: "💆", auraKey: "amor" },
    ecologia: { name: "ReWild Bosque Nativo", value: 0, icon: "🌲", auraKey: "naturaleza" },
    territorio: { name: "Territorio & Expedición", value: 0, icon: "🌲", auraKey: "naturaleza" },
    soberania: { name: "Soberanía Financiera", value: 0, icon: "💰", auraKey: "soberania" },
    vitalidad: { name: "Vitalidad Somática & Flow", value: 0, icon: "🩵", auraKey: "salud" }
  },
  bankSummary: {
    bancoChileCurrentCLP: 1850000,
    bancoChileCreditCLP: -320000,
    sparkasseCurrentEUR: 2450,
    lastSyncDate: "2026-09-14"
  },
  auras: {
    vida: { name: "Aura Vida (Misiones Principales)", level: 1, color: "#C0392B" },
    exploracion: { name: "Aura Exploración (Misiones Secundarias)", level: 1, color: "#3F51B5" },
    amor: { name: "Aura Amor & Goce", level: 1, color: "#C2185B" },
    salud: { name: "Aura Salud Somática", level: 1, color: "#00897B" },
    soberania: { name: "Aura Soberanía Financiera", level: 1, color: "#9B2335" },
    espiritualidad: { name: "Aura Espiritualidad & Ritos", level: 1, color: "#5C6BC0" },
    naturaleza: { name: "Aura Naturaleza & Ecosistemas", level: 1, color: "#2E7D32" },
    deporte: { name: "Aura Deporte & Combate", level: 1, color: "#C62828" },
    mente: { name: "Aura Mente & Foco Estoico", level: 1, color: "#6A1B9A" }
  },
  ranks: [
    { title: "Rango 1: Caballero Explorador", desc: "Compromiso territorial, disciplina base y defensa comunitaria." },
    { title: "Rango 2: Caballero de Línea", desc: "Consagración profesional y cumplimiento de deberes en tu especialidad." },
    { title: "Rango 3: Capitán de Caballería", desc: "A cargo de equipos humanos, investigación y estrategias." },
    { title: "Rango 4: Mariscal de Campaña", desc: "Coordinación ejecutiva y soberanía en tus propios proyectos de vida." },
    { title: "Rango 5: Gran Maestre de la Orden", desc: "Soberanía total, capital autónomo y legado de la Orden Jaguar." }
  ],
  titles: [
    { id: "t1", name: "🎓 Maestro en Ecología", desc: "Al finalizar el Doble Máster en Ciencias.", unlocked: false },
    { id: "t2", name: "🏛️ Profesor Académico", desc: "Al impartir docencia en universidad europea.", unlocked: false },
    { id: "t3", name: "🧘‍♂️ Maestro de Tantra", desc: "Al dictar formación y clases de tantra.", unlocked: false },
    { id: "t4", name: "🥊 Maestro de Artes Marciales", desc: "Al formar estudiantes en Muay Thai o Kickboxing.", unlocked: false },
    { id: "t5", name: "⚔️ Peleador de Artes Marciales", desc: "Por sparring continuo en gimnasios europeos.", unlocked: true },
    { id: "t6", name: "🌿 Practicante de Tantra & Yoga", desc: "Por hábito sostenido de presencia y energía.", unlocked: true }
  ],
  counterTitles: [
    { id: "ct1", name: "🌈 Sexo Oral con un Chico", desc: "Exploración libre y desconstrucción de mandatos rígidos.", unlocked: false },
    { id: "ct2", name: "💧 Sensibilidad Llanto Libre", desc: "Expresar emociones profundas sin culpa ni vergüenza.", unlocked: true },
    { id: "ct3", name: "👨‍🍳 Chef Cuidador del Hogar", desc: "Nutrir y cocinar para cuidar afectivamente a los suyos.", unlocked: true },
    { id: "ct4", name: "🫂 Abrazo Masculino Sin Reticencia", desc: "Demostrar cariño fraterno sin barreras defensivas.", unlocked: true },
    { id: "ct5", name: "🧘‍♂️ Desarme del Ego Competitivo", desc: "Priorizar la serenidad por encima de tener la razón.", unlocked: true }
  ],
  reminders: [
    { id: "rem-1", text: "Revisar entregable de tesis antes de las 18:00", category: "Tesis", completed: false },
    { id: "rem-2", text: "Registrar extracto mensual de Sparkasse en Finanzas", category: "Finanzas", completed: false },
    { id: "rem-3", text: "Día limpio sin porno: Caballero Jaguar Challenge", category: "Espiritualidad", completed: false },
    { id: "rem-tk", text: "Pagar seguro médico los 15 de cada mes: Techniker Krankenkasse (TK)", category: "Salud", completed: false }
  ],
  tkPayments: {},
  mainQuests: [
    {
      id: "q1",
      stage: "Alemania (Hannover)",
      title: "🎓 Misión 1: Tesis (Defensa & Graduación de Máster)",
      completed: true,
      rewardItemId: 2,
      subQuests: [
        { id: "sq1_1", text: "📄 Entregar documento final de tesis", target: 1, current: 1, completed: true },
        { id: "sq1_2", text: "📖 Tardes de lectura y estudio de tesis", target: 10, current: 10, completed: true },
        { id: "sq1_3", text: "🎤 Ensayar presentación oral de defensa", target: 3, current: 3, completed: true },
        { id: "sq1_4", text: "🔍 Revisión minuciosa de diapositivas", target: 2, current: 2, completed: true },
        { id: "sq1_5", text: "🍷 Ceremonia y celebración de graduación", target: 1, current: 1, completed: true }
      ]
    },
    {
      id: "q2",
      stage: "Alemania (Hannover)",
      title: "🇩🇪 Misión 2: Hannover (Mudarse allí & Encontrar Trabajo)",
      completed: false,
      rewardItemId: 3,
      subQuests: [
        { id: "sq2_1", text: "🏠 Encontrar piso/domicilio en Hannover", target: 1, current: 0, completed: false },
        { id: "sq2_2", text: "🚚 Mudanza e instalación en Hannover", target: 1, current: 0, completed: false },
        { id: "sq2_3", text: "📝 Redactar CV en formato alemán (Lebenslauf)", target: 1, current: 0, completed: false },
        { id: "sq2_4", text: "📩 Enviar postulaciones de empleo", target: 10, current: 0, completed: false },
        { id: "sq2_5", text: "✒️ Firma de contrato laboral en Hannover", target: 1, current: 0, completed: false }
      ]
    },
    {
      id: "q3",
      stage: "España (Bilbao)",
      title: "🇪🇸 Misión 3: España (Trabajo, Visa, Domicilio & Mudanza)",
      completed: false,
      rewardItemId: 4,
      subQuests: [
        { id: "sq3_1", text: "📝 Adaptar CV al mercado español / País Vasco", target: 1, current: 0, completed: false },
        { id: "sq3_2", text: "📨 Enviar postulaciones laborales a España", target: 20, current: 0, completed: false },
        { id: "sq3_3", text: "💬 Entrevistas técnicas y de selección", target: 3, current: 0, completed: false },
        { id: "sq3_4", text: "✒️ Firma de contrato laboral en España", target: 1, current: 0, completed: false },
        { id: "sq3_5", text: "🛂 Tramitar Visa Española (Deadline: 30 Junio 2027)", target: 1, current: 0, completed: false },
        { id: "sq3_6", text: "🏡 Encontrar piso/domicilio en Bilbao", target: 1, current: 0, completed: false },
        { id: "sq3_7", text: "✈️ Mudanza definitiva a España", target: 1, current: 0, completed: false }
      ]
    },
    {
      id: "q4",
      stage: "Europa / Internacional",
      title: "🌴 Misión 4: Vacaciones (Descanso & Desconexión Plena)",
      completed: false,
      rewardItemId: 17,
      subQuests: [
        { id: "sq4_1", text: "🗺️ Elegir destino y fechas de vacaciones", target: 1, current: 0, completed: false },
        { id: "sq4_2", text: "🎫 Reservar pasajes y alojamiento", target: 1, current: 0, completed: false },
        { id: "sq4_3", text: "🎒 Preparar equipaje ligero de aventura", target: 1, current: 0, completed: false },
        { id: "sq4_4", text: "🌊 Disfrutar de desconexión total y descanso", target: 7, current: 0, completed: false }
      ]
    }
  ],
  inventory: (typeof JAGUAR_DEFAULT_INVENTORY !== "undefined" ? JAGUAR_DEFAULT_INVENTORY : []),
  astralChart: {
    birthDate: "1996-03-23",
    birthPlace: "Parral, Chile",
    currentLocation: "Hannover / Bilbao",
    sunSign: "Aries ♈ (Sol a 3° de Aries)",
    element: "Fuego 🔥",
    ruler: "Marte (Fuerza, Impulso, Liderazgo, Voluntad)",
    desc: "Aries de primer decanato. Naturaleza pionera, intrépida e independiente. Tu energía natal está diseñada para iniciar proyectos territoriales, liderar expediciones y romper inercias."
  },
  languages: [
    { code: "DE", name: "🇩🇪 Alemán (Deutsch)", level: "B1 - Intermedio", practiceMinutes: 0, dailyGoal: "15 min/día en Hannover" },
    { code: "EU", name: "🇪🇸 Euskera (Euskara)", level: "A1 - Iniciación", practiceMinutes: 0, dailyGoal: "Vocabulario para Bilbao" },
    { code: "PT", name: "🇵🇹 Portugués", level: "A2 - Elemental", practiceMinutes: 0, dailyGoal: "Conversación cotidiana" },
    { code: "IT", name: "🇮🇹 Italiano", level: "A2 - Conversacional", practiceMinutes: 0, dailyGoal: "Cultura y lectura" }
  ],
  completedLifeQuests: ["tesis", "hannover_mudanza"] // Inicializadas las ya conquistadas por el Caballero
};
window.reyJaguarState = reyJaguarState;

// --- CONFIGURACIÓN MAESTRA DE LAS 9 AURAS DE CABALLERÍA JAGUAR ---
const KCD_AURAS_CONFIG = {
  vida: {
    key: "vida",
    name: "Vida (Misiones Principales)",
    shortName: "Vida",
    icon: "👑",
    colorClass: "kcd-col-gold",
    color: "#C0392B",
    subtitle: "Tesis, Hannover, España & Vacaciones ('Keep Shit Together')",
    activities: [
      { key: "tesis", name: "Tesis Hannover", fullName: "Defensa & Graduación de Tesis", icon: "🎓", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Avance riguroso del Máster en Ciencias, redacción y defensa oral.", tab: "campanas" },
      { key: "hannover_mudanza", name: "Hannover Mudanza", fullName: "Mudarse & Instalarse en Hannover", icon: "🚚", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Encontrar domicilio y mudarse a Hannover.", tab: "campanas" },
      { key: "hannover_empleo", name: "Hannover Trabajo", fullName: "Conseguir Trabajo en Hannover", icon: "💼", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Postulaciones y firma de contrato de trabajo en Alemania.", tab: "campanas" },
      { key: "espana_empleo", name: "España Trabajo", fullName: "Conseguir Empleo en España / Bilbao", icon: "🇪🇸", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Postulaciones y entrevistas laborales en España.", tab: "campanas" },
      { key: "espana_visa", name: "Visa Española", fullName: "Gestionar Visa Española (30 Jun 2027)", icon: "🛂", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Recopilar antecedentes y tramitar residencia consular.", tab: "campanas" },
      { key: "espana_mudanza", name: "España Mudanza", fullName: "Domicilio & Mudanza a Bilbao", icon: "🏡", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Encontrar piso definitivo y mudanza al País Vasco.", tab: "campanas" },
      { key: "vacaciones", name: "Vacaciones", fullName: "Planificar & Disfrutar Vacaciones", icon: "🌴", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Reserva, viaje y desconexión plena en el mundo.", tab: "campanas" },
      { key: "shit_together", name: "Keep Shit Together", fullName: "Mantenimiento Vital Cotidiano", icon: "⚓", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Cumplimiento de compromisos materiales y orden del día.", tab: "campanas" }
    ]
  },
  exploracion: {
    key: "exploracion",
    name: "Exploración (Misiones Secundarias)",
    shortName: "Exploración",
    icon: "🧭",
    colorClass: "kcd-col-purple",
    color: "#3F51B5",
    subtitle: "Idiomas, Música, Fotografía & Proyectos Secundarios",
    activities: [
      { key: "idiomas", name: "Alemán B1", fullName: "Alemán B1 & Políglota", icon: "🌐", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Práctica diaria de Alemán, Euskera o Portugués.", tab: "idiomas" },
      { key: "musica", name: "Música / Jazz", fullName: "Trompeta de Jazz & Viento", icon: "🎺", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Embocadura, lenguaje armónico y escalas de jazz.", tab: "musica" },
      { key: "fotografia", name: "Fotografía & Óptica", fullName: "Fotografía Territorial & Óptica", icon: "📷", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Composición visual, encuadre y revelado.", tab: "fotografia" },
      { key: "agrotech", name: "Chile Agrotech", fullName: "Chile Agrotech · Precisión & AgriTwin", icon: "🌱", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Gemelo digital AgriTwin, sensores IoT y analítica satelital en el Maule.", tab: "campanas" },
      { key: "rewild", name: "Libro de Incendios", fullName: "ReWild: Libro de Incendios", icon: "🔥", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Investigación y co-edición sobre superación del modelo forestal.", tab: "campanas" },
      { key: "lauwersmeer", name: "Paper Lauwersmeer", fullName: "Artículo Científico Lauwersmeer", icon: "🌊", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Evaluación de riesgo climático costero y marejadas en Holanda.", tab: "campanas" },
      { key: "piratas", name: "Cómic de Piratas", fullName: "Cómic Guerra del Pacífico & Leyendas", icon: "🏴‍☠️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Guión literario, bocetos y leyendas náuticas chilenas.", tab: "campanas" },
      { key: "incel", name: "Los Manejadores", fullName: "Los Manejadores · Agencia IA & YouTube", icon: "🎭", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Influencers virtuales IA, producción de YouTube y presencia digital.", tab: "campanas" },
      { key: "divulgacion", name: "Ciencia & Territorios", fullName: "Divulgación Científica Territorial", icon: "🎙️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Podcast, reportajes de terreno y mapeo participativo.", tab: "campanas" },
      { key: "paper_fisica", name: "Paper en Física", fullName: "Investigación en Física (Eventual)", icon: "⚛️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Modelación matemática y exploración teórica.", tab: "campanas" },
      { key: "red_maule", name: "Maule Red", fullName: "Red Comunitaria de Medios Maule Sur", icon: "📻", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Comunicación popular, radio comunitaria y alertas rurales.", tab: "campanas" },
      { key: "museo_memoria", name: "Museo Memoria", fullName: "Museo de la Memoria y Dignidad Maule", icon: "🏛️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Archivo virtual, mapa de memoria histórica y DDHH en Maule.", tab: "campanas" },
      { key: "manager_daniela", name: "Manager Daniela", fullName: "Manager & Editor de Daniela (Eventual)", icon: "⭐", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Estrategia de contenidos, edición y apoyo profesional.", tab: "campanas" }
    ]
  },
  amor: {
    key: "amor",
    name: "Amor & Goce",
    shortName: "Amor",
    icon: "❤️",
    colorClass: "kcd-col-pink",
    color: "#C2185B",
    subtitle: "Amor de Pareja, Pintura al Óleo, Escritura & Masajes",
    activities: [
      { key: "pareja", name: "Amor de Pareja", fullName: "Amor & Presencia con Mi Novia", icon: "💑", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Citas románticas, escucha atenta y conexión profunda.", tab: "bitacoras" },
      { key: "masajes_pareja", name: "Masajes Pareja", fullName: "Masajes en Pareja & Liberación", icon: "💆‍♂️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Tacto consciente, aceites esenciales y relajación compartida.", tab: "masajes" },
      { key: "pintura", name: "Pintura al Óleo", fullName: "Pintura al Óleo & Paleta Zorn", icon: "🎨", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Composición visual, claroscuro y goce de la pintura.", tab: "pintura" },
      { key: "escritura", name: "Escritura", fullName: "Escritura Creativa & Expresiva", icon: "✍️", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Cartas íntimas, crónicas de vivencias y poesía.", tab: "bitacoras" },
      { key: "cocina_amor", name: "Cocinar con Afecto", fullName: "Cocinar Platos Cuidados con Amor", icon: "👨‍🍳", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Nutrir y preparar la mesa para compartir con cariño.", tab: "lifestyle" }
    ]
  },
  salud: {
    key: "salud",
    name: "Salud Somática",
    shortName: "Salud",
    icon: "🌿",
    colorClass: "kcd-col-teal",
    color: "#00897B",
    subtitle: "Nutrición, Hidratación, Sueño 7-8h, Masajes Faciales & Yoga",
    activities: [
      { key: "nutricion", name: "Nutrición Limpia", fullName: "Nutrición Densa & Antiinflamatoria", icon: "🥑", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Alimentos enteros sin ultraprocesados ni azúcar refinada.", tab: "lifestyle" },
      { key: "hidratacion", name: "Hidratación 3.2L", fullName: "Hidratación Limpia (3.2L Agua)", icon: "💧", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Ingesta sostenida con electrolitos durante el día.", tab: "lifestyle" },
      { key: "sueno", name: "Sueño Reparador", fullName: "Dormir de 7 a 8 Horas Diarias", icon: "🛌", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Higiene del sueño, descanso profundo y reloj circadiano.", tab: "lifestyle" },
      { key: "masaje_facial", name: "Masaje Facial", fullName: "Masajes Faciales & Cuidado de Piel", icon: "💆", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Rodillo de jade, gua sha y descompresión facial.", tab: "masajes" },
      { key: "yoga_salud", name: "Yoga Somático", fullName: "Yoga & Flexibilidad Somática", icon: "🧘‍♂️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Asanas para descompresión espinal y postura erguida.", tab: "lifestyle" },
      { key: "salud_hrv", name: "Regeneración HRV", fullName: "Salud Somática & Balance Nervioso", icon: "🛡️", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Tono vagal alto y recuperación activa entre jornadas.", tab: "lifestyle" }
    ]
  },
  soberania: {
    key: "soberania",
    name: "Soberanía Financiera",
    shortName: "Soberanía",
    icon: "🪙",
    colorClass: "kcd-col-gold",
    color: "#9B2335",
    subtitle: "Control de Gastos Domingo, Paneo Mensual & 0 Gastos Tontos",
    activities: [
      { key: "gastos_domingo", name: "Revisión Domingo", fullName: "Revisar Gastos Semanales (Domingos)", icon: "🗓️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Auditoría dominical rigurosa de cada euro y peso gastado.", tab: "finanzas" },
      { key: "paneo_mensual", name: "Paneo Mensual", fullName: "Paneo Mensual Sparkasse & Chile", icon: "📊", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Conciliación mensual y tasa de ahorro neta consolidada.", tab: "finanzas" },
      { key: "gasto_tonto", name: "Fin de Gasto Tonto", fullName: "Cero Gastos Tontos (Gasto Evitado)", icon: "🛡️", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Cada vez que no has pagado por algo prescindible o caprichoso.", tab: "finanzas" },
      { key: "fondo_reserva", name: "Fondo de Reserva", fullName: "Aporte al Fondo de Reserva Solvente", icon: "💰", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Transferencia disciplinada a la cuenta de reserva patrimonial.", tab: "finanzas" }
    ]
  },
  espiritualidad: {
    key: "espiritualidad",
    name: "Espiritualidad & Ritos",
    shortName: "Espiritual",
    icon: "🕯️",
    colorClass: "kcd-col-silver",
    color: "#5C6BC0",
    subtitle: "Ritos Sagrados, Meditación, Detox de Porno & Yoga",
    activities: [
      { key: "detox_porno", name: "Detox de Porno", fullName: "Día Limpio Sin Porno (Caballero Challenge)", icon: "🕊️", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Autodominio dopaminérgico y racha limpia sostenida.", tab: "ritos" },
      { key: "rito_navaho", name: "Rito Navaho Diné", fullName: "Rito Sagrado Navaho (Cabaña de Humo)", icon: "🏜️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Hozho (armonía cósmica), cedro y conexión con la Tierra.", tab: "ritos" },
      { key: "rito_andino", name: "Rito Andino Quechua", fullName: "Rito Sagrado Andino (Ofrenda Pachamama)", icon: "🏔️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Ayni (reciprocidad sagrada) y conexión con los Apus sagrados.", tab: "ritos" },
      { key: "rito_amazonico", name: "Rito Amazónico", fullName: "Rito Vegetalista Amazónico Sobrio", icon: "🌿", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Purificación con plantas maestras aromáticas sin psicoactivos.", tab: "ritos" },
      { key: "meditacion_box", name: "Box Breathing 4x4", fullName: "Box Breathing 4x4x4x4 Somático", icon: "🧘", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Regulación simpática y serenidad en 5 a 15 minutos.", tab: "meditacion" },
      { key: "meditacion_vipassana", name: "Meditación Vipassana", fullName: "Vipassana Somática & Cuenco Tibetano", icon: "🔔", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Presencia testigo pura a 432 Hz sin juicio mental.", tab: "meditacion" }
    ]
  },
  naturaleza: {
    key: "naturaleza",
    name: "Naturaleza & Ecosistemas",
    shortName: "Naturaleza",
    icon: "🌲",
    colorClass: "kcd-col-green",
    color: "#2E7D32",
    subtitle: "Acampar, Nadar en el Mar, Correr en Bosque, Caminatas & Jardinería",
    activities: [
      { key: "acampar", name: "Acampar Outdoor", fullName: "Acampar Bajo las Estrellas", icon: "⛺", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, desc: "Pernoctar en la naturaleza salvaje y desconexión urbana.", tab: "campanas" },
      { key: "nadar_mar", name: "Nadar en el Mar", fullName: "Nadar en Aguas Abiertas / Mar", icon: "🌊", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Inmersión fría y natación en costa marina viva.", tab: "campanas" },
      { key: "correr_bosque", name: "Correr en Bosque", fullName: "Running de Sendero en Bosque", icon: "🏃‍♂️", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Entrenamiento cardiovascular sobre tierra y hojas.", tab: "ejercicios" },
      { key: "caminatas_bosque", name: "Caminatas Bosque", fullName: "Senderismo & Baño de Bosque (Shinrin-Yoku)", icon: "🥾", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Caminar en silencio respirando fitoncidas de los árboles.", tab: "campanas" },
      { key: "jardineria", name: "Jardinería", fullName: "Jardinería & Huerto Regenerativo", icon: "✂️", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Cuidado botánico, suelo vivo y siembra orgánica.", tab: "campanas" },
      { key: "rewild_bosque", name: "ReWild Nativo", fullName: "Restauración de Bosque Nativo", icon: "🌲", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Acciones territoriales de conservación de flora y cuencas.", tab: "campanas" }
    ]
  },
  deporte: {
    key: "deporte",
    name: "Deporte & Combate",
    shortName: "Deporte",
    icon: "🥊",
    colorClass: "kcd-col-red",
    color: "#C62828",
    subtitle: "Muay Thai, Gym Hipertrofia, Running & Bouldering",
    activities: [
      { key: "combate", name: "Muay Thai Sparring", fullName: "Muay Thai & Kickboxing (Sparring)", icon: "🥊", defaultVal: 0, xpWeight: "75 XP (Difícil)", difficulty: "dificil", xp: 75, subKey: "combate", desc: "Artes marciales, paos, clinch y combates de 8 armas.", tab: "ejercicio" },
      { key: "fuerza", name: "Fuerza Gym", fullName: "Fuerza Gym & Hipertrofia", icon: "💪", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, subKey: "gym", desc: "Sobrecarga progresiva, pesas y desarrollo muscular.", tab: "ejercicio" },
      { key: "resistencia", name: "Running", fullName: "Resistencia Cardiovascular Running", icon: "🏃", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, subKey: "running", desc: "Carrera aeróbica sostenida y capacidad pulmonar.", tab: "ejercicio" },
      { key: "escalada", name: "Escalada / Bouldering", fullName: "Escalada Muro & Bouldering Outdoor", icon: "🧗", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, subKey: "bouldering", desc: "Fuerza de agarre, equilibrio dinámico y resolución de rutas.", tab: "ejercicio" },
      { key: "movilidad", name: "Movilidad & Calistenia", fullName: "Movilidad Articular & Calistenia", icon: "🤸", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, subKey: "movilidad", desc: "Salud articular, control corporal y estiramientos activos.", tab: "ejercicio" }
    ]
  },
  mente: {
    key: "mente",
    name: "Mente & Foco Estoico",
    shortName: "Mente",
    icon: "🧠",
    colorClass: "kcd-col-purple",
    color: "#6A1B9A",
    subtitle: "Lectura Estoica, Deep Work Pomodoros, Estudio & Códices",
    activities: [
      { key: "lectura", name: "Lectura Estoica", fullName: "Lectura & Códices Estoicos", icon: "📖", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Marco Aurelio, Séneca, Epicteto y filosofía aplicada.", tab: "lectura" },
      { key: "foco", name: "Pomodoros Foco", fullName: "Bloque Deep Work / Pomodoro (25 min)", icon: "🎯", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Concentración estricta sin distracciones digitales.", tab: "foco" },
      { key: "sabiduria", name: "Estudio Científico", fullName: "Estudio Riguroso & Proyectos Intelectuales", icon: "🧠", defaultVal: 0, xpWeight: "50 XP (Medio)", difficulty: "medio", xp: 50, desc: "Análisis bibliográfico, papers y redacción científica.", tab: "campanas" },
      { key: "diario_estoico", name: "Examen Estoico", fullName: "Diario Estoico Nocturno", icon: "📝", defaultVal: 0, xpWeight: "25 XP (Fácil)", difficulty: "facil", xp: 25, desc: "Revisión sincera de la jornada y templanza del ego.", tab: "lectura" }
    ]
  }
};
window.KCD_AURAS_CONFIG = KCD_AURAS_CONFIG;
window.KCD_CATEGORIES_CONFIG = KCD_AURAS_CONFIG; // Retrocompatibilidad

// --- MIGRACIÓN DE DATOS PREVIOS DE LOCALSTORAGE ---
function loadReyJaguarState() {
  const saved = localStorage.getItem(REY_JAGUAR_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        if (parsed.character && typeof parsed.character === "object") reyJaguarState.character = Object.assign({}, reyJaguarState.character, parsed.character);
        if (parsed.stats && typeof parsed.stats === "object" && Object.keys(parsed.stats).length > 0) reyJaguarState.stats = Object.assign({}, reyJaguarState.stats, parsed.stats);
        if (parsed.auras && typeof parsed.auras === "object" && Object.keys(parsed.auras).length > 0) reyJaguarState.auras = Object.assign({}, reyJaguarState.auras, parsed.auras);
        if (parsed.bankSummary && typeof parsed.bankSummary === "object") reyJaguarState.bankSummary = Object.assign({}, reyJaguarState.bankSummary, parsed.bankSummary);
        if (Array.isArray(parsed.ranks) && parsed.ranks.length > 0) reyJaguarState.ranks = parsed.ranks;
        if (Array.isArray(parsed.titles) && parsed.titles.length > 0) reyJaguarState.titles = parsed.titles;
        if (Array.isArray(parsed.counterTitles) && parsed.counterTitles.length > 0) reyJaguarState.counterTitles = parsed.counterTitles;
        if (Array.isArray(parsed.reminders) && parsed.reminders.length > 0) reyJaguarState.reminders = parsed.reminders;
        if (Array.isArray(parsed.mainQuests) && parsed.mainQuests.length > 0) reyJaguarState.mainQuests = parsed.mainQuests;
        if (Array.isArray(parsed.completedLifeQuests)) reyJaguarState.completedLifeQuests = parsed.completedLifeQuests;
        if (parsed.tkPayments && typeof parsed.tkPayments === "object") reyJaguarState.tkPayments = Object.assign({}, reyJaguarState.tkPayments, parsed.tkPayments);
        if (Array.isArray(parsed.inventory) && parsed.inventory.length > 0) {
          // Merge o actualización de ítems
          parsed.inventory.forEach(savedItem => {
            const target = reyJaguarState.inventory.find(i => i.id === savedItem.id);
            if (target) {
              if (typeof savedItem.unlocked === 'boolean') target.unlocked = savedItem.unlocked;
              if (typeof savedItem.equipped === 'boolean') target.equipped = savedItem.equipped;
              if (savedItem.lore) target.lore = savedItem.lore;
            }
          });
        }
      }
    } catch (e) { console.error("Error al cargar estado del Rey Jaguar:", e); }
  }

  // Garantizar reseteo a Día 1 (Tabula Rasa) según la directriz del usuario
  try {
    if (localStorage.getItem("CABALLERO_JAGUAR_DAY1_START_RESET") !== "2026_09_14_V3") {
      reyJaguarState.character.xp = 0;
      reyJaguarState.character.level = 1;
      reyJaguarState.character.streakDays = 1;
      reyJaguarState.character.noPornDays = 1;
      if (reyJaguarState.stats) {
        Object.keys(reyJaguarState.stats).forEach(k => {
          reyJaguarState.stats[k].value = 0;
        });
      }
      if (typeof window.CaballeroScoringEngine !== 'undefined') {
        window.CaballeroScoringEngine.resetAllStatsToDayOne();
      }
      localStorage.setItem("CABALLERO_JAGUAR_DAY1_START_RESET", "2026_09_14_V3");
      saveReyJaguarState();
    }
  } catch(e) { console.error("Error al verificar reseteo Día 1:", e); }

  // Asegurar que por defecto solo el Sprite (id: 1) esté equipado
  if (Array.isArray(reyJaguarState.inventory)) {
    const equippedItems = reyJaguarState.inventory.filter(i => i.equipped);
    if (!reyJaguarState._userCustomizedEquipment && equippedItems.length > 1) {
      reyJaguarState.inventory.forEach(item => {
        item.equipped = (item.id === 1);
      });
    } else {
      reyJaguarState.inventory.forEach(item => {
        if (typeof item.equipped !== 'boolean') {
          item.equipped = (item.id === 1);
        }
      });
    }
  }

  // Garantizar valores por defecto obligatorios si fueron vaciados o corrompidos
  if (!reyJaguarState.character || typeof reyJaguarState.character !== "object") {
    reyJaguarState.character = {
      name: "Daniel Santander",
      avatarStyle: "ff7",
      height: "1.73 m",
      weight: "80 kg",
      hair: "Café (Corte Peaky Blinders / Thomas Shelby)",
      beard: "Pelirroja",
      eyes: "Marrón",
      level: 1,
      xp: 0,
      currentRankIndex: 0,
      streakDays: 1,
      noPornDays: 1
    };
  }
  if (!reyJaguarState.character.name) reyJaguarState.character.name = "Daniel Santander";
  if (typeof reyJaguarState.character.level !== "number") reyJaguarState.character.level = 1;
  if (typeof reyJaguarState.character.xp !== "number") reyJaguarState.character.xp = 0;
  if (typeof reyJaguarState.character.streakDays !== "number") reyJaguarState.character.streakDays = 1;
  if (typeof reyJaguarState.character.noPornDays !== "number") reyJaguarState.character.noPornDays = 1;
  if (typeof reyJaguarState.character.currentRankIndex !== "number" || !reyJaguarState.ranks || !reyJaguarState.ranks[reyJaguarState.character.currentRankIndex]) {
    reyJaguarState.character.currentRankIndex = 0;
  }

  if (!reyJaguarState.stats) reyJaguarState.stats = {};
  // Inicializar todas las actividades de las 4 categorías
  Object.values(KCD_CATEGORIES_CONFIG).forEach(cat => {
    cat.activities.forEach(act => {
      if (!reyJaguarState.stats[act.key]) {
        reyJaguarState.stats[act.key] = {
          name: act.fullName || act.name,
          value: act.defaultVal,
          icon: act.icon,
          auraKey: "dorada"
        };
      }
    });
  });
}

function saveReyJaguarState() {
  try {
    window.reyJaguarState = reyJaguarState;
    localStorage.setItem(REY_JAGUAR_STORAGE_KEY, JSON.stringify(reyJaguarState));
  } catch (e) { console.error("Error al guardar estado:", e); }
}

// --- CELEBRACIÓN Y EFECTO DE DESTELOS EN EL AVATAR ---
function triggerAvatarCelebrationEffect(message = "¡Disciplina Incrementada!") {
  const avatarContainer = document.getElementById("avatar-fullbody-container");
  if (avatarContainer) {
    avatarContainer.classList.remove("celebrating-burst");
    void avatarContainer.offsetWidth; // Force reflow
    avatarContainer.classList.add("celebrating-burst");
  }

  if (typeof playSoundEffect === 'function') playSoundEffect("success");
  if (typeof showNotification === 'function') showNotification(`⚡ ${message}`);
}

window.triggerAvatarCelebrationEffect = triggerAvatarCelebrationEffect;

// --- MECÁNICA +1 PARA INCREMENTO DE STATS ---
function incrementStat(statKey) {
  if (!reyJaguarState.stats) reyJaguarState.stats = {};

  if (!reyJaguarState.stats[statKey]) {
    let foundAct = null;
    if (typeof KCD_CATEGORIES_CONFIG !== 'undefined') {
      Object.values(KCD_CATEGORIES_CONFIG).forEach(cat => {
        const match = cat.activities.find(a => a.key === statKey);
        if (match) foundAct = match;
      });
    }
    reyJaguarState.stats[statKey] = {
      name: foundAct ? (foundAct.fullName || foundAct.name) : statKey,
      value: foundAct ? foundAct.defaultVal : 10,
      icon: foundAct ? foundAct.icon : "⚡"
    };
  }

  reyJaguarState.stats[statKey].value = (reyJaguarState.stats[statKey].value || 0) + 1;
  // XP y nivel los gestiona el motor único (CJProgress): ya anuncia ascensos de rango
  window.awardXP(50, `Mejora de atributo: ${reyJaguarState.stats[statKey].name}`, statKey);
  triggerAvatarCelebrationEffect(`+1 a ${reyJaguarState.stats[statKey].name} (+50 XP)`);

  saveReyJaguarState();
  renderCharacterHUD();
  renderRPGLandingHub();
}

// --- RENDERIZADO DEL HUD DE CARÁCTER EN EL HEADER ---
function renderCharacterHUD() {
  try {
    const levelEl = document.getElementById("header-level-name");
    const streakEl = document.getElementById("header-streak-text");
    const xpFill = document.getElementById("header-xp-fill");

    const ranksArr = reyJaguarState.ranks || [];
    const idx = (reyJaguarState.character && typeof reyJaguarState.character.currentRankIndex === 'number') ? reyJaguarState.character.currentRankIndex : 0;
    const currentRankTitle = (ranksArr[idx] && ranksArr[idx].title) ? ranksArr[idx].title : "Rango 1: Activista";
    const level = (reyJaguarState.character && reyJaguarState.character.level) ? reyJaguarState.character.level : 1;
    const streak = (reyJaguarState.character && reyJaguarState.character.streakDays) ? reyJaguarState.character.streakDays : 7;
    const xp = (reyJaguarState.character && typeof reyJaguarState.character.xp === 'number') ? reyJaguarState.character.xp : 350;

    if (levelEl) {
      levelEl.innerHTML = `<strong>${xp.toLocaleString()} XP</strong>`;
    }

    if (streakEl) {
      streakEl.innerText = `🦅 Vexillum: ${streak} / 21 Días`;
    }

    if (xpFill) {
      const pct = Math.min(100, (xp % 1000) / 10);
      xpFill.style.width = `${pct}%`;
    }

    if (window.imperivmEngine && typeof window.imperivmEngine.updateVexillumVisuals === 'function') {
      window.imperivmEngine.updateVexillumVisuals();
    }
  } catch (e) {
    console.error("Error en renderCharacterHUD:", e);
  }
}

// --- CÁLCULO DE TRANSFORMACIÓN DE SKIN FÍSICA ---
function getSkinPhysicalStatus() {
  const statsObj = (reyJaguarState && reyJaguarState.stats) ? reyJaguarState.stats : {};
  const totalStats = Object.values(statsObj).reduce((acc, s) => acc + (s ? (s.value || 0) : 0), 0);
  if (totalStats < 50) return { title: "Skin Normal", desc: "Fisiología base en desarrollo y acondicionamiento", badge: "badge-cyan" };
  if (totalStats < 120) return { title: "Skin Atlético", desc: "Músculo denso, porcentaje graso bajo y tono muscular marcado", badge: "badge-gold" };
  return { title: "Skin Esculpido", desc: "Definición espartana de alto rendimiento físico y presencia imponente", badge: "badge-pink" };
}

// --- SINCRONIZACIÓN DE BANCO CON MOTOR FINANCIERO ---
function syncBankSummaryWithFinanceState() {
  try {
    if (typeof financeState !== 'undefined' && Array.isArray(financeState.transactions)) {
      let spSum = 0;
      let clpSum = 0;
      let hasSp = false;
      let hasClp = false;

      financeState.transactions.forEach(t => {
        if (t.bank === "Sparkasse" || t.currency === "EUR") {
          hasSp = true;
          if (t.category === "ingreso") spSum += t.amount;
          else spSum -= t.amount;
        } else if (t.bank === "Banco Chile" || t.currency === "CLP") {
          hasClp = true;
          if (t.category === "ingreso") clpSum += t.amount;
          else clpSum -= t.amount;
        }
      });

      if (!reyJaguarState.bankSummary) reyJaguarState.bankSummary = {};
      if (hasSp) reyJaguarState.bankSummary.sparkasseCurrentEUR = Math.round(2450 + spSum);
      if (hasClp) reyJaguarState.bankSummary.bancoChileCurrentCLP = Math.round(1850000 + clpSum);
      reyJaguarState.bankSummary.lastSyncDate = cjToday();
    }
  } catch (e) {
    console.error("Error en syncBankSummaryWithFinanceState:", e);
  }
}

// --- ELIMINADO: RAYOS SAYAYIN (REEMPLAZADO POR LUZ SOLAR CENITAL KCD) ---
window.renderSaiyanKiAuraRaysHTML = function() { return ""; };

// --- CONSTANTE: ACCIONES Y DESAFÍOS DE CABALLERÍA CON EXPERIENCIA EXTRA ---
// --- CONSTANTE: LOS 5 PILARES SAGRADOS DE VIRTUD DIARIA ---
// El 0 Porno es el Pilar Rey que decide la conquista del Día en Virtud; los otros 4 hábitos se registran allí.
const VIRTUE_FIVE_PILLARS = [
  {
    id: "pillar_nopor",
    name: "0 Porno & Templanza Sagrada",
    role: "👑 PILAR REY • DECISOR DEL DÍA",
    badge: "👑 Decisor de Virtud",
    isMaster: true,
    icon: "🛡️",
    aura: "espiritualidad",
    xp: 75,
    desc: "El pilar maestro: define si el Día de Virtud se conquista formalmente. Preservación absoluta de energía vital, recableado dopaminérgico y mirada limpia.",
    detail: "Al marcar este pilar, conquistas formalmente tu Día en Virtud y avanzas en la Matriz de 21 Días."
  },
  {
    id: "pillar_ejercicio",
    name: "Movilidad Articular & Calistenia",
    role: "Hábito Somático & Fuerza Diaria",
    badge: "🤸 Registro Diario",
    isMaster: false,
    icon: "🤸",
    aura: "deporte",
    xp: 50,
    desc: "Movilidad articular profunda, estiramientos activos, 100 flexiones/sentadillas/abs o calistenia de peso corporal. Mañana o a las 18:00.",
    detail: "Se registra aquí. Despierta la agilidad, preserva la salud articular y fortalece el templo corporal."
  },
  {
    id: "pillar_aleman",
    name: "Alemán al Mediodía (10 min)",
    role: "Hábito Lingüístico & Mente",
    badge: "🇩🇪 Registro Diario",
    isMaster: false,
    icon: "🇩🇪",
    aura: "mente",
    xp: 35,
    desc: "10 minutos diarios de inmersión en alemán al mediodía (vocabulario técnico, gramática, oratoria o preparación laboral).",
    detail: "Se registra aquí. Construye soberanía lingüística en Alemania paso a paso cada día."
  },
  {
    id: "pillar_lectura",
    name: "Lectura Estoica (10 min)",
    role: "Hábito Filosófico de Cierre",
    badge: "📖 Registro Diario",
    isMaster: false,
    icon: "📖",
    aura: "mente",
    xp: 35,
    desc: "10 minutos de lectura reflexiva antes de dormir (Marco Aurelio, Séneca, Epicteto o Códices de Caballería).",
    detail: "Se registra aquí. Calibra el juicio, diluye la ansiedad del mundo y prepara el descanso sereno."
  },
  {
    id: "pillar_meditacion",
    name: "Meditación Somática (5 min)",
    role: "Hábito de Calma & Conexión",
    badge: "🧘 Registro Diario",
    isMaster: false,
    icon: "🧘",
    aura: "espiritualidad",
    xp: 35,
    desc: "5 minutos de vaciado mental, respiración diafragmática y conexión antes de dormir en el altar ancestral.",
    detail: "Se registra aquí. Regula el sistema nervioso parasimpático y sella la noche en paz."
  }
];
window.VIRTUE_FIVE_PILLARS = VIRTUE_FIVE_PILLARS;

// --- ACCIONES Y DESAFÍOS DE CABALLERÍA ADICIONALES CON EXPERIENCIA EXTRA ---
const CABALLERO_BONUS_CHALLENGES = [
  {
    id: "detox",
    title: "0 Porno & Detox Dopaminérgico Total",
    icon: "🛡️",
    auraKey: "espiritualidad",
    difficulty: "dificil",
    xp: 75,
    desc: "Preservación sagrada de energía masculina, recableado de receptores D2 y mirada limpia estoica."
  },
  {
    id: "frio",
    title: "Choque Criogénico / Ducha Fría",
    icon: "❄️",
    auraKey: "salud",
    difficulty: "medio",
    xp: 50,
    desc: "3 minutos de choque de agua fría al despertar: vasoconstricción, disparo de noradrenalina y temple."
  },
  {
    id: "ayuno",
    title: "Ayuno Intermitente / Cero Azúcar",
    icon: "🥑",
    auraKey: "salud",
    difficulty: "medio",
    xp: 50,
    desc: "Ventana 16/8 de ayuno limpio, autofagia celular y erradicación total de picos de glucosa e insulina."
  },
  {
    id: "madrugar",
    title: "Madrugar & 0 Pantallas los Primeros 45 min",
    icon: "🌅",
    auraKey: "mente",
    difficulty: "medio",
    xp: 50,
    desc: "Despertar con la luz solar, hidratación con sal marina/limón y cero redes sociales al iniciar la jornada."
  },
  {
    id: "deepwork",
    title: "Bloque Deep Work Ininterrumpido (90 min)",
    icon: "🎯",
    auraKey: "mente",
    difficulty: "dificil",
    xp: 75,
    desc: "Inmersión sin distracciones ni multitarea en Tesis Hannover, código o proyectos prioritarios de alto valor."
  },
  {
    id: "combate",
    title: "Fuerza Extrema o Muay Thai al Límite",
    icon: "🥊",
    auraKey: "deporte",
    difficulty: "dificil",
    xp: 75,
    desc: "Entrenamiento marcial, sparring o sesión de fuerza/hipertrofia llevada a la falla muscular con honor."
  },
  {
    id: "finanzas",
    title: "Cero Gastos Tontos & Revisión Semanal",
    icon: "🪙",
    auraKey: "soberania",
    difficulty: "medio",
    xp: 50,
    desc: "Dominio de impulsos de compra, revisión de balances Sparkasse / Banco de Chile y ahorro soberano."
  }
];
window.CABALLERO_BONUS_CHALLENGES = CABALLERO_BONUS_CHALLENGES;

// --- MATRIZ DE NEURO-HABITUACIÓN DE 21 DÍAS (ALTO CONTRASTE & ESTÉTICA OBSIDIANA IMPERIAL) ---
function render21DayDashboardRoadmapHTML() {
  const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : { currentLevel: 1, currentSublevel: 1, completedDays: [1], xp: 0 };
  const currentRank = (typeof RANKS_STRUCTURE !== 'undefined' ? RANKS_STRUCTURE.find(r => r.level === profile.currentLevel) : null) || { name: 'Caballero Jaguar', level: 1, icon: '🐆' };
  const completedDays = Array.isArray(profile.completedDays) ? profile.completedDays : [1];
  const completedCount = completedDays.length;
  const progressPct = Math.min(100, Math.round((completedCount / 21) * 100));

  const scales = [
    { 
      num: 1, 
      name: "Escala I: Ruptura Dopaminérgica", 
      sub: "Días 1 al 7", 
      range: [1, 7], 
      desc: "Desactivación de impulsos reactivos, 0 porno, ayuno de dopamina barata y foco absoluto.", 
      milestone: "🎁 Hito 7 Días: +100 XP & Desbloqueo Sprite Oficial" 
    },
    { 
      num: 2, 
      name: "Escala II: Forja Neuronal Estoica", 
      sub: "Días 8 al 14", 
      range: [8, 14], 
      desc: "Construcción de la nueva vía sináptica. Entrenamientos inquebrantables, templanza y lectura.", 
      milestone: "🛡️ Hito 14 Días: +200 XP & Insignia de Acero Templado" 
    },
    { 
      num: 3, 
      name: "Escala III: Consagración del Caballero Jaguar", 
      sub: "Días 15 al 21", 
      range: [15, 21], 
      desc: "Consolidación en la identidad de caballería. El hábito se vuelve tu segunda naturaleza sagrada.", 
      milestone: "👑 Hito 21 Días: ¡Ascenso al Rango Siguiente de la Orden!" 
    }
  ];

  let scalesHTML = scales.map(scale => {
    const isScaleActive = (scale.num === (profile.currentSublevel || 1));
    let daysBtnsHTML = "";
    for (let d = scale.range[0]; d <= scale.range[1]; d++) {
      const isDone = completedDays.includes(d);
      const isToday = !isDone && (completedCount + 1 === d);

      let stateClass = isDone ? 'done' : (isToday ? 'active-today' : 'locked');
      let statusIcon = isDone ? '✓' : (isToday ? '🔥' : '⚡');
      let statusLabel = isDone ? 'Conquistado' : (isToday ? '¡Hoy!' : `Día ${d}`);
      let btnBg = isDone
        ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(16, 185, 129, 0.6) 100%)'
        : (isToday ? 'linear-gradient(135deg, rgba(161, 98, 7, 0.95) 0%, rgba(245, 158, 11, 0.6) 100%)' : 'rgba(255, 255, 255, 0.05)');
      let btnBorder = isDone ? '2px solid #10B981' : (isToday ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.15)');
      let numColor = isDone ? '#FFFFFF' : (isToday ? '#FFFFFF' : '#CBD5E1');
      let lblColor = isDone ? '#A7F3D0' : (isToday ? '#FEF08A' : '#94A3B8');

      daysBtnsHTML += `
        <button class="matrix-day-btn ${stateClass}" onclick="toggleDayFromHub(${d})" style="background: ${btnBg}; border: ${btnBorder}; border-radius: 6px; padding: 6px 3px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" title="Día ${d}: ${isDone ? 'Conquistado con honores (Clic para desmarcar)' : 'Clic para conquistar Día ' + d}">
          <span style="font-weight: 800; font-family: 'Cinzel', serif; font-size: 0.76rem; color: ${numColor};">Día ${d}</span>
          <span style="font-size: 1.05rem;">${statusIcon}</span>
          <span style="font-size: 0.62rem; font-weight: 700; color: ${lblColor};">${statusLabel}</span>
        </button>
      `;
    }

    const scaleCompletedCount = scale.range.filter(d => completedDays.includes(d)).length;

    return `
      <div class="matrix-scale-box ${isScaleActive ? 'active-scale' : ''}" style="background: linear-gradient(170deg, rgba(22, 27, 44, 0.92) 0%, rgba(12, 15, 25, 0.96) 100%); border: ${isScaleActive ? '2px solid #D4AF37' : '1.5px solid rgba(212, 175, 55, 0.3)'}; border-radius: var(--radius-sm); padding: 14px; box-shadow: ${isScaleActive ? '0 0 20px rgba(212, 175, 55, 0.2)' : '0 4px 12px rgba(0,0,0,0.4)'}; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(212, 175, 55, 0.25); padding-bottom: 6px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge-tag ${isScaleActive ? 'badge-gold' : 'badge-cyan'}" style="font-size: 0.68rem; padding: 2px 7px;">${scale.sub}</span>
              <h4 style="font-size: 0.94rem; color: #FFFFFF; font-family: 'Cinzel', serif; margin: 0; font-weight: 800;">${scale.name}</h4>
            </div>
            <span style="font-size: 0.85rem; font-weight: 900; color: #F5D77F; font-family: 'Cinzel', serif;">${scaleCompletedCount}/7</span>
          </div>
          <p style="font-size: 0.78rem; color: #CBD5E1; line-height: 1.35; margin: 0 0 10px 0;">${scale.desc}</p>
          
          <div class="matrix-days-row" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin: 10px 0;">
            ${daysBtnsHTML}
          </div>
        </div>

        <div style="font-size: 0.74rem; color: #F5D77F; background: rgba(212, 175, 55, 0.12); padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid rgba(212, 175, 55, 0.3); margin-top: 10px; font-weight: 600;">
          ${scale.milestone}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="challenge-parchment-matrix-wrap" id="neuro-matrix-21days" style="background: linear-gradient(165deg, rgba(20, 25, 40, 0.96) 0%, rgba(10, 13, 22, 0.98) 100%); border: 1.5px solid rgba(212, 175, 55, 0.4); border-radius: var(--radius-md); padding: 18px 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.65);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 2px solid #9B2335; padding-bottom: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-tag badge-gold" style="font-size: 0.68rem;">⚔️ CÓDICE DE CABALLERÍA</span>
            <span class="badge-tag badge-emerald" style="font-size: 0.68rem;">CLIC DIRECTO EN CUALQUIER DÍA</span>
          </div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #FFFFFF; margin: 4px 0 0 0; font-weight: 900;">
            Matriz de Templanza & Virtud (Ciclo de 21 Días)
          </h3>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.18rem; font-weight: 900; color: #F5D77F; font-family: 'Cinzel', serif;">
            🔥 Racha: ${completedCount} / 21 Días
          </div>
          <div style="font-size: 0.78rem; color: #94A3B8;">
            Nivel ${profile.currentLevel || 1}: <strong style="color: #FFF;">${currentRank.name}</strong> [Escala ${profile.currentSublevel || 1}/3]
          </div>
        </div>
      </div>

      <!-- BARRA DE PROGRESO DE ALTO CONTRASTE -->
      <div style="margin-top: 14px; background: rgba(0, 0, 0, 0.4); border: 1.5px solid rgba(212, 175, 55, 0.35); border-radius: var(--radius-sm); padding: 10px 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #E2E8F0; margin-bottom: 6px; font-weight: 700;">
          <span>Progreso de Reconfiguración Dopaminérgica & Hábitos</span>
          <span style="font-weight: 900; color: #34D399;">${progressPct}% Conquistado</span>
        </div>
        <div style="background: rgba(255,255,255,0.08); height: 12px; border-radius: 6px; overflow: hidden; border: 1px solid rgba(212,175,55,0.3); position: relative;">
          <div style="width: ${Math.max(4, progressPct)}%; height: 100%; background: linear-gradient(90deg, #9B2335 0%, #D4AF37 50%, #10B981 100%); transition: width 0.4s ease; border-radius: 6px;"></div>
        </div>
      </div>

      <!-- LAS 3 ESCALAS -->
      <div class="matrix-scales-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-top: 14px;">
        ${scalesHTML}
      </div>
    </div>
  `;
}
window.render21DayDashboardRoadmapHTML = render21DayDashboardRoadmapHTML;

function toggleDayFromHub(dayNum) {
  if (typeof toggleDayCompleted === 'function') {
    toggleDayCompleted(dayNum);
  }
  const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : null;
  const count = profile && Array.isArray(profile.completedDays) ? profile.completedDays.length : dayNum;
  if (reyJaguarState.character) {
    reyJaguarState.character.streakDays = Math.max(count, Number(reyJaguarState.character.streakDays) || 1);
    reyJaguarState.character.noPornDays = Math.max(count, Number(reyJaguarState.character.noPornDays) || 1);
    saveReyJaguarState();
  }
  const challengeHeaderDays = document.getElementById("header-challenge-days-text");
  if (challengeHeaderDays && reyJaguarState.character) {
    challengeHeaderDays.textContent = `DÍA ${reyJaguarState.character.noPornDays} EN VIRTUD`;
  }
  if (typeof renderRPGLandingHub === 'function') {
    renderRPGLandingHub();
  }
  const modal = document.getElementById("caballero-challenge-modal");
  if (modal && modal.classList.contains("active")) {
    openCaballeroChallengeModal();
  }
}
window.toggleDayFromHub = toggleDayFromHub;

// --- ACCIÓN DIRECTA: RECONCILIAR DÍA PREVIO O AVANZAR A DÍA OBJETIVO ---
function reconcileAndAdvanceVirtueDay(targetDay) {
  targetDay = Number(targetDay) || 2;
  if (window.CJProgress && typeof window.CJProgress.reconcileVirtueDay === 'function') {
    window.CJProgress.reconcileVirtueDay(targetDay);
  } else if (typeof toggleDayCompleted === 'function') {
    toggleDayCompleted(targetDay);
  }
  const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : null;
  if (profile) {
    if (!Array.isArray(profile.completedDays)) profile.completedDays = [];
    for (let i = 1; i <= targetDay; i++) {
      if (!profile.completedDays.includes(i)) profile.completedDays.push(i);
    }
    profile.completedDays.sort((a, b) => a - b);
    profile.streak = profile.completedDays.length;
  }
  if (reyJaguarState.character) {
    reyJaguarState.character.noPornDays = Math.max(targetDay, Number(reyJaguarState.character.noPornDays) || 1);
    reyJaguarState.character.streakDays = Math.max(targetDay, Number(reyJaguarState.character.streakDays) || 1);
    saveReyJaguarState();
  }
  const challengeHeaderDays = document.getElementById("header-challenge-days-text");
  if (challengeHeaderDays && reyJaguarState.character) {
    challengeHeaderDays.textContent = `DÍA ${reyJaguarState.character.noPornDays} EN VIRTUD`;
  }
  if (typeof playSoundEffect === 'function') playSoundEffect("levelup");
  if (typeof showNotification === 'function') {
    showNotification(`⚜️ ¡Día ${targetDay} en Virtud reconciliado y conquistado con honores!`);
  }
  if (typeof renderRPGLandingHub === 'function') renderRPGLandingHub();
  openCaballeroChallengeModal();
}
window.reconcileAndAdvanceVirtueDay = reconcileAndAdvanceVirtueDay;

// --- REGISTRO DE LOS 5 PILARES DE VIRTUD DIARIA ---
function toggleVirtuePillarAction(pillarId) {
  const pillar = VIRTUE_FIVE_PILLARS.find(p => p.id === pillarId);
  if (!pillar) return;

  const todayStr = cjToday();
  if (!reyJaguarState.dailyChallengeActions) reyJaguarState.dailyChallengeActions = {};
  if (!reyJaguarState.dailyChallengeActions[todayStr]) reyJaguarState.dailyChallengeActions[todayStr] = {};

  const isAlreadyDone = !!reyJaguarState.dailyChallengeActions[todayStr][pillarId];
  if (isAlreadyDone) {
    if (typeof showNotification === 'function') {
      showNotification(`⚜️ "${pillar.name}" ya fue registrado con honores hoy.`);
    }
    return;
  }

  reyJaguarState.dailyChallengeActions[todayStr][pillarId] = true;

  if (pillar.isMaster) {
    // 0 Porno es el Pilar Rey: avanza formalmente el Día de Virtud
    const curDays = (reyJaguarState.character && reyJaguarState.character.noPornDays) || 1;
    const nextDay = curDays + 1;
    reconcileAndAdvanceVirtueDay(nextDay);
  } else {
    // Los otros 4 hábitos se registran allí y otorgan su XP correspondiente
    if (!reyJaguarState.stats) reyJaguarState.stats = {};
    if (pillarId === 'pillar_ejercicio') {
      if (!reyJaguarState.stats['movilidad']) reyJaguarState.stats['movilidad'] = { name: "Movilidad Articular & Calistenia", value: 0, icon: "🤸" };
      reyJaguarState.stats['movilidad'].value = (reyJaguarState.stats['movilidad'].value || 0) + 1;
      if (!reyJaguarState.stats['fuerza']) reyJaguarState.stats['fuerza'] = { name: "Fuerza Gym", value: 0, icon: "💪" };
      reyJaguarState.stats['fuerza'].value = (reyJaguarState.stats['fuerza'].value || 0) + 1;
      reyJaguarState.dailyChallengeActions[todayStr]['movilidad'] = true;
    } else if (pillarId === 'pillar_aleman') {
      if (!reyJaguarState.stats['aleman']) reyJaguarState.stats['aleman'] = { name: "Alemán al Mediodía", value: 0, icon: "🇩🇪" };
      reyJaguarState.stats['aleman'].value = (reyJaguarState.stats['aleman'].value || 0) + 1;
    } else if (pillarId === 'pillar_lectura') {
      if (!reyJaguarState.stats['lectura']) reyJaguarState.stats['lectura'] = { name: "Lectura Estoica", value: 0, icon: "📖" };
      reyJaguarState.stats['lectura'].value = (reyJaguarState.stats['lectura'].value || 0) + 1;
    } else if (pillarId === 'pillar_meditacion') {
      if (!reyJaguarState.stats['meditacion']) reyJaguarState.stats['meditacion'] = { name: "Meditación Somática", value: 0, icon: "🧘" };
      reyJaguarState.stats['meditacion'].value = (reyJaguarState.stats['meditacion'].value || 0) + 1;
    }

    if (window.CJProgress && typeof window.CJProgress.award === 'function') {
      window.CJProgress.award({
        xp: pillar.xp,
        aura: pillar.aura,
        desc: `Pilar de Virtud: ${pillar.name}`,
        key: `pillar-${pillarId}-${todayStr}`
      });
    } else if (typeof awardXP === 'function') {
      awardXP(pillar.xp, `Pilar de Virtud: ${pillar.name}`, pillar.aura);
    }
    saveReyJaguarState();
    if (typeof playSoundEffect === 'function') playSoundEffect("success");
    if (typeof showNotification === 'function') {
      showNotification(`✓ ${pillar.name} registrado (+${pillar.xp} XP en ${pillar.aura}).`);
    }
    if (typeof renderRPGLandingHub === 'function') renderRPGLandingHub();
    openCaballeroChallengeModal();
  }
}
window.toggleVirtuePillarAction = toggleVirtuePillarAction;

// --- REGISTRO DE DESAFÍOS DE CABALLERÍA CON EXPERIENCIA EXTRA ---
function logChallengeBonusAction(challengeId) {
  if (challengeId === "detox" || challengeId === "pillar_nopor") {
    toggleVirtuePillarAction("pillar_nopor");
    return;
  }

  const challenge = CABALLERO_BONUS_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return;

  const todayStr = cjToday();
  if (!reyJaguarState.dailyChallengeActions) reyJaguarState.dailyChallengeActions = {};
  if (!reyJaguarState.dailyChallengeActions[todayStr]) reyJaguarState.dailyChallengeActions[todayStr] = {};

  const isAlreadyDone = !!reyJaguarState.dailyChallengeActions[todayStr][challengeId];
  if (isAlreadyDone) {
    if (typeof showNotification === 'function') {
      showNotification(`⚔️ Desafío "${challenge.title}" ya fue registrado con honores hoy.`);
    }
    return;
  }

  reyJaguarState.dailyChallengeActions[todayStr][challengeId] = true;

  if (typeof CaballeroScoringEngine !== 'undefined' && typeof CaballeroScoringEngine.awardAction === 'function') {
    CaballeroScoringEngine.awardAction(challenge.auraKey, challenge.difficulty, `Desafío Extra: ${challenge.title}`);
  } else if (window.CJProgress && typeof window.CJProgress.award === 'function') {
    window.CJProgress.award({
      xp: challenge.xp,
      aura: challenge.auraKey,
      desc: `Desafío Extra: ${challenge.title}`,
      key: `challenge-${challengeId}-${todayStr}`
    });
  } else {
    window.awardXP(challenge.xp, `Desafío Extra: ${challenge.title}`, challenge.auraKey);
  }

  saveReyJaguarState();
  if (typeof playSoundEffect === 'function') playSoundEffect("success");
  if (typeof triggerAvatarCelebrationEffect === 'function') {
    triggerAvatarCelebrationEffect(`⚡ ¡${challenge.title} Conquistado! +${challenge.xp} XP Extra otorgada.`);
  }

  if (typeof renderRPGLandingHub === 'function') renderRPGLandingHub();
  openCaballeroChallengeModal();
}
window.logChallengeBonusAction = logChallengeBonusAction;

function logCleanDayFromChallenge() {
  toggleVirtuePillarAction("pillar_nopor");
}
window.logCleanDayFromChallenge = logCleanDayFromChallenge;

// --- MODAL MAESTRO DEL CABALLERO JAGUAR CHALLENGE (ALTO CONTRASTE OBSIDIANA & 5 PILARES) ---
function openCaballeroChallengeModal() {
  let modal = document.getElementById("caballero-challenge-modal");
  let content = document.getElementById("caballero-challenge-content");
  if (!modal || !content) return;

  const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : null;
  const completedLen = profile && Array.isArray(profile.completedDays) ? profile.completedDays.length : 1;
  const noPornDays = Math.max(completedLen, (reyJaguarState.character && typeof reyJaguarState.character.noPornDays === 'number') ? reyJaguarState.character.noPornDays : 1);
  const todayStr = cjToday();
  const todayActions = (reyJaguarState.dailyChallengeActions && reyJaguarState.dailyChallengeActions[todayStr]) || {};

  content.innerHTML = `
    <!-- CABECERA DEL MODAL CON ESTILO OBSIDIANA & ALTO CONTRASTE -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #9B2335; padding-bottom: 14px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="badge-tag badge-gold" style="font-size: 0.72rem; padding: 3px 8px;">⚜️ CABALLERO JAGUAR CHALLENGE</span>
          <span class="badge-tag badge-emerald" style="font-size: 0.72rem; padding: 3px 8px;">Autodominio Dopaminérgico & Templanza</span>
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.65rem; color: #FFFFFF; margin: 4px 0 2px 0; font-weight: 900; letter-spacing: 0.04em;">
          Días en Virtud & Matriz de 21 Días
        </h2>
        <div style="font-size: 0.82rem; color: #94A3B8;">
          Orden Imperial del Caballero Jaguar • Programa de Hábitos Diurnos & Reconfiguración Sináptica
        </div>
      </div>
      <button onclick="closeCaballeroChallengeModal()" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; color: #FFFFFF; transition: all 0.2s;" title="Cerrar modal">✕</button>
    </div>

    <!-- TARJETA DESTACADA: CONTADOR DÍAS EN VIRTUD & RECONCILIACIÓN -->
    <div style="background: linear-gradient(135deg, rgba(26, 32, 50, 0.95) 0%, rgba(14, 18, 29, 0.98) 100%); border: 2px solid #D4AF37; border-radius: var(--radius-md); padding: 20px 24px; margin-bottom: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.65); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 18px;">
        <div style="width: 82px; height: 82px; border-radius: 50%; background: #0A0D15; border: 3px solid #D4AF37; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);">
          <span style="font-size: 0.65rem; color: #F5D77F; font-family: 'Cinzel', serif; font-weight: 800; letter-spacing: 1px;">DÍA</span>
          <strong style="font-size: 1.9rem; color: #FFFFFF; font-family: 'Cinzel', serif; line-height: 1;">${noPornDays}</strong>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: #F5D77F; font-family: 'Cinzel', serif; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase;">ESTADO DE CLARIDAD MENTAL & TEMPLANZA</span>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #FFFFFF; margin: 2px 0 4px 0; font-weight: 900;">
            ${noPornDays} Días Sin Porno Consecutivos
          </h3>
          <p style="font-size: 0.84rem; color: #CBD5E1; margin: 0; line-height: 1.4;">
            Recableado de receptores D2, mirada limpia, energía masculina preservada y presencia estoica inquebrantable.
          </p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
        <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; font-size: 0.88rem; padding: 11px 24px; box-shadow: 0 4px 16px rgba(212,175,55,0.4); cursor: pointer;" onclick="logCleanDayFromChallenge()">
          🕊️ Conquistar Día de Virtud Hoy (+75 XP)
        </button>
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          <button onclick="reconcileAndAdvanceVirtueDay(${Math.min(21, noPornDays + 1)})" style="background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.45); color: #F5D77F; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; cursor: pointer;" title="Avanzar manualmente si olvidaste marcar ayer">
            ⚡ Marcar Día ${Math.min(21, noPornDays + 1)} Conquistado
          </button>
          <button onclick="if(window.hypomnemataJournal) hypomnemataJournal.openOfflineModal();" style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.45); color: #6EE7B7; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; cursor: pointer;" title="Abrir bitácora de práctica offline y días anteriores">
            📅 Práctica Offline
          </button>
        </div>
      </div>
    </div>

    <!-- SECCIÓN: LOS 5 PILARES SAGRADOS DE VIRTUD DIARIA -->
    <div style="background: linear-gradient(165deg, rgba(20, 24, 38, 0.95) 0%, rgba(11, 14, 23, 0.98) 100%); border: 1.5px solid rgba(212,175,55,0.4); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 22px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(212,175,55,0.3); padding-bottom: 10px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.35rem;">🏛️</span>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 7px;">PILARES DE VIDA</span>
              <span class="badge-tag badge-emerald" style="font-size: 0.68rem; padding: 2px 7px;">0 PORNO ES EL PILAR REY</span>
            </div>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.22rem; color: #FFFFFF; margin: 3px 0 0 0; font-weight: 800;">
              Los 5 Pilares Diarios de Virtud
            </h3>
          </div>
        </div>
        <div style="font-size: 0.78rem; color: #94A3B8; max-width: 420px; text-align: right;">
          El <strong>0 Porno</strong> es el pilar rey que define el avance del Día en Virtud. Los otros 4 hábitos se registran aquí diariamente.
        </div>
      </div>

      <!-- GRID DE LOS 5 PILARES -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">
        ${VIRTUE_FIVE_PILLARS.map(p => {
          const isDone = p.isMaster ? (todayActions["detox"] || todayActions[p.id]) : !!todayActions[p.id];
          return `
            <div style="background: ${p.isMaster ? 'linear-gradient(145deg, rgba(155, 35, 53, 0.25) 0%, rgba(20, 24, 38, 0.95) 100%)' : 'rgba(255, 255, 255, 0.04)'}; border: ${p.isMaster ? '2px solid #D4AF37' : (isDone ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.12)')}; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; transition: all 0.2s;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 1.35rem;">${p.icon}</span>
                  <span class="badge-tag ${isDone ? 'badge-emerald' : (p.isMaster ? 'badge-gold' : 'badge-cyan')}" style="font-size: 0.68rem; padding: 2px 8px; font-weight: 800;">
                    ${isDone ? '✓ CONQUISTADO' : `+${p.xp} XP`}
                  </span>
                </div>
                <div style="font-size: 0.66rem; font-weight: 800; color: ${p.isMaster ? '#F5D77F' : '#94A3B8'}; letter-spacing: 0.05em; text-transform: uppercase;">
                  ${p.role}
                </div>
                <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFFFFF; margin: 3px 0 4px 0; font-weight: 800;">
                  ${p.name}
                </h4>
                <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
                  ${p.desc}
                </p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <span style="font-size: 0.68rem; color: #94A3B8; font-style: italic;">
                  ${p.isMaster ? '⚡ Avanza el Reto 21 Días' : '✓ Registro diario'}
                </span>
                ${isDone ? `
                  <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.74rem; font-weight: 800; color: #34D399; background: rgba(16, 185, 129, 0.15); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.4);">
                    ✓ Registrado Hoy
                  </span>
                ` : `
                  <button class="btn-jaguar btn-sm ${p.isMaster ? 'btn-gold-chrome' : 'btn-secondary-dark'}" style="${p.isMaster ? 'color: #0E0905; font-weight: 900;' : 'color: #FFF;'} font-size: 0.74rem; padding: 5px 12px; cursor: pointer;" onclick="toggleVirtuePillarAction('${p.id}')">
                    ${p.isMaster ? '🛡️ Sellar Día (+75 XP)' : '✓ Registrar (+'+p.xp+' XP)'}
                  </button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- MATRIZ DE CABALLERÍA DE 21 DÍAS (ALTO CONTRASTE OBSIDIANA) -->
    <div style="margin-bottom: 22px;">
      ${render21DayDashboardRoadmapHTML()}
    </div>

    <!-- PANEL DE DESAFÍOS DE CABALLERÍA ADICIONALES -->
    <div style="background: linear-gradient(165deg, rgba(20, 24, 38, 0.95) 0%, rgba(11, 14, 23, 0.98) 100%); border: 1.5px solid rgba(212,175,55,0.35); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(212,175,55,0.25); padding-bottom: 8px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.3rem;">⚡</span>
          <div>
            <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 7px;">ACCIONES DE TEMPLANZA</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.18rem; color: #FFFFFF; margin: 2px 0 0 0; font-weight: 800;">
              Desafíos Adicionales con Experiencia Extra
            </h3>
          </div>
        </div>
        <div style="font-size: 0.76rem; color: #94A3B8;">
          Acciones complementarias para acelerar tu ascenso de rango en la Orden:
        </div>
      </div>

      <div class="challenge-action-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
        ${CABALLERO_BONUS_CHALLENGES.filter(c => c.id !== "detox").map(c => {
          const isDone = !!todayActions[c.id];
          return `
            <div class="challenge-action-card ${isDone ? 'done' : ''}" style="background: rgba(255, 255, 255, 0.04); border: ${isDone ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.12)'}; border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 1.25rem;">${c.icon}</span>
                  <span class="badge-tag ${isDone ? 'badge-emerald' : 'badge-gold'}" style="font-size: 0.68rem; padding: 2px 7px; font-weight: 800;">
                    +${c.xp} XP EXTRA
                  </span>
                </div>
                <h4 style="font-family: 'Cinzel', serif; font-size: 0.9rem; color: #FFFFFF; margin: 0 0 4px 0; font-weight: 800;">
                  ${c.title}
                </h4>
                <p style="font-size: 0.75rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
                  ${c.desc}
                </p>
              </div>

              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                ${isDone ? `
                  <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.74rem; font-weight: 800; color: #34D399; background: rgba(16, 185, 129, 0.15); padding: 5px 10px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.4);">
                    ✓ Conquistado Hoy (+${c.xp} XP)
                  </span>
                ` : `
                  <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-size: 0.74rem; font-weight: 800; padding: 5px 12px; cursor: pointer;" onclick="logChallengeBonusAction('${c.id}')">
                    ⚔️ Conquistar (+${c.xp} XP)
                  </button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- PIE DEL MODAL -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid rgba(212,175,55,0.3); padding-top: 14px; flex-wrap: wrap; gap: 10px;">
      <span style="font-size: 0.78rem; color: #F5D77F; font-style: italic;">
        ⚜️ "La verdadera libertad no es hacer lo que apetece, sino dominar aquello que nos tienta." — Séneca
      </span>
      <button class="btn-jaguar btn-secondary-dark" style="padding: 8px 20px; font-weight: 700; color: #FFF; cursor: pointer;" onclick="closeCaballeroChallengeModal()">
        Cerrar Desafío
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openCaballeroChallengeModal = openCaballeroChallengeModal;

function closeCaballeroChallengeModal() {
  const modal = document.getElementById("caballero-challenge-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
window.closeCaballeroChallengeModal = closeCaballeroChallengeModal;


// ==========================================================================
// SISTEMA KINGDOM COME: DELIVERANCE (KCD) - RETABLO DE CABALLERÍA & STAT LEDGER
// ==========================================================================

// 16 Ranuras Reales correspondientes a los 16 objetos de la Orden (8 Izquierda / 8 Derecha)
const KCD_SLOTS_DEF = [
  // 8 Ranuras Columna Izquierda (Slots 1 al 8)
  { key: "slot_1", slotNumber: 1, defaultItemId: 1 },
  { key: "slot_2", slotNumber: 2, defaultItemId: 2 },
  { key: "slot_3", slotNumber: 3, defaultItemId: 3 },
  { key: "slot_4", slotNumber: 4, defaultItemId: 4 },
  { key: "slot_5", slotNumber: 5, defaultItemId: 5 },
  { key: "slot_6", slotNumber: 6, defaultItemId: 6 },
  { key: "slot_7", slotNumber: 7, defaultItemId: 7 },
  { key: "slot_8", slotNumber: 8, defaultItemId: 8 },

  // 8 Ranuras Columna Derecha (Slots 9 al 16)
  { key: "slot_9", slotNumber: 9, defaultItemId: 9 },
  { key: "slot_10", slotNumber: 10, defaultItemId: 10 },
  { key: "slot_11", slotNumber: 11, defaultItemId: 11 },
  { key: "slot_12", slotNumber: 12, defaultItemId: 12 },
  { key: "slot_13", slotNumber: 13, defaultItemId: 13 },
  { key: "slot_14", slotNumber: 14, defaultItemId: 14 },
  { key: "slot_15", slotNumber: 15, defaultItemId: 15 },
  { key: "slot_16", slotNumber: 16, defaultItemId: 16 }
];

function scrollToMatrix() {
  openKCDInspector({ type: 'level' });
}
window.scrollToMatrix = scrollToMatrix;

// --- COMPONENTE: JERARQUÍA Y RANGOS DE LA ORDEN (DEBAJO DEL PERFIL EN EL LANDING) ---
function renderOrderRanksComponent() {
  try {
    const ranks = (typeof CaballeroScoringEngine !== 'undefined' && Array.isArray(CaballeroScoringEngine.ranks)) 
      ? CaballeroScoringEngine.ranks 
      : (reyJaguarState.ranks || []);
    const currentXp = (reyJaguarState.character && typeof reyJaguarState.character.xp === 'number') 
      ? reyJaguarState.character.xp 
      : 0;
    const currentRankInfo = (typeof CaballeroScoringEngine !== 'undefined' && typeof CaballeroScoringEngine.getRankForXP === 'function') 
      ? CaballeroScoringEngine.getRankForXP(currentXp) 
      : { rank: 1, level: 1, title: "Caballero Explorador", desc: "Compromiso territorial y disciplina base." };
    const activeRankIdx = Math.max(0, Math.min(ranks.length - 1, (currentRankInfo.rank || 1) - 1));
    const rankXPThresholds = [0, 1000, 3500, 8500, 18000];

    return `
      <div class="kcd-ranks-landing-panel" style="background: #FAF6EE; border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px 20px; box-shadow: var(--shadow-metallic); margin-top: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.3rem;">👑</span>
            <div>
              <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 7px;">JERARQUÍA DE CABALLERÍA</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #0E0E13; margin: 2px 0 0 0;">Rangos de la Orden del Jaguar</h3>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-family: 'Cinzel', serif; font-size: 0.82rem; color: #0E0E13; font-weight: 800;">XP Acumulada: <strong style="color: #9B2335;">${currentXp} XP</strong></span>
            <div style="font-size: 0.72rem; color: rgba(255,255,255,0.4);">Rango Activo: Rango ${activeRankIdx + 1} (${currentRankInfo.title || "Caballero"})</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
          ${ranks.map((r, i) => {
            const isActive = (i === activeRankIdx);
            const isCompleted = (i < activeRankIdx);
            const isLocked = (i > activeRankIdx);
            const reqXP = rankXPThresholds[i] || 0;
            return `
              <div style="padding: 12px 14px; border-radius: var(--radius-sm); border: 1.5px solid ${isActive ? '#9B2335' : (isCompleted ? '#2B6847' : 'rgba(100,116,139,0.25)')}; background: ${isActive ? 'linear-gradient(135deg, rgba(197,154,40,0.15) 0%, #FFFFFF 100%)' : (isCompleted ? 'rgba(43,104,71,0.08)' : '#F5EFE6')}; display: flex; flex-direction: column; justify-content: space-between; min-height: 110px; box-shadow: ${isActive ? '0 4px 12px rgba(197,154,40,0.2)' : 'none'};">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 1.1rem;">${isCompleted ? '✓' : (isActive ? '👑' : '🔒')}</span>
                    <span class="badge-tag ${isActive ? 'badge-emerald' : (isCompleted ? 'badge-gold' : 'badge-pink')}" style="font-size: 0.65rem; padding: 1px 6px;">
                      ${isActive ? 'ACTIVO' : (isCompleted ? 'SUPERADO' : `${reqXP.toLocaleString()} XP`)}
                    </span>
                  </div>
                  <h4 style="font-family: 'Cinzel', serif; font-size: 0.88rem; color: ${isActive ? '#0E0E13' : (isCompleted ? '#1A3324' : '#718096')}; font-weight: 800; margin: 0;">${r.title}</h4>
                  <p style="font-size: 0.72rem; color: ${isActive ? '#5D4E3E' : '#718096'}; margin: 4px 0 0 0; line-height: 1.3;">${r.desc}</p>
                </div>
                <div style="margin-top: 8px; font-size: 0.68rem; font-weight: 700; color: ${isActive ? '#9B2335' : (isCompleted ? '#2B6847' : '#A0AEC0')};">
                  ${isActive ? '🔥 Rango Actual' : (isCompleted ? '✓ Conquistado' : `Requiere ${reqXP.toLocaleString()} XP`)}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error al renderizar rangos de la orden:", err);
    return "";
  }
}
window.renderOrderRanksComponent = renderOrderRanksComponent;

// --- RENDERIZADO PRINCIPAL DEL LANDING HUB (ESTÉTICA MINIMALISTA DIURNA KCD / DELEGACIÓN IMPERIVM) ---
function renderRPGLandingHub(targetContainerId) {
  // El dashboard principal le pertenece exclusivamente a imperivmEngine:
  if (!targetContainerId || targetContainerId === "rpg-landing-master-container") {
    if (window.imperivmEngine && typeof window.imperivmEngine.render === "function") {
      window.imperivmEngine.render();
    }
    return;
  }

  // El retablo solo puede renderizarse si se solicita explícitamente para el contenedor de legado
  const container = (typeof targetContainerId === "string")
    ? document.getElementById(targetContainerId)
    : targetContainerId;
  if (!container) return;

  try {
    syncBankSummaryWithFinanceState();

    const idx = (reyJaguarState.character && typeof reyJaguarState.character.currentRankIndex === 'number') ? reyJaguarState.character.currentRankIndex : 0;
    const ranksArr = reyJaguarState.ranks || [];
    const currentRank = (ranksArr[idx]) ? ranksArr[idx] : { title: "Rango 1: Caballero Explorador", desc: "Compromiso social y territorial." };

    const inventory = reyJaguarState.inventory || [];

    const renderNiche = (slot) => {
      const item = inventory.find(i => i.id === slot.defaultItemId);
      if (!item) {
        return `
          <div class="kcd-niche-slot empty-slot">
            <div class="kcd-niche-crest">✨</div>
            <div class="kcd-niche-icon-frame"><span style="font-size: 1.1rem; opacity: 0.6;">🔲</span></div>
            <div class="kcd-niche-info">
              <span class="kcd-niche-label">Ranura ${slot.slotNumber}</span>
              <span class="kcd-niche-name">Ranura Vacía</span>
              <span class="kcd-niche-stat">Disponible</span>
            </div>
          </div>
        `;
      }

      const isEquipped = !!item.equipped;
      const isUnlocked = !!item.unlocked;

      if (isEquipped) {
        return `
          <div class="kcd-niche-slot active-slot" onclick="openItemDetailModal(${item.id})" title="Inspeccionar ${item.name} (Equipado)">
            <div class="kcd-niche-crest">⚔️</div>
            <div class="kcd-niche-icon-frame">
              <div class="sprite-item item-${item.spriteIndex}" style="width: 34px; height: 34px; transform: scale(0.9);"></div>
            </div>
            <div class="kcd-niche-info">
              <span class="kcd-niche-label">Ranura ${slot.slotNumber} • Activo</span>
              <span class="kcd-niche-name">${item.name}</span>
              <span class="kcd-niche-stat" style="color: #68D391; font-weight: 700;">⚔️ En Combate</span>
            </div>
          </div>
        `;
      } else if (isUnlocked) {
        return `
          <div class="kcd-niche-slot empty-slot" onclick="openItemDetailModal(${item.id})" title="${item.name} está en tu alijo. Haz clic para equipar o ver su historia.">
            <div class="kcd-niche-crest">🎒</div>
            <div class="kcd-niche-icon-frame">
              <span style="font-size: 1.15rem; opacity: 0.7;">🔲</span>
            </div>
            <div class="kcd-niche-info">
              <span class="kcd-niche-label">Ranura ${slot.slotNumber}</span>
              <span class="kcd-niche-name" style="color: #A0AEC0; font-style: italic;">Ranura Vacía</span>
              <span class="kcd-niche-stat" style="color: #C0392B;">🎒 En Alijo</span>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="kcd-niche-slot locked-slot" onclick="openItemDetailModal(${item.id})" title="Objeto #${item.id} bloqueado. Haz clic para ver cómo desbloquear.">
            <div class="kcd-niche-crest" style="opacity: 0.5;">🔒</div>
            <div class="kcd-niche-icon-frame" style="opacity: 0.35;">
              <span style="font-size: 1rem;">🔒</span>
            </div>
            <div class="kcd-niche-info">
              <span class="kcd-niche-label">Ranura ${slot.slotNumber}</span>
              <span class="kcd-niche-name" style="color: #718096; font-style: italic;">Ranura Vacía</span>
              <span class="kcd-niche-stat" style="color: #E53E3E; opacity: 0.85;">🔒 Por Desbloquear</span>
            </div>
          </div>
        `;
      }
    };

    const leftNichesHTML = KCD_SLOTS_DEF.slice(0, 8).map(renderNiche).join("");
    const rightNichesHTML = KCD_SLOTS_DEF.slice(8, 16).map(renderNiche).join("");

    const getStatVal = (key, defaultVal) => {
      return (reyJaguarState.stats && reyJaguarState.stats[key] && typeof reyJaguarState.stats[key].value === 'number')
        ? reyJaguarState.stats[key].value
        : defaultVal;
    };

    const focoVal = getStatVal('foco', 18);
    const sabiduriaVal = getStatVal('sabiduria', 25);
    const autodominioVal = getStatVal('autodominio', 21);

    const fuerzaVal = getStatVal('fuerza', 14);
    const resistenciaVal = getStatVal('resistencia', 18);
    const combateVal = getStatVal('combate', 12);

    const tesisVal = getStatVal('tesis', 15);
    const idiomasVal = getStatVal('idiomas', 14);
    const agrotechVal = getStatVal('agrotech', 16);

    const finanzasVal = getStatVal('finanzas', 12);
    const saludVal = getStatVal('salud', 19);
    const nutricionVal = getStatVal('nutricion', 24);

    const streakDays = reyJaguarState.character ? (reyJaguarState.character.streakDays || 7) : 7;
    const xp = reyJaguarState.character ? (reyJaguarState.character.xp || 350) : 350;
    const level = reyJaguarState.character ? (reyJaguarState.character.level || 1) : 1;
    const xpPct = Math.min(100, Math.round((xp % 500) / 5));

    // Datos del perfil y matriz de 21 días
    const profile = typeof getActiveProfile === 'function' ? getActiveProfile() : { currentLevel: 1, currentSublevel: 1, completedDays: [], xp: 350 };
    const completedDaysCount = (profile.completedDays && profile.completedDays.length > 0) ? profile.completedDays.length : streakDays;
    const matrixProgressPct = Math.min(100, Math.round((completedDaysCount / 21) * 100));
    const currentDayNum = Math.min(21, completedDaysCount + 1);

    container.innerHTML = `
      <div class="kcd-game-wrapper">
        
        <!-- 1. RETABLO GÓTICO KCD (HORNACINA CENTRAL ILUMINADA POR EL SOL DE DÍA) -->
        <div class="kcd-altarpiece-stage">
          
          <!-- COLUMNA IZQUIERDA: 8 RANURAS DE EQUIPO -->
          <div class="kcd-gear-column">
            ${leftNichesHTML}
          </div>

          <!-- CENTRO: HORNACINA CATEDRALICIA CON EL CABALLERO JAGUAR & BANDERINES HERÁLDICOS -->
          <div class="kcd-alcove-center" style="position: relative;">
            <div class="kcd-gothic-arch-frame"></div>
            <div class="kcd-sunbeams"></div>

            <div class="kcd-apex-crest">
              <span>⚜️ ORDEN DEL CABALLERO JAGUAR ⚜️</span>
            </div>

            <!-- BANDERINES HERÁLDICOS COLGANTES (REEMPLAZO DE AURAS DE COLORES CON LARGO DINÁMICO) -->
            ${(typeof CaballeroScoringEngine !== 'undefined') ? CaballeroScoringEngine.renderHangingPennantsHTML() : ''}

            <!-- BANDERÍN COLGANTE DE CABALLERÍA (CABALLERO JAGUAR CHALLENGE) -->
            <div class="kcd-hanging-pennant" style="margin-top: 50px;" onclick="openCaballeroChallengeModal()" title="Haz clic para abrir el Caballero Jaguar Challenge & Matriz de 21 Días">
              <div class="kcd-hanging-pennant-ribbon">
                <span>⚜️ CABALLERO CHALLENGE ⚜️</span>
              </div>
              <div class="kcd-hanging-pennant-day">
                DÍA ${(reyJaguarState.character && reyJaguarState.character.noPornDays) || 1} LIMPIO
              </div>
              <div class="kcd-hanging-pennant-pct">
                🔥 DÍA ${currentDayNum} DE 21
              </div>
            </div>

            <div class="kcd-character-stage">
              <div class="kcd-character-avatar-box" onclick="openKCDInspector({ type: 'character' })" style="cursor: pointer;" title="Haz clic para inspeccionar biografía">
                <img src="assets/jaguar_avatar_fullbody.png" alt="Caballero Jaguar" class="kcd-character-avatar-img">
              </div>

              <div class="kcd-character-pedestal" onclick="openKCDInspector({ type: 'character' })" style="cursor: pointer;">
                <h4>${reyJaguarState.character.name}</h4>
                <p>NIVEL ${level} • ${currentRank.title.toUpperCase()}</p>
                <div style="font-size: 0.68rem; color: rgba(255,255,255,0.25); margin-top: 2px;">♈ Sol en Aries • Regente Marte | 🔥 Racha: ${streakDays} Días</div>
              </div>
            </div>

            <div style="z-index: 4; font-size: 0.72rem; color: #C0392B; letter-spacing: 1px; font-family: 'Cinzel', serif; opacity: 0.85;">
              🔍 HAZ CLIC EN CUALQUIER RANURA, BANDERÍN O STAT PARA INSPECCIONAR
            </div>
          </div>

          <!-- COLUMNA DERECHA: 8 RANURAS DE EQUIPO -->
          <div class="kcd-gear-column">
            ${rightNichesHTML}
          </div>

        </div>

        <!-- 2. JERARQUÍA & RANGOS DE LA ORDEN CON SPRITE AVATAR COMPLEMENTARIO -->
        <div class="kcd-stat-ledger-wrapper" style="display: flex; gap: 16px; align-items: stretch; margin-top: 14px;">
          <!-- AVATAR SPRITE COMPANION CON NIVEL & PROGRESO A LA IZQUIERDA -->
          <div class="kcd-sprite-companion-box" style="cursor: pointer;" title="Sprite FF7 Walk • Progreso de Caballería">
            <span class="badge-tag badge-gold" style="font-size: 0.62rem; padding: 2px 6px;">EQUIPADO</span>
            <div class="kcd-sprite-companion-frame" onclick="openKCDInspector({ type: 'item', item: (reyJaguarState.inventory || []).find(i => i.id === 1) || { id: 1 } })">
              <div class="sprite-item item-1" style="width: 52px; height: 52px; transform: scale(1.2);"></div>
            </div>
            <strong style="font-family: 'Cinzel', serif; font-size: 0.85rem; color: #FAF6EE; margin-top: 2px; display: block; line-height: 1.2;">Sprite Walk</strong>
            <span style="font-size: 0.68rem; color: #C0392B; font-family: monospace;">FF7 16-Bit</span>

            <!-- MENSAJE DE NIVEL Y PROGRESO DE CABALLERÍA BAJO EL SPRITE -->
            <div class="kcd-sprite-level-badge-card" onclick="openKCDInspector({ type: 'level' })" title="Ver Códice de Nivel y Matriz de 21 Días">
              <span class="kcd-sprite-level-title-text">🗣️ MAIN LEVEL ${level} • ${currentRank.title}</span>
              <div style="font-size: 0.68rem; color: rgba(255,255,255,0.25); font-family: 'Cinzel', serif; font-weight: 800; margin-top: 2px;">
                Progreso: <span style="color: #E8A0A8;">${xp} XP</span>
              </div>
              <div class="kcd-sprite-xp-bar-wrap">
                <div class="kcd-sprite-xp-bar-fill" style="width: ${xpPct}%;"></div>
              </div>
            </div>
          </div>

          <!-- A LA DERECHA DEL SPRITE: RANGOS DE LA ORDEN DEL JAGUAR & ACCIONES RÁPIDAS -->
          <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
            ${renderOrderRanksComponent()}

            <!-- BANDERÍN INFERIOR DE ACCIONES RÁPIDAS KCD -->
            <div class="kcd-ledger-footer-banner" style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; margin-top: 4px;">
              <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem; padding: 6px 12px;" onclick="openKCDInspector({ type: 'quests' })" title="Ver misiones de Hannover & Bilbao in situ">
                📜 Misiones de Campaña
              </button>

              <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem; padding: 6px 12px;" onclick="openKCDInspector({ type: 'calculator' })" title="Calculadora de Puntuación & Gráfico de Mezcla">
                📐 Calculadora & Mezcla
              </button>

              <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 6px 16px; font-size: 0.78rem;" onclick="openKCDInspector({ type: 'tasks' })" title="Abrir Códice de Deberes (Diarias & Semanales)">
                📜 Códice de Deberes
              </button>
            </div>
          </div>
        </div>

        <!-- 4. SECCIÓN: REGISTRO MAESTRO DE TIEMPO, ENFOQUE & DEEP WORK (STREAMLINED TRACKING) -->
        <div class="kcd-tracking-section" style="margin-top: 16px; background: #FAF6EE; border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-metallic);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.25rem;">⏳</span>
              <div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #0E0E13; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800;">Registro de Tiempo & Foco</h3>
                <p style="font-size: 0.78rem; color: #7A6347; margin: 2px 0 0 0;">Tiempo = Experiencia de Caballería (Multiplicador por Novedad y Carga Cognitiva)</p>
              </div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-size: 0.72rem; font-weight: 800; padding: 4px 10px;" onclick="openPomodoroModal();">
                ⏱️ Modo Foco Cyberpunk
              </button>
              <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.72rem; padding: 4px 10px;" onclick="openKCDInspector({ type: 'calculator' });">
                📐 Simular XP
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px;">
            <!-- FORMULARIO DE REGISTRO DE TIEMPO CON PONDERACIÓN -->
            <div class="kcd-task-col-box" style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-sm); padding: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
              <div class="kcd-task-col-header" style="border-bottom: 1px solid rgba(197,154,40,0.25); padding-bottom: 8px; margin-bottom: 12px;">
                <div class="kcd-task-col-title">
                  <span>⏳</span>
                  <h4 style="color: #0E0E13; font-family: 'Cinzel', serif; font-size: 0.95rem; margin: 0;">Registrar Sesión</h4>
                </div>
                <span class="badge-tag badge-amber" style="font-size: 0.68rem; padding: 2px 7px;">Tiempo = XP</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div>
                  <label style="font-size: 0.72rem; color: #7A6347; font-weight: 700; display: block; margin-bottom: 3px;">Actividad Realizada:</label>
                  <input type="text" id="log-act-name" class="kcd-task-input" placeholder="Ej. Tesis Hannover, Trompeta Jazz, Muay Thai..." style="width: 100%;">
                </div>

                <div style="display: flex; gap: 8px;">
                  <div style="flex: 1;">
                    <label style="font-size: 0.72rem; color: #7A6347; font-weight: 700; display: block; margin-bottom: 3px;">Categoría:</label>
                    <select id="log-act-cat" class="kcd-task-select" style="width: 100%;">
                      <option value="tesis">Tesis Hannover (1.5x)</option>
                      <option value="musica">Música / Viento & Jazz (1.8x - Novedad)</option>
                      <option value="pintura">Pintura al Óleo & Color (1.8x - Novedad)</option>
                      <option value="fotografia">Fotografía & Óptica (1.6x - Novedad)</option>
                      <option value="idiomas">Idiomas DE/EU/PT (1.6x)</option>
                      <option value="combate">Muay Thai / Sparring (1.4x)</option>
                      <option value="ejercicio">Gym & Resistencia (1.3x)</option>
                      <option value="somatico">Vida Sana / Somático (1.3x)</option>
                      <option value="proyectos">Proyectos & ReWild (1.4x)</option>
                      <option value="trabajo">Búsqueda Empleo (1.2x)</option>
                      <option value="finanzas">Soberanía Financiera (1.2x)</option>
                      <option value="general">Hábito General (1.0x)</option>
                    </select>
                  </div>
                  <div style="width: 80px;">
                    <label style="font-size: 0.72rem; color: #7A6347; font-weight: 700; display: block; margin-bottom: 3px;">Minutos:</label>
                    <input type="number" id="log-act-dur" class="kcd-task-input" value="30" min="5" style="width: 100%;">
                  </div>
                </div>

                <button class="kcd-task-add-btn" style="width: 100%; padding: 8px; font-size: 0.82rem; font-weight: 800;" onclick="logActivity()">
                  + Registrar Actividad & Ganar XP
                </button>
              </div>
            </div>

            <!-- HISTORIAL DE ACTIVIDADES REGISTRADAS -->
            <div class="kcd-task-col-box" style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-sm); padding: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
              <div class="kcd-task-col-header" style="border-bottom: 1px solid rgba(197,154,40,0.25); padding-bottom: 8px; margin-bottom: 10px;">
                <div class="kcd-task-col-title">
                  <span>📜</span>
                  <h4 style="color: #0E0E13; font-family: 'Cinzel', serif; font-size: 0.95rem; margin: 0;">Historial Reciente</h4>
                </div>
                <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 7px;">Sesiones Registradas</span>
              </div>

              <div class="task-list-box custom-scrollbar" id="activity-logs-list" style="max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                <!-- Llenado dinámico por renderTimeTracker() -->
              </div>
            </div>
          </div>
        </div>

        <!-- 5. BARRA RÁPIDA DE ENLACES DE LA ORDEN (MINIMALISTA) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FAF6EE; border: 1.5px solid var(--border-gold); padding: 10px 18px; border-radius: var(--radius-md); box-shadow: var(--shadow-metallic); flex-wrap: wrap; gap: 10px; margin-top: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.1rem;">💰</span>
            <span style="font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 800; color: #0E0E13;">Tesorería Consolidada:</span>
            <span style="font-size: 0.82rem; color: #2B6847; font-weight: 800;">$${(reyJaguarState.bankSummary.bancoChileCurrentCLP || 1850000).toLocaleString('es-CL')} CLP</span> • 
            <span style="font-size: 0.82rem; color: #9B2335; font-weight: 800;">€${(reyJaguarState.bankSummary.sparkasseCurrentEUR || 2450).toLocaleString('de-DE')} EUR</span>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-size: 0.75rem; font-weight: 800;" onclick="selectMainTab('lifestyle'); renderLifestyleArchitectApp();">
              🌊 Flow Mode ➔
            </button>
            <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem;" onclick="openKCDInspector({ type: 'quests' });">
              📜 Misiones In Situ
            </button>
            <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem;" onclick="openKCDInspector({ type: 'calculator' });">
              📐 Calculadora XP
            </button>
            <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem;" onclick="selectMainTab('finanzas');">
              💰 Finanzas ➔
            </button>
            <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-size: 0.75rem; font-weight: 800;" onclick="selectMainTab('inventario'); renderInventoryTab();">
              🎒 Alijo ➔
            </button>
            <button class="btn-jaguar btn-sm" style="color: #8C5304; background: rgba(224, 138, 25, 0.15); border: 1.5px solid #C57E16; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;" onclick="launchDateMasterApex(event);" title="Ejecutar y Abrir DateMaster Apex (http://127.0.0.1:8000)">
              <img src="assets/logo_dm_apex.png" alt="DateMaster Apex" style="width: 14px; height: 14px; border-radius: 3px; object-fit: cover;"> DateMaster ➔
            </button>
          </div>
        </div>

      </div>
    `;

    setTimeout(() => {
      if (typeof renderTasks === 'function') renderTasks();
      if (typeof renderTimeTracker === 'function') renderTimeTracker();
    }, 0);
  } catch (err) {
    console.error("Error en renderRPGLandingHub KCD:", err);
  }
}
window.renderRPGLandingHub = renderRPGLandingHub;
window.renderRPGLandingHubLegacy = renderRPGLandingHub;

// --- CÓDICE DE ZOOM / INSPECTOR KCD ---
function openKCDInspector(params) {
  const modal = document.getElementById("kcd-inspector-modal");
  const content = document.getElementById("kcd-inspector-content");
  if (!modal || !content) return;
  content.classList.remove("codex-wide");

  const type = (params && params.type) ? params.type : "character";

  if (type === "slot") {
    const slotDef = KCD_SLOTS_DEF.find(s => s.key === params.slotKey) || KCD_SLOTS_DEF[0];
    const item = (reyJaguarState.inventory || []).find(i => i.id === params.itemId) || { id: params.itemId, name: "Ranura " + (slotDef.slotNumber || 1), unlocked: false, equipped: false, lore: "Sin descripción." };
    const isEquipped = item.unlocked && item.equipped;
    const itemCat = item.unlocked ? (isEquipped ? '⚔️ EQUIPO EN BATALLA' : '🎒 RELIQUIA EN ALIJO') : '🔒 POR CONQUISTAR';
    const itemBonus = isEquipped ? '+5 Foco & Disciplina' : (item.unlocked ? '🎒 En Alijo' : '🔒 Bloqueado');

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="sprite-item item-${item.spriteIndex || 1}" style="width: 40px; height: 40px;"></div>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">RANURA ${slotDef.slotNumber} • ${itemCat}</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">${item.name}</h3>
          </div>
        </div>
        <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
      </div>

      <!-- TABLA DE COMPARACIÓN KCD -->
      <table class="kcd-comparison-table">
        <thead>
          <tr>
            <th class="col-label">⚔️ Atributo</th>
            <th class="col-mine">Mi Pertrecho Actual</th>
            <th class="col-other">Estándar / Mejora</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cell-label"><span>🛡️</span> Bonificación Principal</td>
            <td class="cell-mine">${itemBonus}</td>
            <td class="cell-other">+10 Élite</td>
          </tr>
          <tr>
            <td class="cell-label"><span>⚡</span> Estado en Alijo</td>
            <td class="cell-mine">${isEquipped ? '⚔️ Equipado en Batalla' : (item.unlocked ? '🎒 En Alijo' : '🔒 Bloqueado')}</td>
            <td class="cell-other">Listo</td>
          </tr>
          <tr>
            <td class="cell-label"><span>👑</span> Prestigio Imperial</td>
            <td class="cell-mine">${item.unlocked ? '+100 XP' : '0 XP'}</td>
            <td class="cell-other">+250 XP</td>
          </tr>
          <tr>
            <td class="cell-label"><span>💰</span> Valor de Tesorería</td>
            <td class="cell-mine">${item.unlocked ? 'Invaluable' : 'Por Desbloquear'}</td>
            <td class="cell-other">Reliquia</td>
          </tr>
        </tbody>
      </table>

      <!-- LORE Y ORIGEN EN PERGAMINO -->
      <div style="background: #F4ECE0; border-left: 3px solid #9B2335; padding: 12px 16px; border-radius: 4px; margin: 16px 0;">
        <strong style="color: #0E0E13; font-family: 'Cinzel', serif; font-size: 0.85rem;">📜 Crónica & Cómo Obtener:</strong>
        <p style="font-size: 0.95rem; color: #4A3C2F; line-height: 1.5; margin-top: 4px;">
          ${item.lore || "Reliquia histórica consagrada a la Orden Imperial del Caballero Jaguar."}
        </p>
        ${item.howToObtain ? `<p style="font-size: 0.82rem; color: #7A6347; margin-top: 6px; font-style: italic;">Misión: ${item.howToObtain}</p>` : ''}
      </div>

      <!-- BOTONES DE ACCIÓN -->
      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px;">
        ${item.unlocked ? `
          <button class="btn-jaguar ${isEquipped ? 'btn-secondary-dark' : 'btn-gold-chrome'}" style="padding: 8px 18px; font-weight: 800; ${isEquipped ? '' : 'color: #0E0905;'}" onclick="toggleItemEquipped(${item.id}); openKCDInspector({ type: 'slot', slotKey: '${slotDef.key}', itemId: ${item.id} });">
            ${isEquipped ? '🛡️ Desequipar y Guardar en Alijo' : '⚔️ Equipar en el Personaje'}
          </button>
        ` : `
          <span style="font-size: 0.85rem; color: #9B2C3B; font-weight: 700; align-self: center;">🔒 Cumple la misión territorial para forjar este ítem</span>
        `}
        <button class="btn-jaguar btn-secondary-dark" style="padding: 8px 18px;" onclick="closeKCDInspector(); selectMainTab('inventario'); renderInventoryTab();">
          🎒 Ver Alijo Completo
        </button>
      </div>
    `;
  } else if (type === "category") {
    content.classList.add("codex-wide");
    const catKey = params.categoryKey || "mente";
    const cat = (typeof KCD_CATEGORIES_CONFIG !== 'undefined' && KCD_CATEGORIES_CONFIG[catKey])
      ? KCD_CATEGORIES_CONFIG[catKey]
      : (typeof KCD_AURAS_CONFIG !== 'undefined' && KCD_AURAS_CONFIG[catKey] ? KCD_AURAS_CONFIG[catKey] : KCD_CATEGORIES_CONFIG.mente);

    let totalPoints = 0;
    cat.activities.forEach(act => {
      const val = (reyJaguarState.stats && reyJaguarState.stats[act.key] && typeof reyJaguarState.stats[act.key].value === 'number')
        ? reyJaguarState.stats[act.key].value
        : act.defaultVal;
      totalPoints += val;
    });

    const vibraScore = (typeof CaballeroScoringEngine !== 'undefined') ? CaballeroScoringEngine.calculateVibra(catKey) : 0;

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 2.2rem;">${cat.icon}</span>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">PERGAMINO DE CABALLERÍA • ${cat.name}</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #0E0E13; margin: 0;">Actividades & Deberes Disponibles</h3>
            <span style="font-size: 0.8rem; color: #7A6347;">${cat.subtitle}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 800; font-size: 0.75rem; padding: 6px 12px;" onclick="CaballeroScoringEngine.openVibraExplanationModal('${catKey}')" title="Ver cálculo y fórmula matemática de la Vibra">
            ℹ️ Vibra: ${vibraScore}
          </button>
          <div style="text-align: right; background: #F0E8D6; border: 1px solid rgba(197,154,40,0.4); border-radius: 6px; padding: 4px 10px;">
            <div style="font-size: 0.65rem; color: #7A6347; font-family: 'Cinzel', serif; font-weight: 700;">TOTAL PUNTOS</div>
            <div style="font-size: 1.25rem; font-weight: 900; color: #0E0E13; font-family: 'Cinzel', serif;">${totalPoints} PTS</div>
          </div>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>
      </div>

      <!-- LISTA COMPLETA DE ACTIVIDADES DEL PERGAMINO -->
      <div style="max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 6px;" class="custom-scrollbar">
        ${cat.activities.map(act => {
          const isVida = (catKey === 'vida');
          const isCompletedLifeQuest = isVida && Array.isArray(reyJaguarState.completedLifeQuests) && reyJaguarState.completedLifeQuests.includes(act.key);
          
          let val = (reyJaguarState.stats && reyJaguarState.stats[act.key] && typeof reyJaguarState.stats[act.key].value === 'number')
            ? reyJaguarState.stats[act.key].value
            : act.defaultVal;
          if (isCompletedLifeQuest && val < 1) val = 1;

          const diff = act.difficulty || 'medio';
          const xp = act.xp || (diff === 'dificil' ? 75 : (diff === 'medio' ? 50 : 25));

          const cardStyle = isCompletedLifeQuest 
            ? "background: #F8FAF7; border: 1.5px solid #2B6847; border-radius: var(--radius-md); padding: 12px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap;"
            : "background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-md); padding: 12px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap;";

          const textDecoration = "color: #0E0E13;";
          const descDecoration = "color: #5D4E3E;";

          return `
            <div class="kcd-parchment-activity-card" style="${cardStyle}">
              <div style="flex: 1; min-width: 200px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                  <span style="font-size: 1.25rem;">${isCompletedLifeQuest ? '✓' : act.icon}</span>
                  <strong style="font-family: 'Cinzel', serif; font-size: 1.02rem; ${textDecoration}">${act.fullName || act.name}</strong>
                  ${isCompletedLifeQuest ? `
                    <span class="badge-tag badge-emerald" style="font-size: 0.65rem; padding: 2px 8px; font-weight: 800;">👑 ✓ CONQUISTADA</span>
                  ` : `
                    <span class="badge-tag ${diff === 'dificil' ? 'badge-pink' : (diff === 'medio' ? 'badge-gold' : 'badge-emerald')}" style="font-size: 0.65rem; padding: 2px 7px;">+${xp} XP (${diff.toUpperCase()})</span>
                  `}
                </div>
                <p style="font-size: 0.84rem; margin: 0; line-height: 1.35; ${descDecoration}">${act.desc}</p>
              </div>

              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="text-align: center; min-width: 70px; background: ${isCompletedLifeQuest ? '#E8F5E9' : '#F0E8D6'}; border: 1px solid ${isCompletedLifeQuest ? '#2B6847' : 'rgba(197,154,40,0.4)'}; border-radius: 6px; padding: 6px 10px;">
                  <span style="font-size: 0.62rem; color: ${isCompletedLifeQuest ? '#1B4D3E' : '#7A6347'}; display: block; font-family: 'Cinzel', serif; font-weight: 700;">ESTADO</span>
                  <strong style="font-size: 1.15rem; color: ${isCompletedLifeQuest ? '#1B4D3E' : '#0E0E13'}; font-family: 'Cinzel', serif;">${val} PTS</strong>
                </div>

                <div style="display: flex; flex-direction: column; gap: 5px;">
                  ${isVida ? `
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                      <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 900; font-size: 0.72rem; padding: 6px 12px;" onclick="CaballeroScoringEngine.awardAction('vida', '${diff}', '${act.fullName || act.name}', null, '${act.subKey || act.key}'); openKCDInspector({ type: 'category', categoryKey: 'vida' });" title="Registrar sesión o avance (+1 Punto & +${xp} XP)">
                        ⚡ +1 Avance / Sesión (+${xp} XP)
                      </button>
                      ${isCompletedLifeQuest ? `
                        <button class="btn-jaguar btn-sm" style="background: rgba(43,104,71,0.2); color: #1B4D3E; border: 1.5px solid #2B6847; font-weight: 800; font-size: 0.72rem; padding: 6px 10px; cursor: pointer;" onclick="completeLifeQuestAction('${act.key}', '${diff}', '${act.fullName || act.name}', '${act.subKey || act.key}', '${act.tab || ''}');" title="Haz clic para desmarcar el hito final de vida">
                          👑 Conquistado (Desmarcar)
                        </button>
                      ` : `
                        <button class="btn-jaguar btn-sm btn-secondary-dark" style="color: #9B2335; border: 1.5px solid rgba(155,35,53,0.4); font-weight: 800; font-size: 0.72rem; padding: 6px 10px;" onclick="completeLifeQuestAction('${act.key}', '${diff}', '${act.fullName || act.name}', '${act.subKey || act.key}', '${act.tab || ''}');" title="Conquistar definitivamente este hito">
                          👑 Sellar Misión
                        </button>
                      `}
                    </div>
                  ` : `
                    <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 900; font-size: 0.72rem; padding: 6px 14px;" onclick="CaballeroScoringEngine.awardAction('${catKey}', '${diff}', '${act.fullName || act.name}', null, '${act.subKey || act.key}', null, '${act.key}'); openKCDInspector({ type: 'category', categoryKey: '${catKey}' });" title="Registrar acción (+1 Punto & +${xp} XP)">
                      ⚡ +1 Punto (+${xp} XP)
                    </button>
                  `}

                  ${act.tab ? `
                    <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.68rem; padding: 4px 10px;" onclick="navigateToModule('${act.tab}');" title="Ir al módulo de ${act.name}">
                      📖 Abrir Módulo
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid rgba(197,154,40,0.3); padding-top: 12px; flex-wrap: wrap; gap: 10px;">
        <span style="font-size: 0.78rem; color: #7A6347; font-style: italic;">
          ⚜️ Cada punto representa una acción física completada en tu día.
        </span>
        <button class="btn-jaguar btn-secondary-dark" onclick="closeKCDInspector()">
          Cerrar Pergamino
        </button>
      </div>
    `;
  } else if (type === "stat") {
    const key = params.statKey || "fuerza";
    const statObj = (reyJaguarState.stats && reyJaguarState.stats[key]) ? reyJaguarState.stats[key] : { name: key, value: 10, icon: "⚡" };

    let parentCat = null;
    let actConfig = null;
    if (typeof KCD_CATEGORIES_CONFIG !== 'undefined') {
      Object.values(KCD_CATEGORIES_CONFIG).forEach(cat => {
        const found = cat.activities.find(a => a.key === key);
        if (found) {
          parentCat = cat;
          actConfig = found;
        }
      });
    }

    const catName = parentCat ? parentCat.name : "CABALLERÍA JAGUAR";
    const actDesc = actConfig ? actConfig.desc : "Cada vez que realizas esta actividad, se suma +1 punto permanente a este atributo y otorga +50 XP a tu nivel de caballería.";
    const actWeight = actConfig ? actConfig.xpWeight : "1.3x";

    if (key === "finanzas") {
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.8rem;">🪙</span>
            <div>
              <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">SOBERANÍA & VITALIDAD • FINANZAS</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">Finanzas: Ahorro & Autocontrol</h3>
            </div>
          </div>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>

        <div style="display: flex; gap: 20px; align-items: center; background: #F0E8D6; border: 1.5px solid #9B2335; padding: 18px; border-radius: var(--radius-md); margin-bottom: 16px;">
          <div style="text-align: center; border-right: 1px solid rgba(197,154,40,0.4); padding-right: 20px;">
            <div style="font-size: 0.75rem; color: #7A6347; font-family: 'Cinzel', serif;">PUNTOS DE DISCIPLINA</div>
            <div style="font-size: 2.4rem; font-weight: 900; color: #0E0E13; font-family: 'Cinzel', serif;">${statObj.value || 0}</div>
          </div>
          <div>
            <h4 style="font-family: 'Cinzel', serif; color: #0E0E13; font-size: 1.05rem; margin-bottom: 4px;">🛡️ No Pagar por Algo Tonto</h4>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
              Se contabiliza <strong>1 punto por cada vez que no has pagado por algo tonto</strong> (café impulsivo, comida rápida innecesaria, compras caprichosas o superfluas). Cada victoria suma +1 punto y +50 XP a tu Soberanía Financiera.
            </p>
          </div>
        </div>

        <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 16px;">
          <label style="font-size: 0.75rem; color: #7A6347; font-weight: 700; display: block; margin-bottom: 5px;">¿Qué compra o gasto tonto evitaste hoy?</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="inspector-avoided-desc" class="kcd-task-input" placeholder="Ej: Evité pedir comida por pereza / Evité café caro / Compra por impulso..." style="flex: 2; min-width: 200px;">
            <input type="number" id="inspector-avoided-amount" class="kcd-task-input" placeholder="Ahorro € (opcional)" style="width: 120px;" min="1" step="0.5">
            <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 8px 16px;" onclick="logAvoidedExpenseFromInspector();">
              🛡️ Registrar Victoria (+1 Punto / +50 XP)
            </button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px;">
            <button class="btn-jaguar btn-secondary-dark" onclick="openKCDInspector({ type: 'category', categoryKey: 'soberania' });">
              📜 Ver Pergamino de Soberanía & Vitalidad
            </button>
            <button class="btn-jaguar btn-secondary-dark" onclick="closeKCDInspector(); selectMainTab('finanzas');">
              💰 Ir a Finanzas
            </button>
          </div>
          <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 8px 18px;" onclick="incrementStat('finanzas'); openKCDInspector({ type: 'stat', statKey: 'finanzas' });">
            ⚡ Victoria Rápida (+1 Punto / +50 XP)
          </button>
        </div>
      `;
    } else if (key === "agrotech") {
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.8rem;">🌱</span>
            <div>
              <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">TERRITORIO & PROYECTOS • CHILE AGROTECH</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">Chile Agrotech & Precisión Agrícola</h3>
            </div>
          </div>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>

        <div style="display: flex; gap: 20px; align-items: center; background: #F0E8D6; border: 1.5px solid #9B2335; padding: 18px; border-radius: var(--radius-md); margin-bottom: 16px;">
          <div style="text-align: center; border-right: 1px solid rgba(197,154,40,0.4); padding-right: 20px;">
            <div style="font-size: 0.75rem; color: #7A6347; font-family: 'Cinzel', serif;">PUNTOS ACTUALES</div>
            <div style="font-size: 2.4rem; font-weight: 900; color: #0E0E13; font-family: 'Cinzel', serif;">${statObj.value || 0}</div>
          </div>
          <div>
            <h4 style="font-family: 'Cinzel', serif; color: #0E0E13; font-size: 1.05rem; margin-bottom: 4px;">🌱 Avance en Chile Agrotech</h4>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
              Otorga puntos y experiencia (XP) por avanzar en Chile Agrotech (AgriTwin, sensores IoT, índices satelitales y diseño regenerativo en Maule). Cada avance suma +1 punto y +50 XP a tu pilar de Territorio & Proyectos.
            </p>
          </div>
        </div>

        <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 16px;">
          <label style="font-size: 0.75rem; color: #7A6347; font-weight: 700; display: block; margin-bottom: 5px;">¿Qué avance realizaste en tus proyectos de Agrotech / Ecología?</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="inspector-agrotech-desc" class="kcd-task-input" placeholder="Ej: Sensores de humedad IoT, diseño de permacultura, siembra, análisis bio..." style="flex: 1; min-width: 220px;">
            <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 8px 16px;" onclick="logAgrotechProgressFromInspector();">
              🌱 Registrar Avance (+1 Punto / +50 XP)
            </button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px;">
            <button class="btn-jaguar btn-secondary-dark" onclick="openKCDInspector({ type: 'category', categoryKey: 'territorio' });">
              📜 Ver Pergamino de Territorio
            </button>
            <button class="btn-jaguar btn-secondary-dark" onclick="closeKCDInspector(); selectMainTab('proyectos');">
              🗺️ Ir a Proyectos
            </button>
          </div>
          <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 10px 22px;" onclick="incrementStat('agrotech'); openKCDInspector({ type: 'stat', statKey: 'agrotech' });">
            ⚡ Registrar Avance Directo (+1 Punto / +50 XP)
          </button>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.8rem;">${statObj.icon || '⚡'}</span>
            <div>
              <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">PERGAMINO • ${catName}</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">${actConfig ? (actConfig.fullName || actConfig.name) : statObj.name}</h3>
            </div>
          </div>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>

        <div style="display: flex; gap: 20px; align-items: center; background: #F0E8D6; border: 1.5px solid #9B2335; padding: 18px; border-radius: var(--radius-md); margin-bottom: 16px;">
          <div style="text-align: center; border-right: 1px solid rgba(197,154,40,0.4); padding-right: 20px;">
            <div style="font-size: 0.75rem; color: #7A6347; font-family: 'Cinzel', serif;">PUNTOS ACTUALES</div>
            <div style="font-size: 2.4rem; font-weight: 900; color: #0E0E13; font-family: 'Cinzel', serif;">${statObj.value || 0}</div>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h4 style="font-family: 'Cinzel', serif; color: #0E0E13; font-size: 1.05rem; margin: 0;">Forja de Hábito Estoico</h4>
              <span class="badge-tag badge-amber" style="font-size: 0.65rem;">${actWeight}</span>
            </div>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.4); line-height: 1.4; margin: 0;">
              ${actDesc}
            </p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px;">
            ${parentCat ? `
              <button class="btn-jaguar btn-secondary-dark" onclick="openKCDInspector({ type: 'category', categoryKey: '${parentCat.key}' });">
                📜 Ver Todas las Actividades de ${parentCat.name}
              </button>
            ` : ''}
            ${(actConfig && actConfig.tab) ? `
              <button class="btn-jaguar btn-secondary-dark" onclick="closeKCDInspector(); selectMainTab('${actConfig.tab}');">
                📖 Ir al Módulo
              </button>
            ` : ''}
          </div>
          <button class="btn-jaguar btn-gold-chrome" style="color: #0E0905; font-weight: 900; padding: 10px 22px;" onclick="incrementStat('${key}'); openKCDInspector({ type: 'stat', statKey: '${key}' });">
            ⚡ Registrar Victoria (+1 Punto / +50 XP)
          </button>
        </div>
      `;
    }
  } else if (type === "character") {
    const char = reyJaguarState.character || {};
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">👑</span>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">CÓDICE DE CABALLERÍA</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">${char.name}</h3>
          </div>
        </div>
        <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
        <div style="background: #F0E8D6; border: 1.5px solid #9B2335; padding: 14px; border-radius: var(--radius-md);">
          <strong style="font-family: 'Cinzel', serif; color: #0E0E13; font-size: 0.85rem;">Fisiología & Porte:</strong>
          <div style="font-size: 0.9rem; color: #4A3C2F; margin-top: 6px;">📏 Altura: ${char.height || '1.73 m'}</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">⚖️ Peso: ${char.weight || '80 kg'}</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">💇‍♂️ Corte: Peaky Blinders / Thomas Shelby</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">🧔 Barba: Pelirroja</div>
        </div>

        <div style="background: #F0E8D6; border: 1.5px solid #9B2335; padding: 14px; border-radius: var(--radius-md);">
          <strong style="font-family: 'Cinzel', serif; color: #0E0E13; font-size: 0.85rem;">Cosmografía Natal:</strong>
          <div style="font-size: 0.9rem; color: #4A3C2F; margin-top: 6px;">♈ Sol en Aries (23 Mar 1996)</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">⚔️ Regente Marte (Fuerza y Liderazgo)</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">📍 Nacimiento: Parral, Maule, Chile</div>
          <div style="font-size: 0.9rem; color: #4A3C2F;">🌍 Residencia: Hannover / Bilbao</div>
        </div>
      </div>

      <!-- RADAR DE LAS 9 AURAS (POLÍGONO EQUILIBRADO) -->
      <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(197,154,40,0.25); padding-bottom: 6px;">
          <strong style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #0E0E13;">🧭 RADAR DE LAS 9 AURAS DE CABALLERÍA</strong>
          <span class="badge-tag badge-gold" style="font-size: 0.65rem;">Distribución Viva</span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          ${(typeof CaballeroScoringEngine !== 'undefined') ? CaballeroScoringEngine.renderEvaluationMixChartSVG() : ''}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button class="btn-jaguar btn-secondary-dark" onclick="closeKCDInspector(); selectMainTab('astral');">
          🔮 Ver Carta Astral Completa
        </button>
      </div>
    `;
  } else if (type === "level") {
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">⚔️</span>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">ORDEN DEL CABALLERO JAGUAR</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">Matriz de Caballería (Ciclo de 21 Días)</h3>
          </div>
        </div>
        <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
      </div>

      <div style="max-height: 480px; overflow-y: auto;">
        ${render21DayDashboardRoadmapHTML()}
      </div>
    `;
  } else if (type === "tasks") {
    content.classList.add("codex-wide");
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">📜</span>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">CÓDICE DE DEBERES & METAS</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">Deberes Diarios & Metas Semanales</h3>
          </div>
        </div>
        <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
      </div>

      <div class="kcd-codex-2col-grid">
        <!-- COLUMNA 1: DEBERES DIARIOS -->
        <div class="kcd-codex-task-column">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 8px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 1.1rem;">⚔️</span>
              <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #0E0E13; margin: 0;">Tareas Diarias</h4>
            </div>
            <span class="badge-tag badge-emerald" style="font-size: 0.65rem;">Hábitos Hoy</span>
          </div>

          <div style="display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;">
            <input type="text" id="kcd-codex-daily-input" class="kcd-task-input" placeholder="Nueva tarea..." style="flex: 1; min-width: 140px;" onkeypress="if(event.key==='Enter') addCodexTask('daily')">
            <select id="kcd-codex-daily-day" class="kcd-task-select" style="width: 80px;">
              <option value="daily">📅 Hoy</option>
              <option value="lunes">Lunes</option>
              <option value="martes">Martes</option>
              <option value="miercoles">Miércoles</option>
              <option value="jueves">Jueves</option>
              <option value="viernes">Viernes</option>
              <option value="sabado">Sábado</option>
              <option value="domingo">Domingo</option>
            </select>
            <select id="kcd-codex-daily-cat" class="kcd-task-select" style="min-width: 130px; max-width: 170px;">
              <optgroup label="👑 Vida (Misiones Principales)">
                <option value="vida:empleo">🇩🇪 Empleo Hannover</option>
                <option value="vida:tesis">🎓 Tesis Máster</option>
                <option value="vida:tramites">📑 Visa & Trámites</option>
                <option value="vida:general">👑 Misión Vital</option>
              </optgroup>
              <optgroup label="🧭 Exploración (Misiones Sec.)">
                <option value="exploracion:lauwersmeer">🌊 Lauwersmeer</option>
                <option value="exploracion:proyectos">🏴‍☠️ Proyectos Piratas</option>
                <option value="exploracion:agrotech">🌱 Agrotech / Huerta</option>
                <option value="exploracion:red_maule">🌐 Maule Red</option>
                <option value="exploracion:musica">🎺 Música / Jazz</option>
                <option value="exploracion:arte">🎨 Arte & Foto</option>
              </optgroup>
              <optgroup label="💖 Amor & Pareja (Goce)">
                <option value="amor:intimidad">🕯️ Presencia Íntima</option>
                <option value="amor:pareja">🍷 Vida en Pareja</option>
                <option value="amor:acuerdos">💬 Acuerdos & Diálogo</option>
                <option value="amor:aftercare">💆 Aftercare & Caricias</option>
              </optgroup>
              <optgroup label="🧠 Mente & Foco Estoico">
                <option value="mente:foco">🎯 Bloque Deep Work</option>
                <option value="mente:aleman">🗣️ Alemán / Idiomas</option>
                <option value="mente:lectura">📜 Lectura Estoica</option>
              </optgroup>
              <optgroup label="🌿 Salud Somática">
                <option value="salud:nutricion">🥑 Nutrición Limpia</option>
                <option value="salud:somatica">🌿 Somática & Yoga</option>
                <option value="salud:sueno">🌙 Higiene de Sueño</option>
              </optgroup>
              <optgroup label="🥊 Deporte & Combate">
                <option value="deporte:gym">🏋️ Campus Gym</option>
                <option value="deporte:combate">🥊 Muay Thai / Sparring</option>
                <option value="deporte:cardio">🏃 Running / Cardio</option>
              </optgroup>
              <optgroup label="🪙 Soberanía Financiera">
                <option value="soberania:finanzas">💶 Finanzas & Cuentas</option>
                <option value="soberania:auditoria">📊 Auditoría Gastos</option>
                <option value="soberania:ahorro">🛡️ Cero Gastos Hormiga</option>
              </optgroup>
              <optgroup label="🌲 Naturaleza & Ecosistemas">
                <option value="naturaleza:rewild">🔥 ReWild & Bosque</option>
                <option value="naturaleza:airelibre">🏕️ Senderismo & Mar</option>
                <option value="naturaleza:botanica">🌿 Botánica & Suelo</option>
              </optgroup>
              <optgroup label="🕯️ Espiritualidad & Ritos">
                <option value="espiritualidad:meditacion">🧘 Meditación Vipassana</option>
                <option value="espiritualidad:ritos">🪶 Ritos Sagrados</option>
                <option value="espiritualidad:detox">⚡ Detox Energético</option>
              </optgroup>
            </select>
            <button class="kcd-task-add-btn" onclick="addCodexTask('daily')" title="Añadir">+</button>
          </div>

          <div id="kcd-codex-daily-list" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;"></div>
        </div>

        <!-- COLUMNA 2: METAS SEMANALES -->
        <div class="kcd-codex-task-column">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 8px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 1.1rem;">🛡️</span>
              <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #0E0E13; margin: 0;">Metas Semanales</h4>
            </div>
            <span class="badge-tag badge-gold" style="font-size: 0.65rem;">Semana Activa</span>
          </div>

          <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <input type="text" id="kcd-codex-weekly-input" class="kcd-task-input" placeholder="Nueva meta semanal..." style="flex: 1;" onkeypress="if(event.key==='Enter') addCodexTask('weekly')">
            <select id="kcd-codex-weekly-cat" class="kcd-task-select" style="min-width: 130px; max-width: 170px;">
              <optgroup label="👑 Vida (Misiones Principales)">
                <option value="vida:empleo">🇩🇪 Empleo Hannover</option>
                <option value="vida:tesis">🎓 Tesis Máster</option>
                <option value="vida:tramites">📑 Visa & Trámites</option>
                <option value="vida:general">👑 Misión Vital</option>
              </optgroup>
              <optgroup label="🧭 Exploración (Misiones Sec.)">
                <option value="exploracion:lauwersmeer">🌊 Lauwersmeer</option>
                <option value="exploracion:proyectos">🏴‍☠️ Proyectos Piratas</option>
                <option value="exploracion:agrotech">🌱 Agrotech / Huerta</option>
                <option value="exploracion:red_maule">🌐 Maule Red</option>
              </optgroup>
              <optgroup label="💖 Amor & Pareja (Goce)">
                <option value="amor:pareja">🍷 Vida en Pareja</option>
                <option value="amor:intimidad">🕯️ Presencia Íntima</option>
                <option value="amor:acuerdos">💬 Acuerdos Conscientes</option>
              </optgroup>
              <optgroup label="🧠 Mente & Foco Estoico">
                <option value="mente:foco">🎯 Bloque Deep Work</option>
                <option value="mente:aleman">🗣️ Alemán / Idiomas</option>
                <option value="mente:lectura">📜 Lectura Estoica</option>
              </optgroup>
              <optgroup label="🪙 Soberanía Financiera">
                <option value="soberania:finanzas">💶 Finanzas & Cuentas</option>
                <option value="soberania:auditoria">📊 Auditoría Gastos</option>
              </optgroup>
              <optgroup label="🌿 Salud Somática">
                <option value="salud:nutricion">🥑 Nutrición Limpia</option>
                <option value="salud:somatica">🌿 Somática & Vitalidad</option>
              </optgroup>
              <optgroup label="🥊 Deporte & Combate">
                <option value="deporte:gym">🏋️ Campus Gym</option>
                <option value="deporte:combate">🥊 Muay Thai</option>
              </optgroup>
              <optgroup label="🌲 Naturaleza & Ecosistemas">
                <option value="naturaleza:rewild">🔥 ReWild & Bosque</option>
              </optgroup>
              <optgroup label="🕯️ Espiritualidad & Ritos">
                <option value="espiritualidad:meditacion">🧘 Meditación</option>
              </optgroup>
            </select>
            <button class="kcd-task-add-btn" onclick="addCodexTask('weekly')" title="Añadir">+</button>
          </div>

          <div id="kcd-codex-weekly-list" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;"></div>
        </div>
      </div>
    `;
    renderKCDCodexTasksLists();
  } else if (type === "quests") {
    content.classList.add("codex-wide");
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9B2335; padding-bottom: 10px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">📜</span>
          <div>
            <span style="font-size: 0.72rem; color: #9B2335; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">PERGAMINO DE EXPEDICIÓN & BIOMAS</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 0;">Misiones de Hannover & Bilbao</h3>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.75rem; padding: 4px 10px;" onclick="closeKCDInspector(); selectMainTab('mapa');" title="Ver el mapa completo">
            🗺️ Abrir Mapa Completo
          </button>
          <button onclick="closeKCDInspector()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: rgba(255,255,255,0.4);">✕</button>
        </div>
      </div>

      <div style="max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;">
        ${renderInSituQuestsHTML()}
      </div>
    `;
  } else if (type === "calculator") {
    content.classList.add("codex-wide");
    if (typeof CaballeroScoringEngine !== 'undefined') {
      content.innerHTML = CaballeroScoringEngine.renderCalculatorHTML();
      CaballeroScoringEngine.updateCalculatorPreview();
    }
  }

  modal.classList.add("active");
}
window.openKCDInspector = openKCDInspector;

function closeKCDInspector() {
  const modal = document.getElementById("kcd-inspector-modal");
  if (modal) modal.classList.remove("active");
}
window.closeKCDInspector = closeKCDInspector;

// Navegación fluida a cualquier módulo cerrando el inspector primero
function navigateToModule(tabKey) {
  closeKCDInspector();
  setTimeout(() => {
    if (typeof selectMainTab === "function") {
      selectMainTab(tabKey);
    }
  }, 60);
}
window.navigateToModule = navigateToModule;

// Completar o desmarcar hitos mayores de Vida (acciones de la biografía)
function completeLifeQuestAction(actKey, diff, actName, subKey, tab) {
  if (!reyJaguarState.completedLifeQuests) {
    reyJaguarState.completedLifeQuests = [];
  }

  const isCompleted = reyJaguarState.completedLifeQuests.includes(actKey);

  if (isCompleted) {
    // DESACTIVAR (TOGGLE OFF)
    reyJaguarState.completedLifeQuests = reyJaguarState.completedLifeQuests.filter(k => k !== actKey);

    // Revertir misiones principales si aplica
    if (actKey === "tesis") {
      const q1 = (reyJaguarState.mainQuests || []).find(q => q.id === "q1");
      if (q1) {
        q1.completed = false;
        (q1.subQuests || []).forEach(sq => { sq.completed = false; sq.current = 0; });
      }
    } else if (actKey === "hannover_mudanza") {
      const q2 = (reyJaguarState.mainQuests || []).find(q => q.id === "q2");
      if (q2) {
        q2.completed = false;
        const sq2_1 = (q2.subQuests || []).find(sq => sq.id === "sq2_1");
        const sq2_2 = (q2.subQuests || []).find(sq => sq.id === "sq2_2");
        if (sq2_1) { sq2_1.completed = false; sq2_1.current = 0; }
        if (sq2_2) { sq2_2.completed = false; sq2_2.current = 0; }
      }
    }

    if (typeof CaballeroScoringEngine !== "undefined" && typeof CaballeroScoringEngine.revokeAction === "function") {
      CaballeroScoringEngine.revokeAction("vida", diff, actName, null, subKey || actKey);
    } else {
      if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      if (typeof renderCharacterHUD === "function") renderCharacterHUD();
    }

    if (typeof showNotification === "function") {
      showNotification(`↩️ Hito desmarcado: ${actName}`);
    }
  } else {
    // ACTIVAR (TOGGLE ON)
    reyJaguarState.completedLifeQuests.push(actKey);

    // Sincronizar con misiones de campaña principales
    if (actKey === "tesis") {
      const q1 = (reyJaguarState.mainQuests || []).find(q => q.id === "q1");
      if (q1) {
        q1.completed = true;
        (q1.subQuests || []).forEach(sq => { sq.completed = true; sq.current = sq.target; });
      }
    } else if (actKey === "hannover_mudanza") {
      const q2 = (reyJaguarState.mainQuests || []).find(q => q.id === "q2");
      if (q2) {
        const sq2_1 = (q2.subQuests || []).find(sq => sq.id === "sq2_1");
        const sq2_2 = (q2.subQuests || []).find(sq => sq.id === "sq2_2");
        if (sq2_1) { sq2_1.completed = true; sq2_1.current = sq2_1.target; }
        if (sq2_2) { sq2_2.completed = true; sq2_2.current = sq2_2.target; }
      }
    }

    // Otorgar experiencia y puntos de scoring
    if (typeof CaballeroScoringEngine !== "undefined" && typeof CaballeroScoringEngine.awardAction === "function") {
      CaballeroScoringEngine.awardAction("vida", diff, actName, null, subKey || actKey);
    } else {
      if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      if (typeof renderCharacterHUD === "function") renderCharacterHUD();
    }

    if (typeof showNotification === "function") {
      showNotification(`👑 ¡Hito conquistado: ${actName}!`);
    }
  }

  if (typeof saveReyJaguarState === "function") saveReyJaguarState();
  if (typeof renderCharacterHUD === "function") renderCharacterHUD();
  if (typeof updateHeaderDisplay === "function") updateHeaderDisplay();
  openKCDInspector({ type: "category", categoryKey: "vida" });
}
window.completeLifeQuestAction = completeLifeQuestAction;

function logAvoidedExpenseFromInspector() {
  const descEl = document.getElementById("inspector-avoided-desc");
  const amtEl = document.getElementById("inspector-avoided-amount");
  const desc = (descEl && descEl.value.trim()) ? descEl.value.trim() : "Gasto tonto evitado (autocontrol)";
  const amount = amtEl ? parseFloat(amtEl.value) || 0 : 0;
  
  if (typeof window.logAvoidedExpense === "function") {
    window.logAvoidedExpense(desc, amount, "EUR");
  } else {
    incrementStat("finanzas");
    if (typeof CaballeroScoringEngine !== "undefined") {
      CaballeroScoringEngine.awardXP("soberania", 50, `🛡️ Gasto tonto evitado: ${desc}`);
    }
  }
  openKCDInspector({ type: "stat", statKey: "finanzas" });
}
window.logAvoidedExpenseFromInspector = logAvoidedExpenseFromInspector;

function logAgrotechProgressFromInspector() {
  const descEl = document.getElementById("inspector-agrotech-desc");
  const desc = (descEl && descEl.value.trim()) ? descEl.value.trim() : "Avance en proyectos de Agrotech y Ecología";
  
  incrementStat("agrotech");
  if (typeof CaballeroScoringEngine !== "undefined") {
    CaballeroScoringEngine.awardXP("naturaleza", 50, `🌱 Agrotech: ${desc}`);
  }
  openKCDInspector({ type: "stat", statKey: "agrotech" });
}
window.logAgrotechProgressFromInspector = logAgrotechProgressFromInspector;

function renderInSituQuestsHTML() {
  const quests = reyJaguarState.mainQuests || [];
  return quests.map(quest => `
    <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.4); border-radius: var(--radius-sm); padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(197,154,40,0.25); padding-bottom: 8px; margin-bottom: 10px;">
        <div>
          <span style="font-size: 0.68rem; color: #9B2335; font-weight: 800; text-transform: uppercase;">${quest.stage || 'Alemania'}</span>
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #0E0E13; margin: 2px 0 0 0;">${quest.title}</h4>
        </div>
        <span class="badge-tag ${quest.completed ? 'badge-emerald' : 'badge-gold'}" style="font-size: 0.68rem;">
          ${quest.completed ? '✅ CONQUISTADA' : '⚔️ EN PROGRESO'}
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${(quest.subQuests || []).map(sub => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #F0E8D6; border-radius: var(--radius-sm); border-left: 3px solid ${sub.completed ? '#2B6847' : '#9B2335'};">
            <span style="font-size: 0.85rem; color: ${sub.completed ? '#2B6847; text-decoration: line-through;' : '#0E0E13; font-weight: 600;'}">
              ${sub.completed ? '☑️' : '⏹️'} ${sub.text}
            </span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #9B2335; font-family: 'Cinzel', serif;">
                ${sub.current} / ${sub.target}
              </span>
              ${!sub.completed ? `
                <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 800; padding: 2px 8px; font-size: 0.7rem;" onclick="advanceSubQuest('${quest.id}', '${sub.id}')">
                  +1 Paso
                </button>
              ` : ''}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}
window.renderInSituQuestsHTML = renderInSituQuestsHTML;

function renderKCDCodexTasksLists() {
  const dailyListEl = document.getElementById("kcd-codex-daily-list");
  const weeklyListEl = document.getElementById("kcd-codex-weekly-list");
  if (!dailyListEl && !weeklyListEl) return;

  const tasks = (typeof appState !== 'undefined' && Array.isArray(appState.tasks)) ? appState.tasks : [];
  const dailyTasks = tasks.filter(t => t.timeScope === "daily" || !t.timeScope);
  const weeklyTasks = tasks.filter(t => t.timeScope === "weekly");

  if (dailyListEl) {
    if (dailyTasks.length === 0) {
      dailyListEl.innerHTML = `<div style="text-align: center; color: #7A6347; padding: 16px; font-size: 0.82rem;">No hay deberes diarios pendientes hoy.</div>`;
    } else {
      dailyListEl.innerHTML = dailyTasks.map(t => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #F0E8D6; border: 1px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm);">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask('${t.id}'); renderKCDCodexTasksLists();" style="width: 17px; height: 17px; accent-color: #9B2335; cursor: pointer;">
            <span style="font-size: 0.86rem; color: ${t.completed ? '#8A7765; text-decoration: line-through;' : '#0E0E13; font-weight: 600;'}">${t.title}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${t.targetDay ? `<span class="badge-tag badge-cyan" style="font-size: 0.62rem; padding: 1px 5px;">${t.targetDay.slice(0, 3).toUpperCase()}</span>` : ''}
            <span class="badge-tag badge-gold" style="font-size: 0.62rem; padding: 1px 5px;">${(typeof formatTaskCategoryBadge === 'function') ? formatTaskCategoryBadge(t.category) : (t.category || 'General')}</span>
            <button onclick="deleteTask('${t.id}'); renderKCDCodexTasksLists();" style="background: none; border: none; font-size: 0.85rem; color: #A0AEC0; cursor: pointer;">✕</button>
          </div>
        </div>
      `).join("");
    }
  }

  if (weeklyListEl) {
    if (weeklyTasks.length === 0) {
      weeklyListEl.innerHTML = `<div style="text-align: center; color: #7A6347; padding: 16px; font-size: 0.82rem;">No hay metas semanales registradas.</div>`;
    } else {
      weeklyListEl.innerHTML = weeklyTasks.map(t => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #F0E8D6; border: 1px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm);">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask('${t.id}'); renderKCDCodexTasksLists();" style="width: 17px; height: 17px; accent-color: #9B2335; cursor: pointer;">
            <span style="font-size: 0.86rem; color: ${t.completed ? '#8A7765; text-decoration: line-through;' : '#0E0E13; font-weight: 600;'}">${t.title}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="badge-tag badge-emerald" style="font-size: 0.62rem; padding: 1px 5px;">${(typeof formatTaskCategoryBadge === 'function') ? formatTaskCategoryBadge(t.category) : (t.category || 'Tesis')}</span>
            <button onclick="deleteTask('${t.id}'); renderKCDCodexTasksLists();" style="background: none; border: none; font-size: 0.85rem; color: #A0AEC0; cursor: pointer;">✕</button>
          </div>
        </div>
      `).join("");
    }
  }
}
window.renderKCDCodexTasksLists = renderKCDCodexTasksLists;

function addCodexTask(timeScope) {
  const inputId = timeScope === 'daily' ? 'kcd-codex-daily-input' : 'kcd-codex-weekly-input';
  const catId = timeScope === 'daily' ? 'kcd-codex-daily-cat' : 'kcd-codex-weekly-cat';
  const dayId = 'kcd-codex-daily-day';
  const input = document.getElementById(inputId);
  const cat = document.getElementById(catId);
  const dayEl = document.getElementById(dayId);
  if (!input || !input.value.trim()) return;

  const targetDayVal = (timeScope === 'daily' && dayEl && dayEl.value !== 'daily') ? dayEl.value : null;

  if (typeof appState !== 'undefined' && Array.isArray(appState.tasks)) {
    appState.tasks.push({
      id: "task-" + Date.now(),
      title: input.value.trim(),
      timeScope: timeScope,
      targetDay: targetDayVal,
      category: cat ? cat.value : (timeScope === 'daily' ? 'foco' : 'tesis'),
      completed: false
    });
    if (typeof saveAppState === 'function') saveAppState();
    input.value = "";
    renderKCDCodexTasksLists();
    if (typeof renderTasks === 'function') renderTasks();
    if (typeof showNotification === 'function') {
      const daySuffix = targetDayVal ? ` (${targetDayVal.toUpperCase()})` : '';
      showNotification(timeScope === 'daily' ? `Tarea registrada${daySuffix} en el Códice.` : "Meta semanal registrada en el Códice.");
    }
  }
}
window.addCodexTask = addCodexTask;

// --- FUNCIÓN PARA CAMBIAR SUB-VISTA EN EL MENÚ DE PERSONAJE ---
function selectCharacterSubView(subViewKey) {
  if (subViewKey === 'lifestyle') {
    if (typeof selectMainTab === 'function') selectMainTab('lifestyle');
    if (typeof renderLifestyleArchitectApp === 'function') renderLifestyleArchitectApp();
    return;
  }
  if (subViewKey === 'campanas') {
    if (typeof selectMainTab === 'function') selectMainTab('campanas');
    if (typeof renderCampanasTab === 'function') renderCampanasTab();
    return;
  }
  if (subViewKey === 'rangos') {
    if (typeof selectMainTab === 'function') selectMainTab('dashboard');
    const ranksEl = document.querySelector('.kcd-ranks-landing-panel');
    if (ranksEl) ranksEl.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  if (typeof selectMainTab === 'function') selectMainTab('inventario');
  renderInventoryTab();
}
window.selectCharacterSubView = selectCharacterSubView;

// --- FUNCIÓN PARA AÑADIR RECORDATORIO RÁPIDO ---
function addReminderTask() {
  const textEl = document.getElementById("new-reminder-text");
  const catEl = document.getElementById("new-reminder-cat");

  if (!textEl || !textEl.value.trim()) return;

  const newRem = {
    id: "rem-" + Date.now(),
    text: textEl.value.trim(),
    category: catEl && catEl.value.trim() ? catEl.value.trim() : "General",
    completed: false
  };

  reyJaguarState.reminders.push(newRem);

  // Sincronizar con appState.tasks global si existe
  if (typeof appState !== 'undefined' && Array.isArray(appState.tasks)) {
    appState.tasks.push({
      id: newRem.id,
      title: newRem.text,
      timeScope: "daily",
      category: newRem.category.toLowerCase(),
      completed: false
    });
    if (typeof saveAppState === 'function') saveAppState();
  }

  textEl.value = "";
  if (catEl) catEl.value = "";

  saveReyJaguarState();
  renderRPGLandingHub();
  if (typeof showNotification === 'function') showNotification("¡Recordatorio añadido a tu diario!");
}

function toggleReminderTask(remId) {
  const rem = reyJaguarState.reminders.find(r => r.id === remId);
  if (rem) {
    rem.completed = !rem.completed;
    
    // Sincronizar con appState.tasks global si existe
    if (typeof appState !== 'undefined' && Array.isArray(appState.tasks)) {
      const task = appState.tasks.find(t => t.id === remId);
      if (task) task.completed = rem.completed;
      if (typeof saveAppState === 'function') saveAppState();
    }

    saveReyJaguarState();
    renderRPGLandingHub();
  }
}

// --- RENDERIZADO DEL MAPA DE AVENTURA (PESTAÑA PUESTA EN SU PROPIO PERGAMINO) ---
function renderAdventureMapTab() {
  const container = document.getElementById("adventure-map-tab-container");
  if (!container) return;

  let mainQuestsHTML = reyJaguarState.mainQuests.map(quest => `
    <div class="jaguar-card" style="background: rgba(15,12,18,0.75); border-color: ${quest.completed ? 'var(--neon-gold)' : 'var(--border-neon-pink)'}; mb-14">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <div>
          <span class="badge-tag badge-gold" style="margin-bottom: 6px; display: inline-block;">📍 ${quest.stage}</span>
          <h4 style="font-size: 1.15rem; color: #FFF; font-family: 'Cinzel', serif; font-weight: 800;">${quest.title}</h4>
        </div>
        <span class="badge-tag ${quest.completed ? 'badge-gold' : 'badge-pink'}">
          ${quest.completed ? '✅ COMPLETADA' : '⚔️ EN PROGRESO'}
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        ${quest.subQuests.map(sub => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border-left: 3px solid ${sub.completed ? 'var(--neon-gold)' : 'var(--neon-pink)'};">
            <span style="font-size: 0.88rem; color: ${sub.completed ? 'var(--neon-gold)' : '#FFF'}; font-weight: 600;">
              ${sub.completed ? '☑️' : '⏹️'} ${sub.text}
            </span>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 0.8rem; font-weight: 800; color: var(--neon-gold); font-family: 'Cinzel', serif;">
                ${sub.current} / ${sub.target}
              </span>
              ${!sub.completed ? `
                <button class="btn-jaguar btn-sm btn-primary-pink" style="padding: 3px 10px; font-size: 0.72rem;" onclick="advanceSubQuest('${quest.id}', '${sub.id}')">
                  +1 Paso
                </button>
              ` : ''}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <!-- EL MAPA DE AVENTURA 80S -->
    <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 3px solid var(--neon-gold); box-shadow: var(--shadow-rose); background: #000; min-height: 480px; margin-bottom: 24px;">
      <img src="assets/jaguar_world_map_80s.jpg" alt="Mapa de Aventura Rey Jaguar 80s" style="width: 100%; height: 100%; min-height: 480px; object-fit: cover; filter: brightness(0.9) contrast(1.15);">
      
      <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; padding: 18px 24px; background: rgba(18, 14, 22, 0.94); border: 2px solid var(--neon-gold); border-radius: var(--radius-md); box-shadow: var(--shadow-metallic); backdrop-filter: blur(8px);">
        <div style="display: flex; items-center; gap: 14px;">
          <div class="sprite-item item-1" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--neon-gold); flex-shrink: 0;"></div>
          <div>
            <div style="font-size: 0.82rem; font-weight: 900; color: var(--neon-gold); font-family: 'Cinzel', serif;">📜 PERGAMINO DE EXPEDICIÓN: MISIONES DE HANNOVER & BILBAO</div>
            <p style="font-size: 0.95rem; color: #FFF; line-height: 1.5; font-style: italic;">
              "¡Paso a paso en las tierras europeas! Para desbloquear el paso definitivo hacia la Costa de Bilbao, completa la Defensa de Tesis, asegura tu trabajo y tramita tu Visa Española antes del 30 de Junio de 2027."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- LISTADO DE MISIONES DE CADA BIOMA -->
    <div class="grid-2">
      ${mainQuestsHTML}
    </div>
  `;
}

// --- FUNCIÓN TOGGLE PARA EQUIPAR / DESEQUIPAR OBJETOS ---
function toggleItemEquipped(itemId) {
  const item = (reyJaguarState.inventory || []).find(i => i.id === itemId);
  if (!item) return;

  if (!item.unlocked) {
    if (typeof showNotification === 'function') {
      showNotification("🔒 Este objeto aún no ha sido desbloqueado mediante misiones.");
    }
    return;
  }

  item.equipped = !item.equipped;
  reyJaguarState._userCustomizedEquipment = true;
  saveReyJaguarState();
  renderInventoryTab();
  if (typeof renderRPGLandingHub === 'function') {
    renderRPGLandingHub();
  }
  
  // Si el modal está abierto, refrescarlo
  const modal = document.getElementById("item-detail-modal");
  if (modal && modal.classList.contains("active")) {
    openItemDetailModal(itemId);
  }

  if (typeof showNotification === 'function') {
    showNotification(item.equipped ? `⚔️ ${item.name} equipado en tu equipo.` : `🛡️ ${item.name} desequipado y guardado en alijo.`);
  }
}
window.toggleItemEquipped = toggleItemEquipped;

// --- FUNCIÓN PARA GUARDAR LORE EDITADO IN SITU ---
function saveItemLore(itemId) {
  const item = (reyJaguarState.inventory || []).find(i => i.id === itemId);
  const textarea = document.getElementById(`item-lore-input-${itemId}`);
  if (!item || !textarea) return;

  const newLore = textarea.value.trim();
  if (!newLore) {
    if (typeof showNotification === 'function') showNotification("⚠️ La historia del objeto no puede estar vacía.");
    return;
  }

  item.lore = newLore;
  saveReyJaguarState();
  renderInventoryTab();
  if (typeof renderRPGLandingHub === 'function') {
    renderRPGLandingHub();
  }

  const feedbackEl = document.getElementById(`item-lore-feedback-${itemId}`);
  if (feedbackEl) {
    feedbackEl.style.display = "block";
    setTimeout(() => { if (feedbackEl) feedbackEl.style.display = "none"; }, 2500);
  }

  if (typeof showNotification === 'function') {
    showNotification(`📜 Historia de ${item.name} actualizada.`);
  }
}
window.saveItemLore = saveItemLore;

// --- RENDERIZADO DE CAMPAÑAS & TÍTULOS (PESTAÑA INDEPENDIENTE EN EL MENÚ PRINCIPAL) ---
function renderCampanasProjectsCards() {
  if (typeof loadProjectsHubData === "function") loadProjectsHubData();
  if (typeof projectsData === "undefined") return "";
  const projectsList = typeof getCanonicalProjectsList === "function"
    ? getCanonicalProjectsList()
    : Object.keys(projectsData).map(k => projectsData[k]);

  return projectsList.map(p => {
    const checklist = p.checklist || [];
    const totalTasks = checklist.length;
    const completedTasks = checklist.filter(c => c.completed).length;
    const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return `
      <div class="project-card-codex" id="campana-proj-card-${p.id}" style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.35); box-shadow: 0 4px 12px rgba(0,0,0,0.06); border-radius: var(--radius-sm); overflow: hidden; display: flex; flex-direction: column;">
        <div class="project-codex-banner" style="position: relative; height: 130px; overflow: hidden;">
          <img src="${p.bannerImg}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/img_financial_balance.jpg';">
          <div class="project-codex-banner-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); display: flex; justify-content: space-between; align-items: flex-end; padding: 8px 12px;">
            <span class="badge-tag badge-cyan" style="font-size: 0.7rem;">${p.category || 'Ecosistema'}</span>
            <span class="badge-tag badge-gold" style="font-size: 0.7rem;">${completedTasks} / ${totalTasks} Tareas</span>
          </div>
        </div>

        <div class="project-codex-body" style="padding: 14px 16px; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <div>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #0E0E13; margin: 0 0 4px 0;">${p.title}</h4>
            <div style="font-size: 0.78rem; color: #7A6347; line-height: 1.35; margin-bottom: 6px;">${p.subtitle || ''}</div>
            <p style="font-size: 0.78rem; color: #4A3E31; margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${p.desc}</p>
          </div>

          <!-- BARRA DE PROGRESO Y BOTONES -->
          <div class="project-progress-wrapper" style="margin-top: 14px; border-top: 1px solid rgba(197,154,40,0.2); padding-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin-bottom: 6px;">
              <strong style="color: #0E0E13;">Avance del Proyecto</strong>
              <span style="font-weight: 800; color: #B38612;">${progressPct}%</span>
            </div>
            <div class="project-progress-bar-track" style="background: #EAE3D2; height: 7px; border-radius: 4px; overflow: hidden;">
              <div class="project-progress-bar-fill" style="width: ${progressPct}%; background: linear-gradient(90deg, #B38612, #E2A93B); height: 100%;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; gap: 8px;">
              <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="incrementProjectTaskFromCampanas('${p.id}')" title="Completar siguiente hito y ganar +20 XP" style="color: #0E0905; font-weight: 800; padding: 5px 12px; font-size: 0.75rem;">
                ⚡ +1 Tarea (+20 XP)
              </button>
              
              <button class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.72rem; padding: 5px 10px; color: #0E0E13; border-color: rgba(197,154,40,0.5); background: #FAF6EE;" onclick="selectProjectView('${p.id}')">
                Detalle & Gantt ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function incrementProjectTaskFromCampanas(projId) {
  if (typeof incrementProjectTask === "function") {
    incrementProjectTask(projId);
  }
  renderCampanasTab();
}

function addProjectFromCampanas() {
  const titleInput = document.getElementById("new-campana-proj-title");
  const catInput = document.getElementById("new-campana-proj-cat");
  const descInput = document.getElementById("new-campana-proj-desc");

  if (!titleInput || !titleInput.value.trim()) {
    alert("Por favor ingresa un título para el proyecto.");
    return;
  }

  const id = "proj-" + Date.now();
  if (typeof loadProjectsHubData === "function") loadProjectsHubData();

  if (typeof projectsData !== "undefined") {
    projectsData[id] = {
      id: id,
      title: titleInput.value.trim(),
      subtitle: "Nuevo proyecto estratégico de vida",
      collaborators: "Caballero Jaguar",
      category: catInput ? catInput.value : "Desarrollo Estratégico",
      bannerImg: "assets/img_financial_balance.jpg",
      desc: descInput ? descInput.value.trim() : "Proyecto en ejecución del Caballero Jaguar.",
      gantt: [
        { id: "g1", stage: "Fase Inicial & Diagnóstico", startDate: "2026-09-01", endDate: "2026-10-01", progress: 10, status: "En Ejecución" },
        { id: "g2", stage: "Despliegue & Validación", startDate: "2026-10-02", endDate: "2026-12-01", progress: 0, status: "Planificación" }
      ],
      checklist: [
        { id: "chk-1", text: "Definir alcance y primer hito clave", completed: false },
        { id: "chk-2", text: "Ejecutar primera sesión de trabajo profundo", completed: false }
      ],
      notes: "Iniciado desde el Códice de Campañas."
    };

    if (typeof saveProjectsHubData === "function") saveProjectsHubData();
    if (typeof showNotification === "function") {
      showNotification(`📁 Proyecto "${projectsData[id].title}" creado exitosamente.`);
    }
  }

  renderCampanasTab();
}

function renderCampanasTab() {
  const container = document.getElementById("campanas-master-container");
  if (!container) return;

  if (typeof loadProjectsHubData === "function") loadProjectsHubData();
  const canonicalProjects = typeof getCanonicalProjectsList === "function" 
    ? getCanonicalProjectsList() 
    : (typeof projectsData !== "undefined" ? Object.values(projectsData) : []);
  const totalProjects = canonicalProjects.length;
  const titles = reyJaguarState.titles || [];
  const counterTitles = reyJaguarState.counterTitles || [];
  const mainQuests = reyJaguarState.mainQuests || [];

  let mainQuestsHTML = mainQuests.map(quest => `
    <div style="background: #FFFDF9; border: 1.5px solid rgba(197,154,40,0.4); border-radius: var(--radius-sm); padding: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; border-bottom: 1px solid rgba(197,154,40,0.2); padding-bottom: 8px;">
        <div>
          <span class="badge-tag badge-gold" style="font-size: 0.68rem; margin-bottom: 4px; display: inline-block;">📍 ${quest.stage}</span>
          <h4 style="font-size: 1.05rem; color: #0E0E13; font-family: 'Cinzel', serif; font-weight: 800; margin: 0;">${quest.title}</h4>
        </div>
        <span class="badge-tag ${quest.completed ? 'badge-emerald' : 'badge-gold'}" style="font-size: 0.68rem;">
          ${quest.completed ? '✅ COMPLETADA' : '⚔️ EN PROGRESO'}
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
        ${(quest.subQuests || []).map(sub => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #F0E8D6; border-radius: var(--radius-sm); border-left: 3px solid ${sub.completed ? '#2B6847' : '#9B2335'};">
            <span style="font-size: 0.84rem; color: ${sub.completed ? '#2B6847; text-decoration: line-through;' : '#0E0E13; font-weight: 600;'}">
              ${sub.completed ? '☑️' : '⏹️'} ${sub.text}
            </span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #9B2335; font-family: 'Cinzel', serif;">
                ${sub.current} / ${sub.target}
              </span>
              ${!sub.completed ? `
                <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 800; padding: 2px 8px; font-size: 0.7rem;" onclick="advanceSubQuest('${quest.id}', '${sub.id}')">
                  +1 Paso
                </button>
              ` : ''}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">

      <!-- ====================================================================
           1. MAPA DE AVENTURA 80S & 4 MISIONES PRINCIPALES (PARTE SUPERIOR)
           ==================================================================== -->
      <div style="background: #FAF6EE; border: 2px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-metallic);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge-tag badge-gold">🗺️ MAPA DE AVENTURA 80S</span>
              <span class="badge-tag badge-emerald">4 Misiones Principales</span>
            </div>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #0E0E13; margin: 4px 0 0 0;">
              Campañas: Expedición Vital & Destinos
            </h3>
          </div>
          <span style="font-size: 0.8rem; color: #7A6347; font-style: italic;">
            Alemania • País Vasco • Mundo
          </span>
        </div>

        <!-- EL MAPA DE AVENTURA ILUSTRADO 80S -->
        <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid #9B2335; box-shadow: 0 4px 14px rgba(0,0,0,0.25); background: #000; min-height: 420px; margin-bottom: 20px;">
          <img src="assets/jaguar_world_map_80s.jpg" alt="Mapa de Aventura Rey Jaguar 80s" style="width: 100%; height: 100%; min-height: 420px; object-fit: cover; filter: brightness(0.92) contrast(1.1);">
          
          <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; padding: 14px 18px; background: rgba(18, 14, 22, 0.94); border: 1.5px solid #9B2335; border-radius: var(--radius-sm); box-shadow: var(--shadow-metallic); backdrop-filter: blur(8px);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div class="sprite-item item-1" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid #9B2335; flex-shrink: 0;"></div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 900; color: #C0392B; font-family: 'Cinzel', serif;">📜 CRÓNICA DE AVENTURA: HANNOVER ➔ BILBAO ➔ VACACIONES</div>
                <p style="font-size: 0.88rem; color: #FFF; line-height: 1.45; margin: 2px 0 0 0; font-style: italic;">
                  "Avanza materialmente completando las 4 Campañas Principales: 1) Tesis, 2) Hannover, 3) España/Bilbao (trabajo, visa, domicilio, mudanza) y 4) Vacaciones."
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- LISTADO DE LAS 4 MISIONES PRINCIPALES -->
        <div class="grid-2" style="gap: 14px;">
          ${mainQuestsHTML}
        </div>
      </div>

      <!-- ====================================================================
           2. PROYECTOS SECUNDARIOS (FRENTES ESTRATÉGICOS)
           ==================================================================== -->
      <div style="background: #FAF6EE; border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-metallic);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span class="badge-tag badge-gold">📁 ECOSISTEMA ESTRATÉGICO</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #0E0E13; margin-top: 4px;">Proyectos Secundarios (Misiones Opcionales)</h3>
          </div>
          <span class="badge-tag badge-emerald" style="font-weight: 700;">
            ${totalProjects} Frentes Activos
          </span>
        </div>

        <p style="font-size: 0.88rem; color: #4A3E31; line-height: 1.5; margin-bottom: 16px;">
          Cada proyecto estratégico cuenta con su propio cronograma, presupuesto y tareas asociadas. Haz clic en <strong>+1 Tarea</strong> para registrar el cumplimiento de un hito en la vida real, avanzar tu barra de progreso y ganar <strong>+20 XP</strong> de disciplina.
        </p>

        <!-- FORMULARIO RÁPIDO PARA CREAR PROYECTO -->
        <div style="display: grid; grid-template-columns: 2fr 1fr 2fr auto; gap: 10px; margin-bottom: 18px; background: rgba(0,0,0,0.03); padding: 12px; border-radius: var(--radius-sm); border: 1px solid rgba(197,154,40,0.25);">
          <input type="text" id="new-campana-proj-title" class="input-jaguar" placeholder="Nombre del nuevo proyecto..." style="background: #FFF; color: #0E0E13; border-color: rgba(197,154,40,0.5);">
          <select id="new-campana-proj-cat" class="input-jaguar" style="background: #FFF; color: #0E0E13; border-color: rgba(197,154,40,0.5);">
            <option value="Investigación Científica">🎓 Academia & Ciencia</option>
            <option value="Ecología & Transición Territorial">🌲 Ecología & Territorio</option>
            <option value="Agrotech & Ecología Aplicada">🚜 Agrotech & Permacultura</option>
            <option value="Inteligencia Artificial & Edutainment">🤖 IA & Medios Digitales</option>
            <option value="Arte, Narrativa & Historia Naval">🏴‍☠️ Arte & Cómic</option>
            <option value="Divulgación Científica & Comunicación Pública">🎙️ Divulgación Territorial</option>
          </select>
          <input type="text" id="new-campana-proj-desc" class="input-jaguar" placeholder="Descripción / entregable..." style="background: #FFF; color: #0E0E13; border-color: rgba(197,154,40,0.5);">
          <button class="btn-jaguar btn-gold-chrome" onclick="addProjectFromCampanas()" style="color: #0E0905; font-weight: 800; padding: 0 16px;">+ Crear Proyecto</button>
        </div>

        <!-- GRILLA DE PROYECTOS -->
        <div class="projects-grid-3col" id="campanas-projects-grid">
          ${renderCampanasProjectsCards()}
        </div>
      </div>

      <!-- 2. TÍTULOS DE MAESTRÍA MASCULINA & CONTRA-TÍTULOS -->
      <div class="grid-2">
        <!-- TÍTULOS -->
        <div style="background: #FAF6EE; border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-metallic);">
          <div style="border-bottom: 1px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 14px;">
            <span class="badge-tag badge-gold">🛡️ MAESTRÍA MASCULINA</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #0E0E13; margin-top: 4px;">Títulos de la Orden</h4>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${titles.map(t => `
              <div style="padding: 10px 12px; background: #FFFDF9; border-radius: var(--radius-sm); border-left: 3px solid ${t.unlocked ? '#E5B842' : '#CBD5E0'}; border: 1px solid rgba(0,0,0,0.06); border-left-width: 3px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: ${t.unlocked ? '#0E0E13' : '#718096'}; font-size: 0.9rem;">${t.name}</strong>
                  <span class="badge-tag ${t.unlocked ? 'badge-emerald' : 'badge-pink'}" style="font-size: 0.68rem; padding: 2px 6px;">
                    ${t.unlocked ? 'Desbloqueado' : 'Pendiente'}
                  </span>
                </div>
                <p style="font-size: 0.78rem; color: rgba(255,255,255,0.4); margin: 4px 0 0 0;">${t.desc}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- CONTRA-TÍTULOS -->
        <div style="background: #FAF6EE; border: 1.5px solid var(--border-rose-gold); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-metallic);">
          <div style="border-bottom: 1px solid rgba(255,0,127,0.3); padding-bottom: 10px; margin-bottom: 14px;">
            <span class="badge-tag badge-pink">💧 VULNERABILIDAD CONSCIENTE</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #0E0E13; margin-top: 4px;">Contra-Títulos Integradores</h4>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${counterTitles.map(ct => `
              <div style="padding: 10px 12px; background: #FFFDF9; border-radius: var(--radius-sm); border-left: 3px solid ${ct.unlocked ? 'var(--neon-pink)' : '#CBD5E0'}; border: 1px solid rgba(0,0,0,0.06); border-left-width: 3px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: ${ct.unlocked ? '#0E0E13' : '#718096'}; font-size: 0.9rem;">${ct.name}</strong>
                  <span class="badge-tag ${ct.unlocked ? 'badge-gold' : 'badge-pink'}" style="font-size: 0.68rem; padding: 2px 6px;">
                    ${ct.unlocked ? 'Integrado' : 'Por Explorar'}
                  </span>
                </div>
                <p style="font-size: 0.78rem; color: rgba(255,255,255,0.4); margin: 4px 0 0 0;">${ct.desc}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}
window.renderCampanasTab = renderCampanasTab;

// --- ESTADO Y CONFIGURACIÓN DE OUTFITS & EQUIPO (LAYOUT DIVIDIDO) ---
let currentOutfitDayKey = (function() {
  const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const d = new Date().getDay();
  return days[d] === "domingo" ? "lunes" : days[d];
})();

let currentInventoryFilter = "todos";
let isWeeklyLookbookExpanded = false;

window.selectOutfitDay = function(dayKey) {
  currentOutfitDayKey = dayKey;
  isWeeklyLookbookExpanded = false;
  renderInventoryTab();
};

window.toggleWeeklyLookbook = function() {
  isWeeklyLookbookExpanded = !isWeeklyLookbookExpanded;
  renderInventoryTab();
};

window.setInventoryFilter = function(filter) {
  currentInventoryFilter = filter;
  renderInventoryTab();
};

const OUTFIT_DAYS_CONFIG = [
  { key: "lunes", name: "Lunes", icon: "⚡", tag: "Fuerza Base", img: "assets/outfit_banner_lunes.jpg", lookImg: "assets/outfit_look_lunes.jpg" },
  { key: "martes", name: "Martes", icon: "🌊", tag: "Zona 2 Cardio", img: "assets/outfit_banner_martes.jpg", lookImg: "assets/outfit_look_martes.jpg" },
  { key: "miercoles", name: "Miércoles", icon: "🧬", tag: "Calistenia & Foco", img: "assets/outfit_banner_miercoles.jpg", lookImg: "assets/outfit_look_miercoles.jpg" },
  { key: "jueves", name: "Jueves", icon: "🌲", tag: "ReWild & Bosque", img: "assets/outfit_banner_jueves.jpg", lookImg: "assets/outfit_look_jueves.jpg" },
  { key: "viernes", name: "Viernes", icon: "⚖️", tag: "Estrategia & Foco", img: "assets/outfit_banner_viernes.jpg", lookImg: "assets/outfit_look_viernes.jpg" },
  { key: "sabado", name: "Sábado", icon: "🎷", tag: "Música & Expresión", img: "assets/outfit_banner_sabado.jpg", lookImg: "assets/outfit_look_sabado.jpg" },
  { key: "domingo", name: "Domingo", icon: "🧘", tag: "Sauna & Regeneración", img: "assets/outfit_banner_domingo.jpg", lookImg: "assets/outfit_look_domingo.jpg" }
];

window.openOutfitLightbox = function(dayKey) {
  const normKey = (typeof dayKey === 'string' && dayKey.trim()) ? dayKey.trim().toLowerCase() : (currentOutfitDayKey || "lunes");
  const dayConfig = OUTFIT_DAYS_CONFIG.find(d => d.key === normKey) || OUTFIT_DAYS_CONFIG[0];
  let lifestyleData = {};
  if (typeof LIFESTYLE_ARCHITECT_DATA !== "undefined") {
    lifestyleData = LIFESTYLE_ARCHITECT_DATA.dias || LIFESTYLE_ARCHITECT_DATA.calendario_somatico_semanal || {};
  }
  const dayData = lifestyleData[dayConfig.key] || DEFAULT_OUTFIT_FALLBACK[dayConfig.key] || DEFAULT_OUTFIT_FALLBACK["lunes"];

  const container = document.getElementById("outfit-lightbox-content");
  const modal = document.getElementById("outfit-lightbox-modal");
  if (!modal) return;
  modal.style.zIndex = "100050";

  if (container) {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-gold); padding-bottom: 14px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.6rem;">${dayConfig.icon}</span>
          <div>
            <span class="badge-tag badge-gold">OUTFIT COMPLETO DE ALTA DEFINICIÓN</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #FFF; margin: 4px 0 0 0;">
              ${dayConfig.name} • ${dayData.tema || dayConfig.tag}
            </h3>
          </div>
        </div>
        <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="closeOutfitLightbox()" style="font-size: 1.1rem; padding: 6px 14px;">✕ Cerrar</button>
      </div>

      <div style="display: grid; grid-template-columns: minmax(280px, 340px) 1fr; gap: 20px; align-items: start;">
        <div style="border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--border-gold); box-shadow: 0 8px 24px rgba(0,0,0,0.6); position: relative; background: #000;">
          <img src="${dayConfig.lookImg || dayConfig.img}" alt="Look ${dayConfig.name}" onerror="this.onerror=null; this.src='${dayConfig.img}'; this.onerror=function(){this.src='assets/outfits_composite_1_mon_wed.jpg';};" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block; margin: 0 auto;">
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="background: rgba(197,154,40,0.12); border: 1px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm); padding: 12px 14px;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #E5B842; text-transform: uppercase; letter-spacing: 0.05em;">🧬 Calibración Fisiológica:</span>
            <p style="font-size: 0.85rem; color: #FFF; margin: 4px 0 0 0; font-weight: 600; line-height: 1.4;">${dayData.enfoque_fisiologico || 'Activación neuromuscular y balance somático'}</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Object.keys(dayData.bloques || {}).map(bKey => {
              const b = dayData.bloques[bKey];
              const momentIcons = { manana: "🌅", tarde: "☀️", noche: "🌙" };
              const prendas = (b.gear_and_outfit && b.gear_and_outfit.prendas) ? b.gear_and_outfit.prendas : [];
              const accesorios = (b.gear_and_outfit && b.gear_and_outfit.accesorios) ? b.gear_and_outfit.accesorios : [];
              return `
                <div style="background: rgba(18, 24, 34, 0.9); border: 1px solid rgba(197,154,40,0.25); border-radius: var(--radius-sm); padding: 10px 12px;">
                  <strong style="color: #D4464E; font-size: 0.85rem; font-family: 'Cinzel', serif;">${momentIcons[bKey] || '⏰'} ${b.momento}</strong>
                  <div style="margin-top: 6px; font-size: 0.78rem; color: #E2E8F0;">
                    <strong style="color: #E5B842;">Prendas:</strong> ${prendas.join(", ") || "Indumentaria técnica funcional"}
                  </div>
                  ${accesorios.length > 0 ? `
                    <div style="margin-top: 4px; font-size: 0.76rem; color: #68D391;">
                      <strong>Accesorios:</strong> ${accesorios.join(", ")}
                    </div>
                  ` : ''}
                  ${b.estado_somatico ? `
                    <div style="margin-top: 4px; font-size: 0.72rem; color: #94A3B8; font-style: italic;">
                      🧘 Postura: ${b.estado_somatico}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add("active");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeOutfitLightbox = function() {
  const modal = document.getElementById("outfit-lightbox-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

const DEFAULT_OUTFIT_FALLBACK = {
  lunes: {
    nombre: "Lunes", icono: "⚡", tema: "Ignición Somática & Fuerza Base",
    enfoque_fisiologico: "Sistema Neuromuscular, Síntesis Proteica & Calibración Circadiana",
    bloques: {
      manana: {
        momento: "Mañana (07:00 - 09:00)",
        gear_and_outfit: {
          prendas: ["Camiseta técnica fibra de bambú o carbón", "Pantalón corto compresión ergonómica", "Zapatillas barefoot horma ancha"],
          accesorios: ["Gafas de sol (post 15 min luz natural)", "Botella de acero con agua y electrolitos"]
        },
        estado_somatico: "Torso erguido, respiración exclusivamente nasal cadenciada, mirada al horizonte."
      },
      tarde: {
        momento: "Tarde (17:30 - 19:30)",
        gear_and_outfit: {
          prendas: ["Camiseta técnica verde bosque o grafito", "Mallas o shorts con bolsillos técnicos", "Calzado plano suela rígida"],
          accesorios: ["Cinturón de levantamiento", "Reloj medidor FC / pulsera"]
        },
        estado_somatico: "Intensidad controlada, foco láser sin móvil entre series, presencia física firme."
      },
      noche: {
        momento: "Noche (20:30 - 22:30)",
        gear_and_outfit: {
          prendas: ["Pantalón algodón orgánico holgado", "Camiseta suave corte amplio", "Calcetines lana merino"],
          accesorios: ["Lámpara luz ámbar / velas", "Esterilla corcho natural"]
        },
        estado_somatico: "Hombros caídos, mandíbula relajada, respiración diafragmática 4-7-8."
      }
    }
  },
  martes: {
    nombre: "Martes", icono: "🌊", tema: "Resistencia Aeróbica & Zona 2",
    enfoque_fisiologico: "Biogénesis Mitocondrial, Flexibilidad Metabólica & Depuración",
    bloques: {
      manana: {
        momento: "Mañana (07:00 - 08:30)",
        gear_and_outfit: {
          prendas: ["Cortavientos ultraligero pizarra transpirable", "Mallas técnicas running antirroce", "Zapatillas running amortiguadas drop bajo"],
          accesorios: ["Banda pectoral FC / Reloj GPS", "Cinturón hidratación con soft flask"]
        },
        estado_somatico: "Cadencia suave y rítmica, respiración nasal constante, sensación de flotar."
      },
      tarde: {
        momento: "Tarde (15:00 - 17:30)",
        gear_and_outfit: {
          prendas: ["Camisa de lino o jersey fino transpirable", "Pantalón técnico casual con elástico", "Calzado barefoot de oficina"],
          accesorios: ["Gafas con filtro espectro azul", "Elevador portátil standing desk"]
        },
        estado_somatico: "Alineación vertical de la columna, pausas activas para colgarse (dead hang)."
      },
      noche: {
        momento: "Noche (20:30 - 22:00)",
        gear_and_outfit: {
          prendas: ["Ropa de descanso en modal o lino suave", "Pantalón lounge amplio"],
          accesorios: ["Luz cálida de baja intensidad", "Lectura analógica no técnica"]
        },
        estado_somatico: "Vasodilatación periférica y entrada suave al sueño delta."
      }
    }
  },
  miercoles: {
    nombre: "Miércoles", icono: "🧬", tema: "Potencia & Calistenia",
    enfoque_fisiologico: "Fuerza Relativa, Movilidad Articular & Agilidad",
    bloques: {
      manana: {
        momento: "Mañana (07:00 - 09:00)",
        gear_and_outfit: {
          prendas: ["Camiseta atlética ceñida transpirable", "Joggers de movilidad elásticos", "Zapatillas barefoot con agarre"],
          accesorios: ["Magnesio para manos", "Bandas de resistencia para hombros"]
        },
        estado_somatico: "Core activo, estabilidad escapular y respiración intercostal."
      },
      tarde: {
        momento: "Tarde (16:00 - 18:30)",
        gear_and_outfit: {
          prendas: ["Camisa oxford informal con elasticidad", "Pantalón chino cómodo", "Zapatillas de cuero minimalistas"],
          accesorios: ["Cuaderno de notas analógico", "Pluma estilográfica"]
        },
        estado_somatico: "Atención ejecutiva sin dispersión digital."
      },
      noche: {
        momento: "Noche (21:00 - 22:30)",
        gear_and_outfit: {
          prendas: ["Camiseta algodón suave", "Pantalón holgado transpirable"],
          accesorios: ["Rodillo de espuma miofascial", "Pelota de lacrosse para masajes"]
        },
        estado_somatico: "Liberación miofascial y descompresión del sistema nervioso."
      }
    }
  },
  jueves: {
    nombre: "Jueves", icono: "🌲", tema: "ReWilding & Conexión Somática",
    enfoque_fisiologico: "Propiocepción Natural, Microbiota & Inmunidad",
    bloques: {
      manana: {
        momento: "Mañana (07:00 - 09:00)",
        gear_and_outfit: {
          prendas: ["Chaqueta técnica impermeable para sendero", "Pantalón ripstop antidesgarro", "Botas trail barefoot o calzado de agarre"],
          accesorios: ["Mochila técnica ligera de senderismo", "Termo con infusión caliente"]
        },
        estado_somatico: "Contacto directo con tierra, respiración profunda de fitoncidas."
      },
      tarde: {
        momento: "Tarde (15:30 - 18:00)",
        gear_and_outfit: {
          prendas: ["Polo piqué técnico sobrio", "Pantalón de lona elástica", "Calzado flexible transpirable"],
          accesorios: ["Auriculares con cancelación de ruido", "Botella térmica"]
        },
        estado_somatico: "Flujo cognitivo sostenido y cadencia postural firme."
      },
      noche: {
        momento: "Noche (20:30 - 22:30)",
        gear_and_outfit: {
          prendas: ["Sudadera suave de felpa francesa", "Pantalón lounge de algodón"],
          accesorios: ["Difusor de aceites esenciales cedro/lavanda", "Taza de cerámica artesanal"]
        },
        estado_somatico: "Desaceleración circadiana y calidez doméstica."
      }
    }
  },
  viernes: {
    nombre: "Viernes", icono: "⚖️", tema: "Foco Estratégico & Maestría",
    enfoque_fisiologico: "Consolidación Dopaminérgica & Síntesis Semanal",
    bloques: {
      manana: {
        momento: "Mañana (07:00 - 09:00)",
        gear_and_outfit: {
          prendas: ["Camisa azul marino corte sartorial moderno", "Pantalón a medida con ajuste flexible", "Zapatos Derby sobrios o sneakers de cuero"],
          accesorios: ["Reloj clásico analógico", "Carpeta ejecutiva de notas"]
        },
        estado_somatico: "Porte elegante, hombros alineados, presencia sobria y asertiva."
      },
      tarde: {
        momento: "Tarde (16:00 - 18:00)",
        gear_and_outfit: {
          prendas: ["Camiseta casual de algodón pesado", "Vaqueros selvedge cómodos", "Zapatillas vintage sobrias"],
          accesorios: ["Billetera minimalista", "Gafas de lectura"]
        },
        estado_somatico: "Cierre de cuentas, balance patrimonial y orden mental."
      },
      noche: {
        momento: "Noche (20:00 - 23:00)",
        gear_and_outfit: {
          prendas: ["Chaqueta blazer desestructurada o cazadora bomber", "Camiseta monocromática negra", "Pantalón oscuro slim"],
          accesorios: ["Fragancia amaderada de autor", "Reloj pulsera"]
        },
        estado_somatico: "Apertura social magnética, calidez y carisma tranquilo."
      }
    }
  },
  sabado: {
    nombre: "Sábado", icono: "🎷", tema: "Expresión Creativa & Exploración",
    enfoque_fisiologico: "Neuroplasticidad, Coordinación Fina & Fluidez",
    bloques: {
      manana: {
        momento: "Mañana (08:30 - 11:00)",
        gear_and_outfit: {
          prendas: ["Camiseta informal relajada con bolsillo", "Pantalón corto de escalada/movilidad", "Sandalias o zapatillas barefoot casuales"],
          accesorios: ["Trompeta de bolsillo o armónica con estuche", "Bolsa tote de algodón grueso"]
        },
        estado_somatico: "Oído musical atento, dedos relajados, respiración libre."
      },
      tarde: {
        momento: "Tarde (16:00 - 19:00)",
        gear_and_outfit: {
          prendas: ["Camisa hawaiana o estampada vintage sobria", "Bermudas de algodón lavado", "Calzado náutico o alpargatas de lona"],
          accesorios: ["Sombrero o gorra protectora", "Gafas de sol clásicas"]
        },
        estado_somatico: "Exploración de la ciudad o del campo sin prisa ni reloj."
      },
      noche: {
        momento: "Noche (20:30 - 23:30)",
        gear_and_outfit: {
          prendas: ["Camisa de punto negro con botones de nácar", "Pantalón de corte relajado fluido", "Botines de ante o calzado suave"],
          accesorios: ["Anillo o brazalete sobrio de cuero", "Funda de instrumento"]
        },
        estado_somatico: "Gozo sensorial, escucha activa y presencia artística."
      }
    }
  },
  domingo: {
    nombre: "Domingo", icono: "🧘", tema: "Regeneración Total & Sauna",
    enfoque_fisiologico: "Choque Térmico (HSPs), Autofagia & Reset Circadiano",
    bloques: {
      manana: {
        momento: "Mañana (09:00 - 11:30)",
        gear_and_outfit: {
          prendas: ["Bañador o short de secado rápido", "Albornoz de algodón grueso absorbente", "Chanclas antideslizantes ergonómicas"],
          accesorios: ["Gorro de sauna de fieltro de lana", "Termo de 1L con infusión y electrolitos"]
        },
        estado_somatico: "Exposición al calor de la sauna y contraste frío con respiración lenta."
      },
      tarde: {
        momento: "Tarde (16:00 - 18:30)",
        gear_and_outfit: {
          prendas: ["Pantalón de yoga / chándal premium de felpa", "Camiseta de manga larga suave", "Manta de lana merino"],
          accesorios: ["Diario de gratitud y planificación", "Vela aromática de sándalo"]
        },
        estado_somatico: "Visión panorámica de la semana venidera, serenidad estoica."
      },
      noche: {
        momento: "Noche (20:30 - 22:00)",
        gear_and_outfit: {
          prendas: ["Ropa de dormir holgada y fresca de lino", "Calcetines transpirables para dormir"],
          accesorios: ["Antifaz opaco de seda para sueño profundo", "Tapones de oído si hay ruido"]
        },
        estado_somatico: "Abandono total del control, relajación somática absoluta."
      }
    }
  }
};

// --- HELPER MAESTRO DE SPRITES: ASIGNACIÓN EXACTA DE COORDENADAS PARA LOS 44 OBJETOS ---
function getItemSpriteInfo(item) {
  if (!item) return { sheet: 'assets/jaguar_king_items_sprite_grid.jpg', size: '400% 400%', posX: '0%', posY: '0%' };

  // Ítems 1 al 16: Las 16 Reliquias Centrales de la Orden (Grilla 4x4 en jaguar_king_items_sprite_grid.jpg)
  if (item.id >= 1 && item.id <= 16) {
    const idx = item.id - 1;
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    return {
      sheet: 'assets/jaguar_king_items_sprite_grid.jpg',
      size: '400% 400%',
      posX: `${(col * 100) / 3}%`,
      posY: `${(row * 100) / 3}%`
    };
  }

  // Ítems 17 al 44: Mapeo exacto sobre assets/jaguar_40_items_sprite_grid.jpg (8 columnas x 5 filas)
  const grid40Map = {
    17: { col: 3, row: 0 }, // 🕶️ Gafas de Viajero (Travel Sunglasses)
    18: { col: 3, row: 1 }, // 🎨 Paleta de Óleo Zorn (Oil Painting Palette)
    19: { col: 4, row: 1 }, // 🧘 Esterilla de Yoga (Yoga Mat)
    20: { col: 5, row: 1 }, // 👟 Zapatillas de Running (Running Shoes)
    21: { col: 6, row: 1 }, // 🥊 Guantes de Muay Thai (Muay Thai Boxing Gloves)
    22: { col: 7, row: 1 }, // 🧗 Mosquetón de Escalada (Climbing Carabiner)
    23: { col: 0, row: 2 }, // 🏛️ Busto Filosófico Estoico (Stoic Philosophy Bust)
    24: { col: 1, row: 2 }, // ⏱️ Reloj de Bolsillo Vintage (Pocket Watch)
    25: { col: 2, row: 2 }, // 💰 Monedero de Plata (Silver Coin Purse)
    26: { col: 3, row: 2 }, // 🏺 Incensario de Copal (Ceremonial Copal Burner)
    27: { col: 4, row: 2 }, // 🍵 Cuenco de Té Matcha (Matcha Tea Bowl)
    28: { col: 5, row: 2 }, // 🪨 Rodillo Facial de Jade (Facial Jade Roller)
    29: { col: 6, row: 2 }, // 😴 Antifaz de Seda Somático (Sleeping Eye Mask)
    30: { col: 7, row: 2 }, // ⛺ Carpa de Expedición (Forest Tent)
    31: { col: 0, row: 3 }, // 🥽 Antiparras de Nado Mar (Ocean Swimming Goggles)
    32: { col: 2, row: 3 }, // ✂️ Tijeras de Jardinería (Pruning Shears)
    33: { col: 3, row: 3 }, // 🏋️ Mancuerna Hexagonal (Dumbbell)
    34: { col: 4, row: 3 }, // 🫖 Pesa Rusa Kettlebell (Kettlebell)
    35: { col: 5, row: 3 }, // 📔 Diario de Cuero Cosido (Leather Journal)
    36: { col: 6, row: 3 }, // ✒️ Pluma Estilográfica (Fountain Pen)
    37: { col: 7, row: 3 }, // 🔭 Astrolabio de Navegación (Astrolabe)
    38: { col: 0, row: 4 }, // 🧴 Esencia de Sándalo (Sandalwood Perfume Bottle)
    39: { col: 1, row: 4 }, // ♞ Caballo de Ajedrez (Chess Knight)
    40: { col: 2, row: 4 }, // 🧪 Elixir Herbal Adaptógeno (Herbal Elixir Vial)
    41: { col: 3, row: 4 }, // 🗡️ Daga de Obsidiana (Obsidian Dagger)
    42: { col: 4, row: 4 }, // 🪕 Ukelele Barítono (Acoustic Ukulele)
    43: { col: 5, row: 4 }, // 🧥 Gabardina Táctica (Tactical Wool Trenchcoat)
    44: { col: 7, row: 4 }, // 🏆 Cáliz de Oro Jaguar (Royal Gold Chalice)
    45: { col: 5, row: 3 }, // 🛡️ Escudo Pretoriano (Praetorian Shield)
    46: { col: 1, row: 3 }, // 📜 Rollo de la Orden (Order Scroll)
    47: { col: 6, row: 4 }, // 🦅 Águila Vexillaris (Roman Eagle Vexillum)
    48: { col: 7, row: 4 }  // 👑 Corona Cívica de Laurel (Civic Crown of Laurel)
  };

  const coords = grid40Map[item.id] || { col: (item.id - 1) % 8, row: Math.floor((item.id - 1) / 8) % 5 };
  return {
    sheet: 'assets/jaguar_40_items_sprite_grid.jpg',
    size: '800% 500%',
    posX: `${(coords.col * 100) / 7}%`,
    posY: `${(coords.row * 100) / 4}%`
  };
}
window.getItemSpriteInfo = getItemSpriteInfo;

// --- RENDERIZADO PRINCIPAL DE LA PESTAÑA EQUIPO (SPLIT: OUTFITS A LA IZQUIERDA + ARSENAL IMPERIAL A LA DERECHA) ---
function renderInventoryTab() {
  const container = document.getElementById("inventory-grid-container");
  if (!container) return;

  const inventory = reyJaguarState.inventory || [];
  
  // Asegurar consistencia en flags booleanos
  inventory.forEach(item => {
    if (typeof item.equipped !== 'boolean') item.equipped = (item.id === 1);
  });

  const equippedCount = inventory.filter(i => i.unlocked && i.equipped).length;
  const inBagCount = inventory.filter(i => i.unlocked && !i.equipped).length;
  const lockedCount = inventory.filter(i => !i.unlocked).length;

  // Filtrado de ítems para el panel derecho
  let filteredInventory = inventory;
  if (currentInventoryFilter === "equipped") {
    filteredInventory = inventory.filter(i => i.unlocked && i.equipped);
  } else if (currentInventoryFilter === "alijo") {
    filteredInventory = inventory.filter(i => i.unlocked && !i.equipped);
  } else if (currentInventoryFilter === "locked") {
    filteredInventory = inventory.filter(i => !i.unlocked);
  }

  // Obtener datos del día activo de outfits
  const lifestyleData = (window.LIFESTYLE_ARCHITECT_DATA && window.LIFESTYLE_ARCHITECT_DATA.dias)
    ? window.LIFESTYLE_ARCHITECT_DATA.dias
    : DEFAULT_OUTFIT_FALLBACK;
  const dayData = lifestyleData[currentOutfitDayKey] || DEFAULT_OUTFIT_FALLBACK[currentOutfitDayKey] || DEFAULT_OUTFIT_FALLBACK["lunes"];
  const dayConfig = OUTFIT_DAYS_CONFIG.find(d => d.key === currentOutfitDayKey) || OUTFIT_DAYS_CONFIG[0];

  // Helper para renderizar cada tarjeta de ítem en la Grilla del Alijo
  function renderCompactItemCard(item) {
    const isEquipped = item.unlocked && item.equipped;
    let badgeClass = 'badge-pink';
    let badgeText = '🔒 Bloqueado';
    let cardStateClass = 'locked';

    if (isEquipped) {
      badgeClass = 'badge-emerald';
      badgeText = '⚔️ Equipado';
      cardStateClass = 'equipped';
    } else if (item.unlocked) {
      badgeClass = 'badge-gold';
      badgeText = '🎒 En Alijo';
      cardStateClass = 'in-bag';
    }

    const spriteInfo = getItemSpriteInfo(item);

    return `
      <div class="alijo-item-card ${cardStateClass}" onclick="openItemDetailModal(${item.id})">
        <!-- CABECERA DE TARJETA: SPRITE, ESTADO, ID Y TÍTULO -->
        <div class="alijo-card-header">
          <div class="alijo-sprite-frame" style="background-image: url('${spriteInfo.sheet}'); background-size: ${spriteInfo.size}; background-position: ${spriteInfo.posX} ${spriteInfo.posY};"></div>
          <div class="alijo-card-title-group">
            <div class="alijo-card-top-pills">
              <span class="badge-tag ${badgeClass}" style="font-size: 0.62rem; padding: 2px 6px;">${badgeText}</span>
              <span class="alijo-item-num">#${item.id}</span>
            </div>
            <h4 class="alijo-item-title" title="${item.name}">${item.name}</h4>
            <span class="alijo-item-aura-pill">${item.auraKey || 'Orden'}</span>
          </div>
        </div>

        <!-- CUERPO DE TARJETA: LORE Y OBJETIVO DE LA ORDEN -->
        <div class="alijo-card-body">
          <div class="alijo-item-lore" title="${item.lore}">
            ${item.lore}
          </div>
          <div class="alijo-item-objective" title="Misión: ${item.howToObtain || 'Misión de la Orden'}">
            <span class="alijo-objective-icon">🎯</span>
            <span class="alijo-objective-text">${item.howToObtain || 'Misión de la Orden'}</span>
          </div>
        </div>

        <!-- PIE DE TARJETA: ACCIÓN EQUIPAR / VER DETALLES -->
        <div class="alijo-card-footer" onclick="event.stopPropagation();">
          ${item.unlocked ? `
            <button class="btn-jaguar btn-sm ${isEquipped ? 'btn-secondary-dark' : 'btn-gold-chrome'} alijo-btn-action" style="${isEquipped ? '' : 'color: #0E0905;'}" onclick="toggleItemEquipped(${item.id})" title="${isEquipped ? 'Desequipar y guardar en alijo' : 'Equipar en arsenal activo'}">
              ${isEquipped ? '🛡️ Desequipar' : '⚔️ Equipar'}
            </button>
            <button class="btn-jaguar btn-sm btn-secondary-dark alijo-btn-inspect" onclick="openItemDetailModal(${item.id})" title="Ver historia y códice">
              ✏️ Códice
            </button>
          ` : `
            <span class="alijo-locked-badge">🔒 Por conquistar</span>
            <button class="btn-jaguar btn-sm btn-secondary-dark alijo-btn-inspect" onclick="openItemDetailModal(${item.id})" title="Ver requisitos para desbloquear">
              🔍 Requisitos
            </button>
          `}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="equipo-master-split-layout">
      
      <!-- ====================================================================
           COLUMNA IZQUIERDA: INFORMACIÓN DE OUTFITS POR DÍA & LOOKBOOK SEMANAL
           ==================================================================== -->
      <div class="equipo-outfit-panel">
        <!-- HEADER OUTFITS -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span class="badge-tag badge-gold">👔 OUTFITS SOMÁTICOS</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #FFF; margin: 4px 0 0 0;">Outfits por Día</h3>
          </div>
          <button class="btn-jaguar btn-sm ${isWeeklyLookbookExpanded ? 'btn-gold-chrome' : 'btn-secondary-dark'}" style="font-size: 0.74rem; font-weight: 800; padding: 4px 10px; ${isWeeklyLookbookExpanded ? 'color: #0E0905;' : ''}" onclick="toggleWeeklyLookbook()">
            ${isWeeklyLookbookExpanded ? '✕ Ver Día' : '📅 Ver Semana (Lookbook)'}
          </button>
        </div>

        <!-- SELECTOR DE DÍAS (LUNES - DOMINGO) -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
          ${OUTFIT_DAYS_CONFIG.map(d => `
            <button class="outfit-day-pill ${d.key === currentOutfitDayKey ? 'active' : ''}" onclick="selectOutfitDay('${d.key}')">
              <span>${d.icon}</span>
              <span>${d.name}</span>
            </button>
          `).join("")}
        </div>

        ${isWeeklyLookbookExpanded ? `
          <!-- VISTA LOOKBOOK EXPANDIDA: LOS 7 DÍAS EN LA SEMANA -->
          <div style="display: flex; flex-direction: column; gap: 12px; max-height: 540px; overflow-y: auto; padding-right: 4px;" class="custom-scrollbar">
            <div style="background: rgba(197,154,40,0.12); border: 1px solid rgba(197,154,40,0.35); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.78rem; color: rgba(255,255,255,0.25); display: flex; justify-content: space-between; align-items: center;">
              <span>🗓️ <strong>Semana Completa (7 Días)</strong>: Indumentaria funcional y somática diaria.</span>
              <span class="badge-tag badge-gold" style="font-size: 0.65rem;">21 Bloques</span>
            </div>

            ${OUTFIT_DAYS_CONFIG.map(cfg => {
              const dData = lifestyleData[cfg.key] || DEFAULT_OUTFIT_FALLBACK[cfg.key] || DEFAULT_OUTFIT_FALLBACK["lunes"];
              const bManana = dData.bloques ? dData.bloques.manana : null;
              const bTarde = dData.bloques ? dData.bloques.tarde : null;
              return `
                <div style="background: rgba(16, 22, 32, 0.85); border: 1.5px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                  <div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(197,154,40,0.2); background: rgba(197,154,40,0.08);">
                    <img src="${cfg.lookImg || cfg.img}" alt="${cfg.name}" onerror="this.onerror=null; this.src='${cfg.img}'; this.onerror=function(){this.src='assets/outfits_composite_1_mon_wed.jpg';};" style="width: 58px; height: 78px; border-radius: 6px; object-fit: cover; object-position: top center; border: 1.5px solid #9B2335; cursor: pointer; flex-shrink: 0;" onclick="openOutfitLightbox('${cfg.key}')" title="Ver atuendo completo">
                    <div style="flex: 1;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFF; margin: 0;">${cfg.icon} ${cfg.name} • ${dData.tema || cfg.tag}</h4>
                        <button class="btn-jaguar btn-sm btn-gold-chrome" style="padding: 2px 8px; font-size: 0.68rem; color: #0E0905;" onclick="selectOutfitDay('${cfg.key}')">Ver Detalle</button>
                      </div>
                      <p style="font-size: 0.72rem; color: #CBD5E0; margin: 2px 0 0 0;">${dData.enfoque_fisiologico || ''}</p>
                    </div>
                  </div>
                  <div style="padding: 10px 12px; font-size: 0.78rem; display: flex; flex-direction: column; gap: 6px;">
                    ${bManana ? `
                      <div>
                        <strong style="color: #E5B842;">Mañana:</strong>
                        <span style="color: #CBD5E0;">${(bManana.gear_and_outfit && bManana.gear_and_outfit.prendas) ? bManana.gear_and_outfit.prendas.join(', ') : 'Indumentaria funcional'}</span>
                      </div>
                    ` : ''}
                    ${bTarde ? `
                      <div>
                        <strong style="color: #68D391;">Tarde:</strong>
                        <span style="color: #CBD5E0;">${(bTarde.gear_and_outfit && bTarde.gear_and_outfit.prendas) ? bTarde.gear_and_outfit.prendas.join(', ') : 'Ropa atlética / casual'}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <!-- VISTA DÍA SELECCIONADO: DETALLE COMPLETO DEL OUTFIT Y SOMÁTICA -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; aspect-ratio: 5 / 4; max-height: 260px; width: 100%; border: 1.5px solid var(--border-gold); box-shadow: var(--shadow-metallic); cursor: pointer;" onclick="openOutfitLightbox('${dayConfig.key}')" title="Clic para ampliar atuendo completo">
              <img src="${dayConfig.lookImg || dayConfig.img}" alt="Look ${dayConfig.name}" onerror="this.onerror=null; this.src='${dayConfig.img}'; this.onerror=function(){this.src='assets/outfits_composite_1_mon_wed.jpg';};" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: brightness(0.95) contrast(1.05);">
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(14,9,5,0.85) 0%, rgba(14,9,5,0.15) 50%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 12px 14px; pointer-events: none;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                  <div>
                    <span class="badge-tag badge-gold" style="font-size: 0.65rem; padding: 2px 7px;">${dayConfig.icon} LOOK DEL ${dayConfig.name.toUpperCase()} • ZOOM 🔍</span>
                    <h4 style="color: #FFF; font-family: 'Cinzel', serif; font-size: 1.05rem; margin: 3px 0 0 0; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">${dayData.tema || 'Outfit Funcional Somático'}</h4>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.72rem; color: #E5B842; font-weight: 700;">${dayConfig.tag}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ENFOQUE SOMÁTICO & FISIOLÓGICO -->
            <div style="background: rgba(197,154,40,0.12); border: 1px solid rgba(197,154,40,0.3); border-radius: var(--radius-sm); padding: 10px 12px;">
              <span style="font-size: 0.68rem; font-weight: 800; color: #E5B842; text-transform: uppercase; letter-spacing: 0.05em;">🧬 Calibración Fisiológica:</span>
              <p style="font-size: 0.8rem; color: #FFF; margin: 3px 0 0 0; font-weight: 600;">${dayData.enfoque_fisiologico || 'Activación neuromuscular y balance somático'}</p>
            </div>

            <!-- 3 BLOQUES DEL DÍA (MAÑANA, TARDE, NOCHE) -->
            <div style="display: flex; flex-direction: column; gap: 10px; max-height: 330px; overflow-y: auto; padding-right: 4px;" class="custom-scrollbar">
              ${Object.keys(dayData.bloques || {}).map(bKey => {
                const b = dayData.bloques[bKey];
                const momentIcons = { manana: "🌅", tarde: "☀️", noche: "🌙" };
                const momentColors = { manana: "#E5B842", tarde: "#38A169", noche: "#63B3ED" };
                const prendas = (b.gear_and_outfit && b.gear_and_outfit.prendas) ? b.gear_and_outfit.prendas : [];
                const accesorios = (b.gear_and_outfit && b.gear_and_outfit.accesorios) ? b.gear_and_outfit.accesorios : [];

                return `
                  <div style="background: rgba(18, 24, 34, 0.9); border: 1px solid rgba(197,154,40,0.25); border-left: 3.5px solid ${momentColors[bKey] || '#9B2335'}; border-radius: var(--radius-sm); padding: 10px 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="color: #FFF; font-size: 0.82rem; font-family: 'Cinzel', serif;">
                        ${momentIcons[bKey] || '⏰'} ${b.momento}
                      </strong>
                      <span style="font-size: 0.7rem; color: rgba(255,255,255,0.25); font-weight: 600;">${b.duracion_optima || ''}</span>
                    </div>

                    <div style="margin-bottom: 6px;">
                      <span style="font-size: 0.7rem; font-weight: 700; color: #CBD5E0;">👔 Prendas:</span>
                      <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 3px;">
                        ${prendas.map(p => `
                          <span style="font-size: 0.72rem; background: rgba(197,154,40,0.15); border: 1px solid rgba(197,154,40,0.35); padding: 2px 7px; border-radius: 4px; color: rgba(255,255,255,0.25);">
                            ${p}
                          </span>
                        `).join("")}
                      </div>
                    </div>

                    ${accesorios.length > 0 ? `
                      <div style="margin-bottom: 6px;">
                        <span style="font-size: 0.7rem; font-weight: 700; color: #CBD5E0;">🎒 Accesorios:</span>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 3px;">
                          ${accesorios.map(a => `
                            <span style="font-size: 0.7rem; background: rgba(43,104,71,0.25); border: 1px solid rgba(43,104,71,0.45); padding: 1px 6px; border-radius: 4px; color: #68D391;">
                              ${a}
                            </span>
                          `).join("")}
                        </div>
                      </div>
                    ` : ''}

                    ${b.estado_somatico ? `
                      <div style="margin-top: 4px; font-size: 0.72rem; color: #94A3B8; font-style: italic; border-top: 1px dashed rgba(197,154,40,0.2); padding-top: 4px;">
                        🧘 Postura: ${b.estado_somatico}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join("")}
            </div>

            <button class="btn-jaguar btn-sm btn-gold-chrome" style="width: 100%; font-size: 0.76rem; font-weight: 800; color: #0E0905; padding: 7px; margin-top: 4px;" onclick="toggleWeeklyLookbook()">
              📅 Ver Lookbook de la Semana Completa (7 Días) ➔
            </button>
          </div>
        `}
      </div>

      <!-- ====================================================================
           COLUMNA DERECHA: EQUIPO & ALIJO (44 ÍTEMS DE CABALLERÍA)
           ==================================================================== -->
      <div class="equipo-items-panel">
        <!-- HEADER EQUIPO -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(197,154,40,0.3); padding-bottom: 10px; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span class="badge-tag badge-emerald">🎒 ARSENAL & ALIJO IMPERIAL</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #FFF; margin: 4px 0 0 0;">Equipo del Caballero (${inventory.length} Ítems • Arsenal Imperial)</h3>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span class="badge-tag badge-emerald" style="font-size: 0.68rem; padding: 2px 7px;">${equippedCount} Equipados</span>
            <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 7px;">${inBagCount} En Alijo</span>
            <span class="badge-tag badge-pink" style="font-size: 0.68rem; padding: 2px 7px;">${lockedCount} Bloqueados</span>
          </div>
        </div>

        <!-- FILTROS RÁPIDOS DE EQUIPO -->
        <div style="display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap;">
          <button class="outfit-day-pill ${currentInventoryFilter === 'todos' ? 'active' : ''}" onclick="setInventoryFilter('todos')">
            Todos (${inventory.length})
          </button>
          <button class="outfit-day-pill ${currentInventoryFilter === 'equipped' ? 'active' : ''}" onclick="setInventoryFilter('equipped')">
            ⚔️ Equipados (${equippedCount})
          </button>
          <button class="outfit-day-pill ${currentInventoryFilter === 'alijo' ? 'active' : ''}" onclick="setInventoryFilter('alijo')">
            🎒 En Alijo (${inBagCount})
          </button>
          <button class="outfit-day-pill ${currentInventoryFilter === 'locked' ? 'active' : ''}" onclick="setInventoryFilter('locked')">
            🔒 Bloqueados (${lockedCount})
          </button>
        </div>

        <!-- GRILLA MODERNA DE ÍTEMS EN ARSENAL Y ALIJO -->
        <div class="alijo-grid-8x5 custom-scrollbar" style="max-height: 600px; overflow-y: auto; padding-right: 4px;">
          ${filteredInventory.map(renderCompactItemCard).join("")}
        </div>

        <div style="margin-top: 12px; padding: 10px 14px; background: rgba(197,154,40,0.1); border-radius: var(--radius-sm); border: 1px solid rgba(197,154,40,0.25); display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
          <span style="color: #CBD5E0;">💡 Haz clic en <strong>⚔️/🛡️</strong> para equipar/desequipar o en <strong>✏️ Códice</strong> para ver y editar la historia del objeto.</span>
          <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-size: 0.7rem; padding: 3px 10px; font-weight: 800;" onclick="openKCDInspector({ type: 'inventory' })">
            📜 Códice KCD
          </button>
        </div>
      </div>

    </div>
  `;
}
window.renderInventoryTab = renderInventoryTab;

// --- MODAL INTERACTIVO DE DETALLE DE OBJETOS CON EDICIÓN DE HISTORIA Y EQUIPAR/DESEQUIPAR ---
function openItemDetailModal(itemId) {
  const item = (reyJaguarState.inventory || []).find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById("item-detail-modal");
  const content = document.getElementById("item-detail-modal-content");
  if (!modal || !content) return;

  const isEquipped = item.unlocked && item.equipped;
  const spriteInfo = getItemSpriteInfo(item);

  let statusBadge = '';
  if (isEquipped) {
    statusBadge = `<span class="badge-tag badge-emerald" style="font-size: 0.85rem; padding: 6px 14px;">⚔️ EQUIPADO EN ARSENAL</span>`;
  } else if (item.unlocked) {
    statusBadge = `<span class="badge-tag badge-gold" style="font-size: 0.85rem; padding: 6px 14px;">🔓 DESBLOQUEADO (EN ALFORJA)</span>`;
  } else {
    statusBadge = `<span class="badge-tag badge-pink" style="font-size: 0.85rem; padding: 6px 14px;">🔒 BLOQUEADO (Misión pendiente)</span>`;
  }

  const equipActionBtn = item.unlocked
    ? `<button class="btn-jaguar ${isEquipped ? 'btn-secondary-dark' : 'btn-gold-chrome'}" style="width: 100%; font-weight: 800; padding: 10px; margin-top: 10px; color: ${isEquipped ? '#FFF' : '#0B0E14'};" onclick="toggleItemEquipped(${item.id})">
         ${isEquipped ? '🛡️ Desequipar Objeto' : '⚔️ Equipar en Arsenal Activo'}
       </button>`
    : '';

  const questLinkBtn = item.questLinkId
    ? `<button class="btn-jaguar btn-primary-pink" style="width: 100%; margin-top: 10px; padding: 10px; font-weight: 800;" onclick="closeItemDetailModal(); selectMainTab('${item.questLinkId}');">
         🗺️ Ir a Misión / Proyecto Asociado ➔
       </button>`
    : '';

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      ${statusBadge}
      <h3 style="font-size: 1.45rem; color: #FFF; font-family: 'Cinzel', serif; font-weight: 800; margin-top: 10px;">${item.name}</h3>
    </div>

    <!-- SPRITE CENTRAL DEL OBJETO -->
    <div style="display: flex; justify-content: center; margin-bottom: 18px;">
      <div style="padding: 14px; background: rgba(0,0,0,0.7); border-radius: var(--radius-md); border: 2px solid ${item.unlocked ? (isEquipped ? '#38A169' : '#E5B842') : 'rgba(148,163,184,0.4)'}; box-shadow: 0 4px 20px rgba(0,0,0,0.6);">
        <div style="width: 80px; height: 80px; border-radius: 8px; background-color: #0A0D13; background-image: url('${spriteInfo.sheet}'); background-size: ${spriteInfo.size}; background-position: ${spriteInfo.posX} ${spriteInfo.posY}; background-repeat: no-repeat; box-shadow: 0 0 12px rgba(0,0,0,0.8);"></div>
      </div>
    </div>

    <!-- ACCIÓN EQUIPAR / DESEQUIPAR -->
    ${equipActionBtn}

    <!-- HISTORIA / LORE EDITABLE IN SITU -->
    <div style="background: rgba(0,0,0,0.45); padding: 14px 16px; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-cyan); margin-top: 14px; margin-bottom: 14px; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <strong style="color: var(--neon-cyan); font-size: 0.82rem; font-family: 'Cinzel', serif;">📜 HISTORIA / LORE DEL ARTÍCULO (EDITABLE):</strong>
        <span style="font-size: 0.7rem; color: var(--text-dim);">Edita in situ</span>
      </div>
      <textarea id="item-lore-input-${item.id}" class="input-jaguar" style="width: 100%; min-height: 80px; font-family: inherit; font-size: 0.88rem; line-height: 1.4; resize: vertical; margin-bottom: 8px;">${item.lore}</textarea>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span id="item-lore-feedback-${item.id}" style="color: #52B788; font-size: 0.75rem; font-weight: 700; display: none;">✓ ¡Historia guardada con éxito!</span>
        <button class="btn-jaguar btn-sm btn-electric-cyan" style="padding: 5px 14px; font-size: 0.78rem;" onclick="saveItemLore(${item.id})">
          💾 Guardar Historia
        </button>
      </div>
    </div>

    <!-- REQUISITO DE OBTENCIÓN EN LA VIDA REAL -->
    <div style="background: rgba(18,14,22,0.95); padding: 16px; border-radius: var(--radius-sm); border: 1.5px solid var(--neon-gold); text-align: left;">
      <strong style="color: var(--neon-gold); font-size: 0.85rem; font-family: 'Cinzel', serif;">🎯 ¿CÓMO SE OBTIENE EN LA VIDA REAL?</strong>
      <p style="color: var(--rose-gold-light); font-size: 0.92rem; margin-top: 6px; line-height: 1.5; font-weight: 600;">
        ${item.howToObtain || "Completar la misión correspondiente en el plan de vida."}
      </p>
    </div>

    ${questLinkBtn}
  `;

  modal.classList.add("active");
}

function closeItemDetailModal() {
  const modal = document.getElementById("item-detail-modal");
  if (modal) modal.classList.remove("active");
}

window.openItemDetailModal = openItemDetailModal;
window.closeItemDetailModal = closeItemDetailModal;

function getCharacterRank(level) {
  if (!reyJaguarState || !reyJaguarState.ranks) {
    return { title: "Rango 1: Caballero Explorador", desc: "Compromiso social y territorial" };
  }
  const idx = Math.min(Math.max(0, (level || 1) - 1), reyJaguarState.ranks.length - 1);
  return reyJaguarState.ranks[idx] || { title: "Caballero Jaguar Imperial", desc: "Perfil Activo" };
}
window.getCharacterRank = getCharacterRank;

// --- GESTIÓN DE MENÚ DE INICIO & PERFILES DE LOGIN ---
function openGameStartMenu() {
  try {
    const modal = document.getElementById("game-start-menu-modal");
    const listContainer = document.getElementById("start-menu-profiles-list");
    if (!modal) return;

    const currentRank = getCharacterRank(reyJaguarState ? reyJaguarState.character.level : 1);

    if (listContainer) {
      listContainer.innerHTML = `
        <div class="login-card-user" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="sprite-item item-1" style="width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--neon-gold); flex-shrink: 0; box-shadow: 0 0 10px rgba(138, 155, 168, 0.4);"></div>
            <div>
              <strong style="color: #FFF; font-size: 1rem; font-family: 'Cinzel', serif;">${reyJaguarState.character.name}</strong>
              <div style="font-size: 0.75rem; color: var(--neon-gold); font-weight: 700;">
                ${currentRank.title} • Niv. ${reyJaguarState.character.level} (${reyJaguarState.character.xp} XP)
              </div>
              <div style="font-size: 0.7rem; color: #52B788; margin-top: 1px;">
                🔥 Racha: ${reyJaguarState.character.streakDays} Días • ⚖️ 80kg • 📏 1.73m
              </div>
            </div>
          </div>
          <div>
            <span class="badge-tag badge-gold" style="font-size: 0.68rem; padding: 2px 8px;">✓ Activo</span>
          </div>
        </div>
      `;
    }

    modal.classList.add("active");
  } catch (err) {
    console.error("Error en openGameStartMenu:", err);
  }
}

function submitGamePasswordLogin() {
  const passInput = document.getElementById("login-password-input");
  const feedback = document.getElementById("login-password-feedback");
  const val = passInput ? passInput.value.trim() : "";

  if (val === "meow") {
    if (feedback) {
      feedback.style.color = "#52B788";
      feedback.innerText = "✓ ¡Contraseña 'meow' correcta! Acceso concedido.";
      feedback.style.display = "block";
    }
    if (typeof showNotification === "function") showNotification("🔑 ¡Acceso Concedido a Daniel Santander!");
    setTimeout(() => {
      closeGameStartMenu();
      selectMainTab("dashboard");
    }, 350);
  } else {
    if (feedback) {
      feedback.style.color = "#E63946";
      feedback.innerText = "✕ Contraseña incorrecta. Ingresa 'meow' para acceder.";
      feedback.style.display = "block";
    }
  }
}
window.submitGamePasswordLogin = submitGamePasswordLogin;
window.submitGamePasswordLogin = submitGamePasswordLogin;

function closeGameStartMenu() {
  const modal = document.getElementById("game-start-menu-modal");
  if (modal) modal.classList.remove("active");
}

function createNewUserProfile() {
  const input = document.getElementById("new-user-name-input");
  if (!input || !input.value.trim()) return;

  const newName = input.value.trim();
  reyJaguarState.character.name = newName;
  input.value = "";
  saveReyJaguarState();
  renderCharacterHUD();
  renderRPGLandingHub();
  closeGameStartMenu();
  if (typeof showNotification === 'function') {
    showNotification(`🔐 ¡Sesión Iniciada para ${newName}!`);
  }
}

window.openGameStartMenu = openGameStartMenu;
window.closeGameStartMenu = closeGameStartMenu;
window.createNewUserProfile = createNewUserProfile;

// --- AVANZAR SUBMISIÓN DE QUANTS / MISIONES ---
function advanceSubQuest(questId, subQuestId) {
  const quest = reyJaguarState.mainQuests.find(q => q.id === questId);
  if (quest) {
    const sub = quest.subQuests.find(s => s.id === subQuestId);
    if (sub && !sub.completed) {
      sub.current = Math.min(sub.target, sub.current + 1);
      if (sub.current >= sub.target) {
        sub.completed = true;
        if (typeof showNotification === 'function') showNotification(`¡Sub-misión completada: ${sub.text}!`);
      }

      // Otorgar XP de territorio por avance en expedición
      if (typeof CaballeroScoringEngine !== 'undefined') {
        CaballeroScoringEngine.awardXP('vida', 30, `Avance en Misión: ${sub.text}`, `subquest-${sub.id}-${sub.current}`);
      }

      const allDone = quest.subQuests.every(s => s.completed);
      if (allDone && !quest.completed) {
        quest.completed = true;
        const reward = reyJaguarState.inventory.find(i => i.id === quest.rewardItemId);
        if (reward) reward.unlocked = true;

        if (typeof CaballeroScoringEngine !== 'undefined') {
          CaballeroScoringEngine.awardXP('vida', 150, `¡Misión Conquistada! ${quest.title}`, `quest-${quest.id}`);
        }

        if (typeof showNotification === 'function') showNotification(`🎉 ¡MISIÓN PRINCIPAL COMPLETADA! Desbloqueaste: ${reward ? reward.name : 'Objeto'}`);
      }

      saveReyJaguarState();
      renderRPGLandingHub();
      renderAdventureMapTab();
      renderInventoryTab();

      // Si el modal de misiones in situ está abierto, refrescarlo de inmediato
      const modal = document.getElementById("kcd-inspector-modal");
      if (modal && modal.classList.contains("active")) {
        const questListContainer = document.querySelector("#kcd-inspector-content > div:last-child");
        if (questListContainer) {
          questListContainer.innerHTML = renderInSituQuestsHTML();
        }
      }
    }
  }
}

// --- SISTEMA DE AVISOS OFICIALES & TECHNIKER KRANKENKASSE (TK) ---
function getTKPaymentInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const curDay = now.getDate();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const curMonthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const curMonthName = monthNames[month];

  if (!reyJaguarState.tkPayments) reyJaguarState.tkPayments = {};
  const isPaidThisMonth = !!reyJaguarState.tkPayments[curMonthKey];

  // Cálculo de estado y días restantes
  let statusBadge = "";
  let statusDetail = "";
  let isAlert = false;

  if (isPaidThisMonth) {
    statusBadge = `<span class="badge-tag badge-emerald" style="font-weight: 800; font-size: 0.75rem; padding: 4px 12px;">✓ CUOTA CUBIERTA (${curMonthName.toUpperCase()} ${year})</span>`;
    statusDetail = `El pago del seguro médico para <strong>${curMonthName} ${year}</strong> ha sido confirmado y respaldado con honores en tus finanzas.`;
  } else if (curDay === 15) {
    statusBadge = `<span class="badge-tag badge-pink" style="font-weight: 900; font-size: 0.75rem; padding: 4px 12px; animation: pulse 1.5s infinite;">🚨 VENCE HOY (15 DE ${curMonthName.toUpperCase()})</span>`;
    statusDetail = `¡Hoy es día 15! Procede con la transferencia bancaria o verifica el débito automático SEPA en Sparkasse.`;
    isAlert = true;
  } else if (curDay < 15) {
    const daysLeft = 15 - curDay;
    statusBadge = `<span class="badge-tag badge-gold" style="font-weight: 800; font-size: 0.75rem; padding: 4px 12px;">⏳ PRÓXIMO PAGO EN ${daysLeft} DÍA${daysLeft > 1 ? 'S' : ''} (15 DE ${curMonthName.toUpperCase()})</span>`;
    statusDetail = `Faltan <strong>${daysLeft} día${daysLeft > 1 ? 's' : ''}</strong> para el vencimiento de la cuota mensual el 15 de ${curMonthName}. Asegura saldo suficiente en tu cuenta bancaria.`;
    if (daysLeft <= 3) isAlert = true;
  } else {
    const daysOverdue = curDay - 15;
    statusBadge = `<span class="badge-tag badge-pink" style="font-weight: 900; font-size: 0.75rem; padding: 4px 12px;">⚠️ PENDIENTE DE CONFIRMACIÓN (${daysOverdue} DÍA${daysOverdue > 1 ? 'S' : ''} POS-15)</span>`;
    statusDetail = `La fecha de débito fue el pasado 15 de ${curMonthName}. Si ya se debitó o transferiste, márcalo como pagado abajo para actualizar tu balance.`;
    isAlert = true;
  }

  // Historial de los últimos 4 meses
  const recentMonths = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(year, month - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const key = `${y}-${String(m + 1).padStart(2, '0')}`;
    recentMonths.push({
      key,
      name: `${monthNames[m]} ${y}`,
      paid: !!reyJaguarState.tkPayments[key]
    });
  }

  return {
    year,
    month,
    curDay,
    curMonthKey,
    curMonthName,
    isPaidThisMonth,
    statusBadge,
    statusDetail,
    isAlert,
    recentMonths
  };
}
window.getTKPaymentInfo = getTKPaymentInfo;

function updateAvisosBadge() {
  const badge = document.getElementById("header-avisos-badge");
  if (!badge) return;
  const tkInfo = getTKPaymentInfo();
  if (!tkInfo.isPaidThisMonth) {
    badge.style.display = "inline-block";
    badge.textContent = "1";
    badge.className = "badge-tag badge-pink";
  } else {
    badge.style.display = "inline-block";
    badge.textContent = "✓";
    badge.className = "badge-tag badge-emerald";
  }
}
window.updateAvisosBadge = updateAvisosBadge;

function toggleTKPayment(monthKey) {
  if (!reyJaguarState.tkPayments) reyJaguarState.tkPayments = {};
  const isNowPaid = !reyJaguarState.tkPayments[monthKey];
  reyJaguarState.tkPayments[monthKey] = isNowPaid;

  if (isNowPaid) {
    if (typeof CaballeroScoringEngine !== 'undefined') {
      CaballeroScoringEngine.awardAction('soberania', 'medio', `Pago Seguro Médico Techniker Krankenkasse (${monthKey})`, null, 'finanzas');
    } else if (typeof awardXP === 'function') {
      awardXP(50, `Pago Seguro Médico Techniker Krankenkasse (${monthKey})`, 'soberania');
    }
    if (typeof playSoundEffect === 'function') playSoundEffect("success");
    if (typeof showNotification === 'function') {
      showNotification(`✓ Cuota de Techniker Krankenkasse (${monthKey}) confirmada (+50 XP Soberanía & Finanzas).`);
    }
  } else {
    if (typeof showNotification === 'function') {
      showNotification(`Cuota de Techniker Krankenkasse (${monthKey}) marcada como pendiente.`);
    }
  }

  saveReyJaguarState();
  updateAvisosBadge();
  openAvisosModal();
}
window.toggleTKPayment = toggleTKPayment;

function openAvisosModal() {
  const modal = document.getElementById("avisos-official-modal");
  const content = document.getElementById("avisos-official-content");
  if (!modal || !content) return;

  const tk = getTKPaymentInfo();

  content.innerHTML = `
    <!-- HEADER HEROICO DE AVISOS OFICIALES -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 2.2rem; filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));">🔔</span>
        <div>
          <span style="font-size: 0.72rem; color: #D4AF37; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">
            CURSUS HONORUM • AVISOS & RECORDATORIOS OFICIALES
          </span>
          <h2 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
            Obligaciones, Salud & Vencimientos
          </h2>
        </div>
      </div>
      <button onclick="closeAvisosModal()" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 6px; transition: color 0.2s;" onmouseover="this.style.color='#FFF'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">✕</button>
    </div>

    <!-- TARJETA DESTACADA: TECHNIKER KRANKENKASSE (TK) -->
    <div style="background: radial-gradient(circle at top left, #1B283E 0%, #0D1525 100%); border: 2px solid ${tk.isPaidThisMonth ? '#10B981' : (tk.isAlert ? '#EF4444' : '#F59E0B')}; border-radius: 12px; padding: 18px; margin-bottom: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 50px; height: 50px; border-radius: 10px; background: rgba(0, 115, 207, 0.2); border: 1.5px solid #0073CF; display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
            🏥
          </div>
          <div>
            <div style="font-size: 0.68rem; color: #60A5FA; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
              SEGURO MÉDICO OBLIGATORIO • ALEMANIA (GKV)
            </div>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
              Techniker Krankenkasse (TK)
            </h3>
          </div>
        </div>
        ${tk.statusBadge}
      </div>

      <!-- DETALLE DEL VENCIMIENTO DEL DÍA 15 -->
      <div style="background: rgba(0, 0, 0, 0.35); border-left: 4px solid #D4AF37; padding: 12px 14px; border-radius: 0 8px 8px 0; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="font-size: 0.9rem;">📅</span>
          <strong style="color: #F5D77F; font-size: 0.88rem;">Regla Innegociable: Cuota fälligkeit los 15 de cada mes</strong>
        </div>
        <p style="font-size: 0.82rem; color: #E2E8F0; margin: 0; line-height: 1.4;">
          ${tk.statusDetail}
        </p>
      </div>

      <!-- ACCIONES & BOTÓN DE CONFIRMACIÓN -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
        <div style="font-size: 0.74rem; color: #94A3B8;">
          🏛️ <strong>Canal:</strong> Débito automático SEPA / Transferencia Sparkasse Hannover.
        </div>
        <button class="btn-jaguar ${tk.isPaidThisMonth ? 'btn-secondary-dark' : 'btn-gold-chrome'}" 
                style="${tk.isPaidThisMonth ? 'color: #34D399; border-color: #10B981;' : 'color: #0E0905; font-weight: 900;'} padding: 9px 20px; font-size: 0.82rem; cursor: pointer;"
                onclick="toggleTKPayment('${tk.curMonthKey}')">
          ${tk.isPaidThisMonth ? `✓ Pago de ${tk.curMonthName} Confirmado (Clic para desmarcar)` : `💳 Confirmar Pago de ${tk.curMonthName} (+50 XP)`}
        </button>
      </div>

      <!-- HISTORIAL DE LOS ÚLTIMOS MESES -->
      <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1);">
        <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
          Historial de Cuotas Recientes:
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${tk.recentMonths.map(m => `
            <div style="background: ${m.paid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)'}; border: 1px solid ${m.paid ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}; border-radius: 6px; padding: 4px 10px; font-size: 0.72rem; display: flex; align-items: center; gap: 6px; cursor: pointer;"
                 onclick="toggleTKPayment('${m.key}')" title="Clic para alternar estado de pago">
              <span style="color: ${m.paid ? '#34D399' : '#F87171'}; font-weight: 800;">${m.paid ? '✓' : '⚠️'}</span>
              <span style="color: #FFF;">${m.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- CALENDARIO DE OBLIGACIONES & PAGOS MENSUALES DE VIDA -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 18px;">
      
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 1.2rem;">🏥</span>
          <div>
            <span style="font-size: 0.65rem; color: #60A5FA; font-weight: 800;">DÍA 15 DE CADA MES</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFF; margin: 0;">Techniker Krankenkasse (TK)</h4>
          </div>
        </div>
        <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
          Cobertura médica legal en Alemania. Verificación de saldo en cuenta y comprobante de seguro para trámites y visados.
        </p>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 1.2rem;">🏠</span>
          <div>
            <span style="font-size: 0.65rem; color: #34D399; font-weight: 800;">DÍA 01 DE CADA MES</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFF; margin: 0;">Alquiler & Domicilio (Warmmiete)</h4>
          </div>
        </div>
        <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
          Pago de vivienda/habitación en Hannover. Blindaje del santuario somático y estabilidad habitacional.
        </p>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 1.2rem;">🪙</span>
          <div>
            <span style="font-size: 0.65rem; color: #F5D77F; font-weight: 800;">DÍA 28 DE CADA MES</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFF; margin: 0;">Auditoría Sparkasse & Caja</h4>
          </div>
        </div>
        <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
          Revisión de extracto bancario, registro de gastos fijos y balance de la tesorería soberana del Caballero Jaguar.
        </p>
      </div>
    </div>

    <!-- RECORDATORIOS ACTIVOS DEL DIARIO -->
    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h4 style="font-family: 'Cinzel', serif; font-size: 0.98rem; color: #FFF; margin: 0;">
          📋 Recordatorios Personales de la Orden
        </h4>
        <span style="font-size: 0.72rem; color: #94A3B8;">${(reyJaguarState.reminders || []).filter(r => !r.completed).length} pendientes</span>
      </div>

      <!-- LISTA DE RECORDATORIOS -->
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; margin-bottom: 12px;" class="custom-scrollbar">
        ${(reyJaguarState.reminders || []).map(r => `
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; border-left: 3px solid ${r.completed ? '#10B981' : '#D4AF37'};">
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" ${r.completed ? 'checked' : ''} onchange="toggleReminderTask('${r.id}'); openAvisosModal();" style="cursor: pointer; width: 16px; height: 16px;">
              <span style="font-size: 0.82rem; color: ${r.completed ? '#94A3B8' : '#FFF'}; text-decoration: ${r.completed ? 'line-through' : 'none'};">
                ${r.text}
              </span>
            </div>
            <span class="badge-tag badge-gold" style="font-size: 0.62rem;">${r.category || 'General'}</span>
          </div>
        `).join('')}
      </div>

      <!-- FORMULARIO RÁPIDO PARA AGREGAR NUEVO RECORDATORIO -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <input type="text" id="new-avisos-rem-text" placeholder="Nuevo aviso o recordatorio..." style="flex: 1; min-width: 180px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); color: #FFF; padding: 7px 12px; border-radius: 6px; font-size: 0.8rem;">
        <button class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0E0905; font-weight: 800; font-size: 0.76rem; padding: 7px 14px;" onclick="addQuickAvisosReminder()">
          ➕ Añadir Aviso
        </button>
      </div>
    </div>

    <!-- BOTÓN DE CIERRE -->
    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
      <button class="btn-jaguar btn-secondary-dark" onclick="closeAvisosModal()" style="padding: 8px 20px;">
        Cerrar Avisos
      </button>
    </div>
  `;

  modal.classList.add("active");
  modal.style.display = "flex";
}
window.openAvisosModal = openAvisosModal;

function closeAvisosModal() {
  const modal = document.getElementById("avisos-official-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}
window.closeAvisosModal = closeAvisosModal;

function addQuickAvisosReminder() {
  const input = document.getElementById("new-avisos-rem-text");
  if (!input || !input.value.trim()) return;

  const newRem = {
    id: "rem-" + Date.now(),
    text: input.value.trim(),
    category: "Avisos",
    completed: false
  };

  if (!reyJaguarState.reminders) reyJaguarState.reminders = [];
  reyJaguarState.reminders.push(newRem);
  saveReyJaguarState();
  if (typeof showNotification === 'function') showNotification("¡Aviso añadido!");
  openAvisosModal();
}
window.addQuickAvisosReminder = addQuickAvisosReminder;

function initReyJaguarEngine() {
  loadReyJaguarState();
  renderCharacterHUD();
  renderRPGLandingHub();
  updateAvisosBadge();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReyJaguarEngine);
} else {
  initReyJaguarEngine();
}
