# 📚 NardAria v3 - Documentation Index

> مرکز مستندات پروژه - همه چیز در یک نگاه

---

## 🚀 شروع سریع (برای توسعه‌دهندگان جدید)

### مستندات ضروری:
1. **[README.md](../README.md)** - معرفی پروژه و نصب
2. **[README-QUICK.md](../README-QUICK.md)** - راهنمای سریع
3. **[NEXT-STEPS.md](../NEXT-STEPS.md)** - مراحل بعدی پیشنهادی

### راه‌اندازی اولیه:
```bash
# نصب و اجرا
.\start-dev.bat

# URLs:
# Frontend: http://localhost:5173
# Backend:  http://localhost:3002
# Database: http://localhost:8081 (pgweb)
```

---

## 📋 ساختار مستندات

### ⚠️ درجه اهمیت: اجباری - قبل از هر کاری
**این فایل را همیشه اول بخوانید:**

0. **[RULES.md](./00-MANDATORY/RULES.md)** ⭐⭐⭐
   - 🚨 **الزامی - قبل از هر کاری**
   - قوانین خط قرمز پروژه
   - English only in UI
   - No component duplication
   - Never delete working code
   - **اگر این رو نخونی، پروژه استاپ میشه!**

### 🔴 درجه اهمیت: بحرانی
این مستندات **الزامی** هستند و باید خوانده شوند:

1. **[LESSONS-LEARNED.md](./01-critical/LESSONS-LEARNED.md)**
   - ⚠️ مشکلات بحرانی که حل شدند
   - درس‌های مهم برای جلوگیری از تکرار خطاها
   - مشکل Sequelize Password Loading
   - **وقت صرف شده: 3 ساعت - هرگز تکرار نشود!**

2. **[SECURITY.md](./01-critical/SECURITY.md)**
   - استانداردهای امنیتی الزامی
   - Password hashing با bcrypt
   - JWT authentication
   - SQL injection prevention
   - Rate limiting

### 🟡 درجه اهمیت: بالا
مستندات مهم برای توسعه:

3. **[API-DOCUMENTATION.md](./02-high-priority/API-DOCUMENTATION.md)**
   - تمام API endpoints
   - Request/Response examples
   - Authentication headers
   - Error codes

4. **[DATABASE-SCHEMA.md](./02-high-priority/DATABASE-SCHEMA.md)**
   - ساختار دیتابیس
   - جداول و روابط
   - Indexes و constraints
   - Migration scripts

5. **[TELEGRAM-SETUP.md](./02-high-priority/TELEGRAM-SETUP.md)**
   - راهنمای تنظیم Telegram Bot
   - Notification system
   - Error alerts

### 🟢 درجه اهمیت: متوسط
مستندات مفید برای فهم بهتر:

6. **[ARCHITECTURE.md](./03-medium-priority/ARCHITECTURE.md)**
   - معماری کلی سیستم
   - Backend structure
   - Frontend structure
   - Flow diagrams

7. **[FRONTEND_ARCHITECTURE.md](./03-medium-priority/FRONTEND_ARCHITECTURE.md)**
   - ساختار React components
   - State management
   - Routing
   - UI/UX patterns

8. **[DEVELOPMENT-GUIDE.md](./03-medium-priority/DEVELOPMENT-GUIDE.md)**
   - راهنمای توسعه
   - Coding standards
   - Git workflow
   - Testing guidelines

### ⚪ درجه اهمیت: پایین
مستندات تکمیلی:

9. **[PROJECT.md](./04-low-priority/PROJECT.md)**
   - تاریخچه پروژه
   - معرفی کلی
   - TODO List قدیمی

10. **[KEY_CONCEPTS.md](./04-low-priority/KEY_CONCEPTS.md)**
    - مفاهیم کلیدی سیستم
    - توضیحات مفهومی

11. **[ANALYSIS.md](./04-low-priority/ANALYSIS.md)**
    - تحلیل‌های انجام شده
    - بررسی‌های تکنیکال

### 🎨 طراحی و برنامه‌ریزی
مستندات مرتبط با طراحی:

12. **[ADMIN-PANEL-DESIGN.md](./ADMIN-PANEL-DESIGN.md)**
    - طراحی کامل پنل مدیریت
    - Dashboard با نمودارها
    - User Management
    - Transactions & Withdrawals
    - Online Games Monitor
    - Implementation Plan
   - تصمیمات طراحی
   - Alternative approaches

