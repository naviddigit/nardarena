import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@shared/components/atoms/Button';
import { Input } from '@shared/components/atoms/Input';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import {
  GoogleIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
  WalletIcon,
  BookIcon,
  EmailIcon,
} from '@shared/components/atoms/Icon';
import { useTheme } from '@/app/providers';

type AuthMode = 'login' | 'register' | 'forgot';

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

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-black/80 backdrop-blur-md border-t border-gray-300 dark:border-gray-700 flex justify-center items-center px-6 py-3 z-30">
      <div className="flex justify-between items-center w-full max-w-md">
        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors">
          <TrophyIcon />
        </button>
        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors">
          <WalletIcon />
        </button>
        
        <div className="-mt-6">
          <button className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg border-4 border-white dark:border-gray-900 hover:scale-110 transition-transform">
            <HomeIcon />
          </button>
        </div>
        
        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors">
          <UserIcon />
        </button>
        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors">
          <BookIcon />
        </button>
      </div>
    </div>
  );
};

const AuthForm: React.FC<{ mode: AuthMode; setMode: (mode: AuthMode) => void }> = ({ mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (mode !== 'forgot' && !password) {
      newErrors.password = 'Password is required';
    } else if (mode !== 'forgot' && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'register' && !username) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`${mode.toUpperCase()} submitted successfully!\nEmail: ${email}`);
    }
  };

  const headerText = mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password';

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md p-10 mx-auto rounded-3xl backdrop-blur-2xl border shadow-[0_0_40px_rgba(135,70,255,0.25)] bg-white/10 dark:bg-white/5 border-gray-300/30 dark:border-white/10"
    >
      <div className="text-center mb-8 font-handwritten">
        <h1 className="text-5xl tracking-wide drop-shadow-lg bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Nard Area
        </h1>
        <p className="text-sm mt-2 font-semibold text-gray-700 dark:text-gray-300">{headerText}</p>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<EmailIcon />}
        />

        {mode === 'register' && (
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
        )}

        {mode !== 'forgot' && (
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        )}

        <Button variant="gradient" fullWidth onClick={handleSubmit}>
          {headerText}
        </Button>

        {mode !== 'forgot' && (
          <Button variant="secondary" fullWidth leftIcon={<GoogleIcon />}>
            {mode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
          </Button>
        )}

        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          {mode === 'login' && (
            <>
              <button className="underline hover:text-purple-500 transition-colors" onClick={() => setMode('forgot')}>
                Forgot Password?
              </button>
              <button className="underline hover:text-purple-500 transition-colors" onClick={() => setMode('register')}>
                Register
              </button>
            </>
          )}
          {(mode === 'register' || mode === 'forgot') && (
            <button className="underline hover:text-purple-500 transition-colors" onClick={() => setMode('login')}>
              Back to Login
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { theme } = useTheme();

  const bgColors = {
    dark: 'bg-dark-bg',
    light: 'bg-light-bg',
    gaming: 'bg-gaming-bg'
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center relative overflow-hidden p-4 transition-colors ${bgColors[theme]}`}>
      <ThemeToggle />
      <AuthBackground />
      
      <AnimatePresence mode="wait">
        <AuthForm mode={mode} setMode={setMode} />
      </AnimatePresence>

      <BottomNavigation />

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .font-handwritten {
          font-family: 'Pacifico', cursive;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
