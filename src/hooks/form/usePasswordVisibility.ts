import { useState } from 'react';

/**
 * Hook para manejar la visibilidad de campos de contraseña
 * @param initialState Estado inicial de visibilidad (default: false)
 */
export function usePasswordVisibility(initialState = false) {
  const [showPassword, setShowPassword] = useState(initialState);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return {
    showPassword,
    togglePasswordVisibility,
    inputType: showPassword ? 'text' : 'password'
  };
}

/**
 * Hook para manejar la visibilidad de dos campos de contraseña (contraseña y confirmación)
 */
export function useDoublePasswordVisibility() {
  const {
    showPassword,
    togglePasswordVisibility,
    inputType: passwordInputType
  } = usePasswordVisibility();

  const {
    showPassword: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
    inputType: confirmPasswordInputType
  } = usePasswordVisibility();

  return {
    showPassword,
    togglePasswordVisibility,
    passwordInputType,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    confirmPasswordInputType
  };
}
