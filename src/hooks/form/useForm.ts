import { useState } from 'react';
import * as yup from 'yup';

/**
 * Hook genérico para manejar formularios con validación
 */
export function useForm<
  TData,
  TErrors extends Partial<Record<keyof TData, string | undefined>>
>({
  initialData,
  validationSchema,
  onSubmit,
  onValidationSuccess
}: {
  initialData: TData;
  validationSchema: yup.ObjectSchema<object>;
  onSubmit?: (data: TData) => Promise<boolean>;
  onValidationSuccess?: (data: TData) => Promise<void> | void;
}) {
  // Estado del formulario
  const [formData, setFormData] = useState<TData>(initialData);

  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<TErrors>({} as TErrors);

  // Estado de carga
  const [isLoading, setIsLoading] = useState(false);

  // Estado para error general
  const [error, setError] = useState<string | null>(null);

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el estado del formulario
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error de validación para este campo
    if (validationErrors[name as keyof TData]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined,
      } as TErrors);
    }

    // Limpiar errores generales
    if (error) {
      setError(null);
    }
  };

  /**
   * Actualiza un campo específico del formulario
   */
  const setField = (name: keyof TData, value: unknown) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error de validación para este campo
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined,
      } as TErrors);
    }

    // Limpiar errores generales
    if (error) {
      setError(null);
    }
  };

  /**
   * Valida el formulario usando Yup
   */
  const validateForm = async (): Promise<boolean> => {
    try {
      // Validar todos los campos contra el esquema
      await validationSchema.validate(formData, { abortEarly: false });
      setValidationErrors({} as TErrors);
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Transformar errores de Yup al formato de nuestro estado
        const errors: Partial<Record<keyof TData, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof TData] = err.message;
          }
        });
        setValidationErrors(errors as TErrors);
      }
      return false;
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      // Validar el formulario
      const isValid = await validateForm();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      // Ejecutar lógica adicional después de validación exitosa
      if (onValidationSuccess) {
        await onValidationSuccess(formData);
      }

      // Llamar a la función onSubmit si se proporcionó
      if (onSubmit) {
        const success = await onSubmit(formData);
        if (!success) {
          setError('Ha ocurrido un error al procesar el formulario');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpia los errores generales
   */
  const clearError = () => {
    setError(null);
  };

  return {
    formData,
    setFormData,
    validationErrors,
    isLoading,
    error,
    handleChange,
    setField,
    validateForm,
    handleSubmit,
    clearError,
    setError,
  };
}
