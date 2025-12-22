import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from 'src/components/common/Button';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import { useCheckout } from './hooks/useCheckout';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    shippingInfo,
    paymentInfo,
    paymentMethod,
    setPaymentMethod,
    errors,
    isProcessing,
    totalPrice,
    tax,
    shipping,
    total,
    handleShippingChange,
    handlePaymentChange,
    handlePlaceOrder,
  } = useCheckout();

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
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ShippingForm
                shippingInfo={shippingInfo}
                onShippingChange={handleShippingChange}
                errors={errors}
              />

              <PaymentForm
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paymentInfo={paymentInfo}
                onPaymentChange={handlePaymentChange}
                errors={errors}
              />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                totalPrice={totalPrice}
                tax={tax}
                shipping={shipping}
                total={total}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
