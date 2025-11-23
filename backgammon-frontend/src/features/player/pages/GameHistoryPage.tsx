/**
 * Game History Page - صفحه تاریخچه بازی‌ها
 * Clean Architecture - Single Responsibility
 */

import React, { useState } from 'react';
import { FiClock, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { Badge } from '@shared/components/atoms/Badge';
import { PageLayout } from '@shared/components/templates/PageLayout';
import { ContentSection } from '@shared/components/templates/ContentSection';

interface GameRecord {
  id: number;
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  stake: number;
  profit: number;
  duration: string;
  gameMode: string;
}

const MOCK_GAMES: GameRecord[] = [];

const FILTERS = [
  { id: 'all', label: 'All Games' },
  { id: 'win', label: 'Wins' },
  { id: 'loss', label: 'Losses' },
  { id: 'draw', label: 'Draws' },
] as const;

export const GameHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'win' | 'loss' | 'draw'>('all');
  
  const filteredGames = MOCK_GAMES.filter(game => 
    filter === 'all' ? true : game.result === filter
  );

  const stats = {
    totalGames: MOCK_GAMES.length,
    wins: MOCK_GAMES.filter(g => g.result === 'win').length,
    losses: MOCK_GAMES.filter(g => g.result === 'loss').length,
    draws: MOCK_GAMES.filter(g => g.result === 'draw').length,
    totalProfit: MOCK_GAMES.reduce((sum, g) => sum + g.profit, 0),
  };

  const winRate = stats.totalGames > 0 
    ? ((stats.wins / stats.totalGames) * 100).toFixed(1)
    : '0.0';

  const STAT_CARDS = [
    { label: 'Total Games', value: stats.totalGames, color: 'purple' },
    { label: 'Wins', value: stats.wins, color: 'success' },
    { label: 'Losses', value: stats.losses, color: 'danger' },
    { label: 'Win Rate', value: `${winRate}%`, color: 'warning' },
    { 
      label: 'Total Profit', 
      value: `${stats.totalProfit >= 0 ? '+' : ''}₮${stats.totalProfit.toLocaleString()}`,
      color: stats.totalProfit >= 0 ? 'success' : 'danger' 
    },
  ];

  return (
    <PageLayout title="Game History" maxWidth="6xl">
      <ContentSection className="space-y-6 pt-4 pb-24">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STAT_CARDS.map((stat, index) => (
            <Card key={index}>
              <div className="p-4 text-center">
                <div className={`text-2xl font-bold text-${stat.color}-500`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filter Buttons */}
        <Card>
          <div className="p-4 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter:</span>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant={filter === filterOption.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.id as typeof filter)}
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Games Table */}
        <Card>
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-bold mb-6">Recent Games</h3>
            
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <FiClock className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">No games played yet</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  Start playing to see your game history here
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/dashboard')}
                  className="mt-6"
                >
                  Start Playing
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Opponent</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Mode</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Result</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Stake</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Profit/Loss</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGames.map((game) => (
                      <tr
                        key={game.id}
                        className="border-b border-border-color hover:bg-surface transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-text-primary">{game.date}</td>
                        <td className="py-4 px-4 text-sm text-text-primary">{game.opponent}</td>
                        <td className="py-4 px-4 text-sm text-text-secondary">{game.gameMode}</td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="solid"
                            color={
                              game.result === 'win' 
                                ? 'success' 
                                : game.result === 'loss' 
                                ? 'danger' 
                                : 'warning'
                            }
                          >
                            {game.result.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-right text-text-primary">
                          ₮ {game.stake.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-right">
                          <span className={`flex items-center justify-end gap-1 ${
                            game.profit > 0 
                              ? 'text-success-500' 
                              : game.profit < 0
                              ? 'text-danger-500'
                              : 'text-text-secondary'
                          }`}>
                            {game.profit > 0 ? <FiTrendingUp /> : game.profit < 0 ? <FiTrendingDown /> : null}
                            {game.profit >= 0 ? '+' : ''}₮ {game.profit.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-right text-text-secondary">{game.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </ContentSection>
    </PageLayout>
  );
};

export default GameHistoryPage;
