/**
 * Utilidades para el manejo y validación de contraseñas
 */

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

  const criteriaCount = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length;

  return Math.min(criteriaCount, 4);
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
