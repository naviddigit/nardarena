# Git Branching Strategy - NardAria Backgammon

## 📊 استراتژی Branch ها

### Main Branches (دائمی)

```
main (production)
  ↓
develop (آخرین تغییرات توسعه)
```

### Feature Branches (موقت)

```
feature/ui-design          → طراحی UI و کامپوننت‌ها
feature/game-logic         → منطق بازی
feature/tournament-system  → سیستم تورنمنت
feature/websocket          → Real-time communication
feature/wallet-payment     → سیستم کیف پول و پرداخت
```

### Release Branches

```
release/v1.0.0
release/v1.1.0
...
```

---

## 🚀 مراحل Setup

### 1. Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Project structure with ThemeProvider"
```

### 2. Create Develop Branch
```bash
git branch develop
git checkout develop
```

### 3. Create Feature Branches
```bash
# برای UI Design (الان روش کار می‌کنیم)
git checkout -b feature/ui-design

# برای بقیه (بعداً)
git checkout develop
git checkout -b feature/game-logic

git checkout develop
git checkout -b feature/tournament-system

git checkout develop
git checkout -b feature/websocket

git checkout develop
git checkout -b feature/wallet-payment
```

---

## 📦 Versioning Strategy

### Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR (1.x.x)**: تغییرات بزرگ که با نسخه قبلی ناسازگار است
- **MINOR (x.1.x)**: قابلیت جدید (backward compatible)
- **PATCH (x.x.1)**: Bug fix

### Timeline پیشنهادی:

```
v0.1.0 → UI Components (Button, Input, Card, Modal)
v0.2.0 → Auth Pages (Login, Register)
v0.3.0 → Game Board UI
v0.4.0 → Tournament List & Details
v0.5.0 → Wallet & Payment UI
v1.0.0 → Production Release (MVP)
```

---

## 🔄 Workflow

### روزانه (Developer):
```bash
# Start of day
git checkout feature/ui-design
git pull origin develop

# Work...
git add .
git commit -m "feat: Add Button component with variants"

# End of day
git push origin feature/ui-design
```

### Release (شما):
```bash
# وقتی UI تمام شد
git checkout develop
git merge feature/ui-design
git tag -a v0.1.0 -m "Release v0.1.0: UI Components"
git push origin develop --tags

# Deploy to production
git checkout main
git merge develop
git push origin main
```

---

## 📝 Commit Message Convention

```
feat: اضافه کردن قابلیت جدید
fix: رفع باگ
docs: تغییر در مستندات
style: فرمت‌بندی کد (بدون تغییر منطق)
refactor: بازنویسی کد
test: اضافه کردن تست
chore: کارهای نگهداری (dependency update)
```

### مثال‌ها:
```bash
git commit -m "feat: Add Button component with 5 variants"
git commit -m "feat: Add TextInput with validation support"
git commit -m "fix: Button loading state not working"
git commit -m "refactor: Extract InputWrapper to separate component"
git commit -m "docs: Add ARCHITECTURE.md"
```

---

## 👥 برای تیم

وقتی برنامه‌نویس‌ها می‌آیند:

1. Clone repository
2. Checkout develop
3. Create feature branch از develop
4. کار کنند
5. Push به feature branch
6. شما merge می‌کنید به develop

---

## 🎯 الان چیکار کنیم؟

1. ✅ Git init
2. ✅ Create develop branch
3. ✅ Create feature/ui-design branch
4. 🔨 شروع به ساخت کامپوننت‌های UI
