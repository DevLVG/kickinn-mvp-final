interface TokenActionsSectionProps {
  userRole: 'ideator' | 'executor' | 'investor';
  tokens: any;
  market: any;
  exitEvent: any;
  walletConnected: boolean;
  symbol: string;
  onClaimClick: () => void;
  onSellClick: () => void;
  onRedeemClick: () => void;
}

const TokenActionsSection = ({ 
  userRole, 
  tokens, 
  market, 
  exitEvent, 
  walletConnected,
  symbol,
  onClaimClick,
  onSellClick,
  onRedeemClick
}: TokenActionsSectionProps) => {
  const tradeableAmount = userRole === 'executor' ? tokens.vested : tokens.total_allocated;
  const claimValue = tokens.claimable * market.current_price_usdt;
  const gasEstimate = 0.75;

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Claim Vested Button */}
        {tokens.claimable > 0 && (
          <button
            onClick={onClaimClick}
            className="relative bg-gradient-to-r from-[hsl(var(--success))] to-[#059669] text-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all text-left"
          >
            <span className="text-3xl absolute top-4 left-4">💰</span>
            <div className="mt-12">
              <p className="text-lg font-bold mb-2">
                {walletConnected ? 'Claim Vested Tokens' : 'Connect Wallet to Claim'}
              </p>
              <p className="text-2xl font-bold mb-1">
                {tokens.claimable.toLocaleString()} {symbol}
              </p>
              <p className="text-sm opacity-90 mb-2">
                ≈ ${claimValue.toLocaleString()}
              </p>
              <p className="text-xs opacity-75">
                Gas: ~${gasEstimate} TON
              </p>
            </div>
          </button>
        )}

        {/* Sell on DEX Button */}
        <button
          onClick={onSellClick}
          className="relative bg-card border-2 border-primary text-primary p-5 rounded-xl hover:shadow-md hover:bg-primary/5 transition-all text-left"
        >
          <span className="text-3xl absolute top-4 left-4">🔄</span>
          <div className="mt-12">
            <p className="text-lg font-bold mb-2">Trade on STON.fi</p>
            <p className="text-base mb-1">
              Tradeable: {tradeableAmount.toLocaleString()} {symbol}
            </p>
            <p className="text-xs opacity-70 mt-3">
              {userRole === 'executor' 
                ? 'Only vested tokens can be sold' 
                : 'All tokens available for trading'}
            </p>
          </div>
        </button>

        {/* Redeem Button - Conditional */}
        {exitEvent.is_active && (
          <button
            onClick={onRedeemClick}
            className="relative bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all text-left animate-pulse"
          >
            <span className="text-3xl absolute top-4 left-4">💸</span>
            <div className="mt-12">
              <p className="text-lg font-bold mb-2">Redeem for Exit</p>
              <p className="text-xl font-bold mb-1">
                Redeem {userRole === 'executor' ? tokens.vested.toLocaleString() : tokens.total_allocated.toLocaleString()} {symbol}
              </p>
              <p className="text-sm opacity-90 mb-2">
                Receive ≈ ${exitEvent.redemption_value_per_token * (userRole === 'executor' ? tokens.vested : tokens.total_allocated)}
              </p>
              <p className="text-xs opacity-75">
                ⏰ Deadline: {new Date(exitEvent.redemption_deadline).toLocaleDateString()}
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default TokenActionsSection;
