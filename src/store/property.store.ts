import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Property, PropertyFilters } from '@/types/property.types';

/**
 * Interfaz que define el estado y las acciones para el store de propiedades
 */
interface PropertyState {
  // Estado
  properties: Property[];
  favoriteIds: string[];
  filters: PropertyFilters;
  isLoading: boolean;
  error: string | null;
  selectedPropertyId: string | null;

  // Acciones para propiedades
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => void;
  removeProperty: (id: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedPropertyId: (id: string | null) => void;

  // Acciones para filtros
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;

  // Acciones para favoritos
  toggleFavorite: (propertyId: string) => void;
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

/**
 * Filtros iniciales por defecto
 */
const DEFAULT_FILTERS: PropertyFilters = {
  location: '',
  priceMin: 0,
  priceMax: 5000,
  bedrooms: 0,
  bathrooms: 0,
  guests: 0,
  categoryId: undefined,
  page: 1,
  limit: 9
};

/**
 * Store para gestionar el estado de las propiedades
 * Utiliza Zustand y el middleware persist para mantener ciertos estados en localStorage
 */
export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      properties: [],
      favoriteIds: [],
      filters: { ...DEFAULT_FILTERS },
      isLoading: false,
      error: null,
      selectedPropertyId: null,

      // Acciones para propiedades
      setProperties: (properties) => set({ properties }),

      addProperty: (property) => set((state) => ({
        properties: [...state.properties, property]
      })),

      updateProperty: (id, updatedProperty) => set((state) => ({
        properties: state.properties.map((property) =>
          property.id === id ? { ...property, ...updatedProperty } : property
        )
      })),

      removeProperty: (id) => set((state) => ({
        properties: state.properties.filter((property) => property.id !== id)
      })),

      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),

      // Acciones para filtros
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

      // Acciones para favoritos
      toggleFavorite: (propertyId) => set((state) => {
        const isFav = state.favoriteIds.includes(propertyId);
        return {
          favoriteIds: isFav
            ? state.favoriteIds.filter(id => id !== propertyId)
            : [...state.favoriteIds, propertyId]
        };
      }),

      addFavorite: (propertyId) => set((state) => {
        if (state.favoriteIds.includes(propertyId)) return state;
        return { favoriteIds: [...state.favoriteIds, propertyId] };
      }),

      removeFavorite: (propertyId) => set((state) => ({
        favoriteIds: state.favoriteIds.filter(id => id !== propertyId)
      })),

      isFavorite: (propertyId) => {
        const { favoriteIds } = get();
        return favoriteIds.includes(propertyId);
      }
    }),
    {
      name: 'property-storage', // Nombre para localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Solo persistimos estos valores
        favoriteIds: state.favoriteIds,
        filters: state.filters
      })
    }
  )
);
