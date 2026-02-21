'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronDown, ArrowRight, Plus, Minus } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { AdditionalService } from '@/types/booking';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { calculateDays } from '@/lib/utils/calculateDays';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import { ADDITIONAL_SERVICES } from '@/constants/additionalServices';
import { useBookingStore } from '@/store/bookingStore';

interface BookingPanelProps {
    vehicle: Vehicle;
}

export default function BookingPanel({ vehicle }: BookingPanelProps) {
    const router = useRouter();
    const { setVehicle, setDates, setPickupLocation, toggleService, additionalServices } = useBookingStore();

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [startDate, setStartDateLocal] = useState(today);
    const [endDate, setEndDateLocal] = useState(tomorrow);
    const [pickupLoc, setPickupLoc] = useState('');

    const days = calculateDays(startDate, endDate);
    const servicesTotal = additionalServices.reduce((acc, s) => acc + s.pricePerDay * days, 0);
    const total = vehicle.pricePerDay * days + servicesTotal;

    const handleReserve = () => {
        setVehicle(vehicle);
        setDates(startDate, endDate);
        if (pickupLoc) setPickupLocation(pickupLoc);
        router.push('/booking');
    };

    return (
        <div className="card-glass p-6 space-y-5">
            {/* Price */}
            <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(vehicle.pricePerDay)}</span>
                    <span className="text-gray-500 dark:text-text-secondary text-sm">/día</span>
                </div>
                {days > 0 && (
                    <p className="text-gray-500 dark:text-text-secondary text-xs mt-1">
                        {days} día{days !== 1 ? 's' : ''} = <span className="text-primary font-semibold">{formatCurrency(vehicle.pricePerDay * days)}</span>
                    </p>
                )}
            </div>

            <div className="divider" />

            {/* Dates */}
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Fecha de Inicio</label>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        <input
                            type="date" value={startDate} min={today}
                            onChange={(e) => setStartDateLocal(e.target.value)}
                            className="input-dark pl-9 text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Fecha de Fin</label>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        <input
                            type="date" value={endDate} min={startDate}
                            onChange={(e) => setEndDateLocal(e.target.value)}
                            className="input-dark pl-9 text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Lugar de Recojo</label>
                    <div className="relative">
                        <select
                            value={pickupLoc}
                            onChange={(e) => setPickupLoc(e.target.value)}
                            className="input-dark pr-9 appearance-none cursor-pointer text-sm"
                        >
                            <option value="">Selecciona un lugar</option>
                            {PICKUP_LOCATIONS.map((loc) => (
                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Additional Services */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wide mb-2">Extras</p>
                <div className="space-y-2">
                    {ADDITIONAL_SERVICES.slice(0, 3).map((svc) => {
                        const isSelected = additionalServices.some((s) => s.id === svc.id);
                        return (
                            <button
                                key={svc.id}
                                onClick={() => toggleService(svc)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${isSelected
                                    ? 'border-primary bg-primary/10 text-gray-900 dark:text-white'
                                    : 'border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-700 text-gray-500 dark:text-text-secondary hover:border-gray-300 dark:hover:border-dark-400'
                                    }`}
                            >
                                <span className="text-xs font-medium">{svc.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-primary">+{formatCurrency(svc.pricePerDay)}/día</span>
                                    {isSelected ? <Minus size={13} className="text-primary" /> : <Plus size={13} />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Summary */}
            {days > 0 && (
                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500 dark:text-text-secondary">
                        <span>{formatCurrency(vehicle.pricePerDay)} × {days} días</span>
                        <span>{formatCurrency(vehicle.pricePerDay * days)}</span>
                    </div>
                    {additionalServices.length > 0 && (
                        <div className="flex justify-between text-gray-500 dark:text-text-secondary">
                            <span>Extras ({additionalServices.length})</span>
                            <span>{formatCurrency(servicesTotal)}</span>
                        </div>
                    )}
                    <div className="pt-2 border-t border-gray-200 dark:border-dark-500 flex justify-between font-semibold text-gray-900 dark:text-white">
                        <span>Total estimado</span>
                        <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                </div>
            )}

            {/* Reserve Button */}
            <button
                onClick={handleReserve}
                disabled={!vehicle.available}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {vehicle.available ? (
                    <>Reservar este vehículo <ArrowRight size={16} /></>
                ) : (
                    'No disponible'
                )}
            </button>
        </div>
    );
}
