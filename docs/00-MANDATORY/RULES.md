# 🚨 CRITICAL PROJECT RULES - READ BEFORE ANY WORK

> **⚠️ MANDATORY**: این قوانین قبل از هر کاری باید خوانده شوند  
> **🔴 RED LINE**: نقض این قوانین = توقف کامل پروژه

---

## 🔥 RULE #0: WORKING FEATURES ARE SACRED - DON'T TOUCH! 🔥

**این قانون از همه مهمتره - قانون صفر!**

### 🔒 LOCKED FEATURES - NEVER MODIFY:

#### 1. **Error Service + Telegram Integration** 🔒
```bash
# Service Location:
backgammon-error-service/

# Config Files - LOCKED:
backgammon-error-service/.env          # ⚠️ NEVER delete/modify!
backgammon-frontend/.env               # ⚠️ Added VITE_ERROR_API_URL

# Required Settings:
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM
TELEGRAM_CHAT_ID=-1003429966717
ERROR_API_KEY=your-secret-key-123
VITE_ERROR_API_URL=http://localhost:3001
VITE_ERROR_API_KEY=your-secret-key-123

# Status: ✅ WORKING - روزها طول کشید بسازیم!
# Running on: PORT 3001
# Test: Available in /admin/old → Test Panel
```

**💰 IF YOU BREAK THIS:**
- Cost: هزاران تومان هدر میره
- Time: 2-3 ساعت دوباره setup
- User: 😡😡😡 VERY ANGRY!

#### 2. **Services That MUST Stay Running:**
```bash
✅ Port 3001: Error Service (Telegram)
✅ Port 3002: Auth Backend
✅ Port 5173: Frontend
✅ Port 5432: PostgreSQL

# Before ANY work, check all running:
netstat -ano | findstr ":3001 :3002 :5173 :5432"
```

#### 3. **Test Features - LOCKED:** 🔒
```typescript
// These are tested and working - DON'T touch code!
/admin/old route:
  - TestPanel component           // Telegram test ✅
  - APITestingPanel              // API tests ✅
  - Component Showcase           // All components ✅
  - Service health checks        // Backend check ✅
```

### ⚠️ CHECKLIST BEFORE ANY CHANGE:

```markdown
[ ] Is this feature currently working?
[ ] Did I test it recently?
[ ] Am I about to modify .env files?
[ ] Am I about to change service configuration?
[ ] Did I check if service is running?
[ ] Is there a LOCKED 🔒 sign on this feature?
[ ] Did user ask me to change this?

IF ANY ANSWER IS "YES" → STOP! Ask user first!
```

### 📜 HOW TO CHECK WHAT'S WORKING:

```bash
# Check services:
netstat -ano | findstr ":3001 :3002 :5173"

# Check .env files:
Get-Content backgammon-error-service/.env | Select-String "TELEGRAM"
Get-Content backgammon-frontend/.env | Select-String "ERROR_API"

# Test Telegram:
# Go to: http://localhost:5173/admin/old
# Click: Test Panel
# Click: Test Telegram
# Should see: ✅ Telegram test sent!
```

---

## 🌍 RULE #1: INTERNATIONAL PROJECT - ENGLISH ONLY IN UI

### ✅ ALLOWED:
```typescript
// ✅ UI Text - English only
<Button>Submit</Button>
<Input placeholder="Enter your email" />
<h1>Welcome to Nard Arena</h1>
<p>Please login to continue</p>

// ✅ Console logs - Persian for developers
console.log('کاربر با موفقیت وارد شد');

// ✅ Comments - Persian for better understanding
// این تابع برای احراز هویت استفاده می‌شود
function authenticate() { }

// ✅ Documentation - Persian for team
// در این فایل کامپوننت های UI تعریف شده‌اند
```

