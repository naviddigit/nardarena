/**
 * Toggle Component
 * کامپوننت استاندارد Toggle/Switch - قابل استفاده در همه صفحات
 */

import React from 'react';

interface ToggleProps {
  /** وضعیت فعال/غیرفعال */
  checked: boolean;
  
  /** تابع تغییر وضعیت */
  onChange: (checked: boolean) => void;
  
  /** غیرفعال کردن toggle */
  disabled?: boolean;
  
  /** سایز toggle */
  size?: 'sm' | 'md' | 'lg';
  
  /** رنگ toggle در حالت فعال */
  color?: 'green' | 'purple' | 'blue';
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  color = 'green',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  };

  const knobSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const knobTranslateClasses = {
    sm: 'translate-x-5',
    md: 'translate-x-6',
    lg: 'translate-x-8',
  };

  // Color classes
  const colorClasses = {
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors
        ${sizeClasses[size]}
        ${checked ? colorClasses[color] : 'bg-gray-300 dark:bg-gray-600'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block transform rounded-full bg-white transition-transform
          ${knobSizeClasses[size]}
          ${checked ? knobTranslateClasses[size] : 'translate-x-1'}
        `}
      />
    </button>
  );
};
