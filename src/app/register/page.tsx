'use client';

import Link from 'next/link';
import FormInput from '@/components/ui/FormInput';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/button';
import { useRegisterForm } from '@/hooks/form/useRegisterForm';

/**
 * Página de registro refactorizada para usar componentes reutilizables
 * y un hook personalizado para la lógica del formulario
 */
export default function RegisterPage() {
  const {
    formData,
    validationErrors,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              inicia sesión con tu cuenta existente
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <FormInput
              label="Nombre"
              name="name"
              type="text"
              required
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
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
            />

            <FormInput
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
            />

            <FormInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={validationErrors.confirmPassword}
            />
          </div>

          <ErrorMessage message={error} />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            fullWidth
            variant="primary"
          >
            {isLoading ? 'Registrando...' : 'Crear cuenta'}
          </Button>
        </form>
      </div>
    </div>
  );
}
