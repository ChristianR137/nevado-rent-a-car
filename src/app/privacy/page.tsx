export const metadata = {
    title: 'Política de Privacidad | Nevado Rent A Car',
    description: 'Política de privacidad y manejo de datos de Nevado Rent A Car.',
};

export default function PrivacyPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark">
            <div className="container-custom max-w-4xl">
                <h1 className="heading-lg mb-8 text-gray-900 dark:text-white mt-8">Política de Privacidad</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-text-secondary">
                    <p>Última actualización: {new Date().toLocaleDateString('es-PE')}</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Tratamiento de Datos Personales</h2>
                    <p>En cumplimiento con la Ley de Protección de Datos Personales (Ley N° 29733) de Perú, Nevado Rent A Car informa que los datos personales que los usuarios proporcionen en nuestro sitio web o al momento de reservar serán tratados con la máxima confidencialidad.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Uso de la Información</h2>
                    <p>La información recopilada será utilizada exclusivamente para:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Procesar y gestionar sus reservas de vehículos.</li>
                        <li>Comunicarnos con usted respecto a su alquiler (confirmaciones, recordatorios).</li>
                        <li>Facturación y cobro.</li>
                        <li>Mejorar nuestros servicios y personalizar su experiencia.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Compartir Información</h2>
                    <p>Nevado Rent A Car no vende, alquila ni comparte su información personal con terceros ajenos a nuestra operación, excepto cuando sea requerido por la ley o para salvaguardar nuestros derechos e intereses legítimos.</p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Derechos ARCO</h2>
                    <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede comunicarse a nuestro correo oficial reservas@nevadorentacar.com.</p>
                </div>
            </div>
        </div>
    );
}
