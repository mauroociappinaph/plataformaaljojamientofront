import { Metadata } from 'next';
import { PropertyDetail } from '@/components/properties/PropertyDetail';
import { RelatedProperties } from '@/components/properties/RelatedProperties';
import { getPropertyById } from '@/services/api/properties';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: PropertyPageProps
): Promise<Metadata> {
  try {
    // Obtener los datos de la propiedad
    const property = await getPropertyById(params.id);

    if (!property) {
      return {
        title: 'Propiedad no encontrada',
      };
    }

    return {
      title: `${property.title} - Vacacional`,
      description: property.description.slice(0, 160),
      openGraph: {
        title: `${property.title} - Vacacional`,
        description: property.description.slice(0, 160),
        images: property.images?.[0] ? [{ url: property.images[0] }] : [],
      },
    };
  } catch (error) {
    console.error('Error al generar metadatos:', error);
    return {
      title: 'Detalles de la propiedad - Vacacional',
    };
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  let initialData;

  try {
    // Intentar pre-cargar los datos de la propiedad en el servidor
    initialData = await getPropertyById(params.id);
  } catch (error) {
    // Si falla la carga en el servidor, el componente cliente manejará el error
    console.error('Error al cargar la propiedad:', error);
  }

  return (
    <main className="pt-32">
      <PropertyDetail
        propertyId={params.id}
        initialData={initialData}
      />

      {/* Propiedades relacionadas (client component) */}
      <RelatedProperties propertyId={params.id} />
    </main>
  );
}
