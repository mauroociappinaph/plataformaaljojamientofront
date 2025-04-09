import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  comment: string;
  date: string;
  propertyType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    location: "Madrid, España",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    comment: "Increíble experiencia. El apartamento era exactamente como en las fotos, muy limpio y en una ubicación perfecta. El sistema de búsqueda me ayudó a encontrar justo lo que necesitaba. ¡Definitivamente volveré a usar esta plataforma!",
    date: "Marzo 2023",
    propertyType: "Apartamento en Barcelona"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    location: "Buenos Aires, Argentina",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "La búsqueda de alojamiento fue muy sencilla y el asistente virtual me ayudó a encontrar la casa perfecta para nuestra familia. El único pequeño inconveniente fue el check-in tardío, pero el anfitrión fue muy amable y nos compensó.",
    date: "Enero 2023",
    propertyType: "Casa en Mendoza"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    location: "Lyon, Francia",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    comment: "¡El sistema de recomendaciones personalizadas es extraordinario! Me sugirió villas que coincidían exactamente con mis preferencias. La villa tenía unas vistas impresionantes al mar. El proceso de reserva fue sencillo y rápido.",
    date: "Julio 2023",
    propertyType: "Villa en Costa Azul"
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-vacacional-texto">Opiniones sobre nuestros alojamientos</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Miles de huéspedes confían en nosotros para encontrar el alojamiento perfecto.
            Descubre sus experiencias con nuestra plataforma de búsqueda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-vacacional-gris-verde/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-vacacional-texto">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-vacacional-salvia' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-4">
                &ldquo;{testimonial.comment}&rdquo;
              </blockquote>

              <div className="mt-4 pt-4 border-t border-vacacional-crema">
                <p className="text-sm text-vacacional-texto">{testimonial.propertyType}</p>
                <p className="text-xs text-gray-400 mt-1">Alojamiento reservado en {testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-vacacional-texto mb-4">¿Ya has reservado un alojamiento con nosotros?</h3>
          <button className="px-6 py-3 bg-vacacional-salvia text-white font-medium rounded-lg hover:bg-vacacional-texto transition-colors">
            Dejar mi opinión sobre el alojamiento
          </button>
        </div>
      </div>
    </section>
  );
}
