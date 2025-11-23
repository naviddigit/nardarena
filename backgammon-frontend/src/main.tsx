import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'
import { ThemeProvider } from './app/providers'
import { setupErrorHandlers } from '@/services/errorTracking'
import { setupGlobalErrorHandlers } from '@/services/globalErrorHandler'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AuthProvider } from '@features/auth/hooks/useAuth'

// Setup global error handlers
setupErrorHandlers();
setupGlobalErrorHandlers();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)