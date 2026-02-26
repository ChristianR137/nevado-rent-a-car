import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedVehicles } from '@/lib/data/vehicles';
import VehicleCard from '@/components/catalog/VehicleCard';

export default async function FeaturedVehicles() {
    // Take 3 popular vehicles for a complete row (could be 6 for two rows)
    const featuredList = await getFeaturedVehicles();
    const vehicles = featuredList.slice(0, 3);

    return (
        <section className="section-padding bg-gray-50 dark:bg-dark">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="section-label mb-3 block">Nuestra Flota</span>
                        <h2 className="heading-lg text-gray-900 dark:text-white">
                            Vehículos más{' '}
                            <span className="gradient-text">populares</span>
                        </h2>
                        <p className="text-gray-500 dark:text-text-secondary mt-3 max-w-lg">
                            Los favoritos de nuestros clientes para explorar la región de Piura y disfrutar de las mejores playas del norte.                        </p>
                    </div>
                    <Link
                        href="/catalog"
                        className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all shrink-0"
                    >
                        Ver catálogo completo
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </section>
    );
}
