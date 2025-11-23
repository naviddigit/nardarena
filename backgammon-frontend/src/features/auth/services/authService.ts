/**
 * Auth Service
 * اتصال به Backend API
 */

import { User } from '../types/User';
import apiClient from '@/services/api/client';
import { ENV } from '@/config/env';

// Toggle Mock یا Real API
const USE_MOCK = ENV.ENABLE_MOCK;

interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Mock Login (برای تست)
 */
const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log('🔧 Using MOCK login (no real backend)');

  if (email === 'admin@nardarena.com' && password === 'admin123456') {
    const user: User = {
      id: 'admin-1',
      email,
      username: 'Admin',
      role: 'admin',
      avatar: null,
      stats: { gamesPlayed: 100, wins: 75, losses: 25, winRate: 75 },
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', 'mock-admin-token');
    
    return { user, token: 'mock-admin-token' };
  }

  const user: User = {
    id: 'player-' + Date.now(),
    email,
    username: email.split('@')[0],
    role: 'player',
    avatar: null,
    stats: { gamesPlayed: 0, wins: 0, losses: 0, winRate: 0 },
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('accessToken', 'mock-player-token');
  
  return { user, token: 'mock-player-token' };
};

/**
 * Real Login (Backend API)
 */
const realLogin = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('🌐 Using REAL backend login');
    console.log('📤 Login data:', { email, password: '***' });
    
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    const { user, tokens } = response.data.data;

    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    return {
      user,
      token: tokens.accessToken,
    };
  } catch (error: any) {
    console.error('❌ Login error:', error.response?.data);
    const errorMessage = error.response?.data?.error || 'Login failed';
    throw new Error(errorMessage);
  }
};

/**
 * Login
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return USE_MOCK ? mockLogin(email, password) : realLogin(email, password);
};

/**
 * Mock Register
 */
const mockRegister = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log('🔧 Using MOCK register');

  const user: User = {
    id: 'player-' + Date.now(),
    email,
    username,
    role: 'player',
    avatar: null,
    stats: { gamesPlayed: 0, wins: 0, losses: 0, winRate: 0 },
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('accessToken', 'mock-token-' + Date.now());
  
  return { user, token: 'mock-token' };
};

/**
 * Real Register (Backend API)
 */
const realRegister = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    console.log('🌐 Using REAL backend register');
    console.log('📤 Sending data:', { email, password: '***' });
    
    const response = await apiClient.post('/auth/register', {
      email,
      password,
    });

    const { user, tokens } = response.data.data;

    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    return {
      user,
      token: tokens.accessToken,
    };
  } catch (error: any) {
    console.error('❌ Register error:', error.response?.data);
    const errorMessage = error.response?.data?.error || 'Registration failed';
    const errorDetails = error.response?.data?.details || [];
    throw new Error(errorDetails.length > 0 ? errorDetails.join(', ') : errorMessage);
  }
};

/**
 * Register
 */
export const register = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return USE_MOCK ? mockRegister(email, password) : realRegister(email, password);
};

/**
 * Logout
 */
export const logout = async (): Promise<void> => {
  if (!USE_MOCK) {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors
    }
  }
  
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Get Current User
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    
    // اگه Real API هست، چک کن user هنوز valid هست
    if (!USE_MOCK) {
      try {
        const response = await apiClient.get('/auth/me');
        return response.data.data.user;
      } catch {
        // Token expired
        localStorage.clear();
        return null;
      }
    }
    
    return user;
  } catch {
    return null;
  }
};

/**
 * Refresh Access Token
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  if (USE_MOCK) return null;

  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch {
    return null;
  }
};

/**
 * Get Token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

/**
 * Clear all tokens and user data
 */
export const clearTokens = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Export as object for backward compatibility
 * برای سازگاری با کدهای قبلی
 */
export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  refreshAccessToken,
  getToken,
  clearTokens,
};
