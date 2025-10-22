interface Milestone {
  number: number;
  title: string;
  timeline: string;
  tokenAllocation: number;
  tokenPercentage: number;
  deliverables: string[];
}

interface ContractMilestonesSectionProps {
  milestones: Milestone[];
}

const ContractMilestonesSection = ({ milestones }: ContractMilestonesSectionProps) => {
  const colors = ['#679f83', '#23698a', '#86b39c'];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">
        Milestone Deliverables
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Your work will be divided into these phases
      </p>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.number}
            className="bg-card border-2 border-[hsl(var(--secondary-teal))]/20 rounded-xl p-5 hover:shadow-md transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors[index % colors.length]}, ${colors[(index + 1) % colors.length]})`,
                  }}
                >
                  M{milestone.number}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <span>📅</span>
                  <span>{milestone.timeline}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[hsl(var(--secondary-teal))] mt-1">
                  <span>🪙</span>
                  <span>
                    {milestone.tokenAllocation.toLocaleString()} tokens ({milestone.tokenPercentage}
                    %)
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[hsl(var(--primary-dark))] mb-3">
              {milestone.title}
            </h3>

            {/* Deliverables */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
                Deliverables:
              </p>
              <ul className="space-y-1.5">
                {milestone.deliverables.map((deliverable, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-[hsl(var(--secondary-teal))] mt-0.5">✓</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground italic mt-3">
              Payment released upon milestone approval
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractMilestonesSection;
