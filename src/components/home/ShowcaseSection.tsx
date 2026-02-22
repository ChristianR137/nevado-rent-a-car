import Link from 'next/link';
import { ChevronRight, Gauge, ShieldCheck, Thermometer } from 'lucide-react';

export default function ShowcaseSection() {
    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-dark">
            {/* 1. Full-Bleed Background Image Array */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40s] ease-linear hover:scale-110"
                style={{
                    backgroundImage: "url('/showcase-bg.png')",
                }}
            />

            {/* 2. Intelligent Overlay Gradients for Readability */}
            <div className="absolute inset-0 bg-dark/20" /> {/* Base dimming */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-800/90 via-dark-800/40 to-transparent w-full md:w-[80%]" /> {/* Strong left fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-800 via-dark-800/40 to-transparent" /> {/* Bottom fade */}

            {/* 3. Main Content Container */}
            <div className="container-custom relative z-10 w-full px-4 md:px-8 h-full flex flex-col justify-end pb-20 md:pb-32 pt-32">
                <div className="max-w-4xl animate-slide-in-right">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Serie Premium
                    </div>

                    {/* Massive Elegant Typography */}
                    <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
                        TOYOTA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-primary">FORTUNER</span>
                    </h2>

                    {/* Sophisticated Description */}
                    <p className="text-lg md:text-xl text-text-secondary md:text-white/80 max-w-2xl font-light leading-relaxed mb-10 drop-shadow-md border-l-2 border-primary pl-4">
                        Conquista cada rincón del norte peruano. Un vehículo imponente diseñado para ofrecer lujo en el interior y agresividad todoterreno en el exterior.
                    </p>

                    {/* Glassmorphic Specs Bar */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-10 bg-dark-800/40 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl w-fit shadow-2xl">
                        <div className="flex items-center gap-3">
                            <Gauge className="text-primary" size={24} />
                            <div>
                                <p className="text-white font-bold text-sm md:text-base leading-none mb-1">201 CV</p>
                                <p className="text-text-muted text-xs uppercase tracking-wider">Potencia</p>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-white/10" />

                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-primary" size={24} />
                            <div>
                                <p className="text-white font-bold text-sm md:text-base leading-none mb-1">4x4 Automático</p>
                                <p className="text-text-muted text-xs uppercase tracking-wider">Tracción</p>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-white/10" />

                        <div className="flex items-center gap-3">
                            <Thermometer className="text-primary" size={24} />
                            <div>
                                <p className="text-white font-bold text-sm md:text-base leading-none mb-1">7 Asientos</p>
                                <p className="text-text-muted text-xs uppercase tracking-wider">Capacidad</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full sm:w-auto">
                        <Link
                            href="/booking?vehicle=toyota-fortuner"
                            className="w-full sm:w-auto inline-flex items-center justify-between gap-4 bg-primary hover:bg-white text-white hover:text-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-primary group"
                        >
                            Reservar Vehículo
                            <div className="bg-dark/10 p-1 rounded-md group-hover:bg-dark-800/10 group-hover:translate-x-1 transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </Link>

                        <Link
                            href="/vehicles/toyota-fortuner"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                        >
                            Detalles Completos
                        </Link>
                    </div>

                </div>
            </div>

            {/* Decorative Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] text-white tracking-[0.2em] uppercase">Scroll</span>
                <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
            </div>
        </section>
    );
}
