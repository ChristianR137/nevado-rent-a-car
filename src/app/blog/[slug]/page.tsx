import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '@/lib/data/blogPosts';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return { title: 'Artículo no encontrado' };
    return {
        title: `${post.title} – Blog Nevado Rent A Car`,
        description: post.excerpt,
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

// Minimal markdown-like renderer (headers, bold, tables, lists)
function renderContent(content: string) {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="font-serif text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                    {line.replace('## ', '')}
                </h2>
            );
        } else if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="font-serif text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">
                    {line.replace('### ', '')}
                </h3>
            );
        } else if (line.startsWith('**') && line.endsWith('**')) {
            elements.push(
                <p key={i} className="font-semibold text-gray-900 dark:text-white mt-4">
                    {line.replace(/\*\*/g, '')}
                </p>
            );
        } else if (line.startsWith('- ')) {
            const listItems: string[] = [];
            while (i < lines.length && lines[i].startsWith('- ')) {
                listItems.push(lines[i].replace('- ', ''));
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`} className="list-none space-y-2 my-4">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-text-secondary">
                            <span className="text-primary mt-1 shrink-0">▸</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                    ))}
                </ul>
            );
            continue;
        } else if (line.startsWith('| ')) {
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].startsWith('|')) {
                if (!lines[i].match(/^\|[-| ]+\|$/)) tableLines.push(lines[i]);
                i++;
            }
            const [header, ...rows] = tableLines;
            const headers = header.split('|').filter(Boolean).map(s => s.trim());
            elements.push(
                <div key={`tbl-${i}`} className="overflow-x-auto my-6">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-primary/10">
                                {headers.map((h, idx) => (
                                    <th key={idx} className="text-left px-4 py-2 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-dark-600">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rIdx) => (
                                <tr key={rIdx} className="even:bg-gray-50 dark:even:bg-dark-700/50">
                                    {row.split('|').filter(Boolean).map((cell, cIdx) => (
                                        <td key={cIdx} className="px-4 py-2 text-gray-600 dark:text-text-secondary border border-gray-200 dark:border-dark-600">
                                            {cell.trim()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            continue;
        } else if (line.trim() === '') {
            // skip blank lines
        } else {
            const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            elements.push(
                <p key={i} className="text-gray-600 dark:text-text-secondary leading-relaxed my-3"
                    dangerouslySetInnerHTML={{ __html: html }} />
            );
        }
        i++;
    }
    return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

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
                        <span className="text-7xl hidden sm:block opacity-70 mt-1 shrink-0">{post.coverEmoji}</span>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-gray-500 dark:text-text-secondary text-lg leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-gray-400 dark:text-text-muted">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} /> {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} /> {post.readTime} min de lectura
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
                        <div className="prose-content">
                            {renderContent(post.content)}
                        </div>

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
                        <div className="card-glass p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">
                                Artículos relacionados
                            </h3>
                            <div className="space-y-4">
                                {related.map((r) => (
                                    <Link key={r.id} href={`/blog/${r.slug}`} className="group flex items-start gap-3">
                                        <span className="text-2xl shrink-0">{r.coverEmoji}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                                {r.title}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-text-muted mt-1">{r.readTime} min</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

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
