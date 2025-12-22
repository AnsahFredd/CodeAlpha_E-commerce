import type { CartItem as CartItemType } from 'src/context/CartContext';

export interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: string, quantity: number, stock: number) => void;
  onDecrease: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  totalPrice: number;
}
