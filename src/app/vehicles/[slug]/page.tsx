import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Users, Settings, Fuel, Briefcase, Shield, Star, ArrowLeft, Check, DoorOpen } from 'lucide-react';
import { getVehicleBySlug, getRelatedVehicles } from '@/lib/data/vehicles';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import BookingPanel from '@/components/vehicle/BookingPanel';
import VehicleCard from '@/components/catalog/VehicleCard';
import type { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const vehicle = getVehicleBySlug(slug);
    if (!vehicle) return { title: 'Vehículo no encontrado' };
    return {
        title: `${vehicle.name} ${vehicle.year} – Alquiler en Cusco`,
        description: vehicle.description,
    };
}

export default async function VehicleDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const vehicle = getVehicleBySlug(slug);
    if (!vehicle) notFound();

    const related = getRelatedVehicles(vehicle.id, vehicle.type);

    const specs = [
        { icon: Users, label: 'Pasajeros', value: `${vehicle.passengers} personas` },
        { icon: DoorOpen, label: 'Puertas', value: `${vehicle.doors} puertas` },
        { icon: Settings, label: 'Transmisión', value: vehicle.transmission },
        { icon: Fuel, label: 'Combustible', value: vehicle.fuelType },
        { icon: Briefcase, label: 'Maletas', value: `${vehicle.luggage} maletas` },
        { icon: Shield, label: 'Año', value: vehicle.year.toString() },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white text-sm transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Volver al catálogo
                </Link>

                {/* Main grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Vehicle info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="badge-gold text-xs">{vehicle.type}</span>
                                {vehicle.isPopular && (
                                    <span className="badge bg-primary/20 text-primary border border-primary/30 text-xs">Popular</span>
                                )}
                            </div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {vehicle.name}
                            </h1>
                            <p className="text-gray-500 dark:text-text-secondary">{vehicle.brand} · {vehicle.year}</p>
                        </div>

                        {/* Rating */}
                        {vehicle.rating && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < Math.floor(vehicle.rating!) ? 'text-primary fill-primary' : 'text-gray-300 dark:text-dark-500'} />
                                    ))}
                                </div>
                                <span className="text-gray-900 dark:text-white font-semibold text-sm">{vehicle.rating}</span>
                                <span className="text-gray-500 dark:text-text-secondary text-sm">({vehicle.reviewCount} reseñas)</span>
                            </div>
                        )}

                        {/* Image Gallery Placeholder */}
                        <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-600">
                            <div className="h-72 md:h-96 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-4 opacity-30">🚗</div>
                                    <p className="text-gray-400 dark:text-text-muted text-sm">Galería de imágenes</p>
                                    <p className="text-gray-400 dark:text-text-muted text-xs mt-1">{vehicle.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="card-glass p-6">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Descripción</h2>
                            <p className="text-gray-500 dark:text-text-secondary leading-relaxed">{vehicle.description}</p>
                        </div>

                        {/* Specs */}
                        <div className="card-glass p-6">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Especificaciones</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {specs.map((spec) => {
                                    const Icon = spec.icon;
                                    return (
                                        <div key={spec.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-xl">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon size={15} className="text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 dark:text-text-secondary">{spec.label}</div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{spec.value}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="card-glass p-6">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Características Incluidas</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {vehicle.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-text-secondary">
                                        <Check size={15} className="text-primary shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BookingPanel vehicle={vehicle} />
                        </div>
                    </div>
                </div>

                {/* Related vehicles */}
                {related.length > 0 && (
                    <div className="mt-16">
                        <h2 className="heading-md text-gray-900 dark:text-white mb-8">También podría interesarte</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {related.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
