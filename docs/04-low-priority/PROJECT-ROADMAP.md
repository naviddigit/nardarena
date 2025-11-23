# 🎯 NardArena Project Roadmap
**آخرین بروزرسانی:** 23 نوامبر 2025  
**وضعیت:** در حال توسعه

---

## 📌 قوانین طلایی (GOLDEN RULES)

### 🚨 خط قرمز شماره 1: NO PERSIAN IN UI
**هیچ‌وقت، به هیچ عنوان، تحت هیچ شرایطی از فارسی در UI استفاده نکن.**
- ❌ دکمه‌ها، لیبل‌ها، placeholder، عنوان‌ها همه باید انگلیسی باشند
- ✅ فارسی فقط در کامنت‌ها و JSDoc مجاز است
- **نقض این قانون = شکست کامل**

### ❌ ممنوعیت‌های مطلق:
1. **هیچ فارسی در UI - فقط انگلیسی**
2. **هیچ تغییری در .env بدون هماهنگی**
3. **هیچ تغییری در رنگ‌بندی/theme بدون هماهنگی**
4. **هیچ hardcoded style در کامپوننت‌ها**
5. **هیچ تغییری در backend API بدون هماهنگی**
6. **هیچ پاک کردن فایل بدون هماهنگی**

### ✅ اصول کار:
1. **همه کامپوننت‌ها از مرجع واحد (Card, Button, Input)**
2. **تایپ‌اسکریپت کامل برای جلوگیری از undefined**
3. **Mock data تا زمان آماده شدن API**
4. **یک فایل = یک مسئولیت**
5. **مستندسازی داخل کد (JSDoc)**

---

## 🗂️ ساختار فایل‌ها (LOCKED - قابل تغییر نیست)

```
backgammon-frontend/src/
├── features/
│   ├── auth/           # احراز هویت
│   ├── player/         # پنل بازیکن
│   ├── admin/          # پنل ادمین
│   └── game/           # موتور بازی
├── shared/
│   ├── components/
│   │   ├── atoms/      # Button, Input, Badge
│   │   ├── molecules/  # Card, Modal
│   │   └── organisms/  # Header, Sidebar
│   ├── services/       # API calls
│   ├── types/          # TypeScript interfaces
│   └── utils/          # Helper functions
└── app/
    ├── providers/      # Context providers
    └── routes/         # Routing
```

---

## 📋 TODO List - فاز به فاز

### **PHASE 1: Type System & API Setup** 🔴 (اولویت 1)
**مدت تخمینی:** 1 روز  
**وضعیت:** ❌ شروع نشده

#### 1.1 Type Definitions
- [ ] `src/shared/types/user.types.ts`
  ```ts
  interface User {
    id: string;
    email: string;
    username: string;
    role: 'admin' | 'player';
    status: 'active' | 'suspended' | 'banned';
    balance: number;
    avatar?: string;
    createdAt: string;
  }
  ```

- [ ] `src/shared/types/game.types.ts`
  ```ts
  interface Game {
    id: string;
    players: [string, string]; // player IDs
    status: 'waiting' | 'active' | 'finished';
    board: BoardState;
    currentPlayer: number;
    dice: [number, number];
    stake: number;
    spectators: string[];
    createdAt: string;
  }
  ```

- [ ] `src/shared/types/transaction.types.ts`
  ```ts
  interface Transaction {
    id: string;
    userId: string;
    type: 'deposit' | 'withdraw' | 'game_win' | 'game_loss';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    method?: 'usdt-trc20' | 'usdt-bep20';
    txHash?: string;
    createdAt: string;
  }
  ```

- [ ] `src/shared/types/api.types.ts`
  ```ts
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  ```

#### 1.2 API Service Layer
- [ ] `src/shared/services/api.service.ts` - Axios config با interceptors
- [ ] `src/shared/services/auth.service.ts` - Login, Register, Logout
- [ ] `src/shared/services/user.service.ts` - CRUD users
- [ ] `src/shared/services/transaction.service.ts` - Deposits, Withdrawals
- [ ] `src/shared/services/game.service.ts` - Game CRUD

**تحویل:** تمام type ها و service های API

---

### **PHASE 2: Admin Panel Completion** 🟡 (اولویت 2)
**مدت تخمینی:** 2 روز  
**وضعیت:** 🟡 در حال انجام (50%)

