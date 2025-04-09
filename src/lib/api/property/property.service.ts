import {
  CreatePropertyDTO,
  UpdatePropertyDTO,
  Property,
  PropertyFilters,
  PaginatedPropertyResponse
} from '@/types/property.types';
import { http } from '@/lib/http';
import { PROPERTIES_ENDPOINT } from '@/constants/routes';

/**
 * Obtiene todas las propiedades con opciones de filtrado y paginación
 * @param filters Filtros opcionales para la búsqueda
 * @returns Propiedades paginadas
 */
export const getProperties = async (filters?: PropertyFilters): Promise<PaginatedPropertyResponse> => {
  try {
    // Construir la URL con los parámetros de búsqueda
    let endpoint = PROPERTIES_ENDPOINT;

    if (filters) {
      const queryParams = new URLSearchParams();

      // Añadir solo los filtros que tengan valor
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Manejar arrays (como amenities)
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
    }

    const { data, error, status } = await http.get<PaginatedPropertyResponse>(endpoint);

    if (error) {
      console.error(`[getProperties] Error ${status}: ${error}`);
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    console.error('[getProperties] Error:', error);
    // Devolver un objeto vacío en caso de error
    return { data: [], total: 0 };
  }
};

/**
 * Obtiene una propiedad por su ID
 * @param id ID de la propiedad
 * @returns Detalles de la propiedad
 */
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await http.get<Property>(`${PROPERTIES_ENDPOINT}/${id}`);

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.error(`[getPropertyById] Error al obtener propiedad ${id}:`, error);
    return null;
  }
};

/**
 * Obtiene las propiedades del usuario autenticado
 * @returns Lista de propiedades del usuario
 */
export const getMyProperties = async (): Promise<Property[]> => {
  try {
    const { data, error } = await http.get<Property[]>(`${PROPERTIES_ENDPOINT}/user/my-properties`, {
      withAuth: true
    });

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('[getMyProperties] Error:', error);
    return [];
  }
};

/**
 * Crea una nueva propiedad
 * @param propertyData Datos de la propiedad a crear
 * @returns La propiedad creada
 */
export const createProperty = async (propertyData: CreatePropertyDTO): Promise<Property | null> => {
  try {
    const { data, error } = await http.post<Property>(PROPERTIES_ENDPOINT, propertyData, {
      withAuth: true
    });

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.error('[createProperty] Error:', error);
    return null;
  }
};

/**
 * Actualiza una propiedad existente
 * @param id ID de la propiedad a actualizar
 * @param propertyData Datos a actualizar
 * @returns La propiedad actualizada
 */
export const updateProperty = async (id: string, propertyData: UpdatePropertyDTO): Promise<Property | null> => {
  try {
    const { data, error } = await http.put<Property>(`${PROPERTIES_ENDPOINT}/${id}`, propertyData, {
      withAuth: true
    });

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.error(`[updateProperty] Error al actualizar propiedad ${id}:`, error);
    return null;
  }
};

/**
 * Elimina una propiedad
 * @param id ID de la propiedad a eliminar
 * @returns true si se eliminó correctamente
 */
export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const { error } = await http.delete(`${PROPERTIES_ENDPOINT}/${id}`, {
      withAuth: true
    });

    if (error) {
      throw new Error(error);
    }

    return true;
  } catch (error) {
    console.error(`[deleteProperty] Error al eliminar propiedad ${id}:`, error);
    return false;
  }
};
