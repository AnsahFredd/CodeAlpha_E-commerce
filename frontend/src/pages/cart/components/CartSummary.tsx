import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { type CartSummaryProps } from '../interface';

const CartSummary = ({ totalPrice }: CartSummaryProps) => {
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  return (
    <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>

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
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Proceed to Checkout
        <ArrowRight className="h-5 w-5" />
      </Link>

      <Link
        to="/products"
        className="mt-4 block text-center font-medium text-indigo-600 hover:text-indigo-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
