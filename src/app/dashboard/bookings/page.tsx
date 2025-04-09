'use client';

import BookingCalendar from "@/components/dashboard/BookingCalendar";
import { Building2, Calendar, MapPin } from "lucide-react";

export default function BookingsPage() {
  // Para fines de demostración, mostramos algunas reservas recientes
  const upcomingBookings = [
    {
      id: "1",
      property: "Apartamento Céntrico en Barcelona",
      location: "Barcelona, España",
      checkIn: "15 Jun 2024",
      checkOut: "20 Jun 2024",
      status: "confirmed",
      imageUrl: "/images/properties/apartment-barcelona.jpg"
    },
    {
      id: "2",
      property: "Casa Rural con Vistas a la Montaña",
      location: "Asturias, España",
      checkIn: "10 Jun 2024",
      checkOut: "15 Jun 2024",
      status: "pending",
      imageUrl: "/images/properties/rural-house.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado de la página */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">Mis Reservas</h1>
        <p className="text-gray-600">Gestiona tus próximos viajes y revisa tu historial de reservas</p>
      </div>

      {/* Próximas reservas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Próximas Reservas</h2>

        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div
              key={booking.id}
              className={`border rounded-lg overflow-hidden ${
                booking.status === 'confirmed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Imagen (podría no mostrarse en móviles) */}
                <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-200 relative hidden md:block">
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-gray-400" />
                  </div>
                </div>

                {/* Detalles */}
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-semibold text-lg mb-1 md:mb-0">{booking.property}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Check-in: {booking.checkIn}</span>
                      <span className="mx-2">|</span>
                      <span>Check-out: {booking.checkOut}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="bg-vacacional-salvia text-white px-4 py-2 rounded-md text-sm hover:bg-vacacional-salvia/90 transition-colors">
                      Ver detalles
                    </button>
                    {booking.status === 'confirmed' && (
                      <button className="border border-red-300 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-50 transition-colors">
                        Cancelar reserva
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendario de reservas */}
      <BookingCalendar />

      {/* Historial de reservas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Historial de Reservas</h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propiedad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fechas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Villa de Lujo en Marbella</div>
                    <div className="text-sm text-gray-500">Marbella, España</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">25 Mar 2024 - 30 Mar 2024</div>
                    <div className="text-sm text-gray-500">5 noches</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completada
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    €1,250
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-vacacional-salvia hover:text-vacacional-salvia/80">Ver detalles</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Apartamento en Madrid</div>
                    <div className="text-sm text-gray-500">Madrid, España</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">10 Feb 2024 - 15 Feb 2024</div>
                    <div className="text-sm text-gray-500">5 noches</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completada
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    €780
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-vacacional-salvia hover:text-vacacional-salvia/80">Ver detalles</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
