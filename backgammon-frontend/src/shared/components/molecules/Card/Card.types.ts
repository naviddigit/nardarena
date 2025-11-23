/**
 * Card Component - Type Definitions
 * تعاریف تایپ کامپوننت کارت
 * 
 * Card = کارت برای نمایش محتوای گروه‌بندی شده
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Type definitions only
 * - Open/Closed: Easy to extend with new variants
 */

import { ReactNode } from 'react';

// Card Variants - حالت‌های مختلف
export type CardVariant = 
  | 'elevated'    // با سایه
  | 'outlined'    // با border
  | 'filled';     // با پس‌زمینه رنگی

// Card Sizes - سایزها
export type CardSize = 
  | 'sm'    // کوچک
  | 'md'    // متوسط
  | 'lg';   // بزرگ

/**
 * Card Component Props
 * پراپ‌های کامپوننت کارت
 */
export interface CardProps {
  /** Card variant - نوع کارت */
  variant?: CardVariant;
  
  /** Card size - سایز */
  size?: CardSize;
  
  /** Card header content - محتوای هدر */
  header?: ReactNode;
  
  /** Card body content - محتوای بدنه */
  children?: ReactNode;
  
  /** Card footer content - محتوای فوتر */
  footer?: ReactNode;
  
  /** Clickable card - کارت کلیک‌پذیر */
  clickable?: boolean;
  
  /** Click handler - رویداد کلیک */
  onClick?: () => void;
  
  /** Hoverable effect - افکت hover */
  hoverable?: boolean;
  
  /** Loading state - حالت لودینگ */
  loading?: boolean;
  
  /** Custom class name - کلاس سفارشی */
  className?: string;
  
  /** Full width - تمام عرض */
  fullWidth?: boolean;
  
  /** Image on top - تصویر بالای کارت */
  image?: string;
  
  /** Image alt text - متن جایگزین تصویر */
  imageAlt?: string;
}

/**
 * Card Size Configuration
 * پیکربندی سایزها
 */
export const CARD_SIZES: Record<CardSize, string> = {
  sm: 'p-4',      // padding کوچک
  md: 'p-6',      // padding متوسط
  lg: 'p-8',      // padding بزرگ
};

/**
 * Card Header Size Configuration
 * پیکربندی سایز هدر
 */
export const CARD_HEADER_SIZES: Record<CardSize, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

/**
 * Card Variant Configuration - Login page style
 * استایل یکپارچه مثل صفحه Login
 */
export const CARD_VARIANTS = {
  elevated: `
    backdrop-blur-2xl
    border shadow-lg
    bg-white/10 dark:bg-white/5
    border-gray-300/30 dark:border-white/10
    transition-all duration-200
  `,
  outlined: `
    backdrop-blur-2xl
    border shadow-lg
    bg-white/10 dark:bg-white/5
    border-gray-300/30 dark:border-white/10
    transition-all duration-200
  `,
  filled: `
    backdrop-blur-2xl
    border shadow-lg
    bg-white/10 dark:bg-white/5
    border-gray-300/30 dark:border-white/10
  `,
};
