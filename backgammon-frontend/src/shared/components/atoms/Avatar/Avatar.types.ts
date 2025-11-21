/**
 * Avatar Component - Type Definitions
 * تعاریف تایپ کامپوننت آواتار
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Type definitions only
 * - Open/Closed: Easy to extend with new variants
 */

// Avatar Sizes - سایزهای آواتار
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Avatar Shape - شکل آواتار
export type AvatarShape = 'circle' | 'square' | 'rounded';

// Status Indicator - نشانگر وضعیت (آنلاین/آفلاین)
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

// Badge Position - موقعیت بج
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Avatar Component Props
 * پراپ‌های کامپوننت آواتار
 */
export interface AvatarProps {
  /** Image source URL - آدرس تصویر */
  src?: string;
  
  /** Alt text for image - متن جایگزین */
  alt?: string;
  
  /** Initials to show when no image - حروف اول نام برای نمایش */
  initials?: string;
  
  /** Avatar size - سایز آواتار */
  size?: AvatarSize;
  
  /** Avatar shape - شکل آواتار */
  shape?: AvatarShape;
  
  /** Status indicator - نشانگر وضعیت */
  status?: AvatarStatus;
  
  /** Badge position - موقعیت بج */
  badgePosition?: BadgePosition;
  
  /** Show border - نمایش حاشیه */
  bordered?: boolean;
  
  /** Custom class name - کلاس سفارشی */
  className?: string;
  
  /** Click handler - رویداد کلیک */
  onClick?: () => void;
  
  /** Loading state - حالت لودینگ */
  loading?: boolean;
}

/**
 * Avatar Size Configuration
 * پیکربندی سایزها
 */
export const AVATAR_SIZES: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',      // 24px - خیلی کوچک
  sm: 'w-8 h-8 text-sm',      // 32px - کوچک
  md: 'w-10 h-10 text-base',  // 40px - متوسط
  lg: 'w-12 h-12 text-lg',    // 48px - بزرگ
  xl: 'w-16 h-16 text-xl',    // 64px - خیلی بزرگ
  '2xl': 'w-24 h-24 text-3xl' // 96px - فوق بزرگ
};

/**
 * Avatar Shape Configuration
 * پیکربندی شکل‌ها
 */
export const AVATAR_SHAPES: Record<AvatarShape, string> = {
  circle: 'rounded-full',   // دایره کامل
  square: 'rounded-none',   // مربع بدون گرد شدن
  rounded: 'rounded-lg'     // گرد شده
};

/**
 * Status Badge Configuration
 * پیکربندی بج وضعیت
 */
export const STATUS_COLORS: Record<Exclude<AvatarStatus, 'none'>, string> = {
  online: 'bg-green-500',      // آنلاین - سبز
  offline: 'bg-gray-400',      // آفلاین - خاکستری
  busy: 'bg-red-500',          // مشغول - قرمز
  away: 'bg-yellow-500'        // دور - زرد
};

/**
 * Badge Position Configuration
 * پیکربندی موقعیت بج
 */
export const BADGE_POSITIONS: Record<BadgePosition, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0'
};

/**
 * Badge Size Configuration based on Avatar Size
 * پیکربندی سایز بج براساس سایز آواتار
 */
export const BADGE_SIZES: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 border',
  sm: 'w-2 h-2 border',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-4 h-4 border-2',
  '2xl': 'w-5 h-5 border-2'
};
