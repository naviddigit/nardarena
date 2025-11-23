# 📚 Nard Arena - مستندات کامل پروژه

> **آخرین بروزرسانی**: November 21, 2025

---

## 🎯 فهرست مطالب

1. [معرفی پروژه](#معرفی-پروژه)
2. [راه‌اندازی سریع](#راه‌اندازی-سریع)
3. [معماری سیستم](#معماری-سیستم)
4. [احراز هویت (Mock Mode)](#احراز-هویت)
5. [صفحات و Routing](#صفحات-و-routing)
6. [کامپوننت‌ها](#کامپوننت‌ها)
7. [Backend Services](#backend-services)
8. [قوانین توسعه](#قوانین-توسعه)
9. [TODO List](#todo-list)

---

## 🎮 معرفی پروژه

**Nard Arena** یک پلتفرم آنلاین بازی تخته نرد با قابلیت‌های:
- بازی با AI (سطوح مختلف سختی)
- بازی آنلاین با بازیکنان دیگر
- تورنومنت‌ها و جوایز
- سیستم رتبه‌بندی و پروفایل

### تکنولوژی‌ها:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + Framer Motion
- **Backend Auth**: (در حال ساخت) Node.js + Express + JWT + MongoDB
- **Error Tracking**: Express + Telegram Bot + File Logging
- **UI Design**: Atomic Design Pattern
- **State Management**: React Context API

---

## 🚀 راه‌اندازی سریع

### پیش‌نیازها:
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### نصب و اجرا:
```bash
# 1. Clone repository
git clone https://github.com/naviddigit/nardarena.git
cd NardAria-v3

# 2. نصب dependencies
cd backgammon-frontend && npm install
cd ../backgammon-error-service && npm install

# 3. اجرای هر دو سرویس
cd ..
start-dev.bat
```

### URLها:
- **Frontend**: http://localhost:5173
- **Error Service**: http://localhost:3001
- **Admin Panel**: http://localhost:5173/admin
- **Player Dashboard**: http://localhost:5173/dashboard

---

## 🏗️ معماری سیستم

### ساختار پروژه:
```
NardAria-v3/
├── docs/                          # 📚 تمام مستندات
│   └── PROJECT.md                 # این فایل
├── backgammon-frontend/           # React Frontend
│   ├── src/
│   │   ├── app/                   # Core app setup
│   │   │   ├── providers/         # Context providers
│   │   │   └── router/            # Routing config
│   │   ├── features/              # Feature modules
│   │   │   ├── auth/              # Authentication
│   │   │   │   ├── pages/         # LoginPage, RegisterPage
│   │   │   │   ├── hooks/         # useAuth
│   │   │   │   ├── services/      # authService (Mock)
│   │   │   │   └── types/         # Auth types
│   │   │   ├── admin/             # Admin Panel
│   │   │   ├── player/            # Player Dashboard
│   │   │   └── demo/              # Component Demos
│   │   └── shared/                # Shared resources
│   │       ├── components/        # UI Components
│   │       │   ├── atoms/         # Input, Button, Icon
│   │       │   ├── molecules/     # Toast, Card
│   │       │   └── organisms/     # ThemeToggle, DebugPanel
│   │       └── utils/             # Utilities
│   └── public/                    # Static assets
├── backgammon-error-service/      # Error Tracking Backend
│   └── src/
│       ├── routes/                # API routes
│       ├── services/              # Telegram, Logger
│       └── utils/                 # Helpers
└── start-dev.bat                  # Quick start script
```

### Atomic Design Pattern:
```
Atoms       → Input, Button, Icon (پایه‌ای‌ترین)
Molecules   → Toast, Card (ترکیب atoms)
Organisms   → ThemeToggle, Navigation (ترکیب molecules)
Templates   → Page Layouts
Pages       → LoginPage, Dashboard (ترکیب همه)
```

---

## 🔐 احراز هویت (Mock Mode)

### ⚠️ وضعیت فعلی:
**فعلاً از Mock Authentication استفاده میکنیم** چون backend auth هنوز ساخته نشده.

### لاگین تست:

#### Admin:
```
Email: admin@nardarena.com
Password: admin123456
Role: admin
→ Redirect to: /admin (Component Showcase)
```

#### Player:
```
Email: هر email دیگه‌ای (مثلاً player@test.com)
Password: هر چیزی (مثلاً 123)
Role: player
→ Redirect to: /dashboard (Game Dashboard)
```

### نحوه کار Mock:
```typescript
// authService.ts
const USE_MOCK = true;

if (email === 'admin@nardarena.com' && password === 'admin123456') {
  return { user: { role: 'admin', ... }, token: 'mock-token' };
} else {
  return { user: { role: 'player', ... }, token: 'mock-token' };
}
```

### Console Output:
```
🔧 Using MOCK login (no real backend)
```

---

## 📄 صفحات و Routing

### Public Pages:
| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | ورود به سیستم |
| `/register` | RegisterPage | ثبت‌نام |

### Protected Pages:
| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Redirect | Logged In | → `/dashboard` |
| `/dashboard` | PlayerDashboard | Player | صفحه اصلی بازیکنان |
| `/admin` | AdminPanel | Admin Only | پنل مدیریت و تست کامپوننت‌ها |

### Player Dashboard:
- ✅ **Play with AI** (فعال)
- 🔜 **Play with Players** (Coming Soon)
- 🔜 **Tournament** (Coming Soon)
- آمار: Games Played, Wins, Win Rate

### Admin Panel:
- Component Showcase (Button, Input, Avatar, Badge, Spinner, Card, Divider)
- Test Panel (Error tracking, Telegram)
- Debug Panel

---

## 🧩 کامپوننت‌ها

### Input Components (Atoms):

#### TextInput:
```tsx
import { TextInput } from '@shared/components/atoms/Input';

<TextInput
  type="email"
  placeholder="Email"
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  helperText="We'll never share your email"
  fullWidth
/>
```

**Props:**
- `type`: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search'
- `label`: Label بالای input
- `error`: پیام خطا (input قرمز می‌شود)
- `helperText`: متن راهنما زیر input
- `leftIcon`: آیکون سمت چپ
- `fullWidth`: عرض 100%

#### PasswordInput:
```tsx
import { PasswordInput } from '@shared/components/atoms/Input';

<PasswordInput
  placeholder="Password"
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={errors.password}
  helperText="At least 8 characters"
  fullWidth
/>
```

**ویژگی‌ها:**
- دکمه چشم برای نمایش/مخفی کردن
- آیکون قفل اتوماتیک
- Dark/Light mode support

### Button Component:
```tsx
import { Button } from '@shared/components/atoms/Button';

<Button 
  variant="gradient"  // primary | secondary | gradient
  fullWidth
  onClick={handleSubmit}
  disabled={isLoading}
  isLoading={isLoading}
>
  Login
</Button>
```

### Animation:
```tsx
import { PageTransition } from '@shared/components/animations/PageTransition';

<PageTransition 
  transitionKey="unique-key"
  direction="horizontal"  // or "vertical"
  duration={0.4}
>
  <YourContent />
</PageTransition>
```

---

## 🖥️ Backend Services

### 1. Error Tracking Service (Port 3001)

**فایل**: `backgammon-error-service/`

**endpoints:**
- `POST /api/errors/report` - گزارش خطا از frontend
- `GET /api/errors/stats` - آمار خطاها
- `POST /api/test/telegram` - تست Telegram Bot
- `GET /health` - Health check

**قابلیت‌ها:**
- ذخیره خطاها در فایل (`logs/errors-YYYY-MM-DD.json`)
- ارسال نوتیفیکیشن به Telegram
- Rate limiting
- Duplicate error prevention

**تنظیمات** (`.env`):
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
API_KEY=your-secure-key
```

### 2. Authentication Backend (❌ نیاز به ساخت)

**پیشنهادی:**
```
backgammon-auth-backend/
├── src/
│   ├── routes/
│   │   └── auth.ts          # /api/auth/*
│   ├── models/
│   │   └── User.ts          # MongoDB Model
│   ├── middleware/
│   │   └── auth.ts          # JWT Verification
│   ├── services/
│   │   └── authService.ts   # Business Logic
│   └── server.ts
└── .env
```

**Endpoints مورد نیاز:**
- `POST /api/auth/register` - ثبت‌نام
- `POST /api/auth/login` - ورود
- `GET /api/auth/me` - اطلاعات کاربر
- `POST /api/auth/logout` - خروج
- `POST /api/auth/refresh` - تمدید token

**تکنولوژی پیشنهادی:**
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt (hash password)
- Joi (validation)

---

## 📋 قوانین توسعه

### 🔴 قانون خط قرمز: یک منبع واحد

**هرگز دچار دوگانگی فایل نشو!**

#### قبل از هر کار:
```bash
1. grep_search "export.*ComponentName"
2. file_search "**/ComponentName*.tsx"
3. تعداد نتایج = 1؟ → ادامه بده
4. بیشتر از 1؟ → STOP! پاک کن duplicate!
```

#### ممنوعیت‌ها:
- ❌ دو تا Input component
- ❌ دو تا Button component
- ❌ دو تا Animation system
- ❌ هاردکد styles (همیشه از component استفاده کن)

#### Checklist:
- [ ] Component قبلاً وجود داره?
- [ ] فایل مشابه دیگه‌ای هست?
- [ ] دارم از component استفاده میکنم یا هاردکد مینویسم?

### زبان:
- **با کاربر**: فارسی
- **UI Text**: انگلیسی
- **Comments/Docs**: فارسی

### Git Workflow:
```bash
git add .
git commit -m "feat: توضیح فارسی تغییرات"
git push
```

---

## ✅ TODO List

### فاز 1: Foundation (✅ تکمیل شده)
- [x] Setup React + Vite + TypeScript
- [x] TailwindCSS + Dark Mode
- [x] Atomic Design Structure
- [x] Input Components (TextInput, PasswordInput)
- [x] Button Component
- [x] Auth Pages (Login, Register)
- [x] Mock Authentication
- [x] Routing + Protected Routes
- [x] Player Dashboard
- [x] Admin Panel

### فاز 2: Backend Authentication (🔄 در حال انجام)
- [ ] Setup Express + MongoDB
- [ ] User Model + Schema
- [ ] JWT Authentication
- [ ] Register Endpoint
- [ ] Login Endpoint
- [ ] Protected Routes Middleware
- [ ] Refresh Token System
- [ ] Connect Frontend to Real Backend

### فاز 3: Game Core (⏳ آینده)
- [ ] Game Board Component
- [ ] Dice Component
- [ ] Checkers Movement Logic
- [ ] Game State Management
- [ ] AI Engine (Basic)
- [ ] Single Player Mode

### فاز 4: Multiplayer (⏳ آینده)
- [ ] Socket.io Setup
- [ ] Real-time Game Sync
- [ ] Matchmaking System
- [ ] Chat System
- [ ] Player vs Player Mode

### فاز 5: Advanced Features (⏳ آینده)
- [ ] Tournament System
- [ ] Leaderboard
- [ ] User Profile & Stats
- [ ] Achievements
- [ ] Rewards System
- [ ] Payment Integration

---

## 📞 پشتیبانی

- **GitHub**: https://github.com/naviddigit/nardarena
- **Issues**: https://github.com/naviddigit/nardarena/issues

---

**ساخته شده با ❤️ توسط Navid**
