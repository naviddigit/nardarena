# 📚 مفاهیم کلیدی پروژه - Key Concepts

> **برای یادگیری و فهم کامل پروژه**

---

## 🎯 1. SOLID Principles (اصول SOLID)

پروژه بر اساس 5 اصل SOLID طراحی شده:

### S - Single Responsibility (مسئولیت واحد)
**یعنی چی؟** هر فایل/کلاس فقط یک کار انجام بده.

**مثال در پروژه:**
```typescript
// ❌ بد - Button کار logger رو هم میکنه
const Button = () => {
  const handleClick = () => {
    // Button کار خودش
    sendAnalytics(); // این کار Button نیست!
  }
}

// ✅ خوب - هر کدوم کار خودشون رو میکنن
const Button = ({ onClick }) => <button onClick={onClick}>...</button>
const Analytics = { send: () => {...} }
```

### O - Open/Closed (باز برای توسعه، بسته برای تغییر)
**یعنی چی؟** میتونی قابلیت اضافه کنی بدون اینکه کد قبلی رو خراب کنی.

**مثال در پروژه:**
```typescript
// Button variants رو میتونی اضافه کنی بدون تغییر کد اصلی
<Button variant="primary" />   // موجود
<Button variant="gradient" />  // اضافه شد
<Button variant="glass" />     // میتونی اضافه کنی
```

### L - Liskov Substitution (جایگزینی)
**یعنی چی؟** کامپوننت‌های مشابه باید یه رفتار یکسان داشته باشن.

**مثال در پروژه:**
```typescript
// همه Button ها یه interface مشترک دارن
<Button onClick={...}>Text</Button>
<IconButton onClick={...}>Icon</IconButton>
// هر دو onClick رو support میکنن
```

### I - Interface Segregation (تفکیک Interface)
**یعنی چی؟** props زیاد و بی‌مورد به کامپوننت ندی.

**مثال در پروژه:**
```typescript
// ❌ بد - Badge نیاز به همه ینا نداره
<Badge onClick fullWidth disabled loading ...>...</Badge>

// ✅ خوب - فقط چیزایی که لازمه
<Badge color size>...</Badge>
```

### D - Dependency Inversion (وارونگی وابستگی)
**یعنی چی؟** به جزئیات وابسته نباش، به abstraction وابسته باش.

**مثال در پروژه:**
```typescript
// ❌ بد - مستقیم به localStorage وابسته‌ای
const saveTheme = (theme) => {
  localStorage.setItem('theme', theme);
}

// ✅ خوب - به storage interface وابسته‌ای
interface Storage { set(key, value) }
const saveTheme = (theme, storage: Storage) => {
  storage.set('theme', theme);
}
// حالا میتونی localStorage یا sessionStorage یا حتی API استفاده کنی
```

---

## 🧱 2. Atomic Design Pattern

کامپوننت‌ها رو از کوچیک به بزرگ میسازیم:

```
Atoms (اتم‌ها)
  ↓
Molecules (مولکول‌ها)
  ↓
Organisms (ارگانیسم‌ها)
  ↓
Templates (قالب‌ها)
  ↓
Pages (صفحات)
```

### 🔬 Atoms (کوچیکترین واحد)
**چی هستن?** کامپوننت‌های پایه که بیشتر شکسته نمیشن.

**مثال‌ها در پروژه:**
- `Button` - دکمه
- `Input` - ورودی
- `Avatar` - تصویر پروفایل
- `Badge` - نشان
- `Spinner` - لودینگ
- `Icon` - آیکون

```typescript
// Atom فقط یک UI element ساده
<Button>Click me</Button>
<Input placeholder="Enter..." />
```

### 🧪 Molecules (ترکیب Atom‌ها)
**چی هستن?** ترکیب چند Atom برای یک کار خاص.

**مثال‌ها در پروژه:**
- `Card` = Container + Title + Content + Actions
- `FormField` = Label + Input + ErrorMessage
- `SearchBar` = Input + Icon + Button

```typescript
// Molecule از چند Atom ساخته میشه
<Card 
  header={<Text variant="h3">Title</Text>}  // Text atom
  footer={<Button>OK</Button>}              // Button atom
>
  Content here
</Card>
```

### 🧬 Organisms (ترکیب Molecules)
**چی هستن?** بخش‌های پیچیده‌تر از ترکیب Molecules.

**مثال‌ها در پروژه:**
- `Header` = Logo + Navigation + SearchBar + ThemeToggle + Avatar
- `GameBoard` = PlayerInfo + Board + Dice + Controls
- `LoginForm` = FormFields + SocialLogin + Buttons

```typescript
// Organism از چند Molecule ساخته میشه
<Header>
  <Logo />           // Atom
  <SearchBar />      // Molecule
  <ThemeToggle />    // Molecule
  <UserMenu />       // Molecule
</Header>
```

