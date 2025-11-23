/**
 * Frontend Error Logger
 * ارسال خطاهای frontend به backend (و از اونجا به تلگرام)
 */

import apiClient from './api.service';

interface FrontendError {
  type: 'ERROR' | 'WARNING' | 'UNHANDLED_REJECTION' | 'NETWORK_ERROR';
  message: string;
  stack?: string;
  component?: string;
  action?: string;
  userAgent?: string;
  url?: string;
  additionalData?: any;
}

class ErrorLogger {
  private isEnabled: boolean;
  private pendingErrors: FrontendError[] = [];
  private isSending: boolean = false;

  constructor() {
    this.isEnabled = import.meta.env.VITE_ERROR_LOGGING_ENABLED === 'true';
    this.setupGlobalHandlers();
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalHandlers(): void {
    // Catch uncaught errors
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'ERROR',
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        additionalData: {
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'UNHANDLED_REJECTION',
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
      });
    });
  }

  /**
   * لاگ کردن خطا
   */
  public async logError(error: Partial<FrontendError>): Promise<void> {
    const fullError: FrontendError = {
      type: error.type || 'ERROR',
      message: error.message || 'Unknown error',
      stack: error.stack,
      component: error.component,
      action: error.action,
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData: error.additionalData,
    };

    // Console log همیشه فعال
    console.error('=== FRONTEND ERROR ===');
    console.error('Type:', fullError.type);
    console.error('Message:', fullError.message);
    if (fullError.component) console.error('Component:', fullError.component);
    if (fullError.action) console.error('Action:', fullError.action);
    if (fullError.stack) console.error('Stack:', fullError.stack);
    console.error('====================\n');

    if (!this.isEnabled) {
      return;
    }

    // اضافه کردن به صف
    this.pendingErrors.push(fullError);

    // ارسال به backend (debounced)
    this.sendPendingErrors();
  }

  /**
   * ارسال خطاهای pending به backend
   */
  private async sendPendingErrors(): Promise<void> {
    if (this.isSending || this.pendingErrors.length === 0) {
      return;
    }

    this.isSending = true;

    try {
      const errors = [...this.pendingErrors];
      this.pendingErrors = [];

      await apiClient.post('/logs/frontend-errors', { errors });
    } catch (err) {
      console.error('Failed to send error logs to backend:', err);
      // اگه send fail شد، error ها رو دوباره به صف اضافه کن
      // (اما فقط اگه تعداد کم باشه تا overflow نشه)
      if (this.pendingErrors.length < 50) {
        // Don't add back to prevent infinite loop
      }
    } finally {
      this.isSending = false;

      // اگه error جدید اومده، دوباره send کن
      if (this.pendingErrors.length > 0) {
        setTimeout(() => this.sendPendingErrors(), 1000);
      }
    }
  }

  /**
   * لاگ کردن network error
   */
  public logNetworkError(error: any, endpoint: string, method: string): void {
    this.logError({
      type: 'NETWORK_ERROR',
      message: error.message || 'Network request failed',
      action: `${method} ${endpoint}`,
      additionalData: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      },
    });
  }

  /**
   * لاگ کردن component error
   */
  public logComponentError(error: Error, component: string, action?: string): void {
    this.logError({
      type: 'ERROR',
      message: error.message,
      stack: error.stack,
      component,
      action,
    });
  }

  /**
   * لاگ کردن warning
   */
  public logWarning(message: string, component?: string, additionalData?: any): void {
    console.warn('⚠️ [WARNING]', message);
    
    this.logError({
      type: 'WARNING',
      message,
      component,
      additionalData,
    });
  }
}

// Export singleton
export const errorLogger = new ErrorLogger();
