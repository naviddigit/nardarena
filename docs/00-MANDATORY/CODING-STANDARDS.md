# 🔴 CODING STANDARDS - خطوط قرمز

> این استانداردها باید **همیشه** و در **تمام** صفحات و کامپوننت‌ها رعایت شوند.

## 📌 اصل اول: سادگی

```
کیفیت = سادگی + یکنواختی
کیفیت ≠ کد بیشتر یا پیچیدگی بیشتر
```

## 🚫 ممنوعیت‌های مطلق

### 1. **هیچ استایل هارد‌کد نباید در صفحات باشد**
```tsx
// ❌ WRONG - Hard-coded styles in pages
<div className="bg-purple-500 p-4 rounded-xl">

// ✅ CORRECT - Use components
<Card variant="primary">
```

### 2. **هیچ inline style نباید نوشته شود**
```tsx
// ❌ WRONG
<div style={{ backgroundColor: '#fff', padding: '16px' }}>

// ✅ CORRECT
<Card>
```

### 3. **هیچ کد تکراری نباید باشد**
```tsx
// ❌ WRONG - Repeated responsive classes
<div className="text-xs sm:text-sm md:text-base lg:text-lg">

// ✅ CORRECT - Use typography component
<Text variant="body">
```

## ✅ الزامات

### 1. **استفاده از کامپوننت‌های آماده**
همیشه از کامپوننت‌های موجود استفاده کن:
- `Card` - برای باکس‌ها
- `Button` - برای دکمه‌ها
- `Input` - برای ورودی‌ها
- `Badge` - برای برچسب‌ها
- `Text/Heading` - برای متن‌ها

### 2. **تم باید ماژولار باشد**
```tsx
// ❌ WRONG
<div className="bg-purple-600 dark:bg-gray-900">

// ✅ CORRECT - Use theme tokens
<div className="bg-primary dark:bg-dark-surface">
```

### 3. **Layout یکسان برای همه صفحات**
```tsx
// ✅ CORRECT - Use PageLayout
<PageLayout title="Profile" showBackButton>
  <Content>
    {/* Page content */}
  </Content>
</PageLayout>
```

### 4. **Responsive از قالب اصلی**
همه سایزبندی‌ها باید از:
- Tailwind config
- Theme tokens
- Layout components

## 📱 موبایل First (80% کاربران)

```tsx
// ✅ Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  
// Not desktop first ❌
<div className="w-1/3 sm:w-full">
```

## 🎨 دست‌خط یکسان

### Naming Conventions:
```typescript
// Components: PascalCase
ProfilePage, UserCard, ThemeToggle

// Functions: camelCase
handleSubmit, getUserData, formatDate

// Constants: UPPER_SNAKE_CASE
MAX_ITEMS, API_URL, DEFAULT_THEME

// Types/Interfaces: PascalCase with descriptive names
UserProfile, ApiResponse, ThemeConfig
```

### File Structure:
```
ComponentName/
  ├── ComponentName.tsx       // Main component
  ├── ComponentName.types.ts  // Types & interfaces
  ├── ComponentName.styles.ts // Styles (if needed)
  └── index.ts                // Barrel export
```

### Import Order:
```tsx
// 1. React & external libraries
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal components
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';

// 3. Hooks & utilities
import { useAuth } from '@features/auth/hooks/useAuth';
import { formatDate } from '@shared/utils/date';

// 4. Types
import type { UserProfile } from './types';

// 5. Styles (rarely needed)
```

## 🏗️ SOLID Principles

### Single Responsibility
```tsx
// ❌ WRONG - Component does too much
function UserPage() {
  // Fetching data
  // Form handling
  // Validation
  // UI rendering
}

// ✅ CORRECT - Separated concerns
function UserPage() {
  const { data } = useUserData();
  const form = useUserForm();
  
  return <UserPageView data={data} form={form} />;
}
```

### Open/Closed
```tsx
// ✅ Extend through props, not modification
<Card variant="primary" size="lg" hover>
```

### Dependency Inversion
```tsx
// ✅ Depend on abstractions (props), not concrete implementations
interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}
```

## 🎯 Component Usage Rules

### Card Component
```tsx
// ✅ Always use Card for containers
<Card variant="elevated" padding="lg">
  <Content />
</Card>

// Not bare divs ❌
<div className="bg-white p-6 rounded-xl shadow-lg">
```

### Button Component
```tsx
// ✅ Always use Button component
<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

// Not bare buttons ❌
<button className="bg-blue-500 px-4 py-2 rounded">
```

### Input Component
```tsx
// ✅ Always use Input component
<Input 
  label="Username" 
  value={value} 
  onChange={onChange}
  leftIcon={<FiUser />}
/>

// Not bare inputs ❌
<input type="text" className="border rounded px-3 py-2" />
```

## 📐 Spacing & Sizing

### Use Tailwind spacing scale consistently:
```
p-2  = 8px   (tight)
p-4  = 16px  (normal)
p-6  = 24px  (comfortable)
p-8  = 32px  (spacious)
```

### Responsive breakpoints:
```
sm:  640px  (Mobile landscape / Small tablet)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
```

## 🔄 State Management

```tsx
// ✅ Use proper hooks
const { user, logout } = useAuth();
const { theme, toggleTheme } = useTheme();

// Not prop drilling ❌
<Component user={user} theme={theme} logout={logout} ... />
```

## 📝 Comments

```tsx
// Only comment WHY, not WHAT
// ❌ WRONG
// Set the user name to John
setUserName('John');

// ✅ CORRECT
// Default to John for demo accounts
setUserName('John');
```

## 🧪 Before Committing

چک‌لیست قبل از هر commit:

- [ ] هیچ استایل هارد‌کد نداره؟
- [ ] از کامپوننت‌های آماده استفاده شده؟
- [ ] دست‌خط یکسان با بقیه پروژه؟
- [ ] Responsive درست کار می‌کنه؟
- [ ] SOLID principles رعایت شده؟
- [ ] کد تکراری نداره؟
- [ ] Mobile first approach رعایت شده؟
- [ ] Import order درسته؟
- [ ] Naming conventions درسته؟

## 🎓 Philosophy

```
"یک بار درست بنویس، نه صد بار اشتباه"
"سادگی نهایت پیچیدگی است"
"کد خوب، کدی است که خوانده شود، نه نوشته شود"
```

---

## ⚠️ یادآوری نهایی

این استانداردها **مذاکره‌پذیر نیستند**.  
هر خط کدی که می‌نویسی باید این قوانین را رعایت کند.  
کیفیت در سادگی است، نه پیچیدگی.

**همیشه این سند را قبل از شروع کار بخوان.**
