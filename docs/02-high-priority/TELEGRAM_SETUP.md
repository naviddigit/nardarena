# 🤖 راهنمای راه‌اندازی Telegram Bot

> **مزیت بزرگ: کاملاً رایگان و بدون محدودیت!** 🎉

---

## 🎯 چرا Telegram بجای WhatsApp؟

### ✅ مزایای Telegram:
- **رایگان کامل** - هیچ هزینه‌ای نداره
- **Unlimited** - بدون محدودیت تعداد پیام
- **API قدرتمند** - خیلی ساده‌تر از Twilio
- **ارسال مستقیم به گروه/کانال** - نیاز به forward نداره
- **Formatting کامل** - Bold, Italic, Code, Links
- **دکمه‌ها و عکس** - میتونی Interactive Bot بسازی
- **Webhook و Polling** - real-time notifications

### ❌ مشکلات WhatsApp:
- **پولی** - هر پیام $0.005 (حدود 200 تومان)
- **محدودیت** - فقط به شماره فردی میفرسته
- **پیچیده** - نیاز به Twilio، تأیید، Sandbox
- **نمیتونه به گروه بفرسته**

---

## 📋 مراحل راه‌اندازی (10 دقیقه)

### مرحله 1️⃣: ساخت Bot در Telegram

```
1. تلگرام رو باز کن
2. جستجو کن: @BotFather
3. چت رو با BotFather شروع کن
4. دستور /newbot رو بفرست
```

گفتگوی نمونه با BotFather:

```
You: /newbot

BotFather: Alright, a new bot. How are we going to call it? Please choose a name for your bot.

You: Nard Arena Alerts

BotFather: Good. Now let's choose a username for your bot. It must end in `bot`. Like this, for example: TetrisBot or tetris_bot.

You: NardArenaAlertsBot

BotFather: Done! Congratulations on your new bot. You will find it at t.me/NardArenaAlertsBot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
7012345678:AAHdqT1234567890abcdefGHIJKLmnopQRST

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**✅ Token رو کپی کن و جایی امن نگهش دار!**

---

### مرحله 2️⃣: ساخت کانال یا گروه

#### گزینه A: کانال (توصیه میکنم)
```
1. تلگرام → Channels → New Channel
2. اسم: "Nard Arena - Dev Alerts" یا "🎮 Nard Arena Alerts"
3. توضیحات: "گزارش خطاها و اعلانات فنی پروژه Nard Arena"
4. نوع: Private (خصوصی)
5. Create Channel
```

#### گزینه B: گروه
```
1. تلگرام → Groups → New Group
2. اسم: "Nard Arena Dev Team"
3. اعضا رو اضافه کن
4. Create
```

---

### مرحله 3️⃣: اضافه کردن Bot به کانال/گروه

```
1. برو به کانال یا گروهی که ساختی
2. بزن روی اسم کانال/گروه (بالا)
3. Administrators → Add Administrator
4. جستجو کن: @NardArenaAlertsBot (username bot خودت)
5. اضافه کن و حق Post Messages رو بهش بده
6. Done
```

---

### مرحله 4️⃣: گرفتن Chat ID

این کار یه کمی تکنیکیه ولی آسونه:

#### روش 1: با API (ساده‌ترین)

```bash
# 1. یه پیام در کانال/گروه بفرست (مثلاً "test")

# 2. این لینک رو در مرورگر باز کن (TOKEN خودت رو بزار):
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates

# مثال:
https://api.telegram.org/bot7012345678:AAHdqT1234567890abcdefGHIJKLmnopQRST/getUpdates

# 3. توی response دنبال "chat" بگرد:
{
  "chat": {
    "id": -1001234567890,  // <--- این همونه!
    "title": "Nard Arena - Dev Alerts",
    "type": "channel"
  }
}
```

**نکته مهم:** Chat ID کانال‌ها با `-100` شروع میشه مثل: `-1001234567890`

#### روش 2: با Bot دیگه (خیلی ساده)

```
1. به تلگرام برو
2. جستجو کن: @userinfobot
3. به Bot خودت forward کن یه پیام از کانالت
4. Chat ID رو بهت میده
```

#### روش 3: با Code (حرفه‌ای)

یه اسکریپت کوچیک بنویس:

```javascript
// test-telegram.js
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  console.log('Chat ID:', msg.chat.id);
  console.log('Chat Type:', msg.chat.type);
  console.log('Chat Title:', msg.chat.title);
});

console.log('Bot is listening... Send a message to your channel/group');
```

اجرا کن:
```bash
node test-telegram.js
```

بعد یه پیام در کانال بفرست، Chat ID رو میده!

---

### مرحله 5️⃣: تنظیم Environment Variables

فایل `.env` رو در `backgammon-error-service` بساز یا edit کن:

```env
# Server
PORT=3001
ERROR_API_KEY=your-secret-key-123

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Telegram Bot Configuration (FREE! 🎉)
TELEGRAM_BOT_TOKEN=7012345678:AAHdqT1234567890abcdefGHIJKLmnopQRST
TELEGRAM_CHAT_ID=-1001234567890

