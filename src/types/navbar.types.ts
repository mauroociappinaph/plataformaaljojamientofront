/**
 * Tipos para el componente Navbar y su hook
 */

export interface NavbarState {
  isScrolled: boolean;
  showMenu: boolean;
}

export interface NavbarActions {
  toggleMenu: () => void;
}

export interface UseNavbarReturn extends NavbarState, NavbarActions {}
