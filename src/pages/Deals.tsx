import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DealsStatsBar from '@/components/investor/DealsStatsBar';
import KYCBanner from '@/components/investor/KYCBanner';
import DealsFilterBar from '@/components/investor/DealsFilterBar';
import DealCard from '@/components/investor/DealCard';
import DealsEmptyState from '@/components/investor/DealsEmptyState';
import { Skeleton } from '@/components/ui/skeleton';

interface Deal {
  id: string;
  venture_id: string;
  title: string;
  category: string;
  problem_statement: string;
  validation_score: number;
  traction: {
    users: number;
    mrr: number;
    growth_rate: number;
    live_months: number;
  };
  funding: {
    target: number;
    current: number;
    investors_count: number;
    deadline_hours: number;
  };
  tokenomics: {
    price_per_token: number;
    min_investment: number;
  };
  created_at: string;
  isSaved: boolean;
}

const Deals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedDeals, setSavedDeals] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    validationScore: 'all',
    fundingProgress: 'all',
    sort: 'newest'
  });

  // Mock user data
  const user = {
    name: 'Ahmed Al-Mansoori',
    email: 'ahmed@venture.ae',
    initials: 'AM',
    kyc_status: 'pending' // Change to 'verified' to hide banner
  };

  // Mock deals data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDeals([
        {
          id: '1',
          venture_id: 'v1',
          title: 'ThreadCycle - Fabric Waste Reduction Network',
          category: 'Sustainability',
          problem_statement: 'Fashion industry wastes 92M tons of fabric annually. ThreadCycle connects textile manufacturers with upcycling artisans to give waste fabric new life.',
          validation_score: 8.7,
          traction: {
            users: 1240,
            mrr: 12500,
            growth_rate: 45,
            live_months: 4
          },
          funding: {
            target: 150000,
            current: 87500,
            investors_count: 18,
            deadline_hours: 168
          },
          tokenomics: {
            price_per_token: 0.50,
            min_investment: 1000
          },
          created_at: '2024-03-01',
          isSaved: false
        },
        {
          id: '2',
          venture_id: 'v2',
          title: 'FreshFlow - Farm-to-Table Logistics Platform',
          category: 'AgriTech',
          problem_statement: '40% of farm produce spoils before reaching consumers. FreshFlow optimizes cold chain logistics using AI-powered route planning.',
          validation_score: 9.2,
          traction: {
            users: 3200,
            mrr: 28000,
            growth_rate: 67,
            live_months: 6
          },
          funding: {
            target: 250000,
            current: 215000,
            investors_count: 32,
            deadline_hours: 36
          },
          tokenomics: {
            price_per_token: 0.75,
            min_investment: 1000
          },
          created_at: '2024-02-28',
          isSaved: true
        },
        {
          id: '3',
          venture_id: 'v3',
          title: 'SkillBridge - Blue Collar Worker Upskilling',
          category: 'EdTech',
          problem_statement: 'Construction workers lack accessible skill training. SkillBridge provides micro-credentials through mobile-first learning.',
          validation_score: 7.8,
          traction: {
            users: 890,
            mrr: 6200,
            growth_rate: 32,
            live_months: 3
          },
          funding: {
            target: 100000,
            current: 24000,
            investors_count: 8,
            deadline_hours: 240
          },
          tokenomics: {
            price_per_token: 0.40,
            min_investment: 1000
          },
          created_at: '2024-03-05',
          isSaved: false
        },
        {
          id: '4',
          venture_id: 'v4',
          title: 'CareConnect - Elderly Care Coordination',
          category: 'HealthTech',
          problem_statement: 'Families struggle to coordinate care for aging parents. CareConnect centralizes medical records, appointments, and caregiver scheduling.',
          validation_score: 8.4,
          traction: {
            users: 2100,
            mrr: 18500,
            growth_rate: 52,
            live_months: 5
          },
          funding: {
            target: 200000,
            current: 145000,
            investors_count: 24,
            deadline_hours: 120
          },
          tokenomics: {
            price_per_token: 0.60,
            min_investment: 1000
          },
          created_at: '2024-03-02',
          isSaved: false
        },
        {
          id: '5',
          venture_id: 'v5',
          title: 'PayWise - SME Financial Management',
          category: 'Fintech',
          problem_statement: 'Small businesses lack affordable financial planning tools. PayWise offers AI-powered cash flow forecasting and expense optimization.',
          validation_score: 9.0,
          traction: {
            users: 4500,
            mrr: 35000,
            growth_rate: 78,
            live_months: 8
          },
          funding: {
            target: 300000,
            current: 180000,
            investors_count: 28,
            deadline_hours: 72
          },
          tokenomics: {
            price_per_token: 0.85,
            min_investment: 1000
          },
          created_at: '2024-02-25',
          isSaved: false
        },
        {
          id: '6',
          venture_id: 'v6',
          title: 'RouteGenius - Last Mile Delivery Optimizer',
          category: 'Logistics',
          problem_statement: 'Delivery costs account for 50% of e-commerce expenses. RouteGenius uses ML to optimize delivery routes in real-time.',
          validation_score: 8.1,
          traction: {
            users: 1680,
            mrr: 15200,
            growth_rate: 41,
            live_months: 4
          },
          funding: {
            target: 180000,
            current: 52000,
            investors_count: 12,
            deadline_hours: 192
          },
          tokenomics: {
            price_per_token: 0.55,
            min_investment: 1000
          },
          created_at: '2024-03-03',
          isSaved: false
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  const filteredDeals = useMemo(() => {
    let result = [...deals];

    // Search filter
    if (filters.search) {
      result = result.filter(deal => 
        deal.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        deal.problem_statement.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(deal => deal.category === filters.category);
    }

    // Validation score filter
    if (filters.validationScore !== 'all') {
      const [min, max] = filters.validationScore.split('-').map(Number);
      result = result.filter(deal => 
        deal.validation_score >= min && deal.validation_score <= max
      );
    }

    // Funding progress filter
    if (filters.fundingProgress !== 'all') {
      result = result.filter(deal => {
        const progress = (deal.funding.current / deal.funding.target) * 100;
        switch (filters.fundingProgress) {
          case 'low': return progress < 25;
          case 'medium': return progress >= 25 && progress <= 75;
          case 'high': return progress > 75;
          case 'urgent': return deal.funding.deadline_hours < 48;
          default: return true;
        }
      });
    }

    // Sorting
    switch (filters.sort) {
      case 'validation':
        result.sort((a, b) => b.validation_score - a.validation_score);
        break;
      case 'funding':
        result.sort((a, b) => {
          const progressA = (a.funding.current / a.funding.target) * 100;
          const progressB = (b.funding.current / b.funding.target) * 100;
          return progressB - progressA;
        });
        break;
      case 'urgent':
        result.sort((a, b) => a.funding.deadline_hours - b.funding.deadline_hours);
        break;
      case 'traction':
        result.sort((a, b) => b.traction.mrr - a.traction.mrr);
        break;
      default: // newest
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [deals, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const paginatedDeals = filteredDeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      validationScore: 'all',
      fundingProgress: 'all',
      sort: 'newest'
    });
    setCurrentPage(1);
  };

  // Handle save/unsave deal
  const handleToggleSave = (dealId: string) => {
    setSavedDeals(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    );
    
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { ...deal, isSaved: !deal.isSaved }
        : deal
    ));
  };

  // Stats calculation
  const stats = {
    activeDeals: deals.length,
    totalRaising: deals.reduce((sum, deal) => sum + deal.funding.target, 0) / 1000,
    avgValidation: deals.reduce((sum, deal) => sum + deal.validation_score, 0) / deals.length,
    userInvestments: deals.filter(deal => deal.isSaved).length
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sort' && value !== 'all' && value !== ''
  ).length;

  return (
    <DashboardLayout
      activeRole="investor"
      userRoles={['investor']}
      onRoleChange={() => {}}
      user={user}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark">Investment Opportunities</h1>
          <p className="text-base text-gray-600 mt-2">Validated MVPs ready for funding</p>
        </div>
        <button
          onClick={() => navigate('/portfolio')}
          className="px-5 py-2.5 rounded-lg font-medium text-sm border-2 border-secondary-teal text-secondary-teal hover:bg-secondary-teal hover:text-white transition-all duration-300"
        >
          Portfolio →
        </button>
      </div>

      {/* KYC Banner */}
      {user.kyc_status !== 'verified' && <KYCBanner />}

      {/* Stats Bar */}
      <DealsStatsBar
        stats={stats}
        onPortfolioClick={() => navigate('/portfolio')}
      />

      {/* Filter & Sort Bar */}
      <DealsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        activeFilterCount={activeFilterCount}
        onClearFilters={handleClearFilters}
      />

      {/* Deals List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <Skeleton className="h-6 w-20 mb-3" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-16 w-full mb-4" />
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : paginatedDeals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedDeals.map(deal => (
              <DealCard
                key={deal.id}
                deal={deal}
                onToggleSave={handleToggleSave}
                isKYCVerified={user.kyc_status === 'verified'}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ←
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    currentPage === page
                      ? 'bg-secondary-teal text-white border-secondary-teal'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                →
              </button>

              <span className="ml-4 text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDeals.length)} of {filteredDeals.length} deals
              </span>
            </div>
          )}
        </>
      ) : (
        <DealsEmptyState
          hasDeals={deals.length > 0}
          onClearFilters={handleClearFilters}
        />
      )}
    </DashboardLayout>
  );
};

export default Deals;
