import { useParams } from 'react-router-dom';
import { useProducts } from 'src/context/ProductContext';
import { useProductDetails } from './hooks/useProductDetails';
import ProductDetails from './components/ProductDetails';
import ProductCard from 'src/components/products/ProductCard';
import { useCart } from 'src/context/CartContext';
import { useWishlist } from 'src/context/WishlistContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { isInCart, getItemQuantity, addToCart } = useCart();
  const {
    isInWishlist: checkWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const product = id ? getProductById(id) : undefined;

  const {
    quantity,
    showSuccess,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
    toggleWishlist,
    isInWishlist,
  } = useProductDetails(product);

  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ProductDetails
          product={product}
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onAddToCart={handleAddToCart}
          isInWishlist={isInWishlist}
          onToggleWishlist={toggleWishlist}
          showSuccess={showSuccess}
        />
      </div>

      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  Related Products
                </h2>
                <p className="text-gray-600">
                  You might also like these products
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  inCart={isInCart(relatedProduct.id)}
                  quantity={getItemQuantity(relatedProduct.id)}
                  isInWishlist={checkWishlist(relatedProduct.id)}
                  onAddToCart={(p) => addToCart(p, 1)}
                  onToggleWishlist={(p) =>
                    checkWishlist(p.id)
                      ? removeFromWishlist(p.id)
                      : addToWishlist(p)
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
