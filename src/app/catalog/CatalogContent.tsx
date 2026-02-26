'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import VehicleCard from '@/components/catalog/VehicleCard';
import { VEHICLE_TYPES, TRANSMISSION_TYPES } from '@/constants/vehicleTypes';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import type { Vehicle, VehicleType, TransmissionType, SearchFilters } from '@/types/vehicle';
import { useBookingStore } from '@/store/bookingStore';
import { useEffect } from 'react';

interface CatalogContentProps {
    initialVehicles: Vehicle[];
}

function CatalogContentInner({ initialVehicles }: CatalogContentProps) {
    const searchParams = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        pickupLocation: searchParams.get('pickupLocation'),
        vehicleType: null,
        transmission: null,
    });

    const setDatesState = useBookingStore(state => state.setDates);
    const setPickupLocationState = useBookingStore(state => state.setPickupLocation);
    const setDropoffLocationState = useBookingStore(state => state.setDropoffLocation);

    useEffect(() => {
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const pickupLoc = searchParams.get('pickupLocation');
        const dropoffLoc = searchParams.get('dropoffLocation');

        if (startDate && endDate) {
            setDatesState(startDate, endDate);
        }
        if (pickupLoc) {
            setPickupLocationState(pickupLoc);
        }
        if (dropoffLoc) {
            setDropoffLocationState(dropoffLoc);
        }
    }, [searchParams, setDatesState, setPickupLocationState, setDropoffLocationState]);

    const filteredVehicles = useMemo(() => {
        return initialVehicles.filter((v) => {
            if (filters.vehicleType && v.type !== filters.vehicleType) return false;
            if (filters.transmission && v.transmission !== filters.transmission) return false;

            return true;
        });
    }, [filters]);

    const activeFilterCount = [
        filters.vehicleType,
        filters.transmission,

    ].filter(Boolean).length;

    const resetFilters = () => {
        setFilters({
            startDate: null, endDate: null, pickupLocation: null,
            vehicleType: null, transmission: null,
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="section-label mb-1 block">Catálogo</span>
                            <h1 className="heading-md text-gray-900 dark:text-white">
                                {filteredVehicles.length} vehículo{filteredVehicles.length !== 1 ? 's' : ''} disponible{filteredVehicles.length !== 1 ? 's' : ''}
                            </h1>
                        </div>
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="flex items-center gap-2 btn-outline md:self-start"
                        >
                            <SlidersHorizontal size={16} />
                            Filtros
                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filter Panel */}
                    {filtersOpen && (
                        <div className="mt-6 p-5 bg-gray-100 dark:bg-dark-700 rounded-2xl border border-gray-200 dark:border-dark-500 animate-slide-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {/* Vehicle Type */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-2 uppercase tracking-wide">
                                        Tipo de Vehículo
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={filters.vehicleType || ''}
                                            onChange={(e) => setFilters(f => ({ ...f, vehicleType: e.target.value as VehicleType || null }))}
                                            className="input-dark pr-9 appearance-none cursor-pointer text-sm"
                                        >
                                            <option value="">Todos los tipos</option>
                                            {VEHICLE_TYPES.map((t) => (
                                                <option key={t.value} value={t.value}>{t.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                                    </div>
                                </div>

                                {/* Transmission */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-2 uppercase tracking-wide">
                                        Transmisión
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={filters.transmission || ''}
                                            onChange={(e) => setFilters(f => ({ ...f, transmission: e.target.value as TransmissionType || null }))}
                                            className="input-dark pr-9 appearance-none cursor-pointer text-sm"
                                        >
                                            <option value="">Todas</option>
                                            {TRANSMISSION_TYPES.map((t) => (
                                                <option key={t.value} value={t.value}>{t.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                                    </div>
                                </div>


                            </div>

                            {activeFilterCount > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600 flex items-center justify-between">
                                    <p className="text-gray-500 dark:text-text-secondary text-sm">
                                        {activeFilterCount} filtro{activeFilterCount !== 1 ? 's' : ''} activo{activeFilterCount !== 1 ? 's' : ''}
                                    </p>
                                    <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors">
                                        <X size={14} /> Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Vehicles Grid */}
            <div className="container-custom py-10">
                {filteredVehicles.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="heading-md text-gray-900 dark:text-white mb-2">Sin resultados</h3>
                        <p className="text-gray-500 dark:text-text-secondary mb-6">No encontramos vehículos con los filtros aplicados.</p>
                        <button onClick={resetFilters} className="btn-primary">Limpiar filtros</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CatalogContent({ initialVehicles }: CatalogContentProps) {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center animate-pulse bg-white/5" />}>
            <CatalogContentInner initialVehicles={initialVehicles} />
        </Suspense>
    );
}
