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
    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          className={`
            w-9 h-9 flex items-center justify-center rounded-lg
            transition-all duration-200 text-lg
            ${theme === t.id 
              ? 'bg-purple-600 text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};
