/**
 * Tipos para las propiedades
 */

/**
 * Interfaz para el modelo de Propiedad
 */
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  categoryId: string;
  city: string;
  country: string;
  maxGuests: number;
  rating: number;
  category?: Category;
  owner?: PropertyOwner;
}

/**
 * Interfaz para la categoría de la propiedad
 */
export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos del propietario mostrados en la propiedad
 */
export interface PropertyOwner {
  id: string;
  name: string;
  email?: string;
  avatar: string | null;
}

/**
 * Interfaz para la creación de una propiedad
 */
export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  city: string;
  country: string;
  amenities: string[];
  images?: string[];
  bathrooms: number;
  bedrooms: number;
  maxGuests: number;
  categoryId: string;
}

/**
 * Interfaz para la actualización de una propiedad (todos los campos son opcionales)
 */
export interface UpdatePropertyDTO {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  address?: string;
  city?: string;
  country?: string;
  amenities?: string[];
  images?: string[];
  bathrooms?: number;
  bedrooms?: number;
  maxGuests?: number;
  categoryId?: string;
}

/**
 * Interfaz para filtrar propiedades
 */
export interface PropertyFilters {
  search?: string;
  city?: string;
  country?: string;
  categoryId?: string;
  minGuests?: number;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  amenities?: string[];
  page?: number;
  limit?: number;
}

/**
 * Respuesta paginada de propiedades
 */
export interface PaginatedPropertyResponse {
  data: Property[];
  total: number;
}
