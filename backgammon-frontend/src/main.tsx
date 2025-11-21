import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { ThemeProvider } from './app/providers'
import { ErrorBoundary, setupErrorHandlers } from '@/services/errorTracking'

// Setup global error handlers
setupErrorHandlers();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
)