# Environment
NODE_ENV=development
```

**⚠️ نکته امنیتی:** این فایل رو commit نکن! در `.gitignore` باشه.

---

### مرحله 6️⃣: تست کردن

#### تست 1: با cURL

```bash
# تست ارسال پیام
curl -X POST http://localhost:3001/api/test/telegram \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key-123"
```

#### تست 2: با Frontend

```
1. برو به http://localhost:5175
2. منو (☰) → Test Panel
3. دکمه "📱 Test Telegram" رو بزن
4. کانال تلگرامت رو چک کن!
```

#### تست 3: با Postman

```
POST http://localhost:3001/api/test/telegram
Headers:
  Content-Type: application/json
  x-api-key: your-secret-key-123
```

---

## 🎨 نمونه پیام‌های ارسالی

### پیام تست:
```
🧪 تست سیستم خطایابی

این یک پیام تستی است.

✅ ارسال موفقیت‌آمیز بود!

⏰ زمان: ۱۴۰۳/۸/۳۱ - ۱۴:۳۵:۲۰
🔧 محیط: development
```

### پیام خطا:
```
🚨 خطا در Nard Arena

📝 پیام خطا:
`Payment gateway connection failed`

⏰ زمان: ۱۴۰۳/۸/۳۱ - ۱۴:۳۵:۲۰
🌐 صفحه: /payment/checkout
📊 سطح: 🔴 خطا
👤 کاربر: `user-12345`
📱 دستگاه: 📱 iPhone

🔗 شناسه: `err-abc123xyz`

📍 Stack Trace:
```
Error: Connection timeout
  at PaymentGateway.connect
  at processPayment
```

🎮 Nard Arena | System Monitor
```

---

## 🔧 تنظیمات پیشرفته

### 1. تنظیم Webhook (اختیاری - برای پاسخ به پیام‌ها)

```javascript
// در server.ts
const WEBHOOK_URL = `https://your-domain.com/webhook/${process.env.TELEGRAM_BOT_TOKEN}`;

app.post(`/webhook/${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Set webhook
bot.setWebHook(WEBHOOK_URL);
```

### 2. ارسال به چند کانال

```env
# در .env
TELEGRAM_CHAT_ID_DEV=-1001234567890
TELEGRAM_CHAT_ID_ADMIN=-1009876543210
TELEGRAM_CHAT_ID_PUBLIC=-1005555555555
```

```typescript
// در telegram.ts
const chatIds = [
  process.env.TELEGRAM_CHAT_ID_DEV,
  process.env.TELEGRAM_CHAT_ID_ADMIN,
].filter(Boolean);

for (const chatId of chatIds) {
  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}
```

### 3. دکمه‌های Interactive

```typescript
await bot.sendMessage(chatId, message, {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: [
      [
        { text: '✅ Fixed', callback_data: 'fixed' },
        { text: '❌ Ignore', callback_data: 'ignore' }
      ],
      [
        { text: '📊 View Details', url: 'https://dashboard.nardarena.com/errors/123' }
      ]
    ]
  }
});
```

### 4. ارسال عکس

```typescript
await bot.sendPhoto(chatId, 'screenshot.png', {
  caption: '🚨 Error Screenshot'
});
```

---

## 🐛 عیب‌یابی

### مشکل 1: Bot پیام نمیفرسته
```
✅ چک کن: Bot Token درست باشه
✅ چک کن: Bot به کانال Admin اضافه شده باشه
✅ چک کن: Bot حق Post Messages داشته باشه
✅ چک کن: Chat ID با - شروع بشه (برای کانال)
```

### مشکل 2: "Chat not found"
```
❌ Chat ID اشتباهه
✅ دوباره Chat ID رو از getUpdates بگیر
✅ مطمئن شو Bot به کانال اضافه شده
```

### مشکل 3: "Forbidden: bot was blocked"
```
✅ Bot رو از کانال Remove نکن
✅ دوباره Bot رو Admin کن
```

### مشکل 4: Parse Mode Error
```typescript
// اگه Markdown مشکل داره، از HTML استفاده کن:
bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

// یا بدون format:
bot.sendMessage(chatId, message);
```

---

## 📊 مقایسه هزینه‌ها

### WhatsApp (Twilio):
```
روز عادی: 50 error × $0.005 = $0.25/روز → $7.5/ماه
روز شلوغ: 500 error × $0.005 = $2.5/روز → $75/ماه
بحران: 10,000 error × $0.005 = $50/روز → $1,500/ماه
```

### Telegram:
```
هر تعداد پیام: $0 🎉
روز عادی: رایگان
روز شلوغ: رایگان  
بحران: رایگان
سال اول: رایگان
سال دوم: باز هم رایگان! 😄
```

---

## 🎯 نتیجه‌گیری

### برای پروژه Nard Arena:

#### ✅ استفاده کن از Telegram اگر:
- تیم کوچیک یا بزرگ (هر اندازه‌ای)
- بودجه محدود
- میخوای همه تیم در جریان باشن
- میخوای سریع و راحت راه‌اندازی کنی
- میخوای unlimited و رایگان باشه

#### ❌ فقط از WhatsApp استفاده کن اگر:
- مدیر یا کارفرما حتماً WhatsApp میخواد
- بودجه زیاد داری
- فقط خودت میخوای ببینی
- (که باز هم Telegram بهتره! 😄)

---

## 📚 منابع بیشتر

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [node-telegram-bot-api GitHub](https://github.com/yagop/node-telegram-bot-api)
- [BotFather Commands](https://core.telegram.org/bots#botfather)

---

**ساخته شده با ❤️ برای تیم Nard Arena**

نیاز به کمک؟ پیام بده! 🚀
