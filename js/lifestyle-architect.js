/**
 * ============================================================================
 * ARQUITECTO DE ESTILO DE VIDA & CALENDARIO DE VIDA SANA (7 DÍAS × 3 MOMENTOS)
 * ENCARNACIÓN SOMÁTICA DE LA SALUD • ORDEN DEL CABALLERO JAGUAR
 * ============================================================================
 * Implementación modular: Datos JSON estrictos, 7 Pilares de Vitalidad,
 * 21 recomendaciones funcionales de Gear & Outfit, articulación fisiológica,
 * sincronización con tareas diarias, y consola del System Prompt para LLMs.
 */

// 1. DATASET MAESTRO EN JSON ESTRICTO (7 Días × 3 Momentos)
const LIFESTYLE_ARCHITECT_DATA = {
  "metadatos": {
    "usuario": "Caballero Jaguar (Daniel)",
    "objetivo": "Vida sana, vitalidad física, claridad mental y presencia estética",
    "fecha_creacion": new Date().toISOString().split("T")[0],
    "score_vitalidad_semanal": "99/100",
    "version": "2.5.0-somatic-master"
  },
  "pilares": [
    {
      "id": "pilar-1",
      "num": "01",
      "nombre": "Fuerza y Longevidad Física",
      "icono": "⚔️",
      "color": "var(--imperial-gold)",
      "descripcion": "Entrenamiento de fuerza, hipertrofia funcional, estabilidad postural y prevención articular."
    },
    {
      "id": "pilar-2",
      "num": "02",
      "nombre": "Capacidad Cardiovascular & Aire Libre",
      "icono": "🏃‍♂️",
      "color": "var(--neon-cyan)",
      "descripcion": "Cardio Zone 2, running, natación, ciclismo, senderismo o deportes de equipo en entornos vivos."
    },
    {
      "id": "pilar-3",
      "num": "03",
      "nombre": "Movilidad, Respiración & Restauración",
      "icono": "🧘",
      "color": "var(--chivalry-green)",
      "descripcion": "Yoga, breathwork, sauna, contraste frío/calor, foam rolling y caminatas descalzo/naturaleza (grounding)."
    },
    {
      "id": "pilar-4",
      "num": "04",
      "nombre": "Claridad Cognitiva & Deep Work Saludable",
      "icono": "🧠",
      "color": "var(--parchment-warm)",
      "descripcion": "Bloques de enfoque con higiene postural, pausas activas, respiración nasal y desconexión digital."
    },
    {
      "id": "pilar-5",
      "num": "05",
      "nombre": "Nutrición & Hidratación Estratégica",
      "icono": "🥑",
      "color": "var(--rose-gold-light)",
      "descripcion": "Timing de hidratación con electrolitos, comidas densas en nutrientes y cenas tempranas antiinflamatorias."
    },
    {
      "id": "pilar-6",
      "num": "06",
      "nombre": "Socialización Saludable",
      "icono": "☕",
      "color": "var(--neon-pink-bright)",
      "descripcion": "Conexión humana en entornos no tóxicos (cafés de especialidad, senderos, clubes deportivos, mercados orgánicos)."
    },
    {
      "id": "pilar-7",
      "num": "07",
      "nombre": "Higiene del Sueño & Viento a Favor",
      "icono": "🌙",
      "color": "#8A9BA8",
      "descripcion": "Protocolo nocturno de luz ámbar, relajación parasimpática, magnesio y desconexión somática."
    }
  ],
  "dias": {
    "lunes": {
      "id": "lunes",
      "nombre": "Lunes",
      "icono": "⚡",
      "tema": "Ignición Somática & Fuerza Base",
      "enfoque_fisiologico": "Sistema Neuromuscular, Síntesis Proteica & Calibración Circadiana",
      "color_tema": "emerald",
      "resumen_dia": "Inicio de semana estructurado con entrenamiento de resistencia muscular y comida real para fijar el tono hormonal y la densidad de receptores dopaminérgicos de la semana.",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:00 - 09:00)",
          "actividad": "Luz solar matutina + Caminata activa 40 min + Hidratación con electrolitos",
          "beneficio_biologico": "Calibración del ritmo circadiano mediante luz natural directa en los ojos; elevación natural del cortisol saludable matutino y pico temprano de dopamina.",
          "gear_and_outfit": {
            "prendas": [
              "Camiseta técnica transpirable de fibra de bambú o algodón pima carbón",
              "Pantalón corto deportivo con compresión interna ergonómica",
              "Zapatillas barefoot de horma ancha o de pisada neutra natural"
            ],
            "accesorios": [
              "Gafas de sol (solo tras recibir los primeros 15 min de luz solar sin filtro)",
              "Botella de acero inoxidable con agua filtrada y sales minerales isotónicas"
            ]
          },
          "estado_somatico": "Torso erguido, respiración exclusivamente nasal cadenciada, mirada al horizonte libre de pantallas.",
          "nutricion_e_hidratacion": "500ml de agua tibia con una pizca de sal del Himalaya y zumo de medio limón en ayunas. Desayuno denso alto en proteína (huevos de pastoreo, aguacate y frutos rojos silvestres).",
          "duracion_optima": "45 min"
        },
        "tarde": {
          "momento": "Tarde (17:30 - 19:30)",
          "actividad": "Sesión de fuerza funcional (Fuerza pesada tren superior + movilidad escapular)",
          "beneficio_biologico": "Estimulación de la síntesis proteica vía mTOR, incremento de densidad mineral ósea y elevación inmediata de la sensibilidad a la insulina periférica.",
          "gear_and_outfit": {
            "prendas": [
              "Camiseta técnica sobria corte atlético en tonos verde bosque o grafito",
              "Pantalón o mallas de entrenamiento con bolsillos técnicos con cremallera",
              "Calzado plano de suela rígida sin drop para máxima transferencia de fuerza"
            ],
            "accesorios": [
              "Cinturón de levantamiento o correas de agarre si aplica",
              "Toalla compacta de microfibra antibacteriana y reloj medidor de FC"
            ]
          },
          "estado_somatico": "Intensidad controlada, foco láser sin dispersión con el móvil entre series, presencia física firme y mirada presente.",
          "nutricion_e_hidratacion": "Snack pre-entreno con fruta de bajo índice glucémico (arándanos o plátano macho); post-entreno con aislado proteico y carbohidratos complejos de absorción limpia.",
          "duracion_optima": "60-75 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:30)",
          "actividad": "Cena antiinflamatoria + Estiramientos pasivos + Desconexión de pantallas",
          "beneficio_biologico": "Descenso del tono simpático hacia el parasimpático; activación de la melatonina endógena y descompresión de discos intervertebrales.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón de algodón orgánico holgado / chándal relajado sin elásticos apretados",
              "Camiseta de tejido suave de corte amplio y cuello libre",
              "Calcetines térmicos cómodos de lana merino suave sin costuras restrictivas"
            ],
            "accesorios": [
              "Lámpara de luz ámbar o velas de cera de abeja para eliminar el espectro azul",
              "Esterilla de corcho natural para estiramientos en suelo"
            ]
          },
          "estado_somatico": "Hombros caídos, mandíbula relajada sin tensión oclusal, respiración diafragmática 4-7-8.",
          "nutricion_e_hidratacion": "Cena ligera rica en omega-3 (salmón salvaje o verduras al vapor con aceite de oliva virgen extra). Infusión de manzanilla con 300mg de bisglicinato de magnesio y glicina.",
          "duracion_optima": "40 min"
        }
      }
    },
    "martes": {
      "id": "martes",
      "nombre": "Martes",
      "icono": "🌊",
      "tema": "Resistencia Aeróbica & Capacidad Mitocondrial",
      "enfoque_fisiologico": "Biogénesis Mitocondrial, Flexibilidad Metabólica (Zona 2) & Depuración Láctica",
      "color_tema": "cyan",
      "resumen_dia": "Día enfocado en la base cardiovascular de baja intensidad (Zone 2) para maximizar la oxidación de ácidos grasos y estimular la claridad mental prolongada.",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:00 - 08:30)",
          "actividad": "Cardio en Zona 2 al aire libre (Ciclismo continuo o carrera suave conversacional)",
          "beneficio_biologico": "Aumento del volumen mitocondrial celular, capilarización periférica y reducción de la frecuencia cardíaca en reposo.",
          "gear_and_outfit": {
            "prendas": [
              "Cortavientos ultraligero transpirable con tratamiento DWR en tono pizarra",
              "Mallas o shorts técnicos de running con costuras termoselladas antirroce",
              "Zapatillas de running con amortiguación equilibrada y drop medio/bajo"
            ],
            "accesorios": [
              "Banda pectoral de frecuencia cardíaca o reloj GPS con control estricto de Zona 2",
              "Cinturón de hidratación ligero con soft flask de agua con electrolitos"
            ]
          },
          "estado_somatico": "Cadencia suave y rítmica, respiración nasal continua que permita mantener un diálogo sin jadear, sensación de flotar.",
          "nutricion_e_hidratacion": "Agua con sales isotónicas antes de partir. Desayuno post-cardio: porridge de avena germinada con canela de Ceilán, semillas de chía y frutos secos.",
          "duracion_optima": "50 min"
        },
        "tarde": {
          "momento": "Tarde (15:00 - 17:30)",
          "actividad": "Deep Work Saludable con Pausas Activas de Descompresión Espinal",
          "beneficio_biologico": "Consolidación neural de proyectos complejos; prevención de estasis venosa y sobrecarga cervical mediante higiene postural dinámica.",
          "gear_and_outfit": {
            "prendas": [
              "Camisa de lino o jersey fino de punto transpirable elegante pero descontracturado",
              "Pantalón elástico técnico casual con cintura ajustable",
              "Calzado barefoot o calcetines antideslizantes para trabajar de pie/sentado"
            ],
            "accesorios": [
              "Gafas con filtro de espectro azul para pantallas",
              "Elevador para portátil / escritorio de altura regulable (standing desk)"
            ]
          },
          "estado_somatico": "Alineación vertical de la columna, omóplatos relajados, pausas de 2 minutos cada 45 minutos para colgarse de una barra (dead hang).",
          "nutricion_e_hidratacion": "Té verde Matcha ceremonial rico en L-teanina para foco sostenido sin picos de cortisol. Termo de infusión fría de menta fresca.",
          "duracion_optima": "90 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:00)",
          "actividad": "Ducha templada de relajación + Lectura analógica no técnica",
          "beneficio_biologico": "Vasodilatación periférica que desciende la temperatura corporal central facilitando la entrada en fase de sueño REM y delta profundo.",
          "gear_and_outfit": {
            "prendas": [
              "Ropa de descanso en modal o lino suave lavado",
              "Zapatillas de casa de fieltro natural transpirable"
            ],
            "accesorios": [
              "Libro de papel o e-reader con luz cálida ámbar sin notificaciones"
            ]
          },
          "estado_somatico": "Tono muscular en reposo, respiración lenta y nasal, mente en modo recepción y calma estoica.",
          "nutricion_e_hidratacion": "Cena de digestión rápida: crema de calabaza asada con semillas de calabaza y pescado blanco. Infusión de pasiflora y melisa.",
          "duracion_optima": "35 min"
        }
      }
    },
    "miercoles": {
      "id": "miercoles",
      "nombre": "Miércoles",
      "icono": "🛡️",
      "tema": "Potencia Muscular, Hipertrofia & Prevención",
      "enfoque_fisiologico": "Fuerza Tren Inferior, Resistencia Mecánica & Estabilidad Articular",
      "color_tema": "gold",
      "resumen_dia": "Día de máxima demanda estructural: trabajo de tren inferior y cadenas posteriores para liberar hormona de crecimiento y anclar el equilibrio postural.",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:00 - 08:30)",
          "actividad": "Activación dinámica matutina + Movilidad de cadera, tobillo y rotadores",
          "beneficio_biologico": "Lubricación del líquido sinovial articular, activación del sistema nervioso central sin generar fatiga previa al entrenamiento.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón de chándal ajustado y flexible de tejido técnico suave",
              "Camiseta interior de tirantes de compresión leve"
            ],
            "accesorios": [
              "Banda de resistencia elástica media",
              "Esterilla antideslizante de caucho natural"
            ]
          },
          "estado_somatico": "Fluidez articular sin bloqueos, respiración sincronizada con cada rotación de cadera y columna torácica.",
          "nutricion_e_hidratacion": "Agua de mar isotónica diluida (1 parte agua de mar x 3 partes agua pura). Shot de jengibre y cúrcuma con pimienta negra.",
          "duracion_optima": "30 min"
        },
        "tarde": {
          "momento": "Tarde (17:30 - 19:30)",
          "actividad": "Sesión de Fuerza Tren Inferior (Sentadillas, Peso Muerto Rumano & Estabilidad Unilateral)",
          "beneficio_biologico": "Máxima respuesta neuroendocrina, fortalecimiento de tendones patelares y aquíleos, prevención de lumbalgias.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón corto de halterofilia reforzado con total libertad de flexión profunda",
              "Camiseta técnica ajustada de secado rápido",
              "Zapatillas planas de suela minimalista y drop cero para firme apoyo del trípode podal"
            ],
            "accesorios": [
              "Cinturón lumbar si se mueven cargas submáximas",
              "Rodilleras de neopreno de 5mm si se busca calidez articular"
            ]
          },
          "estado_somatico": "Pies bien enraizados (agarre podal activo), presión intraabdominal controlada con maniobra de Valsalva prudente.",
          "nutricion_e_hidratacion": "Comida 2h antes con arroz integral y pechuga de pavo de pastoreo. Post-entreno: batido de proteína aislada con kéfir artesanal y arándanos.",
          "duracion_optima": "65 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:30)",
          "actividad": "Liberación miofascial con Foam Roller + Respiración en caja (Box Breathing)",
          "beneficio_biologico": "Disolución de puntos gatillo musculares, drenaje linfático periférico y modulación vagal para inducción del sueño.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón largo elástico muy suave y camiseta holgada de bambú"
            ],
            "accesorios": [
              "Foam roller de densidad media o pelota de lacrosse para glúteos y gemelos",
              "Aceite esencial de lavanda o eucalipto en difusor ambiental"
            ]
          },
          "estado_somatico": "Descarga de la tensión residual en los cuádriceps e isquiotibiales, exhalaciones largas y sonoras por la boca al rodar sobre nudos musculares.",
          "nutricion_e_hidratacion": "Cena rica en colágeno y zinc: caldo de huesos casero con verduras troceadas y huevo pochado. 400mg de glicinato de magnesio.",
          "duracion_optima": "35 min"
        }
      }
    },
    "jueves": {
      "id": "jueves",
      "nombre": "Jueves",
      "icono": "🍃",
      "tema": "Movilidad Profunda, Grounding & Bio-Restauración",
      "enfoque_fisiologico": "Sistema Parasimpático, Reparación Tisular & Reducción de Inflamación Celular",
      "color_tema": "teal",
      "resumen_dia": "Día de restauración activa y descarga del sistema nervioso central para asimilar el estímulo muscular y restaurar la variabilidad cardíaca (VFC/HRV).",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:30 - 08:45)",
          "actividad": "Caminata descalzo sobre césped natural (Grounding) + Vinyasa Yoga suave al aire libre",
          "beneficio_biologico": "Neutralización de radicales libres por intercambio de electrones con la tierra; incremento de la flexibilidad fascial y apertura torácica.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón ancho de yoga en lino o algodón orgánico",
              "Sudadera ligera de corte limpio sin cremalleras metálicas molestas",
              "Pies completamente descalzos en contacto directo con la tierra o el césped"
            ],
            "accesorios": [
              "Esterilla de viaje ligera para asanas en suelo seco",
              "Termo con agua templada e infusión de jengibre"
            ]
          },
          "estado_somatico": "Contacto pleno de la planta del pie con la hierba húmeda, respiración diafragmática fluida, sincronía entre movimiento y respiración ujjayi.",
          "nutricion_e_hidratacion": "Agua tibia con limón y una pizca de bicarbonato sódico. Desayuno ligero: bowl de kéfir con nueces, semillas de cáñamo y frutos del bosque.",
          "duracion_optima": "45 min"
        },
        "tarde": {
          "momento": "Tarde (16:30 - 18:00)",
          "actividad": "Natación regenerativa o Aqua-Flow en piscina climatizada / lago natural",
          "beneficio_biologico": "Descarga hidrostática de las articulaciones, estiramiento del tren axial sin impacto de gravedad y estímulo de la capacidad pulmonar.",
          "gear_and_outfit": {
            "prendas": [
              "Bañador técnico tipo jammer o boxer de natación resistente al cloro",
              "Gafas de natación con protección UV y sello ergonómico de silicona suave",
              "Gorro de silicona para hidrodinamia limpia"
            ],
            "accesorios": [
              "Albornoz o toalla de microfibra de gran tamaño",
              "Chanclas con suela antideslizante para zona húmeda"
            ]
          },
          "estado_somatico": "Brazadas largas y rítmicas, sensación de ingravidez, rotación del cuello suave para respirar sin forzar las cervicales.",
          "nutricion_e_hidratacion": "Snack post-natación: un plátano maduro con crema de almendras 100% natural. 600ml de agua rica en electrolitos.",
          "duracion_optima": "45 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:00)",
          "actividad": "Cena antiinflamatoria rica en polifenoles + Protocolo de oscuridad progresiva",
          "beneficio_biologico": "Reducción de marcadores de inflamación sistémica (PCR ultrasensible); preservación de la curva natural de melatonina.",
          "gear_and_outfit": {
            "prendas": [
              "Pijama de dos piezas en algodón peinado transpirable de tonalidad cruda",
              "Zapatillas de descanso de lana natural"
            ],
            "accesorios": [
              "Lentes de bloqueo de luz azul 99% si hay interacción indispensable con pantallas",
              "Máscara antifaz de seda para dormir en oscuridad absoluta"
            ]
          },
          "estado_somatico": "Respiración exclusivamente nasal en reposo, relajación voluntaria de los músculos oculares y la frente.",
          "nutricion_e_hidratacion": "Cena con wok de verduras de hoja verde oscura, champiñones shiitake, jengibre y tofu o pollo orgánico. Infusión de manzanilla dulce y tila.",
          "duracion_optima": "35 min"
        }
      }
    },
    "viernes": {
      "id": "viernes",
      "nombre": "Viernes",
      "icono": "🔥",
      "tema": "Fuerza Funcional, Deep Work & Socialización Sana",
      "enfoque_fisiologico": "Potencia Neuromuscular, Conexión Humana & Cierre Semanal de Objetivos",
      "color_tema": "crimson",
      "resumen_dia": "Día de finalización de grandes metas de la semana: potencia física limpia, sprint cognitivo de deep work y socialización vibrante pero consciente.",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:00 - 08:30)",
          "actividad": "Activación corporal rápida + Bloque de Deep Work de alta prioridad",
          "beneficio_biologico": "Alineación de la dopamina con la finalización de metas reales; reducción de la ansiedad anticipatoria del fin de semana.",
          "gear_and_outfit": {
            "prendas": [
              "Camisa casual estructurada o jersey cuello polo de corte impecable",
              "Pantalón chino técnico elástico de alta movilidad en azul marino o carbón",
              "Calzado formal minimalista o zapatillas de cuero blanco pulido"
            ],
            "accesorios": [
              "Cuaderno analógico de cuero y bolígrafo de tinta para priorización",
              "Auriculares con cancelación de ruido activa y soundscapes binaurales"
            ]
          },
          "estado_somatico": "Postura alerta pero sin rigidez, respiración rítmica, foco indivisible en una única tarea hasta su cierre.",
          "nutricion_e_hidratacion": "Café de especialidad de tueste medio tomado 90 minutos después de despertar (para evitar el crash vespertino de adenosina). Vaso de agua fría con sales.",
          "duracion_optima": "60 min"
        },
        "tarde": {
          "momento": "Tarde (17:00 - 19:00)",
          "actividad": "Entrenamiento de Calistenia / Boxeo sombra / Movilidad explosiva + Café de Especialidad",
          "beneficio_biologico": "Estimulación de la potencia contráctil rápida (fibras tipo IIa/IIb), liberación de endorfinas y conexión social en un entorno estimulante.",
          "gear_and_outfit": {
            "prendas": [
              "Camiseta técnica de manga corta corte slim en tono vino o negro pizarra",
              "Shorts de entrenamiento atlético con forro elástico y cordón reforzado",
              "Zapatillas de crosstraining de alta tracción y soporte lateral"
            ],
            "accesorios": [
              "Vendas elásticas de boxeo o calleras para barra de dominadas",
              "Chaqueta ligera tipo bomber o cortavientos para la salida social post-entreno"
            ]
          },
          "estado_somatico": "Mirada vivaz, ligereza sobre las puntas de los pies, postura de confianza natural y presencia atractiva.",
          "nutricion_e_hidratacion": "Snack energético: dos dátiles Medjool rellenos de mantequilla de cacahuete con sal marina. Café filtrado o infusión fría con amigos.",
          "duracion_optima": "75 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 23:00)",
          "actividad": "Cena social saludable con amigos o pareja en restaurante de producto real / mercado",
          "beneficio_biologico": "Liberación de oxitocina mediante conversación profunda y contacto humano; fortalecimiento del sistema inmunológico a través de la pertenencia comunitaria.",
          "gear_and_outfit": {
            "prendas": [
              "Sobrecamisa de tejido natural estructurado (pana fina, lana fría o denim suave)",
              "Camiseta básica blanca de algodón pima de gramaje medio",
              "Pantalón vaquero o sastre cómodo sin tensiones en cintura"
            ],
            "accesorios": [
              "Reloj analógico clásico con correa de cuero noble",
              "Perfume sutil con notas amaderadas y frescas"
            ]
          },
          "estado_somatico": "Escucha activa, sonrisa genuina, mandíbula relajada, sin consultar el teléfono durante la velada.",
          "nutricion_e_hidratacion": "Platos de producto local: carnes de pastoreo o pescados salvajes a la brasa con ensaladas de estación. Agua mineral con gas y rodaja de lima en lugar de alcohol pesado.",
          "duracion_optima": "90 min"
        }
      }
    },
    "sabado": {
      "id": "sabado",
      "nombre": "Sábado",
      "icono": "⛰️",
      "tema": "Aventura Outdoor, Resistencia & Naturaleza",
      "enfoque_fisiologico": "Resistencia Cardiovascular Prolongada, Exposición a Fitoncidas & Salud Visual Lejana",
      "color_tema": "purple",
      "resumen_dia": "Expedición territorial de fin de semana: contacto directo con el bosque, la montaña o la costa para resetear el estrés urbano y saturar los pulmones de aire limpio.",
      "bloques": {
        "manana": {
          "momento": "Mañana (08:30 - 12:00)",
          "actividad": "Trail running o Senderismo de montaña a paso vivo por sendero natural",
          "beneficio_biologico": "Inhalación de fitoncidas vegetales que elevan las células Natural Killer (sistema inmune); fortalecimiento de la propiocepción podal en terreno irregular.",
          "gear_and_outfit": {
            "prendas": [
              "Camiseta técnica de lana merino ultrafina (termorreguladora y antibacteriana natural)",
              "Pantalón corto de trail con bolsillos perimetrales para nutrición y teléfono",
              "Zapatillas de trail running con suela de tacos Vibram o equivalente de alta tracción"
            ],
            "accesorios": [
              "Mochila chaleco de hidratación de 5L con 1.5L de agua y electrolitos",
              "Gorra técnica ultraligera y gafas de sol deportivas de categoría 3"
            ]
          },
          "estado_somatico": "Mirada panorámica hacia el horizonte natural (relajación del músculo ciliar ocular), respiración adaptativa y zancada elástica.",
          "nutricion_e_hidratacion": "Desayuno consistente 1h antes: tortilla de espinacas y boniato cocido. En ruta: geles caseros de dátiles triturados con agua de coco y sal marina.",
          "duracion_optima": "120 min"
        },
        "tarde": {
          "momento": "Tarde (14:30 - 17:00)",
          "actividad": "Almuerzo nutritivo campestre + Siesta regenerativa de 25 minutos al aire libre",
          "beneficio_biologico": "Consolidación de la memoria motriz, reparación celular acelerada y equilibrio hormonal sin entrar en inercia de sueño profundo.",
          "gear_and_outfit": {
            "prendas": [
              "Sudadera técnica con capucha o cortavientos seco para no enfriarse tras el trail",
              "Pantalón de chándal limpio y calcetines secos de recambio"
            ],
            "accesorios": [
              "Manta de picnic o esterilla impermeable para el césped",
              "Botella térmica con infusión templada de rooibos"
            ]
          },
          "estado_somatico": "Cuerpo completamente tendido boca arriba, manos sobre el vientre sintiendo la respiración lenta, desconexión sensorial reparadora.",
          "nutricion_e_hidratacion": "Almuerzo denso y antiinflamatorio: quinoa con aguacate, semillas, tomate de huerto y frutos secos. Abundante agua fresca.",
          "duracion_optima": "60 min"
        },
        "noche": {
          "momento": "Noche (19:30 - 21:30)",
          "actividad": "Protocolo de contraste frío/calor (Sauna finlandesa o baño caliente + Ducha fría de contraste)",
          "beneficio_biologico": "Expresión de proteínas de choque térmico (Hsp70), reducción del dolor muscular tardío (DOMS) y relajación extrema del sistema nervioso autónomo.",
          "gear_and_outfit": {
            "prendas": [
              "Bañador cómodo de secado ultra-rápido para la sesión de sauna",
              "Albornoz de algodón rizado grueso o toalla grande para los intervalos de enfriamiento"
            ],
            "accesorios": [
              "Gorro de fieltro para sauna si se usa calor seco intenso",
              "Botella térmica de 1 litro de agua con sal y magnesio disuelto"
            ]
          },
          "estado_somatico": "Soporte consciente del calor sin resistirse mentalmente, respiración lenta controlada al entrar en la ducha de agua fría.",
          "nutricion_e_hidratacion": "Rehidratación agresiva con 1 litro de agua con electrolitos completos (sodio, potasio, magnesio). Cena temprana y digestiva: crema de verduras y tortilla francesa de hierbas.",
          "duracion_optima": "50 min"
        }
      }
    },
    "domingo": {
      "id": "domingo",
      "nombre": "Domingo",
      "icono": "🌅",
      "tema": "Recarga Somática, Naturaleza Lenta & Viento a Favor",
      "enfoque_fisiologico": "Tono Vagal Elevado, Descompresión Psíquica & Arquitectura de la Semana Entrante",
      "color_tema": "amber",
      "resumen_dia": "Día de calma absoluta y preparación estratégica: caminar sin prisa, organizar la nutrición y blindar la mente para empezar la nueva semana con ventaja hormonal y mental.",
      "bloques": {
        "manana": {
          "momento": "Mañana (08:30 - 10:30)",
          "actividad": "Despertar espontáneo sin alarma + Paseo contemplativo matutino por parque o ribera",
          "beneficio_biologico": "Restablecimiento del equilibrio neuroquímico basomedial; descenso del estrés basal y regulación de la presión arterial sistólica.",
          "gear_and_outfit": {
            "prendas": [
              "Pantalón de franela ligera o algodón lavado corte relajado",
              "Jersey de lana suave o sudadera de corte clásico en tonos tierra",
              "Calzado cómodo de paseo barefoot o zapatilla clásica de lona transpirable"
            ],
            "accesorios": [
              "Libreta de notas pequeña para capturar ideas intuitivas sin abrir el móvil"
            ]
          },
          "estado_somatico": "Paso pausado y sin urgencia, respiración profunda, contemplación de árboles y cielo abierto.",
          "nutricion_e_hidratacion": "Vaso de agua tibia con miel cruda y limón. Brunch casero dominical: tostadas de pan de masa madre con aguacate, aceite de oliva virgen extra y sal marina con semillas.",
          "duracion_optima": "45 min"
        },
        "tarde": {
          "momento": "Tarde (16:00 - 18:00)",
          "actividad": "Meal Prep estratégico para la semana + Sesión de diseño de objetivos de vida",
          "beneficio_biologico": "Reducción de la fatiga de decisión durante los próximos días laborales; garantía de disponibilidad de alimentos reales no ultraprocesados.",
          "gear_and_outfit": {
            "prendas": [
              "Delantal de cocina en lino resistente",
              "Ropa cómoda de casa: camiseta básica transpirable y bermudas cómodas"
            ],
            "accesorios": [
              "Recipientes de vidrio herméticos para conservar alimentos cocinados",
              "Música ambient envolvente de fondo (Christian Löffler / Brian Eno)"
            ]
          },
          "estado_somatico": "Movimientos manuales organizados, presencia en los aromas de los alimentos, mente en orden y control sereno.",
          "nutricion_e_hidratacion": "Cocinando caldos minerales, verduras al horno, fuentes de proteína limpia y cereales integrales para los días sucesivos. Infusión de rooibos con vainilla.",
          "duracion_optima": "60 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:00)",
          "actividad": "Higiene de sueño profunda: Luz ámbar, diario de gratitud y respiración diafragmática",
          "beneficio_biologico": "Descenso de la actividad en la amígdala cerebral; preparación del cerebro para ciclos de ondas lentas delta restauradoras.",
          "gear_and_outfit": {
            "prendas": [
              "Ropa para dormir en tejidos naturales 100% orgánicos, transpirables y limpios",
              "Calcetines suaves térmicos para mantener pies calientes y favorecer la somnolencia"
            ],
            "accesorios": [
              "Diario analógico de cabecera con encuadernación de hilo",
              "Lámpara de sal del Himalaya o bombilla ámbar de espectro cálido sin luz azul"
            ]
          },
          "estado_somatico": "Cuerpo completamente relajado en la cama, sin pantallas en la habitación, exhalaciones profundas y agradecimiento por la semana vivida.",
          "nutricion_e_hidratacion": "Cena muy ligera antes de las 20:00: crema de calabacín y manzana asada con canela. Infusión de glicina con magnesio bisglicinato y manzanilla.",
          "duracion_optima": "40 min"
        }
      }
    }
  }
};

