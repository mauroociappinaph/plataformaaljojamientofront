/**
 * Hook para formatear precios en diferentes monedas
 * @param currency Código de moneda (por defecto es ARS)
 * @returns Función para formatear precios
 */
export function useFormatPrice(currency: string = 'ARS') {
  /**
   * Formatea un precio con la moneda especificada
   * @param price Precio a formatear
   * @param options Opciones de formato (decimales, etc)
   * @returns Precio formateado
   */
  const formatPrice = (
    price: number,
    options: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    } = {}
  ) => {
    const { minimumFractionDigits = 0, maximumFractionDigits = 0 } = options;

    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(price);
  };

  return formatPrice;
}
