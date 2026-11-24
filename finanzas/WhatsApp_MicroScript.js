// ==============================================================================
// CABALLERO JAGUAR • WHATSAPP NOCTURNO 21:00 (MINI SCRIPT AUTÓNOMO)
// ==============================================================================
// 1. En script.google.com crea un archivo llamado "whatsapp.gs" y pega SOLO esto.
// 2. Ejecuta una sola vez la función `activarWhatsApp21PM` (arriba en Run).
// ¡Listo! Ya queda el reloj puesto para las 21:00 todos los días.

function activarWhatsApp21PM() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === "enviarWhatsApp21PM") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("enviarWhatsApp21PM")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .inTimezone("Europe/Berlin")
    .create();
  enviarWhatsApp21PM(); // Envía uno de prueba inmediato
}

function enviarWhatsApp21PM() {
  const tomorrow = new Date(Date.now() + 86400000);
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const tomorrowName = days[tomorrow.getDay()];
  
  // Eventos de Google Calendar
  let calText = "Sin reuniones externas";
  try {
    const evs = CalendarApp.getDefaultCalendar().getEventsForDay(tomorrow);
    if (evs.length > 0) calText = evs.map(e => e.getTitle()).join("; ");
  } catch (e) {}

  const msg = `🌙 *JAGUAR • 21:00* | Víspera de *${tomorrowName}*

🚩 *Banderas:* 0/9 encendidas ⚪
_Campamento frío. Mañana sal del cero con 1 frente._

🔥 *Reto 21d:* 0/21 (Pausa) ⚠️
_¿Olvidaste marcar o es Día 1?_

⚔️ *Plan de Mañana:*
• 09:30 👑 Vida (Postulaciones y Foco)
• 13:00 🧠 Alemán B1
• 14:30 🧭 Proyectos
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
