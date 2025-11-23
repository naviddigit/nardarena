/**
 * Placeholder Pages for Admin Panel
 */

import { AdminLayout } from '../components/AdminLayout';

// UsersPage is now a real page - see UsersPage.tsx
// export { UsersPage } from './UsersPage';

export const TransactionsPage = () => (
  <AdminLayout>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">💰 Transactions Management</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Transaction list, filters, and reports</p>
      <div className="text-6xl mb-4">🚧</div>
      <p className="text-lg text-orange-600 dark:text-orange-400 font-medium">Under Development...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Phase 4 - Coming Soon</p>
    </div>
  </AdminLayout>
);

export const WithdrawalsPage = () => (
  <AdminLayout>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">💸 Withdrawals Management</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Withdrawal requests, approve/reject</p>
      <div className="text-6xl mb-4">🚧</div>
      <p className="text-lg text-orange-600 dark:text-orange-400 font-medium">Under Development...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Phase 5 - Coming Soon</p>
    </div>
  </AdminLayout>
);

export const GamesPage = () => (
  <AdminLayout>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎮 Online Games</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Active games monitoring</p>
      <div className="text-6xl mb-4">🚧</div>
      <p className="text-lg text-orange-600 dark:text-orange-400 font-medium">Under Development...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Phase 6 - Coming Soon</p>
    </div>
  </AdminLayout>
);

export const SettingsPage = () => (
  <AdminLayout>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">⚙️ System Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">General, security, and notification settings</p>
      <div className="text-6xl mb-4">🚧</div>
      <p className="text-lg text-orange-600 dark:text-orange-400 font-medium">Under Development...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Phase 7 - Coming Soon</p>
    </div>
  </AdminLayout>
);
