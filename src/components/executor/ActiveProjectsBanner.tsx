import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ActiveProjectsBannerProps {
  activeCount: number;
  maxCount: number;
}

const ActiveProjectsBanner = ({ activeCount, maxCount }: ActiveProjectsBannerProps) => {
  const remaining = maxCount - activeCount;
  const isAtLimit = activeCount >= maxCount;

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-3xl">🛠️</span>
        <div>
          <h3 className="font-bold text-base text-primary-dark">Active Projects</h3>
          <p className="text-sm text-muted-foreground">
            {activeCount}/{maxCount} concurrent ventures
          </p>
        </div>
        
        {/* Progress Indicators */}
        <div className="flex items-center gap-2 ml-4">
          {Array.from({ length: maxCount }).map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index < activeCount
                  ? 'bg-gradient-to-r from-secondary-teal to-accent-blue'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        {isAtLimit ? (
          <div className="bg-destructive/10 border border-destructive rounded-lg px-4 py-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <div>
              <p className="text-sm text-destructive font-medium">
                Maximum concurrent projects reached
              </p>
              <p className="text-xs text-destructive/80 mt-1">
                Complete one to apply for more
              </p>
            </div>
            <Link
              to="/executor/active"
              className="text-xs text-destructive underline hover:no-underline ml-2 whitespace-nowrap"
            >
              View Active →
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-success font-medium">
              You can apply to {remaining} more {remaining === 1 ? 'project' : 'projects'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProjectsBanner;
