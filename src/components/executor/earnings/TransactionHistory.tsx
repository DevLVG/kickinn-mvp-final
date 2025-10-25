import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Transaction {
  id: string;
  type: 'allocated' | 'claimed' | 'redeemed';
  venture_name: string;
  token_symbol: string;
  amount: number;
  value_usd: number;
  transaction_hash: string;
  timestamp: Date;
}

const TransactionHistory = () => {
  const [filter, setFilter] = useState<'all' | 'allocated' | 'claimed' | 'month'>('all');

  // Mock transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'claimed',
      venture_name: 'ThreadCycle',
      token_symbol: 'FABR',
      amount: 15000,
      value_usd: 3750,
      transaction_hash: '0xabc123...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'allocated',
      venture_name: 'EcoTrack',
      token_symbol: 'ECO',
      amount: 25000,
      value_usd: 4500,
      transaction_hash: '0xdef456...',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'claimed',
      venture_name: 'HealthHub',
      token_symbol: 'HLTH',
      amount: 12000,
      value_usd: 3840,
      transaction_hash: '0xghi789...',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      type: 'redeemed',
      venture_name: 'FitTrack',
      token_symbol: 'FIT',
      amount: 20000,
      value_usd: 8000,
      transaction_hash: '0xjkl012...',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    }
  ];

  const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
      case 'allocated':
        return {
          icon: '🎁',
          bg: 'rgba(139, 92, 246, 0.15)',
          label: 'Tokens Allocated',
          color: '#8b5cf6'
        };
      case 'claimed':
        return {
          icon: '💰',
          bg: 'rgba(16, 185, 129, 0.15)',
          label: 'Tokens Claimed',
          color: '#10b981'
        };
      case 'redeemed':
        return {
          icon: '💸',
          bg: 'rgba(59, 130, 246, 0.15)',
          label: 'Redeemed for Exit',
          color: '#3b82f6'
        };
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#194a61]">Transaction History</h2>
        
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'allocated', 'claimed', 'month'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                ${filter === f
                  ? 'bg-[#679f83] text-white'
                  : 'bg-[rgba(103,159,131,0.1)] text-[#679f83] hover:bg-[rgba(103,159,131,0.2)]'
                }
              `}
            >
              {f === 'all' ? 'All' : f === 'month' ? 'This Month' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {transactions.map((tx) => {
          const config = getTypeConfig(tx.type);
          
          return (
            <div
              key={tx.id}
              className="bg-[rgba(103,159,131,0.03)] border border-[rgba(103,159,131,0.1)] rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: config.bg }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#194a61] mb-1">
                      {config.label}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {tx.amount.toLocaleString()} {tx.token_symbol} • {tx.venture_name}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {formatRelativeTime(tx.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="text-right">
                  <p
                    className="text-lg font-bold mb-1"
                    style={{ color: config.color }}
                  >
                    {tx.type === 'allocated' || tx.type === 'claimed' ? '+' : ''}
                    {tx.amount.toLocaleString()} tokens
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    ${tx.value_usd.toLocaleString()}
                  </p>
                  <a
                    href={`https://tonscan.org/tx/${tx.transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#679f83] hover:underline"
                  >
                    View on Explorer
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
