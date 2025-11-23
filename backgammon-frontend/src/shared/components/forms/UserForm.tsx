/**
 * User Form Component
 * فرم مشترک برای ایجاد و ویرایش کاربر - Single Source of Truth
 */

import { useState, useEffect } from 'react';
import { FiMail, FiUser, FiLock, FiShield, FiDollarSign } from 'react-icons/fi';
import { AvatarUpload } from '@features/admin/components/AvatarUpload';
import { Toggle } from '@shared/components/atoms/Toggle';
import type { UserRole, UserStatus } from '@shared/types';

interface UserFormData {
  email: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  role: UserRole;
  status: UserStatus;
  balance: number;
  avatar: File | null;
  emailVerified: boolean;
}

interface UserFormProps {
  /** مقدار اولیه فرم - اگر undefined یعنی حالت Create */
  initialData?: Partial<UserFormData>;
  
  /** آواتار فعلی (URL) - برای حالت Edit */
  currentAvatarUrl?: string;
  
  /** تابع submit */
  onSubmit: (data: UserFormData) => void | Promise<void>;
  
  /** تابع لغو */
  onCancel: () => void;
  
  /** در حال ارسال */
  isSubmitting?: boolean;
  
  /** نمایش فیلد password - برای Create فقط */
  showPasswordFields?: boolean;
  
  /** متن دکمه submit */
  submitButtonText?: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export const UserForm = ({
  initialData,
  currentAvatarUrl,
  onSubmit,
  onCancel,
  isSubmitting = false,
  showPasswordFields = true,
  submitButtonText = 'Save',
}: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    email: initialData?.email || '',
    username: initialData?.username || '',
    password: '',
    confirmPassword: '',
    role: initialData?.role || 'player',
    status: initialData?.status || 'active',
    balance: initialData?.balance || 0,
    avatar: null,
    emailVerified: initialData?.emailVerified ?? true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        email: initialData.email || prev.email,
        username: initialData.username || prev.username,
        role: initialData.role || prev.role,
        status: initialData.status || prev.status,
        balance: initialData.balance ?? prev.balance,
        emailVerified: initialData.emailVerified ?? prev.emailVerified,
      }));
    }
  }, [initialData]);

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
    }

    // Password validation (only for Create mode or if password is provided)
    if (showPasswordFields) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);
  };

  const handleChange = (field: keyof UserFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Settings */}
        <div className="lg:col-span-1">
          {/* Avatar Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <AvatarUpload
              currentAvatar={currentAvatarUrl || null}
              onChange={(file) => handleChange('avatar', file)}
              disabled={isSubmitting}
            />
          </div>

          {/* Email Verified Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Email verified
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Disabling this will automatically send the user a verification email
                </p>
              </div>
              <div className="flex-shrink-0 sm:self-start sm:mt-0.5">
                <Toggle
                  checked={formData.emailVerified}
                  onChange={(checked) => handleChange('emailVerified', checked)}
                  disabled={isSubmitting}
                  color="green"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
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
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email */}
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
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password (Only for Create mode) */}
              {showPasswordFields && (
                <>
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
                        className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

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
                        disabled={isSubmitting}
                        className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Role */}
              <div className={showPasswordFields ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Role
                </label>
                <div className="relative">
                  <FiShield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value as UserRole)}
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="player">Player</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Status (Only for Edit mode) */}
              {!showPasswordFields && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as UserStatus)}
                    disabled={isSubmitting}
                    className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
              )}

              {/* Balance (Only for Edit mode) */}
              {!showPasswordFields && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Balance
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                    <input
                      type="number"
                      value={formData.balance}
                      onChange={(e) => handleChange('balance', Number(e.target.value))}
                      disabled={isSubmitting}
                      className="w-full h-12 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : submitButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
