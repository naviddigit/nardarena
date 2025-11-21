/**
 * Spinner Demo Page
 * صفحه نمایش کامپوننت اسپینر
 * 
 * Showcases all Spinner variants, sizes, colors, and use cases
 * نمایش همه حالت‌ها، سایزها، رنگ‌ها و موارد استفاده اسپینر
 */

import { useState } from 'react';
import { Spinner } from '@shared/components/atoms/Spinner';
import { Button } from '@shared/components/atoms/Button';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export const SpinnerDemo = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleFullScreenDemo = () => {
    setShowFullScreen(true);
    setTimeout(() => setShowFullScreen(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <ThemeToggle />
      
      {/* Full Screen Spinner Demo */}
      {showFullScreen && (
        <Spinner
          fullScreen
          variant="circle"
          size="xl"
          color="primary"
          label="Loading..."
          showLabel
        />
      )}

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header - هدر */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Spinner Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading spinner component with multiple variants and animations
          </p>
        </div>

        {/* Variants - انواع مختلف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variants - انواع مختلف
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <Spinner variant="circle" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Circle</p>
            </div>
            <div className="text-center">
              <Spinner variant="ring" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Ring</p>
            </div>
            <div className="text-center">
              <Spinner variant="dots" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dots</p>
            </div>
            <div className="text-center">
              <Spinner variant="pulse" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Pulse</p>
            </div>
            <div className="text-center">
              <Spinner variant="bars" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Bars</p>
            </div>
          </div>
        </section>

        {/* Sizes - سایزها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sizes - سایزها
          </h2>
          <div className="flex items-end gap-8 flex-wrap">
            <div className="text-center">
              <Spinner size="xs" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">XS (16px)</p>
            </div>
            <div className="text-center">
              <Spinner size="sm" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">SM (20px)</p>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">MD (32px)</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">LG (48px)</p>
            </div>
            <div className="text-center">
              <Spinner size="xl" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">XL (64px)</p>
            </div>
          </div>
        </section>

        {/* Colors - رنگ‌ها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Colors - رنگ‌ها
          </h2>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <Spinner color="primary" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Primary</p>
            </div>
            <div className="text-center">
              <Spinner color="success" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Success</p>
            </div>
            <div className="text-center">
              <Spinner color="danger" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Danger</p>
            </div>
            <div className="text-center">
              <Spinner color="warning" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Warning</p>
            </div>
            <div className="text-center">
              <Spinner color="gray" size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Gray</p>
            </div>
            <div className="text-center bg-gray-900 dark:bg-gray-700 p-4 rounded-lg">
              <Spinner color="white" size="lg" />
              <p className="text-sm text-white mt-2">White</p>
            </div>
          </div>
        </section>

        {/* With Labels - با متن */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            With Labels - با متن
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <Spinner size="lg" label="Loading..." showLabel />
            <Spinner variant="dots" size="lg" label="Please wait..." showLabel />
            <Spinner variant="pulse" size="lg" label="Processing..." showLabel />
            <Spinner variant="bars" size="lg" color="success" label="Uploading..." showLabel />
          </div>
        </section>

        {/* Centered - وسط‌چین */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Centered in Container - وسط‌چین در کانتینر
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[200px]">
            <Spinner centered variant="ring" size="lg" label="Loading data..." showLabel />
          </div>
        </section>

        {/* Full Screen Demo - نمایش تمام صفحه */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Full Screen Spinner - اسپینر تمام صفحه
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the button to see full screen loading spinner (3 seconds)
          </p>
          <Button onClick={handleFullScreenDemo}>
            Show Full Screen Spinner
          </Button>
        </section>

        {/* Different Variants with Colors - ترکیب‌های مختلف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variant + Color Combinations - ترکیب‌های مختلف
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Spinner variant="circle" color="primary" size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Circle + Primary</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Spinner variant="ring" color="success" size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Ring + Success</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Spinner variant="dots" color="danger" size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Dots + Danger</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Spinner variant="pulse" color="warning" size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Pulse + Warning</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Spinner variant="bars" color="gradient" size="lg" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Bars + Gradient</p>
            </div>
          </div>
        </section>

        {/* Real World Examples - مثال‌های واقعی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples - مثال‌های واقعی
          </h2>

          <div className="space-y-6">
            {/* Button with Spinner */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Button Loading State
              </h3>
              <div className="flex gap-4 flex-wrap">
                <Button isLoading>
                  Loading...
                </Button>
                <Button variant="secondary" isLoading>
                  Processing
                </Button>
                <Button variant="outline" isLoading>
                  Saving
                </Button>
              </div>
            </div>

            {/* Card Loading State */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Card Loading State
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                <Spinner centered variant="dots" size="lg" label="Loading game data..." showLabel />
              </div>
            </div>

            {/* Inline Loading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Inline Loading Text
              </h3>
              <div className="flex items-center gap-3">
                <Spinner size="sm" variant="circle" />
                <span className="text-gray-700 dark:text-gray-300">Fetching user data...</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Spinner size="sm" variant="dots" color="success" />
                <span className="text-gray-700 dark:text-gray-300">Connected to server</span>
              </div>
            </div>

            {/* Page Loading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Page Loading State
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[300px] flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Spinner variant="ring" size="xl" color="primary" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tournament data...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SpinnerDemo;
