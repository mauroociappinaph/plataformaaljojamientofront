import {
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Step, StepProcess, StepProcessType } from '@/types/step.types';

const aiAssistantFeatures: Step[] = [
  {
    id: 1,
    title: "Consultas personalizadas",
    description: "Nuestro asistente de IA responde a tus preguntas específicas sobre destinos, alojamientos y servicios disponibles.",
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8 text-vacacional-texto" />
  },
  {
    id: 2,
    title: "Recomendaciones inteligentes",
    description: "Recibe sugerencias de alojamientos basadas en tus preferencias, historial de búsqueda y valoraciones de otros usuarios.",
    icon: <StarIcon className="h-8 w-8 text-vacacional-texto" />
  }
];

const aiAssistantProcess: StepProcess = {
  type: StepProcessType.AI_ASSISTANT,
  title: "Tu asistente de viaje con IA",
  steps: aiAssistantFeatures
};

export function AIAssistantSection() {
  return (
    <div className="mb-20 bg-vacacional-menta/10 rounded-2xl p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
          <h3 className="text-2xl font-semibold text-vacacional-texto mb-6">{aiAssistantProcess.title}</h3>
          <div className="space-y-6">
            {aiAssistantProcess.steps.map((feature) => (
              <div key={feature.id} className="flex items-start">
                <div className="mr-4 p-2 bg-white rounded-lg shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-vacacional-texto">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 px-6 py-3 bg-vacacional-texto text-white font-medium rounded-lg hover:bg-vacacional-texto/90 transition-colors">
            Probar el asistente
          </button>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-80">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl">
            {/* Aquí iría la imagen o animación del asistente IA */}
            <p className="text-gray-500 text-sm">Imagen ilustrativa del asistente IA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
