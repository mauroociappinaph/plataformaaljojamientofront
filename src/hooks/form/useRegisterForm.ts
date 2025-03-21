import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormData, RegisterFormErrors } from '@/types/forms.types';
import { calculatePasswordStrength } from '@/utils/passwordUtils';
import { registerSchema } from '@/validations/formValidationSchemas';
import { useForm } from './useForm';
import { useDoublePasswordVisibility } from './usePasswordVisibility';

/**
 * Hook personalizado para manejar el formulario de registro
 */
export function useRegisterForm() {
  const router = useRouter();
  const { register, isLoading: authLoading, error: authError } = useAuth();

  // Estado para la fortaleza de la contraseña
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // Formulario genérico para registro
  const form = useForm<RegisterFormData, RegisterFormErrors>({
    initialData: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (data) => {
      // Enviar datos al servicio de registro
      const success = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // Redireccionar si el registro fue exitoso
      if (success) {
        router.push('/dashboard');
      }

      return success;
    }
  });

  // Actualizar la fortaleza de la contraseña cuando cambie
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(form.formData.password));
  }, [form.formData.password]);

  // Manejo de visibilidad de contraseñas
  const passwordVisibility = useDoublePasswordVisibility();

  // Sincronizar errores del servicio de autenticación con el formulario
  useEffect(() => {
    if (authError) {
      form.setError(authError);
    }
  }, [authError]);

  return {
    // Propiedades del formulario
    formData: form.formData,
    validationErrors: form.validationErrors,
    isLoading: form.isLoading || authLoading,
    error: form.error || authError,
    handleChange: form.handleChange,
    handleSubmit: form.handleSubmit,

    // Fortaleza de la contraseña
    passwordStrength,

    // Visibilidad de contraseñas
    showPassword: passwordVisibility.showPassword,
    showConfirmPassword: passwordVisibility.showConfirmPassword,
    togglePasswordVisibility: passwordVisibility.togglePasswordVisibility,
    toggleConfirmPasswordVisibility: passwordVisibility.toggleConfirmPasswordVisibility,
    passwordInputType: passwordVisibility.passwordInputType,
    confirmPasswordInputType: passwordVisibility.confirmPasswordInputType
  };
}
