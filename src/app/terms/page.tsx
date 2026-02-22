export const metadata = {
    title: 'Términos y Condiciones | Nevado Rent A Car',
    description: 'Términos y condiciones del servicio de alquiler de vehículos de Nevado Rent A Car.',
};

export default function TermsPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark">
            <div className="container-custom max-w-4xl">
                <h1 className="heading-lg mb-8 text-gray-900 dark:text-white mt-8">Términos y Condiciones</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-text-secondary">
                    <p>Última actualización: {new Date().toLocaleDateString('es-PE')}</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Generalidades</h2>
                    <p>Estos términos y condiciones rigen el uso de los servicios de alquiler de vehículos proporcionados por Nevado Rent A Car. Al reservar un vehículo, el cliente acepta expresamente estos términos.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Requisitos de Alquiler</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Edad mínima de 21 años.</li>
                        <li>Licencia de conducir vigente y en regla (Categoría A-I o superior).</li>
                        <li>DNI o Pasaporte vigente.</li>
                        <li>Tarjeta de crédito en físico a nombre del titular para el depósito de garantía.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Uso del Vehículo</h2>
                    <p>El vehículo alquilado solo puede ser conducido por el titular del alquiler o los conductores adicionales registrados. Está prohibido subarrendar, usar el vehículo para competencias, o conducirlo bajo los efectos del alcohol o drogas.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Seguro y Deducibles</h2>
                    <p>Nuestros vehículos incluyen seguro contra todo riesgo con un deducible establecido en el contrato. El deducible no aplica si se determinó negligencia grave, conducir fuera de rutas autorizadas, o incumplimiento de las leyes de tránsito vigentes.</p>
                </div>
            </div>
        </div>
    );
}
