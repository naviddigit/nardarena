# Backgammon Error Service

Backend service for tracking errors and sending WhatsApp notifications.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
ADMIN_WHATSAPP_NUMBER=+989123456789
API_KEY=your-secure-random-key
```

### 3. Run Development Server

```bash
npm run dev
```

Server will start on http://localhost:3001

### 4. Test the Service

```bash
# Health check
curl http://localhost:3001/health

# Test error report
curl -X POST http://localhost:3001/api/errors/report \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "message": "Test error from curl",
    "level": "error",
    "url": "https://test.com",
    "timestamp": "2025-01-01T12:00:00Z"
  }'
```

You should receive a WhatsApp message!

## Production Deployment

### Option 1: Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Add environment variables in Vercel dashboard.

### Option 2: Railway

1. Push to GitHub
2. Connect repo to Railway
3. Add environment variables
4. Deploy

### Option 3: Your VPS

```bash
# Build
npm run build

# Run with PM2
npm install -g pm2
pm2 start dist/server.js --name error-service
pm2 save
pm2 startup
```

## API Endpoints

### POST /api/errors/report
Report an error from frontend.

**Headers:**
- `Content-Type: application/json`
- `X-API-Key: your-api-key`

**Body:**
```json
{
  "message": "Error message",
  "level": "error",
  "url": "https://example.com/page",
  "timestamp": "2025-01-01T12:00:00Z",
  "userId": "user-123",
  "userAgent": "Mozilla/5.0..."
}
```

### GET /api/errors/stats
Get error statistics.

**Headers:**
- `X-API-Key: your-api-key`

**Response:**
```json
{
  "today": 5,
  "week": 23,
  "topErrors": [
    { "message": "...", "count": 10 }
  ],
  "recentErrors": [...]
}
```

## Features

✅ WhatsApp notifications via Twilio
✅ Rate limiting (20 requests/minute per IP)
✅ Duplicate error prevention (5 min window)
✅ Error logging to files
✅ Error statistics
✅ API key authentication
✅ Persian message formatting

## Logs

Logs are stored in `logs/errors-YYYY-MM-DD.json`

## Security

- Always use HTTPS in production
- Keep API key secret
- Use strong random API key
- Enable CORS only for your domain
- Implement additional security as needed
