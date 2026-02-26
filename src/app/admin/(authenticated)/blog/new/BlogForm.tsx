'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Save, ArrowLeft, Image as ImageIcon, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-50 dark:bg-dark-900 animate-pulse rounded-xl border border-gray-200 dark:border-dark-700 flex items-center justify-center text-gray-400">Cargando editor WYSIWYG...</div>
});

type BlogPostProps = {
    initialData?: any;
};

export default function BlogForm({ initialData }: BlogPostProps) {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        category: initialData?.category || 'Rutas & Destinos',
        cover_emoji: initialData?.cover_emoji || '📝',
        read_time: initialData?.read_time || 5,
        seo_keywords: initialData?.seo_keywords || '',
        is_published: initialData ? initialData.is_published : false,
    });

    const categories = ['Rutas & Destinos', 'Consejos', 'Aeropuerto', 'Viajes'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let finalValue: string | boolean | number = value;

        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked;
        } else if (name === 'read_time') {
            finalValue = parseInt(value) || 0;
        }

        setFormData(prev => {
            const newFormData = { ...prev, [name]: finalValue };

            // Generar slug automáticamente si estamos editando el título y no hay slug (o es nuevo)
            if (name === 'title' && !initialData) {
                newFormData.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            return newFormData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from('blogs')
                    .update(formData)
                    .eq('id', initialData.id);

                if (error) throw error;
                toast.success('Artículo actualizado correctamente');
            } else {
                // Insert
                const { error } = await supabase
                    .from('blogs')
                    .insert([formData]);

                if (error) throw error;
                toast.success('Artíuclo creado exitosamente');
            }

            router.push('/admin/blog');
            router.refresh();
        } catch (error: any) {
            console.error('Error salvando post:', error);
            toast.error(error.message || 'Error al guardar el artículo');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {initialData ? 'Editar Artículo' : 'Nuevo Artículo'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {initialData ? 'Actualiza los meta metadatos y contenido del post actual.' : 'Crea contenido asombroso para atraer clientes y mejorar tu SEO.'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn-secondary"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Save size={18} />
                        {isLoading ? 'Guardando...' : 'Guardar Artículo'}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-8 shadow-sm space-y-8">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-4">
                            Información Principal
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Título del Artículo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    placeholder="Ej: Las 5 mejores rutas del norte"
                                    maxLength={100}
                                />
                                <div className="mt-1 flex justify-between text-xs text-gray-500">
                                    <span>Títulos cortos y descriptivos funcionan mejor en Google.</span>
                                    <span>{formData.title.length}/100</span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    URL Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono text-sm"
                                    placeholder="las-5-mejores-rutas-del-norte"
                                />
                            </div>

                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Extracto / Resumen corto <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    required
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                                    placeholder="Este texto aparecerá en las tarjetas y como descripción de Link Sharing."
                                    maxLength={200}
                                />
                                <div className="mt-1 flex justify-between text-xs text-gray-500">
                                    <span>{formData.excerpt.length}/200</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-700 pb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Contenido Principal
                            </h2>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                                Editor Estilo WordPress
                            </span>
                        </div>

                        <div>
                            {/* @ts-ignore - quill types missing due to npm error */}
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(val: string) => setFormData(p => ({ ...p, content: val }))}
                                className="bg-white dark:bg-dark-900 text-gray-900 dark:text-white form-quill rounded-xl overflow-hidden [&_.ql-editor]:min-h-[400px] [&_.ql-toolbar]:border-gray-200 dark:[&_.ql-toolbar]:border-dark-700 dark:[&_.ql-toolbar]:bg-dark-800 dark:[&_.ql-container]:border-dark-700 [&_.ql-editor]:text-base"
                                modules={{
                                    toolbar: [
                                        [{ 'header': [2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Configuration */}
                <div className="space-y-6">
                    {/* Status & Options */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-4">
                            Opciones de Publicación
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Estado de Visibilidad
                            </label>

                            <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer hover:border-primary/50 transition-colors group ${formData.is_published ? 'border-primary/50 bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark'}`}>
                                <div className="flex items-center h-5 mt-0.5">
                                    <input
                                        type="checkbox"
                                        name="is_published"
                                        checked={formData.is_published}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary bg-white dark:bg-dark-900"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        {formData.is_published ? (
                                            <><CheckCircle size={16} className="text-green-500" /> Publicado </>
                                        ) : (
                                            <><Clock size={16} className="text-amber-500" /> Guardar como borrador</>
                                        )}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Si está marcado, el artículo será visible en la web para el público al guardar.
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Media & Details */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-4">
                            Detalles y Media
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Categoría <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                >
                                    <option value="" disabled>Selecciona una categoría</option>
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cover_emoji" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Icono Emoji <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="cover_emoji"
                                        name="cover_emoji"
                                        required
                                        value={formData.cover_emoji}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-center text-xl"
                                        maxLength={5}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="read_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tiempo Lectura <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="read_time"
                                            name="read_time"
                                            required
                                            min="1"
                                            max="60"
                                            value={formData.read_time}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            min
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-4">
                            Optimización SEO
                        </h2>

                        <div>
                            <label htmlFor="seo_keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Palabras Clave (Keywords)
                            </label>
                            <textarea
                                id="seo_keywords"
                                name="seo_keywords"
                                rows={3}
                                value={formData.seo_keywords}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none placeholder-gray-400 dark:placeholder-gray-600 text-sm"
                                placeholder="Separadas por comas. Ej: piura playas, alquiler autos 4x4, rutas en talara"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Útiles para ayudar a que la página rankee en buscadores con tópicos específicos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}
