import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Destination {
  id: number;
  name: string;
  price: number;
  image: string;
  properties: number;
  description: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali, Indonesia",
    price: 100,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format",
    properties: 340,
    description: "Paraíso tropical con playas increíbles y templos místicos"
  },
  {
    id: 2,
    name: "París, Francia",
    price: 150,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format",
    properties: 520,
    description: "La ciudad del amor con monumentos icónicos y gastronomía excepcional"
  },
  {
    id: 3,
    name: "Nueva York, USA",
    price: 200,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format",
    properties: 750,
    description: "La Gran Manzana nunca duerme, llena de cultura y entretenimiento"
  },
  {
    id: 4,
    name: "Tokio, Japón",
    price: 180,
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800&auto=format",
    properties: 420,
    description: "Mezcla perfecta de tradición ancestral y tecnología futurista"
  },
];

export function PopularDestinations() {
  return (
    <section className="py-20 bg-vacacional-crema/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-vacacional-texto mb-3">Destinos populares</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre los lugares más buscados por nuestros viajeros y comienza a planear tu próxima aventura
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={800}
                  height={533}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vacacional-texto/80 to-transparent opacity-80"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <div className="flex items-center mt-2 text-white/90">
                  <span>{destination.properties} propiedades</span>
                  <span className="mx-2">•</span>
                  <span>Desde ${destination.price}/noche</span>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-vacacional-salvia text-white font-medium hover:bg-vacacional-texto transition-colors"
          >
            Explorar todos los destinos
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
