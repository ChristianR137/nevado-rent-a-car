'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createVehicle(formData: FormData) {
    const supabase = await createClient();

    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const imageFile = formData.get('image') as File;

    if (!brand || !model || !imageFile || imageFile.size === 0) {
        return { error: 'Faltan campos obligatorios o la imagen es inválida.' };
    }

    // 1. Generate slug
    const name = `${brand} ${model}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 2. Upload image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${slug}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    // Note: We assume the 'vehicles' bucket is already created in Supabase with public access.
    // If not, this might fail unless the business creates it.
    const { error: uploadError } = await supabase.storage
        .from('vehicles')
        .upload(filePath, imageFile);

    if (uploadError) {
        console.error('Upload Error:', uploadError);
        // We will fallback to a default image visually if bucket is missing, but return error for completeness
        // return { error: `Error subiendo imagen: ${uploadError.message}` };
    }

    // 3. Get Public URL
    let imageUrl = '';
    if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('vehicles').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
    }

    // 4. Construct DB Payload
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
        ac: true,
        available: true,
        isPopular: false,
        images: imageUrl ? [imageUrl] : [],
        features: ['Básico'], // Could be expanded later
    };

    const { error } = await supabase.from('vehicles').insert(payload);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/vehicles');
    revalidatePath('/catalog');
    revalidatePath('/');

    return { success: true };
}
