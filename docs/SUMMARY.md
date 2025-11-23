# 📋 خلاصه ساختار مستندات - Nard Arena v3

## 🎯 هدف این فایل
یه نگاه سریع به اینکه مستندات کجا هستند و چی دارند.

---

## 📂 ساختار کلی

### 1. مستندات پروژه (Root Level)
```
docs/                              # مستندات اصلی پروژه
├── INDEX.md                       # نقطه شروع - همه چیز اینجاست
├── 00-MANDATORY/                  # قوانین و تنظیمات حیاتی
├── 01-critical/                   # امنیت و درس‌های مهم
├── 02-high-priority/              # API, Database, Telegram
├── 03-medium-priority/            # معماری کلی
├── 04-low-priority/               # اطلاعات عمومی
├── 05-troubleshooting/            # رفع مشکلات
├── 06-guides/                     # راهنماها
└── 07-reports/                    # گزارش‌های کاری
```

### 2. مستندات Frontend (در پروژه Frontend)
```
backgammon-frontend/docs/          # مستندات مخصوص React/UI
├── INDEX.md                       # راهنمای شروع Frontend
├── UI_ROADMAP.md                  # نقشه راه کامپوننت‌ها
├── CHANGES.md                     # تغییرات Frontend
├── LEARNING_GUIDE.md              # آموزش کامپوننت‌ها
├── GIT_STRATEGY.md                # استراتژی Git
├── ERROR_TRACKING.md              # سیستم خطایابی
└── ...                            # سایر مستندات UI
```

### 3. مستندات Backend (README در Backend)
```
backgammon-auth-backend/
├── README.md                      # راهنمای Backend
├── POSTGRES_SETUP.md              # نصب و تنظیم دیتابیس
└── .env.example                   # نمونه تنظیمات
```

---

## 🗺️ راهنمای دسترسی سریع

### میخوای شروع کنی؟
👉 [docs/INDEX.md](INDEX.md) - شروع از اینجا

### مشکل فنی داری؟
👉 [docs/05-troubleshooting/](05-troubleshooting/)

### میخوای روی Frontend کار کنی؟
👉 [backgammon-frontend/docs/INDEX.md](../backgammon-frontend/docs/INDEX.md)

### میخوای روی Backend کار کنی؟
👉 [docs/02-high-priority/API-DOCUMENTATION.md](02-high-priority/API-DOCUMENTATION.md)

### میخوای Telegram Setup کنی؟
👉 [docs/02-high-priority/TELEGRAM-COMPLETE-GUIDE.md](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md)

---

## 📊 توزیع مستندات

| مکان | تعداد فایل | موضوع |
|------|-----------|-------|
| `docs/` | ~25 فایل | مستندات کلی پروژه |
| `backgammon-frontend/docs/` | ~11 فایل | React, UI, Components |
| `backgammon-auth-backend/` | 2 فایل | Backend Setup |
| Root | 2 فایل | README, Copilot |

---

## 🎯 اصول سازماندهی

### ✅ چرا Frontend جدا است؟
- **Separation of Concerns**: هر سرویس مستندات خودش را دارد
- **Team Independence**: تیم Frontend می‌تواند مستقل کار کند
- **Focused Documentation**: مستندات UI با مستندات API قاطی نمی‌شود

### ✅ چرا docs در root است؟
- **Project-Wide**: مستنداتی که به کل پروژه مربوط است
- **Cross-Service**: Security, Architecture, Deployment
- **Single Source**: یک نقطه مرجع برای همه

---

## 📝 قوانین مستندسازی

### مستند جدید کجا بسازیم؟

#### ✅ در `docs/` بساز اگر:
- مربوط به کل پروژه است (Architecture, Security)
- مربوط به Backend است (API, Database, Telegram)
- راهنما یا Troubleshooting است
- گزارش کار کلی است

#### ✅ در `backgammon-frontend/docs/` بساز اگر:
- مربوط به React/UI است
- مربوط به کامپوننت‌ها است
- راهنمای Frontend Development است
- تغییرات UI است

#### ✅ در `backgammon-auth-backend/` بساز اگر:
- راهنمای نصب Backend است
- تنظیمات خاص Backend است

---

## 🔗 لینک‌های مهم

### مستندات اصلی:
- [INDEX.md](INDEX.md) - راهنمای جامع
- [00-MANDATORY/RULES.md](00-MANDATORY/RULES.md) - قوانین خط قرمز

### Frontend:
- [UI Components](../backgammon-frontend/docs/UI_ROADMAP.md)
- [Frontend Changes](../backgammon-frontend/docs/CHANGES.md)

### Backend:
- [API Docs](02-high-priority/API-DOCUMENTATION.md)
- [Database Schema](02-high-priority/DATABASE-SCHEMA.md)

### Troubleshooting:
- [ENV Issues](05-troubleshooting/ENV-ISSUES.md)
- [Telegram Guide](02-high-priority/TELEGRAM-COMPLETE-GUIDE.md)

---

## ✨ نکته نهایی

**همه چیز از [INDEX.md](INDEX.md) شروع می‌شود!**

اگر نمی‌دانید به کجا مراجعه کنید، INDEX.md را باز کنید. 🚀

---

**تاریخ:** 23 نوامبر 2025  
**وضعیت:** ✅ سازماندهی شده و به‌روز
