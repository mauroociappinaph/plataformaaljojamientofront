import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Booking } from '@/types/bookingCalender.types';
import { View } from 'react-big-calendar';

/**
 * Interfaz que define el estado y las acciones para el store de bookings
 */
interface BookingState {
  // Estado
  bookings: Booking[];
  currentView: View | string;
  currentDate: Date;

  // Acciones simples
  setBookings: (bookings: Booking[]) => void;
  setView: (view: View | string) => void;
  setDate: (date: Date) => void;

  // Acciones complejas
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updatedBooking: Partial<Booking>) => void;
  removeBooking: (id: string) => void;
  navigateToPreviousMonth: () => void;
  navigateToNextMonth: () => void;
  resetToToday: () => void;
}

/**
 * Store para gestionar el estado de las reservas
 * Utiliza Zustand y el middleware persist para mantener el estado en localStorage
 */
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      // Estado inicial
      bookings: [
        // Datos de ejemplo
        {
          id: '1',
          title: 'Apartamento en Barcelona',
          start: new Date(2024, 5, 15),
          end: new Date(2024, 5, 20),
          propertyId: 'prop-1',
          propertyName: 'Apartamento Céntrico en Barcelona',
          status: 'confirmed',
          color: '#4CAF50'
        },
        {
          id: '2',
          title: 'Casa rural en Asturias',
          start: new Date(2024, 5, 10),
          end: new Date(2024, 5, 15),
          propertyId: 'prop-2',
          propertyName: 'Casa Rural con Vistas a la Montaña',
          status: 'pending',
          color: '#FFC107'
        },
        {
          id: '3',
          title: 'Ático en Valencia',
          start: new Date(2024, 5, 25),
          end: new Date(2024, 6, 2),
          propertyId: 'prop-3',
          propertyName: 'Ático con Terraza en Valencia',
          status: 'confirmed',
          color: '#4CAF50'
        }
      ],
      currentView: 'month',
      currentDate: new Date(),

      // Acciones simples
      setBookings: (bookings) => set({ bookings }),
      setView: (view) => set({ currentView: view }),
      setDate: (date) => set({ currentDate: date }),

      // Acciones complejas
      addBooking: (booking) => set((state) => ({
        bookings: [...state.bookings, booking]
      })),

      updateBooking: (id, updatedBooking) => set((state) => ({
        bookings: state.bookings.map(booking =>
          booking.id === id
            ? { ...booking, ...updatedBooking }
            : booking
        )
      })),

      removeBooking: (id) => set((state) => ({
        bookings: state.bookings.filter(booking => booking.id !== id)
      })),

      navigateToPreviousMonth: () => set((state) => {
        const newDate = new Date(state.currentDate);
        newDate.setMonth(state.currentDate.getMonth() - 1);
        return { currentDate: newDate };
      }),

      navigateToNextMonth: () => set((state) => {
        const newDate = new Date(state.currentDate);
        newDate.setMonth(state.currentDate.getMonth() + 1);
        return { currentDate: newDate };
      }),

      resetToToday: () => set({ currentDate: new Date() })
    }),
    {
      name: 'booking-storage', // Nombre usado en localStorage
      storage: createJSONStorage(() => localStorage), // Usar localStorage
      partialize: (state) => ({
        // Solo persistimos estos valores
        bookings: state.bookings,
        currentView: state.currentView
        // No persistimos currentDate para que siempre comience en la fecha actual
      }),
    }
  )
);
