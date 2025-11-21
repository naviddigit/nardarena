/**
 * Divider Demo Page
 * صفحه نمایش کامپوننت جداکننده
 * 
 * Showcases all Divider variants, orientations, colors, and use cases
 * نمایش همه حالت‌ها، جهت‌ها، رنگ‌ها و موارد استفاده جداکننده
 */

import { Divider } from '@shared/components/atoms/Divider';
import { Avatar } from '@shared/components/atoms/Avatar';
import { Badge } from '@shared/components/atoms/Badge';
import { Button } from '@shared/components/atoms/Button';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

export const DividerDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <ThemeToggle />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header - هدر */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Divider Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Divider component for separating content sections
          </p>
        </div>

        {/* Basic Dividers - جداکننده‌های ساده */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Basic Dividers - جداکننده‌های ساده
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Default (Thin)</p>
              <Divider />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Medium</p>
              <Divider thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Thick</p>
              <Divider thickness="thick" />
            </div>
          </div>
        </section>

        {/* Variants - انواع مختلف */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Variants - انواع مختلف
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Solid</p>
              <Divider variant="solid" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Dashed</p>
              <Divider variant="dashed" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Dotted</p>
              <Divider variant="dotted" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Gradient</p>
              <Divider variant="gradient" />
            </div>
          </div>
        </section>

        {/* Colors - رنگ‌ها */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Colors - رنگ‌ها
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Default</p>
              <Divider color="default" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Primary</p>
              <Divider color="primary" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Success</p>
              <Divider color="success" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Danger</p>
              <Divider color="danger" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Warning</p>
              <Divider color="warning" thickness="medium" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Dark</p>
              <Divider color="dark" thickness="medium" />
            </div>
          </div>
        </section>

        {/* With Text - با متن */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Dividers with Text - جداکننده با متن
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Center (Default)</p>
              <Divider textPosition="center">OR</Divider>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Left</p>
              <Divider textPosition="left">Section Title</Divider>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Right</p>
              <Divider textPosition="right">More Options</Divider>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">With Color</p>
              <Divider color="primary" thickness="medium">Important</Divider>
            </div>
          </div>
        </section>

        {/* Vertical Dividers - جداکننده‌های عمودی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Vertical Dividers - جداکننده‌های عمودی
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-gray-700 dark:text-gray-300">Item 1</span>
            <Divider orientation="vertical" height="h-8" />
            <span className="text-gray-700 dark:text-gray-300">Item 2</span>
            <Divider orientation="vertical" height="h-8" thickness="medium" />
            <span className="text-gray-700 dark:text-gray-300">Item 3</span>
            <Divider orientation="vertical" height="h-8" thickness="thick" color="primary" />
            <span className="text-gray-700 dark:text-gray-300">Item 4</span>
          </div>

          <Divider spacing="lg" />

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-gray-700 dark:text-gray-300">Home</span>
            <Divider orientation="vertical" height="h-6" variant="dashed" />
            <span className="text-gray-700 dark:text-gray-300">About</span>
            <Divider orientation="vertical" height="h-6" variant="dashed" />
            <span className="text-gray-700 dark:text-gray-300">Contact</span>
          </div>
        </section>

        {/* Spacing - فاصله‌گذاری */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Spacing - فاصله‌گذاری
          </h2>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Content before</p>
            <Divider spacing="none" thickness="medium" color="primary" />
            <p className="text-gray-600 dark:text-gray-400">No spacing (none)</p>
            
            <Divider spacing="sm" thickness="medium" color="success" />
            <p className="text-gray-600 dark:text-gray-400">Small spacing (sm)</p>
            
            <Divider spacing="md" thickness="medium" color="warning" />
            <p className="text-gray-600 dark:text-gray-400">Medium spacing (md)</p>
            
            <Divider spacing="lg" thickness="medium" color="danger" />
            <p className="text-gray-600 dark:text-gray-400">Large spacing (lg)</p>
          </div>
        </section>

        {/* Real World Examples - مثال‌های واقعی */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Examples - مثال‌های واقعی
          </h2>

          <div className="space-y-8">
            {/* Login Form Example */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Login Form Separator
              </h3>
              <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <Button className="w-full mb-3">Login with Email</Button>
                <Divider>OR</Divider>
                <Button variant="outline" className="w-full">Login with Google</Button>
              </div>
            </div>

            {/* User Profile Card */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                User Profile Sections
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar
                    src="https://i.pravatar.cc/150?img=30"
                    size="lg"
                    status="online"
                    alt="User"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Professional Player</p>
                  </div>
                </div>
                
                <Divider />
                
                <div className="grid grid-cols-3 gap-4 py-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">128</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Games</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">95</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wins</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">74%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                  </div>
                </div>
                
                <Divider />
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge color="success" size="xs">Active</Badge>
                    <Badge color="purple" size="xs" variant="subtle">Premium</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Breadcrumb */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Navigation Breadcrumb
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary-500 cursor-pointer">Home</span>
                <Divider orientation="vertical" height="h-4" />
                <span className="text-primary-500 cursor-pointer">Games</span>
                <Divider orientation="vertical" height="h-4" />
                <span className="text-gray-500 dark:text-gray-400">Tournament</span>
              </div>
            </div>

            {/* Section Headers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Section Headers
              </h3>
              <div className="space-y-4">
                <Divider textPosition="left" color="primary" thickness="medium">
                  Active Games
                </Divider>
                <p className="text-gray-600 dark:text-gray-400">Content for active games...</p>
                
                <Divider textPosition="left" color="success" thickness="medium">
                  Completed Games
                </Divider>
                <p className="text-gray-600 dark:text-gray-400">Content for completed games...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DividerDemo;
