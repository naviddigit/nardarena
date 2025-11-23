# 🚀 Service Status Report - NardAria v3

> گزارش وضعیت تمام سرویس‌ها و پورت‌های فعال

**تاریخ:** 22 نوامبر 2025  
**محیط:** Development

---

## 📊 خلاصه وضعیت

| سرویس | پورت | وضعیت | آدرس | توضیحات |
|-------|------|-------|------|---------|
| 🔐 Backend (Auth) | 3002 | 🟢 Active | http://localhost:3002 | Express + TypeScript |
| ⚛️ Frontend | 5173 | 🟢 Active | http://localhost:5173 | React 18 + Vite |
| 🗄️ PostgreSQL | 5432 | 🟢 Active | localhost:5432 | Database Server |
| 🌐 pgweb | 8081 | 🟡 Optional | http://localhost:8081 | Database Viewer |
| 📱 Telegram Bot | - | 🔴 **Not Configured** | - | Needs Setup |

---

## 🔐 Backend Server (Port 3002)

### Status: 🟢 **RUNNING**

```bash
# Start Backend
cd backgammon-auth-backend
npm run dev
```

### Endpoints:
- **Health Check:** `GET http://localhost:3002/`
- **API Base:** `http://localhost:3002/api`
- **Auth Routes:** `/api/auth/*`
- **User Routes:** `/api/users/*`

### Environment:
```env
✅ PORT=3002
✅ DB connected: nardarena@localhost:5432
✅ JWT configured
✅ CORS: http://localhost:5173
⚠️ TELEGRAM: Not configured (tokens missing)
```

### Features:
- ✅ User Registration
- ✅ Login with JWT
- ✅ Password Reset (tokens work)
- ✅ Profile Management
- ✅ Role-based Access
- ❌ Telegram Notifications (needs setup)

---

## ⚛️ Frontend (Port 5173)

### Status: 🟢 **RUNNING**

```bash
# Start Frontend
cd backgammon-frontend
npm run dev
```

### URLs:
- **Home:** http://localhost:5173
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Dashboard:** http://localhost:5173/dashboard
- **Profile:** http://localhost:5173/profile
- **Admin Panel:** http://localhost:5173/admin (🚧 In Development)

### Tech Stack:
- React 18.3.1
- TypeScript 5.x
- Vite 5.x
- React Router 6.x
- Axios for API calls

---

## 🗄️ PostgreSQL Database (Port 5432)

### Status: 🟢 **RUNNING**

```bash
# Check PostgreSQL Service
Get-Service postgresql-x64-18
# Status: Running

# Connect with psql
psql -U postgres -d nardarena
```

### Database Info:
```
Database: nardarena
User: postgres
Password: 123456 (⚠️ Change in production!)
Host: localhost
Port: 5432
```

### Tables:
```sql
-- Current schema
users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20),
  isActive BOOLEAN,
  resetToken VARCHAR(255),
  resetTokenExpiry TIMESTAMP,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)
```

### Sample Queries:
```bash
# Total users
SELECT COUNT(*) FROM users;

# Active admins
SELECT * FROM users WHERE role='admin' AND "isActive"=true;

# Recent registrations
SELECT name, email, "createdAt" FROM users 
ORDER BY "createdAt" DESC LIMIT 10;
```

---

## 🌐 pgweb - Database Viewer (Port 8081)

### Status: 🟡 **OPTIONAL** (Not Required)

```bash
# Start pgweb
pgweb --host=localhost --port=5432 --user=postgres --pass=123456 --db=nardarena --listen=8081
```

### Access:
- URL: http://localhost:8081
- Features:
  - Browse tables
  - Run SQL queries
  - Export data
  - View schema

**توجه:** این سرویس اختیاریه و فقط برای راحتی دیباگ استفاده میشه.

---

## 📱 Telegram Bot

### Status: 🔴 **NOT CONFIGURED**

### مشکل:
```env
# Current .env values (INVALID)
TELEGRAM_NOTIFICATIONS=true
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE  ❌
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE      ❌
```

### راه حل:

