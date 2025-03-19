'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Componente que protege rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a la página de login
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo redirigimos si:
    // 1. No está cargando (ya se verificó el estado de autenticación)
    // 2. No está autenticado
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  // Mientras está cargando, muestra un spinner o pantalla de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si está autenticado, muestra el contenido de la ruta protegida
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si no está autenticado y no está cargando, no muestra nada
  // mientras se completa la redirección
  return null;
}
