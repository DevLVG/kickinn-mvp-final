import { Link } from 'react-router-dom';

interface Contract {
  id: string;
  ventureId: string;
  ventureName: string;
  role: string;
  status: 'pending' | 'signed' | 'expired' | 'rejected';
  deadline: string;
  hoursRemaining: number;
  tokenAllocation: number;
  tokenUsdValue: number;
  timelineWeeks: number;
  milestones: number;
  createdAt: string;
}

interface ContractCardProps {
  contract: Contract;
}

const ContractCard = ({ contract }: ContractCardProps) => {
  const getUrgencyConfig = (hours: number) => {
    if (hours < 12) {
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-600',
        label: `${hours}h left`,
      };
    } else if (hours < 24) {
      return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500',
        text: 'text-amber-600',
        label: `${hours}h left`,
      };
    } else {
      const days = Math.floor(hours / 24);
      return {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500',
        text: 'text-purple-600',
        label: `Expires in ${days} ${days === 1 ? 'day' : 'days'}`,
      };
    }
  };

  const urgencyConfig = getUrgencyConfig(contract.hoursRemaining);

  return (
    <Link
      to={`/executor/contracts/${contract.id}`}
      className="block bg-card border-2 border-purple-500 rounded-xl p-6 hover:shadow-lg hover:border-[hsl(var(--secondary-teal))] transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[hsl(var(--primary-dark))]">
            {contract.ventureName}
          </h3>
          <p className="text-sm font-medium text-[hsl(var(--secondary-teal))] mt-1">
            {contract.role}
          </p>
        </div>

        {/* Urgency Badge */}
        <div
          className={`${urgencyConfig.bg} ${urgencyConfig.border} ${urgencyConfig.text} px-4 py-2 rounded-full font-bold text-xs uppercase flex items-center gap-2 border`}
        >
          <span>⏰</span>
          <span>{urgencyConfig.label}</span>
        </div>
      </div>

      {/* Token Reward */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🪙</span>
        <div>
          <p className="text-2xl font-bold text-[hsl(var(--secondary-teal))]">
            {contract.tokenAllocation.toLocaleString()} tokens
          </p>
          <p className="text-sm text-muted-foreground">
            ≈ ${contract.tokenUsdValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4 mb-5 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Timeline</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            {contract.timelineWeeks} weeks
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Milestones</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            {contract.milestones} deliverables
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Sign By</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            {new Date(contract.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full px-3 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all text-center flex items-center justify-center gap-2">
        <span>Review Contract</span>
        <span>→</span>
      </div>
    </Link>
  );
};

export default ContractCard;
