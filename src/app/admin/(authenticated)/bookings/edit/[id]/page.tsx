import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import AdminBookingForm from '../../AdminBookingForm';
import { updateBookingAction } from '../../actions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Editar Reserva | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const resolvedParams = await params;

    // Fetch booking, vehicles and active services
    const [bookingResponse, vehiclesResponse, servicesResponse] = await Promise.all([
        supabase.from('bookings').select('*').eq('id', resolvedParams.id).single(),
        supabase.from('vehicles').select('*').order('name'),
        supabase.from('additional_services').select('*').eq('is_active', true).order('name')
    ]);

    if (bookingResponse.error || !bookingResponse.data) {
        notFound();
    }

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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Reserva</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Estás modificando la reserva de: <strong className="text-gray-700 dark:text-gray-300">{bookingResponse.data.fullName}</strong>
                    </p>
                </div>
            </div>

            <AdminBookingForm
                initialData={bookingResponse.data}
                vehicles={vehiclesResponse.data || []}
                availableServices={servicesResponse.data || []}
                action={updateBookingAction.bind(null, bookingResponse.data.id)}
            />
        </div>
    );
}
