import { Link } from 'react-router-dom';

interface Milestone {
  id: string;
  number: number;
  title: string;
  status: 'in_progress' | 'submitted' | 'approved';
  assignee: string;
  progress: number;
  tasksCompleted: number;
  tasksTotal: number;
  dueDate: string;
}

interface MilestonesPanelProps {
  ventureId: string;
}

const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    number: 1,
    title: 'MVP Design & Wireframes',
    status: 'approved',
    assignee: 'You',
    progress: 100,
    tasksCompleted: 5,
    tasksTotal: 5,
    dueDate: new Date('2024-03-10').toISOString(),
  },
  {
    id: 'm2',
    number: 2,
    title: 'Core Features Development',
    status: 'in_progress',
    assignee: 'You',
    progress: 60,
    tasksCompleted: 3,
    tasksTotal: 5,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'm3',
    number: 3,
    title: 'Testing & Deployment',
    status: 'in_progress',
    assignee: 'Team',
    progress: 0,
    tasksCompleted: 0,
    tasksTotal: 4,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MilestonesPanel = ({ ventureId }: MilestonesPanelProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: 'bg-green-500/10', text: 'text-green-600', label: 'Approved' };
      case 'submitted':
        return { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'Submitted' };
      default:
        return { bg: 'bg-blue-500/10', text: 'text-blue-600', label: 'In Progress' };
    }
  };

  const isUrgent = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days < 3 && days > 0;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Milestones</h2>
        </div>
        <select className="text-xs border border-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20">
          <option>All</option>
          <option>Yours</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Milestones List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {mockMilestones.map((milestone, index) => {
          const statusConfig = getStatusConfig(milestone.status);
          const urgent = isUrgent(milestone.dueDate);
          const colors = ['#679f83', '#23698a', '#86b39c'];

          return (
            <Link
              key={milestone.id}
              to={`/ventures/${ventureId}/milestones/${milestone.id}`}
              className="block bg-muted border-2 border-[hsl(var(--secondary-teal))]/20 rounded-lg p-4 hover:border-[hsl(var(--secondary-teal))] hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${colors[index % colors.length]}, ${
                        colors[(index + 1) % colors.length]
                      })`,
                    }}
                  >
                    M{milestone.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[hsl(var(--primary-dark))] line-clamp-1">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assigned to: {milestone.assignee}
                    </p>
                  </div>
                </div>
                <div
                  className={`${statusConfig.bg} ${statusConfig.text} px-2.5 py-1 rounded-full text-[11px] font-bold uppercase`}
                >
                  {statusConfig.label}
                </div>
              </div>

              {/* Progress */}
              {milestone.status === 'in_progress' && (
                <div className="mb-3">
                  <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {milestone.tasksCompleted}/{milestone.tasksTotal} tasks completed
                  </p>
                </div>
              )}

              {/* Deadline */}
              <div className="flex items-center gap-1 text-xs">
                <span>📅</span>
                <span className={urgent ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MilestonesPanel;
