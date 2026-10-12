/* ==========================================================================
   JAGUAR ROSA METÁLICO - GABINETE DE PSICOTERAPIA IA ESPECIALIZADA
   ========================================================================== */

const THERAPIST_PROFILES = {
  addictions: {
    id: "dr-maya",
    name: "Dr. Maya Vance",
    role: "Especialista en Adicciones & Control de Impulsos",
    avatar: "🛡️",
    badge: "TCC & Desintoxicación Dopaminérgica",
    greeting: "Hola. Soy la Dra. Maya Vance. Estoy aquí para acompañarte sin juicios en la conquista del autodominio, el manejo de impulsos (incluyendo consumo de pornografía, pantallas o dopamina barata) y la regulación emocional. ¿Qué impulso o desafío te gustaría procesar hoy?",
    systemPrompt: "Eres la Dra. Maya Vance, psicoterapeuta experta en adicciones conductuales, neurociencia de la dopamina y control de impulsos. Usas Terapia Cognitivo-Conductual (TCC) y Entrevista Motivacional. Respuestas empáticas, profundas, prácticas y directas."
  },
  empathy: {
    id: "dr-julian",
    name: "Dr. Julian Cruz",
    role: "Especialista en Empatía e Inteligencia Emocional",
    avatar: "🧠",
    badge: "CNV & Regulación Aflictiva",
    greeting: "Bienvenido. Soy el Dr. Julian Cruz. Mi enfoque está centrado en ayudarte a comprender tus emociones, desarrollar empatía profunda contigo mismo y los demás, y resolver conflictos interpersonales. ¿Cómo te sientes en este momento?",
    systemPrompt: "Eres el Dr. Julian Cruz, psicoterapeuta humanista centrado en inteligencia emocional, Comunicación No Violenta (CNV) y gestión del estrés social. Respuestas cálidas, validadoras y reflexivas."
  },
  sexaffective: {
    id: "dra-sophia",
    name: "Dra. Sophia Rose",
    role: "Especialista en Desarrollo Sexoafectivo & Vínculos",
    avatar: "💖",
    badge: "Apego Seguro e Intimidad Consciente",
    greeting: "Hola. Soy la Dra. Sophia Rose. Mi espacio está dedicado a la salud sexoafectiva, la construcción de relaciones de pareja sanas, el apego seguro y la intimidad consciente. ¿Qué tema afectivo o relacional quisieras explorar hoy?",
    systemPrompt: "Eres la Dra. Sophia Rose, psicoterapeuta de parejas y especialista en sexualidad consciente y desarrollo sexoafectivo. Respuestas compasivas, maduras, enfocadas en apego seguro y comunicación de pareja."
  }
};

/**
 * Motor de respuestas conversacionales clínicas simuladas / API-Ready
 */
