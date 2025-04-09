import { Metadata } from 'next';
import { getPropertyById } from '@/services/api/properties';

// Generar metadata dinámica basada en el ID de la propiedad
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Intentar obtener los datos de la propiedad
    const property = await getPropertyById(params.id);

    // Si se encontró la propiedad, usar su título en el metadata
    if (property) {
      return {
        title: `Editar ${property.title} - Vacacional`,
        description: `Actualiza la información de tu propiedad: ${property.title}`,
      };
    }
  } catch (error) {
    console.error('Error al generar metadata:', error);
  }

  // Metadata por defecto si no se puede obtener la propiedad
  return {
    title: 'Editar propiedad - Vacacional',
    description: 'Actualiza la información de tu propiedad en nuestra plataforma.',
  };
}
