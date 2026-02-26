'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, User, Phone, MapPin, Mail, CreditCard, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { PICKUP_LOCATIONS } from '@/constants/pickupLocations';
import { calculateDays } from '@/lib/utils/calculateDays';
import { formatCurrency } from '@/lib/utils/formatCurrency';

const bookingSchema = z.object({
    fullName: z.string().min(3, 'Mínimo 3 caracteres'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    phone: z.string().min(6, 'Teléfono inválido'),
    dni: z.string().min(5, 'DNI/Pasaporte requerido'),
    startDate: z.string().min(1, 'Requerido'),
    endDate: z.string().min(1, 'Requerido'),
    pickupLocation: z.string().min(1, 'Requerido'),
    customPickupLocation: z.string().optional(),
    dropoffLocation: z.string().optional(),
    customDropoffLocation: z.string().optional(),
    vehicleId: z.string().min(1, 'Debes seleccionar un vehículo'),
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
    totalPriceOverride: z.number().or(z.nan()).optional(), // Accept NaN for empty inputs
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface AdminBookingFormProps {
    initialData?: any;
    vehicles: any[];
    availableServices: any[];
    action: (data: any) => Promise<{ success?: boolean; error?: string }>;
}

export default function AdminBookingForm({ initialData, vehicles, availableServices, action }: AdminBookingFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any[]>(initialData?.additionalServices || []);

    const isKnownLocation = (loc: string) => ['Piura', 'Talara', 'Tumbes'].includes(loc);
    const initPickup = initialData?.pickupLocation || '';
    const initDropoff = initialData?.dropoff_location || '';

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: initialData?.fullName || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            dni: initialData?.dni || '',
            startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
            endDate: initialData?.endDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
            pickupLocation: initPickup ? (isKnownLocation(initPickup) ? initPickup : 'Otro') : '',
            customPickupLocation: initPickup && !isKnownLocation(initPickup) ? initPickup : '',
            dropoffLocation: initDropoff ? (isKnownLocation(initDropoff) ? initDropoff : 'Otro') : '', // Supabase column is dropoff_location
            customDropoffLocation: initDropoff && !isKnownLocation(initDropoff) ? initDropoff : '',
            vehicleId: initialData?.vehicleId || '', // Supabase column is vehicleId
            status: initialData?.status || 'pending',
            totalPriceOverride: initialData?.totalPrice || undefined,
        }
    });

    const watchVehicleId = watch('vehicleId');
    const watchStartDate = watch('startDate');
    const watchEndDate = watch('endDate');
    const watchPriceOverride = watch('totalPriceOverride');
    const watchPickup = watch('pickupLocation');
    const watchDropoff = watch('dropoffLocation');

    // Calculations
    const selectedVehicle = vehicles.find(v => v.id === watchVehicleId);
    const days = calculateDays(watchStartDate, watchEndDate);

    const vehicleTotal = selectedVehicle ? selectedVehicle.pricePerDay * days : 0;
    const servicesTotal = selectedServices.reduce((sum, s) => {
        if (s.isIncluded) return sum; // Free
        const count = s.id === 'silla-bebe' ? (s.quantity || 1) : 1;
        const price = s.pricePerDay || s.price_per_day || s.price || 0;
        return sum + (price * days * count);
    }, 0);

    // Si admin escribe un override lo respetamos, si no calculamos
    const calculatedTotal = vehicleTotal + servicesTotal;
    const isOverrideActive = typeof watchPriceOverride === 'number' && !Number.isNaN(watchPriceOverride);
    const currentTotal = isOverrideActive ? watchPriceOverride : calculatedTotal;

    const toggleService = (service: any) => {
        let updatedServices = [];
        if (selectedServices.find(s => s.id === service.id)) {
            updatedServices = selectedServices.filter(s => s.id !== service.id);
        } else {
            updatedServices = [...selectedServices, service];
        }

        setSelectedServices(updatedServices);

        // Reset manual override override to explicitly show calculated total
        if (isOverrideActive) {
            setValue('totalPriceOverride', '' as any);
        }
    };

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);

        const finalPickup = data.pickupLocation === 'Otro' ? data.customPickupLocation : data.pickupLocation;
        const finalDropoff = data.dropoffLocation === 'Otro' ? data.customDropoffLocation : data.dropoffLocation;

        const payload = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            dni: data.dni,
            startDate: data.startDate,
            endDate: data.endDate,
            pickupLocation: finalPickup,
            dropoff_location: finalDropoff,
            vehicle_id: data.vehicleId,
            status: data.status,
            totalDays: days,
            subtotal: calculatedTotal,
            servicesTotal: servicesTotal,
            totalPrice: Number.isNaN(currentTotal) ? calculatedTotal : currentTotal,
            additionalServices: selectedServices.map(s => ({
                id: s.id,
                name: s.name,
                isIncluded: s.isIncluded,
                quantity: s.quantity || 1,
                pricePerDay: s.pricePerDay || s.price_per_day || s.price || 0,
                price: s.pricePerDay || s.price_per_day || s.price || 0 // Agregado fallback precio general
            }))
        };

        const result = await action(payload);

        if (result.success) {
            toast.success(initialData ? 'Reserva actualizada' : 'Reserva creada exitosamente');
            router.push('/admin/bookings');
            router.refresh();
        } else {
            toast.error(result.error || 'Ocurrió un error inesperado');
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
            {/* 1. Cliente */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <User className="text-primary" size={20} />
                    Datos del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                        <input
                            {...register('fullName')}
                            className="input-dark w-full"
                            placeholder="Ej. Juan Pérez"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DNI / Pasaporte</label>
                        <input
                            {...register('dni')}
                            className="input-dark w-full"
                            placeholder="Documento de identidad"
                        />
                        {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                        <input
                            {...register('phone')}
                            type="tel"
                            className="input-dark w-full"
                            placeholder="+51 987 654 321"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Opcional)</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="input-dark w-full"
                            placeholder="correo@ejemplo.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>
            </div>

            {/* 2. Fechas y Ubicaciones */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="text-primary" size={20} />
                    Fechas y Ubicación ({days} días)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de Inicio</label>
                        <input
                            type="date"
                            {...register('startDate')}
                            className="input-dark w-full"
                        />
                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de Fin</label>
                        <input
                            type="date"
                            {...register('endDate')}
                            className="input-dark w-full"
                        />
                        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de Entrega</label>
                        <select
                            {...register('pickupLocation')}
                            onChange={(e) => {
                                register('pickupLocation').onChange(e);
                                if (e.target.value === 'Otro') {
                                    setValue('customPickupLocation', '');
                                }
                            }}
                            className="input-dark w-full"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Piura">Piura</option>
                            <option value="Talara">Talara</option>
                            <option value="Tumbes">Tumbes</option>
                            <option value="Otro">Otro (Especificar)</option>
                        </select>
                        {watchPickup === 'Otro' && (
                            <input
                                {...register('customPickupLocation')}
                                placeholder="Ingresa un lugar diferente"
                                className="input-dark w-full mt-2"
                            />
                        )}
                        {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar de Devolución</label>
                        <select
                            {...register('dropoffLocation')}
                            onChange={(e) => {
                                register('dropoffLocation').onChange(e);
                                if (e.target.value === 'Otro') {
                                    setValue('customDropoffLocation', '');
                                }
                            }}
                            className="input-dark w-full"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Piura">Piura</option>
                            <option value="Talara">Talara</option>
                            <option value="Tumbes">Tumbes</option>
                            <option value="Otro">Otro (Especificar)</option>
                        </select>
                        {watchDropoff === 'Otro' && (
                            <input
                                {...register('customDropoffLocation')}
                                placeholder="Ingresa un lugar diferente"
                                className="input-dark w-full mt-2"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lateral Izquierdo: Vehículo y Estado */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 3. Vehículo */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vehículo Asignado</h3>

                        <select
                            {...register('vehicleId')}
                            className="input-dark w-full text-base py-3"
                        >
                            <option value="">-- Seleccionar un auto del inventario --</option>
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.name} ({v.brand} - {v.year}) - {formatCurrency(v.pricePerDay)}/día
                                </option>
                            ))}
                        </select>
                        {errors.vehicleId && <p className="text-red-500 text-xs mt-1">{errors.vehicleId.message}</p>}

                        {/* Services Grid */}
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Servicios Extras Añadidos</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {availableServices.map(svc => {
                                    const isSelected = selectedServices.some(s => s.id === svc.id);
                                    return (
                                        <button
                                            key={svc.id}
                                            type="button"
                                            onClick={() => toggleService(svc)}
                                            className={`p-3 rounded-xl border text-left text-sm transition-all flex justify-between items-center ${isSelected
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            <span className="truncate">{svc.name}</span>
                                            {isSelected && <span>✓</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lateral Derecho: Resumen y Guardar */}
                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-dark-700 pb-3">Resumen Económico</h3>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Vehículo ({days} días)</span>
                                <span>{formatCurrency(vehicleTotal)}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Servicios Extras</span>
                                    <span>{formatCurrency(servicesTotal)}</span>
                                </div>
                                {selectedServices.length > 0 && (
                                    <div className="pl-3 border-l-2 border-gray-100 dark:border-dark-700 space-y-1">
                                        {selectedServices.map(s => {
                                            const count = s.id === 'silla-bebe' ? (s.quantity || 1) : 1;
                                            const price = s.pricePerDay || s.price_per_day || s.price || 0;
                                            const sTotal = s.isIncluded ? 0 : price * days * count;

                                            return (
                                                <div key={s.id} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <span>{s.name} {count > 1 ? `(x${count})` : ''}</span>
                                                    <span>{s.isIncluded ? 'Incluido' : formatCurrency(sTotal)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="pt-3 border-t border-gray-200 dark:border-dark-600 flex justify-between items-center font-bold text-lg text-gray-900 dark:text-white">
                                <span>Total Calculado</span>
                                <span>{formatCurrency(calculatedTotal)}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Monto Final Manual</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('totalPriceOverride', { valueAsNumber: true })}
                                className="input-dark w-full font-bold text-lg text-primary"
                                placeholder={`S/ ${calculatedTotal}`}
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Si insertas un número, ignorará el total calculado.</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Estado de la Reserva</label>
                            <select
                                {...register('status')}
                                className="input-dark w-full"
                            >
                                <option value="pending">Pendiente (Sin pagar)</option>
                                <option value="confirmed">Confirmada (Adelanto Pagado)</option>
                                <option value="completed">Completada (Finalizada)</option>
                                <option value="cancelled">Cancelada</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full flex justify-center items-center gap-2 py-3"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {initialData ? 'Guardar Cambios' : 'Registrar Reserva'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
