# 🎲 NardAria v3 - Backgammon Platform

> پلتفرم حرفه‌ای بازی آنلاین تخته نرد با احراز هویت، مدیریت کاربران، و Telegram notifications

---

## 🚀 Quick Start

### پیش‌نیازها
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL 18.1
- Telegram Bot (optional)

### نصب و اجرا
```bash
# 1. Backend (Authentication API)
cd backgammon-auth-backend
npm install
npm run dev
# Running on http://localhost:3002

# 2. Frontend (React App)
cd backgammon-frontend
npm install
npm run dev
# Running on http://localhost:5173

# 3. Database (PostgreSQL)
# Make sure PostgreSQL service is running
# Database: backgammon_auth
# Port: 5432
```

### تست سریع
```
Admin Login:
Email: admin@nardaria.com
Password: admin123
```

---

## 📚 مستندات

### 🔍 شروع از اینجا:
**[📖 docs/INDEX.md](docs/INDEX.md)** - مرکز هماهنگی همه مستندات

### مستندات اصلی (بر اساس اولویت):

#### 🔴 Critical (حتماً بخوانید!)
- [LESSONS-LEARNED.md](docs/01-critical/LESSONS-LEARNED.md) - درس‌های حیاتی (Sequelize password bug)
- [SECURITY.md](docs/01-critical/SECURITY.md) - استانداردهای امنیتی الزامی

#### 🟠 High Priority (مهم برای توسعه)
- [API-DOCUMENTATION.md](docs/02-high-priority/API-DOCUMENTATION.md) - مستندات کامل API
- [DATABASE-SCHEMA.md](docs/02-high-priority/DATABASE-SCHEMA.md) - ساختار دیتابیس
- [TELEGRAM-SETUP.md](docs/02-high-priority/TELEGRAM-SETUP.md) - راه‌اندازی Telegram Bot

#### 🟡 Medium Priority (مفید برای درک کلی)
- [ARCHITECTURE.md](docs/03-medium-priority/ARCHITECTURE.md) - معماری سیستم
- [FRONTEND_ARCHITECTURE.md](docs/03-medium-priority/FRONTEND_ARCHITECTURE.md) - ساختار فرانت‌اند

#### 🟢 Low Priority (اطلاعات تکمیلی)
- [PROJECT.md](docs/04-low-priority/PROJECT.md) - تاریخچه پروژه
- [KEY_CONCEPTS.md](docs/04-low-priority/KEY_CONCEPTS.md) - مفاهیم کلیدی
- [ANALYSIS.md](docs/04-low-priority/ANALYSIS.md) - تحلیل‌ها

---

## 🏗️ ساختار پروژه

```
NardAria-v3/
├── docs/                              # 📚 All documentation (organized by priority)
│   ├── INDEX.md                      # مرکز هماهنگی مستندات
│   ├── 01-critical/                  # اسناد حیاتی
│   ├── 02-high-priority/             # اسناد مهم
│   ├── 03-medium-priority/           # اسناد مفید
│   └── 04-low-priority/              # اسناد تکمیلی
│
├── backgammon-auth-backend/          # 🔐 Authentication Backend (Port 3002)
│   ├── src/
│   │   ├── routes/                   # API endpoints
│   │   ├── services/                 # Business logic
│   │   ├── models/                   # Sequelize models
│   │   ├── middleware/               # Auth, validation, errors
│   │   └── utils/                    # JWT, bcrypt, Telegram
│   ├── scripts/                      # Database migrations
│   └── .env                          # Environment variables
│
├── backgammon-frontend/              # ⚛️ React Frontend (Port 5173)
│   ├── src/
│   │   ├── pages/                    # Login, Register, Dashboard, Profile
│   │   ├── components/               # Reusable UI components
│   │   ├── hooks/                    # useAuth, useApi
│   │   ├── utils/                    # API client, helpers
│   │   └── types/                    # TypeScript definitions
│   └── public/
│
└── README.md                         # شما اینجا هستید! 👈
```

---

## 🛠️ Tech Stack

### Backend:
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL 18.1 + Sequelize ORM
- **Authentication**: JWT (Access + Refresh tokens)
- **Security**: bcrypt, helmet, rate-limiting
- **Notifications**: Telegram Bot API

### Frontend:
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS (future)
- **State**: React Context API
- **HTTP**: Axios

### Tools:
- **Database Viewer**: pgweb (Port 8081)
- **Version Control**: Git
- **Package Manager**: npm

---

## 🔑 Features

### ✅ موجود:
- ✅ ثبت‌نام و ورود کاربران
- ✅ احراز هویت با JWT
- ✅ رمزگذاری password با bcrypt
- ✅ فراموشی رمز عبور (با token 6 رقمی)
- ✅ Telegram notifications (failed login, password reset)
- ✅ Rate limiting
- ✅ Role-based access (user/admin)
- ✅ مدیریت پروفایل کاربر

### 🚧 در حال توسعه:
- ⏳ Admin Panel (dashboard, user management)
- ⏳ بازی آنلاین تخته نرد
- ⏳ مدیریت تراکنش‌ها و برداشت‌ها

---

## 🌐 Endpoints

**Base URL:** `http://localhost:3002/api`

### Auth:
- `POST /auth/register` - ثبت‌نام
- `POST /auth/login` - ورود
- `POST /auth/refresh` - تمدید token
- `POST /auth/forgot-password` - درخواست ریست پسورد
- `POST /auth/reset-password` - تنظیم پسورد جدید
- `GET /auth/profile` - دریافت پروفایل (protected)

### Users (Admin):
- `GET /users` - لیست کاربران (admin)
- `GET /users/:id` - دریافت کاربر
- `PUT /users/:id` - به‌روزرسانی کاربر
- `DELETE /users/:id` - حذف کاربر (admin)

**جزئیات کامل:** [API-DOCUMENTATION.md](docs/02-high-priority/API-DOCUMENTATION.md)

---

## 🔐 Security

### اصول امنیتی:
- ✅ Password hashing با bcrypt (salt=10)
- ✅ Parameterized SQL queries (SQL injection prevention)
- ✅ JWT token-based authentication
- ✅ Rate limiting (login: 5/15min, register: 3/hour)
- ✅ Input validation با Joi
- ✅ CORS configuration
- ✅ Helmet.js security headers

### ⚠️ نکات مهم:
- **هرگز** از ORM برای authentication استفاده نکنید (Sequelize password bug!)
- همیشه از raw SQL query با parameterized bindings استفاده کنید
- مستندات کامل: [SECURITY.md](docs/01-critical/SECURITY.md)

---

## 📞 Support

### مشکل داری؟
1. اول [LESSONS-LEARNED.md](docs/01-critical/LESSONS-LEARNED.md) رو بخون
2. بعد [INDEX.md](docs/INDEX.md) رو چک کن
3. در مستندات مربوطه جستجو کن
4. با تیم توسعه تماس بگیر

---

## 📝 License

MIT

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025  
**Version:** 3.0.0  
**Status:** Active Development 🚧
