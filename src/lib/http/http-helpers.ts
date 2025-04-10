import {
  ErrorResponse,
  HttpMethod,
  ApiResponse,
  HttpResponseProcessor,
  HttpRequestExecutor,
  HttpRetryHandler,
  HttpErrorHandler
} from '@/types/http.types';
import axios, { isAxiosError, AxiosResponse } from 'axios';
import { HttpNetworkError, HttpUnknownError, HttpAbortedError, HttpAuthError, HttpTimeoutError, HttpAxiosError } from './http-errors';
import { API_URL } from './http-config';


// ===== Implementación de HttpErrorHandler =====
export const errorHandler: HttpErrorHandler = {
  handleError(error: unknown): ApiResponse<never> {
    // 1. Errores de timeout (más específico primero)
    if (error instanceof HttpTimeoutError) {
      return {
        data: null,
        error: HttpTimeoutError.ERROR_MESSAGES.TIMEOUT,
        status: 408,
      };
    }

    // 2. Errores de Axios
    if (isAxiosError(error)) {
      return {
        data: null,
        error: HttpAxiosError.ERROR_MESSAGES.AXIOS_ERROR,
        status: error.response?.status || 0,
      };
    }

    if (error instanceof HttpAbortedError) {
      return {
        data: null,
        error: HttpAbortedError.ERROR_MESSAGES.ABORTED,
        status: 0,
      };
    }

    // 3. Errores personalizados de sesión (ej: token expirado)
    if (error instanceof Error && error.message === 'TokenExpired') {
      return {
        data: null,
        error: HttpAuthError.ERROR_MESSAGES.SESSION_EXPIRED,
        status: 401,
      };
    }

    // 4. Errores genéricos
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message || HttpNetworkError.ERROR_MESSAGES.NETWORK,
        status: 0,
      };
    }

    // 5. Último recurso: error desconocido
    return {
      data: null,
      error: HttpUnknownError.ERROR_MESSAGES.UNKNOWN,
      status: 0,
    };
  }
};

// ===== Implementación de utilidades de logging =====

export function logRequest(
  method: string,
  url: string,
  headers: Record<string, string>,
  body: unknown
): void {
  console.debug(`[HTTP] ${method} ${url}`, {
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function logResponse(response: AxiosResponse): void {
  console.debug(`[HTTP] Response ${response.status} ${response.config.url}`, {
    status: response.status,
    data: response.data
  });
}

// ===== Utilidades de autenticación =====
export function prepareHeaders(headers: Record<string, string>, withAuth: boolean): Record<string, string> {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  return defaultHeaders;
}

// ===== Implementación de HttpRequestExecutor =====
export const requestExecutor: HttpRequestExecutor = {
  async executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    signal: AbortSignal
  ): Promise<AxiosResponse<T>> {
    const url = `${API_URL}${endpoint}`;

    logRequest(method, url, headers, body);

    return axios({
      url,
      method,
      headers,
      data: body,
      withCredentials: true,
      signal,
    });
  }
};

// ===== Implementación de HttpResponseProcessor =====
export const responseProcessor: HttpResponseProcessor = {
  processResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    logResponse(response);

    if (response.status >= 400) {
      const errorData = response.data as ErrorResponse;
      return {
        data: null,
        error: errorData?.message || response.statusText,
        status: response.status,
      };
    }

    return {
      data: response.data,
      error: null,
      status: response.status,
    };
  }
};

// ===== Implementación de HttpRetryHandler =====
export const retryHandler: HttpRetryHandler = {
  async executeWithRetry<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    timeout: number,
    retriesLeft: number
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await requestExecutor.executeRequest<T>(
        endpoint,
        method,
        headers,
        body,
        controller.signal
      );

      clearTimeout(timeoutId);
      return responseProcessor.processResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      return this.handleRetry<T>(
        error,
        () => this.executeWithRetry<T>(
          endpoint,
          method,
          headers,
          body,
          timeout,
          retriesLeft - 1
        ),
        retriesLeft
      );
    }
  },

  async handleRetry<T>(
    error: unknown,
    retryCallback: () => Promise<ApiResponse<T>>,
    retriesLeft: number
  ): Promise<ApiResponse<T>> {
    if (this.isRetryableError(error) && retriesLeft > 0) {
      await this.waitForRetry(retriesLeft);
      return retryCallback();
    }
    throw error;
  },

  isRetryableError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      return !error.response || error.response.status >= 500;
    }
    return false;
  },

  async waitForRetry(retriesLeft: number): Promise<void> {
    const delay = 1000 * Math.pow(2, 3 - retriesLeft);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

// ===== Métodos de autenticación =====
export function setupInterceptors(): void {
  // Implementación inicial vacía
}

export async function refreshToken(): Promise<string> {
  // Implementación básica
  return Promise.resolve('');
}

export async function handleRefreshTokenFailure(): Promise<void> {
  // Implementación básica
  return Promise.resolve();
}

export async function initialize(): Promise<void> {
  setupInterceptors();
  return Promise.resolve();
}

// ===== Funciones con nombres compatibles hacia atrás para evitar refactorización extensa =====
export const _handleError = errorHandler.handleError;
export const _executeRequest = requestExecutor.executeRequest;
export const _processResponse = responseProcessor.processResponse;
export const _executeWithRetry = retryHandler.executeWithRetry.bind(retryHandler);
export const _handleRetry = retryHandler.handleRetry.bind(retryHandler);
export const _isRetryableError = retryHandler.isRetryableError;
export const _waitForRetry = retryHandler.waitForRetry;
export const _prepareHeaders = prepareHeaders;
export const _logRequest = logRequest;
export const _logResponse = logResponse;
export const _setupInterceptors = setupInterceptors;
export const _refreshToken = refreshToken;
export const _handleRefreshTokenFailure = handleRefreshTokenFailure;

