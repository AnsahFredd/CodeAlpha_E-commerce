import api from './api';
import type {
  SignupFormData,
  LoginFormData,
} from '../utils/validation/authValidation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authService = {
  async register(data: SignupFormData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      data
    );
    return response.data.data;
  },

  async getMe(): Promise<{ user: User }> {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data.data;
  },
};
