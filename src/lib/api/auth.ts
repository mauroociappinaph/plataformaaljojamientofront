import { LoginDTO, RegisterDTO, AuthResponse, User, ForgotPasswordDTO, ResetPasswordDTO, PasswordResetResponse } from '@/types/auth.types';
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
export const register = async (userData: RegisterDTO): Promise<User> => {
  try {
    const { data, error } = await http.post<User>('/auth/register', userData);

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
 * Solicita la recuperación de contraseña
 * @param email Email del usuario que olvidó su contraseña
 * @returns Mensaje de confirmación
 */
export const forgotPassword = async (payload: ForgotPasswordDTO): Promise<PasswordResetResponse> => {
  try {
    console.log('Enviando solicitud a /auth/forgot-password con datos:', payload);
    const { data, error, status } = await http.post<PasswordResetResponse>('/auth/forgot-password', payload);

    console.log('Respuesta recibida:', { data, error, status });

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en servicio de recuperación de contraseña:', error.message);
      throw error;
    }
    throw new Error('Error al solicitar la recuperación de contraseña');
  }
};

/**
 * Restablece la contraseña con un token
 * @param payload Token de recuperación y nueva contraseña
 * @returns Mensaje de confirmación
 */
export const resetPassword = async (payload: ResetPasswordDTO): Promise<PasswordResetResponse> => {
  try {
    const { data, error } = await http.post<PasswordResetResponse>('/auth/reset-password', payload);

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en servicio de restablecimiento de contraseña:', error.message);
      throw error;
    }
    throw new Error('Error al restablecer la contraseña');
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
export const verifyToken = async (): Promise<{ user: User }> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No hay token disponible');
    }

    const { data, error } = await http.get<{ user: User }>('/auth/verify', {
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

/**
 * Verifica el email de un usuario con un token
 * @param token Token de verificación
 * @returns Mensaje de confirmación
 */
export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  try {
    const { data, error } = await http.post<{ message: string }>('/auth/verify-email', { token });

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al verificar email:', error.message);
      throw error;
    }
    throw new Error('Error al verificar el email');
  }
};

/**
 * Reenvía el email de verificación
 * @param email Email del usuario
 * @returns Mensaje de confirmación
 */
export const resendVerificationEmail = async (email: string): Promise<{ message: string }> => {
  try {
    const { data, error } = await http.post<{ message: string }>('/auth/resend-verification', { email });

    if (error) {
      throw new Error(error);
    }

    if (!data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al reenviar email de verificación:', error.message);
      throw error;
    }
    throw new Error('Error al reenviar el email de verificación');
  }
};
