'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

export default function TableSearch({ placeholder = 'Buscar...' }: { placeholder?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Maintain internal state for immediate input feedback
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

    // Sync internal state with URL changes (e.g., when Clear Filters is clicked)
    useEffect(() => {
        const queryTerm = searchParams.get('q') || '';
        if (queryTerm !== searchTerm) {
            setSearchTerm(queryTerm);
        }
    }, [searchParams]);

    // Debounce logic to update URL query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentQ = searchParams.get('q') || '';

            // Solo empujamos a la URL si el término de búsqueda ha cambiado realmente
            if (searchTerm !== currentQ) {
                const params = new URLSearchParams(searchParams.toString());

                if (searchTerm) {
                    params.set('q', searchTerm);
                } else {
                    params.delete('q');
                }

                // Si buscamos algo nuevo, reiniciar a la página 1
                if (params.has('page')) {
                    params.set('page', '1');
                }

                router.push(`${pathname}?${params.toString()}`);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchParams, pathname, router]);

    return (
        <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-dark w-full pl-10 h-10 py-2 border-gray-200 dark:border-dark-600 focus:border-primary dark:focus:border-primary shadow-sm rounded-xl text-sm transition-colors"
            />
        </div>
    );
}