#### مرحله 1: ساخت Bot
1. به [@BotFather](https://t.me/BotFather) برو
2. دستور `/newbot` بفرست
3. اسم بده: **NardAria Notifications**
4. Username بده: `nardarena_bot` (یا هر چیز دیگه با پسوند `_bot`)
5. **Token** رو کپی کن (مثل: `7899876543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`)

#### مرحله 2: گرفتن Chat ID
1. به bot خودت پیام `/start` بفرست
2. به [@userinfobot](https://t.me/userinfobot) برو و `/start` بزن
3. عدد **ID** رو کپی کن (مثل: `123456789`)

#### مرحله 3: تنظیم .env
```env
TELEGRAM_BOT_TOKEN=7899876543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
TELEGRAM_CHAT_ID=123456789
```

#### مرحله 4: ریستارت Backend
```bash
# توقف backend (Ctrl+C)
# شروع دوباره
cd backgammon-auth-backend
npm run dev
```

### تست:
بعد از تنظیم، این اتفاقات میفته:
- ✅ Failed login attempts → Telegram notification
- ✅ Password reset request → لینک کامل در Telegram
- ✅ Successful login (فقط production)

### مستندات کامل:
📖 [docs/02-high-priority/TELEGRAM_SETUP.md](../docs/02-high-priority/TELEGRAM_SETUP.md)

---

## 🧪 Test Checklist

### Backend Health:
```bash
# Test با curl
curl http://localhost:3002/
# Expected: {"message":"Backgammon Auth Server is running"}

# Test login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nardaria.com","password":"admin123"}'
# Expected: 200 with tokens
```

### Frontend:
- [ ] صفحه Login باز میشه
- [ ] فرم Register کار میکنه
- [ ] بعد از login به Dashboard redirect میشه
- [ ] Profile page اطلاعات کاربر رو نشون میده

### Database:
```sql
-- Test connection
\c nardarena
-- Test query
SELECT COUNT(*) FROM users;
```

### Telegram:
- [ ] Bot token صحیح است
- [ ] Chat ID صحیح است
- [ ] Backend restart شده
- [ ] درخواست forgot password → لینک در Telegram ✅

---

## 🐛 Troubleshooting

### Backend نمیاد بالا:
```bash
# Check port 3002 is free
netstat -ano | findstr :3002

# Kill process if needed
taskkill /PID <PID_NUMBER> /F

# Check database connection
psql -U postgres -d nardarena
```

### Frontend نمیاد بالا:
```bash
# Check port 5173 is free
netstat -ano | findstr :5173

# Clear node_modules
cd backgammon-frontend
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Database errors:
```bash
# Check PostgreSQL service
Get-Service postgresql-x64-18

# Start if stopped
Start-Service postgresql-x64-18

# Check connection
psql -U postgres -l
```

### Telegram not working:
1. ✅ Check token format (باید شبیه `123456789:ABCdef...` باشه)
2. ✅ Check chat ID (باید عدد باشه مثل `123456789`)
3. ✅ Restart backend بعد از تغییر .env
4. ✅ Check console logs for errors
5. ✅ Test with curl:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
  -d "chat_id=<YOUR_CHAT_ID>&text=Test"
```

---

## 📋 Quick Commands

### Start All Services:
```powershell
# Terminal 1: Backend
cd backgammon-auth-backend; npm run dev

# Terminal 2: Frontend
cd backgammon-frontend; npm run dev

# Terminal 3 (Optional): pgweb
pgweb --host=localhost --port=5432 --user=postgres --db=nardarena --listen=8081
```

### Stop All Services:
- `Ctrl + C` در هر terminal
- PostgreSQL: `Stop-Service postgresql-x64-18` (optional)

### Check All Ports:
```powershell
netstat -ano | findstr ":3002 :5173 :5432 :8081"
```

---

## 🔄 Next Steps

### Immediate (امروز):
- [ ] تنظیم Telegram Bot (10 دقیقه)
- [ ] تست forgot password با Telegram
- [ ] شروع Phase 1 Admin Panel

### Short Term (این هفته):
- [ ] Admin Panel Layout
- [ ] Dashboard با آمار
- [ ] User Management

### Medium Term (این ماه):
- [ ] Transactions & Withdrawals
- [ ] Game Core Logic
- [ ] Real-time updates

---

## 📞 Support

### در صورت مشکل:
1. **مستندات:** `docs/INDEX.md`
2. **Lessons Learned:** `docs/01-critical/LESSONS-LEARNED.md`
3. **API Docs:** `docs/02-high-priority/API-DOCUMENTATION.md`
4. **Telegram Setup:** `docs/02-high-priority/TELEGRAM_SETUP.md`

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025 16:30  
**نسخه:** 1.0.0  
**محیط:** Development
