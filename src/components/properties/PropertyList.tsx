import { PropertyListProps } from '@/types/property.types';
import { PropertyCard } from './PropertyCard';
import { usePropertyList, usePropertyGrid } from '@/hooks';

export function PropertyList({
  properties,
  onFavoriteToggle,
  favorites = [],
  isLoading = false,
  emptyMessage = 'No se encontraron propiedades',
  gridConfig,
  renderLoadingSkeleton,
  renderEmptyState
}: PropertyListProps) {
  // Usar hooks para la lógica de la lista
  const {
    showLoadingState,
    showEmptyState
  } = usePropertyList({
    properties,
    isLoading,
    emptyMessage,
    renderLoadingSkeleton,
    renderEmptyState
  });

  // Usar hook para la configuración de la cuadrícula
  const { gridClass } = usePropertyGrid(gridConfig);

  // Renderizar el estado de carga
  if (showLoadingState) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Renderizar el estado vacío
  if (showEmptyState) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  // Renderizar la lista de propiedades
  return (
    <div className={gridClass}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.includes(property.id)}
        />
      ))}
    </div>
  );
}
