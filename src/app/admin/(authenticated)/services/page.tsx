import { createClient } from '@/utils/supabase/server';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { Briefcase, Plus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceActions from './ServiceActions';
import Pagination from '@/components/admin/Pagination';
import TableSearch from '@/components/admin/TableSearch';
import TableSelectFilter from '@/components/admin/TableSelectFilter';
import TableClearFilters from '@/components/admin/TableClearFilters';

export const metadata: Metadata = {
    title: 'Gestión de Servicios Adicionales | Nevado Admin',
};

export const dynamic = 'force-dynamic';

const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon {...props} />;
};

export default async function AdminServicesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; status?: string; popularity?: string; }>;
}) {
    const supabase = await createClient();
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const searchQuery = resolvedSearchParams.q || '';
    const statusFilter = resolvedSearchParams.status || '';
    const popularityFilter = resolvedSearchParams.popularity || '';
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('additional_services')
        .select('*', { count: 'exact' });

    if (searchQuery) {
        const terms = searchQuery.split(' ').filter(t => t.trim().length > 0);
        terms.forEach(term => {
            query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%`);
        });
    }

    if (statusFilter) {
        if (statusFilter === 'active') query = query.eq('is_active', true);
        if (statusFilter === 'inactive') query = query.eq('is_active', false);
    }

    if (popularityFilter) {
        if (popularityFilter === 'popular') query = query.eq('is_popular', true);
        if (popularityFilter === 'normal') query = query.eq('is_popular', false);
    }

    const { data: services, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    const totalPages = count ? Math.ceil(count / limit) : 0;

    if (error) {
        console.error('Error fetching services:', error);
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Servicios Adicionales
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona los extras que pueden añadir tus clientes al reservar.</p>
                </div>
                <div>
                    <Link
                        href="/admin/services/new"
                        className="btn-primary flex items-center justify-center gap-2 py-2 px-5 text-sm whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Crear Servicio
                    </Link>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-800/50 p-3 rounded-xl border border-gray-100 dark:border-dark-700 flex flex-col lg:flex-row gap-3 items-end lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <TableSelectFilter
                        paramName="status"
                        defaultLabel="Cualquier Estado"
                        options={[
                            { value: 'active', label: 'Activo' },
                            { value: 'inactive', label: 'Inactivo' },
                        ]}
                    />
                    <TableSelectFilter
                        paramName="popularity"
                        defaultLabel="Cualquier Popularidad"
                        options={[
                            { value: 'popular', label: 'Destacados / Populares' },
                            { value: 'normal', label: 'Sin destacar' },
                        ]}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto items-center">
                    <TableSearch placeholder="Buscar servicios..." />
                    <TableClearFilters />
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Servicio</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarifa Diaria</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-center">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                            {(!services || services.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                        No hay servicios registrados.
                                    </td>
                                </tr>
                            )}
                            {services?.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-700/50 transition-colors">
                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-600 flex flex-col items-center justify-center shrink-0 text-primary">
                                                <DynamicIcon name={service.icon || 'HelpCircle'} size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white text-base mb-1">{service.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{service.description}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 align-middle whitespace-nowrap">
                                        <div className="font-bold text-gray-900 dark:text-white flex flex-col gap-1 items-start">
                                            <span>{formatCurrency(service.price_per_day)} <span className="text-xs font-normal text-gray-500">/día</span></span>
                                            {service.is_included && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                                    Sin costo
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 align-middle text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${service.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {service.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                            {service.is_popular && (
                                                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">
                                                    <LucideIcons.Star size={10} fill="currentColor" /> Populares
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex justify-end">
                                            <ServiceActions serviceId={service.id} isActive={service.is_active} isPopular={service.is_popular} />
                                        </div>
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
