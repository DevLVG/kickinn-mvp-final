import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import VentureDetailHeader from "@/components/investor/venture-detail/VentureDetailHeader";
import VentureSummaryCards from "@/components/investor/venture-detail/VentureSummaryCards";
import VentureTabNavigation from "@/components/investor/venture-detail/VentureTabNavigation";
import VentureOverviewTab from "@/components/investor/venture-detail/VentureOverviewTab";
import VentureTractionTab from "@/components/investor/venture-detail/VentureTractionTab";
import VentureMilestonesTab from "@/components/investor/venture-detail/VentureMilestonesTab";
import VentureLiquidityTab from "@/components/investor/venture-detail/VentureLiquidityTab";
import VentureNotificationsTab from "@/components/investor/venture-detail/VentureNotificationsTab";
import VentureActionPanel from "@/components/investor/venture-detail/VentureActionPanel";
import RedemptionModal from "@/components/investor/RedemptionModal";
import RefundModal from "@/components/investor/RefundModal";
import { toast } from "sonner";

const VentureDetail = () => {
  const { venture_id } = useParams();
  const navigate = useNavigate();
  
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('investor');
  const [userRoles] = useState(['investor']);
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    initials: "SC"
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'traction' | 'milestones' | 'liquidity' | 'notifications'>('overview');
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Mock venture data
  const venture = {
    id: venture_id,
    title: 'HealthTrack AI',
    category: 'HealthTech',
    venture_code: 'VNT-00234',
    status: 'active' as 'active' | 'building' | 'funding' | 'live' | 'exit_available' | 'exited' | 'funding_failed',
    description: {
      problem: 'Healthcare providers struggle with inefficient patient data management, leading to delayed diagnoses and treatment errors. Manual record-keeping costs the industry $150B annually in the US alone.',
      solution: 'HealthTrack AI automates medical record processing using advanced NLP and provides real-time clinical decision support. Our platform integrates seamlessly with existing EMR systems.',
      target_market: 'Small to medium healthcare clinics (10-100 practitioners) in North America. Target 50,000 clinics with $2.5B TAM.'
    },
    validation_score: {
      overall: 8.7,
      market_viability: 9.2,
      problem_clarity: 8.5,
      solution_feasibility: 8.3,
      business_model: 8.8
    },
    team: [
      {
        role: 'Full-Stack Developer',
        reputation_score: 9.2,
        completed_projects: 12,
        on_time_delivery: 95
      },
      {
        role: 'UI/UX Designer',
        reputation_score: 8.8,
        completed_projects: 8,
        on_time_delivery: 92
      },
      {
        role: 'Backend Engineer',
        reputation_score: 9.5,
        completed_projects: 15,
        on_time_delivery: 98
      }
    ]
  };

  const investment = {
    token_count: 83333,
    token_symbol: 'HLTH',
    allocation_percent: 8.33,
    invested_amount: 25000,
    entry_price: 0.30,
    current_price: 0.35,
    current_value: 29166,
    roi_percent: 16.7,
    roi_amount: 4166,
    price_change_24h: 5.2
  };

  const traction = {
    users: { count: 12500, change: 1500, change_percent: 13.6 },
    revenue: { mrr: 45000, arr: 540000, change: 8000, change_percent: 21.6 },
    growth_rate: 22,
    chart_data: [
      { week: 'Week 1', users: 8200, revenue: 28000, signups: 420 },
      { week: 'Week 2', users: 8900, revenue: 31000, signups: 480 },
      { week: 'Week 3', users: 9500, revenue: 34000, signups: 520 },
      { week: 'Week 4', users: 10200, revenue: 37000, signups: 580 },
      { week: 'Week 5', users: 10800, revenue: 39000, signups: 610 },
      { week: 'Week 6', users: 11400, revenue: 42000, signups: 650 },
      { week: 'Week 7', users: 12000, revenue: 43000, signups: 680 },
      { week: 'Week 8', users: 12500, revenue: 45000, signups: 720 }
    ],
    last_updated: '2 days ago',
    next_update: 'in 5 days'
  };

  const milestones = [
    {
      id: '1',
      title: 'Core EMR Integration Module',
      description: 'Build API connectors for top 3 EMR systems (Epic, Cerner, Allscripts)',
      status: 'approved' as const,
      deadline: '2024-09-15',
      executor_role: 'Backend Engineer',
      validated_by_kickinn: true,
      deliverables: ['API connector documentation', 'Test coverage reports', 'Integration demo video']
    },
    {
      id: '2',
      title: 'AI-Powered Clinical Decision Support',
      description: 'Implement ML model for diagnosis suggestions based on patient symptoms and history',
      status: 'in_progress' as const,
      deadline: '2024-11-01',
      executor_role: 'Full-Stack Developer',
      validated_by_kickinn: false,
      deliverables: []
    },
    {
      id: '3',
      title: 'Mobile App (iOS & Android)',
      description: 'Build native mobile applications for healthcare providers to access platform on-the-go',
      status: 'not_started' as const,
      deadline: '2024-12-15',
      executor_role: 'Full-Stack Developer',
      validated_by_kickinn: false,
      deliverables: []
    }
  ];

  const liquidity = {
    dex: {
      platform: 'STON.fi' as const,
      dex_url: 'https://ston.fi/swap?ft=HLTH',
      liquidity_pool_size: 450000,
      trading_volume_24h: 85000,
      price_chart_url: 'https://ston.fi/chart/HLTH'
    },
    staking: {
      is_enabled: true,
      apy: 12.5,
      staked_amount: 10000,
      staked_value: 3500,
      pending_rewards: 125,
      rewards_value: 43.75
    },
    exit_event: {
      is_active: false,
      acquirer_name: '',
      acquisition_price: 0,
      redemption_per_token: 0,
      total_redemption: 0,
      redemption_deadline: '',
      days_remaining: 0
    },
    transactions: [
      { id: '1', type: 'buy' as const, amount: 83333, price: 0.30, value: 25000, date: '2024-08-15' },
      { id: '2', type: 'stake' as const, amount: 10000, price: 0.32, value: 3200, date: '2024-09-01' }
    ]
  };

  const notifications = [
    {
      id: '1',
      type: 'milestone' as const,
      title: 'Milestone Completed',
      message: "'Core EMR Integration Module' has been completed and approved.",
      timestamp: '2 hours ago',
      is_read: false,
      action_url: '#milestones'
    },
    {
      id: '2',
      type: 'traction' as const,
      title: 'Weekly Traction Update',
      message: 'Users increased by 13.6%. Current: 12,500.',
      timestamp: '2 days ago',
      is_read: true
    },
    {
      id: '3',
      type: 'validation' as const,
      title: 'Milestone Validated',
      message: "'Core EMR Integration Module' has been validated by Kick Inn AI.",
      timestamp: '3 days ago',
      is_read: true
    },
    {
      id: '4',
      type: 'trading' as const,
      title: 'Price Alert',
      message: 'Token price increased by 5.2% in 24h. Current: $0.35.',
      timestamp: '1 week ago',
      is_read: true
    }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  // Simulated WebSocket for real-time updates
  useEffect(() => {
    console.log('WebSocket connected for venture:', venture_id);
    // In production, connect to WebSocket here
    return () => {
      console.log('WebSocket disconnected');
    };
  }, [venture_id]);

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={userRoles}
      onRoleChange={() => {}}
      user={user}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <button onClick={() => navigate('/portfolio')} className="hover:text-[#679f83] transition-colors">
          Portfolio
        </button>
        <span>/</span>
        <span className="font-bold text-[#194a61]">{venture.title}</span>
      </div>

      {/* Header */}
      <VentureDetailHeader 
        venture={venture}
        onShare={handleShare}
        onBack={() => navigate(-1)}
      />

      {/* Summary Cards */}
      <VentureSummaryCards investment={investment} dex={liquidity.dex} />

      {/* Tab Navigation */}
      <VentureTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'overview' && <VentureOverviewTab venture={venture} />}
          {activeTab === 'traction' && <VentureTractionTab traction={traction} />}
          {activeTab === 'milestones' && <VentureMilestonesTab milestones={milestones} />}
          {activeTab === 'liquidity' && (
            <VentureLiquidityTab 
              liquidity={liquidity}
              investment={investment}
              onRedeem={() => setShowRedemptionModal(true)}
            />
          )}
          {activeTab === 'notifications' && <VentureNotificationsTab notifications={notifications} />}
        </div>

        {/* Action Panel (Desktop) */}
        <div className="hidden lg:block">
          <VentureActionPanel
            venture={venture}
            liquidity={liquidity}
            dexUrl={liquidity.dex.dex_url}
            onTrade={() => window.open(liquidity.dex.dex_url, '_blank')}
            onRedeem={() => setShowRedemptionModal(true)}
            onRefund={() => setShowRefundModal(true)}
          />
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[rgba(103,159,131,0.2)] p-4 shadow-2xl z-40">
        <button
          onClick={() => window.open(liquidity.dex.dex_url, '_blank')}
          className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] text-white py-3 px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <span className="text-base">🔄</span>
          Trade on DEX
        </button>
      </div>

      {/* Modals */}
      {showRedemptionModal && liquidity.exit_event.is_active && (
        <RedemptionModal
          venture={venture}
          investment={investment}
          exitEvent={liquidity.exit_event}
          onClose={() => setShowRedemptionModal(false)}
        />
      )}

      {showRefundModal && venture.status === 'funding_failed' && (
        <RefundModal
          holding={{
            id: venture.id || '',
            venture_title: venture.title,
            investment: {
              amount_usdt: investment.invested_amount,
              tokens_received: investment.token_count
            },
            refund: {
              amount: investment.invested_amount
            }
          }}
          onClose={() => setShowRefundModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default VentureDetail;
