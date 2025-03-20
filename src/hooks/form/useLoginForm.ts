import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';

// Definición del esquema de validación con Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria'),
});

// Tipo para los datos del formulario
export interface LoginFormData {
  email: string;
  password: string;
}

// Tipo para errores de validación
export type LoginFormErrors = Partial<
  Record<keyof LoginFormData, string>
>;

/**
 * Hook personalizado para manejar el formulario de inicio de sesión
 */
export function useLoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  // Estado del formulario
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<LoginFormErrors>({});

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
    if (validationErrors[name as keyof LoginFormData]) {
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
      await loginSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Transformar errores de Yup al formato de nuestro estado
        const errors: LoginFormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof LoginFormErrors] = err.message;
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

    // Enviar datos al servicio de login
    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    // Redireccionar si el login fue exitoso
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
  };
}