### ❌ FORBIDDEN:
```typescript
// ❌ NEVER use Persian in UI
<Button>ارسال</Button>
<Input placeholder="ایمیل خود را وارد کنید" />
<h1>به نرد آرنا خوش آمدید</h1>
<AlertDialog title="خطا" message="امکان اتصال به سرور وجود ندارد" />

// ❌ NEVER use Persian in error messages shown to users
setError('کد تأیید باید 6 رقم عددی باشد');
toast.error('⏱️ زمان اتصال به سرور به پایان رسید');
alert('🔴 امکان اتصال به سرور وجود ندارد');
```

### 📋 Checklist before creating any UI component:
- [ ] All buttons text in English?
- [ ] All input placeholders in English?
- [ ] All labels in English?
- [ ] All error messages in English?
- [ ] All success messages in English?
- [ ] All tooltips in English?
- [ ] All dialog titles in English?
- [ ] All alert messages in English?

**🎯 Goal**: بازیکنان از سراسر دنیا (آمریکا، اروپا، آسیا) باید بتوانند بازی کنند

---

## 🏗️ RULE #2: COMPONENT-BASED ARCHITECTURE - NO HARDCODING

**Write once, import everywhere. NEVER hardcode UI elements.**

### Core Principle:
- **Shared components**: Button, Input, Card, PageTransition, Toast, etc.
- **Import, don't rewrite**: Use existing components everywhere
- **Theme support**: All components MUST support theme switching (light/dark)
- **Consistent styling**: All UI through components ensures consistency

### Location:
```
backgammon-frontend/src/components/shared/
  ├── atoms/
  │   ├── Button.tsx          (All buttons use this)
  │   ├── Input.tsx           (All inputs use this)
  │   └── Icon.tsx            (All icons use this)
  ├── molecules/
  │   ├── Toast.tsx           (All notifications)
  │   ├── Card.tsx            (All cards)
  │   └── Modal.tsx           (All modals)
  └── organisms/
      ├── ThemeToggle.tsx     (Theme switching)
      └── Navigation.tsx      (Navigation menus)
```

### ❌ WRONG - Hardcoded UI:
```typescript
// ❌ Hardcoded button with inline styles
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click me
</button>

// ❌ Hardcoded card - no theme support!
<div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Title</h3>
  <p className="text-gray-600 dark:text-gray-300">Content</p>
</div>

// ❌ Hardcoded input - duplicate styling
<input 
  type="text"
  className="w-full px-4 py-2 border rounded-lg focus:ring-2..."
  placeholder="Enter text"
/>
```

### ✅ CORRECT - Component-based:
```typescript
// ✅ Use Button component
import { Button } from '@/components/shared/atoms/Button';
<Button variant="primary">Click me</Button>

// ✅ Use Card component - theme works automatically!
import { Card } from '@/components/shared/molecules/Card';
<Card title="Title" description="Content" />

// ✅ Use Input component
import { Input } from '@/components/shared/atoms/Input';
<Input type="text" placeholder="Enter text" />
```

### 🎯 Why This Matters:
**Admin Dashboard Example - Current Problem:**
```typescript
// ❌ PROBLEM: Hardcoded elements break theme
<div className="bg-white dark:bg-gray-800">  // Theme not working!
  <button className="bg-blue-500...">      // Button not consistent!
  <input className="border..." />           // Input style different!
</div>

// ✅ SOLUTION: Use components
import { Card, Button, Input } from '@/components/shared';
<Card>                                       // Theme works! ✅
  <Button variant="primary">Action</Button>  // Consistent! ✅
  <Input placeholder="Search" />             // Unified style! ✅
</Card>
```

### 📋 Before Writing ANY UI:
```markdown
[ ] Does this component already exist in shared/?
[ ] Am I importing the existing component?
[ ] If creating new component, is it truly unique?
[ ] Does my component support theme (light/dark)?
[ ] Am I using ThemeContext for styling?
[ ] Will this component be reusable?
```

### 🚨 Admin Dashboard Fix Required:
User reported: "تم و طراحی داشبورد ادمین بهم ریخته و تمش هم ازکار افتاده"
- **Problem**: Hardcoded elements, theme not applied
- **Solution**: Replace hardcoded divs with Card, Button, Input components
- **Rule**: Import from shared, don't write inline styles

