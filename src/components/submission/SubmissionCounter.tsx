import { Link } from "react-router-dom";

interface SubmissionCounterProps {
  activeCount: number;
  maxCount: number;
}

const SubmissionCounter = ({ activeCount, maxCount }: SubmissionCounterProps) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 mb-6 flex items-center justify-between"
      style={{ border: '1px solid rgba(103, 159, 131, 0.15)' }}
    >
      {/* Left: Counter Text & Dots */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-gray-700">
          Active Submissions: {activeCount}/{maxCount}
        </p>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[...Array(maxCount)].map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full transition-colors"
              style={{
                background: index < activeCount ? '#679f83' : '#e5e7eb'
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: Link */}
      <Link 
        to="/ideas"
        className="text-xs text-secondary-teal hover:underline"
      >
        View My Ideas →
      </Link>
    </div>
  );
};

export default SubmissionCounter;
