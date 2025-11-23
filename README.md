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
**[📖 docs/INDEX.md](docs/INDEX.md)** - مرکز هماهنگی همه مستندات ⭐

### دسترسی سریع:

| نیاز شما | مستند | زمان |
|----------|-------|------|
| 🚀 **شروع پروژه** | [STARTUP_GUIDE](docs/06-guides/STARTUP_GUIDE.md) | 5 دقیقه |
| 📱 **Telegram Setup** | [TELEGRAM-COMPLETE-GUIDE](docs/02-high-priority/TELEGRAM-COMPLETE-GUIDE.md) | 15 دقیقه |
| 🔧 **tsx مشکل .env** | [ENV-ISSUES](docs/05-troubleshooting/ENV-ISSUES.md) | 10 دقیقه |
| 📊 **API Docs** | [API-DOCUMENTATION](docs/02-high-priority/API-DOCUMENTATION.md) | 20 دقیقه |

### مستندات اصلی (بر اساس اولویت):

#### 00-MANDATORY (⚠️ اجباری)
- [RULES.md](docs/00-MANDATORY/RULES.md) - قوانین خط قرمز ⭐⭐⭐
- [CRITICAL-CONFIGS.md](docs/00-MANDATORY/CRITICAL-CONFIGS.md) - تنظیمات حیاتی
- [CODING-STANDARDS.md](docs/00-MANDATORY/CODING-STANDARDS.md) - استانداردهای کدنویسی

#### 01-critical (🔴 بحرانی)
- [SECURITY.md](docs/01-critical/SECURITY.md) - امنیت
- [LESSONS-LEARNED.md](docs/01-critical/LESSONS-LEARNED.md) - درس‌های آموخته شده

#### 02-high-priority (🟠 فنی اصلی)
- [TELEGRAM-COMPLETE-GUIDE.md](docs/02-high-priority/TELEGRAM-COMPLETE-GUIDE.md) - راهنمای جامع Telegram ✨
- [API-DOCUMENTATION.md](docs/02-high-priority/API-DOCUMENTATION.md) - مستندات کامل API
- [DATABASE-SCHEMA.md](docs/02-high-priority/DATABASE-SCHEMA.md) - ساختار دیتابیس

#### 05-troubleshooting (🔧 رفع مشکل)
- [ENV-ISSUES.md](docs/05-troubleshooting/ENV-ISSUES.md) - مشکلات tsx و .env ✨

#### 06-guides (📘 راهنماها)
- [STARTUP_GUIDE.md](docs/06-guides/STARTUP_GUIDE.md) - راه‌اندازی پروژه

**📂 ساختار کامل:** [docs/INDEX.md](docs/INDEX.md)

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

**آخرین به‌روزرسانی:** 23 نوامبر 2025  
**Version:** 3.0.0  
**Status:** Active Development 🚧

**📝 Changelog:**
- ✨ 2025-11-23: Reorganized documentation, ENV-ISSUES.md, TELEGRAM-COMPLETE-GUIDE.md
- ✅ 2025-11-22: Admin Panel Phase 1, Telegram Bug Fix
