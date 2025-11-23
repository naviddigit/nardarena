/**
 * AddUserModal Component
 * مودال افزودن کاربر جدید
 */

import { useState } from 'react';
import { FiX, FiUserPlus, FiMail, FiUser, FiLock, FiShield } from 'react-icons/fi';
import type { CreateUserDto, UserRole } from '../../../shared/types';
import { Button } from '../../../shared/components/atoms/Button';
import { Input } from '../../../shared/components/atoms/Input';

interface AddUserModalProps {
  onClose: () => void;
  onAdd: (userData: CreateUserDto) => Promise<void>;
}

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export const AddUserModal = ({ onClose, onAdd }: AddUserModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'player',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers and _';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const userData: CreateUserDto = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      };

      await onAdd(userData);
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      // خطا را نمایش بده (می‌تونی از toast استفاده کنی)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | UserRole) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // پاک کردن خطای مربوط به فیلد
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-gray-300/30 dark:border-white/10 rounded-3xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <FiUserPlus className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Add New User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200/20 dark:hover:bg-white/10 rounded-xl transition-colors"
          >
            <FiX className="text-xl text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              leftIcon={<FiMail />}
              error={errors.email}
              disabled={isSubmitting}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="username"
              leftIcon={<FiUser />}
              error={errors.username}
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Minimum 6 characters"
              leftIcon={<FiLock />}
              error={errors.password}
              disabled={isSubmitting}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Repeat password"
              leftIcon={<FiLock />}
              error={errors.confirmPassword}
              disabled={isSubmitting}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User Role
            </label>
            <div className="relative">
              <FiShield className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value as UserRole)}
                disabled={isSubmitting}
                className="w-full h-11 pr-10 pl-4 bg-white/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="player">Player</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
