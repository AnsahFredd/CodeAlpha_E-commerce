import { useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import {
  validateEmail,
  validatePassword,
} from '../utils/validation/authValidation';
import { authService } from '../services/auth.service';

interface UseLoginFormReturn {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  isLoading: boolean;
  apiError: string | null;
  showPassword: boolean;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  clearError: (field: string) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const newErrors: { email?: string; password?: string } = {};

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as keyof typeof newErrors];
      return newErrors;
    });
    setApiError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      login(response.user, response.token);
      navigate(ROUTES.HOME);
    } catch (error) {
      let message = 'Invalid email or password';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    errors,
    isLoading,
    apiError,
    showPassword,
    rememberMe,
    setEmail,
    setPassword,
    setShowPassword,
    setRememberMe,
    handleSubmit,
    clearError,
  };
};
