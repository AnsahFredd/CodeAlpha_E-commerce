// src/components/layout/Navbar.tsx
import { NAV_ITEMS, USER_NAV_ITEMS } from "./navItems";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Package,
  UserCircle,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { useAuth } from "src/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      shopping_cart: <ShoppingCart className="w-5 h-5" />,
      receipt_long: <Package className="w-5 h-5" />,
      user: <UserCircle className="w-5 h-5" />,
    };
    return iconMap[iconName] || <User className="w-5 h-5" />;
  };

  // Filter items based on auth status
  const visibleUserNavItems = USER_NAV_ITEMS.filter((item) => {
    if (item.requiresAuth) {
      return isAuthenticated;
    }
    return true;
  });

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-[#4F39F6] text-white text-center text-sm py-2.5 font-medium">
        Free shipping on orders over $50 | Limited time offer!
      </div>

      <div className="flex items-center justify-between gap-6 py-4 px-8">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <ShoppingCart className="w-7 h-7 text-[#4F39F6]" />
          <h1 className="text-xl font-semibold text-gray-800">ShopHub</h1>
        </Link>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F39F6] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-700 hover:text-[#4F39F6] transition"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Sign In</span>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Hi,{" "}
                <span className="font-semibold">{user?.name || "User"}</span>
              </span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          <Link
            to="/wishlist"
            className="text-gray-700 hover:text-[#4F39F6] transition"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {visibleUserNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-gray-700 hover:text-[#4F39F6] transition"
              title={item.label}
            >
              {getIcon(item.icons || "")}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <nav className="px-8 py-3">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition relative ${
                      isActive
                        ? "text-[#4F39F6] after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-0.5 after:bg-[#4F39F6]"
                        : "text-gray-700 hover:text-[#4F39F6]"
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
    </header>
  );
};

export default Navbar;
