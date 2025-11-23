# 🗄️ Database Schema - NardAria v3

> ساختار دیتابیس PostgreSQL و رابطه‌ها

**Database:** PostgreSQL 18.1  
**ORM:** Sequelize  
**Port:** 5432  
**Viewer:** pgweb (Port 8081)

---

## 📊 Tables Overview

```
users
├── id (PK)
├── name
├── email (unique)
├── password (bcrypt hashed)
├── role (user/admin)
├── isActive
├── resetToken (nullable)
├── resetTokenExpiry (nullable)
├── createdAt
└── updatedAt
```

---

## 👤 Users Table

### Schema:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  "isActive" BOOLEAN DEFAULT true,
  "resetToken" VARCHAR(255),
  "resetTokenExpiry" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Columns:

#### `id` - INTEGER (Primary Key)
- Auto-increment
- Unique identifier
- نوع: SERIAL (auto-generated)

#### `name` - VARCHAR(100)
- نام و نام خانوادگی کاربر
- Required
- مثال: "علی احمدی", "John Doe"
- Validation: 2-50 characters

#### `email` - VARCHAR(255)
- ایمیل کاربر (username برای login)
- Required, Unique
- Indexed for fast lookups
- مثال: "ali@example.com"
- Validation: Valid email format

#### `password` - VARCHAR(255)
- Password hashed با bcrypt
- Required
- **توجه مهم:** هرگز plain text ذخیره نمی‌شود
- Salt rounds: 10
- مثال hash: `$2b$10$abc123...`

#### `role` - VARCHAR(20)
- نقش کاربر در سیستم
- Enum: 'user', 'admin'
- Default: 'user'
- استفاده در authorization

#### `isActive` - BOOLEAN
- وضعیت فعال/غیرفعال بودن حساب
- Default: true
- false = حساب deactivate شده
- در login چک می‌شود

#### `resetToken` - VARCHAR(255) (nullable)
- Hash شده از token ریست پسورد
- Nullable (فقط وقتی درخواست ریست باشد)
- Hash method: SHA256
- Cleared بعد از استفاده موفق

#### `resetTokenExpiry` - TIMESTAMP (nullable)
- زمان انقضای token ریست پسورد
- Nullable
- Default expiry: 1 ساعت بعد از درخواست
- Checked قبل از قبول token

#### `createdAt` - TIMESTAMP
- زمان ایجاد رکورد
- Auto-generated
- Timezone: UTC

#### `updatedAt` - TIMESTAMP
- زمان آخرین به‌روزرسانی
- Auto-updated توسط Sequelize
- Timezone: UTC

---

## 🔍 Indexes

### Primary Index:
```sql
PRIMARY KEY (id)
```

### Unique Index:
```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

### Recommended Indexes:
```sql
-- برای جستجوی سریع‌تر
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_isActive ON users("isActive");
CREATE INDEX idx_users_resetToken ON users("resetToken") WHERE "resetToken" IS NOT NULL;
```

---

## 🔗 Relationships

### فعلی:
در حال حاضر فقط جدول `users` وجود دارد.

### برنامه‌ریزی شده:
```
users (1) ─────< (N) games
users (1) ─────< (N) transactions
users (1) ─────< (N) withdrawals
games (1) ─────< (N) game_moves
```

---

## 📝 Sample Data

### Admin User:
```sql
INSERT INTO users (name, email, password, role, "isActive")
VALUES (
  'Admin',
  'admin@nardaria.com',
  '$2b$10$hashed_password_here',
  'admin',
  true
);
```

### Regular User:
```sql
INSERT INTO users (name, email, password, role, "isActive")
VALUES (
  'علی احمدی',
  'ali@example.com',
  '$2b$10$hashed_password_here',
  'user',
  true
);
```

---

## 🔧 Migrations

### History:

#### 1. Initial Schema
```javascript
// Created with Sequelize sync
await sequelize.sync({ force: false });
```

#### 2. Password Reset Fields (2025-11-22)
```javascript
// File: scripts/migrate-password-reset.js
ALTER TABLE users ADD COLUMN "resetToken" VARCHAR(255);
ALTER TABLE users ADD COLUMN "resetTokenExpiry" TIMESTAMP;
```

**Run:**
```bash
node scripts/migrate-password-reset.js
```

**Output:**
```
✅ Successfully added password reset fields:
   - resetToken (VARCHAR 255)
   - resetTokenExpiry (TIMESTAMP)
```

---

## 🔐 Security Notes

### Password Storage:
```typescript
// ✅ همیشه با bcrypt
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(plainPassword, salt);

// Password verification
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

