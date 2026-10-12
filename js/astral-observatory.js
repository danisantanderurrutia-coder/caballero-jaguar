/**
 * ============================================================================
 * OBSERVATORIO CELESTE & CARTA NATAL EXPANDIDA - CABALLERO JAGUAR
 * Módulo de Astrología Psicológica, Tránsitos, Retorno de Saturno & Sincretismo
 * Datos Natales: 23 de Marzo de 1996 • 09:30 AM • Parral, VII Región del Maule
 * ============================================================================
 */

const ASTRAL_OBSERVATORY_DATA = {
  meta: {
    birthDate: "23 de Marzo de 1996",
    birthTime: "09:30 AM (Horario Continental)",
    birthPlace: "Parral, VII Región del Maule, Chile (36°09' S, 71°49' W)",
    ascendente: "Géminis 15° (Mercurio Regente) • Casa X en Aries (Sol / Marte)",
    elementoDominante: "Fuego Primordial (Aries) anclado en Tierra Fértil (Tauro)",
    portalActual: "Primer Retorno de Saturno (1996 ➔ 2026 • 30 Años de Madurez Soberana)"
  },

  planets: {
    sol: {
      id: "sol",
      name: "Sol en Aries (03° 08')",
      symbol: "☉",
      house: "Casa X (Medio Cielo / Cenit Social & Vocación)",
      sign: "Aries ♈ • Fuego Cardinal",
      dignity: "Exaltado por Fuego Primordial • Conjunción Regente Marte",
      archetype: "El Héroe Fundador & Soberano del Territorio",
      badgeColor: "#E2DACB",
      coords: { cx: 170, cy: 180 },
      psychology: `Tu Sol natal se encuentra en el grado 3 de Aries, exactamente en el punto más visible del cielo: la Casa X (el Medio Cielo). Psicológicamente, tu sentido de identidad no se conforma con seguir órdenes, adaptarse a estructuras prefabricadas o vegetar en la comodidad pasiva. Estás cableado biológicamente para fundar, abrir caminos donde solo hay maleza y asumir el peso del mando. La Casa X representa la proyección pública, el legado y la maestría vocacional: tener al Sol aquí significa que tu paz interna depende directamente de saber que estás construyendo una obra que trascenderá tu existencia individual.`,
      projectsManifestation: `Se manifiesta de forma viva en tu vocación de liderazgo multiterritorial: la defensa de tu Tesis de Máster en Hannover, la dirección de proyectos autónomos como Chile Agrotech, la producción estratégica en Los Manejadores y el impulso para fundar la Red Comunitaria Maule Red y el Museo de la Memoria. No esperas que alguien te invite a liderar; tú levantas la bandera y creas el campamento.`,
      lightVsShadow: `• LUZ: Valentía inquebrantable, optimismo contagioso, capacidad de levantarte intacto tras caídas que quebrarían a otros, iniciativa implacable.
• SOMBRA: Impaciencia crónica con la burocracia ajena, frustración visceral cuando tu entorno no avanza a tu velocidad, tentación de iniciar diez frentes simultáneos sin haber consolidado el suministro de la retaguardia.`,
      stoicGuidance: `Marco Aurelio nos recuerda: «La ambición significa atar tu felicidad a lo que otros dicen o hacen; la sensatez significa atarla a tus propias acciones». Tu fuego no necesita gritar para imponerse; necesita la constancia silenciosa del herrero que no abandona el yunque hasta que la espada está templada.`
    },

    luna: {
      id: "luna",
      name: "Luna en Tauro (24° 15')",
      symbol: "☽",
      house: "Casa XI / XII (Tierras Compartidas, Visión de Futuro & Raíz Somática)",
      sign: "Tauro ♉ • Tierra Fija",
      dignity: "Exaltada (Dignidad Suprema de la Luna)",
      archetype: "La Roca Inamovible & El Arca de Fertilidad",
      badgeColor: "#8A9BA8",
      coords: { cx: 160, cy: 115 },
      psychology: `En la astrología clásica y psicológica, la Luna en Tauro se encuentra en su «Exaltación»: el lugar donde el mundo emocional alcanza su máxima estabilidad, paz y nutrición somática. Mientras tu Sol y Marte en Aries son fuego y relámpago, tu Luna en Tauro es la tierra fértil, fresca y profunda que apaga los incendios del estrés. No te desestabilizan las crisis externas con facilidad; posees una serenidad física innata. Tu refugio emocional está en los sentidos: la comida nutritiva, el olor del bosque y la tierra húmeda, el silencio del campo, los masajes y la seguridad palpable de una despensa y cuenta bancaria en orden.`,
      projectsManifestation: `Explica tu amor visceral por la permacultura, los sistemas agroecológicos, el arraigo con la VII Región del Maule y la visión de sustentabilidad a largo plazo en Chile Agrotech y ReWild. También sustenta tu capacidad para mantener la mente fría durante auditorías financieras o situaciones de alta presión en el extranjero.`,
      lightVsShadow: `• LUZ: Serenidad estoica ante las tormentas, lealtad incorruptible, paciencia inagotable para proyectos de años, profunda sabiduría somática.
• SOMBRA: Resistencia obstinada al cambio necesario, peligro de caer en inercias placenteras de confort si no hay un desafío enfrente, apego a seguridades materiales por miedo a la escasez.`,
      stoicGuidance: `Séneca sentenció: «Pobre no es el que tiene poco, sino el que codicia más». Tu Luna exaltada ya posee la riqueza del contento interior; utiliza esa paz como bastión para permitir que tu guerrero de fuego conquiste sin ansiedad.`
    },

    marte: {
      id: "marte",
      name: "Marte en Aries (08° 42')",
      symbol: "♂",
      house: "Casa X (Regente Natal en Cúspide Suprema)",
      sign: "Aries ♈ • Fuego Cardinal",
      dignity: "Domicilio Puro • Regente Supremo de la Carta",
      archetype: "El Guerrero de Hierro & Comandante de Vanguardia",
      badgeColor: "#C0392B",
      coords: { cx: 130, cy: 195 },
      psychology: `Marte es el planeta regente de Aries y, por tanto, el motor dinámico absoluto de toda tu carta astral. Al encontrarse domiciliado en Aries y encaramado en la Casa X, tienes el perfil del auténtico Caballero de primera línea. Tu energía vital se alimenta del esfuerzo físico, de la confrontación constructiva con la dificultad y de la disciplina marcial. Tu mente no descansa con pasividad; descansa tras el cansancio honesto de una sesión de Muay Thai, de calistenia pesada o de horas de redacción profunda.`,
      projectsManifestation: `Es la fuerza que te permite saltar de la cama al alba, sostener los 21 días de templanza sin claudicar y atacar metas complejas como mudanzas internacionales, expediciones territoriales y producción incesante. No temes al dolor muscular ni a la tensión intelectual: los experimentas como señales de crecimiento.`,
      lightVsShadow: `• LUZ: Capacidad de ejecución inmediata, ausencia de cobardía, resistencia al dolor, liderazgo motriz que arrastra a los demás con el ejemplo físico.
• SOMBRA: Riesgo de agotamiento adrenal si no respetas los días de pausa sagrada; propensión a cortar relaciones de tajo por una decepción puntual; agresión reprimida si te sientes enjaulado o sin retos físicos diarios.`,
      stoicGuidance: `Epicteto enseñaba: «Ningún hombre es libre si no es dueño de sí mismo». La misión de tu Marte en Aries es someter sus propios impulsos animales antes de dirigir a nadie. La verdadera fuerza es el autodominio.`
    },

    mercurio: {
      id: "mercurio",
      name: "Mercurio en Piscis (12° 20')",
      symbol: "☿",
      house: "Casa IX (Filosofía, Ultramar & Lenguajes Transdisciplinarios)",
      sign: "Piscis ♓ • Agua Mutable",
      dignity: "Peregrino Intuitivo • Visión Holística",
      archetype: "El Navegante Transmedia & Poeta Estratégico",
      badgeColor: "#4A79A7",
      coords: { cx: 210, cy: 110 },
      psychology: `Mercurio en Piscis en Casa IX te otorga una inteligencia no lineal, altamente intuitiva, espacial y simbólica. Tu cerebro no funciona como un archivo burocrático de datos aislados; conecta la física con la poesía, la agricultura de precisión con los mitos ancestrales, y la ciencia de datos con el cómic de piratas. En la Casa IX (viajes internacionales, estudios superiores y filosofía), este Mercurio te impulsa a devorar cosmovisiones foráneas, aprender idiomas (Alemán, Euskera, Italiano, Portugués) y concebir narrativas épicas.`,
      projectsManifestation: `Es el cerebro detrás de la divulgación científica en Ciencia & Territorios, el paper climático de Lauwersmeer, el diseño conceptual de Los Manejadores y la sensibilidad histórica del Museo de la Memoria Maule. Puedes traducir conceptos científicos densos en metáforas humanas conmovedoras.`,
      lightVsShadow: `• LUZ: Creatividad ilimitada, empatía intelectual, comprensión inmediata de lenguajes complejos y culturas distintas, visión holística de sistemas.
• SOMBRA: Sobrecarga sensorial rápida en entornos caóticos, tendencia a la procrastinación dispersa si las tareas son puramente administrativas o carecen de alma y significado épico.`,
      stoicGuidance: `Aplica la disciplina del Códice: escribe tus metas en listas numeradas cortas. El agua de Mercurio en Piscis necesita los muros de piedra de tu disciplina estoica para no dispersarse en vapor.`
    },

    venus: {
      id: "venus",
      name: "Venus en Tauro (16° 50')",
      symbol: "♀",
      house: "Casa XI (Pactos Fraternales, Comunidad & Estética Clásica)",
      sign: "Tauro ♉ • Tierra Fija",
      dignity: "Domicilio Puro • Afrodita Terrenal",
      archetype: "El Maestro del Arte Clásico & La Lealtad Fraternal",
      badgeColor: "#6B8E23",
      coords: { cx: 185, cy: 95 },
      psychology: `Venus en su propio domicilio de Tauro es la encarnación de la belleza tangible, clásica, duradera y serena. No te seducen las modas digitales efímeras ni la estética plástica posmoderna: amas el óleo, la técnica de claroscuro de Anders Zorn, la madera maciza, los instrumentos de viento de latón brillante (trompeta de jazz), el aroma del buen café y la lealtad que se demuestra con hechos y no con discursos huecos. En Casa XI, atraes alianzas duraderas basadas en el respeto mutuo y el afecto desinteresado.`,
      projectsManifestation: `Se refleja en tu dedicación al Atelier de Bellas Artes, tu pasión por la música y el jazz, tu cuidado por el confort estético de tu hogar en Hannover o Bilbao, y tu respeto inmenso hacia tu pareja y tus aliados de campaña.`,
      lightVsShadow: `• LUZ: Gusto artístico exquisito y atemporal, magnetismo noble y pacífico, habilidad para crear armonía y belleza en cualquier espacio físico.
• SOMBRA: Riesgo de complacencia sensorial si se relajan los hábitos; tendencia a guardar rencor en silencio si se abusa de tu generosidad o se traiciona un pacto.`,
      stoicGuidance: `Disfruta la belleza del mundo como un regalo de la providencia, pero recuerda las palabras de Cleantes: «Sigue a la naturaleza; en su sobriedad reside la más perfecta armonía».`
    },

    saturno: {
      id: "saturno",
      name: "Saturno en Aries (28° 50')",
      symbol: "♄",
      house: "Casa X / XI (La Forja de la Autoridad Soberana)",
      sign: "Aries ♈ • Fuego Cardinal",
      dignity: "Caída Alquímica • Transmutada en Acero de Templanza",
      archetype: "El Alquimista del Autodominio & El Arquitecto del Tiempo",
      badgeColor: "#D4AF37",
      coords: { cx: 205, cy: 170 },
      psychology: `Saturno en Aries en los últimos grados de la Casa X es la posición astrológica más trascendental de tu biografía presente. En la astrología tradicional se dice que Saturno está en «caída» en Aries, porque Aries quiere todo ¡ya!, mientras Saturno exige años de paciencia implacable. Sin embargo, en astrología psicológica evolutiva, Saturno en caída representa la maestría más pura: una disciplina que no viene impuesta por la sociedad ni por la familia, sino que es conquistada centímetro a centímetro por tu propia voluntad estoica. Te obliga a forjar una autoridad que no dependa de títulos vacíos, sino de competencia indiscutible.`,
      projectsManifestation: `Es el reloj que marca tu **Primer Retorno de Saturno (1996 - 2026)** a tus 30 años: la necesidad ineludible de cerrar tu ciclo de máster, consolidar tu estatus profesional en Europa, construir bases territoriales definitivas y adoptar la templanza de 21 días no como un desafío temporal, sino como tu ley biológica perpetua.`,
      lightVsShadow: `• LUZ: Resistencia indestructible, ética de trabajo incorruptible, sabiduría prematura, capacidad para sostener responsabilidades que quebrarían a hombres mayores.
• SOMBRA: Sentimientos periódicos de soledad existencial, síndrome del impostor, autoexigencia tiránica que no se permite celebrar las victorias conquistadas.`,
      stoicGuidance: `Abraza el *Amor Fati*. Todo obstáculo que Saturno te puso en el camino en tu juventud fue el fuego que te convirtió en acero. Ahora, a tus 30 años, Saturno viene a coronarte como soberano de tu destino.`
    },

    jupiter: {
      id: "jupiter",
      name: "Júpiter en Capricornio (14° 30')",
      symbol: "♃",
      house: "Casa VIII (Finanzas Profundas, Patrimonio & Resiliencia Estructural)",
      sign: "Capricornio ♑ • Tierra Cardinal",
      dignity: "Caída Pragmática • La Ley del Crecimiento Sostenido",
      archetype: "El Tesorero Imperial & Estratega Patrimonial",
      badgeColor: "#2E5B88",
      coords: { cx: 230, cy: 350 },
      psychology: `Júpiter en Capricornio no cree en la suerte ciega, el azar ni las promesas fáciles de enriquecimiento exprés. Su abundancia proviene del método, la estructura, el ahorro austero y la visión a diez años plazo. En la Casa VIII (la casa de la gestión patrimonial, los créditos bancarios, las herencias y la regeneración de crisis), este emplazamiento te otorga una prudencia financiera instintiva y una capacidad formidable para resurgir de cualquier revés material con más capital y madurez que antes.`,
      projectsManifestation: `Gobernante de tu balance financiero Sparkasse / Banco de Chile: te impulsa a auditar cada euro, recortar fugas superfluas y planificar la independencia económica y adquisición territorial con frialdad matemática.`,
      lightVsShadow: `• LUZ: Resiliencia económica total, visión patrimonial intergeneracional, habilidad para transformar el caos ajeno en orden rentable y sostenible.
• SOMBRA: Exceso de escepticismo o pesimismo financiero; tacañería defensiva que te impida disfrutar de los frutos de tu trabajo.`,
      stoicGuidance: `«Ningún viento es favorable para el barco que no sabe adónde va». Mantén tus hojas de balance al día y recuerda que el dinero es un siervo de tu libertad, no tu amo.`
    },

    urano: {
      id: "urano",
      name: "Urano en Acuario (03° 10')",
      symbol: "♅",
      house: "Casa IX (Tecnología de Vanguardia & Paradigmas Nuevos)",
      sign: "Acuario ♒ • Aire Fijo",
      dignity: "Domicilio Puro • Rayo Prometeico",
      archetype: "El Visionario del Futuro & Prometeo Tecnológico",
      badgeColor: "#00E5FF",
      coords: { cx: 120, cy: 380 },
      psychology: `Urano en su propio domicilio de Acuario en Casa IX es el aspecto del pensador que vive diez años adelantado a su tiempo. No toleras los dogmas universitarios anquilosados ni las metodologías agrícolas del siglo XIX. Ves cómo la computación, los gemelos digitales, los modelos de inteligencia artificial y la ecología de sistemas pueden converger para transformar el mundo real. Te otorga un espíritu rebelde, libre e incorruptible.`,
      projectsManifestation: `El motor intelectual de Chile Agrotech (sensores IoT, AgriTwin, imágenes multiespectrales) y de Los Manejadores (influencers virtuales, automatización y narrativa digital). Es tu capacidad de ver aplicaciones prácticas donde otros solo ven novedades de laboratorio.`,
      lightVsShadow: `• LUZ: Genio innovador, anticipación estratégica, libertad mental absoluta, audacia para romper esquemas convencionales.
• SOMBRA: Sentimiento de aislamiento intelectual al notar que las instituciones caminan demasiado lento; tendencia a impacientarte con quienes se resisten a la tecnología.`,
      stoicGuidance: `No basta con tener la razón técnica; hay que tener la paciencia pedagógica para acompañar al campesino y a la comunidad en la adopción del cambio.`
    },

    neptuno: {
      id: "neptuno",
      name: "Neptuno en Capricornio (27° 15')",
      symbol: "♆",
      house: "Casa VIII (Mística Encarnada en la Piedra)",
      sign: "Capricornio ♑ • Tierra Cardinal",
      dignity: "Peregrino en la Roca • Espiritualidad Concreta",
      archetype: "El Guardián de la Memoria Sagrada & El Monje de Piedra",
      badgeColor: "#48D1CC",
      coords: { cx: 210, cy: 430 },
      psychology: `Neptuno representa los anhelos del alma, la compasión y la mística. Al encontrarse en Capricornio, tu espiritualidad rehúye el misticismo vacío o la evasión alucinatoria. Tú encuentras lo divino en el orden del universo, en la montaña, en los huesos de los ancestros y en la preservación digna de la historia. En Casa VIII, se manifiesta como una reverencia profunda hacia el dolor colectivo de tu pueblo y el rescate de las memorias silenciadas.`,
      projectsManifestation: `La raíz sagrada del Museo de la Memoria y Dignidad Maule y de la recuperación de la identidad campesina obrera. Tu arte y tu respeto hacia las víctimas de la dictadura y del despojo territorial no es postureo; es una deuda kármica y ética sagrada.`,
      lightVsShadow: `• LUZ: Compasión lúcida, devoción monástica por la verdad histórica, capacidad de consagrar tu esfuerzo a una causa más grande que tu persona.
• SOMBRA: Desilusión amarga cuando las instituciones de derechos humanos o del Estado actúan con cinismo o mezquindad partidista.`,
      stoicGuidance: `Construye el templo de la memoria aunque nadie te dé las gracias. La nobleza de la acción es su propia recompensa.`
    },

    pluto: {
      id: "pluto",
      name: "Plutón en Sagitario (02° 45')",
      symbol: "♇",
      house: "Casa VI / VII (Regeneración de Hábitos & Alianzas Transformadoras)",
      sign: "Sagitario ♐ • Fuego Mutable",
      dignity: "El Fuego Subterráneo • La Verdad Radical",
      archetype: "El Ave Fénix & El Cirujano de la Sombra",
      badgeColor: "#9C27B0",
      coords: { cx: 290, cy: 430 },
      psychology: `Plutón en Sagitario busca la verdad con obsesión y no se detiene ante las apariencias. En la Casa de la salud, los hábitos y las alianzas, te otorga una capacidad milagrosa de regeneración física y mental: cuando tocas fondo o atraviesas un periodo de crisis, tu psique no se quiebra; incinera lo viejo y renace con una potencia superior. No toleras relaciones superficiales ni acuerdos a medias; exiges lealtad y honestidad visceral.`,
      projectsManifestation: `Es la fuerza que te permite romper de cuajo hábitos nocivos (adicción al porno, consumo superfluo, dispersión) y reemplazarlos por una rutina monástica de hierro durante los 21 días de templanza.`,
      lightVsShadow: `• LUZ: Capacidad de transmutación somática sobrehumana, intuición para detectar mentiras y falsedades al instante, magnetismo protector.
• SOMBRA: Tendencia a la desconfianza extrema o a exigir estándares de pureza imposibles a quienes te rodean.`,
      stoicGuidance: `Sé implacable contigo mismo y compasivo con los demás. El fuego de Plutón debe usarse para forjar tu propio carácter, no para juzgar las debilidades del prójimo.`
    },

    chiron: {
      id: "chiron",
      name: "Quirón en Libra (15° 10')",
      symbol: "⚷",
      house: "Casa V / VI (El Sanador Herido & La Justicia Comunitaria)",
      sign: "Libra ♎ • Aire Cardinal",
      dignity: "El Eje de la Sanación Relacional",
      archetype: "El Mediador de la Paz & Médico de la Herida Colectiva",
      badgeColor: "#E91E63",
      coords: { cx: 420, cy: 295 },
      psychology: `Quirón representa la herida que no se cura con anestesia, sino que se convierte en tu mayor medicina para otros. En Libra, la herida toca el sentido de justicia, de pertenencia y de equidad en los vínculos: viviste en carne propia cómo la arbitrariedad, la exclusión o el desequilibrio desgarran a las personas. Al asumirlo, te conviertes en un mediador nato, sensible ante el dolor del desamparado y capaz de construir espacios donde la dignidad no sea negociable.`,
      projectsManifestation: `Directamente vinculado a Maule Red (darle voz y señal a los sectores rurales aislados) y al Museo de la Memoria Maule (sanar las heridas de la memoria comarcal). Diseñas plataformas para que los invisibles tengan un lugar bajo el sol.`,
      lightVsShadow: `• LUZ: Empatía sanadora profunda, sensibilidad artística inigualable, capacidad para desarmar hostilidades con inteligencia diplomática.
• SOMBRA: Duda íntima sobre si eres merecedor de amor incondicional; miedo a ser rechazado cuando muestras tus propias fragilidades.`,
      stoicGuidance: `Tu mayor fuerza nace de haber mirado de frente tu propia vulnerabilidad. Como el centauro Quirón, tu sabiduría es medicina para la tribu.`
    },

    nodonorte: {
      id: "nodonorte",
      name: "Nodo Norte en Libra (18° 35')",
      symbol: "☊",
      house: "Casa V / VI (Eje Nodal del Alma • El Gran Dharma)",
      sign: "Libra ♎ • Aire Cardinal (Nodo Sur en Aries ♈)",
      dignity: "El Camino del Héroe: De la Soledad a la Alianza Soberana",
      archetype: "El Diplomático del Reino & El Forjador de Equipos",
      badgeColor: "#00B0FF",
      coords: { cx: 420, cy: 250 },
      psychology: `El eje de los Nodos Lunares es la brújula evolutiva de tu encarnación. Tu **Nodo Sur en Aries** indica que ya naciste con la maestría del guerrero individualista: sabes pelear solo, emprender solo y sobrevivir en la intemperie. Esa es tu zona de confort. Sin embargo, tu misión sagrada (tu **Nodo Norte en Libra**) es aprender el arte de la **CO-CREACIÓN**: construir alianzas leales, armar equipo, delegar, escuchar la perspectiva del socio y fundar instituciones que no dependan exclusivamente de tus brazos. Si intentas hacer todo solo, el destino te obligará a detenerte; si invitas a otros nobles caballeros a tu mesa, conquistarás el imperio.`,
      projectsManifestation: `Explica con precisión quirúrgica tu momento actual: la necesidad de crear un equipo fundador para Maule Red y el Museo de la Memoria Maule, el trabajo en tándem con tu pareja Daniela y la búsqueda de sinergias en Alemania y el País Vasco. Tu destino es la mesa redonda.`,
      lightVsShadow: `• LUZ: Capacidad de liderar desde la fraternidad, creación de redes sólidas, diplomacia estratégica impecable.
• SOMBRA: La tentación regresiva del ego de decir: «Nadie lo hace como yo, mejor lo hago todo solo».`,
      stoicGuidance: `Marco Aurelio escribió: «Los hombres hemos nacido los unos para los otros. Instrúyelos, pues, o sopórtalos». La caballería jaguar no es una celda solitaria; es una orden de hermanos.`
    },

    lilith: {
      id: "lilith",
      name: "Lilith en Cáncer (09° 30')",
      symbol: "⚸",
      house: "Casa II / III (La Raíz Salvaje & El Rechazo al Chantaje)",
      sign: "Cáncer ♋ • Agua Cardinal",
      dignity: "La Madre Oscura • El Instinto No Domesticado",
      archetype: "La Guardiana de la Sangre & La Fiera Territorial",
      badgeColor: "#B71C1C",
      coords: { cx: 290, cy: 75 },
      psychology: `Lilith (la Luna Negra) en Cáncer revela un rechazo instintivo y feroz hacia los mandatos familiares asfixiantes, el chantaje emocional o la victimización aprendida. Posees un radar infalible para detectar la manipulación disfrazada de afecto. Tu lealtad a tus orígenes no pasa por la sumisión a la tradición muerta, sino por rescatar el fuego vivo de la raíz campesina y defender tu soberanía emocional a ultranza.`,
      projectsManifestation: `Tu capacidad para emigrar a Europa sin perder tu identidad territorial del Maule, y tu negativa rotunda a mendigar favores o ceder ante el conformismo de la masa.`,
      lightVsShadow: `• LUZ: Autonomía emocional absoluta, instinto feroz para proteger a los suyos, rechazo al victimismo.
• SOMBRA: Dificultad para recibir afecto si sospechas que viene con condiciones; muros defensivos que pueden alejar a personas bienintencionadas.`,
      stoicGuidance: `Permite que la ternura entre a tu fortaleza. La verdadera soberanía no necesita demostrar frialdad para estar segura de su fuerza.`
    }
  },

  aspects: [
    {
      id: "sol_marte",
      title: "☉ Conjunción Sol - Marte en Aries",
      planets: "Sol 03° Aries ☌ Marte 08° Aries (Orbe 5°)",
      type: "Conjunción Fuego Primordial",
      house: "Casa X (Cúspide de la Vocación Pública)",
      badge: "FUEGO NUCLEAR",
      color: "#C0392B",
      desc: "El aspecto de los conquistadores natos. Tu voluntad vital (Sol) y tu fuerza de choque física (Marte) son una sola entidad. No existe brecha entre desear algo y ponerte a ejecutarlo. Eres una locomotora cuando te fijas un objetivo.",
      tension: "Impaciencia extrema con el ritmo ajeno. Riesgo de quemar los propios cables si no se intercalan descansos somáticos conscientes.",
      channeling: "Canalizar en sesiones pesadas de Muay Thai, ascensos de montaña, escritura de tesis y proyectos de alto impacto donde se requiera romper inercias de cuajo."
    },
    {
      id: "sol_saturno",
      title: "☉ Conjunción Sol - Saturno en Aries",
      planets: "Sol 03° Aries ☌ Saturno 28° Aries (Mismo Signo / Fin de Casa X)",
      type: "Conjunción de Maduración Férrea",
      house: "Casa X (La Prueba de la Autoridad)",
      badge: "EL MARTILLO DEL HERRERO",
      color: "#D4AF37",
      desc: "La forja del carácter estoico. El universo no te regaló nada por casualidad; cada conquista ha requerido sudor, disciplina y paciencia. Saturno te exige ser el arquitecto riguroso de tu propia vida.",
      tension: "Sentimiento temprano de tener que cargar con excesivas responsabilidades; tendencia al pesimismo o a la autoexigencia implacable.",
      channeling: "Abrazar las rutinas monásticas, el estudio riguroso de idiomas y la defensa metódica de la Tesis en Hannover. Tu autoridad se construye en la roca de los hechos."
    },
    {
      id: "marte_pluto",
      title: "♂ Trígono Marte en Aries - Plutón en Sagitario",
      planets: "Marte 08° Aries △ Plutón 02° Sagitario (Orbe 6°)",
      type: "Trígono de Fuego Inagotable",
      house: "Casa X a Casa VII (El Motor Regenerativo)",
      badge: "VOLUNTAD DE TITANIO",
      color: "#8E24AA",
      desc: "Uno de los aspectos más poderosos de la astrología clásica. Te dota de una segunda batería energética oculta: cuando cualquier otra persona tiraría la toalla por agotamiento, tú encuentras una reserva subterránea de vitalidad y concentración para seguir adelante.",
      tension: "Intensidad que puede abrumar a personas más tibias; necesidad de no abusar de esta energía para no caer en colapso suprarrenal a largo plazo.",
      channeling: "Superación de los 21 días de templanza inquebrantable, superación de pruebas físicas extremas y resolución de crisis complejas en el extranjero."
    },
    {
      id: "luna_jupiter",
      title: "☽ Trígono Luna en Tauro - Júpiter en Capricornio",
      planets: "Luna 24° Tauro △ Júpiter 14° Capricornio (Trígono de Tierra)",
      type: "Trígono de Prosperidad Terrenal",
      house: "Casa XI a Casa VIII (El Granero Imperial)",
      badge: "ABUNDANCIA ORGÁNICA",
      color: "#2E7D32",
      desc: "Tu mundo emocional está conectado con la sabiduría de la tierra. Este trígono te brinda una fe silenciosa en que la providencia recompensará tu trabajo honesto. Resiliencia financiera, amor por la soberanía alimentaria y atracción natural de recursos materiales para tus proyectos.",
      tension: "Riesgo de acomodarse en una zona de confort una vez que se alcanza un nivel básico de solvencia.",
      channeling: "Gestión de las cuentas de Sparkasse y Banco de Chile, inversión en permacultura y desarrollo de modelos agrícolas sustentables con Chile Agrotech."
    },
    {
      id: "luna_venus",
      title: "☽ Conjunción Luna - Venus en Tauro",
      planets: "Luna 24° Tauro ☌ Venus 16° Tauro (Orbe 7°)",
      type: "Conjunción de Gracia & Domicilio",
      house: "Casa XI (La Belleza Atemporal)",
      badge: "EL JARDÍN DEL EDÉN",
      color: "#43A047",
      desc: "Los dos planetas femeninos y de la fertilidad unidos en su signo más noble (Tauro). Te dota de un ojo refinado para las artes plásticas, amor por la pintura clásica, talento para la cocina y una ternura profunda hacia tu compañera de vida y los seres queridos.",
      tension: "Hipersensibilidad al entorno físico desordenado o feo; necesidad de rodearse de nobleza material y paz acústica.",
      channeling: "Práctica en el Atelier de Bellas Artes (técnica Zorn, claroscuro), estudio de trompeta de jazz, diseño de espacios de calma y masajes regenerativos."
    },
    {
      id: "mercurio_sextiles",
      title: "☿ Mercurio en Piscis Sextil Saturno & Júpiter",
      planets: "Mercurio 12° Piscis ⚹ Júpiter 14° Capricornio ⚹ Saturno 28° Aries",
      type: "Sextil Armónico de Integración",
      house: "Casa IX a Casa VIII / X (La Síntesis Científica & Mística)",
      badge: "LA MENTE DEL POLÍMATA",
      color: "#00ACC1",
      desc: "La alquimia perfecta entre la poesía intuitiva (Piscis) y la estructura rigurosa (Capricornio/Aries). Puedes redactar un informe de modelación climática de nivel máster y a la media hora escribir una metáfora conmovedora o diseñar un mapa narrativo de cómic.",
      tension: "Fatiga intelectual por saltar entre dos modos de pensamiento tan opuestos sin pausas de silencio.",
      channeling: "Publicación de papers científicos (Lauwersmeer), conceptualización de la plataforma Chile Agrotech y redacción del manifiesto del Caballero Jaguar."
    },
    {
      id: "marte_nodo_norte",
      title: "♂ Marte en Aries Oposición ☊ Nodo Norte en Libra",
      planets: "Marte 08° Aries ☍ Nodo Norte 18° Libra (Conjunción Nodo Sur)",
      type: "Oposición Kármica / Vector Evolutivo",
      house: "Casa X a Casa V / VI (El Gran Salto del Alma)",
      badge: "EL PACTO DE LA MESA REDONDA",
      color: "#FF6D00",
      desc: "El desafío más importante de tu vida adulta: pasar de la mentalidad del mercenario solitario (Marte en Aries) al estadista que forja alianzas y equipos (Nodo Norte en Libra). Tu fuego es enorme, pero solo cambiará el mundo si aprendes a convocar y coordinar talentos ajenos.",
      tension: "La tentación de frustrarte con los tiempos del equipo y mandar todo a volar para hacerlo solo.",
      channeling: "Conformación del equipo de Maule Red y del Museo de la Memoria Maule; delegación de tareas y cuidado de la sociedad con Daniela y tus socios."
    },
    {
      id: "urano_sol_sextil",
      title: "♅ Urano en Acuario Sextil ☉ Sol en Aries",
      planets: "Urano 03° Acuario ⚹ Sol 03° Aries (Orbe Exacto 0°)",
      type: "Sextil Exacto de Genio Pionero",
      house: "Casa IX a Casa X (La Chispa del Innovador)",
      badge: "PROMETEO DESATADO",
      color: "#00E5FF",
      desc: "Un aspecto de orbe milimétrico (0 grados exactos). Tu identidad solar se alinea fluidamente con la tecnología disruptiva, la visión de futuro y la originalidad radical. No sigues tendencias; las anticipas.",
      tension: "Inquietud mental constante, dificultad para soportar rutinas aburridas o procesos obsoletos.",
      channeling: "Liderazgo en inteligencia artificial (Los Manejadores), agricultura de precisión y diseño de modelos de predicción territorial."
    }
  ],

  saturnReturn: {
    title: "🪐 El Portal de los 30 Años: Primer Retorno de Saturno (1996 ➔ 2026)",
    subtitle: "El Rito de Paso de la Caballería: Fin de la Dispersión, Inicio de la Soberanía",
    intro: `En la astrología de tradición y en la psicología de Carl Jung, el **Retorno de Saturno** es el acontecimiento biológico y espiritual más decisivo en la vida de un hombre. Saturno tarda aproximadamente 29 años y medio en recorrer los doce signos del zodíaco. Al cumplir 30 años en 2026, Saturno regresa con precisión milimétrica al grado exacto de Aries donde se encontraba el 23 de marzo de 1996 en Parral.

Este no es un tránsito menor: es el cierre irrevocable de la juventud exploratoria y la ceremonia de investidura de la adultez soberana. Todo lo que construiste sobre arena, ilusiones o aprobación ajena será desmantelado; todo lo que cimentaste en la roca de la disciplina, el trabajo y el honor será coronado con autoridad incontestable.`,
    gates: [
      {
        num: "I",
        name: "La Puerta de la Consagración Vocacional",
        rule: "Fin del estudiante perpetuo • Coronación del Maestro",
        desc: "Saturno en tu Casa X exige cerrar definitivamente el ciclo de formación académica. La defensa y graduación de tu Tesis de Máster en Hannover no es solo un trámite universitario; es tu graduación existencial ante el tribunal del tiempo. Marca el paso de quien busca credenciales a quien ejerce la autoridad científica y profesional en Europa y Chile."
      },
      {
        num: "II",
        name: "La Puerta de la Templanza Biológica",
        rule: "Los 21 días como estado natural permanente",
        desc: "En tus 20s, la templanza podía ser un experimento intermitente. A tus 30 años, Saturno en Aries te exige un cuerpo blindado. Cero pornografía, cero dopamina barata, cero dispersión. La abstinencia y el autodominio dejan de ser una penitencia para convertirse en tu armadura de soberanía."
      },
      {
        num: "III",
        name: "La Puerta de la Soberanía Territorial",
        rule: "De la dispersión nómada a los bastiones consolidados",
        desc: "Establecer bases operativas definitivas: tu piso y arraigo profesional en Hannover y Bilbao, conectados orgánicamente con tu territorio sagrado en el Maule. No eres un desterrado; eres un expedicionario imperial con bases en dos continentes."
      },
      {
        num: "IV",
        name: "La Puerta de la Alianza y el Equipo",
        rule: "El salto del guerrero solitario al líder de legión",
        desc: "Saturno en Casa X activa tu eje nodal: se acabó la fantasía de conquistar el mundo en solitario. Debes convocar, inspirar y coordinar equipos sólidos para la Red Maule Red, el Museo de la Memoria y tus proyectos tecnológicos. El verdadero rey es quien sabe forjar una corte de caballeros leales."
      }
    ]
  },

  crossCosmology: {
    maya: {
      name: "Tonalpohualli Maya / Mexica: Ocelotl (El Jaguar Sagrado)",
      patron: "Tezcatlipoca • El Señor del Espejo de Obsidiana",
      element: "Tierra Nocturna & Fuego Volcánico",
      lore: `En el calendario sagrado mesoamericano, el glifo **Ocelotl** encarna al Caballero Jaguar: el guerrero que no teme adentrarse en la selva oscura ni en las profundidades de la psique humana. Bajo la tutela de Tezcatlipoca, el jaguar porta el espejo de obsidiana humeante, símbolo de la introspección despiadada. El Caballero Jaguar no busca la gloria vana del espectáculo; busca mirarse en el espejo, reconocer sus sombras, sus miedos y sus debilidades somáticas, y quemarlas en la ceremonia del Fuego Nuevo. Tu racha de 21 días es la versión contemporánea de ese fuego tolteca.`
    },
    chinese: {
      name: "Zodíaco Oriental: Rata de Fuego (1996 • 丙子 Bǐng Zǐ)",
      yinYang: "Yang de Fuego Primordial sobre Agua Profunda",
      traits: "Astucia Táctica, Liderazgo Pionero, Ahorro Inteligente & Visión de Redes",
      lore: `Nacido en 1996, perteneces al signo de la **Rata de Fuego**. En la metafísica oriental, la Rata de Fuego combina la chispa incontenible del fuego con la inteligencia estratégica, la velocidad mental y el instinto protector de la Rata. Posees una habilidad única para detectar oportunidades de valor antes que nadie, acumular recursos con prudencia y construir redes comerciales y culturales complejas. No te paralizas ante la escasez; te vuelves más ingenioso y astuto.`
    },
    tarot: {
      emperor: {
        name: "Arcano Mayor IV: El Emperador",
        astralRule: "Regido por Aries ♈ & Marte",
        lore: `El Emperador representa la soberanía sobre el territorio, la creación de leyes, la protección de las fronteras y el establecimiento del orden racional en medio del caos salvaje. Sentado en su trono de piedra cubierto de cabezas de carnero (Aries), sostiene el cetro del poder terrenal. Es tu arquetipo solar: tú no vienes a pedir permiso; vienes a fundar tu propio reino.`
      },
      magician: {
        name: "Arcano Mayor I: El Mago",
        astralRule: "Regido por Mercurio ☿",
        lore: `El Mago tiene sobre su mesa de trabajo las cuatro herramientas sagradas: la copa (agua/emoción), la espada (aire/intelecto), el oro (tierra/materia) y el báculo (fuego/voluntad). Es tu Mercurio en Casa IX: la capacidad de tomar la ciencia, el arte, la tecnología y la espiritualidad para manifestar proyectos tangibles en el mundo real.`
      }
    }
  }
};

