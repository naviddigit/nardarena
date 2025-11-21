/**
 * Avatar Demo Page
 * صفحه نمایش کامپوننت آواتار
 * 
 * Showcases all Avatar variants, sizes, shapes, and states
 * نمایش همه حالت‌ها، سایزها، شکل‌ها و وضعیت‌های آواتار
 */

import { Avatar } from '@shared/components/atoms/Avatar';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export const AvatarDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header - هدر */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Avatar Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            User avatar component with multiple variants and features
          </p>
        </div>

        {/* Sizes - سایزها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sizes - سایزها
          </h2>
          <div className="flex items-end gap-6 flex-wrap">
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=1"
                size="xs"
                alt="Extra Small"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">XS (24px)</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=2"
                size="sm"
                alt="Small"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">SM (32px)</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=3"
                size="md"
                alt="Medium"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">MD (40px)</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=4"
                size="lg"
                alt="Large"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">LG (48px)</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                size="xl"
                alt="Extra Large"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">XL (64px)</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=6"
                size="2xl"
                alt="2X Large"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">2XL (96px)</p>
            </div>
          </div>
        </section>

        {/* Shapes - شکل‌ها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shapes - شکل‌ها
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=7"
                size="xl"
                shape="circle"
                alt="Circle Shape"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Circle</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=8"
                size="xl"
                shape="rounded"
                alt="Rounded Shape"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Rounded</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=9"
                size="xl"
                shape="square"
                alt="Square Shape"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Square</p>
            </div>
          </div>
        </section>

        {/* Status Indicators - نشانگرهای وضعیت */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Status Indicators - نشانگرهای وضعیت
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=10"
                size="lg"
                status="online"
                alt="Online User"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Online</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=11"
                size="lg"
                status="offline"
                alt="Offline User"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Offline</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=12"
                size="lg"
                status="busy"
                alt="Busy User"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Busy</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=13"
                size="lg"
                status="away"
                alt="Away User"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Away</p>
            </div>
          </div>
        </section>

        {/* Badge Positions - موقعیت‌های بج */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Badge Positions - موقعیت‌های بج
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=14"
                size="lg"
                status="online"
                badgePosition="top-right"
                alt="Top Right Badge"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Top Right</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=15"
                size="lg"
                status="online"
                badgePosition="top-left"
                alt="Top Left Badge"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Top Left</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=16"
                size="lg"
                status="online"
                badgePosition="bottom-right"
                alt="Bottom Right Badge"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Bottom Right</p>
            </div>
            <div className="text-center">
              <Avatar
                src="https://i.pravatar.cc/150?img=17"
                size="lg"
                status="online"
                badgePosition="bottom-left"
                alt="Bottom Left Badge"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Bottom Left</p>
            </div>
          </div>
        </section>

        {/* Initials Fallback - حروف اول به عنوان جایگزین */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Initials Fallback - نمایش حروف اول
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <Avatar
                initials="NA"
                size="lg"
                status="online"
                alt="User NA"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">NA</p>
            </div>
            <div className="text-center">
              <Avatar
                initials="JD"
                size="lg"
                status="busy"
                alt="User JD"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">JD</p>
            </div>
            <div className="text-center">
              <Avatar
                initials="SM"
                size="lg"
                status="away"
                alt="User SM"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">SM</p>
            </div>
            <div className="text-center">
              <Avatar
                initials="AB"
                size="lg"
                status="offline"
                alt="User AB"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">AB</p>
            </div>
          </div>
        </section>

        {/* Bordered Avatars - آواتارهای با حاشیه */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Bordered Avatars - آواتارهای با حاشیه
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <Avatar
              src="https://i.pravatar.cc/150?img=18"
              size="lg"
              bordered
              status="online"
              alt="Bordered Avatar"
            />
            <Avatar
              initials="BU"
              size="lg"
              bordered
              status="busy"
              alt="Bordered Initial Avatar"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=19"
              size="lg"
              shape="rounded"
              bordered
              status="away"
              alt="Bordered Rounded Avatar"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=20"
              size="lg"
              shape="square"
              bordered
              status="offline"
              alt="Bordered Square Avatar"
            />
          </div>
        </section>

        {/* Loading State - حالت لودینگ */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Loading State - حالت لودینگ
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <Avatar size="sm" loading />
            <Avatar size="md" loading />
            <Avatar size="lg" loading />
            <Avatar size="xl" loading />
            <Avatar size="lg" shape="rounded" loading />
            <Avatar size="lg" shape="square" loading />
          </div>
        </section>

        {/* Clickable Avatars - آواتارهای کلیک‌پذیر */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Clickable Avatars - آواتارهای کلیک‌پذیر
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Hover over these avatars to see the interaction effect
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            <Avatar
              src="https://i.pravatar.cc/150?img=21"
              size="lg"
              status="online"
              onClick={() => alert('Avatar clicked!')}
              alt="Clickable Avatar"
            />
            <Avatar
              initials="CL"
              size="lg"
              status="busy"
              onClick={() => alert('Initial Avatar clicked!')}
              alt="Clickable Initial Avatar"
            />
          </div>
        </section>

        {/* Real World Examples - مثال‌های واقعی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples - مثال‌های واقعی
          </h2>
          
          {/* User Profile Card - کارت پروفایل کاربر */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Avatar
                src="https://i.pravatar.cc/150?img=22"
                size="lg"
                status="online"
                bordered
                alt="User Profile"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Professional Player</p>
              </div>
            </div>

            {/* Chat List Item - آیتم لیست چت */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Avatar
                src="https://i.pravatar.cc/150?img=23"
                size="md"
                status="away"
                alt="Chat User"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Sarah Smith</h4>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Good game! Let's play again...</p>
              </div>
            </div>

            {/* Leaderboard Item - آیتم جدول امتیازات */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="text-2xl font-bold text-gray-400">1</span>
              <Avatar
                src="https://i.pravatar.cc/150?img=24"
                size="md"
                bordered
                alt="Top Player"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Mike Johnson</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2,450 points</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AvatarDemo;
