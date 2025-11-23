# 📱 Telegram Bot Setup - Quick Guide

> **وضعیت فعلی: ⚠️ تنظیم نشده - Tokens are placeholder!**

---

## 🔴 مشکل فعلی

در فایل `.env` توکن‌های تلگرام placeholder هستن:

```env
❌ TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE  
❌ TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE      
```

**همین الان Telegram کار نمیکنه!** باید توکن‌های واقعی رو بگذارید.

---

## ✅ راه حل سریع (5 دقیقه)

### مرحله 1: ساخت Bot
1. به Telegram برو
2. [@BotFather](https://t.me/BotFather) رو پیدا کن
3. دستور `/newbot` بفرست
4. اسم بده: **NardAria Notifications**
5. Username بده: `nardarena_bot` یا هر چیز دیگه با `_bot`
6. **Token** رو کپی کن (مثل: `7899876543:AAHdqTcvCH...`)

### مرحله 2: گرفتن Chat ID
1. به bot خودت پیام `/start` بفرست
2. بعد به [@userinfobot](https://t.me/userinfobot) برو
3. دستور `/start` بزن
4. عدد **ID** رو کپی کن (مثل: `123456789`)

### مرحله 3: تنظیم .env
```env
# فایل: backgammon-auth-backend/.env
TELEGRAM_BOT_TOKEN=7899876543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw  ✅
TELEGRAM_CHAT_ID=123456789  ✅
```

**مهم:** مقادیر بالا مثال هستن! از token و chat ID خودتون استفاده کنید!

### مرحله 4: ریستارت Backend
```powershell
# توقف backend (Ctrl+C در terminal)
# شروع دوباره:
cd backgammon-auth-backend
npm run dev
```

---

## 🧪 تست سریع

### Option 1: درخواست Forgot Password
```powershell
curl -X POST http://localhost:3002/api/auth/forgot-password `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@nardaria.com"}'
```

**انتظار:** پیامی در تلگرام با کد 6 رقمی و لینک ریست پسورد ✅

### Option 2: Login اشتباه
```powershell
curl -X POST http://localhost:3002/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@nardaria.com","password":"wrong"}'
```

**انتظار:** پیام security در تلگرام ✅

---

## ❌ اگه کار نکرد

### چک کن Token درسته:
```
✅ صحیح: 123456789:ABCdefGHIjklMNOpqrs
❌ اشتباه: "123456789:ABC..." (با quote)
❌ اشتباه: 123456789:ABC ... (با space)
```

### چک کن Chat ID درسته:
```
✅ صحیح: 123456789
❌ اشتباه: "123456789" (string)
```

### ریستارت Backend:
بعد از هر تغییر در `.env` حتماً backend رو ریستارت کن!

---

## 📋 Console Logs

### وقتی Telegram فعاله:
```
✅ Backend log: "📱 Sending Telegram notification..."
✅ Response: 200 OK
```

### وقتی غیر فعاله:
```
⚠️ Backend log: "📱 Telegram disabled - SECURITY: ..."
```

---

## 📚 مستندات کامل

برای اطلاعات بیشتر:
- [TEST-TELEGRAM.md](../TEST-TELEGRAM.md) - تست‌های دقیق‌تر
- [docs/02-high-priority/TELEGRAM_SETUP.md](./02-high-priority/TELEGRAM_SETUP.md) - راهنمای کامل

---

## ✅ Checklist

```markdown
[ ] Bot ساختم از @BotFather
[ ] Token رو کپی کردم
[ ] Chat ID رو گرفتم از @userinfobot
[ ] .env رو آپدیت کردم
[ ] Backend رو restart کردم
[ ] Forgot password تست کردم
[ ] پیام رو در Telegram دیدم ✅
```

---

**تاریخ:** 22 نوامبر 2025  
**وضعیت:** ⚠️ منتظر تنظیم توسط کاربر

