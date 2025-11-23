/**
 * Admin Layout Component
 * Layout اصلی پنل ادمین با Sidebar و Navbar
 */

import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';
import { ThemeToggle } from '@shared/components/organisms/ThemeToggle';
import type { ReactNode as ReactNodeType } from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiCreditCard, 
  FiDollarSign, 
  FiActivity, 
  FiPackage, 
  FiSettings,
  FiMenu,
  FiX,
  FiHome,
  FiLogOut,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNodeType;
  path: string;
  badge?: string | number;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <FiGrid size={20} />,
    path: '/admin/dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <FiUsers size={20} />,
    path: '/admin/users',
    badge: '150',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: <FiCreditCard size={20} />,
    path: '/admin/transactions',
  },
  {
    id: 'withdrawals',
    label: 'Withdrawals',
    icon: <FiDollarSign size={20} />,
    path: '/admin/withdrawals',
    badge: '5',
  },
  {
    id: 'games',
    label: 'Online Games',
    icon: <FiActivity size={20} />,
    path: '/admin/games',
    badge: '12',
  },
  {
    id: 'components',
    label: 'Components & Tests',
    icon: <FiPackage size={20} />,
    path: '/admin/old',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <FiSettings size={20} />,
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
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">NardAria</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <FiChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <FiChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                  isActive(item.path)
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isSidebarOpen && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!isSidebarOpen && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          {/* Theme Toggle */}
          <div className={`flex ${isSidebarOpen ? 'justify-center' : 'justify-center'}`}>
            <ThemeToggle />
          </div>
          
          {isSidebarOpen && (
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Version 3.0.0</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">© 2025 NardAria</p>
            </div>
          )}
        </div>
      </aside>

      {/* Top Navbar */}
      <nav 
        className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 right-0 z-20 transition-all duration-300 ${
          isSidebarOpen ? 'left-64' : 'left-20'
        }`}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Management Dashboard</p>
            </div>

            {/* Right: User menu */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'admin'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Player Dashboard"
                >
                  <FiHome size={20} className="text-gray-600 dark:text-gray-400" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 min-h-screen ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
