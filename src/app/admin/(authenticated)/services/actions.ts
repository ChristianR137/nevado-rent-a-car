'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleServiceAvailability(id: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('additional_services')
        .update({ is_active: !currentStatus })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/', 'layout');
    return { success: true };
}

export async function toggleServicePopularity(id: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('additional_services')
        .update({ is_popular: !currentStatus })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/', 'layout');
    return { success: true };
}

export async function deleteService(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('additional_services')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/', 'layout');
    return { success: true };
}

export async function createService(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;

    // Auto-generate ID (slug) from name
    const id = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-z0-9]+/g, '-')     // replace non-alphanumeric with dash
        .replace(/^-+|-+$/g, '');        // remove leading/trailing dashes

    const payload = {
        id,
        name,
        description: formData.get('description') as string,
        price_per_day: parseFloat(formData.get('price_per_day') as string),
        icon: formData.get('icon') as string,
        is_popular: formData.get('is_popular') === 'on',
        is_active: formData.get('is_active') === 'on',
        is_included: formData.get('is_included') === 'on',
    };

    const { error } = await supabase
        .from('additional_services')
        .insert([payload]);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/', 'layout');
    return { success: true };
}

export async function updateService(id: string, formData: FormData) {
    const supabase = await createClient();

    const payload = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price_per_day: parseFloat(formData.get('price_per_day') as string),
        icon: formData.get('icon') as string,
        is_popular: formData.get('is_popular') === 'on',
        is_active: formData.get('is_active') === 'on',
        is_included: formData.get('is_included') === 'on',
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('additional_services')
        .update(payload)
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/', 'layout');
    return { success: true };
}
