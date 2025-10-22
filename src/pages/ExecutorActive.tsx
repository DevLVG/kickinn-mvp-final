import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Link } from 'react-router-dom';
import ExecutorProjectCard from '@/components/dashboard/ExecutorProjectCard';
import ProjectFilterBar from '@/components/executor/ProjectFilterBar';
import PendingContractsSection from '@/components/executor/PendingContractsSection';

// Mock data - replace with API call
const mockProjects = [
  {
    id: '1',
    ventureId: 'v1',
    ventureName: 'Fabric Waste Reduction Network',
    role: 'Frontend Developer',
    status: 'on_track' as const,
    overallProgress: 45,
    milestones: [
      {
        id: 'm1',
        title: 'MVP Design & Wireframes',
        status: 'approved' as const,
        deadline: '2024-03-25T00:00:00Z',
        progress: 100,
      },
      {
        id: 'm2',
        title: 'Core Features Development',
        status: 'in_progress' as const,
        deadline: '2024-04-05T00:00:00Z',
        progress: 60,
      },
      {
        id: 'm3',
        title: 'Testing & Deployment',
        status: 'in_progress' as const,
        deadline: '2024-04-15T00:00:00Z',
        progress: 0,
      },
    ],
    team: [
      { id: 't1', name: 'Sarah Chen', role: 'Product Manager', avatar: '' },
      { id: 't2', name: 'John Doe', role: 'Backend Developer', avatar: '' },
      { id: 't3', name: 'Alice Smith', role: 'Designer', avatar: '' },
    ],
    tokensAllocated: 13000,
    unreadMessages: 3,
    daysToDeadline: 8,
    contractSigned: true,
  },
  {
    id: '2',
    ventureId: 'v2',
    ventureName: 'AI Resume Builder',
    role: 'Full-Stack Developer',
    status: 'at_risk' as const,
    overallProgress: 72,
    milestones: [
      {
        id: 'm4',
        title: 'Backend API Development',
        status: 'approved' as const,
        deadline: '2024-03-20T00:00:00Z',
        progress: 100,
      },
      {
        id: 'm5',
        title: 'Frontend Integration',
        status: 'submitted' as const,
        deadline: '2024-03-28T00:00:00Z',
        progress: 100,
      },
      {
        id: 'm6',
        title: 'AI Model Integration',
        status: 'in_progress' as const,
        deadline: '2024-04-02T00:00:00Z',
        progress: 40,
      },
    ],
    team: [
      { id: 't4', name: 'Mike Johnson', role: 'AI Engineer', avatar: '' },
      { id: 't5', name: 'Emma Wilson', role: 'Product Manager', avatar: '' },
    ],
    tokensAllocated: 18000,
    unreadMessages: 0,
    daysToDeadline: 3,
    contractSigned: true,
  },
];

const mockPendingContracts = [
  {
    ventureId: 'v3',
    ventureName: 'Smart Inventory Management',
    role: 'Backend Developer',
    deadlineHours: 23,
  },
];

const ExecutorActive = () => {
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('executor');
  const [userRoles] = useState(['executor']);
  const [user] = useState({
    name: 'John Executor',
    email: 'john@example.com',
    initials: 'JE',
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  // Calculate stats
  const activeCount = mockProjects.length;
  const pendingMilestonesCount = mockProjects.reduce(
    (count, project) => count + project.milestones.filter(m => m.status === 'in_progress').length,
    0
  );
  const totalTokens = mockProjects.reduce((sum, project) => sum + project.tokensAllocated, 0);
  const avgProgress = Math.round(
    mockProjects.reduce((sum, project) => sum + project.overallProgress, 0) / mockProjects.length
  );

  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => statusFilter === 'all' || project.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'deadline') return a.daysToDeadline - b.daysToDeadline;
      if (sortBy === 'progress') return a.overallProgress - b.overallProgress;
      if (sortBy === 'name') return a.ventureName.localeCompare(b.ventureName);
      return 0;
    });

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
          <h1 className="text-3xl font-bold text-[hsl(var(--primary-dark))]">Active Projects</h1>
          <p className="text-base text-muted-foreground mt-2">Manage your ongoing ventures</p>
        </div>

        {/* Capacity Badge */}
        <div
          className={`px-5 py-3 rounded-xl shadow-md ${
            activeCount === 0
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : activeCount < 3
              ? 'bg-gradient-to-r from-amber-500 to-amber-600'
              : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}
        >
          <div className="text-2xl font-bold text-white text-center">{activeCount}/3</div>
          <div className="text-xs text-white/90 uppercase text-center mt-1">Active Projects</div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Active */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-3xl mb-3">🛠️</div>
          <div className="text-4xl font-bold text-[hsl(var(--primary-dark))]">{activeCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Active Ventures</div>
        </div>

        {/* Pending Milestones */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
          <div className="text-3xl mb-3">📋</div>
          <div className="text-4xl font-bold text-[hsl(var(--primary-dark))]">
            {pendingMilestonesCount}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Milestones Due</div>
        </div>

        {/* Total Tokens */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-3xl mb-3">🪙</div>
          <div className="text-4xl font-bold text-[hsl(var(--primary-dark))]">
            {totalTokens.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Tokens Allocated</div>
          <div className="text-xs text-muted-foreground mt-1">
            ≈ ${(totalTokens * 0.3).toLocaleString()}
          </div>
        </div>

        {/* Avg Progress */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
          <div className="text-3xl mb-3">📊</div>
          <div className="text-4xl font-bold text-[hsl(var(--primary-dark))]">{avgProgress}%</div>
          <div className="text-sm text-muted-foreground mt-1">Average Progress</div>
        </div>
      </div>

      {/* Pending Contracts */}
      {mockPendingContracts.length > 0 && (
        <PendingContractsSection contracts={mockPendingContracts} />
      )}

      {/* Filter Bar */}
      <ProjectFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-5 min-h-[400px]">
          <div className="text-8xl opacity-40 mb-6">🎯</div>
          <h2 className="text-3xl font-bold text-muted-foreground mb-3">No Active Projects</h2>
          <p className="text-base text-muted-foreground text-center max-w-md leading-relaxed mb-8">
            You're not working on any ventures yet. Browse opportunities to find your next project.
          </p>
          <Link
            to="/executor/opportunities"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <span>🔍</span>
            <span>Browse Opportunities</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredProjects.map(project => (
            <ExecutorProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExecutorActive;
