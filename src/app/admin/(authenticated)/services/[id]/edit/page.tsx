import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, Briefcase } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ServiceForm from '../../ServiceForm';

export const metadata: Metadata = {
    title: 'Editar Servicio | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();

    const { id } = await params;

    const { data: service, error } = await supabase
        .from('additional_services')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !service) {
        notFound();
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <Link
                    href="/admin/services"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Briefcase className="text-primary" />
                        Editar Servicio
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Modifica los detalles del servicio extra ID: <span className="font-mono bg-gray-100 dark:bg-dark-700 px-1 rounded text-primary">{service.id}</span></p>
                </div>
            </div>

            <ServiceForm initialData={service} />
        </div>
    );
}
