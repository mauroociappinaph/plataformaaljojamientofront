'use client';

import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importamos la localización en español
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '@/components/ui/Button/Button';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useBookingCalendar } from '@/hooks/booking/useBookingCalendar';

// Configuramos el localizador de momentjs para react-big-calendar
moment.locale('es');
const localizer = momentLocalizer(moment);

// Componente
export default function BookingCalendar() {
  // Usamos el hook personalizado para manejar toda la lógica
  const {
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
  } = useBookingCalendar();

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
              onClick={navigateToPreviousMonth}
            >
              &lt;
            </Button>
            <span className="text-sm font-medium">
              {format(date, 'MMMM yyyy', { locale: es })}
            </span>
            <Button
              variant="ghost"
              className="p-2"
              onClick={navigateToNextMonth}
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
          onView={(view) => handleViewChange(view)}
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
