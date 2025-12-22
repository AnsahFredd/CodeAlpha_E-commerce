import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { OrderItemPreviewProps } from '../interfaces';

const OrderItemPreview: React.FC<OrderItemPreviewProps> = ({
  order,
  formatDate,
}) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Processing
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Placed on {formatDate(order.date)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-gray-900">
            ${order.total.toFixed(2)}
          </p>
          <Link
            to={`/order-confirmation/${order.id}`}
            className="p-2 text-gray-400 transition hover:text-indigo-600"
            title="View Details"
          >
            <ChevronRight className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-4">
          {order.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
              title={item.name}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-0 bottom-0 rounded-tl-md bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                x{item.quantity}
              </div>
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
              +{order.items.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemPreview;
