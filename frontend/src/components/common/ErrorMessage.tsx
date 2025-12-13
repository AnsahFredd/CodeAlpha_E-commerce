// src/components/common/ErrorMessage.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  id?: string;
}

export const ErrorMessage = ({
  message,
  className = '',
  id,
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div
      id={id}
      className={`mt-1 flex items-center gap-2 text-sm text-red-600 ${className}`}
      role="alert"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
