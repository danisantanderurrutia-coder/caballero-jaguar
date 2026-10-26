/* ==========================================================================
   CABALLERO JAGUAR - CÓDICE DE MENTORES DE SABIDURÍA & ARTÍCULOS FORMATIVOS
   Mentores vivos con canales activos (Lama Rinchen, Mingyur Rinpoche, etc.)
   y el Maestro Clásico de la Ciudadela: Marco Aurelio.
   ========================================================================== */

const MENTORES_ESPIRITUALIDAD_DATA = {
  lama_rinchen: {
    id: "lama_rinchen",
    name: "Lama Rinchen Gyaltsen",
    vivo: true,
    badgeText: "VIVO • CANAL ACTIVO",
    icon: "☸️",
    tradition: "Budismo Tibetano (Sakya / Paramita)",
    channelName: "Paramita (@Paramitaorg)",
    channelUrl: "https://www.youtube.com/@Paramitaorg",
    webUrl: "https://www.paramita.org",
    quote: "Entrenar la mente no es obligarla al silencio por la fuerza, sino cambiar radicalmente la relación con lo que surge en ella.",
    bio: "Maestro budista español de la tradición Sakya y director del Instituto Paramita. Destaca por su pedagogía analítica, estructurada y laica, enseñando a dominar la mente, superar la reactividad y cultivar la compasión lúcida sin dogmas.",
    defaultMins: 15,
    techKey: "shamatha",
    techName: "Shamatha (Calma Mental con Anclaje)",
    articles: [
      {
        id: "rinchen-shamatha",
        title: "Shamatha: Cómo estabilizar la mente sin luchar contra los pensamientos",
        category: "Calma Mental & Enfoque",
        readTime: "4 min de estudio",
        summary: "La mente desbocada no se doma tirando con furia de las riendas, sino ofreciendo un anclaje firme y una paciencia inquebrantable.",
        keyPoints: [
          "El caballo salvaje de la mente: Si intentas frenar un potro desbocado con violencia, tirará con el doble de fuerza. La mente se doma con espacio, presencia y firmeza paciente.",
          "Diferencia entre reprimir y observar: No se trata de poner la mente en blanco (eso es imposible y contraproducente), sino de ser el espacio espacioso donde los pensamientos van y vienen sin que te subas a ellos.",
          "El ancla táctil: La respiración en el punto de contacto de las fosas nasales o el labio superior sirve como el ancla de un navío frente al oleaje."
        ],
        instructions: [
          "1. Postura noble: Siéntate con la espalda recta pero sin rigidez, los hombros relajados y las manos reposando sobre el regazo.",
          "2. Encuentra tu anclaje: Siente el roce fresco del aire al inhalar y el aire tibio al exhalar en la entrada de las fosas nasales.",
          "3. Cuando te distraigas (porque te vas a distraer): No te enfades ni te juzgues. En el segundo exacto en que te das cuenta de que te fuiste a un recuerdo o preocupación, ¡celébralo! Ese instante de darte cuenta es la atención plena pura. Suelta con amabilidad y regresa al ancla.",
          "4. Los dos desvíos: Si hay agitación (la mente salta a mil proyectos), exhala largo y relaja la mirada. Si hay letargo (pesadez o sueño), endereza la columna y toma tres respiraciones profundas."
        ],
        videoSuggestion: "Recomendado en YouTube: «Cómo Aprender a Meditar desde Cero - Lama Rinchen Gyaltsen» en el canal Paramita."
      },
      {
        id: "rinchen-lojong",
        title: "Antídoto contra la ira y la reactividad: La pausa sagrada de tres respiraciones",
        category: "Gestión Emocional & Templanza",
        readTime: "5 min de estudio",
        summary: "Entre el agravio exterior y tu reacción existe un milisegundo de libertad donde decides ser un esclavo del impulso o un soberano de tu virtud.",
        keyPoints: [
          "El fuego de la ira: La ira es como agarrar una brasa ardiente con la mano desnuda para arrojársela a otro; el primero en consumirse en quemaduras eres tú.",
          "La narrativa del ego: El dolor o la ofensa dura un instante, pero el sufrimiento dura días porque la mente reproduce la película una y otra vez justificando su rencor.",
          "La pausa de las tres respiraciones: Reconocer la primera chispa antes de que el fuego se convierta en un incendio somático incontrolable."
        ],
        instructions: [
          "1. Detecta la alarma física: La ira y la molestia siempre avisan primero en el cuerpo (nudo en el estómago, calor en el cuello, mandíbula apretada).",
          "2. Pon la etiqueta neutra: Di mentalmente: 'Hay tensión en el cuerpo', en lugar de 'Estoy furioso'.",
          "3. Aplica la pausa de 3 respiraciones: Inhala por la nariz y exhala con un suave suspiro soltando los hombros antes de responder cualquier mensaje o llamada.",
          "4. Pregunta del Caballero Jaguar: ¿Esta respuesta mía nace de la templanza y la soberanía, o del ego herido?"
        ],
        videoSuggestion: "Recomendado en YouTube: «Cómo transformar la ira y el enojo - Lama Rinchen Gyaltsen» en Paramita."
      }
    ]
  },

  mingyur_rinpoche: {
    id: "mingyur_rinpoche",
    name: "Yongey Mingyur Rinpoche",
    vivo: true,
    badgeText: "VIVO • CANAL ACTIVO",
    icon: "🏔️",
    tradition: "Tergar / Neurociencia & Conciencia Abierta",
    channelName: "Tergar en español (@tergarespanol)",
    channelUrl: "https://www.youtube.com/@tergarespanol",
    webUrl: "https://espanol.tergar.org",
    quote: "El mono de la mente nunca se calmará si le ordenas que se calle. Dale un trabajo: pídele que observe la respiración o escuche los sonidos.",
    bio: "Maestro tibetano y autor del bestseller 'La alegría de vivir'. Colaborador pionero con neurocientíficos de renombre internacional. Su método desmitifica la meditación y enseña a convivir en paz con la mente moderna, la ansiedad y el estrés diario.",
    defaultMins: 12,
    techKey: "conciencia",
    techName: "Conciencia Abierta & El Mono Mental",
    articles: [
      {
        id: "mingyur-mono",
        title: "Hacerte amigo del mono de la mente: Meditar con la distracción y el ruido",
        category: "Neurociencia & Calma",
        readTime: "4 min de estudio",
        summary: "La mente mono no es tu enemiga. Querer obligarla a quedarse inmóvil genera más ansiedad; la clave es darle una tarea simple.",
        keyPoints: [
          "La mente mono: Nuestra mente siempre quiere moverse, curiosear y buscar estímulos. Querer forzarla al silencio absoluto es como intentar aplanar el agua turbulenta con una pala: solo crearás más olas.",
          "Darle un trabajo al mono: En vez de decirle '¡no pienses!', dile '¡oye mono, mira cómo entra el aire!' o '¡oye mono, escucha el sonido de los coches afuera!'.",
          "Cualquier cosa sirve de soporte: Sonidos, sensaciones físicas, olores... nada es un estorbo para la presencia."
        ],
        instructions: [
          "1. Descansa en la conciencia ordinaria: Siéntate cómodamente. No persigas ningún estado especial ni místico.",
          "2. Meditación con sonidos: Cierra los ojos o déjalos entreabiertos. Escucha todos los sonidos a tu alrededor. No los juzgues; úsalos como vehículo para estar presente.",
          "3. Meditar con los pensamientos: Cuando surja una preocupación o plan futuro, obsérvalo como un espectador en la orilla de un río viendo pasar ramas flotantes.",
          "4. El principio de oro: 'Poco tiempo, muchas veces'. Es infinitamente superior meditar 3 minutos con frescura 4 veces al día, que luchar media hora exhausto."
        ],
        videoSuggestion: "Recomendado en YouTube: «Hazte amigo de tu mente mono - Yongey Mingyur Rinpoche» en Tergar en español."
      },
      {
        id: "mingyur-ansiedad",
        title: "Meditar con el pánico y la ansiedad: De enemigo a maestro",
        category: "Regulación Somática",
        readTime: "5 min de estudio",
        summary: "La ansiedad es una tormenta en el cielo, pero tu conciencia es el cielo mismo. El cielo jamás es quemado ni destruido por el rayo.",
        keyPoints: [
          "La experiencia personal: Mingyur sufrió ataques de pánico y fobia social durante su adolescencia, hasta que dejó de huir del miedo y aprendió a sentarse con él.",
          "La frase de bienvenida: 'Hola, ansiedad, bienvenida. ¿Qué vienes a enseñarme hoy?'.",
          "El espacio interior: Cuando miras el pánico desde la curiosidad y no desde la resistencia, pierde su carga dramática."
        ],
        instructions: [
          "1. Baja al cuerpo físico: Cuando sientas opresión o taquicardia, no debatas con los pensamientos catastróficos. Lleva la atención a la sensación pura en el pecho o estómago.",
          "2. Examina la textura: ¿Es fría o caliente? ¿Punzante o pesada? ¿Se mueve o está estática? Obsérvala como un científico amable.",
          "3. Permite que exista: No luches por eliminarla. Permítele estar ahí unos minutos.",
          "4. Reconoce el testigo: Nota que la parte de ti que observa la ansiedad está completamente en paz."
        ],
        videoSuggestion: "Recomendado en YouTube: «Cómo superé mis ataques de pánico con meditación - Mingyur Rinpoche»."
      }
    ]
  },

  marco_aurelio: {
    id: "marco_aurelio",
    name: "Marco Aurelio",
    vivo: false,
    badgeText: "MAESTRO CLÁSICO • ESTOICISMO",
    icon: "🏛️",
    tradition: "Filosofía Estoica Clásica (Stoa Romana)",
    channelName: "Códice Meditaciones (Hypomnémata)",
    channelUrl: "#tab-lectura",
    webUrl: "",
    quote: "Tienes poder sobre tu mente, no sobre los acontecimientos externos. Comprende esto y hallarás una fuerza invencible.",
    bio: "Emperador de Roma y filósofo estoico. Redactó sus Meditaciones en las tiendas de campaña del Danubio como un códice de combate espiritual: recordatorios innegociables sobre el autodominio, la impermanencia, el desprecio por la vanidad y la serenidad soberana.",
    defaultMins: 15,
    techKey: "estoica",
    techName: "Quietud Estoica & La Ciudadela Interior",
    articles: [
      {
        id: "marcus-ciudadela",
        title: "La Ciudadela Interior: El retiro soberano dentro de la propia alma",
        category: "Estoicismo & Autodominio",
        readTime: "4 min de estudio",
        summary: "Ningún retiro en el campo o en las montañas es más tranquilo y libre de turbulencias que el que un hombre encuentra dentro de su propia mente en orden.",
        keyPoints: [
          "El error de buscar escapes externos: Los hombres buscan retiros en playas o casas de campo, pero puedes retirarte dentro de ti mismo en cualquier momento del día.",
          "La mente en orden: En ningún lugar un hombre encuentra un retiro más plácido y sereno que en su propia alma.",
          "Los dos principios breves: 1) Las cosas externas no tocan el alma; permanecen inmóviles afuera. Toda perturbación nace únicamente de tu juicio interno. 2) El cosmos es cambio incesante; nuestra vida es lo que nuestros pensamientos forjan de ella."
        ],
        instructions: [
          "1. La pausa de la Ciudadela: Siéntate en silencio erguido. Respira lento y profundo.",
          "2. Desnuda los hechos: Toma la situación que hoy te molestó y descríbela sin dramatismo ni adjetivos teatrales del ego.",
          "3. Aplica la dicotomía del control: Pregúntate con honestidad: '¿Depende de mí o no depende de mí?'. Si no depende de ti, no merece ni un solo segundo de tu angustia.",
          "4. Levanta el puente levadizo: Mantén tu dignidad, templanza y palabra impecables frente a cualquier provocación externa."
        ],
        videoSuggestion: "Lectura complementaria: Meditaciones, Libro IV, fragmento 3 («Acostumbran a buscarse retiros...»)."
      },
      {
        id: "marcus-vista-arriba",
        title: "La Vista desde Arriba: Perspectiva cósmica para disolver la angustia",
        category: "Cosmovisión & Impermanencia",
        readTime: "4 min de estudio",
        summary: "Eleva tu mirada por encima del plano terrenal. Contempla la inmensidad del tiempo y la pequeñez de los agravios cotidianos.",
        keyPoints: [
          "Elevación de la conciencia: Imagina elevarte por encima de tu ciudad y del continente entero, viendo a la humanidad entera en su afán cotidiano.",
          "La brevedad del instante: Todo lo que hoy nos parece grave o desesperante quedará en cenizas y olvido en unas pocas generaciones.",
          "Amor Fati: No exijas que los hechos sucedan como deseas; acéptalos como son y tu alma permanecerá libre y serena."
        ],
        instructions: [
          "1. Cierra los ojos y ancla tu respiración profunda en cuatro tiempos.",
          "2. Visualiza tu habitación alejándose, luego tu ciudad, tu país y la esfera azul de la Tierra flotando en el cosmos infinito.",
          "3. Contempla los miles de millones de almas que nacen, se afanan y parten en este mismo instante.",
          "4. Vuelve suavemente a tu cuerpo sintiendo una inmensa ligereza: tus problemas actuales son solo motas de polvo en la eternidad."
        ],
        videoSuggestion: "Lectura complementaria: Meditaciones, Libro IX, fragmento 30 («Mira desde arriba las innumerables tropas...»)."
      }
    ]
  },

  eckhart_tolle: {
    id: "eckhart_tolle",
    name: "Eckhart Tolle",
    vivo: true,
    badgeText: "VIVO • CANAL ACTIVO",
    icon: "🕯️",
    tradition: "Presencia & No-Dualidad Contemporánea",
    channelName: "Eckhart Tolle en Español (@eckhartolles)",
    channelUrl: "https://www.youtube.com/@eckhartolles",
    webUrl: "https://www.eckharttolle.com",
    quote: "La causa principal del sufrimiento nunca es la situación en sí, sino tus pensamientos incesantes sobre ella.",
    bio: "Autor de 'El poder del ahora' y 'Una nueva tierra'. Su mensaje apunta con precisión directa a desactivar el parloteo compulsivo de la mente pensante, desarmar el cuerpo del dolor emocional y anclarse en la presencia viva del presente.",
    defaultMins: 10,
    techKey: "presencia",
    techName: "Presencia en el Cuerpo Interior",
    articles: [
      {
        id: "tolle-cuerpo-interior",
        title: "El Cuerpo Interior: Cómo apagar el sobrepensamiento en 60 segundos",
        category: "Presencia & Conciencia Somática",
        readTime: "4 min de estudio",
        summary: "No puedes estar atrapado en un bucle mental de rumiación si la mitad de tu atención está sintiendo la vida que late en tus manos y en tu pecho.",
        keyPoints: [
          "La fuga de energía al córtex: La mente sobrepiensa compulsivamente porque toda tu energía vital está atrapada en pensamientos abstractos, desconectada del organismo.",
          "La puerta de acceso somática: Sentir el campo de energía sutil del cuerpo apaga instantáneamente la rumiación.",
          "El ancla invisible: Habitar tu cuerpo físico te vuelve invulnerable ante el drama ajeno y las provocaciones."
        ],
        instructions: [
          "1. Cierra los ojos y pregúntate sin mover los dedos: '¿Cómo sé que mis manos tienen vida?'. Notarás de inmediato un suave hormigueo o calor sutil.",
          "2. Expande esa sensación a los antebrazos, a la planta de los pies, al pecho y al vientre.",
          "3. Siente el cuerpo como un campo unificado de presencia viva.",
          "4. Mantén al menos un 10% de esta atención dentro del cuerpo mientras conversas, caminas o trabajas frente a la pantalla."
        ],
        videoSuggestion: "Recomendado en YouTube: «Sentir el cuerpo interior para detener el sobrepensamiento - Eckhart Tolle en Español»."
      }
    ]
  },

  dokusho_villalba: {
    id: "dokusho_villalba",
    name: "Dokushô Villalba",
    vivo: true,
    badgeText: "VIVO • CANAL ACTIVO",
    icon: "🪷",
    tradition: "Budismo Soto Zen (Templo Luz Serena)",
    channelName: "Comunidad Budista Soto Zen",
    channelUrl: "https://www.youtube.com/@ComunidadBudistaSotoZen",
    webUrl: "https://sotozen.es",
    quote: "Zazen no es una técnica para llegar a ninguna parte; es la expresión del reposo en tu verdadera naturaleza aquí y ahora.",
    bio: "Primer maestro zen español ordenado en Japón por Moriyama Roshi en la tradición Soto Zen, fundador de la Comunidad Budista Soto Zen y del templo Luz Serena. Enseña un Zazen puro, riguroso y enraizado en la sobriedad cotidiana.",
    defaultMins: 20,
    techKey: "zazen",
    techName: "Zazen (Shikantaza / Solo Sentarse)",
    articles: [
      {
        id: "dokusho-shikantaza",
        title: "Shikantaza: El arte de simplemente sentarse en silencio puro",
        category: "Soto Zen Puro",
        readTime: "4 min de estudio",
        summary: "Sentarse sin esperar nada a cambio. Sin buscar iluminación ni beneficios: la postura misma es la realización de la quietud.",
        keyPoints: [
          "Sin afán de lucro (Mushotoku): En el mundo moderno todo se hace con un interés posterior. En Zazen te sientas por la dignidad misma de sentarte.",
          "La postura como templo: Espalda erguida, coronilla empujando el cielo, barbilla recogida. Cuando el cuerpo está alineado, la mente se pacifica de manera natural.",
          "Ni retener ni empujar: Deja que los pensamientos desfilen como sombras en un espejo que no retiene nada."
        ],
        instructions: [
          "1. Siéntate sobre un cojín o silla firme con la espalda recta y separada del respaldo.",
          "2. Mudra Cósmico: Mano izquierda sobre la palma derecha, las yemas de los pulgares tocándose suavemente formando una elipse horizontal.",
          "3. Ojos entreabiertos mirando en un ángulo de 45 grados hacia el suelo, sin fijar la mirada en ningún objeto.",
          "4. Respira silenciosamente desde el bajo vientre (Tanden). Permanece inmóvil en solemne vigilia."
        ],
        videoSuggestion: "Recomendado en YouTube: «Instrucciones para la práctica de Zazen - Dokushô Villalba»."
      }
    ]
  }
};

