import { useState } from 'react';

interface UsePropertyGalleryParams {
  images: string[];
  initialIndex?: number;
}

interface UsePropertyGalleryResult {
  currentImage: string;
  currentIndex: number;
  totalImages: number;
  hasMultipleImages: boolean;
  isFirstImage: boolean;
  isLastImage: boolean;
  goToNextImage: () => void;
  goToPreviousImage: () => void;
  goToImage: (index: number) => void;
}

/**
 * Hook para gestionar la galería de imágenes de una propiedad
 * @param images Array de URLs de imágenes
 * @param initialIndex Índice inicial a mostrar (por defecto 0)
 */
export function usePropertyGallery({
  images,
  initialIndex = 0
}: UsePropertyGalleryParams): UsePropertyGalleryResult {
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0
  );

  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === totalImages - 1;

  // Imagen actual, o una imagen vacía si no hay imágenes
  const currentImage = totalImages > 0 ? images[currentIndex] : '';

  // Cambiar a la siguiente imagen
  const goToNextImage = () => {
    if (!isLastImage) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  // Cambiar a la imagen anterior
  const goToPreviousImage = () => {
    if (!isFirstImage) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  // Ir a una imagen específica
  const goToImage = (index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index);
    }
  };

  return {
    currentImage,
    currentIndex,
    totalImages,
    hasMultipleImages,
    isFirstImage,
    isLastImage,
    goToNextImage,
    goToPreviousImage,
    goToImage
  };
}
