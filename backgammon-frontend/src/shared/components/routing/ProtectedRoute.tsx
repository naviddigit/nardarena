import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute component
 * Wraps routes that require authentication
 * Redirects to login page if user is not authenticated
 * If requireAdmin is true, also checks for admin role
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated, preserve intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin access if required
  if (requireAdmin && user?.role !== 'admin') {
    // Non-admin users trying to access admin routes get redirected to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Render protected content if authenticated (and admin if required)
  return <>{children}</>;
};
