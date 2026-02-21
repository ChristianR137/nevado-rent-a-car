'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactSchema, type ContactFormSchema } from '@/lib/validations/contactSchema';
import { generateWhatsAppLink } from '@/lib/utils/generateWhatsAppLink';

const contactInfo = [
    { icon: Phone, label: 'Teléfono / WhatsApp', value: '+51 987 654 321', href: 'tel:+51987654321' },
    { icon: Mail, label: 'Correo electrónico', value: 'reservas@nevadorentacar.com', href: 'mailto:reservas@nevadorentacar.com' },
    { icon: MapPin, label: 'Dirección', value: 'Av. El Sol 123, Cusco, Perú', href: '#' },
];

export default function ContactPage() {
    const whatsappLink = generateWhatsAppLink();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormSchema>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormSchema) => {
        await new Promise((res) => setTimeout(res, 800));
        toast.success('¡Mensaje enviado! Te responderemos pronto.');
        reset();
    };

    const inputClass = (hasError: boolean) =>
        `input-dark ${hasError ? 'border-red-500 focus:ring-red-500' : ''}`;

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-12 text-center max-w-2xl mx-auto">
                    <span className="section-label mb-3 block">Estamos aquí</span>
                    <h1 className="heading-lg text-gray-900 dark:text-white mb-3">
                        ¿Tienes alguna <span className="gradient-text">pregunta?</span>
                    </h1>
                    <p className="text-gray-500 dark:text-text-secondary">Nuestro equipo responde en menos de 2 horas en días hábiles.</p>
                </div>
            </div>

            <div className="container-custom py-14">
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        {contactInfo.map((info) => {
                            const Icon = info.icon;
                            return (
                                <a
                                    key={info.label}
                                    href={info.href}
                                    className="card-glass p-5 flex items-start gap-4 hover-card group block"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <Icon size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 dark:text-text-secondary text-xs mb-0.5">{info.label}</p>
                                        <p className="text-gray-900 dark:text-white font-medium text-sm">{info.value}</p>
                                    </div>
                                </a>
                            );
                        })}

                        {/* WhatsApp CTA */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-accent-green hover:bg-green-500 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors"
                        >
                            <MessageCircle size={20} />
                            Chatea por WhatsApp
                        </a>

                        <p className="text-gray-400 dark:text-text-muted text-xs text-center">
                            Atención: Lun–Sáb 8am–8pm · Dom 9am–5pm
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:col-span-2 card-glass p-6 space-y-4"
                    >
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Envíanos un mensaje</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Nombre *</label>
                                <input {...register('name')} placeholder="Tu nombre" className={inputClass(!!errors.name)} />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Teléfono</label>
                                <input {...register('phone')} placeholder="+51 999 999 999" className="input-dark" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Correo *</label>
                                <input {...register('email')} type="email" placeholder="correo@ejemplo.com" className={inputClass(!!errors.email)} />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Asunto *</label>
                                <input {...register('subject')} placeholder="¿En qué podemos ayudarte?" className={inputClass(!!errors.subject)} />
                                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1.5 uppercase tracking-wide">Mensaje *</label>
                                <textarea
                                    {...register('message')}
                                    rows={5}
                                    placeholder="Escribe tu consulta aquí..."
                                    className={`${inputClass(!!errors.message)} resize-none`}
                                />
                                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            {isSubmitting ? (
                                <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
                            ) : (
                                <><Send size={15} /> Enviar mensaje</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
