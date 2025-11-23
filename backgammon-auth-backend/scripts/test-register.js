/**
 * Test Registration Flow
 * بررسی مشکل hash نشدن password
 */
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

// اتصال به PostgreSQL
const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

async function testRegistration() {
  try {
    console.log('🔍 Testing User Registration...\n');
    
    // پیدا کردن آخرین کاربر ساخته شده
    const [users] = await sequelize.query(
      'SELECT id, username, email, password, "isActive", "isEmailVerified", "createdAt" FROM users ORDER BY id DESC LIMIT 3'
    );
    
    console.log('📊 Last 3 users in database:\n');
    users.forEach((user, index) => {
      console.log(`[${index + 1}] ${user.username}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔐 Password: ${user.password.substring(0, 30)}...`);
      console.log(`   ✅ Active: ${user.isActive}`);
      console.log(`   ✉️  Verified: ${user.isEmailVerified}`);
      console.log(`   📅 Created: ${new Date(user.createdAt).toLocaleString()}`);
      
      // چک کردن اینکه آیا password hash شده؟
      const isHashed = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
      console.log(`   ${isHashed ? '✅' : '❌'} Password is ${isHashed ? 'HASHED' : 'PLAIN TEXT!'}`);
      console.log('');
    });
    
    // تست bcrypt
    console.log('🧪 Testing bcrypt functionality...');
    const testPassword = 'test123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(testPassword, salt);
    console.log(`✅ bcrypt works! Plain: ${testPassword} → Hashed: ${hashed.substring(0, 30)}...\n`);
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testRegistration();
