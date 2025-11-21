/**
 * Error Tracking Service - Index
 * سرویس ردیابی خطا - ایندکس
 * 
 * Central export for all error tracking utilities
 */

export { ErrorBoundary } from './ErrorBoundary';
export { logger } from './logger';
export {
  setupErrorHandlers,
  safeAsync,
  safe,
  reportError,
  reportWarning,
  handleApiError,
  createErrorContext,
} from './errorHandler';
