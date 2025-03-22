'use client';

import Link from 'next/link';
import { FormInput, Button, ErrorMessage, PasswordStrengthIndicator } from '@/components/ui';
import { useRegisterForm } from '@/hooks/form/useRegisterForm';
import { UserIcon, EnvelopeIcon, LockClosedIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '@/constants/routes';

/**
 * Página de registro mejorada con mejor UI/UX y nueva paleta de colores
 */
export default function RegisterPage() {
  const {
    formData,
    validationErrors,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    passwordStrength,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-vacacional-crema to-vacacional-gris-verde py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-vacacional-menta flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <UserIcon className="h-8 w-8 text-vacacional-salvia" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800 tracking-tight">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link href={ROUTES.LOGIN} className="font-medium text-vacacional-texto hover:text-vacacional-salvia transition-colors duration-200">
              inicia sesión con tu cuenta existente
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            error={validationErrors.name}
            icon={<UserIcon className="h-5 w-5 text-vacacional-salvia" />}
            floatingLabel
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            error={validationErrors.email}
            icon={<EnvelopeIcon className="h-5 w-5 text-vacacional-salvia" />}
            floatingLabel
          />

          <div className="mb-2 relative">
            <FormInput
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
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
            {formData.password && (
              <PasswordStrengthIndicator strength={passwordStrength} password={formData.password} />
            )}
          </div>

          <div className="relative">
            <FormInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={validationErrors.confirmPassword}
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
              className="group relative py-3 transform hover:scale-[1.01] transition-all bg-vacacional-menta hover:bg-vacacional-agua text-white"
            >
              {isLoading ? 'Registrando...' : 'Crear cuenta'}
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-vacacional-gris-verde"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O regístrate con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-vacacional-gris-verde rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-vacacional-gris-verde transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-vacacional-gris-verde rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-vacacional-gris-verde transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
