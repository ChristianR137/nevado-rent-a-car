import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Plane, Clock, MapPin, CheckCircle2, Phone, MessageCircle,
    Car, ShieldCheck, Star, ArrowRight, Navigation
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Entrega en Aeropuerto de Piura – Nevado Rent A Car',
    description: 'Recoge tu auto de alquiler directamente en el Aeropuerto de Piura. Servicio de entrega y devolución sin cargos extra, disponible todos los días.',
};

const includes = [
    'Representante en sala de llegadas con letrero con tu nombre',
    'Inspección conjunta documentada con fotos',
    'Firma de contrato en el aeropuerto',
    'Explicación de la ruta y zonas de cobertura',
    'Sin cargo adicional por entrega en aeropuerto',
];

const steps = [
    {
        step: '01',
        title: 'Reserva con anticipación',
        desc: 'Indica tu número de vuelo y hora de aterrizaje al hacer la reserva. Con 24h es suficiente.',
        icon: Car,
    },
    {
        step: '02',
        title: 'Confirmación por WhatsApp',
        desc: 'Te enviamos los datos de tu representante y el vehículo asignado antes de tu vuelo.',
        icon: MessageCircle,
    },
    {
        step: '03',
        title: 'Llegada al aeropuerto',
        desc: 'Sale de la zona de llegadas y busca el letrero con tu nombre. Nuestro equipo te estará esperando.',
        icon: Plane,
    },
    {
        step: '04',
        title: 'Revisión y entrega',
        desc: 'Revisamos el vehículo juntos, firmamos el contrato y ¡en minutos estás listo para manejar!',
        icon: CheckCircle2,
    },
];

const faqs = [
    {
        q: '¿Cuánto cuesta la entrega en aeropuerto?',
        a: 'La entrega en el Aeropuerto de Piura no tiene costo adicional. Está incluida en tu reserva.',
    },
    {
        q: '¿Qué pasa si mi vuelo se retrasa?',
        a: 'Monitoremos el estado de tu vuelo. Si hay demora, nuestro representante esperará sin cargo extra.',
    },
    {
        q: '¿Puedo devolver el auto en el aeropuerto?',
        a: 'Sí. Coordinamos la devolución en el aeropuerto de Piura. Avísanos tu hora de salida con 2h de anticipación.',
    },
    {
        q: '¿El servicio está disponible en vuelos nocturnos?',
        a: 'Operamos hasta las 11pm. Para vuelos que lleguen después, contáctanos directamente para coordinar.',
    },
    {
        q: '¿Qué documentos necesito llevar?',
        a: 'DNI o pasaporte vigente + licencia de conducir vigente. Para extranjeros se recomienda licencia internacional.',
    },
];

