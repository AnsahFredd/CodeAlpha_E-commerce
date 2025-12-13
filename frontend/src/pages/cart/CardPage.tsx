import { Link } from 'react-router-dom';
import { useCart } from 'src/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * Cart Page Component
 * Displays all items in the shopping cart
 * Allows users to update quantities, remove items, and proceed to checkout
 */
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

  /**
   * Handle quantity increase
   * Prevents exceeding available stock
   */
  const handleIncrease = (
    itemId: string,
    currentQuantity: number,
    stock: number
  ) => {
    if (currentQuantity < stock) {
      updateQuantity(itemId, currentQuantity + 1);
    }
  };

  /**
   * Handle quantity decrease
   * Minimum quantity is 1
   */
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
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className="font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items Section */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-sm sm:flex-row"
              >
                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover transition-opacity hover:opacity-75"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1">
                  {/* Product Name and Category */}
                  <Link to={`/product/${item.id}`}>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mb-2 text-sm text-gray-500">{item.category}</p>

                  {/* Price */}
                  <p className="mb-4 text-lg font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {/* Decrease Button */}
                      <button
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      {/* Quantity Display */}
                      <span className="w-12 text-center text-lg font-semibold">
                        {item.quantity}
                      </span>

                      {/* Increase Button */}
                      <button
                        onClick={() =>
                          handleIncrease(item.id, item.quantity, item.stock)
                        }
                        disabled={item.quantity >= item.stock}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                      <span className="text-sm text-amber-600">
                        Max stock reached
                      </span>
                    )}
                  </div>
                </div>

                {/* Item Subtotal and Remove Button */}
                <div className="flex flex-col items-end justify-between">
                  {/* Subtotal */}
                  <p className="text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-red-600 transition-colors hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (estimated)</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* Continue Shopping Link */}
              <Link
                to="/products"
                className="mt-4 block text-center font-medium text-indigo-600 hover:text-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
