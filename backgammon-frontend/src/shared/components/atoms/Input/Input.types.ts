import React from 'react';

/**
 * Base Input Props
 * 
 * Props مشترک بین تمام انواع Input
 */
export interface BaseInputProps {
  /**
   * Label بالای input
   */
  label?: string;
  
  /**
   * پیام خطا (اگر وجود داشته باشد input قرمز می‌شود)
   */
  error?: string;
  
  /**
   * متن راهنما زیر input
   */
  helperText?: string;
  
  /**
   * آیکون سمت چپ
   */
  leftIcon?: React.ReactNode;
  
  /**
   * آیکون سمت راست
   */
  rightIcon?: React.ReactNode;
  
  /**
   * آیا تمام عرض را بگیرد؟
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Text Input Props
 * 
 * برای input های متنی (text, email, number, tel)
 */
export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseInputProps {
  /**
   * نوع input
   * @default 'text'
   */
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'password';
}

/**
 * Password Input Props
 * 
 * برای input پسورد که قابلیت show/hide دارد
 */
export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseInputProps {
  // type را از props حذف می‌کنیم چون خودمان مدیریت می‌کنیم
}

/**
 * Textarea Props
 * 
 * برای متن چندخطی
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  /**
   * تعداد خطوط پیش‌فرض
   * @default 4
   */
  rows?: number;
}

/**
 * Style Configuration
 */
export const inputBaseStyles = 'px-4 py-3 rounded-xl transition-all outline-none';

export const inputNormalStyles = 'bg-white dark:bg-white/5 border border-gray-300/50 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400';

export const inputFocusStyles = 'focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 dark:focus:ring-purple-400/10';

export const inputErrorStyles = 'border-red-400 focus:border-red-400 focus:ring-red-400/20';

export const inputDisabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800';
