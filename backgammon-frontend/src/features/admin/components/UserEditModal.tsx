/**
 * User Edit Modal
 * مودال ویرایش کاربر - استفاده از UserForm مشترک
 */

import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { UserForm } from '@shared/components/forms/UserForm';
import type { User as ApiUser } from '@shared/types';

interface UserEditModalProps {
  user: ApiUser;
  onClose: () => void;
  onSave: (user: ApiUser) => Promise<void>;
}

export const UserEditModal = ({ user, onClose, onSave }: UserEditModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      const updatedUser: ApiUser = {
        ...user,
        email: formData.email,
        username: formData.username,
        role: formData.role,
        status: formData.status,
      };

      await onSave(updatedUser);
      onClose();
    } catch (error) {
      // Error handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit user
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiX className="text-xl text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <UserForm
            initialData={{
              email: user.email,
              username: user.username,
              role: user.role,
              status: user.status,
              balance: user.balance,
              emailVerified: true, // TODO: Get from user if field exists
            }}
            currentAvatarUrl={user.avatar}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
            showPasswordFields={false}
            submitButtonText="Save changes"
          />
        </div>
      </div>
    </div>
  );
};
