#!/usr/bin/env python3
"""
Caballero Jaguar - Motor de Correo Matutino AM (Adaptado de Headhunter / Empleo Master)
=======================================================================================
Se ejecuta automáticamente cada mañana (07:30 AM CET/CEST) vía GitHub Actions o cron local.
A diferencia de Headhunter, NO depende de scrapear páginas web externas (que pueden caer o
bloquearse), sino que genera tu Briefing Matutino de Vida directamente desde tu arquitectura
Caballero Jaguar:
 1. Tus 3 Prioridades y Bloques Tácticos del día de la semana (Lunes a Domingo)
 2. Estado de los 9 Estandartes de Virtud & Reto 21 Días (100% Templanza / 0 Porno)
 3. Alerta inteligente de Techniker Krankenkasse (TK) cerca del día 15 de cada mes
 4. Oráculo Estoico & Somático de la mañana
 5. Acceso directo en 1 toque a la versión móvil (PWA) del Santuario Jaguar

Envía el correo HTML vía SMTP (Gmail SSL 465 / STARTTLS 587) o Resend API.
"""

import os
import sys
import argparse
import json
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import urllib.request
from datetime import datetime, timezone, timedelta

DEFAULT_RECIPIENT = "danisantander.urrutia@gmail.com"
APP_URL = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/"

DAYS_ES = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
DAYS_DISPLAY = {
    "lunes": "Lunes • Fuerza Base & Inicio Armónico",
    "martes": "Martes • Impulso Técnico, Cardio & Presencia",
    "miercoles": "Miércoles • Ecuación Central, Agrotech & Core",
    "jueves": "Jueves • Asalto Profundo, Empleo & Aftercare",
    "viernes": "Viernes • Cierre Ejecutivo, Bosque & Cita de Pareja",
    "sabado": "Sábado • Naturaleza Viva, Arte, Combate & Goce",
    "domingo": "Domingo • Soberanía Financiera, Descanso & Templo"
}

