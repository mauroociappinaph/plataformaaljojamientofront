import { useState, useEffect } from 'react';
import { Property } from '@/types/property.types';
import { getPropertyById } from '@/lib/api/property/property.service';

interface UsePropertyDetailParams {
  propertyId: string;
  initialData?: Property | null;
}

interface UsePropertyDetailResult {
  property: Property | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Hook para gestionar los detalles de una propiedad
 * @param propertyId ID de la propiedad a cargar
 * @param initialData Datos iniciales de la propiedad (opcional)
 */
export function usePropertyDetail({
  propertyId,
  initialData = null
}: UsePropertyDetailParams): UsePropertyDetailResult {
  const [property, setProperty] = useState<Property | null>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los datos de la propiedad
  const loadProperty = async () => {
    if (!propertyId) {
      setError('Property ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const propertyData = await getPropertyById(propertyId);

      if (!propertyData) {
        setError('Property not found');
        setProperty(null);
      } else {
        setProperty(propertyData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load property');
      setProperty(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar la propiedad al iniciar o cuando cambie el ID
  useEffect(() => {
    if (!initialData) {
      loadProperty();
    }
  }, [propertyId]);

  // Función para recargar los datos
  const reload = async () => {
    await loadProperty();
  };

  return {
    property,
    isLoading,
    error,
    reload
  };
}
