import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/api';
import { calculatePasswordStrength } from '@/utils/passwordUtils';
import { ROUTES } from '@/constants/routes';
import { useDoublePasswordVisibility } from './usePasswordVisibility';

/**
 * Hook personalizado para manejar el formulario de restablecimiento de contraseña
 */
export function useResetPassword(token: string) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Hook para manejar visibilidad de contraseñas
  const passwordVisibility = useDoublePasswordVisibility();

  // Calcular fortaleza de la contraseña cuando cambia
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  /**
   * Maneja cambios en el campo de contraseña
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  /**
   * Maneja cambios en el campo de confirmación de contraseña
   */
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (error) setError(null);
  };

  /**
   * Valida que las contraseñas coincidan y cumplan criterios de seguridad
   */
  const validatePasswords = (): boolean => {
    if (!password) {
      setError('La contraseña es requerida');
      return false;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (passwordStrength < 2) {
      setError('La contraseña es demasiado débil. Incluye letras, números y caracteres especiales.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Resetear estado de error
    setError(null);

    // Validar contraseñas
    if (!validatePasswords()) return;

    setIsLoading(true);

    try {
      await resetPassword({ token, password });
      setSuccess(true);

      // Redireccionar al login después de 3 segundos
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    passwordStrength,
    isLoading,
    error,
    success,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    // Visibilidad de contraseñas
    showPassword: passwordVisibility.showPassword,
    showConfirmPassword: passwordVisibility.showConfirmPassword,
    togglePasswordVisibility: passwordVisibility.togglePasswordVisibility,
    toggleConfirmPasswordVisibility: passwordVisibility.toggleConfirmPasswordVisibility,
    passwordInputType: passwordVisibility.passwordInputType,
    confirmPasswordInputType: passwordVisibility.confirmPasswordInputType
  };
}
