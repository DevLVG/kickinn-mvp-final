interface TokenSummaryCardProps {
  data: any;
  userRole: 'ideator' | 'executor' | 'investor';
}

const TokenSummaryCard = ({ data, userRole }: TokenSummaryCardProps) => {
  const { tokens, market, user } = data;

  const vestedPercentage = userRole === 'executor' 
    ? Math.round((tokens.vested / tokens.total_allocated) * 100)
    : 100;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-xl p-6 md:p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Token Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Allocated */}
        <div>
          <p className="text-xs font-bold text-foreground/70 uppercase mb-2">Total Allocated</p>
          <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
            {tokens.total_allocated.toLocaleString()} {data.venture.token_symbol}
          </p>
          <p className="text-sm text-muted-foreground">
            {user.allocation_percent}% of total supply
          </p>
        </div>

        {/* Vesting Status - Role Dependent */}
        {userRole === 'executor' ? (
          <div>
            <p className="text-xs font-bold text-foreground/70 uppercase mb-2">Vesting Status</p>
            <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--success))] mb-1">
              {tokens.vested.toLocaleString()} vested
            </p>
            <p className="text-base text-[#8b5cf6]">
              {tokens.unvested.toLocaleString()} locked
            </p>
            <div className="mt-3">
              <div className="h-3 bg-[rgba(139,92,246,0.15)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[hsl(var(--success))] to-[#059669] rounded-full transition-all duration-500"
                  style={{ width: `${vestedPercentage}%` }}
                />
              </div>
              <p className="text-sm font-bold text-[hsl(var(--success))] mt-2">
                {vestedPercentage}% vested
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold text-foreground/70 uppercase mb-2">Token Status</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">✓</span>
              <span className="text-2xl font-bold text-[hsl(var(--success))]">Fully Unlocked</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              All tokens are available immediately
            </p>
          </div>
        )}

        {/* Current Value */}
        <div>
          <p className="text-xs font-bold text-foreground/70 uppercase mb-2">Current Value</p>
          <p className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2">
            ${market.current_value.toLocaleString()}
            <span className="text-2xl">💰</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            @ ${market.current_price_usdt} per token
          </p>
        </div>

        {/* Price Change 24h */}
        <div>
          <p className="text-xs font-bold text-foreground/70 uppercase mb-2">24h Change</p>
          <p className={`text-3xl md:text-4xl font-bold flex items-center gap-2 ${
            market.price_change_24h > 0 
              ? 'text-[hsl(var(--success))]' 
              : market.price_change_24h < 0 
              ? 'text-destructive' 
              : 'text-muted-foreground'
          }`}>
            {market.price_change_24h > 0 ? '↑' : market.price_change_24h < 0 ? '↓' : '—'}
            {Math.abs(market.price_change_24h)}%
          </p>
          <p className={`text-sm mt-2 ${
            market.price_change_24h > 0 
              ? 'text-[hsl(var(--success))]' 
              : market.price_change_24h < 0 
              ? 'text-destructive' 
              : 'text-muted-foreground'
          }`}>
            {market.price_change_24h > 0 ? '+' : ''}{market.price_change_24h > 0 ? '$' : '-$'}{Math.abs(market.price_change_24h_amount).toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenSummaryCard;
