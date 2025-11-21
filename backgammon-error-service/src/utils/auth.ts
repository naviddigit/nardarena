/**
 * Authentication Middleware
 * میان‌افزار احراز هویت
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Authenticate API requests using API key
 */
export function authenticateRequest(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
  next();
}
