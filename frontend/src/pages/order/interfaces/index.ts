export interface Order {
  id: string;
  date: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
  }>;
  status?: string;
}

export interface OrderItemPreviewProps {
  order: Order;
  formatDate: (date: string) => string;
}
