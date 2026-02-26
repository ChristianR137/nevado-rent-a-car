'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateBookingStatus(bookingId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/bookings');
    revalidatePath('/admin/dashboard'); // Also update dashboard stats
    return { success: true };
}

export async function deleteBooking(id: string) {
    try {
        const supabase = await createClient();

        // 1. Verify user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { error: 'No autorizado' };
        }

        // 2. Delete the record
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar reverva:', error);
            return { error: 'Error al eliminar la reserva de la base de datos' };
        }

        revalidatePath('/admin/bookings');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (err: any) {
        return { error: err.message || 'Error inesperado' };
    }
}

export async function createBookingAction(data: any) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: 'No autorizado' };

        const { error } = await supabase.from('bookings').insert([
            {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                dni: data.dni,
                startDate: data.startDate,
                endDate: data.endDate,
                pickupLocation: data.pickupLocation,
                dropoff_location: data.dropoff_location || null,
                vehicleId: data.vehicle_id,
                status: data.status,
                totalDays: data.totalDays,
                subtotal: data.subtotal,
                servicesTotal: data.servicesTotal,
                totalPrice: data.totalPrice,
                additionalServices: data.additionalServices || [],
                is_manual: true,
                is_edited: false
            }
        ]);

        if (error) throw error;

        revalidatePath('/admin/bookings');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (err: any) {
        console.error('Create booking err:', err);
        return { error: err.message || 'Error al guardar la reserva' };
    }
}

export async function updateBookingAction(id: string, data: any) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: 'No autorizado' };

        const { error } = await supabase.from('bookings')
            .update({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                dni: data.dni,
                startDate: data.startDate,
                endDate: data.endDate,
                pickupLocation: data.pickupLocation,
                dropoff_location: data.dropoff_location || null,
                vehicleId: data.vehicle_id,
                status: data.status,
                totalDays: data.totalDays,
                subtotal: data.subtotal,
                servicesTotal: data.servicesTotal,
                totalPrice: data.totalPrice,
                additionalServices: data.additionalServices || [],
                is_edited: true
            })
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/admin/bookings');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (err: any) {
        console.error('Update booking err:', err);
        return { error: err.message || 'Error al actualizar la reserva' };
    }
}
