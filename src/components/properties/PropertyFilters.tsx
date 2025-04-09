'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PropertyFilters as PropertyFiltersType } from '@/types/property.types';

interface PropertyFiltersProps {
  /**
   * Estado actual de los filtros
   */
  filters: PropertyFiltersType;

  /**
   * Callback cuando cambian los filtros
   */
  onFilterChange: (filters: Partial<PropertyFiltersType>) => void;
}

export function PropertyFilters({
  filters,
  onFilterChange
}: PropertyFiltersProps) {
  const [search, setSearch] = useState(filters.search || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || ''
  });

  // Actualizar el estado local cuando cambian los filtros externos
  useEffect(() => {
    setSearch(filters.search || '');
    setPriceRange({
      min: filters.minPrice || '',
      max: filters.maxPrice || ''
    });
  }, [filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceSubmit = () => {
    onFilterChange({
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setPriceRange({ min: '', max: '' });
    onFilterChange({
      search: '',
      minPrice: undefined,
      maxPrice: undefined,
      city: undefined,
      categoryId: undefined,
      minGuests: undefined,
      minBedrooms: undefined,
      minBathrooms: undefined
    });
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = Boolean(
    filters.search ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.city ||
    filters.categoryId ||
    filters.minGuests ||
    filters.minBedrooms ||
    filters.minBathrooms
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Búsqueda por texto */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar propiedades..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vacacional-salvia/30 focus:border-vacacional-salvia"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </form>

        {/* Botón de filtros */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="ml-2 bg-vacacional-salvia text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Activos
            </span>
          )}
        </button>

        {/* Botón para limpiar filtros */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
          >
            <XMarkIcon className="h-5 w-5 mr-1" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Filtros expandidos */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Filtro por rango de precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango de precio
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Mínimo"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vacacional-salvia/30 focus:border-vacacional-salvia"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Máximo"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vacacional-salvia/30 focus:border-vacacional-salvia"
              />
            </div>
          </div>

          {/* Más filtros se pueden agregar aquí */}

          {/* Botón para aplicar filtros */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 mt-2">
            <button
              onClick={handlePriceSubmit}
              className="px-4 py-2 bg-vacacional-salvia text-white rounded-lg hover:bg-vacacional-salvia/90"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
