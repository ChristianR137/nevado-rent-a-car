'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { generateWhatsAppLink } from '@/lib/utils/generateWhatsAppLink';

export default function WhatsAppButton() {
    const pathname = usePathname();
    const link = generateWhatsAppLink();

    if (pathname.startsWith('/admin')) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent-green rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-float group"
        >
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-accent-green opacity-30 animate-ping" />
            <MessageCircle size={26} className="text-white relative z-10 fill-white" />
            {/* Tooltip */}
            <span className="absolute right-16 bg-dark-800 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-card border border-dark-500">
                ¿Tienes dudas? Escríbenos
            </span>
        </a>
    );
}
