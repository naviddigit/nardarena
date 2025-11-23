/**
 * Player Dashboard Page
 * صفحه پنل بازیکن - بعد از ورود
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCpu, FiUsers, FiTrendingUp, FiUser, FiDollarSign, FiCreditCard, FiClock, FiLogOut } from 'react-icons/fi';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import { useTheme } from '@/app/providers';
import { useAuth } from '@features/auth/hooks/useAuth';

interface GameOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
}

const GameOption: React.FC<GameOptionProps> = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  disabled = false,
  comingSoon = false 
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative p-6 sm:p-8 rounded-2xl border-2 transition-all w-full h-full min-h-[240px] sm:min-h-[280px] ${
        disabled
          ? 'bg-surface/30 border-border-color cursor-not-allowed opacity-60'
          : 'bg-surface-elevated border-purple-500/30 hover:border-purple-500 hover:shadow-glow-purple'
      }`}
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 text-xs font-semibold bg-warning-500/20 text-warning-500 rounded-full border border-warning-500/50">
          Coming Soon
        </span>
      )}
      
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
        <div className="text-5xl sm:text-6xl text-purple-500">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    </motion.button>
  );
};

function PlayerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handlePlayWithAI = () => {
    navigate('/game/ai');
  };

  const handlePlayWithPlayers = () => {
    navigate('/game/multiplayer');
  };

  const handleTournament = () => {
    navigate('/tournaments');
  };

  const bgColors = {
    dark: 'bg-dark-bg',
    light: 'bg-light-bg',
    gaming: 'bg-gaming-bg'
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Welcome Text */}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-tertiary">Welcome back,</p>
            <p className="text-sm sm:text-base font-semibold text-text-primary truncate">{user?.username || user?.email}</p>
          </div>

          {/* Theme Toggle + Avatar Menu */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            
            {/* Avatar Menu */}
            <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-base shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {(user?.username?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </button>          {/* Dropdown Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowProfileMenu(false)}
                />
                
                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-40"
                >
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                        {(user?.username?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{user?.username || 'Player'}</p>
                        <p className="text-xs opacity-90 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <FiUser className="text-purple-500" size={18} />
                      <span className="text-gray-900 dark:text-white font-medium">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/deposit');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <FiDollarSign className="text-success-500" size={18} />
                      <span className="text-gray-900 dark:text-white font-medium">Deposit</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/withdraw');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <FiCreditCard className="text-blue-500" size={18} />
                      <span className="text-gray-900 dark:text-white font-medium">Withdraw</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/history');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <FiClock className="text-orange-500" size={18} />
                      <span className="text-gray-900 dark:text-white font-medium">Game History</span>
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors text-left"
                    >
                      <FiLogOut className="text-danger-500" size={18} />
                      <span className="text-danger-500 font-medium">Logout</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
        </div>
      </header>

      {/* Main Content - with padding for fixed header */}
      <main className="flex-1 flex flex-col justify-center p-4 pt-24 sm:pt-28 pb-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-handwritten">
            Nard Arena
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Choose your game mode</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/3"
          >
            <GameOption
              icon={<FiCpu />}
              title="Play with AI"
              description="Challenge our smart AI in various difficulty levels"
              onClick={handlePlayWithAI}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <GameOption
              icon={<FiUsers />}
              title="Play with Players"
              description="Match with real players online and compete"
              onClick={handlePlayWithPlayers}
              disabled
              comingSoon
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/3"
          >
            <GameOption
              icon={<FiTrendingUp />}
              title="Tournament"
              description="Join tournaments and win amazing rewards"
              onClick={handleTournament}
              disabled
              comingSoon
            />
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-gray-300/50 dark:border-white/10"
        >
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Games Played</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Wins</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">0%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Win Rate</p>
            </div>
          </div>
        </motion.div>
        </div>
      </main>

      {/* Background Animation */}
      <div className="absolute inset-0 -z-20 flex flex-wrap items-center justify-center gap-8 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.svg
            key={i}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <rect x="5" y="5" width="90" height="90" rx="15" ry="15" fill="none" stroke="url(#grad)" strokeWidth="4" />
            <circle cx="50" cy="50" r="6" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </motion.svg>
        ))}
      </div>

      <style>{`
        .font-handwritten {
          font-family: 'Pacifico', cursive;
        }
      `}</style>
    </div>
  );
}

export default PlayerDashboard;
