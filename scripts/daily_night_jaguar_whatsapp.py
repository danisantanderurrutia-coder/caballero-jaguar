#!/usr/bin/env python3
"""
Caballero Jaguar • Motor Nocturno de WhatsApp 21:00 (Compacto)
"""

import json
import urllib.request
from datetime import datetime, timezone, timedelta

ID_INSTANCE = "710722811758"
API_TOKEN_INSTANCE = "18d1ccd9e09e486daa60f195ea879bdfe5c63bff2fa046d08d"
CHAT_ID = "4917676497440@c.us"
APP_URL = "https://danisantanderurrutia-coder.github.io/caballero-jaguar/"

SCHEDULES_COMPACT = {
    "lunes": [
        "• 09:00 🥊 Deporte (Fuerza Base)",
        "• 09:30 👑 Vida (Foco Dual Hannover)",
        "• 13:00 🧠 Alemán al Mediodía",
        "• 14:30 🧭 Paper Lauwersmeer"
    ],
    "martes": [
        "• 09:00 🏃 Deporte (Cardio / Shadowboxing)",
        "• 09:30 👑 Vida (Postulaciones Euskadi/Hannover)",
        "• 13:00 🧠 Alemán B1",
        "• 19:30 💖 Cita / Pareja"
    ],
    "miercoles": [
        "• 09:00 🧘 Salud (Calistenia & Movilidad)",
        "• 09:30 👑 Vida (Avance Profesional / CV)",
        "• 13:00 🧠 Alemán B1 + Trompeta",
        "• 14:30 🌲 Chile Agrotech & ReWild"
    ],
    "jueves": [
        "• 09:00 🏋️ Deporte (Circuito Fuerza)",
        "• 09:30 👑 Vida (Empleo & Trámites)",
        "• 14:30 🧭 Proyectos (Maule Red / Ciencia)",
        "• 20:00 💖 Aftercare & Masajes"
    ],
    "viernes": [
        "• 09:00 🥊 Deporte (Sparring / Cardio)",
        "• 09:30 👑 Vida (Cierre de Semana)",
        "• 16:00 🌲 Caminata en Bosque",
        "• 20:00 🍷 Cita de Viernes"
    ],
    "sabado": [
        "• 09:30 🧗 Deporte Outdoor",
        "• 11:30 🧭 Pintura / Fotografía",
        "• 16:00 🌲 Naturaleza Viva",
        "• 20:30 🕯️ Intimidad Consciente"
    ],
    "domingo": [
        "• 10:00 🪙 Auditoría Cuentas (Sparkasse/Chile)",
        "• 11:00 🕯️ Rito & Planificación",
        "• 13:00 🌿 Meal Prep",
        "• 18:00 🧠 Lectura Estoica & Diario"
    ]
}

DAYS_ES = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
DAYS_CAP = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]


def build_compact_night_message(streak_days=0, weekly_flags=None, calendar_events=None):
    tz = timezone(timedelta(hours=1))
    now = datetime.now(tz)
    tomorrow = now + timedelta(days=1)
    tomorrow_cap = DAYS_CAP[tomorrow.weekday()]
    tomorrow_key = DAYS_ES[tomorrow.weekday()]

    # 1. Banderas con protocolo compacto
    if not weekly_flags:
        flags_line = "🚩 *Banderas:* 0/9 encendidas ⚪\n_Campamento frío. Mañana sal del cero con 1 frente._"
    else:
        active = [k for k, v in weekly_flags.items() if v > 0]
        n = len(active)
        if n == 0:
            flags_line = "🚩 *Banderas:* 0/9 encendidas ⚪\n_Campamento frío. Mañana sal del cero con 1 frente._"
        elif n <= 3:
            flags_line = f"🚩 *Banderas:* {n}/9 ({', '.join(active)}) ⚠️\n_Flancos en sombra. ¿Dónde está el freno?_"
        else:
            flags_line = f"🚩 *Banderas:* {n}/9 ({', '.join(active)}) 🔥\n_¡Gran tracción! Mantén el ritmo._"

    # 2. Reto 21d / No Fap
    if streak_days <= 0:
        reto_line = "🔥 *Reto 21d:* 0/21 (Pausa) ⚠️\n_¿Olvidaste marcar o es Día 1?_"
    else:
        filled = min(21, streak_days)
        bar = "▓" * filled + "░" * (21 - filled)
        reto_line = f"🔥 *Reto 21d:* {bar} {filled}/21d\n_Templanza y energía vital al mando._"

    # 3. Plan mañana
    blocks = SCHEDULES_COMPACT.get(tomorrow_key, SCHEDULES_COMPACT["lunes"])
    blocks_str = "\n".join(blocks)

    # 4. Calendar
    if calendar_events and len(calendar_events) > 0:
        cal_str = "📅 _Calendar: " + "; ".join(calendar_events) + "_"
    else:
        cal_str = "📅 _Calendar: Sin reuniones externas_"

    # 5. Cita corta
    quotes = [
        "La disciplina de la noche es la victoria del alba.",
        "Prepara el terreno hoy; despierta como comandante mañana.",
        "No negocies con la inercia: cumple tu siguiente deber con calma.",
        "Mente limpia, ropa lista y descanso reparador."
    ]
    quote = quotes[now.timetuple().tm_yday % len(quotes)]

    msg = f"""🌙 *JAGUAR • 21:00* | Víspera de *{tomorrow_cap}*

{flags_line}

{reto_line}

⚔️ *Plan de Mañana:*
{blocks_str}
{cal_str}

🏛️ _"{quote}"_

📲 {APP_URL}"""

    return msg


def send_whatsapp(message_text):
    url = f"https://api.green-api.com/waInstance{ID_INSTANCE}/sendMessage/{API_TOKEN_INSTANCE}"
    payload = {"chatId": CHAT_ID, "message": message_text}
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    msg = build_compact_night_message(streak_days=0, weekly_flags=None)
    res = send_whatsapp(msg)
    print(f"[✓] Entregado ID: {res.get('idMessage')}")


if __name__ == "__main__":
    main()
