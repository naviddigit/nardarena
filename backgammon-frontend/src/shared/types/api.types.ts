/**
 * API Type Definitions
 * تعاریف تایپ پاسخ‌های API و خطاها
 */

/**
 * پاسخ استاندارد API
 */
export interface ApiResponse<T = unknown> {
  /** موفقیت درخواست */
  success: boolean;
  
  /** داده‌های پاسخ */
  data?: T;
  
  /** پیام خطا */
  error?: string;
  
  /** پیام عمومی */
  message?: string;
  
  /** زمان پاسخ */
  timestamp?: string;
}

/**
 * پاسخ صفحه‌بندی شده
 */
export interface PaginatedResponse<T> {
  /** لیست آیتم‌ها */
  items: T[];
  
  /** تعداد کل */
  total: number;
  
  /** صفحه فعلی */
  page: number;
  
  /** تعداد در هر صفحه */
  limit: number;
  
  /** تعداد کل صفحات */
  totalPages: number;
  
  /** آیا صفحه بعدی وجود دارد؟ */
  hasNextPage: boolean;
  
  /** آیا صفحه قبلی وجود دارد؟ */
  hasPreviousPage: boolean;
}

/**
 * خطای API
 */
export interface ApiError {
  /** کد خطا */
  code: string;
  
  /** پیام خطا */
  message: string;
  
  /** جزئیات خطا */
  details?: Record<string, unknown>;
  
  /** Stack trace (فقط در development) */
  stack?: string;
  
  /** زمان وقوع خطا */
  timestamp: string;
}

/**
 * خطاهای اعتبارسنجی
 */
export interface ValidationError {
  /** فیلد دارای خطا */
  field: string;
  
  /** پیام خطا */
  message: string;
  
  /** کد خطا */
  code?: string;
}

/**
 * پاسخ خطا با اعتبارسنجی
 */
export interface ValidationErrorResponse {
  success: false;
  error: string;
  validationErrors: ValidationError[];
}

/**
 * پارامترهای صفحه‌بندی
 */
export interface PaginationParams {
  /** شماره صفحه (از 1 شروع) */
  page?: number;
  
  /** تعداد آیتم در هر صفحه */
  limit?: number;
  
  /** فیلد مرتب‌سازی */
  sortBy?: string;
  
  /** ترتیب مرتب‌سازی */
  sortOrder?: 'asc' | 'desc';
}

/**
 * پارامترهای جستجو
 */
export interface SearchParams extends PaginationParams {
  /** کلمه کلیدی جستجو */
  query?: string;
  
  /** فیلترهای اضافی */
  filters?: Record<string, unknown>;
}

/**
 * نتیجه عملیات
 */
export interface OperationResult {
  /** موفقیت عملیات */
  success: boolean;
  
  /** پیام */
  message: string;
  
  /** شناسه آیتم ایجاد/ویرایش شده */
  id?: string;
}

/**
 * وضعیت سلامت سرویس
 */
export interface HealthCheck {
  /** وضعیت */
  status: 'healthy' | 'degraded' | 'unhealthy';
  
  /** زمان */
  timestamp: string;
  
  /** نسخه API */
  version: string;
  
  /** زمان uptime (ثانیه) */
  uptime: number;
  
  /** وضعیت سرویس‌های مختلف */
  services: {
    database: 'up' | 'down';
    redis?: 'up' | 'down';
    websocket?: 'up' | 'down';
  };
}

/**
 * اطلاعات احراز هویت
 */
export interface AuthTokens {
  /** Access token */
  accessToken: string;
  
  /** Refresh token */
  refreshToken: string;
  
  /** زمان انقضا access token (ثانیه) */
  expiresIn: number;
  
  /** نوع token */
  tokenType: 'Bearer';
}

/**
 * پاسخ لاگین
 */
export interface LoginResponse {
  /** توکن‌های احراز هویت */
  tokens: AuthTokens;
  
  /** اطلاعات کاربر */
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

/**
 * درخواست لاگین
 */
export interface LoginRequest {
  /** ایمیل یا نام کاربری */
  emailOrUsername: string;
  
  /** رمز عبور */
  password: string;
}

/**
 * درخواست ثبت‌نام
 */
export interface RegisterRequest {
  /** ایمیل */
  email: string;
  
  /** نام کاربری */
  username: string;
  
  /** رمز عبور */
  password: string;
  
  /** تأیید رمز عبور */
  confirmPassword: string;
}

/**
 * وضعیت بارگذاری
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * وضعیت درخواست با خطا
 */
export interface RequestState<T = unknown> {
  /** وضعیت */
  status: LoadingState;
  
  /** داده */
  data: T | null;
  
  /** خطا */
  error: string | null;
  
  /** در حال بارگذاری */
  isLoading: boolean;
}

/**
 * نوتیفیکیشن WebSocket
 */
export interface WebSocketNotification {
  /** نوع رویداد */
  type: 'game_update' | 'transaction' | 'chat' | 'system';
  
  /** داده رویداد */
  data: unknown;
  
  /** زمان */
  timestamp: string;
}
