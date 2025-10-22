interface VentureTabNavigationProps {
  activeTab: 'overview' | 'traction' | 'milestones' | 'liquidity' | 'notifications';
  onTabChange: (tab: 'overview' | 'traction' | 'milestones' | 'liquidity' | 'notifications') => void;
}

const VentureTabNavigation = ({ activeTab, onTabChange }: VentureTabNavigationProps) => {
  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'traction' as const, label: 'Traction' },
    { id: 'milestones' as const, label: 'Milestones' },
    { id: 'liquidity' as const, label: 'Liquidity' },
    { id: 'notifications' as const, label: 'Notifications' }
  ];

  return (
    <div className="flex items-center gap-4 border-b-2 border-[rgba(103,159,131,0.15)] mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-4 font-medium text-[15px] border-b-3 transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'text-[#194a61] border-b-[#679f83]'
              : 'text-gray-600 border-b-transparent hover:bg-[rgba(103,159,131,0.05)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default VentureTabNavigation;
