import { useState } from 'react';
import { Booking, BookingStatus, PaymentStatus } from '@/types/booking.types';
import * as bookingService from '@/lib/api/booking';

/**
 * Hook para gestionar las operaciones de reservas
 */
export const useBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las reservas
   */
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las reservas');
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene las reservas del usuario actual
   */
  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getUserBookings();
      setBookings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener tus reservas');
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene las reservas de una propiedad específica
   */
  const fetchPropertyBookings = async (propertyId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getPropertyBookings(propertyId);
      setBookings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las reservas de la propiedad');
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene una reserva por su ID
   */
  const fetchBookingById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getBookingById(id);
      if (data) {
        setCurrentBooking(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener la reserva');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea una nueva reserva
   */
  const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.createBooking(booking);
      if (data) {
        setCurrentBooking(data);
        await fetchBookings(); // Refresca la lista después de crear
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la reserva');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza una reserva existente
   */
  const updateBooking = async (id: string, booking: Partial<Booking>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.updateBooking(id, booking);
      if (data) {
        setCurrentBooking(data);
        // Actualiza la lista de reservas
        setBookings(prev => prev.map(b => b.id === id ? data : b));
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la reserva');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza el estado de una reserva
   */
  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.updateBookingStatus(id, status);
      if (data) {
        setCurrentBooking(data);
        // Actualiza la lista de reservas
        setBookings(prev => prev.map(b => b.id === id ? data : b));
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de la reserva');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza el estado de pago de una reserva
   */
  const updateBookingPayment = async (id: string, paymentStatus: PaymentStatus) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.updateBookingPayment(id, paymentStatus);
      if (data) {
        setCurrentBooking(data);
        // Actualiza la lista de reservas
        setBookings(prev => prev.map(b => b.id === id ? data : b));
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de pago');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina una reserva
   */
  const deleteBooking = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await bookingService.deleteBooking(id);
      if (success) {
        // Elimina la reserva de la lista
        setBookings(prev => prev.filter(b => b.id !== id));

        // Si se está viendo la reserva eliminada, limpiar el state
        if (currentBooking?.id === id) {
          setCurrentBooking(null);
        }
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la reserva');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Retorna todas las funciones y estado
  return {
    // Estado
    bookings,
    currentBooking,
    loading,
    error,

    // Acciones
    fetchBookings,
    fetchUserBookings,
    fetchPropertyBookings,
    fetchBookingById,
    createBooking,
    updateBooking,
    updateBookingStatus,
    updateBookingPayment,
    deleteBooking
  };
};
