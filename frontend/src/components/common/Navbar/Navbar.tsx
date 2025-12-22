import { useState } from 'react';
import { NAV_ITEMS } from './navItems';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from 'src/context/AuthContext';
import { useCart } from 'src/context/CartContext';

const Navbar = () => {
  // Get authentication state
  const { isAuthenticated, user, logout } = useAuth();

  // Get cart state for badge count
  const { totalItems } = useCart();

  // Get current location for active link highlighting
  const location = useLocation();

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-indigo-600 py-1 text-center text-xs font-medium text-white sm:text-sm">
        Free Shipping on Orders Over $50
      </div>

      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <Link to="/" className="flex flex-shrink-0 items-center gap-2">
              <ShoppingCart className="h-7 w-7 text-indigo-600" />
              <h1 className="hidden text-xl font-bold text-gray-900 sm:block">
                ShopHub
              </h1>
            </Link>

            <div className="hidden max-w-2xl flex-1 px-8 md:block">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-12 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-4 sm:gap-6">
              <div className="hidden items-center gap-6 md:flex">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-700 transition hover:text-indigo-600"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign In</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700">
                      Hi,{' '}
                      <span className="font-semibold">
                        {user?.name?.split(' ')[0] || 'User'}
                      </span>
                    </span>
                    <button
                      onClick={logout}
                      className="text-gray-700 transition hover:text-red-500"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                )}

                <Link
                  to="/wishlist"
                  className="text-gray-700 transition hover:text-indigo-600"
                  title="Wishlist"
                >
                  <Heart className="h-6 w-6" />
                </Link>
              </div>

              <Link
                to="/cart"
                className="relative text-gray-700 transition hover:text-indigo-600"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <button
                className="text-gray-700 transition hover:text-indigo-600 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-12 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-gray-200 bg-white md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="py-3">
            <ul className="flex justify-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`text-sm font-medium transition ${
                        isActive
                          ? 'text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 z-40 w-full border-b border-gray-200 bg-white shadow-lg md:hidden">
          <div className="space-y-4 px-4 py-4">
            <nav>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block rounded-lg px-4 py-2 text-base font-medium transition ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-gray-200 pt-4">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Sign In / Register</span>
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="font-medium">
                      Hi, {user?.name?.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}

              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                <Heart className="h-5 w-5" />
                <span className="font-medium">My Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
