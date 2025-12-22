import { useWishlist } from 'src/context/WishlistContext';
import { useCart } from 'src/context/CartContext';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import WishlistItem from './components/WishlistItem';

/**
 * Wishlist Page Component
 * Displays items the user has saved for later
 */
const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 px-4">
        <div className="rounded-full bg-gray-100 p-6">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Your wishlist is empty
        </h2>
        <p className="text-center text-gray-600">
          Looks like you haven't added any items to your wishlist yet.
        </p>
        <Link
          to="/products"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">My Wishlist</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
            inCart={isInCart(product.id)}
            onRemove={removeFromWishlist}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
