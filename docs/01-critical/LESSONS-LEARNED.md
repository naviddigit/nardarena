# Lessons Learned - NardAria v3

## 🔴 مشکل بحرانی: Sequelize Password Field Load نمیشد

**تاریخ:** 22 نوامبر 2025  
**وقت صرف شده:** ~3 ساعت  
**هزینه:** بالا (token usage زیاد)

### مشکل:
```typescript
// ❌ این کد کار نمیکرد
const userInstance = await User.findOne({ where: { email } });
console.log(userInstance.password); // undefined ❌
```

### علت:
- Sequelize ORM به دلیل تنظیمات Model یا TypeScript typing فیلد `password` رو load نمیکرد
- `userInstance.password` همیشه `undefined` بود
- `comparePassword()` نمیتونست password رو چک کنه
- خطای "Account is deactivated" گمراه کننده بود چون `!user.isActive` روی undefined true برمیگشت

### راه حل نهایی:
```typescript
// ✅ استفاده از raw query
const [users] = await User.sequelize!.query(
  'SELECT * FROM users WHERE email = $1',
  { bind: [email] }
);
const user: any = users[0];
const isPasswordCorrect = await bcrypt.compare(password, user.password);
```

### نکات مهم:
1. **همیشه از raw query برای authentication استفاده کن** - ORM قابل اعتماد نیست برای password
2. **Logging دقیق** - باید ببینیم چه data ای از database میاد
3. **خطاهای گمراه کننده** - undefined در شرط ها رفتار غیرمنتظره دارند
4. **Unit Test الزامی** - قبل از production باید تست شود

### قوانین جدید برای آینده:

#### ✅ Authentication باید:
- از raw query استفاده کند (نه ORM)
- Password رو با bcrypt hash کند (salt=10)
- Logging کامل داشته باشد
- Unit test داشته باشد

#### ✅ Security Standards:
- Password باید با bcrypt hash شود
- Token-based authentication (JWT)
- Rate limiting روی login endpoint
- HTTPS در production
- SQL injection prevention (parameterized queries)

#### ✅ Error Handling:
- خطاهای دقیق در development mode
- خطاهای عمومی در production ("Invalid credentials")
- Logging تمام failed login attempts

---

## 📝 چک لیست قبل از Production

### Authentication:
- [ ] Password hashing works (bcrypt)
- [ ] Login با raw query کار میکنه
- [ ] Token generation درست است
- [ ] Unit tests نوشته شده
- [ ] Rate limiting فعال است
- [ ] CORS به درستی تنظیم شده

### Database:
- [ ] همه password ها hash شده‌اند
- [ ] Indexes روی email و username
- [ ] Connection pooling تنظیم شده

### Security:
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Helmet.js نصب شده
- [ ] Environment variables امن هستند

---

## 🔧 ابزارهای Debug مفید

### تست Password Hash:
```bash
node backgammon-auth-backend/scripts/test-password.js
```

### Hash کردن همه Password ها:
```bash
node backgammon-auth-backend/scripts/hash-all-passwords.js
```

### مشاهده Users:
```bash
node backgammon-auth-backend/scripts/view-users.js
```

---

## 💡 یادآوری برای Copilot

**وقتی کار با Authentication میکنی:**
1. از raw query استفاده کن، نه ORM
2. همیشه password existence رو چک کن
3. Logging دقیق بذار
4. خطاها رو واضح برگردون در development
5. تست کن قبل از ادامه

**این مشکل دیگه نباید تکرار بشه!**
