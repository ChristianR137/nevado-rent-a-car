import { createClient } from '@/utils/supabase/server';
import { AdditionalService } from '@/types/booking';

export async function getAdditionalServices(): Promise<AdditionalService[]> {
    const supabase = await createClient();

    const { data: services, error } = await supabase
        .from('additional_services')
        .select('*')
        .eq('is_active', true)
        .order('price_per_day', { ascending: false });

    if (error) {
        console.error('Error fetching additional services:', error);
        return [];
    }

    return services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        pricePerDay: Number(service.price_per_day),
        icon: service.icon,
        isPopular: service.is_popular,
        isIncluded: service.is_included || false,
    }));
}
