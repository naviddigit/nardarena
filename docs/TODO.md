# ✅ TODO List - NardAria v3

> لیست وظایف باقی‌مانده برای تکمیل پروژه

**آخرین به‌روزرسانی:** 22 نوامبر 2025

---

## 📊 Progress Overview

```
✅ Completed:   45%  ████████████░░░░░░░░░░░░░░
🚧 In Progress: 25%  ██████░░░░░░░░░░░░░░░░░░░░
⏳ Planned:     30%  ███████░░░░░░░░░░░░░░░░░░░
```

---

## ✅ Completed Features

### Authentication & Security:
- [x] User registration with validation
- [x] Login with JWT tokens (access + refresh)
- [x] Password hashing با bcrypt
- [x] Forgot password (6-digit token)
- [x] Password reset functionality
- [x] Telegram notifications for security events
- [x] Rate limiting on sensitive endpoints
- [x] Role-based access control (user/admin)
- [x] Protected routes با authentication middleware

### Backend:
- [x] Express.js server با TypeScript
- [x] PostgreSQL database با Sequelize
- [x] RESTful API endpoints (auth, users)
- [x] Input validation با Joi
- [x] Error handling middleware
- [x] CORS configuration
- [x] Environment variables setup

### Database:
- [x] Users table با indexes
- [x] Password reset fields (resetToken, resetTokenExpiry)
- [x] Migration scripts

### Frontend:
- [x] React 18 با TypeScript
- [x] Login page با validation
- [x] Register page
- [x] Dashboard (basic)
- [x] Profile page
- [x] Forgot password page
- [x] Reset password page
- [x] Auth context با hooks
- [x] Protected route wrapper
- [x] API client با axios

### Documentation:
- [x] Priority-based folder structure (01-04)
- [x] Central INDEX.md
- [x] LESSONS-LEARNED.md
- [x] SECURITY.md
- [x] API-DOCUMENTATION.md
- [x] DATABASE-SCHEMA.md
- [x] ARCHITECTURE.md
- [x] TELEGRAM-SETUP.md
- [x] ADMIN-PANEL-DESIGN.md
- [x] Root README.md

---

## 🚧 In Progress

### Admin Panel:
- [ ] **Phase 1: Layout & Navigation** (Next!)
  - [ ] AdminLayout component
  - [ ] Sidebar with menu items
  - [ ] Top navbar with user menu
  - [ ] Responsive design (mobile/tablet/desktop)
  - [ ] Protected admin route wrapper

---

## ⏳ Planned Features

### 🎛️ Admin Panel (High Priority)

#### Phase 2: Dashboard Page
- [ ] Stats cards (total users, online users, revenue, active games)
- [ ] Revenue chart (last 30 days) با Recharts
- [ ] User growth chart
- [ ] Recent activity feed (real-time updates)
- [ ] Quick action buttons
- [ ] API endpoints:
  - [ ] `GET /api/admin/stats`
  - [ ] `GET /api/admin/revenue?period=30d`
  - [ ] `GET /api/admin/activities?limit=10`

#### Phase 3: Users Management
- [ ] User list با pagination
- [ ] Search functionality (name, email)
- [ ] Filters (role, status)
- [ ] Sort (by name, date, etc.)
- [ ] User detail modal
- [ ] Edit user (name, role, status)
- [ ] Toggle active/inactive status
- [ ] User statistics (balance, games, etc.)
- [ ] API endpoints:
  - [ ] `GET /api/admin/users?page=1&limit=20&search=&role=&status=`
  - [ ] `GET /api/admin/users/:id`
  - [ ] `PUT /api/admin/users/:id`
  - [ ] `PATCH /api/admin/users/:id/toggle-status`

#### Phase 4: Transactions Management
- [ ] Transaction list با pagination
- [ ] Filters (type: deposit/withdrawal/bet/win, status, date range)
- [ ] Search by user
- [ ] Export to Excel/CSV
- [ ] Transaction detail modal
- [ ] API endpoints:
  - [ ] `GET /api/admin/transactions?page=1&type=&status=&date=`
  - [ ] `GET /api/admin/transactions/:id`

