/**
 * Test Panel Component
 * کامپوننت پنل تست
 * 
 * For testing error tracking and WhatsApp notifications
 * برای تست error tracking و اعلان واتساپ
 */

import { useState } from 'react';
import { logger } from '@/services/errorTracking';
import { Button } from '@shared/components/atoms/Button';
import { Card } from '@shared/components/molecules/Card';
import { Badge } from '@shared/components/atoms/Badge';
import { motion } from 'framer-motion';

export const TestPanel = () => {
  const [lastTest, setLastTest] = useState<string>('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isTestingWhatsApp, setIsTestingWhatsApp] = useState(false);

  // Test Telegram (Real API call)
  const testTelegram = async () => {
    setIsTestingWhatsApp(true);
    setLastTest('Telegram Test');
    
    try {
      const response = await fetch('http://localhost:3002/api/logs/test-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        addResult('info', '✅ Telegram test sent! Check your Telegram.');
      } else {
        addResult('error', `❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      addResult('error', `❌ Network error: ${error.message}`);
    } finally {
      setIsTestingWhatsApp(false);
    }
  };

  // Test 1: Simple Error
  const testSimpleError = () => {
    logger.error('Test error: Simple error test', {
      testType: 'simple',
      timestamp: new Date().toISOString(),
    });
    setLastTest('Simple Error');
    addResult('error', 'Simple error logged successfully');
  };

  // Test 2: Error with Data
  const testErrorWithData = () => {
    logger.error('Test error: Payment failed', {
      testType: 'payment',
      userId: 'test-user-123',
      amount: 50000,
      reason: 'Insufficient funds',
      timestamp: new Date().toISOString(),
    });
    setLastTest('Payment Error');
    addResult('error', 'Payment error with full context logged');
  };

  // Test 3: Warning
  const testWarning = () => {
    logger.warn('Test warning: API is slow', {
      testType: 'performance',
      endpoint: '/api/game/join',
      duration: 5000,
      timestamp: new Date().toISOString(),
    });
    setLastTest('Warning');
    addResult('warn', 'Warning logged (won\'t trigger WhatsApp in default config)');
  };

  // Test 4: Info
  const testInfo = () => {
    logger.info('Test info: User action', {
      testType: 'user-action',
      action: 'game_started',
      userId: 'test-user-123',
      timestamp: new Date().toISOString(),
    });
    setLastTest('Info');
    addResult('info', 'Info event logged');
  };

  // Test 5: Critical Error (Should trigger WhatsApp in production)
  const testCriticalError = () => {
    logger.error('🚨 CRITICAL: Database connection lost', {
      testType: 'critical',
      severity: 'critical',
      service: 'database',
      impact: 'All users affected',
      timestamp: new Date().toISOString(),
    });
    setLastTest('Critical Error');
    addResult('error', 'Critical error logged - Should trigger WhatsApp in production!');
  };

  // Test 6: Multiple Errors (Test rate limiting)
  const testMultipleErrors = async () => {
    for (let i = 1; i <= 5; i++) {
      logger.error(`Test error ${i}/5: Rapid fire test`, {
        testType: 'rate-limit',
        errorNumber: i,
        timestamp: new Date().toISOString(),
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setLastTest('Multiple Errors (Rate Limit Test)');
    addResult('error', '5 errors logged - Rate limiter should throttle');
  };

  // Test 7: View Logs
  const viewLogs = () => {
    const logs = logger.getLogs();
    console.log('📊 Current Logs:', logs);
    setLastTest('View Logs');
    addResult('info', `${logs.length} logs in memory - Check console`);
  };

  // Test 8: View Stored Logs
  const viewStoredLogs = () => {
    const stored = logger.getStoredLogs();
    console.log('💾 Stored Logs:', stored);
    setLastTest('View Stored Logs');
    addResult('info', `${stored.length} errors in localStorage - Check console`);
  };

  // Test 9: Export Logs
  const exportLogs = () => {
    const exported = logger.exportLogs();
    console.log('📤 Exported Logs:', exported);
    // Create download
    const blob = new Blob([exported], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setLastTest('Export Logs');
    addResult('info', 'Logs exported to JSON file');
  };

  // Test 10: Clear All Logs
  const clearLogs = () => {
    logger.clearLogs();
    setTestResults([]);
    setLastTest('Clear Logs');
    addResult('info', 'All logs cleared');
  };

  // Helper to add result
  const addResult = (level: string, message: string) => {
    setTestResults(prev => [
      {
        level,
        message,
        time: new Date().toLocaleTimeString('fa-IR'),
      },
      ...prev.slice(0, 9), // Keep last 10
    ]);
  };

  // Get badge color based on level
  const getBadgeColor = (level: string): 'danger' | 'warning' | 'info' | 'gray' => {
    switch (level) {
      case 'error': return 'danger';
      case 'warn': return 'warning';
      case 'info': return 'info';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      <Card header="🧪 Error Tracking Test Panel">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Test error tracking system and Telegram notifications. Check browser console and DebugPanel (🐛) for results.
          </p>

          {/* Test Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button 
              onClick={testTelegram} 
              variant="gradient" 
              size="sm" 
              fullWidth
              disabled={isTestingWhatsApp}
            >
              {isTestingWhatsApp ? '📤 Sending...' : '📱 Test Telegram'}
            </Button>
            <Button onClick={testSimpleError} variant="outline" size="sm" fullWidth>
              ❌ Simple Error
            </Button>
            <Button onClick={testErrorWithData} variant="outline" size="sm" fullWidth>
              💰 Payment Error
            </Button>
            <Button onClick={testWarning} variant="outline" size="sm" fullWidth>
              ⚠️ Warning
            </Button>
            <Button onClick={testInfo} variant="outline" size="sm" fullWidth>
              ℹ️ Info Event
            </Button>
            <Button onClick={testCriticalError} variant="gradient" size="sm" fullWidth>
              🚨 Critical Error
            </Button>
            <Button onClick={testMultipleErrors} variant="outline" size="sm" fullWidth>
              🔥 Multiple Errors
            </Button>
          </div>

          {/* Utility Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={viewLogs} variant="outline" size="sm">
              📊 View Logs
            </Button>
            <Button onClick={viewStoredLogs} variant="outline" size="sm">
              💾 Stored Logs
            </Button>
            <Button onClick={exportLogs} variant="outline" size="sm">
              📤 Export
            </Button>
            <Button onClick={clearLogs} variant="outline" size="sm">
              🗑️ Clear All
            </Button>
          </div>

          {/* Last Test */}
          {lastTest && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Last test:</strong> {lastTest}
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card header="📋 Test Results" variant="outlined">
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
              >
                <Badge color={getBadgeColor(result.level)} size="xs">
                  {result.level}
                </Badge>
                <span className="text-sm flex-1 text-gray-700 dark:text-gray-300">
                  {result.message}
                </span>
                <span className="text-xs text-gray-500">
                  {result.time}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card variant="filled">
        <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            📚 How to Test:
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>برای تست Telegram: دکمه "📱 Test Telegram" رو بزن</li>
            <li>برای تست logger: هر دکمه دیگه‌ای رو بزن</li>
            <li>Console رو باز کن (F12) برای مشاهده logs</li>
            <li>DebugPanel (🐛) رو باز کن برای مشاهده errors</li>
            <li>localStorage رو چک کن: <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">error_logs</code></li>
          </ol>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <p className="text-xs text-yellow-900 dark:text-yellow-300">
              <strong>⚠️ نکته:</strong> برای تست Telegram، باید backend روشن باشه و Bot config شده باشه.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TestPanel;
