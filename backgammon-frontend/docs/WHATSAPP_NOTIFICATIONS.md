# WhatsApp Error Notification System
# سیستم اعلان خطا به واتساپ

## Architecture Overview - معماری کلی

```
Frontend Error → Logger → Backend API → WhatsApp Service → Your WhatsApp
```

## Implementation Plan - برنامه پیاده‌سازی

### Phase 1: Backend API (Node.js/Express)
### Phase 2: WhatsApp Integration
### Phase 3: Frontend Connection
### Phase 4: Monitoring Dashboard

---

## Phase 1: Backend API Setup

### 1.1 Create Backend Service

```bash
mkdir backgammon-error-service
cd backgammon-error-service
npm init -y
npm install express cors dotenv
npm install --save-dev typescript @types/express @types/node ts-node nodemon
```

### 1.2 Project Structure

```
backgammon-error-service/
├── src/
│   ├── server.ts              # Express server
│   ├── routes/
│   │   └── errors.ts          # Error reporting routes
│   ├── services/
│   │   ├── whatsapp.ts        # WhatsApp integration
│   │   └── logger.ts          # Backend logging
│   ├── utils/
│   │   └── rateLimiter.ts     # Prevent spam
│   └── config/
│       └── env.ts             # Environment config
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

---

## Phase 2: WhatsApp Integration Options

### Option 1: Twilio WhatsApp API (Recommended) 🌟

**Pros:**
- ✅ Easy to setup
- ✅ Reliable delivery
- ✅ Good documentation
- ✅ Free trial available
- ✅ No need for WhatsApp Business verification

**Setup:**

1. Sign up at https://www.twilio.com/
2. Get Account SID and Auth Token
3. Enable WhatsApp sandbox for testing
4. Verify your WhatsApp number

**Pricing:**
- Free trial credits
- ~$0.005 per message after trial

**Code Example:**

```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsAppAlert(errorData) {
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox
    to: 'whatsapp:+989123456789',  // Your number
    body: `🚨 Error in Production!\n\n${errorData.message}\n\nUser: ${errorData.userId}\nURL: ${errorData.url}\nTime: ${errorData.timestamp}`
  });
}
```

---

### Option 2: WhatsApp Business API (Official)

**Pros:**
- ✅ Official WhatsApp solution
- ✅ No per-message cost (only hosting)
- ✅ Professional integration

**Cons:**
- ❌ Requires business verification
- ❌ More complex setup
- ❌ Needs Facebook Business Manager

**Setup:**
1. Create Facebook Business Manager
2. Apply for WhatsApp Business API
3. Get approved (may take days)
4. Setup webhook and server

---

### Option 3: WAHA (WhatsApp HTTP API) - Self-hosted

**Pros:**
- ✅ Free and open source
- ✅ No API costs
- ✅ Full control
- ✅ Easy Docker setup

**Cons:**
- ❌ Requires self-hosting
- ❌ Account ban risk if misused
- ❌ QR code login required

**Setup:**

```bash
docker run -it -p 3000:3000 devlikeapro/waha
```

**Code Example:**

```javascript
const axios = require('axios');

async function sendWhatsAppAlert(errorData) {
  await axios.post('http://localhost:3000/api/sendText', {
    chatId: '989123456789@c.us',
    text: `🚨 Error Alert!\n\n${errorData.message}`,
    session: 'default'
  });
}
```

---

### Option 4: Wasabi (Cloud-based WAHA)

**Pros:**
- ✅ No self-hosting needed
- ✅ Easy setup
- ✅ Affordable ($19/month)
- ✅ Built on WAHA

**Setup:**
1. Sign up at https://wasabi.chat/
2. Get API key
3. Connect WhatsApp via QR code

---

## Recommended Solution: Twilio (for Production)

### Why Twilio?
1. ✅ **Reliable**: 99.95% uptime
2. ✅ **Easy**: Setup in 10 minutes
3. ✅ **Compliant**: No ban risk
4. ✅ **Affordable**: ~$0.005 per message
5. ✅ **Scalable**: Can send thousands of messages

---

## Implementation Code

### Backend Service (Express + Twilio)

```typescript
// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorRoutes from './routes/errors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error reporting endpoint
app.use('/api/errors', errorRoutes);