---

## 🔴 RULE #3: NO COMPONENT DUPLICATION - SINGLE SOURCE OF TRUTH

### ⚠️ BEFORE creating ANY component:

```bash
# STEP 1: Search if it already exists
grep_search "export.*ComponentName"
grep_search "export.*function ComponentName"
grep_search "const ComponentName"

# STEP 2: File search
file_search "**/*ComponentName*.tsx"
file_search "**/*ComponentName*.ts"

# STEP 3: Count results
# If count = 0 → OK, create it
# If count >= 1 → STOP! Use existing one or ask to refactor

# STEP 4: After creating, verify ONLY ONE exists
grep_search "export.*NewComponent"
# Result MUST be exactly 1 match
```

### ❌ FORBIDDEN Examples:
```
❌ Two Input components
   - src/components/Input.tsx
   - src/shared/components/atoms/Input.tsx

❌ Two Button components  
   - src/components/Button.tsx
   - src/ui/Button.tsx

❌ Two Toast systems
   - src/components/molecules/Toast.tsx
   - src/features/notifications/Toast.tsx

❌ Hardcoded styles instead of using component
   <div className="rounded-lg p-4 bg-white shadow">
   // ❌ Should use <Card> component instead!
```

### ✅ CORRECT Approach:
```typescript
// ONLY ONE source for each component
src/shared/components/
  ├── atoms/
  │   ├── Input.tsx          ← SINGLE Input component
  │   ├── Button.tsx         ← SINGLE Button component
  │   └── Icon.tsx           ← SINGLE Icon component
  ├── molecules/
  │   ├── Toast.tsx          ← SINGLE Toast component
  │   └── Card.tsx           ← SINGLE Card component
  └── organisms/
      └── Navigation.tsx     ← SINGLE Navigation

// Everyone imports from here
import { Input } from '@shared/components/atoms/Input';
import { Button } from '@shared/components/atoms/Button';
import { Toast } from '@shared/components/molecules/Toast';
```

### 📋 Anti-Duplication Checklist:
- [ ] Did I search for existing component?
- [ ] Did I check file_search results?
- [ ] Did I check grep_search results?
- [ ] Is there EXACTLY ONE source for this?
- [ ] Am I reusing existing component instead of creating new?
- [ ] After creating, did I verify no duplicates exist?

---

## 🚫 RULE #3: NEVER DELETE ANYTHING WITHOUT EXPLICIT PERMISSION ❗❗❗❗❗

**THIS IS THE MOST CRITICAL RULE. BREAKING THIS = PROJECT DISASTER.**

### 🔴 ABSOLUTE RED LINE - NEVER TOUCH THESE:

#### 1. **.env FILES - WORKING CONFIGURATIONS** 🔒
```bash
# ❌ NEVER DELETE OR MODIFY THESE FILES:
backgammon-auth-backend/.env          # Backend config
backgammon-error-service/.env         # Telegram + Error tracking
backgammon-frontend/.env              # Frontend config

# ❌ NEVER DELETE THESE SETTINGS:
TELEGRAM_BOT_TOKEN=...                # روزها طول کشید بگیریم!
TELEGRAM_CHAT_ID=...                  # کار میکنه - هیچوقت پاک نکن!
ERROR_API_KEY=...                     # برای تست تلگرام لازمه!
VITE_ERROR_API_URL=...                # Frontend به این نیاز داره!
VITE_ERROR_API_KEY=...                # برای احراز هویت!
```

**💰 COST IF DELETED**: 
- Time wasted: 2-3 hours to reconfigure
- Money wasted: هزاران تومان برای debug و fix
- User frustration: MAXIMUM! 😡

#### 2. **WORKING FEATURES - DON'T BREAK THEM** 🔒
```typescript
// ❌ NEVER touch these if they're working:
- Telegram test in TestPanel         // کار میکنه!
- Error tracking system               // کار میکنه!
- Component showcase in AdminPanel    // کار میکنه!
- Theme system                        // کار میکنه!
- Login/Register flow                 // کار میکنه!
```

