'use client';

import React from 'react';

interface PasswordStrengthIndicatorProps {
  strength: number;
}

/**
 * Componente para mostrar la fortaleza de la contraseña
 * @param strength - número del 0 al 4 que indica la fortaleza
 */
export default function PasswordStrengthIndicator({ strength = 0 }: PasswordStrengthIndicatorProps) {
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

  const strengthInfo = getStrengthText();

  return (
    <div className="mt-1 mb-4">
      <div className="flex justify-between items-center">
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
    </div>
  );
}
