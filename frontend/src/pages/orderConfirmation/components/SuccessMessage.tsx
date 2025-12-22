import React from 'react';
import { CheckCircle } from 'lucide-react';

import type { SuccessMessageProps } from '../interfaces';

const SuccessMessage: React.FC<SuccessMessageProps> = ({ orderId }) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Order Confirmed!
      </h1>
      <p className="mb-4 text-gray-600">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
        <span className="text-sm text-gray-600">Order ID:</span>
        <span className="text-sm font-bold text-gray-900">{orderId}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