// 2. TEXTO DEL SYSTEM PROMPT COMPLETO
const SYSTEM_PROMPT_TEXT_TEMPLATE = `# SYSTEM PROMPT: ARQUITECTO DE ESTILO DE VIDA & CALENDARIO DE VIDA SANA

Eres un Arquitecto de Alto Rendimiento Humano, Entrenador Holístico y Diseñador de Estilo de Vida.
Tu propósito es generar un "Calendario Semanal de Vida Sana & Vitalidad Integral" (7 días × 3 momentos diarios: Mañana, Tarde y Noche) personalizado para el usuario.

El principio central del sistema es la **"Encarnación Somática de la Salud"**: cada bloque no solo recomienda una acción saludable, sino que articula el estado mental, el nivel de energía, la nutrición/hidratación y el "Gear & Outfit" funcional que predispone al cerebro a entrar en ese estado.

---

## 1. PILARES QUE DEBE CUBRIR LA SEMANA
1. **Fuerza y Longevidad Física**: Entrenamiento de fuerza, hipertrofia funcional, estabilidad y prevención articular.
2. **Capacidad Cardiovascular y Aire Libre**: Zone 2 cardio, running, natación, ciclismo, senderismo o deportes de equipo.
3. **Movilidad, Respiración & Restauración**: Yoga, breathwork, sauna, contraste frío/calor, foam rolling y caminatas descalzo/naturaleza (grounding).
4. **Claridad Cognitiva & Deep Work Saludable**: Bloques de enfoque con higiene postural, pausas activas y desconexión digital.
5. **Nutrición & Hidratación Estratégica**: Timing de hidratación con electrolitos, comidas densas en nutrientes y cenas tempranas antiinflamatorias.
6. **Socialización Saludable**: Conexión humana en entornos no tóxicos (cafés de especialidad, senderos, clubes deportivos, mercados orgánicos).
7. **Higiene del Sueño & Viento a Favor**: Protocolo nocturno de luz ámbar, relajación y desconexión somática.

---

## 2. ESTRUCTURA DE CADA DÍA
Para cada día (Lunes a Domingo), el sistema debe asignar:
- **Tema del Día**: (ej. "Lunes: Reinicio de Potencia & Foco Férreo", "Miércoles: Resistencia Aeróbica & Claridad Mental", "Domingo: Recarga Somática & Naturaleza Lenta").
- **Enfoque Fisiológico**: Qué sistema biológico se prioriza (Mitocondrial, Fuerza, Parasimpático, etc.).
- **3 Bloques Horarios (Mañana, Tarde, Noche)**:
  - \`actividad\`: Nombre y descripción accionable de la actividad saludable.
  - \`beneficio_biologico\`: Impacto en dopamina, cortisol, endorfinas o recuperación neuromuscular.
  - \`gear_and_outfit\`: Qué ponerse exactamente (tejidos transpirables, calzado adecuado barefoot/running/gym, accesorios como reloj medidor, esterilla o botella de agua térmica).
  - \`estado_somatico\`: Calibración de la postura, respiración (nasal, diafragmática) y actitud interna ("farmear energía limpia").
  - \`nutricion_e_hidratacion\`: Protocolo nutricional complementario (ej. agua tibia con sal del Himalaya y limón en ayunas, batido proteico antiinflamatorio con frutos rojos, infusión de magnesio bisglicinato por la noche).
  - \`duracion_optima\`: Tiempo recomendado (ej. 45 min, 90 min, 20 min express).

---

## 3. FORMATO DE RESPUESTA REQUERIDO (JSON ESTRICTO)
Genera la respuesta exclusivamente en formato JSON válido para que sea parseable por cualquier aplicación:

{
  "metadatos": {
    "usuario": "{{NOMBRE_USUARIO}}",
    "objetivo": "Vida sana, vitalidad física, claridad mental y presencia estética",
    "fecha_creacion": "{{FECHA}}",
    "score_vitalidad_semanal": "99/100"
  },
  "dias": {
    "lunes": {
      "nombre": "Lunes",
      "icono": "⚡",
      "tema": "Ignición Somática & Fuerza Base",
      "color_tema": "emerald",
      "resumen_dia": "Inicio de semana estructurado con entrenamiento de resistencia muscular y comida real para fijar el tono hormonal de la semana.",
      "bloques": {
        "manana": {
          "momento": "Mañana (07:00 - 09:00)",
          "actividad": "Luz solar matutina + Caminata activa 40 min + Hidratación con electrolitos",
          "beneficio_biologico": "Calibración del ritmo circadiano mediante luz natural directa en los ojos; elevación natural del cortisol saludable.",
          "gear_and_outfit": {
            "prendas": ["Camiseta técnica transpirable de bambú o algodón pima", "Pantalón corto deportivo con compresión interna", "Zapatillas barefoot o de pisada neutra"],
            "accesorios": ["Gafas de sol solo tras recibir 15 min de luz directa", "Botella de acero con agua y sales minerales"]
          },
          "estado_somatico": "Torso erguido, respiración exclusivamente nasal, mirada al horizonte.",
          "nutricion_e_hidratacion": "500ml de agua tibia con una pizca de sal marina y limón. Desayuno alto en proteína (huevos de pastoreo, aguacate y frutos rojos).",
          "duracion_optima": "45 min"
        },
        "tarde": {
          "momento": "Tarde (17:30 - 19:30)",
          "actividad": "Sesión de fuerza funcional (Fuerza pesada tren superior + movilidad escapular)",
          "beneficio_biologico": "Estimulación de la síntesis proteica, densidad ósea y aumento de la sensibilidad a la insulina.",
          "gear_and_outfit": {
            "prendas": ["Camiseta técnica holgada en tonos sobrios (verde bosque / grafito)", "Pantalón de entrenamiento con bolsillos con cremallera", "Calzado plano de suela rígida"],
            "accesorios": ["Cinturón o correas si aplica", "Toalla de microfibra"]
          },
          "estado_somatico": "Intensidad controlada, sin dispersión con el móvil entre series, presencia física firme.",
          "nutricion_e_hidratacion": "Snack pre-entreno con fruta de bajo índice glucémico; post-entreno con proteína y carbohidratos complejos.",
          "duracion_optima": "60-75 min"
        },
        "noche": {
          "momento": "Noche (20:30 - 22:30)",
          "actividad": "Cena antiinflamatoria + Estiramientos pasivos + Desconexión de pantallas",
          "beneficio_biologico": "Descenso del tono simpático hacia el parasimpático; activación de la melatonina endógena.",
          "gear_and_outfit": {
            "prendas": ["Pantalón de algodón orgánico holgado / chándal relajado", "Camiseta de tejido suave de corte amplio", "Calcetines térmicos cómodos sin gomas apretadas"],
            "accesorios": ["Lámpara de luz ámbar o velas para eliminar luz azul"]
          },
          "estado_somatico": "Hombros caídos, mandíbula relajada, respiración diafragmática 4-7-8.",
          "nutricion_e_hidratacion": "Cena ligera rica en omega-3 (salmón o verduras al vapor). Infusión de manzanilla con glicina/magnesio.",
          "duracion_optima": "40 min"
        }
      }
    }
    // Repetir para martes, miercoles, jueves, viernes, sabado y domingo con actividades distintas y complementarias
  }
}

---

## 4. INSTRUCCIONES DE EJECUCIÓN
- Mantén un tono motivador, riguroso a nivel fisiológico y sumamente estético.
- Asegúrate de que las 21 recomendaciones de atuendo/gear sean variadas, funcionales y orientadas a crear una imagen saludable y atlética.
- Adapta los deportes según la estación del año o preferencias del usuario si se proporcionan en la variable {{PREFERENCIAS}}.`;

