// src/pages/LoginPage.tsx
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "src/hooks/useLoginForm";
import { SocialAuthButtons } from "src/components/auth/SocialAuthButtons";
import { ErrorMessage } from "src/components/common/ErrorMessage";
import { ROUTES } from "src/constants/index";
import "src/styles/auth.css";
import Button from "src/components/common/Button";

const LoginPage = () => {
  const {
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
  } = useLoginForm();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-brand">ShopHub</h1>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* API Error */}
          {apiError && (
            <div className="error-banner" role="alert">
              {apiError}
            </div>
          )}

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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
                disabled={isLoading}
              />
              <span className="checkbox-label">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="auth-link"
              style={{ fontSize: "0.875rem" }}
              tabIndex={isLoading ? -1 : 0}
            >
              Forgot password?
            </Link>
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="">
            {isLoading ? (
              <Button
                title="Signing in..."
                disable={isLoading}
                type="submit"
                color="red"
                otherStyles="auth-submit-button"
              />
            ) : (
              <Button
                title="Sign in"
                disable={isLoading}
                type="submit"
                color="blue"
                onClick={() => ""}
                otherStyles="auth-submit-button"
              />
            )}
          </div>

          {/* Social Auth */}
          <SocialAuthButtons />

          {/* Sign Up Link */}
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER} className="auth-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
