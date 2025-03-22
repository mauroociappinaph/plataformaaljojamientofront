import { Variants } from 'framer-motion';

/**
 * Tipos para el componente HeroSection y su hook
 */

/**
 * Interfaz para el valor de retorno del hook useHeroSection
 */
export interface UseHeroSectionReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  showMobileSearch: boolean;
  setShowMobileSearch: (show: boolean) => void;
  toggleMobileSearch: () => void;
  containerAnimation: Variants;
  itemAnimation: Variants;
}
