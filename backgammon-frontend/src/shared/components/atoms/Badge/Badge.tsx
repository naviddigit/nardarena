/**
 * Badge Component
 * کامپوننت بج - نشان کوچک برای نمایش وضعیت یا برچسب
 * 
 * Features - امکانات:
 * - 4 variants (solid, outline, dot, subtle)
 * - 8 colors (primary, success, danger, warning, info, gray, purple, gradient)
 * - 4 sizes (xs, sm, md, lg)
 * - Pulse animation for live indicators
 * - Removable with close button
 * - Icon support
 * - Dot-only mode
 * 
 * SOLID Principles:
 * - Single Responsibility: Displays badge only
 * - Open/Closed: Easy to add new variants via configuration
 * - Dependency Inversion: Depends on props interface
 */

import { motion } from 'framer-motion';
import {
  BadgeProps,
  BADGE_SIZES,
  DOT_SIZES,
  SOLID_COLORS,
  OUTLINE_COLORS,
  SUBTLE_COLORS,
} from './Badge.types';

/**
 * Badge Component
 * @param props - Badge properties
 */
export const Badge = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'sm',
  dot = false,
  pulse = false,
  removable = false,
  icon,
  onClick,
  onRemove,
  className = '',
  rounded = false,
}: BadgeProps) => {
  // Get color classes based on variant - رنگ براساس variant
  const getColorClasses = (): string => {
    switch (variant) {
      case 'solid':
        return SOLID_COLORS[color];
      case 'outline':
        return OUTLINE_COLORS[color] + ' bg-transparent';
      case 'subtle':
        return SUBTLE_COLORS[color];
      case 'dot':
        return 'bg-transparent';
      default:
        return SOLID_COLORS[color];
    }
  };

  // Get size classes - سایز
  const sizeClasses = BADGE_SIZES[size];
  const dotSizeClasses = DOT_SIZES[size];

  // Shape classes - شکل
  const shapeClasses = rounded ? 'rounded-full' : 'rounded-md';

  // Clickable classes - کلیک‌پذیر
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';

  // Dot only badge - فقط نقطه
  if (dot) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`
          inline-block
          ${dotSizeClasses}
          rounded-full
          ${SOLID_COLORS[color]}
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
      />
    );
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1
        ${sizeClasses}
        ${shapeClasses}
        ${getColorClasses()}
        ${clickableClasses}
        ${pulse ? 'animate-pulse' : ''}
        font-medium
        whitespace-nowrap
        transition-all
        ${className}
      `}
    >
      {/* Icon - آیکون */}
      {icon && <span className="flex items-center">{icon}</span>}

      {/* Content - محتوا */}
      {children && <span>{children}</span>}

      {/* Remove button - دکمه حذف */}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // جلوگیری از اجرای onClick اصلی
            onRemove?.();
          }}
          className="
            ml-1 -mr-1
            hover:opacity-70
            transition-opacity
            focus:outline-none
          "
          aria-label="Remove badge"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </motion.span>
  );
};

export default Badge;
