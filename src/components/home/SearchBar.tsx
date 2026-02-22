'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';

interface SearchBarProps {
    compact?: boolean;
}

function SearchBarContent({ compact = false }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [form, setForm] = useState({
        pickupLocation: searchParams.get('pickupLocation') || '',
        pickupDetail: '',
        startDate: searchParams.get('startDate') || today,
        endDate: searchParams.get('endDate') || tomorrow,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const finalLocation = form.pickupLocation === 'otro' && form.pickupDetail
            ? `Otro: ${form.pickupDetail}`
            : form.pickupLocation;

        if (finalLocation) params.set('pickupLocation', finalLocation);
        if (form.startDate) params.set('startDate', form.startDate);
        if (form.endDate) params.set('endDate', form.endDate);
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className={`bg-white/90 dark:bg-dark-800/90 backdrop-blur-md border border-gray-200 dark:border-dark-600 rounded-2xl p-4 ${compact ? '' : 'shadow-card'
                }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {/* Pickup Location */}
                <div className="relative md:col-span-1">
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                        Lugar de Entrega
                    </label>
                    <div className="relative">
                        <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        <select
                            name="pickupLocation"
                            value={form.pickupLocation}
                            onChange={handleChange}
                            className="input-dark pl-9 pr-9 appearance-none cursor-pointer"
                        >
                            <option value="">Cualquier lugar</option>
                            {PICKUP_LOCATIONS.map((loc) => (
                                <option key={loc.value} value={loc.value}>
                                    {loc.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                    {form.pickupLocation === 'otro' && (
                        <div className="mt-2 relative animate-fade-in">
                            <input
                                type="text"
                                name="pickupDetail"
                                maxLength={20}
                                value={form.pickupDetail}
                                onChange={handleChange}
                                placeholder="Especifíca (máx 20)"
                                className="input-dark text-sm w-full"
                            />
                        </div>
                    )}
                </div>

                {/* Start Date */}
                <div className="relative">
                    <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wide">
                        Fecha de Inicio
                    </label>
                    <div className="relative">
                        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            min={today}
                            onChange={handleChange}
                            className="input-dark pl-9 cursor-pointer"
                        />
                    </div>
                </div>

                {/* End Date */}
                <div className="relative">
                    <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wide">
                        Fecha de Fin
                    </label>
                    <div className="relative">
                        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            min={form.startDate || tomorrow}
                            onChange={handleChange}
                            className="input-dark pl-9 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                        <Search size={16} />
                        <span>Buscar Autos</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default function SearchBar(props: SearchBarProps) {
    return (
        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-white/5 rounded-2xl md:rounded-full" />}>
            <SearchBarContent {...props} />
        </Suspense>
    );
}
