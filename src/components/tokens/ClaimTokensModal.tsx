import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ClaimTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  claimable: number;
  symbol: string;
  currentPrice: number;
  walletAddress: string | null;
}

const ClaimTokensModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  claimable, 
  symbol, 
  currentPrice,
  walletAddress 
}: ClaimTokensModalProps) => {
  const value = claimable * currentPrice;
  const gasEstimate = 0.75;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4 animate-pulse">💰</div>
          <h2 className="text-3xl font-bold text-foreground">Claim Vested Tokens</h2>
        </div>

        {/* Claim Summary Card */}
        <div className="bg-[rgba(16,185,129,0.1)] p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/70 mb-1">Tokens to Claim</p>
              <p className="text-4xl font-bold text-[hsl(var(--success))]">
                {claimable.toLocaleString()} {symbol}
              </p>
            </div>

            <div>
              <p className="text-sm text-foreground/70 mb-1">Current Value</p>
              <p className="text-2xl font-bold text-foreground">
                ≈ ${value.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                @ ${currentPrice} per token
              </p>
            </div>

            <div className="pt-3 border-t border-[rgba(16,185,129,0.2)]">
              <p className="text-sm text-foreground/70 mb-1">Claiming to</p>
              <p className="font-mono text-xs text-foreground">{walletAddress}</p>
            </div>

            <div>
              <p className="text-sm text-foreground/70 mb-1">Estimated Gas Fee</p>
              <p className="text-base font-bold text-foreground">~${gasEstimate} TON</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-lg mb-6">
          <div className="flex items-start gap-2">
            <span className="text-base">ℹ️</span>
            <div>
              <p className="text-sm font-bold text-foreground mb-2">What happens next?</p>
              <ul className="text-xs text-foreground/80 space-y-1">
                <li>• Tokens will be transferred to your connected wallet</li>
                <li>• Transaction typically completes within 1-2 minutes</li>
                <li>• You can then trade tokens on STON.fi or hold for value appreciation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-7 py-3 bg-background border-2 border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-9 py-3 bg-gradient-to-r from-[hsl(var(--success))] to-[#059669] text-white rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Claim Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimTokensModal;
