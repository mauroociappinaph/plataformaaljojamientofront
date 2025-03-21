'use client';

import { FormInput, Button, ErrorMessage, PasswordStrengthIndicator } from '@/components/ui';
import { LockClosedIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useResetPassword } from '@/hooks/form/useResetPassword';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

/**
 * Página para restablecer la contraseña con un token
 */
export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const {
    password,
    confirmPassword,
    passwordStrength,
    isLoading,
    error,
    success,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    passwordInputType,
    confirmPasswordInputType
  } = useResetPassword(params.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-vacacional-crema to-vacacional-gris-verde py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-vacacional-agua flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <LockClosedIcon className="h-8 w-8 text-vacacional-salvia" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800 tracking-tight">
            Crear nueva contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Establece una nueva contraseña segura para tu cuenta.
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  ¡Contraseña restablecida exitosamente! Serás redirigido a la página de inicio de sesión en unos segundos.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FormInput
                label="Nueva contraseña"
                name="password"
                type={passwordInputType}
                autoComplete="new-password"
                required
                value={password}
                onChange={handlePasswordChange}
                icon={<LockClosedIcon className="h-5 w-5 text-vacacional-salvia" />}
                floatingLabel
              />
              <button
                type="button"
                className="absolute right-3 top-3 z-10 text-gray-500 hover:text-vacacional-salvia transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ?
                  <EyeSlashIcon className="h-5 w-5" /> :
                  <EyeIcon className="h-5 w-5" />
                }
              </button>
            </div>

            <PasswordStrengthIndicator strength={passwordStrength} password={password} />

            <div className="relative">
              <FormInput
                label="Confirmar contraseña"
                name="confirmPassword"
                type={confirmPasswordInputType}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                icon={<CheckIcon className="h-5 w-5 text-vacacional-salvia" />}
                floatingLabel
              />
              <button
                type="button"
                className="absolute right-3 top-3 z-10 text-gray-500 hover:text-vacacional-salvia transition-colors"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ?
                  <EyeSlashIcon className="h-5 w-5" /> :
                  <EyeIcon className="h-5 w-5" />
                }
              </button>
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="pt-4">
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                fullWidth
                variant="primary"
                className="group relative py-3 transform hover:scale-[1.01] transition-all font-medium"
              >
                {isLoading ? 'Procesando...' : 'Restablecer contraseña'}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-vacacional-salvia hover:text-vacacional-menta transition-colors duration-200"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
