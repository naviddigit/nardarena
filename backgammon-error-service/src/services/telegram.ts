/**
 * Telegram Notification Service
 * سرویس اعلان تلگرام
 * 
 * FREE alternative to WhatsApp! 🚀
 * رایگان و بدون محدودیت
 */

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Initialize Telegram bot only if token is provided
const bot = process.env.TELEGRAM_BOT_TOKEN
  ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false })
  : null;

// Log configuration status
if (bot) {
  console.log('✅ Telegram Bot initialized successfully');
  console.log(`📱 Chat ID: ${process.env.TELEGRAM_CHAT_ID || 'NOT SET'}`);
} else {
  console.warn('⚠️ Telegram Bot not initialized - TELEGRAM_BOT_TOKEN not found');
}

interface ErrorData {
  id?: string;
  message: string;
  level: string;
  url?: string;
  timestamp: string;
  userId?: string;
  userAgent?: string;
  stack?: string;
  data?: any;
}

// Track recent messages to prevent duplicates
const recentMessages = new Map<string, number>();

/**
 * Send Telegram alert for error
 * ارسال اعلان خطا به تلگرام
 */
export async function sendTelegramAlert(errorData: ErrorData): Promise<boolean> {
  try {
    // Check if Telegram is configured
    if (!bot || !process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.warn('⚠️ Telegram not configured. Skipping alert.');
      return false;
    }

    // Prevent duplicate alerts within 5 minutes
    if (isDuplicate(errorData.message)) {
      console.log('⏭️ Duplicate error alert prevented:', errorData.message.substring(0, 50));
      return false;
    }

    const message = formatErrorMessage(errorData);
    
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
    
    console.log('✅ Telegram alert sent successfully');
    markAsSent(errorData.message);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send Telegram alert:', error.message);
    return false;
  }
}

/**
 * Format error message for Telegram (with Markdown)
 * فرمت پیام خطا برای تلگرام
 */
function formatErrorMessage(errorData: ErrorData): string {
  const emoji = getErrorEmoji(errorData.level);
  const time = new Date(errorData.timestamp).toLocaleString('fa-IR', {
    timeZone: 'Asia/Tehran'
  });
  
  let message = `${emoji} *خطا در Nard Arena*\n\n`;
  message += `📝 *پیام خطا:*\n\`${escapeMarkdown(errorData.message)}\`\n\n`;
  message += `⏰ *زمان:* ${time}\n`;
  message += `🌐 *صفحه:* ${errorData.url || 'نامشخص'}\n`;
  message += `📊 *سطح:* ${getLevelText(errorData.level)}\n`;
  
  if (errorData.userId) {
    message += `👤 *کاربر:* \`${errorData.userId}\`\n`;
  }
  
  if (errorData.userAgent) {
    const device = parseDevice(errorData.userAgent);
    message += `📱 *دستگاه:* ${device}\n`;
  }
  
  if (errorData.id) {
    message += `\n🔗 *شناسه:* \`${errorData.id}\`\n`;
  }
  
  if (errorData.stack && errorData.level === 'error') {
    const shortStack = errorData.stack.split('\n').slice(0, 3).join('\n');
    message += `\n📍 *Stack Trace:*\n\`\`\`\n${shortStack.substring(0, 200)}\n\`\`\`\n`;
  }
  
  message += `\n_🎮 Nard Arena | System Monitor_`;
  
  return message;
}

/**
 * Send custom Telegram message
 * ارسال پیام سفارشی به تلگرام
 */
export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    // Check if Telegram is configured
    if (!bot || !process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.warn('⚠️ Telegram not configured. Message not sent.');
      console.log('📝 Message that would be sent:', message);
      return false;
    }

    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
    
    console.log('✅ Telegram message sent successfully');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send Telegram message:', error.message);
    return false;
  }
}

/**
 * Get emoji for error level
 */
function getErrorEmoji(level: string): string {
  const emojis: Record<string, string> = {
    error: '🚨',
    warn: '⚠️',
    info: 'ℹ️',
    debug: '🐛'
  };
  return emojis[level] || '❗';
}

/**
 * Get Persian text for error level
 */
function getLevelText(level: string): string {
  const levels: Record<string, string> = {
    error: '🔴 خطا',
    warn: '🟡 هشدار',
    info: '🔵 اطلاعات',
    debug: '🟣 دیباگ'
  };
  return levels[level] || level;
}

/**
 * Parse device from user agent
 */
function parseDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) {
    if (/iphone/i.test(userAgent)) return '📱 iPhone';
    if (/android/i.test(userAgent)) return '📱 Android';
    return '📱 موبایل';
  }
  if (/tablet/i.test(userAgent)) return '📱 تبلت';
  return '💻 دسکتاپ';
}

/**
 * Escape Markdown special characters
 */
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

/**
 * Check if error message is duplicate
 */
function isDuplicate(message: string): boolean {
  const key = message.substring(0, 100); // First 100 chars as key
  const lastSent = recentMessages.get(key);
  
  if (!lastSent) return false;
  
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  
  return (now - lastSent) < fiveMinutes;
}

/**
 * Mark message as sent
 */
function markAsSent(message: string): void {
  const key = message.substring(0, 100);
  recentMessages.set(key, Date.now());
  
  // Clean old entries (older than 10 minutes)
  const tenMinutes = 10 * 60 * 1000;
  const now = Date.now();
  
  for (const [key, timestamp] of recentMessages.entries()) {
    if (now - timestamp > tenMinutes) {
      recentMessages.delete(key);
    }
  }
}

/**
 * Send test message
 * ارسال پیام تستی
 */
export async function sendTestMessage(): Promise<boolean> {
  const message = `
🧪 *تست سیستم اعلانات*

این یک پیام تستی است.

✅ ارسال موفقیت‌آمیز بود!
⏰ *زمان:* ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}
🎮 *پروژه:* Nard Arena
🤖 *Bot:* Telegram Notification Service

_سیستم آماده دریافت اعلانات خطا می‌باشد._
  `.trim();

  return sendTelegramMessage(message);
}