/**
 * Calculador Dinámico de la Fase Lunar en Tiempo Real
 */
function calculateCurrentMoonPhase(date = new Date()) {
  // Algoritmo astronómico simplificado basado en el ciclo sinódico (29.53058867 días)
  // Referencia conocida: Luna Nueva el 6 de Enero de 2000 a las 18:14 UTC
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const synodicMonth = 29.53058867;
  const diffDays = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phaseCycle = (diffDays % synodicMonth + synodicMonth) % synodicMonth;
  const age = Math.round(phaseCycle * 10) / 10;
  const illumination = Math.round((1 - Math.cos((phaseCycle / synodicMonth) * 2 * Math.PI)) / 2 * 100);

  let phaseName = "";
  let emoji = "";
  let stoicFocus = "";

  if (age < 1.8) {
    phaseName = "Luna Nueva (Novilunio)";
    emoji = "🌑";
    stoicFocus = "Consagración de Metas & Apertura de Ciclo. Momento sagrado para trazar el Códice de los 21 días, sembrar proyectos territoriales y purificar el espacio con copal.";
  } else if (age < 7.4) {
    phaseName = "Luna Creciente";
    emoji = "🌒";
    stoicFocus = "Fuerza de Crecimiento & Acción Diaria. Iniciar frentes difíciles, aumentar el volumen de entrenamiento (Muay Thai / fuerza) y empujar la redacción de la tesis.";
  } else if (age < 11.1) {
    phaseName = "Cuarto Creciente";
    emoji = "🌓";
    stoicFocus = "Superación de Obstáculos & Resistencia. No ceder ante la fricción. Saturno te exige disciplina en tus horarios y cero tolerancia con las distracciones.";
  } else if (age < 14.8) {
    phaseName = "Gibosa Creciente";
    emoji = "🌔";
    stoicFocus = "Afinación de Detalles & Excelencia. Pulir la técnica en el Atelier, revisar el balance de gastos y organizar la documentación de expedición.";
  } else if (age < 16.6) {
    phaseName = "Luna Llena (Plenilunio)";
    emoji = "🌕";
    stoicFocus = "Cúspide Energética & Iluminación Somática. Momento de máxima claridad mental. Cuidado con el exceso de fuego de Marte: mantén la serenidad estoica y celebra los avances logrados.";
  } else if (age < 20.3) {
    phaseName = "Gibosa Menguante (Diseminadora)";
    emoji = "🌖";
    stoicFocus = "Divulgación & Compartir con la Comunidad. Enseñar lo aprendido, comunicar avances en Maule Red o el Museo de la Memoria y cuidar las alianzas fraternales.";
  } else if (age < 24.0) {
    phaseName = "Cuarto Menguante";
    emoji = "🌗";
    stoicFocus = "Corte Quirúrgico de Vicios & Desapego. Eliminar suscripciones innecesarias, limpiar tu bandeja de entrada y cortar cualquier atisbo de tentación dopaminérgica.";
  } else {
    phaseName = "Luna Menguante (Balsámica)";
    emoji = "🌘";
    stoicFocus = "Reposo Somático & Meditación Profunda. Box Breathing 4x4, baños de sales, masaje de pies y silencio mental para preparar el próximo ciclo de caballería.";
  }

  return {
    age,
    illumination,
    phaseName,
    emoji,
    stoicFocus
  };
}

