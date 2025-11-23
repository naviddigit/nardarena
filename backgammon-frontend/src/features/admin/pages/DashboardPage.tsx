/**
 * Admin Dashboard Page
 * داشبورد اصلی پنل مدیریت با آمار و نمودارها
 */

import { AdminLayout } from '../components/AdminLayout';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'red';
}

const statsCards: StatCard[] = [
  {
    title: 'Total Users',
    value: '1,250',
    change: +12.5,
    icon: '👥',
    color: 'blue',
  },
  {
    title: 'Online Users',
    value: '45',
    change: +8.2,
    icon: '✅',
    color: 'green',
  },
  {
    title: 'Today Revenue',
    value: '2,450,000 T',
    change: +15.3,
    icon: '📈',
    color: 'green',
  },
  {
    title: 'Active Games',
    value: '12',
    change: -5.0,
    icon: '🎮',
    color: 'orange',
  },
];

interface Activity {
  id: number;
  type: 'register' | 'transaction' | 'game' | 'withdrawal';
  user: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

const recentActivities: Activity[] = [
  {
    id: 1,
    type: 'register',
    user: 'Ali Ahmadi',
    description: 'New Registration',
    time: '2 minutes ago',
    icon: '✅',
    color: 'green',
  },
  {
    id: 2,
    type: 'transaction',
    user: 'Mohammad Rezaei',
    description: 'Deposit 500,000 T',
    time: '5 minutes ago',
    icon: '💰',
    color: 'blue',
  },
  {
    id: 3,
    type: 'game',
    user: 'Sara Mohammadi',
    description: 'New game started',
    time: '8 minutes ago',
    icon: '🎮',
    color: 'purple',
  },
  {
    id: 4,
    type: 'withdrawal',
    user: 'Hossein Alavi',
    description: 'Withdrawal request 200,000 T',
    time: '10 minutes ago',
    icon: '💸',
    color: 'orange',
  },
  {
    id: 5,
    type: 'register',
    user: 'admin@nardaria.com',
    description: 'Successful login',
    time: '12 minutes ago',
    icon: '🔑',
    color: 'blue',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600 border-blue-200',
  green: 'bg-green-100 text-green-600 border-green-200',
  orange: 'bg-orange-100 text-orange-600 border-orange-200',
  red: 'bg-red-100 text-red-600 border-red-200',
  purple: 'bg-purple-100 text-purple-600 border-purple-200',
};

export const DashboardPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Overview and system statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card
              key={index}
              variant="outlined"
              size="md"
              hoverable
              className={`border-2 ${colorClasses[stat.color]}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">vs previous period</span>
                  </div>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart Placeholder */}
          <Card variant="elevated" size="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Chart</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <p className="text-5xl mb-4">📊</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Revenue Chart</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">(Recharts - Coming Soon)</p>
              </div>
            </div>
          </Card>

          {/* User Growth Chart Placeholder */}
          <Card variant="elevated" size="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Growth</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>New Registrations</option>
                <option>Total Users</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <p className="text-5xl mb-4">📈</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">User Growth Chart</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">(Area Chart - Coming Soon)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card variant="elevated" size="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Latest system events</p>
            </div>
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      colorClasses[activity.color as keyof typeof colorClasses]
                    } flex items-center justify-center text-xl`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.user} - {activity.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <span className="text-xl">👁️</span>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            variant="filled" 
            size="lg" 
            clickable
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-lg font-bold mb-1">Add User</h3>
              <p className="text-sm opacity-90">Register new user in system</p>
            </div>
          </Card>

          <Card 
            variant="filled" 
            size="lg" 
            clickable
            className="bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold mb-1">Today's Transactions</h3>
              <p className="text-sm opacity-90">View today's transactions</p>
            </div>
          </Card>

          <Card 
            variant="filled" 
            size="lg" 
            clickable
            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💸</div>
              <h3 className="text-lg font-bold mb-1">Pending Withdrawals</h3>
              <p className="text-sm opacity-90">Review withdrawal requests</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
