'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  HeartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
  HomeIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { PropertyDetailProps } from '@/types/property.types';
import {
  usePropertyDetail,
  usePropertyGallery,
  usePropertyFavorite,
  useFormatPrice
} from '@/hooks';

export function PropertyDetail({
  propertyId,
  initialData,
  isFavorite: initialIsFavorite = false,
  onFavoriteToggle,
  initialImageIndex = 0
}: PropertyDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Usar hooks para la lógica de la propiedad
  const { property, isLoading, error } = usePropertyDetail({
    propertyId,
    initialData
  });

  // Hook para gestionar el estado de favorito
  const { isFavorite, handleFavoriteClick } = usePropertyFavorite(
    propertyId,
    initialIsFavorite,
    onFavoriteToggle
  );

  // Formatear precio
  const formatPrice = useFormatPrice('ARS');

  // Hook para gestionar la galería de imágenes
  const {
    currentImage,
    currentIndex,
    totalImages,
    hasMultipleImages,
    isFirstImage,
    isLastImage,
    goToNextImage,
    goToPreviousImage,
    goToImage
  } = usePropertyGallery({
    images: property?.images || [],
    initialIndex: initialImageIndex
  });

  // Si está cargando, mostrar un esqueleto de carga
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
          </div>
          <div className="col-span-1">
            <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si hay un error o no hay propiedad, mostrar mensaje de error
  if (error || !property) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="mb-6 text-vacacional-rojo">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error || 'No se pudo cargar la propiedad'}
        </h2>
        <p className="text-gray-600 mb-8">
          La propiedad que buscas no está disponible o ha sido eliminada.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-vacacional-salvia text-white font-medium rounded-lg hover:bg-vacacional-salvia/90 transition-colors"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const formattedPrice = formatPrice(property.price);

  // Función para manejar el clic en el botón de reserva
  const handleBookingClick = () => {
    // Implementación local del booking
    console.log(`Iniciar reserva para propiedad: ${propertyId}`);
    // En un caso real, aquí redirigirías a la página de reserva
    // o mostrarías un modal para completar la reserva
  };

  // Preparar la descripción para mostrarla completa o truncada
  const description = showFullDescription
    ? property.description
    : property.description.length > 300
      ? `${property.description.substring(0, 300)}...`
      : property.description;

  // Lista de amenidades para mostrar
  const amenities = property.amenities || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Galería de imágenes */}
      <div className="relative mb-8">
        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-100">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <HomeIcon className="h-16 w-16 text-gray-400" />
            </div>
          )}

          {/* Navegación de imágenes */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goToPreviousImage}
                disabled={isFirstImage}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                  isFirstImage
                    ? 'bg-gray-200/70 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 text-vacacional-texto hover:bg-white'
                }`}
                aria-label="Imagen anterior"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>

              <button
                onClick={goToNextImage}
                disabled={isLastImage}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                  isLastImage
                    ? 'bg-gray-200/70 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 text-vacacional-texto hover:bg-white'
                }`}
                aria-label="Imagen siguiente"
              >
                <ArrowRightIcon className="h-6 w-6" />
              </button>

              {/* Indicadores de imágenes */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Botón de favorito */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white z-10"
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isFavorite ? (
              <HeartIconSolid className="w-6 h-6 text-vacacional-rojo" />
            ) : (
              <HeartIcon className="w-6 h-6 text-vacacional-rojo" />
            )}
          </button>
        </div>

        {/* Miniaturas de imágenes */}
        {totalImages > 1 && (
          <div className="hidden md:flex mt-4 space-x-2 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  currentIndex === index ? 'ring-2 ring-vacacional-salvia' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Imagen ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Encabezado de la propiedad */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{property.city}, {property.country}</span>
          {property.category && (
            <>
              <span className="mx-2">•</span>
              <span>{property.category.name}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-bold text-vacacional-texto mb-2">
          {property.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-1 text-gray-500" />
            <span>{property.maxGuests} huéspedes</span>
          </div>
          <div className="flex items-center">
            <HomeIcon className="h-5 w-5 mr-1 text-gray-500" />
            <span>{property.bedrooms} habitaciones</span>
          </div>
          <div className="flex items-center">
            <span>•</span>
            <span className="ml-2">{property.bathrooms} baños</span>
          </div>
          {property.rating > 0 && (
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 mr-1 text-vacacional-salvia fill-vacacional-salvia" />
              <span className="font-medium">{property.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información de la propiedad */}
        <div className="col-span-2">
          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-vacacional-texto mb-3">
              Descripción
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {description}
            </p>
            {property.description.length > 300 && (
              <button
                onClick={() => setShowFullDescription(prev => !prev)}
                className="mt-2 text-vacacional-salvia hover:text-vacacional-salvia/80 font-medium"
              >
                {showFullDescription ? 'Mostrar menos' : 'Leer más'}
              </button>
            )}
          </div>

          {/* Amenidades */}
          {amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-vacacional-texto mb-3">
                Amenidades
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      <svg className="w-5 h-5 text-vacacional-salvia" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Propietario */}
          {property.owner && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold text-vacacional-texto mb-3">
                Anfitrión
              </h2>
              <div className="flex items-center">
                {property.owner.avatar ? (
                  <Image
                    src={property.owner.avatar}
                    alt={property.owner.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-14 h-14 bg-vacacional-menta/30 rounded-full flex items-center justify-center mr-4">
                    <UserIcon className="h-8 w-8 text-vacacional-menta" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-lg">{property.owner.name}</p>
                  <p className="text-gray-500 text-sm">Anfitrión desde {new Date(property.createdAt).getFullYear()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ubicación */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-vacacional-texto mb-3">
              Ubicación
            </h2>
            <p className="text-gray-600 mb-4">{property.address}, {property.city}, {property.country}</p>
            <div className="aspect-[16/9] w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <MapPinIcon className="h-8 w-8 text-vacacional-salvia" />
              <span className="ml-2 text-gray-500">Mapa no disponible</span>
            </div>
          </div>
        </div>

        {/* Reserva */}
        <div className="col-span-1">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-4">
              <span className="text-2xl font-bold text-vacacional-texto">{formattedPrice}</span>
              <span className="text-gray-500"> / noche</span>
            </div>

            {/* Fechas y huéspedes (mockup) */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs text-gray-500 mb-1">Llegada</label>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Seleccionar</span>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs text-gray-500 mb-1">Salida</label>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span>Seleccionar</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg mb-4">
                <label className="block text-xs text-gray-500 mb-1">Huéspedes</label>
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>1 huésped</span>
                </div>
              </div>
            </div>

            {/* Botón de reserva */}
            <button
              onClick={handleBookingClick}
              className="w-full py-3 px-4 bg-vacacional-tierra text-white font-medium rounded-lg hover:bg-vacacional-tierra/90 transition-colors"
            >
              Reservar
            </button>

            {/* Detalles del precio (mockup) */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{formattedPrice} x 5 noches</span>
                <span>{formatPrice(property.price * 5)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tarifa de limpieza</span>
                <span>{formatPrice(property.price * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Comisión de servicio</span>
                <span>{formatPrice(property.price * 0.12)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-4 border-t border-gray-100 mt-4">
                <span>Total</span>
                <span>{formatPrice(property.price * 5 + property.price * 0.1 + property.price * 0.12)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
