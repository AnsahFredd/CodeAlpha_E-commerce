import React from 'react';
import { Truck, CreditCard } from 'lucide-react';
import type { OrderInfoProps } from '../interfaces';

const OrderInfo: React.FC<OrderInfoProps> = ({
  shippingInfo,
  paymentMethod,
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Shipping Information */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Truck className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="font-semibold text-gray-900">{shippingInfo.fullName}</p>
          <p>{shippingInfo.address}</p>
          <p>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </p>
          <p>{shippingInfo.country}</p>
          <p className="pt-2">{shippingInfo.email}</p>
          <p>{shippingInfo.phone}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-900 capitalize">
            {paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Payment processed successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
