import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PortfolioSummary from "@/components/investor/PortfolioSummary";
import PortfolioPerformanceChart from "@/components/investor/PortfolioPerformanceChart";
import PortfolioFilterBar from "@/components/investor/PortfolioFilterBar";
import PortfolioHoldingCard from "@/components/investor/PortfolioHoldingCard";
import PortfolioEmptyState from "@/components/investor/PortfolioEmptyState";
import RefundModal from "@/components/investor/RefundModal";
import ExitModal from "@/components/investor/ExitModal";

interface Holding {
  id: string;
  venture_id: string;
  venture_title: string;
  category: string;
  status: 'active' | 'funding_failed' | 'exit_available' | 'exited';
  investment: {
    amount_usdt: number;
    date: string;
    tokens_received: number;
  };
  current: {
    token_price: number;
    price_change_24h: number;
    total_value: number;
    roi_percent: number;
    roi_amount: number;
  };
  traction?: {
    users: number;
    mrr: number;
    growth_rate: number;
    last_updated: string;
  };
  refund?: {
    available: boolean;
    amount: number;
    deadline: string;
  };
  exit?: {
    available: boolean;
    acquisition_price: number;
    buyer_name: string;
    payout_per_token: number;
    total_payout: number;
    exit_date: string;
  };
  dex_trade_url: string;
}

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('investor');
  const [userRoles] = useState(['investor']);
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    initials: "SC"
  });

  const [timePeriod, setTimePeriod] = useState<'7D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'>('1M');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<string>('Highest ROI');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

  // Mock holdings data
  const holdings: Holding[] = [
    {
      id: '1',
      venture_id: 'v1',
      venture_title: 'HealthTrack AI',
      category: 'HealthTech',
      status: 'active',
      investment: {
        amount_usdt: 25000,
        date: '2024-08-15',
        tokens_received: 83333
      },
      current: {
        token_price: 0.35,
        price_change_24h: 5.2,
        total_value: 29166,
        roi_percent: 16.7,
        roi_amount: 4166
      },
      traction: {
        users: 12500,
        mrr: 45,
        growth_rate: 22,
        last_updated: '2 days ago'
      },
      dex_trade_url: 'https://ston.fi/swap'
    },
    {
      id: '2',
      venture_id: 'v2',
      venture_title: 'AgriConnect',
      category: 'AgriTech',
      status: 'active',
      investment: {
        amount_usdt: 15000,
        date: '2024-09-01',
        tokens_received: 50000
      },
      current: {
        token_price: 0.42,
        price_change_24h: -2.1,
        total_value: 21000,
        roi_percent: 40.0,
        roi_amount: 6000
      },
      traction: {
        users: 8200,
        mrr: 28,
        growth_rate: 18,
        last_updated: '1 day ago'
      },
      dex_trade_url: 'https://ston.fi/swap'
    },
    {
      id: '3',
      venture_id: 'v3',
      venture_title: 'EduStream',
      category: 'EdTech',
      status: 'funding_failed',
      investment: {
        amount_usdt: 10000,
        date: '2024-07-20',
        tokens_received: 33333
      },
      current: {
        token_price: 0,
        price_change_24h: 0,
        total_value: 0,
        roi_percent: -100,
        roi_amount: -10000
      },
      refund: {
        available: true,
        amount: 10000,
        deadline: '2025-01-15'
      },
      dex_trade_url: ''
    },
    {
      id: '4',
      venture_id: 'v4',
      venture_title: 'LogiFlow',
      category: 'Logistics',
      status: 'exit_available',
      investment: {
        amount_usdt: 20000,
        date: '2024-06-10',
        tokens_received: 66667
      },
      current: {
        token_price: 0.55,
        price_change_24h: 0,
        total_value: 36667,
        roi_percent: 83.3,
        roi_amount: 16667
      },
      exit: {
        available: true,
        acquisition_price: 500000,
        buyer_name: 'LogiTech Global',
        payout_per_token: 0.55,
        total_payout: 36667,
        exit_date: '2024-10-15'
      },
      dex_trade_url: ''
    },
    {
      id: '5',
      venture_id: 'v5',
      venture_title: 'FinSmart',
      category: 'Fintech',
      status: 'active',
      investment: {
        amount_usdt: 30000,
        date: '2024-08-01',
        tokens_received: 100000
      },
      current: {
        token_price: 0.38,
        price_change_24h: 3.8,
        total_value: 38000,
        roi_percent: 26.7,
        roi_amount: 8000
      },
      traction: {
        users: 18000,
        mrr: 62,
        growth_rate: 28,
        last_updated: '3 hours ago'
      },
      dex_trade_url: 'https://ston.fi/swap'
    },
    {
      id: '6',
      venture_id: 'v6',
      venture_title: 'RetailSync',
      category: 'Fintech',
      status: 'exited',
      investment: {
        amount_usdt: 18000,
        date: '2024-05-15',
        tokens_received: 60000
      },
      current: {
        token_price: 0,
        price_change_24h: 0,
        total_value: 0,
        roi_percent: 55.6,
        roi_amount: 10000
      },
      exit: {
        available: false,
        acquisition_price: 420000,
        buyer_name: 'Retail Corp',
        payout_per_token: 0.47,
        total_payout: 28000,
        exit_date: '2024-09-20'
      },
      dex_trade_url: ''
    }
  ];

  // Calculate summary
  const totalInvested = holdings.reduce((sum, h) => sum + h.investment.amount_usdt, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.current.total_value, 0);
  const totalROIAmount = currentValue - totalInvested;
  const totalROIPercent = (totalROIAmount / totalInvested) * 100;
  const activeVenturesCount = holdings.filter(h => h.status === 'active').length;
  const growingVentures = holdings.filter(h => h.status === 'active' && h.traction && h.traction.growth_rate > 15).length;
  const exitingVentures = holdings.filter(h => h.status === 'exit_available').length;

  const summary = {
    total_invested: totalInvested,
    current_value: currentValue,
    total_roi_percent: totalROIPercent,
    total_roi_amount: totalROIAmount,
    active_ventures_count: activeVenturesCount,
    growing_ventures: growingVentures,
    exiting_ventures: exitingVentures
  };

  // Filter and sort holdings
  let filteredHoldings = holdings;

  if (statusFilter !== 'All Status') {
    const statusMap: Record<string, string> = {
      'Active': 'active',
      'Funding Failed (refund available)': 'funding_failed',
      'Exit Available': 'exit_available',
      'Exited': 'exited'
    };
    filteredHoldings = filteredHoldings.filter(h => h.status === statusMap[statusFilter]);
  }

  if (categoryFilter !== 'All Categories') {
    filteredHoldings = filteredHoldings.filter(h => h.category === categoryFilter);
  }

  // Sort
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    switch (sortBy) {
      case 'Highest ROI':
        return b.current.roi_percent - a.current.roi_percent;
      case 'Lowest ROI':
        return a.current.roi_percent - b.current.roi_percent;
      case 'Largest Investment':
        return b.investment.amount_usdt - a.investment.amount_usdt;
      case 'Most Recent':
        return new Date(b.investment.date).getTime() - new Date(a.investment.date).getTime();
      case 'Alphabetical (A-Z)':
        return a.venture_title.localeCompare(b.venture_title);
      default:
        return 0;
    }
  });

  const handleRefund = (holding: Holding) => {
    setSelectedHolding(holding);
    setShowRefundModal(true);
  };

  const handleExit = (holding: Holding) => {
    setSelectedHolding(holding);
    setShowExitModal(true);
  };

  const activeFiltersCount = 
    (statusFilter !== 'All Status' ? 1 : 0) + 
    (categoryFilter !== 'All Categories' ? 1 : 0);

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={userRoles}
      onRoleChange={() => {}}
      user={user}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#194a61] mb-2">Investment Portfolio</h1>
          <p className="text-base text-gray-600">Track your holdings and performance</p>
        </div>
        <button
          onClick={() => navigate('/deals')}
          className="bg-gradient-to-r from-[#679f83] to-[#23698a] text-white px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="text-lg">🔍</span>
          Explore New Deals
        </button>
      </div>

      {holdings.length > 0 ? (
        <>
          <PortfolioSummary summary={summary} />

          <PortfolioPerformanceChart 
            timePeriod={timePeriod}
            onTimePeriodChange={setTimePeriod}
          />

          <PortfolioFilterBar
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            sortBy={sortBy}
            onStatusFilterChange={setStatusFilter}
            onCategoryFilterChange={setCategoryFilter}
            onSortByChange={setSortBy}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={() => {
              setStatusFilter('All Status');
              setCategoryFilter('All Categories');
            }}
          />

          {/* Holdings List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHoldings.map((holding) => (
              <PortfolioHoldingCard
                key={holding.id}
                holding={holding}
                onRefund={handleRefund}
                onExit={handleExit}
              />
            ))}
          </div>
        </>
      ) : (
        <PortfolioEmptyState />
      )}

      {/* Modals */}
      {showRefundModal && selectedHolding && (
        <RefundModal
          holding={selectedHolding}
          onClose={() => {
            setShowRefundModal(false);
            setSelectedHolding(null);
          }}
        />
      )}

      {showExitModal && selectedHolding && (
        <ExitModal
          holding={selectedHolding}
          onClose={() => {
            setShowExitModal(false);
            setSelectedHolding(null);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Portfolio;
