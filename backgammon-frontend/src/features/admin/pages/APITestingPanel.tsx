/**
 * API Testing Panel
 * صفحه تست APIهای Backend در Admin Panel
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@shared/components/atoms/Button';
import {
  runAllTests,
  getHealthStatus,
  TestResult,
  HealthStatus,
} from '../services/apiTestService';

const APITestingPanel: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Auto-refresh health status هر 5 ثانیه
  useEffect(() => {
    const checkHealth = async () => {
      const status = await getHealthStatus();
      setHealthStatus(status);
    };

    checkHealth();

    if (autoRefresh) {
      const interval = setInterval(checkHealth, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const results = await runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'running':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'running':
        return '⏳';
      default:
        return '⚪';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            API Testing Panel
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            تست و نظارت بر APIهای Backend
          </p>
        </div>

        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-700 dark:text-gray-300">Auto Refresh (5s)</span>
          </label>
        </div>
      </div>

      {/* Health Status Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            🏥 System Health
          </h2>
          {healthStatus && (
            <span className="text-xs text-gray-500">
              {new Date(healthStatus.timestamp).toLocaleTimeString('fa-IR')}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Backend Status */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div
              className={`w-4 h-4 rounded-full ${
                healthStatus?.backend ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Backend Server
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {healthStatus?.backend ? 'آنلاین و فعال' : 'آفلاین'}
              </p>
            </div>
            <span className="text-2xl">
              {healthStatus?.backend ? '✅' : '❌'}
            </span>
          </div>

          {/* Database Status */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div
              className={`w-4 h-4 rounded-full ${
                healthStatus?.database ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                PostgreSQL Database
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {healthStatus?.database ? 'متصل و آماده' : 'قطع شده'}
              </p>
            </div>
            <span className="text-2xl">
              {healthStatus?.database ? '✅' : '❌'}
            </span>
          </div>
        </div>
      </div>

      {/* API Tests Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            🧪 API Tests
          </h2>
          <Button
            variant="gradient"
            onClick={handleRunTests}
            disabled={isRunning || !healthStatus?.backend}
            isLoading={isRunning}
          >
            {isRunning ? 'در حال اجرا...' : 'اجرای تمام تست‌ها'}
          </Button>
        </div>

        {testResults.length > 0 ? (
          <div className="space-y-3">
            {testResults.map((test) => (
              <div
                key={test.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getStatusIcon(test.status)}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {test.name}
                      </p>
                      {test.duration && (
                        <p className="text-xs text-gray-500">
                          زمان: {test.duration}ms
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                      test.status
                    )}`}
                  >
                    {test.status === 'success' ? 'موفق' : 'ناموفق'}
                  </span>
                </div>

                {test.error && (
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-700 dark:text-red-400">
                    <span className="font-semibold">خطا:</span> {test.error}
                  </div>
                )}

                {test.response && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-purple-500">
                      نمایش پاسخ API
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-900 text-green-400 text-xs rounded overflow-auto max-h-40">
                      {JSON.stringify(test.response, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-3">🧪</p>
            <p>هیچ تستی اجرا نشده است</p>
            <p className="text-sm mt-2">
              برای شروع تست، دکمه "اجرای تمام تست‌ها" را کلیک کنید
            </p>
          </div>
        )}
      </div>

      {/* Test Summary */}
      {testResults.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-3">📊 خلاصه نتایج</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {testResults.filter((t) => t.status === 'success').length}
              </p>
              <p className="text-sm opacity-90">موفق ✅</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {testResults.filter((t) => t.status === 'failed').length}
              </p>
              <p className="text-sm opacity-90">ناموفق ❌</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{testResults.length}</p>
              <p className="text-sm opacity-90">کل تست‌ها 🧪</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APITestingPanel;
