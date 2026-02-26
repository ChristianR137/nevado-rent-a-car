'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Car, CalendarDays, LogOut, Star, Briefcase, ChevronLeft, ChevronRight, Menu, FileText } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Reservas', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Vehículos', href: '/admin/vehicles', icon: Car },
    { name: 'Populares', href: '/admin/featured', icon: Star },
    { name: 'Banner Principal', href: '/admin/showcase', icon: LayoutDashboard },
    { name: 'Servicios', href: '/admin/services', icon: Briefcase },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Persist sidebar state
    useEffect(() => {
        const savedState = localStorage.getItem('nevadoAdminSidebarCollapsed');
        if (savedState) {
            setIsCollapsed(savedState === 'true');
        }
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('nevadoAdminSidebarCollapsed', String(newState));
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <>
            {/* Mobile menu toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`
                fixed md:relative flex flex-col h-full bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 shrink-0 transition-all duration-300 z-50
                ${isCollapsed ? 'w-20' : 'w-64'}
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className={`flex items-center p-6 border-b border-gray-200 dark:border-dark-700 relative h-20 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-primary-sm group-hover:shadow-primary transition-shadow duration-200 shrink-0 bg-white">
                                <Image src="/logonevado.jpg" alt="Nevado Logo" width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-serif font-bold text-sm leading-none block">
                                    Nevado Perú
                                </span>
                                <span className="text-primary text-[10px] font-medium tracking-wider uppercase leading-none mt-1">
                                    Admin Panel
                                </span>
                            </div>
                        </Link>
                    )}

                    <button
                        onClick={toggleCollapse}
                        className={`
                            hidden md:flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-full transition-colors text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-dark-600
                            ${isCollapsed ? 'absolute -right-3 top-6 w-6 h-6' : 'w-8 h-8 shrink-0'}
                        `}
                        title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
                    >
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={18} />}
                    </button>
                    {isCollapsed && (
                        <Link href="/admin/dashboard" className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shadow-primary-sm bg-white">
                            <Image src="/logonevado.jpg" alt="Nevado" width={40} height={40} className="object-cover w-full h-full" />
                        </Link>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={isCollapsed ? item.name : undefined}
                                className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap overflow-hidden
                                    ${isActive
                                        ? 'bg-primary text-white shadow-primary-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
                                    }
                                    ${isCollapsed ? 'justify-center gap-0' : 'justify-start gap-3'}
                                `}
                            >
                                <Icon size={20} className="shrink-0" />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-dark-700 pb-safe">
                    <button
                        onClick={handleSignOut}
                        title={isCollapsed ? "Cerrar Sesión" : undefined}
                        className={`flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium transition-colors whitespace-nowrap overflow-hidden w-full
                            ${isCollapsed ? 'justify-center gap-0' : 'justify-start gap-3'}
                        `}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!isCollapsed && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
