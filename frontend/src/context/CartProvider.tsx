import { useState, useEffect, type ReactNode } from 'react';
import { CartContext } from './CartContext';
import type { CartItem, Product } from '../types/cart';

/**
 * Local Storage Key for persisting cart data
 * This allows the cart to survive page refreshes
 */
const CART_STORAGE_KEY = 'shophub_cart';

/**
 * Props for the CartProvider component
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * CartProvider Component
 * Manages all shopping cart state and operations
 * Persists cart data to localStorage
 */
export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize cart state from localStorage or empty array
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  /**
   * Save cart to localStorage whenever it changes
   * This ensures cart persists across page refreshes
   */
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  /**
   * Calculate total number of items in cart
   * Sums up the quantity of all cart items
   */
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Calculate total price of all items in cart
   * Multiplies each item's price by its quantity and sums them
   */
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /**
   * Add a product to the cart
   * If product already exists, increase its quantity
   * If product is new, add it with the specified quantity
   *
   * @param product - The product to add
   * @param quantity - How many to add (default: 1)
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      // Check if product already exists in cart
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Product exists - increase quantity
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Product is new - add to cart
        return [...currentItems, { ...product, quantity }];
      }
    });
  };

  /**
   * Remove a product completely from the cart
   *
   * @param productId - ID of the product to remove
   */
  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  /**
   * Update the quantity of a specific product in the cart
   * If quantity is 0 or less, remove the item
   *
   * @param productId - ID of the product to update
   * @param quantity - New quantity (if <= 0, item is removed)
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear all items from the cart
   * Useful for post-checkout or "clear cart" functionality
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Check if a product is currently in the cart
   *
   * @param productId - ID of the product to check
   * @returns true if product is in cart, false otherwise
   */
  const isInCart = (productId: string): boolean => {
    return items.some((item) => item.id === productId);
  };

  /**
   * Get the quantity of a specific product in the cart
   *
   * @param productId - ID of the product
   * @returns quantity in cart, or 0 if not in cart
   */
  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Context value that will be provided to all children
  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
