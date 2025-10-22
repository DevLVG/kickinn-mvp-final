import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Venture {
  id: string;
  title: string;
  category: string;
  validationScore: number;
  users: number;
  mrr: number;
  fundingRaised: number;
  fundingGoal: number;
  tokenPrice: number;
}

interface InvestorVentureCardProps {
  venture: Venture;
}

const InvestorVentureCard = ({ venture }: InvestorVentureCardProps) => {
  const fundingPercentage = (venture.fundingRaised / venture.fundingGoal) * 100;

  return (
    <div 
      className="bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative"
      style={{
        border: '1px solid rgba(103, 159, 131, 0.15)',
      }}
    >
      {/* Validation Badge */}
      <div 
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white"
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)'
        }}
      >
        {venture.validationScore}/10
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-primary-dark mb-2 line-clamp-2 pr-16">
        {venture.title}
      </h3>

      {/* Category */}
      <p className="text-xs text-gray-500 mb-3">{venture.category}</p>

      {/* Traction Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Users</p>
          <p className="text-base font-bold text-primary-dark">
            {venture.users.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">MRR</p>
          <p className="text-base font-bold text-primary-dark">
            ${(venture.mrr / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Funding Progress</p>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${fundingPercentage}%`,
              background: 'linear-gradient(to right, #679f83, #23698a)',
            }}
          />
        </div>
        <p className="text-xs text-gray-600">
          ${(venture.fundingRaised / 1000).toFixed(0)}K / ${(venture.fundingGoal / 1000).toFixed(0)}K ({fundingPercentage.toFixed(0)}%)
        </p>
      </div>

      {/* Token Price */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-sm">🪙</span>
        <p className="text-xs text-gray-600">
          ${venture.tokenPrice.toFixed(2)} per token
        </p>
      </div>

      {/* Action Button */}
      <Link to={`/deals/${venture.id}`}>
        <Button
          className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
        >
          View Deal
        </Button>
      </Link>
    </div>
  );
};

export default InvestorVentureCard;
