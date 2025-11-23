/**
 * Test Routes
 * مسیرهای تست
 * 
 * For testing WhatsApp notifications
 */

import express, { Request, Response } from 'express';
import { sendTelegramMessage } from '../services/telegram';

const router = express.Router();

/**
 * POST /api/test/telegram
 * ارسال پیام تستی به تلگرام
 */
router.post('/telegram', async (req: Request, res: Response) => {
  try {
    const testMessage = `
🧪 *تست سیستم خطایابی*

این یک پیام تستی است.

✅ ارسال موفقیت‌آمیز بود!

🕐 *زمان:* ${new Date().toLocaleString('fa-IR')}
🔧 *محیط:* ${process.env.NODE_ENV || 'development'}
    `.trim();

    const success = await sendTelegramMessage(testMessage);

    if (success) {
      res.json({
        success: true,
        message: 'Telegram test message sent successfully',
        sentAt: new Date().toISOString(),
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send Telegram message. Check if bot is configured.',
      });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * POST /api/test/error
 * شبیه‌سازی یک خطا (برای تست flow کامل)
 */
router.post('/error', async (req: Request, res: Response) => {
  try {
    const { severity = 'medium' } = req.body;

    const testErrors = {
      low: {
        message: 'تست: خطای سطح پایین - این فقط یک warning است',
        context: { level: 'low', test: true },
      },
      medium: {
        message: 'تست: خطای سطح متوسط - مشکلی در عملکرد رخ داده',
        context: { level: 'medium', test: true, affected: 'some users' },
      },
      high: {
        message: '🚨 تست: خطای سطح بالا - مشکل جدی!',
        context: { 
          level: 'high', 
          test: true, 
          affected: 'all users',
          severity: 'critical' 
        },
      },
    };

    const selectedError = testErrors[severity as keyof typeof testErrors] || testErrors.medium;

    // شبیه‌سازی خطا
    const errorMessage = `
⚠️ *${selectedError.message}*

📊 *جزئیات:*
\`\`\`json
${JSON.stringify(selectedError.context, null, 2)}
\`\`\`

🕐 *زمان:* ${new Date().toLocaleString('fa-IR')}
🔧 *محیط:* تست
    `.trim();

    const success = await sendTelegramMessage(errorMessage);

    res.json({
      success: true,
      test: true,
      errorSimulated: selectedError.message,
      telegramSent: success,
    });
  } catch (error) {
    console.error('Test error endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to simulate error',
    });
  }
});

export default router;
