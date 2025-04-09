export interface Booking {
  id: string;
  title: string;
  start: Date;
  end: Date;
  propertyId?: string;
  propertyName?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  color?: string;
}
