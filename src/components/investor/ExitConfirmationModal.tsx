import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ExitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: any;
  walletAddress: string | null;
}

const ExitConfirmationModal = ({ isOpen, onClose, onConfirm, data, walletAddress }: ExitConfirmationModalProps) => {
  const [checkboxes, setCheckboxes] = useState({
    understand_burn: false,
    agree_terms: false,
    confirm_proceed: false
  });

  const allChecked = checkboxes.understand_burn && checkboxes.agree_terms && checkboxes.confirm_proceed;

  const handleConfirm = () => {
    if (allChecked) {
      onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4 animate-pulse">💰</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Confirm Redemption</h2>
        </div>

        {/* Summary Box */}
        <div className="bg-primary/10 p-5 rounded-lg mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Tokens to Burn</span>
              <span className="font-bold text-lg text-foreground">
                {data.investor.token_count.toLocaleString()} {data.venture.token_symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">You Will Receive</span>
              <span className="font-bold text-2xl text-[hsl(var(--success))]">
                ${data.redemption.expected_payout.toLocaleString()} USDT
              </span>
            </div>
            <div className="pt-3 border-t border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
              <p className="font-mono text-xs text-foreground">{walletAddress}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Gas: ~${data.redemption.gas_estimate} TON</p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-destructive/10 border-2 border-destructive p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-base text-destructive mb-2">This Action is Irreversible</h3>
              <p className="text-sm text-foreground/70">
                Your tokens will be permanently burned and cannot be recovered. Make sure you understand the terms before proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checkboxes.understand_burn}
              onChange={(e) => setCheckboxes({ ...checkboxes, understand_burn: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-border"
            />
            <span className="text-sm text-foreground/80">
              I understand my {data.investor.token_count.toLocaleString()} tokens will be permanently burned
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checkboxes.agree_terms}
              onChange={(e) => setCheckboxes({ ...checkboxes, agree_terms: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-border"
            />
            <span className="text-sm text-foreground/80">
              I have read and agree to the exit terms and conditions
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checkboxes.confirm_proceed}
              onChange={(e) => setCheckboxes({ ...checkboxes, confirm_proceed: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-border"
            />
            <span className="text-sm text-foreground/80">
              I confirm I want to proceed with this redemption
            </span>
          </label>
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
            onClick={handleConfirm}
            disabled={!allChecked}
            className="px-9 py-3 bg-gradient-to-r from-[hsl(var(--success))] to-[#059669] text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Redemption
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitConfirmationModal;
