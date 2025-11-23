/**
 * Snackbar Provider
 * سیستم نوتیفیکیشن مبتنی بر react-hot-toast با Tailwind styling
 * الهام گرفته از Minimals Design System
 */

import toast, { Toaster, Toast as ToastType } from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

// Custom Toast Component
const CustomToast = ({ t, message, type }: { t: ToastType; message: string; type: 'success' | 'error' | 'warning' | 'info' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 text-xl flex-shrink-0" />;
      case 'error':
        return <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0" />;
      case 'warning':
        return <FiAlertTriangle className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0" />;
      case 'info':
        return <FiInfo className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
      case 'error':
        return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
      case 'warning':
        return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
      case 'info':
        return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
    }
  };

  return (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${getStyles()}
        max-w-md w-full shadow-xl rounded-lg pointer-events-auto
        flex items-start gap-3 p-4
      `}
    >
      {getIcon()}
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
        {message}
      </p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex-shrink-0"
      >
        <FiX className="text-lg" />
      </button>
    </div>
  );
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            margin: 0,
          },
        }}
        containerStyle={{
          top: 80,
          right: 20,
        }}
      />
    </>
  );
};

// Snackbar API
export const snackbar = {
  success: (message: string, duration?: number) => {
    toast.custom(
      (t) => <CustomToast t={t} message={message} type="success" />,
      { duration: duration || 3000 }
    );
  },

  error: (message: string, duration?: number) => {
    toast.custom(
      (t) => <CustomToast t={t} message={message} type="error" />,
      { duration: duration || 4000 }
    );
  },

  warning: (message: string, duration?: number) => {
    toast.custom(
      (t) => <CustomToast t={t} message={message} type="warning" />,
      { duration: duration || 3500 }
    );
  },

  info: (message: string, duration?: number) => {
    toast.custom(
      (t) => <CustomToast t={t} message={message} type="info" />,
      { duration: duration || 3000 }
    );
  },
};
