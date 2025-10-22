import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import TaskBoard from '@/components/workspace/TaskBoard';
import MilestonesPanel from '@/components/workspace/MilestonesPanel';
import TeamChat from '@/components/workspace/TeamChat';
import TeamMembers from '@/components/workspace/TeamMembers';
import SharedFiles from '@/components/workspace/SharedFiles';
import VentureDetails from '@/components/workspace/VentureDetails';
import { useParams } from 'react-router-dom';

// Mock data - replace with API calls and WebSocket
const mockVenture = {
  id: 'v1',
  name: 'ThreadCycle - Fabric Sharing Platform',
  description: 'Peer-to-peer marketplace for textile shops',
  status: 'building' as const,
  overallProgress: 45,
  startDate: new Date('2024-03-01').toISOString(),
  targetCompletion: new Date('2024-03-22').toISOString(),
  daysRemaining: 15,
  executor: {
    role: 'Frontend Developer',
    tokenAllocation: 13000,
    tokenUsdValue: 3900,
  },
};

const mockTeam = [
  {
    id: 't1',
    name: 'Sara (Dubai)',
    role: 'Project Manager',
    location: 'Dubai',
    avatar: '',
    online: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: 't2',
    name: 'Marco (Italy)',
    role: 'Backend Developer',
    location: 'Italy',
    avatar: '',
    online: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: 't3',
    name: 'Aisha (UAE)',
    role: 'UI/UX Designer',
    location: 'UAE',
    avatar: '',
    online: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't4',
    name: 'You',
    role: 'Frontend Developer',
    location: 'Your Location',
    avatar: '',
    online: true,
    lastSeen: new Date().toISOString(),
  },
];

const VentureWorkspace = () => {
  const { id } = useParams();
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('executor');
  const [userRoles] = useState(['executor']);
  const [user] = useState({
    name: 'John Executor',
    email: 'john@example.com',
    initials: 'JE',
  });

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={userRoles}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Workspace Header */}
        <WorkspaceHeader
          ventureName={mockVenture.name}
          executorRole={mockVenture.executor.role}
          overallProgress={mockVenture.overallProgress}
          contractId="1"
        />

        {/* Main Workspace Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 overflow-hidden">
          {/* Left Panel - Task Board + Milestones */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
            <div className="flex-[3] overflow-hidden">
              <TaskBoard ventureId={id || ''} />
            </div>
            <div className="flex-[2] overflow-hidden">
              <MilestonesPanel ventureId={id || ''} />
            </div>
          </div>

          {/* Center Panel - Team Chat */}
          <div className="lg:col-span-5 h-full overflow-hidden">
            <TeamChat ventureId={id || ''} team={mockTeam} currentUserId="t4" />
          </div>

          {/* Right Panel - Team + Files */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto">
            <TeamMembers team={mockTeam} currentUserId="t4" />
            <SharedFiles ventureId={id || ''} />
            <VentureDetails
              startDate={mockVenture.startDate}
              targetCompletion={mockVenture.targetCompletion}
              daysRemaining={mockVenture.daysRemaining}
              tokenAllocation={mockVenture.executor.tokenAllocation}
              tokenUsdValue={mockVenture.executor.tokenUsdValue}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VentureWorkspace;
