import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EarningsSummaryCard from "@/components/executor/earnings/EarningsSummaryCard";
import QuickActionsBar from "@/components/executor/earnings/QuickActionsBar";
import EarningsChart from "@/components/executor/earnings/EarningsChart";
import TokenBreakdownTable from "@/components/executor/earnings/TokenBreakdownTable";
import TransactionHistory from "@/components/executor/earnings/TransactionHistory";
import EmptyEarningsState from "@/components/executor/earnings/EmptyEarningsState";
import ClaimEarningsModal from "@/components/executor/earnings/ClaimEarningsModal";
import { RefreshCw } from "lucide-react";

const ExecutorEarnings = () => {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user
  const user = {
    name: "Alex Chen",
    email: "alex@example.com",
    initials: "AC"
  };

  // Mock earnings data
  const earningsData = {
    total_earned_usd: 45280,
    vested_claimable: 42500,
    vested_claimable_usd: 10625,
    vesting: 87600,
    vesting_usd: 21900,
    claimed: 120000,
    claimed_usd: 30000,
    daily_unlock_rate: 240,
    ventures_count: 8,
    monthly_growth: 12500
  };

  const hasEarnings = earningsData.total_earned_usd > 0;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleClaimAll = () => {
    if (walletConnected) {
      setShowClaimModal(true);
    }
  };

  const handleClaimSuccess = () => {
    setShowClaimModal(false);
    // Refresh data
    handleRefresh();
  };

  return (
    <DashboardLayout
      activeRole="executor"
      userRoles={['executor']}
      onRoleChange={() => {}}
      user={user}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bold text-[42px] text-[#194a61] mb-2">Your Earnings</h1>
          <p className="text-base text-muted-foreground">
            Track token allocations, vesting, and claims
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-[#679f83] hover:shadow-md hover:scale-105 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {hasEarnings ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <EarningsSummaryCard
              type="total"
              label="Total Earned"
              amount={earningsData.total_earned_usd}
              subtitle={`Across ${earningsData.ventures_count} ventures`}
              trend={`+$${earningsData.monthly_growth.toLocaleString()} this month`}
            />
            <EarningsSummaryCard
              type="claimable"
              label="Vested & Claimable"
              tokenAmount={earningsData.vested_claimable}
              usdAmount={earningsData.vested_claimable_usd}
              onClaim={handleClaimAll}
              canClaim={walletConnected}
            />
            <EarningsSummaryCard
              type="vesting"
              label="Currently Vesting"
              tokenAmount={earningsData.vesting}
              usdAmount={earningsData.vesting_usd}
              dailyUnlock={earningsData.daily_unlock_rate}
              progress={48}
            />
            <EarningsSummaryCard
              type="claimed"
              label="Already Claimed"
              tokenAmount={earningsData.claimed}
              usdAmount={earningsData.claimed_usd}
              lastClaim="3 days ago"
            />
          </div>

          {/* Quick Actions Bar */}
          <QuickActionsBar
            walletConnected={walletConnected}
            onConnectWallet={() => setWalletConnected(true)}
            claimableTotal={earningsData.vested_claimable}
            onClaimAll={handleClaimAll}
            walletAddress={walletConnected ? "UQAbc...xyz" : null}
            walletBalance={walletConnected ? 2450 : 0}
          />

          {/* Earnings Chart */}
          <EarningsChart />

          {/* Token Breakdown Table */}
          <TokenBreakdownTable />

          {/* Transaction History */}
          <TransactionHistory />

          {/* Claim Modal */}
          {showClaimModal && (
            <ClaimEarningsModal
              isOpen={showClaimModal}
              onClose={() => setShowClaimModal(false)}
              onSuccess={handleClaimSuccess}
              claimableTokens={earningsData.vested_claimable}
              usdValue={earningsData.vested_claimable_usd}
              walletAddress={walletConnected ? "UQAbc...xyz" : null}
            />
          )}
        </>
      ) : (
        <EmptyEarningsState />
      )}
    </DashboardLayout>
  );
};

export default ExecutorEarnings;
