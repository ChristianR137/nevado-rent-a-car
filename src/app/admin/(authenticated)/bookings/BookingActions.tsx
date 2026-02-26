'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteBooking } from './actions';

interface BookingActionsProps {
    bookingId: string;
}

export default function BookingActions({ bookingId }: BookingActionsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.')) return;

        setIsDeleting(true);
        const { success, error } = await deleteBooking(bookingId);

        if (success) {
            toast.success('Reserva eliminada');
            router.refresh();
        } else {
            toast.error(error || 'Error al eliminar');
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => router.push(`/admin/bookings/edit/${bookingId}`)}
                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Editar Reserva"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                title="Eliminar Reserva"
            >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
        </div>
    );
}
