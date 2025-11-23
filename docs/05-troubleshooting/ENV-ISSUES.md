# مشکلات Environment Variables و راه‌حل‌ها

## 🚨 مشکل: tsx فایل .env رو load نمیکنه

### علائم:
```
📱 Telegram Logger Initialized:
  TELEGRAM_LOGGING_ENABLED: undefined  ❌
  Config enabled: false                ❌
  Bot token: NOT SET                   ❌
  Chat ID: NOT SET                     ❌
```

### علت اصلی:
**`tsx` به صورت پیش‌فرض فایل `.env` رو load نمیکنه!**

### ✅ راه‌حل‌ها:

#### راه‌حل 1: استفاده از `--env-file` (توصیه میشه) ⭐

فایل `package.json` رو باز کن:

```json
{
  "scripts": {
    "dev": "tsx watch --env-file=.env src/server.ts"
  }
}
```

**مزایا:**
- ✅ سریع و ساده
- ✅ با tsx watch کار میکنه
- ✅ hot reload حفظ میشه
- ✅ نیازی به node module نداره

#### راه‌حل 2: استفاده از `-r dotenv/config`

```json
{
  "scripts": {
    "dev": "node -r dotenv/config node_modules/tsx/dist/cli.mjs watch src/server.ts"
  }
}
```

**مزایا:**
- ✅ با تمام ابزارها کار میکنه
- ✅ سازگار با node مستقیم

**معایب:**
- ⚠️ کمی پیچیده‌تر

#### راه‌حل 3: Manual در کد (پشتیبان)

در `src/server.ts` **قبل از همه importها**:

```typescript
// Load environment variables FIRST - before any other imports
import dotenv from 'dotenv';
dotenv.config();

// Now import everything else
import express from 'express';
import cors from 'cors';
// ...
```

**مزایا:**
- ✅ همیشه کار میکنه
- ✅ مستقل از ابزار اجرا

**معایب:**
- ⚠️ ممکنه با tsx همیشه کار نکنه
- ⚠️ اگه serviceها قبل از server.ts import بشن، باز مشکل داره

---

## 🧪 تست کردن

### تست 1: چک کردن .env با node مستقیم

```bash
cd backgammon-auth-backend
node -r dotenv/config -e "console.log('TELEGRAM_LOGGING_ENABLED:', process.env.TELEGRAM_LOGGING_ENABLED)"
```

**خروجی موفق:**
```
TELEGRAM_LOGGING_ENABLED: true
```

### تست 2: چک کردن محل فایل .env

```bash
cd backgammon-auth-backend
Test-Path .env
```

**باید True برگردونه**

### تست 3: چک کردن محتوای .env

```bash
cd backgammon-auth-backend
Get-Content .env | Select-String "TELEGRAM"
```

**باید این متغیرها رو نشون بده:**
```
TELEGRAM_LOGGING_ENABLED=true
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

---

## 📝 Checklist قبل از شروع پروژه

- [ ] فایل `.env` در `backgammon-auth-backend` وجود دارد
- [ ] متغیر `TELEGRAM_LOGGING_ENABLED=true` در `.env` هست
- [ ] `package.json` دستور `dev` با `--env-file=.env` دارد
- [ ] Backend restart شده (بعد از تغییر .env یا package.json)
- [ ] Console log باید نشون بده: `Config enabled: true`

---

## 🔍 Debug کردن

### 1. اضافه کردن Debug Log به service

در `src/services/telegramLogger.ts` - constructor:

```typescript
constructor() {
  this.config = {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
    enabled: process.env.TELEGRAM_LOGGING_ENABLED === 'true',
  };

  // Debug logging
  console.log('\n📱 Telegram Logger Initialized:');
  console.log('  TELEGRAM_LOGGING_ENABLED:', process.env.TELEGRAM_LOGGING_ENABLED);
  console.log('  Config enabled:', this.config.enabled);
  console.log('  Bot token:', this.config.botToken ? 'SET (hidden)' : 'NOT SET');
  console.log('  Chat ID:', this.config.chatId ? 'SET (hidden)' : 'NOT SET');
  console.log('');
}
```

### 2. چک کردن timing

⚠️ **مهم:** environment variables **فقط یکبار** در startup خونده میشن!

```typescript
// ❌ اشتباه - بعد از importها
import { telegramLogger } from './services/telegramLogger';
dotenv.config(); // دیر است! telegramLogger قبلاً ساخته شده

// ✅ درست - قبل از importها
import dotenv from 'dotenv';
dotenv.config(); // اول این رو اجرا کن
import { telegramLogger } from './services/telegramLogger'; // بعد import کن
```

---

## 🐛 مشکلات رایج

### مشکل 1: "undefined" حتی بعد از restart

**علت:** tsx watch در حال اجرا بوده و change رو detect نکرده

**راه‌حل:**
```bash
# Kill تمام node processes
Get-Process -Name node | Stop-Process -Force

# Start again
npm run dev
```

### مشکل 2: فایل .env وجود داره ولی load نمیشه

**علت:** `package.json` بدون `--env-file` است

**راه‌حل:**
```json
"dev": "tsx watch --env-file=.env src/server.ts"
```

### مشکل 3: در production کار میکنه ولی در development نه

**علت:** production از `node dist/server.js` استفاده میکنه که dotenv.config() دارد

**راه‌حل:** همیشه از `--env-file` در dev استفاده کن

---

## 📚 درس‌های آموخته شده

### ✅ بهترین Practice:

1. **فایل .env در همون پوشه پروژه** (backgammon-auth-backend، نه root)
2. **همیشه `--env-file=.env` در tsx**
3. **همیشه `dotenv.config()` قبل از importها** (به عنوان fallback)
4. **Debug log در constructor** (برای مشاهده مقادیر startup)
5. **تست با node مستقیم** قبل از tsx

### ❌ اشتباهات رایج:

1. ❌ گذاشتن `.env` در root به جای backend folder
2. ❌ اجرای `dotenv.config()` بعد از import کردن serviceها
3. ❌ فراموش کردن restart بعد از تغییر .env
4. ❌ استفاده از tsx بدون `--env-file`
5. ❌ فراموش کردن kill کردن process قبل از restart

---

## 🎯 Quick Fix Guide

### اگه Telegram کار نمیکنه:

```bash
# Step 1: چک کن فایل .env هست
cd backgammon-auth-backend
Test-Path .env

# Step 2: چک کن محتوای .env
Get-Content .env | Select-String "TELEGRAM"

# Step 3: چک کن package.json
Get-Content package.json | Select-String "dev"

# Step 4: Kill همه چیز
Get-Process -Name node | Stop-Process -Force

# Step 5: Start مجدد
npm run dev

# Step 6: چک کن console log
# باید ببینی: "Config enabled: true"
```

---

## 🔗 مستندات مرتبط

- [TELEGRAM_SETUP.md](../02-high-priority/TELEGRAM_SETUP.md) - راهنمای کامل Telegram
- [CRITICAL-CONFIGS.md](../00-MANDATORY/CRITICAL-CONFIGS.md) - تنظیمات حیاتی
- [STARTUP_GUIDE.md](../06-guides/STARTUP_GUIDE.md) - راهنمای شروع پروژه

---

**آخرین بروزرسانی:** 23 نوامبر 2025
**وضعیت:** ✅ حل شده با `--env-file=.env`
