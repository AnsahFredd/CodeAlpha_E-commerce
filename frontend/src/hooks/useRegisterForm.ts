import { useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import {
  validateSignup,
  type SignupFormData,
} from '../utils/validation/authValidation';
import { authService } from '../services/auth.service';

interface UseRegisterFormReturn {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  isLoading: boolean;
  apiError: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  clearError: (field: string) => void;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const data: SignupFormData = {
      name: fullName,
      email,
      password,
      confirmPassword,
    };

    const validationErrors = validateSignup(data);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    setApiError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Initial basic validation before async (though Zod handles it)
    if (!validate()) return;

    setIsLoading(true);

    const data: SignupFormData = {
      name: fullName,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await authService.register(data);
      login(response.user, response.token);
      navigate(ROUTES.HOME);
    } catch (error) {
      let message = 'Registration failed. Please try again.';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName,
    email,
    password,
    confirmPassword,
    errors,
    isLoading,
    apiError,
    showPassword,
    showConfirmPassword,
    setFullName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleSubmit,
    clearError,
  };
};
