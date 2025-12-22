import { Link } from 'react-router-dom';
import { useCart } from 'src/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const CartPage = () => {
  // Get cart state and functions from context
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleIncrease = (
    itemId: string,
    currentQuantity: number,
    stock: number
  ) => {
    if (currentQuantity < stock) {
      updateQuantity(itemId, currentQuantity + 1);
    }
  };

  const handleDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-6 text-gray-600">
            Add some products to get started!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Browse Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <CartSummary totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
