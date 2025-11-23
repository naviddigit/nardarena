/**
 * Users Management Page
 * صفحه مدیریت کاربران - لیست، جستجو، ویرایش، حذف
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { TextInput } from '@shared/components/atoms/Input';
import { Badge } from '@shared/components/atoms/Badge';
import { snackbar } from '@/app/providers';
import { UserEditModal } from '../components/UserEditModal';
import { AddUserModal } from '../components/AddUserModal';
import type { CreateUserDto, User as ApiUser } from '../../../shared/types';
import { userService } from '../../../shared/services';

// Local User interface with additional fields
interface User extends Omit<ApiUser, 'id'> {
  id: string;
  gamesPlayed: number;
  registeredAt: string;
}

export const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'banned'>('all');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'player'>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, [currentPage, filterStatus, filterRole, searchQuery]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: any = {
        page: currentPage,
        limit: 20,
        search: searchQuery || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        role: filterRole !== 'all' ? filterRole : undefined,
      };

      const response = await userService.getUsers(filters);
      
      // Convert API users to local User format
      const usersWithGames = response.users.map(user => ({
        ...user,
        gamesPlayed: 0, // TODO: Get from user stats
        registeredAt: user.createdAt,
      }));
      
      setUsers(usersWithGames as User[]);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      const errorMsg = err?.response?.status === 403 
        ? 'Access denied. Admin privileges required.'
        : err?.response?.data?.error || 'Failed to load users';
      setError(errorMsg);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users - فیلتر کاربران
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Status badge colors - رنگ بج وضعیت
  const getStatusBadge = (status: User['status']) => {
    const colors = {
      active: 'success' as const,
      suspended: 'warning' as const,
      banned: 'danger' as const,
    };
    return colors[status];
  };

  // Handle save user
  const handleSaveUser = async (updatedUser: ApiUser) => {
    try {
      const result = await userService.updateUser(updatedUser.id, {
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
        status: updatedUser.status,
      });
      
      setUsers(users.map(u => u.id === result.id ? result : u));
      setEditingUser(null);
      snackbar.success('User updated successfully');
    } catch (err: any) {
      snackbar.error(err?.response?.data?.error || 'Failed to update user');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        snackbar.success('User deleted successfully!');
      } catch (err: any) {
        console.error('Error deleting user:', err);
        const errorMsg = err?.response?.data?.error || 'Failed to delete user';
        snackbar.error(errorMsg);
      }
    }
  };

  // Handle add user
  const handleAddUser = async (userData: CreateUserDto) => {
    try {
      const newUser = await userService.createUser(userData);
      
      // Add to local state
      setUsers([...users, {
        ...newUser,
        gamesPlayed: 0,
        registeredAt: newUser.createdAt,
      } as User]);
      
      setIsAddingUser(false);
      snackbar.success('User created successfully!');
    } catch (err: any) {
      console.error('Error creating user:', err);
      const errorMsg = err?.response?.data?.error || 'Failed to create user';
      snackbar.error(errorMsg);
      // Don't throw - just show error snackbar
    }
  };

  // Role badge colors - رنگ بج نقش
  const getRoleBadge = (role: User['role']) => {
    return role === 'admin' ? ('info' as const) : ('gray' as const);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl">
            <p className="font-medium">{error}</p>
            <button 
              onClick={fetchUsers}
              className="text-sm underline mt-1"
            >
              Try again
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Total {filteredUsers.length} users found
            </p>
          </div>
          <Button 
            variant="gradient" 
            size="md" 
            onClick={() => navigate('/admin/users/create')}
          >
            + New User
          </Button>
        </div>

        {/* Filters Card */}
        <Card variant="elevated" size="lg">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <TextInput
                  placeholder="Search by email or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>

              {/* Role Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="player">Player</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card variant="elevated" size="lg">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading users...</p>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Balance
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Games
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Registered
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {/* User Info */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4">
                      <Badge color={getRoleBadge(user.role)} size="sm">
                        {user.role.toUpperCase()}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <Badge color={getStatusBadge(user.status)} size="sm">
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>

                    {/* Balance */}
                    <td className="py-4 px-4 text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.balance.toLocaleString()} T
                      </p>
                    </td>

                    {/* Games */}
                    <td className="py-4 px-4 text-center">
                      <p className="text-gray-900 dark:text-white">{user.gamesPlayed}</p>
                    </td>

                    {/* Registered Date */}
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.registeredAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Edit"
                        >
                          <span className="text-blue-600 dark:text-blue-400">✏️</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Delete"
                        >
                          <span className="text-red-600 dark:text-red-400">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">No users found</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
          )}
        </Card>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600 dark:text-gray-400 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="outlined" size="md" className="border-2 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {users.length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-green-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {users.filter((u) => u.status === 'active').length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-orange-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {users.filter((u) => u.status === 'suspended').length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-red-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {users.filter((u) => u.role === 'admin').length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}

      {/* Add User Modal */}
      {isAddingUser && (
        <AddUserModal
          onClose={() => setIsAddingUser(false)}
          onAdd={handleAddUser}
        />
      )}
    </AdminLayout>
  );
};

export default UsersPage;
