// src/pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import { useRegisterForm } from "src/hooks/useRegisterForm";
import { SocialAuthButtons } from "src/components/auth/SocialAuthButtons";
import { ErrorMessage } from "src/components/common/ErrorMessage";
import { ROUTES } from "src/constants/routes";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "src/styles/auth.css";

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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-brand">ShopHub</h1>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Sign up to start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* API Error */}
          {apiError && (
            <div className="error-banner" role="alert">
              {apiError}
            </div>
          )}

          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} aria-hidden="true" />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.name) clearError("name");
                }}
                placeholder="John Doe"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                disabled={isLoading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "fullName-error" : undefined}
              />
            </div>
            {errors.name && (
              <ErrorMessage id="fullName-error" message={errors.name} />
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) clearError("email");
                }}
                placeholder="you@example.com"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <ErrorMessage id="email-error" message={errors.email} />
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) clearError("password");
                }}
                placeholder="••••••••"
                className={`form-input ${errors.password ? "input-error" : ""}`}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} aria-hidden="true" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) clearError("confirmPassword");
                }}
                placeholder="••••••••"
                className={`form-input ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                disabled={isLoading}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Social Auth */}
          <SocialAuthButtons />

          {/* Sign In Link */}
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
