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
  BOOKING_CREATE: '/bookings', // POST
BOOKING_LIST: '/bookings', // GET (con filtros)
BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
BOOKING_UPDATE: (id: string) => `/bookings/${id}`,
BOOKING_DELETE: (id: string) => `/bookings/${id}`,
BOOKING_UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
BOOKING_UPDATE_PAYMENT: (id: string) => `/bookings/${id}/payment`,
BOOKING_BY_PROPERTY: (propertyId: string) => `/bookings/property/${propertyId}`,
BOOKING_BY_USER: '/bookings/user',


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
  // Dashboard
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_PROPERTIES,
  ROUTES.DASHBOARD_RESERVATIONS,
  ROUTES.DASHBOARD_FAVORITES,
  ROUTES.DASHBOARD_PROFILE,

  // Propiedades
  ROUTES.PROPERTY_CREATE,
  '/properties/create',
  '/dashboard',
  '/dashboard/',

  // Bookings (protegidas por @UseGuards(JwtAuthGuard))
  ROUTES.BOOKINGS,
  ROUTES.BOOKING_BY_USER,
  ROUTES.BOOKING_BY_PROPERTY(''), // puede usarse en verificación dinámica
  ROUTES.BOOKING_DETAIL(''),
  ROUTES.BOOKING_UPDATE(''),
  ROUTES.BOOKING_DELETE(''),
  ROUTES.BOOKING_UPDATE_STATUS(''),
  ROUTES.BOOKING_UPDATE_PAYMENT(''),
];

/**
 * Constantes para los endpoints de la API
 */
export const PROPERTIES_ENDPOINT = '/properties';
export const BOOKINGS_ENDPOINT = '/bookings';
