import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VentureInfoSection from '@/components/executor/VentureInfoSection';
import ContractTermsSection from '@/components/executor/ContractTermsSection';
import ContractMilestonesSection from '@/components/executor/ContractMilestonesSection';
import TokenRewardSection from '@/components/executor/TokenRewardSection';
import IPAssignmentSection from '@/components/executor/IPAssignmentSection';
import DeliveryRequirementsSection from '@/components/executor/DeliveryRequirementsSection';
import SignatureSection from '@/components/executor/SignatureSection';

// Mock contract data
const mockContract = {
  id: '1',
  ventureId: 'v1',
  venture: {
    name: 'Fabric Waste Reduction Network',
    type: 'SaaS Platform',
    description: 'Peer-to-peer marketplace for textile shops to exchange fabric scraps',
  },
  role: 'Frontend Developer',
  tokenAllocation: 13000,
  tokenPercentage: 13,
  tokenUsdValue: 3900,
  timelineWeeks: 3,
  startDate: new Date().toISOString(),
  deadline: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
  hoursRemaining: 23,
  terms: [
    'Complete all milestones within agreed timeline and quality standards',
    'Grant exclusive IP rights to Kick Inn platform upon completion',
    'Maintain confidentiality of venture details and team communications',
    'Submit deliverables for review as specified in milestone breakdown',
    'Accept token-based compensation as outlined in reward section',
  ],
  milestones: [
    {
      number: 1,
      title: 'MVP Design & Wireframes',
      timeline: 'Week 1 (5 days)',
      tokenAllocation: 4000,
      tokenPercentage: 30,
      deliverables: [
        '5 screen designs (mobile + desktop)',
        'User flow diagrams',
        'Style guide and component library',
      ],
    },
    {
      number: 2,
      title: 'Core Features Development',
      timeline: 'Week 2 (7 days)',
      tokenAllocation: 5000,
      tokenPercentage: 38,
      deliverables: [
        'User authentication and profiles',
        'Fabric listing and search',
        'Real-time messaging system',
        'Payment integration',
      ],
    },
    {
      number: 3,
      title: 'Testing & Deployment',
      timeline: 'Week 3 (5 days)',
      tokenAllocation: 4000,
      tokenPercentage: 32,
      deliverables: [
        'Unit and integration tests (80% coverage)',
        'Bug fixes and optimization',
        'Production deployment',
        'Documentation and handoff',
      ],
    },
  ],
  ipTerms:
    'By signing this contract, you agree to assign all intellectual property rights related to your work on this venture to Kick Inn platform. Upon venture acquisition or exit, IP transfers to the acquiring entity. You retain the right to showcase this work in your portfolio.',
  deliveryRequirements: [
    { category: 'Code Quality', icon: '⚙️', description: 'Well-documented, maintainable code following industry best practices' },
    { category: 'Testing', icon: '🧪', description: 'Unit tests with 80%+ coverage for critical functionality' },
    { category: 'Mobile-First', icon: '📱', description: 'Fully responsive design working on all devices and browsers' },
    { category: 'Active Updates', icon: '💬', description: 'Daily progress updates and prompt responses to team messages' },
  ],
  vestingSchedule: {
    durationMonths: 12,
    type: 'linear' as const,
    startTrigger: 'funding',
  },
};

const ExecutorContractDetail = () => {
  const { id } = useParams();
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('executor');
  const [userRoles] = useState(['executor']);
  const [user] = useState({
    name: 'John Executor',
    email: 'john@example.com',
    initials: 'JE',
  });

  const [agreementChecked, setAgreementChecked] = useState(false);

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={userRoles}
      onRoleChange={() => {}}
      user={user}
    >
      {/* Sticky Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 -mx-8 px-8 py-5 mb-8">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <div>
            <Link
              to="/executor/contracts"
              className="text-sm font-medium text-[hsl(var(--secondary-teal))] hover:underline mb-2 inline-block"
            >
              ← Back to Contracts
            </Link>
            <h1 className="text-2xl font-bold text-[hsl(var(--primary-dark))]">
              Smart Contract Agreement
            </h1>
          </div>

          <div className="bg-purple-500/10 border border-purple-500 px-5 py-3 rounded-lg flex items-center gap-2">
            <span className="text-xl">⏰</span>
            <div>
              <p className="text-base font-bold text-purple-600">
                {mockContract.hoursRemaining}h {Math.floor((mockContract.hoursRemaining % 1) * 60)}m to sign
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto bg-card border-2 border-purple-500/30 rounded-2xl p-10 shadow-xl">
        {/* Venture Info */}
        <VentureInfoSection
          ventureName={mockContract.venture.name}
          role={mockContract.role}
          tokenAllocation={mockContract.tokenAllocation}
          tokenPercentage={mockContract.tokenPercentage}
          timelineWeeks={mockContract.timelineWeeks}
          startDate={mockContract.startDate}
        />

        {/* Terms */}
        <ContractTermsSection terms={mockContract.terms} />

        {/* Milestones */}
        <ContractMilestonesSection milestones={mockContract.milestones} />

        {/* Token Reward */}
        <TokenRewardSection
          tokenAllocation={mockContract.tokenAllocation}
          tokenPercentage={mockContract.tokenPercentage}
          tokenUsdValue={mockContract.tokenUsdValue}
          vestingSchedule={mockContract.vestingSchedule}
        />

        {/* IP Assignment */}
        <IPAssignmentSection ipTerms={mockContract.ipTerms} />

        {/* Delivery Requirements */}
        <DeliveryRequirementsSection requirements={mockContract.deliveryRequirements} />

        {/* Signature Section */}
        <SignatureSection
          agreementChecked={agreementChecked}
          onAgreementChange={setAgreementChecked}
          contractId={id || ''}
          ventureId={mockContract.ventureId}
          ventureName={mockContract.venture.name}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExecutorContractDetail;
