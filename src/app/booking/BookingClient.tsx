'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Calendar, ArrowRight, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';
import { useBookingStore } from '@/store/bookingStore';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import { bookingSchema, type BookingFormSchema } from '@/lib/validations/bookingSchema';
import { getVehicleBySlug } from '@/lib/data/vehicles';
import { submitBooking } from './actions';
import { AdditionalService } from '@/types/booking';

const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon {...props} />;
};

export default function BookingClient({ availableServices }: { availableServices: AdditionalService[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        selectedVehicle, startDate, endDate, pickupLocation, dropoffLocation,
        additionalServices, totalDays,
        setDates, setPickupLocation, setDropoffLocation, toggleService, removeService, setVehicle,
    } = useBookingStore();

    const today = new Date().toISOString().split('T')[0];

    const {
        register, handleSubmit, watch, formState: { errors, isSubmitting },
    } = useForm<BookingFormSchema>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            pickupLocation: pickupLocation || '',
            pickupDetail: '',
            dropoffLocation: dropoffLocation || '',
            dropoffDetail: '',
            startDate: startDate || today,
            endDate: endDate || '',
        },
    });

    const watchedPickupLocation = watch('pickupLocation');
    const watchedDropoffLocation = watch('dropoffLocation');
    const watchedStartDate = watch('startDate');
    const watchedEndDate = watch('endDate');

    // Reactively update dates in store
    useEffect(() => {
        if (watchedStartDate && watchedEndDate) {
            setDates(watchedStartDate, watchedEndDate);
        }
    }, [watchedStartDate, watchedEndDate, setDates]);

    // Auto-select vehicle from query params if available
    useEffect(() => {
        const vehicleSlug = searchParams.get('vehicle');
        if (vehicleSlug && !selectedVehicle) {
            getVehicleBySlug(vehicleSlug).then((vehicle) => {
                if (vehicle) {
                    setVehicle(vehicle);
                }
            });
        }
    }, [searchParams, selectedVehicle, setVehicle]);

    useEffect(() => {
        if (watchedPickupLocation !== 'piura' && watchedPickupLocation !== 'talara') {
            removeService('entrega-aeropuerto');
        }
    }, [watchedPickupLocation, removeService]);

    const onSubmit = async (data: BookingFormSchema) => {
        if (!selectedVehicle) {
            toast.error('Por favor selecciona un vehículo.');
            return;
        }

        setDates(data.startDate, data.endDate);
        const finalLocation = data.pickupLocation === 'otro' && data.pickupDetail
            ? `Otro: ${data.pickupDetail}`
            : data.pickupLocation;
        setPickupLocation(finalLocation);

        const finalDropoffLocation = data.dropoffLocation === 'otro' && data.dropoffDetail
            ? `Otro: ${data.dropoffDetail}`
            : data.dropoffLocation;
        setDropoffLocation(finalDropoffLocation);

        try {
            await submitBooking({
                ...data,
                vehicleId: selectedVehicle.id,
                pickupLocation: finalLocation,
                dropoffLocation: finalDropoffLocation,
                additionalServices,
            });
            toast.success('¡Solicitud enviada! Te contactaremos pronto.');
            router.push('/booking/confirmation');
        } catch (error) {
            toast.error('Hubo un error al procesar la reserva. Intenta nuevamente.');
        }
    };

    const inputClass = (hasError: boolean) =>
        `input-dark ${hasError ? 'border-red-500 focus:ring-red-500' : ''}`;

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            <div className="container-custom py-10">
                {/* Header */}
                <div className="mb-10">
                    <span className="section-label mb-2 block">Paso final</span>
                    <h1 className="heading-lg text-gray-900 dark:text-white">
                        Completa tu <span className="gradient-text">reserva</span>
                    </h1>
                    {selectedVehicle && (
                        <p className="text-gray-500 dark:text-text-secondary mt-2">
                            Reservando: <span className="text-gray-900 dark:text-white font-medium">{selectedVehicle.name}</span>
                            {totalDays > 0 && <> · {totalDays} día{totalDays !== 1 ? 's' : ''}</>}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Data */}
                            <div className="card-glass p-6">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                    <User size={18} className="text-primary" /> Datos Personales
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Nombre completo *
                                        </label>
                                        <input {...register('fullName')} placeholder="Ej: Juan Carlos García" className={inputClass(!!errors.fullName)} />
                                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            DNI / CE *
                                        </label>
                                        <input {...register('dni')} placeholder="12345678" className={inputClass(!!errors.dni)} />
                                        {errors.dni && <p className="text-red-400 text-xs mt-1">{errors.dni.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Teléfono / WhatsApp *
                                        </label>
                                        <input {...register('phone')} placeholder="+51 987 654 321" className={inputClass(!!errors.phone)} />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Correo electrónico *
                                        </label>
                                        <input {...register('email')} type="email" placeholder="correo@ejemplo.com" className={inputClass(!!errors.email)} />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Rental Details */}
                            <div className="card-glass p-6">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                    <Calendar size={18} className="text-primary" /> Detalles del Alquiler
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Fecha de inicio *
                                        </label>
                                        <input {...register('startDate')} type="date" min={today} className={inputClass(!!errors.startDate)} />
                                        {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Fecha de fin *
                                        </label>
                                        <input {...register('endDate')} type="date" min={today} className={inputClass(!!errors.endDate)} />
                                        {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate.message}</p>}
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Lugar de entrega *
                                        </label>
                                        <select {...register('pickupLocation')} className={`${inputClass(!!errors.pickupLocation)} appearance-none`}>
                                            <option value="">Selecciona un lugar</option>
                                            {PICKUP_LOCATIONS.map((loc) => (
                                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                                            ))}
                                        </select>
                                        {errors.pickupLocation && <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>}

                                        {watchedPickupLocation === 'otro' && (
                                            <div className="mt-3 relative animate-fade-in">
                                                <input
                                                    {...register('pickupDetail')}
                                                    type="text"
                                                    maxLength={20}
                                                    placeholder="Especifica el lugar (máx 20)"
                                                    className={inputClass(!!errors.pickupDetail)}
                                                />
                                                {errors.pickupDetail && <p className="text-red-400 text-xs mt-1">{errors.pickupDetail.message}</p>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Lugar de devolución *
                                        </label>
                                        <select {...register('dropoffLocation')} className={`${inputClass(!!errors.dropoffLocation)} appearance-none`}>
                                            <option value="">Selecciona un lugar</option>
                                            {PICKUP_LOCATIONS.map((loc) => (
                                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                                            ))}
                                        </select>
                                        {errors.dropoffLocation && <p className="text-red-400 text-xs mt-1">{errors.dropoffLocation.message}</p>}

                                        {watchedDropoffLocation === 'otro' && (
                                            <div className="mt-3 relative animate-fade-in">
                                                <input
                                                    {...register('dropoffDetail')}
                                                    type="text"
                                                    maxLength={20}
                                                    placeholder="Especifica el lugar (máx 20)"
                                                    className={inputClass(!!errors.dropoffDetail)}
                                                />
                                                {errors.dropoffDetail && <p className="text-red-400 text-xs mt-1">{errors.dropoffDetail.message}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Services */}
                            <div className="card-glass p-6">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Servicios Adicionales</h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {availableServices.map((svc) => {
                                        const isAirportDelivery = svc.id === 'entrega-aeropuerto';
                                        const isAirportDeliveryAvailable = watchedPickupLocation === 'piura' || watchedPickupLocation === 'talara';
                                        const isDisabled = isAirportDelivery && !isAirportDeliveryAvailable;
                                        const isSelected = additionalServices.some((s) => s.id === svc.id);

                                        return (
                                            <button
                                                key={svc.id} type="button"
                                                onClick={() => !isDisabled && toggleService(svc)}
                                                disabled={isDisabled}
                                                className={`p-4 rounded-xl border text-left transition-all duration-200 ${isDisabled
                                                    ? 'border-gray-100 bg-gray-50/50 dark:border-dark-700/50 dark:bg-dark-800/50 opacity-60 cursor-not-allowed'
                                                    : isSelected
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-700 hover:border-gray-300 dark:hover:border-dark-400'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <DynamicIcon name={svc.icon} size={16} className={isSelected ? 'text-primary' : 'text-gray-400'} />
                                                            <div className="flex flex-col gap-0.5">
                                                                <div className="flex items-center gap-2">
                                                                    <p className={`font-medium text-sm ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-text-secondary'}`}>
                                                                        {svc.name}
                                                                    </p>
                                                                    {svc.isIncluded && (
                                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                                                            Sin costo
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {isAirportDelivery && !isAirportDeliveryAvailable && (
                                                                    <span className="text-[10px] text-gray-400 dark:text-gray-500">Solo disponible en Piura y Talara</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-400 dark:text-text-muted text-xs leading-relaxed">{svc.description}</p>
                                                    </div>
                                                    {isSelected && <Check size={11} className="text-primary mt-1" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="lg:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-spin w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                                    ) : (
                                        <>Enviar solicitud de reserva <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 card-glass p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Resumen de Reserva</h3>
                                {selectedVehicle ? (
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4">
                                            <p className="text-xs text-gray-400 dark:text-text-secondary uppercase tracking-wide mb-1">Vehículo seleccionado</p>
                                            <p className="font-medium text-gray-900 dark:text-white text-base">{selectedVehicle.name}</p>
                                            <p className="text-gray-500 dark:text-text-secondary text-xs mt-0.5">{selectedVehicle.type} · {selectedVehicle.year}</p>
                                        </div>

                                        {(watchedStartDate || watchedEndDate || totalDays > 0) && (
                                            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 space-y-3">
                                                <div className="flex items-center justify-between px-1 border-b border-gray-200 dark:border-dark-600 pb-3">
                                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Plazo</span>
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{totalDays} día{totalDays !== 1 ? 's' : ''}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <p className="text-gray-400 dark:text-text-secondary mb-1">Desde</p>
                                                        <p className="font-medium text-gray-900 dark:text-white">{watchedStartDate || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 dark:text-text-secondary mb-1">Hasta</p>
                                                        <p className="font-medium text-gray-900 dark:text-white">{watchedEndDate || '-'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {(watchedPickupLocation || watchedDropoffLocation) && (
                                            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 space-y-3">
                                                <div className="grid grid-cols-1 gap-3 text-xs">
                                                    <div>
                                                        <p className="text-gray-400 dark:text-text-secondary mb-1 uppercase tracking-wide font-medium">Lugar de Recojo</p>
                                                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                                                            {watchedPickupLocation === 'otro' ? `Otro: ${watch('pickupDetail') || 'Pendiente'}` : (PICKUP_LOCATIONS.find(l => l.value === watchedPickupLocation)?.label || '-')}
                                                        </p>
                                                    </div>
                                                    <div className="pt-2 border-t border-gray-200 dark:border-dark-600">
                                                        <p className="text-gray-400 dark:text-text-secondary mb-1 uppercase tracking-wide font-medium">Lugar de Devolución</p>
                                                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                                                            {watchedDropoffLocation === 'otro' ? `Otro: ${watch('dropoffDetail') || 'Pendiente'}` : (PICKUP_LOCATIONS.find(l => l.value === watchedDropoffLocation)?.label || '-')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {additionalServices.length > 0 && (
                                            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4">
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide border-b border-gray-200 dark:border-dark-600 pb-2 mb-2">Servicios Extra ({additionalServices.length})</p>
                                                <ul className="space-y-1.5 mt-2">
                                                    {additionalServices.map(srv => (
                                                        <li key={srv.id} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1.5">
                                                            <Check size={12} className="text-primary mt-0.5 shrink-0" />
                                                            <span>{srv.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-text-secondary text-sm">
                                        Selecciona un vehículo desde el catálogo para ver el resumen.
                                    </p>
                                )}
                                <div className="pt-2 border-t border-gray-200 dark:border-dark-600">
                                    <p className="text-gray-400 dark:text-text-muted text-xs leading-relaxed">
                                        Al enviar la solicitud, nuestro equipo te contactará dentro de las próximas 2 horas para confirmar la disponibilidad y coordinar detalles y pagos. No realizamos cobros en esta plataforma.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
