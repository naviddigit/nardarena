/**
 * User Form Demo Page
 * صفحه دمو کامپوننت UserForm
 */

import { useState } from 'react';
import { UserForm } from '@shared/components/forms/UserForm';

const UserFormDemo = () => {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert(`${mode === 'create' ? 'Created' : 'Updated'} successfully!`);
  };

  const handleCancel = () => {
    alert('Form cancelled');
  };

  return (
    <div className="space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Form Component</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Shared form component for creating and editing users - Single Source of Truth
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode('create')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            mode === 'create'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Create Mode
        </button>
        <button
          onClick={() => setMode('edit')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            mode === 'edit'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Edit Mode
        </button>
      </div>

      {/* Form Demo */}
      <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {mode === 'create' ? 'Create New User' : 'Edit Existing User'}
        </h3>
        
        {mode === 'create' ? (
          <UserForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            showPasswordFields={true}
            submitButtonText="Create user"
          />
        ) : (
          <UserForm
            initialData={{
              email: 'john.doe@example.com',
              username: 'John Doe',
              role: 'player',
              status: 'active',
              balance: 1250,
              emailVerified: true,
            }}
            currentAvatarUrl="https://via.placeholder.com/136"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            showPasswordFields={false}
            submitButtonText="Save changes"
          />
        )}
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">✅ Single Source of Truth</h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              One component used for both Create and Edit - no duplication!
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">🎨 Conditional Fields</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Shows password fields in Create mode, status/balance in Edit mode
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
            <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">🔒 Built-in Validation</h4>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Email format, username length, password match validation
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
            <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">📸 Avatar Upload</h4>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Integrated AvatarUpload component with preview and validation
            </p>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Code Example</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Create Mode:</h4>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-x-auto text-sm">
{`import { UserForm } from '@shared/components/forms/UserForm';

<UserForm
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isSubmitting={isSubmitting}
  showPasswordFields={true}
  submitButtonText="Create user"
/>`}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Edit Mode:</h4>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-xl overflow-x-auto text-sm">
{`<UserForm
  initialData={{
    email: 'user@example.com',
    username: 'John Doe',
    role: 'player',
    status: 'active',
    balance: 1000,
    emailVerified: true,
  }}
  currentAvatarUrl="https://example.com/avatar.jpg"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  showPasswordFields={false}
  submitButtonText="Save changes"
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Props Documentation */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Required</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">initialData</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Partial&lt;UserFormData&gt;</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">No</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Initial form values (for Edit mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">currentAvatarUrl</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">No</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">URL of existing avatar (for Edit mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">onSubmit</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">(data: UserFormData) =&gt; void</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Yes</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Form submit handler</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">onCancel</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">() =&gt; void</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Yes</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Cancel button handler</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">isSubmitting</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">No</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Show loading state</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">showPasswordFields</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">boolean</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">No</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Show password fields (Create mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">submitButtonText</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">string</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">No</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Custom submit button text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserFormDemo;