// 3. GESTIÓN DEL ESTADO LOCAL DE VITALIDAD
let activeLifestyleDay = "lunes";
let lifestyleViewMode = "single"; // "single" o "all"
let completedSomaticBlocks = JSON.parse(localStorage.getItem("completedSomaticBlocks") || "{}");
let customUserPreferences = JSON.parse(localStorage.getItem("lifestyleUserPreferences") || JSON.stringify({
  nombre: "Daniel (Caballero Jaguar)",
  preferencias: "Entrenamiento de fuerza funcional, Zone 2 running/trail, natación en aguas limpias y movilidad estoica"
}));

// SUB-PESTAÑAS DEBAJO DE LOS 7 PILARES: "somatico" | "nutricion" | "ejercicios"
let activeLifestyleSubTab = "somatico";
let activeNutritionDay = "lunes";
let activeExerciseDay = "lunes";

function setLifestyleSubTab(tab) {
  activeLifestyleSubTab = tab;
  renderLifestyleArchitectApp();
}
window.setLifestyleSubTab = setLifestyleSubTab;

function selectNutritionDay(dayKey) {
  activeNutritionDay = dayKey;
  renderLifestyleArchitectApp();
}
window.selectNutritionDay = selectNutritionDay;

function selectExerciseDay(dayKey) {
  activeExerciseDay = dayKey;
  renderLifestyleArchitectApp();
}
window.selectExerciseDay = selectExerciseDay;

/* ==========================================================================
   PLAN DE NUTRICIÓN SEMANAL (SUBIR FÍSICO & HIPERTROFIA LIMPIA)
   Superávit calórico limpio antiinflamatorio (~2,950 kcal / 170g Proteína)
   ========================================================================== */
