/**
 * Environment Configuration
 */

export const ENV = {
  // API URLs
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3003',
  
  // Environment
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  
  // Features
  ENABLE_MOCK: import.meta.env.VITE_ENABLE_MOCK === 'true',
};

// Log در development
if (ENV.IS_DEV) {
  console.log('🔧 Environment Config:', ENV);
}
