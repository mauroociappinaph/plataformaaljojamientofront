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
  name: string;
}

/**
 * Datos para solicitud de recuperación de contraseña
 */
export interface ForgotPasswordDTO {
  email: string;
}

/**
 * Datos para restablecer contraseña
 */
export interface ResetPasswordDTO {
  token: string;
  password: string;
}

/**
 * Información del usuario autenticado
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
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
  access_token: string;
  user?: User;
}

/**
 * Respuesta del servidor para recuperación de contraseña
 */
export interface PasswordResetResponse {
  message: string;
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
