/**
 * Profile Setup Page
 * صفحه تکمیل پروفایل - انتخاب Username و Avatar
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components/atoms/Button';
import { TextInput } from '@shared/components/atoms/Input';
import { PageTransition } from '@shared/components/animations/PageTransition';
import { useTheme } from '@/app/providers';
import { Toast } from '../../../shared/components/molecules/Toast';

const AVATAR_OPTIONS = [
  '👤', '😎', '🤖', '👾', '🎮', '🎯', '🎲', '🏆',
  '🦁', '🐯', '🦊', '🐺', '🦅', '🦉', '🐉', '🦄',
  '⚡', '🔥', '💎', '👑', '🎭', '🎪', '🌟', '✨'
];

const AuthBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20 flex flex-wrap items-center justify-center gap-8 opacity-30">
      {[...Array(6)].map((_, i) => (
        <svg key={i} width="80" height="80" viewBox="0 0 100 100" className="animate-spin-slow">
          <rect x="5" y="5" width="90" height="90" rx="15" ry="15" fill="none" stroke="url(#diceGlow)" strokeWidth="6" />
          <circle cx="50" cy="50" r="8" fill="url(#diceGlow)" />
          <circle cx="30" cy="30" r="6" fill="url(#diceGlow)" />
          <circle cx="70" cy="30" r="6" fill="url(#diceGlow)" />
          <defs>
            <linearGradient id="diceGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ff6ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff6fff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
};

function ProfileSetupPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (username.length > 20) {
      setError('Username cannot exceed 20 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: API call to update username and avatar
      // await apiClient.put('/auth/profile', { username, avatar: selectedAvatar });
      
      // Mock success for now
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setToastType('success');
      setToastMessage('Profile setup complete! 🎉');
      setShowToast(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      setToastType('error');
      setToastMessage(error.message || 'Failed to update profile');
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const bgColors = {
    dark: 'bg-dark-bg',
    light: 'bg-light-bg',
    gaming: 'bg-gaming-bg'
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center relative overflow-hidden p-4 transition-colors ${bgColors[theme]}`}>
      <AuthBackground />
      
      <PageTransition transitionKey="profile-setup" direction="vertical">
        <div className="relative z-10 w-full max-w-md p-10 mx-auto rounded-3xl backdrop-blur-2xl border shadow-[0_0_40px_rgba(135,70,255,0.25)] bg-white/10 dark:bg-white/5 border-gray-300/30 dark:border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Complete Your Profile
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose a username and avatar for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Choose Your Avatar
              </label>
              <div className="grid grid-cols-8 gap-2">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-2 rounded-lg transition-all ${
                      selectedAvatar === avatar
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-110 shadow-lg'
                        : 'bg-white/20 dark:bg-black/20 hover:scale-105'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <TextInput
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                error={error}
                disabled={isLoading}
                fullWidth
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3-20 characters, no spaces
              </p>
            </div>

            {/* Preview */}
            <div className="bg-white/10 dark:bg-black/20 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preview</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">{selectedAvatar}</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {username || 'Your Username'}
                </span>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gradient" 
              fullWidth 
              disabled={isLoading || !username.trim()}
              isLoading={isLoading}
            >
              Complete Setup
            </Button>

            <button
              type="button"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors underline"
              onClick={() => navigate('/dashboard')}
              disabled={isLoading}
            >
              Skip for now
            </button>
          </form>
        </div>
      </PageTransition>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ProfileSetupPage;
