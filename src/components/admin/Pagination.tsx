'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-700 px-6 py-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn-outline flex items-center px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn-outline flex items-center px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Mostrando página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            const isCurrent = page === currentPage;

                            // Simple logic to show current, first, last, and +-1 from current
                            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        aria-current={isCurrent ? 'page' : undefined}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${isCurrent
                                                ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                                                : 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            }

                            // Ellipsis
                            if (page === 2 && currentPage > 3) {
                                return <span key={`ellipsis-${page}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-dark-600">...</span>;
                            }
                            if (page === totalPages - 1 && currentPage < totalPages - 2) {
                                return <span key={`ellipsis-${page}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-dark-600">...</span>;
                            }

                            return null;
                        })}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
