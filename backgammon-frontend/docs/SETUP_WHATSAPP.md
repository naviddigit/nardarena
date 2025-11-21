# Quick Setup Guide for WhatsApp Notifications
# راهنمای سریع راه‌اندازی اعلان واتساپ

## گام 1: ثبت‌نام در Twilio (5 دقیقه)

1. برو به https://www.twilio.com/try-twilio
2. ثبت‌نام کن با ایمیل
3. شماره تلفنت رو verify کن
4. از داشبورد **Account SID** و **Auth Token** رو کپی کن
5. برو به بخش "Messaging" → "Try WhatsApp"
6. به شماره واتساپ Twilio پیام بده: `join <sandbox-name>`
7. شماره واتساپت حالا متصل به sandbox شد ✅

## گام 2: نصب Backend Service (10 دقیقه)

```bash
cd backgammon-error-service
npm install
```

## گام 3: تنظیم Environment Variables

کپی کن `.env.example` به `.env`:
```bash
cp .env.example .env
```

ویرایش `.env`:
```env
PORT=3001
TWILIO_ACCOUNT_SID=ACxxxxxx...     # از Twilio dashboard
TWILIO_AUTH_TOKEN=your_token...    # از Twilio dashboard
TWILIO_WHATSAPP_NUMBER=+14155238886  # Sandbox number از Twilio
ADMIN_WHATSAPP_NUMBER=+989123456789  # شماره واتساپ خودت
API_KEY=generate-a-random-key-here   # یک رشته تصادفی امن بساز
FRONTEND_URL=http://localhost:5173
```

## گام 4: تست Backend (2 دقیقه)

```bash
# شروع سرور
npm run dev

# تست با curl در ترمینال دیگر:
curl -X POST http://localhost:3001/api/errors/report \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d "{\"message\":\"Test error\",\"level\":\"error\",\"url\":\"https://test.com\",\"timestamp\":\"$(date -Iseconds)\"}"
```

باید یک پیام واتساپ دریافت کنی! 🎉

## گام 5: اتصال Frontend (5 دقیقه)

در frontend، کپی کن `.env.production.example` به `.env.production`:
```bash
cd ../backgammon-frontend
cp .env.production.example .env.production
```

ویرایش `.env.production`:
```env
VITE_ERROR_API_URL=http://localhost:3001
VITE_ERROR_API_KEY=your-api-key-from-backend
```

## گام 6: تست Complete System (3 دقیقه)

```bash
# Start backend (terminal 1)
cd backgammon-error-service
npm run dev

# Start frontend (terminal 2)
cd backgammon-frontend
npm run dev
```

حالا در frontend، یک خطا trigger کن:
```javascript
// Open console in browser
window.logger.error('Testing WhatsApp notification!', { test: true });
```

باید پیام واتساپ بگیری! ✅

## گام 7: Deploy به Production (20 دقیقه)

### Backend: Vercel (ساده‌ترین)

```bash
cd backgammon-error-service
npm install -g vercel
vercel login
vercel
```

در Vercel dashboard، environment variables رو اضافه کن.

### Frontend: Build و Deploy

```bash
cd backgammon-frontend
npm run build

# Deploy to Vercel/Netlify/etc
vercel
```

در environment variables production، `VITE_ERROR_API_URL` رو به URL backend Vercel تغییر بده.

## گام 8: مانیتور کردن 📊

حالا هر خطای critical در production خودکار به واتساپت پیام میده:
- ✅ با جزئیات کامل خطا
- ✅ زمان (به وقت تهران)
- ✅ صفحه‌ای که خطا رخ داده
- ✅ اطلاعات کاربر (اگر موجود باشه)
- ✅ نوع دستگاه

## مشکلات رایج و راه‌حل

### ❌ پیام واتساپ نمی‌آد

**چک کن:**
1. Twilio credentials درست هستن؟
2. شماره واتساپ به sandbox وصل شده؟ (پیام join فرستادی؟)
3. Backend اجرا شده؟ `curl http://localhost:3001/health`
4. API_KEY در frontend و backend یکیه?
5. لاگ‌های console رو چک کن

### ❌ CORS error در frontend

در backend `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

### ❌ Rate limit error

خیلی زیاد خطا میفرستی! Rate limiter کار میکنه. صبر کن 1 دقیقه.

### ❌ Duplicate prevention

اگر همون خطا رو تو 5 دقیقه دوباره بفرستی، پیام واتساپ نمی‌آد (جلوگیری از spam).

## هزینه‌ها 💰

### Twilio (توصیه میشه)
- **رایگان:** $15 credit اولیه (≈3000 پیام)
- **بعدش:** $0.005 هر پیام
- **ماهانه:** اگه 100 خطا در روز = ~$15/ماه

### جایگزین رایگان
- **WAHA (self-hosted):** رایگان ولی نیاز به VPS
- **Telegram Bot:** رایگان کامل (جایگزین واتساپ)

## امنیت 🔒

✅ همیشه HTTPS در production
✅ API key رو محرمانه نگه دار
✅ هیچوقت credentials رو commit نکن
✅ از .gitignore استفاده کن
✅ API key قوی بساز (مثلاً با `openssl rand -hex 32`)

## بهینه‌سازی

### جلوگیری از spam:
- ✅ Rate limiting (20 req/min)
- ✅ Duplicate prevention (5 min window)
- ✅ فقط خطاهای critical ارسال میشن

### پیام‌های Rich:
- 🚨 سطح خطا (error/warn/info)
- 📝 پیام کامل
- 🌐 صفحه
- ⏰ زمان (فارسی)
- 👤 شناسه کاربر
- 📱 نوع دستگاه

## کامل شد! 🎉

حالا سیستم error tracking با WhatsApp notification آماده‌است:

1. ✅ Backend service اجرا میشه
2. ✅ Frontend به backend متصله
3. ✅ خطاهای critical به واتساپ میاد
4. ✅ Rate limiting و duplicate prevention فعاله
5. ✅ لاگ‌ها ذخیره میشن

**در صورت بروز هر مشکلی در production، فوراً در واتساپ مطلع میشی! 📱**
