interface Liquidity {
  dex: {
    platform: string;
    dex_url: string;
    liquidity_pool_size: number;
    trading_volume_24h: number;
    price_chart_url: string;
  };
  staking: {
    is_enabled: boolean;
    apy: number;
    staked_amount: number;
    staked_value: number;
    pending_rewards: number;
    rewards_value: number;
  };
  exit_event: {
    is_active: boolean;
    acquirer_name: string;
    acquisition_price: number;
    redemption_per_token: number;
    total_redemption: number;
    redemption_deadline: string;
    days_remaining: number;
  };
  transactions: Array<{
    id: string;
    type: 'buy' | 'sell' | 'stake' | 'unstake' | 'redeem';
    amount: number;
    price: number;
    value: number;
    date: string;
  }>;
}

interface Investment {
  token_symbol: string;
  token_count: number;
  current_value: number;
}

interface VentureLiquidityTabProps {
  liquidity: Liquidity;
  investment: Investment;
  onRedeem: () => void;
}

const VentureLiquidityTab = ({ liquidity, investment, onRedeem }: VentureLiquidityTabProps) => {
  const getTransactionIcon = (type: string) => {
    const icons = {
      buy: { icon: '📥', color: '#10b981' },
      sell: { icon: '📤', color: '#ef4444' },
      stake: { icon: '🔒', color: '#3b82f6' },
      unstake: { icon: '🔓', color: '#3b82f6' },
      redeem: { icon: '💰', color: '#f59e0b' }
    };
    return icons[type as keyof typeof icons] || icons.buy;
  };

  return (
    <div className="space-y-6">
      {/* Exit Opportunity (if active) */}
      {liquidity.exit_event.is_active && (
        <div className="bg-gradient-to-r from-[rgba(245,158,11,0.1)] to-[rgba(234,88,12,0.1)] border-2 border-[#f59e0b] rounded-xl p-8 relative">
          <div className="absolute top-6 right-6 text-4xl">🚪</div>
          
          <h2 className="text-3xl font-bold text-[#f59e0b] mb-2">Exit Opportunity Available</h2>
          <p className="text-base text-gray-700 mb-6">This venture has been acquired</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xs text-gray-600 mb-1">Acquired by</div>
              <div className="text-xl font-bold text-[#194a61]">{liquidity.exit_event.acquirer_name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Total acquisition price</div>
              <div className="text-2xl font-bold text-[#679f83]">
                ${liquidity.exit_event.acquisition_price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[rgba(245,158,11,0.3)] rounded-lg p-5 mb-6">
            <div className="text-sm text-gray-600 mb-2">Your redemption value</div>
            <div className="text-xs text-gray-500 mb-3">
              {investment.token_count.toLocaleString()} tokens × ${liquidity.exit_event.redemption_per_token.toFixed(2)}
            </div>
            <div className="text-4xl font-bold text-[#10b981] mb-2">
              ${liquidity.exit_event.total_redemption.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-base">⏰</span>
            <span className="text-[#ef4444]">Redemption deadline: {liquidity.exit_event.redemption_deadline}</span>
            <span className="font-bold text-[#ef4444]">
              ({liquidity.exit_event.days_remaining} days remaining)
            </span>
          </div>

          <button
            onClick={onRedeem}
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white py-4 px-8 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:scale-105 transition-all"
          >
            <span className="text-xl">💰</span>
            Redeem Tokens for ${liquidity.exit_event.total_redemption.toLocaleString()} USDT
          </button>

          <div className="bg-[rgba(255,255,255,0.8)] rounded-lg p-4 mt-4">
            <p className="text-xs text-gray-700">
              After redemption, your tokens will be burned and you'll receive USDT in your wallet. This action is irreversible. 
              You can also choose to hold your tokens and continue trading on DEX.
            </p>
          </div>
        </div>
      )}

      {/* DEX Trading */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <h2 className="text-2xl font-bold text-[#194a61] mb-2">DEX Trading</h2>
        <p className="text-sm text-gray-600 mb-6">Trade your tokens on decentralized exchanges</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm font-bold text-[#194a61] mb-2">{investment.token_symbol}</div>
            <div className="text-[15px] text-gray-600">{investment.token_count.toLocaleString()} tokens</div>
            <div className="text-lg font-bold text-[#679f83]">${investment.current_value.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Platform: {liquidity.dex.platform}</div>
            <div className="text-sm text-gray-600">
              Liquidity Pool: ${(liquidity.dex.liquidity_pool_size / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">
              24h Volume: ${(liquidity.dex.trading_volume_24h / 1000).toFixed(0)}K
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(liquidity.dex.dex_url, '_blank')}
            className="flex-1 bg-gradient-to-r from-[#679f83] to-[#23698a] text-white py-3 px-7 rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
          >
            <span className="text-lg">🔄</span>
            Trade on STON.fi
          </button>
          <button
            onClick={() => window.open(liquidity.dex.price_chart_url, '_blank')}
            className="flex-1 bg-white border-2 border-[#679f83] text-[#679f83] py-3 px-7 rounded-lg font-medium text-base flex items-center justify-center gap-2 hover:bg-[rgba(103,159,131,0.05)] transition-all"
          >
            <span className="text-lg">📈</span>
            View Price Chart
          </button>
        </div>
      </div>

      {/* Liquidity Pool Staking */}
      {liquidity.staking.is_enabled && (
        <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#194a61]">Liquidity Pool Staking</h2>
              <span className="text-xs bg-[rgba(16,185,129,0.15)] text-[#10b981] px-3 py-1 rounded-full font-bold">
                Active
              </span>
            </div>
          </div>

          <p className="text-[15px] text-gray-600 mb-4">
            Stake your tokens in the liquidity pool to earn yield from trading fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[rgba(103,159,131,0.05)] rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase mb-1">Current APY</div>
              <div className="text-2xl font-bold text-[#10b981]">{liquidity.staking.apy.toFixed(1)}%</div>
            </div>
            <div className="bg-[rgba(103,159,131,0.05)] rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase mb-1">Your Staked</div>
              <div className="text-[15px] text-gray-600">
                {liquidity.staking.staked_amount.toLocaleString()} tokens
              </div>
              <div className="text-sm text-gray-500">(${liquidity.staking.staked_value.toLocaleString()})</div>
            </div>
            <div className="bg-[rgba(103,159,131,0.05)] rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase mb-1">Pending Rewards</div>
              <div className="text-[15px] text-[#679f83]">
                +{liquidity.staking.pending_rewards.toLocaleString()} tokens
              </div>
              <div className="text-sm text-gray-500">(${liquidity.staking.rewards_value.toFixed(2)})</div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-[#679f83] text-white py-2 px-5 rounded-lg font-medium text-sm hover:shadow-md transition-all">
              Stake Tokens
            </button>
            <button className="flex-1 bg-white border border-[#679f83] text-[#679f83] py-2 px-5 rounded-lg font-medium text-sm hover:bg-[rgba(103,159,131,0.05)] transition-all">
              Unstake
            </button>
            <button className="flex-1 bg-white border border-[#679f83] text-[#679f83] py-2 px-5 rounded-lg font-medium text-sm hover:bg-[rgba(103,159,131,0.05)] transition-all">
              Claim Rewards
            </button>
          </div>

          <div className="bg-[rgba(103,159,131,0.1)] rounded-lg p-4">
            <p className="text-xs text-gray-700">
              Staking is optional. Your tokens remain tradable while staked. Unstaking is instant with no penalties.
            </p>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <h2 className="text-2xl font-bold text-[#194a61] mb-6">Transaction History</h2>

        {liquidity.transactions.length > 0 ? (
          <div className="space-y-3">
            {liquidity.transactions.map((tx) => {
              const txConfig = getTransactionIcon(tx.type);
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 border-b border-[rgba(103,159,131,0.1)] hover:bg-[rgba(103,159,131,0.05)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" style={{ color: txConfig.color }}>{txConfig.icon}</span>
                    <div>
                      <div className="font-bold text-[15px] text-[#194a61] capitalize">{tx.type}</div>
                      <div className="text-xs text-gray-600">{tx.amount.toLocaleString()} tokens</div>
                      <div className="text-xs text-gray-500">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base" style={{ color: txConfig.color }}>
                      {tx.type === 'buy' ? '+' : '-'}${tx.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">@ ${tx.price.toFixed(2)}/token</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl opacity-30 mb-4">📭</div>
            <p className="text-base text-gray-500">No transactions yet</p>
            <p className="text-sm text-gray-400">Your trading history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentureLiquidityTab;
