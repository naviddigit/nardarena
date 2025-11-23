/**
 * Snackbar Demo
 * نمایش انواع Snackbar/Notification بر اساس react-hot-toast
 */

import { snackbar } from '@/app/providers';
import { Button } from '@shared/components/atoms/Button';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

export const SnackbarDemo = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Snackbar / Notification
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Toast notifications using react-hot-toast with custom Tailwind styling
        </p>
      </div>

      {/* Variants Section */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" />
          Variants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="success"
            onClick={() => snackbar.success('Operation completed successfully!')}
            className="w-full"
          >
            Success
          </Button>
          
          <Button
            variant="danger"
            onClick={() => snackbar.error('Something went wrong!')}
            className="w-full"
          >
            Error
          </Button>
          
          <Button
            variant="warning"
            onClick={() => snackbar.warning('Please review your input')}
            className="w-full"
          >
            Warning
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => snackbar.info('Here is some useful information')}
            className="w-full"
          >
            Info
          </Button>
        </div>
      </section>

      {/* With Duration */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiAlertCircle className="text-blue-600 dark:text-blue-400" />
          Custom Duration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            onClick={() => snackbar.success('This will close in 1 second', 1000)}
            className="w-full"
          >
            1 Second
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => snackbar.info('This will close in 5 seconds', 5000)}
            className="w-full"
          >
            5 Seconds
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => snackbar.warning('This will close in 10 seconds', 10000)}
            className="w-full"
          >
            10 Seconds
          </Button>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiInfo className="text-purple-600 dark:text-purple-400" />
          Real-world Examples
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="success"
            onClick={() => snackbar.success('User updated successfully!')}
            className="w-full"
          >
            User Update
          </Button>
          
          <Button
            variant="danger"
            onClick={() => snackbar.error('Failed to delete user. Please try again.')}
            className="w-full"
          >
            Delete Error
          </Button>
          
          <Button
            variant="success"
            onClick={() => snackbar.success('Login successful! Welcome back 🎉')}
            className="w-full"
          >
            Login Success
          </Button>
          
          <Button
            variant="warning"
            onClick={() => snackbar.warning('Your session will expire in 5 minutes')}
            className="w-full"
          >
            Session Warning
          </Button>
          
          <Button
            variant="success"
            onClick={() => snackbar.success('File uploaded successfully!')}
            className="w-full"
          >
            Upload Success
          </Button>
          
          <Button
            variant="info"
            onClick={() => snackbar.info('New message from admin')}
            className="w-full"
          >
            New Message
          </Button>
        </div>
      </section>

      {/* Usage Code */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Usage
        </h2>
        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{`import { snackbar } from '@/app/providers';

// Success notification
snackbar.success('Operation completed!');

// Error notification
snackbar.error('Something went wrong!');

// Warning notification
snackbar.warning('Please review your input');

// Info notification
snackbar.info('Here is some information');

// With custom duration (milliseconds)
snackbar.success('Quick message', 1000);
snackbar.error('Error message', 5000);`}</code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-amber-600 dark:text-amber-400" />
          Features
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>4 Variants:</strong> Success, Error, Warning, Info with distinct colors</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Theme Support:</strong> Automatically adapts to light/dark mode</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Auto-dismiss:</strong> Automatically closes after duration (default 3-4 seconds)</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Custom Duration:</strong> Set custom display time per notification</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Animations:</strong> Smooth enter/leave animations using Tailwind</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Icons:</strong> Each variant has a distinct icon (Feather Icons)</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Closeable:</strong> Manual close button with hover effect</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <span><strong>Position:</strong> Top-right corner (customizable in provider)</span>
          </li>
        </ul>
      </section>

      {/* API Reference */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          API Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 px-4 font-semibold text-gray-900 dark:text-white">Method</th>
                <th className="py-2 px-4 font-semibold text-gray-900 dark:text-white">Parameters</th>
                <th className="py-2 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4 font-mono text-sm">snackbar.success()</td>
                <td className="py-2 px-4 text-sm">message: string, duration?: number</td>
                <td className="py-2 px-4 text-sm">Show success notification (green)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4 font-mono text-sm">snackbar.error()</td>
                <td className="py-2 px-4 text-sm">message: string, duration?: number</td>
                <td className="py-2 px-4 text-sm">Show error notification (red)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4 font-mono text-sm">snackbar.warning()</td>
                <td className="py-2 px-4 text-sm">message: string, duration?: number</td>
                <td className="py-2 px-4 text-sm">Show warning notification (amber)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">snackbar.info()</td>
                <td className="py-2 px-4 text-sm">message: string, duration?: number</td>
                <td className="py-2 px-4 text-sm">Show info notification (blue)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SnackbarDemo;
