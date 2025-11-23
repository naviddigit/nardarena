const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(30) },
  email: { type: DataTypes.STRING(255) },
  password: { type: DataTypes.STRING(255) },
  role: { type: DataTypes.ENUM('admin', 'player') },
  isActive: { type: DataTypes.BOOLEAN },
  isEmailVerified: { type: DataTypes.BOOLEAN },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

async function viewUsers() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL\n');

    const users = await User.findAll({
      attributes: ['id', 'email', 'username', 'role', 'isActive', 'isEmailVerified', 'createdAt'],
      order: [['id', 'ASC']]
    });

    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('                         👥 ALL USERS');
    console.log('═══════════════════════════════════════════════════════════════════\n');

    if (users.length === 0) {
      console.log('❌ No users found!\n');
    } else {
      users.forEach((user, index) => {
        console.log(`[${index + 1}] ID: ${user.id}`);
        console.log(`    📧 Email: ${user.email}`);
        console.log(`    👤 Username: ${user.username}`);
        console.log(`    🎭 Role: ${user.role}`);
        console.log(`    ${user.isActive ? '✅' : '❌'} Active: ${user.isActive}`);
        console.log(`    ${user.isEmailVerified ? '✅' : '❌'} Verified: ${user.isEmailVerified}`);
        console.log(`    📅 Created: ${user.createdAt.toLocaleString()}`);
        console.log('');
      });
      
      console.log(`📊 Total users: ${users.length}`);
      
      const activeCount = users.filter(u => u.isActive).length;
      const adminCount = users.filter(u => u.role === 'admin').length;
      console.log(`✅ Active: ${activeCount}`);
      console.log(`👑 Admins: ${adminCount}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

viewUsers();
