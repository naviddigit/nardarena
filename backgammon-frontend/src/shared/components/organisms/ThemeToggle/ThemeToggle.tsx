import React from 'react';
import { useTheme, type Theme } from '@/app/providers';
import {
  MoonIcon,
  SunIcon,
  GamepadIcon,
} from '@shared/components/atoms/Icon';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { id: 'dark' as Theme, icon: <MoonIcon />, label: 'Dark' },
    { id: 'light' as Theme, icon: <SunIcon />, label: 'Light' },
    { id: 'gaming' as Theme, icon: <GamepadIcon />, label: 'Gaming' },
  ];

  return (
    <div className="absolute top-4 left-4 flex gap-2 z-30">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors text-lg ${
            theme === t.id 
              ? 'bg-purple-500 text-white shadow-lg' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};