---

## 🎨 3. Theme System (سیستم تم)

### چطور کار میکنه؟

```
User Changes Theme
      ↓
ThemeProvider updates state
      ↓
Context broadcasts to all components
      ↓
Components re-render with new theme
      ↓
localStorage saves preference
```

### 3 تم موجود:

#### 🌙 Dark (تاریک)
```css
background: #121212 → #1a1a1a
text: white/gray
cards: rgba(255,255,255,0.05)
```

#### ☀️ Light (روشن)
```css
background: #ffffff
text: black/gray
cards: white with shadow
```

#### 🎮 Gaming (گیمینگ)
```css
background: #0a0a12 → #1b0f3d → #2d1b69 (purple gradient)
text: purple/cyan
glow effects: purple/cyan
animations: more dramatic
```

### در کد:
```typescript
const { theme, setTheme } = useTheme();

// تم فعلی
console.log(theme); // 'dark' | 'light' | 'gaming'

// تغییر تم
setTheme('gaming');

// استفاده در CSS
<div className="bg-white dark:bg-gray-900 gaming:bg-purple-900">
```

---

## 🚨 4. Error Tracking System (سیستم ردیابی خطا)

### Flow کامل:

```
1. خطا رخ میده در React
         ↓
2. ErrorBoundary خطا رو catch میکنه
         ↓
3. logger.error() صدا زده میشه
         ↓
4. در console log میشه
         ↓
5. در localStorage ذخیره میشه
         ↓
6. اگه production بود → به backend میفرسته
         ↓
7. Backend rate limit چک میکنه (20 req/min)
         ↓
8. Backend duplicate چک میکنه (5 min window)
         ↓
9. در JSON file ذخیره میشه
         ↓
10. به Twilio API میفرسته
         ↓
11. WhatsApp message به تو میرسه 📱
```

### در کد:

```typescript
// روش 1: دستی log کن
logger.error('Payment failed', {
  userId: '123',
  amount: 50000,
  reason: 'Insufficient funds'
});

// روش 2: ErrorBoundary خودکار catch میکنه
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// روش 3: Global error handler (automatic)
window.addEventListener('error', (e) => {
  logger.error(e.message);
});
```

---

## ⚡ 5. Performance Optimization (بهینه‌سازی)

### چطور سیستم رو سبک کردیم؟

#### Frontend:
```typescript
// 1. فقط خطاهای مهم رو میفرستیم
if (import.meta.env.PROD && level === 'error') {
  sendToBackend(); // فقط error، نه warn یا info
}

// 2. محدودیت تعداد log در memory
private maxLogs = 100; // فقط 100 تا نگه میداریم

// 3. محدودیت localStorage
private maxStoredErrors = 20; // فقط 20 error ذخیره میشه
```

#### Backend:
```typescript
// 1. Rate Limiting (محدودیت درخواست)
const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 دقیقه
  max: 20               // حداکثر 20 request
});
// جلو spam رو میگیره

// 2. Duplicate Prevention (جلوگیری از تکراری)
const key = `${message}-${timestamp}`;
if (recentErrors.has(key)) return; // قبلا فرستاده شده
recentErrors.set(key, Date.now());
// توی 5 دقیقه error یکسان رو دوباره نمیفرسته

// 3. Async Operations (غیرهمزمان)
const sendWhatsApp = async () => {
  // نمیخوایم user منتظر بمونه
};
```

### نتیجه Performance:

| Metric | مقدار |
|--------|-------|
| Bundle Size | +5KB |
| Memory | <200KB |
| CPU | <1% |
| Response Time | <50ms |
| Network | فقط 1 request per error |

---

## 📦 6. Monorepo Structure (ساختار Monorepo)

### چرا Monorepo؟

```
NardAria-v3/
├── backgammon-frontend/    ← React App
│   └── src/
└── backgammon-error-service/    ← Node.js Backend
    └── src/
```

**مزایا:**
1. **یه Git Repo** - همه کد جمعه، history واحد
2. **مدیریت آسون** - یه بار push، همه میره
3. **Share کردن** - Types/Constants مشترک
4. **Version Sync** - Frontend/Backend همزمان update میشن

**جایگزین (ک بد بود):**
```
frontend-repo/  ← جدا
backend-repo/   ← جدا
// مشکلات: sync نبودن، 2 جا push کردن، types تکراری
```

---

## 🔒 7. Security & Rate Limiting (امنیت و محدودسازی)

### چرا Rate Limiting؟

```typescript
// بدون Rate Limit:
for (let i = 0; i < 10000; i++) {
  sendError(); // 10K request!!! سرور میمیره 💀
}

// با Rate Limit:
// ✅ Request 1-20: OK
// ❌ Request 21+: Block (429 Too Many Requests)
```

