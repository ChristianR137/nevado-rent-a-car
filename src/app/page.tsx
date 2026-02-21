import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nevado Rent A Car – Alquiler de Autos en Cusco',
  description:
    'Alquila el auto perfecto para explorar Cusco, el Valle Sagrado y Machu Picchu. Flota de SUVs, pickups y sedanes con los mejores precios.',
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
      <FeaturedVehicles />
      <WhyChooseUs />
      <ServicesOverview />
    </>
  );
}
