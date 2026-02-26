'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateVehicle(id: string, formData: FormData) {
    const supabase = await createClient();

    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const imageFile = formData.get('image') as File | null;

    if (!brand || !model) {
        return { error: 'Faltan campos obligatorios.' };
    }

    // 1. Generate slug
    const name = `${brand} ${model}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const payload: any = {
        name,
        slug,
        brand,
        model,
        type: formData.get('type') as string,
        year: parseInt(formData.get('year') as string, 10),
        transmission: formData.get('transmission') as string,
        passengers: parseInt(formData.get('passengers') as string, 10),
        doors: parseInt(formData.get('doors') as string, 10),
        luggage: parseInt(formData.get('luggage') as string, 10),
        fuelType: formData.get('fuelType') as string,
        pricePerDay: parseFloat(formData.get('pricePerDay') as string),
        description: formData.get('description') as string,
    };

    // 2. Upload image to Supabase Storage ONLY IF a new one was provided
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('vehicles')
            .upload(filePath, imageFile);

        if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from('vehicles').getPublicUrl(filePath);
            payload.images = [publicUrlData.publicUrl];
        }
    }

    const { error } = await supabase
        .from('vehicles')
        .update(payload)
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/vehicles');
    revalidatePath('/catalog');
    revalidatePath('/');

    return { success: true };
}
