/**
 * Configuración para las llamadas a la API
 * Este archivo centraliza la configuración del endpoint de la API
 */

// URL base de la API, obtiene de variables de entorno o usa el fallback para desarrollo local
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Opciones por defecto para fetch
export const DEFAULT_API_OPTIONS: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Para permitir el envío de cookies (autenticación)
};

/**
 * Función para construir URLs de la API
 */
export const apiUrl = (endpoint: string): string => {
  // Asegurarse de que el endpoint comienza con / si no lo tiene
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};

/**
 * Objeto con endpoints comunes para la API
 */
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Propiedades
  PROPERTIES: {
    BASE: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
    FAVORITES: '/properties/favorites',
  },

  // Usuarios
  USERS: {
    PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
  },

  // Reservas
  BOOKINGS: {
    BASE: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    USER: '/bookings/user',
    HOST: '/bookings/host',
  },
};
