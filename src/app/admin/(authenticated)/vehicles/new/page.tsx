import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import VehicleForm from './VehicleForm';

export const metadata: Metadata = {
    title: 'Nuevo Vehículo | Nevado Admin',
};

export default function NewVehiclePage() {
    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <Link
                    href="/admin/vehicles"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-dark-700 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Añadir Nuevo Vehículo</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Ingresa los detalles del nuevo auto para la flota.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm p-6 md:p-8">
                <VehicleForm />
            </div>
        </div>
    );
}
