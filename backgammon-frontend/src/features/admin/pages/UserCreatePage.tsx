/**
 * User Create Page - Minimals Design
 * صفحه افزودن کاربر جدید با طراحی Minimals
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { UserForm } from '@shared/components/forms/UserForm';

export const UserCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // TODO: API call to create user
      console.log('Creating user:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to users list
      navigate('/admin/users');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Create a new user
              </h1>
              <nav className="flex items-center gap-2 mt-1 text-sm">
                <button 
                  onClick={() => navigate('/admin')}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Dashboard
                </button>
                <span className="text-gray-400">•</span>
                <button 
                  onClick={() => navigate('/admin/users')}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  User
                </button>
                <span className="text-gray-400">•</span>
                <span className="text-gray-900 dark:text-white">Create</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <UserForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          showPasswordFields={true}
          submitButtonText="Create user"
        />
      </div>
    </div>
  );
};
