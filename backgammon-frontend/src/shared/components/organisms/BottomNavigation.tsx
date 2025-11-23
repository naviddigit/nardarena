/**
 * Bottom Navigation
 * منوی پایین - فقط برای موبایل و بعد از لاگین
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  TrophyIcon,
  UserIcon,
  WalletIcon,
  BookIcon,
} from '@shared/components/atoms/Icon';
import { useAuth } from '@features/auth/hooks/useAuth';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // فقط بعد از لاگین نشون بده
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-black/80 backdrop-blur-md border-t border-gray-300 dark:border-gray-700 flex justify-center items-center px-6 py-3 z-30 md:hidden">
      <div className="flex justify-between items-center w-full max-w-md">
        <button 
          onClick={() => navigate('/leaderboard')}
          className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
        >
          <TrophyIcon />
        </button>
        <button 
          onClick={() => navigate('/wallet')}
          className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
        >
          <WalletIcon />
        </button>
        
        <div className="-mt-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg border-4 border-white dark:border-gray-900 hover:scale-110 transition-transform"
          >
            <HomeIcon />
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/profile')}
          className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
        >
          <UserIcon />
        </button>
        <button 
          onClick={() => navigate('/guide')}
          className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
        >
          <BookIcon />
        </button>
      </div>
    </div>
  );
};
