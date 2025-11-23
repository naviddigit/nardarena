/**
 * User Service
 * سرویس مدیریت کاربران
 */

import apiClient, { buildUrl } from './api.service';
import type {
  ApiResponse,
  User,
  UserProfile,
  CreateUserDto,
  UpdateUserDto,
  UserFilters,
  PaginatedUsers,
} from '../types';

/**
 * دریافت لیست کاربران (با فیلتر و صفحه‌بندی)
 */
export const getUsers = async (filters?: UserFilters): Promise<PaginatedUsers> => {
  const url = buildUrl('/users', filters as Record<string, unknown>);
  const response = await apiClient.get<ApiResponse<PaginatedUsers>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت لیست کاربران');
  }
  
  return response.data.data;
};

/**
 * دریافت اطلاعات یک کاربر
 */
export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  
  if (!response.data.data) {
    throw new Error('کاربر یافت نشد');
  }
  
  return response.data.data;
};

/**
 * دریافت پروفایل کامل کاربر (با آمار)
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(
    `/users/${userId}/profile`
  );
  
  if (!response.data.data) {
    throw new Error('پروفایل کاربر یافت نشد');
  }
  
  return response.data.data;
};

/**
 * ایجاد کاربر جدید (فقط ادمین)
 */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData);
  
  if (!response.data.data) {
    throw new Error('خطا در ایجاد کاربر');
  }
  
  return response.data.data;
};

/**
 * بروزرسانی اطلاعات کاربر
 */
export const updateUser = async (
  userId: string,
  userData: UpdateUserDto
): Promise<User> => {
  const response = await apiClient.put<ApiResponse<{ user: User }>>(
    `/users/${userId}`,
    userData
  );
  
  return response.data.data.user;
};

/**
 * حذف کاربر
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/users/${userId}`);
};

/**
 * تغییر وضعیت کاربر (فعال/معلق/مسدود)
 */
export const updateUserStatus = async (
  userId: string,
  status: 'active' | 'suspended' | 'banned'
): Promise<User> => {
  const response = await apiClient.patch<ApiResponse<User>>(
    `/users/${userId}/status`,
    { status }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در تغییر وضعیت کاربر');
  }
  
  return response.data.data;
};

/**
 * افزودن/کم کردن موجودی کاربر
 */
export const updateUserBalance = async (
  userId: string,
  amount: number,
  type: 'add' | 'subtract'
): Promise<User> => {
  const response = await apiClient.patch<ApiResponse<User>>(
    `/users/${userId}/balance`,
    { amount, type }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در بروزرسانی موجودی');
  }
  
  return response.data.data;
};

/**
 * آپلود آواتار کاربر
 */
export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<{ avatarUrl: string }> => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await apiClient.post<ApiResponse<{ avatarUrl: string }>>(
    `/users/${userId}/avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در آپلود آواتار');
  }
  
  return response.data.data;
};

/**
 * دریافت اطلاعات کاربر فعلی
 */
export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>('/users/me');
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت پروفایل');
  }
  
  return response.data.data;
};

/**
 * بروزرسانی پروفایل کاربر فعلی
 */
export const updateMyProfile = async (userData: UpdateUserDto): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>('/users/me', userData);
  
  if (!response.data.data) {
    throw new Error('خطا در بروزرسانی پروفایل');
  }
  
  // بروزرسانی localStorage
  const currentUser = localStorage.getItem('user');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    localStorage.setItem('user', JSON.stringify({ ...user, ...response.data.data }));
  }
  
  return response.data.data;
};
