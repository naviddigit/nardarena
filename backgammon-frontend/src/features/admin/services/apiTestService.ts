/**
 * API Test Service
 * سرویس تست تمام APIهای Backend
 */

export interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: number;
  response?: any;
  error?: string;
}

export interface HealthStatus {
  backend: boolean;
  database: boolean;
  timestamp: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
const BACKEND_BASE = API_BASE.replace('/api', '');

/**
 * تست Health Check
 */
export const testHealth = async (): Promise<TestResult> => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${BACKEND_BASE}/health`);
    const data = await response.json();
    
    return {
      id: 'health',
      name: '🏥 Health Check',
      status: response.ok ? 'success' : 'failed',
      duration: Date.now() - startTime,
      response: data,
    };
  } catch (error: any) {
    return {
      id: 'health',
      name: '🏥 Health Check',
      status: 'failed',
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
};

/**
 * تست Register
 */
export const testRegister = async (): Promise<TestResult> => {
  const startTime = Date.now();
  const testEmail = `test${Date.now()}@test.com`;
  
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: '123456',
      }),
    });
    
    const data = await response.json();
    
    return {
      id: 'register',
      name: '📝 Register User',
      status: response.ok ? 'success' : 'failed',
      duration: Date.now() - startTime,
      response: data,
      error: !response.ok ? data.error : undefined,
    };
  } catch (error: any) {
    return {
      id: 'register',
      name: '📝 Register User',
      status: 'failed',
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
};

/**
 * تست Login
 */
export const testLogin = async (email: string, password: string): Promise<TestResult> => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    return {
      id: 'login',
      name: '🔐 Login User',
      status: response.ok ? 'success' : 'failed',
      duration: Date.now() - startTime,
      response: data,
      error: !response.ok ? data.error : undefined,
    };
  } catch (error: any) {
    return {
      id: 'login',
      name: '🔐 Login User',
      status: 'failed',
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
};

/**
 * تست Get Current User
 */
export const testGetMe = async (token: string): Promise<TestResult> => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    const data = await response.json();
    
    return {
      id: 'getme',
      name: '👤 Get Current User',
      status: response.ok ? 'success' : 'failed',
      duration: Date.now() - startTime,
      response: data,
      error: !response.ok ? data.error : undefined,
    };
  } catch (error: any) {
    return {
      id: 'getme',
      name: '👤 Get Current User',
      status: 'failed',
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
};

/**
 * تست Refresh Token
 */
export const testRefreshToken = async (refreshToken: string): Promise<TestResult> => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    
    const data = await response.json();
    
    return {
      id: 'refresh',
      name: '🔄 Refresh Token',
      status: response.ok ? 'success' : 'failed',
      duration: Date.now() - startTime,
      response: data,
      error: !response.ok ? data.error : undefined,
    };
  } catch (error: any) {
    return {
      id: 'refresh',
      name: '🔄 Refresh Token',
      status: 'failed',
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
};

/**
 * اجرای تمام تست‌ها به ترتیب
 */
export const runAllTests = async (): Promise<TestResult[]> => {
  const results: TestResult[] = [];
  
  // 1. Health Check
  results.push(await testHealth());
  
  // 2. Register
  const registerResult = await testRegister();
  results.push(registerResult);
  
  // اگر register موفق بود، ادامه بده
  if (registerResult.status === 'success' && registerResult.response?.data?.tokens) {
    const { user, tokens } = registerResult.response.data;
    
    // 3. Login با همون user
    const loginResult = await testLogin(user.email, '123456');
    results.push(loginResult);
    
    // 4. Get Me
    results.push(await testGetMe(tokens.accessToken));
    
    // 5. Refresh Token
    results.push(await testRefreshToken(tokens.refreshToken));
  }
  
  return results;
};

/**
 * دریافت وضعیت Health
 */
export const getHealthStatus = async (): Promise<HealthStatus> => {
  try {
    const response = await fetch(`${BACKEND_BASE}/health`);
    const data = await response.json();
    
    return {
      backend: response.ok,
      database: data.success || false,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      backend: false,
      database: false,
      timestamp: new Date().toISOString(),
    };
  }
};
