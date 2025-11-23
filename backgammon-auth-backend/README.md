# 🔐 Backgammon Auth Backend

Backend service برای احراز هویت و مدیریت کاربران Nard Arena با **PostgreSQL**

## 🚀 شروع سریع

### 1. نصب و راه‌اندازی PostgreSQL
**ویندوز:**
```bash
# دانلود و نصب از:
# https://www.postgresql.org/download/windows/

# یا با Chocolatey:
choco install postgresql

# یا با Scoop:
scoop install postgresql
```

**پس از نصب:**
```bash
# اجرا:
psql -U postgres

# ساخت database:
CREATE DATABASE nardarena;

# خروج:
\q
```

### 2. نصب Dependencies
```bash
cd backgammon-auth-backend
npm install
```

### 3. تنظیمات Environment
```bash
# کپی کردن .env.example
cp .env.example .env

# ویرایش .env و تنظیم:
# - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# - JWT_SECRET (یک string رندوم و قوی)
# - JWT_REFRESH_SECRET (یک string رندوم و قوی دیگه)
```

### 4. اجرا
```bash
# Development mode (با hot reload)
npm run dev

# Production build
npm run build
npm start
```

## 📋 API Endpoints

### Base URL
```
http://localhost:3002/api/auth
```

### 1. Register (ثبت‌نام)
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "username": "player1",
      "email": "player1@example.com",
      "role": "player",
      "stats": { "gamesPlayed": 0, "wins": 0, "losses": 0, "winRate": 0 }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 2. Login (ورود)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "player1@example.com",
  "password": "123456"
}
```

**Response:** مثل Register

### 3. Get Current User (اطلاعات کاربر فعلی)
```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "username": "player1",
      "email": "player1@example.com",
      "role": "player",
      "stats": { ... }
    }
  }
}
```

### 4. Refresh Token (تمدید token)
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### 5. Logout (خروج)
```http
POST /api/auth/logout
Authorization: Bearer <accessToken>
```

## 🗄️ Database Schema (PostgreSQL)

### User Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'player' CHECK (role IN ('admin', 'player')),
  avatar VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  is_email_verified BOOLEAN DEFAULT false,
  stats JSONB DEFAULT '{"gamesPlayed":0,"wins":0,"losses":0,"winRate":0}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);
```

### TypeScript Interface
```typescript
{
  id: number;
  username: string;        // 3-30 characters, unique
  email: string;           // valid email, unique
  password: string;        // hashed with bcrypt
  role: 'admin' | 'player';
  avatar: string | null;
  isActive: boolean;       // default: true
  isEmailVerified: boolean; // default: false
  stats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security Features

- ✅ PostgreSQL با Sequelize ORM
- ✅ Password hashing با bcrypt (10 rounds)
- ✅ JWT tokens (Access + Refresh)
- ✅ Input validation با Joi
- ✅ Rate limiting (100 requests per 15 min)
- ✅ CORS protection
- ✅ Environment variables برای secrets
- ✅ JSONB برای stats (faster queries)
- ✅ Database indexes برای email & username

## 🧪 تست با cURL

### Register
```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Get User (با token)
```bash
curl -X GET http://localhost:3002/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📁 ساختار پروژه

```
backgammon-auth-backend/
├── src/
│   ├── models/
│   │   └── User.ts              # MongoDB User model
│   ├── routes/
│   │   └── auth.ts              # Authentication routes
│   ├── services/
│   │   └── authService.ts       # Business logic
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── validation.ts        # Input validation
│   ├── utils/
│   │   ├── database.ts          # MongoDB connection
│   │   └── jwt.ts               # JWT helpers
│   └── server.ts                # Express server
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 اتصال به Frontend

در `backgammon-frontend/src/features/auth/services/authService.ts`:

```typescript
// تغییر از Mock به Real Backend
const USE_MOCK = false;
const API_URL = 'http://localhost:3002/api/auth';
```

## 📝 TODO

- [ ] Email verification
- [ ] Password reset
- [ ] Token blacklist (برای logout)
- [ ] OAuth (Google, GitHub)
- [ ] 2FA (Two-Factor Authentication)

---

**Port:** 3002  
**Stack:** Express + TypeScript + PostgreSQL + Sequelize + JWT

## 🐘 PostgreSQL Tips

### دستورات مفید:
```bash
# اتصال به PostgreSQL
psql -U postgres

# لیست database ها
\l

# اتصال به database
\c nardarena

# لیست جداول
\dt

# ساختار جدول
\d users

# اجرای query
SELECT * FROM users;

# خروج
\q
```

### Backup & Restore:
```bash
# Backup
pg_dump -U postgres nardarena > backup.sql

# Restore
psql -U postgres nardarena < backup.sql
```
