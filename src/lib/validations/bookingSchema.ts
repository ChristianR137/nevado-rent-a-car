import { z } from 'zod';

export const bookingSchema = z.object({
    fullName: z
        .string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    dni: z
        .string()
        .min(8, 'El DNI debe tener 8 dígitos')
        .max(12, 'DNI/CE no puede exceder 12 caracteres')
        .regex(/^\d+$/, 'El DNI debe contener solo números'),
    phone: z
        .string()
        .min(9, 'El teléfono debe tener al menos 9 dígitos')
        .regex(/^[\d\s\+\-]+$/, 'Número de teléfono inválido'),
    email: z.string().email('Correo electrónico inválido'),
    pickupLocation: z.string().min(1, 'Selecciona un lugar de entrega'),
    pickupDetail: z.string().max(20, 'Máximo 20 caracteres').optional(),
    dropoffLocation: z.string().min(1, 'Selecciona un lugar de devolución'),
    dropoffDetail: z.string().max(20, 'Máximo 20 caracteres').optional(),
    startDate: z.string().min(1, 'Selecciona la fecha de inicio'),
    endDate: z.string().min(1, 'Selecciona la fecha de fin'),
}).refine(
    (data) => {
        if (data.startDate && data.endDate) {
            return new Date(data.endDate) > new Date(data.startDate);
        }
        return true;
    },
    {
        message: 'La fecha de fin debe ser posterior a la fecha de inicio',
        path: ['endDate'],
    }
);

export type BookingFormSchema = z.infer<typeof bookingSchema>;
