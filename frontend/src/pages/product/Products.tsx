import { useCart } from 'src/context/CartContext';
import { useWishlist } from 'src/context/WishlistContext';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import { useProductsPage } from './hooks/useProductsPage';
import type { Product } from 'src/types/cart';

const Products = () => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleCategoryChange,
    filteredProducts,
    categories,
    clearFilters,
  } = useProductsPage();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of quality products
          </p>
        </div>

        <ProductFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <ProductList
          products={filteredProducts}
          isInCart={isInCart}
          getItemQuantity={getItemQuantity}
          isInWishlist={isInWishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default Products;
