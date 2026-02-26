'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleFeaturedStatus(vehicleId: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('vehicles')
        .update({ isPopular: !currentStatus })
        .eq('id', vehicleId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/featured');
    revalidatePath('/admin/vehicles');
    revalidatePath('/catalog');
    revalidatePath('/');

    return { success: true };
}
