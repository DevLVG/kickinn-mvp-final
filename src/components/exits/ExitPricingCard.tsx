import { Button } from "@/components/ui/button";

interface Venture {
  pricing: {
    exit_price_usd: number;
    revenue_multiple: number;
  };
  metrics: {
    mrr_usd: number;
    arr_usd: number;
    active_users: number;
    growth_rate_monthly: number;
  };
  listing: {
    listed_at: Date;
    days_on_market: number;
  };
}

interface ExitPricingCardProps {
  venture: Venture;
  onMakeOffer: () => void;
  onScheduleCall: () => void;
  onRequestInfo: () => void;
}

const ExitPricingCard = ({ venture, onMakeOffer, onScheduleCall, onRequestInfo }: ExitPricingCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-gradient-to-br from-[rgba(103,159,131,0.15)] to-[rgba(35,105,138,0.15)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.3)] rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      {/* Price Section */}
      <div className="mb-6">
        <p className="text-sm text-white/70 mb-2">Exit Price</p>
        <p className="text-5xl font-bold text-white mb-2">
          {formatCurrency(venture.pricing.exit_price_usd)}
        </p>
        <p className="text-sm text-[#679f83]">
          {venture.pricing.revenue_multiple}x revenue multiple
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💵</div>
          <p className="text-xl font-bold text-white">{formatCurrency(venture.metrics.mrr_usd)}</p>
          <p className="text-xs text-white/60">Monthly Revenue</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-xl font-bold text-white">{formatCurrency(venture.metrics.arr_usd)}</p>
          <p className="text-xs text-white/60">Annual Revenue</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">👥</div>
          <p className="text-xl font-bold text-white">{formatNumber(venture.metrics.active_users)}</p>
          <p className="text-xs text-white/60">Active Users</p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📈</div>
          <p className="text-xl font-bold text-[#4ade80]">+{venture.metrics.growth_rate_monthly}%</p>
          <p className="text-xs text-white/60">Monthly Growth</p>
        </div>
      </div>

      {/* DD Included Banner */}
      <div className="bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.3)] rounded-xl p-4 mb-6 flex items-center gap-3">
        <span className="text-[#4ade80] text-xl">✓</span>
        <p className="text-sm font-medium text-[#4ade80]">
          Full Due Diligence Package Included
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onMakeOffer}
          className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02]"
        >
          Make an Offer
        </Button>
        
        <Button
          onClick={onScheduleCall}
          variant="outline"
          className="w-full bg-[rgba(103,159,131,0.2)] border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.3)] py-4 rounded-xl"
        >
          Schedule Call
        </Button>
        
        <button
          onClick={onRequestInfo}
          className="w-full text-white/70 hover:text-white text-sm underline py-2 transition-colors"
        >
          Request More Info
        </button>
      </div>

      {/* Listed Date */}
      <p className="text-xs text-white/50 text-center mt-4">
        Listed {venture.listing.days_on_market} days ago
      </p>
    </div>
  );
};

export default ExitPricingCard;
