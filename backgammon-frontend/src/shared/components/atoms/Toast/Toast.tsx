/**
 * Toast Component
 * کامپوننت نمایش پیام‌های موقت
 */

import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,
    warning: <FiAlertCircle size={20} />,
    info: <FiInfo size={20} />,
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-[9999] flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-md animate-slide-in ${colors[type]}`}
    >
      <span className="flex-shrink-0">{icons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};
