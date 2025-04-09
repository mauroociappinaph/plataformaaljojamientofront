import { http } from '@/lib/http';
import { BOOKINGS_ENDPOINT } from '@/constants/routes';
import { Booking, BookingStatus, PaymentStatus } from '@/types/booking.types';

// Crear un helper para construir la URL de detalle
const BOOKING_DETAIL = (id: string) => `${BOOKINGS_ENDPOINT}/${id}`;
const BOOKING_STATUS = (id: string) => `${BOOKINGS_ENDPOINT}/${id}/status`;
const BOOKING_PAYMENT = (id: string) => `${BOOKINGS_ENDPOINT}/${id}/payment`;

export const getBookings = async (): Promise<Booking[]> => {
  const response = await http.get<Booking[]>(BOOKINGS_ENDPOINT);
  return response.data || [];
};

export const getBookingById = async (id: string): Promise<Booking | null> => {
  const response = await http.get<Booking>(BOOKING_DETAIL(id));
  return response.data;
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking | null> => {
  const response = await http.post<Booking>(BOOKINGS_ENDPOINT, booking);
  return response.data;
};

export const updateBooking = async (id: string, booking: Partial<Booking>): Promise<Booking | null> => {
  const response = await http.patch<Booking>(BOOKING_DETAIL(id), booking);
  return response.data;
};

export const updateBookingStatus = async (id: string, status: BookingStatus): Promise<Booking | null> => {
  const response = await http.patch<Booking>(BOOKING_STATUS(id), { status });
  return response.data;
};

export const updateBookingPayment = async (id: string, paymentStatus: PaymentStatus): Promise<Booking | null> => {
  const response = await http.patch<Booking>(BOOKING_PAYMENT(id), { paymentStatus });
  return response.data;
};

export const deleteBooking = async (id: string): Promise<boolean> => {
  const response = await http.delete(BOOKING_DETAIL(id));
  return response.status >= 200 && response.status < 300;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const response = await http.get<Booking[]>(`${BOOKINGS_ENDPOINT}/user`);
  return response.data || [];
};

export const getPropertyBookings = async (propertyId: string): Promise<Booking[]> => {
  const response = await http.get<Booking[]>(`${BOOKINGS_ENDPOINT}/property/${propertyId}`);
  return response.data || [];
};
