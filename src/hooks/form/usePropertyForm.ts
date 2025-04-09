import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { CreatePropertyDTO, Property, UpdatePropertyDTO } from '@/types/property.types';
import { createProperty, updateProperty } from '@/services/api/properties';
import { useForm } from './useForm';
import { useToast } from '@/hooks/useToast';

// Esquema de validación para el formulario de propiedad
const propertyValidationSchema = yup.object().shape({
  title: yup.string().required('El título es obligatorio').min(5, 'El título debe tener al menos 5 caracteres'),
  description: yup.string().required('La descripción es obligatoria').min(20, 'La descripción debe tener al menos 20 caracteres'),
  price: yup.number().required('El precio es obligatorio').positive('El precio debe ser mayor a 0'),
  address: yup.string().required('La dirección es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
  country: yup.string().required('El país es obligatorio'),
  bedrooms: yup.number().required('El número de habitaciones es obligatorio').integer('Debe ser un número entero').min(1, 'Debe tener al menos 1 habitación'),
  bathrooms: yup.number().required('El número de baños es obligatorio').integer('Debe ser un número entero').min(1, 'Debe tener al menos 1 baño'),
  maxGuests: yup.number().required('El número máximo de huéspedes es obligatorio').integer('Debe ser un número entero').min(1, 'Debe tener al menos 1 huésped'),
  categoryId: yup.string().required('La categoría es obligatoria'),
  amenities: yup.array().of(yup.string()).min(1, 'Debe seleccionar al menos una comodidad'),
  images: yup.array().of(yup.string()).min(1, 'Debe subir al menos una imagen'),
});

// Valores iniciales para una propiedad nueva
const initialPropertyData: CreatePropertyDTO = {
  title: '',
  description: '',
  price: 0,
  location: '',
  address: '',
  city: '',
  country: '',
  bedrooms: 1,
  bathrooms: 1,
  maxGuests: 1,
  categoryId: '',
  amenities: [],
  images: [],
};

export interface UsePropertyFormProps {
  propertyId?: string;
  initialData?: Property;
  onSuccess?: (property: Property) => void;
}

export function usePropertyForm({ propertyId, initialData, onSuccess }: UsePropertyFormProps = {}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Determinar si estamos en modo edición
  const isEditMode = Boolean(propertyId);

  // Verificar permisos del usuario al montar el componente
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
        setUserRole(role);

        if (role !== 'HOST' && role !== 'ADMIN') {
          router.push('/');
          showToast('Solo los anfitriones pueden gestionar propiedades', 'error');
        }
      } catch (error) {
        console.error('Error al verificar permisos:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserPermissions();
  }, [router, showToast]);

  // Preparar datos iniciales en caso de edición
  const formInitialData = isEditMode && initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        price: initialData.price,
        location: initialData.location,
        address: initialData.address,
        city: initialData.city,
        country: initialData.country,
        bedrooms: initialData.bedrooms,
        bathrooms: initialData.bathrooms,
        maxGuests: initialData.maxGuests,
        categoryId: initialData.categoryId,
        amenities: initialData.amenities || [],
        images: initialData.images || [],
      }
    : initialPropertyData;

  // Usar el hook genérico de formulario
  const form = useForm<CreatePropertyDTO, Record<keyof CreatePropertyDTO, string | undefined>>({
    initialData: formInitialData,
    validationSchema: propertyValidationSchema,
    onSubmit: async (data) => {
      try {
        // Obtener token de autenticación
        const token = localStorage.getItem('token');

        if (!token) {
          showToast('Debes iniciar sesión para crear una propiedad', 'error');
          router.push('/login');
          return false;
        }

        // Verificar el rol del usuario
        if (userRole !== 'HOST' && userRole !== 'ADMIN') {
          showToast('No tienes permisos para gestionar propiedades', 'error');
          return false;
        }

        let result: Property;

        if (isEditMode && propertyId) {
          // En modo edición, actualizar propiedad existente
          result = await updateProperty(propertyId, data as UpdatePropertyDTO, token);
          showToast('Propiedad actualizada con éxito', 'success');
        } else {
          // En modo creación, crear nueva propiedad
          result = await createProperty(data, token);
          showToast('Propiedad creada con éxito', 'success');
        }

        // Llamar al callback de éxito si existe
        if (onSuccess) {
          onSuccess(result);
        } else {
          // Redirigir a la página de detalle de la propiedad
          router.push(`/properties/${result.id}`);
        }

        return true;
      } catch (error) {
        console.error('Error al guardar la propiedad:', error);
        showToast('Error al guardar la propiedad. Intenta nuevamente.', 'error');
        return false;
      }
    }
  });

  // Función para manejar la carga de imágenes
  const handleImageUpload = async (files: FileList) => {
    try {
      setUploadingImages(true);
      // Esta es una implementación de ejemplo, debe ser reemplazada con tu lógica real de carga
      // Por ejemplo, usando FormData y enviando a un endpoint

      const uploadedUrls: string[] = [];

      // Simulación de carga (reemplazar con implementación real)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular URLs de imágenes cargadas
      Array.from(files).forEach((_, index) => {
        uploadedUrls.push(`https://ejemplo.com/imagen-${Date.now()}-${index}.jpg`);
      });

      // Actualizar el formulario con las nuevas imágenes
      const currentImages = form.formData.images || [];
      form.setField('images', [...currentImages, ...uploadedUrls]);

      showToast('Imágenes cargadas con éxito', 'success');
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
      showToast('Error al cargar las imágenes', 'error');
    } finally {
      setUploadingImages(false);
    }
  };

  // Función para eliminar una imagen
  const removeImage = (imageUrl: string) => {
    const currentImages = form.formData.images || [];
    const updatedImages = currentImages.filter(url => url !== imageUrl);
    form.setField('images', updatedImages);
  };

  // Función para cargar categorías (debe implementarse)
  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      // Implementar la carga real de categorías desde tu API
      const fetchedCategories = [
        { id: '1', name: 'Casa' },
        { id: '2', name: 'Apartamento' },
        { id: '3', name: 'Villa' },
        { id: '4', name: 'Cabaña' },
      ];
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      showToast('Error al cargar las categorías', 'error');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Lista predefinida de comodidades
  const availableAmenities = [
    { id: 'wifi', name: 'WiFi' },
    { id: 'pool', name: 'Piscina' },
    { id: 'kitchen', name: 'Cocina' },
    { id: 'heating', name: 'Calefacción' },
    { id: 'ac', name: 'Aire acondicionado' },
    { id: 'parking', name: 'Estacionamiento' },
    { id: 'tv', name: 'TV' },
    { id: 'washer', name: 'Lavadora' },
    { id: 'dryer', name: 'Secadora' },
    { id: 'gym', name: 'Gimnasio' },
  ];

  // Función para manejar la selección de comodidades
  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = form.formData.amenities || [];
    if (currentAmenities.includes(amenityId)) {
      form.setField('amenities', currentAmenities.filter(id => id !== amenityId));
    } else {
      form.setField('amenities', [...currentAmenities, amenityId]);
    }
  };

  return {
    form,
    isEditMode,
    uploadingImages,
    loadingCategories,
    categories,
    availableAmenities,
    handleImageUpload,
    removeImage,
    loadCategories,
    toggleAmenity,
    isLoading,
    userRole,
  };
}
