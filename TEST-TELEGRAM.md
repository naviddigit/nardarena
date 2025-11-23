# 🧪 تست سریع Telegram Bot

## ⚠️ مهم: قبل از تست

اطمینان حاصل کن که در `.env` این مقادیر رو درست تنظیم کردی:

```env
TELEGRAM_NOTIFICATIONS=true
TELEGRAM_BOT_TOKEN=7899876543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
TELEGRAM_CHAT_ID=123456789
```

**توجه:** مقادیر بالا فقط مثال هستن! باید token و chat ID واقعی خودت رو بزاری.

---

## 🚀 راه‌اندازی Backend

```powershell
cd backgammon-auth-backend
npm run dev
```

منتظر بمون تا این پیام رو ببینی:
```
✅ Database connected successfully
🚀 Server is running on http://localhost:3002
```

---

## 🧪 تست 1: Forgot Password

### با curl:
```powershell
curl -X POST http://localhost:3002/api/auth/forgot-password `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@nardaria.com"}'
```

### با Postman:
```
POST http://localhost:3002/api/auth/forgot-password
Content-Type: application/json

{
  "email": "admin@nardaria.com"
}
```

### انتظار:
1. ✅ Response 200: `{"message":"If this email exists, a reset link has been sent"}`
2. ✅ Console log در terminal backend:
   ```
   🔐 Password Reset Link for admin@nardaria.com:
   📱 Reset Code: 123456
   🔗 Link: http://localhost:5173/reset-password?token=123456&email=...
   ```
3. ✅ **پیام در تلگرام** شامل:
   - 🔐 Password Reset Request
   - ایمیل
   - کد 6 رقمی
   - لینک کامل
   - زمان انقضا

---

## 🧪 تست 2: Failed Login

### با curl:
```powershell
curl -X POST http://localhost:3002/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@nardaria.com","password":"wrongpassword"}'
```

### انتظار:
1. ✅ Response 401: `{"error":"Invalid email or password"}`
2. ✅ **پیام در تلگرام** شامل:
   - 🔒 Failed Login Attempt
   - ایمیل
   - دلیل خطا
   - IP address
   - زمان

---

## 🧪 تست 3: Manual Telegram Test

اگر backend کار نمیکنه، مستقیم API تلگرام رو تست کن:

```powershell
curl -X POST "https://api.telegram.org/bot7899876543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw/sendMessage" `
  -d "chat_id=123456789&text=Test from PowerShell"
```

**توجه:** `7899876543:AAH...` رو با token واقعی و `123456789` رو با chat ID واقعی جایگزین کن!

### انتظار:
```json
{
  "ok": true,
  "result": {
    "message_id": 123,
    "chat": {...},
    "text": "Test from PowerShell"
  }
}
```

---

## ❌ اگر کار نکرد

### 1. بررسی Token:
```powershell
# باید شبیه این باشه: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
# نباید space داشته باشه
# نباید quote اضافی داشته باشه
```

### 2. بررسی Chat ID:
```powershell
# باید یه عدد باشه: 123456789
# نباید string باشه: "123456789" ❌
# اگر برای group میخوای، باید منفی باشه: -123456789
```

### 3. Restart Backend:
```powershell
# در terminal backend: Ctrl+C
# بعد دوباره:
npm run dev
```

### 4. Check Logs:
اگر تلگرام غیرفعال باشه، این پیام رو میبینی:
```
📱 Telegram disabled - SECURITY: Password Reset Request
```

اگر فعال باشه ولی ارسال خطا داده:
```
❌ Failed to send Telegram notification: ...
```

---

## ✅ Success Checklist

- [ ] Backend روی port 3002 در حال اجراست
- [ ] `.env` شامل token و chat ID صحیح است
- [ ] `TELEGRAM_NOTIFICATIONS=true`
- [ ] Backend restart شده بعد از تغییر .env
- [ ] Forgot password request پیام در تلگرام فرستاد
- [ ] لینک کامل با token در پیام موجود است
- [ ] Failed login پیام security در تلگرام فرستاد

---

## 📚 راهنمای کامل

برای راهنمای کامل راه‌اندازی، مراجعه کن به:
- [docs/02-high-priority/TELEGRAM_SETUP.md](docs/02-high-priority/TELEGRAM_SETUP.md)
- [SERVICE-STATUS.md](SERVICE-STATUS.md)

---

**تاریخ:** 22 نوامبر 2025
