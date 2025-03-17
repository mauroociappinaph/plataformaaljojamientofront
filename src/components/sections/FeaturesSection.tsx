interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Reservas seguras",
    description: "Sistema de pago seguro y verificación de identidad para tu tranquilidad.",
  },
  {
    title: "Atención 24/7",
    description: "Soporte disponible en todo momento para ayudarte con lo que necesites.",
  },
  {
    title: "Mejores precios",
    description: "Garantizamos los mejores precios para tu estancia perfecta.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
