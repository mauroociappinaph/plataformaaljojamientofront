/**
 * Tipos para las reservas (bookings)
 */

/**
 * Estado de la reserva
 */
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT'
}

/**
 * Estado del pago
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

/**
 * Información de una reserva
 */
export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string | Date;
  endDate: string | Date;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  paymentId?: string;
  paymentStatus: PaymentStatus;
}
