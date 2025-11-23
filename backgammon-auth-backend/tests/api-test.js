/**
 * Backend API Test Script
 * تست مستقیم API های Backend
 * 
 * استفاده:
 * npm run test:api
 */

const BASE_URL = 'http://localhost:3002/api';

let accessToken = '';
let refreshToken = '';

// Helper function
async function apiCall(method, endpoint, body = null, useAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (useAuth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    console.log(`\n🔹 ${method} ${endpoint}`);
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { status: response.status, data };
  } catch (error) {
    console.error(`❌ Error calling ${endpoint}:`, error.message);
    return { status: 500, data: { error: error.message } };
  }
}

// Test Suite
async function runTests() {
  console.log('🚀 Starting Backend API Tests...\n');
  
  // Test 1: Health Check
  console.log('\n━━━ Test 1: Health Check ━━━');
  await fetch('http://localhost:3002/health')
    .then(res => res.json())
    .then(data => console.log('✅ Health:', data))
    .catch(err => console.error('❌ Health check failed:', err.message));

  // Test 2: Register
  console.log('\n━━━ Test 2: Register New User ━━━');
  const testEmail = `test${Date.now()}@test.com`;
  const registerResult = await apiCall('POST', '/auth/register', {
    email: testEmail,
    password: '123456',
  });

  if (registerResult.status === 201) {
    accessToken = registerResult.data.data.tokens.accessToken;
    refreshToken = registerResult.data.data.tokens.refreshToken;
    console.log('✅ Registered successfully');
    console.log('👤 User:', registerResult.data.data.user);
    console.log('🔑 Access Token:', accessToken.substring(0, 20) + '...');
  } else {
    console.error('❌ Register failed');
    return;
  }

  // Test 3: Get Current User
  console.log('\n━━━ Test 3: Get Current User (/auth/me) ━━━');
  const meResult = await apiCall('GET', '/auth/me', null, true);
  if (meResult.status === 200) {
    console.log('✅ Got user info');
    console.log('👤 User Data:', meResult.data.data.user);
  }

  // Test 4: Login with same credentials
  console.log('\n━━━ Test 4: Login with Registered User ━━━');
  const loginResult = await apiCall('POST', '/auth/login', {
    email: testEmail,
    password: '123456',
  });

  if (loginResult.status === 200) {
    console.log('✅ Login successful');
    console.log('👤 User:', loginResult.data.data.user);
  }

  // Test 5: Refresh Token
  console.log('\n━━━ Test 5: Refresh Access Token ━━━');
  const refreshResult = await apiCall('POST', '/auth/refresh', {
    refreshToken: refreshToken,
  });

  if (refreshResult.status === 200) {
    console.log('✅ Token refreshed');
    accessToken = refreshResult.data.data.tokens.accessToken;
  }

  // Test 6: Logout
  console.log('\n━━━ Test 6: Logout ━━━');
  const logoutResult = await apiCall('POST', '/auth/logout', null, true);
  if (logoutResult.status === 200) {
    console.log('✅ Logout successful');
  }

  console.log('\n✅ All tests completed!\n');
}

// Run tests
runTests().catch(console.error);
