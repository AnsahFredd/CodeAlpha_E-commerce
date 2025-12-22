export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  date: string;
}
export interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderInfoProps {
  shippingInfo: Order['shippingInfo'];
  paymentMethod: string;
}

export interface OrderItemsProps {
  items: Order['items'];
}

export interface OrderTimelineProps {
  orderDate: string;
  formatDate: (date: string) => string;
  getEstimatedDelivery: (date: string) => string;
}

export interface SuccessMessageProps {
  orderId: string;
}
