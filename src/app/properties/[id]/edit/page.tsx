'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { PageHeader } from '@/components/ui/PageHeader';
import { getPropertyById } from '@/services/api/properties';
import { Property } from '@/types/property.types';
import { useToast } from '@/hooks/useToast';
import { EditPropertyPageProps } from '@/types/property.types';

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = params;
  const router = useRouter();
  const { showToast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPropertyAndCheckPermissions = async () => {
      try {
        setIsLoading(true);

        // Verificar autenticación
        const token = localStorage.getItem('token');
        if (!token) {
          router.push(`/login?redirect=/properties/${id}/edit`);
          showToast('Debe iniciar sesión para editar una propiedad', 'error');
          return;
        }

        // Decodificar token para obtener rol
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const userRole = payload.role;
        const userId = payload.userId;

        // Verificar rol
        if (userRole !== 'HOST' && userRole !== 'ADMIN') {
          router.push('/');
          showToast('No tienes permisos para editar propiedades', 'error');
          return;
        }

        // Cargar datos de la propiedad
        const propertyData = await getPropertyById(id);

        if (!propertyData) {
          setError('Propiedad no encontrada');
          return;
        }

        // Verificar que el usuario sea el propietario o administrador
        if (userRole !== 'ADMIN' && propertyData.ownerId !== userId) {
          router.push('/');
          showToast('Solo puedes editar tus propias propiedades', 'error');
          return;
        }

        setProperty(propertyData);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Error al cargar la propiedad:', error);
        setError('Error al cargar la propiedad');
      } finally {
        setIsLoading(false);
      }
    };

    loadPropertyAndCheckPermissions();
  }, [id, router, showToast]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="text-center">
          <p className="text-gray-600">Cargando propiedad...</p>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="bg-vacacional-rojo/10 border border-vacacional-rojo/20 text-vacacional-rojo rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="mb-4">{error || 'No se encontró la propiedad solicitada'}</p>
          <button
            onClick={() => router.push('/properties')}
            className="inline-block px-6 py-2 bg-vacacional-salvia text-white rounded-lg hover:bg-vacacional-salvia/90"
          >
            Ver propiedades
          </button>
        </div>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="bg-vacacional-rojo/10 border border-vacacional-rojo/20 text-vacacional-rojo rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
          <p className="mb-4">No tienes permisos para editar esta propiedad.</p>
          <button
            onClick={() => router.push('/properties')}
            className="inline-block px-6 py-2 bg-vacacional-salvia text-white rounded-lg hover:bg-vacacional-salvia/90"
          >
            Ver propiedades
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 pt-32">
      <PageHeader
        title={`Editar: ${property.title}`}
        description="Actualiza la información de tu propiedad"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Propiedades', href: '/properties' },
          { label: property.title, href: `/properties/${id}` },
          { label: 'Editar', href: `/properties/${id}/edit`, active: true },
        ]}
      />

      <div className="mt-8 mb-16">
        <PropertyForm propertyId={id} initialData={property} />
      </div>
    </main>
  );
}
