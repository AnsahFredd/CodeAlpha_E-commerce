import { Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useOrderConfirmation } from './hooks/useOrderConfirmation';
import SuccessMessage from './components/SuccessMessage';
import OrderTimeline from './components/OrderTimeline';
import OrderInfo from './components/OrderInfo';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';

const OrderConfirmationPage = () => {
  const { order, formatDate, getEstimatedDelivery } = useOrderConfirmation();

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
        <SuccessMessage orderId={order.id} />

        {/* Order Timeline */}
        <OrderTimeline
          orderDate={order.date}
          formatDate={formatDate}
          getEstimatedDelivery={getEstimatedDelivery}
        />

        {/* Shipping and Payment Info */}
        <OrderInfo
          shippingInfo={order.shippingInfo}
          paymentMethod={order.paymentMethod}
        />

        {/* Order Items Section */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <OrderItems items={order.items} />

          {/* Order Summary Breakdown */}
          <OrderSummary
            subtotal={order.subtotal}
            shipping={order.shipping}
            tax={order.tax}
            total={order.total}
          />
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
