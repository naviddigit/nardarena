/**
 * Error Logger Middleware
 * لاگ کردن تمام خطاها به تلگرام
 */

import { Request, Response, NextFunction } from 'express';
import { telegramLogger } from '../services/telegramLogger';

/**
 * Middleware برای catch کردن خطاها
 */
export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // لاگ کردن به تلگرام
  telegramLogger.logError({
    service: 'Backend API',
    endpoint: `${req.method} ${req.path}`,
    user: req.user ? {
      id: req.user.userId,
      email: req.user.email,
    } : undefined,
    error: {
      message: err.message || 'Unknown error',
      stack: err.stack,
      code: err.statusCode || err.code || 500,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      params: req.params,
    },
  });

  // ارسال response
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
};

/**
 * Wrapper برای async route handlers
 * خطاها رو به errorLogger میفرسته
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
