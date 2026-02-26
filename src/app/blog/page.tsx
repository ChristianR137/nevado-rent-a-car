import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog – Nevado Rent A Car',
    description: 'Tips de viaje, rutas en el Norte, consejos de alquiler y guías para explorar Piura como un experto.',
};

export const revalidate = 3600; // cachings

const categoryColors: Record<string, string> = {
    'Rutas & Destinos': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Consejos': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Aeropuerto': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Viajes': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPage() {
    const supabase = await createClient();

    const { data: blogPosts } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-14 text-center max-w-3xl mx-auto">
                    <span className="section-label mb-3 block">Nuestro Blog</span>
                    <h1 className="heading-lg text-gray-900 dark:text-white mb-4">
                        Guías, rutas y{' '}
                        <span className="gradient-text">consejos de viaje</span>
                    </h1>
                    <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed">
                        Todo lo que necesitas saber para explorar Piura, Tumbes y el norte del Perú con total libertad y seguridad.
                    </p>
                </div>
            </div>

            <div className="container-custom py-14">
                {(!blogPosts || blogPosts.length === 0) ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400">Próximamente estaremos publicando increíbles guías para ti.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured post */}
                        <div className="mb-12">
                            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
                                <div className="card-glass overflow-hidden hover-card">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Cover */}
                                        <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-dark-700 flex items-center justify-center">
                                            <span className="text-9xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                                                {blogPosts[0].cover_emoji}
                                            </span>
                                        </div>
                                        {/* Content */}
                                        <div className="p-8 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`badge border text-xs ${categoryColors[blogPosts[0].category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {blogPosts[0].category}
                                                </span>
                                                <span className="badge-primary text-xs">Destacado</span>
                                            </div>
                                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                                {blogPosts[0].title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-text-secondary leading-relaxed mb-6">
                                                {blogPosts[0].excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-text-muted mb-6">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={13} /> {formatDate(blogPosts[0].created_at)}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={13} /> {blogPosts[0].read_time} min de lectura
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                                                Leer artículo <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Rest of posts */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogPosts.slice(1).map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                                    <article className="card-glass overflow-hidden hover-card h-full flex flex-col">
                                        {/* Cover */}
                                        <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center">
                                            <span className="text-7xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                                                {post.cover_emoji}
                                            </span>
                                        </div>
                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <span className={`badge border text-xs self-start mb-3 ${categoryColors[post.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {post.category}
                                            </span>
                                            <h2 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-text-muted mt-auto pt-4 border-t border-gray-100 dark:border-dark-600">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={12} /> {formatDate(post.created_at)}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={12} /> {post.read_time} min
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
