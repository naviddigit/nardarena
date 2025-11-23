/**
 * Logs Routes
 * Endpoint برای دریافت لاگ‌های frontend
 */

import { Router, Request, Response } from 'express';
import { telegramLogger } from '../services/telegramLogger';
import { asyncHandler } from '../middleware/errorLogger';

const router = Router();

/**
 * POST /api/logs/frontend-errors
 * دریافت خطاهای frontend و ارسال به تلگرام
 */
router.post('/frontend-errors', asyncHandler(async (req: Request, res: Response) => {
  const { errors } = req.body;

  if (!errors || !Array.isArray(errors)) {
    res.status(400).json({
      success: false,
      error: 'Invalid request body',
    });
    return;
  }

  // ارسال هر error به تلگرام
  for (const error of errors) {
    const logData = {
      service: 'Frontend',
      endpoint: error.component || error.url,
      user: req.user ? {
        id: req.user.userId,
        email: req.user.email,
      } : undefined,
      error: {
        message: `[${error.type}] ${error.message}`,
        stack: error.stack,
      },
      request: error.action ? {
        method: 'FRONTEND',
        url: error.action,
        body: error.additionalData,
      } : undefined,
    };

    // ارسال بر اساس نوع
    if (error.type === 'WARNING') {
      await telegramLogger.logWarning(logData);
    } else if (error.type === 'INFO') {
      await telegramLogger.logInfo(logData);
    } else {
      await telegramLogger.logError(logData);
    }
  }

  res.status(200).json({
    success: true,
    message: 'Errors logged successfully',
  });
}));

/**
 * POST /api/logs/test-telegram
 * تست ارسال به تلگرام
 */
router.post('/test-telegram', asyncHandler(async (req: Request, res: Response) => {
  console.log('=== TELEGRAM TEST REQUEST ===');
  console.log('TELEGRAM_LOGGING_ENABLED:', process.env.TELEGRAM_LOGGING_ENABLED);
  console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'SET (hidden)' : 'NOT SET');
  console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? 'SET (hidden)' : 'NOT SET');
  
  await telegramLogger.logInfo({
    service: 'Test Panel',
    endpoint: 'POST /api/logs/test-telegram',
    error: {
      message: '🧪 Test message from Error Tracking Panel\n\nThis is a test to verify Telegram integration is working correctly!',
      code: 'TEST',
    },
  });

  res.status(200).json({
    success: true,
    message: 'Test message sent to Telegram',
  });
}));

export default router;
