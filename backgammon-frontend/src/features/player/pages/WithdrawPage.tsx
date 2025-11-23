/**
 * Withdraw Page - صفحه برداشت
 * Clean Architecture - Single Responsibility
 */

import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { Input } from '@shared/components/atoms/Input';
import { PageLayout } from '@shared/components/templates/PageLayout';
import { ContentSection } from '@shared/components/templates/ContentSection';
import { transactionService } from '../../../shared/services';
import type { Transaction } from '../../../shared/types';

const WITHDRAW_CONFIG = {
  min: 10,
  max: 100000,
  processingTime: '1-24 hours',
  fee: 1,
};

const NETWORKS = [
  {
    id: 'usdt-trc20',
    name: 'USDT (TRC20)',
    network: 'Tron Network',
    fee: 1,
  },
  {
    id: 'usdt-bep20',
    name: 'USDT (BEP20)',
    network: 'BNB Chain',
    fee: 1,
  },
];

const QUICK_AMOUNTS = [10, 50, 100, 500];
const CURRENT_BALANCE = 0;

export const WithdrawPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('usdt-trc20');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Transaction[]>([]);
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  const currentNetwork = NETWORKS.find(n => n.id === selectedNetwork);

  useEffect(() => {
    fetchPendingWithdrawals();
  }, []);

  const fetchPendingWithdrawals = async () => {
    try {
      setIsLoadingPending(true);
      const result = await transactionService.getMyTransactions({
        type: 'withdraw',
        status: 'pending',
        page: 1,
        limit: 10,
      });
      setPendingWithdrawals(result.transactions);
    } catch (err) {
      console.error('Error fetching pending withdrawals:', err);
    } finally {
      setIsLoadingPending(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || !walletAddress) {
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount < WITHDRAW_CONFIG.min || parsedAmount > WITHDRAW_CONFIG.max) {
      return;
    }

    if (parsedAmount > CURRENT_BALANCE) {
      return;
    }

    try {
      setIsSubmitting(true);
      await transactionService.createWithdrawRequest({
        amount: parsedAmount,
        method: selectedNetwork as any,
        walletAddress: walletAddress,
      });

      setShowSuccess(true);
      setAmount('');
      setWalletAddress('');
      fetchPendingWithdrawals();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Error creating withdrawal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = amount && 
    walletAddress && 
    parseFloat(amount) >= WITHDRAW_CONFIG.min &&
    parseFloat(amount) <= CURRENT_BALANCE;

  return (
    <PageLayout title="Withdraw Funds" maxWidth="4xl">
      <ContentSection className="space-y-6 pt-4 pb-24">
        {/* Balance Card */}
        <Card>
          <div className="p-6 sm:p-8 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-2 text-sm">Available Balance</p>
                <h2 className="text-3xl sm:text-4xl font-bold">$ {CURRENT_BALANCE.toLocaleString()}</h2>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card>
          <div className="p-6 bg-warning-500/10 border border-warning-500/30 rounded-xl">
            <div className="flex gap-4">
              <FiAlertCircle className="text-warning-500 text-2xl flex-shrink-0 mt-1" />
              <div className="space-y-2 text-sm text-text-primary">
                <p className="font-semibold">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Minimum withdrawal: ${WITHDRAW_CONFIG.min.toLocaleString()} USDT</li>
                  <li>Maximum withdrawal: ${WITHDRAW_CONFIG.max.toLocaleString()} USDT</li>
                  <li>Network fee: ${WITHDRAW_CONFIG.fee} USDT</li>
                  <li>Processing time: {WITHDRAW_CONFIG.processingTime}</li>
                  <li>Double-check wallet address - transactions cannot be reversed</li>
                  <li>Only send to {currentNetwork?.name} compatible addresses</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-4 bg-success-500/10 border border-success-500/30 rounded-xl">
            <div className="flex items-center gap-3 text-success-600 dark:text-success-400">
              <FiCheckCircle className="text-xl" />
              <p className="text-sm font-medium">
                Withdrawal request submitted! Your funds will be processed within {WITHDRAW_CONFIG.processingTime}.
              </p>
            </div>
          </div>
        )}

        {/* Network Selection */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Select Network</h3>
          <div className="grid grid-cols-1 gap-4">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetwork === network.id;
              return (
                <button
                  key={network.id}
                  onClick={() => setSelectedNetwork(network.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-300/30 dark:border-white/10 hover:border-green-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="text-white text-sm" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-2">
                    <FiDollarSign className="text-2xl text-green-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{network.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{network.network}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Network Fee: ${network.fee} USDT</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Wallet Address */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Withdrawal Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Wallet Address <span className="text-danger-500">*</span>
              </label>
              <Input
                placeholder={`Enter your ${currentNetwork?.name} wallet address`}
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                ⚠️ Make sure this address supports {currentNetwork?.network}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Amount <span className="text-danger-500">*</span>
              </label>
              <Input
                type="number"
                placeholder={`Min: ${WITHDRAW_CONFIG.min} USDT`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                leftIcon={<FiDollarSign />}
              />
            </div>

            {/* Quick Amounts */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick Select</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {QUICK_AMOUNTS.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    disabled={quickAmount > CURRENT_BALANCE}
                  >
                    {quickAmount} USDT
                  </Button>
                ))}
              </div>
            </div>

            {/* Amount Summary */}
            {amount && (
              <div className="p-4 rounded-xl bg-success-500/10 border border-success-500/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Withdrawal Amount:</span>
                    <span className="font-semibold text-text-primary">${parseFloat(amount).toLocaleString()} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Network Fee:</span>
                    <span className="font-semibold text-text-primary">${currentNetwork?.fee} USDT</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-success-500/20">
                    <span className="text-text-primary font-bold">You will receive:</span>
                    <span className="font-bold text-success-500">
                      ${(parseFloat(amount) - (currentNetwork?.fee || 0)).toLocaleString()} USDT
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-text-secondary">Remaining Balance:</span>
                    <span className="font-semibold text-text-primary">
                      ${(CURRENT_BALANCE - parseFloat(amount)).toLocaleString()} USDT
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              variant="gradient"
              onClick={handleWithdraw}
              disabled={!isValid || isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
            </Button>

            {/* Validation Messages */}
            {amount && (
              <div className="space-y-2">
                {parseFloat(amount) < WITHDRAW_CONFIG.min && (
                  <p className="text-sm text-danger-500 text-center">
                    Minimum withdrawal is ${WITHDRAW_CONFIG.min.toLocaleString()} USDT
                  </p>
                )}
                {parseFloat(amount) > CURRENT_BALANCE && (
                  <p className="text-sm text-danger-500 text-center">Insufficient balance</p>
                )}
                {parseFloat(amount) > WITHDRAW_CONFIG.max && (
                  <p className="text-sm text-danger-500 text-center">
                    Maximum withdrawal is ${WITHDRAW_CONFIG.max.toLocaleString()} USDT
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Pending Withdrawals */}
        {!isLoadingPending && pendingWithdrawals.length > 0 && (
          <Card>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6">Pending Withdrawals</h3>
              <div className="space-y-3">
                {pendingWithdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="p-4 rounded-xl bg-warning-500/10 border border-warning-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-warning-500" />
                        <span className="font-semibold text-text-primary">
                          ${withdrawal.amount.toLocaleString()} USDT
                        </span>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-warning-500/20 text-warning-600 dark:text-warning-400">
                        Pending
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p>Method: {withdrawal.method}</p>
                      <p>Date: {new Date(withdrawal.createdAt).toLocaleString()}</p>
                      {withdrawal.txHash && (
                        <p className="font-mono break-all">TX: {withdrawal.txHash}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <div className="p-6 sm:p-8">
            <h4 className="font-semibold mb-3">Withdrawal Process:</h4>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>1. Select your preferred network (TRC20 or BEP20)</li>
              <li>2. Enter your wallet address carefully</li>
              <li>3. Choose withdrawal amount</li>
              <li>4. Submit request for admin review</li>
              <li>5. Your withdrawal will be processed within {WITHDRAW_CONFIG.processingTime}</li>
              <li>6. Track transaction status in your transaction history</li>
            </ol>
          </div>
        </Card>
      </ContentSection>
    </PageLayout>
  );
};

export default WithdrawPage;
