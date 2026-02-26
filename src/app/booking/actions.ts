'use server';

import { createClient } from '@/utils/supabase/server';

export async function submitBooking(data: any) {
    const supabase = await createClient();

    // 1. Fetch the vehicle's actual price from the database for security
    const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('pricePerDay')
        .eq('id', data.vehicleId)
        .single();

    if (vehicleError || !vehicle) {
        throw new Error('Vehicle not found');
    }

    // 2. Calculate true totalDays and prices on the server
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const msDiff = Math.abs(end.getTime() - start.getTime());
    let totalDays = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    if (totalDays === 0) totalDays = 1; // Minimum 1 day

    const subtotal = vehicle.pricePerDay * totalDays;

    // 3. Calculate services total (relying on the payload structure for now)
    const servicesTotal = data.additionalServices.reduce((sum: number, service: any) => {
        if (service.isIncluded) return sum;
        return sum + ((service.pricePerDay || 0) * totalDays);
    }, 0);

    const totalPrice = subtotal + servicesTotal;

    // 4. Construct DB Payload
    const bookingPayload = {
        vehicleId: data.vehicleId,
        fullName: data.fullName,
        dni: data.dni,
        phone: data.phone,
        email: data.email,
        pickupLocation: data.pickupLocation,
        dropoff_location: data.dropoffLocation,
        startDate: data.startDate,
        endDate: data.endDate,
        totalDays,
        additionalServices: data.additionalServices,
        subtotal,
        servicesTotal,
        totalPrice,
        status: 'pending'
    };

    // 5. Insert to Supabase
    const { error } = await supabase.from('bookings').insert(bookingPayload);

    if (error) {
        console.error('Supabase Insert Error:', error);
        throw new Error(error.message);
    }

    return { success: true };
}
