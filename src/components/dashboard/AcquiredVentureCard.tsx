import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Venture {
  id: string;
  title: string;
  acquiredMonths: number;
  mrrGrowth: number;
  users: number;
  newUsers: number;
}

interface AcquiredVentureCardProps {
  venture: Venture;
}

const AcquiredVentureCard = ({ venture }: AcquiredVentureCardProps) => {
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
      <h3 className="text-lg font-bold text-primary-dark mb-2 line-clamp-2">
        {venture.title}
      </h3>

      {/* Acquired Date */}
      <p className="text-xs text-gray-500 mb-4">
        Acquired {venture.acquiredMonths} months ago
      </p>

      {/* Performance Metrics */}
      <div className="space-y-3 mb-4">
        {/* MRR Growth */}
        <div>
          <p className="text-xs text-gray-600 mb-1">MRR Growth</p>
          <p className="text-base font-bold" style={{ color: '#10b981' }}>
            +{venture.mrrGrowth}%
          </p>
        </div>

        {/* Users */}
        <div>
          <p className="text-xs text-gray-600 mb-1">Users</p>
          <p className="text-sm text-gray-700">
            {venture.users.toLocaleString()} (+{venture.newUsers})
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`/buyer/acquired/${venture.id}`}>
        <Button
          variant="outline"
          className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          Manage Venture
        </Button>
      </Link>
    </div>
  );
};

export default AcquiredVentureCard;
