/**
 * Register Page
 * صفحه ثبت‌نام
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components/atoms/Button';
import { TextInput, PasswordInput } from '@shared/components/atoms/Input';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import { PageTransition } from '@shared/components/animations/PageTransition';
import {
  GoogleIcon,
} from '@shared/components/atoms/Icon';
import { useTheme } from '@/app/providers';
import { useAuth } from '../hooks/useAuth';
import { Toast } from '../../../shared/components/molecules/Toast';

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

function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // فقط فیلدهای مورد نیاز رو بفرست
      await register({
        email: formData.email,
        password: formData.password,
      });
      setToastType('success');
      setToastMessage('Registration successful! Welcome to Nard Arena 🎉');
      setShowToast(true);
      
      // Redirect to profile setup
      setTimeout(() => {
        navigate('/profile-setup');
      }, 1500);
    } catch (error: any) {
      setToastType('error');
      setToastMessage(error.message || 'Registration failed. Please try again.');
      setShowToast(true);
    }
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google OAuth
    alert('Google registration coming soon!');
  };

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
      
      <PageTransition transitionKey="register" direction="vertical">
        <div className="relative z-10 w-full max-w-md p-10 mx-auto rounded-3xl backdrop-blur-2xl border shadow-[0_0_40px_rgba(135,70,255,0.25)] bg-white/10 dark:bg-white/5 border-gray-300/30 dark:border-white/10">
          <div className="text-center mb-8 font-handwritten">
            <h1 className="text-5xl tracking-wide drop-shadow-lg bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nard Arena
            </h1>
            <p className="text-sm mt-2 font-semibold text-gray-700 dark:text-gray-300">Create Account</p>
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            fullWidth
          />

          <PasswordInput
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            fullWidth
          />

          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isLoading}
            fullWidth
          />

          <Button 
            type="submit" 
            variant="gradient" 
            fullWidth 
            disabled={isLoading}
            isLoading={isLoading}
          >
            Register
          </Button>

          <Button 
            type="button"
            variant="secondary" 
            fullWidth 
            leftIcon={<GoogleIcon />}
            onClick={handleGoogleRegister}
            disabled={isLoading}
          >
            Sign up with Google
          </Button>

          <div className="text-center text-xs text-gray-600 dark:text-gray-400">
            <span>Already have an account? </span>
            <button
              type="button"
              className="underline hover:text-purple-500 transition-colors font-semibold"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Login here
            </button>
          </div>
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
        .font-handwritten {
          font-family: 'Pacifico', cursive;
        }
      `}</style>
    </div>
  );
}

export default RegisterPage;
