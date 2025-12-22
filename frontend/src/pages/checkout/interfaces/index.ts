import type { CartItem } from 'src/context/CartContext';

export interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  tax: number;
  shipping: number;
  total: number;
  isProcessing: boolean;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
