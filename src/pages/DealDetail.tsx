import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DealDetailHeader from '@/components/investor/DealDetailHeader';
import KYCBanner from '@/components/investor/KYCBanner';
import DealFundingProgress from '@/components/investor/DealFundingProgress';
import DealTabNavigation from '@/components/investor/DealTabNavigation';
import OverviewTab from '@/components/investor/deal-tabs/OverviewTab';
import TractionTab from '@/components/investor/deal-tabs/TractionTab';
import TokenomicsTab from '@/components/investor/deal-tabs/TokenomicsTab';
import TeamTab from '@/components/investor/deal-tabs/TeamTab';
import LegalTab from '@/components/investor/deal-tabs/LegalTab';
import StickyInvestmentPanel from '@/components/investor/StickyInvestmentPanel';
import InvestmentModal from '@/components/investor/InvestmentModal';
import { Skeleton } from '@/components/ui/skeleton';

type TabType = 'overview' | 'traction' | 'tokenomics' | 'team' | 'legal';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  // Mock user data
  const user = {
    name: 'Ahmed Al-Mansoori',
    email: 'ahmed@venture.ae',
    initials: 'AM',
    kyc_status: 'pending' as 'pending' | 'verified' | 'rejected' // Change to 'verified' to hide banner
  };

  // Mock deal data
  const deal = {
    id: id || '1',
    venture_id: 'v1',
    title: 'ThreadCycle - Fabric Waste Reduction Network',
    category: 'Sustainability',
    validation_score: 8.7,
    problem_statement: 'The fashion industry generates 92 million tons of textile waste annually, with only 1% being recycled into new fabrics. Small manufacturers and artisans lack access to quality waste materials, while fashion brands struggle with costly waste disposal.',
    solution_description: 'ThreadCycle creates a digital marketplace connecting textile manufacturers with upcycling artisans and small businesses. Our AI-powered platform matches fabric waste with appropriate use cases, optimizing material flow and reducing disposal costs.',
    key_features: [
      { title: 'Waste Matching Algorithm', description: 'AI matches fabric waste with optimal buyers based on material type, quantity, and location' },
      { title: 'Quality Verification', description: 'Automated quality checks ensure material standards meet buyer requirements' },
      { title: 'Logistics Integration', description: 'Built-in shipping coordination reduces transportation costs by 40%' },
      { title: 'Impact Tracking', description: 'Real-time dashboard showing environmental impact and carbon savings' }
    ],
    mvp_demo_url: '',
    mvp_live_link: 'https://threadcycle.demo',
    funding: {
      target: 150000,
      current: 87500,
      threshold_percent: 80,
      deadline_hours: 168,
      investors_count: 18,
      remaining_allocation: 62500
    },
    traction: {
      users: 1240,
      mrr: 12500,
      growth_rate: 45,
      live_months: 4,
      chart_data: [
        { month: 'Nov', revenue: 3200, users: 340 },
        { month: 'Dec', revenue: 5800, users: 580 },
        { month: 'Jan', revenue: 8900, users: 890 },
        { month: 'Feb', revenue: 12500, users: 1240 }
      ],
      milestones: [
        { title: 'MVP Launched', description: 'Platform went live with 20 beta manufacturers', date: 'Nov 1, 2023', completed: true },
        { title: 'First Transactions', description: 'Facilitated first 10 waste-to-product transactions', date: 'Nov 15, 2023', completed: true },
        { title: 'Revenue Milestone', description: 'Reached $1K MRR with 15% commission model', date: 'Dec 10, 2023', completed: true },
        { title: 'Geographic Expansion', description: 'Expanded operations to 3 new cities', date: 'Jan 20, 2024', completed: true }
      ]
    },
    validation: {
      market_depth: 8.9,
      problem_urgency: 8.2,
      solution_uniqueness: 9.0
    },
    tokenomics: {
      total_supply: 1000000,
      price_per_token: 0.50,
      allocations: {
        ideator: 10,
        executors: 35,
        investors: 25,
        liquidity: 15,
        protocol: 15
      },
      min_investment: 1000,
      max_investment: 50000,
      use_of_funds: [
        {
          category: 'Development & Engineering',
          percentage: 40,
          amount: 100000,
          description: 'Backend infrastructure, frontend development, testing, and DevOps',
          breakdown: ['Backend infrastructure: $35K', 'Frontend development: $30K', 'Testing & QA: $20K', 'DevOps & deployment: $15K']
        },
        {
          category: 'Marketing & Growth',
          percentage: 30,
          amount: 75000,
          description: 'User acquisition, content creation, and brand building',
          breakdown: ['Digital marketing: $30K', 'Content creation: $20K', 'Partnerships: $15K', 'Events & PR: $10K']
        },
        {
          category: 'Operations & Support',
          percentage: 20,
          amount: 50000,
          description: 'Customer support, operations, and platform maintenance',
          breakdown: ['Customer support team: $25K', 'Operations: $15K', 'Tools & software: $10K']
        },
        {
          category: 'Emergency Reserves',
          percentage: 10,
          amount: 25000,
          description: 'Buffer for unforeseen expenses and opportunities',
          breakdown: ['Emergency fund: $25K']
        }
      ]
    },
    team: [
      {
        id: 'e1',
        pseudonym: 'Sara',
        location: 'Dubai, UAE',
        role: 'Full-Stack Developer',
        reputation_score: 4.8,
        completed_ventures: 7,
        success_rate: 85,
        skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
      },
      {
        id: 'e2',
        pseudonym: 'Marco',
        location: 'Milan, Italy',
        role: 'UI/UX Designer',
        reputation_score: 4.9,
        completed_ventures: 12,
        success_rate: 92,
        skills: ['Figma', 'UI Design', 'Prototyping', 'User Research']
      },
      {
        id: 'e3',
        pseudonym: 'Yuki',
        location: 'Tokyo, Japan',
        role: 'Marketing Specialist',
        reputation_score: 4.6,
        completed_ventures: 5,
        success_rate: 80,
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics']
      }
    ],
    legal: {
      smart_contract_address: 'EQD5K7...x7Zk',
      token_agreement_url: '/legal/token-agreement.pdf',
      audit_status: 'completed' as const,
      audit_date: 'Feb 15, 2024',
      audit_report_url: '/legal/audit-report.pdf'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Load tab from URL hash
    const hash = window.location.hash.slice(1) as TabType;
    if (hash && ['overview', 'traction', 'tokenomics', 'team', 'legal'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleInvestClick = () => {
    setShowInvestmentModal(true);
  };

  const fundingPercent = (deal.funding.current / deal.funding.target) * 100;

  if (isLoading) {
    return (
      <DashboardLayout
        activeRole="investor"
        userRoles={['investor']}
        onRoleChange={() => {}}
        user={user}
      >
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-96 mb-8" />
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      activeRole="investor"
      userRoles={['investor']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
          <button onClick={() => navigate('/dashboard')} className="hover:text-secondary-teal">
            Dashboard
          </button>
          <span>/</span>
          <button onClick={() => navigate('/deals')} className="hover:text-secondary-teal">
            Deals
          </button>
          <span>/</span>
          <span className="font-bold text-primary-dark">{deal.title}</span>
        </nav>

        {/* Header */}
        <DealDetailHeader
          deal={deal}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onBack={() => navigate('/deals')}
        />

        {/* KYC Banner */}
        {user.kyc_status !== 'verified' && <KYCBanner />}

        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            {/* Funding Progress */}
            <DealFundingProgress
              current={deal.funding.current}
              target={deal.funding.target}
              investorsCount={deal.funding.investors_count}
              deadlineHours={deal.funding.deadline_hours}
              thresholdPercent={deal.funding.threshold_percent}
            />

            {/* Tab Navigation */}
            <DealTabNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Tab Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[600px]">
              {activeTab === 'overview' && <OverviewTab deal={deal} />}
              {activeTab === 'traction' && <TractionTab traction={deal.traction} />}
              {activeTab === 'tokenomics' && <TokenomicsTab tokenomics={deal.tokenomics} target={deal.funding.target} />}
              {activeTab === 'team' && <TeamTab team={deal.team} />}
              {activeTab === 'legal' && <LegalTab legal={deal.legal} />}
            </div>
          </div>

          {/* Sticky Investment Panel (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <StickyInvestmentPanel
              deal={deal}
              fundingPercent={fundingPercent}
              isKYCVerified={user.kyc_status === 'verified'}
              onInvestClick={handleInvestClick}
            />
          </div>
        </div>

        {/* Mobile Investment Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-accent-blue">${deal.tokenomics.price_per_token}</p>
              <p className="text-xs text-gray-500">per token</p>
            </div>
            <button
              onClick={handleInvestClick}
              disabled={user.kyc_status !== 'verified'}
              className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-8 py-3 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Invest
            </button>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <InvestmentModal
          deal={deal}
          isKYCVerified={user.kyc_status === 'verified'}
          onClose={() => setShowInvestmentModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default DealDetail;
