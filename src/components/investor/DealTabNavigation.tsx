type TabType = 'overview' | 'traction' | 'tokenomics' | 'team' | 'legal';

interface DealTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const DealTabNavigation = ({ activeTab, onTabChange }: DealTabNavigationProps) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'traction', label: 'Traction' },
    { id: 'tokenomics', label: 'Tokenomics' },
    { id: 'team', label: 'Team' },
    { id: 'legal', label: 'Legal' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2 mb-6 flex gap-2 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-secondary-teal to-accent-blue text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DealTabNavigation;
