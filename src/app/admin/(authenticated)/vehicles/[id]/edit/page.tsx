import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import EditVehicleForm from './EditVehicleForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Editar Vehículo | Nevado Admin',
};

// Use dynamic rendering since we depend on the [id] param and data that might change
export const dynamic = 'force-dynamic';

export default async function EditVehiclePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: vehicle, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !vehicle) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <Link
                    href="/admin/vehicles"
                    className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Vehículo</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Modifica los detalles de {vehicle.name}.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm p-6 md:p-8">
                <EditVehicleForm initialData={vehicle} />
            </div>
        </div>
    );
}
