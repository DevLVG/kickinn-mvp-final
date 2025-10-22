import { useState } from "react";

interface Holding {
  id: string;
  venture_title: string;
  investment: {
    amount_usdt: number;
    tokens_received: number;
  };
  refund?: {
    amount: number;
  };
}

interface RefundModalProps {
  holding: Holding;
  onClose: () => void;
}

const RefundModal = ({ holding, onClose }: RefundModalProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnect = () => {
    // Mock wallet connection
    setTimeout(() => setWalletConnected(true), 500);
  };

  const handleConfirm = () => {
    setProcessing(true);
    // Mock refund processing
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
          <h2 className="text-2xl font-bold text-[#10b981] mb-3">Refund Successful!</h2>
          <p className="text-base text-gray-600 mb-4">
            ${holding.refund?.amount.toLocaleString()} USDT has been sent to your wallet
          </p>
          <p className="text-sm text-gray-500">Tx: 0x1234...5678</p>
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
            <h3 className="text-xl font-bold text-[#194a61] mb-2">Processing refund...</h3>
            <p className="text-sm text-gray-600">Please confirm in your wallet</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-[#194a61] mb-2">Claim Your Refund</h2>
              <p className="text-sm text-gray-600">Funding threshold was not met for this venture</p>
            </div>

            {/* Refund Details */}
            <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-5 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Venture</span>
                  <span className="text-sm font-medium text-[#194a61]">{holding.venture_title}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Your Investment</span>
                  <span className="text-sm font-medium text-[#194a61]">${holding.investment.amount_usdt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Tokens to Return</span>
                  <span className="text-sm font-medium text-[#194a61]">{holding.investment.tokens_received.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-[rgba(239,68,68,0.2)] pt-3">
                  <span className="text-base font-bold text-[#194a61]">Refund Amount</span>
                  <span className="text-xl font-bold text-[#194a61]">${holding.refund?.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="border-l-2 border-[#ef4444] pl-4 mb-6">
              <div className="mb-3 text-sm text-gray-700">1. Connect your wallet</div>
              <div className="mb-3 text-sm text-gray-700">2. Return {holding.investment.tokens_received.toLocaleString()} tokens to smart contract</div>
              <div className="text-sm text-gray-700">3. Receive ${holding.refund?.amount.toLocaleString()} USDT to your wallet</div>
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
                  This action is irreversible. Ensure you understand the refund process before proceeding.
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
                className="flex-2 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white py-3 px-6 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
              >
                Claim Refund
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RefundModal;
