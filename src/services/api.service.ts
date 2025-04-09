import { DEFAULT_API_OPTIONS, apiUrl } from '@/config/api.config';

/**
 * Servicio para manejar las peticiones HTTP a la API
 */
class ApiService {
  /**
   * Método para hacer peticiones GET a la API
   */
  async get<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const response = await fetch(url, {
      ...DEFAULT_API_OPTIONS,
      ...options,
      method: 'GET',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Método para hacer peticiones POST a la API
   */
  async post<T = unknown>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const response = await fetch(url, {
      ...DEFAULT_API_OPTIONS,
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Método para hacer peticiones PUT a la API
   */
    async put<T = unknown>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const response = await fetch(url, {
      ...DEFAULT_API_OPTIONS,
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Método para hacer peticiones PATCH a la API
   */
  async patch<T = unknown>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const response = await fetch(url, {
      ...DEFAULT_API_OPTIONS,
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Método para hacer peticiones DELETE a la API
   */
  async delete<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const response = await fetch(url, {
      ...DEFAULT_API_OPTIONS,
      ...options,
      method: 'DELETE',
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Método para manejar la respuesta de la API
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    // Para respuestas sin contenido (204)
    if (response.status === 204) {
      return {} as T;
    }

    // Intentar parsear la respuesta como JSON
    let data: unknown;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error('Error parsing response: ' + error);
    }

    // Si la respuesta no es exitosa, lanzar error
    if (!response.ok) {
      const message = (data as { message?: string })?.message || response.statusText;
      const error = new Error(message) as Error & { status?: number, data?: unknown };
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data as T;
  }
}

// Exportar una instancia única del servicio
export const apiService = new ApiService();
