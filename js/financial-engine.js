/* ==========================================================================
   JAGUAR ROSA - MOTOR DE BALANCE ECONÓMICO, GASTOS & ANÁLISIS DE BANCOS
   Compatible con informes y extractos de Sparkasse (€) y Banco Chile ($)
   ========================================================================== */

const FINANCIAL_STORAGE_KEY = "JAGUAR_ROSA_FINANCES_V1";

let financeState = {
  currencyPrimary: "EUR", // EUR o CLP
  eurToClpRate: 1050,      // Tasa de cambio referencial 1 EUR = 1050 CLP
  transactions: [
    { id: "f1", date: "2026-08-01", desc: "Renta / Arriendo de vivienda", amount: 750, currency: "EUR", category: "fijos", bank: "Sparkasse" },
    { id: "f2", date: "2026-08-03", desc: "Supermercado Edeka / Lidl", amount: 120, currency: "EUR", category: "alimentacion", bank: "Sparkasse" },
    { id: "f3", date: "2026-08-05", desc: "Servicios Básicos & Internet", amount: 85, currency: "EUR", category: "fijos", bank: "Sparkasse" },
    { id: "f4", date: "2026-08-08", desc: "Transferencia Banco Chile (Fondo Ahorro)", amount: 350000, currency: "CLP", category: "ahorro", bank: "Banco Chile" },
    { id: "f5", date: "2026-08-10", desc: "Suscripciones Streaming & Gym", amount: 45, currency: "EUR", category: "ocio", bank: "Sparkasse" },
    { id: "f6", date: "2026-08-14", desc: "Restaurante & Salida de parejos", amount: 75, currency: "EUR", category: "ocio", bank: "Sparkasse" },
    { id: "f7", date: "2026-08-16", desc: "Ingreso Trabajo / Honorarios", amount: 2800, currency: "EUR", category: "ingreso", bank: "Sparkasse" }
  ],
  avoidedExpenses: [
    { id: "av-1", date: "2026-09-02", desc: "No pagué por café de máquina / merienda innecesaria", amount: 4.5, currency: "EUR" },
    { id: "av-2", date: "2026-09-04", desc: "Cocinó en casa en lugar de pedir delivery", amount: 18.0, currency: "EUR" },
    { id: "av-3", date: "2026-09-06", desc: "Evitó compra impulsiva en Amazon", amount: 35.0, currency: "EUR" },
    { id: "av-4", date: "2026-09-08", desc: "Canceló suscripción que no utilizaba", amount: 12.99, currency: "EUR" }
  ],
  monthlyBudgetGoal: 1200, // Meta de gastos en EUR
  ocioBudgetGoal: 150,     // Presupuesto mensual recomendado para Ocio en EUR
  googleSheetUrl: ""      // URL o ID del Google Sheet conectado
};

function loadFinanceState() {
  const saved = localStorage.getItem(FINANCIAL_STORAGE_KEY);
  if (saved) {
    try {
      financeState = Object.assign({}, financeState, JSON.parse(saved));
      if (!Array.isArray(financeState.avoidedExpenses)) {
        financeState.avoidedExpenses = [
          { id: "av-1", date: "2026-09-02", desc: "No pagué por café de máquina / merienda innecesaria", amount: 4.5, currency: "EUR" },
          { id: "av-2", date: "2026-09-04", desc: "Cocinó en casa en lugar de pedir delivery", amount: 18.0, currency: "EUR" },
          { id: "av-3", date: "2026-09-06", desc: "Evitó compra impulsiva en Amazon", amount: 35.0, currency: "EUR" },
          { id: "av-4", date: "2026-09-08", desc: "Canceló suscripción que no utilizaba", amount: 12.99, currency: "EUR" }
        ];
      }
    } catch (e) { console.error("Error al cargar estado financiero:", e); }
  }
}

function saveFinanceState() {
  localStorage.setItem(FINANCIAL_STORAGE_KEY, JSON.stringify(financeState));
}

// Convertir montos a EUR para totales unificados
function convertToEUR(amount, currency) {
  if (currency === "CLP") return amount / financeState.eurToClpRate;
  return amount;
}