#### Phase 5: Withdrawals Management
- [ ] Withdrawal list با tabs (pending/approved/rejected)
- [ ] Approve withdrawal با confirmation modal
- [ ] Reject withdrawal با reason field
- [ ] Bank account display (masked)
- [ ] Tracking code input (برای تأیید)
- [ ] Telegram notification on approval/rejection
- [ ] API endpoints:
  - [ ] `GET /api/admin/withdrawals?status=pending`
  - [ ] `POST /api/admin/withdrawals/:id/approve`
  - [ ] `POST /api/admin/withdrawals/:id/reject`

#### Phase 6: Online Games Monitor
- [ ] Active games list
- [ ] Game detail (players, bet amount, status)
- [ ] Live updates (با WebSocket - future)
- [ ] Spectator mode (future)
- [ ] Game history
- [ ] API endpoints:
  - [ ] `GET /api/admin/games?status=active`
  - [ ] `GET /api/admin/games/:id`

#### Phase 7: Settings Page
- [ ] General settings (site name, maintenance mode, registration toggle)
- [ ] Game settings (min/max bet amount)
- [ ] Security settings (2FA, session timeout, max login attempts)
- [ ] Notification settings (Telegram config)
- [ ] API endpoints:
  - [ ] `GET /api/admin/settings`
  - [ ] `PUT /api/admin/settings`

---

### 💰 Financial System (Medium Priority)

#### Wallet & Balance:
- [ ] Add `balance` field to users table
- [ ] Add `walletAddress` field (if using crypto)
- [ ] Transaction creation functions
- [ ] Balance update functions (atomic)
- [ ] Transaction history endpoint

#### Deposits:
- [ ] Deposit request form
- [ ] Payment gateway integration (ZarinPal/Mellat/etc.)
- [ ] Deposit callback handler
- [ ] Auto credit to wallet on success
- [ ] Receipt generation

#### Withdrawals:
- [ ] Withdrawal request form (amount + bank account)
- [ ] Minimum withdrawal validation
- [ ] Available balance check
- [ ] Admin approval workflow
- [ ] Bank transfer integration (manual/auto)

#### Models:
- [ ] Transaction model:
  ```typescript
  {
    id, userId, type, amount, status,
    description, referenceId, createdAt
  }
  ```
- [ ] Withdrawal model:
  ```typescript
  {
    id, userId, amount, bankAccount,
    status, adminId, note, trackingCode,
    createdAt, processedAt
  }
  ```

---

### 🎮 Game System (High Priority)

#### Core Game Logic:
- [ ] Backgammon game engine
- [ ] Dice rolling (random + fair)
- [ ] Move validation
- [ ] Game state management
- [ ] Win condition detection
- [ ] Score calculation

#### Game Modes:
- [ ] **vs AI** - Single player با AI opponent
- [ ] **vs Player** - Multiplayer با real-time updates
- [ ] **Tournament** - Multi-player tournaments

#### Real-time Features:
- [ ] WebSocket setup (Socket.io)
- [ ] Game room creation/joining
- [ ] Live move broadcasting
- [ ] Turn timer
- [ ] Chat (در بازی)
- [ ] Spectator mode

#### Models:
- [ ] Game model:
  ```typescript
  {
    id, player1Id, player2Id, status,
    betAmount, winnerId, gameState,
    startedAt, finishedAt
  }
  ```
- [ ] GameMove model:
  ```typescript
  {
    id, gameId, playerId, moveData,
    diceRoll, timestamp
  }
  ```

#### API Endpoints:
- [ ] `POST /api/games/create` - ایجاد بازی جدید
- [ ] `POST /api/games/:id/join` - پیوستن به بازی
- [ ] `POST /api/games/:id/move` - انجام حرکت
- [ ] `GET /api/games/:id` - دریافت وضعیت بازی
- [ ] `GET /api/games/my-games` - بازی‌های من

