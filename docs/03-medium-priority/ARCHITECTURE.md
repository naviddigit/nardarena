# 🏗️ System Architecture - NardAria v3

> معماری کلی سیستم و ارتباط بین بخش‌ها

---

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER DEVICES                          │
│              (Web Browser - Chrome/Firefox/Safari)           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   FRONTEND (Port 5173)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 + TypeScript + Vite                        │  │
│  │  ├── Pages (Login, Register, Dashboard, Profile)    │  │
│  │  ├── Components (Reusable UI)                        │  │
│  │  ├── Hooks (Auth, API calls)                         │  │
│  │  ├── Context (Global state)                          │  │
│  │  └── Utils (Helpers, validation)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (axios)
                         │ Authorization: Bearer {token}
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Port 3002)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js + TypeScript                             │  │
│  │  ├── Routes (auth, users, admin)                     │  │
│  │  ├── Middleware (auth, validation, error)            │  │
│  │  ├── Services (business logic)                       │  │
│  │  ├── Models (Sequelize ORM)                          │  │
│  │  └── Utils (JWT, bcrypt, telegram)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────┬──────────────────────┬─────────────────────────┘
            │                      │
            │ SQL Queries          │ HTTP POST
            │ (Parameterized)      │ (Notifications)
            │                      │
┌───────────▼──────────┐  ┌───────▼────────────────────────┐
│  PostgreSQL 18.1     │  │  Telegram Bot API              │
│  (Port 5432)         │  │  (External Service)            │
│  ├── users           │  │  ├── Failed login alerts       │
│  ├── games (future)  │  │  ├── Password reset tokens     │
│  ├── transactions    │  │  └── Security notifications    │
│  └── withdrawals     │  └────────────────────────────────┘
└──────────────────────┘
     │
     │ Web UI
     │
┌────▼─────────────────┐
│  pgweb (Port 8081)   │
│  Database Viewer     │
└──────────────────────┘
```

---

## 🔄 Request Flow

### 1. User Login Flow:
```
1. User enters email/password in LoginPage.tsx
                ↓
2. handleSubmit() validates input
                ↓
3. axios.post('/api/auth/login', {email, password})
                ↓
4. Backend: POST /auth/login route
                ↓
5. Middleware: validateRequest(loginSchema)
                ↓
6. authService.login(email, password)
   ├── Raw SQL: SELECT * FROM users WHERE email = $1
   ├── bcrypt.compare(password, hashedPassword)
   ├── Check isActive status
   └── Generate JWT tokens
                ↓
7. Return: {user, tokens}
                ↓
8. Frontend: Save tokens in localStorage
                ↓
9. Redirect to Dashboard
```

### 2. Forgot Password Flow:
```
1. User enters email in ForgotPasswordPage.tsx
                ↓
2. POST /api/auth/forgot-password
                ↓
3. passwordResetService.requestPasswordReset()
   ├── Find user by email
   ├── Generate 6-digit token (crypto.randomInt)
   ├── Hash token (SHA256)
   ├── Save hash + expiry (1 hour) in DB
   └── Send plain token via Telegram
                ↓
4. User receives token in Telegram
                ↓
5. User enters token in ResetPasswordPage.tsx
                ↓
6. POST /api/auth/reset-password {email, token, newPassword}
                ↓
7. passwordResetService.resetPassword()
   ├── Hash submitted token
   ├── Find user with matching hash + valid expiry
   ├── Hash new password (bcrypt)
   ├── Update user.password
   └── Clear resetToken & resetTokenExpiry
                ↓
8. User can login with new password
```

### 3. Protected Route Access:
```
1. User clicks "Profile" in Dashboard
                ↓
2. Frontend checks if token exists
                ↓
3. axios.get('/api/auth/profile', {
     headers: {Authorization: `Bearer ${token}`}
   })
                ↓
4. Backend: authenticateToken middleware
   ├── Extract token from header
   ├── verifyToken(token) with JWT_SECRET
   ├── Decode userId
   └── Attach userId to req.user
                ↓
5. authController.getProfile(req, res)
   ├── Find user by req.user.userId
   └── Return user data (excluding password)
                ↓
