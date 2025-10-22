import { useState } from "react";

interface Holding {
  id: string;
  venture_title: string;
  investment: {
    tokens_received: number;
  };
  exit?: {
    acquisition_price: number;
    buyer_name: string;
    total_payout: number;
  };
  current: {
    roi_percent: number;
  };
}

interface ExitModalProps {
  holding: Holding;
  onClose: () => void;
}

const ExitModal = ({ holding, onClose }: ExitModalProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnect = () => {
    setTimeout(() => setWalletConnected(true), 500);
  };

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(onClose, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[#10b981] mb-3">Redemption Successful!</h2>
          <p className="text-base text-gray-600 mb-4">
            ${holding.exit?.total_payout.toLocaleString()} USDT has been sent to your wallet
          </p>
          <p className="text-sm text-gray-500">Tx: 0xAbCd...7890</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#ef4444]"
        >
          ✕
        </button>

        {processing ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#679f83] mb-4"></div>
            <h3 className="text-xl font-bold text-[#194a61] mb-2">Processing redemption...</h3>
            <p className="text-sm text-gray-600">Please confirm in your wallet</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-[#194a61] mb-2">Redeem Your Tokens</h2>
              <p className="text-sm text-gray-600">This venture has been acquired</p>
            </div>

            {/* Exit Details */}
            <div className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-xl p-5 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Venture</span>
                  <span className="text-sm font-medium text-[#194a61]">{holding.venture_title}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Acquired By</span>
                  <span className="text-sm font-medium text-[#194a61]">{holding.exit?.buyer_name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Acquisition Price</span>
                  <span className="text-sm font-medium text-[#194a61]">${holding.exit?.acquisition_price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Your Tokens</span>
                  <span className="text-sm font-medium text-[#194a61]">{holding.investment.tokens_received.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-[rgba(245,158,11,0.2)] pt-3">
                  <span className="text-base font-bold text-[#194a61]">Your Payout</span>
                  <span className="text-xl font-bold text-[#10b981]">${holding.exit?.total_payout.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">ROI</span>
                  <span className="text-base font-bold text-[#10b981]">+{holding.current.roi_percent.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="border-l-2 border-[#f59e0b] pl-4 mb-6">
              <div className="mb-3 text-sm text-gray-700">1. Connect your wallet</div>
              <div className="mb-3 text-sm text-gray-700">2. Return {holding.investment.tokens_received.toLocaleString()} tokens to acquisition contract</div>
              <div className="text-sm text-gray-700">3. Receive ${holding.exit?.total_payout.toLocaleString()} USDT payout</div>
            </div>

            {/* Wallet Connection */}
            {walletConnected ? (
              <div className="bg-[rgba(16,185,129,0.1)] border border-[#10b981] rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✅</span>
                  <span className="font-bold text-base text-[#059669]">Wallet Connected</span>
                </div>
                <p className="text-sm text-gray-600 font-mono">0xAbCd...1234</p>
                <p className="text-sm text-gray-600 mt-1">Balance: 15,250 USDT</p>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="w-full bg-[#679f83] text-white py-3 rounded-lg font-bold mb-6 hover:shadow-md transition-all"
              >
                Connect Wallet
              </button>
            )}

            {/* Warning */}
            <div className="bg-[rgba(245,158,11,0.1)] border border-[#f59e0b] rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <p className="text-sm text-[#92400e]">
                  This action is irreversible. Tokens will be burned and payout sent to your wallet.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!walletConnected}
                className="flex-2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white py-3 px-6 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
              >
                Redeem Tokens
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitModal;
