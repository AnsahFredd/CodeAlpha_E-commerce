import React from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { OrderListProps } from '../interfaces';

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 py-12 text-center shadow-sm">
        <Package className="mx-auto mb-4 h-16 w-16 text-gray-300 sm:h-24 sm:w-24" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
          No orders yet
        </h3>
        <p className="mb-6 text-sm text-gray-600 sm:text-base">
          Start shopping to see your orders here
        </p>
        <Link
          to="/products"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:text-base"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
        Order History
      </h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-indigo-600 hover:shadow-sm sm:p-6"
          >
            <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(order.date)}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-gray-900">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {order.items.length} item(s)
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex -space-x-3 overflow-hidden py-2">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500 shadow-sm ring-2 ring-white">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/order-confirmation/${order.id}`}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 sm:text-base"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
