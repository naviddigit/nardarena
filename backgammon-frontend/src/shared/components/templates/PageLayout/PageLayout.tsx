/**
 * Page Layout Component
 * قالب یکپارچه برای تمام صفحات
 * 
 * SOLID Principles:
 * - Single Responsibility: فقط Layout صفحات
 * - Open/Closed: Extendable through props
 * - یکنواختی در تمام صفحات
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@shared/components/atoms/Button';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export interface PageLayoutProps {
  /** عنوان صفحه */
  title: string;
  
  /** نمایش دکمه بازگشت */
  showBackButton?: boolean;
  
  /** مسیر بازگشت (پیش‌فرض: /dashboard) */
  backPath?: string;
  
  /** محتوای صفحه */
  children: React.ReactNode;
  
  /** حداکثر عرض محتوا (پیش‌فرض: 7xl) */
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  
  /** نمایش ThemeToggle */
  showThemeToggle?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  showBackButton = true,
  backPath = '/dashboard',
  children,
  maxWidth = '7xl',
  showThemeToggle = true,
}) => {
  const navigate = useNavigate();

  const maxWidthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 py-4 sm:py-5`}>
          <div className="h-full flex items-center justify-between gap-4">
            {/* Left: Back Button + Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(backPath)}
                  className="flex-shrink-0 !w-9 !h-9 !p-0"
                >
                  <FiArrowLeft className="text-xl" />
                </Button>
              )}
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary truncate">
                {title}
              </h1>
            </div>

            {/* Right: Theme Toggle */}
            {showThemeToggle && (
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-18 pb-8 px-4 sm:px-6">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          {children}
        </div>
      </main>
    </div>
  );
};
