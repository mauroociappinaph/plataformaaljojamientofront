interface Destination {
  id: number;
  name: string;
  price: number;
  image: string;
}

const destinations: Destination[] = [
  { id: 1, name: "Bali, Indonesia", price: 100, image: "/destinations/bali.jpg" },
  { id: 2, name: "París, Francia", price: 150, image: "/destinations/paris.jpg" },
  { id: 3, name: "Nueva York, USA", price: 200, image: "/destinations/nyc.jpg" },
  { id: 4, name: "Tokio, Japón", price: 180, image: "/destinations/tokyo.jpg" },
];

export function PopularDestinations() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Destinos populares</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {/* Aquí irá la imagen cuando tengamos las imágenes reales */}
                <div className="h-full w-full bg-gray-200" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                <p className="text-sm text-gray-500">
                  A partir de ${destination.price}/noche
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
