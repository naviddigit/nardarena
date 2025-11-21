/**
 * Badge Demo Page
 * صفحه نمایش کامپوننت بج
 * 
 * Showcases all Badge variants, colors, sizes, and features
 * نمایش همه حالت‌ها، رنگ‌ها، سایزها و امکانات بج
 */

import { useState } from 'react';
import { Badge } from '@shared/components/atoms/Badge';
import { Avatar } from '@shared/components/atoms/Avatar';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export const BadgeDemo = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Vite']);

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header - هدر */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Badge Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Small badge component for status, labels, and counters
          </p>
        </div>

        {/* Variants - حالت‌های مختلف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variants - حالت‌های مختلف
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="solid" color="primary">Solid</Badge>
            <Badge variant="outline" color="primary">Outline</Badge>
            <Badge variant="subtle" color="primary">Subtle</Badge>
            <Badge variant="dot" color="primary" dot />
          </div>
        </section>

        {/* Colors - رنگ‌ها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Colors - رنگ‌ها (Solid)
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge color="primary">Primary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="gray">Gray</Badge>
            <Badge color="purple">Purple</Badge>
            <Badge color="gradient">Gradient</Badge>
          </div>
        </section>

        {/* Outline Colors - رنگ‌های خطی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Outline Colors - رنگ‌های خطی
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" color="primary">Primary</Badge>
            <Badge variant="outline" color="success">Success</Badge>
            <Badge variant="outline" color="danger">Danger</Badge>
            <Badge variant="outline" color="warning">Warning</Badge>
            <Badge variant="outline" color="info">Info</Badge>
            <Badge variant="outline" color="gray">Gray</Badge>
            <Badge variant="outline" color="purple">Purple</Badge>
          </div>
        </section>

        {/* Subtle Colors - رنگ‌های ملایم */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Subtle Colors - رنگ‌های ملایم
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="subtle" color="primary">Primary</Badge>
            <Badge variant="subtle" color="success">Success</Badge>
            <Badge variant="subtle" color="danger">Danger</Badge>
            <Badge variant="subtle" color="warning">Warning</Badge>
            <Badge variant="subtle" color="info">Info</Badge>
            <Badge variant="subtle" color="gray">Gray</Badge>
            <Badge variant="subtle" color="purple">Purple</Badge>
          </div>
        </section>

        {/* Sizes - سایزها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sizes - سایزها
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge size="xs" color="primary">Extra Small</Badge>
            <Badge size="sm" color="primary">Small</Badge>
            <Badge size="md" color="primary">Medium</Badge>
            <Badge size="lg" color="primary">Large</Badge>
          </div>
        </section>

        {/* Rounded - گرد */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Rounded Badges - بج‌های گرد
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge color="primary" rounded>Rounded</Badge>
            <Badge color="success" rounded>Success</Badge>
            <Badge color="danger" rounded>Danger</Badge>
            <Badge variant="outline" color="purple" rounded>Outline</Badge>
            <Badge variant="subtle" color="info" rounded>Subtle</Badge>
          </div>
        </section>

        {/* Dot Badges - بج‌های نقطه‌ای */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Dot Badges - بج‌های نقطه‌ای
          </h2>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge dot color="success" size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge dot color="danger" size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge dot color="warning" size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Away</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge dot color="info" size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Busy</span>
            </div>
          </div>
        </section>

        {/* Pulse Animation - انیمیشن پالس */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Pulse Animation - انیمیشن پالس
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge color="success" pulse>Live</Badge>
            <Badge color="danger" pulse>Recording</Badge>
            <Badge dot color="success" pulse size="md" />
            <div className="flex items-center gap-2">
              <Badge dot color="success" pulse size="sm" />
              <span className="text-gray-700 dark:text-gray-300">Currently Online</span>
            </div>
          </div>
        </section>

        {/* With Icons - با آیکون */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            With Icons - با آیکون
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge 
              color="success" 
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              }
            >
              Verified
            </Badge>
            <Badge 
              color="purple" 
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            >
              Premium
            </Badge>
            <Badge 
              color="info" 
              variant="outline"
              icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              }
            >
              Info
            </Badge>
          </div>
        </section>

        {/* Removable Tags - تگ‌های قابل حذف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Removable Tags - تگ‌های قابل حذف
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the X button to remove tags
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge
                key={tag}
                color="primary"
                variant="subtle"
                removable
                onRemove={() => removeTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {tags.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">All tags removed!</p>
            )}
          </div>
        </section>

        {/* Clickable Badges - بج‌های کلیک‌پذیر */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Clickable Badges - بج‌های کلیک‌پذیر
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge color="primary" onClick={() => alert('Badge clicked!')}>
              Click me
            </Badge>
            <Badge 
              color="success" 
              variant="outline"
              onClick={() => alert('Success clicked!')}
            >
              Action
            </Badge>
          </div>
        </section>

        {/* Real World Examples - مثال‌های واقعی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples - مثال‌های واقعی
          </h2>

          <div className="space-y-6">
            {/* User with Status Badge */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Avatar
                src="https://i.pravatar.cc/150?img=25"
                size="lg"
                alt="User"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                  <Badge color="success" size="xs">Online</Badge>
                  <Badge color="purple" size="xs" variant="subtle">Premium</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Professional Player</p>
              </div>
            </div>

            {/* Notification Button with Badge */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <Badge 
                  color="danger" 
                  size="xs" 
                  rounded
                  className="absolute -top-1 -right-1"
                >
                  5
                </Badge>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Notifications with badge counter</span>
            </div>

            {/* Game Card with Badges */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Backgammon Championship</h3>
                <Badge color="success" pulse size="xs">Live</Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="subtle" color="info" size="xs">Tournament</Badge>
                <Badge variant="subtle" color="purple" size="xs">Premium</Badge>
                <Badge variant="subtle" color="warning" size="xs">50 Players</Badge>
                <Badge variant="outline" color="gray" size="xs">Prize: $1000</Badge>
              </div>
            </div>

            {/* Message with Status */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar
                  src="https://i.pravatar.cc/150?img=26"
                  size="md"
                  alt="User"
                />
                <Badge 
                  dot 
                  color="success" 
                  pulse
                  size="sm"
                  className="absolute bottom-0 right-0"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">Sarah Smith</span>
                  <Badge color="success" size="xs" variant="subtle">Active</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last seen just now</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BadgeDemo;
