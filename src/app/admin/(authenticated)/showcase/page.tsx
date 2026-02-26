import { createClient } from '@/utils/supabase/server';
import ShowcaseForm from './ShowcaseForm';
import { LayoutDashboard } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Banner Principal | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminShowcasePage() {
    const supabase = await createClient();

    const { data: showcase, error } = await supabase
        .from('showcase_settings')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching showcase settings:', error);
    }

    const { data: vehicles } = await supabase
        .from('vehicles')
        .select('id, name, slug')
        .eq('available', true)
        .order('name');

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Banner Principal
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Modifica los textos, estadísticas y la imagen de fondo que aparecen en la sección inicial de tu sitio web para captar la atención de tus clientes.
                    </p>
                </div>
            </div>

            <ShowcaseForm key={showcase?.updated_at || 'new'} initialData={showcase || {}} vehicles={vehicles || []} />
        </div>
    );
}
