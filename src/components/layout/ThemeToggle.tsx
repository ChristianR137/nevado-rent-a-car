'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Evitar hydration mismatch: renderizar solo en el cliente
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-xl bg-dark-700 animate-pulse" />
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`
                relative w-9 h-9 rounded-xl flex items-center justify-center
                transition-all duration-200 ease-in-out
                border
                ${isDark
                    ? 'bg-dark-700 border-dark-500 text-primary hover:bg-dark-600 hover:border-primary/40 hover:shadow-primary-sm'
                    : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:border-amber-400'
                }
            `}
        >
            <span
                className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                    }`}
            >
                <Moon size={16} />
            </span>
            <span
                className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
            >
                <Sun size={16} />
            </span>
        </button>
    );
}
