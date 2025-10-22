import { useNavigate } from "react-router-dom";

interface Holding {
  id: string;
  venture_id: string;
  venture_title: string;
  category: string;
  status: 'active' | 'funding_failed' | 'exit_available' | 'exited';
  investment: {
    amount_usdt: number;
    date: string;
    tokens_received: number;
  };
  current: {
    token_price: number;
    price_change_24h: number;
    total_value: number;
    roi_percent: number;
    roi_amount: number;
  };
  traction?: {
    users: number;
    mrr: number;
    growth_rate: number;
    last_updated: string;
  };
  refund?: {
    available: boolean;
    amount: number;
    deadline: string;
  };
  exit?: {
    available: boolean;
    acquisition_price: number;
    buyer_name: string;
    payout_per_token: number;
    total_payout: number;
    exit_date: string;
  };
  dex_trade_url: string;
}

interface PortfolioHoldingCardProps {
  holding: Holding;
  onRefund: (holding: Holding) => void;
  onExit: (holding: Holding) => void;
}

const PortfolioHoldingCard = ({ holding, onRefund, onExit }: PortfolioHoldingCardProps) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    const statusConfig = {
      active: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', text: 'Active' },
      funding_failed: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', text: 'Refund' },
      exit_available: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', text: 'Exit' },
      exited: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', text: 'Exited' }
    };

    const config = statusConfig[holding.status];
    return (
      <div
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
        style={{ backgroundColor: config.bg, color: config.color }}
      >
        {config.text}
      </div>
    );
  };

  const getPerformanceBadge = () => {
    if (holding.status !== 'active') return null;
    
    if (holding.current.roi_percent > 50) {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#10b981] to-[#059669] shadow-md">
          🔥 Top Performer
        </div>
      );
    } else if (holding.current.roi_percent > 20) {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#3b82f6] to-[#2563eb] shadow-md">
          High ROI
        </div>
      );
    } else if (holding.current.roi_percent < -10) {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#ef4444] to-[#dc2626] shadow-md">
          📉 Underperforming
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer relative">
      {getStatusBadge()}
      {getPerformanceBadge()}

      {/* Header */}
      <div className="mb-4 pt-6">
        <h3 className="text-xl font-bold text-[#194a61] mb-2 hover:text-[#679f83] transition-colors line-clamp-1">
          {holding.venture_title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>📂</span>
          <span>{holding.category}</span>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">Invested</div>
          <div className="text-lg font-bold text-[#194a61]">${holding.investment.amount_usdt.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">Tokens</div>
          <div className="text-lg font-bold text-[#194a61]">{holding.investment.tokens_received.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">Current Value</div>
          <div className="text-lg font-bold text-[#194a61]">${holding.current.total_value.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">ROI</div>
          <div className={`text-lg font-bold ${holding.current.roi_percent >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
            {holding.current.roi_percent >= 0 ? '+' : ''}{holding.current.roi_percent.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Token Price (for active ventures) */}
      {holding.status === 'active' && (
        <div className="bg-[rgba(35,105,138,0.05)] rounded-lg p-3 mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-600">Token Price</div>
            <div className="text-base font-bold text-[#23698a]">${holding.current.token_price.toFixed(2)}</div>
          </div>
          <div className={`text-sm flex items-center gap-1 ${holding.current.price_change_24h >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
            <span className="text-xs">{holding.current.price_change_24h >= 0 ? '▲' : '▼'}</span>
            {holding.current.price_change_24h >= 0 ? '+' : ''}{holding.current.price_change_24h.toFixed(1)}%
          </div>
        </div>
      )}

      {/* Traction Metrics (for active ventures) */}
      {holding.status === 'active' && holding.traction && (
        <div className="bg-[rgba(103,159,131,0.05)] rounded-lg p-3 mb-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm mb-1">👥</div>
              <div className="text-base font-bold text-[#194a61]">{holding.traction.users.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500">Users</div>
            </div>
            <div>
              <div className="text-sm mb-1">💵</div>
              <div className="text-base font-bold text-[#194a61]">${holding.traction.mrr}K</div>
              <div className="text-[10px] text-gray-500">MRR</div>
            </div>
            <div>
              <div className="text-sm mb-1">📈</div>
              <div className="text-base font-bold text-[#10b981]">+{holding.traction.growth_rate}%</div>
              <div className="text-[10px] text-gray-500">Growth</div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Info (for failed funding) */}
      {holding.status === 'funding_failed' && holding.refund && (
        <div className="bg-[rgba(239,68,68,0.1)] border border-[#ef4444] rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-base">⚠️</span>
            <p className="text-sm text-[#991b1b]">
              Funding threshold not met. Claim your ${holding.refund.amount.toLocaleString()} refund
            </p>
          </div>
        </div>
      )}

      {/* Exit Info (for exit available) */}
      {holding.status === 'exit_available' && holding.exit && (
        <div className="bg-[rgba(245,158,11,0.1)] border border-[#f59e0b] rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-base">🎉</span>
            <p className="text-sm text-[#92400e]">
              Venture acquired! Redeem your ${holding.exit.total_payout.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Last Update (for active) */}
      {holding.status === 'active' && holding.traction && (
        <div className="text-xs text-gray-500 mb-4">Updated {holding.traction.last_updated}</div>
      )}

      {/* Exit Summary (for exited) */}
      {holding.status === 'exited' && holding.exit && (
        <div className="text-xs text-gray-600 mb-4">
          Exited on {holding.exit.exit_date} for ${holding.exit.total_payout.toLocaleString()}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {holding.status === 'active' && (
          <>
            <button
              onClick={() => navigate(`/portfolio/${holding.venture_id}`)}
              className="flex-1 border-2 border-[#679f83] text-[#679f83] py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#679f83] hover:text-white transition-all"
            >
              <span className="text-sm">👁️</span>
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(holding.dex_trade_url, '_blank');
              }}
              className="flex-1 bg-gradient-to-r from-[#679f83] to-[#23698a] text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all"
            >
              <span className="text-sm">💱</span>
              Trade on DEX
            </button>
          </>
        )}

        {holding.status === 'funding_failed' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRefund(holding);
            }}
            className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all"
          >
            <span className="text-base">💸</span>
            Claim Refund
          </button>
        )}

        {holding.status === 'exit_available' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExit(holding);
            }}
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all"
          >
            <span className="text-base">💰</span>
            Redeem Tokens
          </button>
        )}

        {holding.status === 'exited' && (
          <button
            onClick={() => navigate(`/portfolio/${holding.venture_id}`)}
            className="w-full bg-[rgba(107,114,128,0.1)] text-gray-700 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[rgba(107,114,128,0.2)] transition-all"
          >
            <span className="text-sm">📊</span>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioHoldingCard;
