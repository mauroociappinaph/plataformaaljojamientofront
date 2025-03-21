/**
 * Constantes para las rutas de la aplicación
 * Usar estas constantes en lugar de strings literales para mejorar la mantenibilidad
 */
export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Rutas protegidas
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // Rutas de propiedades
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
  PROPERTY_CREATE: '/properties/create',

  // Rutas de reservas
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,

  // Otras rutas
  SETTINGS: '/settings',
  HELP: '/help',
};