10. **[KEY_CONCEPTS.md](./04-low-priority/KEY_CONCEPTS.md)**
    - مفاهیم کلیدی
    - Terminology
    - Best practices

11. **[ANALYSIS.md](./04-low-priority/ANALYSIS.md)**
    - تحلیل‌های اولیه
    - Requirements analysis
    - Feature planning

---

## 🎯 پیشنهاد مطالعه برای نقش‌های مختلف

### برای Backend Developer:
0. ✅ RULES.md (الزامی!)
1. ✅ LESSONS-LEARNED.md (حتماً!)
2. ✅ SECURITY.md
3. ✅ API-DOCUMENTATION.md
4. ✅ DATABASE-SCHEMA.md
5. ⭐ TELEGRAM-SETUP.md

### برای Frontend Developer:
0. ✅ RULES.md (الزامی!)
1. ✅ API-DOCUMENTATION.md
2. ✅ FRONTEND_ARCHITECTURE.md
3. ⭐ DEVELOPMENT-GUIDE.md
4. ⭐ ARCHITECTURE.md

### برای DevOps:
0. ✅ RULES.md (الزامی!)
1. ✅ SECURITY.md
2. ✅ DATABASE-SCHEMA.md
3. ✅ TELEGRAM-SETUP.md
4. ⭐ ARCHITECTURE.md

### برای Project Manager:
0. ✅ RULES.md (الزامی!)
1. ✅ README.md
2. ✅ NEXT-STEPS.md
3. ⭐ PROJECT.md
4. ⭐ ANALYSIS.md

---

## 🔧 Scripts و ابزارهای مفید

### Development Scripts:
```bash
# Start/Stop
.\start-dev.bat      # اجرای backend + frontend
.\stop-dev.bat       # بستن همه سرویس‌ها
.\check-status.bat   # چک کردن وضعیت

# Database Management
cd backgammon-auth-backend
node scripts/view-users.js              # مشاهده users
node scripts/hash-all-passwords.js      # hash کردن passwords
node scripts/test-password.js           # تست password
node scripts/migrate-password-reset.js  # migration
```

### Database Tools:
- **pgweb**: http://localhost:8081
- **PostgreSQL**: localhost:5432

---

## 📞 Credentials (Development)

```
Admin Account:
Email:    admin@nardarena.com
Password: admin123

Database:
Host:     localhost
Port:     5432
Database: nardarena
User:     postgres
Password: 123456
```

---

## 🚨 BEFORE EVERY TASK - CHECKLIST

```markdown
[ ] Did I read RULES.md? (MANDATORY!)
[ ] Did I read LESSONS-LEARNED.md?
[ ] Did I search for existing code?
[ ] Is there any duplicate component?
[ ] Is all UI text in English?
[ ] Am I following project structure?
[ ] Did I verify no working code is deleted?
[ ] Will I test after implementation?
[ ] Did I check SECURITY.md for security rules?
```

---

## ⚠️ نکات مهم

### ⚠️ قبل از شروع کار:
0. **حتماً حتماً** `RULES.md` رو بخون (الزامی!)
1. **حتماً** `LESSONS-LEARNED.md` رو بخون
2. **هرگز** .env رو commit نکن
3. **همیشه** از raw query برای authentication استفاده کن
4. **قبل از production** همه credentials رو عوض کن
5. **هیچ وقت** از فارسی در UI استفاده نکن
6. **هیچ وقت** کامپوننت duplicate نساز
7. **هیچ وقت** کد کاری که کار میکنه رو حذف نکن

### ✅ Best Practices:
- Logging دقیق برای debug
- Unit tests برای authentication
- Error handling مناسب
- Security standards رعایت شود

---

## 📝 به‌روزرسانی مستندات

وقتی چیز جدیدی اضافه میکنی:
1. مستند مربوطه رو آپدیت کن
2. این INDEX.md رو آپدیت کن
3. در CHANGELOG.md ثبت کن

---

## 🤝 مشارکت

قبل از ارسال Pull Request:
1. مستندات رو بخون
2. Tests رو بنویس
3. Code style رو رعایت کن
4. Security guidelines رو چک کن

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025
