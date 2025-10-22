interface DealsStatsBarProps {
  stats: {
    activeDeals: number;
    totalRaising: number;
    avgValidation: number;
    userInvestments: number;
  };
  onPortfolioClick: () => void;
}

const DealsStatsBar = ({ stats, onPortfolioClick }: DealsStatsBarProps) => {
  const statCards = [
    {
      icon: '💼',
      value: stats.activeDeals.toString(),
      label: 'Active Deals',
      clickable: false
    },
    {
      icon: '💰',
      value: `$${stats.totalRaising.toFixed(1)}M`,
      label: 'Total Raising',
      clickable: false
    },
    {
      icon: '⭐',
      value: stats.avgValidation.toFixed(1),
      label: 'Avg Validation Score',
      clickable: false
    },
    {
      icon: '📊',
      value: stats.userInvestments.toString(),
      label: 'Your Active Deals',
      clickable: true
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          onClick={card.clickable ? onPortfolioClick : undefined}
          className={`bg-white rounded-xl p-5 border border-gray-200 transition-all duration-300 hover:shadow-md ${
            card.clickable ? 'cursor-pointer' : ''
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl mb-3">{card.icon}</span>
            <p className="text-4xl font-bold text-primary-dark mb-1">
              {card.value}
            </p>
            <p className="text-xs text-gray-600">
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealsStatsBar;