DAILY_SCHEDULE = {
    "lunes": [
        {"time": "09:00 - 09:30", "title": "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", "badge": "🥊 Deporte", "color": "#15803d"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco Dual: Empleo de mi Profesión + Trabajos Locales Hannover", "badge": "👑 Vida", "color": "#b45309"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", "badge": "🧠 Mente", "color": "#0f766e"},
        {"time": "14:30 - 17:30", "title": "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción Científica)", "badge": "🧭 Exploración", "color": "#1d4ed8"}
    ],
    "martes": [
        {"time": "09:00 - 09:30", "title": "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", "badge": "🥊 Deporte", "color": "#15803d"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", "badge": "👑 Vida", "color": "#b45309"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", "badge": "🧠 Mente", "color": "#0f766e"},
        {"time": "19:30 - 21:00", "title": "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", "badge": "💖 Amor", "color": "#be185d"}
    ],
    "miercoles": [
        {"time": "09:00 - 09:30", "title": "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", "badge": "🌿 Salud", "color": "#15803d"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", "badge": "👑 Vida", "color": "#b45309"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", "badge": "🧭 Exploración", "color": "#0f766e"},
        {"time": "14:30 - 17:30", "title": "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", "badge": "🌲 Naturaleza", "color": "#15803d"}
    ],
    "jueves": [
        {"time": "09:00 - 09:30", "title": "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", "badge": "🥊 Deporte", "color": "#15803d"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", "badge": "👑 Vida", "color": "#b45309"},
        {"time": "14:30 - 17:30", "title": "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", "badge": "🧭 Exploración", "color": "#1d4ed8"},
        {"time": "20:00 - 21:30", "title": "💆 Aftercare, Masajes en Pareja & Descompresión Somática", "badge": "💖 Amor", "color": "#be185d"}
    ],
    "viernes": [
        {"time": "09:00 - 09:30", "title": "🥊 Sparring / Cardio Matutino & Ducha Fría", "badge": "🥊 Deporte", "color": "#15803d"},
        {"time": "09:30 - 12:45", "title": "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", "badge": "👑 Vida", "color": "#b45309"},
        {"time": "16:00 - 18:00", "title": "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", "badge": "🌲 Naturaleza", "color": "#15803d"},
        {"time": "20:00 - 23:00", "title": "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", "badge": "💖 Amor", "color": "#be185d"}
    ],
    "sabado": [
        {"time": "09:30 - 11:00", "title": "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", "badge": "🥊 Deporte", "color": "#15803d"},
        {"time": "11:30 - 13:30", "title": "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", "badge": "🧭 Exploración", "color": "#1d4ed8"},
        {"time": "16:00 - 18:30", "title": "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", "badge": "🌲 Naturaleza", "color": "#15803d"},
        {"time": "20:30 - 22:30", "title": "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", "badge": "💖 Amor", "color": "#be185d"}
    ],
    "domingo": [
        {"time": "10:00 - 10:45", "title": "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", "badge": "🪙 Soberanía", "color": "#b45309"},
        {"time": "11:00 - 12:30", "title": "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", "badge": "🕯️ Espíritu", "color": "#6d28d9"},
        {"time": "13:00 - 14:30", "title": "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", "badge": "🌿 Salud", "color": "#15803d"},
        {"time": "18:00 - 20:00", "title": "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", "badge": "🧠 Mente", "color": "#0f766e"}
    ]
}

RECONSTRUCTION_ORACLES = [
    {"quote": "No te avergüences de volver a empezar: levántate con cabeza fría y cumple el siguiente deber pequeño con dignidad.", "author": "Marco Aurelio • Fuerza y Reconstrucción"},
    {"quote": "Cada día que rompes la inercia con una sola acción concreta, la mente recupera su trono.", "author": "Epicteto • Discursos"},
    {"quote": "No es la caída lo que define al caballero, sino la rapidez y serenidad con la que vuelve a empuñar el timón.", "author": "Séneca • Cartas a Lucilio"}
]

CONSOLIDATION_ORACLES = [
    {"quote": "No gastes más tiempo argumentando lo que debería ser un buen hombre. Sé uno hoy mismo y sostén el impulso.", "author": "Marco Aurelio • Meditaciones X, 16"},
    {"quote": "La constancia convierte la disciplina diaria en carácter inquebrantable. Consolida hoy lo que ya encendiste.", "author": "Séneca • Sobre la Firmeza del Sabio"},
    {"quote": "El alma se tiñe del color de sus pensamientos y de sus actos repetidos. Mantén el ritmo.", "author": "Marco Aurelio • Meditaciones V, 16"}
]

AURA_DEFS = [
    ("vida", "👑 Vida"),
    ("exploracion", "🧭 Exploración"),
    ("amor", "💖 Amor"),
    ("mente", "🧠 Mente"),
    ("salud", "🌿 Salud"),
    ("deporte", "🥊 Deporte"),
    ("soberania", "🪙 Soberanía"),
    ("naturaleza", "🌲 Naturaleza"),
    ("espiritualidad", "🕯️ Espíritu")
]


def load_real_user_state() -> dict:
    """Lee el estado real si fue provisto vía JAGUAR_STATE_JSON; si no hay registro, devuelve 0 sin asumir progreso."""
    raw = os.getenv("JAGUAR_STATE_JSON", "").strip()
    if raw:
        try:
            data = json.loads(raw)
            if isinstance(data, dict):
                return {
                    "noPornDays": max(0, int(data.get("noPornDays", 0) or 0)),
                    "noPornMarked": bool(data.get("noPornMarked", False)),
                    "weeklyAuraXP": data.get("weeklyAuraXP", {}) if isinstance(data.get("weeklyAuraXP"), dict) else {}
                }
        except Exception:
            pass
    return {"noPornDays": 0, "noPornMarked": False, "weeklyAuraXP": {}}


def build_morning_html(recipient: str) -> tuple[str, str]:
    # Usar hora central europea (UTC+1 / UTC+2)
    now = datetime.now(timezone(timedelta(hours=1)))
    weekday_idx = now.weekday()
    day_key = DAYS_ES[weekday_idx]
    day_title = DAYS_DISPLAY[day_key]
    blocks = DAILY_SCHEDULE[day_key]
    date_str = now.strftime("%d/%m/%Y")

    state = load_real_user_state()
    no_porn_days = state["noPornDays"] if state["noPornMarked"] else 0
    weekly_xp = state["weeklyAuraXP"]

    # 1) Regla Reto 21 Días Sin Fap
    if no_porn_days <= 0:
        reto_21_html = """
        <div style="background: #fef2f2; border: 1.5px solid #ef4444; border-left: 5px solid #b91c1c; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.8px;">
                🦅 Reto 21 Días Sin Fap • Racha en pausa / 0 días
            </div>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #7f1d1d; line-height: 1.45;">
                Racha en pausa / 0 días. Si te mantuviste firme y olvidaste marcarlo, entra a reconciliar con honores; si hubo caída, hoy es tu nuevo Día 1 con cabeza fría.
            </p>
        </div>
        """
    else:
        capped = min(21, no_porn_days)
        bar_text = ("■ " * capped + "□ " * max(0, 21 - capped)).strip()
        reto_21_html = f"""
        <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-left: 5px solid #047857; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.8px;">
                🦅 Reto 21 Días Sin Fap • [Día {no_porn_days} de 21]
            </div>
            <div style="font-size: 13px; letter-spacing: 2px; color: #059669; font-weight: 900; margin: 6px 0;">
                {bar_text}
            </div>
            <p style="margin: 0; font-size: 12.5px; color: #064e3b; line-height: 1.45;">
                Templanza activa ({no_porn_days} día(s) firme(s)). Mente limpia, energía preservada y dominio sobre el impulso.
            </p>
        </div>
        """

    # 2) Protocolo Táctico de Banderas Semanales
    active_flags = []
    shadow_flags = []
    for k, label in AURA_DEFS:
        xp_val = float(weekly_xp.get(k, 0) or 0)
        if xp_val > 0:
            active_flags.append(f"{label} ({int(xp_val)} XP)")
        else:
            shadow_flags.append(label)
    active_count = len(active_flags)

    if active_count == 0:
        banderas_html = """
        <div style="background: #fff7ed; border: 1.5px solid #f97316; border-left: 5px solid #c2410c; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 0.8px;">
                🚩 [Alerta de Inercia] • 0 / 9 Banderas Activadas Esta Semana
            </div>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #7c2d12; line-height: 1.45;">
                Campamento frío. Elige UNA sola bandera hoy —ej. 20 min de deporte o foco— y sal del cero.
            </p>
        </div>
        """
    elif active_count <= 3:
        banderas_html = f"""
        <div style="background: #fefce8; border: 1.5px solid #eab308; border-left: 5px solid #a16207; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; color: #a16207; text-transform: uppercase; letter-spacing: 0.8px;">
                ⚔️ [Chequeo Táctico] • {active_count} / 9 Banderas Activadas Esta Semana
            </div>
            <p style="margin: 6px 0 8px 0; font-size: 13px; color: #713f12; line-height: 1.45;">
                Llevas {active_count} frente(s) activo(s), pero el resto sigue en sombra. ¿Dónde está el cuello de botella o fuga de energía? Reconquista un flanco hoy.
            </p>
            <div style="font-size: 11.5px; color: #422006; line-height: 1.5;">
                <strong>Encendidas:</strong> {" · ".join(active_flags)}<br>
                <strong>En sombra (0 XP):</strong> {" · ".join(shadow_flags)}
            </div>
        </div>
        """
    else:
        banderas_html = f"""
        <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-left: 5px solid #047857; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.8px;">
                🏆 [Tracción &amp; Felicitación] • {active_count} / 9 Banderas Encendidas
            </div>
            <p style="margin: 6px 0 8px 0; font-size: 13px; color: #064e3b; line-height: 1.45;">
                Gran tracción con {active_count} banderas encendidas. El impulso está de tu lado; mantén el ritmo y consolida la semana.
            </p>
            <div style="font-size: 11.5px; color: #065f46; line-height: 1.5;">
                <strong>Frentes activos:</strong> {" · ".join(active_flags)}
            </div>
        </div>
        """

    # 3) Oráculo Estoico alineado al estado real
    is_zero_state = (no_porn_days <= 0 or active_count == 0)
    pool = RECONSTRUCTION_ORACLES if is_zero_state else CONSOLIDATION_ORACLES
    oracle = pool[now.timetuple().tm_yday % len(pool)]

    # Alerta inteligente de pago TK entre el día 11 y 15 del mes
    tk_banner_html = ""
    if 11 <= now.day <= 16:
        tk_banner_html = f"""
        <div style="background: #eff6ff; border: 1.5px solid #3b82f6; border-left: 5px solid #1d4ed8; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 800; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.5px;">
                🏥 Recordatorio Oficial • Techniker Krankenkasse (Día 15)
            </div>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e3a8a; line-height: 1.45;">
                Estamos a <strong>{date_str}</strong>. Recuerda verificar el pago mensual de tu seguro estudiantil TK (~145 €) y marcarlo en tu tracker de la app.
            </p>
        </div>
        """

    blocks_html = ""
    for idx, b in enumerate(blocks, 1):
        blocks_html += f"""
        <div style="background: #ffffff; border: 1px solid #e6dec8; border-left: 4px solid {b['color']}; border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; box-shadow: 0 2px 6px rgba(28, 25, 23, 0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 12px; font-weight: 800; color: {b['color']}; font-family: monospace;">
                    #{idx} • ⏱️ {b['time']}
                </span>
                <span style="background: #f5efe2; color: #57534e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 99px; border: 1px solid #d6cbb5;">
                    {b['badge']}
                </span>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #1c1917; line-height: 1.4;">
                {b['title']}
            </div>
        </div>
        """

    subject = f"☀️ [Caballero Jaguar 9:00 AM • {day_key.upper()}] Misión del Día, 4 Bloques y Oráculo ({date_str})"
    main_mission = blocks[1]["title"] if len(blocks) > 1 else blocks[0]["title"]
    main_time = blocks[1]["time"] if len(blocks) > 1 else blocks[0]["time"]
    hero_img_url = f"{APP_URL}assets/img_jaguar_jungle_landing.jpg"
    logo_img_url = f"{APP_URL}assets/jungle_jaguar_logo.jpg"

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3ead6; color: #1c1917; padding: 20px 10px; margin: 0;">
    <div style="max-width: 620px; margin: 0 auto; background-color: #faf6ee; border: 2px solid #c59a28; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 32px rgba(40, 30, 15, 0.14);">
        
        <!-- CABECERA VISUAL CON IMAGEN REAL DEL SANTUARIO + EMBLEMA -->
        <div style="background: linear-gradient(180deg, rgba(6, 78, 59, 0.72) 0%, rgba(15, 118, 110, 0.88) 100%), url('{hero_img_url}') center/cover no-repeat; padding: 28px 24px; text-align: center; color: #ffffff;">
            <img src="{logo_img_url}" alt="Caballero Jaguar" width="64" height="64" style="width: 64px; height: 64px; border-radius: 50%; border: 2.5px solid #fde047; object-fit: cover; margin-bottom: 8px;">
            <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a; margin-bottom: 4px;">
                ☀️ Despertar de Acción • Caballero Jaguar (09:00 AM)
            </div>
            <h1 style="margin: 4px 0 6px 0; font-size: 23px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff;">
                ¡Buenos días, Daniel!
            </h1>
            <p style="margin: 0; font-size: 13.5px; color: #d1fae5; font-weight: 600;">
                {day_title} • {date_str}
            </p>
        </div>

        <div style="padding: 22px 20px;">

            <!-- MISIÓN PRINCIPAL GIGANTE DEL DÍA (APPROACH 1) -->
            <div style="background: linear-gradient(135deg, #064e3b 0%, #0f766e 100%); border: 2px solid #f59e0b; border-radius: 14px; padding: 16px 18px; margin-bottom: 18px; color: #ffffff;">
                <div style="font-size: 11px; font-weight: 800; color: #fde047; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                    👑 Misión Principal de Hoy ({main_time})
                </div>
                <div style="font-size: 16px; font-weight: 800; line-height: 1.35; color: #ffffff;">
                    {main_mission}
                </div>
                <div style="font-size: 12px; color: #a7f3d0; margin-top: 6px;">
                    Si hoy solo conquistas este bloque, ganaste el día.
                </div>
            </div>
            
            <!-- ORÁCULO MATUTINO & ENERGÍA ARIES/MARTE (APPROACH 2) -->
            <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px; text-align: center;">
                <div style="font-size: 11px; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">
                    ✨ Oráculo Estoico &amp; Fuego Aries ♈
                </div>
                <blockquote style="margin: 0 0 6px 0; font-size: 14.5px; font-style: italic; color: #292524; line-height: 1.45;">
                    "{oracle['quote']}"
                </blockquote>
                <div style="font-size: 11.5px; font-weight: 800; color: #92400e;">
                    — {oracle['author']}
                </div>
            </div>

            {tk_banner_html}
            {reto_21_html}
            {banderas_html}

            <!-- BOTÓN DIRECTO AL CELULAR -->
            <div style="text-align: center; margin-bottom: 22px;">
                <a href="{APP_URL}" style="display: inline-block; background: linear-gradient(135deg, #15803d 0%, #0d9488 100%); color: #ffffff; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 99px; box-shadow: 0 6px 16px rgba(21, 128, 61, 0.3); letter-spacing: 0.5px;">
                    📱 ABRIR CHECK-IN &amp; MODO FOCO EN EL CELU &rarr;
                </a>
            </div>

            <!-- SECCIÓN 1: BLOQUES DE HOY -->
            <div style="margin-bottom: 20px;">
                <div style="font-size: 13px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">
                    🎯 Tus 4 Bloques Tácticos de Hoy ({day_key.capitalize()})
                </div>
                {blocks_html}
            </div>

            <!-- PIE DEL CORREO -->
            <div style="text-align: center; padding-top: 14px; border-top: 1px solid #e6dec8; font-size: 12px; color: #78716c;">
                Enviado automáticamente a <strong>{recipient}</strong> por GitHub Actions (09:00 AM) • <strong>Caballero Jaguar</strong>.
            </div>
        </div>
    </div>
</body>
</html>"""
    return subject, html


def send_via_resend(api_key: str, recipient: str, subject: str, html_content: str) -> bool:
    url = "https://api.resend.com/emails"
    payload = json.dumps({
        "from": "Caballero Jaguar <onboarding@resend.dev>",
        "to": [recipient],
        "subject": subject,
        "html": html_content
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "CaballeroJaguar/1.0"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(f"[✓] Correo enviado vía Resend API ({resp.status}) a {recipient}")
            return True
    except Exception as e:
        print(f"[!] Excepción en envío Resend: {e}")
        return False


def send_via_smtp(host: str, port: int, user: str, password: str, recipient: str, subject: str, html_content: str) -> bool:
    """Envía el correo usando SMTP seguro (intenta SSL 465 primero, luego STARTTLS 587) igual que en Headhunter."""
    clean_pass = password.replace(" ", "").strip()
    clean_user = user.strip()

    print(f"[*] Preparando envío SMTP hacia {recipient} desde {clean_user}...")
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Caballero Jaguar ☀️ <{clean_user}>"
    msg["To"] = recipient

    part = MIMEText(html_content, "html", "utf-8")
    msg.attach(part)

    context = ssl.create_default_context()

    try:
        print("[*] Intentando envío directo seguro SMTP_SSL (puerto 465)...")
        with smtplib.SMTP_SSL(host, 465, context=context, timeout=25) as server:
            server.login(clean_user, clean_pass)
            server.sendmail(clean_user, recipient, msg.as_string())
        print(f"[✓] Correo matutino enviado con éxito vía SMTP SSL (465) a {recipient}")
        return True
    except Exception as e_ssl:
        print(f"[!] Conexión SSL 465 fallida ({e_ssl}). Reintentando con STARTTLS (puerto {port})...")

    try:
        with smtplib.SMTP(host, port, timeout=25) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(clean_user, clean_pass)
            server.sendmail(clean_user, recipient, msg.as_string())
        print(f"[✓] Correo matutino enviado con éxito vía STARTTLS ({port}) a {recipient}")
        return True
    except Exception as e_tls:
        print(f"[!] Error crítico en envío SMTP ({port}): {e_tls}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Caballero Jaguar - Correo Matutino AM")
    parser.add_argument("--to", default=os.getenv("ALERT_RECIPIENT_EMAIL", DEFAULT_RECIPIENT), help="Correo destinatario")
    parser.add_argument("--preview-only", action="store_true", help="Solo generar el archivo HTML de vista previa sin enviar")
    args = parser.parse_args()

    recipient = args.to
    subject, html_content = build_morning_html(recipient)

    preview_path = os.path.join(os.path.dirname(__file__), "latest_morning_jaguar.html")
    with open(preview_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[✓] Vista previa guardada en: {preview_path}")

    if args.preview_only:
        print("[*] Modo --preview-only completado.")
        return

    resend_api_key = os.getenv("RESEND_API_KEY")
    smtp_user = os.getenv("SMTP_USER") or os.getenv("ALERT_RECIPIENT_EMAIL") or DEFAULT_RECIPIENT
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    delivered = False
    if smtp_user and smtp_pass:
        delivered = send_via_smtp(smtp_host, smtp_port, smtp_user, smtp_pass, recipient, subject, html_content)
    if not delivered and resend_api_key:
        delivered = send_via_resend(resend_api_key, recipient, subject, html_content)

    if not delivered:
        print("[!] No se encontraron credenciales SMTP_PASS / RESEND_API_KEY o falló la entrega.")
        sys.exit(1)


if __name__ == "__main__":
    main()
