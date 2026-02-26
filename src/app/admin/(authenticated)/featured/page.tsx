import { createClient } from '@/utils/supabase/server';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { Car, Info } from 'lucide-react';
import type { Metadata } from 'next';
import FeaturedActions from './FeaturedActions';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Vehículos Populares | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminFeaturedPage() {
    const supabase = await createClient();

    const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('isPopular', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching vehicles:', error);
    }

    const featuredCount = vehicles?.filter(v => v.isPopular && v.available).length || 0;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vehículos Populares</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Selecciona qué vehículos aparecerán en la ventana principal de tu página web.
                    </p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                    <Info size={16} />
                    <span>Se mostrarán los últimos {featuredCount > 0 ? (featuredCount > 3 ? '3' : featuredCount) : '0'} marcados</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehicles?.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className={`bg-white dark:bg-dark-800 rounded-2xl border ${vehicle.isPopular && vehicle.available ? 'border-primary shadow-primary-sm ring-1 ring-primary' : 'border-gray-200 dark:border-dark-700 shadow-sm'} overflow-hidden transition-all`}
                    >
                        {/* Image Header */}
                        <div className="relative h-40 bg-gray-100 dark:bg-dark-700">
                            {vehicle.images && vehicle.images[0] && vehicle.images[0].startsWith('http') ? (
                                <Image
                                    src={vehicle.images[0]}
                                    alt={vehicle.name}
                                    fill
                                    className={`object-cover ${!vehicle.available ? 'grayscale opacity-60' : ''}`}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🚗</div>
                            )}

                            {/* Status Badges */}
                            <div className="absolute top-2 left-2 flex gap-1">
                                {!vehicle.available ? (
                                    <span className="bg-red-500/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Oculto</span>
                                ) : (
                                    <span className="bg-green-500/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Activo</span>
                                )}
                            </div>

                            {/* Action overlay */}
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-dark/90 backdrop-blur shadow-sm rounded-lg">
                                <FeaturedActions vehicleId={vehicle.id} isPopular={vehicle.isPopular} isAvailable={vehicle.available} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate">{vehicle.name}</h3>
                            <div className="flex justify-between items-end mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{vehicle.type}</span>
                                <span className="font-medium text-sm">{formatCurrency(vehicle.pricePerDay)}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {vehicles?.length === 0 && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-dark-700 rounded-2xl">
                        <Car className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sin vehículos</h3>
                        <p className="text-gray-500 mt-1">Registra vehículos en la sección de Flota para destacarlos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
