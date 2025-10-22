interface DealFundingProgressProps {
  current: number;
  target: number;
  investorsCount: number;
  deadlineHours: number;
  thresholdPercent: number;
}

const DealFundingProgress = ({
  current,
  target,
  investorsCount,
  deadlineHours,
  thresholdPercent
}: DealFundingProgressProps) => {
  const fundingPercent = (current / target) * 100;
  const isUrgent = deadlineHours < 48;
  const thresholdMet = fundingPercent >= thresholdPercent;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${fundingPercent}%`,
            background: 'linear-gradient(90deg, #679f83, #23698a)',
            boxShadow: '0 2px 8px rgba(103, 159, 131, 0.3)'
          }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Raised</p>
          <p className="text-2xl font-bold text-primary-dark">
            ${(current / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Target</p>
          <p className="text-2xl font-bold text-primary-dark">
            ${(target / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Progress</p>
          <p className={`text-2xl font-bold ${fundingPercent > 75 ? 'text-green-600' : 'text-accent-blue'}`}>
            {fundingPercent.toFixed(0)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Investors</p>
          <p className="text-2xl font-bold text-primary-dark flex items-center gap-2">
            <span>👥</span>
            <span>{investorsCount}</span>
          </p>
        </div>
      </div>

      {/* Threshold Alert */}
      {!thresholdMet && (
        <div className="mt-4 bg-red-50 border border-red-500 p-3 rounded-lg flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <p className="text-sm font-medium text-red-900">
            Minimum {thresholdPercent}% funding required by deadline
          </p>
        </div>
      )}

      {/* Urgency Alert */}
      {isUrgent && (
        <div className="mt-4 bg-amber-50 border border-amber-500 p-3 rounded-lg flex items-center gap-2">
          <span className="text-base">⏰</span>
          <p className="text-sm font-medium text-amber-900">
            Less than 48 hours remaining! Don't miss this opportunity.
          </p>
        </div>
      )}
    </div>
  );
};

export default DealFundingProgress;
