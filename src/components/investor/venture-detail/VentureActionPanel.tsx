interface Venture {
  status: string;
}

interface Liquidity {
  exit_event: {
    is_active: boolean;
    total_redemption: number;
  };
}

interface VentureActionPanelProps {
  venture: Venture;
  liquidity: Liquidity;
  dexUrl: string;
  onTrade: () => void;
  onRedeem: () => void;
  onRefund: () => void;
}

const VentureActionPanel = ({ venture, liquidity, onTrade, onRedeem, onRefund }: VentureActionPanelProps) => {
  const getInfoMessage = () => {
    if (venture.status === 'funding_failed') {
      return 'Funding threshold was not met. You are eligible for a full refund.';
    }
    if (liquidity.exit_event.is_active) {
      return 'Acquisition offer available. Redeem before deadline.';
    }
    if (venture.status === 'live') {
      return 'Venture is live and generating revenue. Track performance above.';
    }
    return 'MVP development in progress. Traction data updates weekly.';
  };

  return (
    <div className="sticky top-6 w-80 bg-white rounded-xl p-6 shadow-lg border border-[rgba(103,159,131,0.2)]">
      <h3 className="text-lg font-bold text-[#194a61] mb-4">Quick Actions</h3>

      <div className="space-y-3">
        {/* Trade Button */}
        <button
          onClick={onTrade}
          className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] text-white px-5 py-3 rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-90 transition-all"
        >
          <span className="text-base">🔄</span>
          Trade on DEX
        </button>

        {/* Redeem Button (if exit active) */}
        {liquidity.exit_event.is_active && (
          <button
            onClick={onRedeem}
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white px-5 py-3 rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-90 transition-all"
          >
            <span className="text-base">💰</span>
            Redeem for ${liquidity.exit_event.total_redemption.toLocaleString()}
          </button>
        )}

        {/* Refund Button (if funding failed) */}
        {venture.status === 'funding_failed' && (
          <button
            onClick={onRefund}
            className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white px-5 py-3 rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-90 transition-all"
          >
            <span className="text-base">↩️</span>
            Request Refund
          </button>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-[rgba(103,159,131,0.1)] rounded-lg p-4 mt-4">
        <div className="flex items-start gap-2">
          <span className="text-sm">ℹ️</span>
          <p className="text-xs text-gray-700 leading-relaxed">{getInfoMessage()}</p>
        </div>
      </div>
    </div>
  );
};

export default VentureActionPanel;
