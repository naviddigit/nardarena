# راهنمای جامع Telegram - Nard Arena

> **📅 آخرین بروزرسانی:** 23 نوامبر 2025  
> **✅ وضعیت:** فعال و کار می‌کند

---

## فهرست مطالب

1. [چرا Telegram؟](#چرا-telegram)
2. [راه‌اندازی اولیه](#راه‌اندازی-اولیه)
3. [تنظیمات Backend](#تنظیمات-backend)
4. [تست سیستم](#تست-سیستم)
5. [عیب‌یابی](#عیب‌یابی)
6. [اطلاعات فنی](#اطلاعات-فنی)

---

## چرا Telegram؟

### ✅ مزایا
- **رایگان کامل** - بدون محدودیت تعداد پیام
- **API ساده** - خیلی راحت‌تر از WhatsApp/Twilio
- **Formatting کامل** - Bold, Italic, Code blocks, Links
- **ارسال به گروه/کانال** - همه تیم در جریان
- **بدون نیاز به تأیید** - فوری کار می‌کند

### مقایسه هزینه
| سرویس | هزینه روزانه | هزینه ماهانه |
|--------|--------------|---------------|
| Telegram | **رایگان** 🎉 | **رایگان** |
| WhatsApp (50 error/روز) | $0.25 | ~$7.5 |
| WhatsApp (500 error/روز) | $2.5 | ~$75 |

---

## راه‌اندازی اولیه

### مرحله 1: ساخت Bot

1. در تلگرام به [@BotFather](https://t.me/BotFather) پیام دهید
2. دستور `/newbot` را ارسال کنید
3. نام bot را وارد کنید: `Nard Arena Alerts`
4. username انتخاب کنید (باید به `_bot` ختم شود): `NardArenaAlertsBot`
5. **Token** را کپی و در جای امنی ذخیره کنید

**نمونه Token:**
```
7012345678:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

### مرحله 2: ساخت کانال/گروه

#### گزینه A: کانال خصوصی (توصیه می‌شود)
```
تلگرام → Channels → New Channel
نام: "🎮 Nard Arena - Dev Alerts"
توضیحات: "گزارش خطاها و اعلانات سیستم"
نوع: Private
```

#### گزینه B: گروه
```
تلگرام → Groups → New Group
نام: "Nard Arena Dev Team"
اضافه کردن اعضا
```

### مرحله 3: اضافه کردن Bot

1. وارد کانال/گروه شوید
2. Settings → Administrators → Add Administrator
3. Bot خود را جستجو کنید: `@NardArenaAlertsBot`
4. اضافه کرده و حق **Post Messages** دهید

### مرحله 4: دریافت Chat ID

#### روش 1: استفاده از API (ساده‌ترین)

```bash
# 1. یک پیام در کانال ارسال کنید (مثلاً "test")

# 2. این URL را در مرورگر باز کنید:
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates

# 3. در response دنبال "chat" بگردید:
{
  "chat": {
    "id": -1001234567890,  # <-- این Chat ID است
    "title": "Nard Arena - Dev Alerts"
  }
}
```

**نکته:** Chat ID کانال‌ها با `-100` شروع می‌شود

#### روش 2: Bot Helper

```
1. به [@userinfobot](https://t.me/userinfobot) پیام دهید
2. یک پیام از کانال خود را forward کنید
3. Chat ID را دریافت کنید
```

---

## تنظیمات Backend

### 1. فایل .env

فایل `.env` در `backgammon-auth-backend`:

```env
# Telegram Logging
TELEGRAM_LOGGING_ENABLED=true
TELEGRAM_BOT_TOKEN=7012345678:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
TELEGRAM_CHAT_ID=-1001234567890
```

**⚠️ نکات مهم:**
- `TELEGRAM_LOGGING_ENABLED` باید دقیقاً `true` باشد (string)
- `TELEGRAM_BOT_TOKEN` را بدون فاصله و quote اضافی وارد کنید
- `TELEGRAM_CHAT_ID` برای کانال‌ها باید با `-` شروع شود

### 2. Package.json

مطمئن شوید `dev` script به این صورت است:

```json
{
  "scripts": {
    "dev": "tsx watch --env-file=.env src/server.ts"
  }
}
```

**مهم:** فلگ `--env-file=.env` ضروری است! بدون آن tsx فایل .env را load نمی‌کند.

### 3. Restart Backend

```bash
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Start backend
cd backgammon-auth-backend
npm run dev
```

### 4. تأیید لود شدن

در console باید این پیام را ببینید:

```
📱 Telegram Logger Initialized:
  TELEGRAM_LOGGING_ENABLED: true          ✅
  Config enabled: true                     ✅
  Bot token: SET (hidden)                  ✅
  Chat ID: SET (hidden)                    ✅
```

اگر `undefined` دیدید، به [عیب‌یابی](#عیب‌یابی) مراجعه کنید.

---

## تست سیستم

### تست 1: Test Endpoint

```bash
curl -X POST http://localhost:3002/api/logs/test-telegram
```

**انتظار:**
- Response: `{"success": true, "message": "Test message sent"}`
- پیام در تلگرام: "🧪 Telegram Test - This is a test notification"

### تست 2: Forgot Password

```bash
curl -X POST http://localhost:3002/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nardarena.com"}'
```

**انتظار در تلگرام:**
```
🔐 Password Reset Request

Email: admin@nardarena.com
کد تأیید: 123456

🔗 لینک ریست پسورد:
http://localhost:5173/reset-password?token=...

⏰ اعتبار: 1 ساعت
🕒 2025-11-23 14:30:00
```

### تست 3: Failed Login (5 بار)

```bash
# 5 بار با پسورد اشتباه لاگین کنید
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrong"}'
```

**انتظار در تلگرام (بعد از 5 بار):**
```
⚠️ Security Warning: Multiple Failed Login Attempts

📧 Email: test@test.com
🔢 Attempts: 5
🌐 IP: ::1
📍 Location: localhost

⏰ 2025-11-23 14:30:00

🔒 5 تلاش ناموفق برای ورود به حساب کاربری
```

### تست 4: Frontend Test Panel

```
1. برو به: http://localhost:5173/test
2. کلیک کن: "📱 Test Telegram"
3. چک کن تلگرام
```

---

## عیب‌یابی

### مشکل 1: TELEGRAM_LOGGING_ENABLED: undefined

**علائم:**
```
📱 Telegram Logger Initialized:
  TELEGRAM_LOGGING_ENABLED: undefined     ❌
  Config enabled: false                    ❌
```

**راه‌حل:**

1. چک کنید `package.json` دارای `--env-file=.env` است:
   ```json
   "dev": "tsx watch --env-file=.env src/server.ts"
   ```

2. چک کنید فایل `.env` در `backgammon-auth-backend` وجود دارد:
   ```bash
   cd backgammon-auth-backend
   Test-Path .env  # باید True برگرداند
   ```

3. Restart کامل:
   ```bash
   Get-Process -Name node | Stop-Process -Force
   npm run dev
   ```

4. مراجعه کنید به: [ENV-ISSUES.md](../05-troubleshooting/ENV-ISSUES.md)

### مشکل 2: "Chat not found"

**علت:** Chat ID اشتباه است

**راه‌حل:**
1. Bot را به کانال اضافه کنید
2. Bot را Admin کنید  
3. مجدداً Chat ID را از `getUpdates` دریافت کنید
4. Chat ID کانال‌ها با `-100` شروع می‌شود

### مشکل 3: "Forbidden: bot was blocked"

**راه‌حل:**
1. Bot را Remove نکنید
2. Bot را مجدداً Admin کنید با حق Post Messages

### مشکل 4: پیام ارسال نمی‌شود

**Debug:**
```bash
# تست مستقیم API تلگرام
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=<CHAT_ID>&text=Direct test"
```

**چک‌لیست:**
- [ ] Token درست است
- [ ] Chat ID درست است  
- [ ] Bot در کانال Admin است
- [ ] Bot حق Post Messages دارد
- [ ] `.env` درست است
- [ ] Backend restart شده

---

## اطلاعات فنی

### Services

#### 1. telegramLogger.ts
محل: `backgammon-auth-backend/src/services/telegramLogger.ts`

**متدها:**
```typescript
telegramLogger.logError(...)    // خطاهای سیستم
telegramLogger.logWarning(...)  // هشدارهای امنیتی
telegramLogger.logInfo(...)     // اطلاعات مهم
```

#### 2. loginAttemptsTracker.ts
محل: `backgammon-auth-backend/src/services/loginAttemptsTracker.ts`

**ویژگی‌ها:**
- Track تلاش‌های ناموفق لاگین
- Warning بعد از 5 بار
- Debounce: 2 دقیقه (جلوگیری از spam)

### Routes

```
POST /api/logs/test-telegram         # تست Telegram
POST /api/logs/frontend-errors       # دریافت خطاهای Frontend
POST /api/auth/forgot-password       # ریست پسورد (با Telegram)
POST /api/auth/login                 # لاگین (با tracking)
```

### Environment Variables

| Variable | Type | Example | Required |
|----------|------|---------|----------|
| `TELEGRAM_LOGGING_ENABLED` | string | `"true"` | ✅ |
| `TELEGRAM_BOT_TOKEN` | string | `"123:ABC..."` | ✅ |
| `TELEGRAM_CHAT_ID` | string | `"-1001234..."` | ✅ |

**نکته:** همه به صورت string هستند!

### Message Format

```typescript
interface TelegramMessage {
  type: 'ERROR' | 'WARNING' | 'INFO';
  service: string;
  endpoint?: string;
  user?: { id: string; email: string };
  error: { message: string; stack?: string; code?: string };
  timestamp: string;
}
```

---

## Best Practices

### ✅ انجام دهید
- همیشه از `--env-file=.env` استفاده کنید
- Debug log در constructor serviceها
- Test با `getUpdates` قبل از integration
- استفاده از کانال خصوصی برای production
- Debounce برای جلوگیری از spam

### ❌ انجام ندهید
- Token را commit نکنید
- Bot را از کانال Remove نکنید
- Chat ID را hardcode نکنید
- بدون restart تغییرات .env را test نکنید

---

## منابع

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [BotFather](https://t.me/BotFather)
- [ENV Issues Guide](../05-troubleshooting/ENV-ISSUES.md)

---

## 📞 پشتیبانی

### مستندات مرتبط
- [CRITICAL-CONFIGS.md](../00-MANDATORY/CRITICAL-CONFIGS.md) - تنظیمات حیاتی
- [ENV-ISSUES.md](../05-troubleshooting/ENV-ISSUES.md) - مشکلات محیط
- [STARTUP_GUIDE.md](../06-guides/STARTUP_GUIDE.md) - راهنمای شروع

### تماس
اگر مشکلی حل نشد، مستندات بالا را مطالعه کنید یا در issues گزارش دهید.

---

**✅ آماده برای استفاده!**

Token و Chat ID خود را در `.env` قرار دهید و لذت ببرید! 🚀
