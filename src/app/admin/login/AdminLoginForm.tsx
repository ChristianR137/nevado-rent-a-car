'use client';

import { useState } from 'react';
import { login } from './actions';
import { Loader2 } from 'lucide-react';

export default function AdminLoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function onSubmit(formData: FormData) {
        setIsPending(true);
        setError(null);
        try {
            const result = await login(formData);
            if (result?.error) {
                setError('Credenciales inválidas o cuenta no existe.');
            }
        } catch (e) {
            setError('Ocurrió un error inesperado al conectar.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={onSubmit} className="space-y-5">
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                    {error}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300" htmlFor="email">
                    Correo Electrónico
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-dark w-full"
                    placeholder="admin@nevadorentacar.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300" htmlFor="password">
                    Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input-dark w-full"
                    placeholder="••••••••"
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 mt-2"
            >
                {isPending && <Loader2 size={18} className="animate-spin" />}
                {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
        </form>
    );
}
