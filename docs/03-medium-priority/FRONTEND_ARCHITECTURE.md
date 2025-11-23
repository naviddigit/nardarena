# 🏗️ ساختار بهینه شده Frontend - Nard Arena

## 📁 ساختار پیشنهادی (بهینه برای Nard Arena)

```
backgammon-frontend/
├── src/
│   │
│   ├── app/                                    # 🚀 App Core
│   │   ├── App.tsx                             # Root component
│   │   ├── providers/
│   │   │   ├── index.ts                        # Export همه providers
│   │   │   ├── ThemeProvider.tsx               # ✅ موجود
│   │   │   ├── AuthProvider.tsx                # ➕ اضافه شود
│   │   │   └── SocketProvider.tsx              # ➕ WebSocket provider
│   │   └── router/
│   │       ├── AppRouter.tsx                   # تعریف routes
│   │       ├── ProtectedRoute.tsx              # ✅ موجود
│   │       └── routes.config.ts                # ➕ تنظیمات routes
│   │
│   ├── features/                               # 🎯 Features (اصلی‌ترین بخش)
│   │   │
│   │   ├── auth/                               # ✅ موجود - فقط ریفکتور
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/                  # جدا کردن logic از UI
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   └── useLoginForm.ts         # ➕ Custom hook
│   │   │   │   └── RegisterForm/
│   │   │   │       ├── RegisterForm.tsx
│   │   │   │       └── useRegisterForm.ts
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx               # ✅ موجود
│   │   │   │   └── RegisterPage.tsx            # ✅ موجود
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.tsx                 # ✅ موجود - آپدیت به real API
│   │   │   ├── services/
│   │   │   │   └── authService.ts              # ✅ موجود - اتصال به backend
│   │   │   └── types/
│   │   │       └── auth.types.ts               # ➕ TypeScript types
│   │   │
│   │   ├── game/                               # ➕ جدید - اصلی‌ترین feature
│   │   │   ├── components/
│   │   │   │   ├── GameBoard/
│   │   │   │   │   ├── GameBoard.tsx
│   │   │   │   │   ├── BoardPoint.tsx          # نقطه‌های صفحه
│   │   │   │   │   └── Checker.tsx             # مهره‌ها
│   │   │   │   ├── Dice/
│   │   │   │   │   ├── Dice.tsx
│   │   │   │   │   └── useDiceRoll.ts
│   │   │   │   └── GameControls/
│   │   │   │       └── GameControls.tsx
│   │   │   ├── pages/
│   │   │   │   ├── GamePage.tsx
│   │   │   │   └── GameLobby.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGameLogic.ts             # منطق بازی
│   │   │   │   └── useGameSocket.ts            # Real-time با WebSocket
│   │   │   ├── services/
│   │   │   │   └── gameService.ts
│   │   │   └── types/
│   │   │       └── game.types.ts
│   │   │
│   │   ├── player/                             # ✅ موجود (PlayerDashboard)
│   │   │   ├── components/
│   │   │   │   ├── PlayerStats/
│   │   │   │   └── GameModeCard/               # کارت‌های AI, Multiplayer, Tournament
│   │   │   ├── pages/
│   │   │   │   └── PlayerDashboard.tsx         # ✅ موجود
│   │   │   └── hooks/
│   │   │       └── usePlayerStats.ts
│   │   │
│   │   ├── admin/                              # ✅ موجود
│   │   │   ├── components/
│   │   │   │   └── (component demos)
│   │   │   └── pages/
│   │   │       └── AdminPanel.tsx              # ✅ موجود
│   │   │
│   │   ├── wallet/                             # ➕ جدید (برای آینده)
│   │   │   ├── components/
│   │   │   │   ├── WalletBalance/
│   │   │   │   ├── DepositForm/
│   │   │   │   └── WithdrawForm/
│   │   │   └── pages/
│   │   │       └── WalletPage.tsx
│   │   │
│   │   ├── tournament/                         # ➕ جدید (برای آینده)
│   │   │   ├── components/
│   │   │   │   └── TournamentCard/
│   │   │   └── pages/
│   │   │       └── TournamentList.tsx
│   │   │
│   │   └── profile/                            # ➕ جدید
│   │       ├── components/
│   │       │   └── ProfileHeader/
│   │       └── pages/
│   │           └── ProfilePage.tsx
│   │
│   ├── shared/                                 # ⭐ Shared Resources
│   │   │
│   │   ├── components/                         # ✅ موجود - Atomic Design
│   │   │   ├── atoms/                          # ✅ Button, Input, Avatar, Badge...
│   │   │   ├── molecules/                      # ✅ Card, Toast...
│   │   │   └── organisms/                      # ✅ ThemeToggle, DebugPanel...
│   │   │
│   │   ├── layouts/                            # ➕ جدید
│   │   │   ├── MainLayout.tsx                  # با Header + Footer
│   │   │   ├── AuthLayout.tsx                  # برای Login/Register
│   │   │   └── GameLayout.tsx                  # فول‌اسکرین برای بازی
│   │   │
│   │   ├── hooks/                              # ➕ Custom Hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useMediaQuery.ts
│   │   │
│   │   ├── utils/                              # ➕ Utilities
│   │   │   ├── formatting/
│   │   │   │   ├── dateFormatter.ts
│   │   │   │   └── numberFormatter.ts
│   │   │   ├── validation/
│   │   │   │   └── validators.ts
│   │   │   └── constants/
│   │   │       ├── routes.ts
│   │   │       └── apiEndpoints.ts
│   │   │
│   │   ├── types/                              # ➕ Shared Types
│   │   │   └── common.types.ts
│   │   │
│   │   └── animations/                         # ✅ موجود
│   │       └── PageTransition.tsx
│   │
│   ├── services/                               # ➕ API Services
│   │   ├── api/
│   │   │   ├── client.ts                       # Axios instance
│   │   │   └── interceptors.ts                 # JWT interceptor
│   │   └── socket/
│   │       └── socketClient.ts                 # Socket.io
│   │
│   ├── config/                                 # ➕ Configuration
│   │   ├── env.ts                              # Environment vars
│   │   └── api.config.ts
│   │
│   ├── styles/                                 # ✅ موجود
│   │   └── globals.css
│   │
│   ├── assets/                                 # ➕ Static files
│   │   ├── images/
│   │   └── sounds/
│   │
│   └── main.tsx                                # ✅ موجود
│
├── public/                                     # ✅ موجود
├── tests/                                      # ➕ آینده
├── .env                                        # ✅ موجود
├── tsconfig.json                               # ✅ موجود
├── tailwind.config.js                          # ✅ موجود
└── vite.config.ts                              # ✅ موجود
```

