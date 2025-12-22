import React from 'react';
import type { OrderSummaryProps } from '../interfaces';

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
}) => {
  return (
    <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span className={shipping === 0 ? 'text-green-600' : ''}>
          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
