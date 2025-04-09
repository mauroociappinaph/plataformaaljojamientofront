import {  PropertyListProps } from '@/types/property.types';
import { usePropertyStore } from '@/store/property.store';


/**
 * Hook para manejar estados y renderización de listas de propiedades
 * Refactorizado para usar el store global cuando se necesite
 */
export function usePropertyList({
  properties: propProperties,
  useStoreProperties = false,
  isLoading: propIsLoading = false,
  emptyMessage = 'No se encontraron propiedades',
  renderLoadingSkeleton: customRenderLoadingSkeleton,
  renderEmptyState: customRenderEmptyState
}: Partial<PropertyListProps>): PropertyListProps {
  // Obtenemos datos del store
  const {
    properties: storeProperties,
    isLoading: storeIsLoading,
    filters,
    setFilters,
    resetFilters
  } = usePropertyStore();

  // Usamos propiedades del store o las pasadas por props
  const properties = useStoreProperties ? storeProperties : (propProperties || []);
  const isLoading = useStoreProperties ? storeIsLoading : propIsLoading;

  const hasProperties = properties.length > 0;
  const showLoadingState = isLoading;
  const showEmptyState = !isLoading && !hasProperties;

  /**
   * Renderización del esqueleto de carga por defecto
   */
  const defaultRenderLoadingSkeleton = () => {
    // Este JSX será reemplazado en el componente
    return null;
  };

  /**
   * Renderización del estado vacío por defecto
   */
  const defaultRenderEmptyState = () => {
    // Este JSX será reemplazado en el componente
    return null;
  };

  // Permite personalizar los renderizadores o usar los predeterminados
  const renderLoadingSkeleton = customRenderLoadingSkeleton || defaultRenderLoadingSkeleton;
  const renderEmptyState = () =>
    (customRenderEmptyState ? customRenderEmptyState(emptyMessage) : defaultRenderEmptyState());

  return {
    properties,
    hasProperties,
    isLoading,
    showLoadingState,
    showEmptyState,
    emptyMessage,
    renderLoadingSkeleton,
    renderEmptyState,
    filters,
    setFilters,
    resetFilters
  } as PropertyListProps;
}
