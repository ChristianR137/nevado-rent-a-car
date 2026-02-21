import Link from 'next/link';
import { ArrowRight, Shield, Star, Clock } from 'lucide-react';
import { Suspense } from 'react';
import SearchBar from '@/components/home/SearchBar';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark dark:via-dark-800 dark:to-dark" />
            {/* Gold accent glow */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(200,150,12,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200,150,12,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container-custom relative z-10 pt-24 pb-16">
                <div className="max-w-4xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-6 animate-fade-in">
                        <div className="h-px w-8 bg-primary" />
                        <span className="section-label">Cusco &amp; Sur del Perú</span>
                    </div>

                    {/* Headline */}
                    <h1 className="heading-xl text-gray-900 dark:text-white mb-6 animate-slide-up">
                        Explora Cusco al{' '}
                        <span className="gradient-text">volante perfecto</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-gray-500 dark:text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-slide-up">
                        Flota premium de SUVs, pickups y sedanes para recorrer el Valle Sagrado, Machu Picchu y más.
                        Alquiler flexible, precios transparentes y servicio de primera.
                    </p>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center gap-6 mb-12 animate-slide-up">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                            <Shield size={16} className="text-primary" />
                            <span>Flota asegurada</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                            <Star size={16} className="text-primary fill-primary" />
                            <span>4.8/5 valoración promedio</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                            <Clock size={16} className="text-primary" />
                            <span>Asistencia 24/7</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="animate-slide-up">
                        <Suspense fallback={<div className="h-24 rounded-2xl bg-gray-100 dark:bg-dark-800 animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Quick links */}
                    <div className="flex flex-wrap items-center gap-6 mt-8 animate-fade-in">
                        <Link
                            href="/catalog"
                            className="flex items-center gap-1.5 text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors group"
                        >
                            Ver todos los vehículos
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/services"
                            className="flex items-center gap-1.5 text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors group"
                        >
                            Servicios adicionales
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Stats row */}
                <div className="mt-20 pt-10 border-t border-gray-200 dark:border-dark-600 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: '+150', label: 'Clientes satisfechos' },
                        { value: '8+', label: 'Vehículos en flota' },
                        { value: '5+', label: 'Años de experiencia' },
                        { value: '24/7', label: 'Servicio de asistencia' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl font-bold font-serif gradient-text mb-1">{stat.value}</div>
                            <div className="text-gray-500 dark:text-text-secondary text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
