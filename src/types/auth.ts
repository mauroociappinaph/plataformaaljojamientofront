/**
 * Tipos para la autenticación en la aplicación
 */

/**
 * Datos para inicio de sesión
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * Datos para registro de usuario
 */
export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

/**
 * Información del usuario autenticado
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePicture?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Roles de usuario en el sistema
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  HOST = 'HOST',
  USER = 'USER'
}

/**
 * Respuesta del servidor para autenticación
 */
export interface AuthResponse {
  user: User;
  token: string;
  expiresIn?: number;
}

/**
 * Estado de autenticación para el contexto/estado global
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
