import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';

/**
 * اضافه کردن user به Request type
 */
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Middleware: احراز هویت با JWT
 * چک میکنه token معتبر باشه
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // گرفتن token از header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'No token provided',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    // تایید token
    const decoded = verifyAccessToken(token);

    // اضافه کردن user info به request
    req.user = decoded;

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
      message: error.message,
    });
  }
};

/**
 * Middleware: چک کردن role
 * فقط admin ها اجازه دسترسی دارن
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      error: 'Admin access required',
    });
    return;
  }

  next();
};

/**
 * Alias برای requireAdmin
 */
export const authorizeAdmin = requireAdmin;
