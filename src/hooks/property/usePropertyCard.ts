import { useState } from 'react';
import { Property, PropertyCardConfig } from '@/types/property.types';
import { ROUTES } from '@/constants/routes';
import { useFormatPrice, useTruncateText } from '@/hooks';

interface UsePropertyCardProps {
  /**
   * Propiedad a mostrar
   */
  property: Property;

  /**
   * Configuración opcional del grid/card
   */
  gridConfig?: PropertyCardConfig;
}

interface UsePropertyCardReturn {
  /**
   * Estado de hover
   */
  isHovered: boolean;

  /**
   * Funciones para manejar eventos de hover
   */
  hoverHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };

  /**
   * URL de enlace para la tarjeta
   */
  propertyLink: string;

  /**
   * Si la tarjeta debe mostrarse en tamaño pequeño
   */
  isSmallCard: boolean;

  /**
   * Si la tarjeta debe ocultar la descripción
   */
  hideDescription: boolean;

  /**
   * Precio formateado
   */
  formattedPrice: string;

  /**
   * Descripción truncada
   */
  truncatedDescription: string;
}

/**
 * Hook para manejar la funcionalidad de una tarjeta de propiedad
 */
export function usePropertyCard({
  property,
  gridConfig
}: UsePropertyCardProps): UsePropertyCardReturn {
  // Estado para manejar el hover
  const [isHovered, setIsHovered] = useState(false);

  // Determinar el enlace de la propiedad
  const propertyLink = gridConfig?.linkTo || ROUTES.PROPERTY_DETAIL(property.id);

  // Determinar el tamaño y configuración del card
  const isSmallCard = gridConfig?.cardSize === 'sm';
  const hideDescription = gridConfig?.hideDescription || false;

  // Usar hooks para formato
  const formatPrice = useFormatPrice('ARS');
  const formattedPrice = formatPrice(property.price);

  // Usar hook para truncar texto
  const truncateText = useTruncateText();
  const truncatedDescription = truncateText(property.description, 100);

  // Manejadores de eventos
  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return {
    isHovered,
    hoverHandlers,
    propertyLink,
    isSmallCard,
    hideDescription,
    formattedPrice,
    truncatedDescription
  };
}
