/**
 * Game Type Definitions
 * تعاریف تایپ بازی تخته نرد
 */

/**
 * وضعیت بازی
 */
export type GameStatus = 'waiting' | 'active' | 'finished' | 'cancelled';

/**
 * نوع بازی
 */
export type GameType = 'ai' | 'multiplayer' | 'private';

/**
 * سطح دشواری AI
 */
export type AIDifficulty = 'easy' | 'medium' | 'hard';

/**
 * رنگ مهره‌ها
 */
export type CheckerColor = 'white' | 'black';

/**
 * موقعیت یک مهره روی تخته
 */
export interface CheckerPosition {
  /** شماره point (1-24) یا 'bar' یا 'off' */
  point: number | 'bar' | 'off';
  
  /** تعداد مهره‌های این رنگ در این point */
  count: number;
  
  /** رنگ مهره */
  color: CheckerColor;
}

/**
 * وضعیت کامل تخته بازی
 */
export interface BoardState {
  /** 24 point تخته + bar برای هر بازیکن */
  points: CheckerPosition[];
  
  /** مهره‌های خارج شده سفید */
  whiteOff: number;
  
  /** مهره‌های خارج شده سیاه */
  blackOff: number;
  
  /** مهره‌های سفید روی bar */
  whiteBar: number;
  
  /** مهره‌های سیاه روی bar */
  blackBar: number;
}

/**
 * یک حرکت در بازی
 */
export interface Move {
  /** از کدام point */
  from: number | 'bar';
  
  /** به کدام point */
  to: number | 'off';
  
  /** عدد تاس استفاده شده */
  diceUsed: number;
  
  /** آیا مهره حریف خورده شد؟ */
  hit?: boolean;
}

/**
 * تاریخچه یک turn
 */
export interface TurnHistory {
  /** شماره turn */
  turnNumber: number;
  
  /** بازیکن (0 یا 1) */
  player: number;
  
  /** تاس‌های زده شده */
  dice: [number, number];
  
  /** حرکات انجام شده */
  moves: Move[];
  
  /** زمان turn */
  timestamp: string;
}

/**
 * اطلاعات یک بازیکن در بازی
 */
export interface GamePlayer {
  /** شناسه کاربر */
  userId: string;
  
  /** نام کاربری */
  username: string;
  
  /** آواتار */
  avatar?: string;
  
  /** رنگ مهره‌ها */
  color: CheckerColor;
  
  /** آیا آماده است؟ */
  ready: boolean;
}

/**
 * اطلاعات کامل یک بازی
 */
export interface Game {
  /** شناسه یکتا بازی */
  id: string;
  
  /** نوع بازی */
  type: GameType;
  
  /** وضعیت بازی */
  status: GameStatus;
  
  /** بازیکنان (2 نفر) */
  players: [GamePlayer, GamePlayer];
  
  /** وضعیت تخته */
  board: BoardState;
  
  /** نوبت کدام بازیکن است؟ (0 یا 1) */
  currentPlayer: number;
  
  /** تاس‌های فعلی */
  dice: [number, number] | null;
  
  /** مبلغ شرط (USDT) */
  stake: number;
  
  /** برنده (بعد از finish) */
  winner?: number;
  
  /** تاریخچه حرکات */
  history: TurnHistory[];
  
  /** تماشاچیان */
  spectators: string[];
  
  /** سطح دشواری (برای بازی با AI) */
  aiDifficulty?: AIDifficulty;
  
  /** تاریخ شروع */
  createdAt: string;
  
  /** تاریخ پایان */
  finishedAt?: string;
}

/**
 * درخواست ایجاد بازی جدید
 */
export interface CreateGameDto {
  type: GameType;
  stake: number;
  aiDifficulty?: AIDifficulty;
  privateRoomId?: string;
}

/**
 * فیلترهای لیست بازی‌ها
 */
export interface GameFilters {
  /** فیلتر بر اساس وضعیت */
  status?: GameStatus;
  
  /** فیلتر بر اساس نوع */
  type?: GameType;
  
  /** فیلتر بر اساس بازیکن */
  userId?: string;
  
  /** مرتب‌سازی */
  sortBy?: 'createdAt' | 'stake';
  
  /** ترتیب */
  sortOrder?: 'asc' | 'desc';
  
  /** صفحه */
  page?: number;
  
  /** تعداد */
  limit?: number;
}

/**
 * لیست صفحه‌بندی شده بازی‌ها
 */
export interface PaginatedGames {
  games: Game[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * آمار بازی
 */
export interface GameStatistics {
  /** تعداد کل بازی‌ها */
  totalGames: number;
  
  /** بازی‌های فعال */
  activeGames: number;
  
  /** میانگین مدت زمان بازی (دقیقه) */
  averageDuration: number;
  
  /** مجموع شرط‌بندی‌ها */
  totalStakes: number;
  
  /** محبوب‌ترین ساعات بازی */
  popularHours: Array<{ hour: number; count: number }>;
}

/**
 * اطلاعات اتاق خصوصی
 */
export interface PrivateRoom {
  id: string;
  hostId: string;
  code: string;
  stake: number;
  createdAt: string;
  expiresAt: string;
}
