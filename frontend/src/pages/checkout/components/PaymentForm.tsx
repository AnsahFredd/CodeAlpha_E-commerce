import React from 'react';
import { CreditCard } from 'lucide-react';
import ErrorMessage from 'src/components/common/ErrorMessage';

import { type PaymentInfo } from '../interfaces';

interface PaymentFormProps {
  paymentMethod: 'card' | 'paypal';
  setPaymentMethod: (method: 'card' | 'paypal') => void;
  paymentInfo: PaymentInfo;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  paymentInfo,
  onPaymentChange,
  errors,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
          <CreditCard className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`rounded-lg border-2 p-4 transition ${
            paymentMethod === 'card'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-600'
          }`}
        >
          <CreditCard className="mx-auto mb-2 h-6 w-6 text-gray-700" />
          <p className="text-sm font-medium">Credit Card</p>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('paypal')}
          className={`rounded-lg border-2 p-4 transition ${
            paymentMethod === 'paypal'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-600'
          }`}
        >
          <div className="mx-auto mb-2 h-6 w-6 text-center font-bold text-gray-700">
            PP
          </div>
          <p className="text-sm font-medium">PayPal</p>
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={onPaymentChange}
              maxLength={19}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <ErrorMessage message={errors.cardNumber} />}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardName"
              value={paymentInfo.cardName}
              onChange={onPaymentChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardName && <ErrorMessage message={errors.cardName} />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={onPaymentChange}
                className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <ErrorMessage message={errors.expiryDate} />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={onPaymentChange}
                className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
              />
              {errors.cvv && <ErrorMessage message={errors.cvv} />}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            You will be redirected to PayPal to complete your purchase.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