const NUTRITION_PLAN_DATA = {
  meta: {
    objetivo: "Aumento de Masa Muscular Limpia & Superávit Calórico Antiinflamatorio",
    calorias: "2,950 kcal / día",
    proteina: "170 g (2.2g / kg peso corporal)",
    carbohidratos: "380 g (Almidón resistente, granos enteros y tubérculos)",
    grasas: "75 g (Monoinsaturadas, Omega-3 y grasas vegetales nobles)",
    hidratacion: "3.5 Litros de agua mineralizada diarios",
    suplementos: [
      { nombre: "Creatina Creapure®", dosis: "5g diarios con batido post-entreno o desayuno", efecto: "Saturación de fosfocreatina celular, fuerza máxima y volumen muscular." },
      { nombre: "Bisglicinato de Magnesio", dosis: "350 - 400mg 45 min antes de dormir", efecto: "Relajación somática profunda, activación parasimpática y síntesis proteica nocturna." },
      { nombre: "Omega-3 EPA/DHA de Alta Pureza", dosis: "2,000mg con el almuerzo", efecto: "Modulación de inflamación articular pos-entreno y salud cardiovascular." },
      { nombre: "Vitamina D3 + K2", dosis: "4,000 UI diarias en invierno/Hannover", efecto: "Optimización endocrina de testosterona e inmunidad celular." }
    ]
  },
  dias: {
    lunes: {
      nombre: "Lunes",
      titulo: "Carga Constructor Base • Pollo & Batata",
      comidas: [
        { momento: "🍳 08:00 • Desayuno Constructor", plato: "Porridge de Avena & Huevos Revueltos Camperos", detalle: "90g avena integral cocida con leche de almendras, canela de Ceilán, 1 plátano y 1 cda de miel cruda. 4 claras + 2 huevos enteros revueltos con un toque de aceite de oliva.", macros: "740 kcal • 38g Prot • 95g Carb • 18g Gras" },
        { momento: "🥗 13:30 • Almuerzo Somático", plato: "Pechuga de Pollo de Corral, Arroz Basmati & Batata", detalle: "220g pechuga a la plancha marinada con limón y romero + 220g arroz basmati al vapor con cúrcuma + 150g batata asada + ensalada de espinacas baby y tomate con 1 cda de AOVE.", macros: "860 kcal • 56g Prot • 110g Carb • 16g Gras" },
        { momento: "🍎 17:00 • Merienda / Pre-Entreno", plato: "Yogur Griego 0%, Nueces & Manzana Verde", detalle: "250g yogur griego natural sin azúcar + 35g nueces crudas peladas + 1 manzana verde cortada en dados.", macros: "390 kcal • 26g Prot • 32g Carb • 18g Gras" },
        { momento: "⚡ 19:30 • Post-Entreno Anabólico", plato: "Batido de Proteína Aislada & Creatina", detalle: "1 scoop (30g) proteína isolada con agua fría o leche de avena + 5g Creatina Creapure + 2 dátiles Medjool jugosos para rápida recarga de glucógeno muscular.", macros: "290 kcal • 30g Prot • 36g Carb • 2g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Lomo de Salmón Salvaje al Horno & Brócoli", detalle: "200g lomo de salmón salvaje al horno con hierbas finas + 250g patatas al vapor (enfriadas para generar almidón resistente) + ramilletes de brócoli al vapor con sal marina.", macros: "670 kcal • 44g Prot • 52g Carb • 22g Gras" }
      ]
    },
    martes: {
      nombre: "Martes",
      titulo: "Fuerza & Densidad • Ternera & Quinoa Real",
      comidas: [
        { momento: "🍳 08:00 • Desayuno Constructor", plato: "Huevos Poché sobre Masa Madre & Aguacate", detalle: "3 huevos camperos poché sobre 2 rebanadas de pan de masa madre integral tostado + 1/2 aguacate maduro machacado con semillas de chía + 1 taza de té verde matcha.", macros: "690 kcal • 32g Prot • 68g Carb • 28g Gras" },
        { momento: "🥗 13:30 • Almuerzo Somático", plato: "Filete de Ternera Magra, Quinoa Real & Espárragos", detalle: "220g filete de ternera magra de pasto a la plancha + 220g quinoa cocida con caldo vegetal + espárragos trigueros a la plancha con escamas de sal marina.", macros: "840 kcal • 58g Prot • 85g Carb • 24g Gras" },
        { momento: "🍎 17:00 • Merienda / Pre-Entreno", plato: "Queso Cottage / Requesón con Frutos Rojos & Almendras", detalle: "220g requesón magro + puñado de arándanos silvestres y frambuesas + 30g almendras laminadas crudas.", macros: "370 kcal • 28g Prot • 24g Carb • 16g Gras" },
        { momento: "⚡ 19:30 • Post-Entreno Anabólico", plato: "Smoothie de Plátano, Cacao Puro & Creatina", detalle: "1 plátano maduro + 30g proteína aislada + 1 cucharada de cacao puro desgrasado 100% + 5g Creatina + agua de manantial.", macros: "310 kcal • 31g Prot • 42g Carb • 3g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Merluza Fresca con Patata al Vapor & Calabacín", detalle: "250g filete de merluza fresca con ajo y perejil fresco + 250g patata cocida enfriada + calabacín salteado con aceite de oliva virgen extra.", macros: "620 kcal • 46g Prot • 58g Carb • 14g Gras" }
      ]
    },
    miercoles: {
      nombre: "Miércoles",
      titulo: "Regeneración & Digestión • Legumbres & Pavo",
      comidas: [
        { momento: "🍳 08:00 • Desayuno Constructor", plato: "Tortitas Caseras de Avena, Claras & Frutos Rojos", detalle: "Masa triturada de 80g copos de avena + 1 huevo entero + 3 claras + plátano triturado + canela. Servidas con 100g de arándanos y 1 cda de miel cruda.", macros: "650 kcal • 35g Prot • 88g Carb • 14g Gras" },
        { momento: "🥗 13:30 • Almuerzo Somático", plato: "Estofado Limpio de Lentejas & Huevos Camperos", detalle: "250g lentejas pardinas cocinadas a fuego lento con puerros, zanahoria y pimentón de la Vera + 2 huevos duros camperos picados + ensalada verde crujiente.", macros: "780 kcal • 48g Prot • 102g Carb • 18g Gras" },
        { momento: "🍎 17:00 • Merienda / Snack Activo", plato: "Batido de Kéfir Natural, Chía & Anacardos", detalle: "250ml de kéfir artesanal de cabra o vaca + 1 cda de semillas de chía hidratadas + 30g anacardos tostados sin sal.", macros: "360 kcal • 18g Prot • 26g Carb • 20g Gras" },
        { momento: "⚡ 19:30 • Tarde de Movilidad", plato: "Batido de Proteína & Creatina Creapure", detalle: "1 scoop de proteína aislada + 5g Creatina con agua fresca + 1 manzana roja crujiente.", macros: "240 kcal • 28g Prot • 26g Carb • 1g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Pechuga de Pavo al Romero con Puré de Calabaza", detalle: "220g solomillo de pavo al vapor o plancha con romero fresco + puré de calabaza asada y patata + ensalada de rúcula y nueces.", macros: "640 kcal • 50g Prot • 54g Carb • 16g Gras" }
      ]
    },
    jueves: {
      nombre: "Jueves",
      titulo: "Empuje & Rendimiento • Pollo & Arroz Jazmín",
      comidas: [
        { momento: "🍳 08:00 • Desayuno Constructor", plato: "Revuelto de 3 Huevos con Champiñones & Tostadas", detalle: "3 huevos de campo revueltos con champiñones Portobello y orégano + 2 tostadas integrales de espelta con AOVE + 1 kiwi maduro.", macros: "640 kcal • 32g Prot • 55g Carb • 26g Gras" },
        { momento: "🥗 13:30 • Almuerzo Somático", plato: "Muslo de Pollo Deshuesado, Arroz Jazmín & Brócoli", detalle: "220g contramuslo de pollo de corral limpio sin piel a la plancha + 220g arroz jazmín al vapor + abundante brócoli al dente con limón y sal marina.", macros: "830 kcal • 54g Prot • 98g Carb • 18g Gras" },
        { momento: "🍎 17:00 • Merienda / Pre-Entreno", plato: "Yogur Griego con Crema de Almendras & Plátano", detalle: "200g yogur griego natural + 25g crema de almendras 100% natural + 1 plátano en rodajas finas.", macros: "420 kcal • 24g Prot • 40g Carb • 20g Gras" },
        { momento: "⚡ 19:30 • Post-Entreno Anabólico", plato: "Batido Proteico & 3 Galletas de Arroz", detalle: "1 scoop de proteína con agua + 5g Creatina + 3 tortitas de arroz inflado integral con un toque de miel.", macros: "320 kcal • 31g Prot • 44g Carb • 2g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Lomo de Bacalao al Horno con Pimientos Asados", detalle: "220g lomo de bacalao fresco al horno sobre lecho de pimientos rojos asados y 200g patatas panadera cocidas.", macros: "650 kcal • 48g Prot • 56g Carb • 15g Gras" }
      ]
    },
    viernes: {
      nombre: "Viernes",
      titulo: "Atún Salvaje, Boniato & Hamburguesa Magra",
      comidas: [
        { momento: "🍳 08:00 • Desayuno Constructor", plato: "Bowl de Avena con Proteína & Semillas de Chía", detalle: "90g avena integral templada con leche vegetal + 1 scoop proteína de vainilla + 15g semillas de chía + puñado de frambuesas frescas.", macros: "680 kcal • 42g Prot • 82g Carb • 16g Gras" },
        { momento: "🥗 13:30 • Almuerzo Somático", plato: "Lomo de Atún Rojo Sellado con Arroz Integral", detalle: "220g atún fresco sellado en sartén caliente con semillas de sésamo + 220g arroz integral + judías verdes al vapor con AOVE.", macros: "820 kcal • 60g Prot • 86g Carb • 18g Gras" },
        { momento: "🍎 17:00 • Merienda / Pre-Entreno", plato: "Tostadas de Centeno con Pavo Natural & Tomate", detalle: "2 rebanadas de pan de centeno denso con 100g de pechuga de pavo asada y rodajas de tomate pera con orégano.", macros: "340 kcal • 26g Prot • 36g Carb • 8g Gras" },
        { momento: "⚡ 19:30 • Post-Entreno Anabólico", plato: "Batido Aislado con Creatina & Dátiles", detalle: "1 scoop de proteína + 5g Creatina Creapure + 2 dátiles Medjool + vaso grande de agua mineralizada.", macros: "290 kcal • 30g Prot • 38g Carb • 2g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Hamburguesa Casera de Ternera Magra al Plato", detalle: "220g hamburguesas caseras de carne picada de ternera magra sin aditivos + 250g gajos de boniato asado + ensalada de canónigos y aguacate.", macros: "760 kcal • 54g Prot • 64g Carb • 25g Gras" }
      ]
    },
    sabado: {
      nombre: "Sábado",
      titulo: "Combate & Rendimiento • Arroz Marinero & Salmón",
      comidas: [
        { momento: "🍳 08:30 • Desayuno Constructor", plato: "Omelette de 3 Huevos con Queso Feta & Espinacas", detalle: "Omelette de 3 huevos enteros con hojas de espinacas tiernas y 40g queso feta de cabra + 2 rebanadas de pan de masa madre con aceite de oliva.", macros: "670 kcal • 35g Prot • 52g Carb • 32g Gras" },
        { momento: "🥗 14:00 • Almuerzo Somático", plato: "Arroz Marinero Tradicional con Pollo & Gambas", detalle: "Plato generoso de arroz caldoso o paella limpia con pechuga de pollo de corral, gambones y calamares frescos con caldo de pescado casero.", macros: "880 kcal • 55g Prot • 115g Carb • 18g Gras" },
        { momento: "🍎 17:30 • Merienda / Tarde de Combate", plato: "Tazón de Kéfir, Plátano & Nueces de Brasil", detalle: "250g kéfir natural con 1 plátano en rodajas y 4 nueces de Brasil (fuente insustituible de selenio bioactivo).", macros: "410 kcal • 18g Prot • 45g Carb • 18g Gras" },
        { momento: "⚡ 19:30 • Post-Sparring Muay Thai", plato: "Batido de Proteína & Creatina Creapure", detalle: "Batido de proteína de suero aislada con agua fresca de coco (electrolitos) + 5g Creatina.", macros: "260 kcal • 30g Prot • 24g Carb • 2g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Salmón al Papillote con Verduras & Quinoa", detalle: "200g salmón al papillote con puerros, zanahorias baby y calabacín en su propio jugo + 180g quinoa cocida.", macros: "690 kcal • 46g Prot • 55g Carb • 24g Gras" }
      ]
    },
    domingo: {
      nombre: "Domingo",
      titulo: "ReWild • Tacos Limpios de Maíz & Caldo Concentrado",
      comidas: [
        { momento: "🍳 09:00 • Desayuno Constructor", plato: "Huevos Camperos con Aguacate & Pan Tostado", detalle: "3 huevos fritos en AOVE sobre tostadas de pan integral de centeno con aguacate triturado y una pizca de pimentón dulce ahumado.", macros: "660 kcal • 28g Prot • 54g Carb • 34g Gras" },
        { momento: "🥗 14:00 • Almuerzo Somático", plato: "Tacos Limpios de Maíz con Ternera & Frijoles Negros", detalle: "3 tortillas de maíz 100% nixtamalizado con carne picada de ternera magra especiada, frijoles negros cocidos, guacamole casero, tomate picado y cilantro fresco.", macros: "890 kcal • 52g Prot • 95g Carb • 28g Gras" },
        { momento: "🍎 17:30 • Merienda / Conexión Solar", plato: "Fruta Fresca de Temporada con Almendras Tostadas", detalle: "1 racimo de uvas o manzana asada con canela + 40g almendras enteras tostadas sin sal.", macros: "340 kcal • 12g Prot • 36g Carb • 18g Gras" },
        { momento: "⚡ 20:00 • Caldo de Huesos & Colágeno", plato: "Tazón Caliente de Caldo de Huesos Concentrado", detalle: "Caldo artesanal cocinado a fuego lento durante 24 horas rico en prolina, glicina y colágeno para salud articular y tendinosa.", macros: "140 kcal • 18g Prot • 2g Carb • 6g Gras" },
        { momento: "🐟 21:30 • Cena Reparadora", plato: "Sopa Reconstituyente de Pollo de Corral & Arroz", detalle: "Sopa tibia reconfortante con pechuga de pollo desmenuzada, verduras de raíz y arroz basmati para descanso profundo del sistema digestivo.", macros: "590 kcal • 44g Prot • 58g Carb • 12g Gras" }
      ]
    }
  }
};

/* ==========================================================================
   PROGRAMA DE HIPERTROFIA MUSCULAR (AUMENTO DE MASA & FUERZA FUNCIONAL)
   Sobrecarga progresiva, RIR 1-2, Torso/Pierna/Foco Combate
   ========================================================================== */
