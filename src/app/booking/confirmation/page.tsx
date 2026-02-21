'use client';

import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { generateWhatsAppLink } from '@/lib/utils/generateWhatsAppLink';

export default function ConfirmationPage() {
    const { selectedVehicle, startDate, endDate, pickupLocation, totalPrice, totalDays, reset } = useBookingStore();

    const whatsappLink = generateWhatsAppLink({
        vehicleName: selectedVehicle?.name,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        pickupLocation: pickupLocation || undefined,
        totalPrice,
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
                    <div className="card-glass p-6 mb-8 text-left space-y-3">
                        <h2 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">Resumen de solicitud</h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-3">
                                <p className="text-gray-400 dark:text-text-secondary text-xs mb-0.5">Vehículo</p>
                                <p className="text-gray-900 dark:text-white font-medium">{selectedVehicle.name}</p>
                            </div>
                            {totalDays > 0 && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-3">
                                    <p className="text-gray-400 dark:text-text-secondary text-xs mb-0.5">Duración</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{totalDays} día{totalDays !== 1 ? 's' : ''}</p>
                                </div>
                            )}
                            {startDate && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-3">
                                    <p className="text-gray-400 dark:text-text-secondary text-xs mb-0.5">Inicio</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{startDate}</p>
                                </div>
                            )}
                            {endDate && (
                                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-3">
                                    <p className="text-gray-400 dark:text-text-secondary text-xs mb-0.5">Fin</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{endDate}</p>
                                </div>
                            )}
                        </div>
                        {totalPrice > 0 && (
                            <div className="pt-3 border-t border-gray-200 dark:border-dark-600 flex justify-between items-center">
                                <span className="text-gray-500 dark:text-text-secondary text-sm">Total estimado</span>
                                <span className="text-primary text-xl font-bold">{formatCurrency(totalPrice)}</span>
                            </div>
                        )}
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
