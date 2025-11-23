import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components/atoms/Button';
import { TextInput, PasswordInput } from '@shared/components/atoms/Input';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import { PageTransition } from '@shared/components/animations/PageTransition';
import { GoogleIcon } from '@shared/components/atoms/Icon';
import { useTheme } from '@/app/providers';
import { useAuth } from '../hooks/useAuth';
import { snackbar } from '@/app/providers';
import { errorLogger } from '@shared/services/errorLogger.service';

type AuthMode = 'login' | 'register' | 'forgot';

const AuthBackground: React.FC = () => {
  return (
    <div className="absolute mb-12 pb-12 inset-0 -z-20 flex  items-end justify-center gap-8 opacity-30">
      {[...Array(6)].map((_, i) => (
        <svg key={i} width="60" height="60" viewBox="0 0 100 100" className="animate-spin-slow">
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

const AuthForm: React.FC<{ mode: AuthMode; setMode: (mode: AuthMode) => void }> = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failedAttempts, setFailedAttempts] = useState(0);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (mode === 'login') {
        try {
          const response = await login({ email, password });
          
          // Reset failed attempts on success
          setFailedAttempts(0);
          
          snackbar.success('Login successful! Welcome back 🎉');
          
          setTimeout(() => {
            // Check user role and navigate accordingly
            const userRole = response?.role;
            if (userRole === 'admin') {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 1500);
        } catch (error: any) {
          // Track failed attempts
          const newFailedAttempts = failedAttempts + 1;
          setFailedAttempts(newFailedAttempts);
          
          // Log warning after 3 failed attempts (client-side tracking)
          if (newFailedAttempts >= 3) {
            errorLogger.logWarning(
              `Multiple failed login attempts detected (${newFailedAttempts} attempts) for email: ${email}`,
              'LoginPage',
              { email, attempts: newFailedAttempts }
            );
          }
          
          snackbar.error(error.message || 'Login failed. Please try again.');
        }
      } else if (mode === 'forgot') {
        // TODO: Implement forgot password
        snackbar.success('Password reset link sent to your email!');
      }
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    alert('Google login coming soon!');
  };

  const headerText = mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password';

  return (
    <>
      <PageTransition transitionKey={mode} direction="horizontal">
        <div className="relative z-10 w-full max-w-md p-10 mx-auto rounded-3xl backdrop-blur-2xl border shadow-[0_0_40px_rgba(135,70,255,0.25)] bg-white/10 dark:bg-white/5 border-gray-300/30 dark:border-white/10">
          <div className="text-center mb-8 font-handwritten">
            <h1 className="text-5xl tracking-wide drop-shadow-lg bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nard Arena
            </h1>
            <p className="text-sm mt-2 font-semibold text-gray-700 dark:text-gray-300">{headerText}</p>
          </div>

          <div className="flex flex-col gap-5">
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={isLoading}
              fullWidth
            />

            {mode !== 'forgot' && (
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading}
                fullWidth
              />
            )}

            <Button 
              variant="gradient" 
              fullWidth 
              onClick={handleSubmit}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {headerText}
            </Button>

            {mode !== 'forgot' && (
              <Button 
                variant="secondary" 
                fullWidth 
                leftIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                {mode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
              </Button>
            )}

            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              {mode === 'login' && (
                <>
                  <button 
                    className="underline hover:text-purple-500 transition-colors" 
                    onClick={() => setMode('forgot')}
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                  <button 
                    className="underline hover:text-purple-500 transition-colors font-semibold" 
                    onClick={() => navigate('/register')}
                    disabled={isLoading}
                  >
                    Register
                  </button>
                </>
              )}
              {(mode === 'register' || mode === 'forgot') && (
                <button 
                  className="underline hover:text-purple-500 transition-colors" 
                  onClick={() => setMode('login')}
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
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
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      <AuthBackground />
      
      <AuthForm mode={mode} setMode={setMode} />

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
