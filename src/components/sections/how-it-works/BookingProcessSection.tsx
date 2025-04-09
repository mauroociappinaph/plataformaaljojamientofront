import {
  MagnifyingGlassIcon,
  CalendarIcon,
  CreditCardIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { Step, StepProcess, StepProcessType } from '@/types/step.types';

const bookingSteps: Step[] = [
  {
    id: 1,
    title: "Busca tu destino ideal",
    description: "Utiliza nuestros filtros avanzados para encontrar el alojamiento perfecto según tus preferencias de ubicación, precio y comodidades.",
    icon: <MagnifyingGlassIcon className="h-8 w-8 text-vacacional-salvia" />
  },
  {
    id: 2,
    title: "Selecciona fechas",
    description: "Elige las fechas de tu estancia y visualiza la disponibilidad en tiempo real. Nuestro sistema te muestra las mejores opciones para tu calendario.",
    icon: <CalendarIcon className="h-8 w-8 text-vacacional-salvia" />
  },
  {
    id: 3,
    title: "Reserva con confianza",
    description: "Completa tu reserva de forma segura con nuestro sistema de pagos protegido. Recibe confirmación instantánea y detalles de tu estancia.",
    icon: <CreditCardIcon className="h-8 w-8 text-vacacional-salvia" />
  },
  {
    id: 4,
    title: "Disfruta tu estancia",
    description: "Vive una experiencia única en un alojamiento verificado y disfruta de atención personalizada durante toda tu estadía.",
    icon: <HomeIcon className="h-8 w-8 text-vacacional-salvia" />
  }
];

const bookingProcess: StepProcess = {
  type: StepProcessType.BOOKING,
  title: "Reserva en 4 simples pasos",
  steps: bookingSteps
};

export function BookingProcessSection() {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-vacacional-texto text-center mb-10">{bookingProcess.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bookingProcess.steps.map((step) => (
          <div key={step.id} className="bg-vacacional-menta/5 rounded-xl p-6 relative">
            <div className="absolute -top-4 -left-4 bg-vacacional-salvia w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
              {step.id}
            </div>
            <div className="flex justify-center mb-4">
              {step.icon}
            </div>
            <h4 className="text-xl font-semibold text-vacacional-texto mb-2 text-center">{step.title}</h4>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
