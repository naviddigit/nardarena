# NardAria - Persian Backgammon Platform
# پلتفرم تخته نرد آنلاین

Modern backgammon gaming platform with real money betting, tournaments, and social features.

## Project Structure

```
NardAria-v3/
├── backgammon-frontend/      # React + TypeScript + Vite frontend
├── backgammon-error-service/ # Error tracking backend service
└── README.md                 # This file
```

## Technologies

### Frontend
- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🎭 Framer Motion
- 🎯 SOLID Principles
- 🔧 Atomic Design Pattern

### Backend (Error Service)
- 🟢 Node.js
- 📘 TypeScript
- 🚂 Express
- 📱 Twilio WhatsApp API
- 🔐 API Key Authentication
- ⚡ Rate Limiting

## Features

### ✅ Completed Features

#### UI Components (Atomic Design)
- **Atoms (6):** Button, Input, Avatar, Badge, Spinner, Divider
- **Molecules (1):** Card
- **Organisms (3):** ThemeToggle, DemoNav, DebugPanel

#### Themes
- 🌑 Dark Mode
- ☀️ Light Mode
- 🎮 Gaming Mode (Purple/Violet theme)

#### Error Tracking
- 🐛 ErrorBoundary for React errors
- 📝 Logger service (4 levels: error, warn, info, debug)
- 🌐 Global error handlers
- 💾 localStorage persistence
- 📊 DebugPanel (development only)
- 📱 WhatsApp notifications (production)

#### Developer Tools
- 🔍 DebugPanel with real-time logs
- 📊 Error statistics
- 💾 Export logs as JSON
- 🎯 Console access: `window.logger`

### 🚀 Production Ready
- ✅ Error tracking system
- ✅ WhatsApp notifications
- ✅ Rate limiting & duplicate prevention
- ✅ Comprehensive documentation
- ✅ Mobile-responsive design
- ✅ Theme system
- ✅ Animation system

## Quick Start

### Frontend

```bash
cd backgammon-frontend
npm install
npm run dev
```

Visit: http://localhost:5173

### Backend (Error Service)

```bash
cd backgammon-error-service
npm install
cp .env.example .env
# Edit .env with your Twilio credentials
npm run dev
```

API: http://localhost:3001

## Documentation

Comprehensive documentation available in `backgammon-frontend/docs/`:

- **ERROR_TRACKING.md** - Complete error tracking guide
- **WHATSAPP_NOTIFICATIONS.md** - WhatsApp integration guide (400+ lines)
- **SETUP_WHATSAPP.md** - Quick setup guide (Persian)
- **WHATSAPP_HOW_IT_WORKS.md** - How it works explained
- **PROGRESS_SUMMARY.md** - Current project status
- **UI_ROADMAP.md** - Component development roadmap

## Development

### Git Workflow

```bash
main (production)
  ├── develop (integration)
  │    └── feature/ui-design (current work)
  │    └── feature/authentication
  │    └── feature/game-logic
  └── hotfix/* (urgent fixes)
```

### Component Development

Following Atomic Design:
1. Atoms → Basic building blocks
2. Molecules → Simple combinations
3. Organisms → Complex UI sections
4. Templates → Page layouts
5. Pages → Complete pages

### Testing

```bash
# Frontend
cd backgammon-frontend
npm run dev
# Open http://localhost:5173
# Use DemoNav to view components

# Backend
cd backgammon-error-service
npm run dev
# Test with curl (see backend README.md)
```

## Deployment

### Frontend
- Vercel (recommended)
- Netlify
- Cloudflare Pages

### Backend
- Vercel Serverless
- Railway
- Your own VPS

See `SETUP_WHATSAPP.md` for detailed deployment guide.

## Contributing

1. Create feature branch from `develop`
2. Follow SOLID principles
3. Write comprehensive comments (English + Persian)
4. Test in all 3 themes
5. Ensure mobile responsiveness
6. Create demo page for new components
7. Update documentation

## Project Stats

- **Total Components:** 10
- **Total Lines:** ~5000+
- **Commits:** 16
- **Documentation:** 5 comprehensive guides
- **Languages:** TypeScript, CSS
- **Frameworks:** React, Express

## Roadmap

### Phase 1: UI Library (Current) ✅ 70%
- [x] Theme system
- [x] Atom components
- [x] Error tracking
- [ ] Molecule components
- [ ] Organism components

### Phase 2: Authentication
- [ ] Login/Register
- [ ] JWT integration
- [ ] Social auth

### Phase 3: Game Features
- [ ] Game board UI
- [ ] Game logic
- [ ] Multiplayer (WebSocket)
- [ ] Real-time updates

### Phase 4: Wallet & Payments
- [ ] Wallet system
- [ ] Deposit/Withdrawal
- [ ] Transaction history
- [ ] Payment gateway integration

### Phase 5: Social Features
- [ ] Friends list
- [ ] Chat system
- [ ] Tournaments
- [ ] Leaderboard

## License

Private project - All rights reserved

## Contact

GitHub: [@naviddigit](https://github.com/naviddigit)
Repository: https://github.com/naviddigit/nardarena

---

**Built with ❤️ in Iran 🇮🇷**
