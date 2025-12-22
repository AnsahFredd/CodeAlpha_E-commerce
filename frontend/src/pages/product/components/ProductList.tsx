import React from 'react';
import ProductCard from 'src/components/products/ProductCard';
import type { ProductListProps } from '../interfaces';

const ProductList: React.FC<ProductListProps> = ({
  products,
  isInCart,
  getItemQuantity,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onClearFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">
          No products found matching your criteria
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 font-medium text-indigo-600 hover:text-indigo-700"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          inCart={isInCart(product.id)}
          quantity={getItemQuantity(product.id)}
          isInWishlist={isInWishlist(product.id)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};

export default ProductList;
