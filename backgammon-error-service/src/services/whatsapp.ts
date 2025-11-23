/**
 * WhatsApp Notification Service
 * سرویس اعلان واتساپ
 */

import twilio from 'twilio';

// Initialize Twilio client only if credentials are provided
const client = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

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
 * Send WhatsApp alert for error
 */
export async function sendWhatsAppAlert(errorData: ErrorData): Promise<boolean> {
  try {
    // Check if Twilio is configured
    if (!client || !process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.warn('⚠️ Twilio not configured. Skipping WhatsApp alert.');
      return false;
    }

    // Prevent duplicate alerts within 5 minutes
    if (isDuplicate(errorData.message)) {
      console.log('Duplicate error alert prevented:', errorData.message.substring(0, 50));
      return false;
    }

    const message = formatErrorMessage(errorData);
    
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER}`,
      body: message
    });
    
    console.log('✅ WhatsApp alert sent successfully');
    markAsSent(errorData.message);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send WhatsApp alert:', error.message);
    return false;
  }
}

/**
 * Format error message for WhatsApp
 */
function formatErrorMessage(errorData: ErrorData): string {
  const emoji = getErrorEmoji(errorData.level);
  const time = new Date(errorData.timestamp).toLocaleString('fa-IR', {
    timeZone: 'Asia/Tehran'
  });
  
  let message = `${emoji} *خطا در برنامه بک‌گمون*\n\n`;
  message += `📝 *پیام خطا:*\n${errorData.message}\n\n`;
  message += `⏰ *زمان:* ${time}\n`;
  message += `🌐 *صفحه:* ${errorData.url || 'نامشخص'}\n`;
  
  if (errorData.userId) {
    message += `👤 *کاربر:* ${errorData.userId}\n`;
  }
  
  if (errorData.userAgent) {
    const device = parseDevice(errorData.userAgent);
    message += `📱 *دستگاه:* ${device}\n`;
  }
  
  if (errorData.id) {
    message += `\n🔗 شناسه خطا: ${errorData.id}\n`;
  }
  
  message += `\n_برای جزئیات بیشتر به داشبورد مراجعه کنید_`;
  
  return message;
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
 * Parse device from user agent
 */
function parseDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) {
    if (/iphone/i.test(userAgent)) return 'iPhone';
    if (/android/i.test(userAgent)) return 'Android';
    return 'موبایل';
  }
  if (/tablet/i.test(userAgent)) return 'تبلت';
  return 'دسکتاپ';
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
 */
export async function sendTestMessage(): Promise<boolean> {
  return sendWhatsAppAlert({
    message: 'این یک پیام تست است. سیستم اعلان واتساپ به درستی کار می‌کند! ✅',
    level: 'info',
    timestamp: new Date().toISOString(),
    url: 'https://test.com',
  });
}

/**
 * Send custom WhatsApp message
 */
export async function sendWhatsAppMessage(message: string): Promise<boolean> {
  try {
    // Check if Twilio is configured
    if (!client || !process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.warn('⚠️ Twilio not configured. WhatsApp message not sent.');
      console.log('📝 Message that would be sent:', message);
      return false;
    }

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER}`,
      body: message
    });
    
    console.log('✅ WhatsApp message sent successfully');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send WhatsApp message:', error.message);
    return false;
  }
}
