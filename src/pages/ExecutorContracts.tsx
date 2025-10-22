import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Link } from 'react-router-dom';
import ContractCard from '@/components/executor/ContractCard';

// Mock data - replace with API call
const mockContracts = [
  {
    id: '1',
    ventureId: 'v1',
    ventureName: 'Fabric Waste Reduction Network',
    role: 'Frontend Developer',
    status: 'pending' as const,
    deadline: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    hoursRemaining: 23,
    tokenAllocation: 13000,
    tokenUsdValue: 3900,
    timelineWeeks: 3,
    milestones: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    ventureId: 'v2',
    ventureName: 'AI Resume Builder',
    role: 'Full-Stack Developer',
    status: 'pending' as const,
    deadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    hoursRemaining: 36,
    tokenAllocation: 18000,
    tokenUsdValue: 5400,
    timelineWeeks: 4,
    milestones: 5,
    createdAt: new Date().toISOString(),
  },
];

const ExecutorContracts = () => {
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('executor');
  const [userRoles] = useState(['executor']);
  const [user] = useState({
    name: 'John Executor',
    email: 'john@example.com',
    initials: 'JE',
  });

  const urgentContracts = mockContracts.filter(c => c.hoursRemaining < 24);
  const hasUrgentContracts = urgentContracts.length > 0;

  if (mockContracts.length === 0) {
    return (
      <DashboardLayout
        activeRole={activeRole}
        userRoles={userRoles}
        onRoleChange={() => {}}
        user={user}
      >
        <div className="flex flex-col items-center justify-center py-20 px-5 min-h-[500px]">
          <div className="text-8xl opacity-40 mb-6">📄</div>
          <h2 className="text-3xl font-bold text-muted-foreground mb-3">No Pending Contracts</h2>
          <p className="text-base text-muted-foreground text-center max-w-md leading-relaxed mb-8">
            You don't have any contracts awaiting signature. Check your active projects or browse
            new opportunities.
          </p>
          <div className="flex gap-4">
            <Link
              to="/executor/active"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>🛠️</span>
              <span>View Active Projects</span>
            </Link>
            <Link
              to="/executor/opportunities"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[hsl(var(--secondary-teal))] text-[hsl(var(--secondary-teal))] font-bold rounded-lg hover:bg-[hsl(var(--secondary-teal))]/10 transition-all"
            >
              <span>🔍</span>
              <span>Browse Opportunities</span>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          <h1 className="text-3xl font-bold text-[hsl(var(--primary-dark))]">
            Contract Signature Required
          </h1>
          <p className="text-base text-muted-foreground mt-2">Review and sign to begin work</p>
        </div>

        <a
          href="/help/contracts"
          className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--secondary-teal))] hover:underline"
        >
          <span className="w-6 h-6 rounded-full border-2 border-[hsl(var(--secondary-teal))] flex items-center justify-center text-xs">
            ?
          </span>
          <span>Understanding Contracts</span>
        </a>
      </div>

      {/* Urgent Banner */}
      {hasUrgentContracts && (
        <div className="bg-gradient-to-br from-red-500/10 to-amber-500/10 border-2 border-red-500 rounded-xl p-5 mb-6 flex items-center gap-4 animate-pulse">
          <span className="text-3xl">⚠️</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-600">Urgent: Contract Expiring Soon</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You have {urgentContracts.length} contract(s) expiring in less than 24 hours. Sign now
              to secure your position.
            </p>
          </div>
          <div className="text-base font-bold text-red-600">
            {urgentContracts[0].hoursRemaining}h {Math.floor((urgentContracts[0].hoursRemaining % 1) * 60)}m remaining
          </div>
        </div>
      )}

      {/* Contracts List */}
      <div className="grid grid-cols-1 gap-4">
        {mockContracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ExecutorContracts;
