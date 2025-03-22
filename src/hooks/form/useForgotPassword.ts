import { useState, FormEvent } from 'react';
import { forgotPassword } from '@/lib/api';

/**
 * Hook personalizado para manejar el formulario de recuperación de contraseña
 */
export function useForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Maneja el cambio en el campo de email
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Limpiar mensajes de error al editar
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  /**
   * Valida el formato de email
   */
  const validateEmail = (): boolean => {
    if (!email) {
      setError('El correo electrónico es requerido');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El formato del correo electrónico no es válido');
      return false;
    }

    return true;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Resetear estados
    setError(null);
    setSuccess(false);

    // Validar email
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      await forgotPassword({ email });
      setSuccess(true);
      // No limpiar el email para que el usuario pueda ver qué dirección usó
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

  /**
   * Reinicia el formulario
   */
  const resetForm = () => {
    setEmail('');
    setError(null);
    setSuccess(false);
  };

  return {
    email,
    isLoading,
    error,
    success,
    handleEmailChange,
    handleSubmit,
    resetForm
  };
}
