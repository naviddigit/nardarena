/**
 * Rate Limiter Middleware
 * میان‌افزار محدودیت درخواست
 */

import { Request, Response, NextFunction } from 'express';

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // Max 20 requests per minute per IP
const WINDOW = 60 * 1000; // 1 minute window

/**
 * Rate limiting middleware
 */
export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  const clientData = requestCounts.get(ip);
  
  // If first request or window expired
  if (!clientData || now > clientData.resetAt) {
    requestCounts.set(ip, {
      count: 1,
      resetAt: now + WINDOW
    });
    return next();
  }
  
  // If within rate limit
  if (clientData.count < RATE_LIMIT) {
    clientData.count++;
    return next();
  }
  
  // Rate limit exceeded
  const retryAfter = Math.ceil((clientData.resetAt - now) / 1000);
  res.setHeader('Retry-After', retryAfter);
  res.status(429).json({ 
    error: 'Too many requests. Please try again later.',
    retryAfter
  });
}

/**
 * Clean up old entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, 60 * 1000); // Clean every minute
