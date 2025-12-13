/**
 * Checkout Page Component
 * Multi-step checkout with shipping info, payment, and order summary
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'src/context/CartContext';
import { useAuth } from 'src/context/AuthContext';
import { CreditCard, Truck, Lock, ShoppingBag } from 'lucide-react';
import ErrorMessage from 'src/components/common/ErrorMessage';
import Button from 'src/components/common/Button';

/**
 * Shipping information interface
 */
interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Payment information interface
 */
interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Loading state
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Calculate tax (10%)
   */
  const tax = totalPrice * 0.1;

  /**
   * Calculate shipping (free over $50)
   */
  const shipping = totalPrice >= 50 ? 0 : 10;

  /**
   * Calculate total
   */
  const total = totalPrice + tax + shipping;

  /**
   * Handle shipping info change
   */
  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Handle payment info change
   */
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    }

    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substr(0, 5);
    }

    // Format CVV (3-4 digits only)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setPaymentInfo((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validate shipping form
   */
  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (
      !shippingInfo.email.trim() ||
      !/\S+@\S+\.\S+/.test(shippingInfo.email)
    ) {
      newErrors.email = 'Valid email is required';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!shippingInfo.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!shippingInfo.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate payment form
   */
  const validatePayment = (): boolean => {
    if (paymentMethod === 'paypal') return true;

    const newErrors: Record<string, string> = {};

    if (!paymentInfo.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Valid 16-digit card number required';
    }
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    if (!paymentInfo.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Valid expiry date required (MM/YY)';
    }
    if (!paymentInfo.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Valid CVV required';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle place order
   */
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate forms
    const isShippingValid = validateShipping();
    const isPaymentValid = validatePayment();

    if (!isShippingValid || !isPaymentValid) {
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        shippingInfo,
        paymentMethod,
        subtotal: totalPrice,
        tax,
        shipping,
        total,
        date: new Date().toISOString(),
      };

      // Store order in localStorage (temporary - will use backend later)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem(
        'orders',
        JSON.stringify([...existingOrders, order])
      );

      // Clear cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${order.id}`);
    }, 2000);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-6 text-gray-600">
            Add some products before checking out
          </p>
          <Button
            title="Continue Shopping"
            onClick={() => navigate('/products')}
            variant="primary"
            size="md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Forms */}
            <div className="space-y-6 lg:col-span-2">
              {/* Shipping Information */}
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
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <ErrorMessage message={errors.fullName} />
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <ErrorMessage message={errors.email} />}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <ErrorMessage message={errors.phone} />}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && (
                      <ErrorMessage message={errors.address} />
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && <ErrorMessage message={errors.city} />}
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && <ErrorMessage message={errors.state} />}
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <ErrorMessage message={errors.zipCode} />
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
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

              {/* Payment Method */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                {/* Payment Method Selection */}
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
                    <div className="mx-auto mb-2 h-6 w-6 font-bold text-gray-700">
                      PP
                    </div>
                    <p className="text-sm font-medium">PayPal</p>
                  </button>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        maxLength={19}
                        className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                          errors.cardNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <ErrorMessage message={errors.cardNumber} />
                      )}
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.cardName && (
                        <ErrorMessage message={errors.cardName} />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Expiry Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                            errors.expiryDate
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <ErrorMessage message={errors.expiryDate} />
                        )}
                      </div>

                      {/* CVV */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
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

                {/* PayPal Message */}
                {paymentMethod === 'paypal' && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                      You will be redirected to PayPal to complete your
                      purchase.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
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
                  <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  loading={isProcessing}
                  title="Place Order"
                  icon={<Lock className="h-5 w-5" />}
                  variant="primary"
                  size="lg"
                  otherStyles="w-full mt-6"
                />

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
