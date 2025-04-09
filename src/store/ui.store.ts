import { create } from 'zustand';

/**
 * Interfaz para el estado y acciones de la UI global
 */
interface UIState {
  // Estado de navegación
  isNavbarScrolled: boolean;
  isAtTop: boolean;
  showMobileMenu: boolean;

  // Estado de búsqueda en hero section
  searchQuery: string;
  guests: number;
  showMobileSearch: boolean;

  // Acciones de navegación
  setNavbarScrolled: (isScrolled: boolean) => void;
  setIsAtTop: (isAtTop: boolean) => void;
  toggleMobileMenu: () => void;

  // Acciones de búsqueda
  setSearchQuery: (query: string) => void;
  setGuests: (guests: number) => void;
  toggleMobileSearch: () => void;
}

/**
 * Store para gestionar estados de UI compartidos entre componentes
 * No usamos persist porque estos estados no necesitan guardarse entre sesiones
 */
export const useUIStore = create<UIState>()((set) => ({
  // Estado inicial de navegación
  isNavbarScrolled: false,
  isAtTop: true,
  showMobileMenu: false,

  // Estado inicial de búsqueda
  searchQuery: '',
  guests: 1,
  showMobileSearch: false,

  // Acciones de navegación
  setNavbarScrolled: (isScrolled) => set({ isNavbarScrolled: isScrolled }),
  setIsAtTop: (isAtTop) => set({ isAtTop }),
  toggleMobileMenu: () => set((state) => ({ showMobileMenu: !state.showMobileMenu })),

  // Acciones de búsqueda
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setGuests: (guests) => set({ guests }),
  toggleMobileSearch: () => set((state) => ({ showMobileSearch: !state.showMobileSearch })),
}));
