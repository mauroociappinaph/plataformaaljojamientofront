'use client';

import { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importamos la localización en español
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '@/components/ui/Button/Button';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuramos el localizador de momentjs para react-big-calendar
moment.locale('es');
const localizer = momentLocalizer(moment);

// Interfaces
interface Booking {
  id: string;
  title: string;
  start: Date;
  end: Date;
  propertyId?: string;
  propertyName?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  color?: string;
}

// Componente
export default function BookingCalendar() {
  // Estado para almacenar las reservas
  const [bookings] = useState<Booking[]>([
    // Datos de ejemplo para visualización
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
  ]);

  // Estado para la vista actual del calendario
  const [view, setView] = useState<View | string>('month');

  // Estado para la fecha actual del calendario
  const [date, setDate] = useState(new Date());

  // Personalización de eventos en el calendario
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

  // Componente para mostrar cuando se hace clic en un evento
  const eventInfo = useCallback((event: Booking) => {
    alert(`
      Reserva: ${event.title}
      Propiedad: ${event.propertyName}
      Fecha inicio: ${format(event.start, 'dd/MM/yyyy')}
      Fecha fin: ${format(event.end, 'dd/MM/yyyy')}
      Estado: ${event.status}
    `);
  }, []);

  // Función para cambiar de vista
  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  // Función para navegar a hoy
  const handleToday = () => {
    setDate(new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Calendario de Reservas</h2>

      {/* Toolbar personalizada */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            onClick={handleToday}
            className="text-sm"
          >
            Hoy
          </Button>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => {
                const newDate = new Date(date);
                newDate.setMonth(date.getMonth() - 1);
                setDate(newDate);
              }}
            >
              &lt;
            </Button>
            <span className="text-sm font-medium">
              {format(date, 'MMMM yyyy', { locale: es })}
            </span>
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => {
                const newDate = new Date(date);
                newDate.setMonth(date.getMonth() + 1);
                setDate(newDate);
              }}
            >
              &gt;
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={view as string}
            onChange={(e) => handleViewChange(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="month">Mes</option>
            <option value="week">Semana</option>
            <option value="day">Día</option>
          </select>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center mb-6 text-sm">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
          <span>Confirmadas</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-[#FFC107] mr-2"></div>
          <span>Pendientes</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#F44336] mr-2"></div>
          <span>Canceladas</span>
        </div>
      </div>

      {/* Calendario */}
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          view={view as View}
          date={date}
          onNavigate={setDate}
          onView={(view) => setView(view)}
          eventPropGetter={eventPropGetter}
          onSelectEvent={eventInfo}
          popup
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            allDay: "Todo el día",
            showMore: (total) => `+ Ver ${total} más`,
            noEventsInRange: "No hay reservas en este período"
          }}
          className="bg-white"
        />
      </div>
    </div>
  );
}
