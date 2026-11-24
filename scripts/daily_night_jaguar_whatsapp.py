#!/usr/bin/env python3
"""
Caballero Jaguar • Motor Nocturno de WhatsApp 21:00 (Green-API)
==============================================================
Envía el reporte nocturno diario con:
 1. Recuento de la semana y Protocolo de Banderas / Auras
 2. Planes para el día siguiente (Horarios tácticos + Google Calendar)
 3. Estado real del Desafío 21 Días (No Fap / Templanza)
 4. Reflexión estoica y enlace al Santuario
"""

import os
import json
import urllib.request
from datetime import datetime, timezone, timedelta

# Credenciales Green-API de Daniel Santander
ID_INSTANCE = "710722811758"
API_TOKEN_INSTANCE = "18d1ccd9e09e486daa60f195ea879bdfe5c63bff2fa046d08d"
CHAT_ID = "4917676497440@c.us"
APP_URL = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/"

SCHEDULES = {
    "lunes": [
        {"time": "09:00 - 09:30", "title": "🥊 Activación Física: 100 Abs, 100 Sentadillas, 100 Flexiones o Running", "badge": "Deporte"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco Dual: Empleo de mi Profesión + Hannover", "badge": "Vida"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán al Mediodía: 15 min Vocabulario Activo & Habla", "badge": "Mente"},
        {"time": "14:30 - 17:30", "title": "🧭 Proyectos: Paper Lauwersmeer (Modelación & Redacción)", "badge": "Exploración"}
    ],
    "martes": [
        {"time": "09:00 - 09:30", "title": "🏃 Activación Física: Cardio, Muay Thai Shadowboxing o Fuerza", "badge": "Deporte"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco Dual: Postulaciones Profesionales (Alemania/Euskadi) + Hannover", "badge": "Vida"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán B1: Escucha Activa & Frase en el Diario", "badge": "Mente"},
        {"time": "19:30 - 21:00", "title": "💖 Presencia en Pareja: Escucha Consciente, Cariño & Cero Pantallas", "badge": "Amor"}
    ],
    "miercoles": [
        {"time": "09:00 - 09:30", "title": "🧘‍♂️ Movilidad Somática, Respiración 4x4 & Calistenia Base", "badge": "Salud"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco: Avance Profesional, CV/Entrevistas & Gestión Vital", "badge": "Vida"},
        {"time": "13:00 - 13:20", "title": "🇩🇪 Alemán al Mediodía + 🎺 20 min Trompeta / Música", "badge": "Exploración"},
        {"time": "14:30 - 17:30", "title": "🌱 Chile Agrotech (AgriTwin) & ReWild Bosque Nativo", "badge": "Naturaleza"}
    ],
    "jueves": [
        {"time": "09:00 - 09:30", "title": "🏋️‍♂️ Fuerza & Potencia: Circuito de Caballería (100x3)", "badge": "Deporte"},
        {"time": "09:30 - 12:45", "title": "👑 Bloque Foco: Empleo Hannover / Bilbao & Trámites Estratégicos", "badge": "Vida"},
        {"time": "14:30 - 17:30", "title": "🧭 Proyectos: Maule Red / Museo de la Memoria / Ciencia & Territorio", "badge": "Exploración"},
        {"time": "20:00 - 21:30", "title": "💆 Aftercare, Masajes en Pareja & Descompresión Somática", "badge": "Amor"}
    ],
    "viernes": [
        {"time": "09:00 - 09:30", "title": "🥊 Sparring / Cardio Matutino & Ducha Fría", "badge": "Deporte"},
        {"time": "09:30 - 12:45", "title": "👑 Cierre de Semana Laboral: Seguimiento de Postulaciones & Objetivos", "badge": "Vida"},
        {"time": "16:00 - 18:00", "title": "🌲 Caminata en Bosque / Naturaleza Viva & Desconexión Digital", "badge": "Naturaleza"},
        {"time": "20:00 - 23:00", "title": "🍷 Cita de Viernes con Mi Novia: Goce, Conversación & Conexión", "badge": "Amor"}
    ],
    "sabado": [
        {"time": "09:30 - 11:00", "title": "🧗‍♂️ Deporte Outdoor, Escalada, Ciclismo o Entrenamiento Libre", "badge": "Deporte"},
        {"time": "11:30 - 13:30", "title": "🎨 Exploración Creativa: Pintura al Óleo, Fotografía o Cómic Piratas", "badge": "Exploración"},
        {"time": "16:00 - 18:30", "title": "🌲 Conexión Tierra / Paseo Exterior & Recarga Solar", "badge": "Naturaleza"},
        {"time": "20:30 - 22:30", "title": "🕯️ Presencia Íntima, Tantra & Disfrute Consciente", "badge": "Amor"}
    ],
    "domingo": [
        {"time": "10:00 - 10:45", "title": "🪙 Auditoría Dominical: Cuentas Sparkasse (€), Banco Chile ($) & Cero Gastos Tontos", "badge": "Soberanía"},
        {"time": "11:00 - 12:30", "title": "🕯️ Rito Ancestral, Meditación & Planificación de la Nueva Semana", "badge": "Espíritu"},
        {"time": "13:00 - 14:30", "title": "👨‍🍳 Cocina con Afecto & Meal Prep Nutritivo", "badge": "Salud"},
        {"time": "18:00 - 20:00", "title": "📖 Lectura Estoica, Diario Hypomnémata & Sueño Reparador Temprano", "badge": "Mente"}
    ]
}

NIGHT_REFLECTIONS = [
    {"q": "Antes de dormir, revisa tu día con serenidad: ¿qué hiciste bien, qué puedes mejorar mañana y qué carga puedes soltar ahora?", "a": "Séneca • De la Ira III, 36"},
    {"q": "Prepara esta noche el terreno de mañana: ropa lista, mente limpia y descanso reparador para despertar como comandante.", "a": "Marco Aurelio • Meditaciones"},
    {"q": "Quien ordena su mañana desde la noche anterior despierta libre de fricción y con soberanía sobre su tiempo.", "a": "Códice Caballero Jaguar"},
    {"q": "La disciplina de la noche es el cimiento de la victoria matutina. Cuida tu sueño como el templo de tu fuerza.", "a": "Epicteto • Manual de Vida"}
]

DAYS_ES = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
DAYS_CAP = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"]


def build_night_message(streak_days=0, weekly_flags=None, calendar_events=None):
    # Zona horaria de Alemania / Europa Central (CET UTC+1)
    tz_berlin = timezone(timedelta(hours=1))
    now = datetime.now(tz_berlin)
    tomorrow = now + timedelta(days=1)
    
    today_name = DAYS_CAP[now.weekday()]
    tomorrow_name = DAYS_CAP[tomorrow.weekday()]
    tomorrow_key = DAYS_ES[tomorrow.weekday()]
    tomorrow_date_str = tomorrow.strftime("%d/%m/%Y")
    
    # 1. PROTOCOLO DE BANDERAS ACTIVAS EN LA SEMANA
    # weekly_flags = dict de nombre: xp_points (ej. {"deporte": 50, "vida": 0, ...})
    if weekly_flags is None:
        weekly_flags = {
            "🥊 Deporte": 0,
            "👑 Vida / Empleo": 0,
            "🧠 Mente / Alemán": 0,
            "🧭 Exploración": 0,
            "❤️ Amor & Pareja": 0,
            "🌿 Salud Somática": 0,
            "🪙 Soberanía Finanzas": 0,
            "🕯️ Espíritu & Ritos": 0,
            "🌲 Naturaleza": 0
        }
    
    active_flags = [k for k, v in weekly_flags.items() if v > 0]
    num_active = len(active_flags)
    
    if num_active == 0:
        protocol_status = "🚨 *ESTADO SEMANAL: CAMPAMENTO FRÍO (0 Banderas)*"
        protocol_feedback = (
            "⚠️ *Alerta de Inercia:* No hay banderas encendidas todavía esta semana.\n"
            "La inercia pesa si la dejas crecer, pero el primer paso la destruye al instante. "
            "Elige UNA sola bandera mañana (ej. 20 min de Deporte o Foco) y pon el primer punto en la tabla."
        )
    elif num_active <= 3:
        act_str = ", ".join(active_flags)
        protocol_status = f"⚠️ *ESTADO SEMANAL: COMBATE PARCIAL ({num_active}/9 Banderas)*"
        protocol_feedback = (
            f"Tienes frentes activos ({act_str}), pero la mayoría sigue en sombra.\n"
            "¿Qué está pasando con los otros flancos? ¿Dónde está el cuello de botella o la fuga de energía? "
            "Mañana reconquista al menos un frente descuidado y no dejes morir el terreno ganado."
        )
    else:
        act_str = ", ".join(active_flags)
        protocol_status = f"🔥 *ESTADO SEMANAL: ALTA TRACCIÓN ({num_active}/9 Banderas)*"
        protocol_feedback = (
            f"¡Excelente tracción! Llevas {num_active} banderas encendidas ({act_str}).\n"
            "El impulso está de tu lado; no te confíes ni bajes la guardia. "
            "Sigue sumando y consolida la victoria de la semana como un verdadero Caballero Jaguar."
        )

    # 2. ESTADO DEL DESAFÍO 21 DÍAS (NO FAP / TEMPLANZA)
    if streak_days <= 0:
        nofap_visual = "░░░░░░░░░░░░░░░░░░░░░ *[Racha en pausa / 0 Días]*"
        nofap_msg = (
            "⚠️ *Alerta de Guardia:* No hay marcas activas registradas en la app.\n"
            "• ¿Te mantuviste firme y solo olvidaste marcarlo? ➡️ Entra a la app y pulsa *Reconciliar con Honores*.\n"
            "• ¿Hubo quiebre o desconexión? ➡️ Asumir con serenidad estoica y consagrar mañana el *Nuevo Día 1*."
        )
    else:
        filled = min(21, streak_days)
        empty = 21 - filled
        pct = int((filled / 21) * 100)
        bar = ("▓" * filled) + ("░" * empty)
        nofap_visual = f"{bar} *[Día {filled} de 21]* ({pct}%)"
        nofap_msg = "🛡️ *Templanza Activa:* Sistema nervioso en calma, energía vital protegida y voluntad soberana al mando."

    # 3. PLANES PARA MAÑANA (HORARIOS TÁCTICOS)
    tomorrow_blocks = SCHEDULES.get(tomorrow_key, SCHEDULES["lunes"])
    blocks_lines = []
    for idx, b in enumerate(tomorrow_blocks, 1):
        blocks_lines.append(f"• *{b['time']}* [{b['badge']}] {b['title']}")
    blocks_text = "\n".join(blocks_lines)

    # 4. GOOGLE CALENDAR EN VIVO
    if calendar_events and len(calendar_events) > 0:
        cal_lines = [f"• 📅 {ev}" for ev in calendar_events]
        cal_text = "\n".join(cal_lines)
    else:
        cal_text = "• 📅 Agenda libre de reuniones externas — Día ideal para Deep Work."

    # 5. REFLEXIÓN NOCTURNA ESTOICA
    reflection = NIGHT_REFLECTIONS[now.timetuple().tm_yday % len(NIGHT_REFLECTIONS)]

    # ENSAMBLAJE FINAL DEL MENSAJE
    msg = f"""🌙 *CABALLERO JAGUAR • REPORTE DE LAS 21:00*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *Víspera: Preparando {tomorrow_name} ({tomorrow_date_str})*

{protocol_status}
{protocol_feedback}

🔥 *DESAFÍO 21 DÍAS (TEMPLANZA & NO FAP):*
{nofap_visual}
{nofap_msg}

⚔️ *MISIÓN DE ASALTO PARA MAÑANA ({tomorrow_name}):*
{blocks_text}

📆 *GOOGLE CALENDAR (MAÑANA):*
{cal_text}

🏛️ *REFLEXIÓN NOCTURNA DEL ESTRATEGA:*
_"{reflection['q']}"_
— {reflection['a']}

👔 *Rito de la Noche:* Deja tu ropa lista, apaga pantallas temprano y entra al santuario:
📲 {APP_URL}"""

    return msg


def send_whatsapp(message_text):
    url = f"https://api.green-api.com/waInstance{ID_INSTANCE}/sendMessage/{API_TOKEN_INSTANCE}"
    payload = {
        "chatId": CHAT_ID,
        "message": message_text
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    print("[*] Construyendo Reporte Nocturno 21:00...")
    # Genera el mensaje aplicando el protocolo con honestidad radical
    msg = build_night_message(
        streak_days=0, # Si no ha registrado, racha en 0
        weekly_flags=None, # Campamento frío (0 banderas) para invitar a activarse
        calendar_events=None
    )
    print(f"[*] Mensaje generado ({len(msg)} caracteres). Enviando a {CHAT_ID}...")
    res = send_whatsapp(msg)
    print(f"[✓] Mensaje entregado con éxito a WhatsApp! ID: {res.get('idMessage')}")


if __name__ == "__main__":
    main()
