import { Link2, AlertTriangle } from "lucide-react";

interface QuickActionsBarProps {
  walletConnected: boolean;
  onConnectWallet: () => void;
  claimableTotal: number;
  onClaimAll: () => void;
  walletAddress: string | null;
  walletBalance: number;
}

const QuickActionsBar = ({
  walletConnected,
  onConnectWallet,
  claimableTotal,
  onClaimAll,
  walletAddress,
  walletBalance
}: QuickActionsBarProps) => {
  
  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert('Address copied!');
    }
  };

  return (
    <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-5 mb-8 flex items-center justify-between flex-wrap gap-4">
      {/* Left Side - Wallet Status */}
      <div className="flex items-center gap-3">
        {walletConnected ? (
          <>
            <div className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse" />
            <div>
              <p className="font-medium text-sm text-[#194a61]">Wallet Connected</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  title="Click to copy"
                >
                  {walletAddress} 📋
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Balance: {walletBalance.toLocaleString()} USDT
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[#f59e0b]">
            <AlertTriangle className="w-4 h-4" />
            Connect wallet to claim tokens
          </div>
        )}
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-3">
        {!walletConnected ? (
          <button
            onClick={onConnectWallet}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#194a61] text-white rounded-lg font-medium text-base hover:opacity-90 transition-all"
          >
            <Link2 className="w-[18px] h-[18px]" />
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={onClaimAll}
            disabled={claimableTotal === 0}
            className={`
              flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium text-base shadow-md transition-all
              ${claimableTotal > 0
                ? 'bg-gradient-to-r from-[#679f83] to-[#23698a] text-white hover:shadow-lg hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            <span className="text-lg">💰</span>
            {claimableTotal > 0 
              ? `Claim All (${claimableTotal.toLocaleString()} tokens)`
              : 'Nothing to Claim'
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickActionsBar;
