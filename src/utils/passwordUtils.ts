/**
 * Utilidades para el manejo y validación de contraseñas
 */

/**
 * Evalúa y devuelve el estado de todos los criterios de seguridad para una contraseña
 *
 * Analiza una contraseña y devuelve un objeto con propiedades booleanas que indican
 * si cumple con cada uno de los criterios de seguridad estándar:
 *
 * @param password - La contraseña a evaluar
 * @returns Un objeto con las siguientes propiedades booleanas:
 *   - hasMinLength: `true` si tiene al menos 8 caracteres
 *   - hasLowercase: `true` si contiene al menos una letra minúscula
 *   - hasUppercase: `true` si contiene al menos una letra mayúscula
 *   - hasNumber: `true` si contiene al menos un número
 *   - hasSpecialChar: `true` si contiene al menos un carácter especial
 */
export function getPasswordCriteria(password: string) {
  return {
    hasMinLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^a-zA-Z0-9]/.test(password),
  };
}

/**
 * Verifica si una contraseña cumple con todos los criterios de seguridad:
 * - Mínimo 8 caracteres de longitud
 * - Al menos una letra minúscula
 * - Al menos una letra mayúscula
 * - Al menos un número
 * - Al menos un carácter especial (no alfanumérico)
 *
 * @param password - La contraseña a validar
 * @returns `true` si la contraseña cumple con todos los criterios, `false` en caso contrario
 */
export function isPasswordValid(password: string): boolean {
  const criteria = getPasswordCriteria(password);
  return (
    criteria.hasMinLength &&
    criteria.hasLowercase &&
    criteria.hasUppercase &&
    criteria.hasNumber &&
    criteria.hasSpecialChar
  );
}

/**
 * Calcula la fortaleza de una contraseña en una escala del 0 al 4 basado en criterios de seguridad
 *
 * Los criterios evaluados son:
 * - Longitud mínima de 8 caracteres
 * - Presencia de letras minúsculas
 * - Presencia de letras mayúsculas
 * - Presencia de números
 * - Presencia de caracteres especiales
 *
 * Niveles de fortaleza:
 * - 0: Sin contraseña o muy débil
 * - 1: Débil (cumple solo 1 criterio)
 * - 2: Moderada (cumple 2 criterios)
 * - 3: Buena (cumple 3 criterios)
 * - 4: Fuerte (cumple todos los criterios)
 *
 * @param password - La contraseña a evaluar
 * @returns Número del 0 al 4 que representa la fortaleza de la contraseña
 */
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  const criteria = getPasswordCriteria(password);
  const criteriaCount = Object.values(criteria).filter(Boolean).length;

  return Math.min(criteriaCount, 4);
}

/**
 * Valida una contraseña y devuelve un mensaje de error específico si no cumple con algún criterio
 * Esta función está diseñada para integrarse con validaciones Yup
 *
 * @param password - La contraseña a validar
 * @returns `true` si cumple todos los criterios, o un objeto con el mensaje de error específico
 */
export function validatePasswordForYup(password: string): true | { message: string } {
  const criteria = getPasswordCriteria(password);

  if (!criteria.hasMinLength) {
    return { message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  if (!criteria.hasLowercase) {
    return { message: 'La contraseña debe contener al menos una letra minúscula' };
  }
  if (!criteria.hasUppercase) {
    return { message: 'La contraseña debe contener al menos una letra mayúscula' };
  }
  if (!criteria.hasNumber) {
    return { message: 'La contraseña debe contener al menos un número' };
  }
  if (!criteria.hasSpecialChar) {
    return { message: 'La contraseña debe contener al menos un carácter especial' };
  }

  return true;
}
