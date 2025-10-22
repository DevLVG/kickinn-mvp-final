import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatsBar from '@/components/ideas/StatsBar';
import FilterSortBar from '@/components/ideas/FilterSortBar';
import IdeaCard from '@/components/ideas/IdeaCard';
import EmptyState from '@/components/ideas/EmptyState';
import IdeasPagination from '@/components/ideas/IdeasPagination';
import { Button } from '@/components/ui/button';

export interface Idea {
  id: string;
  title: string;
  status: 'pending' | 'validated' | 'rejected' | 'building' | 'archived';
  submittedAt: string;
  submissionType: 'voice' | 'video' | 'text' | 'file';
  validationScores?: {
    marketDepth: number;
    urgency: number;
    uniqueness: number;
    average: number;
  };
  rejectionCount?: number;
  feedback?: string;
  buildProgress?: number;
  executorCount?: number;
  ventureId?: string;
}

const Ideas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ id: '', name: '', email: '', initials: '' });
  const [userRoles, setUserRoles] = useState<string[]>([]);
  
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    searchQuery: ''
  });
  
  const [sorting, setSorting] = useState({
    field: 'date',
    order: 'desc'
  });
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1
  });

  // Mock data
  const mockIdeas: Idea[] = [
    {
      id: '1',
      title: 'ThreadCycle - Sustainable Fashion Marketplace',
      status: 'validated',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      submissionType: 'voice',
      validationScores: {
        marketDepth: 8.5,
        urgency: 9.0,
        uniqueness: 7.8,
        average: 8.4
      }
    },
    {
      id: '2',
      title: 'Fabric Waste Reduction Network for Small Textile Shops',
      status: 'pending',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      submissionType: 'text',
    },
    {
      id: '3',
      title: 'CarbonTrack - Personal Carbon Footprint Monitoring',
      status: 'building',
      submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      submissionType: 'video',
      buildProgress: 65,
      executorCount: 3,
      ventureId: 'v1'
    },
    {
      id: '4',
      title: 'Local Supply Chain Optimization Tool',
      status: 'rejected',
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      submissionType: 'file',
      rejectionCount: 1,
      feedback: 'The problem statement needs more specificity about the target market and unique value proposition.'
    }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const email = session.user.email || '';
      
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      const rolesArray = roles ? roles.map((r: any) => r.role) : [];
      
      if (!rolesArray.includes('ideator')) {
        toast({
          title: "Access Denied",
          description: "You need to be an Ideator to view ideas.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      const name = email.split('@')[0];
      const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      setUser({
        id: session.user.id,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        initials,
      });

      setUserRoles(rolesArray);
      setIdeas(mockIdeas);
      setFilteredIdeas(mockIdeas);
      
      const totalPages = Math.ceil(mockIdeas.length / pagination.itemsPerPage);
      setPagination(prev => ({ ...prev, totalPages }));

      setIsLoading(false);
    };

    loadUserData();
  }, [navigate, toast]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...ideas];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(idea => idea.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      result = result.filter(idea => {
        const ideaDate = new Date(idea.submittedAt);
        const daysDiff = (now.getTime() - ideaDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (filters.dateRange === '7days') return daysDiff <= 7;
        if (filters.dateRange === '30days') return daysDiff <= 30;
        if (filters.dateRange === '3months') return daysDiff <= 90;
        if (filters.dateRange === '1year') return daysDiff <= 365;
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sorting.field === 'date') {
        const diff = new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        return sorting.order === 'asc' ? -diff : diff;
      }
      if (sorting.field === 'score') {
        const scoreA = a.validationScores?.average || 0;
        const scoreB = b.validationScores?.average || 0;
        return sorting.order === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }
      if (sorting.field === 'title') {
        return sorting.order === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredIdeas(result);
    
    const totalPages = Math.ceil(result.length / pagination.itemsPerPage);
    setPagination(prev => ({ ...prev, totalPages, currentPage: 1 }));
  }, [ideas, filters, sorting, pagination.itemsPerPage]);

  const stats = {
    total: ideas.length,
    active: ideas.filter(i => i.status === 'pending').length,
    validated: ideas.filter(i => i.status === 'validated').length,
    building: ideas.filter(i => i.status === 'building').length,
  };

  // Paginate ideas
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const paginatedIdeas = filteredIdeas.slice(startIndex, startIndex + pagination.itemsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout
      activeRole="ideator"
      userRoles={userRoles}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              My Ideas
            </h1>
            <p className="text-base text-gray-600">
              Track your submissions and validation progress
            </p>
          </div>

          <Button
            onClick={() => navigate('/submit-idea')}
            className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Submit New Idea
          </Button>
        </div>

        {/* Stats Bar */}
        <StatsBar 
          stats={stats}
          onStatClick={(status) => setFilters(prev => ({ ...prev, status }))}
        />

        {/* Filter & Sort Bar */}
        <FilterSortBar
          filters={filters}
          sorting={sorting}
          viewMode={viewMode}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onSortChange={(field, order) => setSorting({ field, order })}
          onViewModeChange={setViewMode}
        />

        {/* Ideas List */}
        {paginatedIdeas.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
            : 'space-y-4 mb-8'
          }>
            {paginatedIdeas.map((idea) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            hasIdeas={ideas.length > 0}
            onClearFilters={() => setFilters({ status: 'all', dateRange: 'all', searchQuery: '' })}
          />
        )}

        {/* Pagination */}
        {paginatedIdeas.length > 0 && pagination.totalPages > 1 && (
          <IdeasPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Ideas;
