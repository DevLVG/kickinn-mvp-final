import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Offer {
  id: string;
  ventureTitle: string;
  status: 'pending' | 'in_due_diligence' | 'accepted' | 'rejected';
  offerAmount: number;
  submittedDays: number;
  dueDiligenceDays?: number;
}

interface BuyerOfferCardProps {
  offer: Offer;
}

const BuyerOfferCard = ({ offer }: BuyerOfferCardProps) => {
  // Status badge configuration
  const getStatusConfig = () => {
    switch (offer.status) {
      case 'pending':
        return { bg: '#f59e0b', text: 'Pending Review' };
      case 'in_due_diligence':
        return { bg: '#3b82f6', text: 'In Due Diligence' };
      case 'accepted':
        return { bg: '#10b981', text: 'Accepted' };
      case 'rejected':
        return { bg: '#ef4444', text: 'Rejected' };
      default:
        return { bg: '#6b7280', text: offer.status };
    }
  };

  const statusConfig = getStatusConfig();

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          {/* Status Badge */}
          <div className="inline-block mb-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: statusConfig.bg }}
            >
              {statusConfig.text}
            </span>
          </div>

          {/* Venture Title */}
          <h3 className="text-lg font-bold text-primary-dark mb-2">
            {offer.ventureTitle}
          </h3>

          {/* Offer Details */}
          <div className="space-y-1">
            <p className="text-xl font-bold text-secondary-teal">
              ${offer.offerAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Submitted {offer.submittedDays} days ago
            </p>
            {offer.status === 'in_due_diligence' && offer.dueDiligenceDays && (
              <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                <span>⏰</span>
                Due diligence expires in {offer.dueDiligenceDays} days
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div>
          <Link to={`/buyer/offers/${offer.id}`}>
            <Button
              variant="outline"
              className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
            >
              View Offer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerOfferCard;
