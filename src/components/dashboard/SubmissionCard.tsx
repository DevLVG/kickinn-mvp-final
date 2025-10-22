import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Submission {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'building';
  submittedDate: string;
  validationScores?: {
    marketDepth: number;
    urgency: number;
    uniqueness: number;
  };
}

interface SubmissionCardProps {
  submission: Submission;
}

const statusConfig = {
  pending: {
    label: 'Pending AI Review',
    className: 'bg-amber-100 text-amber-800',
  },
  approved: {
    label: 'Validated ✓',
    className: 'bg-green-100 text-green-800',
  },
  rejected: {
    label: 'Needs Revision',
    className: 'bg-red-100 text-red-800',
  },
  building: {
    label: 'MVP Building',
    className: 'bg-blue-100 text-blue-800',
  },
};

const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  const config = statusConfig[submission.status];
  const formattedDate = new Date(submission.submittedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
      {/* Status Badge */}
      <div className="flex justify-end mb-3">
        <Badge 
          className={`text-[11px] font-bold px-3 py-1 ${config.className}`}
          style={{ borderRadius: '9999px' }}
        >
          {config.label}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-primary-dark mb-2 line-clamp-2">
        {submission.title}
      </h3>

      {/* Submission Date */}
      <p className="text-xs text-gray-500 mb-3">{formattedDate}</p>

      {/* Validation Scores (if approved) */}
      {submission.validationScores && (
        <div className="mb-4">
          <p className="text-xs text-gray-600">
            Market Depth: {submission.validationScores.marketDepth}/10 | 
            Urgency: {submission.validationScores.urgency}/10
          </p>
        </div>
      )}

      {/* Action Button */}
      <Link to={`/ideas/${submission.id}`}>
        <Button
          variant="outline"
          className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          {submission.status === 'pending' && 'View Status'}
          {submission.status === 'approved' && 'View Venture'}
          {submission.status === 'rejected' && 'View Feedback'}
          {submission.status === 'building' && 'View Progress'}
        </Button>
      </Link>
    </div>
  );
};

export default SubmissionCard;