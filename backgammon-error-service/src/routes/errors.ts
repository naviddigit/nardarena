/**
 * Error Reporting Routes
 * مسیرهای گزارش خطا
 */

import express, { Request, Response } from 'express';
import { sendWhatsAppAlert } from '../services/whatsapp';
import { logError, getErrorStats } from '../services/logger';
import { rateLimiter } from '../utils/rateLimiter';
import { authenticateRequest } from '../utils/auth';

const router = express.Router();

/**
 * POST /api/errors/report
 * Report an error from frontend
 */
router.post('/report', rateLimiter, authenticateRequest, async (req: Request, res: Response) => {
  try {
    const errorData = req.body;
    
    // Validate required fields
    if (!errorData.message || !errorData.level) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    // Log error to backend storage
    const errorId = logError(errorData);
    
    // Send WhatsApp alert for critical errors
    if (shouldSendWhatsAppAlert(errorData)) {
      await sendWhatsAppAlert({
        ...errorData,
        id: errorId
      });
    }
    
    res.json({ 
      success: true,
      errorId 
    });
  } catch (error) {
    console.error('Failed to process error report:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process error report' 
    });
  }
});

/**
 * GET /api/errors/stats
 * Get error statistics
 */
router.get('/stats', authenticateRequest, async (req: Request, res: Response) => {
  try {
    const stats = getErrorStats();
    res.json(stats);
  } catch (error) {
    console.error('Failed to get error stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

/**
 * Determine if WhatsApp alert should be sent
 */
function shouldSendWhatsAppAlert(errorData: any): boolean {
  // Always send for critical errors
  if (errorData.level === 'error') return true;
  
  // Send for specific pages (payment, game)
  if (errorData.url && (
    errorData.url.includes('/payment') || 
    errorData.url.includes('/game')
  )) {
    return true;
  }
  
  return false;
}

export default router;