### Reset Token Storage:
```typescript
// Token generation (6 digits)
const token = crypto.randomInt(100000, 999999).toString();

// Hash before storing
const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

// Store in database
user.resetToken = hashedToken;
user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
```

### Sensitive Fields:
هرگز این فیلدها را در API response برنگردانید:
- ❌ `password`
- ❌ `resetToken`
- ❌ `resetTokenExpiry`

---

## 📊 Queries

### Get User by Email (for login):
```sql
-- ✅ با raw query (توصیه می‌شود)
SELECT * FROM users WHERE email = $1;

-- Parameters: [email]
-- Reason: Sequelize ORM password field رو load نمی‌کنه!
```

### Get Active Users:
```sql
SELECT id, name, email, role, "createdAt"
FROM users
WHERE "isActive" = true
ORDER BY "createdAt" DESC;
```

### Search Users:
```sql
SELECT id, name, email, role, "isActive", "createdAt"
FROM users
WHERE (name ILIKE $1 OR email ILIKE $1)
  AND "isActive" = true
ORDER BY name ASC
LIMIT 20 OFFSET 0;

-- Parameters: ['%search%']
```

### Reset Token Validation:
```sql
SELECT * FROM users
WHERE email = $1
  AND "resetToken" = $2
  AND "resetTokenExpiry" > NOW();

-- Parameters: [email, hashedToken]
```

### Clear Expired Tokens (cleanup job):
```sql
UPDATE users
SET "resetToken" = NULL,
    "resetTokenExpiry" = NULL
WHERE "resetTokenExpiry" < NOW()
  AND "resetToken" IS NOT NULL;
```

---

## 🔄 Sequelize Models

### User Model:
```typescript
// backgammon-auth-backend/src/models/User.ts
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public isActive!: boolean;
  public resetToken!: string | null;
  public resetTokenExpiry!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(20), defaultValue: 'user' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  resetToken: { type: DataTypes.STRING(255), allowNull: true },
  resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
});
```

---

## 🚨 Known Issues

### Sequelize Password Loading Bug:
```typescript
// ❌ این کار نمی‌کنه - password = undefined
const user = await User.findOne({ where: { email } });
console.log(user.password); // undefined!

// ✅ راه حل - از raw query استفاده کن
const [users] = await User.sequelize!.query(
  'SELECT * FROM users WHERE email = $1',
  { bind: [email] }
);
const user = users[0];
console.log(user.password); // ✅ works!
```

**مدت debugging:** 3 ساعت  
**مستندات:** `docs/01-critical/LESSONS-LEARNED.md`

---

## 📈 Statistics

### Current Data (Example):
```sql
-- Total users
SELECT COUNT(*) FROM users; -- 150

-- Active users
SELECT COUNT(*) FROM users WHERE "isActive" = true; -- 142

-- Admins
SELECT COUNT(*) FROM users WHERE role = 'admin'; -- 3

-- Recent registrations (last 7 days)
SELECT COUNT(*) FROM users 
WHERE "createdAt" > NOW() - INTERVAL '7 days'; -- 12
```

---

## 🛠️ Maintenance

### Backup:
```bash
# Full database backup
pg_dump -U postgres -h localhost -p 5432 backgammon_auth > backup.sql

# Restore
psql -U postgres -h localhost -p 5432 backgammon_auth < backup.sql
```

### Cleanup Expired Tokens:
```sql
-- توصیه: یک cron job روزانه
UPDATE users
SET "resetToken" = NULL, "resetTokenExpiry" = NULL
WHERE "resetTokenExpiry" < NOW();
```

### Vacuum (Performance):
```sql
VACUUM ANALYZE users;
```

---

## 🔮 Future Tables

### Games:
```sql
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  player1_id INTEGER REFERENCES users(id),
  player2_id INTEGER REFERENCES users(id),
  status VARCHAR(20), -- waiting/active/finished
  winner_id INTEGER REFERENCES users(id),
  bet_amount DECIMAL(10,2),
  "createdAt" TIMESTAMP,
  "finishedAt" TIMESTAMP
);
```

### Transactions:
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(20), -- deposit/withdrawal/bet/win
  amount DECIMAL(10,2),
  status VARCHAR(20), -- pending/completed/failed
  "createdAt" TIMESTAMP
);
```

### Withdrawals:
```sql
CREATE TABLE withdrawals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2),
  bank_account VARCHAR(50),
  status VARCHAR(20), -- pending/approved/rejected
  admin_id INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP,
  "processedAt" TIMESTAMP
);
```

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025  
**Database Version:** PostgreSQL 18.1  
**Schema Version:** 1.1.0 (با password reset fields)
