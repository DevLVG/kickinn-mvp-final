import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ExitStickyActionBarProps {
  exitPrice: number;
  multiple: number;
  onMakeOffer: () => void;
  onScheduleCall: () => void;
}

const ExitStickyActionBar = ({ exitPrice, multiple, onMakeOffer, onScheduleCall }: ExitStickyActionBarProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {/* Desktop - Fixed Right Sidebar */}
      <div className="hidden lg:block fixed right-8 top-[140px] w-[320px] z-30">
        <div className="bg-[rgba(25,74,97,0.95)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.3)] rounded-2xl p-6 shadow-2xl">
          {/* Price Display */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-white mb-1">
              {formatCurrency(exitPrice)}
            </p>
            <p className="text-sm text-[#679f83]">
              {multiple}x revenue
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={onMakeOffer}
              className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] hover:opacity-90 text-white font-bold"
            >
              Make an Offer
            </Button>
            
            <Button
              onClick={onScheduleCall}
              variant="outline"
              className="w-full bg-[rgba(103,159,131,0.2)] border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.3)]"
            >
              Schedule Call
            </Button>
          </div>

          {/* Quick Contact */}
          <a
            href="mailto:support@kickinn.io"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            support@kickinn.io
          </a>
        </div>
      </div>

      {/* Mobile - Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[rgba(25,74,97,0.95)] backdrop-blur-[20px] border-t border-[rgba(103,159,131,0.3)] p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(exitPrice)}
            </p>
            <p className="text-xs text-[#679f83]">
              {multiple}x revenue
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onScheduleCall}
              variant="outline"
              size="sm"
              className="bg-[rgba(103,159,131,0.2)] border-[rgba(103,159,131,0.4)] text-[#86b39c]"
            >
              Call
            </Button>
            <Button
              onClick={onMakeOffer}
              size="sm"
              className="bg-gradient-to-r from-[#679f83] to-[#23698a] text-white"
            >
              Make Offer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExitStickyActionBar;
