'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalog', label: 'Catálogo' },
    { href: '/services', label: 'Servicios' },
    { href: '/airport', label: 'Aeropuerto' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Nosotros' },
    { href: '/contact', label: 'Contacto' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith('/admin')) return null;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-600 shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-primary-sm group-hover:shadow-primary transition-shadow duration-200">
                            <Image src="/logonevado.jpg" alt="Nevado Rent A Car Logo" width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-gray-900 dark:text-white font-serif font-bold text-lg leading-none block">
                                Nevado Perú
                            </span>
                            <span className="text-primary text-xs font-medium tracking-wider uppercase leading-none">
                                Rent A Car
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Theme Toggle */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/booking" className="btn-primary text-sm px-5 py-2.5">
                            Reservar Ahora
                        </Link>
                    </div>

                    {/* Mobile: Theme Toggle + menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                            aria-label="Menú de navegación"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/98 dark:bg-dark-800/98 backdrop-blur-md border-t border-gray-200 dark:border-dark-600 animate-slide-up">
                    <div className="container-custom py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-dark-600">
                            <Link href="/booking" className="btn-primary w-full text-center block text-sm">
                                Reservar Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
