import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface ClaimSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  symbol: string;
  value: number;
  dexUrl: string;
}

const ClaimSuccessModal = ({ isOpen, onClose, amount, symbol, value, dexUrl }: ClaimSuccessModalProps) => {
  const navigate = useNavigate();
  const txHash = "0x1234567890abcdef1234567890abcdef12345678";

  const handleCopyTx = () => {
    navigator.clipboard.writeText(txHash);
    alert("Transaction hash copied!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-10">
        <div className="text-center mb-6">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h2 className="text-4xl font-bold text-[hsl(var(--success))]">Tokens Claimed Successfully!</h2>
        </div>

        {/* Summary */}
        <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] p-6 rounded-xl mb-6">
          <div className="text-center mb-4">
            <p className="text-base text-foreground/70 mb-2">{amount.toLocaleString()} {symbol} claimed</p>
            <p className="text-2xl font-bold text-foreground">Worth ${value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">at current price</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[rgba(16,185,129,0.2)]">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-foreground flex-1 truncate">{txHash}</p>
                <button
                  onClick={handleCopyTx}
                  className="text-lg hover:scale-110 transition-transform"
                  title="Copy"
                >
                  📋
                </button>
              </div>
              <a
                href={`https://tonscan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-block mt-1"
              >
                View on Explorer →
              </a>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Completed At</p>
              <p className="text-xs text-foreground">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">What's Next?</h3>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => window.open(`${dexUrl}/swap?from=${symbol}&to=USDT`, '_blank')}
              className="bg-primary/5 border border-primary/20 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔄</div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground mb-1">Trade on STON.fi</h4>
                  <p className="text-xs text-muted-foreground">Sell your tokens or provide liquidity</p>
                </div>
                <span className="text-xs text-primary">Trade →</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/tokens')}
              className="bg-primary/5 border border-primary/20 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground mb-1">View Transaction History</h4>
                  <p className="text-xs text-muted-foreground">See all your token activity</p>
                </div>
                <span className="text-xs text-primary">View →</span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimSuccessModal;
