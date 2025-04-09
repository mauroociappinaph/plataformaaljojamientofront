'use client';

import Link from 'next/link';
import { FormInput, Button, ErrorMessage } from '@/components/ui';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useForgotPassword } from '@/hooks/form/useForgotPassword';
import { ROUTES } from '@/constants/routes';

/**
 * Página para solicitar recuperación de contraseña
 */
export default function ForgotPasswordPage() {
  const {
    email,
    isLoading,
    error,
    success,
    handleEmailChange,
    handleSubmit,
  } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-vacacional-crema to-vacacional-gris-verde py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-vacacional-agua flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <EnvelopeIcon className="h-8 w-8 text-vacacional-salvia" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800 tracking-tight">
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tu dirección de correo electrónico y te enviaremos instrucciones para recuperar tu contraseña.
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Si el correo electrónico está registrado, recibirás instrucciones para restablecer tu contraseña.
                  Por favor, revisa tu bandeja de entrada (y carpeta de spam si es necesario).
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={handleEmailChange}
              icon={<EnvelopeIcon className="h-5 w-5 text-vacacional-salvia" />}
              floatingLabel
            />

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
                {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
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
