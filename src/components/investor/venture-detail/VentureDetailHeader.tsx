interface Venture {
  title: string;
  category: string;
  venture_code: string;
  status: 'active' | 'building' | 'funding' | 'live' | 'exit_available' | 'exited' | 'funding_failed';
}

interface VentureDetailHeaderProps {
  venture: Venture;
  onShare: () => void;
  onBack: () => void;
}

const VentureDetailHeader = ({ venture, onShare, onBack }: VentureDetailHeaderProps) => {
  const getStatusConfig = () => {
    const configs = {
      active: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', icon: '🚀', text: 'Active' },
      building: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', icon: '🔨', text: 'Building' },
      funding: { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6', icon: '💰', text: 'Funding' },
      live: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', icon: '✅', text: 'Live' },
      exit_available: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', icon: '🚪', text: 'Exit Available' },
      exited: { bg: 'rgba(107,114,128,0.15)', color: '#6b7280', icon: '🏁', text: 'Exited' },
      funding_failed: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', icon: '⚠️', text: 'Funding Failed' }
    };
    return configs[venture.status];
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-[#194a61] mb-2 line-clamp-2">{venture.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>📂</span>
            {venture.category}
          </span>
          <span>•</span>
          <span>{venture.venture_code}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2"
          style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
        >
          <span>{statusConfig.icon}</span>
          {statusConfig.text}
        </div>

        <button
          onClick={onBack}
          className="bg-white border border-[rgba(103,159,131,0.3)] px-5 py-2 rounded-lg hover:shadow-md transition-all flex items-center gap-2"
        >
          <span className="text-lg">←</span>
        </button>

        <button
          onClick={onShare}
          className="bg-white border border-[rgba(103,159,131,0.3)] px-5 py-2 rounded-lg hover:shadow-md transition-all flex items-center gap-2"
        >
          <span className="text-base">🔗</span>
          <span className="text-sm font-medium text-gray-700">Share</span>
        </button>
      </div>
    </div>
  );
};

export default VentureDetailHeader;
