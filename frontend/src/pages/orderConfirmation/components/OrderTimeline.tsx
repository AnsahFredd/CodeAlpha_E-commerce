import React from 'react';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';

import type { OrderTimelineProps } from '../interfaces';

const OrderTimeline: React.FC<OrderTimelineProps> = ({
  orderDate,
  formatDate,
  getEstimatedDelivery,
}) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Order Status</h2>
      <div className="flex items-center justify-between">
        {/* Order Placed */}
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-xs font-semibold text-gray-900 sm:text-sm">
            Order Placed
          </p>
          <p className="text-xs text-gray-500">{formatDate(orderDate)}</p>
        </div>

        {/* Divider */}
        <div className="mx-2 h-0.5 flex-1 bg-gray-200"></div>

        {/* Processing */}
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <Package className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-xs font-semibold text-gray-900 sm:text-sm">
            Processing
          </p>
          <p className="text-xs text-gray-500">1-2 days</p>
        </div>

        {/* Divider */}
        <div className="mx-2 h-0.5 flex-1 bg-gray-200"></div>

        {/* Shipped */}
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Truck className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-xs font-semibold text-gray-500 sm:text-sm">
            Shipped
          </p>
          <p className="text-xs text-gray-400">Pending</p>
        </div>

        {/* Divider */}
        <div className="mx-2 h-0.5 flex-1 bg-gray-200"></div>

        {/* Delivered */}
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <MapPin className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-xs font-semibold text-gray-500 sm:text-sm">
            Delivered
          </p>
          <p className="text-xs text-gray-400">
            {getEstimatedDelivery(orderDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
