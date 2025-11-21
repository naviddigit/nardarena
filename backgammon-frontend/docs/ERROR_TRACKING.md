# Error Tracking & Debugging Guide
# راهنمای ردیابی خطا و دیباگ

## Overview - نگاه کلی

این سیستم برای شناسایی، ردیابی و رفع خطاها در فرانت‌اند طراحی شده.

### Features - امکانات:
✅ **ErrorBoundary** - گرفتن خطاهای React component
✅ **Global Error Handler** - گرفتن خطاهای unhandled
✅ **Logger Service** - لاگ‌گیری متمرکز
✅ **DebugPanel** - پنل دیباگ در حالت توسعه
✅ **API Error Handler** - مدیریت خطاهای API
✅ **Safe Wrappers** - wrapper های امن برای توابع
✅ **Error Storage** - ذخیره خطاها در localStorage
✅ **Export Logs** - خروجی گرفتن از لاگ‌ها

---

## 1. ErrorBoundary Component

### کاربرد:
خطاهای React component ها رو میگیره و از کرش کردن کل اپ جلوگیری میکنه.

### مثال استفاده:

\`\`\`tsx
import { ErrorBoundary } from '@/services/errorTracking';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
\`\`\`

### با fallback سفارشی:

\`\`\`tsx
<ErrorBoundary
  fallback={
    <div className="error-page">
      <h1>Something went wrong!</h1>
      <button onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </div>
  }
  onError={(error, errorInfo) => {
    // Send to analytics
    analytics.track('error', { error, errorInfo });
  }}
>
  <MyComponent />
</ErrorBoundary>
\`\`\`

---

## 2. Logger Service

### کاربرد:
لاگ‌گیری متمرکز برای خطاها، هشدارها و اطلاعات.

### API:

\`\`\`typescript
import { logger } from '@/services/errorTracking';

// Error log
logger.error('Payment failed', { 
  userId: '123', 
  amount: 100 
});

// Warning log
logger.warn('API is slow', { 
  duration: 5000 
});

// Info log
logger.info('User logged in', { 
  userId: '123' 
});

// Debug log (فقط در development)
logger.debug('Component rendered', { 
  props: {} 
});
\`\`\`

### دریافت لاگ‌ها:

\`\`\`typescript
// All logs in memory
const logs = logger.getLogs();

// Stored logs in localStorage
const storedLogs = logger.getStoredLogs();

// Export as JSON
const jsonLogs = logger.exportLogs();

// Clear all logs
logger.clearLogs();
\`\`\`

---

## 3. Global Error Handler

### کاربرد:
خطاهای unhandled و promise rejection ها رو میگیره.

### راه‌اندازی (already done in main.tsx):

\`\`\`typescript
import { setupErrorHandlers } from '@/services/errorTracking';

setupErrorHandlers();
\`\`\`

این خودکار:
- ✅ همه خطاهای unhandled رو میگیره
- ✅ همه promise rejection ها رو میگیره
- ✅ خطاها رو لاگ میکنه
- ✅ در production از نمایش خطا در console جلوگیری میکنه

---

## 4. Safe Wrappers

### کاربرد:
wrapper های امن برای توابع async و عادی که خطاها رو خودکار لاگ میکنن.

### مثال:

\`\`\`typescript
import { safeAsync, safe } from '@/services/errorTracking';

// Safe async function
const fetchData = safeAsync(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return await response.json();
  },
  'Failed to fetch user data'
);

// Safe regular function
const calculateScore = safe(
  (points: number) => {
    return points * 10;
  },
  'Failed to calculate score'
);

// استفاده:
try {
  const data = await fetchData('123');
} catch (error) {
  // خطا قبلاً لاگ شده
  console.log('Handle error here');
}
\`\`\`

---

## 5. API Error Handler

### کاربرد:
مدیریت خطاهای API و بازگرداندن پیام‌های کاربرپسند.

### مثال:

\`\`\`typescript
import { handleApiError } from '@/services/errorTracking';

async function joinGame(gameId: string) {
  try {
    const response = await fetch(\`/api/games/\${gameId}/join\`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw response;
    }
    
    return await response.json();
  } catch (error) {
    // بازگشت پیام کاربرپسند
    const message = handleApiError(error, '/api/games/join');
    alert(message);
  }
}
\`\`\`

### پیام‌های خودکار:
- **401** → "Authentication failed. Please login again."
- **403** → "You do not have permission to perform this action."
- **404** → "Resource not found."
- **500+** → "Server error. Please try again later."
- **Network Error** → "Network error. Please check your connection."

---

## 6. DebugPanel Component

### کاربرد:
پنل دیباگ برای نمایش خطاها و اطلاعات سیستم (فقط در development).

### امکانات:
- 🐛 **Error Logs** - نمایش همه خطاهای لاگ شده
- 📊 **Memory Info** - نمایش مصرف حافظه
- 🔍 **Performance** - اطلاعات عملکرد
- 💾 **Export** - خروجی JSON از لاگ‌ها
- 🗑️ **Clear** - پاک کردن لاگ‌ها

### استفاده:
فقط دکمه 🐛 در گوشه پایین-راست رو بزن!

---

## 7. Production Monitoring

### چک کردن خطاها در Production:

#### روش 1: Export logs از DebugPanel
در development، خطاها رو test کن و export کن.

#### روش 2: Backend logging
خطاها خودکار به بک‌اند فرستاده میشن (باید endpoint تنظیم بشه).

در \`logger.ts\`:
\`\`\`typescript
private async sendToBackend(entry: LogEntry) {
  await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
}
\`\`\`

#### روش 3: Integration با Sentry
برای production، میتونی با Sentry integrate کنی:

\`\`\`bash
npm install @sentry/react
\`\`\`

در \`main.tsx\`:
\`\`\`typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
\`\`\`

---

## 8. Best Practices

### ✅ همیشه خطاها رو لاگ کن:
\`\`\`typescript
try {
  // code
} catch (error) {
  logger.error('Description', { context });
  // handle error
}
\`\`\`

### ✅ از ErrorBoundary استفاده کن:
هر بخش مهم اپ رو wrap کن:
\`\`\`tsx
<ErrorBoundary>
  <CriticalFeature />
</ErrorBoundary>
\`\`\`

### ✅ API error ها رو درست handle کن:
\`\`\`typescript
const message = handleApiError(error, endpoint);
toast.error(message);
\`\`\`

### ✅ از safe wrapper ها استفاده کن:
\`\`\`typescript
const safeFn = safeAsync(myAsyncFn, 'Error description');
\`\`\`

### ✅ Context اضافه کن:
\`\`\`typescript
logger.error('Game move failed', {
  gameId: '123',
  from: 5,
  to: 3,
  currentPlayer: 'user-456',
  timestamp: Date.now(),
});
\`\`\`

---

## 9. Console Commands (Development)

در console مرورگر:

\`\`\`javascript
// دریافت همه لاگ‌ها
window.logger.getLogs()

// دریافت لاگ‌های ذخیره شده
window.logger.getStoredLogs()

// پاک کردن لاگ‌ها
window.logger.clearLogs()

// export لاگ‌ها
console.log(window.logger.exportLogs())
\`\`\`

---

## 10. Troubleshooting - رفع مشکل

### خطا لاگ نمیشه؟
- چک کن که \`setupErrorHandlers()\` در main.tsx صدا زده شده
- ErrorBoundary درست wrap شده؟
- console رو چک کن برای خطاهای خود سیستم لاگ

### DebugPanel نمایش داده نمیشه؟
- مطمئن شو که در development mode هستی
- دکمه 🐛 در پایین-راست رو ببین

### خطاها در production نمیاد؟
- Backend endpoint رو تنظیم کن
- یا با Sentry integrate کن
- localStorage رو چک کن: \`error_logs\`

---

## File Structure

\`\`\`
src/services/errorTracking/
├── ErrorBoundary.tsx       # React Error Boundary
├── logger.ts               # Logger service
├── errorHandler.ts         # Global error handlers
├── index.ts               # Exports
└── examples.ts            # Usage examples

src/shared/components/organisms/DebugPanel/
├── DebugPanel.tsx         # Debug panel component
└── index.ts              # Exports
\`\`\`

---

## Summary - خلاصه

این سیستم به شما کمک میکنه:
1. ✅ **خطاها رو سریع پیدا کنی** - با DebugPanel و Logger
2. ✅ **از کرش اپ جلوگیری کنی** - با ErrorBoundary
3. ✅ **خطاها رو ردیابی کنی** - با localStorage و backend logging
4. ✅ **تجربه کاربری بهتر** - با پیام‌های کاربرپسند
5. ✅ **دیباگ راحت‌تر** - با ابزارهای built-in

**در production:** خطاها خودکار لاگ میشن و میتونی به بک‌اند بفرستی یا با Sentry ببینی.

**در development:** DebugPanel همه اطلاعات رو real-time نشون میده.
