import React from 'react';

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  size = 'md',
  message = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-8 w-full h-full';

  return (
    <div className={containerClasses} aria-busy="true" aria-live="polite">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-gray-200 border-t-indigo-600`}
      />
      {message && (
        <p className="mt-4 animate-pulse text-sm font-medium text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
