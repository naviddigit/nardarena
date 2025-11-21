/**
 * Global Error Handler
 * مدیریت‌کننده خطاهای عمومی
 * 
 * Handles unhandled errors and promise rejections
 * خطاهای handle نشده و promise rejection ها رو مدیریت میکنه
 */

import { logger } from './logger';

/**
 * Setup global error handlers
 * راه‌اندازی مدیریت‌کننده‌های خطای عمومی
 */
export function setupErrorHandlers() {
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logger.error('Uncaught error', {
      message: event.message,
      filename: event.filename,
      line: event.lineno,
      column: event.colno,
      error: event.error?.stack,
    });

    // Prevent default browser error handling in production
    if (!(import.meta as any).env.DEV) {
      event.preventDefault();
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled promise rejection', {
      reason: event.reason,
      promise: event.promise,
    });

    // Prevent default browser handling in production
    if (!(import.meta as any).env.DEV) {
      event.preventDefault();
    }
  });

  // Log when user leaves page (helpful for debugging session issues)
  window.addEventListener('beforeunload', () => {
    logger.info('User leaving page');
  });
}

/**
 * Safe async function wrapper
 * wrapper امن برای توابع async
 */
export function safeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorMessage?: string
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      logger.error(errorMessage || 'Async function error', {
        error: error instanceof Error ? error.message : error,
        args,
      });
      throw error;
    }
  }) as T;
}

/**
 * Safe function wrapper
 * wrapper امن برای توابع عادی
 */
export function safe<T extends (...args: any[]) => any>(
  fn: T,
  errorMessage?: string
): T {
  return ((...args: any[]) => {
    try {
      return fn(...args);
    } catch (error) {
      logger.error(errorMessage || 'Function error', {
        error: error instanceof Error ? error.message : error,
        args,
      });
      throw error;
    }
  }) as T;
}

/**
 * Report custom error
 * گزارش خطای سفارشی
 */
export function reportError(
  message: string,
  context?: Record<string, any>
) {
  logger.error(message, context);
}

/**
 * Report warning
 * گزارش هشدار
 */
export function reportWarning(
  message: string,
  context?: Record<string, any>
) {
  logger.warn(message, context);
}

/**
 * API Error handler
 * مدیریت خطاهای API
 */
export function handleApiError(error: any, endpoint: string) {
  const errorData = {
    endpoint,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    message: error.message,
  };

  logger.error(`API Error: ${endpoint}`, errorData);

  // Return user-friendly message
  if (error.response?.status === 401) {
    return 'Authentication failed. Please login again.';
  } else if (error.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  } else if (error.response?.status === 404) {
    return 'Resource not found.';
  } else if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  } else if (error.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Create error context for debugging
 * ایجاد context خطا برای دیباگ
 */
export function createErrorContext() {
  return {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    memory: (performance as any).memory ? {
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
    } : null,
  };
}
