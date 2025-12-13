import { createContext, useContext } from 'react';
import type { CartItem, Product } from '../types/cart';

/**
 * Cart Context Type Definition
 * Defines all the functions and state available to components using the cart
 */
export interface CartContextType {
  // Current cart state
  items: CartItem[]; // All items currently in the cart
  totalItems: number; // Total number of items (sum of quantities)
  totalPrice: number; // Total price of all items

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void; // Add item to cart
  removeFromCart: (productId: string) => void; // Remove item completely
  updateQuantity: (productId: string, quantity: number) => void; // Change item quantity
  clearCart: () => void; // Empty the entire cart
  isInCart: (productId: string) => boolean; // Check if product is in cart
  getItemQuantity: (productId: string) => number; // Get quantity of specific item
}

/**
 * Create the Cart Context
 * This will be used by the CartProvider to share cart state across the app
 */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/**
 * Custom hook to use the Cart Context
 * This hook ensures the context is used within a CartProvider
 *
 * Usage: const { addToCart, items, totalPrice } = useCart();
 */
export const useCart = () => {
  const context = useContext(CartContext);

  // Throw error if hook is used outside of CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
