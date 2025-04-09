import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/ui.store';

/**
 * Hook personalizado para gestionar la funcionalidad de la barra de navegación
 * Maneja el estado de scroll y proporciona métodos para interactuar con el menú
 */
export const useNavbar = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  // Obtenemos el estado y las acciones del store global
  const {
    isNavbarScrolled, setNavbarScrolled,
    isAtTop, setIsAtTop,
    showMobileMenu, toggleMobileMenu
  } = useUIStore(
    state => ({
      isNavbarScrolled: state.isNavbarScrolled,
      setNavbarScrolled: state.setNavbarScrolled,
      isAtTop: state.isAtTop,
      setIsAtTop: state.setIsAtTop,
      showMobileMenu: state.showMobileMenu,
      toggleMobileMenu: state.toggleMobileMenu
    })
  );

  // Verificamos si estamos en el navegador para evitar errores en SSR
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Configuramos los event listeners para el scroll
  useEffect(() => {
    if (!isBrowser) return;

    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      // Actualizamos el estado basado en la posición de scroll
      setIsAtTop(scrollY <= 0);
      setNavbarScrolled(scrollY > 100);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // Utilizamos requestAnimationFrame para optimizar el rendimiento
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Agregamos el event listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Ejecutamos una vez para establecer el estado inicial
    updateScrollState();

    // Limpiamos el event listener al desmontar
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isBrowser, setIsAtTop, setNavbarScrolled]);

  // Retornamos los valores y métodos necesarios
  return {
    isNavbarScrolled,
    isAtTop,
    showMobileMenu,
    toggleMobileMenu
  };
};

export default useNavbar;
