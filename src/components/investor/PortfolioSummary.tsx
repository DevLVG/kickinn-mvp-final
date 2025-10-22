interface PortfolioSummaryProps {
  summary: {
    total_invested: number;
    current_value: number;
    total_roi_percent: number;
    total_roi_amount: number;
    active_ventures_count: number;
    growing_ventures: number;
    exiting_ventures: number;
  };
}

const PortfolioSummary = ({ summary }: PortfolioSummaryProps) => {
  const isPositiveROI = summary.total_roi_amount >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {/* Total Invested */}
      <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-2xl p-6 hover:shadow-md transition-all">
        <div className="w-14 h-14 rounded-full bg-[rgba(103,159,131,0.1)] flex items-center justify-center mb-4">
          <span className="text-3xl">💰</span>
        </div>
        <div className="text-4xl font-bold text-[#194a61] mb-2">
          ${summary.total_invested.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Total Invested</div>
        <div className="text-xs text-gray-500 mt-2">
          Across {summary.active_ventures_count} ventures
        </div>
      </div>

      {/* Current Value */}
      <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-2xl p-6 hover:shadow-md transition-all">
        <div className="w-14 h-14 rounded-full bg-[rgba(35,105,138,0.1)] flex items-center justify-center mb-4">
          <span className="text-3xl">📈</span>
        </div>
        <div className="text-4xl font-bold text-[#194a61] mb-2">
          ${summary.current_value.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Current Value</div>
        <div
          className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold ${
            isPositiveROI
              ? 'bg-[rgba(16,185,129,0.1)] text-[#10b981]'
              : 'bg-[rgba(239,68,68,0.1)] text-[#ef4444]'
          }`}
        >
          <span>{isPositiveROI ? '▲' : '▼'}</span>
          {isPositiveROI ? '+' : ''}${Math.abs(summary.total_roi_amount).toLocaleString()} (
          {isPositiveROI ? '+' : ''}{summary.total_roi_percent.toFixed(1)}%)
        </div>
      </div>

      {/* Total ROI */}
      <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-2xl p-6 hover:shadow-md transition-all">
        <div className="w-14 h-14 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <div
          className={`text-4xl font-bold mb-2 ${
            isPositiveROI ? 'text-[#10b981]' : 'text-[#ef4444]'
          }`}
        >
          {isPositiveROI ? '+' : ''}{summary.total_roi_percent.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">Total ROI</div>
        <div className="text-xs text-gray-500 mt-2">Since inception</div>
      </div>

      {/* Active Ventures */}
      <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-2xl p-6 hover:shadow-md transition-all">
        <div className="w-14 h-14 rounded-full bg-[rgba(35,105,138,0.1)] flex items-center justify-center mb-4">
          <span className="text-3xl">🚀</span>
        </div>
        <div className="text-4xl font-bold text-[#194a61] mb-2">
          {summary.active_ventures_count}
        </div>
        <div className="text-sm text-gray-600">Active Ventures</div>
        <div className="text-xs text-gray-500 mt-2">
          {summary.growing_ventures} growing • {summary.exiting_ventures} exiting
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
