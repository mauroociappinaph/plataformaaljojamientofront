import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, HomeIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Reservas seguras",
    description: "Sistema de pago seguro y verificación de identidad para garantizar la seguridad en cada reserva de alojamiento.",
    icon: <ShieldCheckIcon className="h-10 w-10 text-vacacional-salvia" />
  },
  {
    title: "Asistente de búsqueda IA",
    description: "Nuestro asistente virtual responde a tus preguntas específicas y te ayuda a encontrar el alojamiento perfecto para tus necesidades.",
    icon: <ClockIcon className="h-10 w-10 text-vacacional-salvia" />
  },
  {
    title: "Mejores precios",
    description: "Garantizamos los mejores precios del mercado para tu alojamiento vacacional sin cargos ocultos ni sorpresas.",
    icon: <CurrencyDollarIcon className="h-10 w-10 text-vacacional-salvia" />
  },
  {
    title: "Alojamientos verificados",
    description: "Todas nuestras propiedades pasan por un riguroso proceso de verificación para garantizar su calidad y autenticidad.",
    icon: <HomeIcon className="h-10 w-10 text-vacacional-salvia" />
  },
  {
    title: "Reseñas auténticas",
    description: "Lee opiniones de huéspedes reales que han experimentado cada alojamiento para tomar la mejor decisión.",
    icon: <StarIcon className="h-10 w-10 text-vacacional-salvia" />
  },
  {
    title: "Programa de fidelización",
    description: "Nuestro innovador programa ofrece experiencias exclusivas y descuentos personalizados en alojamientos para usuarios frecuentes.",
    icon: <UserGroupIcon className="h-10 w-10 text-vacacional-salvia" />
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-vacacional-menta/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-vacacional-texto">Por qué elegirnos para tu alojamiento</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Nos especializamos exclusivamente en ayudarte a encontrar el alojamiento perfecto para tus vacaciones,
            con beneficios diseñados para mejorar tu experiencia de búsqueda y reserva.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="relative pl-16">
              <div className="absolute left-0 top-0">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-vacacional-texto mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-vacacional-texto mb-4">¿Listo para encontrar tu alojamiento ideal?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Miles de opciones de alojamiento te esperan. Reserva ahora y disfruta de recomendaciones personalizadas para tu estancia.
          </p>
          <button className="px-6 py-3 bg-vacacional-salvia text-white font-medium rounded-lg hover:bg-vacacional-texto transition-colors">
            Buscar alojamiento
          </button>
        </div>
      </div>
    </section>
  );
}
