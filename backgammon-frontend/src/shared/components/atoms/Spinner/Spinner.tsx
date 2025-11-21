/**
 * Spinner Component
 * کامپوننت اسپینر - انیمیشن لودینگ
 * 
 * Features - امکانات:
 * - 5 variants (circle, dots, pulse, bars, ring)
 * - 5 sizes (xs, sm, md, lg, xl)
 * - 7 colors
 * - Optional loading text
 * - Centered and fullscreen modes
 * 
 * SOLID Principles:
 * - Single Responsibility: Shows loading animation only
 * - Open/Closed: Easy to add new variants
 * - Dependency Inversion: Depends on props interface
 */

import { motion } from 'framer-motion';
import {
  SpinnerProps,
  SPINNER_SIZES,
  SPINNER_COLORS,
  TEXT_COLORS,
  DOT_COLORS,
} from './Spinner.types';

/**
 * Spinner Component
 * @param props - Spinner properties
 */
export const Spinner = ({
  variant = 'circle',
  size = 'md',
  color = 'primary',
  label,
  showLabel = false,
  className = '',
  centered = false,
  fullScreen = false,
}: SpinnerProps) => {
  const sizeClasses = SPINNER_SIZES[size];
  const colorClasses = SPINNER_COLORS[color];
  const textColorClasses = TEXT_COLORS[color];
  const dotColorClasses = DOT_COLORS[color];

  // Circle Spinner (spinning border) - دایره چرخان
  const CircleSpinner = () => (
    <div
      className={`
        ${sizeClasses}
        border-4
        ${colorClasses}
        border-t-transparent
        rounded-full
        animate-spin
      `}
    />
  );

  // Ring Spinner (thicker ring) - حلقه ضخیم
  const RingSpinner = () => (
    <div className="relative">
      <div
        className={`
          ${sizeClasses}
          border-4
          border-gray-200
          dark:border-gray-700
          rounded-full
        `}
      />
      <div
        className={`
          absolute inset-0
          ${sizeClasses}
          border-4
          ${colorClasses}
          border-t-transparent
          border-r-transparent
          rounded-full
          animate-spin
        `}
      />
    </div>
  );

  // Dots Spinner (bouncing dots) - نقاط پرش‌کننده
  const DotsSpinner = () => {
    const dotSize = size === 'xs' ? 'w-1.5 h-1.5' : 
                    size === 'sm' ? 'w-2 h-2' : 
                    size === 'md' ? 'w-3 h-3' : 
                    size === 'lg' ? 'w-4 h-4' : 'w-5 h-5';

    return (
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${dotSize} ${dotColorClasses} rounded-full`}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  };

  // Pulse Spinner (growing/shrinking circle) - دایره پالس
  const PulseSpinner = () => (
    <motion.div
      className={`${sizeClasses} ${dotColorClasses} rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  );

  // Bars Spinner (animated bars) - میله‌های در حال حرکت
  const BarsSpinner = () => {
    const barWidth = size === 'xs' ? 'w-0.5' : 
                     size === 'sm' ? 'w-1' : 
                     size === 'md' ? 'w-1.5' : 
                     size === 'lg' ? 'w-2' : 'w-3';
    
    const barHeight = size === 'xs' ? 'h-4' : 
                      size === 'sm' ? 'h-5' : 
                      size === 'md' ? 'h-8' : 
                      size === 'lg' ? 'h-12' : 'h-16';

    return (
      <div className="flex gap-1 items-end">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`${barWidth} ${barHeight} ${dotColorClasses} rounded-full`}
            animate={{
              scaleY: [1, 0.4, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  };

  // Select spinner variant - انتخاب نوع اسپینر
  const renderSpinner = () => {
    switch (variant) {
      case 'circle':
        return <CircleSpinner />;
      case 'ring':
        return <RingSpinner />;
      case 'dots':
        return <DotsSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      case 'bars':
        return <BarsSpinner />;
      default:
        return <CircleSpinner />;
    }
  };

  // Spinner content - محتوای اسپینر
  const spinnerContent = (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      {renderSpinner()}
      {(showLabel || label) && (
        <p className={`text-sm font-medium ${textColorClasses}`}>
          {label || 'Loading...'}
        </p>
      )}
    </div>
  );

  // Full screen overlay - پوشش تمام صفحه
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
        {spinnerContent}
      </div>
    );
  }

  // Centered in container - وسط‌چین در کانتینر
  if (centered) {
    return (
      <div className="flex items-center justify-center w-full py-8">
        {spinnerContent}
      </div>
    );
  }

  // Default inline - پیش‌فرض
  return spinnerContent;
};

export default Spinner;
