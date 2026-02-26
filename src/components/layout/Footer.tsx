'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils/generateWhatsAppLink';

const footerLinks = {
    company: [
        { href: '/about', label: 'Sobre Nosotros' },
        { href: '/services', label: 'Servicios' },
        { href: '/catalog', label: 'Catálogo' },
        { href: '/contact', label: 'Contacto' },
    ],
    legal: [
        { href: '/terms', label: 'Términos y Condiciones' },
        { href: '/privacy', label: 'Política de Privacidad' },
        { href: '/cancellation', label: 'Políticas de Cancelación' },
    ],
};

export default function Footer() {
    const pathname = usePathname();
    const whatsappLink = generateWhatsAppLink();

    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600">
            {/* Main footer content */}
            <div className="container-custom py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                                <Image src="/logonevado.jpg" alt="Nevado Rent A Car Logo" width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <span className="text-gray-900 dark:text-white font-serif font-bold text-lg leading-none block">
                                    Nevado Perú
                                </span>
                                <span className="text-primary text-xs font-medium tracking-wider uppercase leading-none">
                                    Rent A Car
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-500 dark:text-text-secondary text-sm leading-relaxed mb-5">
                            Tu aliado de confianza para explorar Piura y el norte del Perú. Flota moderna, precios justos, servicio excepcional.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-500 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200">
                                <Instagram size={16} />
                            </a>
                            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-500 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200">
                                <Facebook size={16} />
                            </a>
                            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-500 flex items-center justify-center text-gray-500 dark:text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200">
                                <Youtube size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Empresa
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 dark:text-text-secondary hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 dark:text-text-secondary hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Contacto
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2.5 text-gray-500 dark:text-text-secondary hover:text-primary transition-colors text-sm"
                                >
                                    <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                                    +51 987 654 321
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:reservas@nevadorentacar.com"
                                    className="flex items-start gap-2.5 text-gray-500 dark:text-text-secondary hover:text-primary transition-colors text-sm"
                                >
                                    <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                                    reservas@nevadorentacar.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5 text-gray-500 dark:text-text-secondary text-sm">
                                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                                Av. Grau 1234, Piura, Perú
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 dark:border-dark-600">
                <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-gray-400 dark:text-text-muted text-sm">
                        © {new Date().getFullYear()} Nevado Rent A Car. Todos los derechos reservados.
                    </p>
                    <p className="text-gray-400 dark:text-text-muted text-sm">
                        Piura, Perú 🇵🇪
                    </p>
                </div>
            </div>
        </footer>
    );
}
