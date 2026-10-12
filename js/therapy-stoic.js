/**
 * ============================================================================
 * TERAPIA ESTOICA — acompañamiento filosófico con memoria acumulativa
 * ============================================================================
 * - Protocolo socrático estoico por pasos: hechos → juicio → dicotomía del
 *   control → reencuadre → acción mínima virtuosa → cierre.
 * - TODAS las conversaciones se guardan (CJ_THERAPY_V1) y tras cada sesión se
 *   actualiza un CONSOLIDADO (temas recurrentes, juicios, compromisos,
 *   tendencia de intensidad) que alimenta la siguiente sesión.
 * - Funciona sin conexión con el protocolo local. Opcional: pegar una clave de
 *   Gemini en Ajustes para conversación libre (la clave queda SOLO en este
 *   navegador, nunca en el código ni en GitHub).
 * - No sustituye a un profesional de la salud mental.
 */
(function (window) {
  "use strict";

  const KEY = "CJ_THERAPY_V1";

  // ------------------------------------------------------------------ DATOS
  const QUOTES = {
    general: [
      { t: "No nos perturban las cosas, sino los juicios que hacemos sobre ellas.", a: "Epicteto, Enquiridión 5" },
      { t: "Algunas cosas dependen de nosotros y otras no dependen de nosotros.", a: "Epicteto, Enquiridión 1" },
      { t: "Lo que se interpone en el camino se convierte en el camino.", a: "Marco Aurelio, Meditaciones 5.20" }
    ],
    impulso: [
      { t: "Cuando recibas una impresión placentera, no te dejes arrastrar; hazla esperar un poco y compara el momento del goce con el del arrepentimiento.", a: "Epicteto, Enquiridión 34 (paráfrasis)" },
      { t: "El alma se tiñe del color de sus pensamientos.", a: "Marco Aurelio, Meditaciones 5.16" }
    ],
    ira: [
      { t: "El mayor remedio de la ira es la dilación.", a: "Séneca, De la ira II" },
      { t: "Si algo externo te causa pena, no es ello lo que te perturba sino tu juicio sobre ello; y está en tu mano borrarlo.", a: "Marco Aurelio, Meditaciones 8.47 (paráfrasis)" }
    ],
    ansiedad: [
      { t: "Sufrimos más a menudo en la imaginación que en la realidad.", a: "Séneca, Cartas a Lucilio 13" },
      { t: "Concéntrate en lo que depende de ti y lo demás déjalo ir.", a: "Epicteto, Enquiridión 1 (paráfrasis)" }
    ],
    tristeza: [
      { t: "Nunca digas de nada «lo he perdido», sino «lo he devuelto».", a: "Epicteto, Enquiridión 11" },
      { t: "Permite que el dolor sea sentido y luego pregúntate qué virtud te pide esta situación.", a: "Práctica estoica (síntesis)" }
    ],
    relaciones: [
      { t: "Hoy me encontraré con entrometidos, ingratos y arrogantes; actúan así por ignorancia del bien y del mal.", a: "Marco Aurelio, Meditaciones 2.1 (paráfrasis)" },
      { t: "La mejor venganza es no ser como quien te hizo daño.", a: "Marco Aurelio, Meditaciones 6.6" }
    ],
    trabajo: [
      { t: "No gastes más tiempo discutiendo cómo debe ser un buen hombre. Sé uno.", a: "Marco Aurelio, Meditaciones 10.16" },
      { t: "No es que tengamos poco tiempo, sino que perdemos mucho.", a: "Séneca, De la brevedad de la vida" }
    ],
    autoexigencia: [
      { t: "Si fallas, no te desanimes ni te impacientes: vuelve de nuevo a tu principio.", a: "Marco Aurelio, Meditaciones 5.9 (paráfrasis)" }
    ],
    soledad: [
      { t: "Estar solo no es lo mismo que estar abandonado: cuenta con la buena compañía de tu propia razón.", a: "Epicteto, Disertaciones 3.13 (paráfrasis)" }
    ],
    procrastinacion: [
      { t: "No es que tengamos poco tiempo, sino que perdemos mucho.", a: "Séneca, De la brevedad de la vida" },
      { t: "Al amanecer, piensa: me levanto para hacer el trabajo de un ser humano.", a: "Marco Aurelio, Meditaciones 5.1 (paráfrasis)" }
    ]
  };

  const THEMES = {
    impulso: {
      name: "Impulsos y autodominio",
      kw: ["porno", "recaída", "recaida", "impulso", "tentación", "tentacion", "adicción", "adiccion", "pantalla", "redes", "scroll", "vicio", "craving", "ganas de", "masturb", "alcohol", "fumar"],
      judgmentQ: "¿Qué te dice la voz del impulso? (por ejemplo «solo una vez», «lo necesito», «ya fallé hoy»). Escríbela tal cual, como si fuera otra persona hablándote.",
      controlQ: "Separemos: ¿qué parte de esto depende de ti AHORA MISMO (dónde estás, qué haces en los próximos 10 minutos, a quién escribes) y qué parte no (que aparezca la urgencia)?",
      reframe: "El impulso es una *impresión*, no una orden. Epicteto recomendaba hacerla esperar: nombrarla («eres una impresión, no lo que representas») y comparar el placer breve con lo que sientes después. Tu libertad no está en que el impulso no aparezca, sino en lo que haces durante los siguientes 10 minutos.",
      practice: "regla de 10 minutos: cambia de lugar, agua fría o 20 flexiones, y recién entonces decide"
    },
    ira: {
      name: "Ira y conflicto",
      kw: ["rabia", "enojo", "ira", "furia", "molest", "discusi", "pelea", "me irrita", "harto", "odio", "injusto"],
      judgmentQ: "¿Qué crees que «debería» haber hecho la otra persona (o la situación)? Escribe la frase con «debería».",
      controlQ: "Tu reacción depende de ti; la conducta del otro no. ¿Qué parte de este conflicto sí puedes decidir (tu respuesta, tu límite, el momento de hablar)?",
      reframe: "La ira nace del juicio «esto no debería ser así». Séneca propone la dilación: no actuar en el pico. Puedes mantener tu límite con firmeza sin el veneno de la rabia; la virtud aquí es la justicia serena, no la venganza.",
      practice: "esperar 24 horas antes de responder y escribir primero la carta que no enviarás"
    },
    ansiedad: {
      name: "Ansiedad y futuro",
      kw: ["ansiedad", "ansioso", "miedo", "preocup", "nervio", "angustia", "pánico", "panico", "estrés", "estres", "futuro", "incertidumbre", "qué pasará", "que pasara"],
      judgmentQ: "¿Cuál es el peor escenario que tu mente está proyectando? Escríbelo con la mayor concreción posible.",
      controlQ: "De ese escenario: ¿qué parte puedes preparar o decidir HOY, y qué parte es totalmente ajena a tu control?",
      reframe: "Séneca: sufrimos más en la imaginación que en la realidad. La *premeditatio malorum* no es pesimismo: ensayas el peor caso para perderle el miedo y preparar una respuesta. Lo que sigue es devolverte al presente: la acción que sí controlas.",
      practice: "escribir el peor caso, tu plan B concreto, y luego una acción de 15 minutos sobre lo controlable"
    },
    tristeza: {
      name: "Pérdida, tristeza y duelo",
      kw: ["triste", "tristeza", "pérdida", "perdida", "duelo", "llor", "vacío", "vacio", "murió", "murio", "extraño a", "echo de menos", "depres", "desánimo", "desanimo"],
      judgmentQ: "¿Qué historia te cuentas sobre lo que perdiste o lo que sientes? (por ejemplo «nunca volverá», «es mi culpa», «no puedo seguir»).",
      controlQ: "Hay lo que ya ocurrió (fuera de tu control) y lo que puedes hacer con tu duelo hoy (honrarlo, pedir compañía, cuidarte). ¿Qué te gustaría escoger?",
      reframe: "El estoicismo no pide no sentir: pide no añadir un segundo sufrimiento con juicios catastróficos. Epicteto: lo que perdemos lo hemos «devuelto». Puedes llorar y a la vez cultivar gratitud por lo recibido.",
      practice: "escribir 3 cosas que recibiste de lo perdido y compartirlas con alguien de confianza"
    },
    relaciones: {
      name: "Pareja y vínculos",
      kw: ["pareja", "novia", "novio", "relación", "relacion", "amor", "celos", "ex ", "familia", "amigo", "comunicación", "comunicacion", "intimidad", "apego"],
      judgmentQ: "¿Qué interpretación estás haciendo de lo que hizo o dijo la otra persona? Sepárala de lo que realmente se observó.",
      controlQ: "No controlas lo que siente o decide el otro; sí controlas lo que comunicas, tus límites y tu conducta. ¿Qué podrías pedir o ofrecer con claridad?",
      reframe: "Marco Aurelio recomendaba asumir que el otro actúa desde su propia ignorancia o herida, sin eximirte de poner límites. La virtud relacional es la justicia y la benevolencia: decir la verdad con cuidado y sin exigir que el otro sea distinto.",
      practice: "una conversación breve esta semana usando «Cuando pasa X, siento Y, necesito Z»"
    },
    trabajo: {
      name: "Trabajo, tesis y dinero",
      kw: ["trabajo", "tesis", "empleo", "dinero", "deuda", "plazo", "jefe", "entrevista", "proyecto", "examen", "visa", "papeles", "burocracia", "ingresos"],
      judgmentQ: "¿Qué significa para ti que esto salga mal o bien? (por ejemplo «valdré menos», «habré fracasado»). Escribe la frase de significado.",
      controlQ: "Resultado (contratación, nota, plazo ajeno) frente a esfuerzo (preparación, calidad, constancia): ¿qué parte es tuya?",
      reframe: "Epicteto: el arquero controla el tiro, no que el blanco se quede quieto. Tu valor no está en el resultado externo sino en la calidad de tu esfuerzo. El obstáculo es el camino: ¿qué virtud (paciencia, coraje, templanza) te pide este desafío?",
      practice: "elegir la próxima acción de 25 minutos y hacerla antes de cualquier otra cosa"
    },
    autoexigencia: {
      name: "Culpa y autoexigencia",
      kw: ["culpa", "vergüenza", "verguenza", "fracaso", "fracasé", "fracase", "no soy suficiente", "inútil", "inutil", "arrepent", "me juzgo", "perfeccion"],
      judgmentQ: "¿Qué frase dura te dices a ti mismo? Escríbela tal cual.",
      controlQ: "El pasado no se cambia; sí se puede reparar, aprender y volver al principio. ¿Qué reparación o aprendizaje concreto te corresponde?",
      reframe: "Marco Aurelio: si fallas, no te desanimes; vuelve a tu principio. La culpa útil señala un valor y pide reparación; la autoflagelación no repara nada. Trátate como tratarías a alguien a quien quieres y exiges con justicia.",
      practice: "una reparación pequeña y concreta hoy, y una frase de autocompasión firme"
    },
    soledad: {
      name: "Soledad",
      kw: ["soledad", "solo ", "sola ", "aislado", "nadie", "sin amigos", "desconectado"],
      judgmentQ: "¿Qué crees que significa estar solo en este momento? (por ejemplo «no le importo a nadie»).",
      controlQ: "No controlas si otros te buscan; sí controlas iniciar contacto, ir a lugares con gente y cultivar tu propia compañía. ¿Qué pequeño paso hacia otros puedes dar?",
      reframe: "Epicteto distinguía estar solo de estar abandonado: puedes estar a solas y en buena compañía de tu razón y tus valores, y a la vez es legítimo querer comunidad. La virtud social empieza por dar el primer paso con generosidad.",
      practice: "escribir hoy a una persona para proponerle algo concreto (café, caminata, llamada)"
    },
    procrastinacion: {
      name: "Procrastinación y foco",
      kw: ["procrastin", "pereza", "flojera", "no puedo empezar", "dejo para después", "distrae", "sin ganas", "desmotiv", "bloqueo"],
      judgmentQ: "¿Qué te dices para justificar esperar? («luego tendré más ganas», «no será perfecto»). Escríbelo.",
      controlQ: "No controlas las ganas; sí controlas empezar 5 minutos. ¿Cuál es el primer gesto físico mínimo de la tarea?",
      reframe: "Séneca: no tenemos poco tiempo, perdemos mucho. Marco Aurelio se levantaba recordando que era un ser humano con trabajo que hacer. La acción precede a la motivación: la virtud aquí es la diligencia.",
      practice: "temporizador de 5 minutos: empiezas y después decides si continúas"
    },
    general: {
      name: "Reflexión general",
      kw: [],
      judgmentQ: "¿Qué historia o juicio te estás contando sobre esto? Escríbelo con tus palabras.",
      controlQ: "Dividamos en dos columnas: lo que depende de ti y lo que no. ¿Qué pondrías en cada una?",
      reframe: "Epicteto: no nos perturban las cosas, sino los juicios sobre ellas. Si cambiamos el juicio, cambia la carga; y si algo depende de ti, entonces es materia de virtud y acción.",
      practice: "elegir una acción pequeña alineada con tus valores y hacerla hoy"
    }
  };

  const CRISIS_KW = ["suicid", "quitarme la vida", "no quiero vivir", "matarme", "hacerme daño", "autolesi", "cortarme", "acabar con todo"];
  const CRISIS_MSG =
    "Lo que cuentas es importante y no quiero minimizarlo. Ahora lo más valioso es que hables con una persona real, ahora mismo:\n" +
    "• España: 024 (línea de atención a la conducta suicida, 24 h) · Emergencias 112\n" +
    "• Chile: *4141 (Salud Responde) · 600 360 7777 · Emergencias 131/133\n" +
    "• Alemania: 0800 111 0 111 o 0800 111 0 222 (TelefonSeelsorge) · Emergencias 112\n" +
    "Si estás en peligro inmediato, llama a emergencias o ve a urgencias. Avisa también a alguien de confianza para que esté contigo. La filosofía acompaña, pero no sustituye ayuda profesional.";

  // ----------------------------------------------------------------- ESTADO
  let state = { v: 1, sessions: [], memory: { commitments: [], consolidated: "", updated: null }, settings: { apiKey: "", model: "gemini-2.0-flash" }, activeId: null };
  let ui = { tab: "chat", busy: false };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const p = JSON.parse(raw); if (p && Array.isArray(p.sessions)) state = Object.assign(state, p); }
    } catch (e) { console.error("[Terapia] carga:", e); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.error("[Terapia] guardado:", e); } }
  const today = () => (window.cjToday ? window.cjToday() : new Date().toISOString().slice(0, 10));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };

  function activeSession() { return state.sessions.find((s) => s.id === state.activeId && !s.closed) || null; }

  // ------------------------------------------------------------ MEMORIA
  function themeCounts() {
    const c = {};
    state.sessions.forEach((s) => { if (s.closed && s.theme) c[s.theme] = (c[s.theme] || 0) + 1; });
    return c;
  }

  function consolidate() {
    const closed = state.sessions.filter((s) => s.closed);
    const counts = themeCounts();
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, n]) => `${THEMES[k] ? THEMES[k].name : k} (${n})`);
    const withInt = closed.filter((s) => s.before != null && s.after != null);
    const avgDrop = withInt.length ? (withInt.reduce((a, s) => a + (s.before - s.after), 0) / withInt.length).toFixed(1) : null;
    const judgments = closed.map((s) => s.summary && s.summary.judgment).filter(Boolean).slice(-5);
    const learnings = closed.map((s) => s.summary && s.summary.learning).filter(Boolean).slice(-5);
    const open = state.memory.commitments.filter((c) => c.status === "abierto");
    const done = state.memory.commitments.filter((c) => c.status === "cumplido").length;

    const lines = [];
    lines.push(`# Consolidado de acompañamiento estoico (actualizado ${today()})`);
    lines.push(`- Sesiones cerradas: ${closed.length}. Temas más recurrentes: ${top.join(", ") || "aún sin datos"}.`);
    if (avgDrop !== null) lines.push(`- Alivio medio de intensidad emocional por sesión: ${avgDrop} puntos (0–10).`);
    lines.push(`- Compromisos: ${done} cumplidos · ${open.length} abiertos.`);
    if (open.length) lines.push("- Compromisos abiertos: " + open.map((c) => `«${c.text}» (${c.date})`).join("; "));
    if (judgments.length) lines.push("- Juicios/creencias recurrentes que has expresado: " + judgments.map((j) => `«${j}»`).join("; "));
    if (learnings.length) lines.push("- Lo que te ha servido: " + learnings.map((j) => `«${j}»`).join("; "));
    const last = closed.slice(-3).map((s) => `  · ${s.date} — ${THEMES[s.theme] ? THEMES[s.theme].name : "General"}: ${s.summary ? s.summary.text : ""}`);
    if (last.length) lines.push("- Últimas sesiones:\n" + last.join("\n"));

    state.memory.consolidated = lines.join("\n");
    state.memory.updated = Date.now();
  }

  function memoryBriefing() {
    if (!state.memory.consolidated) consolidate();
    return state.memory.consolidated;
  }

  // ---------------------------------------------------------- PROTOCOLO LOCAL
  function detectTheme(text) {
    const t = " " + String(text).toLowerCase() + " ";
    let best = "general", bestN = 0;
    Object.keys(THEMES).forEach((k) => {
      const n = THEMES[k].kw.reduce((a, w) => a + (t.includes(w) ? 1 : 0), 0);
      if (n > bestN) { bestN = n; best = k; }
    });
    return best;
  }

  const isYes = (t) => /\b(s[ií]|lo hice|cumpl|logr|hecho|pude|funcion)/i.test(t);
  const isNo = (t) => /\b(no |nada|fall|olvid|no pude|no lo hice)/i.test(t + " ");

  function quoteFor(theme) { const q = pick(QUOTES[theme] || QUOTES.general); return `«${q.t}» — ${q.a}`; }

  function openingMessage() {
    const open = state.memory.commitments.filter((c) => c.status === "abierto");
    const closedN = state.sessions.filter((s) => s.closed).length;
    let m = closedN === 0
      ? "Bienvenido. Aquí practicamos el estoicismo como medicina práctica: examinar los juicios, distinguir lo que depende de ti y actuar con virtud. Todo lo que conversemos queda guardado y lo iremos consolidando para no empezar de cero cada vez."
      : `Me alegra que vuelvas. Tengo presente nuestro consolidado (${closedN} sesión(es) previas).`;
    if (open.length) {
      state.pendingFollowup = open[open.length - 1].id;
      m += `\n\nAntes de empezar: la última vez te comprometiste a «${open[open.length - 1].text}». ¿Cómo te fue?`;
      return { text: m, phase: "followup" };
    }
    m += "\n\n¿Qué quieres trabajar hoy? Cuéntame con calma qué ha pasado o qué te ronda la cabeza.";
    return { text: m, phase: "facts" };
  }

  function localReply(s, userText) {
    // Crisis siempre primero
    const low = userText.toLowerCase();
    if (CRISIS_KW.some((k) => low.includes(k))) { s.crisis = true; return CRISIS_MSG; }

    const echo = clip(userText, 110);
    const T = () => THEMES[s.theme || "general"];

    switch (s.phase) {
      case "followup": {
        const c = state.memory.commitments.find((x) => x.id === state.pendingFollowup);
        let reply;
        if (c && isYes(userText) && !isNo(userText)) {
          c.status = "cumplido"; c.doneOn = today();
          if (window.awardXP) window.awardXP(20, `Compromiso estoico cumplido: ${clip(c.text, 50)}`, "espiritualidad", "therapy-commit-" + c.id);
          reply = "Eso es virtud en acción: lo convertiste en hecho. Reconócelo (+20 XP).";
        } else if (c) {
          reply = "Gracias por la honestidad. No es fracaso: es información. Mantendremos el compromiso abierto y vemos hoy qué lo hizo difícil.";
        } else reply = "Gracias por contarlo.";
        state.pendingFollowup = null;
        s.phase = "facts";
        return reply + "\n\nAhora, ¿qué quieres trabajar hoy? Cuéntame qué ha pasado, solo los hechos si puedes.";
      }
      case "facts": {
        s.theme = detectTheme(s.messages.filter((m) => m.r === "u").map((m) => m.t).join(" "));
        s.facts = clip(userText, 200);
        s.phase = "judgment";
        return `Te escucho: «${echo}».\n\nSepamos separar el hecho del relato. Veo el tema de **${T().name}**.\n\n${T().judgmentQ}`;
      }
      case "judgment": {
        s.judgment = clip(userText, 160);
        s.phase = "control";
        return `Gracias. Fíjate: eso que escribiste es un *juicio*, no un hecho. Como dice Epicteto: ${quoteFor("general")}\n\n${T().controlQ}`;
      }
      case "control": {
        s.controllable = clip(userText, 160);
        s.phase = "reframe";
        return `Bien. Eso que distingues como tuyo es tu campo de virtud: «${clip(userText, 90)}».\n\n${T().reframe}\n\n${quoteFor(s.theme || "general")}\n\n¿Qué parte de este enfoque resuena contigo y cuál te genera objeción? Sé sincero; las objeciones también sirven.`;
      }
      case "reframe": {
        s.objection = clip(userText, 160);
        s.phase = "action";
        return `Gracias por tu franqueza: «${clip(userText, 90)}».\n\nPasemos de la comprensión a la acción: una práctica sugerida es ${T().practice}.\n\n¿Cuál es UNA acción mínima, concreta y para HOY (o mañana a más tardar) que harías alineada con quien quieres ser? Escríbela en una frase.`;
      }
      case "action": {
        const text = clip(userText, 140);
        s.commitment = text;
        state.memory.commitments.push({ id: "c" + uid(), text, date: today(), status: "abierto", session: s.id });
        s.phase = "free";
        return `Anotado como compromiso: «${text}». La próxima vez empezaremos revisando cómo te fue.\n\nSi quieres seguir conversando, escribe; cuando estés listo pulsa **Cerrar sesión** para guardar el resumen y actualizar tu consolidado.`;
      }
      default: {
        // Conversación libre: preguntas socráticas
        const probes = [
          `Me quedo con esto: «${echo}». ¿Qué juicio hay detrás, y qué evidencia tienes a favor y en contra?`,
          `Si un amigo al que respetas te contara lo mismo, ¿qué le dirías? ¿Por qué no te lo dices a ti?`,
          `Imagina que pasa un año: ¿cómo verías esto desde allí? ¿Qué te alegraría haber hecho hoy?`,
          `¿Qué virtud (sabiduría, coraje, justicia o templanza) te pide esto ahora mismo, y cómo se vería en un gesto concreto?`,
          `${quoteFor(s.theme || "general")}\n\n¿Cómo se aplica esto a lo que cuentas?`
        ];
        s.probe = ((s.probe || 0) + 1);
        return probes[(s.probe - 1) % probes.length];
      }
    }
  }

  // ------------------------------------------------------------- GEMINI (opcional)
  async function llmReply(s, userText) {
    const sys =
      "Eres un acompañante filosófico estoico (Epicteto, Marco Aurelio, Séneca), cálido y directo, no un psicólogo clínico ni un médico. " +
      "Usa método socrático: una o dos preguntas por turno, distingue hechos de juicios, dicotomía del control, premeditatio malorum, examen de la tarde, virtudes (sabiduría, coraje, justicia, templanza). " +
      "Responde en español, breve (máx. 150 palabras), valida la emoción antes de cuestionar, y cierra con una pregunta o una acción mínima. " +
      "Nunca diagnostiques. Si hay riesgo de suicidio o autolesión, responde con empatía e indica pedir ayuda inmediata (España 024, Chile *4141, Alemania 0800 111 0 111, emergencias 112). " +
      "Memoria consolidada del usuario:\n" + memoryBriefing();
    const contents = s.messages.slice(-16).map((m) => ({ role: m.r === "u" ? "user" : "model", parts: [{ text: m.t }] }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(state.settings.model || "gemini-2.0-flash")}:generateContent`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": state.settings.apiKey },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: sys }] }, contents })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const out = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
    if (!out || !out[0] || !out[0].text) throw new Error("respuesta vacía");
    return out[0].text.trim();
  }

  // ----------------------------------------------------------- SESIONES
  function startSession() {
    const s = { id: uid(), date: today(), start: Date.now(), theme: null, before: null, after: null, phase: "facts", messages: [], closed: false };
    const o = openingMessage();
    s.phase = o.phase;
    s.messages.push({ r: "b", t: o.text, ts: Date.now() });
    state.sessions.push(s);
    state.activeId = s.id;
    save();
    return s;
  }

  async function send(text) {
    text = String(text || "").trim();
    if (!text || ui.busy) return;
    let s = activeSession();
    if (!s) s = startSession();
    s.messages.push({ r: "u", t: text, ts: Date.now() });
    const low = text.toLowerCase();
    let reply;
    if (CRISIS_KW.some((k) => low.includes(k))) {
      s.crisis = true; reply = CRISIS_MSG;
    } else if (state.settings.apiKey) {
      ui.busy = true; render();
      try {
        reply = await llmReply(s, text);
        if (!s.theme) s.theme = detectTheme(s.messages.filter((m) => m.r === "u").map((m) => m.t).join(" "));
      } catch (e) {
        reply = localReply(s, text) + `\n\n(⚠️ Gemini no respondió: ${esc(e.message)}; uso el protocolo local.)`;
      }
      ui.busy = false;
    } else {
      reply = localReply(s, text);
    }
    s.messages.push({ r: "b", t: reply, ts: Date.now() });
    save();
    render();
  }

  function heuristicSummary(s) {
    const th = THEMES[s.theme || "general"];
    return {
      text: clip(`Tema: ${th.name}. ${s.facts ? "Hechos: " + s.facts + ". " : ""}${s.judgment ? "Juicio: «" + s.judgment + "». " : ""}${s.controllable ? "Controlable: " + s.controllable + ". " : ""}${s.commitment ? "Compromiso: " + s.commitment + "." : ""}`, 420),
      judgment: s.judgment || "",
      learning: s.objection ? "" : (s.controllable || ""),
      commitment: s.commitment || ""
    };
  }

  async function closeSession(after) {
    const s = activeSession();
    if (!s) return;
    s.after = after == null ? null : after;
    s.closed = true; s.end = Date.now();
    if (!s.theme) s.theme = detectTheme(s.messages.filter((m) => m.r === "u").map((m) => m.t).join(" "));
    let summary = heuristicSummary(s);
    if (state.settings.apiKey && s.messages.length > 4) {
      try {
        const prompt = "Resume esta sesión en JSON estricto con claves text (≤60 palabras), judgment (creencia clave del usuario), learning (qué le sirvió), commitment (acción pactada o vacío). Solo JSON.\n\n" +
          s.messages.map((m) => (m.r === "u" ? "Usuario: " : "Acompañante: ") + m.t).join("\n");
        const tmp = { messages: [{ r: "u", t: prompt }] };
        const out = await llmReply(tmp, prompt);
        const j = JSON.parse(out.replace(/```json|```/g, "").trim());
        if (j && j.text) summary = { text: clip(j.text, 420), judgment: clip(j.judgment, 160), learning: clip(j.learning, 160), commitment: clip(j.commitment, 140) };
      } catch (e) { /* queda el resumen local */ }
    }
    s.summary = summary;
    consolidate();
    state.activeId = null;
    save();
    if (window.awardXP && s.messages.filter((m) => m.r === "u").length >= 3) {
      window.awardXP(25, "Sesión de terapia estoica", "mente", "therapy-session-" + s.id);
    }
    ui.tab = "memoria";
    render();
  }

  // --------------------------------------------------------------- UI
  function drawerParts() {
    return {
      drawer: document.getElementById("imperivm-drawer"),
      backdrop: document.getElementById("imperivm-drawer-backdrop"),
      title: document.getElementById("imperivm-drawer-title"),
      tabs: document.getElementById("imperivm-drawer-tabs-bar"),
      body: document.getElementById("imperivm-drawer-body")
    };
  }

  function bubble(m) {
    const mine = m.r === "u";
    const html = esc(m.t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
    return `<div style="align-self: ${mine ? "flex-end" : "flex-start"}; max-width: 88%; background: ${mine ? "rgba(184,134,11,0.22)" : "rgba(255,255,255,0.06)"}; border: 1px solid ${mine ? "rgba(243,208,121,0.4)" : "var(--imperivm-border)"}; border-radius: 10px; padding: 9px 12px; font-size: 0.84rem; line-height: 1.5; color: #EEE;">${html}</div>`;
  }

  function chips(handler, from, to) {
    let h = "";
    for (let i = from; i <= to; i++) h += `<button onclick="${handler}(${i})" style="width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--imperivm-border-gold); background: rgba(255,255,255,0.05); color: #F3D079; cursor: pointer;">${i}</button>`;
    return h;
  }

  function tabBtn(id, label) {
    const on = ui.tab === id;
    return `<button onclick="therapyStoic.tab('${id}')" style="flex: 1; padding: 8px; border-radius: 8px; cursor: pointer; border: 1px solid ${on ? "var(--imperivm-border-gold)" : "var(--imperivm-border)"}; background: ${on ? "rgba(184,134,11,0.22)" : "rgba(255,255,255,0.04)"}; color: #FFF; font-size: 0.8rem;">${label}</button>`;
  }

  function renderChat() {
    const s = activeSession();
    const msgs = s ? s.messages : [];
    const askBefore = s && s.before == null && s.messages.filter((m) => m.r === "u").length === 0;
    return `
      <div id="th-msgs" style="display: flex; flex-direction: column; gap: 8px; height: 46vh; overflow-y: auto; padding: 4px;">
        ${s ? msgs.map(bubble).join("") : `<div style="color: var(--imperivm-text-muted); font-size: 0.85rem;">Pulsa <strong>Nueva sesión</strong> para empezar. Tus conversaciones previas están en la pestaña Memoria.</div>`}
        ${ui.busy ? `<div style="color: var(--imperivm-text-muted); font-size: 0.8rem;">… reflexionando</div>` : ""}
      </div>
      ${askBefore ? `<div style="margin: 8px 0; font-size: 0.78rem; color: var(--imperivm-text-muted);">Intensidad emocional ahora (0 = calma, 10 = máxima):<div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">${chips("therapyStoic.setBefore", 0, 10)}</div></div>` : ""}
      ${s ? `
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <textarea id="th-input" rows="2" placeholder="Escribe aquí…" style="flex: 1; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 8px; color: #FFF; font-size: 0.85rem; resize: none;" onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();therapyStoic.submit();}"></textarea>
          <button class="btn-imperivm-primary" onclick="therapyStoic.submit()" ${ui.busy ? "disabled" : ""}>Enviar</button>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 8px; align-items: center; flex-wrap: wrap; gap: 6px;">
          <span style="font-size: 0.7rem; color: var(--imperivm-text-muted);">${state.settings.apiKey ? "🤖 Conversación libre (Gemini)" : "🏛️ Protocolo estoico local"}</span>
          <button class="btn-imperivm-secondary" onclick="therapyStoic.askClose()">✔ Cerrar sesión y guardar</button>
        </div>` : `<div style="margin-top: 10px;"><button class="btn-imperivm-primary" onclick="therapyStoic.newSession()">➕ Nueva sesión</button></div>`}
    `;
  }

  function renderMemoria() {
    const closed = state.sessions.filter((s) => s.closed).slice().reverse();
    const open = state.memory.commitments.filter((c) => c.status === "abierto");
    return `
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.82rem;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--imperivm-border-gold); border-radius: 8px; padding: 12px; white-space: pre-wrap; line-height: 1.55; color: #EEE;">${esc(memoryBriefing())}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-imperivm-secondary" onclick="therapyStoic.copyContext()">📋 Copiar contexto para una IA</button>
          <button class="btn-imperivm-secondary" onclick="therapyStoic.download()">⬇️ Descargar historial</button>
        </div>
        ${open.length ? `<div><strong style="color: var(--imperivm-text-gold);">Compromisos abiertos</strong>${open.map((c) => `<div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px;"><span>• ${esc(c.text)} <em style="color:var(--imperivm-text-muted)">(${c.date})</em></span><button class="btn-imperivm-secondary" style="padding:2px 8px;" onclick="therapyStoic.markDone('${c.id}')">✔ Hecho</button></div>`).join("")}</div>` : ""}
        <div><strong style="color: var(--imperivm-text-gold);">Sesiones (${closed.length})</strong>
          ${closed.length ? closed.map((s) => `
            <details style="margin-top: 6px; background: rgba(255,255,255,0.03); border: 1px solid var(--imperivm-border); border-radius: 8px; padding: 8px 10px;">
              <summary style="cursor: pointer;">${s.date} · ${esc((THEMES[s.theme] || THEMES.general).name)}${s.before != null ? ` · intensidad ${s.before}→${s.after != null ? s.after : "?"}` : ""}</summary>
              <div style="margin: 8px 0; color: var(--imperivm-text-muted);">${esc(s.summary ? s.summary.text : "")}</div>
              <div style="display: flex; flex-direction: column; gap: 6px;">${s.messages.map(bubble).join("")}</div>
            </details>`).join("") : `<div style="color: var(--imperivm-text-muted); margin-top: 6px;">Aún no hay sesiones cerradas.</div>`}
        </div>
      </div>`;
  }

  function renderAjustes() {
    return `
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.82rem; color: #DDD;">
        <p style="margin: 0; line-height: 1.5; color: var(--imperivm-text-muted);">Opcional: con una clave de Gemini (Google AI Studio) la conversación pasa a ser libre, usando tu consolidado como memoria. Sin clave, funciona el protocolo estoico local. La clave se guarda solo en este navegador.</p>
        <label>Clave de API de Gemini<br><input id="th-key" type="password" value="${esc(state.settings.apiKey)}" placeholder="AIza…" style="width: 100%; margin-top: 4px; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 8px; color: #FFF;"></label>
        <label>Modelo<br><input id="th-model" type="text" value="${esc(state.settings.model)}" style="width: 100%; margin-top: 4px; background: #151C2C; border: 1px solid var(--imperivm-border); border-radius: 6px; padding: 8px; color: #FFF;"></label>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-imperivm-primary" onclick="therapyStoic.saveSettings()">Guardar ajustes</button>
          <button class="btn-imperivm-secondary" onclick="therapyStoic.wipe()" style="color: #E8A0A8;">🗑 Borrar todo el historial</button>
        </div>
        <p style="margin: 0; font-size: 0.72rem; color: var(--imperivm-text-muted);">Este espacio es acompañamiento filosófico, no terapia clínica. Si atraviesas una crisis, contacta con un profesional o una línea de ayuda (España 024 · Chile *4141 · Alemania 0800 111 0 111).</p>
      </div>`;
  }

  function render() {
    const p = drawerParts();
    if (!p.body) return;
    if (p.tabs) p.tabs.style.display = "none";
    if (p.title) p.title.textContent = "🏛️ TERAPIA ESTOICA";
    const keepInput = document.getElementById("th-input");
    const draft = keepInput ? keepInput.value : "";
    p.body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 6px;">${tabBtn("chat", "💬 Conversación")}${tabBtn("memoria", "🧠 Memoria")}${tabBtn("ajustes", "⚙️ Ajustes")}</div>
        ${ui.tab === "chat" ? renderChat() : ui.tab === "memoria" ? renderMemoria() : renderAjustes()}
      </div>`;
    const inp = document.getElementById("th-input");
    if (inp) { inp.value = draft; }
    const box = document.getElementById("th-msgs");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function contextText() {
    const s = state.sessions.filter((x) => x.closed).slice(-2);
    const tail = s.map((x) => `## Sesión ${x.date}\n` + x.messages.map((m) => (m.r === "u" ? "Yo: " : "Acompañante: ") + m.t).join("\n")).join("\n\n");
    return "Actúa como un acompañante filosófico estoico (Epicteto, Marco Aurelio, Séneca), con método socrático, sin diagnosticar. Continúa nuestra conversación con esta memoria:\n\n" + memoryBriefing() + "\n\n" + tail;
  }

  // -------------------------------------------------------------- API
  const api = {
    open() {
      load();
      const p = drawerParts();
      if (!p.drawer) return;
      ui.tab = "chat";
      render();
      if (window.imperivmEngine && typeof window.imperivmEngine.openDrawer === "function") window.imperivmEngine.openDrawer();
    },
    tab(t) { ui.tab = t; render(); },
    newSession() { if (!activeSession()) startSession(); ui.tab = "chat"; render(); },
    setBefore(n) { const s = activeSession(); if (s) { s.before = n; save(); render(); } },
    submit() { const el = document.getElementById("th-input"); if (!el) return; const v = el.value; el.value = ""; send(v); },
    askClose() {
      const p = drawerParts();
      if (!p.body) return;
      const s = activeSession();
      if (!s) return;
      const needs = s.before != null;
      p.body.insertAdjacentHTML("beforeend", `<div id="th-close" style="margin-top: 12px; padding: 12px; border: 1px solid var(--imperivm-border-gold); border-radius: 8px; font-size: 0.8rem;">${needs ? "¿Qué intensidad emocional sientes ahora? (0–10)" : "Cerrar la sesión y guardar el resumen:"}<div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">${needs ? chips("therapyStoic.finish", 0, 10) : `<button class="btn-imperivm-primary" onclick="therapyStoic.finish(null)">Guardar</button>`}</div></div>`);
    },
    finish(n) { closeSession(n); },
    markDone(id) {
      const c = state.memory.commitments.find((x) => x.id === id);
      if (c) { c.status = "cumplido"; c.doneOn = today(); consolidate(); save(); if (window.awardXP) window.awardXP(20, `Compromiso estoico cumplido: ${clip(c.text, 50)}`, "espiritualidad", "therapy-commit-" + c.id); render(); }
    },
    copyContext() {
      const t = contextText();
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
        () => window.showNotification && window.showNotification("📋 Contexto copiado. Pégalo en tu IA favorita."),
        () => window.prompt("Copia el contexto:", t)
      );
    },
    download() {
      const blob = new Blob([JSON.stringify(state.sessions.map((s) => Object.assign({}, s)), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `terapia_estoica_${today()}.json`;
      a.click();
    },
    saveSettings() {
      state.settings.apiKey = (document.getElementById("th-key").value || "").trim();
      state.settings.model = (document.getElementById("th-model").value || "gemini-2.0-flash").trim();
      save();
      if (window.showNotification) window.showNotification("⚙️ Ajustes guardados.");
      render();
    },
    wipe() {
      if (!window.confirm("¿Borrar TODAS las sesiones y el consolidado? Esta acción no se puede deshacer.")) return;
      state.sessions = []; state.activeId = null;
      state.memory = { commitments: [], consolidated: "", updated: null };
      save(); render();
    },
    _state: () => state,
    _detectTheme: detectTheme,
    _localReply: localReply
  };

  load();
  window.therapyStoic = api;
})(window);
