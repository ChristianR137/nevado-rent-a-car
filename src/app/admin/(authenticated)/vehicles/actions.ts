'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleVehicleVisibility(vehicleId: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('vehicles')
        .update({ available: !currentStatus })
        .eq('id', vehicleId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/vehicles');
    revalidatePath('/catalog');
    revalidatePath('/');

    return { success: true };
}

export async function deleteVehicle(vehicleId: string) {
    const supabase = await createClient();

    // In a real application, you might want to do a "soft delete" or check for active bookings
    // before deleting completely. For now, we will do a hard delete as requested.
    const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/vehicles');
    revalidatePath('/catalog');
    revalidatePath('/');

    return { success: true };
}
