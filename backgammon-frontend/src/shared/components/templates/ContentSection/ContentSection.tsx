/**
 * Content Section Component
 * کامپوننت برای بخش‌های محتوایی صفحه
 * 
 * استفاده: برای گروه‌بندی محتوا با فاصله‌گذاری یکسان
 */

import React from 'react';

export interface ContentSectionProps {
  children: React.ReactNode;
  /** فاصله بین آیتم‌ها */
  spacing?: 'sm' | 'md' | 'lg';
  /** کلاس‌های اضافی */
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  spacing = 'md',
  className = '',
}) => {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  };

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
};
