/**
 * API Service - Base Configuration
 * تنظیمات پایه Axios و Interceptors
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from '../types';

/**
 * تنظیمات پیش‌فرض API
 */
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * ایجاد instance اصلی Axios
 */
const apiClient: AxiosInstance = axios.create(API_CONFIG);

/**
 * Request Interceptor
 * افزودن token به header درخواست‌ها
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // گرفتن token از localStorage
    const token = localStorage.getItem('accessToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // لاگ درخواست در development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * مدیریت پاسخ‌ها و خطاها
 */
apiClient.interceptors.response.use(
  (response) => {
    // لاگ پاسخ در development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // مدیریت خطای 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // تلاش برای refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.baseURL}/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken } = response.data.data;
          
          // ذخیره token جدید
          localStorage.setItem('accessToken', accessToken);
          
          // تلاش مجدد با token جدید
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // اگر refresh هم fail شد، کاربر را logout کن
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect به صفحه لاگین
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    // لاگ خطا
    console.error('[API Error]', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    
    // فرمت خطا
    const apiError: ApiError = {
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || error.message || 'خطای نامشخص رخ داد',
      details: error.response?.data?.details,
      timestamp: new Date().toISOString(),
    };
    
    return Promise.reject(apiError);
  }
);

/**
 * Helper function برای ساخت URL با query params
 */
export const buildUrl = (path: string, params?: Record<string, unknown>): string => {
  if (!params) return path;
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};

/**
 * Helper function برای مدیریت خطا
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error as AxiosError<ApiError>;
    return apiError.response?.data?.message || 'خطا در برقراری ارتباط با سرور';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'خطای نامشخص رخ داد';
};

/**
 * Helper function برای استخراج data از ApiResponse
 */
export const unwrapApiResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success || !response.data) {
    throw new Error(response.error || 'خطا در دریافت داده‌ها');
  }
  return response.data;
};

export default apiClient;
