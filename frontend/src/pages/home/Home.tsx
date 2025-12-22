import { Link } from 'react-router-dom';
import { useProducts } from 'src/context/ProductContext';
import { useCart } from 'src/context/CartContext';
import { useWishlist } from 'src/context/WishlistContext';
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
} from 'lucide-react';
import { useState } from 'react';
import HeroSection from './components/HeroSection';

const Home = () => {
  const { products } = useProducts();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [currentSlide, setCurrentSlide] = useState(0);
  const productsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const start = currentSlide * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };

  const categories = [
    {
      name: 'Fashion',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      items: 234,
      path: '/category/clothing',
    },
    {
      name: 'Electronics',
      image:
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400',
      items: 189,
      path: '/category/electronics',
    },
    {
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      items: 156,
      path: '/category/home-living',
    },
    {
      name: 'Sports & Fitness',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      items: 98,
      path: '/category/sports',
    },
    {
      name: 'Beauty & Health',
      image:
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      items: 127,
      path: '/category/beauty',
    },
  ];

  return (
    <div className="w-full bg-gray-50">
      <HeroSection />
      {/* Shop by Category Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Explore our wide range of product categories
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-900"
              >
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Category Info */}
                <div className="absolute right-0 bottom-0 left-0 p-4 text-white sm:p-6">
                  <h3 className="mb-1 text-xl font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-300">
                    {category.items} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header with Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked selection of our best products
              </p>
            </div>
            {/* Carousel Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 transition hover:border-indigo-600 hover:text-indigo-600"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Products Carousel */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {getCurrentProducts().map((product, index) => {
              const inCart = isInCart(product.id);
              // Show SALE badge on first product
              const isOnSale = index === 0;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {/* SALE Badge */}
                    {isOnSale && (
                      <div className="absolute top-3 left-3 z-10 rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        SALE
                      </div>
                    )}
                    {/* Quick Action Icons */}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist(product);
                          }
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 ${
                          isInWishlist(product.id)
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}
                        title={
                          isInWishlist(product.id)
                            ? 'Remove from Wishlist'
                            : 'Add to Wishlist'
                        }
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(product.id) ? 'fill-current' : ''
                          }`}
                        />
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
                    {/* Product Image */}
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
                      {product.category}
                    </p>
                    {/* Product Name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="mb-2 line-clamp-1 text-base font-semibold text-gray-900 transition hover:text-indigo-600">
                        {product.name}
                      </h3>
                    </Link>
                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="ml-1 text-xs text-gray-500">(328)</span>
                    </div>
                    {/* Price and Cart Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        {isOnSale && (
                          <span className="mr-2 text-sm text-gray-400 line-through">
                            ${(product.price * 1.2).toFixed(2)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                          inCart
                            ? 'bg-green-600 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
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
    </div>
  );
};

export default Home;
