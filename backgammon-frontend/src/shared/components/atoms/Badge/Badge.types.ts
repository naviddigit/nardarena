/**
 * Badge Component - Type Definitions
 * تعاریف تایپ کامپوننت بج
 * 
 * Badge = نشان کوچک برای نمایش وضعیت، شماره، یا برچسب
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Type definitions only
 * - Open/Closed: Easy to extend with new variants
 */

// Badge Variants - حالت‌های مختلف بج
export type BadgeVariant = 
  | 'solid'      // پر رنگ - برای نمایش عادی
  | 'outline'    // خطی - برای حالت ثانویه
  | 'dot'        // نقطه - برای نشانگر کوچک
  | 'subtle';    // ملایم - برای پس‌زمینه کم‌رنگ

// Badge Colors - رنگ‌های بج
export type BadgeColor = 
  | 'primary'    // آبی - پیش‌فرض
  | 'success'    // سبز - موفقیت، آنلاین
  | 'danger'     // قرمز - خطر، آفلاین
  | 'warning'    // زرد - هشدار
  | 'info'       // آبی روشن - اطلاعات
  | 'gray'       // خاکستری - خنثی
  | 'purple'     // بنفش - ویژه، پرمیوم
  | 'gradient';  // گرادیانت - برای حالت خاص

// Badge Sizes - سایزهای بج
export type BadgeSize = 
  | 'xs'   // خیلی کوچک
  | 'sm'   // کوچک
  | 'md'   // متوسط
  | 'lg';  // بزرگ

// Badge Position - موقعیت بج (برای استفاده در کنار المان‌های دیگر)
export type BadgePosition = 
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

/**
 * Badge Component Props
 * پراپ‌های کامپوننت بج
 */
export interface BadgeProps {
  /** Badge content - محتوای بج (متن یا عدد) */
  children?: React.ReactNode;
  
  /** Badge variant - نوع بج */
  variant?: BadgeVariant;
  
  /** Badge color - رنگ بج */
  color?: BadgeColor;
  
  /** Badge size - سایز بج */
  size?: BadgeSize;
  
  /** Show as dot only (no text) - نمایش فقط نقطه */
  dot?: boolean;
  
  /** Show pulse animation - انیمیشن پالس */
  pulse?: boolean;
  
  /** Removable badge with close button - قابل حذف */
  removable?: boolean;
  
  /** Icon to show before text - آیکون قبل از متن */
  icon?: React.ReactNode;
  
  /** Click handler - رویداد کلیک */
  onClick?: () => void;
  
  /** Remove handler - رویداد حذف */
  onRemove?: () => void;
  
  /** Custom class name - کلاس سفارشی */
  className?: string;
  
  /** Make badge rounded - گرد کردن کامل */
  rounded?: boolean;
}

/**
 * Badge Size Configuration
 * پیکربندی سایزها
 */
export const BADGE_SIZES: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-xs',     // 12px text
  sm: 'px-2 py-0.5 text-xs',       // 12px text
  md: 'px-2.5 py-1 text-sm',       // 14px text
  lg: 'px-3 py-1.5 text-base',     // 16px text
};

/**
 * Badge Dot Size Configuration
 * پیکربندی سایز نقطه
 */
export const DOT_SIZES: Record<BadgeSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

/**
 * Badge Color Configuration - Solid Variant
 * پیکربندی رنگ‌ها - حالت پر
 */
export const SOLID_COLORS: Record<BadgeColor, string> = {
  primary: 'bg-primary-500 text-white dark:bg-primary-600',
  success: 'bg-green-500 text-white dark:bg-green-600',
  danger: 'bg-red-500 text-white dark:bg-red-600',
  warning: 'bg-yellow-500 text-white dark:bg-yellow-600',
  info: 'bg-blue-500 text-white dark:bg-blue-600',
  gray: 'bg-gray-500 text-white dark:bg-gray-600',
  purple: 'bg-purple-500 text-white dark:bg-purple-600',
  gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};

/**
 * Badge Color Configuration - Outline Variant
 * پیکربندی رنگ‌ها - حالت خطی
 */
export const OUTLINE_COLORS: Record<BadgeColor, string> = {
  primary: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400',
  success: 'border-2 border-green-500 text-green-600 dark:text-green-400',
  danger: 'border-2 border-red-500 text-red-600 dark:text-red-400',
  warning: 'border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400',
  info: 'border-2 border-blue-500 text-blue-600 dark:text-blue-400',
  gray: 'border-2 border-gray-500 text-gray-600 dark:text-gray-400',
  purple: 'border-2 border-purple-500 text-purple-600 dark:text-purple-400',
  gradient: 'border-2 border-purple-500 text-purple-600 dark:text-purple-400',
};

/**
 * Badge Color Configuration - Subtle Variant
 * پیکربندی رنگ‌ها - حالت ملایم
 */
export const SUBTLE_COLORS: Record<BadgeColor, string> = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  gradient: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300',
};
