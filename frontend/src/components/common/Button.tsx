/**
 * Reusable Button Component
 * Provides consistent styling and behavior across the application
 */

import React from 'react';

interface ButtonProps {
  title: string;
  color?: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  otherStyles?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  title,
  color,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  variant = 'primary',
  size = 'md',
  otherStyles = '',
}) => {
  /**
   * Get variant-specific styles
   */
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600';
      case 'outline':
        return 'bg-white border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 focus:ring-indigo-600';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600';
      default:
        return 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600';
    }
  };

  /**
   * Get size-specific styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      style={color ? { backgroundColor: color } : undefined}
      className={` ${getVariantStyles()} ${getSizeStyles()} flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${otherStyles} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{title}</span>
        </>
      )}
    </button>
  );
};

export default Button;