#### 2.1 Users Management ✅ (70% تکمیل)
- [x] لیست کاربران
- [x] جستجو و فیلتر
- [x] ویرایش کاربر
- [x] حذف کاربر
- [ ] **افزودن کاربر (AddUserModal)**
  - فرم: email, username, password, role
  - اعتبارسنجی
  - اتصال به API
- [ ] Bulk Actions (select multiple + ban/activate)
- [ ] Export to CSV

#### 2.2 Transactions Management ❌
- [ ] `AdminTransactionsPage.tsx`
- [ ] لیست تراکنش‌ها با فیلتر (type, status, date)
- [ ] تأیید واریز (برای USDT)
- [ ] پردازش برداشت
- [ ] مشاهده جزئیات تراکنش

#### 2.3 Games Management ❌
- [ ] `AdminGamesPage.tsx`
- [ ] لیست بازی‌های فعال
- [ ] تاریخچه بازی‌ها
- [ ] آمار (win/loss ratio, popular times)
- [ ] مشاهده بازی live

**تحویل:** پنل ادمین کامل با API integration

---

### **PHASE 3: Payment Integration** 🔴 (اولویت 1)
**مدت تخمینی:** 2 روز  
**وضعیت:** ❌ شروع نشده

#### 3.1 Bybit Payment Gateway
**سوال:** آیا Bybit API برای پرداخت USDT (TRC20/BEP20) داری؟
- [ ] بررسی Bybit API Documentation
- [ ] دریافت API Keys
- [ ] تست در محیط sandbox

#### 3.2 Deposit Flow
- [ ] کاربر USDT address می‌بینه
- [ ] کاربر از wallet خودش واریز می‌کنه
- [ ] Backend TX hash رو verify می‌کنه
- [ ] موجودی به حساب اضافه میشه

#### 3.3 Withdraw Flow
- [ ] کاربر مبلغ + wallet address وارد می‌کنه
- [ ] Admin تأیید می‌کنه
- [ ] Backend USDT رو ارسال می‌کنه
- [ ] TX hash ذخیره میشه

**تحویل:** سیستم پرداخت کامل و کار کرده

---

### **PHASE 4: Game Engine** 🔴 (اولویت بالا)
**مدت تخمینی:** 5-7 روز  
**وضعیت:** ❌ شروع نشده

#### 4.1 Board Component (3 روز)
- [ ] `GameBoard.tsx` - Canvas rendering
- [ ] نمایش 24 نقطه (points)
- [ ] نمایش 30 مهره (15 سفید + 15 سیاه)
- [ ] Drag & Drop مهره‌ها
- [ ] انیمیشن حرکت
- [ ] نمایش تاس (dice)
- [ ] Responsive (desktop + mobile)

#### 4.2 Game Logic (2 روز)
- [ ] `gameLogic.ts` - قوانین تخته نرد
  - قوانین حرکت
  - اعتبارسنجی حرکت
  - خوردن مهره حریف
  - خارج کردن مهره‌ها
  - تشخیص برنده
- [ ] `diceRoller.ts` - تاس زدن (random + fair)
- [ ] State management (Redux یا Zustand)

#### 4.3 AI Player (2 روز)
- [ ] `aiEngine.ts` - هوش مصنوعی سطح متوسط
  - Minimax algorithm (ساده)
  - تصمیم‌گیری برای حرکت
  - 3 سطح: آسان، متوسط، سخت
- [ ] تست AI با بازی‌های مختلف

**منبع قوانین:** https://en.wikipedia.org/wiki/Backgammon

**تحویل:** بازی تخته نرد کامل با AI

---

### **PHASE 5: Multiplayer System** 🔴 (اولویت بالا)
**مدت تخمینی:** 4 روز  
**وضعیت:** ❌ شروع نشده

#### 5.1 WebSocket Setup (1 روز)
- [ ] Backend: Socket.IO server
- [ ] Frontend: Socket.IO client
- [ ] Connection management
- [ ] Reconnection logic

#### 5.2 Matchmaking (1 روز)
- [ ] صف انتظار بازیکنان
- [ ] یافتن حریف با stake مشابه
- [ ] ایجاد اتاق بازی
- [ ] دعوت دوست (private room)

#### 5.3 Real-time Game (2 روز)
- [ ] هماهنگ‌سازی حرکات
- [ ] تاس زدن همزمان
- [ ] پیام‌رسانی در بازی
- [ ] Timer برای هر نوبت
- [ ] Disconnect handling

#### 5.4 Spectator Mode ⭐ (مهم برای درآمد)
- [ ] تماشاگران می‌توانند بازی ببینند
- [ ] کارمزد ورود تماشاگر (اختیاری)
- [ ] نمایش تعداد تماشاگران
- [ ] چت تماشاگران

