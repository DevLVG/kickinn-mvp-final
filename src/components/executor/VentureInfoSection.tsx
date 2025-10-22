interface VentureInfoSectionProps {
  ventureName: string;
  role: string;
  tokenAllocation: number;
  tokenPercentage: number;
  timelineWeeks: number;
  startDate: string;
}

const VentureInfoSection = ({
  ventureName,
  role,
  tokenAllocation,
  tokenPercentage,
  timelineWeeks,
  startDate,
}: VentureInfoSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-[hsl(var(--secondary-teal))]/5 to-[hsl(var(--accent-blue))]/5 border border-[hsl(var(--secondary-teal))]/20 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-[hsl(var(--primary-dark))] mb-4">{ventureName}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Your Role</p>
          <p className="text-base font-bold text-[hsl(var(--primary-dark))]">{role}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Token Allocation</p>
          <p className="text-base font-bold text-[hsl(var(--primary-dark))]">
            {tokenAllocation.toLocaleString()} tokens ({tokenPercentage}% of supply)
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Estimated Timeline</p>
          <p className="text-base font-bold text-[hsl(var(--primary-dark))]">
            {timelineWeeks} weeks
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Expected Start</p>
          <p className="text-base font-bold text-[hsl(var(--primary-dark))]">Upon signature</p>
        </div>
      </div>
    </div>
  );
};

export default VentureInfoSection;
