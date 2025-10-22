import { useState } from "react";

interface Venture {
  title: string;
}

interface Investment {
  token_count: number;
  token_symbol: string;
}

interface ExitEvent {
  acquirer_name: string;
  redemption_per_token: number;
  total_redemption: number;
}

interface RedemptionModalProps {
  venture: Venture;
  investment: Investment;
  exitEvent: ExitEvent;
  onClose: () => void;
}

const RedemptionModal = ({ venture, investment, exitEvent, onClose }: RedemptionModalProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    understand_burn: false,
    read_terms: false,
    confirm_proceed: false
  });

  const gasFee = 5;
  const netReceive = exitEvent.total_redemption - gasFee;

  const allChecked = checkboxes.understand_burn && checkboxes.read_terms && checkboxes.confirm_proceed;

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
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-[#10b981] mb-3">Redemption Successful!</h2>
          <p className="text-base text-gray-600 mb-4">
            ${exitEvent.total_redemption.toLocaleString()} USDT has been sent to your wallet
          </p>
          <p className="text-sm text-gray-500">Tx: 0x1234...abcd</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#ef4444] transition-colors"
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
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-3xl font-bold text-[#194a61] mb-2">Redeem Your Tokens</h2>
              <p className="text-sm text-gray-600">This venture has been acquired</p>
            </div>

            {/* Redemption Details */}
            <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-5 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Venture</span>
                  <span className="text-sm font-medium text-[#194a61]">{venture.title}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Acquired By</span>
                  <span className="text-sm font-medium text-[#194a61]">{exitEvent.acquirer_name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Your Tokens</span>
                  <span className="text-sm font-medium text-[#194a61]">
                    {investment.token_count.toLocaleString()} {investment.token_symbol}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Redemption Rate</span>
                  <span className="text-sm font-medium text-[#194a61]">${exitEvent.redemption_per_token.toFixed(2)}/token</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-[rgba(103,159,131,0.2)] pt-3">
                  <span className="text-base font-bold text-[#194a61]">Total Payout</span>
                  <span className="text-xl font-bold text-[#10b981]">${exitEvent.total_redemption.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Transaction Fee</span>
                  <span className="text-sm text-gray-600">~${gasFee} TON</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[rgba(103,159,131,0.2)] pt-2">
                  <span className="text-base font-bold text-[#194a61]">You Receive</span>
                  <span className="text-lg font-bold text-[#679f83]">${netReceive.toLocaleString()} USDT</span>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxes.understand_burn}
                  onChange={(e) => setCheckboxes({ ...checkboxes, understand_burn: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#679f83] focus:ring-[#679f83]"
                />
                <span className="text-sm text-gray-700">I understand my tokens will be burned</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxes.read_terms}
                  onChange={(e) => setCheckboxes({ ...checkboxes, read_terms: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#679f83] focus:ring-[#679f83]"
                />
                <span className="text-sm text-gray-700">I have read and agree to the exit terms and conditions</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxes.confirm_proceed}
                  onChange={(e) => setCheckboxes({ ...checkboxes, confirm_proceed: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#679f83] focus:ring-[#679f83]"
                />
                <span className="text-sm text-gray-700">I confirm the redemption details are correct</span>
              </label>
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
                  This action is irreversible. Your tokens will be burned and you'll receive USDT in your wallet. Ensure you understand the implications before proceeding.
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
                disabled={!walletConnected || !allChecked}
                className="flex-[2] bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-3 px-6 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
              >
                Confirm Redemption
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RedemptionModal;
