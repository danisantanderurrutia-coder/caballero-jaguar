/* ==========================================================================
   JAGUAR ROSA METÁLICO - BIBLIOTECA RECOMENDADA DE DESARROLLO PERSONAL
   5 Categorías, 10+ Libros Curados por Área
   ========================================================================== */

const JAGUAR_BOOKS_DB = [
  // --- 1. FILOSOFÍA Y ESTOICISMO ---
  {
    id: "fil-1",
    title: "Meditaciones",
    author: "Marco Aurelio",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Los pensamientos personales del emperador romano sobre la disciplina interior, la virtud y la resiliencia.",
    pages: 250,
    coverIcon: "🏛️"
  },
  {
    id: "fil-2",
    title: "Cartas a Lucilio",
    author: "Séneca",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Epístolas morales sobre el tiempo, la brevedad de la vida, la amistad y el autodominio.",
    pages: 400,
    coverIcon: "📜"
  },
  {
    id: "fil-3",
    title: "Manual para la Vida (Enquiridión)",
    author: "Epícteto",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Guía práctica de la dicotomía del control: enfocarse únicamente en lo que depende de uno mismo.",
    pages: 120,
    coverIcon: "⚓"
  },
  {
    id: "fil-4",
    title: "El Obstáculo es el Camino",
    author: "Ryan Holiday",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Cómo transformar los problemas, contratiempos y dificultades en combustible para el éxito.",
    pages: 220,
    coverIcon: "⛰️"
  },
  {
    id: "fil-5",
    title: "Así Habló Zaratustra",
    author: "Friedrich Nietzsche",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Exploración de la autosuperación, la creación de valores propios y la voluntad de poder.",
    pages: 380,
    coverIcon: "🦅"
  },
  {
    id: "fil-6",
    title: "El Ego es el Enemigo",
    author: "Ryan Holiday",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Lecciones históricas sobre cómo la humildad y la templanza superan la ambición desmedida.",
    pages: 240,
    coverIcon: "🗡️"
  },
  {
    id: "fil-7",
    title: "Sobre la Brevedad de la Vida",
    author: "Séneca",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Un análisis certero sobre cómo la mayoría de la gente malgasta su tiempo en banalidades.",
    pages: 90,
    coverIcon: "⏳"
  },
  {
    id: "fil-8",
    title: "Ética a Nicómaco",
    author: "Aristóteles",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "La búsqueda de la Eudaimonía (florecimiento humano) a través de la virtud y la excelencia.",
    pages: 320,
    coverIcon: "⚖️"
  },
  {
    id: "fil-9",
    title: "Invicto",
    author: "Marcos Vázquez",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Logra un cerebro indestructible aplicando el estoicismo y la psicología moderna.",
    pages: 280,
    coverIcon: "🛡️"
  },
  {
    id: "fil-10",
    title: "La Filosofía como Forma de Vida",
    author: "Pierre Hadot",
    category: "filosofia",
    categoryLabel: "Filosofía & Estoicismo",
    desc: "Ejercicios espirituales y filosofía antigua aplicada a la transformación cotidiana del ser.",
    pages: 310,
    coverIcon: "🔮"
  },

  // --- 2. PSICOLOGÍA Y HÁBITOS ---
  {
    id: "psi-1",
    title: "Hábitos Atómicos",
    author: "James Clear",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "Cambios pequeños, resultados extraordinarios. El marco definitivo de la regla del 1%.",
    pages: 320,
    coverIcon: "⚛️"
  },
  {
    id: "psi-2",
    title: "El Poder del Hábito",
    author: "Charles Duhigg",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "La neurociencia del bucle del hábito: señal, rutina y recompensa.",
    pages: 380,
    coverIcon: "🔄"
  },
  {
    id: "psi-3",
    title: "El Hombre en Busca de Sentido",
    author: "Viktor Frankl",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "La logoterapia y el descubrimiento de propósito en medio del sufrimiento extremo.",
    pages: 180,
    coverIcon: "🕯️"
  },
  {
    id: "psi-4",
    title: "Pensar Rápido, Pensar Despacio",
    author: "Daniel Kahneman",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "Los dos sistemas de pensamiento que dirigen la mente: intuición vs deliberación.",
    pages: 600,
    coverIcon: "🧠"
  },
  {
    id: "psi-5",
    title: "La Mente Modificada (Mindset)",
    author: "Carol Dweck",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "La diferencia crucial entre la mentalidad fija y la mentalidad de crecimiento.",
    pages: 300,
    coverIcon: "🌱"
  },
  {
    id: "psi-6",
    title: "Autobiografía y Arquetipos",
    author: "Carl Gustav Jung",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "El trabajo de la sombra, la individuación y la integración del inconsciente.",
    pages: 450,
    coverIcon: "🌑"
  },
  {
    id: "psi-7",
    title: "Indestructible (Nir Eyal)",
    author: "Nir Eyal",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "Cómo controlar tu atención y elegir tu vida frente a las distracciones digitales.",
    pages: 260,
    coverIcon: "🎯"
  },
  {
    id: "psi-8",
    title: "El Cuerpo Lleva la Cuenta",
    author: "Bessel van der Kolk",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "Cerebro, mente y cuerpo en la curación del trauma y las conductas compulsivas.",
    pages: 460,
    coverIcon: "🧬"
  },
  {
    id: "psi-9",
    title: "Fluir (Flow)",
    author: "Mihaly Csikszentmihalyi",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "La psicología de las experiencias óptimas y el estado de máxima concentración.",
    pages: 350,
    coverIcon: "🌊"
  },
  {
    id: "psi-10",
    title: "La Paradoja del Chimpancé",
    author: "Steve Peters",
    category: "psicologia",
    categoryLabel: "Psicología & Hábitos",
    desc: "Gestión de la mente emocional, control de impulsos y autodominio personal.",
    pages: 360,
    coverIcon: "🐵"
  },

  // --- 3. ENFOQUE Y PRODUCTIVIDAD ---
  {
    id: "enf-1",
    title: "Deep Work (Trabajo Enfocado)",
    author: "Cal Newport",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Reglas para el éxito alcanzado en un mundo distraído mediante la concentración profunda.",
    pages: 300,
    coverIcon: "🧘‍♂️"
  },
  {
    id: "enf-2",
    title: "Esencialismo",
    author: "Greg McKeown",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "El disciplinado camino hacia el menos pero mejor. Priorización radical.",
    pages: 270,
    coverIcon: "✨"
  },
  {
    id: "enf-3",
    title: "Tienda Tu Cama (Make Your Bed)",
    author: "William H. McRaven",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Pequeñas cosas que pueden cambiar tu vida y quizás el mundo.",
    pages: 140,
    coverIcon: "🛏️"
  },
  {
    id: "enf-4",
    title: "Crea tu Segundo Cerebro",
    author: "Tiago Forte",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Metodología PARA para organizar tu vida digital y potenciar la memoria de trabajo.",
    pages: 280,
    coverIcon: "💻"
  },
  {
    id: "enf-5",
    title: "La Única Cosa (The One Thing)",
    author: "Gary Keller",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "El método extraordinariamente simple tras los resultados extraordinarios.",
    pages: 240,
    coverIcon: "☝️"
  },
  {
    id: "enf-6",
    title: "Organízate con Eficacia (GTD)",
    author: "David Allen",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "El arte de la productividad sin estrés y captura de tareas pendientes.",
    pages: 350,
    coverIcon: "📥"
  },
  {
    id: "enf-7",
    title: "Digital Minimalismo",
    author: "Cal Newport",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "En defensa de una vida enfocada en un mundo ruidoso y saturado de pantallas.",
    pages: 290,
    coverIcon: "📱"
  },
  {
    id: "enf-8",
    title: "La Semana Laboral de 4 Horas",
    author: "Timothy Ferriss",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Diseño de estilo de vida, automatización y eliminación de lo ineficiente.",
    pages: 400,
    coverIcon: "⌛"
  },
  {
    id: "enf-9",
    title: "Hyperfocus",
    author: "Chris Bailey",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Cómo gestionar tu atención en un mundo lleno de distracciones continuas.",
    pages: 250,
    coverIcon: "🔍"
  },
  {
    id: "enf-10",
    title: "El Club de las 5 AM",
    author: "Robin Sharma",
    category: "enfoque",
    categoryLabel: "Enfoque & Productividad",
    desc: "Mañanas victoriosas, rutina de la victoria y hábito del madrugón.",
    pages: 330,
    coverIcon: "🌅"
  },

  // --- 4. RELACIONES Y EMPATÍA ---
  {
    id: "rel-1",
    title: "Cómo Ganar Amigos e Influir sobre las Personas",
    author: "Dale Carnegie",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "El clásico imperecedero sobre comunicación genuina, simpatía y liderazgo interpersonal.",
    pages: 300,
    coverIcon: "🤝"
  },
  {
    id: "rel-2",
    title: "Los 7 Principios para que el Matrimonio Funcione",
    author: "John Gottman",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Investigación científica para fortalecer la intimidad, la complicidad y la convivencia.",
    pages: 340,
    coverIcon: "💑"
  },
  {
    id: "rel-3",
    title: "El Arte de Amar",
    author: "Erich Fromm",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "El amor no es solo una emoción, sino un arte maduro que requiere práctica y cuidado.",
    pages: 160,
    coverIcon: "❤️"
  },
  {
    id: "rel-4",
    title: "Comunicación No Violenta",
    author: "Marshall B. Rosenberg",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Un lenguaje de vida: conectar con empatía, expresar necesidades y resolver conflictos.",
    pages: 260,
    coverIcon: "🕊️"
  },
  {
    id: "rel-5",
    title: "Los 5 Lenguajes del Amor",
    author: "Gary Chapman",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Descubre cómo dar y recibir amor según la forma única de tu pareja.",
    pages: 200,
    coverIcon: "💌"
  },
  {
    id: "rel-6",
    title: "Maneras de Amar (Attached)",
    author: "Amir Levine & Rachel Heller",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "La nueva ciencia del apego adulto (ansioso, seguro, evitativo) para encontrar el amor.",
    pages: 300,
    coverIcon: "🔗"
  },
  {
    id: "rel-7",
    title: "Modelos (Models)",
    author: "Mark Manson",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Atracción a través de la honestidad, vulnerabilidad y superación de la necesidad.",
    pages: 280,
    coverIcon: "🌟"
  },
  {
    id: "rel-8",
    title: "Inteligencia Social",
    author: "Daniel Goleman",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "La nueva ciencia de las relaciones humanas y los neuronas espejo.",
    pages: 420,
    coverIcon: "🌐"
  },
  {
    id: "rel-9",
    title: "No Más Chico Lindo (No More Mr. Nice Guy)",
    author: "Robert A. Glover",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Cómo los hombres pueden recuperar su autenticidad y poner límites saludables.",
    pages: 220,
    coverIcon: "🦁"
  },
  {
    id: "rel-10",
    title: "Maten al Rey (Mating in Captivity)",
    author: "Esther Perel",
    category: "relaciones",
    categoryLabel: "Relaciones & Empatía",
    desc: "Reconciliar el deseo erótico y la seguridad afectiva en parejas de largo plazo.",
    pages: 270,
    coverIcon: "🔥"
  },

  // --- 5. FINANZAS Y ESTRATEGIA ---
  {
    id: "fin-1",
    title: "La Psicología del Dinero",
    author: "Morgan Housel",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Lecciones atemporales sobre la riqueza, la codicia, el tiempo y la felicidad.",
    pages: 250,
    coverIcon: "💰"
  },
  {
    id: "fin-2",
    title: "El Arte de la Guerra",
    author: "Sun Tzu",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "El clásico milenario de la estrategia, la victoria sin conflicto y la preparación.",
    pages: 150,
    coverIcon: "⚔️"
  },
  {
    id: "fin-3",
    title: "Padre Rico, Padre Pobre",
    author: "Robert Kiyosaki",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Diferencia fundamental entre activos y pasivos, educación financiera e inversión.",
    pages: 280,
    coverIcon: "📈"
  },
  {
    id: "fin-4",
    title: "Las 48 Leyes del Poder",
    author: "Robert Greene",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Compendio de lecciones históricas sobre diplomacia, poder y maniobras estratégicas.",
    pages: 520,
    coverIcon: "👑"
  },
  {
    id: "fin-5",
    title: "El Inversor Inteligente",
    author: "Benjamin Graham",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "La biblia del value investing y la gestión prudente del capital.",
    pages: 600,
    coverIcon: "📊"
  },
  {
    id: "fin-6",
    title: "Principios para el Éxito",
    author: "Ray Dalio",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Reglas de vida y trabajo desarrolladas a lo largo de décadas en Bridgewater.",
    pages: 550,
    coverIcon: "⚖️"
  },
  {
    id: "fin-7",
    title: "De Cero a Uno",
    author: "Peter Thiel",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Notas sobre startups y cómo construir el futuro mediante monopolios creativos.",
    pages: 220,
    coverIcon: "🚀"
  },
  {
    id: "fin-8",
    title: "Piense y Hágase Rico",
    author: "Napoleon Hill",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "La autosugestión, la persistencia y la fuerza de un propósito definido.",
    pages: 320,
    coverIcon: "💎"
  },
  {
    id: "fin-9",
    title: "La Vía del Hombre Superior",
    author: "David Deida",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Propósito, dirección, libertad financiera y el regalo del núcleo masculino.",
    pages: 230,
    coverIcon: "🧭"
  },
  {
    id: "fin-10",
    title: "El Hombre más Rico de Babilonia",
    author: "George S. Clason",
    category: "finanzas",
    categoryLabel: "Finanzas & Estrategia",
    desc: "Parábolas antiguas sobre el ahorro del 10%, la inversión y el control de gastos.",
    pages: 180,
    coverIcon: "🏺"
  }
];
