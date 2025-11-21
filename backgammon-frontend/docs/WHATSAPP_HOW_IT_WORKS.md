# How WhatsApp Error Notification Works
# سرویس واتساپ چطور کار میکنه؟

## 🔄 Flow کامل سیستم:

```
[1] خطا در Frontend
     ↓
[2] Logger.error() صدا زده میشه
     ↓
[3] خطا در localStorage ذخیره میشه
     ↓
[4] خطا به Backend API فرستاده میشه (فقط در production)
     ↓
[5] Backend خطا رو دریافت میکنه
     ↓
[6] Backend بررسی میکنه: آیا باید WhatsApp بفرسته؟
     ↓
[7] Twilio API صدا زده میشه
     ↓
[8] Twilio پیام رو به WhatsApp شما میفرسته
     ↓
[9] 🔔 پیام در واتساپ شما دریافت میشه!
```

---

## 📱 میشه هر چیزی رو بفرستی؟

### ✅ بله! میتونی بفرستی:

1. **خطاهای Frontend:**
```typescript
logger.error('Payment failed', { 
  amount: 100, 
  userId: '123',
  reason: 'Insufficient funds'
});
```

2. **رفتار کاربران:**
```typescript
logger.info('User started game', {
  userId: '123',
  gameId: 'game-456',
  bet: 1000
});

// میتونی تو backend فیلتر کنی که فقط eventهای مهم رو بفرسته
```

3. **Event های خاص:**
```typescript
// وقتی کاربر پول واریز میکنه
logger.info('Deposit successful', {
  userId: '123',
  amount: 50000,
  method: 'card'
});

// وقتی کاربر بازی رو برد
logger.info('Game won', {
  userId: '123',
  prize: 10000,
  opponent: 'user-456'
});
```

4. **Performance Issues:**
```typescript
// وقتی API کند بود
logger.warn('Slow API response', {
  endpoint: '/api/game/join',
  duration: 5000 // ms
});
```

### 🎛️ کنترل کامل داری:

در **Backend** (`src/routes/errors.ts`):

```typescript
function shouldSendWhatsAppAlert(errorData: any): boolean {
  // فقط خطاها
  if (errorData.level === 'error') return true;
  
  // رفتارهای مهم کاربر
  if (errorData.message.includes('Deposit successful')) return true;
  if (errorData.message.includes('Large bet')) return true;
  
  // صفحات خاص
  if (errorData.url?.includes('/payment')) return true;
  
  // مبلغ بالا
  if (errorData.amount > 100000) return true;
  
  return false;
}
```

---

## 📢 کانال واتساپ

### ❌ مشکل: 
Twilio Sandbox فقط به **یک شماره** پیام میفرسته.

### ✅ راه‌حل‌ها:

#### گزینه 1: چند شماره در Backend
```typescript
const ADMIN_NUMBERS = [
  '+989123456789',  // شما
  '+989121111111',  // Admin 2
  '+989122222222',  // Admin 3
];

for (const number of ADMIN_NUMBERS) {
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${number}`,
    body: message
  });
}
```

#### گزینه 2: WhatsApp Business API (پیچیده‌تر)
- میتونی به Group پیام بفرستی
- ولی نیاز به verification داره
- هزینه بیشتر و setup سخت‌تر

#### گزینه 3: Telegram Bot (ساده‌تر!) 🌟
```typescript
// رایگان و به channel/group پیام میفرسته
const telegram = require('node-telegram-bot-api');
const bot = new telegram(process.env.TELEGRAM_BOT_TOKEN);

await bot.sendMessage(CHANNEL_ID, message);
```

**توصیه:** برای کانال/گروه، Telegram بهتره!

---

## 🧪 چطور تست کنیم؟

### مرحله 1: Setup Twilio (5 دقیقه)

1. برو https://www.twilio.com/try-twilio
2. ثبت‌نام کن
3. برو به **Console** → **Account Info**
4. کپی کن:
   - Account SID
   - Auth Token
5. برو به **Messaging** → **Try it out** → **Send a WhatsApp message**
6. پیام بده به شماره Twilio: `join <sandbox-name>`
7. تموم! ✅

### مرحله 2: Backend Setup (10 دقیقه)

```bash
cd backgammon-error-service
npm install
```

ساخت `.env`:
```bash
cp .env.example .env
```

ویرایش `.env`:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+14155238886
ADMIN_WHATSAPP_NUMBER=+989123456789
API_KEY=test-api-key-123
```

شروع سرور:
```bash
npm run dev
```

### مرحله 3: تست با curl

```bash
curl -X POST http://localhost:3001/api/errors/report \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-api-key-123" \
  -d '{
    "message": "Test error from terminal!",
    "level": "error",
    "url": "https://test.com",
    "timestamp": "2025-11-21T12:00:00Z"
  }'
```

**انتظار:** پیام واتساپ دریافت کنی! 📱

### مرحله 4: تست از Frontend

Frontend `.env.production`:
```env
VITE_ERROR_API_URL=http://localhost:3001
VITE_ERROR_API_KEY=test-api-key-123
```

شروع frontend:
```bash
npm run dev
```

تو Console مرورگر:
```javascript
window.logger.error('Testing WhatsApp from browser!', { test: true });
```

**انتظار:** پیام واتساپ دریافت کنی! 📱

---

## 🎨 وضعیت UI Components

### ✅ کامل شده (7 کامپوننت):
1. **Button** - 5 variant, 4 size, icons, loading
2. **Input** - text, password, validation, icons  
3. **Avatar** - sizes, status, fallback, groups
4. **Badge** - 8 colors, 3 variants, 4 sizes, pulse
5. **Spinner** - 3 sizes, 8 colors
6. **Divider** - horizontal/vertical, with text
7. **Card** - 3 variants, 3 sizes, header/footer, images

### 🔄 در حال کار:
- **همه کامپوننت‌ها:** responsive و mobile-friendly ✅
- **همه کامپوننت‌ها:** Dark/Light/Gaming theme ✅
- **همه کامپوننت‌ها:** Framer Motion animations ✅

### ⏳ باقی‌مونده (Molecules):
- Alert
- Modal  
- Toast
- Dropdown
- FormField
- Tabs
- SearchBar

---

## 📊 ورژن‌بندی و ساختار Git

بذار Git رو مرتب کنیم!
