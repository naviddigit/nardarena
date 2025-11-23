# 📚 مرکز مستندات Nard Arena v3

> **آخرین بروزرسانی:** 23 نوامبر 2025  
> **وضعیت پروژه:** 🟢 در حال توسعه فعال

---

## 🎯 دسترسی سریع

| نیاز شما | مستند | زمان مطالعه |
|----------|-------|-------------|
| 🚀 **میخوام شروع کنم** | [STARTUP_GUIDE](06-guides/STARTUP_GUIDE.md) | 5 دقیقه |
| ⚙️ **Environment Setup** | [ENV-ISSUES](05-troubleshooting/ENV-ISSUES.md) | 10 دقیقه |
| 📱 **Telegram Setup** | [TELEGRAM-COMPLETE-GUIDE](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md) | 15 دقیقه |
| 🔧 **مشکل دارم** | [Troubleshooting](#troubleshooting) | 5 دقیقه |
| 📊 **API Docs** | [API-DOCUMENTATION](02-high-priority/API-DOCUMENTATION.md) | 20 دقیقه |

---

## 📂 ساختار مستندات

```
docs/
├── 00-MANDATORY/          ⚠️ اجباری - باید خوانده شود
│   ├── RULES.md                قوانین خط قرمز
│   ├── CRITICAL-CONFIGS.md     تنظیمات حیاتی
│   └── CODING-STANDARDS.md     استانداردهای کدنویسی
│
├── 01-critical/           🔴 بحرانی - امنیت و درس‌ها
│   ├── SECURITY.md             نکات امنیتی
│   └── LESSONS-LEARNED.md      اشتباهات گذشته
│
├── 02-high-priority/      🟠 اولویت بالا - فنی
│   ├── TELEGRAM-COMPLETE-GUIDE.md  ✨ جدید!
│   ├── API-DOCUMENTATION.md
│   └── DATABASE-SCHEMA.md
│
├── 03-medium-priority/    🟡 متوسط - معماری
│   ├── ARCHITECTURE.md
│   └── FRONTEND_ARCHITECTURE.md
│
├── 04-low-priority/       🔵 عمومی - اطلاعات
│   ├── PROJECT.md
│   ├── ANALYSIS.md
│   └── KEY_CONCEPTS.md
│
├── 05-troubleshooting/    🔧 رفع مشکل
│   └── ENV-ISSUES.md          ✨ جدید!
│
├── 06-guides/             📘 راهنماها
│   └── STARTUP_GUIDE.md       (انتقال یافته از root)
│
└── 07-reports/            📊 گزارش‌ها
    └── WORK-REPORT-2025-11-22.md  (انتقال یافته از root)
```

---

## 🚦 مسیر یادگیری

### برای تازه‌واردها

**روز 1: قوانین و Setup** (1-2 ساعت)
1. [RULES.md](00-MANDATORY/RULES.md) ⭐ **اجباری**
2. [CRITICAL-CONFIGS.md](00-MANDATORY/CRITICAL-CONFIGS.md)
3. [STARTUP_GUIDE.md](06-guides/STARTUP_GUIDE.md)

**روز 2: معماری** (2-3 ساعت)
4. [ARCHITECTURE.md](03-medium-priority/ARCHITECTURE.md)
5. [DATABASE-SCHEMA.md](02-high-priority/DATABASE-SCHEMA.md)
6. [API-DOCUMENTATION.md](02-high-priority/API-DOCUMENTATION.md)

**روز 3: Telegram و Advanced** (1-2 ساعت)
7. [TELEGRAM-COMPLETE-GUIDE.md](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md)
8. [CODING-STANDARDS.md](00-MANDATORY/CODING-STANDARDS.md)

**Bonus:**
9. [LESSONS-LEARNED.md](01-critical/LESSONS-LEARNED.md) - یاد بگیر از اشتباهات گذشته

---

## 📋 مستندات به تفکیک

### 00-MANDATORY (⚠️ اجباری)

| فایل | موضوع | اهمیت | وضعیت |
|------|-------|--------|--------|
| [RULES.md](00-MANDATORY/RULES.md) | قوانین خط قرمز پروژه | 🔴🔴🔴 | ✅ باید خوانده شود |
| [RULES-FA.md](00-MANDATORY/RULES-FA.md) | قوانین به فارسی | 🔴🔴 | ✅ نسخه فارسی |
| [CRITICAL-CONFIGS.md](00-MANDATORY/CRITICAL-CONFIGS.md) | Environment, JWT, Database | 🔴🔴 | ✅ Setup ضروری |
| [CODING-STANDARDS.md](00-MANDATORY/CODING-STANDARDS.md) | TypeScript, ESLint, Prettier | 🔴 | ✅ قبل از Commit |

**نکات کلیدی:**
- ⛔ Never delete working code
- 🇬🇧 English only in UI
- 🚫 No component duplication
- ✅ همیشه test کنید

---

### 01-critical (🔴 بحرانی)

| فایل | موضوع | محتوا | زمان صرف شده |
|------|-------|-------|-------------|
| [SECURITY.md](01-critical/SECURITY.md) | امنیت | bcrypt, JWT, SQL Injection | - |
| [LESSONS-LEARNED.md](01-critical/LESSONS-LEARNED.md) | درس‌های آموخته شده | Sequelize Bug, Model Issues | 3+ ساعت |

**مهم‌ترین درس:**
```typescript
// ❌ اشتباه - باعث bug میشه
public id!: number;

// ✅ درست
declare id: number;
```

---

### 02-high-priority (🟠 فنی اصلی)

| فایل | موضوع | محتوا | وضعیت |
|------|-------|-------|--------|
| [TELEGRAM-COMPLETE-GUIDE.md](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md) | **راهنمای جامع Telegram** ✨ | Setup, Test, Debug, Best Practices | ✅ جدید |
| [API-DOCUMENTATION.md](02-high-priority/API-DOCUMENTATION.md) | REST API | Auth, Users, Routes | ✅ کامل |
| [DATABASE-SCHEMA.md](02-high-priority/DATABASE-SCHEMA.md) | PostgreSQL Schema | Models, Relations | ✅ کامل |

**درس آموخته شده امروز:**
```json
// package.json - tsx فایل .env رو load نمیکنه!
"dev": "tsx watch --env-file=.env src/server.ts"  // ✅ با --env-file
```

---

### 03-medium-priority (🟡 معماری)

| فایل | موضوع |
|------|-------|
| [ARCHITECTURE.md](03-medium-priority/ARCHITECTURE.md) | معماری کلی پروژه |
| [FRONTEND_ARCHITECTURE.md](03-medium-priority/FRONTEND_ARCHITECTURE.md) | ساختار Frontend |

---

### 04-low-priority (🔵 عمومی)

| فایل | توضیح |
|------|--------|
| [PROJECT.md](04-low-priority/PROJECT.md) | اطلاعات کلی |
| [PROJECT-ROADMAP.md](04-low-priority/PROJECT-ROADMAP.md) | نقشه راه پروژه |
| [ANALYSIS.md](04-low-priority/ANALYSIS.md) | تحلیل‌ها |
| [KEY_CONCEPTS.md](04-low-priority/KEY_CONCEPTS.md) | مفاهیم کلیدی |

---

### 05-troubleshooting (🔧 رفع مشکل)

| مشکل | فایل | راه‌حل |
|------|------|--------|
| **tsx فایل .env رو load نمیکنه** ✨ | [ENV-ISSUES.md](05-troubleshooting/ENV-ISSUES.md) | `--env-file=.env` |
| Port in use | [STARTUP_GUIDE](06-guides/STARTUP_GUIDE.md) | `kill-all-processes.bat` |
| Telegram پیام نمیفرسته | [TELEGRAM-COMPLETE-GUIDE](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md) | Debug چک‌لیست |

**مشکلات حل شده امروز:**
1. ✅ tsx بدون `--env-file` environment variables رو load نمیکرد
2. ✅ `dotenv.config()` باید قبل از importها باشه
3. ✅ Backend باید kill و restart بشه بعد از تغییر .env

---

### 06-guides (📘 راهنماها)

| راهنما | محتوا | زمان |
|--------|-------|------|
| [STARTUP_GUIDE.md](06-guides/STARTUP_GUIDE.md) | Scripts, Troubleshooting, Workflow | 5 دقیقه |
| [SERVICE-STATUS.md](06-guides/SERVICE-STATUS.md) | وضعیت سرویس‌ها، Health Check | - |
| [BYBIT-PAYMENT-GUIDE.md](06-guides/BYBIT-PAYMENT-GUIDE.md) | راهنمای پرداخت Bybit | - |

**Scripts:**
```bash
start-dev.bat          # Start all
clean-start.bat        # Kill + Start
kill-all-processes.bat # Kill only
```

---

### 07-reports (📊 گزارش‌ها)

| گزارش | تاریخ | محتوا |
|-------|-------|-------|
| [WORK-REPORT-2025-11-22.md](07-reports/WORK-REPORT-2025-11-22.md) | 22 نوامبر | Admin Panel Phase 1, Telegram Fix |

---

## 🎯 سناریوهای عملی

### سناریو 1: شروع پروژه از صفر

```bash
# 1. Clone repository
git clone <repo>

# 2. مطالعه مستندات (30 دقیقه)
docs/00-MANDATORY/RULES.md
docs/00-MANDATORY/CRITICAL-CONFIGS.md
docs/06-guides/STARTUP_GUIDE.md

# 3. Setup Backend
cd backgammon-auth-backend
npm install
# ساخت .env (راهنما: CRITICAL-CONFIGS.md)
npm run dev

# 4. Setup Frontend
cd ../backgammon-frontend
npm install
npm run dev

# 5. Test
http://localhost:5173
```

---

### سناریو 2: Setup Telegram

```bash
# 1. مطالعه راهنما (15 دقیقه)
docs/02-high-priority/TELEGRAM-COMPLETE-GUIDE.md

# 2. ساخت Bot در تلگرام
# - به @BotFather پیام دهید
# - Token دریافت کنید

# 3. تنظیم .env
TELEGRAM_LOGGING_ENABLED=true
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# 4. تنظیم package.json
"dev": "tsx watch --env-file=.env src/server.ts"

# 5. Restart Backend
kill-all-processes.bat
npm run dev

# 6. تست
curl -X POST http://localhost:3002/api/logs/test-telegram
```

---

### سناریو 3: مشکل tsx و .env

**علائم:**
```
TELEGRAM_LOGGING_ENABLED: undefined ❌
```

**راه‌حل:**
1. [ENV-ISSUES.md](05-troubleshooting/ENV-ISSUES.md) را بخوانید
2. `package.json` را چک کنید:
   ```json
   "dev": "tsx watch --env-file=.env src/server.ts"
   ```
3. Backend را restart کنید

---

## 🔗 لینک‌های مهم

### Servers
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3002
- **API Base:** http://localhost:3002/api
- **Health Check:** http://localhost:3002/health

### Test Endpoints
- **Test Telegram:** `POST /api/logs/test-telegram`
- **Test Panel:** http://localhost:5173/test

### Admin Login
```
Email: admin@nardarena.com
Password: admin123
```

---

## 📊 وضعیت پروژه

### ✅ فیچرهای کامل شده
- [x] Authentication (Login, Register, JWT, Refresh Token)
- [x] User Management (CRUD با Sequelize)
- [x] PostgreSQL Integration
- [x] Telegram Notifications (با troubleshooting کامل)
- [x] Error Logging (Frontend + Backend)
- [x] Failed Login Tracking (5 attempts → Telegram)
- [x] Admin Panel Layout (Phase 1)
- [x] Environment Setup با tsx (با --env-file)

### 🚧 در حال توسعه
- [ ] Admin Panel - Users Page (Phase 3)
- [ ] Admin Panel - Transactions (Phase 4)
- [ ] Admin Panel - Charts با Recharts (Phase 2)

### 📅 Roadmap
- [ ] Payment Gateway Integration
- [ ] Game Engine
- [ ] Real-time با WebSocket
- [ ] Mobile App

---

## 🛠️ Tech Stack

### Backend
```
Node.js 20+ + Express + TypeScript
PostgreSQL 18 + Sequelize ORM
JWT Auth + bcrypt
Telegram Bot API
```

### Frontend
```
React 18 + TypeScript + Vite
Material-UI (Minimals Theme)
React Router + Context API
Axios
```

### Tools
```
tsx watch (hot reload)
pgAdmin4 / pgweb
Git
```

---

## 📞 پشتیبانی

### مشکل فنی؟
1. [05-troubleshooting/](05-troubleshooting/) را چک کنید
2. [LESSONS-LEARNED.md](01-critical/LESSONS-LEARNED.md) - شاید قبلاً حل شده
3. مستندات مرتبط را جستجو کنید

### سؤال دارید؟
- **Telegram:** مستندات جامع موجود است
- **Environment:** ENV-ISSUES.md
- **API:** API-DOCUMENTATION.md

---

## 🎓 منابع خارجی

### Backend
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

### Frontend
- [React Docs](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

### Frontend Docs
- [backgammon-frontend/docs/INDEX.md](../backgammon-frontend/docs/INDEX.md)
- [UI_ROADMAP.md](../backgammon-frontend/docs/UI_ROADMAP.md)
- [CHANGES.md](../backgammon-frontend/docs/CHANGES.md)

---

## 🔄 Changelog

### 2025-11-23 ✨ **امروز**
- ✅ **ENV-ISSUES.md** - مستند جامع مشکلات tsx و .env
- ✅ **TELEGRAM-COMPLETE-GUIDE.md** - ادغام تمام Telegram docs
- ✅ **Reorganization** - ساختاردهی کامل docs
- ✅ **Folders** - ایجاد 05-troubleshooting, 06-guides, 07-reports
- ✅ **Move** - انتقال فایل‌های پراکنده از root به docs

### 2025-11-22
- ✅ Admin Panel Phase 1
- ✅ Telegram Bug Fix
- ✅ WORK-REPORT-2025-11-22.md

---

## 📝 نکات مهم

### ✅ همیشه انجام دهید
- قبل از کار RULES.md را بخوانید
- قبل از commit تست کنید
- مستندات را update کنید
- از scripts موجود استفاده کنید

### ❌ هرگز انجام ندهید
- `.env` را commit نکنید
- کد working را delete نکنید
- بدون test deploy نکنید
- قوانین را نادیده نگیرید

---

## 🎉 نتیجه‌گیری

این مستندات برای **شما** نوشته شده‌اند. 

- 📖 هر سؤالی دارید، اینجا جستجو کنید
- 🔧 هر مشکلی داشتید، troubleshooting را چک کنید
- 🚀 برای شروع، STARTUP_GUIDE را بخوانید
- 📱 برای Telegram، TELEGRAM-COMPLETE-GUIDE کامل است

**به Nard Arena خوش آمدید!** 🎮

---

**✨ Documentation v2.0 - Reorganized & Complete**