### ⚠️ WHEN YOU CAN DELETE:
```typescript
// ❌ Working configurations (DAYS of work!)
.env file tokens/keys              ← CATASTROPHIC if deleted!
Telegram tokens that work           ← User achievement!
Database connection strings         ← Critical!
API keys and secrets                ← Critical!

// ❌ Rewriting entire working component
// Old file: working perfectly ✅
// New file: completely rewritten ❌ NEVER DO THIS!

// ❌ Changing design/theme of working page
<div className="old-working-design"> ✅
→ <div className="new-design-you-created"> ❌ FORBIDDEN!

// ❌ Removing working features from admin panel
- Component Showcase section ← NEVER REMOVE!
- Service Test Panel ← NEVER REMOVE!
- Telegram Alert Section ← NEVER REMOVE!
- Debug Panel ← NEVER REMOVE!

// ❌ Deleting entire pages that work
- rm AdminPanel.tsx  ← DANGEROUS!
- rm Dashboard.tsx   ← DANGEROUS!
```

### ⚠️ WHEN YOU CAN DELETE:
**ONLY in these specific cases:**
1. ✅ User explicitly says: "delete X" or "remove Y"
2. ✅ Duplicate code: TWO identical components (keep better one)
3. ✅ Actual bug: Code causes errors AND no other fix possible
4. ✅ Dead code: Proven unused (verify with grep_search first)

### 🛑 BEFORE DELETING ANYTHING:
```markdown
[ ] Did user explicitly request deletion?
[ ] Is this code/config actually working?
[ ] How long did it take to create? (hours? days?)
[ ] Is there a duplicate I should keep instead?
[ ] Can I fix without deleting?
[ ] Did I document WHY I'm deleting this?
```

### 🎯 CRITICAL RULE: ONLY FIX WHAT'S BROKEN!

```typescript
// ❌ WRONG APPROACH:
"The page has Persian text"
→ Delete entire file and rewrite from scratch ❌ COSTLY!

// ✅ CORRECT APPROACH:
"The page has Persian text"
→ Read the file carefully
→ Find ONLY the Persian text strings
→ Replace ONLY those strings with English
→ Keep ALL design, ALL styling, ALL functionality
→ Change NOTHING else!
```

### 📋 Before Making ANY Change:

```markdown
[ ] Is the code currently working?
[ ] What EXACTLY is broken?
[ ] Can I fix ONLY the broken part?
[ ] Am I about to rewrite something that works?
[ ] Am I changing design/theme unnecessarily?
[ ] Did user ask me to change this specific thing?
```

### 💰 COST AWARENESS:

**هر خط کد = هزینه**  
**بازنویسی کد کاری = هزاران تومان ضرر**

```typescript
// ❌ EXPENSIVE (1000+ lines changed):
Delete ForgotPasswordPage.tsx
Create new ForgotPasswordPage.tsx with 200 lines
→ Cost: هزاران تومان ❌

// ✅ CHEAP (5 lines changed):
Replace 5 Persian strings with English
→ Cost: minimal ✅
```

### ✅ CORRECT Approach Examples:

```typescript
// ✅ Example 1: Fix Persian text ONLY
// Before:
<h1>فراموشی رمز عبور</h1>
<p>ایمیل خود را وارد کنید</p>

// After (ONLY text changed):
<h1>Forgot Password</h1>
<p>Enter your email address</p>

// Keep: ALL styling, ALL structure, ALL functionality


// ✅ Example 2: Add feature, don't remove old
// Old code stays:
<AdminPanel>
  <ComponentShowcase />      // ✅ KEEP
  <ServiceTestPanel />       // ✅ KEEP
  <TelegramAlerts />         // ✅ KEEP
  
  {/* New feature added */}
  <NewFeature />             // ✅ ADD
</AdminPanel>


// ✅ Example 3: Fix bug, don't rewrite
// Bug: No error handling
// Fix: Add try-catch ONLY
try {
  // existing code stays unchanged ✅
  await existingFunction();
} catch (error) {
  // only error handling added ✅
  handleError(error);
}
```

