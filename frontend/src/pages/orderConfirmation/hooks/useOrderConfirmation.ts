import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Order } from '../interfaces';

export const useOrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order] = useState<Order | null>(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find((o: Order) => o.id === orderId) || null;
  });

  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  /**
   * Format date
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Estimated delivery date (7 days from order)
   */
  const getEstimatedDelivery = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return {
    order,
    formatDate,
    getEstimatedDelivery,
  };
};
