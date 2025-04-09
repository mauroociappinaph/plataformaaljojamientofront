/**
 * Constantes para las rutas de la aplicación
 * Usar estas constantes en lugar de strings literales para mejorar la mantenibilidad
 */
export const ROUTES = {
  // Páginas principales
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
  PROPERTY_CREATE: '/properties/create',
  PROPERTY_EDIT: (id: string) => `/properties/${id}/edit`,
  PROPERTY_DELETE: (id: string) => `/properties/${id}/delete`,

  // Autenticación
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_PROPERTIES: '/dashboard/properties',
  DASHBOARD_RESERVATIONS: '/dashboard/reservations',
  DASHBOARD_FAVORITES: '/dashboard/favorites',
  DASHBOARD_PROFILE: '/dashboard/profile',

  // Checkout y reservas
  CHECKOUT: (propertyId: string) => `/checkout/${propertyId}`,
  RESERVATION: (id: string) => `/reservations/${id}`,
  RESERVATION_CANCEL: (id: string) => `/reservations/${id}/cancel`,

  // Páginas estáticas
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FAQ: '/faq',

  // Rutas de reservas
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,

  // Otras rutas
  SETTINGS: '/settings',
  HELP: '/help',

  VERIFY_EMAIL: (token: string) => `/verify-email/${token}`,
  RESEND_VERIFICATION: '/resend-verification',
} as const;

/**
 * Rutas protegidas que requieren autenticación
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_PROPERTIES,
  ROUTES.DASHBOARD_RESERVATIONS,
  ROUTES.DASHBOARD_FAVORITES,
  ROUTES.DASHBOARD_PROFILE,
  ROUTES.PROPERTY_CREATE,
  '/properties/create',
  '/dashboard',
  '/dashboard/'
];

/**
 * Constantes para los endpoints de la API
 */
export const PROPERTIES_ENDPOINT = '/properties';
