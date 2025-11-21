/**
 * Logger Service
 * سرویس لاگ‌گیری
 * 
 * Centralized logging for errors, warnings, and info
 * لاگ‌گیری متمرکز برای خطاها، هشدارها و اطلاعات
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  userAgent?: string;
  url?: string;
  userId?: string;
}

class Logger {
  private isDevelopment = (import.meta as any).env.DEV;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  /**
   * Log an error
   * خطا رو لاگ کن
   */
  error(message: string, data?: any) {
    this.log('error', message, data);
    console.error(`[ERROR] ${message}`, data);
  }

  /**
   * Log a warning
   * هشدار رو لاگ کن
   */
  warn(message: string, data?: any) {
    this.log('warn', message, data);
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
  }

  /**
   * Log info
   * اطلاعات رو لاگ کن
   */
  info(message: string, data?: any) {
    this.log('info', message, data);
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  /**
   * Log debug info (only in development)
   * اطلاعات دیباگ رو لاگ کن (فقط در حالت توسعه)
   */
  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      this.log('debug', message, data);
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  /**
   * Private log method
   * متد خصوصی لاگ‌گیری
   */
  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Add to in-memory logs
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Store critical errors in localStorage
    if (level === 'error') {
      this.storeErrorInLocalStorage(entry);
    }

    // TODO: Send to backend/monitoring service in production
    if (!this.isDevelopment && level === 'error') {
      this.sendToBackend(entry);
    }
  }

  /**
   * Store error in localStorage
   * خطا رو در localStorage ذخیره کن
   */
  private storeErrorInLocalStorage(entry: LogEntry) {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(entry);
      
      // Keep only last 20 errors
      if (existingLogs.length > 20) {
        existingLogs.shift();
      }
      
      localStorage.setItem('error_logs', JSON.stringify(existingLogs));
    } catch (e) {
      console.error('Failed to store error in localStorage:', e);
    }
  }

  /**
   * Send log to backend
   * لاگ رو به بک‌اند بفرست
   */
  private async sendToBackend(entry: LogEntry) {
    try {
      const apiUrl = (import.meta as any).env.VITE_ERROR_API_URL;
      const apiKey = (import.meta as any).env.VITE_ERROR_API_KEY;
      
      if (!apiUrl || !apiKey) {
        console.warn('Error API not configured');
        return;
      }
      
      await fetch(`${apiUrl}/api/errors/report`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(entry),
      });
    } catch (e) {
      console.error('Failed to send log to backend:', e);
    }
  }

  /**
   * Get all logs
   * همه لاگ‌ها رو بگیر
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs from localStorage
   * لاگ‌ها رو از localStorage بگیر
   */
  getStoredLogs(): LogEntry[] {
    try {
      return JSON.parse(localStorage.getItem('error_logs') || '[]');
    } catch (e) {
      console.error('Failed to get stored logs:', e);
      return [];
    }
  }

  /**
   * Clear all logs
   * همه لاگ‌ها رو پاک کن
   */
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('error_logs');
  }

  /**
   * Export logs as JSON
   * لاگ‌ها رو به صورت JSON export کن
   */
  exportLogs(): string {
    return JSON.stringify({
      inMemory: this.logs,
      stored: this.getStoredLogs(),
    }, null, 2);
  }
}

// Singleton instance
export const logger = new Logger();

// Export for debugging in console
if ((import.meta as any).env.DEV) {
  (window as any).logger = logger;
}
