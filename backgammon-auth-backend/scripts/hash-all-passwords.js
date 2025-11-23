/**
 * Hash all plain-text passwords in database
 * این اسکریپت همه password های plain text رو hash میکنه
 */
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

async function hashAllPasswords() {
  try {
    console.log('🔐 Starting password hashing process...\n');

    // گرفتن همه کاربران
    const [users] = await sequelize.query(
      'SELECT id, email, password FROM users'
    );

    console.log(`📊 Found ${users.length} users\n`);

    let hashedCount = 0;
    let alreadyHashedCount = 0;

    for (const user of users) {
      // چک کردن اینکه آیا password قبلاً hash شده
      const isHashed = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');

      if (isHashed) {
        console.log(`✅ ${user.email} - Already hashed`);
        alreadyHashedCount++;
      } else {
        // Hash کردن password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // آپدیت کردن در دیتابیس
        await sequelize.query(
          'UPDATE users SET password = $1 WHERE id = $2',
          { bind: [hashedPassword, user.id] }
        );

        console.log(`🔒 ${user.email} - Password hashed (was: ${user.password})`);
        hashedCount++;
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log('✅ Password hashing completed!');
    console.log(`🔒 Hashed: ${hashedCount}`);
    console.log(`✅ Already hashed: ${alreadyHashedCount}`);
    console.log(`📊 Total: ${users.length}`);
    console.log('═══════════════════════════════════════\n');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

hashAllPasswords();