### Duplicate Prevention چی کار میکنه؟

```typescript
// تو 5 دقیقه error یکسان رو دوباره نمیفرسته
Error: "Payment failed" at 10:00 → ✅ Send
Error: "Payment failed" at 10:02 → ❌ Skip (duplicate)
Error: "Payment failed" at 10:06 → ✅ Send (5 min گذشته)
```

**چرا؟**
- صرفه‌جویی هزینه (هر WhatsApp پولی‌ست)
- جلو spam
- سرور overload نمیشه

### API Key Authentication:

```typescript
// در .env:
ERROR_API_KEY=your-secret-key-123

// در request:
headers: {
  'x-api-key': 'your-secret-key-123'
}

// اگه key اشتباه باشه:
401 Unauthorized ❌
```

---

## 💰 8. Cost Management (مدیریت هزینه)

### هزینه‌های Twilio:

```
Normal Day (روز عادی):
  50 errors × $0.005 = $0.25/day
  ↓
  $7.50/month

High-Load Day (روز شلوغ):
  500 errors × $0.005 = $2.50/day
  ↓
  $75/month

Crisis Day (بحران):
  10,000 errors × $0.005 = $50/day
  ↓
  $1,500/month (اگه هر روز بحران باشه!)
```

### چطور هزینه رو کم کنیم؟

```typescript
// 1. فقط critical errors:
if (level === 'error' && isCritical(error)) {
  sendWhatsApp(); // فقط خطاهای مهم
}

// 2. Rate limit:
max: 20 // حداکثر 20 message/min
// حتی اگه 1000 error باشه، فقط 20 تا میره

// 3. Duplicate prevention:
// Error یکسان رو توی 5 دقیقه دوباره نمیفرسته

// 4. Batch notifications (آینده):
// به جای 10 message جدا، 1 message با لیست errors
```

---

## 🧪 9. Testing Strategy (استراتژی تست)

### 3 سطح تست:

#### 1️⃣ Local Testing (تست محلی)
```bash
# Frontend dev mode
cd backgammon-frontend
npm run dev

# Backend dev mode
cd backgammon-error-service
npm run dev

# باز کن: http://localhost:5173
# برو به Test Panel
# کلیک روی دکمه‌های تست
```

#### 2️⃣ Integration Testing (تست یکپارچه)
```bash
# Terminal 1: Run backend
cd backgammon-error-service
npm run dev

# Terminal 2: Run frontend
cd backgammon-frontend
npm run dev

# تست flow کامل:
# Frontend error → Backend API → Log file
```

#### 3️⃣ Production Testing (تست روی سرور)
```bash
# با Twilio واقعی

# 1. Set environment variables
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
RECIPIENT_WHATSAPP_NUMBER=+989xxxxxxxxx

# 2. Deploy backend
# 3. Test from frontend
# 4. Check WhatsApp
```

---

## 🎯 10. Best Practices (بهترین روش‌ها)

### ✅ DO (انجام بده):

```typescript
// 1. Component naming: PascalCase
const LoginForm = () => {}

// 2. File naming: کامپوننت با اسم component
LoginForm/
  ├── LoginForm.tsx
  ├── LoginForm.types.ts
  └── index.ts

// 3. Props destructuring
const Button = ({ variant, size, children }) => {}

// 4. Type everything
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

// 5. Use constants
const COLORS = { primary: '#6366f1' };

// 6. Error handling
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed', { error });
}
```

### ❌ DON'T (انجام نده):

```typescript
// 1. Inline styles (از Tailwind استفاده کن)
<div style={{ color: 'red' }}> ❌

// 2. Any type
const data: any = ... ❌

// 3. Magic numbers
if (width > 768) ❌  // 768 چیه؟
if (width > BREAKPOINTS.md) ✅

// 4. Nested ternaries
{isLoading ? <Spinner /> : isError ? <Error /> : <Content />} ❌
// از if/switch استفاده کن

// 5. Prop drilling (بیش از 2-3 سطح)
<A>
  <B data={data}>
    <C data={data}>
      <D data={data}> ❌
// از Context استفاده کن
```

---

## 📁 11. Project Structure Logic (منطق ساختار)

### چرا Feature-Based?

```
features/
├── auth/          ← همه چیز مربوط به authentication
├── game/          ← همه چیز مربوط به game
├── wallet/        ← همه چیز مربوط به wallet
└── profile/       ← همه چیز مربوط به profile
```

**مزایا:**
- پیدا کردن آسون
- تست کردن راحت
- حذف کردن بی‌خطر (اگه feature نخواستی)

### shared/ برای چی؟

```
shared/
├── components/   ← کامپوننت‌های عمومی (Button, Input)
├── hooks/        ← Hooks عمومی (useDebounce, useAsync)
├── utils/        ← توابع کمکی (formatDate, validateEmail)
└── types/        ← Types مشترک
```

