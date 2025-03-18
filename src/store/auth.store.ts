import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User } from '@/types/auth.types';

/**
 * Store de autenticación
 * Utiliza zustand para gestionar el estado de autenticación
 * Además, utiliza el middleware persist para guardar el estado en localStorage
 * y mantener la sesión incluso después de refrescar la página
 */
export const useAuthStore = create<AuthState & {
  // Acciones para modificar el estado
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones completas (login, logout, etc.)
  startLoading: () => void;
  loginSuccess: (user: User | null, token: string) => void;
  logout: () => void;
  setAuthError: (error: string) => void;
  clearError: () => void;

}>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Acciones simples para modificar el estado
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Acciones complejas
      startLoading: () => set({ isLoading: true, error: null }),

      // Guarda el usuario y token después de un login exitoso
      loginSuccess: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }),

      // Limpia toda la información de autenticación
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }),

      // Establece un error y detiene la carga
      setAuthError: (error) => set({
        error,
        isLoading: false
      }),

      // Limpia cualquier error presente
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage', // Nombre en localStorage
      storage: createJSONStorage(() => localStorage), // Usar localStorage como almacenamiento
      partialize: (state) => ({
        // Solo guardamos en localStorage lo necesario
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