const HYPERTROPHY_WORKOUT_DATA = {
  meta: {
    objetivo: "Aumento de Masa Muscular & Hipertrofia Funcional",
    frecuencia: "4 Días Hipertrofia Pura + 1 Día Combate/Muay Thai + 2 Días Regeneración Somática",
    metodologia: "Sobrecarga Progresiva, RIR 1-2 (1 a 2 repeticiones en recámara), tiempo bajo tensión controlado (3s excéntrica, 1s explosiva concéntrica).",
    calentamiento: "5 min movilidad articular + 2 series de aproximación progresiva antes de las series efectivas."
  },
  dias: {
    lunes: {
      nombre: "Lunes",
      titulo: "Torso Hipertrofia A • Empuje & Tirón Horizontal",
      enfoque: "Pectoral, Espalda media/dorsales, Deltoides frontal y Tríceps",
      duracion: "65 minutos",
      ejercicios: [
        { nombre: "Press de Banca con Barra Olímpica", series: "4 series", reps: "6 - 8 reps", rir: "RIR 2", descanso: "120s", nota: "Retracción escapular firme, descenso controlado en 3 segundos hasta rozar el pecho y empuje explosivo." },
        { nombre: "Remo con Barra Pendlay / Apoyo en Banco", series: "4 series", reps: "8 - 10 reps", rir: "RIR 2", descanso: "90s", nota: "Tirón potente hacia el ombligo, apretando escápulas 1 segundo en el punto de máxima contracción." },
        { nombre: "Press Militar de Pie con Mancuernas", series: "3 series", reps: "8 - 10 reps", rir: "RIR 1-2", descanso: "90s", nota: "Núcleo y glúteos compactos para evitar hiperextensión lumbar. Empuje vertical puro." },
        { nombre: "Jalón al Pecho Agarre Neutro o Dominadas", series: "4 series", reps: "8 - 10 reps", rir: "RIR 1", descanso: "90s", nota: "Énfasis en activación del dorsal ancho sin balanceo del torso." },
        { nombre: "Fondos en Paralelas (Dips) para Pectoral", series: "3 series", reps: "10 - 12 reps", rir: "RIR 1", descanso: "75s", nota: "Inclinación leve del torso hacia adelante para cargar el pectoral inferior." },
        { nombre: "Face Pulls en Polea con Cuerda", series: "4 series", reps: "15 reps", rir: "RIR 2", descanso: "60s", nota: "Salud escapular y deltoides posterior. Tirar hacia la frente abriendo las manos." }
      ]
    },
    martes: {
      nombre: "Martes",
      titulo: "Pierna & Cadena Posterior A • Potencia & Cuádriceps",
      enfoque: "Cuádriceps, Isquiotibiales, Gemelos y Estabilidad de Core",
      duracion: "65 minutos",
      ejercicios: [
        { nombre: "Sentadilla Trasera con Barra Olímpica (High Bar)", series: "4 series", reps: "6 - 8 reps", rir: "RIR 2", descanso: "150s", nota: "Profundidad por debajo de 90°. Rodillas alineadas con la punta de los pies y core inflado con maniobra de Valsalva." },
        { nombre: "Peso Muerto Rumano con Mancuernas Pesadas", series: "4 series", reps: "8 - 10 reps", rir: "RIR 2", descanso: "120s", nota: "Bisagra de cadera estricta, sintiendo la tensión elástica en los isquiotibiales sin flexionar lumbares." },
        { nombre: "Prensa de Piernas 45° con Pausa", series: "3 series", reps: "10 - 12 reps", rir: "RIR 1", descanso: "90s", nota: "Pies a anchura de hombros a media plataforma. Pausa de 1 segundo abajo sin bloquear rodillas arriba." },
        { nombre: "Curl Femoral Tumbado en Máquina", series: "3 series", reps: "12 - 15 reps", rir: "RIR 1", descanso: "75s", nota: "Contracción máxima en la flexión y descenso lento en 3 segundos." },
        { nombre: "Elevaciones de Talones de Pie (Gemelos)", series: "4 series", reps: "15 reps", rir: "RIR 1", descanso: "60s", nota: "2 segundos de estiramiento completo abajo y 1 segundo arriba apretando gemelos." },
        { nombre: "Rueda Abdominal (Ab Wheel Rollout)", series: "3 series", reps: "10 - 12 reps", rir: "RIR 2", descanso: "60s", nota: "Control excéntrico total manteniendo la pelvis en retroversión sin arquear la espalda." }
      ]
    },
    miercoles: {
      nombre: "Miércoles",
      titulo: "Descanso Activo • Movilidad & Descompresión",
      enfoque: "Recuperación parasimpática, flujo sanguíneo y salud articular",
      duracion: "45 minutos",
      ejercicios: [
        { nombre: "Caminata al Aire Libre a la Luz Solar", series: "1 sesión", reps: "8,000 - 10,000 pasos", rir: "RPE 3", descanso: "Continuo", nota: "Respiración exclusivamente nasal. Exposición de luz natural para ritmo circadiano." },
        { nombre: "Movilidad Articular de Cadera (90/90 & Frog Stretch)", series: "3 rondas", reps: "60s por postura", rir: "Suave", descanso: "30s", nota: "Liberación de flexores de cadera y cápsula articular pos-sentadillas." },
        { nombre: "Descompresión Espinal Colgado de Barra (Dead Hang)", series: "4 series", reps: "45 - 60 segundos", rir: "Suave", descanso: "60s", nota: "Relajar hombros y dejar que el peso del cuerpo descomprima los discos intervertebrales." },
        { nombre: "Sesión de Sauna Seca o Baño de Contraste", series: "2 rondas", reps: "12 min sauna + 2 min agua fría", rir: "Regenerativo", descanso: "5 min", nota: "Vasodilatación, proteínas de choque térmico y eliminación de metabolitos." }
      ]
    },
    jueves: {
      nombre: "Jueves",
      titulo: "Torso Hipertrofia B • Inclinado & Tirón Vertical",
      enfoque: "Pectoral clavicular, Espalda alta, Deltoides lateral y Bíceps",
      duracion: "65 minutos",
      ejercicios: [
        { nombre: "Press de Banca Inclinado con Mancuernas (30°)", series: "4 series", reps: "8 - 10 reps", rir: "RIR 1-2", descanso: "120s", nota: "Enfocado en la porción clavicular del pecho. Recorrido amplio y control en la bajada." },
        { nombre: "Dominadas Lastradas o Pronas Estrictas", series: "4 series", reps: "6 - 8 reps", rir: "RIR 1-2", descanso: "120s", nota: "Barbilla claramente por encima de la barra, extensión completa sin soltar tensión escapular." },
        { nombre: "Remo Unilateral con Mancuerna Apoyado en Banco", series: "3 series", reps: "10 - 12 reps / brazo", rir: "RIR 1", descanso: "75s", nota: "Llevar la mancuerna hacia el bolsillo de la cadera apretando el dorsal lateral." },
        { nombre: "Elevaciones Laterales con Mancuernas en Banco Inclinado", series: "4 series", reps: "12 - 15 reps", rir: "RIR 1", descanso: "60s", nota: "Construcción de hombros anchos y densidad del deltoides lateral." },
        { nombre: "Super-serie de Bíceps: Curl con Barra Z", series: "3 series", reps: "10 - 12 reps", rir: "RIR 1", descanso: "0s (combinado)", nota: "Codos pegados al torso, contracción estricta en supinación." },
        { nombre: "Super-serie de Tríceps: Extensiones en Polea Alta", series: "3 series", reps: "12 - 15 reps", rir: "RIR 1", descanso: "75s", nota: "Bloqueo firme abajo abriendo la cuerda para reclutar la cabeza lateral del tríceps." }
      ]
    },
    viernes: {
      nombre: "Viernes",
      titulo: "Pierna & Cadena Posterior B • Glúteos & Fuerza Pura",
      enfoque: "Glúteos, Cadena posterior, Aductores y Capacidad de Trabajo",
      duracion: "65 minutos",
      ejercicios: [
        { nombre: "Peso Muerto Convencional o Barra Hexagonal", series: "3 series", reps: "5 reps", rir: "RIR 2", descanso: "180s", nota: "Fuerza neural bruta. Tracción simultánea de piernas y espalda sin tirones bruscos." },
        { nombre: "Hip Thrust con Barra Olímpica & Banda Elástica", series: "4 series", reps: "10 - 12 reps", rir: "RIR 1", descanso: "90s", nota: "Pausa obligatoria de 2 segundos arriba con máxima contracción glútea." },
        { nombre: "Zancadas Búlgaras con Mancuernas (Bulgarian Split Squat)", series: "3 series", reps: "10 - 12 reps / pierna", rir: "RIR 1", descanso: "75s", nota: "Pie trasero elevado en banco. Trabajo unilateral insustituible para estabilidad y masa de cuádriceps." },
        { nombre: "Extensiones de Cuádriceps en Máquina", series: "3 series", reps: "12 - 15 reps", rir: "Fallo - 1", descanso: "60s", nota: "Última serie con drop-set (bajar 30% del peso al fallo y sacar 6 reps extras)." },
        { nombre: "Paseos del Granjero (Farmer's Walks)", series: "4 series", reps: "40 metros", rir: "RPE 8", descanso: "90s", nota: "Mancuernas muy pesadas, torso vertical, hombros retraídos y paso firme sin balancearse." }
      ]
    },
    sabado: {
      nombre: "Sábado",
      titulo: "Combate Somático & Sparring • Muay Thai",
      enfoque: "Potencia elástica, agilidad de jaguar, sparring y acondicionamiento",
      duracion: "50 minutos",
      ejercicios: [
        { nombre: "Sombra Técnica de Muay Thai (Shadowboxing)", series: "3 rounds", reps: "3 minutos", rir: "Fluidez", descanso: "60s", nota: "Footwork, guardia arriba, combinación de jabs, cross, teep y codos con cadera suelta." },
        { nombre: "Trabajo en Saco Pesado (Heavy Bag Power Drills)", series: "5 rounds", reps: "3 minutos", rir: "RPE 8", descanso: "60s", nota: "Rounds 1-2: patada media con rotación de tibia. Rounds 3-4: combinaciones de boxeo. Round 5: rodillas y clinch." },
        { nombre: "Sparring Técnico Controlado (o Calistenia Explosiva)", series: "4 rounds", reps: "2 minutos", rir: "Control", descanso: "60s", nota: "Velocidad de reacción al 60% de contacto protegiendo la integridad física." },
        { nombre: "Estiramientos Dinámicos & Descompresión", series: "1 sesión", reps: "10 minutos", rir: "Suave", descanso: "0s", nota: "Enfriamiento somático del sistema nervioso simpático a parasimpático." }
      ]
    },
    domingo: {
      nombre: "Domingo",
      titulo: "ReWild & Restauración Somática Total",
      enfoque: "Desconexión dopaminérgica, grounding y descanso neuromuscular",
      duracion: "Libre",
      ejercicios: [
        { nombre: "Caminata ReWild en Parque o Bosque (Grounding)", series: "1 paseo", reps: "60 - 90 minutos", rir: "Paz", descanso: "Libre", nota: "Contacto directo con la tierra descalzo si el clima lo permite. Silencio de pantallas." },
        { nombre: "Respiración Diafragmática Consciente (Caja 4x4x4x4)", series: "1 sesión", reps: "15 minutos", rir: "Calma", descanso: "0s", nota: "Inhalar 4s, retener 4s, exhalar 4s, retener vacío 4s para resetear la frecuencia cardíaca." },
        { nombre: "Revisión Semanal del Códice & Consagración", series: "1 sesión", reps: "20 minutos", rir: "Foco", descanso: "0s", nota: "Anotar pesos levantados de la semana, constatar superávit limpio y planificar la siguiente." }
      ]
    },
    escalada: {
      nombre: "🧗‍♂️ Escalada",
      titulo: "Sesión Dual: Escalada de Muro (Indoor) & Outdoor (Roca)",
      enfoque: "Fuerza de dedos, core tensor, lectura de roca, agarres crimp/pinch y resistencia de antebrazos",
      duracion: "90 minutos",
      ejercicios: [
        { nombre: "Calentamiento & Movilidad Escapular / Muñecas", series: "1 sesión", reps: "15 min", rir: "Suave", descanso: "0s", nota: "Rotación de muñecas, gomas elásticas, flexores de dedos y travesía fácil en rocódromo/muro." },
        { nombre: "Muro Indoor: Protocolo Hangboard / Suspensiones", series: "5 series", reps: "7s suspensión / 3s descanso x 6 reps", rir: "Fallo - 1", descanso: "150s", nota: "Agarre semi-arqueo (half crimp) y agarre abierto en regleta de 20mm. Mantener escápulas activas." },
        { nombre: "Muro Indoor: Bloque Técnico & Escalada en Desplome (V3-V6)", series: "6 bloques", reps: "3-4 pegues por bloque", rir: "RPE 8-9", descanso: "180s", nota: "Técnica de empeines, talonajes y drop knee para optimizar el centro de gravedad sin sobrecargar brazos." },
        { nombre: "Outdoor Roca: Lectura de Vía Deportiva & Colocación de Pies", series: "3 vías", reps: "Vías de 15 a 25m", rir: "Fluidez", descanso: "10 min", nota: "Adherencia en microcantos de granito o caliza, gestión de cuerda con Grigri y respiración constante en crux." },
        { nombre: "Resistencia de Antebrazos: Circuito ARC (Aerobic, Respiration, Capillarity)", series: "2 series", reps: "10 min continuos en muro o travesía", rir: "Bombeo controlado", descanso: "5 min", nota: "Mantener bombeo suave sin llegar al fallo total para capilarizar los flexores de los dedos." },
        { nombre: "Compensación Antagonista: Extensiones de Dedos & Flexiones", series: "3 series", reps: "20 reps con banda elástica", rir: "Salud", descanso: "60s", nota: "Prevenir codo de golfista/escalador fortaleciendo la musculatura extensora del antebrazo." }
      ]
    }
  }
};

/**
 * Inicializador principal del Arquitecto de Estilo de Vida
 */
function initLifestyleArchitect() {
  const masterContainer = document.getElementById("lifestyle-architect-master-container");
  if (!masterContainer) return;

  // Renderizar la interfaz maestra
  renderLifestyleArchitectApp();
}

/**
 * Renderiza todo el módulo en el DOM del landing
 */
