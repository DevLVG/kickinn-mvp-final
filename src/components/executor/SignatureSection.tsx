import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import WalletSignatureModal from './WalletSignatureModal';
import EmailSignatureModal from './EmailSignatureModal';

interface SignatureSectionProps {
  agreementChecked: boolean;
  onAgreementChange: (checked: boolean) => void;
  contractId: string;
  ventureId: string;
  ventureName: string;
}

const SignatureSection = ({
  agreementChecked,
  onAgreementChange,
  contractId,
  ventureId,
  ventureName,
}: SignatureSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const handleWalletSign = () => {
    if (!agreementChecked) {
      toast({
        title: 'Agreement required',
        description: 'Please check the agreement box before signing',
        variant: 'destructive',
      });
      return;
    }
    setShowWalletModal(true);
  };

  const handleEmailSign = () => {
    if (!agreementChecked) {
      toast({
        title: 'Agreement required',
        description: 'Please check the agreement box before signing',
        variant: 'destructive',
      });
      return;
    }
    setShowEmailModal(true);
  };

  const handleReject = () => {
    setShowRejectConfirm(true);
  };

  const confirmReject = () => {
    toast({
      title: 'Contract rejected',
      description: 'Opportunity removed from your list',
    });
    navigate('/executor/opportunities');
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-3 border-purple-500 rounded-xl p-8 mt-10 sticky bottom-5">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] text-center mb-2">
        Sign Contract
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Choose your signature method
      </p>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 mb-6 bg-card p-4 rounded-lg">
        <Checkbox
          id="agreement"
          checked={agreementChecked}
          onCheckedChange={(checked) => onAgreementChange(checked as boolean)}
          className="mt-1"
        />
        <label htmlFor="agreement" className="text-sm text-foreground leading-relaxed cursor-pointer">
          I have read and agree to all terms outlined in this contract, including milestone
          deliverables, token compensation, IP assignment, and quality standards.
        </label>
      </div>

      {/* Signature Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Wallet Signature */}
        <button
          onClick={handleWalletSign}
          disabled={!agreementChecked}
          className="bg-card border-2 border-[hsl(var(--secondary-teal))] rounded-lg p-6 hover:shadow-lg hover:border-[hsl(var(--accent-blue))] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          <div className="inline-block bg-green-500/10 text-green-600 px-2 py-1 rounded-full text-xs font-bold mb-3">
            Recommended
          </div>
          <div className="text-3xl mb-2">🔐</div>
          <h3 className="text-lg font-bold text-[hsl(var(--primary-dark))] mb-2">
            Sign with Wallet
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Secure blockchain signature via MetaMask or TON Connect
          </p>
          <div className="w-full px-3 py-2.5 bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2">
            <span>Connect Wallet & Sign</span>
            <span>→</span>
          </div>
        </button>

        {/* Email Verification */}
        <button
          onClick={handleEmailSign}
          disabled={!agreementChecked}
          className="bg-card border-2 border-gray-400/30 rounded-lg p-6 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          <div className="text-3xl mb-2">✉️</div>
          <h3 className="text-lg font-bold text-[hsl(var(--primary-dark))] mb-2">
            Sign via Email
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Receive verification link to sign electronically
          </p>
          <div className="w-full px-3 py-2.5 border-2 border-gray-400 text-muted-foreground font-bold text-sm rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
            <span>Send Verification Email</span>
            <span>→</span>
          </div>
        </button>
      </div>

      {/* Legal Disclaimer */}
      <p className="text-[11px] text-muted-foreground text-center leading-relaxed mb-6">
        By signing this contract, you are entering into a legally binding agreement. Your digital
        signature has the same validity as a handwritten signature.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          className="border-[hsl(var(--secondary-teal))] text-[hsl(var(--secondary-teal))]"
        >
          ⬇️ Download PDF
        </Button>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/10"
          onClick={handleReject}
        >
          ✕ Reject Contract
        </Button>
      </div>

      {/* Modals */}
      <WalletSignatureModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        contractId={contractId}
        ventureId={ventureId}
        ventureName={ventureName}
      />

      <EmailSignatureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        contractId={contractId}
      />

      {/* Reject Confirmation Modal */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-5xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-[hsl(var(--primary-dark))] text-center mb-3">
              Are you sure?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center mb-6">
              Rejecting this contract will remove you from this venture opportunity. The position
              will be offered to the next best-fit Executor.
            </p>
            <textarea
              placeholder="Reason (optional)..."
              className="w-full h-24 p-3 border border-border rounded-lg text-sm mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20"
              maxLength={300}
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowRejectConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-destructive hover:bg-destructive/90"
                onClick={confirmReject}
              >
                ✕ Yes, Reject Contract
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatureSection;
