import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  ventureTitle: string;
  role: string;
  currentMilestone: string;
  progress: number;
  deadline: string;
  tokensAllocated: number;
}

interface ExecutorProjectCardProps {
  project: Project;
}

const ExecutorProjectCard = ({ project }: ExecutorProjectCardProps) => {
  // Determine if deadline is urgent (<3 days)
  const daysLeft = parseInt(project.deadline);
  const isUrgent = daysLeft <= 3;

  return (
    <div 
      className="bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md"
      style={{
        border: '1px solid rgba(103, 159, 131, 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(103, 159, 131, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(103, 159, 131, 0.15)';
      }}
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-primary-dark mb-1 line-clamp-2">
        {project.ventureTitle}
      </h3>

      {/* Role */}
      <p className="text-sm text-gray-600 mb-3">{project.role}</p>

      {/* Current Milestone */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">
          Current: {project.currentMilestone}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${project.progress}%`,
              background: 'linear-gradient(to right, #679f83, #23698a)',
            }}
          />
        </div>
        
        <p className="text-xs text-gray-600 mt-1">{project.progress}% complete</p>
      </div>

      {/* Next Deadline */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">📅</span>
        <p 
          className={`text-xs ${isUrgent ? 'text-amber-600 font-medium' : 'text-gray-600'}`}
        >
          Deliverable due in {project.deadline}
        </p>
      </div>

      {/* Token Status */}
      <p className="text-xs text-secondary-teal mb-4">
        {project.tokensAllocated.toLocaleString()} tokens allocated
      </p>

      {/* Action Button */}
      <Link to={`/ventures/${project.id}/workspace`}>
        <Button
          variant="outline"
          className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          Continue Work
        </Button>
      </Link>
    </div>
  );
};

export default ExecutorProjectCard;