function renderLifestyleArchitectApp() {
  const masterContainer = document.getElementById("lifestyle-architect-master-container");
  if (!masterContainer) return;

  const totalBlocks = 21;
  const completedCount = Object.values(completedSomaticBlocks).filter(Boolean).length;
  const vitalityPercent = Math.min(100, Math.round((completedCount / totalBlocks) * 100));

  masterContainer.innerHTML = `
    <div class="lifestyle-architect-card jaguar-card" style="border: 1.5px solid var(--imperial-gold); box-shadow: var(--shadow-metallic); background: linear-gradient(145deg, rgba(17,23,32,0.98) 0%, rgba(11,14,20,0.99) 100%); padding: 26px; border-radius: var(--radius-lg); position: relative; overflow: hidden;">
      
      <!-- LUZ AMBIENTAL DE FONDO (EMERALD & GOLD) -->
      <div style="position: absolute; top: -60px; right: -60px; width: 260px; height: 260px; background: radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%); pointer-events: none; border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -80px; left: -80px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(46, 75, 62, 0.20) 0%, transparent 70%); pointer-events: none; border-radius: 50%;"></div>

      <!-- CABECERA PRINCIPAL: TÍTULO & IDENTIDAD -->
      <div style="margin-bottom: 20px; position: relative; z-index: 1;">
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.85rem; font-weight: 800; background: var(--gradient-gold-chrome); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; line-height: 1.2;">
          Calendario Semanal de Vida Sana & Vitalidad Integral
        </h2>
        <p style="color: var(--parchment-warm); font-size: 0.95rem; margin-top: 6px; max-width: 860px; line-height: 1.45;">
          Diseñado bajo el principio de <strong>"Encarnación Somática de la Salud"</strong>: fisiología de energía limpia, nutrición para aumentar masa muscular, hipertrofia funcional y <em>Outfits tácticos</em> para predisponer al cerebro al alto rendimiento.
        </p>
      </div>

      <!-- BARRA DE VITALIDAD SOMÁTICA & RESUMEN DE PROGRESO -->
      <div style="background: rgba(11, 14, 20, 0.7); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px 20px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, rgba(197, 160, 89, 0.25) 0%, rgba(46, 75, 62, 0.4) 100%); border: 1.5px solid var(--imperial-gold); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
            🌿
          </div>
          <div>
            <div style="font-size: 0.88rem; font-weight: 800; color: #FFF; font-family: 'Cinzel', serif;">
              Score Semanal de Vitalidad Somática
            </div>
            <div style="font-size: 0.78rem; color: var(--text-dim);">
              <span id="lifestyle-completed-stat">${completedCount} de ${totalBlocks}</span> bloques semanales materializados (+${completedCount * 15} XP de Caballero)
            </div>
          </div>
        </div>

        <!-- MEDIDOR DE VITALIDAD -->
        <div style="display: flex; align-items: center; gap: 16px; min-width: 260px; flex: 1; max-width: 440px;">
          <div style="flex: 1; background: rgba(255,255,255,0.08); height: 10px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-glass);">
            <div id="lifestyle-vitality-bar-fill" style="width: ${vitalityPercent}%; height: 100%; background: linear-gradient(90deg, #2E4B3E 0%, #C5A059 100%); border-radius: 6px; transition: width 0.3s ease;"></div>
          </div>
          <div style="font-family: 'Orbitron', monospace; font-weight: 900; font-size: 1.15rem; color: var(--imperial-gold-light); min-width: 70px; text-align: right;">
            ${vitalityPercent}/100
          </div>
        </div>

        <!-- RESET/SYNC RÁPIDO & BOTÓN JSON CONSOLIDADO -->
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn-jaguar btn-sm" onclick="syncTodayBlockWithDashboardTasks()" style="background: rgba(0, 240, 255, 0.12); border: 1px solid var(--neon-cyan); color: #FFF; font-size: 0.75rem; padding: 6px 12px;" title="Cargar automáticamente el bloque del momento actual en tus Tareas de Hoy">
            ⚡ Cargar Bloque de Hoy en Mis Tareas
          </button>
          <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="toggleLifestyleConsoleModal(true)" style="font-size: 0.70rem; padding: 5px 10px; font-family: monospace; font-weight: 800; letter-spacing: 0.5px; border-color: rgba(197, 160, 89, 0.4);" title="Consola Prompt & JSON, Copiar JSON y Exportar .ICS">
            JSON
          </button>
        </div>

      </div>

      <!-- SECCIÓN PERMANENTE: LOS 7 PILARES FUNDAMENTALES QUE CUBRE LA SEMANA -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.84rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; color: var(--imperial-gold-light); font-family: 'Cinzel', serif;">
            ⚜️ Los 7 Pilares de Vitalidad Integral
          </span>
          <span style="font-size: 0.72rem; color: var(--text-dim);">Equilibrio somático permanente</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          ${LIFESTYLE_ARCHITECT_DATA.pilares.map(p => `
            <div class="lifestyle-pillar-pill" style="background: rgba(17, 23, 32, 0.8); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 10px 12px; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.1rem;">${p.icono}</span>
                <span style="font-size: 0.82rem; font-weight: 800; color: #FFF; font-family: 'Cinzel', serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${p.nombre}">
                  ${p.nombre}
                </span>
              </div>
              <p style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.35; margin: 0;">
                ${p.descripcion}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- SUB-PESTAÑAS DEBAJO DE LOS 7 PILARES PERMANENTES -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid rgba(197,154,40,0.3); padding-bottom: 14px; flex-wrap: wrap;">
        <button class="btn-jaguar ${activeLifestyleSubTab === 'somatico' ? 'btn-gold-chrome' : 'btn-secondary-dark'}"
                onclick="setLifestyleSubTab('somatico')"
                style="padding: 10px 20px; font-weight: 800; font-size: 0.88rem; display: flex; align-items: center; gap: 8px; border-radius: var(--radius-sm); ${activeLifestyleSubTab === 'somatico' ? 'color: #0B0E14;' : 'color: #FFF;'}">
          <span>🗓️</span> Calendario Somático & Outfits
        </button>

        <button class="btn-jaguar ${activeLifestyleSubTab === 'nutricion' ? 'btn-gold-chrome' : 'btn-secondary-dark'}"
                onclick="setLifestyleSubTab('nutricion')"
                style="padding: 10px 20px; font-weight: 800; font-size: 0.88rem; display: flex; align-items: center; gap: 8px; border-radius: var(--radius-sm); ${activeLifestyleSubTab === 'nutricion' ? 'color: #0B0E14;' : 'color: #FFF;'}">
          <span>🥑</span> Nutrición Semanal (Subir Físico)
        </button>

        <button class="btn-jaguar ${activeLifestyleSubTab === 'ejercicios' ? 'btn-gold-chrome' : 'btn-secondary-dark'}"
                onclick="setLifestyleSubTab('ejercicios')"
                style="padding: 10px 20px; font-weight: 800; font-size: 0.88rem; display: flex; align-items: center; gap: 8px; border-radius: var(--radius-sm); ${activeLifestyleSubTab === 'ejercicios' ? 'color: #0B0E14;' : 'color: #FFF;'}">
          <span>🏋️‍♂️</span> Rutina Hipertrofia (Masa Muscular)
        </button>
      </div>

      <!-- CONTENIDO DINÁMICO DE LA SUB-PESTAÑA ACTIVA -->
      <div id="lifestyle-subtab-container">
        ${renderActiveLifestyleSubTabContent()}
      </div>

    </div>

    <!-- MODAL / CONSOLA: SYSTEM PROMPT & JSON ESTRICTO -->
    <div id="lifestyle-console-modal" class="jaguar-modal-overlay" style="display: none;" onclick="if(event.target === this) toggleLifestyleConsoleModal(false);">
      <div class="jaguar-modal-card" style="max-width: 900px; width: 95%; max-height: 88vh; display: flex; flex-direction: column; background: #0B0E14; border: 1.5px solid var(--imperial-gold); box-shadow: 0 0 40px rgba(0,0,0,0.9); padding: 24px; border-radius: var(--radius-lg);">
        
        <!-- HEADER MODAL -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 14px; margin-bottom: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge-tag badge-gold">SYSTEM PROMPT & JSON</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">Arquitecto de Estilo de Vida</span>
            </div>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #FFF; margin: 4px 0 0 0;">
              Consola del Diseñador Somático
            </h3>
          </div>
          <button onclick="toggleLifestyleConsoleModal(false)" style="background: none; border: none; color: #FFF; font-size: 1.4rem; cursor: pointer;">✕</button>
        </div>

        <!-- TABS MODAL (PROMPT / JSON / PERSONALIZADOR) -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button id="modal-tab-prompt-btn" class="btn-jaguar btn-sm btn-gold-chrome" style="color: #0B0E14; font-weight: 800;" onclick="switchConsoleModalTab('prompt')">
            📜 System Prompt Markdown
          </button>
          <button id="modal-tab-json-btn" class="btn-jaguar btn-sm btn-secondary-dark" onclick="switchConsoleModalTab('json')">
            📦 JSON Estricto (Parseable)
          </button>
          <button id="modal-tab-config-btn" class="btn-jaguar btn-sm btn-secondary-dark" onclick="switchConsoleModalTab('config')">
            ⚙️ Personalizar Parámetros
          </button>
        </div>

        <!-- CUERPO MODAL TAB 1: PROMPT -->
        <div id="console-tab-prompt" style="flex: 1; overflow-y: auto; background: rgba(17,23,32,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.75rem; color: var(--imperial-gold-light); font-weight: 700;">Prompt Oficial para LLMs (Claude, Gemini, ChatGPT):</span>
            <button class="btn-jaguar btn-sm btn-electric-cyan" onclick="copySystemPromptText()" style="padding: 4px 10px; font-size: 0.72rem;">
              📋 Copiar Prompt
            </button>
          </div>
          <pre id="system-prompt-display" style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 0.8rem; color: #DCD2C0; line-height: 1.45; margin: 0;"></pre>
        </div>

        <!-- CUERPO MODAL TAB 2: JSON ESTRICTO -->
        <div id="console-tab-json" style="display: none; flex: 1; overflow-y: auto; background: rgba(17,23,32,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.75rem; color: var(--neon-cyan); font-weight: 700;">Formato JSON Estricto (Validado y Parseable):</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn-jaguar btn-sm btn-electric-cyan" onclick="copyCurrentLifestyleJSON()" style="padding: 4px 10px; font-size: 0.72rem;">
                📋 Copiar JSON
              </button>
              <button class="btn-jaguar btn-sm btn-gold-chrome" onclick="downloadLifestyleJSONFile()" style="color: #000; padding: 4px 10px; font-size: 0.72rem; font-weight: 800;">
                💾 Descargar .json
              </button>
            </div>
          </div>
          <pre id="lifestyle-json-display" style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 0.78rem; color: #A0E0C0; line-height: 1.4; margin: 0;"></pre>
        </div>

        <!-- CUERPO MODAL TAB 3: CONFIGURACIÓN -->
        <div id="console-tab-config" style="display: none; flex: 1; overflow-y: auto; background: rgba(17,23,32,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 20px; margin-bottom: 14px;">
          <h4 style="font-family: 'Cinzel', serif; color: var(--imperial-gold-light); margin-bottom: 14px;">
            ⚙️ Personalización del Arquitecto
          </h4>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="display: block; font-size: 0.8rem; color: var(--text-dim); margin-bottom: 4px;">Nombre del Usuario ({{NOMBRE_USUARIO}}):</label>
              <input type="text" id="cfg-user-name" class="input-jaguar" value="${customUserPreferences.nombre}">
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; color: var(--text-dim); margin-bottom: 4px;">Preferencias Deportivas & Estacionales ({{PREFERENCIAS}}):</label>
              <textarea id="cfg-user-prefs" class="input-jaguar" rows="3">${customUserPreferences.preferencias}</textarea>
            </div>
            <button class="btn-jaguar btn-gold-chrome" onclick="saveCustomLifestylePreferences()" style="color: #000; font-weight: 800; padding: 10px;">
              💾 Guardar y Actualizar Prompt
            </button>
          </div>
        </div>

        <!-- FOOTER MODAL -->
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="toggleLifestyleConsoleModal(false)">
            Cerrar Consola
          </button>
        </div>

      </div>
    </div>
  `;

  // Poblar displays del modal
  updateModalPromptAndJSONDisplays();
}

/**
 * Renderiza el contenido de la sub-pestaña activa en Flow mode
 */
function renderActiveLifestyleSubTabContent() {
  if (activeLifestyleSubTab === "nutricion") {
    return renderLifestyleNutritionView();
  } else if (activeLifestyleSubTab === "ejercicios") {
    return renderLifestyleExerciseView();
  } else {
    // Somático por defecto (Calendario somático + Outfits)
    return `
      <!-- BARRA SELECTORA DE DÍAS (LUNES A DOMINGO + TOGGLE SEMANA COMPLETA) -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; border-bottom: 1px solid var(--border-glass); padding-bottom: 14px;">
        
        <!-- PESTAÑAS DE DÍAS -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${Object.keys(LIFESTYLE_ARCHITECT_DATA.dias).map(dayKey => {
            const dayObj = LIFESTYLE_ARCHITECT_DATA.dias[dayKey];
            const isActive = activeLifestyleDay === dayKey && lifestyleViewMode === "single";
            return `
              <button 
                class="btn-jaguar btn-sm ${isActive ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                onclick="selectLifestyleDay('${dayKey}')"
                style="padding: 7px 14px; font-weight: 700; display: flex; align-items: center; gap: 6px; border-radius: var(--radius-full); ${isActive ? 'color: #0B0E14;' : ''}">
                <span>${dayObj.icono}</span>
                <span>${dayObj.nombre}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- MODO DE VISTA: DÍA INDIVIDUAL O MATRIZ 7 DÍAS -->
        <div style="display: flex; gap: 6px;">
          <button 
            class="btn-jaguar btn-sm ${lifestyleViewMode === 'single' ? 'btn-electric-cyan' : 'btn-secondary-dark'}" 
            onclick="setLifestyleViewMode('single')"
            style="padding: 6px 12px; font-size: 0.75rem;">
            🔍 Vista Día a Día
          </button>
          <button 
            class="btn-jaguar btn-sm ${lifestyleViewMode === 'all' ? 'btn-electric-cyan' : 'btn-secondary-dark'}" 
            onclick="setLifestyleViewMode('all')"
            style="padding: 6px 12px; font-size: 0.75rem;">
            📊 Matriz Semanal (7x3)
          </button>
        </div>

      </div>

      <!-- CONTENIDO DINÁMICO DE DÍAS -->
      <div id="lifestyle-days-content-container">
        ${renderLifestyleDaysView()}
      </div>
    `;
  }
}

/**
 * Renderiza la sub-pestaña de Nutrición Semanal & Superávit Limpio (Subir Físico)
 */
function renderLifestyleNutritionView() {
  const meta = NUTRITION_PLAN_DATA.meta;
  const currentDayData = NUTRITION_PLAN_DATA.dias[activeNutritionDay] || NUTRITION_PLAN_DATA.dias.lunes;

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- BANNER DE MACRONUTRIENTES & METAS DIARIAS -->
      <div style="background: rgba(11,14,20,0.85); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.7);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(197,154,40,0.3); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span class="badge-tag badge-gold">🥑 SUPERÁVIT CALÓRICO LIMPIO</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #FFF; margin: 4px 0 0 0;">
              Plan Nutricional Semanal para Ganancia Muscular Magra
            </h3>
          </div>
          <span class="badge-tag badge-emerald" style="font-weight: 700; font-size: 0.8rem;">
            ⚡ Meta: +250 a +350 kcal / día
          </span>
        </div>

        <!-- 4 PILLARS METRICS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 14px;">
          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #E2A93B; padding: 10px 14px; border-radius: var(--radius-xs);">
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Calorías Diarias</span>
            <div style="font-size: 1.25rem; font-weight: 900; color: #E2A93B; font-family: 'Orbitron', monospace;">${meta.calorias.split(' ')[0]}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Superávit antiinflamatorio</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #00F0FF; padding: 10px 14px; border-radius: var(--radius-xs);">
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Proteína Magra</span>
            <div style="font-size: 1.25rem; font-weight: 900; color: #00F0FF; font-family: 'Orbitron', monospace;">${meta.proteina.split(' ')[0]}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">2.2g / kg corporal</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #5CD696; padding: 10px 14px; border-radius: var(--radius-xs);">
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Carbohidratos</span>
            <div style="font-size: 1.25rem; font-weight: 900; color: #5CD696; font-family: 'Orbitron', monospace;">${meta.carbohidratos.split(' ')[0]}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Almidón resistente y granos</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid #FF007F; padding: 10px 14px; border-radius: var(--radius-xs);">
            <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Grasas Nobles</span>
            <div style="font-size: 1.25rem; font-weight: 900; color: #FF007F; font-family: 'Orbitron', monospace;">${meta.grasas.split(' ')[0]}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">AOVE, aguacate, Omega-3</div>
          </div>
        </div>

        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.45; margin: 0;">
          💧 <strong>Hidratación Somática:</strong> ${meta.hidratacion} con pizca de sal marina sin refinar o electrolitos en ayunas para optimizar la conductividad celular y la contracción muscular.
        </p>
      </div>

      <!-- SELECTOR DE DÍAS DE NUTRICIÓN -->
      <div style="display: flex; gap: 6px; flex-wrap: wrap; border-bottom: 1px solid var(--border-glass); padding-bottom: 14px;">
        ${Object.keys(NUTRITION_PLAN_DATA.dias).map(dKey => {
          const d = NUTRITION_PLAN_DATA.dias[dKey];
          const isActive = activeNutritionDay === dKey;
          return `
            <button class="btn-jaguar btn-sm ${isActive ? 'btn-gold-chrome' : 'btn-secondary-dark'}"
                    onclick="selectNutritionDay('${dKey}')"
                    style="padding: 7px 16px; font-weight: 700; border-radius: var(--radius-full); ${isActive ? 'color: #0B0E14;' : 'color: #FFF;'}">
              ${d.nombre}
            </button>
          `;
        }).join("")}
      </div>

      <!-- DETALLE DEL DÍA SELECCIONADO (5 COMIDAS) -->
      <div style="background: rgba(17,23,32,0.9); border: 1.5px solid var(--border-glass); border-radius: var(--radius-md); padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--imperial-gold-light); text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">
              MENÚ DIARIO ESTRUCTURADO
            </span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #FFF; margin: 2px 0 0 0;">
              ${currentDayData.nombre} • ${currentDayData.titulo}
            </h4>
          </div>
          <span class="badge-tag badge-gold">5 Ingestas Anabólicas Limpias</span>
        </div>

        <!-- LISTA DE COMIDAS -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${currentDayData.comidas.map((c, idx) => `
            <div style="background: rgba(11,14,20,0.7); border: 1px solid rgba(255,255,255,0.06); border-left: 3px solid ${idx === 0 ? '#E2A93B' : idx === 1 ? '#00F0FF' : idx === 2 ? '#5CD696' : idx === 3 ? '#FF007F' : '#C5A059'}; border-radius: var(--radius-sm); padding: 14px 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
                <span style="font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 800; color: #FFF;">
                  ${c.momento}
                </span>
                <span class="badge-tag" style="background: rgba(255,255,255,0.05); color: #B4E3C9; font-size: 0.72rem; font-family: monospace;">
                  ${c.macros}
                </span>
              </div>
              <strong style="font-size: 0.95rem; color: var(--imperial-gold-light); display: block; margin-bottom: 4px;">
                ${c.plato}
              </strong>
              <p style="font-size: 0.82rem; color: #BBB; line-height: 1.45; margin: 0;">
                ${c.detalle}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- TARJETA DE SUPLEMENTACIÓN SOMÁTICA CIENTÍFICA -->
      <div style="background: rgba(11,14,20,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px 20px;">
        <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #FFF; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>💊</span> Pila de Suplementación Somática (Evidencia Clase A)
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
          ${meta.suplementos.map(s => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 12px; border-radius: var(--radius-xs);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 0.88rem; color: var(--imperial-gold-light); font-family: 'Cinzel', serif;">${s.nombre}</strong>
                <span style="font-size: 0.72rem; color: #5CD696; font-family: monospace;">${s.dosis}</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.35;">
                ${s.efecto}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;
}

/**
 * Renderiza la sub-pestaña de Rutina de Ejercicios (Aumento de Masa Muscular & Hipertrofia Funcional)
 */
function renderLifestyleExerciseView() {
  const meta = HYPERTROPHY_WORKOUT_DATA.meta;
  const currentDayData = HYPERTROPHY_WORKOUT_DATA.dias[activeExerciseDay] || HYPERTROPHY_WORKOUT_DATA.dias.lunes;

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- BANNER DE PROGRAMA DE ENTRENAMIENTO -->
      <div style="background: rgba(11,14,20,0.85); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 18px 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.7);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(197,154,40,0.3); padding-bottom: 12px; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span class="badge-tag badge-gold">🏋️‍♂️ HIPERTROFIA & POTENCIA DE CABALLERO</span>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #FFF; margin: 4px 0 0 0;">
              Rutina Semanal de Fuerza & Masa Muscular Funcional
            </h3>
          </div>
          <span class="badge-tag badge-cyan" style="font-weight: 700; font-size: 0.8rem;">
            Frecuencia: ${meta.frecuencia.split('+')[0].trim()}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 14px; margin-bottom: 10px;">
          <div style="font-size: 0.82rem; color: #BBB; line-height: 1.5;">
            <strong>Principio Fundamental:</strong> ${meta.metodologia}
          </div>
          <div style="background: rgba(0,240,255,0.06); border-left: 3px solid var(--neon-cyan); padding: 8px 12px; border-radius: var(--radius-xs); font-size: 0.78rem; color: #B4E3C9;">
            ${meta.calentamiento}
          </div>
        </div>
      </div>

      <!-- SELECTOR DE DÍAS DE ENTRENAMIENTO -->
      <div style="display: flex; gap: 6px; flex-wrap: wrap; border-bottom: 1px solid var(--border-glass); padding-bottom: 14px;">
        ${Object.keys(HYPERTROPHY_WORKOUT_DATA.dias).map(dKey => {
          const d = HYPERTROPHY_WORKOUT_DATA.dias[dKey];
          const isActive = activeExerciseDay === dKey;
          return `
            <button class="btn-jaguar btn-sm ${isActive ? 'btn-gold-chrome' : 'btn-secondary-dark'}"
                    onclick="selectExerciseDay('${dKey}')"
                    style="padding: 7px 16px; font-weight: 700; border-radius: var(--radius-full); ${isActive ? 'color: #0B0E14;' : 'color: #FFF;'}">
              ${d.nombre}
            </button>
          `;
        }).join("")}
      </div>

      <!-- SESIÓN DE ENTRENAMIENTO DEL DÍA SELECCIONADO -->
      <div style="background: rgba(17,23,32,0.9); border: 1.5px solid var(--border-glass); border-radius: var(--radius-md); padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--imperial-gold-light); text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">
              SESIÓN DIARIA DE ENTRENAMIENTO
            </span>
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #FFF; margin: 3px 0 0 0;">
              ${currentDayData.titulo}
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 4px;">
              🎯 Enfoque: ${currentDayData.enfoque}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-tag badge-gold">⏱️ ${currentDayData.duracion}</span>
          </div>
        </div>

        <!-- LISTA DE EJERCICIOS CON TÉCNICA Y REPS -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${currentDayData.ejercicios.map((ej, idx) => `
            <div style="background: rgba(11,14,20,0.7); border: 1px solid rgba(255,255,255,0.06); border-left: 3px solid #E2A93B; border-radius: var(--radius-sm); padding: 14px 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-family: 'Orbitron', monospace; font-size: 0.82rem; color: var(--imperial-gold-light); font-weight: 800;">
                    #${idx + 1}
                  </span>
                  <strong style="font-size: 0.98rem; color: #FFF; font-family: 'Cinzel', serif;">
                    ${ej.nombre}
                  </strong>
                </div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <span class="badge-tag badge-gold" style="font-size: 0.72rem;">${ej.series} × ${ej.reps}</span>
                  <span class="badge-tag badge-cyan" style="font-size: 0.72rem;">${ej.rir}</span>
                  <span class="badge-tag" style="background: rgba(255,255,255,0.05); color: #DDD; font-size: 0.72rem;">Descanso: ${ej.descanso}</span>
                </div>
              </div>
              <p style="font-size: 0.8rem; color: #A0AEC0; margin: 4px 0 0 0; line-height: 1.4;">
                <span style="color: var(--imperial-gold-light); font-weight: 600;">Clave Técnica:</span> ${ej.nota}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- LEYES SOMÁTICAS DE HIPERTROFIA -->
      <div style="background: rgba(11,14,20,0.85); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px 20px;">
        <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #FFF; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>⚡</span> Las 3 Leyes de Sobrecarga para el Caballero Jaguar
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-xs); border-left: 2px solid #E2A93B;">
            <strong style="font-size: 0.85rem; color: #FFF; font-family: 'Cinzel', serif;">1. Regla de las 2 Repeticiones</strong>
            <p style="font-size: 0.76rem; color: var(--text-muted); margin: 4px 0 0 0; line-height: 1.35;">
              Cuando alcances el rango máximo de repeticiones en todas las series de un ejercicio con RIR 1-2, añade 1.25 a 2.5 kg en la siguiente sesión.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-xs); border-left: 2px solid #00F0FF;">
            <strong style="font-size: 0.85rem; color: #FFF; font-family: 'Cinzel', serif;">2. Control de Fase Excéntrica (3s)</strong>
            <p style="font-size: 0.76rem; color: var(--text-muted); margin: 4px 0 0 0; line-height: 1.35;">
              Baja la carga en 3 segundos sintiendo el estiramiento muscular bajo tensión. El daño mecánico controlado es el mayor disparador hipertrófico.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-xs); border-left: 2px solid #5CD696;">
            <strong style="font-size: 0.85rem; color: #FFF; font-family: 'Cinzel', serif;">3. Recuperación Parasimpática</strong>
            <p style="font-size: 0.76rem; color: var(--text-muted); margin: 4px 0 0 0; line-height: 1.35;">
              El músculo no crece en el gimnasio; se sintetiza durante las 8 horas de sueño profundo potenciadas con Magnesio Bisglicinato y oscuridad total.
            </p>
          </div>
        </div>
      </div>

    </div>
  `;
}

/**
 * Renderiza la vista de los días (modo single o all)
 */
function renderLifestyleDaysView() {
  if (lifestyleViewMode === "all") {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${Object.keys(LIFESTYLE_ARCHITECT_DATA.dias).map(dayKey => renderSingleDayCard(dayKey, false)).join("")}
      </div>
    `;
  } else {
    return renderSingleDayCard(activeLifestyleDay, true);
  }
}

