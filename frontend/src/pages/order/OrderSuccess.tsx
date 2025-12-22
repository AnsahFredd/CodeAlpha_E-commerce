import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
  }>;
  status?: string; // Adding optional status
}

const OrdersPage = () => {
  const [orders] = useState<Order[]>(() => {
    // Load orders from localStorage
    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );
    // Sort by date new to old
    return [...storedOrders].sort(
      (a: Order, b: Order) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
            <div
              key={order.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Order Header */}
              <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {order.id}
                    </h3>
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Processing
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="p-2 text-gray-400 transition hover:text-indigo-600"
                    title="View Details"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {order.items.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                      title={item.name}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute right-0 bottom-0 rounded-tl-md bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                        x{item.quantity}
                      </div>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
