/**
 * Admin Panel Page
 * صفحه پنل مدیریت
 */

import { useState } from 'react';
import ButtonDemo from '@features/demo/pages/ButtonDemo';
import InputDemo from '@features/demo/pages/InputDemo';
import AvatarDemo from '@features/demo/pages/AvatarDemo';
import BadgeDemo from '@features/demo/pages/BadgeDemo';
import SpinnerDemo from '@features/demo/pages/SpinnerDemo';
import DividerDemo from '@features/demo/pages/DividerDemo';
import CardDemo from '@features/demo/pages/CardDemo';
import TestPanel from '@features/demo/pages/TestPanel';
import APITestingPanel from './APITestingPanel';
import { DemoNav } from '@features/demo/components/DemoNav';
import { DebugPanel } from '@shared/components/organisms/DebugPanel';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import { useTheme } from '@/app/providers';

function AdminPanel() {
  const [currentDemo, setCurrentDemo] = useState('api-test');
  const { theme } = useTheme();

  const renderDemo = () => {
    switch (currentDemo) {
      case 'api-test':
        return <APITestingPanel />;
      case 'button':
        return <ButtonDemo />;
      case 'input':
        return <InputDemo />;
      case 'avatar':
        return <AvatarDemo />;
      case 'badge':
        return <BadgeDemo />;
      case 'spinner':
        return <SpinnerDemo />;
      case 'divider':
        return <DividerDemo />;
      case 'card':
        return <CardDemo />;
      case 'test':
        return <TestPanel />;
      default:
        return <APITestingPanel />;
    }
  };

  const bgColors = {
    dark: 'bg-dark-bg',
    light: 'bg-light-bg',
    gaming: 'bg-gaming-bg'
  };

  return (
    <div className={`min-h-screen transition-colors ${bgColors[theme]}`}>
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400">Component tests and system monitoring</p>
        </div>
        
        <DemoNav currentDemo={currentDemo} onNavigate={setCurrentDemo} />
        {renderDemo()}
        <DebugPanel />
      </div>
    </div>
  );
}

export default AdminPanel;
