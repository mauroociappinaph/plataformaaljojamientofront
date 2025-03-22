import {
  ShieldCheckIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { Step, StepProcess, StepProcessType } from '@/types/step.types';

const verificationSteps: Step[] = [
  {
    id: 1,
    title: "Autenticación de propiedades",
    description: "Verificamos la ubicación y características de cada alojamiento para garantizar que recibas exactamente lo que reservas.",
    icon: <ShieldCheckIcon className="h-8 w-8 text-vacacional-tierra" />
  },
  {
    id: 2,
    title: "Estándares de calidad",
    description: "Cada propiedad cumple con nuestros estrictos criterios de limpieza, seguridad y servicios para asegurar tu comodidad.",
    icon: <CheckBadgeIcon className="h-8 w-8 text-vacacional-tierra" />
  }
];

const verificationProcess: StepProcess = {
  type: StepProcessType.VERIFICATION,
  title: "Proceso de verificación de alojamientos",
  steps: verificationSteps
};

export function VerificationProcessSection() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-vacacional-texto text-center mb-10">{verificationProcess.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {verificationProcess.steps.map((step) => (
          <div key={step.id} className="bg-white border border-vacacional-tierra/20 rounded-xl p-6 shadow-sm flex">
            <div className="mr-4 p-2 bg-vacacional-tierra/10 rounded-lg">
              {step.icon}
            </div>
            <div>
              <h4 className="text-xl font-medium text-vacacional-texto mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-vacacional-tierra/5 p-6 rounded-xl flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-vacacional-texto">Garantía de alojamiento verificado</h4>
          <p className="text-gray-600">Todas nuestras propiedades cuentan con el sello de verificación que garantiza su autenticidad y calidad.</p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-vacacional-tierra/10 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="h-10 w-10 text-vacacional-tierra" />
          </div>
        </div>
      </div>
    </div>
  );
}
