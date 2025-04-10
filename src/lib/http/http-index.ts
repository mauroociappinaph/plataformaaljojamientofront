import { ErrorResponse,HttpImplementation, RequestOptions, ApiResponse, HttpMethod } from '@/types/http.types';
import axios, { AxiosResponse } from 'axios';
import { handleError } from './http-helpers';


// Configuración constante
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const DEFAULT_TIMEOUT = 10000; // 10 segundos
const DEFAULT_RETRIES = 0;



export const http: HttpImplementation = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      withAuth = false,
      timeout = DEFAULT_TIMEOUT,
      retries = DEFAULT_RETRIES,

    } = options;
    try {
      const requestHeaders = this._prepareHeaders(headers, withAuth);
      return await this._executeWithRetry<T>(
        endpoint,
        method,
        requestHeaders,
        body,
        timeout,
        retries
      );
    } catch (error) {
      return handleError(error);
    }
  },

  // Métodos HTTP simplificados
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  async put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  async patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  // --- Métodos internos (convención TypeScript para privados) ---

  _prepareHeaders(headers: Record<string, string>, withAuth: boolean): Record<string, string> {
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
  },

  async _executeWithRetry<T>(
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
      const response = await this._executeRequest<T>(
        endpoint,
        method,
        headers,
        body,
        controller.signal
      );

      clearTimeout(timeoutId);
      return this._processResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      return this._handleRetry<T>(
        error,
        () => this._executeWithRetry<T>(
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

  async _executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    signal: AbortSignal
  ): Promise<AxiosResponse<T>> {
    const url = `${API_URL}${endpoint}`;

    this._logRequest(method, url, headers, body);

    return axios({
      url,
      method,
      headers,
      data: body,
      withCredentials: true,
      signal,
    });
  },

  _processResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    this._logResponse(response);

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
  },

  async _handleRetry<T>(
    error: unknown,
    retryCallback: () => Promise<ApiResponse<T>>,
    retriesLeft: number
  ): Promise<ApiResponse<T>> {
    if (this._isRetryableError(error) && retriesLeft > 0) {
      await this._waitForRetry(retriesLeft);
      return retryCallback();
    }
    throw error;
  },

  _isRetryableError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      return !error.response || error.response.status >= 500;
    }
    return false;
  },

  async _waitForRetry(retriesLeft: number): Promise<void> {
    const delay = 1000 * Math.pow(2, 3 - retriesLeft);
    await new Promise(resolve => setTimeout(resolve, delay));
  },



  _logRequest(
    method: string,
    url: string,
    headers: Record<string, string>,
    body: unknown
  ): void {
    console.debug(`[HTTP] ${method} ${url}`, {
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  _logResponse(response: AxiosResponse): void {
    console.debug(`[HTTP] Response ${response.status} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
  },

  _setupInterceptors(): void {
    // Implementación inicial vacía
  },

  async _refreshToken(): Promise<string> {
    // Implementación básica
    return Promise.resolve('');
  },

  async _handleRefreshTokenFailure(): Promise<void> {
    // Implementación básica
    return Promise.resolve();
  },

  async initialize(): Promise<void> {
    // Inicializar cliente
    this._setupInterceptors();
    return Promise.resolve();
  },


};
