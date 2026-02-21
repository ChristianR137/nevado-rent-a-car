export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: number;
    coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'mejores-rutas-cusco-en-auto',
        title: 'Las 5 mejores rutas para explorar Cusco en auto',
        excerpt: 'Descubre los caminos más impresionantes del sur del Perú, desde el Valle Sagrado hasta las lagunas de Humantay, sin depender de tours masivos.',
        category: 'Rutas & Destinos',
        date: '2026-02-10',
        readTime: 6,
        coverEmoji: '🗺️',
        content: `
## Por qué manejar en Cusco es la mejor decisión

Alquilar un auto en Cusco te da una libertad que ningún tour organizado puede igualar. Puedes detenerte cuando quieras, explorar a tu ritmo y llegar a lugares donde los buses simplemente no van.

## Ruta 1: Valle Sagrado de los Incas

**Distancia:** ~80 km desde Cusco  
**Duración estimada:** 1-2 días

El Valle Sagrado es probablemente la ruta más popular, y con razón. Partiendo desde Cusco hacia Pisac, pasarás por mercados artesanales, ruinas incas y paisajes andinos de postal. Continúa por Urubamba hasta Ollantaytambo, la ciudad viva más antigua de América.

**Paradas imperdibles:**
- Pisac: mercado y ruinas
- Chinchero: textiles y vista al nevado
- Moray: terrazas circulares incas
- Maras: salinas de colores imposibles

## Ruta 2: Humantay y Soraypampa

**Distancia:** ~130 km desde Cusco  
**Duración estimada:** 1 día

La Laguna Humantay es uno de los destinos más fotogénicos del sur peruano. La ruta en auto hasta Soraypampa (punto de inicio del trekking) es perfectamente accesible con una camioneta 4x4 o SUV.

## Ruta 3: Lago Titicaca vía Ruta del Sol

**Distancia:** ~380 km desde Cusco  
**Duración estimada:** 2-3 días

La Ruta del Sol conecta Cusco con Puno a través de Andahuaylillas (la "Capilla Sixtina de América"), Raqchi y La Raya. Un viaje que combina historia viva con paisajes altiplánicos únicos.

## Ruta 4: Abancay y los cañones de Apurímac

**Distancia:** ~190 km desde Cusco  
**Duración estimada:** 1-2 días

Para los más aventureros, el camino a Abancay cruza el impresionante Cañón del Apurímac. Se recomienda vehículo con buena tracción y conductores experimentados.

## Ruta 5: Moray → Maras → Chinchero

**Distancia:** ~50 km desde Cusco  
**Duración estimada:** Medio día

El circuito perfecto para un día. Las terrazas experimentales de Moray y las salinas rosadas de Maras son dos de las maravillas menos apreciadas de la región. Termina en Chinchero antes del atardecer.

## Consejos de manejo en altitud

- **Aclimatación previa:** Conduce solo después de 24-48h en Cusco.
- **Combustible:** Llena el tanque en Cusco antes de salir; en ruta las griferas son escasas.
- **Seguro:** Nuestros vehículos incluyen seguro básico; opciones ampliadas disponibles.
- **4x4 vs Sedán:** Para rutas fuera de asfalto (Humantay, zonas rurales) siempre elige 4x4.
        `,
    },
    {
        id: '2',
        slug: 'guia-alquilar-auto-cusco',
        title: 'Guía completa para alquilar un auto en Cusco sin sorpresas',
        excerpt: 'Todo lo que necesitas saber antes de firmar un contrato de alquiler: documentos, seguros, tipos de vehículo y preguntas clave que debes hacer.',
        category: 'Consejos',
        date: '2026-02-03',
        readTime: 8,
        coverEmoji: '📋',
        content: `
## Lo que nadie te dice antes de alquilar un auto

Alquilar un auto puede ser la mejor o la peor decisión de tu viaje, dependiendo de cuánto te hayas preparado. Esta guía cubre todo lo que deberías saber.

## Documentos necesarios

**Para clientes nacionales:**
- DNI vigente
- Licencia de conducir vigente (categoría B2 o superior para 4x4)

**Para turistas extranjeros:**
- Pasaporte vigente
- Licencia de conducir de su país (válida en Perú por reciprocidad)
- Licencia Internacional de Conducir (recomendada pero no siempre exigida)

## Tipos de seguro

### Seguro básico SOAT
Incluido por ley en todos los vehículos. Cubre solo daños a terceros.

### Seguro contra daños (CDP)
Cubre daños al vehículo con deducible. Altamente recomendado.

### Seguro todo riesgo
La opción más completa. Sin deducible, sin preocupaciones.

## ¿Qué vehículo elegir?

| Situación | Vehículo recomendado |
|-----------|---------------------|
| Ciudad + carretera principal | Sedán económico |
| Valle Sagrado, Titicaca | SUV |
| Zonas rurales, trochas | 4x4 doble tracción |
| Grupo familiar | Camioneta 7 pasajeros |

## Preguntas que debes hacer antes de firmar

1. ¿El seguro cubre daños en llanta y vidrios?
2. ¿Hay cargos por kilómetro adicional?
3. ¿Cuál es el procedimiento ante un accidente?
4. ¿Se puede dejar el auto en otra ciudad?
5. ¿El precio incluye IGV (impuesto)?

## Inspección del vehículo

Nunca firmes sin revisar:
- Fotos del estado exterior e interior
- Nivel de combustible al recoger
- Documentos del vehículo (SOAT, revisión técnica)
- Funcionamiento de luces, frenos y AC

En Nevado Rent A Car realizamos una inspección conjunta documentada con fotos antes de cada entrega.
        `,
    },
    {
        id: '3',
        slug: 'aeropuerto-piura-guia-llegada',
        title: 'Llegando al aeropuerto de Piura: guía completa para turistas',
        excerpt: 'Todo lo que necesitas saber sobre el Aeropuerto Internacional de Piura: terminales, transporte, horarios y cómo recoger tu auto de alquiler al aterrizar.',
        category: 'Aeropuerto',
        date: '2026-01-28',
        readTime: 5,
        coverEmoji: '✈️',
        content: `
## El Aeropuerto Internacional Cap. FAP Guillermo Concha Iberico

El aeropuerto de Piura (código IATA: PIU) es la puerta de entrada a la región norte del Perú. Ubicado a 2 km del centro de Piura, opera vuelos nacionales e internacionales conectando con Lima y otras ciudades.

## Datos básicos del aeropuerto

- **Nombre oficial:** Aeropuerto Internacional Capitán FAP Guillermo Concha Iberico
- **Código IATA:** PIU
- **Dirección:** Av. Guillermo Concha Iberico s/n, Piura
- **Teléfono:** +51 (073) 344503
- **Horario de operaciones:** 5:00 AM – 11:00 PM

## Aerolíneas que operan en Piura

- LATAM Airlines (Lima–Piura)
- Sky Airline (Lima–Piura)
- JetSmart (Lima–Piura)

## Recogida de tu auto de alquiler

Con Nevado Rent A Car, el proceso es sencillo:

1. **Reserva anticipada:** Reserva al menos 24h antes de tu llegada indicando vuelo y hora de aterrizaje.
2. **Confirmación:** Te enviamos WhatsApp con los datos de tu representante.
3. **Área de llegadas:** Nuestro personal te esperará en la salida de llegadas con letrero con tu nombre.
4. **Firma y entrega:** Revisión del vehículo, firma del contrato y ¡listo para manejar!

## Servicios disponibles en el aeropuerto

- WiFi gratuito en sala de espera
- Cajeros automáticos (BCP, Interbank)
- Tiendas de souvenirs
- Cafetería
- Alquiler de equipaje

## Tips para tu llegada

- Si tu vuelo llega tarde (después de las 9pm), avísanos con anticipación.
- Ten tu código de reserva a mano para agilizar la entrega.
- El estacionamiento de corta estadía está frente a la terminal.
        `,
    },
    {
        id: '4',
        slug: 'cusco-temporada-seca-viaje',
        title: 'Cuándo visitar Cusco: la guía definitiva por temporadas',
        excerpt: 'Temporada seca vs lluviosa, festivales, precios y la mejor época para cada tipo de viajero. Todo lo que necesitas para planificar tu visita perfecta.',
        category: 'Viajes',
        date: '2026-01-15',
        readTime: 7,
        coverEmoji: '☀️',
        content: `
## Las dos caras de Cusco

Cusco es una ciudad que se transforma radicalmente según la época del año. Conocer las diferencias te ayudará a elegir el momento perfecto para tu visita.

## Temporada Seca (Mayo – Octubre)

**La favorita de los turistas**

Los meses de mayo a octubre son los más populares, especialmente junio y julio. El cielo es despejado casi todos los días, las temperaturas son agradables durante el día (15-20°C) y las noches son frías pero manejables.

**Ventajas:**
- Cielos azules perfectos para fotografía
- Carreteras en mejor estado
- Ideal para trekking y actividades al aire libre
- Festivales importantes: Inti Raymi (junio), Virgen del Carmen (julio)

**Desventajas:**
- Precios más altos (alta temporada)
- Mayor afluencia de turistas
- Algunos atractivos congestionados

## Temporada de Lluvias (Noviembre – Abril)

**La temporada de los valles verdes**

Las lluvias caen principalmente en las tardes y noches, dejando las mañanas libres para explorar. El paisaje se transforma: todo es verde intenso y los ríos bajan cargados.

**Ventajas:**
- Precios más bajos (hasta 40% menos)
- Menos turistas, experiencia más auténtica
- Paisajes espectaculares de vegetación exuberante
- Mejor para quienes buscan tranquilidad

**Desventajas:**
- Algunas rutas pueden cortarse por huaycos
- La Inca Trail cierra en febrero por mantenimiento
- Lluvias por las tardes

## Recomendación de vehículo por temporada

| Temporada | Vehículo ideal |
|-----------|---------------|
| Seca (Mayo-Oct) | Cualquier categoría |
| Lluviosa (Nov-Abr) | 4x4 o SUV recomendado |
| Carnaval (Feb) | SUV o 4x4 obligatorio |

## Festivales que no te puedes perder

**Junio:**
- **Inti Raymi** (24 jun): La fiesta del Sol, el festival más importante del Cusco incaico.

**Julio:**
- **Virgen del Carmen** (16 jul): Coloridos bailes en Paucartambo.

**Agosto:**
- **Huarachicoy** (agosto): Rito de iniciación inca recreado en Sacsayhuamán.
        `,
    },
    {
        id: '5',
        slug: 'tips-conducir-altura-andes',
        title: '7 tips esenciales para conducir en los Andes peruanos',
        excerpt: 'La altitud, las carreteras serpenteantes y los cambios bruscos de clima hacen de los Andes un desafío único. Estos consejos pueden salvar tu viaje.',
        category: 'Consejos',
        date: '2026-01-07',
        readTime: 5,
        coverEmoji: '⛰️',
        content: `
## Conducir en altitudes extremas

Manejar a 3,400 metros sobre el nivel del mar (la altura de Cusco) es una experiencia muy diferente a hacerlo al nivel del mar. Estos tips son esenciales para tu seguridad.

## 1. Aclimatación obligatoria

No manejes el primer día. Tu cuerpo necesita tiempo para adaptarse a la menor concentración de oxígeno. Dedica las primeras 24-48 horas a descansar, hidratarte y evitar esfuerzos físicos intensos.

**Síntomas del mal de altura a vigilar:**
- Dolor de cabeza persistente
- Náuseas o mareos
- Dificultad para respirar en reposo
- Fatiga extrema

Si tienes síntomas graves, descende de altitud inmediatamente.

## 2. El motor también sufre la altitud

Los vehículos pierden potencia en altitud (aproximadamente un 3% por cada 300 metros). Esto significa que las pendientes se sienten más pronunciadas y los adelantamientos requieren más distancia. Sé conservador.

## 3. Manejo en curvas y pendientes

Las carreteras andinas son famosas por sus curvas en "U" (llamadas "suizas"). Reglas básicas:
- Toca el claxon antes de curvas ciegas
- Mantén la derecha en absoluto
- En descenso, usa el motor (freno-motor) en lugar de los frenos continuamente
- Nunca adelantes en curvas, aunque parezca seguro

## 4. Lluvia y neblina

En temporada de lluvias, la visibilidad puede bajar a metros. Si encuentras neblina densa:
- Reduce velocidad drásticamente
- Pon las luces de cruce (no las altas)
- Si no ves nada, detente en zona segura y espera

## 5. Combustible

Fuera de Cusco, los grifos escasean. **Llena el tanque siempre al 100% antes de salir** hacia rutas rurales. Lleva un galón de reserva si planeas ruta fuera de lo establecido.

## 6. Equipamiento de emergencia

En nuestra flota, cada vehículo incluye:
- Gata y llave de ruedas
- Triángulos de seguridad
- Extintor
- Botiquín básico

Revisa que todo esté presente antes de partir.

## 7. Conexión y señal

La señal de celular es errática en zonas rurales andinas. Descarga los mapas offline de Google Maps o Maps.me antes de salir. Comparte tu ruta con alguien de confianza.

## Número de emergencias

- **Policía de Tránsito:** 105
- **Bomberos:** 116
- **Nevado Rent A Car (asistencia 24h):** +51 987 654 321
        `,
    },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}
