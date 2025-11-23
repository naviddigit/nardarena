# 🚨 توکن‌های تلگرام از دست رفته!

## مشکل:
توکن‌های تلگرام که قبلاً تست کردید و کار میکردند، الان در `.env` پاک شده‌اند و placeholder گذاشته شده.

## راه حل:

### گزینه 1: اگر توکن‌ها رو یادتونه یا ذخیره کردید
فایل `.env` رو باز کنید و جایگزین کنید:

```bash
# فایل: backgammon-auth-backend/.env

# این خطوط رو پیدا کنید:
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE

# و با توکن‌های واقعی جایگزین کنید:
TELEGRAM_BOT_TOKEN=<توکن واقعی که از @BotFather گرفتید>
TELEGRAM_CHAT_ID=<chat ID واقعی که از @userinfobot گرفتید>
```

### گزینه 2: اگر توکن‌ها رو ندارید
باید دوباره از bot تلگرام بگیرید:

#### مرحله 1: Token موجود رو از @BotFather بگیرید
1. به [@BotFather](https://t.me/BotFather) برید
2. دستور `/mybots` بزنید
3. bot خودتون رو انتخاب کنید (احتمالاً NardAria Notifications)
4. گزینه "API Token" رو بزنید
5. توکن رو کپی کنید

#### مرحله 2: Chat ID رو دوباره بگیرید
1. به [@userinfobot](https://t.me/userinfobot) برید
2. دستور `/start` بزنید
3. عدد ID رو کپی کنید

#### مرحله 3: در .env بگذارید
```env
TELEGRAM_BOT_TOKEN=<توکن از مرحله 1>
TELEGRAM_CHAT_ID=<chat ID از مرحله 2>
```

### مرحله نهایی: Restart Backend
```powershell
# در terminal backend (Ctrl+C برای توقف)
cd backgammon-auth-backend
npm run dev
```

---

## تست سریع

بعد از restart، تست کنید:

```powershell
curl -X POST http://localhost:3002/api/auth/forgot-password `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@nardaria.com"}'
```

**انتظار:** پیامی در تلگرام با لینک ریست پسورد ✅

---

## یادآوری مهم

وقتی توکن‌ها رو گذاشتید، **حتماً backend رو restart کنید!**

Backend فقط یک بار در startup توکن‌ها رو می‌خونه.

---

## خبر خوب

کد تلگرام کامل و آمادست! 🎉

این پیام شما ثابت میکنه که قبلاً کار میکرد:

> تست سیستم خطایابی
> 
> این یک پیام تستی است.
> 
> ✅ ارسال موفقیت‌آمیز بود!
> 
> 🕐 زمان: ۱۴۰۴/۸/۳۰, ۱۷:۱۳:۴۸
> 🔧 محیط: development

همین setup قبلی رو فقط باید دوباره بزارید و کار میکنه! ✅

---

**تاریخ:** 22 نوامبر 2025
