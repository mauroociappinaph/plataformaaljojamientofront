'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/types/property.types';
import { getSimilarProperties } from '@/services/api/properties';
import { PropertyCard } from './PropertyCard';

interface RelatedPropertiesProps {
  propertyId: string;
  limit?: number;
}

export function RelatedProperties({ propertyId, limit = 4 }: RelatedPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRelatedProperties = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getSimilarProperties(propertyId, limit);
        setProperties(data);
      } catch (err) {
        setError('No se pudieron cargar las propiedades relacionadas');
        console.error('Error al cargar propiedades relacionadas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedProperties();
  }, [propertyId, limit]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-vacacional-texto mb-6">
          Propiedades similares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg animate-pulse h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || properties.length === 0) {
    return null; // No mostrar nada si hay un error o no hay propiedades relacionadas
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-vacacional-texto mb-6">
        Propiedades similares
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            gridConfig={{
              linkTo: `/properties/${property.id}`,
              cardSize: 'sm',
              hideDescription: true
            }}
          />
        ))}
      </div>
    </div>
  );
}