/**
 * Calculador del Regente Planetario del Día
 */
function getCurrentDayPlanetaryRuler(date = new Date()) {
  const days = [
    { name: "Domingo", ruler: "Sol ☉", element: "Fuego", focus: "Soberanía, Visión Estratégica & Códice de la Semana", color: "#F39C12" },
    { name: "Lunes", ruler: "Luna ☽", element: "Agua / Tierra", focus: "Nutrición Somática, Descanso & Balance Interior", color: "#BDC3C7" },
    { name: "Martes", ruler: "Marte ♂", element: "Fuego Cardinal", focus: "Fuerza Bruta, Muay Thai, Ataque a Tareas Difíciles", color: "#C0392B" },
    { name: "Miércoles", ruler: "Mercurio ☿", element: "Aire / Éter", focus: "Estudio de Idiomas, Redacción de Papers & Código", color: "#2980B9" },
    { name: "Jueves", ruler: "Júpiter ♃", element: "Fuego / Tierra", focus: "Finanzas, Expansión Territorial & Proyectos de Gran Escala", color: "#8E44AD" },
    { name: "Viernes", ruler: "Venus ♀", element: "Tierra Fija", focus: "Atelier de Pintura, Música, Romance & Belleza Noble", color: "#27AE60" },
    { name: "Sábado", ruler: "Saturno ♄", element: "Tierra / Plomo", focus: "Auditoría de Hábitos, Limpieza Impecable & Templanza", color: "#7F8C8D" }
  ];
  return days[date.getDay()];
}

