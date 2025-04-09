'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { PageHeader } from '@/components/ui/PageHeader';
import { useToast } from '@/hooks/useToast';

export default function CreatePropertyPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserPermissions = async () => {
      try {
        // Obtener el token almacenado
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/login?redirect=/properties/create');
          showToast('Debe iniciar sesión para acceder a esta página', 'error');
          return;
        }

        // Decodificar el token para obtener los datos de usuario (simple, no seguro)
        // En una implementación real, deberías hacer una solicitud al backend
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));

        // Verificar el rol del usuario
        const role = payload.role;

        if (role !== 'HOST' && role !== 'ADMIN') {
          router.push('/');
          showToast('Solo los anfitriones pueden crear propiedades', 'error');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Error al verificar permisos:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserPermissions();
  }, [router, showToast]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="text-center">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="bg-vacacional-rojo/10 border border-vacacional-rojo/20 text-vacacional-rojo rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
          <p className="mb-4">No tienes permisos para crear propiedades. Solo los anfitriones pueden realizar esta acción.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-block px-6 py-2 bg-vacacional-salvia text-white rounded-lg hover:bg-vacacional-salvia/90"
          >
            Volver a inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 pt-32">
      <PageHeader
        title="Crear nueva propiedad"
        description="Completa el formulario para publicar tu propiedad"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Propiedades', href: '/properties' },
          { label: 'Crear', href: '/properties/create', active: true },
        ]}
      />

      <div className="mt-8 mb-16">
        <PropertyForm />
      </div>
    </main>
  );
}
