export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: 'processing' | 'shipped' | 'delivered';
}

export interface OrderListProps {
  orders: Order[];
}
