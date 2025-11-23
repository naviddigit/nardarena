# 🐘 راهنمای نصب PostgreSQL

## ویندوز (Windows)

### روش 1: نصب مستقیم (پیشنهادی)
1. دانلود نصب‌کننده از: https://www.postgresql.org/download/windows/
2. اجرای installer
3. انتخاب components:
   - PostgreSQL Server ✅
   - pgAdmin 4 ✅ (رابط گرافیکی)
   - Command Line Tools ✅
4. تنظیم password برای user `postgres` (مثلاً: `postgres`)
5. Port: `5432` (پیش‌فرض)
6. اتمام نصب

### روش 2: با Chocolatey
```powershell
choco install postgresql
```

### روش 3: با Scoop
```powershell
scoop install postgresql
```

---

## بعد از نصب

### 1. تست اتصال
```powershell
# باز کردن psql
psql -U postgres

# باید به shell PostgreSQL وارد بشی
# postgres=#
```

### 2. ساخت Database
```sql
-- در psql:
CREATE DATABASE nardarena;

-- چک کردن:
\l

-- خروج:
\q
```

### 3. تنظیم .env
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nardarena
DB_USER=postgres
DB_PASSWORD=postgres  # یا هر چیزی که تو نصب انتخاب کردی
```

---

## pgAdmin 4 (رابط گرافیکی)

### راه‌اندازی:
1. باز کردن pgAdmin 4
2. Create Server:
   - Name: `Local`
   - Host: `localhost`
   - Port: `5432`
   - Username: `postgres`
   - Password: `<your-password>`

### کارهایی که میتونی انجام بدی:
- ✅ مشاهده جداول
- ✅ اجرای SQL queries
- ✅ Backup/Restore
- ✅ مشاهده data
- ✅ ایجاد/حذف database

---

## عیب‌یابی (Troubleshooting)

### مشکل 1: `psql` پیدا نمیشه
**راه‌حل:**
```powershell
# اضافه کردن به PATH (مثال):
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# یا دائمی:
# System Properties → Environment Variables → Path → New:
# C:\Program Files\PostgreSQL\16\bin
```

### مشکل 2: نمیتونه به database وصل بشه
**راه‌حل:**
```bash
# چک کن PostgreSQL service داره اجرا میشه:
# Services → PostgreSQL 16 → Start
```

### مشکل 3: Password رو فراموش کردم
**راه‌حل:**
```powershell
# ویرایش pg_hba.conf:
# C:\Program Files\PostgreSQL\16\data\pg_hba.conf
# تغییر md5 به trust برای local
# Restart service
# تغییر password با ALTER USER
```

---

## دستورات مفید

### اتصال:
```bash
psql -U postgres                    # اتصال به postgres user
psql -U postgres -d nardarena       # اتصال به database خاص
```

### Database:
```sql
CREATE DATABASE dbname;             -- ساخت
DROP DATABASE dbname;               -- حذف
\c dbname;                          -- اتصال
\l                                  -- لیست همه
```

### Table:
```sql
\dt                                 -- لیست جداول
\d tablename                        -- ساختار جدول
\d+ tablename                       -- ساختار کامل
```

### Query:
```sql
SELECT * FROM users;                -- همه user ها
SELECT * FROM users LIMIT 10;       -- 10 تا اول
SELECT COUNT(*) FROM users;         -- تعداد
```

---

## Backup & Restore

### Backup:
```bash
# کل database
pg_dump -U postgres nardarena > backup.sql

# فقط schema
pg_dump -U postgres --schema-only nardarena > schema.sql

# فقط data
pg_dump -U postgres --data-only nardarena > data.sql
```

### Restore:
```bash
# ساخت database جدید
psql -U postgres -c "CREATE DATABASE nardarena_new;"

# Restore
psql -U postgres nardarena_new < backup.sql
```

---

## مقایسه با MongoDB

| ویژگی | PostgreSQL | MongoDB |
|-------|------------|---------|
| **Type** | SQL (Relational) | NoSQL (Document) |
| **Schema** | Fixed schema | Flexible schema |
| **Transactions** | ACID ✅ | Limited |
| **Performance** | عالی برای complex queries | عالی برای simple queries |
| **Scale** | Vertical + Horizontal | Horizontal |
| **Learning Curve** | متوسط | ساده |
| **Production Ready** | ✅✅✅ | ✅✅ |

---

## چرا PostgreSQL برای Nard Arena؟

✅ **Data Integrity:** ACID transactions برای transactions مالی  
✅ **Complex Queries:** برای آمار و گزارش‌های پیچیده  
✅ **Performance:** JSONB برای flexible data + speed  
✅ **Scalability:** میتونه تا میلیون‌ها user رو handle کنه  
✅ **Industry Standard:** استفاده می‌شه توسط: Instagram, Uber, Netflix, Reddit

---

**اگه مشکلی داشتی، تو terminal بگو تا کمک کنم! 🚀**
