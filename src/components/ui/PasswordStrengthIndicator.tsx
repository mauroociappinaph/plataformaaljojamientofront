'use client';

import React from 'react';
import { PasswordStrengthIndicatorProps } from '@/types/ui.types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getPasswordCriteria } from '@/utils/passwordUtils';

/**
 * Componente para mostrar la fortaleza de la contraseña
 * @param strength - número del 0 al 4 que indica la fortaleza
 * @param password - contraseña para evaluar los criterios específicos
 */
export default function PasswordStrengthIndicator({
  strength = 0,
  password = ''
}: PasswordStrengthIndicatorProps) {
  const getColorClass = (level: number, currentStrength: number) => {
    if (currentStrength >= level) {
      switch (currentStrength) {
        case 1:
          return 'bg-red-400'; // Débil - mantenemos rojo para contraste visual
        case 2:
          return 'bg-amber-400'; // Moderada - ámbar para contraste visual
        case 3:
          return 'bg-vacacional-salvia'; // Buena - Verde salvia
        case 4:
          return 'bg-vacacional-menta'; // Fuerte - Verde menta
        default:
          return 'bg-gray-200';
      }
    }
    return 'bg-gray-200';
  };

  const getStrengthText = () => {
    switch (strength) {
      case 1:
        return { text: 'Débil', color: 'text-red-500' };
      case 2:
        return { text: 'Moderada', color: 'text-amber-500' };
      case 3:
        return { text: 'Buena', color: 'text-vacacional-salvia' };
      case 4:
        return { text: 'Fuerte', color: 'text-vacacional-menta' };
      default:
        return { text: 'Muy débil', color: 'text-gray-500' };
    }
  };

  // Obtenemos los criterios de la contraseña utilizando la función de utilidad
  const {
    hasMinLength,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecialChar
  } = getPasswordCriteria(password);

  const strengthInfo = getStrengthText();

  return (
    <div className="mt-1 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-1 flex-grow">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-grow rounded-full ${getColorClass(level, strength)}`}
            />
          ))}
        </div>
        <span className={`ml-3 text-xs font-medium ${strengthInfo.color}`}>
          {strengthInfo.text}
        </span>
      </div>

      {/* Criterios de contraseña */}
      {password.length > 0 && (
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mt-2">
          <div className="flex items-center">
            {hasMinLength ?
              <CheckIcon className="h-3 w-3 text-green-500 mr-1" /> :
              <XMarkIcon className="h-3 w-3 text-red-500 mr-1" />}
            Al menos 8 caracteres
          </div>
          <div className="flex items-center">
            {hasLowercase ?
              <CheckIcon className="h-3 w-3 text-green-500 mr-1" /> :
              <XMarkIcon className="h-3 w-3 text-red-500 mr-1" />}
            Una letra minúscula
          </div>
          <div className="flex items-center">
            {hasUppercase ?
              <CheckIcon className="h-3 w-3 text-green-500 mr-1" /> :
              <XMarkIcon className="h-3 w-3 text-red-500 mr-1" />}
            Una letra mayúscula
          </div>
          <div className="flex items-center">
            {hasNumber ?
              <CheckIcon className="h-3 w-3 text-green-500 mr-1" /> :
              <XMarkIcon className="h-3 w-3 text-red-500 mr-1" />}
            Un número
          </div>
          <div className="flex items-center">
            {hasSpecialChar ?
              <CheckIcon className="h-3 w-3 text-green-500 mr-1" /> :
              <XMarkIcon className="h-3 w-3 text-red-500 mr-1" />}
            Un carácter especial
          </div>
        </div>
      )}
    </div>
  );
}
