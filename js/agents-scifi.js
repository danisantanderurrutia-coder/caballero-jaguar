/* ==========================================================================
   REY JAGUAR - MAESTROS Y CONSEJEROS DEL RENACIMIENTO Y ESTOICISMO
   ========================================================================== */

const SCI_FI_AGENTS = {
  dashboard: {
    id: "davinci",
    name: "Leonardo da Vinci",
    title: "Maestro de Artes, Ciencias & Soberanía Real",
    avatar: "🎨",
    tab: "Dashboard & Visión General",
    defaultQuote: "Así como el hierro se oxida por falta de uso, la inacción destruye el intelecto. Tu disciplina hoy erige tu catedral del mañana.",
    responses: [
      "Observando tus proporciones de virtud. La constancia diaria es el pincel con el que pintas tu legado.",
      "Diagnóstico del Codex: Cumple tus 5 minutos de ejercicio del Nivel Caballero para mantener templada la armadura de tu racha.",
      "La maestría requiere armonía entre la mente y las obras reales. Enfócate en tu tarea principal sin dispersión."
    ]
  },
  tasks: {
    id: "machiavelli",
    name: "Niccolò Machiavelli",
    title: "Estratega de Orden, Virtud & Tiempo",
    avatar: "🏛️",
    tab: "Tareas del Día y Semana",
    defaultQuote: "Los grandes hombres no nacen por azar de la fortuna, sino por el ejercicio constante de la virtud y la preparación táctica del tiempo.",
    responses: [
      "Examinando tu mapa de deberes: jerarquiza tus esfuerzos. Lo urgente raras veces construye un reino duradero.",
      "Los trámites y deberes pendientes deben ejecutarse con firmeza inmediata para despejar la memoria de trabajo de la mente.",
      "Sincronizar tus compromisos mantendrá el orden en la corte de tus días."
    ]
  },
  exercise: {
    id: "maestro_armas",
    name: "Maestro de Armas",
    title: "Mentor de Fuerza, Sparring & Voluntad",
    avatar: "⚔️",
    tab: "Rutinas de Ejercicio",
    defaultQuote: "El cuerpo es el templo que sostiene la espada de la voluntad. El rigor de hoy es la victoria innegociable de mañana.",
    responses: [
      "5 minutos del Nivel Caballero son suficientes para vencer la inercia de la pereza y templar la sangre.",
      "Liberar la mente requiere movimientos conscientes de calistenia o movilidad. Elige tu rutina con determinación.",
      "El esfuerzo del entrenamiento dura un instante; la dignidad de la disciplina perdura para siempre."
    ]
  },
  reading: {
    id: "marcus",
    name: "Marco Aurelio",
    title: "Sabio del Autodominio & Filosofía Estoica",
    avatar: "📜",
    tab: "Biblioteca & Conocimiento",
    defaultQuote: "Tienes poder sobre tu mente, no sobre los eventos externos. Date cuenta de esto y encontrarás tu verdadera fortaleza.",
    responses: [
      "Un libro contemplado es un escudo contra la confusión mental. ¿Estoicismo o Sabiduría hoy estudiarás?",
      "No basta con saber qué es la virtud; es preciso practicarla en cada acto cotidiano.",
      "15 páginas al día alimentan el espíritu del Rey Jaguar. Ten paciencia y perseverancia."
    ]
  },
  couple: {
    id: "laud",
    name: "Maestro de Armonía",
    title: "Consejero de Afecto, Nobleza & Presencia",
    avatar: "🎻",
    tab: "Vida de Pareja",
    defaultQuote: "La nobleza del corazón se demuestra en la constante delicadeza de los actos y en la atenta presencia hacia quienes amamos.",
    responses: [
      "El afecto sincero florece con pequeños detalles conscientes cultivados cada día.",
      "Planear un momento de esparcimiento juntos fortalece el vínculo y nutre el alma.",
      "Escuchar con empatía y sin prisa es la muestra más elevada de sabiduría en el amor."
    ]
  },
  projects: {
    id: "arquitecto",
    name: "Muad'Dib del Renacimiento",
    title: "Gran Arquitecto de Reinos & Proyectos",
    avatar: "⚜️",
    tab: "Incubadora de Proyectos",
    defaultQuote: "El miedo es el destructor de la voluntad. Conquistaré mis frentes de trabajo y erigiré cada proyecto sobre fundamentos de piedra.",
    responses: [
      "Tus frentes de conquista: Academia, Política e Ingresos. Todos deben recibir tu atención soberana.",
      "Un proyecto sin entregables claros es solo un boceto en el aire. Define tus hitos y domina cada fase.",
      "Avanza con estrategia: fortalece tus ingresos mientras cimentas tu legado académico y territorial."
    ]
  }
};

/**
 * Genera una respuesta dinámica y personalizada para los Maestros Renacentistas
 */
function getSciFiAgentResponse(agentKey, userMessage) {
  const agent = SCI_FI_AGENTS[agentKey];
  if (!agent) return "Consejero no disponible.";
  
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes("hola") || msgLower.includes("saludos") || msgLower.includes("iniciar")) {
    return `${agent.defaultQuote}`;
  }
  
  if (msgLower.includes("nivel") || msgLower.includes("caballero") || msgLower.includes("ejercicio")) {
    return `[${agent.name}]: El Nivel 1 (Caballero) es la base innegociable. Romper con hábitos nocivos y hacer 5 minutos de ejercicio diario fortalece el autodominio.`;
  }
  
  if (msgLower.includes("pareja") || msgLower.includes("novia") || msgLower.includes("amor")) {
    return `[${agent.name}]: Las relaciones florecen con atención continua y actos de nobleza cotidiana.`;
  }

  if (msgLower.includes("proyecto") || msgLower.includes("dinero") || msgLower.includes("politica") || msgLower.includes("academia")) {
    return `[${agent.name}]: Revisa tu tablero de proyectos. La constancia táctica en tus frentes garantiza la soberanía a largo plazo.`;
  }
  
  // Default random sci-fi response
  const randomIndex = Math.floor(Math.random() * agent.responses.length);
  return `[${agent.name}]: ${agent.responses[randomIndex]}`;
}