6. Frontend displays profile
```

---

## 📦 Backend Structure

```
backgammon-auth-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Sequelize configuration
│   ├── models/
│   │   └── User.ts              # User model (Sequelize)
│   ├── routes/
│   │   ├── auth.ts              # Auth endpoints
│   │   └── users.ts             # User management endpoints
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   ├── validation.ts        # Joi validation schemas
│   │   └── errorHandler.ts     # Global error handling
│   ├── services/
│   │   ├── authService.ts       # Login, register logic
│   │   └── passwordResetService.ts  # Forgot password logic
│   ├── utils/
│   │   ├── jwt.ts               # Token generation/verification
│   │   └── telegram.ts          # Telegram notifications
│   └── index.ts                 # Express app entry
├── scripts/
│   └── migrate-password-reset.js  # Database migrations
├── .env                         # Environment variables
└── package.json
```

### Key Files:

#### `src/index.ts`
- Express app initialization
- Middleware setup (CORS, helmet, rate limiting)
- Route mounting
- Database connection
- Server startup

#### `src/services/authService.ts`
- **CRITICAL:** Uses raw SQL queries (not ORM)
- Login: Email/password verification
- Register: Password hashing, user creation
- Telegram notifications for security events

#### `src/middleware/auth.ts`
- `authenticateToken()`: JWT verification
- `authorizeRoles(['admin'])`: Role-based access

#### `src/utils/telegram.ts`
- Centralized notification system
- Graceful degradation if bot not configured
- Helper functions for different event types

---

## 🎨 Frontend Structure

```
backgammon-frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx        # Login form
│   │   ├── RegisterPage.tsx     # Registration form
│   │   ├── DashboardPage.tsx    # Main dashboard
│   │   ├── ProfilePage.tsx      # User profile
│   │   ├── ForgotPasswordPage.tsx   # Request reset
│   │   └── ResetPasswordPage.tsx    # Set new password
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── ProtectedRoute.tsx   # Auth guard
│   │   └── common/              # Reusable components
│   ├── hooks/
│   │   ├── useAuth.tsx          # Auth context + hooks
│   │   └── useApi.ts            # API call helpers
│   ├── utils/
│   │   ├── api.ts               # Axios instance
│   │   └── validation.ts        # Form validation
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── App.tsx                  # Root component + routing
│   └── main.tsx                 # Vite entry
├── public/
├── index.html
└── package.json
```

### Key Files:

#### `src/hooks/useAuth.tsx`
- AuthContext provider
- `login()`, `logout()`, `register()` functions
- Token storage in localStorage
- Auto-redirect for protected routes

#### `src/utils/api.ts`
- Axios instance with base URL
- Request interceptor: Attach Authorization header
- Response interceptor: Handle 401 errors (logout)

#### `src/components/ProtectedRoute.tsx`
- Check if user is authenticated
- Redirect to /login if not
- Used in React Router

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────┐
│  1. Input Validation                             │
│     ├── Frontend: Basic checks (email format)   │
│     └── Backend: Joi schemas (strict)           │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  2. Rate Limiting                                │
│     ├── Login: 5 attempts / 15 min              │
│     ├── Register: 3 attempts / hour             │
│     └── Forgot Password: 3 / hour               │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  3. Authentication                               │
│     ├── JWT tokens (access + refresh)           │
│     ├── bcrypt password hashing (salt=10)       │
│     └── Middleware: authenticateToken()         │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  4. Authorization                                │
│     ├── Role-based access (user/admin)          │
│     └── Middleware: authorizeRoles()            │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  5. Database Security                            │
│     ├── Parameterized queries (SQL injection)   │
│     ├── Never expose sensitive fields           │
│     └── Connection via environment variables    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  6. Monitoring                                   │
│     ├── Telegram notifications (failed logins)  │
│     ├── Error logging                           │
│     └── Security event tracking                 │
└──────────────────────────────────────────────────┘
```

---

## 🔌 External Integrations

### Telegram Bot API:
```typescript
// Send notification
await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  chat_id: CHAT_ID,
  text: '🚨 Failed login attempt...',
  parse_mode: 'Markdown',
});
```

**Use Cases:**
- Failed login attempts
- Password reset tokens
- Security alerts
- System errors

**Configuration:**
- `TELEGRAM_BOT_TOKEN` - از @BotFather
- `TELEGRAM_CHAT_ID` - از @userinfobot
- `TELEGRAM_NOTIFICATIONS` - true/false

---

## 📊 Data Flow

### Authentication State Management:

```typescript
// Frontend (React Context)
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

// Token Storage (localStorage)
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

// Token Payload
{
  "userId": "123",
  "email": "user@example.com",
  "role": "user",
  "iat": 1700000000,
  "exp": 1700003600
}
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                   CLOUDFLARE / CDN                       │
│              (Static frontend assets)                    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│               NGINX (Reverse Proxy)                      │
│  ├── /api → Backend (Port 3002)                         │
│  └── / → Frontend (Static files)                        │
└─────────────┬──────────────────────┬────────────────────┘
              │                      │
┌─────────────▼──────────┐  ┌───────▼───────────────────┐
│  Backend Instances     │  │  Frontend (Static)        │
│  (PM2 / Docker)        │  │  (Nginx / Vercel)         │
│  ├── Instance 1        │  └───────────────────────────┘
│  ├── Instance 2        │
│  └── Load Balancer     │
└─────────────┬──────────┘
              │
┌─────────────▼──────────┐
│  PostgreSQL            │
│  (Managed DB)          │
│  ├── Master            │
│  └── Read Replica      │
└────────────────────────┘
```

---

## 🛠️ Development Workflow

```
1. Local Development:
   ├── Backend: npm run dev (nodemon + ts-node)
   ├── Frontend: npm run dev (Vite HMR)
   └── Database: PostgreSQL service

2. Code Changes:
   ├── Edit TypeScript files
   ├── Hot reload (automatic)
   └── Test in browser

3. Testing:
   ├── Manual: Postman / curl
   ├── Unit tests: Jest (future)
   └── E2E tests: Playwright (future)

4. Commit:
   ├── Git add/commit
   ├── Push to repository
   └── CI/CD pipeline (future)

5. Production Deploy:
   ├── Build frontend: npm run build
   ├── Compile backend: tsc
   ├── Deploy to server
   └── Run migrations
```

---

## 🔮 Future Enhancements

### WebSocket (Real-time):
```
Backend (Socket.io) ←→ Frontend (Socket.io client)
├── Live game updates
├── Online user status
├── Chat messages
└── Notifications
```

### Redis (Caching):
```
Backend → Redis → PostgreSQL
├── Session storage
├── Rate limiting counters
├── Online users cache
└── Game state cache
```

### Microservices:
```
API Gateway
├── Auth Service (Current backend)
├── Game Service (Game logic)
├── Payment Service (Transactions)
└── Notification Service (Telegram, Email)
```

---

**آخرین به‌روزرسانی:** 22 نوامبر 2025  
**Architecture Version:** 1.0.0  
**Stack:** PERN (PostgreSQL + Express + React + Node.js)
