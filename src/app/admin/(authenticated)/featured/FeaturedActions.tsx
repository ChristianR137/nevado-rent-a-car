'use client';

import { useState } from 'react';
import { toggleFeaturedStatus } from './actions';
import { Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeaturedActions({ vehicleId, isPopular, isAvailable }: { vehicleId: string, isPopular: boolean, isAvailable: boolean }) {
    const [isPending, setIsPending] = useState(false);

    const handleToggle = async () => {
        setIsPending(true);
        try {
            const result = await toggleFeaturedStatus(vehicleId, isPopular);
            if (result.error) throw new Error(result.error);
            toast.success(isPopular ? 'Vehículo removido de Populares' : 'Vehículo añadido a Populares');
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar estatus');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending || !isAvailable}
            title={!isAvailable ? "No se puede marcar un vehículo oculto" : (isPopular ? "Quitar de populares" : "Añadir a populares")}
            className={`p-2 transition-colors rounded-lg flex items-center justify-center
                ${!isAvailable
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : isPopular
                        ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
                }`}
        >
            {isPending ? <Loader2 size={24} className="animate-spin" /> : (
                <Star size={24} fill={isPopular && isAvailable ? "currentColor" : "none"} />
            )}
        </button>
    );
}
