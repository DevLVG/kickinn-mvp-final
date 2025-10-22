import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ActiveProjectsBanner from '@/components/executor/ActiveProjectsBanner';
import OpportunityFilterBar from '@/components/executor/OpportunityFilterBar';
import OpportunityCard from '@/components/executor/OpportunityCard';
import IdeasPagination from '@/components/ideas/IdeasPagination';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Opportunity {
  id: string;
  ventureId: string;
  ventureTitle: string;
  role: string;
  scope: string[];
  timeline: number;
  requiredSkills: string[];
  tokenReward: number;
  tokenValue: number;
  allocationPercentage: number;
  fitScore: number;
  deadline: string;
  applicationsCount: number;
  status: 'open' | 'filled' | 'expired';
  ventureStatus: string;
  isSaved: boolean;
}

// Mock data
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    ventureId: 'v1',
    ventureTitle: 'ThreadCycle - Fabric Sharing Platform',
    role: 'Frontend Developer',
    scope: ['5 screens', 'API integration', 'Responsive design', 'Testing included'],
    timeline: 3,
    requiredSkills: ['React', 'TypeScript', 'Tailwind', 'REST APIs'],
    tokenReward: 13000,
    tokenValue: 3900,
    allocationPercentage: 3.5,
    fitScore: 94,
    deadline: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    applicationsCount: 3,
    status: 'open',
    ventureStatus: 'MVP build starting soon',
    isSaved: false,
  },
  {
    id: '2',
    ventureId: 'v2',
    ventureTitle: 'EcoMarket - Sustainable Products Platform',
    role: 'Full-Stack Developer',
    scope: ['8 screens', 'Payment integration', 'Admin dashboard', 'Database design'],
    timeline: 5,
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    tokenReward: 22000,
    tokenValue: 6600,
    allocationPercentage: 4.2,
    fitScore: 87,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicationsCount: 7,
    status: 'open',
    ventureStatus: 'Matching executors',
    isSaved: false,
  },
  {
    id: '3',
    ventureId: 'v3',
    ventureTitle: 'SkillSwap - Peer Learning Network',
    role: 'UI/UX Designer',
    scope: ['User flow design', 'Wireframes', 'High-fidelity mockups', 'Design system'],
    timeline: 4,
    requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    tokenReward: 15000,
    tokenValue: 4500,
    allocationPercentage: 3.0,
    fitScore: 76,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    applicationsCount: 2,
    status: 'open',
    ventureStatus: 'Validated',
    isSaved: true,
  },
];

const ExecutorOpportunities = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filters, setFilters] = useState({
    role: 'all',
    skills: [] as string[],
    fitScore: 'all',
    tokenRange: 'all',
  });
  const [sorting, setSorting] = useState<{
    field: 'fitScore' | 'reward' | 'timeline' | 'recent' | 'deadline';
    order: 'asc' | 'desc';
  }>({
    field: 'fitScore',
    order: 'desc',
  });
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock executor data
  const executor = {
    activeProjectsCount: 1,
    skills: ['React', 'TypeScript', 'Tailwind', 'REST APIs', 'Node.js'],
    savedOpportunities: ['3'],
  };

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    initials: 'SJ',
  };

  const handleSaveToggle = (opportunityId: string) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === opportunityId ? { ...opp, isSaved: !opp.isSaved } : opp
      )
    );
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (filters.role !== 'all' && opp.role !== filters.role) return false;
    if (filters.skills.length > 0) {
      const hasRequiredSkill = filters.skills.some(skill =>
        opp.requiredSkills.includes(skill)
      );
      if (!hasRequiredSkill) return false;
    }
    if (filters.fitScore === 'excellent' && opp.fitScore < 90) return false;
    if (filters.fitScore === 'good' && (opp.fitScore < 75 || opp.fitScore >= 90)) return false;
    if (filters.fitScore === 'fair' && (opp.fitScore < 60 || opp.fitScore >= 75)) return false;
    if (filters.tokenRange === '10k' && opp.tokenReward < 10000) return false;
    if (filters.tokenRange === '20k' && opp.tokenReward < 20000) return false;
    if (filters.tokenRange === '30k' && opp.tokenReward < 30000) return false;
    if (filters.tokenRange === '50k' && opp.tokenReward < 50000) return false;
    return true;
  });

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sorting.field === 'fitScore') {
      return b.fitScore - a.fitScore;
    }
    if (sorting.field === 'reward') {
      return sorting.order === 'desc'
        ? b.tokenReward - a.tokenReward
        : a.tokenReward - b.tokenReward;
    }
    if (sorting.field === 'timeline') {
      return sorting.order === 'asc'
        ? a.timeline - b.timeline
        : b.timeline - a.timeline;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedOpportunities.length / itemsPerPage);
  const paginatedOpportunities = sortedOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout
      activeRole="executor"
      userRoles={['executor']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">Opportunities for You</h1>
            <p className="text-base text-muted-foreground mt-2">
              AI-matched ventures based on your skills
            </p>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-secondary-teal hover:opacity-80 transition-opacity">
                  <Info className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-sm">
                  Opportunities are ranked by fit score based on your skills, experience, and availability
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Active Projects Banner */}
        <ActiveProjectsBanner
          activeCount={executor.activeProjectsCount}
          maxCount={3}
        />

        {/* Filter & Sort Bar */}
        <OpportunityFilterBar
          filters={filters}
          onFilterChange={setFilters}
          sorting={sorting}
          onSortChange={setSorting}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Opportunities Feed */}
        {paginatedOpportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-5 min-h-[400px] bg-white rounded-xl">
            <span className="text-8xl opacity-40 mb-6">🔍</span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
              No opportunities found
            </h2>
            <p className="text-base text-gray-600 mb-6 text-center max-w-md">
              Try adjusting your filters to see more opportunities
            </p>
            <button
              onClick={() => setFilters({ role: 'all', skills: [], fitScore: 'all', tokenRange: 'all' })}
              className="px-6 py-2 border border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                executorSkills={executor.skills}
                isDisabled={executor.activeProjectsCount >= 3}
                onSaveToggle={handleSaveToggle}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedOpportunities.length > 0 && totalPages > 1 && (
          <IdeasPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExecutorOpportunities;
