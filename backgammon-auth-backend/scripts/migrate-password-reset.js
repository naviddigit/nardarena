/**
 * Migration: Add Password Reset Fields
 * اضافه کردن فیلدهای resetToken و resetTokenExpiry به جدول users
 */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

async function migrate() {
  try {
    console.log('🔄 Adding password reset fields to users table...\n');

    // چک کردن اینکه ستون ها وجود دارن یا نه
    const [columns] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name IN ('resetToken', 'resetTokenExpiry')
    `);

    if (columns.length > 0) {
      console.log('✅ Fields already exist, skipping migration');
      await sequelize.close();
      return;
    }

    // اضافه کردن ستون ها
    await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS "resetToken" VARCHAR(255),
      ADD COLUMN IF NOT EXISTS "resetTokenExpiry" TIMESTAMP WITH TIME ZONE
    `);

    console.log('✅ Successfully added password reset fields:');
    console.log('   - resetToken (VARCHAR 255)');
    console.log('   - resetTokenExpiry (TIMESTAMP)\n');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
