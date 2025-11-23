# راه‌اندازی پروژه - NardAria v3

## Scripts موجود

### 1. `start-dev.bat` ⭐ (توصیه میشه)
- PostgreSQL رو چک میکنه
- Process های قدیمی رو kill میکنه
- Backend و Frontend رو شروع میکنه

```bash
# دوبار کلیک کنید
start-dev.bat
```

### 2. `clean-start.bat` 🔄
- **تمام** node process ها رو kill میکنه
- Backend و Frontend رو از صفر شروع میکنه
- وقتی port conflict داری استفاده کن

```bash
# دوبار کلیک کنید
clean-start.bat
```

### 3. `kill-all-processes.bat` 🛑
- فقط تمام node process ها رو kill میکنه
- هیچ چیزی شروع نمیکنه
- وقتی میخوای همه چیز رو ببندی استفاده کن

```bash
# دوبار کلیک کنید
kill-all-processes.bat
```

## مشکلات رایج و راه حل

### ❌ Error: "Port 3002 is already in use"

**راه حل:**
```bash
# اول این رو اجرا کن
kill-all-processes.bat

# بعد 2 ثانیه صبر کن و این رو اجرا کن
start-dev.bat
```

یا:
```bash
# یه مرحله‌ای
clean-start.bat
```

### ❌ Error: "asyncHandler is not defined"

**راه حل:** این مشکل fix شده. Backend رو restart کن:
```bash
kill-all-processes.bat
start-dev.bat
```

### ❌ Backend شروع نمیشه

**چک کن:**
1. PostgreSQL داره run میکنه؟
   ```bash
   # در CMD اجرا کن
   sc query postgresql-x64-18
   ```

2. فایل `.env` در `backgammon-auth-backend` وجود داره؟
   
3. Dependencies نصب شدن؟
   ```bash
   cd backgammon-auth-backend
   npm install
   ```

### ⏳ "باید چند دقیقه صبر کنم تا بتونم مجدد اجرا کنم"

**دلیل:** Windows به node process ها زمان میده تا gracefully بسته بشن.

**راه حل سریع:**
```bash
# این process ها رو force kill میکنه (نیازی به صبر نیست)
kill-all-processes.bat
```

## Workflow توصیه شده

### شروع کار روزانه:
```bash
1. دوبار کلیک: start-dev.bat
2. منتظر بمون تا backend و frontend بالا بیان
3. Browser: http://localhost:5173
```

### پایان کار:
```bash
1. CMD window ها رو ببند (X)
2. یا: kill-all-processes.bat
```

### وقتی مشکل داری:
```bash
1. clean-start.bat  # همه چیز رو از صفر شروع میکنه
```

## Ports

- **Backend:** http://localhost:3002
- **Frontend:** http://localhost:5173
- **PostgreSQL:** localhost:5432

## Admin Login

```
Email: admin@nardarena.com
Password: admin123
```

## نکات مهم

- ✅ همیشه `start-dev.bat` استفاده کن (خودش cleanup میکنه)
- ✅ اگه port error داد، `kill-all-processes.bat` رو اجرا کن
- ✅ CMD window های backend/frontend رو **نبند** (باید باز بمونن)
- ⚠️ اگه PostgreSQL error داد، چک کن service داره run میکنه
