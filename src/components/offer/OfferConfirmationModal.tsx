import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OfferConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
  venture: any;
  offerAmount: number;
}

const OfferConfirmationModal = ({
  isOpen,
  onClose,
  offerId,
  venture,
  offerAmount
}: OfferConfirmationModalProps) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(offerId);
    alert('Offer ID copied!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-[rgba(25,74,97,0.95)] to-[rgba(15,43,56,0.95)] backdrop-blur-[30px] border border-[rgba(103,159,131,0.3)] text-white">
        <div className="text-center py-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[rgba(74,222,128,0.2)] flex items-center justify-center animate-bounce">
              <CheckCircle className="w-12 h-12 text-[#4ade80]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-6">
            Offer Submitted Successfully!
          </h2>

          {/* Offer ID */}
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.3)] rounded-xl mb-8">
            <span className="font-mono text-lg text-[#679f83]">
              Offer #{offerId}
            </span>
            <button
              onClick={handleCopy}
              className="text-white/60 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-2xl p-6 mb-8 text-left">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Venture</span>
                <span className="text-white font-medium">{venture.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Offer Amount</span>
                <span className="text-white font-bold">${offerAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Submitted</span>
                <span className="text-white">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="px-3 py-1 rounded-full bg-[rgba(251,146,60,0.2)] text-[#fb923c] text-xs font-medium">
                  Pending Review
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Next Steps</h3>
            <ol className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0 font-bold text-[#679f83]">
                  1
                </span>
                <span>Seller has 7 days to respond to your offer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0 font-bold text-[#679f83]">
                  2
                </span>
                <span>You'll receive email notification of their decision</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0 font-bold text-[#679f83]">
                  3
                </span>
                <span>DD deposit will be processed if offer accepted</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0 font-bold text-[#679f83]">
                  4
                </span>
                <span>Track status in <a href="/buyer/offers" className="text-[#679f83] underline">Active Offers</a></span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/buyer/offers')}
              className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] hover:opacity-90 text-white font-bold py-6"
            >
              View My Offers
            </Button>
            
            <Button
              onClick={() => navigate('/exits')}
              variant="outline"
              className="w-full bg-transparent border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.1)] py-6"
            >
              Back to Marketplace
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferConfirmationModal;
