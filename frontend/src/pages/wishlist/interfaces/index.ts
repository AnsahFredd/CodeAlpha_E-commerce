import type { Product } from 'src/context/CartContext';

export interface WishlistItemProps {
  product: Product;
  inCart: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}
