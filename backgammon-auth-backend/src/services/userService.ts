import { User } from '../models/User';
import { Op } from 'sequelize';

interface UserFilters {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * دریافت لیست کاربران با فیلتر و صفحه‌بندی
 */
export const getUsersService = async (filters: UserFilters) => {
  const { page, limit, search, status, role, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

  // Build where clause
  const where: any = {};

  // Search by email or username
  if (search) {
    where[Op.or] = [
      { email: { [Op.iLike]: `%${search}%` } },
      { username: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // Filter by status
  if (status && status !== 'all') {
    where.isActive = status === 'active';
  }

  // Filter by role
  if (role && role !== 'all') {
    where.role = role;
  }

  // Calculate offset
  const offset = (page - 1) * limit;

  // Get users from database
  const { rows: users, count: total } = await User.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, sortOrder.toUpperCase()]],
    attributes: { exclude: ['password'] },
    raw: true, // Get plain objects
  });

  // Transform users to match frontend format
  const transformedUsers = users.map((user: any) => ({
    id: user.id?.toString() || '',
    email: user.email || '',
    username: user.username || '',
    role: user.role || 'player',
    status: user.isActive ? 'active' : 'suspended',
    balance: 0,
    avatar: user.avatar || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  const totalPages = Math.ceil(total / limit);

  return {
    users: transformedUsers,
    total,
    page,
    limit,
    totalPages,
  };
};

/**
 * دریافت اطلاعات یک کاربر
 */
export const getUserByIdService = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.isActive ? 'active' : 'suspended',
    balance: 0, // TODO: Get from wallet service
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    stats: user.stats,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * ویرایش کاربر
 */
export const updateUserService = async (userId: string, updates: any) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Map frontend status to backend isActive
  if (updates.status) {
    updates.isActive = updates.status === 'active';
    delete updates.status;
  }

  // Don't allow updating sensitive fields
  delete updates.password;
  delete updates.id;

  // Update user
  await user.update(updates);

  return {
    id: user.id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.isActive ? 'active' : 'suspended',
    balance: 0,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * حذف کاربر
 */
export const deleteUserService = async (userId: string) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Don't allow deleting admin
  if (user.role === 'admin') {
    throw new Error('Cannot delete admin user');
  }

  await user.destroy();

  return true;
};
