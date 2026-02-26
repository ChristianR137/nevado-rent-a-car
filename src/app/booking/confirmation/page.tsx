'use client';

import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { generateWhatsAppLink } from '@/lib/utils/generateWhatsAppLink';

export default function ConfirmationPage() {
    const { selectedVehicle, startDate, endDate, pickupLocation, dropoffLocation, additionalServices, totalDays, reset } = useBookingStore();

    const whatsappLink = generateWhatsAppLink({
        vehicleName: selectedVehicle?.name,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        pickupLocation: pickupLocation || undefined,
    });

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20 flex items-center">
            <div className="container-custom py-16 max-w-2xl mx-auto text-center">
                {/* Success icon */}
                <div className="w-24 h-24 rounded-full bg-accent-success/10 border border-accent-success/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} className="text-accent-success" />
                </div>

                <h1 className="heading-lg text-gray-900 dark:text-white mb-4">
                    ¡Solicitud <span className="gradient-text">enviada!</span>
                </h1>
                <p className="text-gray-500 dark:text-text-secondary text-lg mb-8 leading-relaxed">
                    Hemos recibido tu solicitud de reserva. Nuestro equipo te contactará
                    dentro de las próximas <strong className="text-gray-900 dark:text-white">2 horas</strong> para
                    confirmar la disponibilidad y coordinar los detalles.
                </p>

                {/* Booking Summary */}
                {selectedVehicle && (
                    <div className="card-glass p-6 mb-8 text-left space-y-5 max-w-xl mx-auto">
                        <div className="text-center mb-6">
                            <h2 className="font-semibold text-gray-900 dark:text-white text-base">Detalles Principales</h2>
                            <p className="text-gray-500 text-sm mt-1">{selectedVehicle.name} · {totalDays} día{totalDays !== 1 ? 's' : ''}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            {(startDate || endDate) && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 sm:col-span-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 dark:text-text-secondary text-xs uppercase tracking-wide font-medium mb-1.5">Recojo (Día)</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 dark:text-text-secondary text-xs uppercase tracking-wide font-medium mb-1.5">Devolución (Día)</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{endDate}</p>
                                    </div>
                                </div>
                            )}

                            {(pickupLocation || dropoffLocation) && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 dark:text-text-secondary text-xs uppercase tracking-wide font-medium mb-1.5">Lugar de Entrega</p>
                                        <p className="text-gray-900 dark:text-white font-medium capitalize truncate" title={pickupLocation || ''}>{pickupLocation || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 dark:text-text-secondary text-xs uppercase tracking-wide font-medium mb-1.5">Lugar de Devolución</p>
                                        <p className="text-gray-900 dark:text-white font-medium capitalize truncate" title={dropoffLocation || ''}>{dropoffLocation || '-'}</p>
                                    </div>
                                </div>
                            )}

                            {additionalServices && additionalServices.length > 0 && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 sm:col-span-2">
                                    <p className="text-gray-400 dark:text-text-secondary text-xs uppercase tracking-wide font-medium mb-2.5">Servicios Adicionales</p>
                                    <ul className="space-y-2">
                                        {additionalServices.map(srv => (
                                            <li key={srv.id} className="text-gray-900 dark:text-white flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{srv.name}</span>
                                                    {srv.isIncluded && (
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                                            Sin costo
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-accent-green hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                        <MessageCircle size={18} />
                        Confirmar por WhatsApp
                    </a>
                    <Link href="/catalog" onClick={reset} className="btn-outline flex items-center justify-center gap-2">
                        <ArrowRight size={16} />
                        Ver más vehículos
                    </Link>
                </div>

                <Link href="/" className="inline-flex items-center gap-1.5 text-gray-400 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white text-sm mt-8 transition-colors">
                    <Home size={14} /> Volver al inicio
                </Link>
            </div>
        </div>
    );
}
