/**
 * Express Server for Error Tracking
 * سرور Express برای ردیابی خطا
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorRoutes from './routes/errors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'backgammon-error-tracking'
  });
});

// API routes
app.use('/api/errors', errorRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Error tracking service running on port ${PORT}`);
  console.log(`📱 WhatsApp notifications: ${process.env.ADMIN_WHATSAPP_NUMBER ? 'ENABLED' : 'DISABLED'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

export default app;
