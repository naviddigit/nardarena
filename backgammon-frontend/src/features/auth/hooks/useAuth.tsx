/**
 * Auth Context & Provider
 * کانتکست و ارائه‌دهنده احراز هویت
 * 
 * مدیریت state global برای authentication
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterData, User } from '../types';
import { authService } from '../services/authService';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authService.getToken();
      
      if (token) {
        const user = await authService.getCurrentUser();
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      authService.clearTokens();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: { message: error.message },
      });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { user, token } = await authService.login(credentials.email, credentials.password);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return user;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error.message },
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { user, token } = await authService.register(data.email, data.password);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return user;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: error.message },
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      await authService.logout();
      
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still clear state even if API call fails
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const refreshUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setState(prev => ({ ...prev, user }));
    } catch (error: any) {
      console.error('Refresh user error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
