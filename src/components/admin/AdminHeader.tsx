import { createClient } from '@/utils/supabase/server';
import { User } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default async function AdminHeader() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Try to get name from metadata, otherwise extract from email or fallback to 'Administrador'
    const name = user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split('@')[0] ||
        'Administrador';

    // Capitalize first letter of name
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const role = 'Administrador Web'; // Assuming all users here are admins

    return (
        <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 h-20 shrink-0 flex items-center justify-end px-4 md:px-8 z-40 relative shadow-sm">
            <div className="flex items-center gap-4 md:gap-6">

                {/* Theme Toggle from Main Layout */}
                <div className="hidden sm:block">
                    <ThemeToggle />
                </div>

                <div className="w-px h-8 bg-gray-200 dark:bg-dark-700 hidden sm:block"></div>

                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {formattedName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {role}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm shrink-0">
                        <User size={20} />
                    </div>
                    {/* Mobile Theme Toggle (optional, right next to avatar) */}
                    <div className="sm:hidden ml-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
