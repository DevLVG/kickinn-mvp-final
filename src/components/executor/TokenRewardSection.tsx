interface VestingSchedule {
  durationMonths: number;
  type: 'linear';
  startTrigger: string;
}

interface TokenRewardSectionProps {
  tokenAllocation: number;
  tokenPercentage: number;
  tokenUsdValue: number;
  vestingSchedule: VestingSchedule;
}

const TokenRewardSection = ({
  tokenAllocation,
  tokenPercentage,
  tokenUsdValue,
  vestingSchedule,
}: TokenRewardSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-[hsl(var(--secondary-teal))]/10 to-[hsl(var(--accent-blue))]/10 border-2 border-[hsl(var(--secondary-teal))] rounded-xl p-7 mb-8">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">
        Token Compensation
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Your earnings for this venture</p>

      {/* Total Allocation */}
      <div className="bg-card rounded-lg p-5 mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-muted-foreground mb-1">Total Token Allocation</p>
          <p className="text-4xl font-bold text-[hsl(var(--secondary-teal))]">
            {tokenAllocation.toLocaleString()} tokens
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {tokenPercentage}% of total supply
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
          <p className="text-2xl font-bold text-[hsl(var(--primary-dark))]">
            ≈ ${tokenUsdValue.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">At current token price</p>
        </div>
      </div>

      {/* Vesting Terms */}
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-2xl">🔒</span>
          <h3 className="text-base font-bold text-[hsl(var(--primary-dark))]">Vesting Schedule</h3>
        </div>
        <p className="text-sm text-foreground leading-relaxed mb-3">
          Tokens vest linearly over {vestingSchedule.durationMonths} months starting from venture
          funding date. You can claim vested tokens anytime after unlocking begins.
        </p>

        {/* Timeline Visual */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <div className="text-center">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary-teal))] mx-auto mb-1"></div>
            <span>0 months</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary-teal))]/60 mx-auto mb-1"></div>
            <span>3 mo</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary-teal))]/40 mx-auto mb-1"></div>
            <span>6 mo</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--secondary-teal))]/20 mx-auto mb-1"></div>
            <span>9 mo</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 rounded-full bg-muted mx-auto mb-1"></div>
            <span>12 mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenRewardSection;
