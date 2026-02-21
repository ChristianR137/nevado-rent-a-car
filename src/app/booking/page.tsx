'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Calendar, Phone, Mail, MapPin, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useBookingStore } from '@/store/bookingStore';
import { ADDITIONAL_SERVICES } from '@/constants/additionalServices';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { bookingSchema, type BookingFormSchema } from '@/lib/validations/bookingSchema';

export default function BookingPage() {
    const router = useRouter();
    const {
        selectedVehicle, startDate, endDate, pickupLocation,
        additionalServices, totalDays, subtotal, servicesTotal, totalPrice,
        setDates, setPickupLocation, toggleService,
    } = useBookingStore();

    const today = new Date().toISOString().split('T')[0];

    const {
        register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<BookingFormSchema>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            pickupLocation: pickupLocation || '',
            startDate: startDate || today,
            endDate: endDate || '',
        },
    });

    const onSubmit = async (data: BookingFormSchema) => {
        setDates(data.startDate, data.endDate);
        setPickupLocation(data.pickupLocation);
        await new Promise((res) => setTimeout(res, 800));
        toast.success('¡Solicitud enviada! Te contactaremos pronto.');
        router.push('/booking/confirmation');
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
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">
                                            Lugar de recojo *
                                        </label>
                                        <select {...register('pickupLocation')} className={`${inputClass(!!errors.pickupLocation)} appearance-none`}>
                                            <option value="">Selecciona un lugar</option>
                                            {PICKUP_LOCATIONS.map((loc) => (
                                                <option key={loc.value} value={loc.value}>{loc.label}</option>
                                            ))}
                                        </select>
                                        {errors.pickupLocation && <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Services */}
                            <div className="card-glass p-6">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Servicios Adicionales</h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {ADDITIONAL_SERVICES.map((svc) => {
                                        const isSelected = additionalServices.some((s) => s.id === svc.id);
                                        return (
                                            <button
                                                key={svc.id} type="button"
                                                onClick={() => toggleService(svc)}
                                                className={`p-4 rounded-xl border text-left transition-all duration-200 ${isSelected
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-700 hover:border-gray-300 dark:hover:border-dark-400'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <p className={`font-medium text-sm ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-text-secondary'}`}>
                                                            {svc.name}
                                                        </p>
                                                        <p className="text-gray-400 dark:text-text-muted text-xs mt-0.5 leading-relaxed">{svc.description}</p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? 'bg-primary border-primary' : 'border-gray-300 dark:border-dark-500'}`}>
                                                        {isSelected && <Check size={11} className="text-black" />}
                                                    </div>
                                                </div>
                                                <p className="text-primary text-xs font-semibold mt-2">+{formatCurrency(svc.pricePerDay)}/día</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit */}
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

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 card-glass p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Resumen de Reserva</h3>
                                {selectedVehicle ? (
                                    <>
                                        <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4">
                                            <p className="font-medium text-gray-900 dark:text-white text-sm">{selectedVehicle.name}</p>
                                            <p className="text-gray-500 dark:text-text-secondary text-xs mt-0.5">{selectedVehicle.type} · {selectedVehicle.year}</p>
                                        </div>
                                        {totalDays > 0 && (
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between text-gray-500 dark:text-text-secondary">
                                                    <span>{formatCurrency(selectedVehicle.pricePerDay)} × {totalDays} días</span>
                                                    <span>{formatCurrency(subtotal)}</span>
                                                </div>
                                                {additionalServices.length > 0 && (
                                                    <div className="flex justify-between text-gray-500 dark:text-text-secondary">
                                                        <span>Extras ({additionalServices.length})</span>
                                                        <span>{formatCurrency(servicesTotal)}</span>
                                                    </div>
                                                )}
                                                <div className="pt-2 border-t border-gray-200 dark:border-dark-600 flex justify-between font-bold text-gray-900 dark:text-white">
                                                    <span>Total estimado</span>
                                                    <span className="text-primary text-lg">{formatCurrency(totalPrice)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-gray-500 dark:text-text-secondary text-sm">
                                        Selecciona un vehículo desde el catálogo para ver el resumen.
                                    </p>
                                )}
                                <div className="pt-2 border-t border-gray-200 dark:border-dark-600">
                                    <p className="text-gray-400 dark:text-text-muted text-xs leading-relaxed">
                                        Al enviar la solicitud, nuestro equipo te contactará dentro de las próximas 2 horas para confirmar la reserva.
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
