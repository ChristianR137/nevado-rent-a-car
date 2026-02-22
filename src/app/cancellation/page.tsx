export const metadata = {
    title: 'Políticas de Cancelación | Nevado Rent A Car',
    description: 'Políticas de cancelación y reembolsos para reservas de vehículos en Nevado Rent A Car.',
};

export default function CancellationPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark">
            <div className="container-custom max-w-4xl">
                <h1 className="heading-lg mb-8 text-gray-900 dark:text-white mt-8">Políticas de Cancelación</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-text-secondary">
                    <p>Última actualización: {new Date().toLocaleDateString('es-PE')}</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Tiempos de Cancelación y Reembolsos</h2>
                    <p>Entendemos que los planes pueden cambiar. Nuestras tarifas de cancelación son las siguientes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Más de 48 horas de anticipación:</strong> Reembolso del 100% de la reserva.</li>
                        <li><strong>Entre 24 y 48 horas de anticipación:</strong> Reembolso del 50% de la reserva o retención de 1 día de alquiler, lo que resulte mayor.</li>
                        <li><strong>Menos de 24 horas o "No show" (no asistencia):</strong> No hay reembolso. El cliente asume el 100% del costo de la reserva por los días bloqueados.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Modificaciones a la Reserva</h2>
                    <p>Los cambios en las fechas, vehículos o servicios adicionales están sujetos a disponibilidad y deben solicitarse con al menos 48 horas de antelación sin aplicar penalidades. Si el cambio resulta en una tarifa mayor, se cobrará la diferencia.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Devolución Anticipada del Vehículo</h2>
                    <p>Si el cliente decide devolver el vehículo antes de la fecha y hora estipuladas en el contrato, Nevado Rent A Car no estará en la obligación de reembolsar el dinero por los días o horas no utilizados.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Procedimiento</h2>
                    <p>Toda cancelación de reserva debe gestionarse comunicándose al número oficial de WhatsApp o respondiendo al correo de confirmación enviado por ventas.</p>
                </div>
            </div>
        </div>
    );
}
