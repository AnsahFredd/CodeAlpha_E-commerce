import { type OrderSummaryProps } from '../interfaces';

const OrderSummary = ({
  items,
  totalPrice,
  tax,
  shipping,
  total,
  isProcessing,
}: OrderSummaryProps) => {
  return (
    <div className="sticky top-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>

      {/* Item List */}
      <div className="mb-6 max-h-60 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="mb-4 flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-4 border-t border-gray-100 pt-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'font-medium text-green-600' : ''}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        By placing your order, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );
};

export default OrderSummary;
