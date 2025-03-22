/**
 * Hook para truncar textos a una longitud específica
 * @returns Función para truncar textos
 */
export function useTruncateText() {
  /**
   * Trunca un texto a la longitud especificada
   * @param text Texto a truncar
   * @param maxLength Longitud máxima (por defecto 100 caracteres)
   * @param suffix Sufijo a añadir al texto truncado (por defecto "...")
   * @returns Texto truncado
   */
  const truncateText = (text: string, maxLength: number = 100, suffix: string = '...') => {
    if (!text || text.length <= maxLength) {
      return text;
    }

    return `${text.substring(0, maxLength)}${suffix}`;
  };

  return truncateText;
}