### 🚨 EMERGENCY STOP - Ask User First:

**STOP and ASK USER if:**
1. ❓ You're about to rewrite entire file
2. ❓ You're about to change design/theme/styling
3. ❓ You're about to remove working feature
4. ❓ You're about to restructure working code
5. ❓ The fix requires more than 10 line changes

**When STOPPED:**
```markdown
"I found [problem]. I can:
Option A: Change only [specific 5 lines]
Option B: Rewrite [entire component]

Option A is recommended. Which do you prefer?"
```

---

## 📁 RULE #4: FOLLOW PROJECT STRUCTURE

### ✅ CORRECT Structure:
```
backgammon-frontend/src/
├── app/                      # App initialization
│   ├── providers/           # Context providers
│   └── router/              # Routing config
├── features/                # Feature modules
│   ├── auth/               # ✅ Auth feature
│   │   ├── pages/          # LoginPage, RegisterPage
│   │   ├── components/     # Auth-specific components
│   │   ├── hooks/          # useAuth
│   │   └── services/       # authService
│   ├── admin/              # ✅ Admin feature
│   │   ├── pages/          # AdminPanel
│   │   ├── components/     # Admin-specific
│   │   └── hooks/          # useAdminData
│   └── player/             # ✅ Player feature
│       ├── pages/          # Dashboard
│       └── components/     # Player-specific
└── shared/                 # ✅ SHARED resources
    ├── components/         # Reusable UI components
    │   ├── atoms/         # Input, Button, Icon
    │   ├── molecules/     # Toast, Card
    │   └── organisms/     # ThemeToggle, Navigation
    ├── hooks/             # Shared hooks
    ├── utils/             # Shared utilities
    └── types/             # Shared TypeScript types
```

### ❌ WRONG Places:
```
❌ src/components/auth/LoginPage.tsx
   → Should be: src/features/auth/pages/LoginPage.tsx

❌ src/ui/molecules/Input.tsx  
   → Should be: src/shared/components/atoms/Input.tsx

❌ src/pages/admin/UserList.tsx
   → Should be: src/features/admin/pages/UserList.tsx

❌ src/features/auth/components/atoms/Button.tsx
   → Should be: src/shared/components/atoms/Button.tsx
   → (Button is shared, not auth-specific!)
```

---

## 🔍 RULE #5: SEARCH BEFORE YOU CODE

### Mandatory Search Process:
```typescript
// BEFORE writing any code, ALWAYS:

// 1. Search for existing implementation
semantic_search("feature or component name");

// 2. Search for similar code
grep_search("keyword|alternative|synonym", isRegexp: true);

// 3. Search for existing files
file_search("**/*ComponentName*");

// 4. Read related files to understand context
read_file("path/to/related/file.tsx");

// 5. Check for duplicates one more time
grep_search("export.*NewFeature");
```

### Example Workflow:
```typescript
// ❌ WRONG: Immediate coding
"I'll create a new password reset page"
→ create_file("PasswordReset.tsx") ← WRONG!

// ✅ CORRECT: Search first
"Let me check if password reset exists"
→ grep_search("password.*reset|forgot.*password", isRegexp: true)
→ file_search("**/*Password*.tsx")
→ read_file("existing files to understand")
→ Then decide: reuse or create new
```

---

## 🧪 RULE #6: TEST BEFORE CLAIMING SUCCESS

### ❌ FORBIDDEN:
```typescript
// ❌ Creating feature without testing
create_file("NewFeature.tsx");
// "Done! Feature created." ← WRONG!

// ❌ Making changes without verification
replace_string_in_file(...);
// "Fixed!" ← WRONG! Did you test it?
```

