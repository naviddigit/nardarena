/**
 * Debug User isActive Field
 */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

async function debugIsActive() {
  try {
    const email = 'test1763803540333@example.com';
    
    console.log(`🔍 Debugging user: ${email}\n`);
    
    // Query مستقیم
    const [users] = await sequelize.query(
      `SELECT id, username, email, "isActive", "isEmailVerified", 
              pg_typeof("isActive") as active_type,
              CAST("isActive" AS TEXT) as active_text
       FROM users 
       WHERE email = $1`,
      {
        bind: [email],
      }
    );
    
    if (users.length === 0) {
      console.log('❌ User not found!');
      return;
    }
    
    const user = users[0];
    
    console.log('📊 Database Values:');
    console.log(`   isActive value: ${user.isActive}`);
    console.log(`   isActive type (JS): ${typeof user.isActive}`);
    console.log(`   isActive type (PG): ${user.active_type}`);
    console.log(`   isActive as text: "${user.active_text}"`);
    console.log(`   isEmailVerified: ${user.isEmailVerified}`);
    console.log('');
    
    // تست شرط
    console.log('🧪 Condition Tests:');
    console.log(`   user.isActive === true: ${user.isActive === true}`);
    console.log(`   user.isActive === false: ${user.isActive === false}`);
    console.log(`   user.isActive == true: ${user.isActive == true}`);
    console.log(`   user.isActive == false: ${user.isActive == false}`);
    console.log(`   !user.isActive: ${!user.isActive}`);
    console.log(`   Boolean(user.isActive): ${Boolean(user.isActive)}`);
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugIsActive();
