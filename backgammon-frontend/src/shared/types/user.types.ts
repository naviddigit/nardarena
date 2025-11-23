/**
 * User Type Definitions
 * تعاریف تایپ کاربران سیستم
 */

/**
 * نقش کاربر در سیستم
 */
export type UserRole = 'admin' | 'player';

/**
 * وضعیت حساب کاربری
 */
export type UserStatus = 'active' | 'suspended' | 'banned';

/**
 * اطلاعات پایه کاربر
 */
export interface User {
  /** شناسه یکتا کاربر */
  id: string;
  
  /** ایمیل کاربر */
  email: string;
  
  /** نام کاربری */
  username: string;
  
  /** نقش کاربر (ادمین یا بازیکن) */
  role: UserRole;
  
  /** وضعیت حساب */
  status: UserStatus;
  
  /** موجودی حساب (USDT) */
  balance: number;
  
  /** آواتار کاربر (URL) */
  avatar?: string;
  
  /** تاریخ ایجاد حساب */
  createdAt: string;
  
  /** تاریخ آخرین بروزرسانی */
  updatedAt: string;
  
  /** تاریخ آخرین ورود */
  lastLoginAt?: string;
}

/**
 * فرم ایجاد کاربر جدید
 */
export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

/**
 * فرم بروزرسانی اطلاعات کاربر
 */
export interface UpdateUserDto {
  email?: string;
  username?: string;
  role?: UserRole;
  status?: UserStatus;
  balance?: number;
  avatar?: string;
}

/**
 * آمار کاربر
 */
export interface UserStats {
  /** تعداد کل بازی‌ها */
  totalGames: number;
  
  /** تعداد بازی‌های برنده شده */
  wins: number;
  
  /** تعداد بازی‌های باخته شده */
  losses: number;
  
  /** درصد برد */
  winRate: number;
  
  /** مجموع سود/ضرر */
  totalProfit: number;
  
  /** طولانی‌ترین برد streak */
  longestWinStreak: number;
  
  /** رتبه کاربر */
  rank?: number;
}

/**
 * پروفایل کامل کاربر (با آمار)
 */
export interface UserProfile extends User {
  stats: UserStats;
}

/**
 * فیلترهای جستجوی کاربران
 */
export interface UserFilters {
  /** جستجو در نام کاربری و ایمیل */
  search?: string;
  
  /** فیلتر بر اساس نقش */
  role?: UserRole;
  
  /** فیلتر بر اساس وضعیت */
  status?: UserStatus;
  
  /** مرتب‌سازی */
  sortBy?: 'createdAt' | 'balance' | 'username';
  
  /** ترتیب مرتب‌سازی */
  sortOrder?: 'asc' | 'desc';
  
  /** صفحه */
  page?: number;
  
  /** تعداد در هر صفحه */
  limit?: number;
}

/**
 * لیست صفحه‌بندی شده کاربران
 */
export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