### ✅ REQUIRED:
```typescript
// ✅ Create → Test → Verify → Report
create_file("NewFeature.tsx");
→ run_in_terminal("npm run dev");
→ Check http://localhost:5173/new-feature
→ Test all functionality
→ Check console for errors
→ get_errors() to verify no issues
→ Then report: "Feature created and tested successfully"
```

### 📋 Testing Checklist:
- [ ] Did I test in browser?
- [ ] Did I check console for errors?
- [ ] Did I check network tab for API calls?
- [ ] Did I test error scenarios?
- [ ] Did I verify all buttons work?
- [ ] Did I test dark mode?
- [ ] Did I check mobile responsiveness?

---

## 🔐 RULE #7: SECURITY STANDARDS (see SECURITY.md)

### Critical Security Rules:
- ✅ ALWAYS hash passwords with bcrypt (salt=10)
- ✅ ALWAYS use parameterized queries (prevent SQL injection)
- ✅ NEVER store passwords in plain text
- ✅ NEVER expose sensitive data in API responses
- ✅ ALWAYS validate user input
- ✅ ALWAYS use HTTPS in production
- ✅ ALWAYS implement rate limiting

### Example:
```typescript
// ❌ NEVER
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ ALWAYS
const query = 'SELECT * FROM users WHERE email = $1';
sequelize.query(query, { bind: [email] });
```

---

## 📝 RULE #8: COMMUNICATION LANGUAGE

### When to use Persian (فارسی):
- ✅ Talking with team members
- ✅ Console.log messages for debugging
- ✅ Code comments for explanation
- ✅ Documentation in `/docs`
- ✅ Git commit messages
- ✅ Slack/Discord team chat

### When to use English:
- ✅ ALL UI text (buttons, labels, placeholders, messages)
- ✅ ALL user-facing error messages
- ✅ Variable names and function names
- ✅ API endpoint names
- ✅ Database column names
- ✅ File names and folder names

---

## ⚡ GOLDEN RULE: MINIMUM CHANGE PRINCIPLE

### The Law:
```
تغییر کمتر = هزینه کمتر = خطای کمتر
Minimum change = Minimum cost = Minimum errors
```

### Process for EVERY task:

```markdown
1. READ the existing code completely
2. UNDERSTAND what's working
3. IDENTIFY what's broken (be specific!)
4. FIND the MINIMUM change needed
5. CHANGE only what's broken
6. VERIFY nothing else changed
7. TEST the specific fix

❌ NEVER: Delete and rewrite
✅ ALWAYS: Find and fix specific lines
```

### Cost Examples:

| Action | Lines Changed | Cost |
|--------|---------------|------|
| Fix 1 Persian string | 1 line | ✅ Cheap |
| Fix 5 Persian strings | 5 lines | ✅ Acceptable |
| Refactor function | 20 lines | ⚠️ Ask first |
| Rewrite component | 100+ lines | ❌ Expensive! |
| Delete & recreate page | 200+ lines | 💰💰💰 Very Expensive! |

---

## 🚨 BEFORE EVERY TASK - CHECKLIST

```markdown
[ ] Did I read RULES.md? (MANDATORY!)
[ ] Did I read LESSONS-LEARNED.md?
[ ] Did I search for existing code?
[ ] What EXACTLY is broken? (be specific)
[ ] What's the MINIMUM change needed?
[ ] Am I changing design/theme unnecessarily?
[ ] Is there any duplicate component?
[ ] Is all UI text in English?
[ ] Am I following project structure?
[ ] Did I verify no working code is deleted?
[ ] Will I test ONLY the specific fix?
[ ] Did I check SECURITY.md for security rules?
```

---

## ⛔ EMERGENCY STOP CONDITIONS

**STOP IMMEDIATELY** if:
1. ❌ You're about to use Persian text in UI
2. ❌ You found duplicate components
3. ❌ You're about to delete working code
4. ❌ You're about to rewrite entire file
5. ❌ You're about to change design/theme
6. ❌ You didn't search for existing implementation
7. ❌ You're storing password in plain text
8. ❌ You're using string concatenation in SQL query
9. ❌ You're making changes to more than 10 lines