/**
 * Renderiza la ficha completa de un día específico con sus 3 bloques somáticos
 */
function renderSingleDayCard(dayKey, isDetailed = true) {
  const day = LIFESTYLE_ARCHITECT_DATA.dias[dayKey];
  if (!day) return "";

  const momentOrder = [
    { key: "manana", label: "Mañana", icon: "☀️", color: "rgba(197, 160, 89, 0.15)", border: "var(--border-gold)" },
    { key: "tarde", label: "Tarde", icon: "⚡", color: "rgba(0, 240, 255, 0.12)", border: "var(--neon-cyan)" },
    { key: "noche", label: "Noche", icon: "🌙", color: "rgba(155, 52, 68, 0.18)", border: "var(--neon-pink)" }
  ];

  return `
    <div class="lifestyle-day-card" style="background: rgba(11, 14, 20, 0.7); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-metallic);">
      
      <!-- BANNER DE ENCABEZADO DEL DÍA CON POST DE OUTFIT TIPO INSTAGRAM (5:4) -->
      <div style="display: flex; gap: 18px; margin-bottom: 16px; border-bottom: 1px solid var(--border-glass); padding-bottom: 16px; align-items: center; flex-wrap: wrap;">
        <!-- BANNER 5:4 OUTFIT -->
        <div style="width: 145px; height: 116px; border-radius: var(--radius-sm); overflow: hidden; border: 1.5px solid var(--border-gold); flex-shrink: 0; box-shadow: var(--shadow-metallic); position: relative; background: #0B0E14;">
          <img src="assets/outfit_banner_${dayKey}.jpg" alt="Outfit ${day.nombre}" onerror="this.onerror=null; this.src='assets/outfit_look_${dayKey}.jpg';" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; bottom: 0; inset-inline: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); font-size: 0.65rem; color: #E5B842; font-weight: 700; text-align: center; padding: 3px 4px; font-family: 'Cinzel', serif;">
            👔 Outfit 5:4
          </div>
        </div>

        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.6rem;">${day.icono}</span>
            <div>
              <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #FFF; margin: 0; display: flex; align-items: center; gap: 8px;">
                ${day.nombre}: <span style="background: var(--gradient-gold-chrome); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${day.tema}</span>
              </h3>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 3px;">
                <span class="badge-tag badge-cyan" style="font-size: 0.68rem; padding: 2px 8px;">
                  🧬 ${day.enfoque_fisiologico}
                </span>
              </div>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--parchment-warm); margin-top: 8px; line-height: 1.4; max-width: 900px;">
            ${day.resumen_dia}
          </p>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn-jaguar btn-sm btn-secondary-dark" onclick="addFullDayToTasks('${dayKey}')" style="font-size: 0.74rem; padding: 5px 10px;" title="Cargar los 3 bloques de este día a tus Tareas Diarias">
            ➕ Cargar Día Completo en Tareas
          </button>
        </div>
      </div>

      <!-- GRID DE LOS 3 BLOQUES HORARIOS: MAÑANA, TARDE, NOCHE -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 16px;">
        ${momentOrder.map(m => {
          const block = day.bloques[m.key];
          if (!block) return "";
          const blockId = `${dayKey}-${m.key}`;
          const isDone = !!completedSomaticBlocks[blockId];

          return `
            <div class="somatic-block-card" style="background: linear-gradient(145deg, rgba(23, 30, 40, 0.95) 0%, rgba(17, 23, 32, 0.98) 100%); border: 1.5px solid ${isDone ? 'var(--imperial-gold)' : m.border}; border-radius: var(--radius-md); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; position: relative; transition: all 0.2s ease;">
              
              <!-- HEADER DEL BLOQUE CON BOTÓN DE CHECK -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 1.1rem;">${m.icon}</span>
                    <span style="font-size: 0.82rem; font-weight: 800; color: #FFF; font-family: 'Cinzel', serif;">
                      ${block.momento}
                    </span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="badge-tag badge-gold" style="font-size: 0.65rem; padding: 2px 6px;">
                      ⏱️ ${block.duracion_optima}
                    </span>
                    <button 
                      class="btn-jaguar btn-sm ${isDone ? 'btn-gold-chrome' : 'btn-secondary-dark'}" 
                      onclick="toggleSomaticBlockDone('${blockId}')" 
                      style="padding: 2px 8px; font-size: 0.72rem; ${isDone ? 'color: #000; font-weight: 800;' : ''}"
                      title="${isDone ? 'Desmarcar' : 'Marcar bloque como completado (+15 XP)'}">
                      ${isDone ? '✓ Hecho (+15 XP)' : 'Completar'}
                    </button>
                  </div>
                </div>

                <!-- ACTIVIDAD -->
                <div style="margin-bottom: 12px;">
                  <strong style="font-size: 0.95rem; color: #FFF; line-height: 1.35; display: block;">
                    ${block.actividad}
                  </strong>
                </div>

                <!-- BENEFICIO BIOLÓGICO -->
                <div style="background: rgba(11, 14, 20, 0.6); border-left: 2.5px solid var(--neon-cyan); padding: 8px 10px; border-radius: 4px; margin-bottom: 12px;">
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--neon-cyan); font-weight: 800; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
                    🧬 Beneficio Biológico & Neuroquímica:
                  </span>
                  <p style="font-size: 0.78rem; color: var(--parchment-warm); margin: 0; line-height: 1.35;">
                    ${block.beneficio_biologico}
                  </p>
                </div>

                <!-- GEAR & OUTFIT FUNCIONAL (SOMÁTICA DE ATUENDO) -->
                <div style="background: rgba(197, 160, 89, 0.06); border: 1px solid rgba(197, 160, 89, 0.25); padding: 10px; border-radius: 6px; margin-bottom: 12px;">
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--imperial-gold-light); font-weight: 800; letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                    <span>👔</span> Gear & Outfit Somático:
                  </span>
                  
                  <div style="font-size: 0.76rem; color: #FFF; line-height: 1.35; margin-bottom: 4px;">
                    <strong>Prendas:</strong>
                    <ul style="margin: 3px 0 0 16px; padding: 0;">
                      ${block.gear_and_outfit.prendas.map(p => `<li>${p}</li>`).join("")}
                    </ul>
                  </div>

                  <div style="font-size: 0.76rem; color: var(--parchment-muted); line-height: 1.35;">
                    <strong>Accesorios:</strong>
                    <ul style="margin: 3px 0 0 16px; padding: 0;">
                      ${block.gear_and_outfit.accesorios.map(a => `<li>${a}</li>`).join("")}
                    </ul>
                  </div>
                </div>

                <!-- ESTADO SOMÁTICO & POSTURA -->
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; display: block;">
                    🧘 Estado Somático & Postura:
                  </span>
                  <div style="font-size: 0.78rem; color: var(--parchment-light); font-style: italic; margin-top: 2px;">
                    "${block.estado_somatico}"
                  </div>
                </div>

                <!-- NUTRICIÓN & HIDRATACIÓN -->
                <div style="margin-bottom: 14px;">
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; display: block;">
                    🥑 Nutrición & Hidratación:
                  </span>
                  <div style="font-size: 0.78rem; color: var(--parchment-warm); margin-top: 2px; line-height: 1.35;">
                    ${block.nutricion_e_hidratacion}
                  </div>
                </div>

              </div>

              <!-- PIE DE TARJETA: BOTÓN DE VINCULACIÓN A TAREAS -->
              <div style="border-top: 1px solid var(--border-glass); padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.68rem; color: var(--text-dim);">
                  ${isDone ? '✨ Bloque Integrado' : '⏳ Pendiente de Ejecución'}
                </span>
                <button 
                  class="btn-jaguar btn-sm btn-secondary-dark" 
                  onclick="addSingleBlockToTasks('${day.nombre}', '${m.label}', '${escapeHtml(block.actividad)}')"
                  style="font-size: 0.7rem; padding: 4px 8px;" 
                  title="Enviar esta actividad específica a las Tareas de Hoy arriba">
                  ➕ Añadir a Tareas de Hoy
                </button>
              </div>

            </div>
          `;
        }).join("")}
      </div>

    </div>
  `;
}

