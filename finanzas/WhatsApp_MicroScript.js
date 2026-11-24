// ==============================================================================
// CABALLERO JAGUAR • WHATSAPP NOCTURNO 21:00 CON GOOGLE CALENDAR EN VIVO
// ==============================================================================
// INSTRUCCIONES (Toma 30 segundos):
// 1. Ve a https://script.google.com (abre tu proyecto o crea uno nuevo).
// 2. A la izquierda, pulsa el botón "+" en Archivos -> Script, llámalo "whatsapp".
// 3. Pega este código completo (reemplaza cualquier texto anterior).
// 4. Arriba en la barra selecciona `activarWhatsApp21PM` y dale a "Ejecutar" (Run).
// 5. Google te pedirá permisos para leer tu Calendar (dale a Avanzado -> Permitir).
// ¡Listo! Ya queda el reloj automático a las 21:00 con tu Google Calendar en vivo.

function activarWhatsApp21PM() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === "enviarWhatsApp21PM") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("enviarWhatsApp21PM")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();
  enviarWhatsApp21PM(); // Envía uno de prueba inmediato a tu WhatsApp
}

function enviarWhatsApp21PM() {
  const tomorrow = new Date(Date.now() + 86400000);
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const tomorrowName = days[tomorrow.getDay()];
  
  // 1. Eventos reales de Google Calendar para mañana
  let calText = "Sin reuniones externas";
  try {
    const evs = CalendarApp.getDefaultCalendar().getEventsForDay(tomorrow);
    if (evs && evs.length > 0) {
      calText = evs.map(e => {
        const h = e.isAllDayEvent() ? "Todo el día" : Utilities.formatDate(e.getStartTime(), "Europe/Berlin", "HH:mm");
        return `${h} ${e.getTitle()}`;
      }).join("; ");
    }
  } catch (e) {}

  // 2. Bloques tácticos según el día
  const dailyPlans = {
    "Lunes": "• 09:00 🥊 Deporte\n• 09:30 👑 Vida (Foco Dual Hannover)\n• 13:00 🧠 Alemán al Mediodía\n• 14:30 🧭 Paper Lauwersmeer",
    "Martes": "• 09:00 🏃 Cardio / Shadowboxing\n• 09:30 👑 Vida (Postulaciones)\n• 13:00 🧠 Alemán B1\n• 19:30 💖 Cita / Pareja",
    "Miércoles": "• 09:00 🧘 Salud (Calistenia)\n• 09:30 👑 Vida (Avance Profesional)\n• 13:00 🧠 Alemán B1 + Trompeta\n• 14:30 🌲 Chile Agrotech & ReWild",
    "Jueves": "• 09:00 🏋️ Circuito Fuerza\n• 09:30 👑 Vida (Empleo & Trámites)\n• 14:30 🧭 Maule Red / Ciencia\n• 20:00 💖 Aftercare & Masajes",
    "Viernes": "• 09:00 🥊 Sparring / Cardio\n• 09:30 👑 Vida (Cierre de Semana)\n• 16:00 🌲 Caminata en Bosque\n• 20:00 🍷 Cita de Viernes",
    "Sábado": "• 09:30 🧗 Deporte Outdoor\n• 11:30 🧭 Pintura / Fotografía\n• 16:00 🌲 Naturaleza Viva\n• 20:30 🕯️ Intimidad Consciente",
    "Domingo": "• 10:00 🪙 Auditoría Cuentas\n• 11:00 🕯️ Rito & Planificación\n• 13:00 🌿 Meal Prep\n• 18:00 🧠 Lectura Estoica & Diario"
  };
  const plan = dailyPlans[tomorrowName] || dailyPlans["Lunes"];

  const msg = `🌙 *JAGUAR • 21:00* | Víspera de *${tomorrowName}*

🚩 *Banderas:* 0/9 encendidas ⚪
_Campamento frío. Mañana sal del cero con 1 frente._

🔥 *Reto 21d:* 0/21 (Pausa) ⚠️
_¿Olvidaste marcar o es Día 1?_

⚔️ *Plan de Mañana:*
${plan}
📅 _Calendar: ${calText}_

🏛️ _"La disciplina de la noche es la victoria del alba."_

📲 https://danisantanderurrutia-coder.github.io/caballero-jaguar/`;

  UrlFetchApp.fetch("https://api.green-api.com/waInstance710722811758/sendMessage/18d1ccd9e09e486daa60f195ea879bdfe5c63bff2fa046d08d", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chatId: "4917676497440@c.us", message: msg }),
    muteHttpExceptions: true
  });
}
