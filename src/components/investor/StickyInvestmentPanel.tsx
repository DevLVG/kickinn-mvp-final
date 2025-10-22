import { useState, useEffect } from 'react';

interface StickyInvestmentPanelProps {
  deal: {
    funding: {
      target: number;
      current: number;
      deadline_hours: number;
      investors_count: number;
    };
    tokenomics: {
      price_per_token: number;
      min_investment: number;
    };
    validation_score: number;
    legal: {
      audit_status: string;
    };
  };
  fundingPercent: number;
  isKYCVerified: boolean;
  onInvestClick: () => void;
}

const StickyInvestmentPanel = ({
  deal,
  fundingPercent,
  isKYCVerified,
  onInvestClick
}: StickyInvestmentPanelProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const totalSeconds = deal.funding.deadline_hours * 3600;
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deal.funding.deadline_hours]);

  const isUrgent = deal.funding.deadline_hours < 48;

  return (
    <div className="sticky top-6">
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-xl">
        {/* Target */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Target Raise</p>
          <p className="text-3xl font-bold text-primary-dark">
            ${(deal.funding.target / 1000).toFixed(0)}K USDT
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${fundingPercent}%`,
                background: 'linear-gradient(90deg, #679f83, #23698a)'
              }}
            />
          </div>
          <p className="text-sm font-medium text-gray-700">
            ${(deal.funding.current / 1000).toFixed(0)}K raised ({fundingPercent.toFixed(0)}%)
          </p>
        </div>

        {/* Token Price */}
        <div className="bg-accent-blue/10 p-4 rounded-lg mb-4">
          <p className="text-xs text-gray-600 mb-1">Token Price</p>
          <p className="text-3xl font-bold text-accent-blue">
            ${deal.tokenomics.price_per_token.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Min investment: ${deal.tokenomics.min_investment.toLocaleString()}
          </p>
        </div>

        {/* Countdown */}
        {isUrgent && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-500 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⏰</span>
              <p className="text-sm font-bold text-amber-900">Time Remaining</p>
            </div>
            <div className="flex gap-2 justify-center">
              {timeRemaining.days > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">{timeRemaining.days}</div>
                  <div className="text-xs text-amber-700">days</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">{timeRemaining.hours}</div>
                <div className="text-xs text-amber-700">hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">{timeRemaining.minutes}</div>
                <div className="text-xs text-amber-700">min</div>
              </div>
            </div>
          </div>
        )}

        {/* Investors */}
        <div className="bg-gray-50 p-3 rounded-lg mb-5 flex items-center gap-2">
          <span className="text-lg">👥</span>
          <p className="text-sm font-medium text-primary-dark">
            {deal.funding.investors_count} investors joined
          </p>
        </div>

        {/* Invest Button */}
        <button
          onClick={onInvestClick}
          disabled={!isKYCVerified}
          className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-4 px-6 rounded-lg font-bold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          title={!isKYCVerified ? 'Complete KYC to invest' : ''}
        >
          <span>💰</span>
          <span>Invest Now</span>
        </button>

        {!isKYCVerified && (
          <p className="text-xs text-center text-amber-600 mt-2">
            Complete KYC to invest
          </p>
        )}

        {/* Trust Indicators */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>✅</span>
            <span>AI Validated {deal.validation_score.toFixed(1)}/10</span>
          </div>
          {deal.legal.audit_status === 'completed' && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>✅</span>
              <span>Smart Contract Audited</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>✅</span>
            <span>{deal.funding.investors_count} Active Investors</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>🔒</span>
            <span>Secure Wallet Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyInvestmentPanel;
