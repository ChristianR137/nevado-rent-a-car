'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toggleVehicleVisibility, deleteVehicle } from './actions';
import toast from 'react-hot-toast';

interface VehicleActionsProps {
    vehicleId: string;
    isAvailable: boolean;
}

export default function VehicleActions({ vehicleId, isAvailable }: VehicleActionsProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleToggleVisibility = async () => {
        setIsPending(true);
        try {
            const result = await toggleVehicleVisibility(vehicleId, isAvailable);
            if (result.error) throw new Error(result.error);
            toast.success(isAvailable ? 'Vehículo ocultado del público' : 'Vehículo visible al público');
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar visibilidad');
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar permanentemente este vehículo? Esta acción no se puede deshacer.');
        if (!confirmDelete) return;

        setIsPending(true);
        try {
            const result = await deleteVehicle(vehicleId);
            if (result.error) throw new Error(result.error);
            toast.success('Vehículo eliminado permanentemente');
        } catch (error: any) {
            toast.error(error.message || 'Error al eliminar vehículo');
            setIsPending(false);
        }
    };

    const handleEdit = () => {
        router.push(`/admin/vehicles/${vehicleId}/edit`);
    };

    return (
        <div className="flex justify-end gap-2">
            <button
                onClick={handleToggleVisibility}
                disabled={isPending}
                title={isAvailable ? "Ocultar vehículo" : "Mostrar vehículo"}
                className={`p-2 transition-colors rounded-lg ${isAvailable ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10' : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10'}`}
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : (
                    isAvailable ? <Eye size={16} /> : <EyeOff size={16} />
                )}
            </button>
            <button
                onClick={handleEdit}
                disabled={isPending}
                title="Editar vehículo"
                className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/10 rounded-lg"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={handleDelete}
                disabled={isPending}
                title="Eliminar vehículo"
                className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
