import { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from 'src/context/AuthContext';
import { userService } from 'src/services/user.service';
import type { Order } from '../interfaces';

export const useProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
  });

  // Sync profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
      });
    }
  }, [user]);

  const orders: Order[] = useMemo(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    ) as Partial<Order>[];

    return storedOrders.map((order) => ({
      id: order.id! || '',
      date: order.date! || '',
      total: order.total! || 0,
      items: order.items || [],
      status: 'processing' as const,
    }));
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      updateUser(profileData);

      await userService.updateProfile(profileData);

      setIsEditing(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to save profile');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Save profile error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = useCallback(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
      });
    }
    setIsEditing(false);
  }, [user]);

  return {
    user,
    logout,
    isEditing,
    setIsEditing,
    isSaving,
    error,
    activeTab,
    setActiveTab,
    profileData,
    setProfileData,
    orders,
    handleSaveProfile,
    handleCancelEdit,
  };
};
