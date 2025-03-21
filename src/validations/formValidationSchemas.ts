/**
 * Esquemas de validación para formularios de la aplicación
 *
 * Este módulo contiene los esquemas de validación Yup para los diferentes formularios
 * de la aplicación, incluyendo registro, login y otros formularios relacionados con
 * la autenticación y gestión de usuarios.
 *
 * @module formValidationSchemas
 */
import * as yup from 'yup';
import { validatePasswordForYup } from '@/utils/passwordUtils';

// Validación reutilizable para el campo de email
const emailValidation = yup
  .string()
  .email('Email inválido')
  .required('El email es obligatorio');

// Validación reutilizable para el campo de contraseña
const passwordValidation = yup
  .string()
  .test('is-strong-password', 'La contraseña no cumple con los requisitos', function(value) {
    // Si no hay valor, no ejecutamos las validaciones adicionales
    if (!value) return false; // Ya se maneja con .required()

    // Usamos la función auxiliar que devuelve true o un objeto con mensaje de error
    const validationResult = validatePasswordForYup(value);

    // Si no es true, es un objeto con un mensaje de error
    if (validationResult !== true) {
      return this.createError({
        message: validationResult.message
      });
    }

    // Si cumple todos los criterios
    return true;
  })
  .required('La contraseña es obligatoria');

/**
 * Esquema para validar el formulario de registro de usuarios
 *
 * Valida los siguientes campos:
 * - name: Nombre completo del usuario (requerido)
 * - email: Email válido y único (requerido)
 * - password: Contraseña que cumple con los requisitos de seguridad (requerida)
 * - confirmPassword: Debe coincidir con el campo password (requerido)
 */
export const registerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

/**
 * Esquema para validar el formulario de inicio de sesión
 *
 * Valida los siguientes campos:
 * - email: Email válido registrado en el sistema (requerido)
 * - password: Contraseña de la cuenta (requerida)
 */
export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: yup.string().required('La contraseña es obligatoria'),
});
