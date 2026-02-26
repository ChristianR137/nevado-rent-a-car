export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white flex flex-col">
            {children}
        </div>
    );
}