app.listen(PORT, () => {
  console.log(`Error service running on port ${PORT}`);
});
```

```typescript
// src/routes/errors.ts
import express from 'express';
import { sendWhatsAppAlert } from '../services/whatsapp';
import { logError } from '../services/logger';
import { rateLimiter } from '../utils/rateLimiter';

const router = express.Router();

router.post('/report', rateLimiter, async (req, res) => {
  try {
    const errorData = req.body;
    
    // Log to backend
    logError(errorData);
    
    // Send WhatsApp alert for critical errors
    if (errorData.level === 'error') {
      await sendWhatsAppAlert(errorData);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to process error report:', error);
    res.status(500).json({ success: false, error: 'Failed to process' });
  }
});

export default router;
```

```typescript
// src/services/whatsapp.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface ErrorData {
  message: string;
  level: string;
  url: string;
  timestamp: string;
  userId?: string;
  userAgent?: string;
  stack?: string;
}

export async function sendWhatsAppAlert(errorData: ErrorData) {
  try {
    const message = formatErrorMessage(errorData);
    
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER}`,
      body: message
    });
    
    console.log('WhatsApp alert sent successfully');
  } catch (error) {
    console.error('Failed to send WhatsApp alert:', error);
  }
}

function formatErrorMessage(errorData: ErrorData): string {
  return `
🚨 *Production Error Alert*

*Message:* ${errorData.message}
*Level:* ${errorData.level.toUpperCase()}
*URL:* ${errorData.url}
*Time:* ${new Date(errorData.timestamp).toLocaleString('fa-IR')}
${errorData.userId ? `*User:* ${errorData.userId}` : ''}
*Browser:* ${errorData.userAgent?.substring(0, 50)}...

_Check logs for full details_
  `.trim();
}
```

```typescript
// src/utils/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';

const requestCounts = new Map<string, number>();
const RATE_LIMIT = 10; // max 10 requests per minute per IP
const WINDOW = 60 * 1000; // 1 minute

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;
  const now = Date.now();
  
  // Clean old entries
  if (now % 60000 < 1000) {
    requestCounts.clear();
  }
  
  const count = requestCounts.get(ip) || 0;
  
  if (count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  requestCounts.set(ip, count + 1);
  next();
}
```

---

## Frontend Integration

### Update Logger Service

```typescript
// src/services/errorTracking/logger.ts

class Logger {
  // ... existing code ...

  private async sendToBackend(entry: LogEntry) {
    // Only send in production
    if ((import.meta as any).env.DEV) {
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_ERROR_API_URL}/api/errors/report`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_ERROR_API_KEY
        },
        body: JSON.stringify(entry),
      });
    } catch (e) {
      console.error('Failed to send error to backend:', e);
    }
  }
}
```

### Environment Variables

```env
# .env.production
VITE_ERROR_API_URL=https://your-error-service.com
VITE_ERROR_API_KEY=your-secure-api-key
```

---

## Setup Instructions

### Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up with email
3. Verify phone number
4. Get **Account SID** and **Auth Token** from dashboard
5. Go to "Messaging" → "Try WhatsApp"
6. Send "join <your-sandbox-name>" to Twilio WhatsApp number
7. Your number is now connected to sandbox

### Step 2: Deploy Backend Service

**Option A: Vercel (Easiest)**

```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Railway**

```bash
# Push to GitHub
# Connect GitHub repo to Railway
# Add environment variables
# Deploy
```

**Option C: Your VPS**

```bash
# SSH to server
git clone your-repo
cd backgammon-error-service
npm install
npm run build
pm2 start dist/server.js --name error-service
```

### Step 3: Configure Environment Variables

```env
# Backend .env
PORT=3001
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886  # Sandbox number
ADMIN_WHATSAPP_NUMBER=+989123456789  # Your number
FRONTEND_URL=https://yourgame.com
API_KEY=generate-random-secure-key
```

### Step 4: Test the System

```bash
# Test endpoint
curl -X POST http://localhost:3001/api/errors/report \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "message": "Test error",
    "level": "error",
    "url": "https://test.com",
    "timestamp": "2025-01-01T12:00:00Z"
  }'
```

You should receive a WhatsApp message!

---

## Advanced Features

### 1. Error Grouping (Prevent Spam)

