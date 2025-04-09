import { usePropertyStore } from '@/store/property.store';

/**
 * Hook refactorizado para gestionar propiedades favoritas
 * Usa el store centralizado en lugar de mantener su propio estado
 */
export function useFavoriteProperties() {
  // Extraemos solo lo que necesitamos del store
  const {
    favoriteIds,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite
  } = usePropertyStore();

  return {
    favorites: favoriteIds,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    // Mantenemos isInitialized para compatibilidad, pero ya no es necesario
    // ya que Zustand maneja la inicialización
    isInitialized: true
  };
}
