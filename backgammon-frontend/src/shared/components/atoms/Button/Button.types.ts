import React from 'react';

/**
 * Button Component Props
 * 
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * 
 * این interface تمام props های ممکن برای Button را تعریف می‌کند.
 * از HTMLButtonElement ارث می‌برد، یعنی تمام props استاندارد HTML button را دارد.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * نوع ظاهری دکمه
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  
  /**
   * اندازه دکمه
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * آیا دکمه تمام عرض را بگیرد؟
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * حالت لودینگ - وقتی true است، spinner نمایش داده می‌شود
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * آیکون سمت چپ متن
   */
  leftIcon?: React.ReactNode;
  
  /**
   * آیکون سمت راست متن
   */
  rightIcon?: React.ReactNode;
  
  /**
   * محتوای دکمه (متن یا JSX)
   */
  children: React.ReactNode;
}

/**
 * Style Variant Configuration
 * 
 * این object تمام استایل‌های variant ها را نگه می‌دارد.
 * طبق اصل Open/Closed: برای اضافه کردن variant جدید، فقط یک خط اضافه می‌کنیم.
 */
export const buttonVariants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
  outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950',
  ghost: 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950',
  gradient: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50',
};

/**
 * Size Configuration
 * 
 * اندازه‌های مختلف برای دکمه.
 * شامل padding, font-size و... است.
 */
export const buttonSizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

/**
 * Base styles که همه دکمه‌ها دارند
 */
export const baseButtonStyles = 'rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
