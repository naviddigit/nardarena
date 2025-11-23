/**
 * Deposit Page - صفحه واریز
 * Clean Architecture - Single Responsibility
 */

import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCheck, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { Input } from '@shared/components/atoms/Input';
import { PageLayout } from '@shared/components/templates/PageLayout';
import { ContentSection } from '@shared/components/templates/ContentSection';
import { transactionService } from '../../../shared/services';
import type { DepositAddress } from '../../../shared/types';

const PAYMENT_METHODS = [
  {
    id: 'usdt-tron',
    name: 'USDT (TRC20)',
    icon: FiDollarSign,
    minAmount: 10,
    maxAmount: 100000,
    processingTime: '5-10 minutes',
    network: 'Tron Network',
  },
  {
    id: 'usdt-bnb',
    name: 'USDT (BEP20)',
    icon: FiDollarSign,
    minAmount: 10,
    maxAmount: 100000,
    processingTime: '5-10 minutes',
    network: 'BNB Chain',
  },
];

const QUICK_AMOUNTS = [10, 50, 100, 500];

export const DepositPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('usdt-tron');
  const [amount, setAmount] = useState('');
  const [depositAddress, setDepositAddress] = useState<DepositAddress | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const currentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod);

  // Fetch deposit address when method changes
  useEffect(() => {
    if (selectedMethod) {
      fetchDepositAddress();
    }
  }, [selectedMethod]);

  const fetchDepositAddress = async () => {
    try {
      setIsLoadingAddress(true);
      const network = selectedMethod === 'usdt-tron' ? 'tron' : 'bnb';
      const address = await transactionService.getDepositAddress(network);
      setDepositAddress(address);
    } catch (err) {
      console.error('Error fetching deposit address:', err);
      // TODO: Show error toast
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleCopyAddress = async () => {
    if (depositAddress?.address) {
      await navigator.clipboard.writeText(depositAddress.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmitDeposit = async () => {
    if (!amount || !txHash) {
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (!currentMethod || parsedAmount < currentMethod.minAmount || parsedAmount > currentMethod.maxAmount) {
      return;
    }

    try {
      setIsSubmitting(true);
      await transactionService.createDepositRequest({
        amount: parsedAmount,
        method: selectedMethod === 'usdt-tron' ? 'usdt-trc20' : 'usdt-bep20',
        txHash: txHash,
      });
      
      setShowSuccess(true);
      setAmount('');
      setTxHash('');
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting deposit:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Deposit Funds" maxWidth="4xl">
      <ContentSection className="space-y-6 pt-4 pb-24">
        {/* Current Balance */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 mb-2 text-sm">Current Balance</p>
              <h2 className="text-3xl sm:text-4xl font-bold">$ 0</h2>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <Card>
          <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>
          <div className="grid grid-cols-1 gap-4">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-300/30 dark:border-white/10 hover:border-purple-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <FiCheck className="text-white text-sm" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="text-2xl text-purple-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{method.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{method.processingTime}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p className="text-xs text-gray-500 dark:text-gray-500">{method.network}</p>
                    <p>Min: ${method.minAmount.toLocaleString()}</p>
                    <p>Max: ${method.maxAmount.toLocaleString()}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Deposit Address */}
        {selectedMethod && (
          <Card>
            <h3 className="text-xl font-bold mb-6">Deposit Address</h3>
            
            {isLoadingAddress ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : depositAddress ? (
              <div className="space-y-6">
                {/* Address Display */}
                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {currentMethod?.network} Address
                  </p>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 text-sm font-mono break-all text-gray-900 dark:text-white">
                      {depositAddress.address}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="flex-shrink-0"
                    >
                      {copied ? <FiCheckCircle className="text-green-500" /> : <FiCopy />}
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                {depositAddress.qrCode && (
                  <div className="flex justify-center py-4">
                    <img 
                      src={depositAddress.qrCode} 
                      alt="Deposit QR Code" 
                      className="w-48 h-48 rounded-xl bg-white p-4"
                    />
                  </div>
                )}

                {/* Warning */}
                <div className="p-4 bg-warning-500/10 border border-warning-500/30 rounded-xl">
                  <p className="text-sm text-warning-600 dark:text-warning-400">
                    ⚠️ Only send {currentMethod?.name} to this address. Sending other coins may result in permanent loss.
                  </p>
                </div>

                {/* Amount Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Deposit Amount (USDT)</label>
                    <Input
                      type="number"
                      placeholder={`Min: ${currentMethod?.minAmount} USDT`}
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
                        >
                          {quickAmount} USDT
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transaction Hash Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Transaction Hash <span className="text-danger-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter your transaction hash after sending"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    You'll receive this after completing the transaction in your wallet
                  </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div className="p-4 bg-success-500/10 border border-success-500/30 rounded-xl">
                    <div className="flex items-center gap-3 text-success-600 dark:text-success-400">
                      <FiCheckCircle className="text-xl" />
                      <p className="text-sm font-medium">
                        Deposit request submitted! We'll credit your account once confirmed on blockchain.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  variant="gradient"
                  onClick={handleSubmitDeposit}
                  disabled={
                    !amount || 
                    !txHash ||
                    isSubmitting ||
                    (currentMethod && parseFloat(amount) < currentMethod.minAmount)
                  }
                  fullWidth
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Deposit'}
                </Button>

                {/* Validation Messages */}
                {amount && currentMethod && parseFloat(amount) < currentMethod.minAmount && (
                  <p className="text-sm text-danger-500 text-center">
                    Minimum deposit is {currentMethod.minAmount} USDT
                  </p>
                )}

                {/* Instructions */}
                <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                  <h4 className="font-semibold mb-3">How to Deposit:</h4>
                  <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>1. Copy the deposit address above</li>
                    <li>2. Open your crypto wallet (Binance, Trust Wallet, etc.)</li>
                    <li>3. Select Send → USDT → {currentMethod?.network}</li>
                    <li>4. Paste the address and enter amount</li>
                    <li>5. Confirm and send the transaction</li>
                    <li>6. Copy the transaction hash from your wallet</li>
                    <li>7. Paste it above and click Submit</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Failed to load deposit address. Please try again.
              </div>
            )}
          </Card>
        )}
      </ContentSection>
    </PageLayout>
  );
};

export default DepositPage;
