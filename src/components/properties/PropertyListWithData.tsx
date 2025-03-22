'use client';

import { useState, useEffect } from 'react';
import { PropertyList } from './PropertyList';
import { getProperties } from '@/services/api/properties';
import { useFavoriteProperties } from '@/hooks';
import { Property } from '@/types/property.types';

const DEFAULT_PAGE_SIZE = 12;

export function PropertyListWithData() {
  // Estado para las propiedades
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener lista de favoritos
  const { favorites, toggleFavorite } = useFavoriteProperties();

  // Cargar propiedades
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getProperties({ limit: DEFAULT_PAGE_SIZE });
        setProperties(response.data);
      } catch (err) {
        console.error('Error al cargar propiedades:', err);
        setError('No se pudieron cargar las propiedades. Intente de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <div>
      {/* Lista de propiedades */}
      <div className="mt-6">
        <PropertyList
          properties={properties}
          onFavoriteToggle={toggleFavorite}
          favorites={favorites}
          isLoading={isLoading}
          emptyMessage={error || "No se encontraron propiedades"}
          gridConfig={{
            columns: {
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
            },
            gap: 6,
          }}
        />
      </div>
    </div>
  );
}
