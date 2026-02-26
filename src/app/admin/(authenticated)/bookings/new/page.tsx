import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import AdminBookingForm from '../AdminBookingForm';
import { createBookingAction } from '../actions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Nueva Reserva | Nevado Admin',
};

// Opt out of cache
export const dynamic = 'force-dynamic';

export default async function NewBookingPage() {
    const supabase = await createClient();

    // Fetch vehicles and active services
    const [vehiclesResponse, servicesResponse] = await Promise.all([
        supabase.from('vehicles').select('*').order('name'),
        supabase.from('additional_services').select('*').eq('is_active', true).order('name')
    ]);

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <Link
                    href="/admin/bookings"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Reserva Manual</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Registra aquí un alquiler por teléfono, redes o en agencia.</p>
                </div>
            </div>

            <AdminBookingForm
                vehicles={vehiclesResponse.data || []}
                availableServices={servicesResponse.data || []}
                action={createBookingAction}
            />
        </div>
    );
}