**When STOPPED:**
1. 🛑 Stop coding immediately
2. 📢 Report the issue and explain options
3. 🔍 Suggest MINIMUM change approach
4. ✅ Get user confirmation before continuing

---

## 📋 COMPLETED & FINAL FEATURES

### ✅ These pages/components are COMPLETE and FINAL
**NEVER rewrite these - they are tested and working perfectly:**

#### Auth Pages:
- ✅ **LoginPage.tsx** - Complete with 3 modes (login/register/forgot), PageTransition effects, theme support
  - Path: `backgammon-frontend/src/features/auth/pages/LoginPage.tsx`
  - Features: Login, Register, Forgot Password (inline with mode switch)
  - **DO NOT create separate forgot password pages!**
  - **DO NOT change the PageTransition effects!**
  - **DO NOT modify the theme/design!**

- ✅ **RegisterPage.tsx** - Complete registration flow
  - Path: `backgammon-frontend/src/features/auth/pages/RegisterPage.tsx`

- ✅ **ProfileSetupPage.tsx** - Post-registration profile setup
  - Path: `backgammon-frontend/src/features/auth/pages/ProfileSetupPage.tsx`

#### Admin Panel (Old - Component Showcase):
- ✅ **AdminPanel.tsx** (route: `/admin/old`)
  - Path: `backgammon-frontend/src/features/admin/pages/AdminPanel.tsx`
  - Features: Component Showcase, API Testing, Service Test Panel, Telegram Alerts
  - **NEVER remove these sections!**

- ✅ **DashboardPage.tsx** (route: `/admin/dashboard`)  
  - Path: `backgammon-frontend/src/features/admin/pages/DashboardPage.tsx`
  - Status: Design complete, English text updated ✅
  - Features: Stats cards, charts placeholders, recent activities, quick actions

#### Shared Components (SINGLE SOURCE):
- ✅ **Input Components** (`@shared/components/atoms/Input`)
  - TextInput, PasswordInput
  - **NEVER create duplicate input components!**

- ✅ **Button Component** (`@shared/components/atoms/Button`)
  - **NEVER create duplicate button components!**

- ✅ **PageTransition** (`@shared/components/animations/PageTransition`)
  - Used in LoginPage for mode switching
  - **NEVER modify or recreate!**

- ✅ **ThemeToggle** (`@shared/components/organisms/ThemeToggle`)
- ✅ **DebugPanel** (`@shared/components/organisms/DebugPanel`)

#### Backend:
- ✅ **Authentication System** - Login, Register, JWT working
- ✅ **Password Reset System** - Tokens, expiry, database fields all working
- ✅ **Telegram Integration** - Code ready (needs user to add tokens)

### ⚠️ When to Use Completed Features:

```markdown
Before creating ANYTHING new, check this list!

Example scenarios:

❌ "User wants forgot password page"
→ WRONG: Create ForgotPasswordPage.tsx
→ RIGHT: It already exists in LoginPage with mode='forgot'!

❌ "Need to add input field"
→ WRONG: Create new input component
→ RIGHT: Use TextInput from @shared/components/atoms/Input

❌ "Want to test Telegram"
→ WRONG: Build new test panel
→ RIGHT: Use AdminPanel (route /admin/old) - it has test buttons!
```

### 📖 How to Check if Feature Exists:

```bash
# Step 1: Search in completed list above
# Step 2: Search in codebase
grep_search "feature name"
file_search "**/*FeatureName*"

# Step 3: Read the file
read_file "path/to/file"

# Step 4: If exists → USE IT, don't recreate!
```

---

## 🏆 ACHIEVEMENTS & WORKING FEATURES (روزها کار کردیم برای اینها)

### 🎯 Critical Working Configurations:
**These took DAYS to set up - NEVER delete without explicit permission!**

