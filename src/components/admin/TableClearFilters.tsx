'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export default function TableClearFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Check if there are any active filters (ignoring 'page')
    const hasFilters = Array.from(searchParams.keys()).some(
        key => key !== 'page'
    );

    if (!hasFilters) return null;

    const clearFilters = () => {
        router.push(pathname);
    };

    return (
        <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 h-10 text-sm font-medium text-gray-500 hover:text-red-600 bg-white hover:bg-red-50 dark:bg-dark-800 dark:hover:bg-red-900/30 rounded-xl transition-colors border border-gray-200 dark:border-dark-600 hover:border-red-200 dark:hover:border-red-800 w-full sm:w-auto shrink-0 justify-center"
            title="Limpiar todos los filtros"
        >
            <X size={16} />
            Limpiar Filtros
        </button>
    );
}
