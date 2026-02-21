const WHATSAPP_NUMBER = '51987654321'; // Replace with real number

interface WhatsAppOptions {
    vehicleName?: string;
    startDate?: string;
    endDate?: string;
    pickupLocation?: string;
    totalPrice?: number;
}

export const generateWhatsAppLink = (options: WhatsAppOptions = {}): string => {
    const { vehicleName, startDate, endDate, pickupLocation, totalPrice } = options;

    let message = '¡Hola! Me interesa alquilar un vehículo con *Nevado Rent A Car*.';

    if (vehicleName) {
        message += `\n\n🚗 *Vehículo:* ${vehicleName}`;
    }
    if (startDate && endDate) {
        message += `\n📅 *Fechas:* ${startDate} al ${endDate}`;
    }
    if (pickupLocation) {
        message += `\n📍 *Recojo:* ${pickupLocation}`;
    }
    if (totalPrice) {
        message += `\n💰 *Total estimado:* S/ ${totalPrice}`;
    }

    message += '\n\n¿Podrían confirmarme la disponibilidad? Gracias 🙏';

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
