import { useState, useEffect, type ReactNode } from 'react';
import { ProductContext } from './ProductContext';
import type { Product } from '../types/cart';
import { mockProducts } from '../data/mockProducts';

/**
 * Props for the ProductProvider component
 */
interface ProductProviderProps {
  children: ReactNode;
}

/**
 * ProductProvider Component
 * Manages all product data and provides search/filter functionality
 *
 * In a real application, this would fetch data from an API
 * For now, we use mock data to demonstrate functionality
 */
export const ProductProvider = ({ children }: ProductProviderProps) => {
  // Product state - in a real app, this would be fetched from an API
  const [products] = useState<Product[]>(mockProducts);

  // Loading state - useful when fetching from API
  const [isLoading] = useState(false);

  // Error state - useful for handling API errors
  const [error] = useState<string | null>(null);

  /**
   * Simulate API call on mount
   * In a real app, you would fetch products here:
   *
   * useEffect(() => {
   *   setIsLoading(true);
   *   fetch('/api/products')
   *     .then(res => res.json())
   *     .then(data => setProducts(data))
   *     .catch(err => setError(err.message))
   *     .finally(() => setIsLoading(false));
   * }, []);
   */
  useEffect(() => {
    // Currently using mock data, so nothing to fetch
    // This is where you'd add your API call
  }, []);

  /**
   * Find a product by its ID
   *
   * @param id - The product ID to search for
   * @returns The product if found, undefined otherwise
   */
  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  /**
   * Get all products in a specific category
   *
   * @param category - The category name to filter by
   * @returns Array of products in that category
   */
  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  };

  /**
   * Search products by name or description
   * Case-insensitive search
   *
   * @param query - The search term
   * @returns Array of matching products
   */
  const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  };

  /**
   * Get all unique categories from products
   * Useful for building category filters
   *
   * @returns Array of unique category names
   */
  const getAllCategories = (): string[] => {
    // Use Set to get unique values
    const categories = new Set(products.map((product) => product.category));
    return Array.from(categories);
  };

  // Context value that will be provided to all children
  const value = {
    products,
    isLoading,
    error,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getAllCategories,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
