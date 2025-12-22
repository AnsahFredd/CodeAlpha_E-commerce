import { Link } from 'react-router-dom';
import { useRegisterForm } from 'src/hooks/useRegisterForm';
import { SocialAuthButtons } from 'src/components/auth/SocialAuthButtons';
import { ErrorMessage } from 'src/components/common/ErrorMessage';
import Button from 'src/components/common/Button';
import { ROUTES } from 'src/constants';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const RegisterPage = () => {
  const {
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
  } = useRegisterForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-3xl font-bold text-indigo-600">ShopHub</h1>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">Sign up to start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {apiError && (
            <div
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              role="alert"
            >
              {apiError}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.name) clearError('name');
                }}
                placeholder="John Doe"
                className={`w-full rounded-xl border py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && (
              <ErrorMessage id="fullName-error" message={errors.name} />
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) clearError('email');
                }}
                placeholder="you@example.com"
                className={`w-full rounded-xl border py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <ErrorMessage id="email-error" message={errors.email} />
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) clearError('password');
                }}
                placeholder="••••••••"
                className={`w-full rounded-xl border py-3 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-indigo-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <ErrorMessage id="password-error" message={errors.password} />
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) clearError('confirmPassword');
                }}
                placeholder="••••••••"
                className={`w-full rounded-xl border py-3 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
                aria-invalid={!!errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-indigo-600"
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <ErrorMessage
                id="confirmPassword-error"
                message={errors.confirmPassword}
              />
            )}
          </div>

          <Button
            title={isLoading ? 'Creating Account...' : 'Sign Up'}
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            variant="primary"
            size="lg"
            otherStyles="w-full py-3.5 text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          />

          <div className="pt-2">
            <SocialAuthButtons />
          </div>

          <p className="pt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
