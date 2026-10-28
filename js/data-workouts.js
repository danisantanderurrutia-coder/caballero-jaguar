/* ==========================================================================
   JAGUAR ROSA METÁLICO - BASE DE DATOS DE RUTINAS DE EJERCICIO
   ========================================================================== */

const JAGUAR_WORKOUTS_DB = [
  {
    id: "routine-caballero",
    title: "🛡️ Rutina Caballero (Nivel 1 - 5 Minutos Obligatorio)",
    level: "Nivel 1: Caballero",
    duration: "5 min",
    category: "Diario Obligatorio",
    desc: "El pilar fundamental del Nivel 1. 5 minutos diarios innegociables para activar tu metabolismo y forjar la voluntad.",
    exercises: [
      { name: "Flexiones de Pecho (Push-ups)", time: "1 min", reps: "Al fallo con buena técnica" },
      { name: "Sentadillas profundas (Squats)", time: "1 min", reps: "Ritmo constante" },
      { name: "Plancha Abdominal Isometrica", time: "1 min", reps: "Tensión en core" },
      { name: "Jumping Jacks / Zancadas", time: "1 min", reps: "Elevación cardíaca" },
      { name: "Estiramiento & Respiración Jaguar", time: "1 min", reps: "Recuperación activa" }
    ]
  },
  {
    id: "routine-calistenia",
    title: "🐆 Calistenia de Fuerza Jaguar",
    level: "Nivel 2-3: Guerrero",
    duration: "25 min",
    category: "Fuerza Corporal",
    desc: "Entrenamiento de peso corporal enfocado en hipertrofia y control espacial total.",
    exercises: [
      { name: "Dominadas / Flexiones Diamante", time: "4 series", reps: "8-12 reps" },
      { name: "Fondos en Paralelas / Silla", time: "4 series", reps: "10-15 reps" },
      { name: "Sentadillas Búlgaras (por pierna)", time: "3 series", reps: "12 reps" },
      { name: "Elevaciones de Piernas colgado / suelo", time: "4 series", reps: "15 reps" },
      { name: "Pino asistido / Flexiones en Pica", time: "3 series", reps: "8 reps" }
    ]
  },
  {
    id: "routine-hiit",
    title: "⚡ HIIT Rosa Neón (Metabólico)",
    level: "Nivel 3: Espartano",
    duration: "15 min",
    category: "Quema de Grasa",
    desc: "Intervalos de alta intensidad 40 seg de trabajo x 20 seg de descanso.",
    exercises: [
      { name: "Burpees explosivos", time: "40s / 20s", reps: "Máximo ritmo" },
      { name: "Mountain Climbers (Escaladores)", time: "40s / 20s", reps: "Cadencia rápida" },
      { name: "Saltos de Tijera con Flexión", time: "40s / 20s", reps: "Constancia" },
      { name: "Squat Jumps (Sentadillas con Salto)", time: "40s / 20s", reps: "Potencia" },
      { name: "Sombra de Boxeo con velocidad", time: "40s / 20s", reps: "Fluidez" }
    ]
  },
  {
    id: "routine-yoga",
    title: "🧘 Movilidad & Yoga Jaguar de Sombras",
    level: "Todos los Niveles",
    duration: "12 min",
    category: "Movilidad & Flexibilidad",
    desc: "Desbloqueo de cadera, columna y hombros para postura erguida y presencia imponente.",
    exercises: [
      { name: "Perro mirando abajo a Perro mirando arriba", time: "2 min", reps: "Fluidez" },
      { name: "Postura del Paloma (Apertura de cadera)", time: "2 min (cada lado)", reps: "Sostén profundo" },
      { name: "Rotación Torácica en Cuadrupedia", time: "2 min", reps: "Movilidad espinal" },
      { name: "Estiramiento Isquiotibial & Flexor", time: "2 min", reps: "Relajación" },
      { name: "Savasana con respiración 4-7-8", time: "2 min", reps: "Calma mental" }
    ]
  },
  {
    id: "routine-cardio",
    title: "🏃 Cardio de Resistencia e Impacto",
    level: "Nivel 2+",
    duration: "30 min",
    category: "Resistencia Cardiovascular",
    desc: "Sesión continua para elevar la capacidad pulmonar y la oxigenación cerebral.",
    exercises: [
      { name: "Trote moderado o Zumbido de cuerda", time: "10 min", reps: "Calentamiento" },
      { name: "Sprints de 100m o Saltos de Cuerda dobles", time: "10 min", reps: "8 intervalos" },
      { name: "Caminata de vuelta a la calma", time: "10 min", reps: "Bajar pulsaciones" }
    ]
  },
  {
    id: "routine-escalada-muro",
    title: "🧗‍♂️ Escalada de Muro & Boulder (Indoor)",
    level: "Nivel 2-3: Caballero de las Alturas",
    duration: "45 min",
    category: "Fuerza de Agarre & Bloque",
    desc: "Sesión intensiva para rocódromo y panel de boulder: suspensiones en hangboard, técnica de pies en volumen y resistencia isométrica.",
    exercises: [
      { name: "Movilidad de muñecas, codos y poleas de dedos", time: "5 min", reps: "Calentamiento articular dinámico" },
      { name: "Travesía en muro bajo / Bloques de calentamiento", time: "10 min", reps: "V1 a V2 con pies precisos" },
      { name: "Suspensiones en Hangboard (Regleta 20mm)", time: "5 series", reps: "7s colgado / 3s descanso x 5" },
      { name: "Proyección de Bloques / Desplome (V3-V5)", time: "20 min", reps: "4-5 problemas con técnica de talón y empeine" },
      { name: "Dominadas en presas romas o bolas / Core tensor", time: "3 series", reps: "8-10 reps" }
    ]
  },
  {
    id: "routine-escalada-outdoor",
    title: "🏔️ Escalada en Roca & Outdoor (Deportiva / Vías)",
    level: "Nivel 3: Aventurero Jaguar",
    duration: "60 min",
    category: "Resistencia en Pared Natural",
    desc: "Acondicionamiento para roca natural, fisuras y placas: lectura de relieve, adherencia con pies de gato y resistencia de antebrazos.",
    exercises: [
      { name: "Revisión de arnés, nudo ocho doble y chequeo cruzado", time: "5 min", reps: "Protocolo de seguridad vital" },
      { name: "Vía de calentamiento / Primer largo suave", time: "15 min", reps: "Vía V/6a con ritmo y respiración nasal" },
      { name: "Vías de Grado Proyecto (6b - 7a)", time: "25 min", reps: "2 pegues enfocando descanso en reposos naturales" },
      { name: "Técnica de canteo y adherencia en micro-apoyos", time: "10 min", reps: "Confianza máxima en pies de gato" },
      { name: "Estiramiento de antebrazos y descarga escapular", time: "5 min", reps: "Compensación de flexores" }
    ]
  },
  {
    id: "routine-descanso-activo",
    title: "🛌 Descanso Activo & Regeneración Somática (Post-Gym)",
    level: "Todos los Niveles: Recuperación Biológica",
    duration: "20 min",
    category: "Regeneración Muscular",
    desc: "Protocolo sagrado de recuperación neuromuscular post-entrenamiento pesado. Descompresión fascial, recarga celular y supercompensación para permitir que las fibras musculares crezcan.",
    exercises: [
      { name: "Respiración Diafragmática Consciente & Calma", time: "5 min", reps: "Inhalar 4s, retener 4s, exhalar 6s" },
      { name: "Paseo Regenerativo o Movilidad Muy Suave", time: "10 min", reps: "Flujo sanguíneo sin carga ni fatiga" },
      { name: "Hidratación con Minerales / Magnesio", time: "2 min", reps: "Restauración del balance electrolítico" },
      { name: "Descompresión Lumbar & Piernas Elevadas", time: "3 min", reps: "Alivio de retorno venoso y relajación simpática" }
    ]
  }
];
