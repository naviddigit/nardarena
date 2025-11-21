/**
 * Divider Component - Type Definitions
 * تعاریف تایپ کامپوننت جداکننده
 * 
 * Divider = خط جداکننده برای تقسیم محتوا
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Type definitions only
 * - Open/Closed: Easy to extend with new variants
 */

// Divider Orientation - جهت جداکننده
export type DividerOrientation = 
  | 'horizontal'  // افقی
  | 'vertical';   // عمودی

// Divider Variant - حالت‌های مختلف
export type DividerVariant = 
  | 'solid'      // خط یکپارچه
  | 'dashed'     // خط چین
  | 'dotted'     // نقطه‌چین
  | 'gradient';  // گرادیانت

// Divider Color - رنگ
export type DividerColor = 
  | 'default'   // خاکستری پیش‌فرض
  | 'primary'   // آبی
  | 'success'   // سبز
  | 'danger'    // قرمز
  | 'warning'   // زرد
  | 'dark';     // تیره

// Divider Thickness - ضخامت
export type DividerThickness = 
  | 'thin'      // نازک (1px)
  | 'medium'    // متوسط (2px)
  | 'thick';    // ضخیم (4px)

// Text Position (for dividers with text) - موقعیت متن
export type DividerTextPosition = 
  | 'left'
  | 'center'
  | 'right';

/**
 * Divider Component Props
 * پراپ‌های کامپوننت جداکننده
 */
export interface DividerProps {
  /** Orientation - جهت */
  orientation?: DividerOrientation;
  
  /** Variant - نوع خط */
  variant?: DividerVariant;
  
  /** Color - رنگ */
  color?: DividerColor;
  
  /** Thickness - ضخامت */
  thickness?: DividerThickness;
  
  /** Text content - متن روی جداکننده */
  children?: React.ReactNode;
  
  /** Text position - موقعیت متن */
  textPosition?: DividerTextPosition;
  
  /** Spacing - فاصله بالا و پایین */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  
  /** Custom class name - کلاس سفارشی */
  className?: string;
  
  /** Custom height for vertical divider - ارتفاع سفارشی برای جداکننده عمودی */
  height?: string;
}

/**
 * Divider Thickness Configuration
 * پیکربندی ضخامت
 */
export const DIVIDER_THICKNESS: Record<DividerThickness, string> = {
  thin: 'border-t',      // 1px
  medium: 'border-t-2',  // 2px
  thick: 'border-t-4',   // 4px
};

/**
 * Divider Vertical Thickness Configuration
 * پیکربندی ضخامت عمودی
 */
export const DIVIDER_VERTICAL_THICKNESS: Record<DividerThickness, string> = {
  thin: 'border-r',      // 1px
  medium: 'border-r-2',  // 2px
  thick: 'border-r-4',   // 4px
};

/**
 * Divider Color Configuration
 * پیکربندی رنگ‌ها
 */
export const DIVIDER_COLORS: Record<DividerColor, string> = {
  default: 'border-gray-300 dark:border-gray-700',
  primary: 'border-primary-500 dark:border-primary-400',
  success: 'border-green-500 dark:border-green-400',
  danger: 'border-red-500 dark:border-red-400',
  warning: 'border-yellow-500 dark:border-yellow-400',
  dark: 'border-gray-700 dark:border-gray-300',
};

/**
 * Divider Variant Configuration
 * پیکربندی نوع خط
 */
export const DIVIDER_VARIANTS: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  gradient: '', // Will be handled separately
};

/**
 * Divider Spacing Configuration
 * پیکربندی فاصله
 */
export const DIVIDER_SPACING = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-8',
};
