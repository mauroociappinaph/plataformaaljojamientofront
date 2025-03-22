
import { AIAssistantSection } from './how-it-works/AIAssistantSection';
import { BookingProcessSection } from './how-it-works/BookingProcessSection';
import { VerificationProcessSection } from './how-it-works/VerificationProcessSection';


export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-vacacional-texto">Cómo funciona nuestra plataforma</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre el proceso simplificado para encontrar y reservar tu alojamiento ideal con nuestras herramientas exclusivas.
          </p>
        </div>

        {/* Proceso de reserva */}
        <BookingProcessSection />

        {/* Asistente IA */}
        <AIAssistantSection />

        {/* Proceso de verificación */}
        <VerificationProcessSection />
      </div>
    </section>
  );
}
