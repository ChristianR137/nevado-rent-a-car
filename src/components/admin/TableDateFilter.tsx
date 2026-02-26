'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';

export default function TableDateFilter({
    paramName,
    label
}: {
    paramName: string;
    label: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentValue = searchParams.get(paramName) || '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (newValue) {
            params.set(paramName, newValue);
        } else {
            params.delete(paramName);
        }

        if (params.has('page')) {
            params.set('page', '1');
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={14} className="text-gray-400" />
            </div>
            <div className="flex bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm h-10">
                <span className="flex items-center pl-10 pr-2 text-xs font-medium text-gray-500 bg-gray-50 dark:bg-dark-700/50 border-r border-gray-200 dark:border-dark-600">
                    {label}
                </span>
                <input
                    type="date"
                    value={currentValue}
                    onChange={handleChange}
                    className="w-full px-3 text-sm bg-transparent border-none focus:ring-0 outline-none text-gray-700 dark:text-gray-200"
                />
            </div>
        </div>
    );
}
