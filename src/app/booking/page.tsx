import { Suspense } from 'react';
import BookingClient from './BookingClient';
import { getAdditionalServices } from '@/lib/data/services';

export const dynamic = 'force-dynamic';

export default async function BookingPage() {
    const availableServices = await getAdditionalServices();

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-dark pt-32 flex justify-center items-start">
                <span className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full" />
            </div>
        }>
            <BookingClient availableServices={availableServices} />
        </Suspense>
    );
}
