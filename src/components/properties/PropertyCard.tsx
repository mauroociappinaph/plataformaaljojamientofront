import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { PropertyCardProps } from '@/types/property.types';
import { ROUTES } from '@/constants/routes';
import { usePropertyFavorite, useFormatPrice, useTruncateText } from '@/hooks';

export function PropertyCard({ property, onFavoriteToggle, isFavorite = false }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Usar el hook de favoritos
  const { isFavorite: favorite, handleFavoriteClick } = usePropertyFavorite(
    property.id,
    isFavorite,
    onFavoriteToggle
  );

  // Usar el hook para formatear precios
  const formatPrice = useFormatPrice('ARS');
  const formattedPrice = formatPrice(property.price);

  // Usar el hook para truncar textos
  const truncateText = useTruncateText();
  const truncatedDescription = truncateText(property.description, 100);

  return (
    <Link
      href={ROUTES.PROPERTY_DETAIL(property.id)}
      className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen principal y favorito */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-400">Sin imagen</p>
          </div>
        )}

        {/* Botón de favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-colors hover:bg-white z-10"
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorite ? (
            <HeartIconSolid className="w-5 h-5 text-vacacional-rojo" />
          ) : (
            <HeartIcon className="w-5 h-5 text-vacacional-rojo" />
          )}
        </button>

        {/* Categoría */}
        {property.category && (
          <div className="absolute bottom-3 left-3 py-1 px-3 bg-white/80 backdrop-blur-sm rounded-lg text-xs font-medium text-vacacional-texto z-10">
            {property.category.name}
          </div>
        )}
      </div>

      {/* Información de la propiedad */}
      <div className="flex flex-col flex-grow p-4">
        {/* Ubicación */}
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span className="truncate">{property.city}, {property.country}</span>
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold text-vacacional-texto mb-1 line-clamp-2">
          {property.title}
        </h3>

        {/* Descripción corta */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {truncatedDescription}
        </p>

        {/* Características principales */}
        <div className="flex gap-3 text-sm text-gray-600 mb-4">
          <span>{property.maxGuests} huéspedes</span>
          <span>•</span>
          <span>{property.bedrooms} hab.</span>
          <span>•</span>
          <span>{property.bathrooms} baños</span>
        </div>

        {/* Precio y valoración */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-vacacional-texto">{formattedPrice}</span>
            <span className="text-sm text-gray-500"> /noche</span>
          </div>

          {property.rating > 0 && (
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-vacacional-salvia fill-vacacional-salvia mr-1" />
              <span className="text-sm font-medium">{property.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
