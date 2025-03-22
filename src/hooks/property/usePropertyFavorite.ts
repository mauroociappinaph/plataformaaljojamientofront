import { useState } from 'react';

/**
 * Hook para manejar la funcionalidad de favoritos en una propiedad
 * @param initialIsFavorite Estado inicial de si la propiedad es favorita
 * @param onToggle Función opcional a llamar cuando se cambia el estado de favorito
 * @returns Objeto con estado y funciones para manejar favoritos
 */
export function usePropertyFavorite(
  propertyId: string,
  initialIsFavorite: boolean = false,
  onToggle?: (propertyId: string, isFavorite: boolean) => void
) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  /**
   * Maneja el clic en el botón de favorito
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (onToggle) {
      onToggle(propertyId, newFavoriteState);
    }
  };

  return {
    isFavorite,
    setIsFavorite,
    handleFavoriteClick
  };
}