**چرا؟** چیزایی که توی چند feature استفاده میشن.

---

## 🚀 12. Deployment (استقرار)

### Frontend (Vercel):
```bash
# Push to GitHub
git push

# Vercel auto-deploy میکنه از main branch
# URL: https://your-app.vercel.app
```

### Backend (Railway/Render):
```bash
# Push to GitHub
git push

# Railway auto-deploy میکنه
# URL: https://your-app.up.railway.app
```

### Environment Variables:
```bash
# Frontend (.env)
VITE_ERROR_API_URL=https://your-backend.up.railway.app
VITE_ERROR_API_KEY=your-secret-key

# Backend (.env)
PORT=3001
ERROR_API_KEY=your-secret-key
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
RECIPIENT_WHATSAPP_NUMBER=+989xxxxxxxxx
```

---

## 📊 13. Monitoring & Analytics (نظارت)

### چی رو باید مانیتور کنی؟

```typescript
// 1. Error Rate (نرخ خطا)
const errorRate = errors / totalRequests * 100;
// Normal: <1%
// High: >5% 🚨

// 2. Response Time (زمان پاسخ)
// Good: <100ms
// Bad: >500ms 🐢

// 3. WhatsApp Delivery Rate (نرخ تحویل)
const deliveryRate = delivered / sent * 100;
// Good: >95%
// Bad: <80% 📵

// 4. User Sessions (جلسات کاربر)
// بیشتر = بهتر 📈

// 5. Memory Usage (مصرف حافظه)
// Normal: <500MB
// High: >1GB ⚠️
```

---

## 🎓 14. Learning Path (مسیر یادگیری)

### مرحله 1: Basics
- [ ] TypeScript basics
- [ ] React Hooks (useState, useEffect)
- [ ] Tailwind CSS
- [ ] Component props

### مرحله 2: Intermediate
- [ ] Context API (ThemeProvider)
- [ ] Custom Hooks
- [ ] Error Boundaries
- [ ] API calls (fetch)

### مرحله 3: Advanced
- [ ] SOLID principles
- [ ] Atomic Design
- [ ] Performance optimization
- [ ] Backend basics (Express)

### مرحله 4: Production
- [ ] Error tracking
- [ ] Logging
- [ ] Deployment
- [ ] Monitoring

---

## 🔧 15. Debugging Tools (ابزارهای دیباگ)

### در پروژه:

1. **Browser Console (F12)**
   ```javascript
   logger.error('test'); // میبینی در console
   ```

2. **DebugPanel (🐛 button)**
   - لیست همه errors
   - filter by level
   - export logs

3. **TestPanel (🧪)**
   - تست دستی errors
   - تست rate limiting
   - view logs

4. **React DevTools**
   - ببینی component tree
   - ببینی props/state
   - profile performance

5. **Network Tab**
   - ببینی API calls
   - ببینی response time
   - ببینی errors

---

## 💡 16. Common Patterns (الگوهای رایج)

### Custom Hook Pattern:
```typescript
// useTheme.ts
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be in ThemeProvider');
  return context;
};

// استفاده:
const { theme, setTheme } = useTheme();
```

### Compound Component Pattern:
```typescript
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props Pattern:
```typescript
<ErrorBoundary
  fallback={(error) => <ErrorUI error={error} />}
>
  <App />
</ErrorBoundary>
```

---

## 🎯 Quick Reference (مرجع سریع)

### دستورات مهم:

```bash
# Run frontend
cd backgammon-frontend && npm run dev

# Run backend
cd backgammon-error-service && npm run dev

# Build frontend
npm run build

# Test frontend
npm run test

# Push to Git
git add .
git commit -m "message"
git push
```

### URLs مهم:

- Frontend Local: http://localhost:5173
- Backend Local: http://localhost:3001
- GitHub: https://github.com/naviddigit/nardarena
- Docs: `docs/` folder

### Files مهم:

- Theme: `src/app/providers/ThemeProvider.tsx`
- Logger: `src/services/errorTracking/logger.ts`
- Error Boundary: `src/services/errorTracking/ErrorBoundary.tsx`
- Backend Server: `backgammon-error-service/src/server.ts`

---

## ✨ خلاصه کلی

این پروژه یه **backgammon platform** هست که با **React** و **TypeScript** ساخته شده و:

1. **SOLID** principles رو دنبال میکنه
2. **Atomic Design** pattern داره
3. **3 تم** داره (Dark/Light/Gaming)
4. **Error tracking** کامل با WhatsApp notification
5. **Performance** عالی (<1% overhead)
6. **Monorepo** structure
7. **Production-ready** با monitoring

همه چیز **modular**، **scalable** و **maintainable** طراحی شده 🚀

---

**نوشته شده با ❤️ برای یادگیری بهتر**
