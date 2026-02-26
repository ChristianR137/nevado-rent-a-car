'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronDown, ArrowRight, Plus, Minus } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { AdditionalService } from '@/types/booking';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { calculateDays } from '@/lib/utils/calculateDays';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import { useBookingStore } from '@/store/bookingStore';

interface BookingPanelProps {
    vehicle: Vehicle;
    availableServices: AdditionalService[];
}

export default function BookingPanel({ vehicle, availableServices }: BookingPanelProps) {
    const router = useRouter();
    const { setVehicle, setDates, setPickupLocation, toggleService, removeService, additionalServices } = useBookingStore();

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const [startDate, setStartDateLocal] = useState(useBookingStore.getState().startDate || today);
    const [endDate, setEndDateLocal] = useState(useBookingStore.getState().endDate || tomorrow);

    const initialPickup = useBookingStore.getState().pickupLocation || '';
    const initialDropoff = useBookingStore.getState().dropoffLocation || '';

    const [pickupLoc, setPickupLoc] = useState(initialPickup.startsWith('Otro:') ? 'otro' : initialPickup);
    const [pickupDetail, setPickupDetail] = useState(initialPickup.startsWith('Otro:') ? initialPickup.replace('Otro: ', '') : '');
    const [dropoffLoc, setDropoffLoc] = useState(initialDropoff.startsWith('Otro:') ? 'otro' : initialDropoff);
    const [dropoffDetail, setDropoffDetail] = useState(initialDropoff.startsWith('Otro:') ? initialDropoff.replace('Otro: ', '') : '');
    const [showAllServices, setShowAllServices] = useState(false);

    const days = calculateDays(startDate, endDate);

    const handleReserve = () => {
        setVehicle(vehicle);
        setDates(startDate, endDate);
        if (pickupLoc) {
            setPickupLocation(pickupLoc === 'otro' ? `Otro: ${pickupDetail}` : pickupLoc);
        }
        if (dropoffLoc) {
            useBookingStore.getState().setDropoffLocation(dropoffLoc === 'otro' ? `Otro: ${dropoffDetail}` : dropoffLoc);
        }
        router.push('/booking');
    };

    return (
        <div className="card-glass p-6 space-y-5">


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
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Lugar de Entrega</label>
                    <div className="relative">
                        <select
                            value={pickupLoc}
                            onChange={(e) => {
                                const newLoc = e.target.value;
                                setPickupLoc(newLoc);
                                if (newLoc !== 'piura' && newLoc !== 'talara') {
                                    removeService('entrega-aeropuerto');
                                }
                            }}
                            className="input-dark pr-9 appearance-none cursor-pointer text-sm"
                        >
                            <option value="">Selecciona un lugar</option>
                            {PICKUP_LOCATIONS.map((loc) => (
                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                    {pickupLoc === 'otro' && (
                        <div className="mt-2 animate-fade-in relative">
                            <input
                                type="text"
                                maxLength={20}
                                value={pickupDetail}
                                onChange={(e) => setPickupDetail(e.target.value)}
                                placeholder="Especifica el lugar (máx 20 carácteres)"
                                className="input-dark text-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                                {pickupDetail.length}/20
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Lugar de Devolución</label>
                    <div className="relative">
                        <select
                            value={dropoffLoc}
                            onChange={(e) => setDropoffLoc(e.target.value)}
                            className="input-dark pr-9 appearance-none cursor-pointer text-sm"
                        >
                            <option value="">Selecciona un lugar</option>
                            {PICKUP_LOCATIONS.map((loc) => (
                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                    {dropoffLoc === 'otro' && (
                        <div className="mt-2 animate-fade-in relative">
                            <input
                                type="text"
                                maxLength={20}
                                value={dropoffDetail}
                                onChange={(e) => setDropoffDetail(e.target.value)}
                                placeholder="Especifica el lugar (máx 20 carácteres)"
                                className="input-dark text-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                                {dropoffDetail.length}/20
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Services */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-text-secondary uppercase tracking-wide">Extras</p>
                    {(() => {
                        const filteredServices = availableServices;
                        return filteredServices.length > 3 && (
                            <button
                                onClick={() => setShowAllServices(!showAllServices)}
                                className="text-xs text-primary hover:text-primary-dark transition-colors"
                            >
                                {showAllServices ? 'Ver menos' : 'Ver todos'}
                            </button>
                        );
                    })()}
                </div>
                <div className="space-y-2">
                    {(() => {
                        const filteredServices = availableServices;
                        return (showAllServices ? filteredServices : filteredServices.slice(0, 3)).map((svc) => {
                            const isAirportDelivery = svc.id === 'entrega-aeropuerto';
                            const isAirportDeliveryAvailable = pickupLoc === 'piura' || pickupLoc === 'talara';
                            const isDisabled = isAirportDelivery && !isAirportDeliveryAvailable;
                            const isSelected = additionalServices.some((s) => s.id === svc.id);

                            return (
                                <button
                                    key={svc.id}
                                    type="button"
                                    onClick={() => !isDisabled && toggleService(svc)}
                                    disabled={isDisabled}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${isDisabled
                                        ? 'border-gray-100 bg-gray-50/50 dark:border-dark-700/50 dark:bg-dark-800/50 opacity-60 cursor-not-allowed'
                                        : isSelected
                                            ? 'border-primary bg-primary/10 text-gray-900 dark:text-white'
                                            : 'border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-700 text-gray-500 dark:text-text-secondary hover:border-gray-300 dark:hover:border-dark-400'
                                        }`}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-medium flex items-center gap-2">
                                            {svc.name}
                                            {svc.isIncluded && (
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                                    Sin costo
                                                </span>
                                            )}
                                        </span>
                                        {isAirportDelivery && !isAirportDeliveryAvailable && (
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500">Solo disponible en Piura y Talara</span>
                                        )}
                                    </div>
                                    {isSelected ? <Minus size={13} className="text-primary shrink-0" /> : <Plus size={13} className="shrink-0" />}
                                </button>
                            );
                        });
                    })()}
                </div>
            </div>
            {/* Selected Days Output */}
            {
                days > 0 && (
                    <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 text-sm text-center font-medium text-gray-700 dark:text-white">
                        Reservando {days} día{days !== 1 ? 's' : ''} con {additionalServices.length} extra{additionalServices.length !== 1 ? 's' : ''}
                    </div>
                )
            }

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
        </div >
    );
}
