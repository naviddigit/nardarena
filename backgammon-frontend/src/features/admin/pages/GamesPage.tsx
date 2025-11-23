/**
 * Games Management Page
 * صفحه مدیریت بازی‌ها
 */

import { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { TextInput } from '@shared/components/atoms/Input';
import { Badge } from '@shared/components/atoms/Badge';
import type { Game, GameFilters, GameStatus, GameType } from '../../../shared/types';
import { gameService } from '../../../shared/services';

// Mock data for development
const mockGames: Game[] = [
  {
    id: '1',
    type: 'multiplayer',
    status: 'active',
    stake: 50,
    players: [
      { userId: '2', username: 'ali_player', color: 'white', ready: true },
      { userId: '3', username: 'sara_gamer', color: 'black', ready: true },
    ] as [any, any],
    spectators: ['4', '5'],
    currentPlayer: 0,
    dice: [3, 5] as [number, number],
    board: {
      points: [],
      whiteOff: 0,
      blackOff: 0,
      whiteBar: 0,
      blackBar: 0,
    },
    history: [],
    createdAt: '2025-11-23T14:00:00Z',
  },
  {
    id: '2',
    type: 'ai',
    status: 'waiting',
    stake: 20,
    players: [
      { userId: '5', username: 'mina_player', color: 'white', ready: true },
      { userId: 'ai', username: 'AI Bot', color: 'black', ready: false },
    ] as [any, any],
    spectators: [],
    currentPlayer: 0,
    dice: null,
    board: {
      points: [],
      whiteOff: 0,
      blackOff: 0,
      whiteBar: 0,
      blackBar: 0,
    },
    history: [],
    aiDifficulty: 'medium',
    createdAt: '2025-11-23T15:00:00Z',
  },
];

export const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<GameStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<GameType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch games from API
  useEffect(() => {
    fetchGames();
  }, [currentPage, filterStatus, filterType, searchQuery]);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: GameFilters = {
        page: currentPage,
        limit: 20,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        type: filterType !== 'all' ? filterType : undefined,
      };

      const response = await gameService.getGames(filters);
      setGames(response.games);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Using demo data.');
      // Fallback to mock data
      setGames(mockGames);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status badge color
  const getStatusBadge = (status: GameStatus) => {
    const colors: Record<GameStatus, 'success' | 'warning' | 'danger' | 'gray' | 'info'> = {
      waiting: 'warning',
      active: 'success',
      finished: 'info',
      cancelled: 'gray',
    };
    return colors[status];
  };

  // Get type badge color
  const getTypeBadge = (type: GameType) => {
    const colors: Record<GameType, 'info' | 'success' | 'warning'> = {
      ai: 'info',
      multiplayer: 'success',
      private: 'warning',
    };
    return colors[type];
  };

  // Format game type
  const formatType = (type: GameType): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl">
            <p className="font-medium">{error}</p>
            <button onClick={fetchGames} className="text-sm underline mt-1">
              Try again
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Games Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Monitor active games and view game history
            </p>
          </div>
        </div>

        {/* Filters Card */}
        <Card variant="elevated" size="lg">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <TextInput
                  placeholder="Search by game ID or player..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="waiting">Waiting</option>
                <option value="active">Active</option>
                <option value="finished">Finished</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                <option value="ai">AI</option>
                <option value="multiplayer">Multiplayer</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Games Table */}
        <Card variant="elevated" size="lg">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading games...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Game ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Players
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Type
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Stake
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Spectators
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Started
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {/* Game ID */}
                      <td className="py-4 px-4">
                        <p className="font-mono text-sm text-gray-900 dark:text-white">
                          {game.id.slice(0, 8)}...
                        </p>
                      </td>

                      {/* Players */}
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-gray-900 dark:text-white">{game.players[0].username}</p>
                          <p className="text-gray-600 dark:text-gray-400">vs {game.players[1].username}</p>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-4">
                        <Badge color={getTypeBadge(game.type)} size="sm">
                          {formatType(game.type)}
                        </Badge>
                      </td>

                      {/* Stake */}
                      <td className="py-4 px-4 text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {game.stake.toLocaleString()} USDT
                        </p>
                      </td>

                      {/* Spectators */}
                      <td className="py-4 px-4 text-center">
                        <p className="text-gray-900 dark:text-white">
                          {game.spectators.length}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <Badge color={getStatusBadge(game.status)} size="sm">
                          {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                        </Badge>
                      </td>

                      {/* Started */}
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(game.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {game.status === 'active' && (
                            <Button variant="primary" size="sm">
                              Watch Live
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {games.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">🎮</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">No games found</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600 dark:text-gray-400 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="outlined" size="md" className="border-2 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Games</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {games.length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-green-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Now</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {games.filter((g) => g.status === 'active').length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-orange-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Waiting</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {games.filter((g) => g.status === 'waiting').length}
              </p>
            </div>
          </Card>

          <Card variant="outlined" size="md" className="border-2 border-purple-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spectators</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {games.reduce((sum, g) => sum + g.spectators.length, 0)}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GamesPage;
