# 🔒 Security Standards - NardAria v3

> استانداردهای امنیتی الزامی برای تمام بخش‌های پروژه

---

## ⚠️ قوانین طلایی (هرگز نقض نشود!)

### 1. Password Security
```typescript
// ✅ درست - همیشه از bcrypt استفاده کن
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// ❌ اشتباه - هرگز plain text ذخیره نکن
user.password = password; // NEVER!
```

### 2. Database Queries
```typescript
// ✅ درست - Parameterized queries
await sequelize.query('SELECT * FROM users WHERE email = $1', { bind: [email] });

// ❌ اشتباه - String concatenation (SQL Injection!)
await sequelize.query(`SELECT * FROM users WHERE email = '${email}'`); // NEVER!
```

### 3. Authentication
```typescript
// ✅ درست - از raw query استفاده کن (درس گرفته شده!)
const [users] = await User.sequelize!.query(
  'SELECT * FROM users WHERE email = $1',
  { bind: [email] }
);

// ❌ اشتباه - Sequelize ORM password رو load نمیکنه
const user = await User.findOne({ where: { email } });
// user.password = undefined ❌
```

### 4. Environment Variables
```bash
# ✅ درست
JWT_SECRET=random-secure-string-min-32-chars

# ❌ اشتباه
JWT_SECRET=123
JWT_SECRET=secret
```

---

## 🛡️ Authentication & Authorization

### JWT Token Security

```typescript
// Token Generation
const tokens = generateTokens({
  userId: String(user.id),
  email: user.email,
  role: user.role,
});

// Token Verification
const decoded = verifyToken(token);
if (!decoded) {
  throw new Error('Invalid token');
}
```

**Best Practices:**
- ✅ Access token: 15 دقیقه - 1 ساعت
- ✅ Refresh token: 7-30 روز
- ✅ Secret باید حداقل 32 کاراکتر random باشد
- ✅ در production از environment variable استفاده کن

### Password Requirements

```typescript
// Validation با Joi
password: Joi.string()
  .min(8)                    // حداقل 8 کاراکتر
  .pattern(/[A-Z]/)          // حداقل یک حرف بزرگ
  .pattern(/[a-z]/)          // حداقل یک حرف کوچک
  .pattern(/[0-9]/)          // حداقل یک عدد
  .pattern(/[^A-Za-z0-9]/)   // حداقل یک کاراکتر خاص
  .required()
```

**برای production توصیه می‌شود:**
- حداقل 8 کاراکتر (بهتر 12+)
- ترکیب حروف، اعداد، و کاراکترهای خاص
- چک کردن در لیست Common passwords
- Password strength indicator در frontend

---

## 🔐 Data Protection

### Password Hashing
```typescript
// bcrypt با salt=10 (استاندارد)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// مقایسه
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

### Sensitive Data
```typescript
// ✅ هرگز password رو return نکن
const userObject = user.toJSON();
delete userObject.password;

// ✅ از attributes exclude استفاده کن
User.findByPk(id, {
  attributes: { exclude: ['password', 'resetToken'] }
});
```

---

## 🚫 Input Validation

### همیشه validate کن

```typescript
// Backend validation با Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Frontend validation
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### Sanitization
```typescript
// از libraries استفاده کن
import validator from 'validator';

const clean = validator.escape(userInput);
const email = validator.normalizeEmail(inputEmail);
```

---

## 🌐 API Security

### Rate Limiting
```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: 'Too many requests',
});

app.use('/api/', limiter);
```

**توصیه‌ها:**
- Login endpoint: 5 تلاش در 15 دقیقه
- Register endpoint: 3 ثبت‌نام در ساعت
- Password reset: 3 درخواست در ساعت

### CORS Configuration
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### Headers Security
```typescript
import helmet from 'helmet';
app.use(helmet()); // XSS, CSP, etc.
```

---

## 🗄️ Database Security

### Connection Security
```typescript
// ✅ از environment variables استفاده کن
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'postgres',
    ssl: process.env.NODE_ENV === 'production',
  }
);
```

### SQL Injection Prevention
```typescript
// ✅ همیشه از parameterized queries استفاده کن
await sequelize.query('SELECT * FROM users WHERE id = $1', {
  bind: [userId],
});

// ❌ NEVER
await sequelize.query(`SELECT * FROM users WHERE id = ${userId}`);
```

---

## 🔍 Logging & Monitoring

### Security Events
```typescript
// Failed login attempts
notifyFailedLogin(email, 'Invalid password', req.ip);

// Successful logins (فقط در production)
if (process.env.NODE_ENV === 'production') {
  notifySuccessfulLogin(email, req.ip);
}

// Password resets
notifyPasswordReset(email);
```

### Sensitive Data
```typescript
// ❌ هرگز در log ذخیره نکن:
// - Passwords
// - Tokens
// - Credit card numbers
// - API keys

// ✅ فقط metadata
console.log({
  event: 'login_attempt',
  email: user.email,
  ip: req.ip,
  success: true,
  timestamp: new Date(),
});
```

---

## 🚀 Production Checklist

### قبل از deploy:

#### Environment
- [ ] همه secrets در environment variables
- [ ] NODE_ENV=production
- [ ] Debug logging غیرفعال
- [ ] Source maps غیرفعال

#### Database
- [ ] همه passwords hash شده
- [ ] Default credentials عوض شده
- [ ] Backup strategy
- [ ] SSL/TLS enabled

#### API
- [ ] Rate limiting فعال
- [ ] CORS به درستی تنظیم شده
- [ ] Helmet.js نصب شده
- [ ] Error messages عمومی (نه دقیق)

#### Authentication
- [ ] JWT secrets قوی و unique
- [ ] Token expiry مناسب
- [ ] Refresh token rotation
- [ ] Password requirements سخت‌گیرانه

#### Monitoring
- [ ] Telegram notifications فعال
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Security audit logs

---

## 🚨 Common Vulnerabilities

### 1. SQL Injection
**خطر:** بالا  
**راه حل:** Parameterized queries

### 2. XSS (Cross-Site Scripting)
**خطر:** بالا  
**راه حل:** Input validation, CSP headers, React (auto-escaping)

### 3. CSRF (Cross-Site Request Forgery)
**خطر:** متوسط  
**راه حل:** CSRF tokens, SameSite cookies

### 4. Brute Force Attacks
**خطر:** بالا  
**راه حل:** Rate limiting, Account lockout

### 5. Insecure Direct Object References
**خطر:** بالا  
**راه حل:** Authorization checks, UUID instead of sequential IDs

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Guide](https://expressjs.com/en/advanced/best-practice-security.html)

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025  
**وضعیت:** الزامی برای همه developers
