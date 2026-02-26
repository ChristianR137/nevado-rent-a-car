import type { Metadata } from 'next';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
    title: 'Admin Login | Nevado Rent A Car',
};

export default function AdminLoginPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold font-serif mb-2">Nevado Rent A Car</h1>
                    <p className="text-gray-500 dark:text-text-secondary">Acceso exclusivo para el personal</p>
                </div>
                <div className="card-glass p-8">
                    <AdminLoginForm />
                </div>
            </div>
        </div>
    );
}