// Convertir montos a CLP
function convertToCLP(amount, currency) {
  if (currency === "EUR") return amount * financeState.eurToClpRate;
  return amount;
}

// Formatear Moneda
function formatCurrency(amount, currency) {
  if (currency === "CLP") {
    return `$${Math.round(amount).toLocaleString('es-CL')} CLP`;
  }
  return `${amount.toFixed(2)} € EUR`;
}

// --- PARSER DE ARCHIVOS DE BANCOS (CSV, TXT, JSON) ---
function parseBankFileContent(content, filename = "") {
  let importedCount = 0;
  const lines = content.split(/\r?\n/);
  
  lines.forEach(line => {
    if (!line.trim() || line.toLowerCase().startsWith("fecha") || line.toLowerCase().startsWith("date")) return;

    let parts = line.split(";");
    if (parts.length < 3) parts = line.split(",");
    if (parts.length < 3) parts = line.split("\t");

    if (parts.length >= 3) {
      const date = parts[0].trim() || new Date().toISOString().split('T')[0];
      const desc = parts[1].trim() || "Gasto importado";
      let amountStr = parts[2].trim();
      
      let currency = filename.toLowerCase().includes("chile") ? "CLP" : "EUR";
      if (parts.length >= 4 && parts[3].trim()) {
        const declaredCurrency = parts[3].trim().toUpperCase();
        if (declaredCurrency === "CLP" || declaredCurrency === "EUR") {
          currency = declaredCurrency;
        }
      }

      let bank = currency === "CLP" ? "Banco Chile" : "Sparkasse";
      if (filename.toLowerCase().includes("chile")) bank = "Banco Chile";
      else if (filename.toLowerCase().includes("sparkasse")) bank = "Sparkasse";
      
      let amount = 0;
      if (currency === "EUR") {
        if (amountStr.includes(",")) {
          amountStr = amountStr.replace(/\./g, "").replace(",", ".");
        }
      } else {
        amountStr = amountStr.replace(/\./g, "").replace(",", "");
      }

      let amountRaw = amountStr.replace(/[^0-9.-]/g, '');
      amount = parseFloat(amountRaw) || 0;
      
      let category = "ocio";
      const descLower = desc.toLowerCase();
      if (descLower.includes("renta") || descLower.includes("arriendo") || descLower.includes("luz") || descLower.includes("miete") || descLower.includes("strom") || descLower.includes("stadtwerke")) category = "fijos";
      else if (descLower.includes("super") || descLower.includes("edeka") || descLower.includes("lidl") || descLower.includes("jumbo") || descLower.includes("einkauf")) category = "alimentacion";
      else if (descLower.includes("ingreso") || descLower.includes("gehalt") || descLower.includes("sueldo") || descLower.includes("honorarios") || descLower.includes("consultoría")) category = "ingreso";
      else if (descLower.includes("ahorro") || descLower.includes("fondos") || descLower.includes("etf") || descLower.includes("inversión")) category = "ahorro";

      if (amount !== 0) {
        financeState.transactions.unshift({
          id: "imp-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
          date: date,
          desc: desc,
          amount: Math.abs(amount),
          currency: currency,
          category: amount > 0 && category === "ingreso" ? "ingreso" : category,
          bank: bank
        });
        importedCount++;
      }
    }
  });

  saveFinanceState();
  renderFinanceDashboard();
  showNotification(`¡Éxito! Se procesaron e importaron ${importedCount} movimientos bancarios.`);
}

function deleteTransaction(id) {
  financeState.transactions = financeState.transactions.filter(t => t.id !== id);
  saveFinanceState();
  renderFinanceDashboard();
  showNotification("Movimiento eliminado.");
}

