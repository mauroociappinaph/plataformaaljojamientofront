import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';

// Definición del esquema de validación con Yup
const registerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

// Tipo para los datos del formulario
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipo para errores de validación
export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormData, string>
>;

/**
 * Calcula la fortaleza de una contraseña del 0-4
 * 0: Sin contraseña o muy débil
 * 1: Débil (solo letras o solo números)
 * 2: Moderada (letras y números)
 * 3: Buena (letras, números y al menos 8 caracteres)
 * 4: Fuerte (letras, números, caracteres especiales y al menos 8 caracteres)
 */
function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let strength = 0;

  // Si tiene al menos un carácter
  if (password.length > 0) strength = 1;

  // Si tiene letras y números
  if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) strength = 2;

  // Si tiene al menos 8 caracteres y tiene letras y números
  if (password.length >= 8 && strength === 2) strength = 3;

  // Si tiene caracteres especiales y al menos 8 caracteres
  if (/[^a-zA-Z0-9]/.test(password) && password.length >= 8) strength = 4;

  return strength;
}

/**
 * Hook personalizado para manejar el formulario de registro
 */
export function useRegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  // Estado del formulario
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<RegisterFormErrors>({});

  // Estado para la fortaleza de la contraseña
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // Actualizar la fortaleza de la contraseña cuando cambie
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el estado del formulario
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error de validación para este campo
    if (validationErrors[name as keyof RegisterFormData]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined,
      });
    }

    // Limpiar errores del backend
    if (error) {
      clearError();
    }
  };

  /**
   * Valida el formulario usando Yup
   */
  const validateForm = async (): Promise<boolean> => {
    try {
      // Validar todos los campos contra el esquema
      await registerSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Transformar errores de Yup al formato de nuestro estado
        const errors: RegisterFormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof RegisterFormErrors] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar el formulario
    const isValid = await validateForm();
    if (!isValid) return;

    // Enviar datos al servicio de registro
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // Redireccionar si el registro fue exitoso
    if (success) {
      router.push('/dashboard');
    }
  };

  return {
    formData,
    validationErrors,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    passwordStrength,
  };
}
