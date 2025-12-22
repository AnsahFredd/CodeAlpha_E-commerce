import React from 'react';
import type { OrderItemsProps } from '../interfaces';

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-900">Order Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b border-gray-200 pb-4 last:border-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
