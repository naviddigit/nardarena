import axios from 'axios';

/**
 * Telegram Notification Service
 * ارسال پیام به تلگرام برای خطاها و رویدادهای مهم
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const TELEGRAM_ENABLED = process.env.TELEGRAM_NOTIFICATIONS === 'true';

interface TelegramMessage {
  type: 'error' | 'warning' | 'info' | 'security';
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

/**
 * ارسال پیام به تلگرام
 */
export const sendTelegramNotification = async (data: TelegramMessage): Promise<void> => {
  // اگر تلگرام فعال نیست، فقط console.log کن
  if (!TELEGRAM_ENABLED || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log(`📱 Telegram disabled - ${data.type.toUpperCase()}: ${data.title}`);
    return;
  }

  try {
    // آیکون بر اساس نوع پیام
    const icon = {
      error: '🔴',
      warning: '⚠️',
      info: '🔵',
      security: '🔒',
    }[data.type];

    // ساخت پیام
    let text = `${icon} *${data.title}*\n\n`;
    text += `${data.message}\n`;

    if (data.metadata) {
      text += '\n📊 *Details:*\n';
      Object.entries(data.metadata).forEach(([key, value]) => {
        text += `• ${key}: \`${value}\`\n`;
      });
    }

    text += `\n⏰ ${new Date().toLocaleString('fa-IR')}`;

    // ارسال به تلگرام
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      },
      { timeout: 5000 }
    );

    console.log(`✅ Telegram notification sent: ${data.title}`);
  } catch (error) {
    // اگر تلگرام کار نکرد، فقط log کن (نباید سرویس کرش کنه)
    console.error('❌ Failed to send Telegram notification:', error);
  }
};

/**
 * Helper functions برای انواع مختلف notification
 */

export const notifyError = (title: string, message: string, metadata?: Record<string, any>) => {
  return sendTelegramNotification({ type: 'error', title, message, metadata });
};

export const notifyWarning = (title: string, message: string, metadata?: Record<string, any>) => {
  return sendTelegramNotification({ type: 'warning', title, message, metadata });
};

export const notifyInfo = (title: string, message: string, metadata?: Record<string, any>) => {
  return sendTelegramNotification({ type: 'info', title, message, metadata });
};

export const notifySecurity = (title: string, message: string, metadata?: Record<string, any>) => {
  return sendTelegramNotification({ type: 'security', title, message, metadata });
};

/**
 * Notification های خاص برای Authentication
 */

export const notifyFailedLogin = (email: string, reason: string, ip?: string) => {
  return notifySecurity(
    'Failed Login Attempt',
    `Login failed for user: ${email}`,
    { email, reason, ip, timestamp: new Date().toISOString() }
  );
};

export const notifySuccessfulLogin = (email: string, ip?: string) => {
  // فقط در production بفرست (در dev خیلی spam میشه)
  if (process.env.NODE_ENV === 'production') {
    return notifyInfo(
      'Successful Login',
      `User logged in: ${email}`,
      { email, ip, timestamp: new Date().toISOString() }
    );
  }
};

export const notifyPasswordReset = (email: string) => {
  return notifySecurity(
    'Password Reset Request',
    `Password reset requested for: ${email}`,
    { email, timestamp: new Date().toISOString() }
  );
};