#### Frontend:
- [ ] Game board component
- [ ] Dice component با animation
- [ ] Checker (مهره) component
- [ ] Move animation
- [ ] Game lobby (لیست بازی‌های در انتظار)
- [ ] Game history page

---

### 👤 User Profile Enhancements (Medium Priority)

- [ ] Avatar upload
- [ ] Profile picture
- [ ] Bio/description field
- [ ] Stats display:
  - [ ] Total games played
  - [ ] Win/Loss ratio
  - [ ] Total winnings
  - [ ] Current streak
  - [ ] Rank/level
- [ ] Game history (با pagination)
- [ ] Transaction history (با filters)
- [ ] Settings (email, password, notifications)
- [ ] 2FA setup (Google Authenticator)

---

### 🔔 Notification System (Low Priority)

#### In-app Notifications:
- [ ] Notification model (id, userId, type, message, read, createdAt)
- [ ] Notification bell icon با badge count
- [ ] Notification dropdown
- [ ] Mark as read functionality
- [ ] Notification preferences

#### Email Notifications:
- [ ] SMTP setup
- [ ] Welcome email (after registration)
- [ ] Password reset email (alternative to Telegram)
- [ ] Withdrawal approved email
- [ ] Game invite email

#### Push Notifications:
- [ ] Service worker setup
- [ ] Browser push notifications
- [ ] Mobile app notifications (future)

---

### 📱 PWA (Progressive Web App) (Low Priority)

- [ ] Service worker
- [ ] Offline support
- [ ] Install prompt
- [ ] App manifest
- [ ] Icons (multiple sizes)
- [ ] Splash screen

---

### 🧪 Testing (Medium Priority)

#### Backend Tests:
- [ ] Jest setup
- [ ] Unit tests (services, utils)
- [ ] Integration tests (API endpoints)
- [ ] Authentication tests
- [ ] Database tests (migrations)

#### Frontend Tests:
- [ ] Vitest setup
- [ ] Component tests (React Testing Library)
- [ ] Hook tests
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests

---

### 🚀 DevOps & Deployment (Low Priority)

#### CI/CD:
- [ ] GitHub Actions setup
- [ ] Automated tests on PR
- [ ] Build and deploy pipeline
- [ ] Environment management (dev/staging/prod)

#### Production Setup:
- [ ] Docker containers (backend, frontend, db)
- [ ] Docker Compose
- [ ] NGINX reverse proxy
- [ ] SSL/TLS certificates (Let's Encrypt)
- [ ] Domain setup
- [ ] Environment variables (secrets management)

#### Monitoring:
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic/DataDog)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Log aggregation (ELK stack)

#### Backup & Recovery:
- [ ] Automated database backups
- [ ] Backup restoration scripts
- [ ] Disaster recovery plan

---

### 📊 Analytics (Low Priority)

- [ ] Google Analytics integration
- [ ] Custom event tracking
- [ ] User behavior analytics
- [ ] Revenue analytics
- [ ] Conversion funnel
- [ ] A/B testing setup

---

### 🌐 Internationalization (i18n) (Low Priority)

- [ ] i18n setup (react-i18next)
- [ ] Language switcher
- [ ] Persian (fa-IR) translations
- [ ] English (en-US) translations
- [ ] RTL support
- [ ] Date/time localization

---

### ♿ Accessibility (Low Priority)

- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast compliance (WCAG)
- [ ] Focus indicators
- [ ] Alt text for images

---

### 🎨 UI/UX Improvements (Medium Priority)

#### Design System:
- [ ] TailwindCSS integration (در حال حاضر استفاده نمی‌شود)
- [ ] Component library (custom or Shadcn UI)
- [ ] Design tokens (colors, spacing, typography)
- [ ] Storybook setup

#### Animations:
- [ ] Framer Motion integration
- [ ] Page transitions
- [ ] Loading states
- [ ] Success/error animations
- [ ] Micro-interactions

