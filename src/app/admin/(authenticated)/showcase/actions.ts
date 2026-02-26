'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateShowcase(formData: FormData) {
    const supabase = await createClient();

    const imageFile = formData.get('image') as File | null;

    // Base payload
    const payload: any = {
        badge_text: formData.get('badge_text') as string,
        title_line1: formData.get('title_line1') as string,
        title_line2: formData.get('title_line2') as string,
        description: formData.get('description') as string,
        spec1_value: formData.get('spec1_value') as string,
        spec1_label: formData.get('spec1_label') as string,
        spec2_value: formData.get('spec2_value') as string,
        spec2_label: formData.get('spec2_label') as string,
        spec3_value: formData.get('spec3_value') as string,
        spec3_label: formData.get('spec3_label') as string,
        spec1_icon: formData.get('spec1_icon') as string,
        spec2_icon: formData.get('spec2_icon') as string,
        spec3_icon: formData.get('spec3_icon') as string,
        vehicle_slug: formData.get('vehicle_slug') as string,
        updated_at: new Date().toISOString(),
    };

    // Upload image only if a new one is provided
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `showcase-${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('vehicles')
            .upload(filePath, imageFile);

        if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from('vehicles').getPublicUrl(filePath);
            payload.image_url = publicUrlData.publicUrl;
        } else {
            return { error: `Error subiendo la imagen: ${uploadError.message}` };
        }
    }

    const { error } = await supabase
        .from('showcase_settings')
        .update(payload)
        .eq('id', 1);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/showcase');

    return { success: true };
}