---

## 🎯 تغییرات کلیدی نسبت به ساختار فعلی

### ✅ چیزهایی که خوبه و نگه میداریم:
1. **Atomic Design** (atoms/molecules/organisms)
2. **Feature-based structure** (auth, player, admin)
3. **Shared components**
4. **Theme system**

### 🔄 تغییرات پیشنهادی:

#### 1. **جدا کردن Logic از UI**
```tsx
// ❌ قبل: همه چی تو یک component
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  // ... 100 خط logic
  return <form>...</form>
}

// ✅ بعد: Logic در Custom Hook
function useLoginForm() {
  const [email, setEmail] = useState('');
  // ... همه logic
  return { email, password, errors, handleSubmit };
}

function LoginPage() {
  const { email, password, errors, handleSubmit } = useLoginForm();
  return <form>...</form>  // فقط UI
}
```

#### 2. **اضافه کردن Layouts**
```tsx
// app/router/AppRouter.tsx
<Routes>
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
  
  <Route element={<MainLayout />}>
    <Route path="/dashboard" element={<PlayerDashboard />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
  
  <Route element={<GameLayout />}>  {/* فول‌اسکرین */}
    <Route path="/game/:id" element={<GamePage />} />
  </Route>
</Routes>
```

#### 3. **Centralized API Client**
```tsx
// services/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor برای JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

#### 4. **Environment Config**
```tsx
// config/env.ts
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3002',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3003',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};
```

---

## 📊 مقایسه: ساختار شما vs بهینه شده

| جنبه | ساختار شما | بهینه شده Nard Arena |
|------|------------|---------------------|
| **Atoms/Molecules** | ✅ عالی | ✅ نگه می‌داریم |
| **Feature-based** | ✅ عالی | ✅ نگه می‌داریم |
| **Layouts** | ❌ نداره | ✅ اضافه میکنیم |
| **Custom Hooks** | ⚠️ کم | ✅ بیشتر میکنیم |
| **API Client** | ⚠️ پراکنده | ✅ متمرکز |
| **i18n (زبان)** | ✅ داره | ⏳ برای آینده |
| **Wallet** | ✅ داره | ⏳ Phase 5 |
| **Tournament** | ✅ داره | ⏳ Phase 4 |

---

## 🚀 مراحل پیشنهادی

### **Phase 1: پایه (الان)** ✅
- [x] Auth (Login/Register)
- [x] Theme System
- [x] Atomic Components
- [ ] Layouts
- [ ] API Client
- [ ] اتصال به Backend واقعی

### **Phase 2: Game Core** 🎮
- [ ] Game Board UI
- [ ] Dice Component
- [ ] Move Logic
- [ ] AI Opponent

### **Phase 3: Multiplayer** 🌐
- [ ] WebSocket
- [ ] Real-time Game
- [ ] Matchmaking

### **Phase 4: Tournament** 🏆
- [ ] Tournament System
- [ ] Brackets
- [ ] Leaderboard

### **Phase 5: Wallet** 💰
- [ ] Wallet Balance
- [ ] Crypto Deposit/Withdraw

---

## 💡 توصیه‌های کلیدی

### ✅ چیزهایی که حتماً باید باشن:
1. **Feature-based structure** (مثل الان)
2. **Atomic Design** (مثل الان)
3. **Custom Hooks** برای logic
4. **Layouts** برای structure
5. **Centralized API** برای راحتی

### ❌ چیزهایی که نیازی نیست:
1. **i18n** (الان فقط فارسی کافیه)
2. **Redux/Zustand** (الان Context API کافیه)
3. **Separate locales folder** (بعداً)
4. **Analytics service** (بعداً)

---

## 📝 نتیجه

ساختار شما **عالیه** ولی برای Nard Arena:
- ✅ **نگه می‌داریم**: Atomic Design, Feature-based
- ✅ **اضافه می‌کنیم**: Layouts, More Custom Hooks, API Client
- ⏳ **بعداً**: i18n, Wallet, Tournament (وقتی game core آماده شد)

**ساختار بهینه = ساده + قابل گسترش + استاندارد**
