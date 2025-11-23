/**
 * Transaction Service
 * سرویس مدیریت تراکنش‌های مالی
 */

import apiClient, { buildUrl } from './api.service';
import type {
  ApiResponse,
  Transaction,
  DepositRequestDto,
  WithdrawRequestDto,
  TransactionFilters,
  PaginatedTransactions,
  TransactionStatistics,
  DepositAddress,
  TransactionConfirmation,
} from '../types';

/**
 * دریافت لیست تراکنش‌ها (با فیلتر و صفحه‌بندی)
 */
export const getTransactions = async (
  filters?: TransactionFilters
): Promise<PaginatedTransactions> => {
  const url = buildUrl('/transactions', filters as Record<string, unknown>);
  const response = await apiClient.get<ApiResponse<PaginatedTransactions>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت لیست تراکنش‌ها');
  }
  
  return response.data.data;
};

/**
 * دریافت اطلاعات یک تراکنش
 */
export const getTransactionById = async (txId: string): Promise<Transaction> => {
  const response = await apiClient.get<ApiResponse<Transaction>>(
    `/transactions/${txId}`
  );
  
  if (!response.data.data) {
    throw new Error('تراکنش یافت نشد');
  }
  
  return response.data.data;
};

/**
 * دریافت آدرس واریز USDT
 */
export const getDepositAddress = async (
  network: 'tron' | 'bnb'
): Promise<DepositAddress> => {
  const response = await apiClient.get<ApiResponse<DepositAddress>>(
    `/transactions/deposit/address?network=${network}`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت آدرس واریز');
  }
  
  return response.data.data;
};

/**
 * ثبت درخواست واریز
 */
export const createDepositRequest = async (
  depositData: DepositRequestDto
): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    '/transactions/deposit',
    depositData
  );
  
  if (!response.data.data) {
    throw new Error('خطا در ثبت درخواست واریز');
  }
  
  return response.data.data;
};

/**
 * چک کردن وضعیت تراکنش blockchain
 */
export const checkTransactionStatus = async (
  txHash: string,
  network: 'tron' | 'bnb'
): Promise<TransactionConfirmation> => {
  const response = await apiClient.get<ApiResponse<TransactionConfirmation>>(
    `/transactions/check-status?txHash=${txHash}&network=${network}`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در چک کردن تراکنش');
  }
  
  return response.data.data;
};

/**
 * ثبت درخواست برداشت
 */
export const createWithdrawRequest = async (
  withdrawData: WithdrawRequestDto
): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    '/transactions/withdraw',
    withdrawData
  );
  
  if (!response.data.data) {
    throw new Error('خطا در ثبت درخواست برداشت');
  }
  
  return response.data.data;
};

/**
 * تأیید واریز (فقط ادمین)
 */
export const approveDeposit = async (
  txId: string,
  adminNote?: string
): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    `/transactions/${txId}/approve`,
    { adminNote }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در تأیید واریز');
  }
  
  return response.data.data;
};

/**
 * رد کردن واریز/برداشت (فقط ادمین)
 */
export const rejectTransaction = async (
  txId: string,
  reason: string
): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    `/transactions/${txId}/reject`,
    { reason }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در رد تراکنش');
  }
  
  return response.data.data;
};

/**
 * پردازش برداشت (فقط ادمین)
 */
export const processWithdrawal = async (
  txId: string,
  txHash: string
): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    `/transactions/${txId}/process`,
    { txHash }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در پردازش برداشت');
  }
  
  return response.data.data;
};

/**
 * دریافت تراکنش‌های کاربر فعلی
 */
export const getMyTransactions = async (
  filters?: Omit<TransactionFilters, 'userId'>
): Promise<PaginatedTransactions> => {
  const url = buildUrl('/transactions/me', filters as Record<string, unknown>);
  const response = await apiClient.get<ApiResponse<PaginatedTransactions>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت تراکنش‌ها');
  }
  
  return response.data.data;
};

/**
 * دریافت آمار تراکنش‌ها (فقط ادمین)
 */
export const getTransactionStatistics = async (
  fromDate?: string,
  toDate?: string
): Promise<TransactionStatistics> => {
  const params: Record<string, string> = {};
  if (fromDate) params.fromDate = fromDate;
  if (toDate) params.toDate = toDate;
  
  const url = buildUrl('/transactions/statistics', params);
  const response = await apiClient.get<ApiResponse<TransactionStatistics>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت آمار');
  }
  
  return response.data.data;
};

/**
 * لغو تراکنش (فقط pending)
 */
export const cancelTransaction = async (txId: string): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>(
    `/transactions/${txId}/cancel`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در لغو تراکنش');
  }
  
  return response.data.data;
};
