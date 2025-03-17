import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
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
  );
}
