import { LoginDTO, RegisterDTO, AuthResponse, User } from '@/types/auth';

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Servicios para autenticación de usuarios
 */

/**
 * Inicia sesión de usuario
 * @param credentials Datos de inicio de sesión (email y contraseña)
 * @returns Respuesta con token y datos del usuario
 */
export const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Para soportar cookies si se usan
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en servicio de login:', error);
    throw error;
  }
};

/**
 * Registra un nuevo usuario
 * @param userData Datos del usuario a registrar
 * @returns Respuesta con token y datos del usuario creado
 */
export const register = async (userData: RegisterDTO): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en servicio de registro:', error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario actual
 * @returns Un mensaje de confirmación
 */
export const logout = async (): Promise<{ message: string }> => {
  try {
    // Si la gestión de sesión es con cookies en el servidor
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }

    return { message: 'Sesión cerrada correctamente' };
  } catch (error) {
    console.error('Error en servicio de logout:', error);
    throw error;
  }
};

/**
 * Verifica el token actual del usuario
 * @returns Datos del usuario si el token es válido
 */
export const verifyToken = async (): Promise<{ user: User }> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No hay token disponible');
    }

    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token inválido o expirado');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al verificar token:', error);
    throw error;
  }
};
