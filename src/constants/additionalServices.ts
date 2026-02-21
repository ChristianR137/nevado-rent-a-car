import { AdditionalService } from '@/types/booking';

export const ADDITIONAL_SERVICES: AdditionalService[] = [
    {
        id: 'conductor-privado',
        name: 'Conductor Privado',
        description: 'Chofer profesional con experiencia en rutas de montaña y destinos turísticos de la región Cusco.',
        pricePerDay: 120,
        icon: 'UserCheck',
        isPopular: true,
    },
    {
        id: 'seguro-adicional',
        name: 'Seguro Adicional',
        description: 'Cobertura extendida contra daños, robo y responsabilidad civil. Tranquilidad total durante tu viaje.',
        pricePerDay: 35,
        icon: 'Shield',
        isPopular: true,
    },
    {
        id: 'entrega-aeropuerto',
        name: 'Entrega en Aeropuerto',
        description: 'Recibe tu vehículo directamente en el Aeropuerto Alejandro Velasco Astete sin tiempo de espera.',
        pricePerDay: 50,
        icon: 'Plane',
        isPopular: false,
    },
    {
        id: 'asistencia-24-7',
        name: 'Asistencia 24/7',
        description: 'Soporte técnico y asistencia en carretera disponible las 24 horas durante todo tu recorrido.',
        pricePerDay: 25,
        icon: 'Headphones',
        isPopular: true,
    },
    {
        id: 'gps-navegador',
        name: 'GPS / Navegador',
        description: 'Navegador GPS actualizado con mapas de Cusco, Valle Sagrado, Puno y principales rutas del sur.',
        pricePerDay: 15,
        icon: 'MapPin',
        isPopular: false,
    },
    {
        id: 'silla-bebe',
        name: 'Silla para Bebé',
        description: 'Silla de seguridad homologada para niños de 0 a 4 años. Tu familia viaja segura.',
        pricePerDay: 20,
        icon: 'Baby',
        isPopular: false,
    },
];
