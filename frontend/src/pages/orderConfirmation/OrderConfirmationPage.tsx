/**
 * Order Confirmation Page
 * Displays order success message and order details
 */

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download,
  ArrowLeft,
} from 'lucide-react';

/**
 * Order interface
 */
interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  date: string;
}

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order] = useState<Order | null>(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find((o: Order) => o.id === orderId) || null;
  });

  /**
   * Load order from localStorage
   */
  useEffect(() => {
    if (!order) {
      // Redirect to home if order not found
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  /**
   * Format date
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Estimated delivery date (7 days from order)
   */
  const getEstimatedDelivery = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mb-4 text-gray-600">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <span className="text-sm text-gray-600">Order ID:</span>
            <span className="text-sm font-bold text-gray-900">{order.id}</span>
          </div>
        </div>

        {/* Order Timeline */}
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
              <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
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
                {getEstimatedDelivery(order.date)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Shipping Information */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Shipping Address
              </h2>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">
                {order.shippingInfo.fullName}
              </p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.state}{' '}
                {order.shippingInfo.zipCode}
              </p>
              <p>{order.shippingInfo.country}</p>
              <p className="pt-2">{order.shippingInfo.email}</p>
              <p>{order.shippingInfo.phone}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Payment Method
              </h2>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900 capitalize">
                {order.paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Payment processed successfully
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
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
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={order.shipping === 0 ? 'text-green-600' : ''}>
                {order.shipping === 0
                  ? 'FREE'
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            <Download className="h-5 w-5" />
            Download Receipt
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
          <p className="text-sm text-blue-800">
            Need help with your order?{' '}
            <Link to="/contact" className="font-semibold underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
