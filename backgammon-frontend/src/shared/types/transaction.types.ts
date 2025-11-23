/**
 * Transaction Type Definitions
 * تعاریف تایپ تراکنش‌های مالی
 */

/**
 * نوع تراکنش
 */
export type TransactionType = 
  | 'deposit'        // واریز
  | 'withdraw'       // برداشت
  | 'game_win'       // برد بازی
  | 'game_loss'      // باخت بازی
  | 'spectator_fee'  // کارمزد تماشاگر
  | 'refund';        // بازگشت وجه

/**
 * وضعیت تراکنش
 */
export type TransactionStatus = 
  | 'pending'    // در انتظار
  | 'completed'  // تکمیل شده
  | 'failed'     // ناموفق
  | 'cancelled'; // لغو شده

/**
 * روش پرداخت
 */
export type PaymentMethod = 
  | 'usdt-trc20'  // USDT on Tron (TRC20)
  | 'usdt-bep20'; // USDT on BNB Chain (BEP20)

/**
 * شبکه بلاکچین
 */
export type BlockchainNetwork = 'tron' | 'bnb';

/**
 * اطلاعات کامل تراکنش
 */
export interface Transaction {
  /** شناسه یکتا تراکنش */
  id: string;
  
  /** شناسه کاربر */
  userId: string;
  
  /** نام کاربری */
  username?: string;
  
  /** نوع تراکنش */
  type: TransactionType;
  
  /** مبلغ (USDT) */
  amount: number;
  
  /** وضعیت تراکنش */
  status: TransactionStatus;
  
  /** روش پرداخت (برای deposit/withdraw) */
  method?: PaymentMethod;
  
  /** شبکه بلاکچین */
  network?: BlockchainNetwork;
  
  /** Transaction Hash (برای تراکنش‌های blockchain) */
  txHash?: string;
  
  /** آدرس wallet (برای withdraw) */
  walletAddress?: string;
  
  /** شناسه بازی (برای game_win/game_loss) */
  gameId?: string;
  
  /** توضیحات */
  description?: string;
  
  /** یادداشت ادمین */
  adminNote?: string;
  
  /** تاریخ ایجاد */
  createdAt: string;
  
  /** تاریخ بروزرسانی */
  updatedAt: string;
  
  /** تاریخ تکمیل */
  completedAt?: string;
}

/**
 * درخواست واریز
 */
export interface DepositRequestDto {
  /** مبلغ واریز (USDT) */
  amount: number;
  
  /** روش پرداخت */
  method: PaymentMethod;
  
  /** Transaction Hash */
  txHash: string;
}

/**
 * درخواست برداشت
 */
export interface WithdrawRequestDto {
  /** مبلغ برداشت (USDT) */
  amount: number;
  
  /** روش پرداخت */
  method: PaymentMethod;
  
  /** آدرس wallet مقصد */
  walletAddress: string;
}

/**
 * فیلترهای جستجوی تراکنش‌ها
 */
export interface TransactionFilters {
  /** جستجو در Transaction Hash */
  search?: string;
  
  /** فیلتر بر اساس نوع */
  type?: TransactionType;
  
  /** فیلتر بر اساس وضعیت */
  status?: TransactionStatus;
  
  /** فیلتر بر اساس کاربر */
  userId?: string;
  
  /** از تاریخ */
  fromDate?: string;
  
  /** تا تاریخ */
  toDate?: string;
  
  /** مرتب‌سازی */
  sortBy?: 'createdAt' | 'amount';
  
  /** ترتیب */
  sortOrder?: 'asc' | 'desc';
  
  /** صفحه */
  page?: number;
  
  /** تعداد */
  limit?: number;
}

/**
 * لیست صفحه‌بندی شده تراکنش‌ها
 */
export interface PaginatedTransactions {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * آمار تراکنش‌ها
 */
export interface TransactionStatistics {
  /** مجموع واریزها */
  totalDeposits: number;
  
  /** تعداد واریزها */
  depositCount: number;
  
  /** مجموع برداشت‌ها */
  totalWithdrawals: number;
  
  /** تعداد برداشت‌ها */
  withdrawalCount: number;
  
  /** تراکنش‌های در انتظار */
  pendingCount: number;
  
  /** حجم معاملات 24 ساعت اخیر */
  volume24h: number;
  
  /** درآمد سیستم (کارمزد تماشاگران + rake) */
  systemRevenue: number;
}

/**
 * آدرس واریز USDT
 */
export interface DepositAddress {
  /** آدرس wallet */
  address: string;
  
  /** شبکه */
  network: BlockchainNetwork;
  
  /** QR Code (base64) */
  qrCode?: string;
}

/**
 * جزئیات تأیید تراکنش
 */
export interface TransactionConfirmation {
  /** تعداد تأییدیه‌ها */
  confirmations: number;
  
  /** حداقل تأییدیه مورد نیاز */
  requiredConfirmations: number;
  
  /** آیا تأیید شده؟ */
  isConfirmed: boolean;
  
  /** لینک explorer */
  explorerUrl: string;
}
