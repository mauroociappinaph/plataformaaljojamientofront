'use client';

import { useEffect, useRef } from 'react';
import { Property } from '@/types/property.types';
import { usePropertyForm } from '@/hooks';

interface PropertyFormProps {
  propertyId?: string;
  initialData?: Property;
  onSuccess?: (property: Property) => void;
}

export function PropertyForm({ propertyId, initialData, onSuccess }: PropertyFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = usePropertyForm({
    propertyId,
    initialData,
    onSuccess,
  });

  useEffect(() => {
    // Cargar categorías al montar el componente
    loadCategories();
  }, [loadCategories]);

  return (
    <form onSubmit={form.handleSubmit} className="space-y-8">
      {/* Información básica */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isEditMode ? 'Editar propiedad' : 'Crear nueva propiedad'}
        </h2>

        {/* Título */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.formData.title}
            onChange={form.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Ej: Hermoso apartamento con vista al mar"
          />
          {form.validationErrors.title && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.title}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => form.handleChange({
              ...e,
              target: {
                ...e.target,
                type: 'text'
              }
            } as unknown as React.ChangeEvent<HTMLInputElement>)}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Describe tu propiedad con detalle"
          />
          {form.validationErrors.description && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.description}</p>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio por noche ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.formData.price}
            onChange={form.handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="0.00"
          />
          {form.validationErrors.price && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.price}</p>
          )}
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={form.formData.categoryId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => form.handleChange({
              ...e,
              target: {
                ...e.target,
                type: 'text'
              }
            } as unknown as React.ChangeEvent<HTMLInputElement>)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            disabled={loadingCategories}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {form.validationErrors.categoryId && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.categoryId}</p>
          )}
        </div>
      </div>

      {/* Ubicación */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ubicación</h2>

        {/* Dirección */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.formData.address}
            onChange={form.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Ej: Calle Principal 123"
          />
          {form.validationErrors.address && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.address}</p>
          )}
        </div>

        {/* Ciudad */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.formData.city}
            onChange={form.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Ej: Barcelona"
          />
          {form.validationErrors.city && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.city}</p>
          )}
        </div>

        {/* País */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            País
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={form.formData.country}
            onChange={form.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Ej: España"
          />
          {form.validationErrors.country && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.country}</p>
          )}
        </div>

        {/* Ubicación (coordenadas o descripción) */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación (descripción adicional)
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.formData.location}
            onChange={form.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
            placeholder="Ej: A 5 minutos de la playa"
          />
          {form.validationErrors.location && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.location}</p>
          )}
        </div>
      </div>

      {/* Detalles */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Habitaciones */}
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Habitaciones
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={form.formData.bedrooms}
              onChange={form.handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
              placeholder="1"
            />
            {form.validationErrors.bedrooms && (
              <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.bedrooms}</p>
            )}
          </div>

          {/* Baños */}
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Baños
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={form.formData.bathrooms}
              onChange={form.handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
              placeholder="1"
            />
            {form.validationErrors.bathrooms && (
              <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.bathrooms}</p>
            )}
          </div>

          {/* Máximo de huéspedes */}
          <div>
            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">
              Máximo de huéspedes
            </label>
            <input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={form.formData.maxGuests}
              onChange={form.handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vacacional-salvia focus:border-transparent"
              placeholder="1"
            />
            {form.validationErrors.maxGuests && (
              <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.maxGuests}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comodidades */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comodidades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {availableAmenities.map((amenity) => {
            const isChecked = (form.formData.amenities || []).includes(amenity.id);
            return (
              <div key={amenity.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity.id}`}
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity.id)}
                  className="h-4 w-4 text-vacacional-salvia rounded border-gray-300 focus:ring-vacacional-salvia/30"
                />
                <label
                  htmlFor={`amenity-${amenity.id}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {amenity.name}
                </label>
              </div>
            );
          })}
        </div>

        {form.validationErrors.amenities && (
          <p className="mt-3 text-sm text-vacacional-rojo">{form.validationErrors.amenities}</p>
        )}
      </div>

      {/* Imágenes */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Imágenes</h2>

        {/* Uploader */}
        <div className="mb-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <span className="text-sm font-medium text-vacacional-salvia">
                {uploadingImages ? 'Subiendo imágenes...' : 'Sube tus imágenes'}
              </span>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hasta 10MB</p>
            </div>
          </div>

          {form.validationErrors.images && (
            <p className="mt-1 text-sm text-vacacional-rojo">{form.validationErrors.images}</p>
          )}
        </div>

        {/* Vista previa de imágenes */}
        {(form.formData.images || []).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {(form.formData.images || []).map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Eliminar imagen"
                >
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error general */}
      {form.error && (
        <div className="bg-vacacional-rojo/10 border border-vacacional-rojo/20 text-vacacional-rojo rounded-lg p-4">
          {form.error}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia/30"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={form.isLoading}
          className="px-6 py-2 bg-vacacional-salvia text-white rounded-lg hover:bg-vacacional-salvia/90 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {form.isLoading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear propiedad'}
        </button>
      </div>
    </form>
  );
}
