'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';

/**
 * Página para verificar el email con un token
 */
export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const {
    isLoading,
    error,
    success
  } = useVerifyEmail(params.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-vacacional-crema to-vacacional-gris-verde py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-vacacional-agua flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            {success ? (
              <CheckCircleIcon className="h-8 w-8 text-vacacional-salvia" />
            ) : error ? (
              <XCircleIcon className="h-8 w-8 text-red-500" />
            ) : (
              <div className="h-8 w-8 border-4 border-vacacional-salvia border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800 tracking-tight">
            Verificación de Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLoading
              ? 'Verificando tu dirección de email...'
              : success
              ? '¡Tu email ha sido verificado exitosamente!'
              : 'Hubo un problema al verificar tu email.'}
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Tu cuenta ha sido verificada correctamente. Ya puedes acceder a todas las funcionalidades de la plataforma.
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 text-center">
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-vacacional-salvia hover:bg-vacacional-menta focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vacacional-salvia transition-colors duration-200 w-full mb-4"
          >
            Ir al inicio de sesión
          </Link>

          {error && (
            <Link
              href={ROUTES.RESEND_VERIFICATION}
              className="font-medium text-vacacional-salvia hover:text-vacacional-menta transition-colors duration-200"
            >
              Reenviar email de verificación
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
