import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@features/auth/pages/LoginPage';
import RegisterPage from '@features/auth/pages/RegisterPage';
import ProfileSetupPage from '@features/auth/pages/ProfileSetupPage';
import AdminPanel from '@features/admin/pages/AdminPanel';
import DashboardPage from '@features/admin/pages/DashboardPage';
import UsersPage from '@features/admin/pages/UsersPage';
import { 
  TransactionsPage, 
  WithdrawalsPage, 
  GamesPage, 
  SettingsPage 
} from '@features/admin/pages/PlaceholderPages';
import PlayerDashboard from '@features/player/pages/PlayerDashboard';
import ProfilePage from '@features/player/pages/ProfilePage';
import DepositPage from '@features/player/pages/DepositPage';
import WithdrawPage from '@features/player/pages/WithdrawPage';
import GameHistoryPage from '@features/player/pages/GameHistoryPage';
import { ProtectedRoute } from '@shared/components/routing/ProtectedRoute';
import { BottomNavigation } from '@shared/components/organisms/BottomNavigation';

function App() {
  return (
    <>
      <Routes>
      {/* Public pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Profile Setup - بعد از Register */}
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        }
      />
      
      {/* Protected pages - Admin only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <Navigate to="/admin/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requireAdmin>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute requireAdmin>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/withdrawals"
        element={
          <ProtectedRoute requireAdmin>
            <WithdrawalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/games"
        element={
          <ProtectedRoute requireAdmin>
            <GamesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requireAdmin>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/old"
        element={
          <ProtectedRoute requireAdmin>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      
      {/* Protected pages - Players */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PlayerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deposit"
        element={
          <ProtectedRoute>
            <DepositPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/withdraw"
        element={
          <ProtectedRoute>
            <WithdrawPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <GameHistoryPage />
          </ProtectedRoute>
        }
      />
      
      {/* Home redirect to dashboard for players */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
    {/* Bottom Navigation - فقط موبایل و بعد لاگین */}
    <BottomNavigation />
  </>
  );
}

export default App;