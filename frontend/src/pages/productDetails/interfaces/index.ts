import type { Product } from 'src/types/cart';

export interface ProductDetailsProps {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  showSuccess: boolean;
}
