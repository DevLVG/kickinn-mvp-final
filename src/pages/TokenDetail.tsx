import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TokenSummaryCard from "@/components/tokens/TokenSummaryCard";
import VestingScheduleSection from "@/components/tokens/VestingScheduleSection";
import TokenPriceSection from "@/components/tokens/TokenPriceSection";
import TokenActionsSection from "@/components/tokens/TokenActionsSection";
import TokenActivityLog from "@/components/tokens/TokenActivityLog";
import ClaimTokensModal from "@/components/tokens/ClaimTokensModal";
import ClaimSuccessModal from "@/components/tokens/ClaimSuccessModal";

type UserRole = 'ideator' | 'executor' | 'investor';

const TokenDetail = () => {
  const { venture_id } = useParams();
  const navigate = useNavigate();
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);

  // Mock data - would come from API
  // In real app, this would come from API based on user's role in this venture
  const getUserRole = (): UserRole => {
    // This would be fetched from API
    return 'executor'; // or 'ideator' or 'investor'
  };
  
  const userRole = getUserRole();
  
  const tokenData = {
    venture: {
      id: venture_id || "1",
      title: "LogiTrack - Smart Logistics Platform",
      token_symbol: "LOGI"
    },
    user: {
      role: userRole,
      allocation_percent: 5
    },
    tokens: {
      total_allocated: 50000,
      vested: userRole === 'executor' ? 25000 : 50000,
      unvested: userRole === 'executor' ? 25000 : 0,
      claimable: userRole === 'executor' ? 15000 : 50000,
      already_claimed: userRole === 'executor' ? 10000 : 0,
      vesting_start_date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      vesting_duration_days: 365,
      daily_unlock_rate: userRole === 'executor' ? 137 : 0
    },
    market: {
      current_price_usdt: 0.25,
      price_change_24h: 5.2,
      price_change_24h_amount: 0.012,
      current_value: 12500,
      trading_volume_24h: 45230,
      liquidity_pool_size: 850000,
      dex_url: "https://ston.fi"
    },
    exit_event: {
      is_active: false,
      acquisition_price: 0,
      redemption_value_per_token: 0,
      redemption_deadline: null
    }
  };

  const handleConnectWallet = () => {
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0xAbCd...5678");
    }, 500);
  };

  const handleClaimClick = () => {
    if (!walletConnected) {
      handleConnectWallet();
      return;
    }
    setShowClaimModal(true);
  };

  const handleConfirmClaim = () => {
    setShowClaimModal(false);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setClaimedAmount(tokenData.tokens.claimable);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleSellOnDex = () => {
    window.open(`${tokenData.market.dex_url}/swap?from=${tokenData.venture.token_symbol}&to=USDT`, '_blank');
  };

  const handleRedeem = () => {
    navigate(`/portfolio/${venture_id}/exit`);
  };

  return (
    <DashboardLayout
      activeRole={userRole === 'executor' ? 'executor' : userRole === 'investor' ? 'investor' : 'ideator'}
      userRoles={[userRole]}
      onRoleChange={() => {}}
      user={{ name: "User", email: "user@example.com", initials: "U" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button 
            onClick={() => navigate(userRole === 'investor' ? '/portfolio' : '/ventures')} 
            className="hover:text-primary transition-colors"
          >
            {userRole === 'investor' ? 'Portfolio' : 'My Ventures'}
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate(`/${userRole === 'investor' ? 'portfolio' : 'ventures'}/${venture_id}`)} 
            className="hover:text-primary transition-colors"
          >
            {tokenData.venture.title}
          </button>
          <span>/</span>
          <span className="font-bold text-foreground">Token Details</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {tokenData.venture.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <span className="text-2xl font-bold text-primary">{tokenData.venture.token_symbol}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                userRole === 'ideator' 
                  ? 'bg-[rgba(59,130,246,0.15)] text-[#3b82f6]'
                  : userRole === 'executor'
                  ? 'bg-primary/15 text-primary'
                  : 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b]'
              }`}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-lg hover:shadow-md transition-all"
          >
            <span>←</span>
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Token Summary Card */}
        <TokenSummaryCard 
          data={tokenData} 
          userRole={userRole}
        />

        {/* Vesting Schedule Section - Only for Executors */}
        {userRole === 'executor' && (
          <VestingScheduleSection 
            tokens={tokenData.tokens}
            symbol={tokenData.venture.token_symbol}
          />
        )}

        {/* Price Section */}
        <TokenPriceSection 
          market={tokenData.market}
          symbol={tokenData.venture.token_symbol}
        />

        {/* Action Buttons */}
        <TokenActionsSection
          userRole={userRole}
          tokens={tokenData.tokens}
          market={tokenData.market}
          exitEvent={tokenData.exit_event}
          walletConnected={walletConnected}
          symbol={tokenData.venture.token_symbol}
          onClaimClick={handleClaimClick}
          onSellClick={handleSellOnDex}
          onRedeemClick={handleRedeem}
        />

        {/* Activity Log */}
        <TokenActivityLog 
          ventureId={venture_id || "1"}
          symbol={tokenData.venture.token_symbol}
        />
      </div>

      {/* Modals */}
      <ClaimTokensModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        onConfirm={handleConfirmClaim}
        claimable={tokenData.tokens.claimable}
        symbol={tokenData.venture.token_symbol}
        currentPrice={tokenData.market.current_price_usdt}
        walletAddress={walletAddress}
      />

      <ClaimSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(-1);
        }}
        amount={claimedAmount}
        symbol={tokenData.venture.token_symbol}
        value={claimedAmount * tokenData.market.current_price_usdt}
        dexUrl={tokenData.market.dex_url}
      />
    </DashboardLayout>
  );
};

export default TokenDetail;
