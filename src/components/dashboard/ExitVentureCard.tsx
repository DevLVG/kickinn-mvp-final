import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Venture {
  id: string;
  title: string;
  category: string;
  traction: string;
  mrr: number;
  users: number;
  growth: number;
  totalRevenue: number;
  exitPrice: number;
}

interface ExitVentureCardProps {
  venture: Venture;
}

const ExitVentureCard = ({ venture }: ExitVentureCardProps) => {
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

      {/* Category */}
      <p className="text-xs text-gray-500 mb-3">{venture.category}</p>

      {/* Traction Badge */}
      <div className="inline-block mb-4">
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ background: '#10b981' }}
        >
          {venture.traction}
        </span>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">MRR</p>
          <p className="text-base font-bold text-primary-dark">
            ${(venture.mrr / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Users</p>
          <p className="text-base font-bold text-primary-dark">
            {venture.users.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Growth</p>
          <p className="text-base font-bold text-primary-dark">
            +{venture.growth}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Revenue</p>
          <p className="text-base font-bold text-primary-dark">
            ${(venture.totalRevenue / 1000).toFixed(0)}K total
          </p>
        </div>
      </div>

      {/* Exit Price */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-secondary-teal mb-1">
          ${venture.exitPrice.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">12-month revenue multiple</p>
      </div>

      {/* Action Button */}
      <Link to={`/exits/${venture.id}`}>
        <Button
          variant="outline"
          className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default ExitVentureCard;
