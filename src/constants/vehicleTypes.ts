export const VEHICLE_TYPES = [
    { value: 'SUV', label: 'SUV' },
    { value: 'Sedan', label: 'Sedán' },
    { value: 'Pickup', label: 'Pickup' },
    { value: 'Economico', label: 'Económico' },
    { value: 'Camioneta', label: 'Camioneta' },
] as const;

export const TRANSMISSION_TYPES = [
    { value: 'Manual', label: 'Manual' },
    { value: 'Automatico', label: 'Automático' },
] as const;

export const FUEL_TYPES = [
    { value: 'Gasolina', label: 'Gasolina' },
    { value: 'Diesel', label: 'Díesel' },
    { value: 'Hibrido', label: 'Híbrido' },
] as const;

export const PRICE_RANGE = { min: 80, max: 600 };
