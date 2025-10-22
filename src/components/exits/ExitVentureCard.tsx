import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface Venture {
  id: string;
  title: string;
  description: string;
  sector: string;
  image_url: string;
  is_featured: boolean;
  metrics: {
    mrr_usd: number;
    active_users: number;
    growth_rate_monthly: number;
    revenue_multiple: number;
  };
  exit: {
    price_usd: number;
    dd_included: boolean;
    listed_at: Date;
  };
}

interface ExitVentureCardProps {
  venture: Venture;
}

const ExitVentureCard = ({ venture }: ExitVentureCardProps) => {
  const navigate = useNavigate();

  const getGrowthColor = (rate: number) => {
    if (rate >= 20) return '#4ade80';
    if (rate >= 10) return '#679f83';
    return '#fb923c';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div
      className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(25, 74, 97, 0.3), rgba(15, 43, 56, 0.5))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(103, 159, 131, 0.2)'
      }}
      onClick={() => navigate(`/exits/${venture.id}`)}
    >
      {/* Featured Badge */}
      {venture.is_featured && (
        <div
          className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{
            background: 'linear-gradient(135deg, #fb923c, #f59e0b)'
          }}
        >
          ⭐ Featured
        </div>
      )}

      {/* Image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${venture.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 43, 56, 0.3) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {venture.title}
        </h3>

        {/* Sector Badge */}
        <span
          className="inline-block px-3 py-1 rounded-xl text-xs font-medium mb-4"
          style={{
            background: 'rgba(103, 159, 131, 0.2)',
            border: '1px solid rgba(103, 159, 131, 0.4)',
            color: '#86b39c'
          }}
        >
          {venture.sector}
        </span>

        {/* Description */}
        <p
          className="text-sm mb-5 line-clamp-2"
          style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}
        >
          {venture.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className="text-center p-3 rounded-xl"
            style={{ background: 'rgba(103, 159, 131, 0.1)' }}
          >
            <div className="text-lg font-bold" style={{ color: '#679f83' }}>
              ${formatNumber(venture.metrics.mrr_usd)}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Monthly Revenue
            </div>
          </div>

          <div
            className="text-center p-3 rounded-xl"
            style={{ background: 'rgba(103, 159, 131, 0.1)' }}
          >
            <div className="text-lg font-bold" style={{ color: '#679f83' }}>
              {formatNumber(venture.metrics.active_users)}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Active Users
            </div>
          </div>

          <div
            className="text-center p-3 rounded-xl"
            style={{ background: 'rgba(103, 159, 131, 0.1)' }}
          >
            <div className="text-lg font-bold" style={{ color: getGrowthColor(venture.metrics.growth_rate_monthly) }}>
              +{venture.metrics.growth_rate_monthly}%
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Monthly Growth
            </div>
          </div>

          <div
            className="text-center p-3 rounded-xl"
            style={{ background: 'rgba(103, 159, 131, 0.1)' }}
          >
            <div className="text-lg font-bold" style={{ color: '#679f83' }}>
              {venture.metrics.revenue_multiple}x
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Revenue Multiple
            </div>
          </div>
        </div>

        {/* Exit Price */}
        <div
          className="p-4 rounded-xl mb-5"
          style={{
            background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.15), rgba(35, 105, 138, 0.15))',
            border: '1px solid rgba(103, 159, 131, 0.3)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Exit Price
              </div>
              <div className="text-3xl font-bold text-white">
                {formatPrice(venture.exit.price_usd)}
              </div>
            </div>
            {venture.exit.dd_included && (
              <div className="text-xs font-medium flex items-center gap-1" style={{ color: '#4ade80' }}>
                <span>✓</span>
                <span>DD Included</span>
              </div>
            )}
          </div>
        </div>

        {/* Listing Age */}
        <p className="text-xs mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Listed {formatDistanceToNow(venture.exit.listed_at, { addSuffix: true })}
        </p>

        {/* Action Button */}
        <button
          className="w-full py-3 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #679f83, #23698a)',
            color: 'white'
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/exits/${venture.id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ExitVentureCard;
