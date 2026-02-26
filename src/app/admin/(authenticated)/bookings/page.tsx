import { createClient } from '@/utils/supabase/server';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { Calendar, User, Phone, MapPin, CheckCircle, Clock, XCircle, FileText, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import BookingStatusSelect from './BookingStatusSelect';
import BookingActions from './BookingActions';
import Pagination from '@/components/admin/Pagination';
import TableSearch from '@/components/admin/TableSearch';
import TableDateFilter from '@/components/admin/TableDateFilter';
import TableSelectFilter from '@/components/admin/TableSelectFilter';
import TableClearFilters from '@/components/admin/TableClearFilters';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Gestión de Reservas | Nevado Admin',
};

// Next.js Route Cache Opt-Out for real-time dashboard
export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; startDate?: string; endDate?: string; status?: string; }>;
}) {
    const supabase = await createClient();
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const searchQuery = resolvedSearchParams.q || '';
    const startDate = resolvedSearchParams.startDate || '';
    const endDate = resolvedSearchParams.endDate || '';
    const statusFilter = resolvedSearchParams.status || '';
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('bookings')
        .select(`
            *,
            vehicles (
                name,
                brand,
                year,
                pricePerDay
            )
        `, { count: 'exact' });

    if (searchQuery) {
        const terms = searchQuery.split(' ').filter(t => t.trim().length > 0);

        // Find vehicles that match the search query to include them in the bookings search
        let vehicleQuery = supabase.from('vehicles').select('id');
        terms.forEach(term => {
            vehicleQuery = vehicleQuery.or(`name.ilike.%${term}%,brand.ilike.%${term}%`);
        });

        const { data: matchingVehicles } = await vehicleQuery;
        const vehicleIds = matchingVehicles?.map(v => v.id).join(',') || '';

        terms.forEach(term => {
            if (vehicleIds) {
                query = query.or(`fullName.ilike.%${term}%,dni.ilike.%${term}%,email.ilike.%${term}%,vehicleId.in.(${vehicleIds})`);
            } else {
                query = query.or(`fullName.ilike.%${term}%,dni.ilike.%${term}%,email.ilike.%${term}%`);
            }
        });
    }

    if (startDate) {
        query = query.gte('startDate', startDate);
    }

    if (endDate) {
        query = query.lte('endDate', endDate);
    }

    if (statusFilter) {
        query = query.eq('status', statusFilter);
    }

    const { data: bookings, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    const totalPages = count ? Math.ceil(count / limit) : 0;

    if (error) {
        console.error('Error fetching bookings:', error);
    }

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending': return { icon: Clock, className: 'text-orange-600 bg-orange-50 border-orange-200', label: 'Pendiente' };
            case 'confirmed': return { icon: CheckCircle, className: 'text-green-600 bg-green-50 border-green-200', label: 'Confirmada' };
            case 'completed': return { icon: CheckCircle, className: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Completada' };
            case 'cancelled': return { icon: XCircle, className: 'text-red-600 bg-red-50 border-red-200', label: 'Cancelada' };
            default: return { icon: Clock, className: 'text-gray-600 bg-gray-50 border-gray-200', label: status };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-700 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reservas Entrantes</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona los estados de las solicitudes de alquiler.</p>
                </div>
                <div>
                    <Link
                        href="/admin/bookings/new"
                        className="btn-primary flex items-center justify-center gap-2 py-2 px-5 text-sm whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Reserva Manual
                    </Link>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-800/50 p-3 rounded-xl border border-gray-100 dark:border-dark-700 flex flex-col lg:flex-row gap-3 items-end lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <TableDateFilter paramName="startDate" label="Desde" />
                    <TableDateFilter paramName="endDate" label="Hasta" />
                    <TableSelectFilter
                        paramName="status"
                        defaultLabel="Todos los estados"
                        options={[
                            { value: 'pending', label: 'Pendientes' },
                            { value: 'confirmed', label: 'Confirmadas' },
                            { value: 'completed', label: 'Completadas' },
                            { value: 'cancelled', label: 'Canceladas' }
                        ]}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto items-center">
                    <TableSearch placeholder="Buscar cliente o vehículo..." />
                    <TableClearFilters />
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehículo</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Recojo</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Devolución</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Servicios Extra</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monto Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-center">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                            {bookings?.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                        No hay reservas registradas por el momento.
                                    </td>
                                </tr>
                            )}
                            {bookings?.map((booking) => {
                                const config = getStatusConfig(booking.status);
                                const Icon = config.icon;
                                const vehicle = booking.vehicles as any;

                                return (
                                    <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-700/50 transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                <User size={14} className="text-gray-400" />
                                                {booking.fullName}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <Phone size={13} /> {booking.phone}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">DNI/CE: {booking.dni}</div>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {booking.is_manual && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                                                        Creada Manual
                                                    </span>
                                                )}
                                                {booking.is_edited && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                                                        Modificada
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 align-top">
                                            <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                                {vehicle?.name || 'Vehículo desconocido'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{vehicle?.brand} · {vehicle?.year}</div>
                                            {vehicle?.pricePerDay && (
                                                <div className="mt-2 text-xs font-medium text-primary">
                                                    {formatCurrency(vehicle.pricePerDay)} / día
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium mb-1.5">
                                                <Calendar size={14} className="mt-0.5 shrink-0 text-gray-400" />
                                                <span>{booking.startDate}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
                                                <span className="line-clamp-2" title={booking.pickupLocation}>{booking.pickupLocation}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium mb-1.5">
                                                <Calendar size={14} className="mt-0.5 shrink-0 text-gray-400" />
                                                <span>{booking.endDate}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
                                                <span className="line-clamp-2" title={booking.dropoff_location}>{booking.dropoff_location || '—'}</span>
                                            </div>
                                            <div className="mt-3 text-xs px-2 py-0.5 bg-gray-100 dark:bg-dark-600 rounded-md inline-block text-gray-600 dark:text-gray-300">
                                                {booking.totalDays} Día{booking.totalDays !== 1 ? 's' : ''} en total
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 align-top max-w-[200px]">
                                            {(!booking.additionalServices || booking.additionalServices.length === 0) ? (
                                                <span className="text-xs text-gray-400">Sin extras</span>
                                            ) : (
                                                <ul className="space-y-1.5">
                                                    {booking.additionalServices.map((service: any, index: number) => (
                                                        <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start justify-between gap-2 border-b border-gray-100 dark:border-dark-700 pb-1.5 last:border-0 last:pb-0">
                                                            <div className="flex items-start gap-1">
                                                                <span className="text-primary mt-0.5 shrink-0">•</span>
                                                                <span className="line-clamp-1" title={service.name}>{service.name}</span>
                                                            </div>
                                                            <span className="text-gray-500 font-medium whitespace-nowrap">
                                                                {service.isIncluded ? (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                                                        Sin costo
                                                                    </span>
                                                                ) : formatCurrency(service.pricePerDay || service.price || 0)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 align-top">
                                            <div className="font-bold text-gray-900 dark:text-white text-base">
                                                {formatCurrency(booking.totalPrice)}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 align-top text-center w-48">
                                            <BookingStatusSelect bookingId={booking.id} currentStatus={booking.status} />
                                        </td>

                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="flex justify-end">
                                                <BookingActions bookingId={booking.id} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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
