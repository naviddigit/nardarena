# معماری پروژه Backgammon Frontend

## ساختار ماژولار و اصول طراحی

### 📁 ساختار کلی

```
src/
├── app/                    # تنظیمات و providerهای اصلی
│   └── providers/         # Context providers مرکزی
│       ├── ThemeProvider.tsx
│       └── index.tsx
├── features/              # ماژول‌های فیچر به صورت مستقل
│   └── auth/
│       ├── components/    # کامپوننت‌های خاص auth
│       ├── pages/         # صفحات auth
│       └── hooks/         # Hooks مخصوص auth
├── shared/                # کامپوننت‌ها و ابزارهای مشترک
│   └── components/
│       ├── atoms/         # کامپوننت‌های پایه (Button, Input, Icon)
│       ├── molecules/     # ترکیب اتم‌ها
│       └── organisms/     # کامپوننت‌های پیچیده
└── styles/
    └── globals.css        # استایل‌های عمومی
```

---

## 🎨 سیستم تم (Theme System)

### استفاده از ThemeProvider

تمام تم‌ها از یک Provider مرکزی مدیریت می‌شوند:

```tsx
import { ThemeProvider, useTheme } from '@/app/providers';

// در main.tsx
<ThemeProvider>
  <App />
</ThemeProvider>

// در کامپوننت‌ها
const { theme, setTheme } = useTheme();
```

### تم‌های موجود:
- **dark**: حالت تاریک (پیش‌فرض)
- **light**: حالت روشن
- **gaming**: حالت گیمینگ

### رنگ‌های تعریف‌شده در Tailwind:

```javascript
// tailwind.config.js
colors: {
  dark: {
    bg: '#0f0f12',
    surface: '#1a1a1f',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  light: {
    bg: '#ffffff',
    surface: '#f5f5f5',
    border: '#e5e5e5',
  },
  gaming: {
    bg: '#0a0a12',
    surface: '#1b0f3d',
    border: 'rgba(168, 85, 247, 0.3)',
  }
}
```

### نحوه استفاده از رنگ‌های کاستوم:

```tsx
// ✅ درست - استفاده از کلاس‌های Tailwind
<div className="bg-dark-bg dark:bg-dark-bg" />
<div className="border-light-border dark:border-dark-border" />

// ❌ اشتباه - هاردکد کردن رنگ
<div className="bg-[#0f0f12]" />
```

---

## 🧩 کامپوننت‌های ماژولار

### 1. Button Component

```tsx
import { Button } from '@shared/components/atoms/Button';

<Button variant="gradient" fullWidth>
  ورود
</Button>

<Button variant="secondary" leftIcon={<GoogleIcon />}>
  ورود با گوگل
</Button>
```

**Variants موجود:**
- `primary`: دکمه اصلی بنفش
- `secondary`: دکمه ثانویه خاکستری (theme-aware)
- `gradient`: دکمه با گرادیان

---

### 2. Input Component

```tsx
import { Input } from '@shared/components/atoms/Input';

<Input
  type="email"
  placeholder="ایمیل"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  leftIcon={<EmailIcon />}
/>
```

**ویژگی‌ها:**
- پشتیبانی از light/dark mode
- بوردر محو در حالت روشن
- نمایش خطا
- آیکون سمت چپ

---

### 3. Icon Components

```tsx
import {
  MoonIcon,
  SunIcon,
  GamepadIcon,
  GoogleIcon,
  // ... سایر آیکون‌ها
} from '@shared/components/atoms/Icon';
```

---

## 🔧 Path Aliases

برای سهولت در import از aliasهای زیر استفاده کنید:

```tsx
import { Button } from '@shared/components/atoms/Button';
import LoginPage from '@features/auth/pages/LoginPage';
import { ThemeProvider } from '@/app/providers';
```

**تنظیمات (در vite.config.ts و tsconfig):**
- `@/` → `./src/`
- `@shared/` → `./src/shared/`
- `@features/` → `./src/features/`

---

## 📝 استانداردهای کدنویسی

### ✅ استاندارد درست:

```tsx
// 1. Import بدون پسوند .tsx
import LoginPage from '@features/auth/pages/LoginPage';

// 2. استفاده از کامپوننت‌های مشترک
import { Button, Input } from '@shared/components/atoms';

// 3. استفاده از ThemeProvider برای تم
const { theme } = useTheme();

// 4. استفاده از کلاس‌های Tailwind به جای inline styles
<div className="bg-dark-bg dark:bg-light-bg" />
```

### ❌ اشتباهات رایج:

```tsx
// 1. Import با پسوند
import LoginPage from './LoginPage.tsx'; // ❌

// 2. استایل‌های اینلاین طولانی
<div className="w-full bg-white/5 border border-white/10 ..." /> // ❌

// 3. هاردکد کردن رنگ
<div className="bg-[#0f0f12]" /> // ❌

// 4. مدیریت تم در هر کامپوننت
const [theme, setTheme] = useState('dark'); // ❌
```

---

## 🚀 نحوه اجرا

```bash
# نصب وابستگی‌ها
npm install

# اجرای dev server
npm run dev

# بیلد برای production
npm run build
```

---

## 🔄 Hot Reload و تغییرات Tailwind

**نکته مهم:** برای اعمال تغییرات در `tailwind.config.js`:

1. تغییرات در کلاس‌های JSX به صورت خودکار اعمال می‌شوند
2. اگر رنگ جدیدی به config اضافه کردید، dev server را **restart** کنید
3. اگر تغییرات اعمال نشد:
   ```bash
   # پاک کردن cache و restart
   npm run dev
   ```

---

## 📚 منابع بیشتر

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🐛 عیب‌یابی رایج

### مشکل: تغییرات Tailwind اعمال نمی‌شوند
**راه‌حل:**
1. مطمئن شوید از کلاس‌های کامل استفاده می‌کنید (نه داینامیک)
2. Dev server را restart کنید
3. بررسی کنید کلاس در `content` پردازش می‌شود

### مشکل: Import کار نمی‌کند
**راه‌حل:**
1. پسوند `.tsx` را حذف کنید
2. از path aliases استفاده کنید (`@shared/`, `@features/`)
3. VS Code را reload کنید

### مشکل: تم درست کار نمی‌کند
**راه‌حل:**
1. مطمئن شوید App در `<ThemeProvider>` قرار دارد
2. کلاس‌های `dark:` را به درستی استفاده کنید
3. DevTools را چک کنید که کلاس `dark` روی `<html>` اضافه شده
