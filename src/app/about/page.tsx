import { Metadata } from 'next';
import { Award, Heart, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sobre Nosotros',
    description: 'Conoce a Nevado Rent A Car, tu aliado de confianza para explorar Cusco y el sur del Perú desde 2019.',
};

const values = [
    { icon: Heart, title: 'Pasión por Cusco', desc: 'Somos cusqueños. Conocemos cada ruta, cada curva y cada destino para brindarte la mejor experiencia.' },
    { icon: Award, title: 'Calidad garantizada', desc: 'Flota impecable, mantenida al detalle. Porque tu seguridad es nuestra prioridad número uno.' },
    { icon: Users, title: 'Equipo humano', desc: 'Un equipo comprometido con hacer de tu viaje una experiencia memorable e irrepetible.' },
    { icon: MapPin, title: 'Presencia local', desc: 'Ubicados en el corazón de Cusco con cobertura en toda la región y el Valle Sagrado.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Hero */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-14">
                    <div className="max-w-3xl">
                        <span className="section-label mb-3 block">Nuestra historia</span>
                        <h1 className="heading-lg text-gray-900 dark:text-white mb-5">
                            Más de 5 años llevándote a los destinos más{' '}
                            <span className="gradient-text">increíbles del Perú</span>
                        </h1>
                        <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed">
                            Nevado Rent A Car nació en 2019 de la pasión de un equipo de cusqueños por mostrar la riqueza de su tierra.
                            Empezamos con 2 vehículos y hoy contamos con una flota moderna de más de 8 autos premium, sirviendo a
                            viajeros nacionales e internacionales que desean explorar Cusco con libertad y comodidad.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-14">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { value: '2019', label: 'Año de fundación' },
                        { value: '150+', label: 'Clientes satisfechos' },
                        { value: '4.8★', label: 'Valoración promedio' },
                        { value: '8+', label: 'Vehículos en flota' },
                    ].map((stat) => (
                        <div key={stat.label} className="card-glass p-5 text-center">
                            <div className="text-3xl font-bold font-serif gradient-text mb-1">{stat.value}</div>
                            <div className="text-gray-500 dark:text-text-secondary text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Values */}
                <div className="mb-16">
                    <h2 className="heading-md text-gray-900 dark:text-white text-center mb-10">Nuestros Valores</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div key={v.title} className="card-glass p-6 hover-card group text-center">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Icon size={22} className="text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                                    <p className="text-gray-500 dark:text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="card-glass p-10 text-center max-w-2xl mx-auto">
                    <h2 className="heading-md text-gray-900 dark:text-white mb-4">¿Listo para explorar Cusco?</h2>
                    <p className="text-gray-500 dark:text-text-secondary mb-8">Únete a más de 150 viajeros que ya confiaron en nosotros.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/catalog" className="btn-primary">Ver catálogo de autos</Link>
                        <Link href="/contact" className="btn-outline">Contáctanos</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
