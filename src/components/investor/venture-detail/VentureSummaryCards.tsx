interface Investment {
  token_count: number;
  token_symbol: string;
  allocation_percent: number;
  invested_amount: number;
  entry_price: number;
  current_price: number;
  current_value: number;
  roi_percent: number;
  roi_amount: number;
  price_change_24h: number;
}

interface Dex {
  dex_url: string;
}

interface VentureSummaryCardsProps {
  investment: Investment;
  dex: Dex;
}

const VentureSummaryCards = ({ investment, dex }: VentureSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Token Holdings */}
      <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative">
        <div className="absolute top-5 right-5 text-2xl opacity-30">🪙</div>
        <div className="text-xs text-gray-500 uppercase mb-2">Token Holdings</div>
        <div className="text-3xl font-bold text-[#194a61] mb-1">
          {investment.token_count.toLocaleString()} {investment.token_symbol}
        </div>
        <div className="text-xs text-gray-500">Your allocation: {investment.allocation_percent.toFixed(2)}%</div>
      </div>

      {/* Current Value */}
      <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative">
        <div className="absolute top-5 right-5 text-2xl opacity-30">💰</div>
        <div className="text-xs text-gray-500 uppercase mb-2">Current Value</div>
        <div className="text-3xl font-bold text-[#194a61] mb-1">
          ${investment.current_value.toLocaleString()}
        </div>
        <div className={`text-sm ${investment.roi_amount >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          {investment.roi_amount >= 0 ? '↑' : '↓'} ${Math.abs(investment.roi_amount).toLocaleString()} (
          {investment.roi_amount >= 0 ? '+' : ''}{investment.roi_percent.toFixed(1)}%)
        </div>
        <div className="text-xs text-gray-500 mt-1">vs. entry price</div>
      </div>

      {/* ROI */}
      <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative">
        <div className="absolute top-5 right-5 text-2xl opacity-30">
          {investment.roi_percent >= 0 ? '📈' : '📉'}
        </div>
        <div className="text-xs text-gray-500 uppercase mb-2">Return on Investment</div>
        <div className={`text-3xl font-bold mb-1 ${investment.roi_percent >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          {investment.roi_percent >= 0 ? '+' : ''}{investment.roi_percent.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Invested: ${investment.invested_amount.toLocaleString()}
        </div>
        <div className={`text-xs mt-1 ${investment.roi_amount >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          {investment.roi_amount >= 0 ? 'Profit' : 'Loss'}: ${Math.abs(investment.roi_amount).toLocaleString()}
        </div>
      </div>

      {/* Token Price */}
      <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative">
        <div className="absolute top-5 right-5 text-2xl opacity-30">💱</div>
        <div className="text-xs text-gray-500 uppercase mb-2">Current Token Price</div>
        <div className="text-3xl font-bold text-[#194a61] mb-1">
          ${investment.current_price.toFixed(2)}
        </div>
        <div className={`text-sm ${investment.price_change_24h >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          24h: {investment.price_change_24h >= 0 ? '+' : ''}{investment.price_change_24h.toFixed(1)}%
        </div>
        <div className="text-xs text-gray-500 mt-1">Entry: ${investment.entry_price.toFixed(2)}</div>
        <a
          href={dex.dex_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#679f83] hover:underline mt-2 inline-block"
        >
          View on STON.fi →
        </a>
      </div>
    </div>
  );
};

export default VentureSummaryCards;
