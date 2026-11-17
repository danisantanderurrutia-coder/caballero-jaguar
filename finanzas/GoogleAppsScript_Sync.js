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


// --- 2. ENDPOINT WEBHOOK (RECEPTOR DESDE JAGUAR ROSA APP) ---
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
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


// --- 4. CORREO MATUTINO 9:00 AM AUTOMÁTICO DESDE TU PROPIO GMAIL (GOOGLE APPS SCRIPT) ---
// INSTRUCCIÓN EN 1 CLIC:
// Pega este código en https://script.google.com (o en Extensiones -> Apps Script de tu Google Sheet),
// selecciona arriba la función `activarCorreo9AM` y dale a "Ejecutar" (Run).
// ¡Eso dejará programado automáticamente el envío todos los días a las 09:00 AM y te enviará uno de prueba!

function activarCorreo9AM() {
  // Eliminar activadores previos de esta función para no duplicar
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === "sendDailyMorningJaguarEmail") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Crear activador diario a las 09:00 AM (9 a 10 AM hora local de tu cuenta Google)
  ScriptApp.newTrigger("sendDailyMorningJaguarEmail")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  // Enviar un correo de prueba inmediato para confirmar que funciona
  sendDailyMorningJaguarEmail();
  Logger.log("✅ Correo Matutino de las 09:00 AM activado y correo de prueba enviado.");
}

function sendDailyMorningJaguarEmail() {
  const recipient = Session.getActiveUser().getEmail() || "danisantander.urrutia@gmail.com";
  const now = new Date();
  const days = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const dayName = days[now.getDay()];
  const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone() || "Europe/Berlin", "dd/MM/yyyy");
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

  const oracles = [
    { q: "Al amanecer, cuando te cueste levantarte, dite a ti mismo: me despierto para hacer la obra de un ser humano vivo y libre.", a: "Marco Aurelio • Meditaciones V, 1" },
    { q: "No gastes más tiempo argumentando lo que debería ser un buen hombre. Sé uno hoy mismo.", a: "Marco Aurelio • Meditaciones X, 16" },
    { q: "Primero di a ti mismo quién quieres ser; y luego haz con alegría lo que tengas que hacer.", a: "Epicteto • Discursos" },
    { q: "Cada nuevo día es una vida entera en miniatura: despierta con propósito, actúa con presencia y descansa en paz.", a: "Séneca • Cartas a Lucilio" },
    { q: "El alma se tiñe del color de sus pensamientos. Tiñe hoy tu mente de luz, enfoque y templanza.", a: "Marco Aurelio • Meditaciones V, 16" },
    { q: "Caminar en belleza (Hózhó): que haya belleza delante de ti, detrás de ti y en cada paso que des hoy.", a: "Tradición Navajo Diné • Rito del Jaguar" }
  ];

  const todayBlocks = schedules[dayName] || schedules["LUNES"];
  const oracle = oracles[now.getDate() % oracles.length];
  const dayOfMonth = now.getDate();

  let tkAlert = "";
  if (dayOfMonth >= 11 && dayOfMonth <= 16) {
    tkAlert = `
      <div style="background: #eff6ff; border: 1.5px solid #3b82f6; border-left: 5px solid #1d4ed8; border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 800; color: #1d4ed8; text-transform: uppercase;">🏥 Recordatorio Día 15 • Techniker Krankenkasse (TK)</div>
        <div style="font-size: 13px; color: #1e3a8a; margin-top: 3px;">Recuerda verificar el pago mensual de tu seguro estudiantil TK (~145 €) y marcarlo en la app.</div>
      </div>
    `;
  }

  const blocksHtml = todayBlocks.map((b, idx) => `
    <div style="background: #ffffff; border: 1px solid #e6dec8; border-left: 4px solid ${b.color}; border-radius: 10px; padding: 12px 14px; margin-bottom: 10px;">
      <div style="font-size: 11px; font-weight: 800; color: ${b.color}; margin-bottom: 3px;">#${idx + 1} • ⏱️ ${b.time} (${b.badge})</div>
      <div style="font-size: 14px; font-weight: 700; color: #1c1917;">${b.title}</div>
    </div>
  `).join("");

  const subject = "☀️ [Caballero Jaguar 9:00 AM • " + dayName + "] Tu Pulso de Vida, 4 Bloques y Check-in (" + dateStr + ")";
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #faf6ee; border: 2px solid #c59a28; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #064e3b 0%, #0f766e 55%, #b45309 100%); padding: 26px 20px; text-align: center; color: #fff;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #fef08a; text-transform: uppercase;">🌿 Santuario Solar • Caballero Jaguar</div>
        <h1 style="margin: 6px 0 4px 0; font-size: 22px; color: #fff;">☀️ ¡Buenos días, Daniel! (09:00 AM)</h1>
        <p style="margin: 0; font-size: 13px; color: #d1fae5;">${dayName} • ${dateStr}</p>
      </div>
      <div style="padding: 22px 18px; color: #1c1917;">
        <div style="background: #fffbeb; border: 1px solid #f59e0b; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 18px;">
          <em style="font-size: 14px; color: #292524;">"${oracle.q}"</em>
          <div style="font-size: 11px; font-weight: 800; color: #92400e; margin-top: 4px;">— ${oracle.a}</div>
        </div>
        ${tkAlert}
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #15803d, #0d9488); color: #fff; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 26px; border-radius: 99px;">
            📱 ABRIR CHECK-IN MATUTINO EN EL CELULAR &rarr;
          </a>
        </div>
        <div style="font-size: 12px; font-weight: 800; color: #065f46; text-transform: uppercase; margin-bottom: 8px;">🎯 Tus 4 Bloques Vitales de Hoy (${dayName}):</div>
        ${blocksHtml}
        <div style="background: #f5efe2; border: 1px solid #d6cbb5; border-radius: 10px; padding: 12px 14px; margin-top: 14px; font-size: 12.5px; color: #44403c;">
          🦅 <strong>Reto 21 Días &amp; 9 Banderines:</strong> Día 100% Limpio (0 Porno), 3.2L de agua y marca tus prioridades cumplidas desde el celular.
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
