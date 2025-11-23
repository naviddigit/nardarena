import { DataTypes, Model, Optional } from 'sequelize';
import { getSequelize } from '../utils/database';
import bcrypt from 'bcrypt';

/**
 * User Stats Interface
 */
interface UserStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
}

/**
 * User Attributes Interface
 */
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'player';
  avatar: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  stats: UserStats;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Optional fields برای Create
 */
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'avatar' | 'isActive' | 'isEmailVerified' | 'stats' | 'createdAt' | 'updatedAt'> {}

/**
 * User Model Class
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: 'admin' | 'player';
  declare avatar: string | null;
  declare isActive: boolean;
  declare isEmailVerified: boolean;
  declare stats: UserStats;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  /**
   * Method: مقایسه password
   */
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }
    // اگر password با $ شروع نشه، یعنی hash نشده - مستقیم مقایسه کن
    if (!this.password.startsWith('$2')) {
      return candidatePassword === this.password;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

/**
 * Initialize User Model
 */
export const initUserModel = () => {
  const sequelize = getSequelize();

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: {
          name: 'username',
          msg: 'Username already exists',
        },
        validate: {
          len: {
            args: [3, 30],
            msg: 'Username must be between 3 and 30 characters',
          },
          notEmpty: {
            msg: 'Username is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Please provide a valid email',
          },
          notEmpty: {
            msg: 'Email is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: 'Password must be at least 6 characters',
          },
          notEmpty: {
            msg: 'Password is required',
          },
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'player'),
        allowNull: false,
        defaultValue: 'player',
      },
      avatar: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null,
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
        type: DataTypes.JSONB, // PostgreSQL JSONB برای performance بهتر
        allowNull: false,
        defaultValue: {
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
        {
          unique: true,
          fields: ['username'],
        },
      ],
      hooks: {
        /**
         * Hook: قبل از Create، password رو hash کن
         */
        beforeCreate: async (user: User) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        /**
         * Hook: قبل از Update، اگه password تغییر کرده hash کن
         */
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
