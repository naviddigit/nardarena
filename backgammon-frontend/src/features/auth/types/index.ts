/**
 * Auth Types
 * تایپ‌های مربوط به احراز هویت
 */

export interface User {
  id: string;
  email: string;
  username: string;
  role?: 'admin' | 'player';
  avatar?: string | null;
  stats?: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
  };
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt: string;
  // Deprecated fields (for backward compatibility)
  balance?: number;
  level?: number;
  exp?: number;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword?: string; // Optional برای validation فقط در frontend
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}
