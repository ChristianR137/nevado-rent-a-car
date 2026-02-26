import { createClient } from '@/utils/supabase/server';
import { CalendarDays, Car, Users, Clock, CheckCircle, Plus, FileText, Settings, ArrowRight, DollarSign, Activity, PieChart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Dashboard | Nevado Admin',
};

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // 1. Get total vehicles and available vehicles
    const { data: allVehicles } = await supabase
        .from('vehicles')
        .select('id, available');

    const totalVehicles = allVehicles?.length || 0;
    const unavailableVehicles = allVehicles?.filter(v => !v.available).length || 0;
    const occupancyRate = totalVehicles > 0 ? Math.round((unavailableVehicles / totalVehicles) * 100) : 0;

    // 2. Get all bookings to calculate stats
    const { data: allBookings } = await supabase
        .from('bookings')
        .select('id, status, totalPrice, created_at, vehicles(name)');

    // Compute basic stats
    const pendingBookings = allBookings?.filter(b => b.status === 'pending').length || 0;
    const completedBookings = allBookings?.filter(b => b.status === 'completed').length || 0;
    const confirmedBookings = allBookings?.filter(b => b.status === 'confirmed').length || 0;
    const cancelledBookings = allBookings?.filter(b => b.status === 'cancelled').length || 0;

    // Calculate total revenue from confirmed and completed bookings
    const totalRevenue = allBookings?.reduce((sum, b) => {
        if (b.status === 'completed' || b.status === 'confirmed') {
            return sum + (Number(b.totalPrice) || 0);
        }
        return sum;
    }, 0) || 0;

    // 3. Get recent bookings for activity feed (sort descending by date)
    const recentBookings = [...(allBookings || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Control</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Resumen de las actividades comerciales.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-green-50 dark:text-dark-700/50 group-hover:scale-110 transition-transform duration-500">
                        <DollarSign size={100} />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                            <DollarSign size={24} />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(totalRevenue)}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Ingresos Proyectados</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-orange-50 dark:text-dark-700/50 group-hover:scale-110 transition-transform duration-500">
                        <CalendarDays size={100} />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                            <CalendarDays size={24} />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{pendingBookings}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Reservas Pendientes</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-blue-50 dark:text-dark-700/50 group-hover:scale-110 transition-transform duration-500">
                        <Car size={100} />
                    </div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Car size={24} />
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-full">
                                {occupancyRate}% Ocupación
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalVehicles}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Vehículos en Flota</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-purple-50 dark:text-dark-700/50 group-hover:scale-110 transition-transform duration-500">
                        <Users size={100} />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                            <Users size={24} />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{completedBookings}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Clientes Atendidos</p>
                    </div>
                </div>
            </div>

            {/* Dashboard Middle Section: Distribution & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                {/* Status Distribution */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-white font-bold text-lg">
                        <PieChart size={20} className="text-indigo-500" />
                        Afluencia de Reservas
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Pendientes</span>
                                <span className="text-orange-600 font-bold">{pendingBookings}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${allBookings?.length ? (pendingBookings / allBookings.length) * 100 : 0}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Confirmadas</span>
                                <span className="text-green-600 font-bold">{confirmedBookings}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${allBookings?.length ? (confirmedBookings / allBookings.length) * 100 : 0}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Completadas</span>
                                <span className="text-blue-600 font-bold">{completedBookings}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${allBookings?.length ? (completedBookings / allBookings.length) * 100 : 0}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Canceladas</span>
                                <span className="text-red-600 font-bold">{cancelledBookings}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${allBookings?.length ? (cancelledBookings / allBookings.length) * 100 : 0}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings (takes 2 columns) */}
                <div className="lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Últimas Reservas</h2>
                        <Link href="/admin/bookings" className="text-sm font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 transition-colors">
                            Ver todas <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="flex-1 space-y-4">
                        {!recentBookings || recentBookings.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-8">
                                <FileText size={40} className="text-gray-200 dark:text-dark-600 mb-3" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Aún no hay reservas registradas.</p>
                            </div>
                        ) : (
                            recentBookings.map((booking: any) => (
                                <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${booking.status === 'pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' :
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' :
                                                booking.status === 'completed' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' :
                                                    'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                                            }`}>
                                            {booking.status === 'pending' ? <Clock size={14} /> :
                                                booking.status === 'confirmed' || booking.status === 'completed' ? <CheckCircle size={14} /> :
                                                    <FileText size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{booking.fullName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{booking.vehicles?.name || 'Vehículo'}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-600 px-2 py-1 rounded-md">
                                        {new Date(booking.created_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 mt-2">
                <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-white font-bold text-lg">
                        <Activity size={20} className="text-primary" />
                        Acciones Rápidas
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/admin/bookings/new" className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-dark-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-sm transition-all bg-gray-50 dark:bg-dark-800/50">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Nueva Reserva</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Manual</p>
                            </div>
                        </Link>

                        <Link href="/admin/vehicles/new" className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-dark-700 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-sm transition-all bg-gray-50 dark:bg-dark-800/50">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Car size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Añadir Vehículo</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Flota</p>
                            </div>
                        </Link>

                        <Link href="/admin/services" className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-dark-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-sm transition-all bg-gray-50 dark:bg-dark-800/50">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Settings size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Servicios Extra</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Configuración</p>
                            </div>
                        </Link>

                        <Link href="/admin/showcase" className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-dark-700 hover:border-pink-500/50 dark:hover:border-pink-500/50 hover:shadow-sm transition-all bg-gray-50 dark:bg-dark-800/50">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <CalendarDays size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Destacado</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Promoción</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
