/**
 * ==============================================================================
 * JAGUAR ROSA - SISTEMA INTEGRADO DE MONITOREO BANCARIO Y GOOGLE SHEETS
 * Sincronización Automática: Sparkasse (EUR €) + Banco Chile (CLP $)
 * ==============================================================================
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. En tu Google Sheet, ve a: Extensiones -> Apps Script.
 * 2. Borra el código por defecto y pega este archivo completo.
 * 3. Ejecuta la función `setupSpreadsheetStructure` una vez para crear la estructura.
 * 4. Para activar la API Webhook: Haz clic en "Desplegar" -> "Nuevo despliegue" ->
 *    Tipo: "Aplicación Web" -> Acceso: "Cualquier persona" (Anyone).
 * 5. Copia la URL del despliegue y pégala en tu app Jaguar Rosa en la sección Finanzas.
 * 6. (Opcional) Para auto-procesar correos del banco: En Apps Script ve a la pestaña 
 *    "Activadores" (Reloj) -> Añadir activador -> Ejecutar `processBankNotificationEmails` -> Cada hora.
 */

// --- 1. INICIALIZACIÓN Y ESTRUCTURA DE PESTAÑAS ---
function setupSpreadsheetStructure() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Pestaña 1: Dashboard Unificado
  let dashSheet = ss.getSheetByName("Dashboard_Unificado");
  if (!dashSheet) {
    dashSheet = ss.insertSheet("Dashboard_Unificado");
  } else {
    dashSheet.clear();
  }
  
  dashSheet.getRange("A1:D1").setValues([["METRICA FINANCIERA", "VALOR (€ / CLP)", "MONEDA REFERENCIAL", "NOTAS DE CONTROL"]]);
  dashSheet.getRange("A1:D1").setBackground("#070312").setFontColor("#00F0FF").setFontWeight("bold");
  
  dashSheet.getRange("A2:D6").setValues([
    ["Tasa de Cambio EUR/CLP", "=GOOGLEFINANCE(\"CURRENCY:EURCLP\")", "CLP por 1 EUR", "Actualizado en vivo por Google Finance"],
    ["Total Ingresos (EUR)", "=SUM(Movimientos_EUR!C:C) + (SUM(Movimientos_CLP!C:C) / B2)", "EUR (€)", "Suma unificada en Euros"],
    ["Total Gastos (EUR)", "=SUMIF(Movimientos_EUR!F:F, \"<>ingreso\", Movimientos_EUR!C:C) + (SUMIF(Movimientos_CLP!F:F, \"<>ingreso\", Movimientos_CLP!C:C) / B2)", "EUR (€)", "Gastos consolidados globales"],
    ["Gasto en Ocio (EUR)", "=SUMIF(Movimientos_EUR!F:F, \"ocio\", Movimientos_EUR!C:C) + (SUMIF(Movimientos_CLP!F:F, \"ocio\", Movimientos_CLP!C:C) / B2)", "EUR (€)", "Presupuesto límite recomendado: 150€"],
    ["Balance Neto Consolidado", "=B3 - B4", "EUR (€)", "Superávit o Déficit del mes"]
  ]);
  
  // Pestaña 2: Movimientos EUR (Sparkasse)
  let eurSheet = ss.getSheetByName("Movimientos_EUR");
  if (!eurSheet) {
    eurSheet = ss.insertSheet("Movimientos_EUR");
    eurSheet.appendRow(["ID", "Fecha", "Monto (€)", "Descripción", "Banco", "Categoría", "Origen Sincronización"]);
    eurSheet.getRange("A1:G1").setBackground("#070312").setFontColor("#FF007F").setFontWeight("bold");
  }

  // Pestaña 3: Movimientos CLP (Banco Chile)
  let clpSheet = ss.getSheetByName("Movimientos_CLP");
  if (!clpSheet) {
    clpSheet = ss.insertSheet("Movimientos_CLP");
    clpSheet.appendRow(["ID", "Fecha", "Monto ($)", "Descripción", "Banco", "Categoría", "Origen Sincronización"]);
    clpSheet.getRange("A1:G1").setBackground("#070312").setFontColor("#FFD700").setFontWeight("bold");
  }

  SpreadsheetApp.getUi().alert("✅ Estructura del Dashboard y pestañas EUR/CLP creada con éxito.");
}


// --- 2. ENDPOINT WEBHOOK (FINANZAS + SINCRONIZACIÓN REAL GOOGLE CALENDAR) ---
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "calendar";
    if (action === "calendar") {
      const cal = CalendarApp.getDefaultCalendar();
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const formatEv = ev => ({
        title: ev.getTitle(),
        start: ev.getStartTime().toISOString(),
        end: ev.getEndTime().toISOString(),
        allDay: ev.isAllDayEvent(),
        location: ev.getLocation() || ""
      });
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        today: cal.getEventsForDay(today).map(formatEv),
        tomorrow: cal.getEventsForDay(tomorrow).map(formatEv)
      })).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // A) Crear tarea/evento directamente en Google Calendar
    if (data.action === "create_calendar_event" && data.title) {
      const cal = CalendarApp.getDefaultCalendar();
      const startTime = data.startIso ? new Date(data.startIso) : new Date(Date.now() + 3600000);
      const endTime = data.endIso ? new Date(data.endIso) : new Date(startTime.getTime() + 60 * 60 * 1000);
      const ev = cal.createEvent("⚔️ " + data.title, startTime, endTime, {
        description: data.description || "Sincronizado desde Caballero Jaguar"
      });
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        eventId: ev.getId(),
        message: "Evento creado en Google Calendar: " + data.title
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // B) Sincronizar estado real del usuario (Reto 21 días Sin Fap + XP semanal por bandera)
    if (data.action === "sync_jaguar_state") {
      const snapshot = {
        noPornDays: Math.max(0, Number(data.noPornDays) || 0),
        noPornMarked: Boolean(data.noPornMarked),
        weeklyAuraXP: (data.weeklyAuraXP && typeof data.weeklyAuraXP === "object") ? data.weeklyAuraXP : {},
        lastSyncIso: data.lastSyncIso || new Date().toISOString()
      };
      PropertiesService.getUserProperties().setProperty("CABALLERO_JAGUAR_STATE", JSON.stringify(snapshot));
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Estado real de Caballero Jaguar sincronizado para el correo 09:00 AM.",
        snapshot: snapshot
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.transactions && Array.isArray(data.transactions)) {
      let eurSheet = ss.getSheetByName("Movimientos_EUR") || ss.insertSheet("Movimientos_EUR");
      let clpSheet = ss.getSheetByName("Movimientos_CLP") || ss.insertSheet("Movimientos_CLP");
      
      let importedCount = 0;
      data.transactions.forEach(t => {
        const row = [
          t.id || "tx-" + Date.now(),
          t.date || new Date().toISOString().split('T')[0],
          t.amount,
          t.desc,
          t.bank || "General",
          t.category || "ocio",
          "Sincro App Web Jaguar"
        ];
        
        if (t.currency === "CLP") {
          clpSheet.appendRow(row);
        } else {
          eurSheet.appendRow(row);
        }
        importedCount++;
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Se importaron " + importedCount + " movimientos a tu Google Sheet.",
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Formato de payload inválido." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getStoredCaballeroState() {
  try {
    const raw = PropertiesService.getUserProperties().getProperty("CABALLERO_JAGUAR_STATE");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          noPornDays: Math.max(0, Number(parsed.noPornDays) || 0),
          noPornMarked: Boolean(parsed.noPornMarked),
          weeklyAuraXP: (parsed.weeklyAuraXP && typeof parsed.weeklyAuraXP === "object") ? parsed.weeklyAuraXP : {}
        };
      }
    }
  } catch (e) {}
  return {
    noPornDays: 0,
    noPornMarked: false,
    weeklyAuraXP: {
      vida: 0,
      exploracion: 0,
      amor: 0,
      mente: 0,
      salud: 0,
      deporte: 0,
      soberania: 0,
      naturaleza: 0,
      espiritualidad: 0
    }
  };
}


