import  { AxiosResponse } from 'axios';
/**
 * Tipos para el cliente HTTP
 */

/**
 * Métodos HTTP soportados
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Opciones para las peticiones HTTP
 */
export interface RequestOptions {
  /**
   * Método HTTP a utilizar
   * @default 'GET'
   */
  method?: HttpMethod;

  /**
   * Cabeceras HTTP personalizadas
   */
  headers?: Record<string, string>;

  /**
   * Cuerpo de la petición (se serializará a JSON)
   */
  body?: unknown;

  /**
   * Indica si la petición debe incluir el token de autenticación
   * @default false
   */
  withAuth?: boolean;

  /**
   * Tiempo máximo de espera en milisegundos
   * @default 10000 (10 segundos)
   */
  timeout?: number;

  /**
   * Número de reintentos en caso de error
   * @default 0
   */
  retries?: number;
}

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
  /**
   * Datos de la respuesta
   */
  data: T | null;

  /**
   * Mensaje de error (si lo hay)
   */
  error: string | null;

  /**
   * Código de estado HTTP
   */
  status: number;
}

/**
 * Cliente HTTP
 */
export interface HttpClient {
  /**
   * Realiza una petición HTTP genérica
   */
  request<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;

  /**
   * Ejecuta una petición HTTP con soporte para reintentos
   * @internal Este método es usado internamente por los otros métodos
   */
  executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    signal: AbortSignal,
    retriesLeft: number
  ): Promise<ApiResponse<T>>;

  /**
   * Realiza una petición GET
   */
  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>>;

  /**
   * Realiza una petición POST
   */
  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>>;

  /**
   * Realiza una petición PUT
   */
  put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>>;

  /**
   * Realiza una petición PATCH
   */
  patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>>;

  /**
   * Realiza una petición DELETE
   */
  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>>;
}

/**
 * Extensión de autenticación para el cliente HTTP
 */
export interface HttpHelperExtension {
  /**
   * Configura los interceptores para manejar tokens
   */
  _setupInterceptors(): void;

  /**
   * Refresca el token de autenticación
   * @returns El nuevo token de autenticación
   */
  _refreshToken(): Promise<string>;

  /**
   * Maneja el fallo al refrescar el token
   */
  _handleRefreshTokenFailure(): Promise<void>;

  /**
   * Inicializa el cliente HTTP
   */
  initialize(): Promise<void>;
}

export interface HttpImplementation extends Omit<HttpClient, 'executeRequest'>, HttpHelperExtension {
  _prepareHeaders(headers: Record<string, string>, withAuth: boolean): Record<string, string>;
  _executeWithRetry<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    timeout: number,
    retriesLeft: number
  ): Promise<ApiResponse<T>>;
  _executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    headers: Record<string, string>,
    body: unknown | undefined,
    signal: AbortSignal
  ): Promise<AxiosResponse<T>>;
  _processResponse<T>(response: AxiosResponse<T>): ApiResponse<T>;
  _handleRetry<T>(
    error: unknown,
    retryCallback: () => Promise<ApiResponse<T>>,
    retriesLeft: number
  ): Promise<ApiResponse<T>>;
  _isRetryableError(error: unknown): boolean;
  _waitForRetry(retriesLeft: number): Promise<void>;
  _logRequest(method: string, url: string, headers: Record<string, string>, body: unknown): void;
  _logResponse(response: AxiosResponse): void;
}

export interface ErrorResponse {
  message?: string;
  code?: string;
}
