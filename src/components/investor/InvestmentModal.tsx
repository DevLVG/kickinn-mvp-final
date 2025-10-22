import { useState } from 'react';

interface InvestmentModalProps {
  deal: {
    id: string;
    title: string;
    tokenomics: {
      price_per_token: number;
      min_investment: number;
      max_investment: number;
    };
  };
  isKYCVerified: boolean;
  onClose: () => void;
}

const InvestmentModal = ({ deal, isKYCVerified, onClose }: InvestmentModalProps) => {
  const [amount, setAmount] = useState(deal.tokenomics.min_investment);
  const tokensToReceive = amount / deal.tokenomics.price_per_token;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-primary-dark mb-6">Choose Investment Amount</h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount (USDT)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={deal.tokenomics.min_investment}
            max={deal.tokenomics.max_investment}
            className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal"
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[1000, 5000, 10000, 25000].map(amt => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className="bg-secondary-teal/10 border border-secondary-teal text-secondary-teal px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-teal hover:text-white transition-colors"
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Token Calculator */}
        <div className="bg-accent-blue/10 border border-accent-blue p-5 rounded-xl mb-6">
          <p className="text-sm text-gray-600 mb-2">You will receive</p>
          <p className="text-4xl font-bold text-accent-blue mb-1">
            {Math.floor(tokensToReceive).toLocaleString()} tokens
          </p>
          <p className="text-sm text-gray-500">
            at ${deal.tokenomics.price_per_token} per token
          </p>
        </div>

        {/* Investment Summary */}
        <div className="border-t border-gray-200 pt-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Investment Amount</span>
            <span className="font-bold">${amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Token Price</span>
            <span className="font-bold">${deal.tokenomics.price_per_token}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tokens Received</span>
            <span className="font-bold">{Math.floor(tokensToReceive).toLocaleString()}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          disabled={!isKYCVerified || amount < deal.tokenomics.min_investment}
          className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-4 rounded-lg font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isKYCVerified ? 'Continue to Wallet Connection' : 'Complete KYC First'}
        </button>

        {!isKYCVerified && (
          <p className="text-xs text-center text-amber-600 mt-3">
            You must complete KYC verification before investing
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;
