'use client'

import { useState } from 'react';
import { Variants } from 'framer-motion';
import { UseHeroSectionReturn } from '@/types/hero.types';

/**
 * Hook personalizado para manejar el estado y animaciones de la sección Hero
 */
export const useHeroSection = (): UseHeroSectionReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guests, setGuests] = useState(1);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const containerAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const itemAnimation: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(prev => !prev);
  };

  return {
    searchQuery,
    setSearchQuery,
    guests,
    setGuests,
    showMobileSearch,
    setShowMobileSearch,
    toggleMobileSearch,
    containerAnimation,
    itemAnimation
  };
};
