/**
 * Spinner Component - Type Definitions
 * تعاریف تایپ کامپوننت اسپینر (لودینگ)
 * 
 * Spinner = انیمیشن لودینگ برای نمایش حالت در حال بارگذاری
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Type definitions only
 * - Open/Closed: Easy to extend with new variants
 */

// Spinner Variants - انواع اسپینر
export type SpinnerVariant = 
  | 'circle'     // دایره چرخان
  | 'dots'       // نقاط پرش‌کننده
  | 'pulse'      // پالس
  | 'bars'       // میله‌های در حال حرکت
  | 'ring';      // حلقه چرخان

// Spinner Sizes - سایزها
export type SpinnerSize = 
  | 'xs'    // 16px - خیلی کوچک
  | 'sm'    // 20px - کوچک
  | 'md'    // 32px - متوسط
  | 'lg'    // 48px - بزرگ
  | 'xl';   // 64px - خیلی بزرگ

// Spinner Colors - رنگ‌ها
export type SpinnerColor = 
  | 'primary'   // آبی
  | 'white'     // سفید
  | 'gray'      // خاکستری
  | 'success'   // سبز
  | 'danger'    // قرمز
  | 'warning'   // زرد
  | 'gradient'; // گرادیانت

/**
 * Spinner Component Props
 * پراپ‌های کامپوننت اسپینر
 */
export interface SpinnerProps {
  /** Spinner variant - نوع اسپینر */
  variant?: SpinnerVariant;
  
  /** Spinner size - سایز */
  size?: SpinnerSize;
  
  /** Spinner color - رنگ */
  color?: SpinnerColor;
  
  /** Loading text - متن لودینگ */
  label?: string;
  
  /** Show label - نمایش متن */
  showLabel?: boolean;
  
  /** Custom class name - کلاس سفارشی */
  className?: string;
  
  /** Center in container - وسط‌چین در کانتینر */
  centered?: boolean;
  
  /** Full screen overlay - پوشش تمام صفحه */
  fullScreen?: boolean;
}

/**
 * Spinner Size Configuration
 * پیکربندی سایزها
 */
export const SPINNER_SIZES: Record<SpinnerSize, string> = {
  xs: 'w-4 h-4',   // 16px
  sm: 'w-5 h-5',   // 20px
  md: 'w-8 h-8',   // 32px
  lg: 'w-12 h-12', // 48px
  xl: 'w-16 h-16', // 64px
};

/**
 * Spinner Color Configuration
 * پیکربندی رنگ‌ها
 */
export const SPINNER_COLORS: Record<SpinnerColor, string> = {
  primary: 'border-primary-500',
  white: 'border-white',
  gray: 'border-gray-500',
  success: 'border-green-500',
  danger: 'border-red-500',
  warning: 'border-yellow-500',
  gradient: 'border-purple-500',
};

/**
 * Text Color Configuration
 * پیکربندی رنگ متن
 */
export const TEXT_COLORS: Record<SpinnerColor, string> = {
  primary: 'text-primary-600 dark:text-primary-400',
  white: 'text-white',
  gray: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  danger: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  gradient: 'text-purple-600 dark:text-purple-400',
};

/**
 * Dots/Bars Color Configuration (for multi-element variants)
 * پیکربندی رنگ برای نقاط و میله‌ها
 */
export const DOT_COLORS: Record<SpinnerColor, string> = {
  primary: 'bg-primary-500',
  white: 'bg-white',
  gray: 'bg-gray-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
};
