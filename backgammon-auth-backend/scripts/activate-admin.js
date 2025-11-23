const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('nardarena', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'player'),
    allowNull: false,
    defaultValue: 'player',
  },
  avatar: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  stats: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

async function activateAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    // Find admin
    const admin = await User.findOne({
      where: { email: 'admin@nardarena.com' }
    });

    if (!admin) {
      console.log('❌ Admin not found!');
      process.exit(1);
    }

    console.log('\n📊 Current admin status:');
    console.log('  Email:', admin.email);
    console.log('  Username:', admin.username);
    console.log('  Role:', admin.role);
    console.log('  isActive:', admin.isActive);
    console.log('  isEmailVerified:', admin.isEmailVerified);

    // Activate
    await admin.update({
      isActive: true,
      isEmailVerified: true,
      role: 'admin'
    });

    console.log('\n✅ Admin activated successfully!');
    console.log('  isActive: true');
    console.log('  isEmailVerified: true');
    console.log('\n🔐 You can now login with:');
    console.log('  Email: admin@nardarena.com');
    console.log('  Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

activateAdmin();
