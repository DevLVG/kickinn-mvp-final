interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'revision_needed';
  deadline: string;
  executor_role: string;
  validated_by_kickinn: boolean;
  deliverables: string[];
}

interface VentureMilestonesTabProps {
  milestones: Milestone[];
}

const VentureMilestonesTab = ({ milestones }: VentureMilestonesTabProps) => {
  const completedCount = milestones.filter(m => m.status === 'approved').length;
  const totalCount = milestones.length;
  const completionPercent = (completedCount / totalCount) * 100;

  const getStatusConfig = (status: Milestone['status']) => {
    const configs = {
      not_started: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', icon: '⏳', text: 'Not Started' },
      in_progress: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', icon: '🚀', text: 'In Progress' },
      submitted: { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6', icon: '📤', text: 'Submitted' },
      approved: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', icon: '✅', text: 'Approved' },
      revision_needed: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', icon: '🔄', text: 'Revision' }
    };
    return configs[status];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#194a61]">MVP Development Milestones</h2>

      {/* Progress Summary */}
      <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)]">
        <div className="text-xl font-bold text-[#194a61] mb-4">
          {completedCount}/{totalCount} milestones
        </div>
        <div className="h-3 bg-[rgba(103,159,131,0.1)] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#679f83] to-[#23698a] rounded-full transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <div className="text-sm text-gray-600">{completionPercent.toFixed(0)}% complete</div>
      </div>

      {/* Milestone Cards */}
      <div className="space-y-4">
        {milestones.map((milestone) => {
          const statusConfig = getStatusConfig(milestone.status);
          const isOverdue = new Date(milestone.deadline) < new Date() && milestone.status !== 'approved';

          return (
            <div
              key={milestone.id}
              className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] relative hover:shadow-md transition-all"
            >
              {/* Status Badge */}
              <div
                className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
              >
                <span>{statusConfig.icon}</span>
                {statusConfig.text}
              </div>

              {/* Validation Badge */}
              {milestone.status === 'approved' && (
                <div
                  className={`absolute top-14 right-5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                    milestone.validated_by_kickinn
                      ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981] border-[#10b981]'
                      : 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border-[#f59e0b]'
                  }`}
                >
                  {milestone.validated_by_kickinn ? '✓ Validated by Kick Inn' : '⚠ Not Validated by Kick Inn'}
                </div>
              )}

              {/* Content */}
              <div className="pr-32">
                <h3 className="text-lg font-bold text-[#194a61] mb-2 line-clamp-2">{milestone.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{milestone.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">📅</span>
                    <span className={`text-xs ${isOverdue ? 'text-[#ef4444]' : 'text-gray-600'}`}>
                      Due: {milestone.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">👤</span>
                    <span className="text-xs text-gray-600">{milestone.executor_role}</span>
                  </div>
                </div>

                {/* Deliverables */}
                {milestone.deliverables.length > 0 && (
                  <div className="mt-4">
                    <details className="group">
                      <summary className="text-xs text-[#679f83] cursor-pointer hover:underline">
                        View Deliverables ▼
                      </summary>
                      <ul className="mt-2 space-y-1">
                        {milestone.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-[#10b981]">✓</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VentureMilestonesTab;
