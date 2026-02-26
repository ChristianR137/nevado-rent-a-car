'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateShowcase } from './actions';
import { Loader2, UploadCloud, Save } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';

const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon {...props} />;
};
const AVAILABLE_ICONS = [
    { value: 'Gauge', label: 'Velocímetro / Potencia / Rendimiento' },
    { value: 'ShieldCheck', label: 'Escudo / Seguridad / Protección' },
    { value: 'Thermometer', label: 'Termómetro / Clima / A\//C' },
    { value: 'Users', label: 'Usuarios / Pasajeros / Capacidad' },
    { value: 'Zap', label: 'Rayo / Energía / Eléctrico' },
    { value: 'Star', label: 'Estrella / Destacado / Premium' },
    { value: 'Map', label: 'Mapa / Navegación / GPS' },
    { value: 'Compass', label: 'Brújula / Aventura / Tracción' },
    { value: 'Briefcase', label: 'Maletín / Equipaje / Maletera' },
    { value: 'Settings', label: 'Engranaje / Mecánica / Automático' },
    { value: 'Fuel', label: 'Combustible / Gasolina' },
    { value: 'Car', label: 'Auto / Carrocería' },
];

export default function ShowcaseForm({ initialData, vehicles }: { initialData: any, vehicles: any[] }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);

    // State for selected icons
    const [spec1Icon, setSpec1Icon] = useState(initialData?.spec1_icon || 'Gauge');
    const [spec2Icon, setSpec2Icon] = useState(initialData?.spec2_icon || 'ShieldCheck');
    const [spec3Icon, setSpec3Icon] = useState(initialData?.spec3_icon || 'Thermometer');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const action: (payload: FormData) => void = async (formData) => {
        setIsSubmitting(true);
        try {
            const result = await updateShowcase(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Banner principal actualizado');
                router.refresh();
            }
        } catch (e) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form action={action} className="space-y-8 bg-white dark:bg-dark-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm">
            {/* Headers & Text */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4">Textos Principales</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Insignia (Badge)</label>
                        <input name="badge_text" required defaultValue={initialData?.badge_text} className="input-dark w-full" placeholder="Ej: Serie Premium" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Título Línea 1</label>
                        <input name="title_line1" required defaultValue={initialData?.title_line1} className="input-dark w-full" placeholder="Ej: TOYOTA" />
                        <p className="text-xs text-gray-500 mt-1">Texto en blanco mate</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Título Línea 2</label>
                        <input name="title_line2" required defaultValue={initialData?.title_line2} className="input-dark w-full" placeholder="Ej: FORTUNER" />
                        <p className="text-xs text-gray-500 mt-1">Texto con gradiente dorado</p>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Descripción Corta</label>
                        <textarea name="description" required defaultValue={initialData?.description} rows={3} className="input-dark w-full resize-none" placeholder="Descripción persuasiva del vehículo..." />
                    </div>
                </div>
            </div>

            {/* Background Image */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4">Foto de Fondo Completo</h3>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl relative overflow-hidden ${previewImage ? 'border-primary' : 'border-gray-300 dark:border-dark-600'}`}>
                    {previewImage && (
                        <div className="absolute inset-0 z-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-dark/60 mix-blend-multiply" />
                        </div>
                    )}
                    <div className="space-y-1 text-center relative z-10">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                        <div className="flex text-sm text-gray-200 font-medium drop-shadow-md">
                            <label htmlFor="image" className="relative cursor-pointer bg-transparent rounded-md text-primary hover:text-primary-dark">
                                <span>Subir fondo nuevo</span>
                                <input id="image" name="image" type="file" accept="image/png, image/jpeg, image/webp" className="sr-only" onChange={handleImageChange} />
                            </label>
                            <p className="pl-1 text-gray-300">o arrastra aquí</p>
                        </div>
                        <p className="text-xs text-gray-300 drop-shadow">Se recomienda 1920x1080px. Se conservará la actual si no subes nada.</p>
                    </div>
                </div>
            </div>

            {/* Specifications */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4">Especificaciones Destacadas (Cajas Mágicas)</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                    {/* Caja 1 */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-dark-700">
                            <label className="block text-xs font-bold text-primary mb-3 uppercase tracking-wide">Caja 1: Velocidad/Potencia</label>

                            {/* Icon Picker */}
                            <input type="hidden" name="spec1_icon" value={spec1Icon} />
                            <div className="mb-4">
                                <label className="block text-xs text-gray-500 mb-2">Selecciona un icono:</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {AVAILABLE_ICONS.map((icon) => (
                                        <button
                                            key={icon.value}
                                            type="button"
                                            onClick={() => setSpec1Icon(icon.value)}
                                            title={icon.label}
                                            className={`p-2 rounded-lg flex items-center justify-center transition-all ${spec1Icon === icon.value
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <DynamicIcon name={icon.value} size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input name="spec1_value" required defaultValue={initialData?.spec1_value} className="input-dark w-full mb-3 text-sm" placeholder="Valor (Ej: 201 CV)" />
                            <input name="spec1_label" required defaultValue={initialData?.spec1_label} className="input-dark w-full text-sm" placeholder="Etiqueta (Ej: Potencia)" />
                        </div>
                    </div>

                    {/* Caja 2 */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-dark-700">
                            <label className="block text-xs font-bold text-primary mb-3 uppercase tracking-wide">Caja 2: Tracción/Seguridad</label>

                            {/* Icon Picker */}
                            <input type="hidden" name="spec2_icon" value={spec2Icon} />
                            <div className="mb-4">
                                <label className="block text-xs text-gray-500 mb-2">Selecciona un icono:</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {AVAILABLE_ICONS.map((icon) => (
                                        <button
                                            key={icon.value}
                                            type="button"
                                            onClick={() => setSpec2Icon(icon.value)}
                                            title={icon.label}
                                            className={`p-2 rounded-lg flex items-center justify-center transition-all ${spec2Icon === icon.value
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <DynamicIcon name={icon.value} size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input name="spec2_value" required defaultValue={initialData?.spec2_value} className="input-dark w-full mb-3 text-sm" placeholder="Valor (Ej: 4x4 Automático)" />
                            <input name="spec2_label" required defaultValue={initialData?.spec2_label} className="input-dark w-full text-sm" placeholder="Etiqueta (Ej: Tracción)" />
                        </div>
                    </div>

                    {/* Caja 3 */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-dark-700">
                            <label className="block text-xs font-bold text-primary mb-3 uppercase tracking-wide">Caja 3: Capacidad/Espacio</label>

                            {/* Icon Picker */}
                            <input type="hidden" name="spec3_icon" value={spec3Icon} />
                            <div className="mb-4">
                                <label className="block text-xs text-gray-500 mb-2">Selecciona un icono:</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {AVAILABLE_ICONS.map((icon) => (
                                        <button
                                            key={icon.value}
                                            type="button"
                                            onClick={() => setSpec3Icon(icon.value)}
                                            title={icon.label}
                                            className={`p-2 rounded-lg flex items-center justify-center transition-all ${spec3Icon === icon.value
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <DynamicIcon name={icon.value} size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input name="spec3_value" required defaultValue={initialData?.spec3_value} className="input-dark w-full mb-3 text-sm" placeholder="Valor (Ej: 7 Asientos)" />
                            <input name="spec3_label" required defaultValue={initialData?.spec3_label} className="input-dark w-full text-sm" placeholder="Etiqueta (Ej: Capacidad)" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Link Behavior */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4">Comportamiento del Botón</h3>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Vehículo a Redirigir</label>
                    <select name="vehicle_slug" required defaultValue={initialData?.vehicle_slug || ''} className="input-dark w-full appearance-none bg-transparent">
                        <option value="" disabled>Selecciona un vehículo del catálogo...</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.slug}>{vehicle.name}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Este es el vehículo al que se dirigirá al cliente cuando pulse "Reservar" o "Detalles" en el Banner principal.</p>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-700 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center">
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Guardando Cambios...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Actualizar Banner Principal
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
