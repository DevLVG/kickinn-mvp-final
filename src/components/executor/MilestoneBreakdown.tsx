import { Calendar } from 'lucide-react';

interface Milestone {
  number: number;
  title: string;
  deliverables: string[];
  timeline: string;
  tokenAllocation: number;
  percentage: number;
}

interface MilestoneBreakdownProps {
  milestones: Milestone[];
  totalTimeline: string;
}

const MilestoneBreakdown = ({ milestones, totalTimeline }: MilestoneBreakdownProps) => {
  const colors = ['#679f83', '#23698a', '#86b39c'];

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Milestone Breakdown</h2>
        <p className="text-sm text-muted-foreground">Deliverables and timeline</p>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={milestone.number} className="flex items-start gap-4">
            {/* Timeline Connector */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-base"
                style={{
                  borderColor: colors[index % colors.length],
                  color: colors[index % colors.length],
                }}
              >
                M{milestone.number}
              </div>
              {index < milestones.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-2" style={{ minHeight: '40px' }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 bg-muted/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-primary-dark mb-2">{milestone.title}</h3>
              
              <ul className="space-y-1 mb-3">
                {milestone.deliverables.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-secondary-teal mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm font-medium text-accent-blue mb-2">
                <Calendar className="w-4 h-4" />
                <span>{milestone.timeline}</span>
              </div>

              <div className="text-base font-bold text-secondary-teal">
                {milestone.tokenAllocation.toLocaleString()} tokens
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({milestone.percentage}% of total)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 bg-gradient-to-r from-secondary-teal/10 to-accent-blue/10 rounded-xl p-5 flex items-center justify-between">
        <span className="font-bold text-base text-primary-dark">Total Project Timeline</span>
        <span className="font-bold text-2xl text-accent-blue">{totalTimeline}</span>
      </div>
    </div>
  );
};

export default MilestoneBreakdown;
