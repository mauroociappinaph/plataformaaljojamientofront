import { useState, useEffect, useRef, useCallback } from 'react';
import { UseNavbarReturn } from '@/types/navbar.types';

export const useNavbar = (): UseNavbarReturn => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const prevScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Optimizamos la detección de scroll usando debounce para mejor rendimiento
  const handleScroll = useCallback(() => {
    // Cancelamos el timeout anterior si existe
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Usamos RAF para sincronizar con el ciclo de renderizado
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      // Solo actualizamos si hubo un cambio significativo y el estado debe cambiar
      const shouldBeScrolled = currentScrollY > 20;

      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }

      prevScrollY.current = currentScrollY;
    });
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  return {
    isScrolled,
    showMenu,
    toggleMenu,
  };
};
