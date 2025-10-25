import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ExternalLink } from "lucide-react";

interface ClaimEarningsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  claimableTokens: number;
  usdValue: number;
  walletAddress: string | null;
}

const ClaimEarningsModal = ({
  isOpen,
  onClose,
  onSuccess,
  claimableTokens,
  usdValue,
  walletAddress
}: ClaimEarningsModalProps) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [txHash] = useState('0xabc123def456...');

  const gasFee = 0.15;
  const youReceive = usdValue - gasFee;

  const handleClaim = () => {
    setIsClaiming(true);
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsClaiming(false);
      setClaimSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    if (claimSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px] p-10">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {!claimSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-[28px] font-bold text-[#194a61]">
                Claim Vested Tokens
              </h2>
            </div>

            {/* Claiming Summary */}
            <div className="bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl p-5 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-dashed border-border">
                  <span className="text-sm text-muted-foreground">Tokens to Claim</span>
                  <span className="text-base font-bold text-[#194a61]">
                    {claimableTokens.toLocaleString()} tokens
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-dashed border-border">
                  <span className="text-sm text-muted-foreground">Current Value</span>
                  <span className="text-base font-bold text-[#194a61]">
                    ${usdValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-dashed border-border">
                  <span className="text-sm text-muted-foreground">Estimated Gas</span>
                  <span className="text-base text-muted-foreground">
                    ~{gasFee} TON (${gasFee.toFixed(2)})
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-bold text-[#194a61]">You'll Receive</span>
                  <span className="text-lg font-bold text-[#10b981]">
                    ${youReceive.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Section */}
            {walletAddress && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#10b981]">✅</span>
                  <span className="text-muted-foreground">Wallet Connected</span>
                </div>
                <p className="text-[13px] text-muted-foreground ml-6 mt-1">
                  {walletAddress}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isClaiming}
                className="flex-1 py-3.5 px-6 bg-transparent border border-border text-muted-foreground rounded-lg font-medium text-[15px] hover:bg-muted transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="flex-1 py-3.5 px-8 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-bold text-base shadow-lg hover:brightness-110 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isClaiming ? 'Claiming...' : 'Confirm Claim'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <div className="text-[80px] mb-4 animate-bounce">✅</div>
              
              <h2 className="text-2xl font-bold text-[#10b981] mb-4">
                Tokens Claimed Successfully!
              </h2>

              <p className="text-[32px] font-bold text-[#194a61] mb-6">
                {claimableTokens.toLocaleString()} tokens
              </p>

              <a
                href={`https://tonscan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#679f83] hover:underline mb-8"
              >
                <span>View on Explorer</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3.5 px-8 bg-[#679f83] text-white rounded-lg font-medium text-base hover:opacity-90 transition-all"
              >
                Done
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClaimEarningsModal;
