interface StatsBarProps {
  stats: {
    total: number;
    active: number;
    validated: number;
    building: number;
  };
  onStatClick: (status: string) => void;
}

const statCards = [
  { key: 'total', label: 'Total Submissions', icon: '💡', color: '#679f83', status: 'all' },
  { key: 'active', label: 'Active Submissions', icon: '🔄', color: '#f59e0b', status: 'pending' },
  { key: 'validated', label: 'Validated', icon: '✅', color: '#10b981', status: 'validated' },
  { key: 'building', label: 'MVP Building', icon: '🏗️', color: '#3b82f6', status: 'building' },
];

const StatsBar = ({ stats, onStatClick }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((card) => {
        const value = stats[card.key as keyof typeof stats];
        
        return (
          <button
            key={card.key}
            onClick={() => onStatClick(card.status)}
            className="bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md cursor-pointer group"
            style={{ 
              border: '1px solid rgba(103, 159, 131, 0.15)',
              borderLeft: `3px solid ${card.color}`
            }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">{card.icon}</span>
              <p className="text-4xl font-bold text-primary-dark mb-1">
                {value}
              </p>
              <p className="text-xs text-gray-600">
                {card.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StatsBar;
