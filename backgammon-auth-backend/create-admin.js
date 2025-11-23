const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

// Database connection
const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123456', 10);

    // Check if admin exists
    const [results] = await sequelize.query(
      "SELECT id FROM users WHERE email = 'admin@nardarena.ir'"
    );

    if (results.length > 0) {
      // Update existing admin
      await sequelize.query(
        `UPDATE users SET password = :password WHERE email = 'admin@nardarena.ir'`,
        { replacements: { password: hashedPassword } }
      );
      console.log('✅ Admin password updated to: admin123456');
    } else {
      // Create new admin
      await sequelize.query(
        `INSERT INTO users (username, email, password, role, "isActive", "isEmailVerified", stats, "createdAt", "updatedAt")
         VALUES ('admin', 'admin@nardarena.ir', :password, 'admin', true, true, '{"gamesPlayed":0,"wins":0,"losses":0,"winRate":0}', NOW(), NOW())`,
        { replacements: { password: hashedPassword } }
      );
      console.log('✅ Admin user created');
      console.log('📧 Email: admin@nardarena.ir');
      console.log('🔐 Password: admin123456');
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
