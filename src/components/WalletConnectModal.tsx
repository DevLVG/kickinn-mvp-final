import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  action?: string;
}

const WalletConnectModal = ({ isOpen, onClose, action = "continue" }: WalletConnectModalProps) => {
  if (!isOpen) return null;

  const handleConnectMetaMask = async () => {
    try {
      if (typeof (window as any).ethereum !== 'undefined') {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        console.log('MetaMask connected:', accounts[0]);
        onClose();
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  const handleConnectTON = async () => {
    console.log('TON Wallet connection initiated');
    // TON Connect implementation will be added later
    alert('TON Wallet connection coming soon!');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[450px] rounded-2xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(103, 159, 131, 0.3)",
          boxShadow: "0 16px 48px rgba(15, 43, 56, 0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-opacity"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="text-center text-5xl mb-4">🔗</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          Connect Wallet to Continue
        </h2>

        {/* Description */}
        <p className="text-sm text-white/70 text-center mb-6">
          You need a wallet to {action}
        </p>

        {/* Wallet Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleConnectMetaMask}
            className="w-full py-4 text-base font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(103, 159, 131, 0.3)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(103, 159, 131, 1)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(103, 159, 131, 0.3)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <span className="text-2xl">🦊</span>
            Connect with MetaMask
          </Button>

          <Button
            onClick={handleConnectTON}
            className="w-full py-4 text-base font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(103, 159, 131, 0.3)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(103, 159, 131, 1)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(103, 159, 131, 0.3)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <span className="text-2xl">💎</span>
            Connect with TON Wallet
          </Button>
        </div>

        {/* Learn More Link */}
        <p className="text-xs text-white/60 text-center mt-6">
          <a 
            href="/help/wallets" 
            className="text-light-teal underline hover:opacity-100 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about wallets →
          </a>
        </p>
      </div>
    </div>
  );
};

export default WalletConnectModal;