/**
 * Transactions Management Page
 * صفحه مدیریت تراکنش‌های مالی
 */

import { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { TextInput } from '@shared/components/atoms/Input';
import { Badge } from '@shared/components/atoms/Badge';
import type { Transaction, TransactionFilters, TransactionType, TransactionStatus } from '../../../shared/types';
import { transactionService } from '../../../shared/services';

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '2',
    username: 'ali_player',
    type: 'deposit',
    amount: 100,
    status: 'pending',
    method: 'usdt-trc20',
    txHash: '0xabcd1234...',
    network: 'tron',
    createdAt: '2025-11-23T10:00:00Z',
    updatedAt: '2025-11-23T10:00:00Z',
  },
  {
    id: '2',
    userId: '3',
    username: 'sara_gamer',
    type: 'withdraw',
    amount: 50,
    status: 'completed',
    method: 'usdt-bep20',
    txHash: '0xef567890...',
    network: 'bnb',
    createdAt: '2025-11-22T15:30:00Z',
    updatedAt: '2025-11-22T16:00:00Z',
  },
  {
    id: '3',
    userId: '5',
    username: 'mina_player',
    type: 'game_win',
    amount: 200,
    status: 'completed',
    createdAt: '2025-11-21T18:45:00Z',
    updatedAt: '2025-11-21T18:45:00Z',
  },
];

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions from API
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filterType, filterStatus, searchQuery]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: TransactionFilters = {
        page: currentPage,
        limit: 20,
        search: searchQuery || undefined,
        type: filterType !== 'all' ? filterType : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
      };

      const response = await transactionService.getTransactions(filters);
      setTransactions(response.transactions);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Using demo data.');
      // Fallback to mock data
      setTransactions(mockTransactions);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle approve deposit
  const handleApproveDeposit = async (txId: string) => {
    try {
      await transactionService.approveDeposit(txId);
      fetchTransactions(); // Refresh list
      // TODO: Show success toast
    } catch (err) {
      console.error('Error approving deposit:', err);
      // TODO: Show error toast
    }
  };

  // Handle reject transaction
  const handleRejectTransaction = async (txId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      await transactionService.rejectTransaction(txId, reason);
      fetchTransactions(); // Refresh list
      // TODO: Show success toast
    } catch (err) {
      console.error('Error rejecting transaction:', err);
      // TODO: Show error toast
    }
  };

  // Handle process withdrawal
  const handleProcessWithdrawal = async (txId: string) => {
    const txHash = prompt('Enter transaction hash from blockchain:');
    if (!txHash) return;

    try {
      await transactionService.processWithdrawal(txId, txHash);
      fetchTransactions(); // Refresh list
      // TODO: Show success toast
    } catch (err) {
      console.error('Error processing withdrawal:', err);
      // TODO: Show error toast
    }
  };

  // Get status badge color
  const getStatusBadge = (status: TransactionStatus) => {
    const colors: Record<TransactionStatus, 'success' | 'warning' | 'danger' | 'gray'> = {
      completed: 'success',
      pending: 'warning',
      failed: 'danger',
      cancelled: 'gray',
    };
    return colors[status];
  };

  // Get type badge color
  const getTypeBadge = (type: TransactionType) => {
    const colors: Record<TransactionType, 'success' | 'danger' | 'info' | 'warning' | 'gray'> = {
      deposit: 'success',
      withdraw: 'danger',
      game_win: 'info',
      game_loss: 'warning',
      spectator_fee: 'gray',
      refund: 'info',
    };
    return colors[type];
  };

  // Format type name
  const formatType = (type: TransactionType): string => {
    return type.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl">
            <p className="font-medium">{error}</p>
            <button onClick={fetchTransactions} className="text-sm underline mt-1">
              Try again
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage deposits, withdrawals and game transactions
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
                  placeholder="Search by TX hash or user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="game_win">Game Win</option>
                <option value="game_loss">Game Loss</option>
                <option value="spectator_fee">Spectator Fee</option>
                <option value="refund">Refund</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card variant="elevated" size="lg">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading transactions...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      ID / Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Type
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Method
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {/* ID / Date */}
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-mono text-sm text-gray-900 dark:text-white">
                            {tx.id.slice(0, 8)}...
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>

                      {/* User */}
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900 dark:text-white">{tx.username || 'N/A'}</p>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-4">
                        <Badge color={getTypeBadge(tx.type)} size="sm">
                          {formatType(tx.type)}
                        </Badge>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {tx.amount.toLocaleString()} USDT
                        </p>
                      </td>

                      {/* Method */}
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tx.method ? tx.method.toUpperCase() : '-'}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <Badge color={getStatusBadge(tx.status)} size="sm">
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {tx.status === 'pending' && tx.type === 'deposit' && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleApproveDeposit(tx.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectTransaction(tx.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {tx.status === 'pending' && tx.type === 'withdraw' && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleProcessWithdrawal(tx.id)}
                              >
                                Process
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectTransaction(tx.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {tx.txHash && (
                            <a
                              href={tx.network === 'tron' 
                                ? `https://tronscan.org/#/transaction/${tx.txHash}`
                                : `https://bscscan.com/tx/${tx.txHash}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 text-sm underline"
                            >
                              View TX
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">📊</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">No transactions found</p>
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
      </div>
    </AdminLayout>
  );
};

export default TransactionsPage;
