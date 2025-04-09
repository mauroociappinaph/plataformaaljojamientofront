/**
 * Configuración de la cuadrícula de propiedades
 */
interface GridConfig {
  columns: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  gap: number;
}

/**
 * Configuración parcial de la cuadrícula que acepta propiedades opcionales
 */
export interface PropertyGridConfig {
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
}

/**
 * Hook para manejar la disposición en cuadrícula de propiedades
 * @param customConfig Configuración personalizada para la cuadrícula
 * @returns Clase CSS para la cuadrícula
 */
export function usePropertyGrid(customConfig?: PropertyGridConfig) {
  // Configuración por defecto
  const defaultConfig: GridConfig = {
    columns: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    },
    gap: 6
  };

  // Combinar la configuración por defecto con la personalizada
  const config = {
    ...defaultConfig,
    gap: customConfig?.gap ?? defaultConfig.gap,
    columns: {
      ...defaultConfig.columns,
      sm: customConfig?.columns?.sm ?? defaultConfig.columns.sm,
      md: customConfig?.columns?.md ?? defaultConfig.columns.md,
      lg: customConfig?.columns?.lg ?? defaultConfig.columns.lg,
      xl: customConfig?.columns?.xl ?? defaultConfig.columns.xl
    }
  };

  // Generar la clase CSS para la cuadrícula
  const gridClass = `grid grid-cols-${config.columns.sm} md:grid-cols-${config.columns.md} lg:grid-cols-${config.columns.lg} xl:grid-cols-${config.columns.xl} gap-${config.gap}`;

  return {
    gridClass,
    config
  };
}
