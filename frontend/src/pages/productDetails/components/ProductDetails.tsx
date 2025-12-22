import React from 'react';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import type { ProductDetailsProps } from '../interfaces';

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onAddToCart,
  isInWishlist,
  onToggleWishlist,
  showSuccess,
}) => {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium tracking-wider text-indigo-600 uppercase">
            {product.category}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {product.name}
        </h1>

        <div className="mb-6 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <Star className="h-5 w-5 text-gray-300" />
          </div>
          <span className="text-sm text-gray-600">(542 reviews)</span>
        </div>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="mb-6 leading-relaxed text-gray-600 italic">
          "{product.description}"
        </p>

        <div className="mb-6 flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <span
            className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="h-10 w-16 rounded-lg border-2 border-gray-300 text-center font-semibold focus:outline-none"
            />
            <button
              onClick={onIncrease}
              disabled={quantity >= product.stock}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-indigo-600 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={onAddToCart}
            disabled={product.stock === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
          <button
            onClick={onToggleWishlist}
            className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 transition-all ${
              isInWishlist
                ? 'border-red-500 bg-red-50 text-red-500 shadow-sm'
                : 'border-gray-300 hover:border-red-500 hover:text-red-500'
            }`}
            aria-label={
              isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
            }
          >
            <Heart
              className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`}
            />
          </button>
          <button className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-300 transition-all hover:border-indigo-600 hover:text-indigo-600">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {showSuccess && (
          <div className="animate-fade-in mb-6 rounded-lg border border-green-200 bg-green-50 p-4 transition-all">
            <p className="font-medium text-green-800">
              ✓ Added to cart successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
