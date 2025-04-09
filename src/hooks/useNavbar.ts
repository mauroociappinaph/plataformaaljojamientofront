import { useEffect, useCallback, useRef } from 'react';
import { useUIStore } from '@/store/ui.store';

/**
 * Hook para manejar la funcionalidad de la barra de navegación
 * Refactorizado para usar el store de UI global
 */
export const useNavbar = () => {
  // Accedemos al estado y acciones del store de UI
  const {
    isNavbarScrolled,
    isAtTop,
    showMobileMenu,
    setNavbarScrolled,
    setIsAtTop,
    toggleMobileMenu
  } = useUIStore();

  // Referencias para seguimiento de scroll y debounce
  const prevScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Maneja el evento de scroll y actualiza el estado del navbar
   */
  const handleScroll = useCallback(() => {
    // Cancelamos el timeout anterior si existe
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Usamos requestAnimationFrame para sincronizar con el ciclo de renderizado
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      // Calculamos los nuevos estados
      const shouldBeScrolled = currentScrollY > 20;
      const shouldBeAtTop = currentScrollY < 10;

      // Solo actualizamos si hubo un cambio significativo
      if (isNavbarScrolled !== shouldBeScrolled) {
        setNavbarScrolled(shouldBeScrolled);
      }

      if (isAtTop !== shouldBeAtTop) {
        setIsAtTop(shouldBeAtTop);
      }

      prevScrollY.current = currentScrollY;
    });
  }, [isNavbarScrolled, isAtTop, setNavbarScrolled, setIsAtTop]);

  /**
   * Configuramos el listener de scroll y hacemos la verificación inicial
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Verificar la posición inicial al montar
    handleScroll();

    // Capturamos la referencia dentro del efecto
    const timeoutRefCurrent = scrollTimeout;

    // Limpiamos al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRefCurrent.current) {
        clearTimeout(timeoutRefCurrent.current);
      }
    };
  }, [handleScroll]);

  /**
   * Retornamos los valores y funciones necesarias para el componente
   * Mantenemos los mismos nombres de propiedades para compatibilidad con el código existente
   */
  return {
    isScrolled: isNavbarScrolled,
    isAtTop,
    showMenu: showMobileMenu,
    toggleMenu: toggleMobileMenu,
  };
};
