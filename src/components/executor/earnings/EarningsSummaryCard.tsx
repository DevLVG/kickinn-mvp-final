import { TrendingUp } from "lucide-react";

interface EarningsSummaryCardProps {
  type: 'total' | 'claimable' | 'vesting' | 'claimed';
  label: string;
  amount?: number;
  tokenAmount?: number;
  usdAmount?: number;
  subtitle?: string;
  trend?: string;
  dailyUnlock?: number;
  progress?: number;
  lastClaim?: string;
  onClaim?: () => void;
  canClaim?: boolean;
}

const EarningsSummaryCard = ({
  type,
  label,
  amount,
  tokenAmount,
  usdAmount,
  subtitle,
  trend,
  dailyUnlock,
  progress,
  lastClaim,
  onClaim,
  canClaim
}: EarningsSummaryCardProps) => {
  
  const getTypeConfig = () => {
    switch (type) {
      case 'total':
        return {
          gradient: true,
          bgClass: 'bg-gradient-to-br from-[#679f83] to-[#23698a]',
          icon: '💰',
          iconBg: 'rgba(255,255,255,0.2)'
        };
      case 'claimable':
        return {
          gradient: false,
          bgClass: 'bg-card',
          borderClass: 'border-2 border-[#10b981]',
          icon: '💰',
          iconBg: 'rgba(16, 185, 129, 0.1)',
          iconColor: '#10b981'
        };
      case 'vesting':
        return {
          gradient: false,
          bgClass: 'bg-card',
          borderClass: 'border-2 border-[#8b5cf6]',
          icon: '⏳',
          iconBg: 'rgba(139, 92, 246, 0.1)',
          iconColor: '#8b5cf6'
        };
      case 'claimed':
        return {
          gradient: false,
          bgClass: 'bg-card',
          borderClass: 'border border-border',
          icon: '✅',
          iconBg: 'rgba(59, 130, 246, 0.1)',
          iconColor: '#3b82f6'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div
      className={`
        ${config.bgClass} 
        ${config.borderClass || ''} 
        rounded-2xl p-7 shadow-md hover:shadow-xl transition-all
        ${type !== 'total' ? 'hover:-translate-y-1' : ''}
        relative overflow-hidden
      `}
    >
      {/* Background Pattern for Total Card */}
      {type === 'total' && (
        <div className="absolute top-[-20px] right-[-20px] text-[80px] opacity-10">
          💰
        </div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
          style={{ backgroundColor: config.iconBg }}
        >
          {config.icon}
        </div>

        {/* Label */}
        <p className={`text-sm font-medium mb-2 ${config.gradient ? 'text-white/90' : 'text-muted-foreground'}`}>
          {label}
        </p>

        {/* Amount Display */}
        {type === 'total' && amount !== undefined && (
          <>
            <p className="text-[36px] font-bold text-white mb-1">
              ${amount.toLocaleString()}
            </p>
            {subtitle && (
              <p className="text-[13px] text-white/80">{subtitle}</p>
            )}
          </>
        )}

        {type !== 'total' && tokenAmount !== undefined && (
          <>
            <p className={`text-[28px] font-bold mb-1`} style={{ color: config.iconColor }}>
              {tokenAmount.toLocaleString()} tokens
            </p>
            {usdAmount !== undefined && (
              <p className="text-base text-foreground mb-4">
                ${usdAmount.toLocaleString()}
              </p>
            )}
          </>
        )}

        {/* Additional Info */}
        {type === 'total' && trend && (
          <div className="mt-4 flex items-center gap-2 text-[12px] text-white/70">
            <TrendingUp className="w-3.5 h-3.5" />
            {trend}
          </div>
        )}

        {type === 'claimable' && onClaim && (
          <button
            onClick={onClaim}
            disabled={!canClaim || (tokenAmount || 0) === 0}
            className={`
              w-full py-3 px-6 rounded-lg font-medium text-sm transition-all
              ${canClaim && (tokenAmount || 0) > 0
                ? 'bg-[#10b981] text-white hover:brightness-110 hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            {(tokenAmount || 0) > 0 ? 'Claim Tokens' : 'Nothing to Claim'}
          </button>
        )}

        {type === 'vesting' && dailyUnlock && (
          <>
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground mb-3">
              <span>📅</span>
              +{dailyUnlock.toLocaleString()} tokens unlock daily
            </div>
            {progress !== undefined && (
              <div className="h-2 bg-[rgba(139,92,246,0.1)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </>
        )}

        {type === 'claimed' && lastClaim && (
          <p className="text-[13px] text-muted-foreground">
            Last claimed {lastClaim}
          </p>
        )}
      </div>
    </div>
  );
};

export default EarningsSummaryCard;
