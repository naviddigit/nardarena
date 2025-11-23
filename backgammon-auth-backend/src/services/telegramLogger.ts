/**
 * Telegram Logger Service
 * ارسال خطاها و لاگ‌ها به تلگرام
 */

import axios from 'axios';

interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

interface ErrorLog {
  type: 'ERROR' | 'WARNING' | 'INFO';
  service: string;
  endpoint?: string;
  user?: {
    id: string;
    email: string;
  };
  error: {
    message: string;
    stack?: string;
    code?: string | number;
  };
  request?: {
    method: string;
    url: string;
    body?: any;
    params?: any;
  };
  timestamp: string;
}

class TelegramLogger {
  private config: TelegramConfig;
  private apiUrl: string;

  constructor() {
    this.config = {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || '',
      enabled: process.env.TELEGRAM_LOGGING_ENABLED === 'true',
    };

    this.apiUrl = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;

    // Debug logging on startup
    console.log('\n📱 Telegram Logger Initialized:');
    console.log('  TELEGRAM_LOGGING_ENABLED:', process.env.TELEGRAM_LOGGING_ENABLED);
    console.log('  Config enabled:', this.config.enabled);
    console.log('  Bot token:', this.config.botToken ? 'SET (hidden)' : 'NOT SET');
    console.log('  Chat ID:', this.config.chatId ? 'SET (hidden)' : 'NOT SET');
    console.log('');
  }

  /**
   * فرمت کردن پیام برای تلگرام
   */
  private formatMessage(log: ErrorLog): string {
    const emoji = {
      ERROR: '🔴',
      WARNING: '⚠️',
      INFO: '🔵',
    };

    let message = `${emoji[log.type]} *${log.type}* - ${log.service}\n\n`;

    if (log.user) {
      message += `👤 *User:* ${log.user.email} (ID: ${log.user.id})\n`;
    }

    if (log.endpoint) {
      message += `🔗 *Endpoint:* \`${log.endpoint}\`\n`;
    }

    if (log.request) {
      message += `📡 *Request:* ${log.request.method} ${log.request.url}\n`;
      if (log.request.params) {
        message += `📋 *Params:* \`${JSON.stringify(log.request.params)}\`\n`;
      }
    }

    message += `\n❌ *Error:* ${log.error.message}\n`;

    if (log.error.code) {
      message += `📌 *Code:* ${log.error.code}\n`;
    }

    if (log.error.stack && log.type === 'ERROR') {
      // فقط 3 خط اول stack trace
      const stackLines = log.error.stack.split('\n').slice(0, 3).join('\n');
      message += `\n\`\`\`\n${stackLines}\n\`\`\`\n`;
    }

    message += `\n🕒 ${log.timestamp}`;

    return message;
  }

  /**
   * ارسال پیام به تلگرام
   */
  private async sendToTelegram(message: string): Promise<void> {
    if (!this.config.enabled) {
      console.log('[Telegram] Logging disabled - Message NOT sent');
      console.log('[Telegram] Message preview:', message.substring(0, 100) + '...');
      return;
    }

    if (!this.config.botToken || !this.config.chatId) {
      console.error('[Telegram] Bot token or chat ID not configured');
      console.error('[Telegram] TELEGRAM_BOT_TOKEN:', this.config.botToken ? 'SET' : 'NOT SET');
      console.error('[Telegram] TELEGRAM_CHAT_ID:', this.config.chatId ? 'SET' : 'NOT SET');
      return;
    }

    try {
      console.log('[Telegram] Sending message to chat:', this.config.chatId);
      await axios.post(this.apiUrl, {
        chat_id: this.config.chatId,
        text: message,
        parse_mode: 'Markdown',
      });
      console.log('[Telegram] ✅ Message sent successfully!');
    } catch (error: any) {
      console.error('[Telegram] ❌ Failed to send message:', error.message);
      if (error.response) {
        console.error('[Telegram] Response:', error.response.data);
      }
    }
  }

  /**
   * لاگ کردن خطا
   */
  public async logError(log: Omit<ErrorLog, 'type' | 'timestamp'>): Promise<void> {
    const fullLog: ErrorLog = {
      ...log,
      type: 'ERROR',
      timestamp: new Date().toISOString(),
    };

    // Console log همیشه فعال
    console.error('=== ERROR LOG ===');
    console.error('Service:', fullLog.service);
    if (fullLog.user) console.error('User:', fullLog.user.email);
    if (fullLog.endpoint) console.error('Endpoint:', fullLog.endpoint);
    console.error('Error:', fullLog.error.message);
    if (fullLog.error.stack) console.error('Stack:', fullLog.error.stack);
    console.error('==================\n');

    // ارسال به تلگرام
    const message = this.formatMessage(fullLog);
    await this.sendToTelegram(message);
  }

  /**
   * لاگ کردن warning
   */
  public async logWarning(log: Omit<ErrorLog, 'type' | 'timestamp'>): Promise<void> {
    const fullLog: ErrorLog = {
      ...log,
      type: 'WARNING',
      timestamp: new Date().toISOString(),
    };

    console.warn('=== WARNING LOG ===');
    console.warn('Service:', fullLog.service);
    console.warn('Message:', fullLog.error.message);
    console.warn('===================\n');

    const message = this.formatMessage(fullLog);
    await this.sendToTelegram(message);
  }

  /**
   * لاگ کردن info (برای موارد مهم)
   */
  public async logInfo(log: Omit<ErrorLog, 'type' | 'timestamp'>): Promise<void> {
    const fullLog: ErrorLog = {
      ...log,
      type: 'INFO',
      timestamp: new Date().toISOString(),
    };

    console.info('=== INFO LOG ===');
    console.info('Service:', fullLog.service);
    console.info('Message:', fullLog.error.message);
    console.info('================\n');

    const message = this.formatMessage(fullLog);
    await this.sendToTelegram(message);
  }
}

// Export singleton instance
export const telegramLogger = new TelegramLogger();
