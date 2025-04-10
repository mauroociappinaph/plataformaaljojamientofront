import { ApiResponse } from '@/types/http.types';
import { HttpError } from './http-errors';
import { isAxiosError } from 'axios';

export function handleError(error: unknown): ApiResponse<never> {
  // 1. Errores de timeout (más específico primero)
  if (error instanceof Error && error.name === 'AbortError') {
    return {
      data: null,
      error: HttpError.ERROR_MESSAGES.ABORTED,
      status: 408,
    };
  }

  // 2. Errores de Axios
  if (isAxiosError(error)) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
      status: error.response?.status || 0,
    };
  }

  // 3. Errores personalizados de sesión (ej: token expirado)
  if (error instanceof Error && error.message === 'TokenExpired') {
    return {
      data: null,
      error: HttpError.ERROR_MESSAGES.SESSION_EXPIRED,
      status: 401,
    };
  }

  // 4. Errores genéricos
  if (error instanceof Error) {
    return {
      data: null,
      error: error.message || HttpError.ERROR_MESSAGES.NETWORK,
      status: 0,
    };
  }

  // 5. Último recurso: error desconocido
  return {
    data: null,
    error: HttpError.ERROR_MESSAGES.UNKNOWN,
    status: 0,
  };
}
