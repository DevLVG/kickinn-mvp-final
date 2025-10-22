import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ExitConfirmationModal from "@/components/investor/ExitConfirmationModal";
import ExitSuccessModal from "@/components/investor/ExitSuccessModal";

const ExitRedemption = () => {
  const { venture_id } = useParams();
  const navigate = useNavigate();
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllAllocations, setShowAllAllocations] = useState(false);

  // Mock data - would come from API
  const exitData = {
    venture: {
      id: venture_id || "1",
      title: "LogiTrack - Smart Logistics Platform",
      category: "Logistics",
      token_symbol: "LOGI"
    },
    acquisition: {
      buyer_name: "GlobalShip Inc.",
      buyer_type: "Strategic Buyer",
      acquisition_price: 850000,
      acquisition_date: "2025-10-15",
      platform_fee: 170000,
      total_distribution: 680000,
      investor_pool: 170000,
      redemption_deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    investor: {
      token_count: 10000,
      percentage_of_pool: 4,
      initial_investment: 5000,
      entry_price: 0.50
    },
    redemption: {
      redemption_rate: 0.68,
      expected_payout: 6800,
      roi_percent: 36,
      profit_amount: 1800,
      gas_estimate: 0.75
    },
    allocations: {
      ideator: 68000,
      executors: 204000,
      platform: 238000
    }
  };

  const calculateDaysRemaining = () => {
    const deadline = new Date(exitData.acquisition.redemption_deadline);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const handleConnectWallet = () => {
    // Mock wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0xAbCd...5678");
      setCurrentStep(2);
    }, 500);
  };

  const handleRedeem = () => {
    if (!walletConnected) {
      alert("Please connect your wallet first");
      return;
    }
    setCurrentStep(3);
    setShowConfirmationModal(true);
  };

  const handleConfirmRedemption = () => {
    setShowConfirmationModal(false);
    setCurrentStep(4);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 3000);
  };

  useEffect(() => {
    // Auto-advance step 1
    setTimeout(() => setCurrentStep(2), 1000);
  }, []);

  const daysRemaining = calculateDaysRemaining();

  return (
    <DashboardLayout
      activeRole="investor"
      userRoles={["investor"]}
      onRoleChange={() => {}}
      user={{ name: "Investor User", email: "investor@example.com", initials: "IU" }}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Celebration Banner */}
        <div className="bg-gradient-to-r from-[rgba(16,185,129,0.15)] to-[rgba(5,150,105,0.15)] border-2 border-[hsl(var(--success))] rounded-2xl p-6 md:p-8 mb-8 animate-in slide-in-from-top duration-500">
          <div className="flex items-start gap-4">
            <span className="text-4xl md:text-5xl animate-bounce">🎉</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--success))] mb-2">
                Congratulations on Your Exit!
              </h2>
              <p className="text-base text-foreground/80">
                This venture has been successfully acquired. You can now redeem your tokens for USDT.
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate('/portfolio')} className="hover:text-primary transition-colors">
            Portfolio
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/portfolio/${venture_id}`)} className="hover:text-primary transition-colors">
            {exitData.venture.title}
          </button>
          <span>/</span>
          <span className="font-bold text-foreground">Exit Redemption</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {exitData.venture.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📂</span>
              <span>{exitData.venture.category}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(16,185,129,0.15)] to-[rgba(5,150,105,0.15)] border border-[hsl(var(--success))] rounded-full">
              <span>🏁</span>
              <span className="font-bold text-sm text-[hsl(var(--success))]">Acquired</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-lg hover:shadow-md transition-all"
          >
            <span>←</span>
            <span className="font-medium">Back to Portfolio</span>
          </button>
        </div>

        {/* Deadline Warning */}
        {daysRemaining <= 7 && (
          <div className="bg-[rgba(245,158,11,0.1)] border-2 border-[hsl(var(--warning))] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">⏰</span>
              <div>
                <p className="font-bold text-[hsl(var(--warning))] mb-1">
                  Redemption Deadline: {new Date(exitData.acquisition.redemption_deadline).toLocaleDateString()}
                </p>
                <p className="text-sm text-foreground/70 mb-2">
                  {daysRemaining} days remaining
                </p>
                <p className="text-xs text-foreground/60">
                  Please redeem your tokens before the deadline to receive your payout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Acquisition Details */}
        <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Acquisition Details</h2>
            <span className="text-3xl opacity-30">🚪</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Buyer Info */}
            <div>
              <p className="text-sm font-bold text-foreground/70 mb-2">Acquired By</p>
              <p className="text-xl font-bold text-foreground mb-1">
                {exitData.acquisition.buyer_name}
              </p>
              <p className="text-sm text-muted-foreground">{exitData.acquisition.buyer_type}</p>
            </div>

            {/* Acquisition Price */}
            <div>
              <p className="text-sm font-bold text-foreground/70 mb-2">Total Acquisition Price</p>
              <p className="text-3xl font-bold text-[hsl(var(--success))] flex items-center gap-2">
                <span>💰</span>
                ${exitData.acquisition.acquisition_price.toLocaleString()}
              </p>
            </div>

            {/* Acquisition Date */}
            <div>
              <p className="text-sm font-bold text-foreground/70 mb-2">Acquisition Date</p>
              <p className="text-base text-foreground flex items-center gap-2">
                <span>📅</span>
                {new Date(exitData.acquisition.acquisition_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Payout Breakdown */}
          <div className="bg-primary/5 p-5 rounded-lg border border-primary/20 mt-6">
            <p className="text-base font-bold text-foreground mb-4">Payout Distribution</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Total Acquisition</span>
                <span className="font-bold text-foreground">
                  ${exitData.acquisition.acquisition_price.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Kick Inn Success Fee (20%)</span>
                <span className="text-sm text-destructive">
                  - ${exitData.acquisition.platform_fee.toLocaleString()}
                </span>
              </div>
              
              <div className="border-t-2 border-primary/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-foreground">Total for Token Holders</span>
                  <span className="text-lg font-bold text-[hsl(var(--success))]">
                    ${exitData.acquisition.total_distribution.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Investor Pool (25%)</span>
                <span className="font-bold text-base text-primary">
                  ${exitData.acquisition.investor_pool.toLocaleString()}
                </span>
              </div>

              {/* Expandable allocations */}
              <button
                onClick={() => setShowAllAllocations(!showAllAllocations)}
                className="text-xs text-primary hover:underline w-full text-left pt-2"
              >
                {showAllAllocations ? '▲' : '▼'} View All Allocations
              </button>

              {showAllAllocations && (
                <div className="space-y-2 pt-2 border-t border-primary/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Ideator Pool (10%)</span>
                    <span className="text-foreground">${exitData.allocations.ideator.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Executor Pool (30%)</span>
                    <span className="text-foreground">${exitData.allocations.executors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Platform Reserve (35%)</span>
                    <span className="text-foreground">${exitData.allocations.platform.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Investor Redemption Card */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-xl p-6 md:p-8 shadow-md mb-6">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Your Redemption</h2>
            <p className="text-sm text-foreground/70">Calculate your payout from this acquisition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Token Holdings */}
            <div>
              <p className="text-sm font-bold text-foreground/70 mb-2">Your Token Holdings</p>
              <p className="text-2xl font-bold text-foreground mb-1">
                {exitData.investor.token_count.toLocaleString()} {exitData.venture.token_symbol}
              </p>
              <p className="text-sm text-muted-foreground">
                {exitData.investor.percentage_of_pool}% of investor pool
              </p>
            </div>

            {/* Redemption Rate */}
            <div>
              <p className="text-sm font-bold text-foreground/70 mb-2">Redemption Rate</p>
              <p className="text-xl font-bold text-primary mb-1">
                ${exitData.redemption.redemption_rate} per token
              </p>
              <p className="text-xs text-muted-foreground">
                Calculated: ${exitData.acquisition.investor_pool.toLocaleString()} ÷ {(exitData.acquisition.investor_pool / exitData.redemption.redemption_rate).toLocaleString()} tokens
              </p>
            </div>
          </div>

          {/* Expected Payout */}
          <div className="bg-card p-6 rounded-xl border-2 border-[hsl(var(--success))] shadow-lg">
            <p className="text-sm font-bold text-foreground/70 mb-3">You Will Receive</p>
            <p className="text-4xl md:text-5xl font-bold text-[hsl(var(--success))] flex items-center gap-3">
              ${exitData.redemption.expected_payout.toLocaleString()} <span className="text-3xl">💵</span>
            </p>
            <p className="text-xs text-muted-foreground">USDT</p>

            <div className="bg-primary/5 p-4 rounded-lg mt-4">
              <p className="text-xs font-mono text-foreground/70">
                {exitData.investor.token_count.toLocaleString()} tokens × ${exitData.redemption.redemption_rate} = ${exitData.redemption.expected_payout.toLocaleString()}
              </p>
            </div>
          </div>

          {/* ROI Display */}
          <div className="bg-[rgba(16,185,129,0.05)] p-5 rounded-lg border-l-4 border-[hsl(var(--success))] mt-6">
            <p className="text-lg font-bold text-foreground mb-4">Your Return on Investment</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Initial Investment</p>
                <p className="text-lg md:text-xl font-bold text-foreground">
                  ${exitData.investor.initial_investment.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Total Received</p>
                <p className="text-lg md:text-xl font-bold text-[hsl(var(--success))]">
                  ${exitData.redemption.expected_payout.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Total Return</p>
                <p className="text-xl md:text-2xl font-bold text-[hsl(var(--success))]">
                  +{exitData.redemption.roi_percent}%
                </p>
                <p className="text-sm text-[hsl(var(--success))]">
                  +${exitData.redemption.profit_amount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-[hsl(var(--success))]"
                style={{ width: `${Math.min(exitData.redemption.roi_percent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Redemption Process */}
        <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Redemption Process</h2>
            <p className="text-sm text-muted-foreground">Follow these steps to claim your payout</p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Review Acquisition Details</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Verify the acquisition price, your token holdings, and expected payout amount.
                </p>
                <span className="text-xs text-[hsl(var(--success))] font-bold">✓ Complete</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-border">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                walletConnected ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
              }`}>
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect the wallet that holds your tokens to receive your USDT payout.
                </p>
                {walletConnected ? (
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--success))] font-bold">
                    <span>✓</span>
                    <span>Wallet Connected: {walletAddress}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-border">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                currentStep >= 3 ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
              }`}>
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Confirm Token Redemption</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Confirm the transaction to burn your tokens and receive USDT. This action is irreversible.
                </p>
                <div className="bg-destructive/5 border border-destructive/30 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-sm">⚠️</span>
                    <p className="text-xs text-destructive">
                      Your tokens will be permanently burned after redemption.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                currentStep >= 4 ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
              }`}>
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">Receive USDT Payout</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  USDT will be transferred to your connected wallet. Transaction typically completes within 1-2 minutes.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>⏱️</span>
                  <span>Estimated time: 1-2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-primary/5 border-l-4 border-primary p-5 md:p-6 rounded-lg mb-8">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-lg">ℹ️</span>
            <h3 className="text-base font-bold text-foreground">Important Information</h3>
          </div>
          <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-8">
            <li>Token redemption is irreversible. Your tokens will be permanently burned.</li>
            <li>USDT will be sent to your connected wallet address.</li>
            <li>Ensure sufficient TON balance for gas fees (approximately $0.50-$1).</li>
            <li>Transaction receipt will be available in your portfolio after completion.</li>
            <li>Contact support at support@kickinn.io if you encounter any issues.</li>
          </ul>
        </div>

        {/* Redeem Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleRedeem}
            disabled={!walletConnected}
            className="bg-gradient-to-r from-[hsl(var(--success))] to-[#059669] text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <span>Redeem {exitData.investor.token_count.toLocaleString()} Tokens for ${exitData.redemption.expected_payout.toLocaleString()}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ExitConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmRedemption}
        data={exitData}
        walletAddress={walletAddress}
      />

      <ExitSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/portfolio');
        }}
        data={exitData}
        transactionHash="0x1234567890abcdef1234567890abcdef12345678"
      />
    </DashboardLayout>
  );
};

export default ExitRedemption;