/**
 * Escapa HTML seguro para onclicks
 */
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

/**
 * Cambia el día seleccionado
 */
function selectLifestyleDay(dayKey) {
  activeLifestyleDay = dayKey;
  lifestyleViewMode = "single";
  renderLifestyleArchitectApp();
}

/**
 * Alterna entre vista de 1 día y vista semanal completa
 */
function setLifestyleViewMode(mode) {
  lifestyleViewMode = mode;
  renderLifestyleArchitectApp();
}

/**
 * Marca o desmarca un bloque somático como completado
 */
function toggleSomaticBlockDone(blockId) {
  completedSomaticBlocks[blockId] = !completedSomaticBlocks[blockId];
  localStorage.setItem("completedSomaticBlocks", JSON.stringify(completedSomaticBlocks));

  if (completedSomaticBlocks[blockId]) {
    // Sumar XP de juego si existe el motor Rey Jaguar
    if (typeof reyJaguarState !== "undefined" && reyJaguarState.character) {
      reyJaguarState.character.xp = (reyJaguarState.character.xp || 0) + 15;
      if (typeof saveReyJaguarState === "function") saveReyJaguarState();
      if (typeof updateHeaderXP === "function") updateHeaderXP();
    }
    if (typeof playSoundEffect === "function") playSoundEffect("success");
    if (typeof showNotification === "function") {
      showNotification("✨ Bloque Somático Completado (+15 XP). ¡Vitalidad encarnada!");
    }
  }

  renderLifestyleArchitectApp();
}

/**
 * Añade un bloque específico del calendario a la lista de Tareas del Día (en appState),
 * sumando XP en Vitalidad Somática y activando el Flow Mode en el retablo inicial.
 */
function addSingleBlockToTasks(dayName, momentName, activityName) {
  const taskTitle = `[${dayName} ${momentName}] ${activityName}`;

  if (typeof appState !== "undefined" && appState.tasks) {
    appState.tasks.push({
      id: "somatic-task-" + Date.now(),
      title: taskTitle,
      timeScope: "daily",
      category: "somatico",
      completed: false
    });

    if (typeof saveAppState === "function") saveAppState();
    if (typeof renderTasks === "function") renderTasks();

    // Activar Flow Mode y otorgar experiencia de Vitalidad Somática
    if (typeof CaballeroScoringEngine !== "undefined") {
      CaballeroScoringEngine.awardXP("vitalidad", 20, `Compromiso Somático Flow: [${dayName} ${momentName}]`);
    } else if (typeof showNotification === "function") {
      showNotification(`Bloque añadido a Tareas del Día: "${activityName.slice(0, 35)}..."`);
    }
  } else {
    alert("Tarea añadida: " + taskTitle);
  }
}

/**
 * Carga los 3 bloques de un día en las tareas
 */
function addFullDayToTasks(dayKey) {
  const day = LIFESTYLE_ARCHITECT_DATA.dias[dayKey];
  if (!day) return;

  if (typeof appState !== "undefined" && appState.tasks) {
    Object.keys(day.bloques).forEach(mKey => {
      const b = day.bloques[mKey];
      appState.tasks.push({
        id: "somatic-task-" + Date.now() + "-" + mKey,
        title: `[${day.nombre} ${mKey.toUpperCase()}] ${b.actividad}`,
        timeScope: "daily",
        category: "somatico",
        completed: false
      });
    });

    if (typeof saveAppState === "function") saveAppState();
    if (typeof renderTasks === "function") renderTasks();

    if (typeof CaballeroScoringEngine !== "undefined") {
      CaballeroScoringEngine.awardXP("vitalidad", 50, `Jornada Completa de Vitalidad: ${day.nombre}`);
    } else if (typeof showNotification === "function") {
      showNotification(`Los 3 bloques de ${day.nombre} fueron añadidos a tus Tareas Diarias.`);
    }
  }
}

/**
 * Sincroniza el bloque correspondiente a la hora actual de hoy
 */
function syncTodayBlockWithDashboardTasks() {
  const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const now = new Date();
  const todayKey = daysOfWeek[now.getDay()];
  const hour = now.getHours();

  let momentKey = "manana";
  let momentLabel = "Mañana";
  if (hour >= 13 && hour < 20) {
    momentKey = "tarde";
    momentLabel = "Tarde";
  } else if (hour >= 20 || hour < 6) {
    momentKey = "noche";
    momentLabel = "Noche";
  }

  const day = LIFESTYLE_ARCHITECT_DATA.dias[todayKey];
  if (day && day.bloques[momentKey]) {
    const b = day.bloques[momentKey];
    addSingleBlockToTasks(day.nombre, momentLabel, b.actividad);
    // Cambiar vista a hoy
    activeLifestyleDay = todayKey;
    renderLifestyleArchitectApp();
  }
}

/**
 * Abre o cierra el modal de la consola de System Prompt y JSON
 */
function toggleLifestyleConsoleModal(show) {
  const modal = document.getElementById("lifestyle-console-modal");
  if (!modal) return;
  modal.style.display = show ? "flex" : "none";
  if (show) {
    updateModalPromptAndJSONDisplays();
  }
}

/**
 * Cambia tabs dentro del modal de la consola
 */
function switchConsoleModalTab(tabId) {
  const tabPrompt = document.getElementById("console-tab-prompt");
  const tabJson = document.getElementById("console-tab-json");
  const tabConfig = document.getElementById("console-tab-config");

  const btnPrompt = document.getElementById("modal-tab-prompt-btn");
  const btnJson = document.getElementById("modal-tab-json-btn");
  const btnConfig = document.getElementById("modal-tab-config-btn");

  if (!tabPrompt || !tabJson || !tabConfig) return;

  tabPrompt.style.display = tabId === "prompt" ? "block" : "none";
  tabJson.style.display = tabId === "json" ? "block" : "none";
  tabConfig.style.display = tabId === "config" ? "block" : "none";

  btnPrompt.className = `btn-jaguar btn-sm ${tabId === "prompt" ? "btn-gold-chrome" : "btn-secondary-dark"}`;
  btnJson.className = `btn-jaguar btn-sm ${tabId === "json" ? "btn-gold-chrome" : "btn-secondary-dark"}`;
  btnConfig.className = `btn-jaguar btn-sm ${tabId === "config" ? "btn-gold-chrome" : "btn-secondary-dark"}`;

  if (tabId === "prompt" && btnPrompt) btnPrompt.style.color = "#0B0E14";
  if (tabId === "json" && btnJson) btnJson.style.color = "#0B0E14";
  if (tabId === "config" && btnConfig) btnConfig.style.color = "#0B0E14";
}

/**
 * Actualiza los displays de texto del prompt y json
 */
function updateModalPromptAndJSONDisplays() {
  const promptDisplay = document.getElementById("system-prompt-display");
  const jsonDisplay = document.getElementById("lifestyle-json-display");

  if (promptDisplay) {
    const customizedPrompt = SYSTEM_PROMPT_TEXT_TEMPLATE
      .replace(/{{NOMBRE_USUARIO}}/g, customUserPreferences.nombre)
      .replace(/{{FECHA}}/g, new Date().toISOString().split("T")[0])
      .replace(/{{PREFERENCIAS}}/g, customUserPreferences.preferencias);
    promptDisplay.textContent = customizedPrompt;
  }

  if (jsonDisplay) {
    const exportableData = {
      ...LIFESTYLE_ARCHITECT_DATA,
      metadatos: {
        ...LIFESTYLE_ARCHITECT_DATA.metadatos,
        usuario: customUserPreferences.nombre,
        fecha_creacion: new Date().toISOString().split("T")[0]
      }
    };
    jsonDisplay.textContent = JSON.stringify(exportableData, null, 2);
  }
}

/**
 * Guarda las preferencias personalizadas
 */
function saveCustomLifestylePreferences() {
  const nameInput = document.getElementById("cfg-user-name");
  const prefsInput = document.getElementById("cfg-user-prefs");

  if (nameInput) customUserPreferences.nombre = nameInput.value.trim() || "Daniel (Caballero Jaguar)";
  if (prefsInput) customUserPreferences.preferencias = prefsInput.value.trim() || "";

  localStorage.setItem("lifestyleUserPreferences", JSON.stringify(customUserPreferences));
  updateModalPromptAndJSONDisplays();
  if (typeof showNotification === "function") {
    showNotification("Preferencias del Arquitecto actualizadas correctamente.");
  }
}

/**
 * Copia el System Prompt al portapapeles
 */
function copySystemPromptText() {
  const customizedPrompt = SYSTEM_PROMPT_TEXT_TEMPLATE
    .replace(/{{NOMBRE_USUARIO}}/g, customUserPreferences.nombre)
    .replace(/{{FECHA}}/g, new Date().toISOString().split("T")[0])
    .replace(/{{PREFERENCIAS}}/g, customUserPreferences.preferencias);

  navigator.clipboard.writeText(customizedPrompt).then(() => {
    if (typeof showNotification === "function") {
      showNotification("📋 System Prompt copiado al portapapeles. ¡Listo para tu LLM!");
    } else {
      alert("System Prompt copiado.");
    }
  });
}

/**
 * Copia el JSON estricto al portapapeles
 */
function copyCurrentLifestyleJSON() {
  const exportableData = {
    ...LIFESTYLE_ARCHITECT_DATA,
    metadatos: {
      ...LIFESTYLE_ARCHITECT_DATA.metadatos,
      usuario: customUserPreferences.nombre,
      fecha_creacion: new Date().toISOString().split("T")[0]
    }
  };
  const jsonStr = JSON.stringify(exportableData, null, 2);

  navigator.clipboard.writeText(jsonStr).then(() => {
    if (typeof showNotification === "function") {
      showNotification("💾 JSON Estricto copiado al portapapeles.");
    } else {
      alert("JSON copiado al portapapeles.");
    }
  });
}

/**
 * Descarga el JSON estricto como archivo
 */
function downloadLifestyleJSONFile() {
  const exportableData = {
    ...LIFESTYLE_ARCHITECT_DATA,
    metadatos: {
      ...LIFESTYLE_ARCHITECT_DATA.metadatos,
      usuario: customUserPreferences.nombre,
      fecha_creacion: new Date().toISOString().split("T")[0]
    }
  };
  const jsonStr = JSON.stringify(exportableData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Calendario_Vida_Sana_Semanal_Somatica.json";
  link.click();
}

/**
 * Exporta los 21 bloques a un archivo .ICS para Google Calendar / Apple Calendar
 */
function exportLifestyleICS() {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Caballero Jaguar//Calendario Somatico//ES\n";
  const daysKeys = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const now = new Date();

  daysKeys.forEach((dayKey, dayIdx) => {
    const day = LIFESTYLE_ARCHITECT_DATA.dias[dayKey];
    if (!day) return;

    const momentTimes = {
      manana: { startH: 7, startM: 30, durM: 45 },
      tarde: { startH: 17, startM: 30, durM: 75 },
      noche: { startH: 20, startM: 30, durM: 40 }
    };

    Object.keys(day.bloques).forEach(mKey => {
      const b = day.bloques[mKey];
      const t = momentTimes[mKey] || { startH: 8, startM: 0, durM: 45 };

      // Calcular fecha sintética para la semana actual
      const eventDate = new Date(now.getTime() + (dayIdx * 86400000));
      eventDate.setHours(t.startH, t.startM, 0, 0);
      const endDate = new Date(eventDate.getTime() + (t.durM * 60000));

      const dtStart = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const dtEnd = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");

      icsContent += `BEGIN:VEVENT\nSUMMARY:[Somática ${day.nombre}] ${b.actividad}\nDESCRIPTION:Beneficio: ${b.beneficio_biologico}\\nNutrición: ${b.nutricion_e_hidratacion}\\nOutfit: ${b.gear_and_outfit.prendas.join(", ")}\\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\n`;
    });
  });

  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Calendario_Semanal_Vida_Sana_21Bloques.ics";
  link.click();
  if (typeof showNotification === "function") {
    showNotification("📅 Archivo .ics con los 21 bloques descargado para tu Calendario.");
  }
}

// Exposición global
window.LIFESTYLE_ARCHITECT_DATA = LIFESTYLE_ARCHITECT_DATA;

// Inicialización automática
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLifestyleArchitect);
} else {
  initLifestyleArchitect();
}

