'use server'

import { createClient } from '@/utils/supabase/server';
import { Vehicle } from '@/types/vehicle';

export async function getVehicles(): Promise<Vehicle[]> {
    const supabase = await createClient();
    const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

    return vehicles as unknown as Vehicle[] || [];
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
    const supabase = await createClient();
    const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*')
        .eq('isPopular', true)
        .eq('available', true)
        .order('created_at', { ascending: false })
        .limit(4);

    return vehicles as unknown as Vehicle[] || [];
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
    const supabase = await createClient();
    const { data: vehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!vehicle) return undefined;
    return vehicle as unknown as Vehicle;
}

export async function getRelatedVehicles(vehicleId: string, type: string): Promise<Vehicle[]> {
    const supabase = await createClient();
    const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*')
        .neq('id', vehicleId)
        .eq('type', type)
        .eq('available', true)
        .limit(3);

    return vehicles as unknown as Vehicle[] || [];
}