export default function AirportPage() {
    const whatsapp = 'https://wa.me/51987654321?text=Hola%2C+quiero+reservar+un+auto+con+entrega+en+el+aeropuerto+de+Piura';

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">

            {/* ── Hero ── */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Plane size={24} className="text-primary" />
                            </div>
                            <span className="section-label">Servicio Aeropuerto</span>
                        </div>
                        <h1 className="heading-lg text-gray-900 dark:text-white mb-5">
                            Recoge tu auto directo en el{' '}
                            <span className="gradient-text">Aeropuerto de Piura</span>
                        </h1>
                        <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed mb-8">
                            Aterrizas, sales de la sala de llegadas y ya tienes tu auto listo. Sin esperas, sin taxis,
                            sin complicaciones. Servicio disponible todos los días del año.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                                className="btn-primary flex items-center gap-2">
                                <MessageCircle size={18} /> Reservar ahora
                            </a>
                            <Link href="/catalog" className="btn-outline flex items-center gap-2">
                                <Car size={18} /> Ver vehículos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Info rápida ── */}
            <div className="border-b border-gray-200 dark:border-dark-600 bg-white dark:bg-dark">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, label: 'Horario de entrega', value: '5:00 AM – 11:00 PM' },
                            { icon: ShieldCheck, label: 'Costo extra', value: 'Sin cargo adicional' },
                            { icon: Star, label: 'Tiempo de entrega', value: '~10 minutos' },
                            { icon: Navigation, label: 'Distancia al centro', value: '2 km del centro de Piura' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <Icon size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-text-muted">{item.label}</p>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container-custom py-16 space-y-20">

                {/* ── Mapa ── */}
                <section>
                    <div className="text-center mb-10">
                        <span className="section-label mb-2 block">Ubicación</span>
                        <h2 className="heading-md text-gray-900 dark:text-white mb-3">
                            Aeropuerto Internacional Cap. FAP Guillermo Concha Iberico
                        </h2>
                        <p className="text-gray-500 dark:text-text-secondary max-w-xl mx-auto">
                            Código IATA: <strong className="text-gray-900 dark:text-white">PIU</strong> · Av. Guillermo Concha Iberico s/n, Piura, Perú
                        </p>
                    </div>

                    <div className="card-glass overflow-hidden">
                        {/* Map header */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                            <MapPin size={16} className="text-primary shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-text-secondary truncate">
                                Aeropuerto de Piura · Capitán FAP Guillermo Concha Iberico
                            </span>
                            <a
                                href="https://www.openstreetmap.org/?mlat=-5.2075&mlon=-80.6163#map=15/-5.2075/-80.6163"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto text-xs text-primary hover:underline shrink-0 flex items-center gap-1"
                            >
                                Abrir mapa <ArrowRight size={12} />
                            </a>
                        </div>
                        {/* OpenStreetMap embed – no API key required */}
                        <div className="relative w-full h-[420px]">
                            <iframe
                                title="Aeropuerto Internacional de Piura"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.6363%2C-5.2275%2C-80.5963%2C-5.1875&layer=mapnik&marker=-5.2075%2C-80.6163"
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                            />
                        </div>
                        {/* Footer */}
                        <div className="px-5 py-3 bg-gray-50 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-600 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-text-muted">
                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> Terminal principal: Av. Guillermo Concha Iberico s/n</span>
                            <span className="flex items-center gap-1.5"><Phone size={12} className="text-primary" /> +51 (073) 344503</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> Operaciones: 5:00 AM – 11:00 PM</span>
                        </div>
                    </div>
                </section>

                {/* ── Cómo funciona ── */}
                <section>
                    <div className="text-center mb-10">
                        <span className="section-label mb-2 block">Proceso</span>
                        <h2 className="heading-md text-gray-900 dark:text-white">¿Cómo funciona la entrega?</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.step} className="relative">
                                    {idx < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
                                    )}
                                    <div className="card-glass p-6 text-center relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                                            <Icon size={24} className="text-primary" />
                                        </div>
                                        <div className="text-primary text-xs font-bold mb-1">{s.step}</div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{s.title}</h3>
                                        <p className="text-gray-500 dark:text-text-secondary text-xs leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Qué incluye ── */}
                <section className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="section-label mb-3 block">Servicio completo</span>
                        <h2 className="heading-md text-gray-900 dark:text-white mb-5">
                            Todo incluido en tu entrega de aeropuerto
                        </h2>
                        <p className="text-gray-500 dark:text-text-secondary leading-relaxed mb-8">
                            Desde el momento en que aterrizas hasta que arrancas, nos encargamos de todo para que
                            tu experiencia sea fluida y sin estrés.
                        </p>
                        <ul className="space-y-3">
                            {includes.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-600 dark:text-text-secondary text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-glass p-8 text-center">
                        <span className="text-8xl block mb-6">✈️</span>
                        <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            ¿Tu vuelo llega a Piura?
                        </h3>
                        <p className="text-gray-500 dark:text-text-secondary mb-6 text-sm leading-relaxed">
                            Reserva con al menos 24 horas de anticipación e indica tu número de vuelo. Nos encargamos del resto.
                        </p>
                        <div className="space-y-3">
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                                className="btn-primary w-full flex items-center justify-center gap-2">
                                <MessageCircle size={18} /> Reservar por WhatsApp
                            </a>
                            <Link href="/booking" className="btn-outline w-full flex items-center justify-center gap-2">
                                <Car size={18} /> Reservar en línea
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── FAQs ── */}
                <section>
                    <div className="text-center mb-10">
                        <span className="section-label mb-2 block">Preguntas frecuentes</span>
                        <h2 className="heading-md text-gray-900 dark:text-white">Todo lo que necesitas saber</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="card-glass p-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                                    <span className="text-primary shrink-0">Q.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-500 dark:text-text-secondary text-sm leading-relaxed pl-5">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
