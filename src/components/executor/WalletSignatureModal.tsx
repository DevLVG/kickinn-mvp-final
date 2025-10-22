import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WalletSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId: string;
  ventureId: string;
  ventureName: string;
}

const WalletSignatureModal = ({
  isOpen,
  onClose,
  contractId,
  ventureId,
  ventureName,
}: WalletSignatureModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setIsProcessing(true);

    // Simulate wallet connection and signature
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      toast({
        title: 'Contract signed successfully!',
        description: 'You can now access the venture workspace',
      });
    }, 2000);
  };

  const handleGoToWorkspace = () => {
    navigate(`/ventures/${ventureId}`);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-[hsl(var(--primary-dark))] mb-3">
            Contract Signed Successfully!
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            You can now access the venture workspace
          </p>
          <Button
            onClick={handleGoToWorkspace}
            className="w-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold py-6 text-lg"
          >
            Go to Workspace →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <span className="text-5xl">🔐</span>
        </div>

        <h3 className="text-2xl font-bold text-[hsl(var(--primary-dark))] text-center mb-3">
          Connect Your Wallet
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Sign the contract using your blockchain wallet
        </p>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <p className="text-xs text-muted-foreground mb-2">Message to sign:</p>
          <p className="text-xs text-foreground leading-relaxed">
            I agree to the smart contract terms for <strong>{ventureName}</strong>. Contract ID:{' '}
            {contractId}. Timestamp: {new Date().toISOString()}
          </p>
        </div>

        {isProcessing ? (
          <div className="text-center py-8">
            <div className="animate-spin w-12 h-12 border-4 border-[hsl(var(--secondary-teal))] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm font-medium text-muted-foreground">Processing signature...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold py-6"
            >
              🦊 Connect MetaMask
            </Button>
            <Button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-6"
            >
              💎 Connect TON Wallet
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSignatureModal;
