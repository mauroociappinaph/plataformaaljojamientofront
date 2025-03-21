/**
 * Tipos para formularios de la aplicación
 */

/**
 * Datos para el formulario de inicio de sesión
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Errores de validación para el formulario de inicio de sesión
 */
export type LoginFormErrors = Partial<
  Record<keyof LoginFormData, string>
>;

/**
 * Datos para el formulario de registro
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Errores de validación para el formulario de registro
 */
export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormData, string>
>;