**تحویل:** سیستم multiplayer کامل با WebSocket

---

### **PHASE 6: Player Pages - Backend Integration** 🟡 (اولویت 2)
**مدت تخمینی:** 2 روز  
**وضعیت:** 🟡 UI آماده، نیاز به API

#### 6.1 Profile Page
- [x] UI آماده
- [ ] Get user data از API
- [ ] Update profile
- [ ] آپلود avatar (با Cloudinary یا S3)
- [ ] تغییر password

#### 6.2 Deposit Page
- [x] UI آماده
- [ ] نمایش USDT address
- [ ] چک کردن وضعیت تراکنش
- [ ] Notification بعد از تأیید

#### 6.3 Withdraw Page
- [x] UI آماده
- [ ] درخواست برداشت
- [ ] تاریخچه برداشت‌ها
- [ ] وضعیت برداشت (pending/completed)

#### 6.4 Game History Page
- [x] UI آماده
- [ ] لیست بازی‌ها از API
- [ ] فیلتر (date, result)
- [ ] Replay بازی

**تحویل:** صفحات Player کامل با داده واقعی

---

### **PHASE 7: Component Library Enhancement** 🟡 (مداوم)
**وضعیت:** در حال بهبود

#### 7.1 Missing Components
- [ ] `Modal.tsx` - استاندارد (با backdrop)
- [ ] `Dropdown.tsx` - کشویی
- [ ] `DatePicker.tsx` - انتخاب تاریخ
- [ ] `Chart.tsx` - نمودار (با recharts)
- [ ] `Table.tsx` - جدول استاندارد با pagination
- [ ] `Toast.tsx` - notification

#### 7.2 Theme System
- [x] CSS Variables برای رنگ‌ها
- [x] Dark/Light/Gaming modes
- [ ] بررسی consistency در همه صفحات

**تحویل:** کتابخانه component کامل

---

## 🔄 وضعیت فعلی پروژه

### ✅ تکمیل شده:
- Component Library اصلی (Button, Input, Card)
- Theme System (Dark/Light/Gaming)
- Auth Pages (Login, Register)
- Player Dashboard
- Admin Dashboard (UI)
- Users Management (70%)

### 🟡 در حال انجام:
- Admin Panel تکمیل
- Type Definitions

### ❌ باقی‌مانده:
- API Integration کامل
- Payment Gateway
- Game Engine
- Multiplayer System
- AI Player

---

## 📊 تخمین زمان کلی

| فاز | مدت | وضعیت |
|-----|------|--------|
| Phase 1: Types & API | 1 روز | ❌ |
| Phase 2: Admin Panel | 2 روز | 🟡 |
| Phase 3: Payment | 2 روز | ❌ |
| Phase 4: Game Engine | 5-7 روز | ❌ |
| Phase 5: Multiplayer | 4 روز | ❌ |
| Phase 6: Player Pages | 2 روز | 🟡 |
| Phase 7: Components | مداوم | 🟡 |

**مجموع:** 16-20 روز کاری

---

## 🎯 اولویت فعلی: PHASE 1

**امروز باید انجام شود:**
1. ✅ ساخت این roadmap
2. ⏳ ساخت تمام type definitions
3. ⏳ Setup API service layer
4. ⏳ AddUserModal در Admin

---

## 📝 یادداشت‌های مهم

### Backend API
- **Base URL:** از .env خوانده می‌شود
- **Auth:** JWT Token در header
- **Error Handling:** استاندارد با ApiResponse<T>

### Payment (Bybit)
- **سوال باز:** آیا Bybit API برای auto-payment داری؟
- **جایگزین:** Manual verification با TX hash

### Game Rules
- **منبع:** Wikipedia Backgammon
- **پیاده‌سازی:** از صفر با TypeScript

### WebSocket
- **Technology:** Socket.IO
- **Events:** move, dice, chat, spectate
- **Port:** 3001 (از backend جدا)

---

## 🚨 نکات حیاتی

1. **هر تغییر باید مستند شود در این فایل**
2. **قبل از شروع هر Phase، تأیید بگیر**
3. **بعد از تکمیل هر Task، چک‌بکس رو تیک بزن**
4. **اگر مشکلی پیش اومد، در این فایل یادداشت کن**

---

**آخرین ویرایش:** 23 نوامبر 2025 - ساعت 10:00  
**ویرایش بعدی:** بعد از تکمیل Phase 1