```typescript
const errorCache = new Map<string, number>();

function shouldSendAlert(errorMessage: string): boolean {
  const key = errorMessage.substring(0, 50);
  const lastSent = errorCache.get(key) || 0;
  const now = Date.now();
  
  // Don't send same error more than once per 5 minutes
  if (now - lastSent < 5 * 60 * 1000) {
    return false;
  }
  
  errorCache.set(key, now);
  return true;
}
```

### 2. Error Severity Levels

```typescript
function shouldSendWhatsApp(errorData: ErrorData): boolean {
  // Only send for critical errors
  if (errorData.level === 'error') return true;
  
  // Or errors from specific pages
  if (errorData.url.includes('/payment')) return true;
  
  // Or errors affecting many users
  if (errorData.affectedUsers > 5) return true;
  
  return false;
}
```

### 3. Rich Message Format

```typescript
function formatRichMessage(errorData: ErrorData): string {
  const emoji = getErrorEmoji(errorData.level);
  const severity = getSeverity(errorData);
  
  return `
${emoji} *${severity} Alert*

📝 *Error:* ${errorData.message}
🌐 *Page:* ${errorData.url}
⏰ *Time:* ${formatTime(errorData.timestamp)}
👤 *User:* ${errorData.userId || 'Anonymous'}
📱 *Device:* ${parseDevice(errorData.userAgent)}
🔢 *Count:* ${getErrorCount(errorData.message)} occurrences

🔗 *Actions:*
View logs: ${process.env.DASHBOARD_URL}/errors/${errorData.id}
  `.trim();
}
```

### 4. Multiple Recipients

```typescript
const ALERT_RECIPIENTS = [
  process.env.ADMIN_WHATSAPP_1,
  process.env.ADMIN_WHATSAPP_2,
  process.env.ADMIN_WHATSAPP_3,
];

async function sendToAllAdmins(message: string) {
  await Promise.all(
    ALERT_RECIPIENTS.map(number => 
      sendWhatsAppMessage(number, message)
    )
  );
}
```

---

## Cost Estimation

### Twilio Pricing:
- **Free Trial:** $15 credit (≈3000 messages)
- **Production:** $0.005/message
- **Monthly:** If 100 errors/day = $15/month

### Alternative Free Options:
- **Self-hosted WAHA:** Free (but requires VPS)
- **Telegram Bot:** Free alternative to WhatsApp

---

## Security Best Practices

1. ✅ Use API key authentication
2. ✅ Rate limiting (prevent abuse)
3. ✅ Encrypt sensitive data
4. ✅ Don't send user passwords/tokens
5. ✅ Use HTTPS only
6. ✅ Validate all inputs
7. ✅ Log all notification attempts

---

## Monitoring Dashboard (Bonus)

Create simple dashboard to view errors:

```typescript
// GET /api/errors/stats
router.get('/stats', async (req, res) => {
  const stats = {
    today: getErrorCount('today'),
    week: getErrorCount('week'),
    month: getErrorCount('month'),
    topErrors: getTopErrors(10),
    affectedUsers: getUniqueUsers(),
  };
  
  res.json(stats);
});
```

---

## Summary - خلاصه

### برای شروع سریع:

1. **ثبت‌نام در Twilio** (5 دقیقه)
2. **دریافت Account SID و Auth Token**
3. **اتصال شماره WhatsApp به sandbox**
4. **کپی کردن کد backend** (20 دقیقه)
5. **دیپلوی در Vercel/Railway** (10 دقیقه)
6. **تنظیم environment variables**
7. **تست با curl**
8. **اتصال frontend به backend**

**جمع کل:** ~1 ساعت برای setup کامل

### نتیجه:
✅ هر خطای critical در production → پیام فوری به WhatsApp
✅ شامل جزئیات کامل خطا
✅ با rate limiting برای جلوگیری از spam
✅ قابل scale برای هزاران کاربر

---

## Next Steps - مراحل بعدی

1. انتخاب WhatsApp provider (Twilio توصیه میشه)
2. ساخت backend service
3. تست در محیط development
4. دیپلوی در production
5. مانیتور کردن برای چند روز
6. بهینه‌سازی بر اساس نیاز

میتونم هر کدوم از این مراحل رو با جزئیات بیشتر براتون پیاده‌سازی کنم! 🚀
