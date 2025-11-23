/**
 * Game Service
 * سرویس مدیریت بازی‌ها
 */

import apiClient, { buildUrl } from './api.service';
import type {
  ApiResponse,
  Game,
  CreateGameDto,
  GameFilters,
  PaginatedGames,
  GameStatistics,
  PrivateRoom,
  Move,
  AIDifficulty,
} from '../types';

/**
 * دریافت لیست بازی‌ها (با فیلتر و صفحه‌بندی)
 */
export const getGames = async (filters?: GameFilters): Promise<PaginatedGames> => {
  const url = buildUrl('/games', filters as Record<string, unknown>);
  const response = await apiClient.get<ApiResponse<PaginatedGames>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت لیست بازی‌ها');
  }
  
  return response.data.data;
};

/**
 * دریافت اطلاعات یک بازی
 */
export const getGameById = async (gameId: string): Promise<Game> => {
  const response = await apiClient.get<ApiResponse<Game>>(`/games/${gameId}`);
  
  if (!response.data.data) {
    throw new Error('بازی یافت نشد');
  }
  
  return response.data.data;
};

/**
 * ایجاد بازی جدید
 */
export const createGame = async (gameData: CreateGameDto): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>('/games', gameData);
  
  if (!response.data.data) {
    throw new Error('خطا در ایجاد بازی');
  }
  
  return response.data.data;
};

/**
 * پیوستن به بازی (برای multiplayer)
 */
export const joinGame = async (gameId: string): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    `/games/${gameId}/join`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در پیوستن به بازی');
  }
  
  return response.data.data;
};

/**
 * ترک بازی
 */
export const leaveGame = async (gameId: string): Promise<void> => {
  await apiClient.post(`/games/${gameId}/leave`);
};

/**
 * انجام حرکت در بازی
 */
export const makeMove = async (gameId: string, moves: Move[]): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    `/games/${gameId}/move`,
    { moves }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در انجام حرکت');
  }
  
  return response.data.data;
};

/**
 * زدن تاس
 */
export const rollDice = async (gameId: string): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    `/games/${gameId}/roll`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در زدن تاس');
  }
  
  return response.data.data;
};

/**
 * پیوستن به بازی به عنوان تماشاگر
 */
export const spectateGame = async (gameId: string): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    `/games/${gameId}/spectate`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در پیوستن به تماشا');
  }
  
  return response.data.data;
};

/**
 * ترک حالت تماشا
 */
export const leaveSpectate = async (gameId: string): Promise<void> => {
  await apiClient.post(`/games/${gameId}/spectate/leave`);
};

/**
 * ایجاد اتاق خصوصی
 */
export const createPrivateRoom = async (
  stake: number
): Promise<PrivateRoom> => {
  const response = await apiClient.post<ApiResponse<PrivateRoom>>(
    '/games/private/create',
    { stake }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در ایجاد اتاق خصوصی');
  }
  
  return response.data.data;
};

/**
 * پیوستن به اتاق خصوصی با کد
 */
export const joinPrivateRoom = async (code: string): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    '/games/private/join',
    { code }
  );
  
  if (!response.data.data) {
    throw new Error('اتاق خصوصی یافت نشد');
  }
  
  return response.data.data;
};

/**
 * دریافت بازی‌های فعال کاربر فعلی
 */
export const getMyActiveGames = async (): Promise<Game[]> => {
  const response = await apiClient.get<ApiResponse<Game[]>>('/games/me/active');
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت بازی‌های فعال');
  }
  
  return response.data.data;
};

/**
 * دریافت تاریخچه بازی‌های کاربر فعلی
 */
export const getMyGameHistory = async (
  page?: number,
  limit?: number
): Promise<PaginatedGames> => {
  const url = buildUrl('/games/me/history', { page, limit });
  const response = await apiClient.get<ApiResponse<PaginatedGames>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت تاریخچه بازی‌ها');
  }
  
  return response.data.data;
};

/**
 * دریافت آمار بازی‌ها (فقط ادمین)
 */
export const getGameStatistics = async (
  fromDate?: string,
  toDate?: string
): Promise<GameStatistics> => {
  const params: Record<string, string> = {};
  if (fromDate) params.fromDate = fromDate;
  if (toDate) params.toDate = toDate;
  
  const url = buildUrl('/games/statistics', params);
  const response = await apiClient.get<ApiResponse<GameStatistics>>(url);
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت آمار');
  }
  
  return response.data.data;
};

/**
 * تغییر سطح دشواری AI (قبل از شروع بازی)
 */
export const changeAIDifficulty = async (
  gameId: string,
  difficulty: AIDifficulty
): Promise<Game> => {
  const response = await apiClient.patch<ApiResponse<Game>>(
    `/games/${gameId}/ai-difficulty`,
    { difficulty }
  );
  
  if (!response.data.data) {
    throw new Error('خطا در تغییر سطح دشواری');
  }
  
  return response.data.data;
};

/**
 * گرفتن حرکات ممکن
 */
export const getPossibleMoves = async (gameId: string): Promise<Move[]> => {
  const response = await apiClient.get<ApiResponse<Move[]>>(
    `/games/${gameId}/possible-moves`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در دریافت حرکات ممکن');
  }
  
  return response.data.data;
};

/**
 * تسلیم شدن
 */
export const surrenderGame = async (gameId: string): Promise<Game> => {
  const response = await apiClient.post<ApiResponse<Game>>(
    `/games/${gameId}/surrender`
  );
  
  if (!response.data.data) {
    throw new Error('خطا در تسلیم شدن');
  }
  
  return response.data.data;
};