// --- CÁLCULO DE MÉTRICAS Y CONSEJOS DE AHORRO ---
function calculateFinancialMetrics() {
  let totalIngresosEUR = 0;
  let totalGastosEUR = 0;
  let gastosOcioEUR = 0;
  let gastosFijosEUR = 0;
  let ahorroEUR = 0;

  financeState.transactions.forEach(t => {
    const amountEUR = convertToEUR(t.amount, t.currency);
    if (t.category === "ingreso") {
      totalIngresosEUR += amountEUR;
    } else {
      totalGastosEUR += amountEUR;
      if (t.category === "ocio") gastosOcioEUR += amountEUR;
      if (t.category === "fijos") gastosFijosEUR += amountEUR;
      if (t.category === "ahorro") ahorroEUR += amountEUR;
    }
  });

  const balanceNetoEUR = totalIngresosEUR - totalGastosEUR;
  const tasaAhorroPct = totalIngresosEUR > 0 ? ((balanceNetoEUR + ahorroEUR) / totalIngresosEUR) * 100 : 0;

  let tips = [];
  if (gastosOcioEUR > financeState.ocioBudgetGoal) {
    const exceso = (gastosOcioEUR - financeState.ocioBudgetGoal).toFixed(2);
    tips.push(`⚠️ **Alerta de Ocio**: Excedes tu presupuesto tope de Ocio por **${exceso}€**. Considera pausar compras superfluas hasta el próximo mes.`);
  } else if (gastosOcioEUR > 0) {
    const restante = (financeState.ocioBudgetGoal - gastosOcioEUR).toFixed(2);
    tips.push(`💡 **Optimización de Ocio**: Has consumido el ${((gastosOcioEUR/financeState.ocioBudgetGoal)*100).toFixed(0)}% de tu tope de ocio. Te quedan **${restante}€** disponibles.`);
  }
  
  if (tasaAhorroPct < 20) {
    tips.push(`⚠️ **Regla 50/30/20**: Tu tasa de ahorro actual es de ${tasaAhorroPct.toFixed(1)}%. El objetivo recomendado del Jaguar es alcanzar al menos un 20% de reserva mensual.`);
  } else {
    tips.push(`🌟 **Excelente Resiliencia Financiera**: Tu capacidad de ahorro supera el 20%. Considera destinar este excedente al desarrollo de tus proyectos.`);
  }

  return {
    totalIngresosEUR,
    totalGastosEUR,
    balanceNetoEUR,
    gastosOcioEUR,
    gastosFijosEUR,
    tasaAhorroPct,
    tips
  };
}

