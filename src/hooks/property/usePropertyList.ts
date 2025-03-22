import { Property } from '@/types/property.types';
import { ReactNode } from 'react';

interface PropertyListHookParams {
  properties: Property[];
  isLoading?: boolean;
  emptyMessage?: string;
  renderLoadingSkeleton?: () => ReactNode;
  renderEmptyState?: (message: string) => ReactNode;
}

interface PropertyListHookResult {
  hasProperties: boolean;
  isLoading: boolean;
  showLoadingState: boolean;
  showEmptyState: boolean;
  emptyMessage: string;
  renderLoadingSkeleton: () => ReactNode;
  renderEmptyState: () => ReactNode;
}

/**
 * Hook para manejar estados y renderización de listas de propiedades
 */
export function usePropertyList({
  properties,
  isLoading = false,
  emptyMessage = 'No se encontraron propiedades',
  renderLoadingSkeleton: customRenderLoadingSkeleton,
  renderEmptyState: customRenderEmptyState
}: PropertyListHookParams): PropertyListHookResult {

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
    hasProperties,
    isLoading,
    showLoadingState,
    showEmptyState,
    emptyMessage,
    renderLoadingSkeleton,
    renderEmptyState
  };
}
