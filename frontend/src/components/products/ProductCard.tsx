import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types/cart';

interface ProductCardProps {
  product: Product;
  inCart: boolean;
  quantity: number;
  isInWishlist: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  inCart,
  quantity,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
}) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2 right-2 rounded-full bg-white/90 p-2 shadow-sm transition-all hover:bg-white hover:shadow-md ${
            isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 inline-block self-start rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <p className="mb-3 line-clamp-2 flex-1 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${
            product.stock === 0
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : inCart
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          {product.stock === 0
            ? 'Out of Stock'
            : inCart
              ? `In Cart (${quantity})`
              : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
