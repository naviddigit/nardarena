/**
 * Card Component
 * کامپوننت کارت - برای نمایش محتوای گروه‌بندی شده
 * 
 * Features - امکانات:
 * - 3 variants (elevated, outlined, filled)
 * - 3 sizes (sm, md, lg)
 * - Header, body, footer sections
 * - Optional image
 * - Clickable and hoverable
 * - Loading state
 * - Fully responsive
 * 
 * SOLID Principles:
 * - Single Responsibility: Displays grouped content
 * - Open/Closed: Easy to add new variants
 * - Composition: Header, body, footer as children
 */

import { motion } from 'framer-motion';
import {
  CardProps,
  CARD_SIZES,
  CARD_HEADER_SIZES,
  CARD_VARIANTS,
} from './Card.types';
import { Spinner } from '@shared/components/atoms/Spinner';

/**
 * Card Component
 * @param props - Card properties
 */
export const Card = ({
  variant = 'elevated',
  size = 'md',
  header,
  children,
  footer,
  clickable = false,
  onClick,
  hoverable = false,
  loading = false,
  className = '',
  fullWidth = false,
  image,
  imageAlt = 'Card image',
}: CardProps) => {
  const sizeClasses = CARD_SIZES[size];
  const headerSizeClasses = CARD_HEADER_SIZES[size];
  const variantClasses = CARD_VARIANTS[variant];

  const clickableClasses = (clickable || onClick) 
    ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' 
    : '';

  const hoverableClasses = hoverable 
    ? 'hover:shadow-2xl transition-all duration-300' 
    : '';

  const widthClasses = fullWidth ? 'w-full' : '';

  // Loading state - حالت لودینگ
  if (loading) {
    return (
      <div
        className={`
          ${variantClasses}
          ${sizeClasses}
          ${widthClasses}
          rounded-3xl
          flex items-center justify-center
          min-h-[200px]
          ${className}
        `}
      >
        <Spinner size="lg" label="Loading..." showLabel />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        ${variantClasses}
        ${clickableClasses}
        ${hoverableClasses}
        ${widthClasses}
        rounded-3xl
        overflow-hidden
        ${className}
      `}
    >
      {/* Image - تصویر */}
      {image && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Header - هدر */}
      {header && (
        <div className={`${sizeClasses} pb-0`}>
          <div className={`${headerSizeClasses} font-bold text-gray-900 dark:text-white`}>
            {header}
          </div>
          <div className="mt-2 border-b border-gray-300/30 dark:border-white/10" />
        </div>
      )}

      {/* Body - بدنه */}
      <div className={`${sizeClasses} ${header ? 'pt-4' : ''} ${footer ? 'pb-4' : ''}`}>
        <div className="text-gray-900 dark:text-white">
          {children}
        </div>
      </div>

      {/* Footer - فوتر */}
      {footer && (
        <>
          <div className="border-t border-gray-300/30 dark:border-white/10" />
          <div className={`${sizeClasses} pt-0`}>
            {footer}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Card;
