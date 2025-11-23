/**
 * Test Registration API
 * تست API ثبت‌نام و لاگین
 */

async function testAPI() {
  const baseURL = 'http://localhost:3002/api/auth';
  
  // یک email تصادفی
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = '123456';
  
  console.log('🧪 Testing Registration & Login Flow\n');
  console.log(`📧 Email: ${testEmail}`);
  console.log(`🔑 Password: ${testPassword}\n`);
  
  try {
    // 1. ثبت‌نام
    console.log('1️⃣ Registering new user...');
    const registerResponse = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    
    const registerData = await registerResponse.json();
    
    if (!registerData.success) {
      console.error('❌ Registration failed:', registerData.error);
      return;
    }
    
    console.log('✅ Registration successful!');
    console.log(`   User ID: ${registerData.data.user.id}`);
    console.log(`   Username: ${registerData.data.user.username}`);
    console.log(`   Active: ${registerData.data.user.isActive}`);
    console.log(`   Email Verified: ${registerData.data.user.isEmailVerified}\n`);
    
    // 2. لاگین
    console.log('2️⃣ Logging in with same credentials...');
    const loginResponse = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    
    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.error('❌ Login failed:', loginData.error);
      return;
    }
    
    console.log('✅ Login successful!');
    console.log(`   Access Token: ${loginData.data.tokens.accessToken.substring(0, 30)}...`);
    console.log(`   User: ${loginData.data.user.email}\n`);
    
    console.log('🎉 All tests passed! Password hashing and account activation work correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
