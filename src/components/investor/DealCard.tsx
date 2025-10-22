import { useNavigate } from 'react-router-dom';

interface Deal {
  id: string;
  venture_id: string;
  title: string;
  category: string;
  problem_statement: string;
  validation_score: number;
  traction: {
    users: number;
    mrr: number;
    growth_rate: number;
    live_months: number;
  };
  funding: {
    target: number;
    current: number;
    investors_count: number;
    deadline_hours: number;
  };
  tokenomics: {
    price_per_token: number;
    min_investment: number;
  };
  isSaved: boolean;
}

interface DealCardProps {
  deal: Deal;
  onToggleSave: (dealId: string) => void;
  isKYCVerified: boolean;
}

const DealCard = ({ deal, onToggleSave, isKYCVerified }: DealCardProps) => {
  const navigate = useNavigate();
  const fundingPercent = (deal.funding.current / deal.funding.target) * 100;

  const getValidationGradient = (score: number) => {
    if (score >= 9.0) return 'linear-gradient(135deg, #10b981, #059669)';
    if (score >= 8.0) return 'linear-gradient(135deg, #3b82f6, #2563eb)';
    if (score >= 7.0) return 'linear-gradient(135deg, #f59e0b, #d97706)';
    return 'linear-gradient(135deg, #6b7280, #4b5563)';
  };

  const getTimeRemainingBadge = () => {
    const hours = deal.funding.deadline_hours;
    
    if (hours < 48) {
      return {
        icon: '⏰',
        text: `${hours}h remaining`,
        className: 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-500 text-red-900'
      };
    }
    
    if (hours < 168) { // 7 days
      const days = Math.floor(hours / 24);
      return {
        icon: '⏱️',
        text: `${days} days remaining`,
        className: 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-500 text-amber-900'
      };
    }
    
    const days = Math.floor(hours / 24);
    return {
      icon: '📅',
      text: `${days} days remaining`,
      className: 'bg-secondary-teal/10 border border-secondary-teal text-primary-dark'
    };
  };

  const timeRemainingBadge = getTimeRemainingBadge();

  const handleCardClick = () => {
    navigate(`/deals/${deal.id}`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(deal.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
    >
      {/* Save Button */}
      <button
        onClick={handleSaveClick}
        className="absolute top-4 left-4 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-secondary-teal hover:border-secondary-teal hover:text-white transition-all shadow-sm z-10"
        aria-label={deal.isSaved ? 'Remove saved deal' : 'Save deal'}
      >
        <span className="text-lg">{deal.isSaved ? '📌' : '🔖'}</span>
      </button>

      {/* Validation Badge */}
      <div
        className="absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold text-sm shadow-md"
        style={{ background: getValidationGradient(deal.validation_score) }}
      >
        {deal.validation_score.toFixed(1)}/10
      </div>

      {/* Category Tag */}
      <div className="bg-secondary-teal/10 text-secondary-teal px-3 py-1.5 rounded-full text-xs font-medium inline-block mb-3 mt-8">
        {deal.category}
      </div>

      {/* Venture Title */}
      <h3 className="text-xl font-bold text-primary-dark mb-3 line-clamp-2 pr-20 hover:text-secondary-teal transition-colors">
        {deal.title}
      </h3>

      {/* Problem Statement */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {deal.problem_statement}
      </p>

      {/* Traction Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-secondary-teal/5 rounded-lg">
        <div className="text-center">
          <div className="text-sm mb-1">👥</div>
          <div className="text-lg font-bold text-primary-dark">{deal.traction.users.toLocaleString()}</div>
          <div className="text-xs text-gray-500 uppercase">Users</div>
        </div>
        <div className="text-center">
          <div className="text-sm mb-1">💵</div>
          <div className="text-lg font-bold text-primary-dark">${(deal.traction.mrr / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-500 uppercase">MRR</div>
        </div>
        <div className="text-center">
          <div className="text-sm mb-1">📈</div>
          <div className="text-lg font-bold text-green-600">+{deal.traction.growth_rate}%</div>
          <div className="text-xs text-gray-500 uppercase">Growth</div>
        </div>
        <div className="text-center">
          <div className="text-sm mb-1">📅</div>
          <div className="text-lg font-bold text-primary-dark">{deal.traction.live_months}mo</div>
          <div className="text-xs text-gray-500 uppercase">Live Since</div>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="mb-4">
        <div className="w-full h-2 bg-secondary-teal/15 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${fundingPercent}%`,
              background: 'linear-gradient(90deg, #679f83, #23698a)'
            }}
          />
        </div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm font-bold text-primary-dark">
              ${(deal.funding.current / 1000).toFixed(0)}K / ${(deal.funding.target / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-600">{fundingPercent.toFixed(0)}% funded</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>👥</span>
            <span>{deal.funding.investors_count} investors</span>
          </div>
        </div>
      </div>

      {/* Token Price */}
      <div className="bg-accent-blue/10 p-3 rounded-lg flex items-center gap-2 mb-4">
        <span className="text-base">🪙</span>
        <div>
          <p className="text-sm font-medium text-accent-blue">
            ${deal.tokenomics.price_per_token.toFixed(2)} per token
          </p>
          <p className="text-xs text-gray-500">
            Min: ${deal.tokenomics.min_investment.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Time Remaining */}
      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium mb-4 ${timeRemainingBadge.className}`}>
        <span>{timeRemainingBadge.icon}</span>
        <span>{timeRemainingBadge.text}</span>
      </div>

      {/* Action Button */}
      <button
        className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-3 px-6 rounded-lg font-medium text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isKYCVerified}
        title={!isKYCVerified ? 'Complete KYC to view deal details' : ''}
      >
        <span>View Deal Details</span>
        <span>→</span>
      </button>

      {!isKYCVerified && (
        <p className="text-xs text-center text-amber-600 mt-2">
          Complete KYC to invest
        </p>
      )}
    </div>
  );
};

export default DealCard;
