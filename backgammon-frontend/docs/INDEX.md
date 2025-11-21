# 📚 Documentation Index

## راهنمای مستندات پروژه Backgammon Frontend

این فولدر شامل تمام مستندات فنی و آموزشی پروژه است.

---

## 📖 فایل‌ها

### 1️⃣ [GIT_STRATEGY.md](./GIT_STRATEGY.md)
**استراتژی Git و Branching**
- ساختار branch ها (main, develop, feature/*)
- نحوه commit کردن
- Versioning strategy (v0.1.0, v0.2.0, ...)
- Workflow روزانه

👉 **کی بخونی؟** وقتی می‌خوای commit کنی یا branch جدید بسازی

---

### 2️⃣ [ARCHITECTURE.md](./ARCHITECTURE.md)
**معماری کلی پروژه**
- ساختار فولدرها (features, shared, app)
- سیستم تم (ThemeProvider)
- Path aliases (@shared, @features, @/)
- استانداردهای کدنویسی

👉 **کی بخونی؟** وقتی می‌خوای فایل جدید بسازی و نمی‌دونی کجا بذاریش

---

### 3️⃣ [UI_ROADMAP.md](./UI_ROADMAP.md)
**نقشه راه کامپوننت‌های UI**
- لیست کامپوننت‌های ساخته شده ✅
- لیست کامپوننت‌های در دست کار 🔨
- لیست کامپوننت‌های بعدی 📦
- Checklist قبل از commit

👉 **کی بخونی؟** وقتی می‌خوای ببینی چه کامپوننت‌هایی داریم و چی باید بسازیم

---

### 4️⃣ [LEARNING_GUIDE.md](./LEARNING_GUIDE.md)
**راهنمای یادگیری - توضیح قدم به قدم کدها**
- توضیح کامل Button Component
- توضیح کامل Input Components
- چرا SOLID رعایت کردیم؟
- نحوه تست کردن
- تمرین‌های عملی

👉 **کی بخونی؟** وقتی می‌خوای یاد بگیری کدها چطور کار می‌کنن

---

### 5️⃣ [CHANGES.md](./CHANGES.md)
**لیست تغییرات انجام شده**
- خلاصه تمام تغییرات
- مشکلات حل شده
- قبل و بعد

👉 **کی بخونی؟** وقتی می‌خوای ببینی چه کارهایی انجام شده

---

## 🚀 شروع سریع

### من تازه اومدم، از کجا شروع کنم؟

1. **اول بخون:** `GIT_STRATEGY.md` (5 دقیقه)
2. **بعد بخون:** `ARCHITECTURE.md` (10 دقیقه)
3. **بعد بخون:** `UI_ROADMAP.md` (3 دقیقه)
4. **برای یادگیری عمیق:** `LEARNING_GUIDE.md` (30 دقیقه)

---

## 📊 وضعیت فعلی پروژه

```
✅ Git Setup (main, develop, feature/ui-design)
✅ ThemeProvider (dark/light/gaming)
✅ Button Component (5 variants, 3 sizes, loading)
✅ Input Components (Text, Password, validation)
🔜 Avatar Component (بعدی)
🔜 Card Component
🔜 Modal Component
```

---

## 🎯 الویت‌های فعلی

### امروز:
- [ ] Avatar Component
- [ ] Card Component

### این هفته:
- [ ] Modal Component
- [ ] Toast/Notification
- [ ] Dropdown

### بعدی:
- [ ] Game Board UI
- [ ] Tournament List
- [ ] Wallet UI

---

## 💡 نکات مهم

### برای Developer جدید:
1. همیشه از branch `develop` شروع کن
2. Feature branch بساز: `git checkout -b feature/new-feature`
3. Commit message استاندارد: `feat: Add new component`
4. بعد از تمام شدن، merge به `develop`

### برای DevOps:
1. فایل `package.json` لیست dependencies رو داره
2. دستور اجرا: `npm run dev`
3. دستور build: `npm run build`
4. پورت پیش‌فرض: `5173`

---

## 📞 سوال داری؟

اگه چیزی رو نفهمیدی:
1. اول توی این فولدر دنبال کن
2. اگه پیدا نکردی، بپرس
3. جواب رو به این مستندات اضافه می‌کنیم

---

**آخرین بروزرسانی:** November 20, 2025  
**نسخه:** v0.1.0 (در حال توسعه)
