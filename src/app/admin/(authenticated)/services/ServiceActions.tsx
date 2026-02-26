'use client';

import { useState } from 'react';
import { toggleServiceAvailability, toggleServicePopularity, deleteService } from './actions';
import { Power, PowerOff, Star, Trash2, Edit, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ServiceActions({ serviceId, isActive, isPopular }: { serviceId: string, isActive: boolean, isPopular: boolean }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleToggleActive = async () => {
        setIsPending(true);
        try {
            const result = await toggleServiceAvailability(serviceId, isActive);
            if (result.error) throw new Error(result.error);
            toast.success(isActive ? 'Servicio desactivado' : 'Servicio activado');
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar estatus');
        } finally {
            setIsPending(false);
        }
    };

    const handleTogglePopular = async () => {
        setIsPending(true);
        try {
            const result = await toggleServicePopularity(serviceId, isPopular);
            if (result.error) throw new Error(result.error);
            toast.success(isPopular ? 'Removido de Populares' : 'Añadido a Populares');
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar estatus');
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de eliminar este servicio de forma permanente?')) return;

        setIsPending(true);
        try {
            const result = await deleteService(serviceId);
            if (result.error) throw new Error(result.error);
            toast.success('Servicio eliminado');
        } catch (error: any) {
            toast.error(error.message || 'Error al eliminar');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleTogglePopular}
                disabled={isPending}
                title={isPopular ? "Quitar de Populares" : "Hacer Popular"}
                className={`p-2 transition-colors rounded-lg flex items-center justify-center
                    ${isPopular
                        ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
                    }`}
            >
                {isPending ? <Loader2 size={20} className="animate-spin" /> : (
                    <Star size={20} fill={isPopular ? "currentColor" : "none"} />
                )}
            </button>

            <button
                onClick={handleToggleActive}
                disabled={isPending}
                title={isActive ? "Desactivar" : "Activar"}
                className={`p-2 transition-colors rounded-lg
                    ${isActive
                        ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10'
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10'
                    }`}
            >
                {isPending ? <Loader2 size={20} className="animate-spin" /> : (
                    isActive ? <Power size={20} /> : <PowerOff size={20} />
                )}
            </button>

            <Link
                href={`/admin/services/${serviceId}/edit`}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                title="Editar"
            >
                <Edit size={20} />
            </Link>

            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                title="Eliminar"
            >
                {isPending ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
            </button>
        </div>
    );
}
