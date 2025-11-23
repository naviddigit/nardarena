/**
 * AddUserModal Component
 * مودال افزودن کاربر جدید - Minimals Design
 */

import { useState } from 'react';
import { FiX, FiMail, FiUser, FiLock, FiShield, FiPhone, FiMapPin, FiMap, FiBriefcase, FiLoader } from 'react-icons/fi';
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
      
      // یه کم تاخیر برای نشون دادن لودینگ
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
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
        onClick={isSubmitting ? undefined : onClose}
      />

      {/* Modal - Wider for 2-column layout */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create a new user
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiX className="text-xl text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Full Name (Username) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="tel"
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* State/Region (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  State/region
                </label>
                <div className="relative">
                  <FiMap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="text"
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Address (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="text"
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Country (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Country
                </label>
                <select
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="ir">Iran</option>
                </select>
              </div>

              {/* City (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  City
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="text"
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Zip/Code (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Zip/code
                </label>
                <input
                  type="text"
                  placeholder=""
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Company (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Company
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <input
                    type="text"
                    placeholder=""
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Role
                </label>
                <div className="relative">
                  <FiShield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value as UserRole)}
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                  >
                    <option value="player">Player</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Password Fields - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Minimum 6 characters"
                  disabled={isSubmitting}
                  className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  disabled={isSubmitting}
                  className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <FiLoader className="animate-spin" />}
              {isSubmitting ? 'Creating...' : 'Create user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
