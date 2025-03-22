import { HttpClient, RequestOptions, ApiResponse, HttpMethod } from '@/types/http.types';

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Cliente HTTP para realizar peticiones a la API
 */
export const http: HttpClient = {
  /**
   * Realiza una petición HTTP a la API
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      withAuth = false,
      timeout = 10000, // 10 segundos por defecto
      retries = 0
    } = options;

    // Configuración de cabeceras
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Añadir token de autenticación si es necesario
    if (withAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Crear controlador para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await this.executeRequest<T>(endpoint, method, requestHeaders, body, controller.signal, retries);
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      // Manejar errores específicos
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            data: null,
            error: 'La solicitud ha excedido el tiempo de espera',
            status: 408, // Request Timeout
          };
        }

        return {
          data: null,
          error: error.message || 'Error de conexión',
          status: 0, // Error de red o cliente
        };
      }

      return {
        data: null,
        error: 'Error desconocido',
        status: 0,
      };
    }
  },

  // Método para ejecutar la petición con reintentos
  async executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    signal: AbortSignal,
    retriesLeft: number
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_URL}${endpoint}`;
      console.log(`[HTTP] ${method} ${url}`, { headers, body: body ? JSON.stringify(body) : undefined });

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        signal,
      });

      console.log(`[HTTP] Respuesta de ${url}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()])
      });

      // Obtener datos de respuesta
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log(`[HTTP] Datos de respuesta:`, data);
      }

      // Si la respuesta no es exitosa
      if (!response.ok) {
        // Si hay reintentos disponibles y el error es de servidor (5xx)
        if (retriesLeft > 0 && response.status >= 500) {
          // Esperar antes de reintentar (backoff exponencial)
          const delay = 1000 * Math.pow(2, 3 - retriesLeft);
          await new Promise(resolve => setTimeout(resolve, delay));

          // Reintentar la petición
          return this.executeRequest<T>(endpoint, method, headers, body, signal, retriesLeft - 1);
        }

        return {
          data: null,
          error: data?.message || response.statusText || 'Error en la solicitud',
          status: response.status,
        };
      }

      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error) {
      // Si hay reintentos disponibles y no es un error de abort
      if (retriesLeft > 0 && error instanceof Error && error.name !== 'AbortError') {
        // Esperar antes de reintentar (backoff exponencial)
        const delay = 1000 * Math.pow(2, 3 - retriesLeft);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Reintentar la petición
        return this.executeRequest<T>(endpoint, method, headers, body, signal, retriesLeft - 1);
      }

      throw error;
    }
  },

  // Métodos de conveniencia
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  async put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
