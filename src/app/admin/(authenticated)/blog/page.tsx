import { createClient } from '@/utils/supabase/server';
import { FileText, Plus, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Pagination from '@/components/admin/Pagination';
import TableSearch from '@/components/admin/TableSearch';

export const metadata: Metadata = {
    title: 'Gestor del Blog | Nevado Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string }>;
}) {
    const supabase = await createClient();
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const searchQuery = resolvedSearchParams.q || '';
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' });

    if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);
    }

    const { data: posts, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    const totalPages = Math.ceil((count || 0) / limit);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <FileText className="text-primary" />
                        Blog
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona los artículos de tu sitio web, sus metas SEO y el contenido.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <Plus size={20} />
                    <span>Nuevo Artículo</span>
                </Link>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
                    <XCircle size={20} />
                    <p>Error al cargar los artículos: {error.message}</p>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <TableSearch placeholder="Buscar por título o categoría..." />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-dark-700">
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Título</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Categoría</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Lectura</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                            {posts?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                        No se encontraron artículos.
                                    </td>
                                </tr>
                            ) : (
                                posts?.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className="text-xl">{post.cover_emoji}</span>
                                                <span className="line-clamp-1">{post.title}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 hidden sm:block">
                                                {post.excerpt}
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {post.is_published ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                                                    <CheckCircle size={12} />
                                                    Publicado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                                                    <Clock size={12} />
                                                    Borrador
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 hidden lg:table-cell">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{post.read_time} min</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-primary hover:text-white border border-primary hover:bg-primary rounded-lg transition-colors"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark flex justify-center">
                        <Pagination totalPages={totalPages} currentPage={page} />
                    </div>
                )}
            </div>
        </div>
    );
}
