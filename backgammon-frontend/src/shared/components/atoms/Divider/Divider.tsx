/**
 * Divider Component
 * کامپوننت جداکننده - خط جداکننده محتوا
 * 
 * Features - امکانات:
 * - Horizontal and vertical orientation
 * - 4 variants (solid, dashed, dotted, gradient)
 * - 6 colors
 * - 3 thickness levels
 * - Optional text content
 * - Flexible spacing
 * 
 * SOLID Principles:
 * - Single Responsibility: Divides content only
 * - Open/Closed: Easy to add new variants
 * - Dependency Inversion: Depends on props interface
 */

import {
  DividerProps,
  DIVIDER_THICKNESS,
  DIVIDER_VERTICAL_THICKNESS,
  DIVIDER_COLORS,
  DIVIDER_VARIANTS,
  DIVIDER_SPACING,
} from './Divider.types';

/**
 * Divider Component
 * @param props - Divider properties
 */
export const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'default',
  thickness = 'thin',
  children,
  textPosition = 'center',
  spacing = 'md',
  className = '',
  height = 'h-16',
}: DividerProps) => {
  // Get configuration classes
  const thicknessClass = orientation === 'horizontal' 
    ? DIVIDER_THICKNESS[thickness] 
    : DIVIDER_VERTICAL_THICKNESS[thickness];
  
  const colorClass = DIVIDER_COLORS[color];
  const variantClass = DIVIDER_VARIANTS[variant];
  const spacingClass = DIVIDER_SPACING[spacing];

  // Gradient variant - گرادیانت
  if (variant === 'gradient') {
    if (orientation === 'vertical') {
      return (
        <div className={`inline-block ${height} w-1 ${spacingClass} ${className}`}>
          <div className="h-full w-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
        </div>
      );
    }

    return (
      <div className={`w-full h-1 ${spacingClass} ${className}`}>
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>
    );
  }

  // Vertical divider - جداکننده عمودی
  if (orientation === 'vertical') {
    return (
      <div
        className={`
          inline-block
          ${height}
          ${thicknessClass}
          ${colorClass}
          ${variantClass}
          ${className}
        `}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  // Horizontal divider with text - جداکننده افقی با متن
  if (children) {
    return (
      <div
        className={`
          flex items-center
          ${spacingClass}
          ${className}
        `}
        role="separator"
      >
        {/* Left line */}
        {textPosition !== 'left' && (
          <div
            className={`
              flex-1
              ${thicknessClass}
              ${colorClass}
              ${variantClass}
            `}
          />
        )}

        {/* Text content */}
        <div className={`px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap ${textPosition === 'left' ? 'pl-0' : textPosition === 'right' ? 'pr-0' : ''}`}>
          {children}
        </div>

        {/* Right line */}
        {textPosition !== 'right' && (
          <div
            className={`
              flex-1
              ${thicknessClass}
              ${colorClass}
              ${variantClass}
            `}
          />
        )}
      </div>
    );
  }

  // Simple horizontal divider - جداکننده افقی ساده
  return (
    <div
      className={`
        w-full
        ${thicknessClass}
        ${colorClass}
        ${variantClass}
        ${spacingClass}
        ${className}
      `}
      role="separator"
    />
  );
};

export default Divider;
