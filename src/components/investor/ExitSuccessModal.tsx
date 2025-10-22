import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface ExitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  transactionHash: string;
}

const ExitSuccessModal = ({ isOpen, onClose, data, transactionHash }: ExitSuccessModalProps) => {
  const navigate = useNavigate();

  const handleCopyTx = () => {
    navigator.clipboard.writeText(transactionHash);
    alert("Transaction hash copied!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-10">
        <div className="text-center mb-6">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h2 className="text-4xl font-bold text-[hsl(var(--success))] mb-2">Redemption Successful!</h2>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] p-6 rounded-xl mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-foreground/70 mb-2">Amount Received</p>
            <p className="text-5xl font-bold text-[hsl(var(--success))] flex items-center justify-center gap-3">
              ${data.redemption.expected_payout.toLocaleString()} <span className="text-3xl">💵</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">USDT</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[rgba(16,185,129,0.2)]">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-foreground flex-1 truncate">{transactionHash}</p>
                <button
                  onClick={handleCopyTx}
                  className="text-lg hover:scale-110 transition-transform"
                  title="Copy"
                >
                  📋
                </button>
              </div>
              <a
                href={`https://tonscan.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-block mt-1"
              >
                View on Explorer →
              </a>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Sent To</p>
              <p className="font-mono text-xs text-foreground">0xAbCd...5678</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Completed At</p>
              <p className="text-xs text-foreground">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* ROI Summary Card */}
        <div className="bg-card border-2 border-[hsl(var(--success))] p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Your Investment Performance</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Initial Investment</p>
              <p className="text-lg font-bold text-foreground">
                ${data.investor.initial_investment.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Total Received</p>
              <p className="text-lg font-bold text-[hsl(var(--success))]">
                ${data.redemption.expected_payout.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Total Return</p>
              <p className="text-2xl font-bold text-[hsl(var(--success))]">
                +{data.redemption.roi_percent}%
              </p>
              <p className="text-sm text-[#059669]">+${data.redemption.profit_amount.toLocaleString()}</p>
            </div>
          </div>

          <p className="text-sm text-foreground/70 pt-3 border-t border-border">
            Congratulations! Your investment in {data.venture.title} returned {data.redemption.roi_percent}% over the venture's lifetime.
          </p>
        </div>

        {/* Reinvestment Options */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">What's Next?</h3>
          <p className="text-sm text-muted-foreground mb-4">Reinvest your proceeds or stake $KKN for rewards</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => navigate(`/deals?category=${data.venture.category}`)}
              className="bg-primary/5 border border-primary/20 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all text-left"
            >
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="font-bold text-base text-foreground mb-1">Explore Similar Ventures</h4>
              <p className="text-xs text-muted-foreground mb-2">Reinvest in {data.venture.category} ventures</p>
              <span className="text-xs text-primary">View Deals →</span>
            </button>

            <button
              onClick={() => navigate('/tokens/stake')}
              className="bg-primary/5 border border-primary/20 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all text-left"
            >
              <div className="text-2xl mb-2">🪙</div>
              <h4 className="font-bold text-base text-foreground mb-1">Stake $KKN Tokens</h4>
              <p className="text-xs text-muted-foreground mb-2">Earn rewards and early access</p>
              <p className="text-xs font-bold text-[hsl(var(--success))] mb-2">Current APY: 18%</p>
              <span className="text-xs text-primary">Learn More →</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/wallet/withdraw')}
            className="w-full bg-primary/5 border border-primary/20 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 transition-all text-left mt-3"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">💸</div>
              <div>
                <h4 className="font-bold text-base text-foreground mb-1">Withdraw to Bank</h4>
                <p className="text-xs text-muted-foreground">Transfer USDT to your bank account</p>
              </div>
              <span className="text-xs text-primary ml-auto">Withdrawal Options →</span>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/portfolio')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Back to Portfolio
          </button>
          <button
            onClick={() => alert('Receipt download feature coming soon!')}
            className="px-7 py-3 bg-background border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center gap-2"
          >
            <span>📄</span>
            <span>Download Receipt</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitSuccessModal;
