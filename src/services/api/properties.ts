import { Property } from '@/types/property.types';
import { API_URL } from '@/config/constants';

/**
 * Obtiene todas las propiedades con posibilidad de filtrado
 */
export async function getProperties(params?: {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}): Promise<{
  data: Property[];
  total: number;
  page: number;
  limit: number;
}> {
  const queryParams = new URLSearchParams();

  if (params) {
    // Añadir parámetros a la URL si están definidos
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
  }

  const url = `${API_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener propiedades: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getProperties:', error);
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    };
  }
}

/**
 * Obtiene una propiedad por su ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener la propiedad: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener la propiedad con ID ${id}:`, error);
    return null;
  }
}

/**
 * Obtiene propiedades destacadas
 */
export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  try {
    const response = await fetch(`${API_URL}/properties/featured?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Error al obtener propiedades destacadas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getFeaturedProperties:', error);
    return [];
  }
}

/**
 * Obtiene propiedades similares a una propiedad específica
 */
export async function getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
  try {
    const response = await fetch(`${API_URL}/properties/${propertyId}/similar?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Error al obtener propiedades similares: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getSimilarProperties:', error);
    return [];
  }
}

/**
 * Crea una nueva propiedad
 */
export async function createProperty(propertyData: Partial<Property>, token: string): Promise<Property> {
  try {
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    });

    if (!response.ok) {
      throw new Error(`Error al crear la propiedad: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createProperty:', error);
    throw error;
  }
}

/**
 * Actualiza una propiedad existente
 */
export async function updateProperty(
  id: string,
  propertyData: Partial<Property>,
  token: string
): Promise<Property> {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la propiedad: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar la propiedad con ID ${id}:`, error);
    throw error;
  }
}

/**
 * Elimina una propiedad
 */
export async function deleteProperty(id: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la propiedad: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error al eliminar la propiedad con ID ${id}:`, error);
    throw error;
  }
}
