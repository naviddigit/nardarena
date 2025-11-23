# 💰 Bybit Payment API Integration Guide

## 📋 Overview
Bybit provides payment services for USDT transactions on TRC20 (Tron) and BEP20 (BNB Chain) networks.

---

## 🔑 API Setup

### 1. Account Requirements
- **Create Bybit Account**: https://www.bybit.com
- **Complete KYC**: Business verification required for API access
- **Enable API**: Go to Account & Security → API Management

### 2. API Credentials
```env
VITE_BYBIT_API_KEY=your_api_key_here
VITE_BYBIT_API_SECRET=your_api_secret_here
VITE_BYBIT_BASE_URL=https://api.bybit.com
```

---

## 🌐 Supported Networks

### USDT on Tron (TRC20)
- **Network**: Tron
- **Contract**: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
- **Decimals**: 6
- **Fee**: ~1-2 USDT
- **Confirmation Time**: ~1-3 minutes

### USDT on BNB Chain (BEP20)
- **Network**: BNB Smart Chain
- **Contract**: 0x55d398326f99059fF775485246999027B3197955
- **Decimals**: 18
- **Fee**: ~0.5-1 USDT
- **Confirmation Time**: ~5-10 seconds

---

## 🔄 Integration Flow

### Deposit Flow
```
1. User requests deposit
   ↓
2. Backend generates unique deposit address (or reuses existing)
   ↓
3. Display address + QR code to user
   ↓
4. User sends USDT from their wallet
   ↓
5. Bybit webhook notifies backend of transaction
   ↓
6. Backend verifies transaction (amount, confirmations)
   ↓
7. Credit user balance
```

### Withdrawal Flow
```
1. User requests withdrawal
   ↓
2. Backend validates (balance, minimum amount)
   ↓
3. Admin approves withdrawal request
   ↓
4. Backend calls Bybit API to send USDT
   ↓
5. Bybit processes transaction
   ↓
6. Store TX hash and update status
```

---

## 📡 Key API Endpoints

### 1. Get Deposit Address
```typescript
// GET /v5/asset/deposit/query-address
const getDepositAddress = async (network: 'TRC20' | 'BEP20') => {
  const response = await bybitClient.get('/v5/asset/deposit/query-address', {
    params: {
      coin: 'USDT',
      chainType: network,
    }
  });
  return response.data.result.address;
};
```

### 2. Query Deposit History
```typescript
// GET /v5/asset/deposit/query-record
const queryDeposits = async () => {
  const response = await bybitClient.get('/v5/asset/deposit/query-record', {
    params: {
      coin: 'USDT',
      limit: 50,
    }
  });
  return response.data.result.rows;
};
```

### 3. Create Withdrawal
```typescript
// POST /v5/asset/withdraw/create
const createWithdrawal = async (
  address: string,
  amount: number,
  network: 'TRC20' | 'BEP20'
) => {
  const response = await bybitClient.post('/v5/asset/withdraw/create', {
    coin: 'USDT',
    chain: network,
    address: address,
    amount: amount.toString(),
  });
  return response.data.result;
};
```

### 4. Query Withdrawal History
```typescript
// GET /v5/asset/withdraw/query-record
const queryWithdrawals = async () => {
  const response = await bybitClient.get('/v5/asset/withdraw/query-record', {
    params: {
      coin: 'USDT',
      limit: 50,
    }
  });
  return response.data.result.rows;
};
```

---

## 🔐 Authentication

Bybit uses **HMAC SHA256** signature for API requests:

```typescript
import crypto from 'crypto';

const generateSignature = (
  timestamp: number,
  apiKey: string,
  apiSecret: string,
  params: string
) => {
  const message = timestamp + apiKey + params;
  return crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
};

// Headers
{
  'X-BAPI-API-KEY': apiKey,
  'X-BAPI-TIMESTAMP': timestamp,
  'X-BAPI-SIGN': signature,
  'X-BAPI-RECV-WINDOW': 5000,
}
```

---

## 🎯 Implementation Steps

### Step 1: Backend Service
Create `bybit.service.ts`:
```typescript
import axios from 'axios';
import crypto from 'crypto';

class BybitService {
  private apiKey: string;
  private apiSecret: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.BYBIT_API_KEY!;
    this.apiSecret = process.env.BYBIT_API_SECRET!;
    this.baseURL = process.env.BYBIT_BASE_URL!;
  }

  private generateSignature(timestamp: number, params: string) {
    const message = timestamp + this.apiKey + params;
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(message)
      .digest('hex');
  }

  async getDepositAddress(network: 'TRC20' | 'BEP20') {
    // Implementation
  }

  async createWithdrawal(address: string, amount: number, network: 'TRC20' | 'BEP20') {
    // Implementation
  }
}
```

### Step 2: Webhook Handler
```typescript
// POST /api/webhooks/bybit/deposit
router.post('/webhooks/bybit/deposit', async (req, res) => {
  const { txHash, amount, address, coin, chainType } = req.body;
  
  // Verify webhook signature
  // Find user by deposit address
  // Update transaction status
  // Credit user balance
  
  res.json({ success: true });
});
```

### Step 3: Frontend Integration
Already implemented in:
- `DepositPage.tsx` - UI ready
- `transactionService.ts` - API calls ready

---

## 🧪 Testing

### Testnet
Bybit provides testnet environment:
- **URL**: https://api-testnet.bybit.com
- **Faucet**: Get test USDT from testnet faucets

### Production Checklist
- [ ] KYC completed
- [ ] API keys generated
- [ ] Withdrawal whitelist configured
- [ ] Webhook endpoint secured
- [ ] Rate limits configured
- [ ] Error handling tested
- [ ] Balance monitoring setup

---

## ⚠️ Important Notes

1. **Minimum Amounts**:
   - Deposit: Usually 10 USDT
   - Withdrawal: Check Bybit's current limits

2. **Fees**:
   - TRC20: ~1-2 USDT
   - BEP20: ~0.5-1 USDT
   - Bybit may charge additional processing fee

3. **Confirmations**:
   - TRC20: 19 confirmations
   - BEP20: 15 confirmations

4. **Rate Limits**:
   - 120 requests per minute for most endpoints

5. **Security**:
   - Never expose API keys in frontend
   - Use IP whitelist
   - Enable 2FA
   - Implement withdrawal limits

---

## 🔗 Resources

- **Bybit API Docs**: https://bybit-exchange.github.io/docs/v5/intro
- **Deposit & Withdrawal**: https://bybit-exchange.github.io/docs/v5/asset/deposit-record
- **Webhook Guide**: https://bybit-exchange.github.io/docs/v5/websocket/public/orderbook
- **Status Page**: https://bybit.statuspage.io/

---

## 🚀 Alternative Solutions

If Bybit is not suitable:

1. **Tatum API**: Multi-chain wallet infrastructure
2. **Coinbase Commerce**: Easy integration but limited crypto
3. **NOWPayments**: 200+ cryptos, simple API
4. **CryptoAPI**: Direct blockchain interaction
5. **Custom Solution**: Direct blockchain integration with Web3.js

---

## 📝 Next Steps

1. ✅ Create Bybit account
2. ✅ Complete KYC verification
3. ✅ Generate API keys
4. 🔄 Implement backend service
5. 🔄 Setup webhook handler
6. 🔄 Test on testnet
7. 🔄 Deploy to production

---

**Note**: This is a research document. Actual implementation requires backend development which is outside current scope. Frontend is ready to integrate once backend API is available.
