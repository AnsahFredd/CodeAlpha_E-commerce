import api from './api';
import type { User } from '../context/AuthContext';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const userService = {
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<{ user: User }>>(
      '/auth/profile',
      userData
    );
    return response.data.data.user;
  },
};
