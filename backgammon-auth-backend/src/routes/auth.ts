import express, { Request, Response } from 'express';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import {
  registerUser,
  loginUser,
  getUserById,
  refreshAccessToken,
} from '../services/authService';
import { requestPasswordReset, resetPassword } from '../services/passwordResetService';

const router = express.Router();

/**
 * POST /api/auth/register
 * ثبت‌نام کاربر جدید
 */
router.post('/register', validate('register'), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await registerUser(email, password);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/login
 * ورود کاربر
 */
router.post('/login', validate('login'), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/auth/me
 * گرفتن اطلاعات کاربر فعلی
 * نیاز به authentication
 */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/refresh
 * تمدید access token با refresh token
 */
router.post('/refresh', validate('refreshToken'), async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const tokens = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { tokens },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/logout
 * خروج کاربر (فعلاً فقط client-side token رو پاک میکنه)
 */
router.post('/logout', authenticate, (req: Request, res: Response) => {
  // در نسخه ساده، logout سمت client انجام میشه (پاک کردن token از localStorage)
  // در نسخه پیشرفته، میتونیم token رو blacklist کنیم
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

/**
 * POST /api/auth/forgot-password
 * درخواست reset password
 */
router.post('/forgot-password', validate('forgotPassword'), async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await requestPasswordReset(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password با token
 */
router.post('/reset-password', validate('resetPassword'), async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body;

    const result = await resetPassword(email, token, newPassword);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
