'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Componente que inicializa el estado de autenticación
 * Verifica el token almacenado en localStorage al cargar la aplicación
 * No renderiza nada visible, solo ejecuta lógica de inicialización
 */
export default function AuthInitializer() {
  const { verifySession } = useAuth();

  useEffect(() => {
    // Verificar la sesión existente en localStorage al montar el componente
    const checkSession = async () => {
      await verifySession();
    };

    checkSession();
    // Solo se ejecuta al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
