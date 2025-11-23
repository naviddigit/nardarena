# 🔒 CRITICAL CONFIGURATIONS - NEVER DELETE

> **⚠️ WARNING**: این فایل لیست تنظیمات حیاتی پروژه است  
> **🔴 RED LINE**: حذف هر کدوم = خرابی سیستم + هزینه زیاد

---

## 📁 Configuration Files - LOCKED 🔒

### 1. backgammon-error-service/.env
**Purpose**: Error tracking + Telegram notifications  
**Status**: ✅ WORKING - روزها طول کشید setup کنیم!

```bash
# Server
PORT=3001
NODE_ENV=development

# Frontend (CORS)
FRONTEND_URL=http://localhost:5173

# Security
ERROR_API_KEY=your-secret-key-123        # ⚠️ Frontend needs this!

# Telegram Bot - WORKING! ✅
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM
TELEGRAM_CHAT_ID=-1003429966717

# 💰 Cost if deleted: 2-3 hours to recreate + هزاران تومان
# 🔒 NEVER delete these lines!
```

---

### 2. backgammon-auth-backend/.env
**Purpose**: Authentication + Password Reset  
**Status**: ✅ WORKING

```bash
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=backgammon_auth

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Server
PORT=3002

# Telegram Notifications - WORKING! ✅
TELEGRAM_NOTIFICATIONS=true
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM
TELEGRAM_CHAT_ID=-1003429966717

# 💰 Cost if deleted: 1-2 hours + debugging time
# 🔒 NEVER delete Telegram settings!
```

---

### 3. backgammon-frontend/.env
**Purpose**: Frontend configuration  
**Status**: ✅ UPDATED - Error API added!

```bash
# Backend API
VITE_API_URL=http://localhost:3002/api

# WebSocket (Future)
VITE_WS_URL=ws://localhost:3003

# Mock API
VITE_ENABLE_MOCK=false

# Error Service API - برای تست تلگرام ⚠️ CRITICAL!
VITE_ERROR_API_URL=http://localhost:3001
VITE_ERROR_API_KEY=your-secret-key-123

# 💰 Cost if deleted: 30 minutes + test failures
# 🔒 NEVER delete ERROR_API settings!
```

---

## 🔑 Critical Settings Explained

### Telegram Configuration
```bash
# این توکن از @BotFather گرفته شده
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM

# این Chat ID کانال "🎮 Nard Arena Alerts"
TELEGRAM_CHAT_ID=-1003429966717

# ✅ Tested: Works perfectly!
# 📍 Test Location: /admin/old → Test Panel → Test Telegram
# ⚠️ Both backend and error-service need these!
```

### Error Service API
```bash
# Frontend needs these to send test messages
VITE_ERROR_API_URL=http://localhost:3001      # Service address
VITE_ERROR_API_KEY=your-secret-key-123        # Auth key

# Must match error-service/.env:
ERROR_API_KEY=your-secret-key-123

# ⚠️ If missing: "Environment variables not configured"
```

---

## 🚀 Required Services

### Check all services running:
```powershell
netstat -ano | findstr ":3001 :3002 :5173 :5432"
```

**Expected Output:**
```
TCP    0.0.0.0:3001    LISTENING    12345    # Error Service
TCP    0.0.0.0:3002    LISTENING    12346    # Auth Backend  
TCP    0.0.0.0:5173    LISTENING    12347    # Frontend
TCP    0.0.0.0:5432    LISTENING    12348    # PostgreSQL
```

### Start commands:
```powershell
# Terminal 1: Error Service (MUST be running for tests!)
cd backgammon-error-service
npm run dev

# Terminal 2: Auth Backend
cd backgammon-auth-backend
npm run dev

# Terminal 3: Frontend
cd backgammon-frontend  
npm run dev
```

---

## 🧪 Test Procedures

### Test Telegram (Recommended after changes)
1. Open: http://localhost:5173/admin/old
2. Navigate to: **Test Panel**
3. Click: **Test Telegram**
4. Expected: ✅ Telegram test sent! Check your channel/group.

### Verify Configuration
```powershell
# Check error service .env
Get-Content backgammon-error-service/.env | Select-String "TELEGRAM"

# Check frontend .env
Get-Content backgammon-frontend/.env | Select-String "ERROR_API"

# Check backend .env
Get-Content backgammon-auth-backend/.env | Select-String "TELEGRAM"
```