// --- 3. LECTOR AUTOMÁTICO DE NOTIFICACIONES DE GMAIL ---
function processBankNotificationEmails() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const clpSheet = ss.getSheetByName("Movimientos_CLP") || ss.insertSheet("Movimientos_CLP");
  const eurSheet = ss.getSheetByName("Movimientos_EUR") || ss.insertSheet("Movimientos_EUR");
  
  // Buscar correos no leídos de Banco Chile o Sparkasse
  const query = "label:unread (from:bancochile.cl OR from:sparkasse.de OR subject:\"Notificación de Compra\" OR subject:\"Transferencia realizada\")";
  const threads = GmailApp.search(query, 0, 20);
  
  let newCount = 0;
  
  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(msg => {
      if (!msg.isUnread()) return;
      
      const body = msg.getPlainBody();
      const subject = msg.getSubject();
      const date = msg.getDate().toISOString().split('T')[0];
      
      // PARSER PARA BANCO CHILE
      if (body.includes("Banco de Chile") || subject.includes("Banco Chile") || body.includes("compra por $")) {
        const amountMatch = body.match(/\$\s?([\d\.]+)/);
        const descMatch = body.match(/en\s+([A-Z0-9\s\.\*]+)\s+el/i) || body.match(/Comercio:\s?([^\n]+)/i);
        
        if (amountMatch) {
          const rawAmount = amountMatch[1].replace(/\./g, "");
          const amount = parseFloat(rawAmount);
          const desc = descMatch ? descMatch[1].trim() : "Compra Tarjeta Banco Chile";
          
          clpSheet.appendRow([
            "auto-bchile-" + msg.getId(),
            date,
            amount,
            desc,
            "Banco Chile",
            categorizeTransaction(desc),
            "Auto Gmail Parser"
          ]);
          newCount++;
        }
      }
      
      // PARSER PARA SPARKASSE
      if (body.includes("Sparkasse") || subject.includes("Sparkasse") || body.includes("Umsatz")) {
        const amountMatch = body.match(/([\d\.,]+)\s?EUR/i) || body.match(/Betrag:\s?([\d\.,]+)/i);
        const descMatch = body.match(/Empfänger\/Absender:\s?([^\n]+)/i) || body.match(/Verwendungszweck:\s?([^\n]+)/i);
        
        if (amountMatch) {
          let rawAmount = amountMatch[1].replace(/\./g, "").replace(",", ".");
          const amount = parseFloat(rawAmount);
          const desc = descMatch ? descMatch[1].trim() : "Movimiento Sparkasse";
          
          eurSheet.appendRow([
            "auto-sparkasse-" + msg.getId(),
            date,
            amount,
            desc,
            "Sparkasse",
            categorizeTransaction(desc),
            "Auto Gmail Parser"
          ]);
          newCount++;
        }
      }
      
      msg.markRead(); // Marcar como leído para no duplicar
    });
  });
  
  Logger.log("Se procesaron " + newCount + " notificaciones bancarias automáticas.");
}

// Categorización heurística rápida
function categorizeTransaction(desc) {
  const d = desc.toLowerCase();
  if (d.includes("renta") || d.includes("arriendo") || d.includes("miete") || d.includes("luz") || d.includes("strom") || d.includes("internet")) return "fijos";
  if (d.includes("super") || d.includes("edeka") || d.includes("lidl") || d.includes("jumbo") || d.includes("lider")) return "alimentacion";
  if (d.includes("sueldo") || d.includes("honorarios") || d.includes("gehalt") || d.includes("ingreso")) return "ingreso";
  if (d.includes("ahorro") || d.includes("fintual") || d.includes("etf") || d.includes("fondos")) return "ahorro";
  return "ocio";
}


// --- 4. CORREO NOCTURNO 9:00 PM (21:00) PARA PREPARAR EL DÍA SIGUIENTE (GMAIL / APPS SCRIPT) ---
// INSTRUCCIÓN EN 1 CLIC:
// 1. Pega este código en https://script.google.com (o en Extensiones -> Apps Script de tu Google Sheet).
// 2. Arriba selecciona la función `activarCorreoNoche9PM` y dale a "Ejecutar" (Run).
// ¡Eso programará automáticamente el envío todos los días a las 21:00 (9:00 PM) con el plan del DÍA SIGUIENTE y te enviará uno de prueba!

function activarCorreoNoche9PM() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === "sendDailyNightTomorrowEmail") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Crear activador diario a las 21:00 hora europea (Europe/Berlin)
  ScriptApp.newTrigger("sendDailyNightTomorrowEmail")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  // Enviar correo de prueba inmediato para confirmar que funciona
  sendDailyNightTomorrowEmail();
  Logger.log("✅ Correo Nocturno de las 09:00 PM (21:00) activado y correo de prueba enviado.");
}

