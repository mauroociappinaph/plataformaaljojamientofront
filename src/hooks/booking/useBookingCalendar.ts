import { useCallback } from 'react';
import { format } from 'date-fns';
import { Booking } from '@/types/bookingCalender.types';
import { useBookingStore } from '@/store/booking.store';

/**
 * Hook personalizado para el calendario de reservas
 * Actúa como una fachada para el store, proporcionando funcionalidades específicas
 * para el componente de calendario
 */
export const useBookingCalendar = () => {
  // Obtenemos el estado y acciones del store de bookings
  const {
    bookings,
    currentView: view,
    currentDate: date,
    setView,
    setDate,
    navigateToPreviousMonth,
    navigateToNextMonth,
    resetToToday
  } = useBookingStore();

  /**
   * Personalización del estilo de los eventos en el calendario
   * según su estado (confirmado, pendiente, cancelado)
   */
  const eventPropGetter = useCallback((event: Booking) => {
    let backgroundColor = '#3174ad';

    if (event.status === 'confirmed') {
      backgroundColor = '#4CAF50'; // Verde para confirmadas
    } else if (event.status === 'pending') {
      backgroundColor = '#FFC107'; // Amarillo para pendientes
    } else if (event.status === 'cancelled') {
      backgroundColor = '#F44336'; // Rojo para canceladas
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  }, []);

  /**
   * Muestra información detallada de una reserva al hacer clic en ella
   */
  const eventInfo = useCallback((event: Booking) => {
    alert(`
      Reserva: ${event.title}
      Propiedad: ${event.propertyName}
      Fecha inicio: ${format(event.start, 'dd/MM/yyyy')}
      Fecha fin: ${format(event.end, 'dd/MM/yyyy')}
      Estado: ${event.status}
    `);
  }, []);

  /**
   * Cambia la vista del calendario (mes, semana, día)
   */
  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  /**
   * Resetea el calendario al día actual
   */
  const handleToday = () => {
    resetToToday();
  };

  // Retornamos los estados y funciones que necesita el componente
  return {
    bookings,
    view,
    date,
    setDate,
    eventPropGetter,
    eventInfo,
    handleViewChange,
    handleToday,
    navigateToPreviousMonth,
    navigateToNextMonth
  };
};
