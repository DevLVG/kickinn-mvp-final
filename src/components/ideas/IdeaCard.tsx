import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Idea } from '@/pages/Ideas';

interface IdeaCardProps {
  idea: Idea;
  viewMode: 'grid' | 'list';
}

const IdeaCard = ({ idea, viewMode }: IdeaCardProps) => {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (idea.status) {
      case 'pending':
        return { 
          bg: 'rgba(245, 158, 11, 0.1)', 
          text: '#f59e0b', 
          icon: '⏳', 
          label: 'Pending Review' 
        };
      case 'validated':
        return { 
          bg: 'rgba(16, 185, 129, 0.1)', 
          text: '#10b981', 
          icon: '✓', 
          label: 'Validated' 
        };
      case 'rejected':
        return { 
          bg: 'rgba(239, 68, 68, 0.1)', 
          text: '#ef4444', 
          icon: '✕', 
          label: 'Needs Revision' 
        };
      case 'building':
        return { 
          bg: 'rgba(59, 130, 246, 0.1)', 
          text: '#3b82f6', 
          icon: '🏗️', 
          label: 'MVP Building' 
        };
      case 'archived':
        return { 
          bg: 'rgba(107, 114, 128, 0.1)', 
          text: '#6b7280', 
          icon: '📦', 
          label: 'Archived' 
        };
      default:
        return { 
          bg: 'rgba(107, 114, 128, 0.1)', 
          text: '#6b7280', 
          icon: '', 
          label: '' 
        };
    }
  };

  const getTypeIcon = () => {
    const icons = {
      voice: '🎤',
      video: '📹',
      text: '📝',
      file: '📎'
    };
    return icons[idea.submissionType] || '📝';
  };

  const timeAgo = formatDistanceToNow(new Date(idea.submittedAt), { addSuffix: true });
  const statusConfig = getStatusConfig();

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => navigate(`/ideas/${idea.id}`)}
        className="bg-white rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-md"
        style={{ border: '1px solid rgba(103, 159, 131, 0.15)' }}
      >
        {/* Status Icon */}
        <div className="flex-shrink-0">
          <span className="text-5xl">{statusConfig.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-primary-dark line-clamp-1 mb-2">
            {idea.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>📅 {timeAgo}</span>
            <span>{getTypeIcon()} via {idea.submissionType}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div 
          className="px-3 py-1 rounded-full"
          style={{ background: statusConfig.bg }}
        >
          <span className="text-xs font-bold uppercase" style={{ color: statusConfig.text }}>
            {statusConfig.label}
          </span>
        </div>

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/ideas/${idea.id}`);
          }}
          className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          View
        </Button>
      </div>
    );
  }

  // Grid View
  return (
    <div
      onClick={() => navigate(`/ideas/${idea.id}`)}
      className="bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative"
      style={{ border: '1px solid rgba(103, 159, 131, 0.15)' }}
    >
      {/* Status Badge */}
      <div 
        className="absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-1"
        style={{ background: statusConfig.bg }}
      >
        <span style={{ color: statusConfig.text }}>{statusConfig.icon}</span>
        <span className="text-xs font-bold uppercase" style={{ color: statusConfig.text }}>
          {statusConfig.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-primary-dark line-clamp-2 mb-3 pr-20 min-h-[56px]">
        {idea.title}
      </h3>

      {/* Submission Info */}
      <div className="space-y-1 mb-4">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          📅 Submitted {timeAgo}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          {getTypeIcon()} via {idea.submissionType}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* Status-Specific Content */}
      <div className="mb-4 min-h-[80px]">
        {idea.status === 'pending' && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xs text-gray-600 italic mb-2">AI validation in progress...</p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {idea.status === 'validated' && idea.validationScores && (
          <div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { label: 'Market', value: idea.validationScores.marketDepth },
                { label: 'Urgency', value: idea.validationScores.urgency },
                { label: 'Unique', value: idea.validationScores.uniqueness }
              ].map((score) => (
                <div key={score.label}>
                  <p className="text-xs text-gray-500 uppercase mb-1">{score.label}</p>
                  <p className="text-base font-bold text-green-600 mb-1">{score.value}</p>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(score.value / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center">
              Average: {idea.validationScores.average.toFixed(1)}/10
            </p>
          </div>
        )}

        {idea.status === 'rejected' && (
          <div>
            {idea.rejectionCount && (
              <p className="text-xs font-medium text-red-500 mb-2 flex items-center gap-1">
                {idea.rejectionCount >= 2 && <span>⚠️</span>}
                Rejected {idea.rejectionCount}x
              </p>
            )}
            {idea.feedback && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {idea.feedback}
              </p>
            )}
          </div>
        )}

        {idea.status === 'building' && (
          <div>
            <p className="text-xs text-gray-500 mb-2">MVP Progress</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full rounded-full"
                style={{
                  width: `${idea.buildProgress}%`,
                  background: 'linear-gradient(to right, #679f83, #23698a)'
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mb-2">{idea.buildProgress}% complete</p>
            <p className="text-xs text-gray-600">
              {idea.executorCount} Executors matched
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div>
        {idea.status === 'pending' && (
          <Button
            variant="outline"
            className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ideas/${idea.id}`);
            }}
          >
            View Status
          </Button>
        )}

        {idea.status === 'validated' && (
          <Button
            className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ventures/${idea.ventureId}`);
            }}
          >
            View Venture
          </Button>
        )}

        {idea.status === 'rejected' && (
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/ideas/${idea.id}`);
              }}
            >
              View Feedback
            </Button>
            <button 
              className="w-full text-xs text-secondary-teal hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/submit-idea?edit=${idea.id}`);
              }}
            >
              Revise Submission
            </button>
          </div>
        )}

        {idea.status === 'building' && (
          <Button
            className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ventures/${idea.ventureId}`);
            }}
          >
            Track Progress
          </Button>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;
