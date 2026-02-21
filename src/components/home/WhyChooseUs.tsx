import { CheckCircle2, Award, Zap, HeartHandshake } from 'lucide-react';

const reasons = [
    {
        icon: CheckCircle2,
        title: 'Flota Verificada',
        description:
            'Todos nuestros vehículos pasan revisiones técnicas periódicas para garantizar tu seguridad en cada ruta.',
    },
    {
        icon: Award,
        title: 'Sin Cargos Ocultos',
        description:
            'Precios transparentes: el precio que ves es el que pagas. Sin sorpresas al devolver el vehículo.',
    },
    {
        icon: Zap,
        title: 'Reserva Rápida',
        description:
            'Proceso de reserva en menos de 5 minutos. Confirmación inmediata por WhatsApp o correo.',
    },
    {
        icon: HeartHandshake,
        title: 'Atención Personalizada',
        description:
            'Un equipo local que conoce Cusco. Te asesoramos sobre las mejores rutas y destinos.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section-padding bg-white dark:bg-dark relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <div>
                        <span className="section-label mb-3 block">¿Por qué elegirnos?</span>
                        <h2 className="heading-lg text-gray-900 dark:text-white mb-5">
                            La mejor elección para{' '}
                            <span className="gradient-text">explorar Cusco</span>
                        </h2>
                        <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed mb-8">
                            Más de 5 años brindando experiencias de alquiler de autos únicas en el corazón del Perú.
                            Conocemos cada ruta, cada curva y cada destino.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary font-serif">4.8★</div>
                                <div className="text-gray-400 dark:text-text-secondary text-xs">Calificación promedio</div>
                            </div>
                            <div className="h-10 w-px bg-gray-200 dark:bg-dark-500" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary font-serif">150+</div>
                                <div className="text-gray-400 dark:text-text-secondary text-xs">Clientes satisfechos</div>
                            </div>
                            <div className="h-10 w-px bg-gray-200 dark:bg-dark-500" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary font-serif">0</div>
                                <div className="text-gray-400 dark:text-text-secondary text-xs">Cargos ocultos</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {reasons.map((r) => {
                            const Icon = r.icon;
                            return (
                                <div key={r.title} className="card-glass p-5 hover-card group">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                        <Icon size={20} className="text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">{r.title}</h3>
                                    <p className="text-gray-500 dark:text-text-secondary text-xs leading-relaxed">{r.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
