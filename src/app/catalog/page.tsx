import { Suspense } from 'react';
import CatalogContent from './CatalogContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Catálogo de Vehículos',
    description: 'Explora nuestra flota de SUVs, pickups, sedanes y económicos disponibles para alquiler en Piura.',
};

import { getVehicles } from '@/lib/data/vehicles';

export default async function CatalogPage() {
    const initialVehicles = await getVehicles();
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-dark pt-20">
                    <div className="container-custom py-8">
                        <div className="h-10 w-48 bg-dark-700 rounded-xl animate-pulse mb-8" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-dark-800 border border-dark-600 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <CatalogContent initialVehicles={initialVehicles} />
        </Suspense>
    );
}