let activeMentorKey = "lama_rinchen";
let activeArticleIndex = 0;

function getStudiedArticlesList() {
  try {
    const raw = localStorage.getItem("JAGUAR_MENTORES_ESTUDIADOS");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isArticleStudied(artId) {
  const list = getStudiedArticlesList();
  return list.includes(artId);
}

function selectMentor(mentorKey) {
  if (MENTORES_ESPIRITUALIDAD_DATA[mentorKey]) {
    activeMentorKey = mentorKey;
    activeArticleIndex = 0;
    renderMentoresEspiritualidad();
  }
}
window.selectMentor = selectMentor;

function selectMentorArticle(index) {
  activeArticleIndex = parseInt(index) || 0;
  renderMentoresEspiritualidad();
}
window.selectMentorArticle = selectMentorArticle;

function markArticleAsStudied(artId, mentorKey) {
  const mentor = MENTORES_ESPIRITUALIDAD_DATA[mentorKey];
  if (!mentor) return;
  const art = mentor.articles[activeArticleIndex];
  if (!art) return;

  let list = getStudiedArticlesList();
  if (!list.includes(artId)) {
    list.push(artId);
    localStorage.setItem("JAGUAR_MENTORES_ESTUDIADOS", JSON.stringify(list));

    if (typeof window.awardXP === "function") {
      window.awardXP(30, `Estudio Contemplativo: ${art.title.slice(0, 45)}...`, "espiritualidad");
    } else if (window.CaballeroScoringEngine && typeof window.CaballeroScoringEngine.awardXP === "function") {
      window.CaballeroScoringEngine.awardXP("espiritualidad", 30, `Estudio Contemplativo: ${art.title.slice(0, 45)}...`);
    }

    if (typeof showNotification === "function") {
      showNotification(`📜 Aprendizaje consagrado: +30 XP al Aura de Espiritualidad.`);
    }
  }

  renderMentoresEspiritualidad();
}
window.markArticleAsStudied = markArticleAsStudied;

function startMentorPractice(mentorKey) {
  const mentor = MENTORES_ESPIRITUALIDAD_DATA[mentorKey];
  if (!mentor) return;

  if (typeof showNotification === "function") {
    showNotification(`🧘 Preparando práctica de ${mentor.name} (${mentor.defaultMins} min)...`);
  }

  const ringContainer = document.getElementById("meditation-ring");
  if (ringContainer) {
    ringContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (typeof startMeditationSession === "function") {
    startMeditationSession(mentor.defaultMins, mentor.techKey);
  }
}
window.startMentorPractice = startMentorPractice;

function renderMentoresEspiritualidad() {
  const container = document.getElementById("mentores-espiritualidad-root");
  if (!container) return;

  const currentMentor = MENTORES_ESPIRITUALIDAD_DATA[activeMentorKey] || MENTORES_ESPIRITUALIDAD_DATA.lama_rinchen;
  const articles = currentMentor.articles || [];
  const currentArticle = articles[activeArticleIndex] || articles[0];
  const studied = currentArticle ? isArticleStudied(currentArticle.id) : false;

  const studiedCount = getStudiedArticlesList().length;

  container.innerHTML = `
    <div class="jaguar-card card-highlight" style="margin-top: 26px; border-color: rgba(212, 175, 55, 0.45); background: linear-gradient(145deg, rgba(19, 21, 29, 0.98) 0%, rgba(13, 14, 20, 0.98) 100%);">
      
      <!-- CABECERA DE LA SECCIÓN -->
      <div class="card-title-bar" style="border-bottom: 1.5px solid rgba(212, 175, 55, 0.3); padding-bottom: 14px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge-tag badge-gold">🕯️ CÓDICE DE SABIDURÍA CONTEMPLATIVA</span>
            <span class="badge-tag badge-emerald">${studiedCount} Lecciones Estudiadas</span>
          </div>
          <h2 class="card-title" style="font-size: 1.6rem; margin: 0; color: #FFF; font-family: 'Cinzel', serif;">
            Mentores de Quietud & Estudio de Aprendizajes
          </h2>
          <p style="font-size: 0.88rem; color: #CBD5E1; margin: 4px 0 0 0;">
            Maestros contemporáneos con canales activos y el emperador estoico de la Ciudadela Interior. Lee, estudia y practica su técnica.
          </p>
        </div>
        <div>
          <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="startMentorPractice('${currentMentor.id}')" style="font-weight: bold; color: #0E0905;">
            🧘 Meditar con ${currentMentor.name.split(' ')[0]} (${currentMentor.defaultMins} min)
          </button>
        </div>
      </div>

      <!-- SELECTOR VISUAL DE MENTORES (CARDS HORIZONTALES) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 22px;">
        ${Object.keys(MENTORES_ESPIRITUALIDAD_DATA).map(key => {
          const m = MENTORES_ESPIRITUALIDAD_DATA[key];
          const isSelected = (key === activeMentorKey);
          return `
            <div onclick="selectMentor('${key}')" style="
              cursor: pointer;
              background: ${isSelected ? 'linear-gradient(135deg, rgba(197,154,40,0.22) 0%, rgba(26,20,10,0.9) 100%)' : 'rgba(255,255,255,0.03)'};
              border: 1.5px solid ${isSelected ? '#D4AF37' : 'rgba(255,255,255,0.08)'};
              border-radius: 10px;
              padding: 14px;
              transition: all 0.2s ease;
              box-shadow: ${isSelected ? '0 0 16px rgba(212,175,55,0.25)' : 'none'};
            ">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span style="font-size: 1.6rem;">${m.icon}</span>
                <div>
                  <h4 style="margin: 0; font-size: 0.95rem; color: ${isSelected ? '#FFD700' : '#FFF'}; font-family: 'Cinzel', serif;">${m.name}</h4>
                  <span style="font-size: 0.72rem; color: #94A3B8; display: block;">${m.tradition.split('(')[0].trim()}</span>
                </div>
              </div>
              <div style="margin-top: 6px;">
                <span class="badge-tag ${m.vivo ? 'badge-emerald' : 'badge-cyan'}" style="font-size: 0.68rem; padding: 2px 6px;">
                  ${m.badgeText}
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- FICHA DETALLADA DEL MENTOR ACTIVO -->
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.2); border-radius: 10px; padding: 18px; margin-bottom: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 2.2rem;">${currentMentor.icon}</span>
              <div>
                <h3 style="margin: 0; font-size: 1.4rem; color: #FFD700; font-family: 'Cinzel', serif;">${currentMentor.name}</h3>
                <span style="font-size: 0.82rem; color: #94A3B8;">${currentMentor.tradition}</span>
              </div>
            </div>
            <p style="font-size: 0.9rem; color: #E2E8F0; line-height: 1.5; margin: 10px 0 12px 0;">
              ${currentMentor.bio}
            </p>
            <div style="background: rgba(212,175,55,0.08); border-left: 3px solid #D4AF37; padding: 10px 14px; border-radius: 4px; font-style: italic; color: #F8FAFC; font-size: 0.88rem;">
              "${currentMentor.quote}"
            </div>
          </div>

          <!-- ENLACES OFICIALES Y ACCIONES -->
          <div style="display: flex; flex-direction: column; gap: 8px; min-width: 230px;">
            <span style="font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Recursos Oficiales:</span>
            ${currentMentor.channelUrl.startsWith('http') ? `
              <a href="${currentMentor.channelUrl}" target="_blank" rel="noopener noreferrer" class="btn-jaguar btn-sm btn-secondary-dark" style="display: flex; align-items: center; gap: 6px; text-decoration: none; justify-content: center; font-size: 0.8rem; border-color: rgba(255,0,0,0.4);">
                🔴 Canal YouTube: ${currentMentor.channelName} ↗
              </a>
            ` : `
              <button onclick="selectMainTab('lectura')" class="btn-jaguar btn-sm btn-secondary-dark" style="font-size: 0.8rem;">
                🏛️ Abrir en Biblioteca Estoica
              </button>
            `}
            ${currentMentor.webUrl ? `
              <a href="${currentMentor.webUrl}" target="_blank" rel="noopener noreferrer" class="btn-jaguar btn-sm btn-secondary-dark" style="display: flex; align-items: center; gap: 6px; text-decoration: none; justify-content: center; font-size: 0.8rem;">
                🌐 Web & Cursos Gratuitos ↗
              </a>
            ` : ''}
            <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="startMentorPractice('${currentMentor.id}')" style="font-weight: 800; color: #0E0905; font-size: 0.82rem; margin-top: 4px;">
              ⏱️ Iniciar ${currentMentor.techName}
            </button>
          </div>
        </div>
      </div>

      <!-- SELECTOR DE ARTÍCULOS / LECCIONES DEL MENTOR -->
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h4 style="margin: 0; font-size: 1.05rem; color: #FFF; font-family: 'Cinzel', serif;">
            📖 Lecciones y Artículos de Estudio (${articles.length})
          </h4>
          <span style="font-size: 0.78rem; color: #94A3B8;">Haz clic para estudiar</span>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${articles.map((art, idx) => {
            const isArtActive = (idx === activeArticleIndex);
            const isArtStudied = isArticleStudied(art.id);
            return `
              <button onclick="selectMentorArticle(${idx})" style="
                background: ${isArtActive ? 'linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(30,22,12,0.95) 100%)' : 'rgba(255,255,255,0.04)'};
                border: 1px solid ${isArtActive ? '#D4AF37' : 'rgba(255,255,255,0.1)'};
                color: ${isArtActive ? '#FFF' : '#CBD5E1'};
                padding: 8px 14px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.82rem;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s;
              ">
                <span>${isArtStudied ? '✅' : '📄'}</span>
                <span><strong>Lección ${idx + 1}:</strong> ${art.title.slice(0, 32)}...</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- VISOR DEL ARTÍCULO ACTIVO -->
      ${currentArticle ? `
        <div style="background: rgba(0, 0, 0, 0.4); border: 1.5px solid rgba(212, 175, 55, 0.35); border-radius: 10px; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                <span class="badge-tag badge-pink" style="font-size: 0.72rem;">${currentArticle.category}</span>
                <span class="badge-tag badge-gold" style="font-size: 0.72rem;">⏱️ ${currentArticle.readTime}</span>
                ${studied ? `<span class="badge-tag badge-emerald" style="font-size: 0.72rem;">✓ ESTUDIADO</span>` : ''}
              </div>
              <h3 style="margin: 0; font-size: 1.35rem; color: #FFF; font-family: 'Cinzel', serif; line-height: 1.3;">
                ${currentArticle.title}
              </h3>
              <p style="font-size: 0.88rem; color: #D4AF37; margin: 4px 0 0 0; font-style: italic;">
                "${currentArticle.summary}"
              </p>
            </div>
            <div>
              ${studied ? `
                <button class="btn-jaguar btn-sm btn-secondary-dark" style="color: #10B981; border-color: #10B981; cursor: default;">
                  ✅ Aprendizaje Registrado (+30 XP)
                </button>
              ` : `
                <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="markArticleAsStudied('${currentArticle.id}', '${currentMentor.id}')" style="font-weight: bold; color: #0E0905;">
                  ✨ Marcar como Estudiado (+30 XP)
                </button>
              `}
            </div>
          </div>

          <!-- CLAVES DEL APRENDIZAJE -->
          <div style="margin-bottom: 18px;">
            <h5 style="color: #FFD700; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.82rem; margin: 0 0 8px 0;">
              💡 Conceptos Clave de la Enseñanza:
            </h5>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${currentArticle.keyPoints.map(kp => `
                <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #D4AF37; padding: 10px 14px; border-radius: 4px; font-size: 0.88rem; color: #E2E8F0; line-height: 1.5;">
                  ${kp}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- INSTRUCCIÓN PRÁCTICA PASO A PASO -->
          <div style="margin-bottom: 18px;">
            <h5 style="color: #00E5FF; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.82rem; margin: 0 0 8px 0;">
              🧘 Aplicación Práctica en tu Sesión:
            </h5>
            <div style="background: rgba(0, 229, 255, 0.04); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
              ${currentArticle.instructions.map(inst => `
                <div style="font-size: 0.88rem; color: #F1F5F9; line-height: 1.5;">
                  ${inst}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SUGERENCIA MULTIMEDIA & BOTÓN FINAL -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
            <span style="font-size: 0.82rem; color: #94A3B8;">
              📺 ${currentArticle.videoSuggestion}
            </span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="startMentorPractice('${currentMentor.id}')" style="font-weight: 800; color: #0E0905;">
                ▶️ Practicar Ahora con el Temporizador (${currentMentor.defaultMins} min)
              </button>
            </div>
          </div>

        </div>
      ` : ''}

    </div>
  `;
}
window.renderMentoresEspiritualidad = renderMentoresEspiritualidad;

// Auto-inicialización al cargar el documento
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderMentoresEspiritualidad();
  });
} else {
  renderMentoresEspiritualidad();
}
