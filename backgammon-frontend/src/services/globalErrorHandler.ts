/**
 * Global Error Handler
 * ارسال خودکار همه خطاها به تلگرام
 */

import { logger } from './errorTracking';

interface ErrorContext {
  user?: {
    id?: number;
    email?: string;
    username?: string;
    role?: string;
  };
  location?: string;
  action?: string;
  [key: string]: any;
}

/**
 * Send error to Telegram with user context
 * ارسال خطا به تلگرام با اطلاعات کاربر
 */
export const sendErrorToTelegram = async (
  error: Error | string,
  context?: ErrorContext
) => {
  try {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;

    // Get user info from context or localStorage
    let userInfo = context?.user;
    if (!userInfo) {
      const authData = localStorage.getItem('auth');
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          userInfo = parsed.user;
        } catch {
          // Ignore parse errors
        }
      }
    }

    // Format user display
    const userDisplay = userInfo?.username || userInfo?.email || 'Guest / Unknown User';
    const userRole = userInfo?.role || 'guest';

    // Log to console for debugging
    console.error('🔴 Error caught:', errorMessage);
    console.error('👤 User:', userDisplay);
    console.error('📍 Context:', context);

    // Send to error tracking service (will forward to Telegram)
    await logger.error(errorMessage, {
      ...context,
      user: {
        display: userDisplay,
        id: userInfo?.id,
        email: userInfo?.email,
        username: userInfo?.username,
        role: userRole,
      },
      stack: errorStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    return true;
  } catch (sendError) {
    console.error('Failed to send error to Telegram:', sendError);
    return false;
  }
};

/**
 * Setup global error handlers
 * راه‌اندازی گیرنده‌های خطای سراسری
 */
export const setupGlobalErrorHandlers = () => {
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    sendErrorToTelegram(event.error || event.message, {
      type: 'uncaught_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    sendErrorToTelegram(
      event.reason instanceof Error ? event.reason : String(event.reason),
      {
        type: 'unhandled_rejection',
        promise: 'Promise rejection',
      }
    );
  });

  console.log('✅ Global error handlers initialized');
};

/**
 * Manual error reporting
 * گزارش دستی خطا
 */
export const reportError = async (
  message: string,
  context?: ErrorContext
) => {
  return sendErrorToTelegram(new Error(message), {
    type: 'manual_report',
    ...context,
  });
};

/**
 * Wrap async functions to catch errors
 * پوشش توابع async برای گرفتن خطاها
 */
export const withErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: ErrorContext
): T => {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      await sendErrorToTelegram(
        error instanceof Error ? error : String(error),
        {
          ...context,
          functionName: fn.name,
          arguments: args,
        }
      );
      throw error; // Re-throw to allow local error handling
    }
  }) as T;
};

/**
 * React Error Boundary helper
 * کمکی برای Error Boundary در React
 */
export const handleReactError = (
  error: Error,
  errorInfo: { componentStack?: string }
) => {
  sendErrorToTelegram(error, {
    type: 'react_error',
    componentStack: errorInfo.componentStack,
  });
};
