import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KYCRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  kycStatus: 'pending' | 'verified' | 'rejected';
}

const KYCRequiredModal = ({ isOpen, onClose, kycStatus }: KYCRequiredModalProps) => {
  const navigate = useNavigate();

  const handleStartKYC = () => {
    navigate('/buyer/settings/kyc');
  };

  const getContent = () => {
    switch (kycStatus) {
      case 'pending':
        return {
          icon: <Clock className="w-16 h-16 text-[#fb923c]" />,
          title: "KYC Verification in Progress",
          message: "Your KYC verification is currently being reviewed. You'll be notified via email once the process is complete. This typically takes 1-2 business days.",
          action: null
        };
      case 'rejected':
        return {
          icon: <AlertCircle className="w-16 h-16 text-[#ef4444]" />,
          title: "KYC Verification Required",
          message: "Your previous KYC submission was rejected. Please review the feedback and resubmit your verification to make offers on ventures.",
          action: (
            <Button
              onClick={handleStartKYC}
              className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] text-white font-bold"
            >
              Resubmit KYC
            </Button>
          )
        };
      default:
        return {
          icon: <CheckCircle className="w-16 h-16 text-[#679f83]" />,
          title: "Complete KYC to Make Offers",
          message: "To make acquisition offers and access full venture details, you need to complete the KYC verification process. This is a one-time requirement to ensure secure transactions.",
          action: (
            <Button
              onClick={handleStartKYC}
              className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] text-white font-bold"
            >
              Start KYC Verification
            </Button>
          )
        };
    }
  };

  const content = getContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            {content.icon}
            <DialogTitle className="text-2xl font-bold text-[#194a61]">
              {content.title}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-gray-600 leading-relaxed">
            {content.message}
          </p>

          {content.action && (
            <div className="space-y-3">
              {content.action}
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          )}

          {kycStatus === 'pending' && (
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] text-white"
            >
              Got It
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCRequiredModal;
