import { Sequelize } from 'sequelize';

/**
 * اتصال به PostgreSQL با Sequelize
 */
let sequelize: Sequelize;

export const connectDatabase = async (): Promise<void> => {
  try {
    // گرفتن اطلاعات از environment
    const DATABASE_URL = process.env.DATABASE_URL;
    
    if (DATABASE_URL) {
      // اگر DATABASE_URL داشتیم (Heroku/Railway style)
      sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
    } else {
      // یا از جزئیات جداگانه استفاده کن
      const DB_HOST = process.env.DB_HOST || 'localhost';
      const DB_PORT = parseInt(process.env.DB_PORT || '5432');
      const DB_NAME = process.env.DB_NAME || 'nardarena';
      const DB_USER = process.env.DB_USER || 'postgres';
      const DB_PASSWORD = process.env.DB_PASSWORD || '';

      sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
    }

    // تست اتصال
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    console.log(`📊 Database: ${sequelize.config.database}`);
    console.log(`🏠 Host: ${sequelize.config.host}:${sequelize.config.port}`);

    // sync جداول بعد از initialize کردن models انجام میشه
    // در server.ts بعد از initUserModel() صدا زده میشه

  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    process.exit(1);
  }
};

/**
 * قطع اتصال از PostgreSQL
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('🔌 PostgreSQL disconnected');
  } catch (error) {
    console.error('❌ PostgreSQL disconnect error:', error);
  }
};

/**
 * Export sequelize instance
 */
export const getSequelize = (): Sequelize => {
  if (!sequelize) {
    throw new Error('Database not initialized. Call connectDatabase() first.');
  }
  return sequelize;
};

/**
 * Sync database tables
 */
export const syncDatabase = async (): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true }); // alter: به روز رسانی ساختار بدون حذف data
      console.log('🔄 Database synced successfully');
    }
  } catch (error) {
    console.error('❌ Database sync error:', error);
    throw error;
  }
};
