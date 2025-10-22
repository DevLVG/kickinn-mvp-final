interface VentureDetailsProps {
  startDate: string;
  targetCompletion: string;
  daysRemaining: number;
  tokenAllocation: number;
  tokenUsdValue: number;
}

const VentureDetails = ({
  startDate,
  targetCompletion,
  daysRemaining,
  tokenAllocation,
  tokenUsdValue,
}: VentureDetailsProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">ℹ️</span>
        <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Venture Details</h2>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Timeline</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            3 weeks ({daysRemaining} days remaining)
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Started</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            {new Date(startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Target Completion</p>
          <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
            {new Date(targetCompletion).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase mb-1">Your Token Allocation</p>
          <p className="text-base font-bold text-[hsl(var(--secondary-teal))]">
            {tokenAllocation.toLocaleString()} tokens
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            ≈ ${tokenUsdValue.toLocaleString()} at current rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default VentureDetails;
