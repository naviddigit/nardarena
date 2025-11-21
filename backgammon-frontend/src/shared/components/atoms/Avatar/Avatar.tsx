/**
 * Avatar Component
 * کامپوننت آواتار - نمایش تصویر پروفایل کاربر
 * 
 * Features - امکانات:
 * - Multiple sizes (6 sizes from xs to 2xl)
 * - Multiple shapes (circle, square, rounded)
 * - Status indicator (online, offline, busy, away)
 * - Fallback to initials when no image
 * - Loading state with skeleton
 * - Border support
 * - Click handler
 * 
 * SOLID Principles:
 * - Single Responsibility: Displays user avatar only
 * - Open/Closed: Easy to extend with new variants via types
 * - Dependency Inversion: Depends on props interface, not implementation
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AvatarProps,
  AVATAR_SIZES,
  AVATAR_SHAPES,
  STATUS_COLORS,
  BADGE_POSITIONS,
  BADGE_SIZES,
} from './Avatar.types';

/**
 * Avatar Component
 * @param props - Avatar properties
 */
export const Avatar = ({
  src,
  alt = 'User avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status = 'none',
  badgePosition = 'bottom-right',
  bordered = false,
  className = '',
  onClick,
  loading = false,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Build class names - ساخت کلاس‌ها
  const sizeClasses = AVATAR_SIZES[size];
  const shapeClasses = AVATAR_SHAPES[shape];
  const borderClasses = bordered ? 'border-2 border-primary-500 dark:border-primary-400' : '';
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';
  const badgePositionClasses = BADGE_POSITIONS[badgePosition];
  const badgeSizeClasses = BADGE_SIZES[size];

  // Show initials if no image or image failed - نمایش حروف اول در صورت نبود تصویر
  const showInitials = !src || imageError;

  // Get background color for initials - رنگ پس‌زمینه برای حروف اول
  const getInitialsColor = (text?: string): string => {
    if (!text) return 'bg-gray-400 dark:bg-gray-600';
    
    // Generate color based on first character - تولید رنگ براساس حرف اول
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    
    const charCode = text.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    return colors[colorIndex];
  };

  // Loading skeleton - حالت لودینگ
  if (loading) {
    return (
      <div
        className={`
          ${sizeClasses}
          ${shapeClasses}
          bg-gray-200 dark:bg-gray-700
          animate-pulse
          ${className}
        `}
      />
    );
  }

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
    >
      {/* Avatar Container - کانتینر آواتار */}
      <div
        className={`
          ${sizeClasses}
          ${shapeClasses}
          ${borderClasses}
          ${clickableClasses}
          ${showInitials ? getInitialsColor(initials) : 'bg-gray-200 dark:bg-gray-700'}
          overflow-hidden
          flex items-center justify-center
          text-white font-semibold
          relative
        `}
      >
        {showInitials ? (
          // Show initials - نمایش حروف اول
          <span className="select-none uppercase">
            {initials || '?'}
          </span>
        ) : (
          // Show image - نمایش تصویر
          <>
            {/* Loading placeholder - پلیس‌هولدر لودینگ */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            
            <img
              src={src}
              alt={alt}
              className={`
                w-full h-full object-cover
                transition-opacity duration-300
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}
      </div>

      {/* Status Badge - بج وضعیت */}
      {status !== 'none' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
            absolute
            ${badgePositionClasses}
            ${badgeSizeClasses}
            ${STATUS_COLORS[status]}
            ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
            border-white dark:border-gray-900
          `}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )}
    </motion.div>
  );
};

export default Avatar;
