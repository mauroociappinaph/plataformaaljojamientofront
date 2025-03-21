/**
 * Esquemas de validación para formularios de autenticación
 */
import * as yup from 'yup';

/**
 * Esquema para validar el formulario de registro
 */
export const registerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[^a-zA-Z0-9]/, 'La contraseña debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

/**
 * Esquema para validar el formulario de login
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria. Debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'),
});
