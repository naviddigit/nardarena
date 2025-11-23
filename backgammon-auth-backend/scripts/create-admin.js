const bcrypt = require('bcrypt');
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

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@nardarena.com' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Email: admin@nardarena.com');
      console.log('👤 Username:', existingAdmin.username);
      
      // Update password and make sure it's active
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await existingAdmin.update({ 
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        isEmailVerified: true
      });
      console.log('🔄 Password reset to: admin123');
      console.log('✅ Account activated!');
      process.exit(0);
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@nardarena.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@nardarena.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Username:', admin.username);
    console.log('🆔 ID:', admin.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

createAdmin();
