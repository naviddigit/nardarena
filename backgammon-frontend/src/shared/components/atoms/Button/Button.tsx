import React from 'react';
import { motion } from 'framer-motion';
import { ButtonProps, buttonVariants, buttonSizes, baseButtonStyles } from './Button.types';

/**
 * Loading Spinner Component
 * 
 * یک spinner ساده برای نمایش loading state.
 * این را جدا می‌کنیم برای اینکه Single Responsibility داشته باشد.
 */
const LoadingSpinner: React.FC = () => (
  <svg 
    className="animate-spin h-5 w-5" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    aria-label="Loading"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button Component
 * 
 * یک دکمه کامپوننت با قابلیت‌های زیر:
 * - 5 variant مختلف (primary, secondary, outline, ghost, gradient)
 * - 3 size مختلف (sm, md, lg)
 * - پشتیبانی از آیکون چپ و راست
 * - حالت loading
 * - حالت disabled
 * - انیمیشن hover و tap
 * - پشتیبانی کامل از dark mode
 * 
 * @example
 * ```tsx
 * // استفاده ساده
 * <Button>کلیک کنید</Button>
 * 
 * // با variant و size
 * <Button variant="gradient" size="lg">
 *   شروع بازی
 * </Button>
 * 
 * // با icon
 * <Button leftIcon={<Icon />}>
 *   ورود
 * </Button>
 * 
 * // Loading state
 * <Button isLoading={true}>
 *   در حال ارسال...
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...restProps  // بقیه props (onClick, type و...) به button pass می‌شوند
}) => {
  // ترکیب کلاس‌ها بر اساس props
  const variantStyle = buttonVariants[variant];
  const sizeStyle = buttonSizes[size];
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // ترکیب نهایی کلاس‌ها
  const finalClassName = `${baseButtonStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${className}`.trim();
  
  // disabled شود اگر loading است یا خود disabled باشد
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      // انیمیشن‌ها: فقط وقتی enabled است
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      
      className={finalClassName}
      disabled={isDisabled}
      
      // ARIA برای accessibility
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      
      {...(restProps as any)}
    >
      {/* Loading State */}
      {isLoading && <LoadingSpinner />}
      
      {/* Left Icon - فقط وقتی loading نیست */}
      {!isLoading && leftIcon && (
        <span className="inline-flex items-center">
          {leftIcon}
        </span>
      )}
      
      {/* محتوای اصلی */}
      <span>{children}</span>
      
      {/* Right Icon - فقط وقتی loading نیست */}
      {!isLoading && rightIcon && (
        <span className="inline-flex items-center">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};

/**
 * Default export برای راحتی import
 */
export default Button;
