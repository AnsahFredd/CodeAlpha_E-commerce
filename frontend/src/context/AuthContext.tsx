import { createContext, useContext } from 'react';

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User, token: string) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

// --- Context ---
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
