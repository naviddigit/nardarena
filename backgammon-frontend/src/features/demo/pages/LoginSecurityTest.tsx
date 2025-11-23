/**
 * Login Security Test Page
 * برای تست failed login attempts
 */

import { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { snackbar } from '@/app/providers';
import { errorLogger } from '@shared/services/errorLogger.service';
import axios from 'axios';

export const LoginSecurityTest = () => {
  const [testEmail, setTestEmail] = useState('test@test.com');
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const testFailedLogin = async () => {
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:3002/api/auth/login', {
        email: testEmail,
        password: 'wrong-password-123',
      });
    } catch (error: any) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      console.log(`❌ Failed attempt #${newAttempts}`);
      snackbar.error(`Failed attempt #${newAttempts}`);
      
      if (newAttempts >= 5) {
        snackbar.warning('⚠️ 5 failed attempts! Check Telegram for warning!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testMultipleAttempts = async () => {
    setIsLoading(true);
    
    for (let i = 0; i < 5; i++) {
      await testFailedLogin();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsLoading(false);
  };

  const reset = () => {
    setAttempts(0);
    snackbar.success('Counter reset!');
  };

  const testFrontendWarning = () => {
    errorLogger.logWarning(
      'This is a test warning from frontend!',
      'LoginSecurityTest',
      { testData: 'Hello Telegram!' }
    );
    snackbar.success('Warning sent! Check console and Telegram');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔒 Login Security Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Test failed login attempts and Telegram notifications
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Email
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="test@test.com"
            />
          </div>

          {/* Attempt Counter */}
          <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {attempts}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Failed Attempts
              </div>
              {attempts >= 5 && (
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
                    ⚠️ Warning threshold reached!
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Check Telegram for security alert
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={testFailedLogin}
              disabled={isLoading}
              fullWidth
              variant="primary"
            >
              {isLoading ? 'Testing...' : '🔄 Send 1 Failed Login'}
            </Button>

            <Button
              onClick={testMultipleAttempts}
              disabled={isLoading}
              fullWidth
              variant="danger"
            >
              {isLoading ? 'Testing...' : '⚡ Send 5 Failed Logins (Auto)'}
            </Button>

            <Button
              onClick={testFrontendWarning}
              fullWidth
              variant="warning"
            >
              ⚠️ Test Frontend Warning
            </Button>

            <Button
              onClick={reset}
              fullWidth
              variant="secondary"
            >
              🔄 Reset Counter
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              📋 Test Instructions:
            </h3>
            <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside">
              <li>Make sure backend is running (Port 3002)</li>
              <li>Make sure Telegram bot is configured (.env)</li>
              <li>Click "Send 5 Failed Logins" button</li>
              <li>Check your Telegram for warning message</li>
              <li>Check backend console for logs</li>
            </ol>
          </div>

          {/* Backend Config Check */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ⚙️ Required Backend Config:
            </h3>
            <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
              TELEGRAM_BOT_TOKEN=your-bot-token{'\n'}
              TELEGRAM_CHAT_ID=your-chat-id{'\n'}
              TELEGRAM_LOGGING_ENABLED=true
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSecurityTest;
