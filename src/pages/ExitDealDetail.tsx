import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ExitDealHeader from "@/components/exits/ExitDealHeader";
import ExitPricingCard from "@/components/exits/ExitPricingCard";
import ExitStatsBar from "@/components/exits/ExitStatsBar";
import ExitTabNavigation from "@/components/exits/ExitTabNavigation";
import ExitStickyActionBar from "@/components/exits/ExitStickyActionBar";
import OverviewTab from "@/components/exits/tabs/OverviewTab";
import TractionTab from "@/components/exits/tabs/TractionTab";
import FinancialsTab from "@/components/exits/tabs/FinancialsTab";
import AssetsTab from "@/components/exits/tabs/AssetsTab";
import CapTableTab from "@/components/exits/tabs/CapTableTab";
import LegalTab from "@/components/exits/tabs/LegalTab";
import KYCRequiredModal from "@/components/exits/KYCRequiredModal";
import LoadingSpinner from "@/components/LoadingSpinner";

type TabType = 'overview' | 'traction' | 'financials' | 'assets' | 'cap_table' | 'legal';

const ExitDealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data - in production, get from auth context
  const user = {
    id: "user123",
    name: "John Buyer",
    email: "buyer@example.com",
    initials: "JB",
    role: 'buyer' as const,
    kyc_status: 'pending' as const,
    wallet_connected: false
  };

  // Mock venture data - in production, fetch from API
  const venture = {
    id: id || "1",
    title: "LogiTrack - Fleet Management SaaS",
    description: "AI-powered fleet management platform for logistics companies. Real-time tracking, route optimization, and predictive maintenance.",
    tagline: "Revolutionizing logistics with AI-powered fleet management",
    sector: "SaaS",
    image_url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800",
    is_featured: true,
    status: 'available' as const,
    
    pricing: {
      exit_price_usd: 1850000,
      revenue_multiple: 6.2
    },
    
    metrics: {
      mrr_usd: 24500,
      arr_usd: 294000,
      active_users: 12847,
      paying_customers: 1247,
      growth_rate_monthly: 32,
      churn_rate_monthly: 2.4,
      cac_usd: 42,
      ltv_usd: 680,
      is_profitable: true,
      net_margin_percent: 43,
      arpu: 19.64
    },
    
    listing: {
      listed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      days_on_market: 5
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  }, [id]);

  const handleMakeOffer = () => {
    if (user.kyc_status === 'verified') {
      navigate(`/exits/${id}/offer`);
    } else {
      setShowKYCModal(true);
    }
  };

  const handleScheduleCall = () => {
    // Implement schedule call logic
    console.log("Schedule call clicked");
  };

  const handleRequestInfo = () => {
    // Implement request info logic
    console.log("Request info clicked");
  };

  if (isLoading) {
    return (
      <DashboardLayout
        activeRole="buyer"
        userRoles={['buyer']}
        onRoleChange={() => {}}
        user={user}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      activeRole="buyer"
      userRoles={['buyer']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="min-h-screen bg-gradient-to-b from-[rgba(15,43,56,0.8)] to-[rgba(15,43,56,0.95)]">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0f2b38] via-[#194a61] to-[#0f2b38] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(103,159,131,0.08),transparent_40%)]" />
          
          <div className="relative max-w-7xl mx-auto px-8 py-16">
            <div className="grid lg:grid-cols-[60%_40%] gap-10">
              <ExitDealHeader 
                venture={venture}
                onBack={() => navigate('/exits')}
              />
              <ExitPricingCard
                venture={venture}
                onMakeOffer={handleMakeOffer}
                onScheduleCall={handleScheduleCall}
                onRequestInfo={handleRequestInfo}
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <ExitStatsBar venture={venture} />

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40">
          <ExitTabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          {activeTab === 'overview' && <OverviewTab venture={venture} />}
          {activeTab === 'traction' && <TractionTab venture={venture} />}
          {activeTab === 'financials' && <FinancialsTab venture={venture} />}
          {activeTab === 'assets' && <AssetsTab venture={venture} />}
          {activeTab === 'cap_table' && <CapTableTab venture={venture} />}
          {activeTab === 'legal' && <LegalTab venture={venture} userKYCStatus={user.kyc_status} />}
        </div>

        {/* Sticky Action Bar */}
        <ExitStickyActionBar
          exitPrice={venture.pricing.exit_price_usd}
          multiple={venture.pricing.revenue_multiple}
          onMakeOffer={handleMakeOffer}
          onScheduleCall={handleScheduleCall}
        />

        {/* KYC Modal */}
        <KYCRequiredModal
          isOpen={showKYCModal}
          onClose={() => setShowKYCModal(false)}
          kycStatus={user.kyc_status}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExitDealDetail;
