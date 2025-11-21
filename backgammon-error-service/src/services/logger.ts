/**
 * Backend Logger Service
 * سرویس لاگ‌گیری بک‌اند
 */

import * as fs from 'fs';
import * as path from 'path';

interface LogEntry {
  id: string;
  level: string;
  message: string;
  timestamp: string;
  url?: string;
  userId?: string;
  userAgent?: string;
  data?: any;
}

const LOG_DIR = path.join(__dirname, '../../logs');
const errorCounts = new Map<string, number>();

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Log error to file
 */
export function logError(errorData: any): string {
  const id = generateId();
  const entry: LogEntry = {
    id,
    ...errorData
  };
  
  // Write to file
  const date = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `errors-${date}.json`);
  
  try {
    let logs: LogEntry[] = [];
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf-8');
      logs = JSON.parse(content);
    }
    logs.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Failed to write error log:', error);
  }
  
  // Update error counts
  updateErrorCounts(errorData.message);
  
  return id;
}

/**
 * Get error statistics
 */
export function getErrorStats() {
  const today = getTodayErrors();
  const week = getWeekErrors();
  
  return {
    today: today.length,
    week: week.length,
    topErrors: getTopErrors(10),
    recentErrors: today.slice(-10).reverse(),
  };
}

/**
 * Get today's errors
 */
function getTodayErrors(): LogEntry[] {
  const date = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `errors-${date}.json`);
  
  if (!fs.existsSync(logFile)) return [];
  
  try {
    const content = fs.readFileSync(logFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

/**
 * Get this week's errors
 */
function getWeekErrors(): LogEntry[] {
  const errors: LogEntry[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `errors-${dateStr}.json`);
    
    if (fs.existsSync(logFile)) {
      try {
        const content = fs.readFileSync(logFile, 'utf-8');
        errors.push(...JSON.parse(content));
      } catch {
        // Skip invalid files
      }
    }
  }
  
  return errors;
}

/**
 * Get top occurring errors
 */
function getTopErrors(limit: number) {
  const sorted = Array.from(errorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  
  return sorted.map(([message, count]) => ({
    message: message.substring(0, 100),
    count
  }));
}

/**
 * Update error counts
 */
function updateErrorCounts(message: string) {
  const key = message.substring(0, 100);
  errorCounts.set(key, (errorCounts.get(key) || 0) + 1);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `err-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}
