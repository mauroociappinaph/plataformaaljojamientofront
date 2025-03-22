import { Metadata } from 'next';
import { Suspense } from 'react';
import { PropertyListWithData } from '@/components/properties/PropertyListWithData';
import { PageHeader } from '../../components/ui/PageHeader';


export const metadata: Metadata = {
  title: 'Propiedades - Vacacional',
  description: 'Explora nuestras propiedades y encuentra el alojamiento perfecto para tus vacaciones.',
};

export default function PropertiesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        title="Propiedades"
        description="Explora nuestras propiedades disponibles"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Propiedades', href: '/properties', active: true },
        ]}
      />

      <div className="mt-8">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyListWithData />
        </Suspense>
      </div>
    </main>
  );
}

function PropertyListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>
      ))}
    </div>
  );
}
