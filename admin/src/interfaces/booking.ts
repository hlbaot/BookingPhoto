
export interface Booking {
  formBookingId: number;
  packageId: number;
  email: string;
  bookTime: string;
  location: string;
  pricePackage: number;
  packageName: string;
  status?: boolean;
  message?: string;    
}