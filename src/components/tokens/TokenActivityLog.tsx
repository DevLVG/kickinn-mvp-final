interface Transaction {
  id: string;
  type: 'allocated' | 'claimed' | 'sold' | 'redeemed';
  amount: number;
  value_usdt: number | null;
  transaction_hash: string;
  timestamp: Date;
}

interface TokenActivityLogProps {
  ventureId: string;
  symbol: string;
}

const TokenActivityLog = ({ ventureId, symbol }: TokenActivityLogProps) => {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'allocated',
      amount: 50000,
      value_usdt: null,
      transaction_hash: '0x1234567890abcdef',
      timestamp: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'claimed',
      amount: 10000,
      value_usdt: null,
      transaction_hash: '0xabcdef1234567890',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'sold',
      amount: 5000,
      value_usdt: 1250,
      transaction_hash: '0x9876543210fedcba',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ];

  const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
      case 'allocated':
        return { icon: '🎁', bg: 'rgba(59,130,246,0.15)', text: 'Tokens Allocated', color: 'text-[#3b82f6]' };
      case 'claimed':
        return { icon: '💰', bg: 'rgba(16,185,129,0.15)', text: 'Tokens Claimed', color: 'text-[hsl(var(--success))]' };
      case 'sold':
        return { icon: '🔄', bg: 'rgba(245,158,11,0.15)', text: 'Sold on DEX', color: 'text-[#f59e0b]' };
      case 'redeemed':
        return { icon: '💸', bg: 'rgba(139,92,246,0.15)', text: 'Redeemed for Exit', color: 'text-[#8b5cf6]' };
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Transaction hash copied!');
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Transaction History</h2>
        <p className="text-sm text-muted-foreground">All your token transactions</p>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {transactions.map((tx) => {
          const config = getTypeConfig(tx.type);
          
          return (
            <div
              key={tx.id}
              className="bg-primary/5 border border-primary/10 p-5 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: config.bg }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground mb-1">
                      {config.text}
                      {tx.type === 'sold' && (
                        <span className="inline-block ml-2 text-xs">🔗</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {tx.amount.toLocaleString()} {symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(tx.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="text-right">
                  <p className={`text-lg font-bold mb-1 ${
                    tx.type === 'allocated' || tx.type === 'claimed' 
                      ? 'text-[hsl(var(--success))]' 
                      : 'text-foreground'
                  }`}>
                    {tx.type === 'allocated' || tx.type === 'claimed' 
                      ? `+${tx.amount.toLocaleString()}` 
                      : tx.value_usdt 
                      ? `+$${tx.value_usdt.toLocaleString()}` 
                      : `${tx.amount.toLocaleString()}`}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <p className="font-mono text-xs text-muted-foreground">
                      {truncateHash(tx.transaction_hash)}
                    </p>
                    <button
                      onClick={() => copyToClipboard(tx.transaction_hash)}
                      className="text-xs hover:scale-110 transition-transform"
                      title="Copy transaction hash"
                    >
                      📋
                    </button>
                  </div>
                  <a
                    href={`https://tonscan.org/tx/${tx.transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    View on Explorer →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-30">📭</div>
          <p className="text-lg text-muted-foreground mb-2">No transactions yet</p>
          <p className="text-sm text-muted-foreground">Your token activity will appear here</p>
        </div>
      )}
    </div>
  );
};

export default TokenActivityLog;
