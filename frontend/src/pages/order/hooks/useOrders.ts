import { useState } from 'react';
import type { Order } from '../interfaces';

export const useOrders = () => {
  const [orders] = useState<Order[]>(() => {
    // Load orders from localStorage
    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );
    // Sort by date new to old
    return [...storedOrders].sort(
      (a: Order, b: Order) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return {
    orders,
    formatDate,
  };
};
