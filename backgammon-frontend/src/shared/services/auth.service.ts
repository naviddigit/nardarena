/**
 * Auth Service
 * سرویس احراز هویت (لاگین، ثبت‌نام، خروج)
 */

import apiClient from './api.service';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthTokens,
} from '../types';

/**
 * لاگین کاربر
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    credentials
  );
  
  const data = response.data.data;
  
  if (!data) {
    throw new Error('خطا در دریافت اطلاعات لاگین');
  }
  
  // ذخیره token و user در localStorage
  localStorage.setItem('accessToken', data.tokens.accessToken);
  localStorage.setItem('refreshToken', data.tokens.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
};

/**
 * ثبت‌نام کاربر جدید
 */
export const register = async (userData: RegisterRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/register',
    userData
  );
  
  const data = response.data.data;
  
  if (!data) {
    throw new Error('خطا در ثبت‌نام');
  }
  
  // ذخیره token و user در localStorage
  localStorage.setItem('accessToken', data.tokens.accessToken);
  localStorage.setItem('refreshToken', data.tokens.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
};

/**
 * خروج از حساب کاربری
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // پاک کردن localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Redirect به صفحه لاگین
    window.location.href = '/login';
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (): Promise<AuthTokens> => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }
  
  const response = await apiClient.post<ApiResponse<AuthTokens>>(
    '/auth/refresh',
    { refreshToken }
  );
  
  const data = response.data.data;
  
  if (!data) {
    throw new Error('خطا در تمدید token');
  }
  
  // ذخیره token جدید
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  
  return data;
};

/**
 * گرفتن اطلاعات کاربر فعلی
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * چک کردن لاگین بودن
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

/**
 * چک کردن نقش کاربر
 */
export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};

/**
 * تغییر رمز عبور
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  await apiClient.post('/auth/change-password', {
    currentPassword,
    newPassword,
  });
};

/**
 * درخواست بازیابی رمز عبور
 */
export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

/**
 * تنظیم رمز عبور جدید با token
 */
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  await apiClient.post('/auth/reset-password', {
    token,
    newPassword,
  });
};
