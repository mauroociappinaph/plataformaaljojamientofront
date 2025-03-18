import { LoginDTO, RegisterDTO, AuthResponse } from '@/types/auth';
import { http } from '@/lib/http';

// Servicios para autenticación de usuarios

/**
 * Inicia sesión de usuario
 * @param credentials Datos de inicio de sesión (email y contraseña)
 * @returns Respuesta con token y datos del usuario
 */
export const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
  try {
    const { data, error } = await http.post<AuthResponse>('/auth/login', credentials);

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    // Guardar token en localStorage
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en servicio de login:', error.message);
      throw error;
    }
    throw new Error('Error desconocido en el inicio de sesión');
  }
};

/**
 * Registra un nuevo usuario
 * @param userData Datos del usuario a registrar
 * @returns Respuesta con usuario creado
 */
export const register = async (userData: RegisterDTO): Promise<{ user: unknown }> => {
  try {
    const { data, error } = await http.post<{ user: unknown }>('/auth/register', userData);

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en servicio de registro:', error.message);
      throw error;
    }
    throw new Error('Error desconocido en el registro');
  }
};

/**
 * Cierra la sesión del usuario actual
 * @returns Un mensaje de confirmación
 */
export const logout = async (): Promise<{ message: string }> => {
  try {
    // Limpiar token del localStorage
    localStorage.removeItem('token');

    // Si la gestión de sesión es con cookies en el servidor
    const { data, error } = await http.post<{ message: string }>('/auth/logout');

    if (error) {
      throw new Error(error);
    }

    return data || { message: 'Sesión cerrada correctamente' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en servicio de logout:', error.message);
    }

    // Incluso si hay un error en el servidor, consideramos el logout como exitoso
    // ya que eliminamos el token del cliente
    return { message: 'Sesión cerrada localmente' };
  }
};

/**
 * Verifica el token actual del usuario
 * @returns Datos del usuario si el token es válido
 */
export const verifyToken = async (): Promise<{ user: unknown }> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No hay token disponible');
    }

    const { data, error } = await http.get<{ user: unknown }>('/auth/verify', {
      withAuth: true
    });

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al verificar token:', error.message);
      throw error;
    }
    throw new Error('Error desconocido al verificar la sesión');
  }
};
