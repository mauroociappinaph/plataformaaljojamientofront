import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData, LoginFormErrors } from '@/types/forms.types';
import { loginSchema } from '@/validations/formValidationSchemas';
import { useForm } from './useForm';
import { usePasswordVisibility } from './usePasswordVisibility';
import { ROUTES } from '@/constants/routes';

/**
 * Hook personalizado para manejar el formulario de inicio de sesión
 */
export function useLoginForm() {
  const router = useRouter();
  const { login, isLoading: authLoading, error: authError } = useAuth();

  // Formulario genérico para login
  const form = useForm<LoginFormData, LoginFormErrors>({
    initialData: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      // Enviar datos al servicio de login
      const success = await login({
        email: data.email,
        password: data.password,
      });

      // Redireccionar si el login fue exitoso
      if (success) {
        router.push(ROUTES.DASHBOARD);
      }

      return success;
    }
  });

  // Manejo de visibilidad de contraseña
  const passwordVisibility = usePasswordVisibility();

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

    // Visibilidad de contraseña
    showPassword: passwordVisibility.showPassword,
    togglePasswordVisibility: passwordVisibility.togglePasswordVisibility,
    passwordInputType: passwordVisibility.inputType
  };
}
