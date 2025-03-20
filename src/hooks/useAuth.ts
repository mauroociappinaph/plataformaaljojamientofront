import { useAuthStore } from '@/store/auth.store';
import { LoginDTO, RegisterDTO, User } from '@/types/auth.types';
import { login as apiLogin, register as apiRegister, logout as apiLogout, verifyToken as apiVerifyToken } from '@/lib/api/auth';
import { useCallback } from 'react';

/**
 * Hook personalizado para manejar operaciones de autenticación
 * Proporciona una API más simple y específica para componentes
 */
export const useAuth = () => {
  // Obtenemos estados y acciones del store
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    startLoading,
    loginSuccess,
    logout: storeLogout,
    setAuthError,
    clearError
  } = useAuthStore();

  /**
   * Inicia sesión con credenciales
   */
  const login = useCallback(async (credentials: LoginDTO) => {
    try {
      startLoading();
      clearError();

      // Llamada al servicio de autenticación existente
      const response = await apiLogin(credentials);

      // Si tenemos token, guardamos la sesión
      if (response.access_token) {
        loginSuccess(response.user || null, response.access_token);
        return true;
      }

      setAuthError('No se recibió token de autenticación');
      return false;
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Error desconocido al iniciar sesión');
      }
      return false;
    }
  }, [startLoading, clearError, loginSuccess, setAuthError]);

  /**
   * Registra un nuevo usuario
   */
  const register = useCallback(async (userData: RegisterDTO) => {
    try {
      startLoading();
      clearError();

      // Llamada al servicio de registro existente
      await apiRegister(userData);

      // Iniciamos sesión automáticamente tras un registro exitoso
      return await login({
        email: userData.email,
        password: userData.password
      });
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Error desconocido al registrarse');
      }
      return false;
    }
  }, [startLoading, clearError, login, setAuthError]);

  /**
   * Cierra la sesión del usuario
   */
  const logout = useCallback(async () => {
    try {
      // Intentamos hacer logout en el backend
      await apiLogout();
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      // Siempre limpiamos el estado local, incluso si falla el logout en el servidor
      storeLogout();
    }
  }, [storeLogout]);

  /**
   * Verifica si el token actual es válido
   */
  const verifySession = useCallback(async () => {
    // Si no hay token, no hay nada que verificar
    if (!token) return false;

    try {
      startLoading();

      // Intentamos verificar el token en el backend
      const userData = await apiVerifyToken();

      if (userData && userData.user) {
        // Actualizamos la información del usuario si el token es válido
        loginSuccess(userData.user as User, token);
        return true;
      }

      // Si no hay usuario, el token no es válido
      storeLogout();
      return false;
    } catch (error) {
      console.log(error);

      // Si hay error, el token no es válido
      storeLogout();
      return false;
    }
  }, [token, startLoading, loginSuccess, storeLogout]);

  return {
    // Estados
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Acciones
    login,
    register,
    logout,
    verifySession,
    clearError
  };
};
