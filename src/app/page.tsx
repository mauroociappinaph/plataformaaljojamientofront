import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Encuentra el lugar perfecto para tus vacaciones
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Explora alojamientos únicos en todo el mundo, desde apartamentos modernos hasta casas de campo tradicionales.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg">
                Explorar alojamientos
              </Button>
              <Button variant="outline" size="lg">
                Publicar alojamiento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Destinos populares</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder cards - to be replaced with real data */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">Destino {i + 1}</h3>
                  <p className="text-sm text-gray-500">A partir de $100/noche</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
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
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
