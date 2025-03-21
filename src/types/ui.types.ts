/**
 * Tipos para componentes de UI
 */

import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

/**
 * Props para el componente Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

/**
 * Props para el componente FormInput
 */
export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  icon?: ReactNode;
  floatingLabel?: boolean;
  helperText?: string;
}

/**
 * Props para el indicador de fortaleza de contraseña
 */
export interface PasswordStrengthIndicatorProps {
  strength: number;
  password?: string;
}

/**
 * Props para el componente de mensajes de error
 */
export interface ErrorMessageProps {
  message: string | null;
}