function sendDailyNightTomorrowEmail() {
  const recipient = Session.getActiveUser().getEmail() || "danisantander.urrutia@gmail.com";
  const tz = "Europe/Berlin";
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const daysIso = ["", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
  const tomorrowName = daysIso[parseInt(Utilities.formatDate(tomorrow, tz, "u"), 10)];
  const tomorrowDateStr = Utilities.formatDate(tomorrow, tz, "dd/MM/yyyy");
  const appUrl = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/";

  const schedules = {
    "LUNES": [
      { time: "09:00 - 09:30", title: "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", badge: "🥊 Deporte", color: "#9B2335" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Empleo Profesión + Trabajos Locales Hannover", badge: "👑 Vida", color: "#B8860B" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", badge: "🧠 Mente", color: "#4A79A7" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción)", badge: "🧭 Exploración", color: "#6D28D9" }
    ],
    "MARTES": [
      { time: "09:00 - 09:30", title: "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", badge: "🥊 Deporte", color: "#9B2335" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", badge: "👑 Vida", color: "#B8860B" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", badge: "🧠 Mente", color: "#4A79A7" },
      { time: "19:30 - 21:00", title: "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", badge: "💖 Amor", color: "#BE185D" }
    ],
    "MIÉRCOLES": [
      { time: "09:00 - 09:30", title: "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", badge: "🌿 Salud", color: "#15803D" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", badge: "👑 Vida", color: "#B8860B" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", badge: "🧭 Exploración", color: "#4A79A7" },
      { time: "14:30 - 17:30", title: "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", badge: "🌲 Naturaleza", color: "#15803D" }
    ],
    "JUEVES": [
      { time: "09:00 - 09:30", title: "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", badge: "🥊 Deporte", color: "#9B2335" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", badge: "👑 Vida", color: "#B8860B" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", badge: "🧭 Exploración", color: "#6D28D9" },
      { time: "20:00 - 21:30", title: "💆 Aftercare, Masajes en Pareja & Descompresión Somática", badge: "💖 Amor", color: "#BE185D" }
    ],
    "VIERNES": [
      { time: "09:00 - 09:30", title: "🥊 Sparring / Cardio Matutino & Ducha Fría", badge: "🥊 Deporte", color: "#9B2335" },
      { time: "09:30 - 12:45", title: "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", badge: "👑 Vida", color: "#B8860B" },
      { time: "16:00 - 18:00", title: "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", badge: "🌲 Naturaleza", color: "#15803D" },
      { time: "20:00 - 23:00", title: "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", badge: "💖 Amor", color: "#BE185D" }
    ],
    "SÁBADO": [
      { time: "09:30 - 11:00", title: "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", badge: "🥊 Deporte", color: "#9B2335" },
      { time: "11:30 - 13:30", title: "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", badge: "🧭 Exploración", color: "#6D28D9" },
      { time: "16:00 - 18:30", title: "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", badge: "🌲 Naturaleza", color: "#15803D" },
      { time: "20:30 - 22:30", title: "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", badge: "💖 Amor", color: "#BE185D" }
    ],
    "DOMINGO": [
      { time: "10:00 - 10:45", title: "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", badge: "🪙 Soberanía", color: "#B8860B" },
      { time: "11:00 - 12:30", title: "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", badge: "🕯️ Espíritu", color: "#6D28D9" },
      { time: "13:00 - 14:30", title: "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", badge: "🌿 Salud", color: "#15803D" },
      { time: "18:00 - 20:00", title: "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", badge: "🧠 Mente", color: "#4A79A7" }
    ]
  };

  const nightReflections = [
    { q: "Antes de dormir, revisa tu día con serenidad: ¿qué hiciste bien, qué puedes mejorar mañana y qué carga puedes soltar ahora?", a: "Séneca • De la Ira III, 36" },
    { q: "Prepara esta noche el terreno de mañana: ropa lista, mente limpia y 7-8 horas de sueño reparador.", a: "Marco Aurelio • Disciplina Nocturna" },
    { q: "Quien ordena su mañana desde la noche anterior despierta como comandante de su propio tiempo.", a: "Códice Caballero Jaguar" }
  ];

  const tomorrowBlocks = schedules[tomorrowName] || schedules["LUNES"];
  const reflection = nightReflections[now.getDate() % nightReflections.length];
  const tomorrowDayOfMonth = tomorrow.getDate();

  const outfitMap = {
    "LUNES": "outfit_look_lunes.jpg",
    "MARTES": "outfit_look_martes.jpg",
    "MIÉRCOLES": "outfit_look_miercoles.jpg",
    "JUEVES": "outfit_look_jueves.jpg",
    "VIERNES": "outfit_look_viernes.jpg",
    "SÁBADO": "outfit_look_sabado.jpg",
    "DOMINGO": "outfit_look_domingo.jpg"
  };
  const outfitImgUrl = appUrl + "assets/" + (outfitMap[tomorrowName] || "outfit_look_lunes.jpg");
  const romanBgUrl = appUrl + "assets/stoic_roman_bg.jpg";

  // Leer eventos REALES de Google Calendar para mañana
  let gcalEventsHtml = "";
  try {
    const cal = CalendarApp.getDefaultCalendar();
    const events = cal.getEventsForDay(tomorrow);
    if (events && events.length > 0) {
      const evItems = events.map(ev => {
        const startStr = ev.isAllDayEvent() ? "Todo el día" : Utilities.formatDate(ev.getStartTime(), Session.getScriptTimeZone() || "Europe/Berlin", "HH:mm");
        const endStr = ev.isAllDayEvent() ? "" : (" - " + Utilities.formatDate(ev.getEndTime(), Session.getScriptTimeZone() || "Europe/Berlin", "HH:mm"));
        return `<div style="padding: 6px 10px; background: rgba(59, 130, 246, 0.14); border-left: 3px solid #60A5FA; border-radius: 6px; margin-bottom: 6px; font-size: 12.5px; color: #E2E8F0;">
          <strong style="color: #93C5FD;">📅 ${startStr}${endStr}</strong> • ${ev.getTitle()}
        </div>`;
      }).join("");
      gcalEventsHtml = `
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(96, 165, 250, 0.4); border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #93C5FD; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            📆 Tu Agenda Real en Google Calendar Mañana (${events.length})
          </div>
          ${evItems}
        </div>
      `;
    } else {
      gcalEventsHtml = `
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(148, 163, 184, 0.35); border-radius: 10px; padding: 10px 14px; margin-bottom: 18px; font-size: 12px; color: #94A3B8;">
          📆 <strong>Google Calendar Mañana:</strong> Agenda libre de reuniones externas — día ideal para Deep Work.
        </div>
      `;
    }
  } catch (calErr) {
    gcalEventsHtml = "";
  }

  let tkAlert = "";
  if (tomorrowDayOfMonth >= 11 && tomorrowDayOfMonth <= 16) {
    tkAlert = `
      <div style="background: rgba(30, 58, 138, 0.25); border: 1px solid #3B82F6; border-left: 4px solid #60A5FA; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 800; color: #93C5FD; text-transform: uppercase;">🏥 Mañana toca revisar: Techniker Krankenkasse (Día 15)</div>
        <div style="font-size: 12.5px; color: #E0F2FE; margin-top: 3px;">Deja listo el pago mensual de tu seguro estudiantil TK y márcalo en la app.</div>
      </div>
    `;
  }

  const blocksHtml = tomorrowBlocks.map((b, idx) => `
    <div style="background: #131826; border: 1px solid rgba(197, 154, 40, 0.28); border-left: 4px solid ${b.color}; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px;">
      <div style="font-size: 11px; font-weight: 800; color: #F3D079; margin-bottom: 3px;">#${idx + 1} • ⏱️ ${b.time} (${b.badge})</div>
      <div style="font-size: 13.5px; font-weight: 700; color: #F4F6F9;">${b.title}</div>
    </div>
  `).join("");

  const subject = "🌙 [Caballero Jaguar 9:00 PM] Tu Mañana (" + tomorrowName + "), Agenda Google & Outfit (" + tomorrowDateStr + ")";
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0E17; border: 2px solid #C59A28; border-radius: 14px; overflow: hidden; color: #F4F6F9;">
      <div style="background: linear-gradient(180deg, rgba(14, 14, 24, 0.72) 0%, rgba(11, 14, 23, 0.96) 100%), url('${romanBgUrl}') center/cover no-repeat; padding: 28px 20px; text-align: center; border-bottom: 1.5px solid rgba(197, 154, 40, 0.45);">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #F3D079; text-transform: uppercase;">🌙 Víspera del Estratega • Caballero Jaguar</div>
        <h1 style="margin: 6px 0 4px 0; font-size: 21px; color: #FFFFFF;">🌙 Buenas noches, Daniel (09:00 PM)</h1>
        <p style="margin: 0; font-size: 13px; color: #CBD5E1;">Prepara tu mañana: <strong style="color:#F3D079;">${tomorrowName} • ${tomorrowDateStr}</strong></p>
      </div>
      <div style="padding: 22px 18px;">
        <div style="background: rgba(155, 35, 53, 0.14); border: 1px solid rgba(197, 154, 40, 0.35); border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 18px;">
          <em style="font-size: 13.5px; color: #F1F5F9;">"${reflection.q}"</em>
          <div style="font-size: 11px; font-weight: 800; color: #F3D079; margin-top: 4px;">— ${reflection.a}</div>
        </div>
        ${tkAlert}
        ${gcalEventsHtml}
        <!-- TARJETA VISUAL DEL OUTFIT DE MAÑANA -->
        <div style="display: flex; align-items: center; gap: 14px; background: #131826; border: 1px solid rgba(197, 154, 40, 0.35); border-radius: 10px; padding: 12px; margin-bottom: 18px;">
          <img src="${outfitImgUrl}" alt="Outfit de mañana" width="84" height="106" style="width: 84px; height: 106px; object-fit: cover; border-radius: 8px; border: 1.5px solid #C59A28;">
          <div>
            <div style="font-size: 11px; font-weight: 800; color: #F3D079; text-transform: uppercase; letter-spacing: 0.8px;">👔 Outfit Somático de Mañana (${tomorrowName})</div>
            <div style="font-size: 13px; color: #E2E8F0; margin-top: 4px; line-height: 1.4;">Deja tu ropa elegida y lista esta noche para despertar sin fricción ni decisiones.</div>
          </div>
        </div>
        <div style="font-size: 12px; font-weight: 800; color: #F3D079; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">
          ⚔️ Línea de Tiempo Táctica de Mañana (${tomorrowName}):
        </div>
        ${blocksHtml}
        <div style="background: rgba(197, 154, 40, 0.10); border: 1px solid rgba(197, 154, 40, 0.35); border-radius: 10px; padding: 12px 14px; margin-top: 14px; font-size: 12.5px; color: #FDE68A;">
          🪙 <strong>Cierre de Tesorería &amp; Sueño:</strong> ¿Evitaste algún gasto tonto hoy? Regístralo (+50 XP) y apunta a dormir 7–8 horas reparadoras.
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #9B2335, #C59A28); color: #FFFFFF; text-decoration: none; font-weight: 800; font-size: 13.5px; padding: 13px 24px; border-radius: 8px;">
            📱 VER AGENDA Y PLAN DE MAÑANA EN LA APP &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ==============================================================================
// 7. MOTOR NOCTURNO AUTOMÁTICO DE WHATSAPP 21:00 (GREEN-API)
// ==============================================================================
// INSTRUCCIÓN DE ACTIVACIÓN EN 1 CLIC:
// 1. En Google Apps Script (script.google.com), selecciona la función `activarReporteNocturnoWhatsApp9PM`.
// 2. Haz clic en "Ejecutar" (Run).
// ¡Eso creará automáticamente el reloj diario a las 21:00 (Europe/Berlin) y te enviará uno de prueba a tu WhatsApp!

const GREEN_API_CONFIG = {
  idInstance: "710722811758",
  apiTokenInstance: "18d1ccd9e09e486daa60f195ea879bdfe5c63bff2fa046d08d",
  chatId: "4917676497440@c.us"
};

function activarReporteNocturnoWhatsApp9PM() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === "sendDailyNightTomorrowWhatsApp") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Disparo automático diario a las 21:00 hora de Alemania (Europe/Berlin)
  ScriptApp.newTrigger("sendDailyNightTomorrowWhatsApp")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  // Enviar mensaje de prueba inmediato a WhatsApp
  sendDailyNightTomorrowWhatsApp();
  Logger.log("✅ Reporte Nocturno de WhatsApp 21:00 (Green-API) activado con éxito.");
}

function sendDailyNightTomorrowWhatsApp() {
  const tz = "Europe/Berlin";
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const daysIso = ["", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
  const tomorrowName = daysIso[parseInt(Utilities.formatDate(tomorrow, tz, "u"), 10)];
  const tomorrowDateStr = Utilities.formatDate(tomorrow, tz, "dd/MM/yyyy");
  const appUrl = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/";

  const schedules = {
    "LUNES": [
      { time: "09:00 - 09:30", title: "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Empleo Profesión + Trabajos Locales Hannover", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", badge: "Mente" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción)", badge: "Exploración" }
    ],
    "MARTES": [
      { time: "09:00 - 09:30", title: "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", badge: "Mente" },
      { time: "19:30 - 21:00", title: "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", badge: "Amor" }
    ],
    "MIÉRCOLES": [
      { time: "09:00 - 09:30", title: "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", badge: "Salud" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", badge: "Exploración" },
      { time: "14:30 - 17:30", title: "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", badge: "Naturaleza" }
    ],
    "JUEVES": [
      { time: "09:00 - 09:30", title: "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", badge: "Vida" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", badge: "Exploración" },
      { time: "20:00 - 21:30", title: "💆 Aftercare, Masajes en Pareja & Descompresión Somática", badge: "Amor" }
    ],
    "VIERNES": [
      { time: "09:00 - 09:30", title: "🥊 Sparring / Cardio Matutino & Ducha Fría", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", badge: "Vida" },
      { time: "16:00 - 18:00", title: "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", badge: "Naturaleza" },
      { time: "20:00 - 23:00", title: "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", badge: "Amor" }
    ],
    "SÁBADO": [
      { time: "09:30 - 11:00", title: "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", badge: "Deporte" },
      { time: "11:30 - 13:30", title: "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", badge: "Exploración" },
      { time: "16:00 - 18:30", title: "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", badge: "Naturaleza" },
      { time: "20:30 - 22:30", title: "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", badge: "Amor" }
    ],
    "DOMINGO": [
      { time: "10:00 - 10:45", title: "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", badge: "Soberanía" },
      { time: "11:00 - 12:30", title: "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", badge: "Espíritu" },
      { time: "13:00 - 14:30", title: "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", badge: "Salud" },
      { time: "18:00 - 20:00", title: "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", badge: "Mente" }
    ]
  };

  const nightReflections = [
    { q: "Antes de dormir, revisa tu día con serenidad: ¿qué hiciste bien, qué puedes mejorar mañana y qué carga puedes soltar ahora?", a: "Séneca • De la Ira III, 36" },
    { q: "Prepara esta noche el terreno de mañana: ropa lista, mente limpia y descanso reparador para despertar como comandante.", a: "Marco Aurelio • Meditaciones" },
    { q: "Quien ordena su mañana desde la noche anterior despierta libre de fricción y con soberanía sobre su tiempo.", a: "Códice Caballero Jaguar" },
    { q: "La disciplina de la noche es el cimiento de la victoria matutina. Cuida tu sueño como el templo de tu fuerza.", a: "Epicteto • Manual de Vida" }
  ];

  // Leer estado real sincronizado desde la app web (o defaults)
  const realState = getStoredCaballeroState();
  const noPornDays = Number(realState.noPornDays) || 0;

  // 1) PROTOCOLO DINÁMICO DE BANDERAS SEMANALES
  const auraDefs = [
    { key: "vida", label: "👑 Vida" },
    { key: "exploracion", label: "🧭 Exploración" },
    { key: "amor", label: "💖 Amor" },
    { key: "mente", label: "🧠 Mente" },
    { key: "salud", label: "🌿 Salud" },
    { key: "deporte", label: "🥊 Deporte" },
    { key: "soberania", label: "🪙 Soberanía" },
    { key: "naturaleza", label: "🌲 Naturaleza" },
    { key: "espiritualidad", label: "🕯️ Espíritu" }
  ];

  const activeFlags = [];
  auraDefs.forEach(a => {
    const xpVal = Number(realState.weeklyAuraXP[a.key]) || 0;
    if (xpVal > 0) activeFlags.push(`${a.label} (${xpVal} XP)`);
  });
  const activeCount = activeFlags.length;

  let flagsLine = "";
  if (activeCount === 0) {
    flagsLine = "🚩 *Banderas:* 0/9 encendidas ⚪\n_Campamento frío. Mañana sal del cero con 1 frente._";
  } else if (activeCount <= 3) {
    flagsLine = `🚩 *Banderas:* ${activeCount}/9 (${activeFlags.join(" · ")}) ⚠️\n_Flancos en sombra. ¿Dónde está el freno?_`;
  } else {
    flagsLine = `🚩 *Banderas:* ${activeCount}/9 (${activeFlags.join(" · ")}) 🔥\n_¡Gran tracción! Mantén el ritmo._`;
  }

  // 2) ESTADO DEL DESAFÍO 21 DÍAS (NO FAP / TEMPLANZA)
  let retoLine = "";
  if (noPornDays <= 0) {
    retoLine = "🔥 *Reto 21d:* 0/21 (Pausa) ⚠️\n_¿Olvidaste marcar o es Día 1?_";
  } else {
    const filled = Math.min(21, noPornDays);
    const bar = "▓".repeat(filled) + "░".repeat(21 - filled);
    retoLine = `🔥 *Reto 21d:* ${bar} ${filled}/21d\n_Templanza y energía vital al mando._`;
  }

  // 3) PLANES PARA MAÑANA (HORARIOS TÁCTICOS COMPACTOS)
  const tomorrowBlocks = schedules[tomorrowName] || schedules["LUNES"];
  const blocksLines = tomorrowBlocks.map((b) => `• ${b.time.split(" - ")[0]} [${b.badge}] ${b.title.split(":")[1] || b.title}`).join("\n");

  // 4) AGENDA REAL GOOGLE CALENDAR
  let calLine = "📅 _Calendar: Sin reuniones externas_";
  try {
    const cal = CalendarApp.getDefaultCalendar();
    const events = cal.getEventsForDay(tomorrow);
    if (events && events.length > 0) {
      const evTitles = events.map(ev => {
        const startStr = ev.isAllDayEvent() ? "Todo el día" : Utilities.formatDate(ev.getStartTime(), tz, "HH:mm");
        return `${startStr} ${ev.getTitle()}`;
      });
      calLine = `📅 _Calendar: ${evTitles.join("; ")}_`;
    }
  } catch (e) {}

  // 5) REFLEXIÓN NOCTURNA ESTOICA
  const quotes = [
    "La disciplina de la noche es la victoria del alba.",
    "Prepara el terreno hoy; despierta como comandante mañana.",
    "No negocies con la inercia: cumple tu siguiente deber con calma.",
    "Mente limpia, ropa lista y descanso reparador."
  ];
  const quote = quotes[now.getDate() % quotes.length];

  // Ensamblar mensaje final ultra-compacto
  const messageText = `🌙 *JAGUAR • 21:00* | Víspera de *${tomorrowName}*

${flagsLine}

${retoLine}

⚔️ *Plan de Mañana:*
${blocksLines}
${calLine}

🏛️ _"${quote}"_

📲 ${appUrl}`;

  // Envío a WhatsApp vía Green-API
  const url = `https://api.green-api.com/waInstance${GREEN_API_CONFIG.idInstance}/sendMessage/${GREEN_API_CONFIG.apiTokenInstance}`;
  const payload = {
    chatId: GREEN_API_CONFIG.chatId,
    message: messageText
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log("Green-API WhatsApp response: " + response.getContentText());
  return response;
}


// --- 5. ACTIVADOR MAESTRO DUAL (09:00 AM + 09:00 PM EN GOOGLE APPS SCRIPT) ---
function activarAmbosCorreos9AMy9PM() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    const fn = t.getHandlerFunction();
    if (fn === "sendDailyMorningJaguarEmail" || fn === "sendDailyNightTomorrowEmail") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // 1) Correo Matutino todos los días a las 09:00 AM (Hora Europea: Europe/Berlin)
  ScriptApp.newTrigger("sendDailyMorningJaguarEmail")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  // 2) Correo Nocturno todos los días a las 21:00 (9:00 PM Hora Europea: Europe/Berlin)
  ScriptApp.newTrigger("sendDailyNightTomorrowEmail")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  // Enviar ambos correos de prueba ahora para verificar tus eventos de hoy y mañana en Google Calendar
  sendDailyMorningJaguarEmail();
  sendDailyNightTomorrowEmail();
  Logger.log("✅ Correos 09:00 AM y 09:00 PM activados con Google Calendar en vivo.");
}

function activarCorreo9AM() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    const fn = t.getHandlerFunction();
    if (fn === "sendDailyMorningJaguarEmail" || fn === "sendDailyNightTomorrowEmail") {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger("sendDailyMorningJaguarEmail")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  sendDailyMorningJaguarEmail();
  Logger.log("✅ Solo Correo Matutino 09:00 AM (Europe/Berlin) activo. Correo nocturno desactivado.");
}

function soloCorreo9AM() {
  activarCorreo9AM();
}

function sendDailyMorningJaguarEmail() {
  const recipient = Session.getActiveUser().getEmail() || "danisantander.urrutia@gmail.com";
  const tz = "Europe/Berlin";
  const now = new Date();
  const daysIso = ["", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
  const dayName = daysIso[parseInt(Utilities.formatDate(now, tz, "u"), 10)];
  const dateStr = Utilities.formatDate(now, tz, "dd/MM/yyyy");
  const appUrl = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/";

  const schedules = {
    "LUNES": [
      { time: "09:00 - 09:30", title: "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", badge: "🥊 Deporte", color: "#15803d" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Empleo Profesión + Trabajos Locales Hannover", badge: "👑 Vida", color: "#b45309" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", badge: "🧠 Mente", color: "#0f766e" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción)", badge: "🧭 Exploración", color: "#1d4ed8" }
    ],
    "MARTES": [
      { time: "09:00 - 09:30", title: "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", badge: "🥊 Deporte", color: "#15803d" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", badge: "👑 Vida", color: "#b45309" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", badge: "🧠 Mente", color: "#0f766e" },
      { time: "19:30 - 21:00", title: "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", badge: "💖 Amor", color: "#be185d" }
    ],
    "MIÉRCOLES": [
      { time: "09:00 - 09:30", title: "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", badge: "🌿 Salud", color: "#15803d" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", badge: "👑 Vida", color: "#b45309" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", badge: "🧭 Exploración", color: "#0f766e" },
      { time: "14:30 - 17:30", title: "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", badge: "🌲 Naturaleza", color: "#15803d" }
    ],
    "JUEVES": [
      { time: "09:00 - 09:30", title: "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", badge: "🥊 Deporte", color: "#15803d" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", badge: "👑 Vida", color: "#b45309" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", badge: "🧭 Exploración", color: "#1d4ed8" },
      { time: "20:00 - 21:30", title: "💆 Aftercare, Masajes en Pareja & Descompresión Somática", badge: "💖 Amor", color: "#be185d" }
    ],
    "VIERNES": [
      { time: "09:00 - 09:30", title: "🥊 Sparring / Cardio Matutino & Ducha Fría", badge: "🥊 Deporte", color: "#15803d" },
      { time: "09:30 - 12:45", title: "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", badge: "👑 Vida", color: "#b45309" },
      { time: "16:00 - 18:00", title: "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", badge: "🌲 Naturaleza", color: "#15803d" },
      { time: "20:00 - 23:00", title: "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", badge: "💖 Amor", color: "#be185d" }
    ],
    "SÁBADO": [
      { time: "09:30 - 11:00", title: "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", badge: "🥊 Deporte", color: "#15803d" },
      { time: "11:30 - 13:30", title: "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", badge: "🧭 Exploración", color: "#1d4ed8" },
      { time: "16:00 - 18:30", title: "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", badge: "🌲 Naturaleza", color: "#15803d" },
      { time: "20:30 - 22:30", title: "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", badge: "💖 Amor", color: "#be185d" }
    ],
    "DOMINGO": [
      { time: "10:00 - 10:45", title: "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", badge: "🪙 Soberanía", color: "#b45309" },
      { time: "11:00 - 12:30", title: "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", badge: "🕯️ Espíritu", color: "#6d28d9" },
      { time: "13:00 - 14:30", title: "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", badge: "🌿 Salud", color: "#15803d" },
      { time: "18:00 - 20:00", title: "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", badge: "🧠 Mente", color: "#0f766e" }
    ]
  };

  // --- LECTURA DEL ESTADO REAL DEL USUARIO (SIN ASUMIR PROGRESO SI NO ESTÁ MARCADO) ---
  let realState = { noPornDays: 0, noPornMarked: false, weeklyAuraXP: {} };
  try {
    const rawProp = PropertiesService.getUserProperties().getProperty("CABALLERO_JAGUAR_STATE");
    if (rawProp) {
      const parsed = JSON.parse(rawProp);
      if (parsed && typeof parsed === "object") {
        realState = {
          noPornDays: Math.max(0, Number(parsed.noPornDays) || 0),
          noPornMarked: Boolean(parsed.noPornMarked),
          weeklyAuraXP: (parsed.weeklyAuraXP && typeof parsed.weeklyAuraXP === "object") ? parsed.weeklyAuraXP : {}
        };
      }
    }
  } catch (stErr) {}

  // 1) CONTADOR REAL DE DÍAS SIN FAP (RETO 21 DÍAS)
  const noPornDays = realState.noPornMarked ? realState.noPornDays : 0;
  let reto21Html = "";
  if (noPornDays <= 0) {
    reto21Html = `
      <div style="background: #fef2f2; border: 1.5px solid #ef4444; border-left: 5px solid #b91c1c; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.8px;">
          🦅 Reto 21 Días Sin Fap • Racha en pausa / 0 días
        </div>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #7f1d1d; line-height: 1.45;">
          Racha en pausa / 0 días. Si te mantuviste firme y olvidaste marcarlo, entra a reconciliar con honores; si hubo caída, hoy es tu nuevo Día 1 con cabeza fría.
        </p>
      </div>
    `;
  } else {
    const capped = Math.min(21, noPornDays);
    const filledSquares = "■ ".repeat(capped).trim();
    const emptySquares = "□ ".repeat(Math.max(0, 21 - capped)).trim();
    const barText = (filledSquares + (emptySquares ? " " + emptySquares : "")).trim();
    reto21Html = `
      <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-left: 5px solid #047857; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.8px;">
          🦅 Reto 21 Días Sin Fap • [Día ${noPornDays} de 21]
        </div>
        <div style="font-size: 13px; letter-spacing: 2px; color: #059669; font-weight: 900; margin: 6px 0;">
          ${barText}
        </div>
        <p style="margin: 0; font-size: 12.5px; color: #064e3b; line-height: 1.45;">
          Templanza activa (${noPornDays} día(s) firme(s)). Mente limpia, energía preservada y dominio sobre el impulso.
        </p>
      </div>
    `;
  }

  // 2) PROTOCOLO TÁCTICO DE BANDERAS SEMANALES (XP REAL REGISTRADO ESTA SEMANA)
  const auraDefs = [
    { key: "vida", label: "👑 Vida" },
    { key: "exploracion", label: "🧭 Exploración" },
    { key: "amor", label: "💖 Amor" },
    { key: "mente", label: "🧠 Mente" },
    { key: "salud", label: "🌿 Salud" },
    { key: "deporte", label: "🥊 Deporte" },
    { key: "soberania", label: "🪙 Soberanía" },
    { key: "naturaleza", label: "🌲 Naturaleza" },
    { key: "espiritualidad", label: "🕯️ Espíritu" }
  ];

  const activeFlags = [];
  const shadowFlags = [];
  auraDefs.forEach(a => {
    const xpVal = Number(realState.weeklyAuraXP[a.key]) || 0;
    if (xpVal > 0) {
      activeFlags.push(`${a.label} (${xpVal} XP)`);
    } else {
      shadowFlags.push(a.label);
    }
  });
  const activeCount = activeFlags.length;

  let banderasHtml = "";
  if (activeCount === 0) {
    banderasHtml = `
      <div style="background: #fff7ed; border: 1.5px solid #f97316; border-left: 5px solid #c2410c; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 0.8px;">
          🚩 [Alerta de Inercia] • 0 / 9 Banderas Activadas Esta Semana
        </div>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #7c2d12; line-height: 1.45;">
          Campamento frío. Elige UNA sola bandera hoy —ej. 20 min de deporte o foco— y sal del cero.
        </p>
      </div>
    `;
  } else if (activeCount <= 3) {
    banderasHtml = `
      <div style="background: #fefce8; border: 1.5px solid #eab308; border-left: 5px solid #a16207; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #a16207; text-transform: uppercase; letter-spacing: 0.8px;">
          ⚔️ [Chequeo Táctico] • ${activeCount} / 9 Banderas Activadas Esta Semana
        </div>
        <p style="margin: 6px 0 8px 0; font-size: 13px; color: #713f12; line-height: 1.45;">
          Llevas ${activeCount} frente(s) activo(s), pero el resto sigue en sombra. ¿Dónde está el cuello de botella o fuga de energía? Reconquista un flanco hoy.
        </p>
        <div style="font-size: 11.5px; color: #422006; line-height: 1.5;">
          <strong>Encendidas:</strong> ${activeFlags.join(" · ")}<br>
          <strong>En sombra (0 XP):</strong> ${shadowFlags.join(" · ")}
        </div>
      </div>
    `;
  } else {
    banderasHtml = `
      <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-left: 5px solid #047857; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.8px;">
          🏆 [Tracción &amp; Felicitación] • ${activeCount} / 9 Banderas Encendidas
        </div>
        <p style="margin: 6px 0 8px 0; font-size: 13px; color: #064e3b; line-height: 1.45;">
          Gran tracción con ${activeCount} banderas encendidas. El impulso está de tu lado; mantén el ritmo y consolida la semana.
        </p>
        <div style="font-size: 11.5px; color: #065f46; line-height: 1.5;">
          <strong>Frentes activos:</strong> ${activeFlags.join(" · ")}
        </div>
      </div>
    `;
  }

  // 3) ORÁCULO ESTOICO ALINEADO AL ESTADO DEL DÍA
  const reconstructionOracles = [
    { q: "No te avergüences de volver a empezar: levántate con cabeza fría y cumple el siguiente deber pequeño con dignidad.", a: "Marco Aurelio • Fuerza y Reconstrucción" },
    { q: "Cada día que rompes la inercia con una sola acción concreta, la mente recupera su trono.", a: "Epicteto • Discursos" },
    { q: "No es la caída lo que define al caballero, sino la rapidez y serenidad con la que vuelve a empuñar el timón.", a: "Séneca • Cartas a Lucilio" }
  ];
  const consolidationOracles = [
    { q: "No gastes más tiempo argumentando lo que debería ser un buen hombre. Sé uno hoy mismo y sostén el impulso.", a: "Marco Aurelio • Meditaciones X, 16" },
    { q: "La constancia convierte la disciplina diaria en carácter inquebrantable. Consolida hoy lo que ya encendiste.", a: "Séneca • Sobre la Firmeza del Sabio" },
    { q: "El alma se tiñe del color de sus pensamientos y de sus actos repetidos. Mantén el ritmo.", a: "Marco Aurelio • Meditaciones V, 16" }
  ];

  const isZeroState = (noPornDays <= 0 || activeCount === 0);
  const oraclePool = isZeroState ? reconstructionOracles : consolidationOracles;
  const oracle = oraclePool[now.getDate() % oraclePool.length];

  const todayBlocks = schedules[dayName] || schedules["LUNES"];
  const dayOfMonth = now.getDate();
  const mainMission = (todayBlocks[1] || todayBlocks[0]).title;
  const mainTime = (todayBlocks[1] || todayBlocks[0]).time;
  const heroImgUrl = appUrl + "assets/img_jaguar_jungle_landing.jpg";
  const logoImgUrl = appUrl + "assets/jungle_jaguar_logo.jpg";

  // Leer eventos REALES de Google Calendar para HOY
  let gcalTodayHtml = "";
  try {
    const events = CalendarApp.getDefaultCalendar().getEventsForDay(now);
    if (events && events.length > 0) {
      const evItems = events.map(ev => {
        const startStr = ev.isAllDayEvent() ? "Todo el día" : Utilities.formatDate(ev.getStartTime(), Session.getScriptTimeZone() || "Europe/Berlin", "HH:mm");
        const endStr = ev.isAllDayEvent() ? "" : (" - " + Utilities.formatDate(ev.getEndTime(), Session.getScriptTimeZone() || "Europe/Berlin", "HH:mm"));
        return `<div style="padding: 6px 10px; background: #ffffff; border-left: 3.5px solid #1d4ed8; border-radius: 6px; margin-bottom: 6px; font-size: 13px; color: #1e293b;">
          <strong style="color: #1d4ed8;">📅 ${startStr}${endStr}</strong> • ${ev.getTitle()}
        </div>`;
      }).join("");
      gcalTodayHtml = `
        <div style="background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 12px; padding: 12px 14px; margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            📆 Tu Agenda Real en Google Calendar Hoy (${events.length})
          </div>
          ${evItems}
        </div>
      `;
    } else {
      gcalTodayHtml = `
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 10px 14px; margin-bottom: 18px; font-size: 12.5px; color: #475569;">
          📆 <strong>Google Calendar Hoy:</strong> Sin reuniones externas — día despejado para tu Misión Principal.
        </div>
      `;
    }
  } catch (e) {}

  let tkAlert = "";
  if (dayOfMonth >= 11 && dayOfMonth <= 16) {
    tkAlert = `
      <div style="background: #eff6ff; border: 1.5px solid #3b82f6; border-left: 5px solid #1d4ed8; border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #1d4ed8; text-transform: uppercase;">🏥 Recordatorio Día 15 • Techniker Krankenkasse (TK)</div>
        <div style="font-size: 13px; color: #1e3a8a; margin-top: 3px;">Recuerda verificar el pago mensual de tu seguro estudiantil TK y marcarlo en la app.</div>
      </div>
    `;
  }

  const blocksHtml = todayBlocks.map((b, idx) => `
    <div style="background: #ffffff; border: 1px solid #e6dec8; border-left: 4px solid ${b.color}; border-radius: 10px; padding: 12px 14px; margin-bottom: 10px;">
      <div style="font-size: 11px; font-weight: 800; color: ${b.color}; margin-bottom: 3px;">#${idx + 1} • ⏱️ ${b.time} (${b.badge})</div>
      <div style="font-size: 14px; font-weight: 700; color: #1c1917;">${b.title}</div>
    </div>
  `).join("");

  const subject = "☀️ [Caballero Jaguar 9:00 AM • " + dayName + "] Misión del Día, Google Calendar y 4 Bloques (" + dateStr + ")";
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #faf6ee; border: 2px solid #c59a28; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(180deg, rgba(6, 78, 59, 0.72) 0%, rgba(15, 118, 110, 0.88) 100%), url('${heroImgUrl}') center/cover no-repeat; padding: 28px 20px; text-align: center; color: #fff;">
        <img src="${logoImgUrl}" alt="Caballero Jaguar" width="60" height="60" style="width: 60px; height: 60px; border-radius: 50%; border: 2.5px solid #fde047; object-fit: cover; margin-bottom: 8px;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #fef08a; text-transform: uppercase;">☀️ Despertar de Acción • Caballero Jaguar (09:00 AM)</div>
        <h1 style="margin: 6px 0 4px 0; font-size: 22px; color: #fff;">¡Buenos días, Daniel!</h1>
        <p style="margin: 0; font-size: 13px; color: #d1fae5;">${dayName} • ${dateStr}</p>
      </div>
      <div style="padding: 22px 18px; color: #1c1917;">
        <div style="background: linear-gradient(135deg, #064e3b 0%, #0f766e 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; color: #fff;">
          <div style="font-size: 10.5px; font-weight: 800; color: #fde047; text-transform: uppercase; letter-spacing: 1px;">👑 Misión Principal de Hoy (${mainTime})</div>
          <div style="font-size: 15px; font-weight: 800; margin-top: 4px; line-height: 1.35;">${mainMission}</div>
        </div>
        <div style="background: #fffbeb; border: 1px solid #f59e0b; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 18px;">
          <div style="font-size: 10.5px; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 4px;">✨ Oráculo Estoico &amp; Fuego Aries ♈</div>
          <em style="font-size: 14px; color: #292524;">"${oracle.q}"</em>
          <div style="font-size: 11px; font-weight: 800; color: #92400e; margin-top: 4px;">— ${oracle.a}</div>
        </div>
        ${tkAlert}
        ${reto21Html}
        ${banderasHtml}
        ${gcalTodayHtml}
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #15803d, #0d9488); color: #fff; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 26px; border-radius: 99px;">
            📱 ABRIR CHECK-IN &amp; MODO FOCO EN EL CELULAR &rarr;
          </a>
        </div>
        <div style="font-size: 12px; font-weight: 800; color: #065f46; text-transform: uppercase; margin-bottom: 8px;">🎯 Tus 4 Bloques Tácticos de Hoy (${dayName}):</div>
        ${blocksHtml}
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}


// ==============================================================================
// 7. MOTOR NOCTURNO AUTOMÁTICO DE WHATSAPP 21:00 (GREEN-API)
// ==============================================================================
// INSTRUCCIÓN DE ACTIVACIÓN EN 1 CLIC:
// 1. En Google Apps Script (script.google.com), selecciona la función `activarReporteNocturnoWhatsApp9PM`.
// 2. Haz clic en "Ejecutar" (Run).
// ¡Eso creará automáticamente el reloj diario a las 21:00 (Europe/Berlin) y te enviará uno de prueba a tu WhatsApp!

const GREEN_API_CONFIG = {
  idInstance: "710722811758",
  apiTokenInstance: "18d1ccd9e09e486daa60f195ea879bdfe5c63bff2fa046d08d",
  chatId: "4917676497440@c.us"
};

function activarReporteNocturnoWhatsApp9PM() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === "sendDailyNightTomorrowWhatsApp") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Disparo automático diario a las 21:00 hora de Alemania (Europe/Berlin)
  ScriptApp.newTrigger("sendDailyNightTomorrowWhatsApp")
    .timeBased()
    .everyDays(1)
    .atHour(21)
    .nearMinute(0)
    .inTimezone("Europe/Berlin")
    .create();

  // Enviar mensaje de prueba inmediato a WhatsApp
  sendDailyNightTomorrowWhatsApp();
  Logger.log("✅ Reporte Nocturno de WhatsApp 21:00 (Green-API) activado con éxito.");
}

function sendDailyNightTomorrowWhatsApp() {
  const tz = "Europe/Berlin";
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const daysIso = ["", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
  const tomorrowName = daysIso[parseInt(Utilities.formatDate(tomorrow, tz, "u"), 10)];
  const tomorrowDateStr = Utilities.formatDate(tomorrow, tz, "dd/MM/yyyy");
  const appUrl = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/";

  const schedules = {
    "LUNES": [
      { time: "09:00 - 09:30", title: "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Empleo Profesión + Trabajos Locales Hannover", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", badge: "Mente" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción)", badge: "Exploración" }
    ],
    "MARTES": [
      { time: "09:00 - 09:30", title: "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", badge: "Mente" },
      { time: "19:30 - 21:00", title: "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", badge: "Amor" }
    ],
    "MIÉRCOLES": [
      { time: "09:00 - 09:30", title: "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", badge: "Salud" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", badge: "Vida" },
      { time: "13:00 - 13:20", title: "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", badge: "Exploración" },
      { time: "14:30 - 17:30", title: "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", badge: "Naturaleza" }
    ],
    "JUEVES": [
      { time: "09:00 - 09:30", title: "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", badge: "Vida" },
      { time: "14:30 - 17:30", title: "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", badge: "Exploración" },
      { time: "20:00 - 21:30", title: "💆 Aftercare, Masajes en Pareja & Descompresión Somática", badge: "Amor" }
    ],
    "VIERNES": [
      { time: "09:00 - 09:30", title: "🥊 Sparring / Cardio Matutino & Ducha Fría", badge: "Deporte" },
      { time: "09:30 - 12:45", title: "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", badge: "Vida" },
      { time: "16:00 - 18:00", title: "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", badge: "Naturaleza" },
      { time: "20:00 - 23:00", title: "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", badge: "Amor" }
    ],
    "SÁBADO": [
      { time: "09:30 - 11:00", title: "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", badge: "Deporte" },
      { time: "11:30 - 13:30", title: "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", badge: "Exploración" },
      { time: "16:00 - 18:30", title: "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", badge: "Naturaleza" },
      { time: "20:30 - 22:30", title: "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", badge: "Amor" }
    ],
    "DOMINGO": [
      { time: "10:00 - 10:45", title: "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", badge: "Soberanía" },
      { time: "11:00 - 12:30", title: "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", badge: "Espíritu" },
      { time: "13:00 - 14:30", title: "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", badge: "Salud" },
      { time: "18:00 - 20:00", title: "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", badge: "Mente" }
    ]
  };

  const nightReflections = [
    { q: "Antes de dormir, revisa tu día con serenidad: ¿qué hiciste bien, qué puedes mejorar mañana y qué carga puedes soltar ahora?", a: "Séneca • De la Ira III, 36" },
    { q: "Prepara esta noche el terreno de mañana: ropa lista, mente limpia y descanso reparador para despertar como comandante.", a: "Marco Aurelio • Meditaciones" },
    { q: "Quien ordena su mañana desde la noche anterior despierta libre de fricción y con soberanía sobre su tiempo.", a: "Códice Caballero Jaguar" },
    { q: "La disciplina de la noche es el cimiento de la victoria matutina. Cuida tu sueño como el templo de tu fuerza.", a: "Epicteto • Manual de Vida" }
  ];

  // Leer estado real sincronizado desde la app web (o defaults)
  const realState = getStoredCaballeroState();
  const noPornDays = Number(realState.noPornDays) || 0;

  // 1) PROTOCOLO DINÁMICO DE BANDERAS SEMANALES
  const auraDefs = [
    { key: "vida", label: "👑 Vida" },
    { key: "exploracion", label: "🧭 Exploración" },
    { key: "amor", label: "💖 Amor" },
    { key: "mente", label: "🧠 Mente" },
    { key: "salud", label: "🌿 Salud" },
    { key: "deporte", label: "🥊 Deporte" },
    { key: "soberania", label: "🪙 Soberanía" },
    { key: "naturaleza", label: "🌲 Naturaleza" },
    { key: "espiritualidad", label: "🕯️ Espíritu" }
  ];

  const activeFlags = [];
  auraDefs.forEach(a => {
    const xpVal = Number(realState.weeklyAuraXP[a.key]) || 0;
    if (xpVal > 0) activeFlags.push(`${a.label} (${xpVal} XP)`);
  });
  const activeCount = activeFlags.length;

  let flagsLine = "";
  if (activeCount === 0) {
    flagsLine = "🚩 *Banderas:* 0/9 encendidas ⚪\n_Campamento frío. Mañana sal del cero con 1 frente._";
  } else if (activeCount <= 3) {
    flagsLine = `🚩 *Banderas:* ${activeCount}/9 (${activeFlags.join(" · ")}) ⚠️\n_Flancos en sombra. ¿Dónde está el freno?_`;
  } else {
    flagsLine = `🚩 *Banderas:* ${activeCount}/9 (${activeFlags.join(" · ")}) 🔥\n_¡Gran tracción! Mantén el ritmo._`;
  }

  // 2) ESTADO DEL DESAFÍO 21 DÍAS (NO FAP / TEMPLANZA)
  let retoLine = "";
  if (noPornDays <= 0) {
    retoLine = "🔥 *Reto 21d:* 0/21 (Pausa) ⚠️\n_¿Olvidaste marcar o es Día 1?_";
  } else {
    const filled = Math.min(21, noPornDays);
    const bar = "▓".repeat(filled) + "░".repeat(21 - filled);
    retoLine = `🔥 *Reto 21d:* ${bar} ${filled}/21d\n_Templanza y energía vital al mando._`;
  }

  // 3) PLANES PARA MAÑANA (HORARIOS TÁCTICOS COMPACTOS)
  const tomorrowBlocks = schedules[tomorrowName] || schedules["LUNES"];
  const blocksLines = tomorrowBlocks.map((b) => `• ${b.time.split(" - ")[0]} [${b.badge}] ${b.title.split(":")[1] || b.title}`).join("\n");

  // 4) AGENDA REAL GOOGLE CALENDAR
  let calLine = "📅 _Calendar: Sin reuniones externas_";
  try {
    const cal = CalendarApp.getDefaultCalendar();
    const events = cal.getEventsForDay(tomorrow);
    if (events && events.length > 0) {
      const evTitles = events.map(ev => {
        const startStr = ev.isAllDayEvent() ? "Todo el día" : Utilities.formatDate(ev.getStartTime(), tz, "HH:mm");
        return `${startStr} ${ev.getTitle()}`;
      });
      calLine = `📅 _Calendar: ${evTitles.join("; ")}_`;
    }
  } catch (e) {}

  // 5) REFLEXIÓN NOCTURNA ESTOICA
  const quotes = [
    "La disciplina de la noche es la victoria del alba.",
    "Prepara el terreno hoy; despierta como comandante mañana.",
    "No negocies con la inercia: cumple tu siguiente deber con calma.",
    "Mente limpia, ropa lista y descanso reparador."
  ];
  const quote = quotes[now.getDate() % quotes.length];

  // Ensamblar mensaje final ultra-compacto
  const messageText = `🌙 *JAGUAR • 21:00* | Víspera de *${tomorrowName}*

${flagsLine}

${retoLine}

⚔️ *Plan de Mañana:*
${blocksLines}
${calLine}

🏛️ _"${quote}"_

📲 ${appUrl}`;

  // Envío a WhatsApp vía Green-API
  const url = `https://api.green-api.com/waInstance${GREEN_API_CONFIG.idInstance}/sendMessage/${GREEN_API_CONFIG.apiTokenInstance}`;
  const payload = {
    chatId: GREEN_API_CONFIG.chatId,
    message: messageText
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log("Green-API WhatsApp response: " + response.getContentText());
  return response;
}