// --- RENDERIZADO DEL GRÁFICO Y SEGUIMIENTO DE OCIO ---
function renderOcioProgressChart() {
  const container = document.getElementById("fin-ocio-chart-container");
  if (!container) return;

  const metrics = calculateFinancialMetrics();
  const ocioSpent = metrics.gastosOcioEUR;
  const ocioLimit = financeState.ocioBudgetGoal || 150;
  const pctUsed = Math.min(100, Math.round((ocioSpent / ocioLimit) * 100));

  let barColor = "var(--emerald-bright)";
  let statusBadge = `<span class="badge-tag badge-emerald">💚 Dentro del Límite</span>`;
  if (pctUsed > 85) {
    barColor = "var(--neon-pink-bright)";
    statusBadge = `<span class="badge-tag badge-pink">🚨 Límite Casi Excedido (${pctUsed}%)</span>`;
  } else if (pctUsed > 60) {
    barColor = "var(--neon-gold)";
    statusBadge = `<span class="badge-tag badge-gold">⚠️ Moderado (${pctUsed}%)</span>`;
  }

  // Filtrar movimientos de ocio
  const ocioTx = financeState.transactions.filter(t => t.category === "ocio");
  let ocioItemsHTML = ocioTx.map(t => {
    const amtEUR = convertToEUR(t.amount, t.currency);
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.1); font-size: 0.84rem;">
        <span style="color: #FFF;">🎭 ${t.desc} <small style="color: var(--text-dim);">(${t.date})</small></span>
        <span style="font-weight: 700; color: var(--neon-pink-bright);">${formatCurrency(t.amount, t.currency)} (${amtEUR.toFixed(2)}€)</span>
      </div>
    `;
  }).join("");

  if (!ocioItemsHTML) {
    ocioItemsHTML = `<div style="font-size: 0.8rem; color: var(--text-dim); text-align: center; padding: 10px;">No hay gastos de ocio registrados este mes.</div>`;
  }

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <div>
        <h4 style="font-size: 1.1rem; color: #FFF; margin-bottom: 2px;">🎭 Monitor de Gastos en Ocio</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Presupuesto Máximo Recomendado: <strong>${ocioLimit.toFixed(2)} € / mes</strong></p>
      </div>
      ${statusBadge}
    </div>

    <!-- BARRA VISUAL DE PROGRESO DE OCIO -->
    <div style="background: rgba(7,3,18,0.8); border: 1px solid var(--border-neon-pink); padding: 16px; border-radius: var(--radius-md); margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">
        <span>Gasto Actual en Ocio: <strong style="color: ${barColor};">${ocioSpent.toFixed(2)} €</strong></span>
        <span>${pctUsed}% consumido</span>
      </div>
      
      <div style="width: 100%; height: 18px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden; border: 1px solid rgba(255, 0, 127, 0.3); position: relative;">
        <div style="width: ${pctUsed}%; height: 100%; background: ${barColor}; transition: width 0.6s ease; box-shadow: 0 0 12px ${barColor};"></div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-dim); margin-top: 6px;">
        <span>0 €</span>
        <span>Umbral 50% (${(ocioLimit*0.5).toFixed(0)}€)</span>
        <span>Máximo ${ocioLimit.toFixed(0)} €</span>
      </div>
    </div>

    <!-- DESGLOSE DE GASTOS EN OCIO -->
    <div style="background: rgba(7,3,18,0.6); padding: 12px; border-radius: var(--radius-md);">
      <div style="font-size: 0.82rem; font-weight: 700; color: var(--neon-cyan); margin-bottom: 8px; text-transform: uppercase;">
        📋 Historial de Ocio y Estilo de Vida (${ocioTx.length} registros)
      </div>
      ${ocioItemsHTML}
    </div>
  `;
}

// --- INTEGRACIÓN GOOGLE SHEETS & GOOGLE DRIVE ---
function exportToGoogleSheetsCSV() {
  let csvContent = "Fecha;Descripcion;Monto;Moneda;Monto_EUR;Categoria;Banco\n";
  financeState.transactions.forEach(t => {
    const amtEUR = convertToEUR(t.amount, t.currency).toFixed(2);
    csvContent += `"${t.date}";"${t.desc.replace(/"/g, '""')}";${t.amount};"${t.currency}";${amtEUR};"${t.category}";"${t.bank}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Jaguar_Finanzas_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotification("¡Archivo CSV descargado! Listo para importar en tu Google Sheet.");
}

function copyTransactionsToClipboard() {
  let tsvContent = "Fecha\tDescripción\tMonto\tMoneda\tMonto EUR\tCategoría\tBanco\n";
  financeState.transactions.forEach(t => {
    const amtEUR = convertToEUR(t.amount, t.currency).toFixed(2);
    tsvContent += `${t.date}\t${t.desc}\t${t.amount}\t${t.currency}\t${amtEUR}\t${t.category}\t${t.bank}\n`;
  });

  navigator.clipboard.writeText(tsvContent).then(() => {
    showNotification("¡Datos copiados en formato Google Sheets (TSV)! Pégalos directamente con Ctrl+V en tu hoja.");
  }).catch(() => {
    showNotification("Error al copiar al portapapeles.");
  });
}

function saveGoogleSheetConfig() {
  const urlInput = document.getElementById("fin-gsheet-url");
  if (urlInput) {
    financeState.googleSheetUrl = urlInput.value.trim();
    saveFinanceState();
    showNotification("Conexión de Google Sheet guardada correctamente.");
  }
}

async function syncLiveToGoogleSheet() {
  if (!financeState.googleSheetUrl) {
    showNotification("⚠️ Configura primero la URL del Webhook de tu Google Sheet.");
    return;
  }

  showNotification("⏳ Sincronizando movimientos con Google Sheets...");
  
  try {
    const payload = {
      transactions: financeState.transactions,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(financeState.googleSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // Recomendado para Apps Script sin CORS preflight block
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.status === "success" || result.result === "success") {
      showNotification("✅ ¡Sincronización exitosa con tu Google Sheet!");
    } else {
      showNotification("⚠️ Google Sheet respondió con advertencia: " + (result.message || "revisa los logs"));
    }
  } catch (err) {
    console.error("Error al sincronizar con Google Sheets:", err);
    showNotification("⚠️ Enviado al Webhook (Revisa tu hoja de cálculo).");
  }
}

function showGoogleAppsScriptModal() {
  alert("📜 Puedes revisar el código de Apps Script y la guía paso a paso en la carpeta:\n\n📂 finanzas/GoogleAppsScript_Sync.js\n📂 finanzas/guia_monitoreo_bancario.md");
}

// --- RENDERIZADO DEL DASHBOARD FINANCIERO ---
function renderFinanceDashboard() {
  const container = document.getElementById("tab-finanzas");
  if (!container) return;

  const metrics = calculateFinancialMetrics();

  // Renderizar tarjetas de métricas
  const ingresosEl = document.getElementById("fin-total-ingresos");
  const gastosEl = document.getElementById("fin-total-gastos");
  const balanceEl = document.getElementById("fin-balance-neto");
  const ahorroPctEl = document.getElementById("fin-tasa-ahorro");

  if (ingresosEl) ingresosEl.innerText = `${metrics.totalIngresosEUR.toFixed(2)} €`;
  if (gastosEl) gastosEl.innerText = `${metrics.totalGastosEUR.toFixed(2)} €`;
  if (balanceEl) balanceEl.innerText = `${metrics.balanceNetoEUR.toFixed(2)} €`;
  if (ahorroPctEl) ahorroPctEl.innerText = `${metrics.tasaAhorroPct.toFixed(1)}%`;

  // Renderizar gráfico de Ocio
  renderOcioProgressChart();

  // Renderizar lista de consejos de ahorro
  const tipsContainer = document.getElementById("fin-tips-container");
  if (tipsContainer) {
    tipsContainer.innerHTML = metrics.tips.map(tip => `
      <div style="background: rgba(0, 240, 255, 0.08); border-left: 3px solid var(--neon-cyan); padding: 12px 16px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 10px; font-size: 0.9rem; line-height: 1.5; color: #FFF;">
        ${tip}
      </div>
    `).join("");
  }

  // Renderizar lista de transacciones
  const txList = document.getElementById("fin-transactions-list");
  if (txList) {
    txList.innerHTML = financeState.transactions.map(t => {
      const isIngreso = t.category === "ingreso";
      const bankBadgeClass = t.bank.includes("Sparkasse") ? "badge-pink" : "badge-cyan";
      return `
        <div class="task-item">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-size: 1.2rem;">${isIngreso ? '📈' : '💸'}</div>
            <div>
              <div style="font-weight: 700; color: #FFF;">${t.desc}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                📅 ${t.date} • <span class="badge-tag ${bankBadgeClass}">${t.bank}</span> • Categoría: ${t.category.toUpperCase()}
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 1.05rem; font-weight: 800; color: ${isIngreso ? 'var(--neon-green)' : 'var(--neon-pink-bright)'};">
              ${isIngreso ? '+' : '-'}${formatCurrency(t.amount, t.currency)}
            </div>
            <button class="btn-jaguar btn-sm" style="padding: 4px 8px; font-size: 0.75rem; background: rgba(255, 0, 127, 0.15); border: 1px solid var(--neon-pink); color: #FFF;" onclick="deleteTransaction('${t.id}')" title="Eliminar transacción">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Renderizar sección de Gastos Tontos Evitados
  const avoidedList = document.getElementById("fin-avoided-list");
  const avoidedBadge = document.getElementById("fin-avoided-badge-points");
  const finPoints = (typeof reyJaguarState !== "undefined" && reyJaguarState.stats && reyJaguarState.stats.finanzas)
    ? reyJaguarState.stats.finanzas.value
    : (financeState.avoidedExpenses ? financeState.avoidedExpenses.length : 12);

  if (avoidedBadge) {
    avoidedBadge.innerHTML = `🪙 ${finPoints} Puntos de Disciplina`;
  }

  if (avoidedList) {
    const list = Array.isArray(financeState.avoidedExpenses) ? financeState.avoidedExpenses : [];
    if (list.length === 0) {
      avoidedList.innerHTML = `<div style="text-align: center; padding: 14px; font-size: 0.85rem; color: #CBD5E1;">Aún no has registrado gastos tontos evitados. ¡Frena tu primer impulso hoy para ganar puntos y experiencia!</div>`;
    } else {
      avoidedList.innerHTML = list.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #182330; border: 1.5px solid rgba(197, 154, 40, 0.35); border-radius: var(--radius-sm); padding: 10px 14px; font-size: 0.88rem; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.25rem;">🛡️</span>
            <div>
              <div style="font-weight: 700; color: #FAF6EE; font-size: 0.92rem;">${item.desc}</div>
              <div style="font-size: 0.75rem; color: #94A3B8; margin-top: 2px;">📅 ${item.date} • <strong style="color: #48BB78;">+1 Punto & +50 XP</strong></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            ${item.amount > 0 ? `<span style="font-weight: 800; color: #48BB78; font-family: 'Cinzel', serif; font-size: 0.95rem; background: rgba(72,187,120,0.12); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(72,187,120,0.3);">+${item.amount.toFixed(2)} € Ahorrado</span>` : ''}
            <button class="btn-jaguar btn-sm" style="padding: 4px 8px; font-size: 0.72rem; background: rgba(239, 68, 68, 0.25); border: 1px solid rgba(239, 68, 68, 0.5); color: #FCA5A5; font-weight: bold;" onclick="deleteAvoidedExpense('${item.id}')" title="Eliminar registro">
              🗑️
            </button>
          </div>
        </div>
      `).join("");
    }
  }
}

// --- LOGICA DE REGISTRO DE GASTOS TONTOS EVITADOS (PUNTOS & XP) ---
function logAvoidedExpense(desc, amount, currency = "EUR") {
  const cleanDesc = desc && desc.trim() ? desc.trim() : "No pagué por algo tonto (disciplina financiera)";
  const amt = parseFloat(amount) || 0;
  
  if (!Array.isArray(financeState.avoidedExpenses)) {
    financeState.avoidedExpenses = [];
  }

  const newEntry = {
    id: "av-" + Date.now(),
    date: new Date().toISOString().split('T')[0],
    desc: cleanDesc,
    amount: amt,
    currency: currency
  };

  financeState.avoidedExpenses.unshift(newEntry);
  saveFinanceState();

  // Incrementar puntos en reyJaguarState
  if (typeof reyJaguarState !== "undefined" && reyJaguarState.stats) {
    if (!reyJaguarState.stats.finanzas) {
      reyJaguarState.stats.finanzas = { name: "Finanzas (Gasto Tonto Evitado)", value: 12, icon: "🪙", auraKey: "dorada" };
    }
    reyJaguarState.stats.finanzas.value = (reyJaguarState.stats.finanzas.value || 0) + 1;
    if (typeof saveReyJaguarState === "function") saveReyJaguarState();
  }

  // Otorgar 50 XP en Soberanía
  if (typeof CaballeroScoringEngine !== "undefined") {
    CaballeroScoringEngine.awardXP("soberania", 50, `🛡️ Gasto tonto evitado: ${cleanDesc}`);
  }

  if (typeof renderCharacterHUD === "function") renderCharacterHUD();
  if (typeof renderRPGLandingHub === "function") renderRPGLandingHub();
  renderFinanceDashboard();

  if (typeof showNotification === "function") {
    showNotification(`🪙 +1 Punto & +50 XP a Finanzas: "${cleanDesc}"`);
  }
  if (typeof playSoundEffect === "function") playSoundEffect("success");

  return newEntry;
}
window.logAvoidedExpense = logAvoidedExpense;

function deleteAvoidedExpense(id) {
  if (Array.isArray(financeState.avoidedExpenses)) {
    financeState.avoidedExpenses = financeState.avoidedExpenses.filter(e => e.id !== id);
    saveFinanceState();
    if (typeof reyJaguarState !== "undefined" && reyJaguarState.stats && reyJaguarState.stats.finanzas && reyJaguarState.stats.finanzas.value > 0) {
      reyJaguarState.stats.finanzas.value -= 1;
      if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      if (typeof renderRPGLandingHub === "function") renderRPGLandingHub();
    }
    renderFinanceDashboard();
    if (typeof showNotification === "function") showNotification("Registro eliminado.");
  }
}
window.deleteAvoidedExpense = deleteAvoidedExpense;

function submitAvoidedExpenseUI() {
  const descInput = document.getElementById("fin-avoided-input-desc");
  const amtInput = document.getElementById("fin-avoided-input-amount");
  const desc = descInput ? descInput.value.trim() : "";
  const amt = amtInput ? parseFloat(amtInput.value) || 0 : 0;

  if (!desc) {
    if (typeof showNotification === "function") showNotification("⚠️ Escribe qué compra o gasto tonto evitaste.");
    return;
  }

  logAvoidedExpense(desc, amt, "EUR");
  if (descInput) descInput.value = "";
  if (amtInput) amtInput.value = "";
}
window.submitAvoidedExpenseUI = submitAvoidedExpenseUI;

// Alternar pestañas dentro de la Bitácora de Finanzas
function switchFinanceView(viewKey, btnEl) {
  const tabs = document.querySelectorAll(".finance-nav-tab");
  tabs.forEach(t => t.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const viewResumen = document.getElementById("fin-view-resumen");
  const viewDisciplina = document.getElementById("fin-view-disciplina");
  const viewExtractos = document.getElementById("fin-view-extractos");
  const viewDrive = document.getElementById("fin-view-drive");

  if (viewKey === "all") {
    if (viewResumen) viewResumen.style.display = "flex";
    if (viewDisciplina) viewDisciplina.style.display = "block";
    if (viewExtractos) viewExtractos.style.display = "grid";
    if (viewDrive) viewDrive.style.display = "block";
  } else if (viewKey === "resumen") {
    if (viewResumen) viewResumen.style.display = "flex";
    if (viewDisciplina) viewDisciplina.style.display = "none";
    if (viewExtractos) viewExtractos.style.display = "none";
    if (viewDrive) viewDrive.style.display = "none";
  } else if (viewKey === "disciplina") {
    if (viewResumen) viewResumen.style.display = "none";
    if (viewDisciplina) viewDisciplina.style.display = "block";
    if (viewExtractos) viewExtractos.style.display = "none";
    if (viewDrive) viewDrive.style.display = "none";
  } else if (viewKey === "extractos") {
    if (viewResumen) viewResumen.style.display = "none";
    if (viewDisciplina) viewDisciplina.style.display = "none";
    if (viewExtractos) viewExtractos.style.display = "grid";
    if (viewDrive) viewDrive.style.display = "none";
  } else if (viewKey === "drive") {
    if (viewResumen) viewResumen.style.display = "none";
    if (viewDisciplina) viewDisciplina.style.display = "none";
    if (viewExtractos) viewExtractos.style.display = "none";
    if (viewDrive) viewDrive.style.display = "block";
  }
}
window.switchFinanceView = switchFinanceView;

// Agregar nuevo gasto/ingreso manual
function addManualTransaction() {
  const desc = document.getElementById("fin-new-desc");
  const amount = document.getElementById("fin-new-amount");
  const currency = document.getElementById("fin-new-currency");
  const cat = document.getElementById("fin-new-cat");
  const bank = document.getElementById("fin-new-bank");

  if (!desc || !desc.value.trim() || !amount || !amount.value) return;

  financeState.transactions.unshift({
    id: "tx-" + Date.now(),
    date: new Date().toISOString().split('T')[0],
    desc: desc.value.trim(),
    amount: parseFloat(amount.value),
    currency: currency.value,
    category: cat.value,
    bank: bank.value
  });

  desc.value = "";
  amount.value = "";

  saveFinanceState();
  renderFinanceDashboard();
  showNotification("Movimiento financiero registrado.");
}

// Inicialización de la pestaña financiera
document.addEventListener("DOMContentLoaded", () => {
  loadFinanceState();
  renderFinanceDashboard();
});

