/**
 * User Edit Modal
 * مودال ویرایش کاربر
 */

import { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { TextInput } from '@shared/components/atoms/Input';

interface User {
  id: number;
  email: string;
  username: string;
  role: 'admin' | 'player';
  status: 'active' | 'suspended' | 'banned';
  balance: number;
}

interface UserEditModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

export const UserEditModal = ({ user, onClose, onSave }: UserEditModalProps) => {
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            
            <TextInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'player' })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option value="player">Player</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>

          <TextInput
            label="Balance"
            type="number"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="gradient" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
