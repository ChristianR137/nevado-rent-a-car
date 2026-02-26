'use client';

import { useState } from 'react';
import { updateBookingStatus } from './actions';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingStatusSelect({ bookingId, currentStatus }: { bookingId: string, currentStatus: string }) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        if (newStatus === currentStatus) return;

        setIsUpdating(true);
        try {
            await updateBookingStatus(bookingId, newStatus);
            toast.success('Estado actualizado correctamente');
        } catch (error) {
            toast.error('Error al actualizar estado');
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColors = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
            case 'confirmed': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="relative inline-block w-full min-w-[130px]">
            <select
                disabled={isUpdating}
                value={currentStatus}
                onChange={handleChange}
                className={`appearance-none w-full border font-bold tracking-wide text-[11px] uppercase px-3 py-2 pr-8 rounded-lg outline-none transition-colors cursor-pointer ${getStatusColors(currentStatus)}`}
            >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
            </select>
            {isUpdating ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Loader2 size={14} className="animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </div>
    );
}
