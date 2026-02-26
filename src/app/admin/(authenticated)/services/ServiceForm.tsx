'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from './actions';
import { Loader2, Save } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';

const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon {...props} />;
};

const AVAILABLE_ICONS = [
    { value: 'UserCheck', label: 'Conductor' },
    { value: 'Shield', label: 'Seguro' },
    { value: 'Headphones', label: 'Asistencia 24/7' },
    { value: 'Plane', label: 'Aeropuerto' },
    { value: 'MapPin', label: 'Mapa/GPS' },
    { value: 'Baby', label: 'Silla Bebé' },
    { value: 'Briefcase', label: 'Equipaje/Maletas' },
    { value: 'Wifi', label: 'Internet/WiFi' },
    { value: 'Coffee', label: 'Bebidas/Café' },
    { value: 'Camera', label: 'Cámara/Dashcam' },
    { value: 'Snowflake', label: 'Hielo/Refrigeración' },
    { value: 'Tent', label: 'Camping' }
];

export default function ServiceForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const isEditing = !!initialData;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || 'Briefcase');
    const [isIncluded, setIsIncluded] = useState(initialData?.is_included ?? false);
    const [price, setPrice] = useState<string>(initialData?.price_per_day?.toString() || '');

    const action: (payload: FormData) => void = async (formData) => {
        setIsSubmitting(true);
        try {
            let result;
            if (isEditing) {
                result = await updateService(initialData.id, formData);
            } else {
                result = await createService(formData);
            }

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success(isEditing ? 'Servicio actualizado' : 'Servicio creado exitosamente');
                router.push('/admin/services');
            }
        } catch (error) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form action={action} className="space-y-6">
            <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm space-y-6">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4">
                    Información Pública
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">


                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Nombre Público del Servicio</label>
                        <input
                            name="name"
                            required
                            defaultValue={initialData?.name}
                            className="input-dark w-full"
                            placeholder="Ej: Silla para Bebé"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Descripción Breve</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description}
                            rows={3}
                            className="input-dark w-full resize-none"
                            placeholder="Ej: Silla de seguridad homologada para niños..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Tarifa Diaria (PEN)</label>
                        <input
                            name="price_per_day"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={isIncluded ? 0 : price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={isIncluded}
                            className="input-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Ej: 20"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4 mt-8">
                    Aspecto Visual (Icono)
                </h3>

                <div>
                    <input type="hidden" name="icon" value={selectedIcon} />
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Escoge un ícono representativo:</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {AVAILABLE_ICONS.map((icon) => (
                            <button
                                key={icon.value}
                                type="button"
                                onClick={() => setSelectedIcon(icon.value)}
                                title={icon.label}
                                className={`p-4 flex flex-col items-center justify-center gap-2 rounded-xl transition-all border ${selectedIcon === icon.value
                                    ? 'bg-primary/10 text-primary border-primary shadow-sm'
                                    : 'bg-gray-50 dark:bg-dark border-gray-200 dark:border-dark-700 text-gray-500 hover:border-primary/50 hover:bg-white dark:hover:bg-dark-800'
                                    }`}
                            >
                                <DynamicIcon name={icon.value} size={28} />
                                <span className="text-[10px] font-medium leading-tight text-center truncate w-full">{icon.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-dark-700 pb-2 mb-4 mt-8">
                    Configuración de Visibilidad
                </h3>

                <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark cursor-pointer hover:border-primary/50 transition-colors group">
                        <div className="flex items-center h-5 mt-0.5">
                            <input
                                type="checkbox"
                                name="is_popular"
                                defaultChecked={initialData?.is_popular ?? false}
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 flex-shrink-0"
                            />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">Marcar como Servicio Popular</span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Los servicios populares tendrán una estrella y destacarán visualmente entre las opciones durante la reserva.</span>
                        </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark cursor-pointer hover:border-primary/50 transition-colors group">
                        <div className="flex items-center h-5 mt-0.5">
                            <input
                                type="checkbox"
                                name="is_active"
                                defaultChecked={initialData?.is_active ?? true}
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 flex-shrink-0"
                            />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">Servicio Activo / Disponible</span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Si desmarcas esta opción, el servicio no podrá ser contratado y desaparecerá del formulario de reserva, útil para agotar stock temporalmente.</span>
                        </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark cursor-pointer hover:border-primary/50 transition-colors group">
                        <div className="flex items-center h-5 mt-0.5">
                            <input
                                type="checkbox"
                                name="is_included"
                                checked={isIncluded}
                                onChange={(e) => setIsIncluded(e.target.checked)}
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 flex-shrink-0"
                            />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">Servicio Sin Costo Extra</span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Si marcas esta opción, el servicio se etiquetará como "Sin costo" en vez de mostrar su tarifa base, sumando S/ 0 al total del cliente.</span>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end pt-4 pb-10">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            {isEditing ? 'Actualizando...' : 'Creando...'}
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            {isEditing ? 'Guardar Cambios' : 'Crear Servicio'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
