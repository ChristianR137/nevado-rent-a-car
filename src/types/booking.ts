import { Vehicle } from './vehicle';

export interface AdditionalService {
    id: string;
    name: string;
    description: string;
    pricePerDay: number;
    icon: string;
    isPopular: boolean;
}

export interface Booking {
    id?: string;
    vehicleId: string;
    vehicle?: Vehicle;
    // Customer data
    fullName: string;
    dni: string;
    phone: string;
    email: string;
    // Rental details
    pickupLocation: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    additionalServices: AdditionalService[];
    subtotal: number;
    servicesTotal: number;
    totalPrice: number;
    status?: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: string;
}

export interface BookingFormData {
    fullName: string;
    dni: string;
    phone: string;
    email: string;
    pickupLocation: string;
    startDate: string;
    endDate: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
