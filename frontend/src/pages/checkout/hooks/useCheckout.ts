import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'src/context/CartContext';
import { useAuth } from 'src/context/AuthContext';
import type { ShippingInfo } from '../interfaces';
import type { PaymentInfo } from '../interfaces';

export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

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

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const tax = totalPrice * 0.1;
  const shipping = totalPrice >= 50 ? 0 : 10;
  const total = totalPrice + tax + shipping;

  const handleShippingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const handlePaymentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let formattedValue = value;

      if (name === 'cardNumber') {
        formattedValue = value
          .replace(/\s/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim();
      }
      if (name === 'expiryDate') {
        formattedValue = value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .substr(0, 5);
      }
      if (name === 'cvv') {
        formattedValue = value.replace(/\D/g, '').substr(0, 4);
      }

      setPaymentInfo((prev) => ({ ...prev, [name]: formattedValue }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!shippingInfo.fullName.trim())
      newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email.trim() || !/\S+@\S+\.\S+/.test(shippingInfo.email))
      newErrors.email = 'Valid email is required';
    if (!shippingInfo.phone.trim())
      newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim())
      newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    if (paymentMethod === 'paypal') return true;
    const newErrors: Record<string, string> = {};
    if (!paymentInfo.cardNumber.replace(/\s/g, '').match(/^\d{16}$/))
      newErrors.cardNumber = 'Valid 16-digit card number required';
    if (!paymentInfo.cardName.trim())
      newErrors.cardName = 'Cardholder name is required';
    if (!paymentInfo.expiryDate.match(/^\d{2}\/\d{2}$/))
      newErrors.expiryDate = 'Valid expiry date required (MM/YY)';
    if (!paymentInfo.cvv.match(/^\d{3,4}$/))
      newErrors.cvv = 'Valid CVV required';
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateShipping() || !validatePayment()) return;

    setIsProcessing(true);
    setTimeout(() => {
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

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem(
        'orders',
        JSON.stringify([...existingOrders, order])
      );
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    }, 2000);
  };

  return {
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
  };
};
