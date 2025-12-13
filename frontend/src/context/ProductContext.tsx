import { createContext, useContext } from 'react';
import type { Product } from '../types/cart';

/**
 * Product Context Type Definition
 * Defines all functions and state for managing products
 */
export interface ProductContextType {
  // All available products
  products: Product[];

  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // Product operations
  getProductById: (id: string) => Product | undefined; // Find a specific product
  getProductsByCategory: (category: string) => Product[]; // Filter by category
  searchProducts: (query: string) => Product[]; // Search products by name/description
  getAllCategories: () => string[]; // Get list of all unique categories
}

/**
 * Create the Product Context
 * This will be used by ProductProvider to share product data across the app
 */
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

/**
 * Custom hook to use the Product Context
 * Ensures the context is used within a ProductProvider
 *
 * Usage: const { products, getProductById } = useProducts();
 */
export const useProducts = () => {
  const context = useContext(ProductContext);

  // Throw error if hook is used outside of ProductProvider
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};
