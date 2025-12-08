// src/components/common/ErrorMessage.tsx
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  className?: string;
  id?: string;
}

export const ErrorMessage = ({
  message,
  className = "",
  id,
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div
      id={id}
      className={`flex items-center gap-2 text-sm text-red-600 mt-1 ${className}`}
      role="alert"
    >
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