#### 1. Telegram Bot Integration ✅
**Status**: WORKING (tested, sent messages successfully)
```env
TELEGRAM_BOT_TOKEN=8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM
TELEGRAM_CHAT_ID=-1003429966717
```
- **Achievement**: Bot created, tokens obtained, channel set up
- **Tested**: Successfully sent test messages
- **Evidence**: User showed test message output with timestamp
- **⚠️ NEVER replace these tokens with placeholders!**
- **Cost if deleted**: Hours of work to recreate bot, channel setup

#### 2. Database Configuration ✅
```env
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
```
- **Achievement**: Database schema designed, migrations created
- **Tables**: users, password_resets, game_sessions, transactions
- **⚠️ Never delete connection strings!**

#### 3. JWT Authentication ✅
```env
JWT_SECRET=...
JWT_EXPIRES_IN=24h
```
- **Achievement**: Secure token generation, refresh token logic
- **Tested**: Login, register, token validation all working
- **⚠️ Changing JWT_SECRET invalidates all sessions!**

### 🎨 UI/UX Achievements:

#### 1. LoginPage with 3 Modes ✅
- **Achievement**: Single page handles login/register/forgot password
- **Features**: Smooth PageTransition effects, theme support, RTL
- **Time invested**: Days of design and testing
- **⚠️ NEVER create separate forgot password pages!**

#### 2. Theme System ✅
- **Achievement**: Light/dark mode throughout app
- **Components**: ThemeContext, ThemeToggle, all components support themes
- **⚠️ All new components MUST support themes!**

#### 3. Admin Panel (Old) ✅
- **Achievement**: Component showcase, API testing, service panels
- **Features**: Telegram test buttons, debug panel, service status
- **⚠️ NEVER remove these testing tools!**

### 🔧 Backend Achievements:

#### 1. Password Reset Flow ✅
- **Achievement**: Full email → token → reset → verify flow
- **Database**: resetToken, resetTokenExpiry fields
- **Migration**: Successfully ran, data structure ready
- **Telegram**: Integration code complete, sends formatted messages
- **⚠️ All pieces work together - don't break the chain!**

#### 2. Error Service ✅
- **Achievement**: Centralized error handling and logging
- **Port**: 3001 (separate service)
- **⚠️ Don't delete error service - it catches critical issues!**

### 📋 Achievements Checklist:
**Before deleting ANYTHING, check:**
```markdown
[ ] Is this part of an achievement listed above?
[ ] Did this take hours/days to create?
[ ] Is this currently working?
[ ] Did user explicitly say to delete it?
[ ] Can I accomplish goal WITHOUT deleting?
```

### 💰 Cost of Deletion:
| Item Deleted | Time to Recreate | User Impact |
|--------------|------------------|-------------|
| Telegram tokens | 1-2 hours | High - breaks password reset |
| Database schema | 3-4 hours | Critical - breaks everything |
| Theme system | 5-6 hours | High - UI broken |
| LoginPage modes | 4-5 hours | High - UX broken |
| Component showcase | 2-3 hours | Medium - testing harder |

**روزها کار کردیم - پاک کردن = هدر دادن همه اون زحمات! 🚫**

---

## 📚 Related Documentation

Must read in order:
1. **RULES.md** ← (این فایل) همیشه اول!
2. **LESSONS-LEARNED.md** - اشتباهات گذشته
3. **SECURITY.md** - استانداردهای امنیتی
4. **API-DOCUMENTATION.md** - API endpoints
5. **DATABASE-SCHEMA.md** - ساختار دیتابیس

---

## 🎯 SUMMARY

### The 3 Golden Rules:
1. **🌍 ENGLISH ONLY** in all UI
2. **🔴 NO DUPLICATES** - Single source of truth
3. **🚫 NEVER DELETE** working code

### The 3 Always-Do:
1. **🔍 SEARCH FIRST** before coding
2. **🧪 TEST EVERYTHING** before reporting
3. **📖 READ DOCS** before asking

---

**این قوانین قابل مذاکره نیستند. نقض = توقف پروژه.**

**Last Updated:** November 22, 2025  
**Version:** 1.0  
**Status:** 🔴 MANDATORY - MUST READ BEFORE ANY WORK
