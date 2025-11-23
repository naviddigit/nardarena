/**
 * Login Attempts Tracker
 * ردیابی تلاش‌های ناموفق لاگین
 */

import { telegramLogger } from './telegramLogger';

interface LoginAttempt {
  email: string;
  timestamp: number;
  ip?: string;
}

interface WarningTracker {
  lastWarningAt: number;
  warningCount: number;
}

class LoginAttemptsTracker {
  private attempts: Map<string, LoginAttempt[]> = new Map();
  private warnings: Map<string, WarningTracker> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly TIME_WINDOW = 5 * 60 * 1000; // 5 minutes
  private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
  private readonly WARNING_COOLDOWN = 2 * 60 * 1000; // 2 minutes between warnings

  constructor() {
    // Cleanup old attempts every 10 minutes
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  /**
   * ثبت یک تلاش ناموفق
   */
  public async recordFailedAttempt(email: string, ip?: string): Promise<void> {
    const now = Date.now();
    
    // گرفتن تلاش‌های قبلی
    const userAttempts = this.attempts.get(email) || [];
    
    // اضافه کردن تلاش جدید
    userAttempts.push({ email, timestamp: now, ip });
    this.attempts.set(email, userAttempts);

    // فیلتر کردن تلاش‌های در بازه زمانی
    const recentAttempts = userAttempts.filter(
      attempt => now - attempt.timestamp < this.TIME_WINDOW
    );

    // بروزرسانی
    this.attempts.set(email, recentAttempts);

    // چک کردن آیا به حد مجاز رسیده
    if (recentAttempts.length >= this.MAX_ATTEMPTS) {
      // چک کردن آیا warning قبلی در cooldown period هست
      const warningTracker = this.warnings.get(email);
      const shouldSendWarning = !warningTracker || 
        (now - warningTracker.lastWarningAt > this.WARNING_COOLDOWN);

      if (shouldSendWarning) {
        await this.sendWarning(email, recentAttempts.length, ip);
        
        // بروزرسانی warning tracker
        this.warnings.set(email, {
          lastWarningAt: now,
          warningCount: (warningTracker?.warningCount || 0) + 1,
        });
      }
    }
  }

  /**
   * پاک کردن تلاش‌های موفق
   */
  public clearAttempts(email: string): void {
    this.attempts.delete(email);
    this.warnings.delete(email);
  }

  /**
   * ارسال هشدار به تلگرام
   */
  private async sendWarning(email: string, attemptCount: number, ip?: string): Promise<void> {
    await telegramLogger.logWarning({
      service: 'Auth - Login Security',
      endpoint: 'POST /api/auth/login',
      error: {
        message: `⚠️ Suspicious Login Activity Detected!\n\n` +
                 `📧 Email: ${email}\n` +
                 `🔢 Failed Attempts: ${attemptCount}\n` +
                 `⏱️ Time Window: Last 5 minutes\n` +
                 (ip ? `🌐 IP Address: ${ip}\n` : '') +
                 `\n⚠️ Possible brute force attack!`,
        code: 'MULTIPLE_FAILED_LOGINS',
      },
    });

    console.warn(`⚠️ [Security] ${attemptCount} failed login attempts for: ${email}`);
  }

  /**
   * پاک کردن تلاش‌های قدیمی
   */
  private cleanup(): void {
    const now = Date.now();
    
    for (const [email, attempts] of this.attempts.entries()) {
      const recentAttempts = attempts.filter(
        attempt => now - attempt.timestamp < this.TIME_WINDOW
      );

      if (recentAttempts.length === 0) {
        this.attempts.delete(email);
      } else {
        this.attempts.set(email, recentAttempts);
      }
    }
  }

  /**
   * دریافت تعداد تلاش‌های اخیر
   */
  public getAttemptCount(email: string): number {
    const attempts = this.attempts.get(email) || [];
    const now = Date.now();
    
    return attempts.filter(
      attempt => now - attempt.timestamp < this.TIME_WINDOW
    ).length;
  }
}

// Export singleton
export const loginAttemptsTracker = new LoginAttemptsTracker();
