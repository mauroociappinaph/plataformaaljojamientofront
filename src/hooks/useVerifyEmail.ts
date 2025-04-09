import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/lib/api/auth';
import { ROUTES } from '@/constants/routes';

export const useVerifyEmail = (token: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await verifyEmail(token);
        setSuccess(true);

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error al verificar el email');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError('Token de verificación no válido');
      setIsLoading(false);
    }
  }, [token, router]);

  return {
    isLoading,
    error,
    success
  };
};
