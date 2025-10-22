import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface Venture {
  id: string;
  title: string;
  status: string;
  progress: number;
  executorCount: number;
}

interface VentureCardProps {
  venture: Venture;
}

const VentureCard = ({ venture }: VentureCardProps) => {
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

      {/* Status */}
      <p className="text-xs text-gray-600 mb-3">{venture.status}</p>

      {/* Progress Section */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Build Progress</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${venture.progress}%`,
              background: 'linear-gradient(to right, #679f83, #23698a)',
            }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">{venture.progress}% complete</p>
      </div>

      {/* Team Info */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-gray-500" />
        <p className="text-xs text-gray-600">{venture.executorCount} Executors matched</p>
      </div>

      {/* Action Button */}
      <Link to={`/ventures/${venture.id}`}>
        <Button
          variant="outline"
          className="w-full border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          View Progress
        </Button>
      </Link>
    </div>
  );
};

export default VentureCard;