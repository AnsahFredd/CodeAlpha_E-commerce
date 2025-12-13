/**
 * Product Details Page - Redesigned to match mockup
 * Features: Large image, detailed info, quantity selector, feature badges, related products
 */

import { useParams, Link } from 'react-router-dom';
import { useProducts } from 'src/context/ProductContext';
import { useCart } from 'src/context/CartContext';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get current product
  const product = id ? getProductById(id) : undefined;

  // Get related products (same category, exclude current)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  /**
   * Handle add to cart with success message
   */
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  /**
   * Increase quantity
   */
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  /**
   * Decrease quantity
   */
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Product Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
                {product.category.toLowerCase()}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
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

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="mb-6 leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-600">
                In Stock
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 transition hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="h-10 w-16 rounded-lg border-2 border-gray-300 text-center font-semibold"
                />
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 transition hover:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                <Heart className="h-6 w-6" />
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-medium text-green-800">
                  ✓ Added to cart successfully!
                </p>
              </div>
            )}

            {/* Feature Badges */}
            <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Truck className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  1 Year Warranty
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <RotateCcw className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  30 Day Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  Related Products
                </h2>
                <p className="text-gray-600">
                  You might also like these products
                </p>
              </div>
              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Related Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => {
                const isOnSale = index === 0;
                return (
                  <div
                    key={relatedProduct.id}
                    className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {isOnSale && (
                        <div className="absolute top-3 left-3 z-10 rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white">
                          SALE
                        </div>
                      )}
                      {/* Quick Action Icons */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                      <Link to={`/product/${relatedProduct.id}`}>
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
                        {relatedProduct.category}
                      </p>
                      <Link to={`/product/${relatedProduct.id}`}>
                        <h3 className="mb-2 line-clamp-1 text-base font-semibold text-gray-900 transition hover:text-indigo-600">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="mb-3 flex items-center gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                        <span className="ml-1 text-xs text-gray-500">
                          (189)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(relatedProduct)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
