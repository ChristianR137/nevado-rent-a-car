import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('blogs')
        .select('title, excerpt, seo_keywords, cover_emoji')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (!post) {
        return {
            title: 'Artículo no encontrado | Nevado Rent A Car',
        };
    }

    return {
        title: `${post.title} – Blog Nevado Rent A Car`,
        description: post.excerpt,
        keywords: post.seo_keywords || 'rent a car piura, turismo piura, rutas norte peru',
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            locale: 'es_PE',
            siteName: 'Nevado Rent A Car',
            tags: post.seo_keywords?.split(',').map((k: string) => k.trim()) || [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        }
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error || !post) {
        notFound();
    }

    // Fetch related published posts (excluding current)
    const { data: related } = await supabase
        .from('blogs')
        .select('id, slug, title, cover_emoji, read_time')
        .eq('is_published', true)
        .neq('id', post.id)
        .limit(3)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-white dark:bg-dark pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary/10 to-gray-50 dark:from-primary/5 dark:to-dark-800 border-b border-gray-200 dark:border-dark-600">
                <div className="container-custom py-14 max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white text-sm transition-colors mb-8"
                    >
                        <ArrowLeft size={16} /> Volver al Blog
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="badge border bg-primary/10 text-primary border-primary/20 text-xs flex items-center gap-1">
                            <Tag size={11} /> {post.category}
                        </span>
                    </div>

                    <div className="flex gap-6 items-start">
                        <span className="text-7xl hidden sm:block opacity-70 mt-1 shrink-0">{post.cover_emoji}</span>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-gray-400 dark:text-text-muted">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} /> {formatDate(post.created_at)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} /> {post.read_time} min de lectura
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-12 max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Article */}
                    <article className="lg:col-span-2">
                        <div
                            className="prose-content post-html-content text-gray-600 dark:text-text-secondary leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* CTA */}
                        <div className="mt-12 card-glass p-8 text-center">
                            <p className="text-2xl mb-3">🚗</p>
                            <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
                                ¿Listo para explorar?
                            </h3>
                            <p className="text-gray-500 dark:text-text-secondary text-sm mb-5">
                                Alquila tu auto y vive este destino con total libertad.
                            </p>
                            <Link href="/catalog" className="btn-primary">
                                Ver vehículos disponibles
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {related && related.length > 0 && (
                            <div className="card-glass p-5">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">
                                    Artículos relacionados
                                </h3>
                                <div className="space-y-4">
                                    {related.map((r) => (
                                        <Link key={r.id} href={`/blog/${r.slug}`} className="group flex items-start gap-3">
                                            <span className="text-2xl shrink-0">{r.cover_emoji}</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                                    {r.title}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-text-muted mt-1">{r.read_time} min</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="card-glass p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-3">
                                Reserva tu auto
                            </h3>
                            <p className="text-gray-500 dark:text-text-secondary text-sm mb-4">
                                Flota moderna, seguros incluidos, entrega en aeropuerto.
                            </p>
                            <Link href="/catalog" className="btn-primary w-full text-center block text-sm">
                                Ver catálogo
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
