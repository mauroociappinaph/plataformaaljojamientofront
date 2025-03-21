import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormData, RegisterFormErrors } from '@/types/forms.types';
import { calculatePasswordStrength } from '@/utils/passwordUtils';
import { registerSchema } from '@/validations/authSchemas';

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

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones para alternar visibilidad de contraseñas
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

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
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  };
}
