# 🎨 Phase 1: UI Component Development

## 📍 وضعیت فعلی
- **Branch**: `feature/ui-design`
- **Version Target**: `v0.1.0`
- **هدف**: ساخت کامپوننت‌های پایه UI با رعایت SOLID

---

## 🎯 کامپوننت‌های مرحله 1 (الویت بالا)

### ✅ کامل شده:
- [x] `ThemeProvider` - مدیریت تم
- [x] `Button` - دکمه (بازنویسی شده با SOLID - 5 variant, 3 size)
- [x] `Input` - ورودی متن (بازنویسی شده با TextInput, PasswordInput)
- [x] `Avatar` - عکس پروفایل (6 size, 3 shape, status indicator)

---

## 📦 کامپوننت‌های بعدی (الویت متوسط)

### Atoms (کوچک‌ترین واحد):
- [x] `Avatar` - عکس پروفایل ✅
- [x] `Badge` - نشان (online/offline/winner) ✅
- [x] `Spinner` - لودینگ ✅
- [x] `Divider` - جداکننده ✅
- [ ] `Icon` - آیکون‌ها (بهبود)
- [ ] `Text` - متن با استایل‌های مختلف

### Molecules (ترکیب Atoms):
- [ ] `Card` - کارت (برای لیست بازی‌ها)
- [ ] `Modal` - پنجره popup
- [ ] `Toast` - نوتیفیکیشن
- [ ] `Dropdown` - منوی کشویی
- [ ] `FormField` - ترکیب Input + Label + Error
- [ ] `SearchBar` - جستجو
- [ ] `Tabs` - تب‌ها

### Organisms (ترکیب‌های بزرگ):
- [ ] `Header` - هدر سایت
- [ ] `Navigation` - منوی اصلی
- [ ] `GameCard` - کارت بازی با جزئیات
- [ ] `PlayerCard` - اطلاعات بازیکن
- [ ] `TournamentCard` - کارت تورنمنت

---

## 🏗️ ساختار کامپوننت (SOLID)

### مثال ساختار Button:

```
src/shared/components/atoms/Button/
├── Button.tsx                 # کامپوننت اصلی
├── Button.types.ts           # Type definitions
├── Button.styles.ts          # Style configurations (اختیاری)
├── Button.test.tsx           # Tests (بعداً)
├── Button.stories.tsx        # Storybook (بعداً)
└── index.ts                  # Export
```

### اصول SOLID که رعایت می‌کنیم:

1. **S**ingle Responsibility
   - هر کامپوننت فقط یک کار انجام می‌دهد
   - Style config جدا از logic

2. **O**pen/Closed
   - باز برای توسعه (می‌توان variant اضافه کرد)
   - بسته برای تغییر (تغییر variant جدید، کد قدیمی را خراب نمی‌کند)

3. **L**iskov Substitution
   - Props typing صحیح
   - هر variant جایگزین دیگری می‌شود

4. **I**nterface Segregation
   - Props کوچک و مشخص
   - Optional props برای features اضافی

5. **D**ependency Inversion
   - استفاده از Composition
   - Pass children و icons به جای hardcode

---

## 📝 چک‌لیست قبل از Commit

هر کامپوننت باید:
- [ ] TypeScript types کامل داشته باشد
- [ ] Props documentation دارد (JSDoc comments)
- [ ] حداقل 3 variant مختلف دارد
- [ ] Responsive است (mobile, tablet, desktop)
- [ ] Dark/Light mode support دارد
- [ ] Accessible است (ARIA labels)
- [ ] Performance optimize شده (React.memo اگر لازم باشد)

---

## 🚀 مراحل کار امروز

### Step 1: بازنویسی Button با SOLID کامل ✅
- اضافه کردن size ها (sm, md, lg)
- اضافه کردن loading state
- جدا کردن style config
- اضافه کردن disabled state

### Step 2: بازنویسی Input با SOLID
- ساخت TextInput جدا
- ساخت PasswordInput با show/hide
- ساخت InputWrapper
- اضافه کردن validation

### Step 3: ساخت Avatar Component
- Variant ها: circle, square, rounded
- Size ها: xs, sm, md, lg, xl
- با placeholder برای بدون عکس
- با online/offline indicator

### Step 4: ساخت Card Component
- برای نمایش بازی‌ها
- برای نمایش تورنمنت‌ها
- با header, body, footer
- با hover effects

---

## 📚 منابع یادگیری

برای درک بهتر:
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [React Component Patterns](https://www.patterns.dev/posts/react-component-patterns/)

---

**الان شروع می‌کنیم با Button Component! 🚀**
