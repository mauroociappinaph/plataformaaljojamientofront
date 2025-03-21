'use client';

import { ButtonProps } from '@/types/ui.types';

/**
 * Componente reutilizable para botones
 */
export default function Button({
  children,
  isLoading = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Mapeo de variantes a clases de Tailwind usando la nueva paleta con colores más sólidos
  const variantClasses = {
    primary: 'bg-vacacional-salvia hover:bg-vacacional-menta text-white shadow-md',
    secondary: 'bg-vacacional-gris-verde hover:bg-vacacional-salvia text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-vacacional-crema text-gray-700',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type="button"
      disabled={isLoading || disabled}
      className={`relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vacacional-salvia ${widthClass} ${
        variantClasses[variant]
      } ${
        isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
