/**
 * User Profile Page
 * Displays user account information and order history
 */

import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Settings,
  LogOut,
  Edit2,
  Save,
  X,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Order interface for order history
 */
interface Order {
  id: string;
  date: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    image: string;
  }>;
  status: 'processing' | 'shipped' | 'delivered';
}

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  // User profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });

  /**
   * Load orders from localStorage
   */
  const orders: Order[] = JSON.parse(
    localStorage.getItem('orders') || '[]'
  ).map((order: any) => ({
    id: order.id,
    date: order.date,
    total: order.total,
    items: order.items,
    status: 'processing' as const, // Default for demo
  }));

  /**
   * Handle profile update
   */
  const handleSaveProfile = () => {
    // TODO: Save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  /**
   * Handle cancel edit
   */
  const handleCancelEdit = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    });
    setIsEditing(false);
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Format date
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            My Account
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage your profile and view your orders
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              {/* User Avatar */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 sm:h-24 sm:w-24">
                  <User className="h-10 w-10 text-indigo-600 sm:h-12 sm:w-12" />
                </div>
                <h2 className="truncate px-2 text-lg font-bold text-gray-900 sm:text-xl">
                  {user?.name}
                </h2>
                <p className="truncate px-2 text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                    activeTab === 'profile'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium sm:text-base">
                    Profile Settings
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                    activeTab === 'orders'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium sm:text-base">
                    Order History
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium sm:text-base">
                    Logout
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Profile Settings
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700 sm:w-auto sm:text-base"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex w-full gap-2 sm:w-auto">
                      <button
                        onClick={handleSaveProfile}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700 sm:flex-none sm:text-base"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-300 sm:flex-none sm:text-base"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                          <User className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <span className="truncate text-gray-900">
                            {profileData.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                          <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <span className="truncate text-gray-900">
                            {profileData.email}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                          <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <span className="text-gray-900">
                            {profileData.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Street Address */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                          <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <span className="truncate text-gray-900">
                            {profileData.address}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              city: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="rounded-lg bg-gray-50 p-3">
                          <span className="text-gray-900">
                            {profileData.city}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.state}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              state: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="rounded-lg bg-gray-50 p-3">
                          <span className="text-gray-900">
                            {profileData.state}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.zipCode}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                        />
                      ) : (
                        <div className="rounded-lg bg-gray-50 p-3">
                          <span className="text-gray-900">
                            {profileData.zipCode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
                  Order History
                </h2>

                {orders.length === 0 ? (
                  <div className="py-12 text-center">
                    <Package className="mx-auto mb-4 h-16 w-16 text-gray-300 sm:h-24 sm:w-24" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                      No orders yet
                    </h3>
                    <p className="mb-6 text-sm text-gray-600 sm:text-base">
                      Start shopping to see your orders here
                    </p>
                    <Link
                      to="/products"
                      className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:text-base"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-lg border border-gray-200 p-4 transition hover:border-indigo-600 sm:p-6"
                      >
                        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {order.id}
                              </h3>
                              <span
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.items.length} item(s)
                            </p>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex -space-x-3 overflow-hidden py-2">
                            {order.items.slice(0, 4).map((item) => (
                              <img
                                key={item.id}
                                className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                                src={item.image}
                                alt={item.name}
                                title={item.name}
                              />
                            ))}
                            {order.items.length > 4 && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
                                +{order.items.length - 4}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <Link
                            to={`/order-confirmation/${order.id}`}
                            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm text-white transition hover:bg-indigo-700 sm:text-base"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
