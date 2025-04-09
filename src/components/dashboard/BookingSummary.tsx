'use client';

import { useBookingStore } from '@/store/booking.store';

/**
 * Componente que muestra un resumen de las reservas
 * Ejemplo de cómo acceder al store desde cualquier componente sin prop drilling
 */
export default function BookingSummary() {
  // Accedemos directamente al store
  const bookings = useBookingStore(state => state.bookings);

  // Calculamos estadísticas
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resumen de Reservas</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-bold">{totalBookings}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-md">
          <div className="text-sm text-green-600">Confirmadas</div>
          <div className="text-2xl font-bold text-green-700">{confirmedBookings}</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md">
          <div className="text-sm text-yellow-600">Pendientes</div>
          <div className="text-2xl font-bold text-yellow-700">{pendingBookings}</div>
        </div>

        <div className="bg-red-50 p-4 rounded-md">
          <div className="text-sm text-red-600">Canceladas</div>
          <div className="text-2xl font-bold text-red-700">{cancelledBookings}</div>
        </div>
      </div>
    </div>
  );
}