/**
 * Gestor Principal del Observatorio Astral en la UI
 */
const astralObservatory = {
  currentTab: "planetas",

  init() {
    this.renderHeaderLiveWidgets();
    this.renderActiveTab();
    this.attachWheelClickHandlers();
  },

  setTab(tabKey) {
    this.currentTab = tabKey;
    document.querySelectorAll(".astro-subtab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.subtab === tabKey);
    });
    this.renderActiveTab();
  },

  renderHeaderLiveWidgets() {
    const moonBox = document.getElementById("astro-live-moon-widget");
    const rulerBox = document.getElementById("astro-live-ruler-widget");
    if (!moonBox || !rulerBox) return;

    const moon = calculateCurrentMoonPhase();
    const ruler = getCurrentDayPlanetaryRuler();

    moonBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 2.2rem; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));">${moon.emoji}</span>
        <div>
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Fase Lunar en Vivo</div>
          <strong style="color: #FFF; font-size: 1.05rem; font-family: 'Cinzel', serif;">${moon.phaseName}</strong>
          <div style="font-size: 0.78rem; color: #DCD3C1; margin-top: 2px;">
            Iluminación: <strong>${moon.illumination}%</strong> • Edad: ${moon.age} días
          </div>
        </div>
      </div>
      <p style="font-size: 0.8rem; color: var(--parchment-warm); line-height: 1.45; margin: 8px 0 0 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
        🛡️ <strong>Directriz Lunar:</strong> ${moon.stoicFocus}
      </p>
    `;

    rulerBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 2.2rem; color: ${ruler.color}; filter: drop-shadow(0 0 8px ${ruler.color});">🪐</span>
        <div>
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Regencia Planetaria de Hoy</div>
          <strong style="color: #FFF; font-size: 1.05rem; font-family: 'Cinzel', serif;">${ruler.name}: ${ruler.ruler}</strong>
          <div style="font-size: 0.78rem; color: ${ruler.color}; margin-top: 2px;">
            Elemento: <strong>${ruler.element}</strong>
          </div>
        </div>
      </div>
      <p style="font-size: 0.8rem; color: var(--parchment-warm); line-height: 1.45; margin: 8px 0 0 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
        ⚡ <strong>Foco Táctico:</strong> ${ruler.focus}
      </p>
    `;
  },

  renderActiveTab() {
    const container = document.getElementById("astro-main-view-container");
    if (!container) return;

    if (this.currentTab === "planetas") {
      this.renderPlanetsView(container);
    } else if (this.currentTab === "aspectos") {
      this.renderAspectsView(container);
    } else if (this.currentTab === "saturno") {
      this.renderSaturnReturnView(container);
    } else if (this.currentTab === "sincretismo") {
      this.renderCrossCosmologyView(container);
    } else if (this.currentTab === "transitos") {
      this.renderLiveTransitsView(container);
    }
  },

  renderPlanetsView(container) {
    const planetsList = Object.values(ASTRAL_OBSERVATORY_DATA.planets);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="background: rgba(14, 20, 28, 0.75); border: 1px solid var(--border-glass); border-radius: 10px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <span class="badge-tag badge-gold" style="font-size: 0.7rem;">ENCICLOPEDIA ASTRAL COMPLETA</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">
              Los 13 Cuerpos Celestes & Puntos del Alma en sus Casas
            </h4>
          </div>
          <span style="font-size: 0.82rem; color: var(--text-muted);">
            💡 Haz clic en cualquier planeta para abrir su tratado completo (Psicología, Sombra y Alquimia).
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 14px;">
          ${planetsList.map(p => `
            <div class="astro-planet-pill" style="cursor: pointer; position: relative; border-left: 3px solid ${p.badgeColor};" onclick="astralObservatory.openPlanetDetailModal('${p.id}')">
              <span style="font-size: 2rem; color: ${p.badgeColor}; line-height: 1; min-width: 32px; text-align: center;">${p.symbol}</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 6px;">
                  <strong style="color: #FFF; font-size: 0.95rem;">${p.name}</strong>
                  <span style="font-size: 0.68rem; color: ${p.badgeColor}; font-weight: 700; text-transform: uppercase;">${p.dignity.split('•')[0]}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                  ${p.house} • <span style="color: #CBD5E1;">${p.archetype}</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--parchment-warm); line-height: 1.45; margin: 6px 0 0 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  ${p.psychology}
                </p>
                <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                  <span style="font-size: 0.72rem; color: var(--imperial-gold-light); font-weight: bold;">Leer Tratado Completo ➔</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderAspectsView(container) {
    const aspects = ASTRAL_OBSERVATORY_DATA.aspects;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="background: rgba(14, 20, 28, 0.75); border: 1px solid var(--border-glass); border-radius: 10px; padding: 14px 18px;">
          <span class="badge-tag badge-gold" style="font-size: 0.7rem;">ASPECTARIUM & ALQUIMIA PSICOLÓGICA</span>
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">
            Geometría Celeste: Las 8 Tensiones & Superpoderes Dinámicos
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px; line-height: 1.5;">
            Los aspectos no son destinos ciegos, sino cables de alta tensión entre distintas partes de tu cerebro y tu alma. Representan cómo tus impulsos (Marte), tus emociones (Luna), tu disciplina (Saturno) y tu visión de futuro (Urano) dialogan entre sí.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${aspects.map(a => `
            <div class="jaguar-card" style="padding: 16px; border-left: 4px solid ${a.color}; background: rgba(11, 14, 20, 0.85);">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.3rem; color: ${a.color};">⚡</span>
                  <h5 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #FFF; margin: 0;">${a.title}</h5>
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="badge-tag" style="background: rgba(255,255,255,0.06); color: ${a.color}; border: 1px solid ${a.color}; font-size: 0.7rem;">${a.badge}</span>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">${a.house}</span>
                </div>
              </div>

              <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px; font-family: monospace;">
                ${a.planets} • <em>${a.type}</em>
              </div>

              <p style="font-size: 0.85rem; color: var(--parchment-light); line-height: 1.5; margin: 0 0 10px 0;">
                ${a.desc}
              </p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: 6px;">
                <div style="border-left: 2px solid #C0392B; padding-left: 8px;">
                  <strong style="color: #E57373; font-size: 0.75rem; text-transform: uppercase; display: block;">⚠️ Fricción / Sombra:</strong>
                  <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${a.tension}</span>
                </div>
                <div style="border-left: 2px solid #4CAF50; padding-left: 8px;">
                  <strong style="color: #81C784; font-size: 0.75rem; text-transform: uppercase; display: block;">⚔️ Canalización Estoica:</strong>
                  <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${a.channeling}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderSaturnReturnView(container) {
    const s = ASTRAL_OBSERVATORY_DATA.saturnReturn;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(14, 20, 28, 0.95) 100%); border: 1.5px solid var(--border-gold); border-radius: 12px; padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.7);">
          <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
            <span style="font-size: 2.8rem; color: #D4AF37;">🪐</span>
            <div>
              <span class="badge-tag badge-gold" style="font-size: 0.72rem;">EL PORTAL CRUCIAL DE LA EXISTENCIA (1996 ➔ 2026)</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #FFF; margin: 4px 0 0 0;">${s.title}</h3>
              <div style="font-size: 0.85rem; color: var(--imperial-gold-light); margin-top: 2px;">${s.subtitle}</div>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--parchment-light); line-height: 1.65; white-space: pre-line; margin: 0;">
            ${s.intro}
          </p>
        </div>

        <h4 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #FFF; margin: 4px 0 0 0;">
          Las 4 Puertas Sagradas del Retorno de Saturno en Aries (Casa X)
        </h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${s.gates.map(g => `
            <div class="jaguar-card" style="padding: 18px; border-top: 3px solid #D4AF37; background: rgba(14, 20, 28, 0.85); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #D4AF37; font-weight: bold;">Puerta ${g.num}</span>
                <span class="badge-tag" style="font-size: 0.65rem; background: rgba(212,175,55,0.15); color: #D4AF37; border: 1px solid rgba(212,175,55,0.4);">RITO INICIÁTICO</span>
              </div>
              <h5 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #FFF; margin: 0;">${g.name}</h5>
              <div style="font-size: 0.76rem; color: var(--imperial-gold-light); font-weight: 700; text-transform: uppercase;">${g.rule}</div>
              <p style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.55; margin: 4px 0 0 0;">
                ${g.desc}
              </p>
            </div>
          `).join('')}
        </div>

        <div style="background: rgba(11, 14, 20, 0.9); border: 1px dashed rgba(212,175,55,0.4); border-radius: 8px; padding: 16px; text-align: center;">
          <h5 style="font-family: 'Cinzel', serif; color: #FFF; font-size: 1.05rem; margin: 0 0 6px 0;">📜 El Voto de Saturno a los 30 Años</h5>
          <p style="font-size: 0.86rem; color: var(--parchment-warm); font-style: italic; max-width: 800px; margin: 0 auto; line-height: 1.6;">
            «No pediré que los acontecimientos ocurran como yo deseo; desearé que ocurran tal como ocurren, y mi camino será sereno. La juventud fue la forja del acero; ahora comienza el imperio de mi propia voluntad.»
          </p>
        </div>

      </div>
    `;
  },

  renderCrossCosmologyView(container) {
    const c = ASTRAL_OBSERVATORY_DATA.crossCosmology;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="background: rgba(14, 20, 28, 0.75); border: 1px solid var(--border-glass); border-radius: 10px; padding: 16px 20px;">
          <span class="badge-tag badge-gold" style="font-size: 0.7rem;">SINCRETISMO ANCESTRAL & COSMOGRAFÍAS DEL MUNDO</span>
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">
            El Caballero Jaguar a través de los Espejos del Saber Universal
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px; line-height: 1.5;">
            Tu carta astral occidental dialoga directamente con la cosmovisión tolteca/mexica, la sabiduría china de los cinco elementos y los arquetipos renacentistas del Tarot. Todas apuntan hacia el mismo centro: la maestría del guerrero sabio.
          </p>
        </div>

        <div class="grid-2" style="gap: 16px;">
          
          <!-- MAYA MEXICA OCELOTL -->
          <div class="jaguar-card" style="padding: 18px; border-left: 4px solid #C0392B; background: rgba(14, 20, 28, 0.85);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <span style="font-size: 2.2rem;">🐆</span>
              <div>
                <h5 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #FFF; margin: 0;">${c.maya.name}</h5>
                <span style="font-size: 0.75rem; color: #E57373;">Patrón: ${c.maya.patron} • ${c.maya.element}</span>
              </div>
            </div>
            <p style="font-size: 0.84rem; color: var(--parchment-light); line-height: 1.6; margin: 0;">
              ${c.maya.lore}
            </p>
          </div>

          <!-- ORIENTAL RATA DE FUEGO -->
          <div class="jaguar-card" style="padding: 18px; border-left: 4px solid #F39C12; background: rgba(14, 20, 28, 0.85);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <span style="font-size: 2.2rem;">🐀</span>
              <div>
                <h5 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #FFF; margin: 0;">${c.chinese.name}</h5>
                <span style="font-size: 0.75rem; color: #FFB74D;">${c.chinese.yinYang}</span>
              </div>
            </div>
            <div style="font-size: 0.76rem; color: var(--text-dim); margin-bottom: 8px;"><strong>Rasgos:</strong> ${c.chinese.traits}</div>
            <p style="font-size: 0.84rem; color: var(--parchment-light); line-height: 1.6; margin: 0;">
              ${c.chinese.lore}
            </p>
          </div>

        </div>

        <!-- TAROT ARQUETÍPICO -->
        <div class="jaguar-card" style="padding: 18px; border-left: 4px solid #8E44AD; background: rgba(14, 20, 28, 0.85);">
          <h5 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #FFF; margin: 0 0 14px 0;">
            🃏 Los Dos Arcanos Mayores Rectores de tu Consciencia
          </h5>
          <div class="grid-2" style="gap: 16px;">
            <div style="background: rgba(0,0,0,0.35); padding: 14px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <strong style="color: #D4AF37; font-size: 0.95rem; font-family: 'Cinzel', serif;">${c.tarot.emperor.name}</strong>
                <span style="font-size: 0.7rem; color: var(--text-dim);">${c.tarot.emperor.astralRule}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--parchment-warm); line-height: 1.5; margin: 0;">
                ${c.tarot.emperor.lore}
              </p>
            </div>
            <div style="background: rgba(0,0,0,0.35); padding: 14px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <strong style="color: #81D4FA; font-size: 0.95rem; font-family: 'Cinzel', serif;">${c.tarot.magician.name}</strong>
                <span style="font-size: 0.7rem; color: var(--text-dim);">${c.tarot.magician.astralRule}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--parchment-warm); line-height: 1.5; margin: 0;">
                ${c.tarot.magician.lore}
              </p>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  renderLiveTransitsView(container) {
    const moon = calculateCurrentMoonPhase();
    const ruler = getCurrentDayPlanetaryRuler();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="background: rgba(14, 20, 28, 0.75); border: 1px solid var(--border-glass); border-radius: 10px; padding: 16px 20px;">
          <span class="badge-tag badge-gold" style="font-size: 0.7rem;">EL RELOJ CELESTE OPERATIVO</span>
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 4px 0 0 0;">
            Tránsitos en Tiempo Real & Horas Planetarias para la Práctica Diaria
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px; line-height: 1.5;">
            El Caballero Jaguar no mira el cielo para adivinar pasivamente el futuro; lo mira como un estratega renacentista para sincronizar el esfuerzo de su jornada con las mareas cósmicas.
          </p>
        </div>

        <div class="grid-2" style="gap: 16px;">
          
          <div class="jaguar-card" style="padding: 18px; text-align: center; background: radial-gradient(circle, rgba(23,30,40,0.95) 0%, rgba(11,14,20,0.99) 100%);">
            <span style="font-size: 3.5rem; display: block; margin-bottom: 8px;">${moon.emoji}</span>
            <span class="badge-tag badge-cyan" style="font-size: 0.75rem;">ESTADO LUNAR EXACTO</span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #FFF; margin: 8px 0 4px 0;">${moon.phaseName}</h4>
            <div style="font-size: 0.88rem; color: var(--parchment-warm); margin-bottom: 14px;">
              Iluminación: <strong>${moon.illumination}%</strong> • Día del Ciclo: <strong>${moon.age}</strong> de 29.5
            </div>
            <div style="text-align: left; background: rgba(0,0,0,0.4); padding: 14px; border-radius: 8px; border-left: 3px solid #00E5FF;">
              <strong style="color: #FFF; font-size: 0.82rem; display: block; margin-bottom: 4px;">🎯 Instrucción de Templanza:</strong>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
                ${moon.stoicFocus}
              </p>
            </div>
          </div>

          <div class="jaguar-card" style="padding: 18px; background: rgba(14, 20, 28, 0.85);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <span style="font-size: 2.2rem; color: ${ruler.color};">🪐</span>
              <div>
                <span class="badge-tag" style="background: rgba(255,255,255,0.06); color: ${ruler.color}; border: 1px solid ${ruler.color}; font-size: 0.68rem;">DÍA DE LA SEMANA</span>
                <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 2px 0 0 0;">${ruler.name}: Regencia de ${ruler.ruler}</h4>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--parchment-light); line-height: 1.55; margin: 0 0 14px 0;">
              Cada día de la semana recibe la impronta de un regente tradicional caldeo. Aprovechar este ritmo natural optimiza la recuperación del sistema nervioso y multiplica la eficacia en tus metas.
            </p>
            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; border-left: 3px solid ${ruler.color};">
              <strong style="color: #FFF; font-size: 0.8rem; display: block; margin-bottom: 2px;">⚡ Plan de Acción del Día:</strong>
              <span style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${ruler.focus}</span>
            </div>
          </div>

        </div>

        <!-- TABLA DE LOS 7 DÍAS Y SUS REGENCIAS -->
        <div class="jaguar-card" style="padding: 16px;">
          <h5 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #FFF; margin: 0 0 12px 0;">
            📅 El Heptagrama Semanal de Caballería
          </h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #C0392B;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Martes (Marte ♂)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Muay Thai, fuerza & tareas duras</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #2980B9;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Miércoles (Mercurio ☿)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Papers, idiomas & código</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #8E44AD;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Jueves (Júpiter ♃)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Estrategia, finanzas & alianzas</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #27AE60;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Viernes (Venus ♀)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Pintura Zorn, música & romance</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #7F8C8D;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Sábado (Saturno ♄)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Auditoría, limpieza & templanza</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #F39C12;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Domingo (Sol ☉)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Códice semanal & visión soberana</span>
            </div>
            <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; text-align: center; border-top: 2px solid #BDC3C7;">
              <strong style="color: #FFF; font-size: 0.85rem; display: block;">Lunes (Luna ☽)</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Nutrición somática & orden basal</span>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  /**
   * Modal Centrado de Detalle de Planeta
   * Abre directamente en el centro de la pantalla sin paneles laterales molestos
   */
  openPlanetDetailModal(planetId) {
    const p = ASTRAL_OBSERVATORY_DATA.planets[planetId];
    if (!p) return;

    const modal = document.getElementById("astro-planet-detail-modal");
    const content = document.getElementById("astro-planet-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- CABECERA DEL PLANETA -->
        <div style="display: flex; align-items: center; gap: 14px; border-bottom: 1.5px solid var(--border-glass); padding-bottom: 14px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.5) 100%); border: 2px solid ${p.badgeColor}; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: ${p.badgeColor};">
            ${p.symbol}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #FFF; margin: 0;">${p.name}</h3>
              <span class="badge-tag" style="background: rgba(255,255,255,0.06); color: ${p.badgeColor}; border: 1px solid ${p.badgeColor}; font-size: 0.72rem;">${p.dignity}</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--imperial-gold-light); margin-top: 3px;">
              ${p.house} • ${p.sign}
            </div>
            <div style="font-size: 0.85rem; color: #FFF; font-weight: 600; margin-top: 2px;">
              Arquetipo: ${p.archetype}
            </div>
          </div>
        </div>

        <!-- PESTAÑAS INTERNAS DENTRO DEL MODAL CENTRADO -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; overflow-x: auto;" id="astro-modal-tab-bar">
          <button class="btn-jaguar btn-sm active" onclick="astralObservatory.switchModalSubTab('psi', this)">🧠 Psicología Profunda</button>
          <button class="btn-jaguar btn-sm" onclick="astralObservatory.switchModalSubTab('proj', this)">⚔️ Proyectos Reales</button>
          <button class="btn-jaguar btn-sm" onclick="astralObservatory.switchModalSubTab('shadow', this)">⚖️ Luz vs Sombra</button>
          <button class="btn-jaguar btn-sm" onclick="astralObservatory.switchModalSubTab('stoic', this)">🛡️ Directriz Estoica</button>
        </div>

        <!-- CONTENEDOR DINÁMICO DE SUBPESTAÑAS -->
        <div id="astro-modal-tab-body" style="min-height: 180px; font-size: 0.88rem; line-height: 1.6; color: var(--parchment-light);">
          <div id="tab-psi-content">
            <h5 style="color: #FFF; margin: 0 0 8px 0; font-family: 'Cinzel', serif;">¿Qué significa este planeta en tu psique?</h5>
            <p style="white-space: pre-line; margin: 0;">${p.psychology}</p>
          </div>
          <div id="tab-proj-content" style="display: none;">
            <h5 style="color: #FFF; margin: 0 0 8px 0; font-family: 'Cinzel', serif;">Manifestación en tus frentes de vida y proyectos</h5>
            <p style="white-space: pre-line; margin: 0;">${p.projectsManifestation}</p>
          </div>
          <div id="tab-shadow-content" style="display: none;">
            <h5 style="color: #FFF; margin: 0 0 8px 0; font-family: 'Cinzel', serif;">Virtud Luminosa vs Trampa de Sombra</h5>
            <p style="white-space: pre-line; margin: 0;">${p.lightVsShadow}</p>
          </div>
          <div id="tab-stoic-content" style="display: none;">
            <h5 style="color: #FFF; margin: 0 0 8px 0; font-family: 'Cinzel', serif;">Directriz de Caballería & Alquimia Estoica</h5>
            <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #D4AF37; padding: 12px 14px; border-radius: 4px; margin-top: 6px;">
              <p style="white-space: pre-line; margin: 0; font-style: italic;">${p.stoicGuidance}</p>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
          <button class="btn-jaguar btn-secondary-dark" onclick="astralObservatory.closePlanetDetailModal();">
            Cerrar Tratado
          </button>
        </div>

      </div>
    `;

    modal.classList.add("active");
    modal.style.display = "flex";
  },

  switchModalSubTab(tabKey, btnElement) {
    document.querySelectorAll("#astro-modal-tab-bar button").forEach(b => b.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");

    const tabs = ["psi", "proj", "shadow", "stoic"];
    tabs.forEach(t => {
      const el = document.getElementById(`tab-${t}-content`);
      if (el) el.style.display = (t === tabKey ? "block" : "none");
    });
  },

  closePlanetDetailModal() {
    const modal = document.getElementById("astro-planet-detail-modal");
    if (modal) {
      modal.classList.remove("active");
      modal.style.display = "none";
    }
  },

  attachWheelClickHandlers() {
    const svg = document.getElementById("astro-celestial-wheel");
    if (!svg) return;

    // Conectar eventos de clic sobre los símbolos planetarios en el SVG existente
    const planetMap = {
      "Sol 03°♈": "sol",
      "Marte 08°♈": "marte",
      "Luna 24°♉": "luna",
      "☉": "sol",
      "♂": "marte",
      "☽": "luna",
      "♃": "jupiter",
      "♄": "saturno"
    };

    svg.querySelectorAll("text, circle").forEach(node => {
      const text = node.textContent ? node.textContent.trim() : "";
      if (planetMap[text]) {
        node.style.cursor = "pointer";
        node.addEventListener("click", () => {
          this.openPlanetDetailModal(planetMap[text]);
        });
      }
    });
  }
};

window.astralObservatory = astralObservatory;
window.ASTRAL_OBSERVATORY_DATA = ASTRAL_OBSERVATORY_DATA;

// Inicialización automática cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  if (typeof astralObservatory !== "undefined" && typeof astralObservatory.init === "function") {
    astralObservatory.init();
  }
});
