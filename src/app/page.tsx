import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ShowcaseSection from '@/components/home/ShowcaseSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nevado Rent A Car – Alquiler de Autos en Piura',
  description:
    'Alquila el auto perfecto para explorar Piura, Máncora y el Norte del Perú. Flota de SUVs, pickups y sedanes con los mejores precios.',
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
      <ShowcaseSection />
      <FeaturedVehicles />
      <WhyChooseUs />
      <ServicesOverview />
    </>
  );
}
