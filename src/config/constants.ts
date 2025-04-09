// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Paginación
export const DEFAULT_PAGE_SIZE = 10;

// Cache
export const CACHE_PROPERTY_TIME = 60 * 60 * 24; // 24 horas en segundos

// Localstorage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'vacacional_user_token',
  USER_DATA: 'vacacional_user_data',
  FAVORITE_PROPERTIES: 'vacacional_favorite_properties',
  SEARCH_HISTORY: 'vacacional_search_history',
  THEME: 'vacacional_theme',
};

// Valores por defecto
export const DEFAULT_VALUES = {
  PROPERTY_IMAGE: '/images/property-placeholder.jpg',
  USER_AVATAR: '/images/avatar-placeholder.jpg',
  CURRENCY: 'ARS',
};

// Colores de la aplicación
export const THEME_COLORS = {
  primary: {
    light: '#3e9e91',
    DEFAULT: '#2D8980',
    dark: '#1f5f58',
  },
  secondary: {
    light: '#f3c677',
    DEFAULT: '#F1B955',
    dark: '#d79b37',
  },
  accent: {
    light: '#e57c6f',
    DEFAULT: '#E05E4E',
    dark: '#c4433a',
  },
  neutral: {
    light: '#f5f7fa',
    DEFAULT: '#DFE3E6',
    dark: '#b0b8c0',
  },
  text: {
    DEFAULT: '#34495E',
    light: '#7A8C9E',
  },
};
