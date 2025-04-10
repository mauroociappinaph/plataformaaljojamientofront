import axios from 'axios';

/**
 * Configuración base para todas las peticiones HTTP
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
export const DEFAULT_TIMEOUT = 10000; // 10 segundos
export const DEFAULT_RETRIES = 0;

/**
 * Configuración para almacenamiento de tokens
 */
export const AUTH_STORAGE = {
  TOKEN_KEY: 'token',
  REFRESH_TOKEN_KEY: 'refreshToken',
};

/**
 * Endpoints para autenticación
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
};

/**
 * Crea una instancia configurada de Axios
 */
export function createAxiosInstance() {
  return axios.create({
    baseURL: API_URL,
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Instancia global de Axios
 */
export const axiosInstance = createAxiosInstance();
