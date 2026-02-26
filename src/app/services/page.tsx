import { Metadata } from 'next';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { getAdditionalServices } from '@/lib/data/services';

export const metadata: Metadata = {
    title: 'Servicios Adicionales',
    description:
        'Personaliza tu alquiler con conductor privado, seguro adicional, entrega en aeropuerto y más.',
};

export const dynamic = 'force-dynamic';

const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon {...props} />;
};

export default async function ServicesPage() {
    const services = await getAdditionalServices();
    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-14 text-center max-w-3xl mx-auto">
                    <span className="section-label mb-3 block">Extras &amp; Servicios</span>
                    <h1 className="heading-lg text-gray-900 dark:text-white mb-4">
                        Personaliza tu <span className="gradient-text">experiencia</span>
                    </h1>
                    <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed">
                        Agrega servicios a medida para que tu viaje en Piura sea exactamente como lo soñaste.
                        Cada servicio puede agregarse al momento de reservar.
                    </p>
                </div>
            </div>

            <div className="container-custom py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                    {services.map((svc) => (
                        <div key={svc.id} className="card-glass p-6 hover-card group">
                            {svc.isPopular && (
                                <span className="badge-primary text-xs mb-4 block w-fit">Más solicitado</span>
                            )}
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <DynamicIcon name={svc.icon || 'HelpCircle'} size={22} className="text-primary" />
                            </div>
                            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white mb-2">{svc.name}</h2>
                            <p className="text-gray-500 dark:text-text-secondary text-sm leading-relaxed mb-5">{svc.description}</p>
                        </div>
                    ))}
                </div>

                {/* How it works */}
                <div className="card-glass p-8 max-w-3xl mx-auto text-center">
                    <h2 className="heading-md text-gray-900 dark:text-white mb-3">¿Cómo agregar un servicio?</h2>
                    <p className="text-gray-500 dark:text-text-secondary mb-8">Puedes seleccionar servicios adicionales directamente durante el proceso de reserva.</p>
                    <div className="grid sm:grid-cols-3 gap-6 mb-8">
                        {[
                            { step: '01', label: 'Elige tu vehículo', desc: 'Navega el catálogo y selecciona el auto ideal.' },
                            { step: '02', label: 'Agrega extras', desc: 'Selecciona los servicios adicionales en el panel de reserva.' },
                            { step: '03', label: 'Confirma', desc: 'Completa tus datos y envía la solicitud.' },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-primary text-sm font-bold">{s.step}</span>
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{s.label}</p>
                                <p className="text-gray-500 dark:text-text-secondary text-xs">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <Link href="/catalog" className="btn-primary">Reservar con servicios</Link>
                </div>
            </div>
        </div>
    );
}