function getTherapeuticResponse(therapistKey, userText) {
  const therapist = THERAPIST_PROFILES[therapistKey];
  if (!therapist) return "Terapeuta no encontrado.";

  const text = userText.toLowerCase();

  // 1. Dr. Maya Vance (Adicciones & Impulsos)
  if (therapistKey === "addictions") {
    if (text.includes("porno") || text.includes("recaida") || text.includes("impulso") || text.includes("tentacion") || text.includes("ansiedad")) {
      return `Entiendo perfectamente lo que estás experimentando. Los impulsos (incluyendo la urgencia de ver pornografía o buscar dopamina rápida) no son una falla de carácter, sino una respuesta de tu sistema nervioso buscando aliviar el estrés o la fatiga.\n\n` +
             `Te sugiero aplicar la técnica **HALT** (pregúntate si estás *Hungry*, *Angry*, *Lonely* o *Tired*) y la regla de los **10 Minutos de Pausa**: No luches agresivamente contra el impulso, obsérvalo como una ola que sube y baja mientras respiras profundamente y realizas tus 5 minutos de ejercicio del Nivel Caballero. ¿Qué emoción previa sentiste justo antes del impulso?`;
    }
    if (text.includes("pantalla") || text.includes("redes") || text.includes("redes sociales") || text.includes("procrastinacion")) {
      return `El tiempo en pantalla excesivo actúa como un anestésico digital. Cuando tu cerebro se acostumbra a estímulos constantes, el trabajo profundo parece aburrido.\n\n` +
             `Te propongo crear una 'zona de desintoxicación' de 2 horas antes de dormir y usar nuestro rastreador de tiempo para medir tu progreso. ¿Qué actividad sin pantallas disfrutas realmente hacer?`;
    }
    return `Gracias por compartir esto. Reconocer nuestros patrones es el primer paso de la desensibilización. Recuerda que en el Nivel 1 (Caballero) estás reprogramando tu circuito de recompensa día a día. ¿Cómo te sientes físicamente en este instante?`;
  }

  // 2. Dr. Julian Cruz (Empatía e Inteligencia Emocional)
  if (therapistKey === "empathy") {
    if (text.includes("enojo") || text.includes("rabia") || text.includes("frustración") || text.includes("discusion") || text.includes("pelea")) {
      return `La rabia o la frustración son emociones protectoras valiosas; nos avisan que un límite personal ha sido sobrepasado o que hay una necesidad no cubierta.\n\n` +
             `En lugar de juzgar tu enojo, identifiquemos la necesidad subyacente usando la Comunicación No Violenta: ¿Fue falta de consideración, falta de claridad o necesidad de descanso? ¿Cómo puedes expresar esa necesidad de forma asertiva?`;
    }
    if (text.includes("triste") || text.includes("soledad") || text.includes("vacio") || text.includes("vacío")) {
      return `Valido profundamente lo que estás sintiendo. La tristeza o la sensación de vacío no son enemigas; son invitaciones a mirar hacia adentro con compasión.\n\n` +
             `Permítete habitar esa emoción unos minutos sin intentar 'arreglarla' de inmediato. ¿Qué necesita ese espacio dentro de ti hoy?`;
    }
    return `Comprender tus emociones te otorga soberanía interna. Cuando desarrollas empatía contigo mismo, la empatía hacia los demás surge de forma natural. ¿Qué pensamiento recurrente ha estado rondando tu mente hoy?`;
  }

  // 3. Dra. Sophia Rose (Desarrollo Sexoafectivo)
  if (therapistKey === "sexaffective") {
    if (text.includes("novia") || text.includes("pareja") || text.includes("relacion") || text.includes("amor") || text.includes("comunicacion")) {
      return `Las relaciones sexoafectivas florecen cuando logramos un equilibrio entre la pertenencia (seguridad y compromiso) y la autonomía (mantener tu identidad y propósito como hombre).\n\n` +
             `En tu sección 'Vida de Pareja', registrar detalles lindos y metas compartidas cultiva un terreno de apego seguro. ¿Ha habido algún tema importante sobre el que hayan querido conversar abiertamente últimamente?`;
    }
    if (text.includes("intimidad") || text.includes("deseo") || text.includes("sexo") || text.includes("desconexión")) {
      return `La intimidad física y emocional están íntimamente conectadas. El deseo florece en un espacio de vulnerabilidad, seguridad y admiración mutua.\n\n` +
             `Revisa si han tenido tiempo de calidad sin distracciones digitales. ¿Cómo podrías sorprender a tu novia esta semana con una experiencia genuina?`;
    }
    return `La sexualidad consciente y el afecto maduro requieren presencia plena. Cuando liberas tu mente de la pornografía y la hiperestimulación, tu capacidad de sentir placer real y conectar de corazón se multiplica. ¿En qué aspecto de tu vida en pareja te gustaría profundizar?`;
  }

  return `Comprendo. Exploremos más sobre este tema. Cuéntame un poco más sobre cómo esto afecta tu día a día.`;
}
