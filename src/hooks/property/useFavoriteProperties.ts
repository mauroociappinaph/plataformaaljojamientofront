import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/config/constants';

/**
 * Hook para gestionar propiedades favoritas
 * Almacena los favoritos en el localStorage
 */
export function useFavoriteProperties() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar favoritos del localStorage al inicio
  useEffect(() => {
    const loadFavorites = () => {
      if (typeof window === 'undefined') return;

      try {
        const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITE_PROPERTIES);

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadFavorites();
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem(STORAGE_KEYS.FAVORITE_PROPERTIES, JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  /**
   * Añadir o quitar una propiedad de favoritos
   */
  const toggleFavorite = (propertyId: string, isFavorite: boolean) => {
    setFavorites(prevFavorites => {
      if (isFavorite) {
        // Añadir a favoritos si no existe
        if (!prevFavorites.includes(propertyId)) {
          return [...prevFavorites, propertyId];
        }
      } else {
        // Quitar de favoritos
        return prevFavorites.filter(id => id !== propertyId);
      }

      return prevFavorites;
    });
  };

  /**
   * Verificar si una propiedad está en favoritos
   */
  const isFavorite = (propertyId: string): boolean => {
    return favorites.includes(propertyId);
  };

  /**
   * Añadir propiedad a favoritos
   */
  const addFavorite = (propertyId: string) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.includes(propertyId)) {
        return [...prevFavorites, propertyId];
      }
      return prevFavorites;
    });
  };

  /**
   * Quitar propiedad de favoritos
   */
  const removeFavorite = (propertyId: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(id => id !== propertyId)
    );
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    isInitialized
  };
}
