import { useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  LogOut,
  ChevronRight,
  Settings,
  ShoppingBag,
  Heart,
} from 'lucide-react';
import ProfileForm from './components/ProfileForm';
import OrderList from './components/OrderList';
import { useProfile } from './hooks/useProfile';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    profileData,
    setProfileData,
    orders,
    handleSaveProfile,
    handleCancelEdit,
  } = useProfile();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              My Account
            </h1>
            <p className="text-gray-600">
              Manage your profile and view order history
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-200 px-6 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <nav className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-sm">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activeTab === 'profile'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User className="h-5 w-5" />
                Profile Settings
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform ${activeTab === 'profile' ? 'rotate-90' : ''}`}
                />
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activeTab === 'orders'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Package className="h-5 w-5" />
                Order History
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform ${activeTab === 'orders' ? 'rotate-90' : ''}`}
                />
              </button>
              <div className="my-2 border-t border-gray-100" />
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ShoppingBag className="h-5 w-5" />
                My Cart
              </button>
              <button
                onClick={() => navigate('/wishlist')}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
            </nav>

            <div className="mt-6 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-md">
              <h3 className="mb-2 font-bold">Premium Member</h3>
              <p className="mb-4 text-sm text-indigo-100">
                Enjoy exclusive deals and free shipping on all orders!
              </p>
              <Settings className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' ? (
              <ProfileForm
                profileData={profileData}
                setProfileData={setProfileData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
              />
            ) : (
              <OrderList orders={orders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
