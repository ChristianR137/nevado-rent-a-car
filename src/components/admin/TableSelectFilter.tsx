'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter } from 'lucide-react';

export default function TableSelectFilter({
    paramName,
    options,
    defaultLabel = "Todos"
}: {
    paramName: string;
    options: { value: string; label: string }[];
    defaultLabel?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Maintain internal state for immediate input feedback
    const currentValue = searchParams.get(paramName) || '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (newValue) {
            params.set(paramName, newValue);
        } else {
            params.delete(paramName);
        }

        // Si buscamos algo nuevo, reiniciar a la página 1
        if (params.has('page')) {
            params.set('page', '1');
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex items-center shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={14} className="text-gray-400" />
            </div>
            <select
                value={currentValue}
                onChange={handleChange}
                className="input-dark w-full sm:w-auto min-w-[140px] pl-9 pr-8 h-10 py-2 border-gray-200 dark:border-dark-600 focus:border-primary dark:focus:border-primary shadow-sm rounded-xl text-sm transition-colors cursor-pointer appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:right_8px_center] bg-[length:16px]"
            >
                <option value="">{defaultLabel}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
