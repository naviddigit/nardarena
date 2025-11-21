/**
 * Debug Panel Component
 * کامپوننت پنل دیباگ
 * 
 * Shows error logs and debugging info (Dev only)
 * لاگ‌های خطا و اطلاعات دیباگ رو نشون میده (فقط Dev)
 */

import { useState, useEffect } from 'react';
import { logger } from '@/services/errorTracking';
import { Button } from '@shared/components/atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedLogs, setStoredLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'memory' | 'errors'>('errors');

  // Only show in development
  if (!(import.meta as any).env.DEV) {
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      setStoredLogs(logger.getStoredLogs());
    }
  }, [isOpen]);

  const handleClearLogs = () => {
    logger.clearLogs();
    setStoredLogs([]);
  };

  const handleExportLogs = () => {
    const data = logger.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold transition-transform hover:scale-110"
        title="Debug Panel"
      >
        🐛
      </button>

      {/* Debug Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-gray-900 text-white shadow-2xl z-40 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-red-600 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                🐛 Debug Panel
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('errors')}
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeTab === 'errors'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Errors ({storedLogs.length})
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  activeTab === 'memory'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Memory
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === 'errors' && (
                <div className="space-y-4">
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { setStoredLogs(logger.getStoredLogs()); }}>
                      Refresh
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExportLogs}>
                      Export
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleClearLogs}>
                      Clear
                    </Button>
                  </div>

                  {/* Logs List */}
                  {storedLogs.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      No errors logged 🎉
                    </div>
                  ) : (
                    storedLogs.map((log, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-3 border border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              log.level === 'error'
                                ? 'bg-red-500/20 text-red-300'
                                : log.level === 'warn'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{log.message}</p>
                        {log.stack && (
                          <details className="text-xs text-gray-400">
                            <summary className="cursor-pointer hover:text-white">
                              Stack Trace
                            </summary>
                            <pre className="mt-2 bg-gray-950 p-2 rounded overflow-auto max-h-40">
                              {log.stack}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'memory' && (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Performance Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Viewport:</span>
                        <span>{window.innerWidth}x{window.innerHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">User Agent:</span>
                        <span className="text-right text-xs max-w-[200px] truncate">
                          {navigator.userAgent}
                        </span>
                      </div>
                      {(performance as any).memory && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">JS Heap:</span>
                            <span>
                              {Math.round((performance as any).memory.usedJSHeapSize / 1048576)}MB / 
                              {Math.round((performance as any).memory.totalJSHeapSize / 1048576)}MB
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Current URL</h3>
                    <p className="text-sm break-all text-gray-400">{window.location.href}</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Local Storage</h3>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Theme:</span>
                        <span>{localStorage.getItem('theme') || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Error Logs:</span>
                        <span>{storedLogs.length} entries</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DebugPanel;
