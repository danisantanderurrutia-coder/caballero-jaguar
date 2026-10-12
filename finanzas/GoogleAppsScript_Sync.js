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
