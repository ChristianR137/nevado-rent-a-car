import Link from 'next/link';
import { Users, Fuel, Settings } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { formatCurrency } from '@/lib/utils/formatCurrency';

interface VehicleCardProps {
    vehicle: Vehicle;
}

const typeColors: Record<string, string> = {
    SUV: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Sedan: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Pickup: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Economico: 'bg-green-500/10 text-green-400 border-green-500/20',
    Camioneta: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Link href={`/vehicles/${vehicle.slug}`} className="group block">
            <article className="card-glass hover-card overflow-hidden h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-52 bg-gray-100 dark:bg-dark-700 overflow-hidden">
                    {/* Placeholder gradient image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-dark-600 dark:to-dark-800 flex items-center justify-center">
                        <div className="text-6xl opacity-20">🚗</div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`badge border text-xs ${typeColors[vehicle.type] || 'badge-dark'}`}>
                            {vehicle.type}
                        </span>
                        {vehicle.isPopular && (
                            <span className="badge bg-primary/20 text-primary border border-primary/30 text-xs">
                                Popular
                            </span>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`badge text-xs ${vehicle.available
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                        >
                            {vehicle.available ? 'Disponible' : 'No disponible'}
                        </span>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Title & Rating */}
                    <div className="flex items-start justify-between mb-1">
                        <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 leading-tight">
                            {vehicle.name}
                        </h3>
                    </div>
                    <p className="text-gray-400 dark:text-text-secondary text-sm mb-4">{vehicle.year}</p>



                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-t border-b border-gray-100 dark:border-dark-600">
                        <div className="flex flex-col items-center gap-1">
                            <Users size={15} className="text-primary" />
                            <span className="text-xs text-gray-400 dark:text-text-secondary text-center">
                                {vehicle.passengers} personas
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Settings size={15} className="text-primary" />
                            <span className="text-xs text-gray-400 dark:text-text-secondary text-center">
                                {vehicle.transmission}
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Fuel size={15} className="text-primary" />
                            <span className="text-xs text-gray-400 dark:text-text-secondary text-center">
                                {vehicle.fuelType}
                            </span>
                        </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(vehicle.pricePerDay)}
                            </span>
                            <span className="text-gray-400 dark:text-text-secondary text-sm">/día</span>
                        </div>
                        <span className="btn-outline text-sm px-4 py-2 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                            Ver detalles
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
