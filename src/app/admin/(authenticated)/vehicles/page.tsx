import { createClient } from '@/utils/supabase/server';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { Car, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Pagination from '@/components/admin/Pagination';
import Link from 'next/link';
import VehicleActions from './VehicleActions';
import TableSearch from '@/components/admin/TableSearch';
import TableSelectFilter from '@/components/admin/TableSelectFilter';
import TableClearFilters from '@/components/admin/TableClearFilters';
import { VEHICLE_TYPES } from '@/constants/vehicleTypes';

export const metadata: Metadata = {
    title: 'Gestión de Flota | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminVehiclesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; status?: string; category?: string; }>;
}) {
    const supabase = await createClient();
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const searchQuery = resolvedSearchParams.q || '';
    const statusFilter = resolvedSearchParams.status || '';
    const categoryFilter = resolvedSearchParams.category || '';
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('vehicles')
        .select('*', { count: 'exact' });

    if (searchQuery) {
        // Since Supabase JS `.or` might overwrite or not behave well with multiple words across different columns,
        // we can cast the whole row to text and search that.
        // PostgREST supports passing a single `.textSearch()` but that requires a tsvector column.
        // A simple trick for multi-column search is just searching each term across a concatenated list or using individual `.like`
        let terms = searchQuery.split(' ').filter(t => t.trim().length > 0);
        let orStrings = terms.map(term => `name.ilike.%${term}%,brand.ilike.%${term}%`);

        // Apply them sequentially. PostgREST correctly handles multiple 'or=' query params as AND
        orStrings.forEach(orStr => {
            query = query.or(orStr);
        });
    }

    if (statusFilter) {
        if (statusFilter === 'available') query = query.eq('available', true);
        if (statusFilter === 'unavailable') query = query.eq('available', false);
    }

    if (categoryFilter) {
        query = query.eq('type', categoryFilter);
    }

    const { data: vehicles, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    const totalPages = count ? Math.ceil(count / limit) : 0;

    if (error) {
        console.error('Error fetching vehicles:', error);
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flota de Vehículos</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona el catálogo, precios y disponibilidad.</p>
                </div>
                <div>
                    <Link
                        href="/admin/vehicles/new"
                        className="btn-primary flex items-center justify-center gap-2 py-2 px-5 text-sm whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Añadir Vehículo
                    </Link>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-800/50 p-3 rounded-xl border border-gray-100 dark:border-dark-700 flex flex-col lg:flex-row gap-3 items-end lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <TableSelectFilter
                        paramName="status"
                        defaultLabel="Cualquier Estado"
                        options={[
                            { value: 'available', label: 'Disponible' },
                            { value: 'unavailable', label: 'No disponible' },
                        ]}
                    />
                    <TableSelectFilter
                        paramName="category"
                        defaultLabel="Todas las Categorías"
                        options={VEHICLE_TYPES.map(t => ({ value: t.value, label: t.label }))}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto items-center">
                    <TableSearch placeholder="Buscar vehículo o marca..." />
                    <TableClearFilters />
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehículo</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarifa Diaria</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-center">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                            {vehicles?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                        No hay vehículos registrados en la flota.
                                    </td>
                                </tr>
                            )}
                            {vehicles?.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-700/50 transition-colors">
                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-600 flex items-center justify-center shrink-0">
                                                <Car size={20} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white">{vehicle.name}</div>
                                                <div className="text-sm text-gray-500">{vehicle.brand} · {vehicle.year}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-gray-200">
                                            {vehicle.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(vehicle.pricePerDay)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">Oculto al público</div>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${vehicle.available
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {vehicle.available ? 'Disponible' : 'No disponible'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right">
                                        <VehicleActions vehicleId={vehicle.id} isAvailable={vehicle.available} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <Pagination currentPage={page} totalPages={totalPages} />
                )}
            </div>
        </div>
    );
}
