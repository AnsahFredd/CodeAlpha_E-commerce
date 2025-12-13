import { useState } from 'react';
import { useProducts } from 'src/context/ProductContext';
import { useCart } from 'src/context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import type { Product } from 'src/types/cart';

/**
 * Products Page Component
 * Displays all products with search and category filtering
 * Allows users to add products to cart
 */
const Products = () => {
  // Get products and search/filter functions from context
  const { products, searchProducts, getProductsByCategory, getAllCategories } =
    useProducts();

  // Get cart functions
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Local state for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  /**
   * Get filtered products based on search and category
   * Priority: search query > category filter > all products
   */
  const getFilteredProducts = () => {
    // If there's a search query, use search results
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }

    // If a category is selected (not "All"), filter by category
    if (selectedCategory !== 'All') {
      return getProductsByCategory(selectedCategory);
    }

    // Otherwise, return all products
    return products;
  };

  const filteredProducts = getFilteredProducts();
  const categories = ['All', ...getAllCategories()];

  /**
   * Handle adding product to cart
   * Shows feedback by checking if item is in cart
   */
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of quality products
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 rounded-lg bg-white p-4 shadow-sm sm:p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const inCart = isInCart(product.id);
              const quantity = getItemQuantity(product.id);

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category Badge */}
                    <span className="mb-2 inline-block rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                      {product.category}
                    </span>

                    {/* Product Name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 transition-colors hover:text-indigo-600">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Product Description */}
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    {/* Price and Stock */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
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
            })}
          </div>
        ) : (
          // No Results Message
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No products found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 font-medium text-indigo-600 hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
