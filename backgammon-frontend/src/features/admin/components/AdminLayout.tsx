/**
 * Admin Layout Component
 * Layout اصلی پنل ادمین با Sidebar و Navbar
 */

import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/admin/dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    path: '/admin/users',
    badge: '150',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: '💰',
    path: '/admin/transactions',
  },
  {
    id: 'withdrawals',
    label: 'Withdrawals',
    icon: '💸',
    path: '/admin/withdrawals',
    badge: '5',
  },
  {
    id: 'games',
    label: 'Online Games',
    icon: '🎮',
    path: '/admin/games',
    badge: '12',
  },
  {
    id: 'components',
    label: 'Components & Tests',
    icon: '🧪',
    path: '/admin/old',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    path: '/admin/settings',
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30 top-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Menu toggle + Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle sidebar"
              >
                <span className="text-2xl text-gray-900 dark:text-white">{isSidebarOpen ? '✕' : '☰'}</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">NardAria v3</p>
              </div>
            </div>

            {/* Right: User menu */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'admin'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Player Dashboard"
                >
                  <span className="text-xl">🏠</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 z-20 ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 dark:border-gray-900 space-y-4">
          {/* Theme Toggle in Sidebar */}
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>Version 3.0.0</p>
            <p className="text-xs mt-1">© 2025 NardAria</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
