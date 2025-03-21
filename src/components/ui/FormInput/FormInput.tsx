'use client';

import React, { useState } from 'react';
import { FormInputProps } from '@/types/ui.types';

/**
 * Componente reutilizable para inputs de formulario
 * Incluye label, input y mensaje de error
 */
export default function FormInput({
  label,
  name,
  error,
  icon,
  floatingLabel = false,
  helperText,
  className = '',
  placeholder,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && String(props.value).length > 0;

  // Si usamos etiqueta flotante, no mostramos el placeholder hasta que el campo tenga foco
  const actualPlaceholder = floatingLabel
    ? (isFocused ? placeholder : undefined)
    : placeholder;

  return (
    <div className="space-y-1 mb-2">
      {!floatingLabel && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          placeholder={actualPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`appearance-none relative block w-full ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2 border transition-all duration-200 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-300'
              : 'border-vacacional-gris-verde hover:border-vacacional-salvia focus:border-vacacional-menta focus:ring-vacacional-agua'
          } ${
            floatingLabel ? 'pt-6 pb-2' : 'py-2'
          } placeholder-gray-400 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
          {...props}
        />

        {floatingLabel && (
          <label
            htmlFor={name}
            className={`absolute transition-all duration-200 ${
              icon ? 'left-10' : 'left-3'
            } ${
              isFocused || hasValue
                ? 'top-1 text-xs font-medium text-vacacional-menta'
                : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
            }`}
          >
            {label}
          </label>
        )}

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
