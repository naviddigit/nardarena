/**
 * Error Boundary Component
 * کامپوننت مدیریت خطاهای React
 * 
 * Catches errors in component tree and shows fallback UI
 * خطاهای کامپوننت‌ها رو میگیره و UI جایگزین نشون میده
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@shared/components/atoms/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo);

    // Store error info in state
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send to error tracking service (Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // TODO: Integrate with error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
    
    // For now, store in localStorage for debugging
    try {
      const errorLog = {
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorLog);
      
      // Keep only last 10 errors
      if (existingLogs.length > 10) {
        existingLogs.shift();
      }
      
      localStorage.setItem('error_logs', JSON.stringify(existingLogs));
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😵</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                We're sorry for the inconvenience. The error has been logged.
              </p>
            </div>

            {/* Show error details in development */}
            {(import.meta as any).env.DEV && this.state.error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                  Error Details (Development Only):
                </h3>
                <p className="text-sm text-red-800 dark:text-red-400 mb-2 font-mono">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="text-xs text-red-700 dark:text-red-500">
                    <summary className="cursor-pointer hover:text-red-900 dark:hover:text-red-300">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 overflow-auto max-h-60 bg-red-100 dark:bg-red-950 p-2 rounded">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReset}>
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
