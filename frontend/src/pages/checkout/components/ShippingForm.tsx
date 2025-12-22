import React from 'react';
import { Truck } from 'lucide-react';
import ErrorMessage from 'src/components/common/ErrorMessage';

import { type ShippingInfo } from '../interfaces';

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onShippingChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: Record<string, string>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  onShippingChange,
  errors,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
          <Truck className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Shipping Information
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <ErrorMessage message={errors.fullName} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={shippingInfo.phone}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <ErrorMessage message={errors.phone} />}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main Street, Apt 4B"
          />
          {errors.address && <ErrorMessage message={errors.address} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="New York"
          />
          {errors.city && <ErrorMessage message={errors.city} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="NY"
          />
          {errors.state && <ErrorMessage message={errors.state} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={onShippingChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10001"
          />
          {errors.zipCode && <ErrorMessage message={errors.zipCode} />}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Country *
          </label>
          <select
            name="country"
            value={shippingInfo.country}
            onChange={onShippingChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
