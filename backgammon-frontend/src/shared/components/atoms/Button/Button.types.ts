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
  primary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-surface-elevated hover:bg-surface text-text-primary border border-border-color',
  outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600/10 active:bg-purple-600/20',
  ghost: 'text-purple-600 hover:bg-purple-600/10 active:bg-purple-600/20',
  gradient: 'bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/30',
};

/**
 * Size Configuration - Standardized spacing
 */
export const buttonSizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
};

/**
 * Base styles - Clean & Consistent
 */
export const baseButtonStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';
