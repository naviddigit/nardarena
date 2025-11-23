# 📡 API Documentation - NardAria v3

> مستندات کامل API برای سیستم احراز هویت

**Base URL:** `http://localhost:3002/api`  
**Authentication:** Bearer Token در header

---

## 🔐 Authentication Endpoints

### 1. Register User
ثبت‌نام کاربر جدید

**Endpoint:** `POST /auth/register`  
**Public:** بله  
**Rate Limit:** 3 requests/hour

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "user"
}
```

**Validation:**
- `name`: string, required, 2-50 characters
- `email`: valid email format, unique
- `password`: string, min 6 characters
- `role`: enum ['user', 'admin'], default 'user'

#### Success Response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-11-22T10:00:00.000Z"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Error Responses:
```json
// 400 - Validation Error
{
  "error": "Validation error: \"email\" must be a valid email"
}

// 409 - Email exists
{
  "error": "Email already registered"
}

// 429 - Rate limit
{
  "error": "Too many registration attempts"
}
```

---

### 2. Login
ورود کاربر با email و password

**Endpoint:** `POST /auth/login`  
**Public:** بله  
**Rate Limit:** 5 requests/15min

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation:**
- `email`: valid email, required
- `password`: string, required

#### Success Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Error Responses:
```json
// 401 - Invalid credentials
{
  "error": "Invalid email or password"
}

// 401 - Account deactivated
{
  "error": "Account is deactivated"
}

// 429 - Too many attempts
{
  "error": "Too many login attempts, please try again later"
}
```

**Security:**
- ✅ bcrypt password comparison
- ✅ Telegram notification برای failed attempts
- ✅ Rate limiting
- ✅ Account lockout (اگر فعال باشد)

---

### 3. Refresh Token
تمدید access token با refresh token

**Endpoint:** `POST /auth/refresh`  
**Public:** بله

#### Request Body:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Success Response (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Error Responses:
```json
// 401 - Invalid token
{
  "error": "Invalid refresh token"
}

// 401 - Expired token
{
  "error": "Refresh token expired"
}
```

---

### 4. Forgot Password
درخواست ریست پسورد (ارسال token به تلگرام)

**Endpoint:** `POST /auth/forgot-password`  
**Public:** بله  
**Rate Limit:** 3 requests/hour

#### Request Body:
```json
{
  "email": "john@example.com"
}
```

#### Success Response (200):
```json
{
  "message": "If an account exists, a password reset link has been sent"
}
```

**توجه:** همیشه همین پیام برمی‌گردد (حتی اگر email وجود نداشته باشد)

**Process:**
1. چک می‌کند email در دیتابیس وجود دارد
2. Token 6 رقمی با crypto.randomInt تولید می‌شود
3. Token با SHA256 hash می‌شود
4. Hash در database ذخیره می‌شود (با expiry 1 ساعت)
5. Token به تلگرام ارسال می‌شود (plain text)
6. Link به frontend: `http://localhost:5173/reset-password?token=123456&email=john@example.com`

---

### 5. Reset Password
تنظیم password جدید با token

**Endpoint:** `POST /auth/reset-password`  
**Public:** بله

#### Request Body:
```json
{
  "email": "john@example.com",
  "token": "123456",
  "newPassword": "NewSecurePass123!"
}
```

**Validation:**
- `email`: valid email
- `token`: exactly 6 digits, numeric only
- `newPassword`: string, min 6 characters

#### Success Response (200):
```json
{
  "message": "Password has been reset successfully"
}
```

#### Error Responses:
```json
// 400 - Validation error
{
  "error": "Validation error: \"token\" length must be 6 characters long"
}

// 401 - Invalid/expired token
{
  "error": "Invalid or expired reset token"
}
```

**Security:**
- Token در database به صورت hashed ذخیره می‌شود
- Token expiry: 1 ساعت
- Password جدید با bcrypt hash می‌شود
- Token بعد از استفاده پاک می‌شود

---

### 6. Get Profile
دریافت اطلاعات کاربر فعلی

**Endpoint:** `GET /auth/profile`  
**Authentication:** Required  
**Header:** `Authorization: Bearer {accessToken}`

#### Success Response (200):
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-11-22T10:00:00.000Z",
  "updatedAt": "2025-11-22T12:00:00.000Z"
}
```

#### Error Responses:
```json
// 401 - No token
{
  "error": "Access token required"
}

// 401 - Invalid token
{
  "error": "Invalid token"
}

// 404 - User not found
{
  "error": "User not found"
}
```

---

## 👥 User Management Endpoints

### 7. Get All Users (Admin)
لیست همه کاربران

**Endpoint:** `GET /users`  
**Authentication:** Required (Admin only)  
**Header:** `Authorization: Bearer {accessToken}`

#### Query Parameters:
```
?page=1&limit=20&search=john&role=user&isActive=true
```

- `page`: شماره صفحه (default: 1)
- `limit`: تعداد در هر صفحه (default: 20, max: 100)
- `search`: جستجو در name/email
- `role`: فیلتر بر اساس role
- `isActive`: فیلتر بر اساس وضعیت

#### Success Response (200):
```json
{
  "users": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-11-22T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

### 8. Get User by ID
دریافت اطلاعات یک کاربر

**Endpoint:** `GET /users/:id`  
**Authentication:** Required  
**Header:** `Authorization: Bearer {accessToken}`

#### Success Response (200):
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-11-22T10:00:00.000Z",
  "updatedAt": "2025-11-22T12:00:00.000Z"
}
```

**Authorization:**
- کاربر عادی: فقط پروفایل خودش
- Admin: هر کاربری

---

### 9. Update User
به‌روزرسانی اطلاعات کاربر

**Endpoint:** `PUT /users/:id`  
**Authentication:** Required  
**Header:** `Authorization: Bearer {accessToken}`

#### Request Body:
```json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

#### Success Response (200):
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "123",
    "name": "John Updated",
    "email": "newemail@example.com",
    "role": "user",
    "isActive": true
  }
}
```

**Authorization:**
- کاربر عادی: فقط خودش
- Admin: هر کاربری

---

### 10. Delete User
حذف کاربر

**Endpoint:** `DELETE /users/:id`  
**Authentication:** Required (Admin only)  
**Header:** `Authorization: Bearer {accessToken}`

#### Success Response (200):
```json
{
  "message": "User deleted successfully"
}
```

**توجه:** در production بهتر است soft delete استفاده شود

---

## 🔑 Authentication Headers

### Access Token
همه endpoint های protected نیاز به این header دارند:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example با axios:
```typescript
const response = await axios.get('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

---

## ❌ Error Handling

### Error Response Format:
```json
{
  "error": "Error message in English or Persian"
}
```

### Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials/token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## 🚀 Rate Limiting

### Current Limits:
- **Registration:** 3 requests/hour per IP
- **Login:** 5 requests/15min per IP
- **Forgot Password:** 3 requests/hour per IP
- **General API:** 100 requests/15min per IP

### Rate Limit Response:
```json
{
  "error": "Too many requests, please try again later"
}
```

**Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1700000000
```

---

## 🧪 Testing

### با curl:
```bash
# Register
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Profile (با token)
curl http://localhost:3002/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### با Postman:
1. Import این collection
2. تنظیم environment variable: `baseUrl = http://localhost:3002/api`
3. بعد از login، token را در Authorization tab ذخیره کن

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025  
**API Version:** 1.0.0  
**Backend Port:** 3002
