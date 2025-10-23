interface Venture {
  metrics: {
    churn_rate_monthly: number;
    cac_usd: number;
    ltv_usd: number;
    is_profitable: boolean;
  };
  listing: {
    days_on_market: number;
  };
}

interface ExitStatsBarProps {
  venture: Venture;
}

const ExitStatsBar = ({ venture }: ExitStatsBarProps) => {
  const stats = [
    {
      icon: "🕐",
      value: "18 months",
      label: "Live Duration"
    },
    {
      icon: "📉",
      value: `${venture.metrics.churn_rate_monthly}%`,
      label: "Monthly Churn"
    },
    {
      icon: "💰",
      value: `$${venture.metrics.cac_usd}`,
      label: "Customer Acq. Cost"
    },
    {
      icon: "💎",
      value: `$${venture.metrics.ltv_usd}`,
      label: "Lifetime Value"
    },
    {
      icon: "✅",
      value: venture.metrics.is_profitable ? "Yes" : "No",
      label: "Cash Flow Positive",
      highlight: venture.metrics.is_profitable
    }
  ];

  return (
    <div className="bg-[rgba(25,74,97,0.4)] backdrop-blur-[10px] border-y border-[rgba(103,159,131,0.2)] py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-around gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center min-w-[120px]">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className={`text-2xl font-bold mb-1 ${stat.highlight ? 'text-[#4ade80]' : 'text-white'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExitStatsBar;
