import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, HomeIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Reservas seguras",
    description: "Sistema de pago seguro y verificación de identidad para tu tranquilidad. Protección completa en cada reserva.",
    icon: <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Atención 24/7",
    description: "Soporte disponible en todo momento para ayudarte con lo que necesites, en cualquier lugar del mundo.",
    icon: <ClockIcon className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Mejores precios",
    description: "Garantizamos los mejores precios del mercado para tu estancia perfecta. Sin cargos ocultos ni sorpresas.",
    icon: <CurrencyDollarIcon className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Propiedades verificadas",
    description: "Todas nuestras propiedades pasan por un riguroso proceso de verificación para garantizar su calidad y autenticidad.",
    icon: <HomeIcon className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Reseñas auténticas",
    description: "Lee opiniones de viajeros reales que han experimentado cada propiedad para tomar la mejor decisión.",
    icon: <StarIcon className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Comunidad de viajeros",
    description: "Únete a nuestra comunidad global de viajeros y comparte experiencias, consejos y recomendaciones.",
    icon: <UserGroupIcon className="h-10 w-10 text-blue-500" />
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Por qué elegirnos</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una experiencia única para encontrar el alojamiento perfecto para tus vacaciones,
            con beneficios exclusivos que harán de tu viaje una experiencia inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="relative pl-16">
              <div className="absolute left-0 top-0">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para encontrar tu próximo destino?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Miles de opciones te esperan. Encuentra el alojamiento perfecto para tus próximas vacaciones.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Comenzar ahora
          </button>
        </div>
      </div>
    </section>
  );
}
