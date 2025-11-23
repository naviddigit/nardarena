import express, { Request, Response } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { getUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService';

const router = express.Router();

/**
 * GET /api/users
 * دریافت لیست کاربران (فقط Admin)
 */
router.get('/', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search, status, role, sortBy, sortOrder } = req.query;

    const filters = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      search: search as string | undefined,
      status: status as string | undefined,
      role: role as string | undefined,
      sortBy: sortBy as string | undefined,
      sortOrder: sortOrder as 'asc' | 'desc' | undefined,
    };

    const result = await getUsersService(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/users/:id
 * دریافت اطلاعات یک کاربر (فقط Admin)
 */
router.get('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(id);

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
 * PUT /api/users/:id
 * ویرایش کاربر (فقط Admin)
 */
router.put('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await updateUserService(id, updates);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/users/:id
 * حذف کاربر (فقط Admin)
 */
router.delete('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUserService(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
