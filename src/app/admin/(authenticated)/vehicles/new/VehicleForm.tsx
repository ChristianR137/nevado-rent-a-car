'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VEHICLE_TYPES, TRANSMISSION_TYPES } from '@/constants/vehicleTypes';
import { createVehicle } from './actions';
import { Loader2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VehicleForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const action: (payload: FormData) => void = async (formData) => {
        setIsSubmitting(true);
        try {
            const result = await createVehicle(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Vehículo creado correctamente');
                router.push('/admin/vehicles');
                router.refresh();
            }
        } catch (e) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form action={action} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Marca</label>
                    <input name="brand" required className="input-dark w-full" placeholder="Ej: Toyota" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Modelo</label>
                    <input name="model" required className="input-dark w-full" placeholder="Ej: Hilux 4x4" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Tipo / Categoría</label>
                    <div className="flex gap-2">
                        <select
                            name={selectedType === 'otra' ? '_ignore_type' : 'type'}
                            required={selectedType !== 'otra'}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="input-dark w-full appearance-none bg-transparent"
                        >
                            <option value="">Selecciona...</option>
                            {VEHICLE_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                            <option value="otra">Otra (Escribir...)</option>
                        </select>
                        {selectedType === 'otra' && (
                            <input
                                name="type"
                                type="text"
                                required
                                className="input-dark w-full"
                                placeholder="Escribe categoría"
                                autoFocus
                            />
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Año</label>
                    <input name="year" type="number" required className="input-dark w-full" placeholder="Ej: 2024" min="2000" max="2100" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Tarifa por Día (S/)</label>
                    <input name="pricePerDay" type="number" required className="input-dark w-full" placeholder="Ej: 250" min="0" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Transmisión</label>
                    <select name="transmission" required className="input-dark w-full appearance-none bg-transparent">
                        <option value="">Selecciona...</option>
                        {TRANSMISSION_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Pasajeros</label>
                    <input name="passengers" type="number" required className="input-dark w-full" min="1" max="20" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Puertas</label>
                    <input name="doors" type="number" required className="input-dark w-full" min="2" max="6" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Maletas</label>
                    <input name="luggage" type="number" required className="input-dark w-full" min="0" max="10" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Combustible</label>
                    <select name="fuelType" required className="input-dark w-full appearance-none bg-transparent">
                        <option value="Gasolina">Gasolina</option>
                        <option value="Diesel">Diésel</option>
                        <option value="Hibrido">Híbrido</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Descripción Público</label>
                <textarea name="description" required rows={4} className="input-dark w-full resize-none" placeholder="Describe las ventajas de este vehículo para el cliente." />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Foto del Vehículo (Principal)</label>
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
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label htmlFor="image" className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary-dark">
                                <span>Sube un archivo</span>
                                <input id="image" name="image" type="file" required accept="image/png, image/jpeg, image/webp" className="sr-only" onChange={handleImageChange} />
                            </label>
                            <p className="pl-1">o arrastra aquí</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 2MB</p>
                    </div>
                </div>
            </div>



            <div className="pt-6 border-t border-gray-200 dark:border-dark-700 flex items-center justify-end gap-4">
                <button type="button" onClick={() => router.back()} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                    Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2 px-8 py-2.5">
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {isSubmitting ? 'Guardando...' : 'Guardar Vehículo'}
                </button>
            </div>
        </form>
    );
}
