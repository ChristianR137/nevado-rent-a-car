import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nevado Rent A Car – Alquiler de Autos en Cusco',
    template: '%s | Nevado Rent A Car',
  },
  description:
    'Alquila el auto perfecto para explorar Cusco y el Valle Sagrado. Flota moderna de SUVs, pickups y sedanes con los mejores precios del mercado.',
  keywords: [
    'alquiler de autos cusco',
    'rent a car cusco',
    'alquiler camioneta cusco',
    'alquiler SUV peru',
    'nevado rent a car',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Nevado Rent A Car',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#FFFFFF',
                border: '1px solid #2E2E2E',
              },
              success: {
                iconTheme: { primary: '#C8960C', secondary: '#0A0A0A' },
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

