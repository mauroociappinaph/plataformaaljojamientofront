import { Category } from '@/types/property.types';
import { http } from '@/lib/http';

// Endpoint base para categorías
const CATEGORIES_ENDPOINT = '/categories';

/**
 * Obtiene todas las categorías
 * @returns Lista de categorías
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await http.get<Category[]>(CATEGORIES_ENDPOINT);

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('[getCategories] Error:', error);
    return [];
  }
};

/**
 * Obtiene una categoría por su ID
 * @param id ID de la categoría
 * @returns Detalles de la categoría
 */
export const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const { data, error } = await http.get<Category>(`${CATEGORIES_ENDPOINT}/${id}`);

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.error(`[getCategoryById] Error al obtener categoría ${id}:`, error);
    return null;
  }
};
