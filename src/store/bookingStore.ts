import { create } from 'zustand';
import { Vehicle } from '@/types/vehicle';
import { AdditionalService } from '@/types/booking';
import { calculateDays } from '@/lib/utils/calculateDays';

interface BookingState {
    selectedVehicle: Vehicle | null;
    startDate: string | null;
    endDate: string | null;
    pickupLocation: string | null;
    additionalServices: AdditionalService[];
    totalDays: number;
    subtotal: number;
    servicesTotal: number;
    totalPrice: number;

    // Actions
    setVehicle: (vehicle: Vehicle | null) => void;
    setDates: (startDate: string, endDate: string) => void;
    setPickupLocation: (location: string) => void;
    toggleService: (service: AdditionalService) => void;
    removeService: (serviceId: string) => void;
    reset: () => void;
}

const computeTotals = (
    vehicle: Vehicle | null,
    startDate: string | null,
    endDate: string | null,
    services: AdditionalService[]
) => {
    const days =
        startDate && endDate ? calculateDays(startDate, endDate) : 0;
    const subtotal = vehicle ? vehicle.pricePerDay * days : 0;
    const servicesTotal = services.reduce((acc, s) => acc + s.pricePerDay * days, 0);
    return { totalDays: days, subtotal, servicesTotal, totalPrice: subtotal + servicesTotal };
};

export const useBookingStore = create<BookingState>((set, get) => ({
    selectedVehicle: null,
    startDate: null,
    endDate: null,
    pickupLocation: null,
    additionalServices: [],
    totalDays: 0,
    subtotal: 0,
    servicesTotal: 0,
    totalPrice: 0,

    setVehicle: (vehicle) => {
        const { startDate, endDate, additionalServices } = get();
        const totals = computeTotals(vehicle, startDate, endDate, additionalServices);
        set({ selectedVehicle: vehicle, ...totals });
    },

    setDates: (startDate, endDate) => {
        const { selectedVehicle, additionalServices } = get();
        const totals = computeTotals(selectedVehicle, startDate, endDate, additionalServices);
        set({ startDate, endDate, ...totals });
    },

    setPickupLocation: (pickupLocation) => set({ pickupLocation }),

    toggleService: (service) => {
        const { additionalServices, selectedVehicle, startDate, endDate } = get();
        const exists = additionalServices.find((s) => s.id === service.id);
        const updated = exists
            ? additionalServices.filter((s) => s.id !== service.id)
            : [...additionalServices, service];
        const totals = computeTotals(selectedVehicle, startDate, endDate, updated);
        set({ additionalServices: updated, ...totals });
    },

    removeService: (serviceId) => {
        const { additionalServices, selectedVehicle, startDate, endDate } = get();
        const updated = additionalServices.filter((s) => s.id !== serviceId);
        const totals = computeTotals(selectedVehicle, startDate, endDate, updated);
        set({ additionalServices: updated, ...totals });
    },

    reset: () =>
        set({
            selectedVehicle: null,
            startDate: null,
            endDate: null,
            pickupLocation: null,
            additionalServices: [],
            totalDays: 0,
            subtotal: 0,
            servicesTotal: 0,
            totalPrice: 0,
        }),
}));
