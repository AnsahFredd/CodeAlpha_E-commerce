import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import type { WishlistItemProps } from '../interfaces';

const WishlistItem: React.FC<WishlistItemProps> = ({
  product,
  inCart,
  onRemove,
  onAddToCart,
}) => {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-3 right-3 rounded-full bg-white p-2 text-gray-400 shadow-md transition-colors hover:text-red-500"
          title="Remove from wishlist"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-500">{product.category}</p>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(product, 1)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              inCart
                ? 'bg-green-100 text-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
