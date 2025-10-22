import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Milestone {
  id: string;
  title: string;
  status: 'in_progress' | 'submitted' | 'approved' | 'revision';
  deadline: string;
  progress: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  id: string;
  ventureId: string;
  ventureName: string;
  role: string;
  status: 'on_track' | 'at_risk' | 'delayed';
  overallProgress: number;
  milestones: Milestone[];
  team: TeamMember[];
  tokensAllocated: number;
  unreadMessages: number;
  daysToDeadline: number;
  contractSigned: boolean;
}

interface ExecutorProjectCardProps {
  project: Project;
}

const ExecutorProjectCard = ({ project }: ExecutorProjectCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'on_track':
        return {
          bg: 'bg-green-500/10',
          text: 'text-green-600',
          icon: '✓',
          label: 'On Track',
        };
      case 'at_risk':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-600',
          icon: '⚠️',
          label: 'At Risk',
        };
      case 'delayed':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-600',
          icon: '⏰',
          label: 'Delayed',
        };
      default:
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-600',
          icon: '●',
          label: 'In Progress',
        };
    }
  };

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'submitted':
        return '📤';
      case 'revision':
        return '🔄';
      default:
        return '🔄';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'submitted':
        return 'text-purple-600';
      case 'revision':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">
            {project.ventureName}
          </h3>
          <div className="inline-block bg-[hsl(var(--secondary-teal))]/10 border border-[hsl(var(--secondary-teal))] text-[hsl(var(--secondary-teal))] px-3 py-1.5 rounded-full text-xs font-medium uppercase">
            {project.role}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2`}>
          <span>{statusConfig.icon}</span>
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
          <p className="text-base font-bold text-[hsl(var(--secondary-teal))]">{project.overallProgress}% Complete</p>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] rounded-full transition-all duration-500"
            style={{ width: `${project.overallProgress}%` }}
          />
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-6">
        <p className="text-base font-medium text-muted-foreground mb-3">Milestones</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {project.milestones.map((milestone) => (
            <Link
              key={milestone.id}
              to={`/ventures/${project.ventureId}/milestones/${milestone.id}`}
              className="bg-muted border border-border rounded-lg p-4 hover:bg-card hover:border-[hsl(var(--secondary-teal))] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[hsl(var(--secondary-teal))]">
                  {milestone.id.toUpperCase()}
                </span>
                <span className={`text-base ${getMilestoneStatusColor(milestone.status)}`}>
                  {getMilestoneStatusIcon(milestone.status)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[hsl(var(--primary-dark))] mb-2 line-clamp-2">
                {milestone.title}
              </h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>📅</span>
                <span>Due: {new Date(milestone.deadline).toLocaleDateString()}</span>
              </p>
              {milestone.status === 'in_progress' && (
                <div className="mt-2">
                  <div className="w-full h-1 bg-muted-foreground/20 rounded-full">
                    <div
                      className="h-full bg-[hsl(var(--secondary-teal))] rounded-full"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{milestone.progress}%</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-muted-foreground">Team:</p>
          <div className="flex -space-x-2">
            {project.team.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] border-2 border-card flex items-center justify-center text-white text-xs font-bold"
                title={member.name}
                style={{ zIndex: project.team.length - index }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            ))}
            {project.team.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-muted-foreground">
                +{project.team.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <Link to={`/ventures/${project.ventureId}`} className="flex-1">
          <Button className="w-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] hover:shadow-lg">
            Open Workspace →
          </Button>
        </Link>
        <Link to={`/executor/contracts/${project.id}`}>
          <Button variant="outline" className="border-[hsl(var(--secondary-teal))] text-[hsl(var(--secondary-teal))] hover:bg-[hsl(var(--secondary-teal))]/10">
            📄 View Contract
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-xl mb-1">🪙</div>
          <p className="text-base font-bold text-[hsl(var(--primary-dark))]">{project.tokensAllocated.toLocaleString()}</p>
          <p className="text-[11px] text-muted-foreground">Tokens Allocated</p>
        </div>
        <div className="text-center">
          <div className="text-xl mb-1">💬</div>
          <p className={`text-base font-bold ${project.unreadMessages > 0 ? 'text-destructive' : 'text-[hsl(var(--primary-dark))]'}`}>
            {project.unreadMessages}
          </p>
          <p className="text-[11px] text-muted-foreground">Unread Messages</p>
        </div>
        <div className="text-center">
          <div className="text-xl mb-1">⏱️</div>
          <p className={`text-base font-bold ${project.daysToDeadline < 3 ? 'text-destructive' : project.daysToDeadline < 7 ? 'text-amber-600' : 'text-[hsl(var(--primary-dark))]'}`}>
            {project.daysToDeadline}
          </p>
          <p className="text-[11px] text-muted-foreground">Days to Deadline</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutorProjectCard;
