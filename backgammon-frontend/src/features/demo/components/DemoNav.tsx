/**
 * Demo Navigation Component
 * کامپوننت منوی ناوبری دموها
 * 
 * برای سوییچ کردن بین صفحات دموی کامپوننت‌ها
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoNavProps {
  currentDemo: string;
  onNavigate: (demo: string) => void;
}

const demos = [
  { id: 'button', name: 'Button', icon: '🔘' },
  { id: 'input', name: 'Input', icon: '📝' },
  { id: 'avatar', name: 'Avatar', icon: '👤' },
  { id: 'badge', name: 'Badge', icon: '🏷️' },
  { id: 'spinner', name: 'Spinner', icon: '⌛' },
  { id: 'divider', name: 'Divider', icon: '➖' },
  { id: 'card', name: 'Card', icon: '🃏' },
];

export const DemoNav = ({ currentDemo, onNavigate }: DemoNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-12 h-12 
          bg-primary-500 hover:bg-primary-600 
          text-white 
          rounded-full 
          shadow-lg 
          flex items-center justify-center
          transition-all
          hover:scale-110
        "
        aria-label="Demo Navigation"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-14 right-0
              bg-white dark:bg-gray-800
              rounded-xl
              shadow-2xl
              overflow-hidden
              min-w-[200px]
              border-2 border-gray-200 dark:border-gray-700
            "
          >
            <div className="p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 py-1">
                Components Demo
              </h3>
            </div>
            
            <div className="py-2">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => {
                    onNavigate(demo.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3
                    flex items-center gap-3
                    transition-colors
                    text-left
                    ${
                      currentDemo === demo.id
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <span className="text-xl">{demo.icon}</span>
                  <span className="font-medium">{demo.name}</span>
                  {currentDemo === demo.id && (
                    <span className="ml-auto text-sm">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {demos.length} Components
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoNav;
