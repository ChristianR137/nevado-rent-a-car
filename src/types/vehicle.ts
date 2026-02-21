export type VehicleType = 'SUV' | 'Sedan' | 'Pickup' | 'Economico' | 'Camioneta';
export type TransmissionType = 'Manual' | 'Automatico';
export type FuelType = 'Gasolina' | 'Diesel' | 'Hibrido';

export interface Vehicle {
    id: string;
    slug: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    type: VehicleType;
    transmission: TransmissionType;
    passengers: number;
    doors: number;
    luggage: number;
    fuelType: FuelType;
    ac: boolean;
    pricePerDay: number;
    images: string[];
    features: string[];
    description: string;
    available: boolean;
    isPopular: boolean;
    rating?: number;
    reviewCount?: number;
}

export interface SearchFilters {
    startDate: string | null;
    endDate: string | null;
    pickupLocation: string | null;
    vehicleType: VehicleType | null;
    transmission: TransmissionType | null;
    minPrice: number;
    maxPrice: number;
}
