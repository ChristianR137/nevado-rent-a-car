import { Shield, UserCheck, Plane, Headphones } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: UserCheck,
        title: 'Conductor Privado',
        description: 'Chofer profesional con experiencia en rutas de montaña y destinos turísticos de Cusco.',
        price: 'S/ 120/día',
    },
    {
        icon: Shield,
        title: 'Seguro Adicional',
        description: 'Cobertura extendida contra daños, robo y responsabilidad civil. Tranquilidad total.',
        price: 'S/ 35/día',
    },
    {
        icon: Plane,
        title: 'Entrega en Aeropuerto',
        description: 'Recibe tu vehículo directamente en el aeropuerto sin tiempo de espera.',
        price: 'S/ 50/uso',
    },
    {
        icon: Headphones,
        title: 'Asistencia 24/7',
        description: 'Soporte técnico y asistencia en carretera disponible durante todo tu viaje.',
        price: 'S/ 25/día',
    },
];

export default function ServicesOverview() {
    return (
        <section className="section-padding bg-gray-50 dark:bg-dark-800">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="section-label mb-3 block">Servicios Extra</span>
                    <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
                        Personaliza tu{' '}
                        <span className="gradient-text">experiencia</span>
                    </h2>
                    <p className="text-gray-500 dark:text-text-secondary">
                        Agrega servicios adicionales para que tu viaje sea exactamente como lo imaginaste.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {services.map((svc) => {
                        const Icon = svc.icon;
                        return (
                            <div
                                key={svc.title}
                                className="card-glass p-6 hover-card group text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-200">
                                    <Icon size={22} className="text-primary" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{svc.title}</h3>
                                <p className="text-gray-500 dark:text-text-secondary text-sm mb-4 leading-relaxed">
                                    {svc.description}
                                </p>
                                <span className="badge-gold text-xs">{svc.price}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link href="/services" className="btn-outline">
                        Ver todos los servicios
                    </Link>
                </div>
            </div>
        </section>
    );
}