#### Responsiveness:
- [ ] Mobile-first design
- [ ] Tablet optimization
- [ ] Desktop enhancements
- [ ] Touch gestures (for game)

---

### 🔐 Security Enhancements (High Priority)

- [ ] Two-factor authentication (2FA)
- [ ] Account recovery options
- [ ] Session management improvements
- [ ] IP-based rate limiting
- [ ] CSRF protection
- [ ] XSS prevention audit
- [ ] SQL injection audit (already done با parameterized queries)
- [ ] Security headers (helmet.js - partially done)
- [ ] Dependency vulnerability scanning
- [ ] Penetration testing

---

### 📚 Documentation Enhancements

- [ ] API documentation با Swagger/OpenAPI
- [ ] Component documentation (Storybook)
- [ ] Contributing guidelines
- [ ] Code of conduct
- [ ] Changelog (CHANGELOG.md)
- [ ] Video tutorials
- [ ] User manual
- [ ] Admin manual

---

### 🐛 Bug Fixes & Improvements

#### Known Issues:
- [ ] (None currently - will be added as discovered)

#### Technical Debt:
- [ ] Refactor authService to use consistent error handling
- [ ] Add TypeScript strict mode
- [ ] Improve error messages (more user-friendly)
- [ ] Add request/response logging
- [ ] Optimize database queries (add indexes)
- [ ] Add caching layer (Redis - future)

---

## 🎯 Priority Roadmap

### Milestone 1: Admin Panel Foundation (CURRENT)
**Target:** 1-2 weeks
- [x] Documentation organization ✅
- [x] Admin panel design ✅
- [ ] Admin layout & navigation
- [ ] Dashboard with basic stats
- [ ] User management (view, edit, toggle status)

### Milestone 2: Financial System
**Target:** 2-3 weeks
- [ ] Wallet & balance system
- [ ] Deposit functionality
- [ ] Withdrawal system با admin approval
- [ ] Transaction history

### Milestone 3: Game Core
**Target:** 3-4 weeks
- [ ] Backgammon engine
- [ ] vs AI mode
- [ ] Basic game UI
- [ ] Move validation

### Milestone 4: Multiplayer
**Target:** 2-3 weeks
- [ ] WebSocket setup
- [ ] vs Player mode
- [ ] Real-time updates
- [ ] Game lobby

### Milestone 5: Polish & Production
**Target:** 2-3 weeks
- [ ] Testing (unit + E2E)
- [ ] Security audit
- [ ] Performance optimization
- [ ] Deployment setup
- [ ] Production launch 🚀

---

## 💡 Feature Ideas (Backlog)

- [ ] Leaderboard (رتبه‌بندی کاربران)
- [ ] Achievements & badges
- [ ] Daily rewards
- [ ] Referral system (دعوت دوستان)
- [ ] VIP membership
- [ ] Chat system (global + private)
- [ ] Game replay (تماشای دوباره بازی)
- [ ] Tutorial mode (آموزش بازی)
- [ ] Bot difficulty levels (easy/medium/hard)
- [ ] Custom game rules
- [ ] Time-limited events
- [ ] Mobile app (React Native)

---

## 📞 Notes

### Important Reminders:
- ⚠️ همیشه از raw SQL queries برای authentication استفاده کن (not ORM)
- ✅ همه passwords باید با bcrypt hash شوند (salt=10)
- ✅ همیشه از parameterized queries استفاده کن
- ✅ هر تغییر در database نیاز به migration script دارد
- ✅ همه endpoints حساس باید rate limiting داشته باشند

### Development Guidelines:
- کد تمیز و readable بنویس
- از TypeScript types استفاده کن (not `any`)
- همه functions باید documented باشند
- Error handling جامع
- Tests برای features جدید
- مستندات به‌روز نگه دار

---

**Last Updated:** 22 نوامبر 2025  
**Version:** 1.0.0  
**Status:** Active Development 🚧
