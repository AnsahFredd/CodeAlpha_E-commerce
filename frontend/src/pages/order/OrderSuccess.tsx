import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useOrders } from './hooks/useOrders';
import OrderItemPreview from './components/OrderItemPreview';

const OrdersPage = () => {
  const { orders, formatDate } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            No orders yet
          </h2>
          <p className="mb-6 text-gray-600">
            Start shopping to see your orders here
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <OrderItemPreview
              key={order.id}
              order={order}
              formatDate={formatDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
