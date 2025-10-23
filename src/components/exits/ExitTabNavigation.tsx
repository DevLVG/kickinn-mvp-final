type TabType = 'overview' | 'traction' | 'financials' | 'assets' | 'cap_table' | 'legal';

interface ExitTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ExitTabNavigation = ({ activeTab, onTabChange }: ExitTabNavigationProps) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'traction', label: 'Traction' },
    { id: 'financials', label: 'Financials' },
    { id: 'assets', label: 'Assets' },
    { id: 'cap_table', label: 'Cap Table' },
    { id: 'legal', label: 'Legal' }
  ];

  return (
    <div className="bg-[rgba(15,43,56,0.6)] border-b border-[rgba(103,159,131,0.2)]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-5 font-medium text-sm whitespace-nowrap border-b-3 transition-all ${
                activeTab === tab.id
                  ? 'text-white border-b-[#679f83] bg-[rgba(103,159,131,0.1)]'
                  : 'text-white/60 border-b-transparent hover:text-[#86b39c] hover:bg-[rgba(103,159,131,0.05)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExitTabNavigation;