---

## ❌ NEVER DO THIS:

```bash
# ❌ Deleting .env files
rm backgammon-error-service/.env
rm backgammon-frontend/.env

# ❌ Commenting out working configs
# TELEGRAM_BOT_TOKEN=...

# ❌ Changing to placeholder
TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE

# ❌ Removing error API from frontend
# VITE_ERROR_API_URL=...

# ❌ Stopping error service
# Ctrl+C in error-service terminal (if tests needed)
```

---

## ✅ SAFE OPERATIONS:

```bash
# ✅ Reading .env files
Get-Content .env

# ✅ Checking if service is running
netstat -ano | findstr ":3001"

# ✅ Testing Telegram from UI
# Go to /admin/old → Test Panel

# ✅ Adding NEW environment variables
# (Don't remove existing ones!)

# ✅ Creating .env.backup
Copy-Item .env .env.backup
```

---

## 🆘 Recovery Guide

### If Telegram Tests Fail:

#### Error: "Environment variables not configured"
**Cause**: Frontend .env missing ERROR_API settings  
**Fix**:
```bash
# Add to backgammon-frontend/.env:
VITE_ERROR_API_URL=http://localhost:3001
VITE_ERROR_API_KEY=your-secret-key-123
```

#### Error: "Network error" or "Failed to fetch"
**Cause**: Error service not running  
**Fix**:
```powershell
cd backgammon-error-service
npm run dev
```

#### Error: "Telegram failed to send"
**Cause**: Telegram tokens missing in error-service  
**Fix**:
```bash
# Check backgammon-error-service/.env:
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM
TELEGRAM_CHAT_ID=-1003429966717
```

---

## 📊 Configuration Status

| Service | Config File | Status | Last Verified |
|---------|-------------|--------|---------------|
| Error Service | backgammon-error-service/.env | ✅ Working | 2025-11-22 |
| Auth Backend | backgammon-auth-backend/.env | ✅ Working | 2025-11-22 |
| Frontend | backgammon-frontend/.env | ✅ Updated | 2025-11-22 |
| PostgreSQL | Default config | ✅ Working | - |

---

## 💰 Cost Analysis

| Action | Time Cost | Money Cost | User Impact |
|--------|-----------|------------|-------------|
| Delete Telegram tokens | 1-2 hours | High 💰💰 | 😡 Angry |
| Delete error service config | 2-3 hours | Very High 💰💰💰 | 😡😡 Very Angry |
| Forget to start error service | 5 minutes | Low | 😐 Confused |
| Add wrong API key | 10 minutes | Low | 😐 Confused |

---

## 🔐 Security Notes

- `ERROR_API_KEY`: Must match between frontend and error-service
- `JWT_SECRET`: Change in production!
- `TELEGRAM_BOT_TOKEN`: Already public in channel, but keep safe
- Database passwords: Change in production!

---

## 📝 Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-11-22 | Added ERROR_API to frontend | Telegram test was broken |
| 2025-11-22 | Documented all critical configs | Prevent accidental deletion |
| 2025-11-22 | Created RULE #0 in RULES.md | Lock working features |
| 2025-11-22 | Setup global error handler | Auto-send all errors to Telegram |
| 2025-11-22 | Added ErrorBoundary | Catch React errors + send to Telegram |

---

## 🚨 Error Reporting to Telegram

### Automatic Error Reporting ✅
**Status**: All errors now automatically sent to Telegram!

**What's covered:**
- ✅ Uncaught JavaScript errors
- ✅ Unhandled Promise rejections  
- ✅ React component errors (via ErrorBoundary)
- ✅ Manual error reports

**User Context Included:**
- Username/Email (or "Guest / Unknown User")
- User ID and role
- Page URL
- Timestamp
- Error stack trace
- Component stack (for React errors)

**Files:**
- `globalErrorHandler.ts` - Main error handler
- `ErrorBoundary.tsx` - React error boundary
- `main.tsx` - Initialization

**Test:**
1. Cause any error in app
2. Check Telegram channel: "🎮 Nard Arena Alerts"
3. Should see: Error message + user info ✅

---

**Last Updated**: November 22, 2025  
**Status**: 🔒 LOCKED - این تنظیمات کار میکنن - هیچوقت پاک نکن!  
**Next Review**: Only if something breaks

