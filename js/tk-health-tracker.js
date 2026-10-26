/**
 * TK HEALTH PERKS TRACKER (TECHNIKER KRANKENKASSE • SEGURO DE ESTUDIANTE EN ALEMANIA)
 * Gestión y maximización de beneficios de salud preventiva para estudiantes:
 * 1. 2 Cursos de prevención anuales (80%-100% financiados / hasta 150€-200€)
 * 2. TK-Bonusprogramm (Cashback directo a cuenta bancaria o doble en dividendo de salud)
 * 3. Servicios digitales: TK-Doc, Teledermatología, TK-Terminservice y DiGA Apps médicas gratuitas
 * 4. Cuota estudiantil mensual (Vencimiento Día 15)
 */

(function () {
  const STORAGE_KEY = "caballero_tk_health_perks_v1";

  const DEFAULT_STATE = {
    courses: [
      {
        id: "course_1",
        name: "Curso de Prevención 1 (ej. Yoga o Espalda)",
        category: "yoga",
        status: "planned", // 'planned' | 'enrolled' | 'reimbursed'
        cost: 85,
        reimbursedAmount: 85
      },
      {
        id: "course_2",
        name: "Curso de Prevención 2 (ej. Mindfulness / Estrés)",
        category: "stress",
        status: "planned",
        cost: 85,
        reimbursedAmount: 85
      }
    ],
    bonusItems: {
      dental: { label: "Control Dental Anual (Zahnvorsorge + Bonusheft)", points: 400, completed: true, cash: 20, dividend: 40 },
      vaccines: { label: "Cartilla de Vacunación al Día (Impfpass)", points: 400, completed: true, cash: 20, dividend: 40 },
      sports_club: { label: "Membresía Gimnasio / Club Deportivo / Unisport", points: 500, completed: false, cash: 25, dividend: 50 },
      skin_check: { label: "Chequeo Preventivo de Piel (Hautkrebs-Screening)", points: 400, completed: false, cash: 20, dividend: 40 },
      course_completed: { label: "1 Curso de Prevención Completado", points: 500, completed: false, cash: 25, dividend: 50 },
      sports_event: { label: "Prueba Deportiva / Reto de Fitness Certificado", points: 300, completed: false, cash: 15, dividend: 30 }
    },
    activeTab: "perks" // 'perks' | 'faelligkeit'
  };

  class TKHealthTracker {
    constructor() {
      this.state = this.loadState();
    }

    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_STATE, ...parsed };
      } catch (e) {
        console.error("Error al cargar TK Health Perks:", e);
        return JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error("Error al guardar TK Health Perks:", e);
      }
    }

    toggleBonusItem(key) {
      if (this.state.bonusItems[key]) {
        this.state.bonusItems[key].completed = !this.state.bonusItems[key].completed;
        this.saveState();
        if (typeof window.openAvisosModal === "function") {
          window.openAvisosModal("tk_perks");
        }
        if (typeof window.showNotification === "function") {
          const item = this.state.bonusItems[key];
          window.showNotification(
            item.completed ? `✓ TK Bonus: +${item.points} pts acumulados` : `TK Bonus actualizado`
          );
        }
      }
    }

    updateCourseStatus(courseId, status) {
      const c = this.state.courses.find(x => x.id === courseId);
      if (c) {
        c.status = status;
        this.saveState();
        if (typeof window.openAvisosModal === "function") {
          window.openAvisosModal("tk_perks");
        }
      }
    }

    updateCourseCategory(courseId, category) {
      const c = this.state.courses.find(x => x.id === courseId);
      if (c) {
        c.category = category;
        const names = {
          yoga: "Yoga Dinámico & Flexibilidad",
          back: "Rückenschule (Salud de Espalda & Columna)",
          stress: "Mindfulness / MBSR / Manejo de Estrés",
          pilates: "Pilates Funcional & Postura",
          nutrition: "Nutrición & Balance Metabólico"
        };
        c.name = names[category] || "Curso de Prevención";
        this.saveState();
        if (typeof window.openAvisosModal === "function") {
          window.openAvisosModal("tk_perks");
        }
      }
    }

    calculateBonusTotals() {
      let totalPoints = 0;
      let totalCash = 0;
      let totalDividend = 0;

      Object.values(this.state.bonusItems).forEach(item => {
        if (item.completed) {
          totalPoints += item.points;
          totalCash += item.cash;
          totalDividend += item.dividend;
        }
      });

      return { totalPoints, totalCash, totalDividend };
    }

    calculateCoursesTotals() {
      let reimbursed = 0;
      let potentialTotal = 0;

      this.state.courses.forEach(c => {
        potentialTotal += c.reimbursedAmount;
        if (c.status === "reimbursed") {
          reimbursed += c.reimbursedAmount;
        }
      });

      return { reimbursed, potentialTotal };
    }

    renderModalContent(activeSubtab = "perks") {
      const bonus = this.calculateBonusTotals();
      const coursesTotals = this.calculateCoursesTotals();
      const tkInfo = typeof window.getTKPaymentInfo === "function" ? window.getTKPaymentInfo() : {
        curMonthName: "Octubre 2026",
        isPaidThisMonth: true,
        statusDetail: "Cuota de seguro de estudiante en Alemania al día."
      };

      return `
        <!-- HEADER GENERAL DEL MODAL TK HEALTH & AVISOS -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; border-radius: 10px; background: rgba(0, 115, 207, 0.2); border: 2px solid #0073CF; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 0 15px rgba(0, 115, 207, 0.5);">
              🏥
            </div>
            <div>
              <span style="font-size: 0.7rem; color: #60A5FA; font-family: 'Cinzel', serif; letter-spacing: 1.5px; text-transform: uppercase;">
                TECHNIKER KRANKENKASSE (TK) • SEGURO DE ESTUDIANTE
              </span>
              <h2 style="font-family: 'Cinzel', serif; font-size: 1.45rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
                Salud, Prevención & Beneficios TK
              </h2>
            </div>
          </div>
          <button onclick="closeAvisosModal()" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 6px; transition: color 0.2s;" onmouseover="this.style.color='#FFF'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">✕</button>
        </div>

        <!-- SUB-BARRA DE NAVEGACIÓN DENTRO DEL MODAL -->
        <div style="display: flex; gap: 8px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; flex-wrap: wrap;">
          <button class="btn-jaguar ${activeSubtab === 'perks' ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                  style="font-size: 0.82rem; padding: 7px 18px; ${activeSubtab === 'perks' ? 'color: #0E0905; font-weight: 900;' : ''}"
                  onclick="openAvisosModal('tk_perks')">
            🏥 TK Health Perks Tracker
          </button>
          <button class="btn-jaguar ${activeSubtab === 'faelligkeit' ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                  style="font-size: 0.82rem; padding: 7px 18px; ${activeSubtab === 'faelligkeit' ? 'color: #0E0905; font-weight: 900;' : ''}"
                  onclick="openAvisosModal('faelligkeit')">
            💳 Cuota TK Día 15
          </button>
          <button class="btn-jaguar btn-secondary-dark" 
                  style="font-size: 0.82rem; padding: 7px 18px;"
                  onclick="openAvisosModal('avisos')">
            🔔 Obligaciones & Avisos Generales
          </button>
        </div>

        ${activeSubtab === 'perks' ? this.renderPerksView(bonus, coursesTotals) : this.renderFaelligkeitView(tkInfo)}
      `;
    }

    renderPerksView(bonus, coursesTotals) {
      return `
        <!-- RESUMEN DE BENEFICIOS ACUMULADOS EN DINERO -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 18px;">
          
          <!-- TARJETA 1: CURSOS DE PREVENCIÓN SUBVENCIONADOS -->
          <div style="background: radial-gradient(circle at top left, #1B283E 0%, #0D1525 100%); border: 1.5px solid #60A5FA; border-radius: 10px; padding: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.68rem; color: #93C5FD; font-weight: 800; text-transform: uppercase;">2 CURSOS ANUALES (80-100% CUBIERTO)</span>
              <span style="font-size: 1.2rem;">🧘</span>
            </div>
            <div style="font-size: 1.5rem; font-family: 'Cinzel', serif; color: #FFF; font-weight: 800;">
              ${coursesTotals.reimbursed} € <span style="font-size: 0.82rem; color: #94A3B8; font-family: sans-serif; font-weight: normal;">/ hasta ${coursesTotals.potentialTotal} € año</span>
            </div>
            <p style="font-size: 0.74rem; color: #CBD5E1; margin: 4px 0 0 0; line-height: 1.3;">
              Yoga, Rückenschule (espalda), natación o mindfulness cubiertos por TK.
            </p>
          </div>

          <!-- TARJETA 2: TK-BONUSPROGRAMM (CASH DIRECTO) -->
          <div style="background: radial-gradient(circle at top left, #2A2418 0%, #14110A 100%); border: 1.5px solid #F59E0B; border-radius: 10px; padding: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.68rem; color: #FCD34D; font-weight: 800; text-transform: uppercase;">BONUSPROGRAMM • CASHBACK</span>
              <span style="font-size: 1.2rem;">💶</span>
            </div>
            <div style="font-size: 1.5rem; font-family: 'Cinzel', serif; color: #10B981; font-weight: 800;">
              ${bonus.totalCash} € <span style="font-size: 0.82rem; color: #F5D77F; font-family: sans-serif; font-weight: normal;">en efectivo</span>
            </div>
            <p style="font-size: 0.74rem; color: #CBD5E1; margin: 4px 0 0 0; line-height: 1.3;">
              O <strong>${bonus.totalDividend} €</strong> en Gesundheitsdividende para masajes, deporte o gafas.
            </p>
          </div>

          <!-- TARJETA 3: PUNTOS TOTALES TK -->
          <div style="background: radial-gradient(circle at top left, #1A2518 0%, #0A140B 100%); border: 1.5px solid #10B981; border-radius: 10px; padding: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.68rem; color: #6EE7B7; font-weight: 800; text-transform: uppercase;">PUNTOS TK ACUMULADOS</span>
              <span style="font-size: 1.2rem;">⭐</span>
            </div>
            <div style="font-size: 1.5rem; font-family: 'Cinzel', serif; color: #FFF; font-weight: 800;">
              ${bonus.totalPoints} pts
            </div>
            <p style="font-size: 0.74rem; color: #CBD5E1; margin: 4px 0 0 0; line-height: 1.3;">
              Canjeables directamente desde la app móvil oficial de TK.
            </p>
          </div>

        </div>

        <!-- SECCIÓN 1: TUS 2 CURSOS DE SALUD Y PREVENCIÓN ANUALES -->
        <div style="background: rgba(255,255,255,0.02); border: 1.5px solid rgba(197, 154, 40, 0.3); border-radius: 10px; padding: 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div>
              <span class="badge-tag badge-gold" style="font-size: 0.65rem;">PRÄVENTIONSKURSE (§ 20 SGB V)</span>
              <h4 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
                Tus 2 Cursos de Salud Subvencionados al 80%-100% por TK
              </h4>
            </div>
            <a href="https://www.tk.de/techniker/gesundheit-und-mehr/praevention-und-vorsorge/gesundheitskurse/tk-gesundheitskurs-suche-2009228" 
               target="_blank" class="btn-jaguar btn-secondary-dark" style="font-size: 0.72rem; padding: 5px 12px; text-decoration: none;">
              🔍 Buscador de Cursos Oficiales TK ↗
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
            ${this.state.courses.map(c => `
              <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: #F5D77F; font-size: 0.88rem; font-family: 'Cinzel', serif;">${c.name}</strong>
                  <span class="badge-tag ${c.status === 'reimbursed' ? 'badge-emerald' : (c.status === 'enrolled' ? 'badge-cyan' : 'badge-gold')}" style="font-size: 0.65rem;">
                    ${c.status === 'reimbursed' ? '✓ Reembolsado' : (c.status === 'enrolled' ? '⏳ En curso' : '📋 Planificado')}
                  </span>
                </div>

                <div style="display: flex; gap: 8px; align-items: center; font-size: 0.76rem;">
                  <span style="color: #94A3B8;">Disciplina:</span>
                  <select class="kcd-task-select" style="padding: 3px 8px; font-size: 0.75rem;" onchange="tkHealthTracker.updateCourseCategory('${c.id}', this.value)">
                    <option value="yoga" ${c.category === 'yoga' ? 'selected' : ''}>🧘 Yoga Dinámico & Flexibilidad</option>
                    <option value="back" ${c.category === 'back' ? 'selected' : ''}>🏛️ Rückenschule (Espalda & Postura)</option>
                    <option value="stress" ${c.category === 'stress' ? 'selected' : ''}>🌬️ Mindfulness & Manejo de Estrés</option>
                    <option value="pilates" ${c.category === 'pilates' ? 'selected' : ''}>🤸 Pilates & Core</option>
                    <option value="nutrition" ${c.category === 'nutrition' ? 'selected' : ''}>🥑 Nutrición & Digestión</option>
                  </select>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 8px;">
                  <span style="font-size: 0.75rem; color: #CBD5E1;">Cobertura estimada: <strong>~${c.reimbursedAmount} €</strong></span>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn-jaguar ${c.status === 'planned' ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                            style="font-size: 0.68rem; padding: 3px 8px;" onclick="tkHealthTracker.updateCourseStatus('${c.id}', 'planned')">
                      Planear
                    </button>
                    <button class="btn-jaguar ${c.status === 'enrolled' ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                            style="font-size: 0.68rem; padding: 3px 8px;" onclick="tkHealthTracker.updateCourseStatus('${c.id}', 'enrolled')">
                      Inscrito
                    </button>
                    <button class="btn-jaguar ${c.status === 'reimbursed' ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                            style="font-size: 0.68rem; padding: 3px 8px;" onclick="tkHealthTracker.updateCourseStatus('${c.id}', 'reimbursed')">
                      Reembolsado
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECCIÓN 2: CHECKLIST DE ACCIONES DEL TK-BONUSPROGRAMM -->
        <div style="background: rgba(255,255,255,0.02); border: 1.5px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div>
              <span class="badge-tag badge-pink" style="font-size: 0.65rem;">BONUSPROGRAMM OFICIAL</span>
              <h4 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
                Acciones de Salud Bonificables (Gana Dinero Cuidándote)
              </h4>
            </div>
            <span style="font-size: 0.72rem; color: #CBD5E1;">Marca las que ya tengas realizadas este año</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${Object.entries(this.state.bonusItems).map(([key, item]) => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.35); padding: 9px 14px; border-radius: 6px; border-left: 3px solid ${item.completed ? '#10B981' : 'rgba(255,255,255,0.15)'};">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="tkHealthTracker.toggleBonusItem('${key}')" style="width: 17px; height: 17px; cursor: pointer;">
                  <div>
                    <span style="font-size: 0.84rem; color: ${item.completed ? '#FFF' : '#CBD5E1'}; font-weight: ${item.completed ? '700' : '500'};">
                      ${item.label}
                    </span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge-tag badge-gold" style="font-size: 0.68rem;">+${item.points} pts</span>
                  <span style="font-size: 0.75rem; color: #34D399; font-weight: bold;">(${item.cash} € cash)</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECCIÓN 3: SERVICIOS DIGITALES INCLUIDOS GRATIS EN TK -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">
          
          <div style="background: rgba(0, 115, 207, 0.08); border: 1px solid rgba(0, 115, 207, 0.3); border-radius: 8px; padding: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 1.3rem;">📱</span>
              <strong style="color: #60A5FA; font-size: 0.9rem;">TK-Doc (Médico por Videollamada)</strong>
            </div>
            <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
              Consultas médicas 24/7 en inglés y alemán desde la app oficial sin salas de espera. Emisión de recetas y justificantes (AU).
            </p>
          </div>

          <div style="background: rgba(233, 30, 99, 0.08); border: 1px solid rgba(233, 30, 99, 0.3); border-radius: 8px; padding: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 1.3rem;">🔬</span>
              <strong style="color: #F472B6; font-size: 0.9rem;">Teledermatología TK (Piel en 48h)</strong>
            </div>
            <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
              Envía fotos de lunares, manchas, erupciones o brotes cutáneos. Dermatólogos especialistas responden con diagnóstico en 48 horas.
            </p>
          </div>

          <div style="background: rgba(52, 211, 153, 0.08); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 8px; padding: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 1.3rem;">💊</span>
              <strong style="color: #34D399; font-size: 0.9rem;">DiGA Apps Médicas (100% Gratis)</strong>
            </div>
            <p style="font-size: 0.76rem; color: #CBD5E1; margin: 0; line-height: 1.35;">
              Apps médicas prescritas sin coste por tu médico: <em>Vivira</em> o <em>Kaia</em> (dolor de espalda), y <em>HelloBetter</em> (estrés/sueño).
            </p>
          </div>

        </div>
      `;
    }

    renderFaelligkeitView(tk) {
      return `
        <!-- VISTA DE CUOTAS Y VENCIMIENTOS (ORIGINAL DE REY-JAGUAR MEJORADA) -->
        <div style="background: radial-gradient(circle at top left, #1B283E 0%, #0D1525 100%); border: 2px solid ${tk.isPaidThisMonth ? '#10B981' : '#F59E0B'}; border-radius: 12px; padding: 18px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 44px; height: 44px; border-radius: 8px; background: rgba(0, 115, 207, 0.2); border: 1.5px solid #0073CF; display: flex; align-items: center; justify-content: center; font-size: 1.6rem;">
                🏥
              </div>
              <div>
                <div style="font-size: 0.68rem; color: #60A5FA; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
                  SEGURO MÉDICO OBLIGATORIO • ALEMANIA (GKV)
                </div>
                <h3 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 2px 0 0 0; font-weight: 800;">
                  Techniker Krankenkasse (TK) • Cuota Estudiantil
                </h3>
              </div>
            </div>
            ${tk.statusBadge || ''}
          </div>

          <div style="background: rgba(0, 0, 0, 0.35); border-left: 4px solid #D4AF37; padding: 12px 14px; border-radius: 0 8px 8px 0; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="font-size: 0.9rem;">📅</span>
              <strong style="color: #F5D77F; font-size: 0.88rem;">Regla de Fälligkeit: Día 15 de cada mes</strong>
            </div>
            <p style="font-size: 0.82rem; color: #E2E8F0; margin: 0; line-height: 1.4;">
              ${tk.statusDetail || 'Débito automático SEPA o transferencia directa desde tu cuenta Sparkasse.'}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
            <div style="font-size: 0.74rem; color: #94A3B8;">
              🏛️ <strong>Canal:</strong> Débito automático SEPA / Transferencia Sparkasse Hannover.
            </div>
            <button class="btn-jaguar ${tk.isPaidThisMonth ? 'btn-secondary-dark' : 'btn-gold-chrome'}" 
                    style="${tk.isPaidThisMonth ? 'color: #34D399; border-color: #10B981;' : 'color: #0E0905; font-weight: 900;'} padding: 9px 20px; font-size: 0.82rem; cursor: pointer;"
                    onclick="toggleTKPayment('${tk.curMonthKey}')">
              ${tk.isPaidThisMonth ? `✓ Pago de ${tk.curMonthName} Confirmado (Clic para desmarcar)` : `💳 Confirmar Pago de ${tk.curMonthName} (+50 XP)`}
            </button>
          </div>

          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1);">
            <div style="font-size: 0.7rem; color: #94A3B8; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
              Historial de Cuotas Recientes:
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${(tk.recentMonths || []).map(m => `
                <div style="background: ${m.paid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)'}; border: 1px solid ${m.paid ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}; border-radius: 6px; padding: 4px 10px; font-size: 0.72rem; display: flex; align-items: center; gap: 6px; cursor: pointer;"
                     onclick="toggleTKPayment('${m.key}')" title="Clic para alternar estado de pago">
                  <span style="color: ${m.paid ? '#34D399' : '#F87171'}; font-weight: 800;">${m.paid ? '✓' : '⚠️'}</span>
                  <span style="color: #FFF;">${m.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }

  window.tkHealthTracker = new TKHealthTracker();
})();
