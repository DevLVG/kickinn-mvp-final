import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OpportunityHeader from '@/components/executor/OpportunityHeader';
import ActiveProjectsBanner from '@/components/executor/ActiveProjectsBanner';
import OpportunityInfoCard from '@/components/executor/OpportunityInfoCard';
import VentureBrief from '@/components/executor/VentureBrief';
import MilestoneBreakdown from '@/components/executor/MilestoneBreakdown';
import TeamComposition from '@/components/executor/TeamComposition';
import FitScoreBreakdown from '@/components/executor/FitScoreBreakdown';
import ApplicationForm from '@/components/executor/ApplicationForm';
import { AlertCircle, Clock } from 'lucide-react';

// Mock data
const mockOpportunity = {
  id: '1',
  ventureId: 'v1',
  ventureTitle: 'ThreadCycle - Fabric Sharing Platform',
  ventureType: 'SaaS Platform',
  role: 'Frontend Developer',
  scope: [
    '5 screens (responsive design)',
    'API integration (REST)',
    'User authentication flow',
    'Data visualization dashboard',
    'Testing included'
  ],
  timelineEstimate: '3 weeks',
  tokenReward: 13000,
  tokenRewardUsd: 3900,
  tokenPercentage: 13,
  requiredSkills: ['React', 'TypeScript', 'Tailwind', 'REST APIs', 'Testing'],
  deadline: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
  hoursRemaining: 18,
  problemStatement: 'Textile shops generate 15-20% fabric waste weekly, losing $500-2000/month per shop. No existing marketplace connects these shops to exchange scraps.',
  solution: 'A peer-to-peer fabric marketplace enabling shops to buy/sell/exchange leftover materials. Features: geolocation matching, quality ratings, secure payments, and logistics coordination.',
  targetMarket: 'Independent tailors and small textile shops in Dubai, UAE. Initial focus: 500+ shops in Deira and Bur Dubai textile districts.',
  validationScore: 8.2,
  validationBreakdown: {
    problemClarity: 9,
    marketSize: 8,
    solutionFeasibility: 8,
    revenuePotential: 7
  },
  milestones: [
    {
      number: 1,
      title: 'MVP Design & Wireframes',
      deliverables: [
        '5 screen designs (mobile + desktop)',
        'User flow diagrams',
        'Style guide and component library'
      ],
      timeline: 'Week 1',
      tokenAllocation: 4000,
      percentage: 30
    },
    {
      number: 2,
      title: 'Frontend Development',
      deliverables: [
        'Implement all screens',
        'API integration',
        'Authentication flow',
        'Responsive layout'
      ],
      timeline: 'Week 2',
      tokenAllocation: 6000,
      percentage: 46
    },
    {
      number: 3,
      title: 'Testing & Launch',
      deliverables: [
        'Unit and integration tests',
        'Bug fixes',
        'Performance optimization',
        'Production deployment'
      ],
      timeline: 'Week 3',
      tokenAllocation: 3000,
      percentage: 24
    }
  ],
  teamComposition: [
    {
      role: 'Frontend Developer',
      status: 'open' as const,
      responsibility: 'Build user interface and integrate APIs',
      tokenAllocation: 13000,
      isYourRole: true
    },
    {
      role: 'Backend Developer',
      status: 'assigned' as const,
      responsibility: 'API development and database design',
      tokenAllocation: 15000,
      isYourRole: false
    },
    {
      role: 'Product Manager',
      status: 'open' as const,
      responsibility: 'Roadmap planning, feature prioritization',
      tokenAllocation: 3000,
      isYourRole: false
    }
  ],
  fitScore: 94,
  fitBreakdown: {
    skillsMatch: {
      score: 85,
      weight: 40,
      explanation: 'You have 4 out of 5 required skills'
    },
    experienceLevel: {
      score: 95,
      weight: 25,
      explanation: 'Your experience level perfectly matches this project'
    },
    successRate: {
      score: 98,
      weight: 20,
      explanation: '95% completion rate on past projects'
    },
    deliverySpeed: {
      score: 92,
      weight: 15,
      explanation: 'Average delivery 10% faster than estimates'
    }
  },
  ventureStatus: 'MVP build starting soon',
  applicationsCount: 3
};

const ExecutorOpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fitScore, setFitScore] = useState<number>(0);
  const [isFitScoreLoading, setIsFitScoreLoading] = useState(true);

  // Load fit score on mount
  useEffect(() => {
    const loadFitScore = async () => {
      try {
        setIsFitScoreLoading(true);
        const { data: functionData } = await supabase.functions.invoke(
          'calculate-fit-score',
          {
            body: {
              opportunityId: id,
              requiredSkills: mockOpportunity.requiredSkills,
              timelineWeeks: 3
            }
          }
        );

        if (functionData?.fitScore) {
          setFitScore(Number(functionData.fitScore.overall_score));
        }
      } catch (err) {
        console.error('Error loading fit score:', err);
      } finally {
        setIsFitScoreLoading(false);
      }
    };

    loadFitScore();
  }, [id]);

  // Mock executor data
  const executor = {
    activeProjectsCount: 1,
    skills: ['React', 'TypeScript', 'Tailwind', 'REST APIs'],
    hasApplied: false
  };

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    initials: 'SJ',
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  const handleApplicationSubmit = async (data: any) => {
    console.log('Application submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccessModal(true);
  };

  const isAtConcurrentLimit = executor.activeProjectsCount >= 3;
  const hoursRemaining = mockOpportunity.hoursRemaining;
  const showDeadlineAlert = hoursRemaining < 48;

  return (
    <DashboardLayout
      activeRole="executor"
      userRoles={['executor']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          <span>/</span>
          <Link to="/executor/opportunities" className="hover:text-foreground">Opportunities</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">
            {mockOpportunity.ventureTitle}
          </span>
        </nav>

        {/* Header */}
        <OpportunityHeader
          title={mockOpportunity.ventureTitle}
          ventureType={mockOpportunity.ventureType}
          fitScore={isFitScoreLoading ? 0 : fitScore}
          isSaved={isSaved}
          onSaveToggle={handleSaveToggle}
        />

        {/* Concurrent Work Banner */}
        {isAtConcurrentLimit && (
          <div className="bg-gradient-to-r from-destructive/10 to-warning/10 border border-destructive rounded-xl p-5 flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-destructive">Active Project Limit Reached</h3>
              <p className="text-sm text-foreground mt-1">
                You have 3 active ventures. Complete one to apply for new opportunities.
              </p>
            </div>
            <Link
              to="/executor/active"
              className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors whitespace-nowrap"
            >
              View Active Projects
            </Link>
          </div>
        )}

        {/* Deadline Alert */}
        {showDeadlineAlert && (
          <div
            className={`${
              hoursRemaining < 24
                ? 'bg-destructive/10 border-2 border-destructive animate-pulse'
                : 'bg-warning/10 border border-warning'
            } rounded-xl p-4 flex items-center gap-3`}
          >
            <Clock className={`w-6 h-6 ${hoursRemaining < 24 ? 'text-destructive' : 'text-warning'}`} />
            <p className={`font-bold ${hoursRemaining < 24 ? 'text-destructive' : 'text-warning'}`}>
              Application closes in {Math.floor(hoursRemaining)}h {Math.floor((hoursRemaining % 1) * 60)}m
            </p>
          </div>
        )}

        {/* Opportunity Info Card */}
        <OpportunityInfoCard
          opportunity={mockOpportunity}
          executorSkills={executor.skills}
        />

        {/* Venture Brief */}
        <VentureBrief
          problemStatement={mockOpportunity.problemStatement}
          solution={mockOpportunity.solution}
          targetMarket={mockOpportunity.targetMarket}
          validationScore={mockOpportunity.validationScore}
          validationBreakdown={mockOpportunity.validationBreakdown}
        />

        {/* Milestone Breakdown */}
        <MilestoneBreakdown
          milestones={mockOpportunity.milestones}
          totalTimeline={mockOpportunity.timelineEstimate}
        />

        {/* Team Composition */}
        <TeamComposition
          team={mockOpportunity.teamComposition}
        />

        {/* Fit Score Breakdown */}
        <FitScoreBreakdown
          opportunityId={mockOpportunity.id}
          requiredSkills={mockOpportunity.requiredSkills}
          timelineWeeks={3}
        />

        {/* Application Form */}
        {!isAtConcurrentLimit && !executor.hasApplied && (
          <ApplicationForm
            aiEstimate={mockOpportunity.timelineEstimate}
            onSubmit={handleApplicationSubmit}
          />
        )}

        {/* Already Applied Status */}
        {executor.hasApplied && (
          <div className="bg-info/10 border border-info rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📝</span>
              <h3 className="text-lg font-bold text-primary-dark">
                You've already applied for this opportunity
              </h3>
            </div>
            <Link
              to="/executor/applications"
              className="text-info hover:underline font-medium"
            >
              View Application Status →
            </Link>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-10 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-primary-dark mb-3">
                Application Submitted!
              </h2>
              <p className="text-base text-foreground leading-relaxed mb-4">
                Your application has been submitted successfully. You'll be notified if you're selected for this opportunity.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Selection process typically takes 24-72 hours
              </p>
              
              <div className="flex flex-col gap-3">
                <Link
                  to="/executor/applications"
                  className="w-full px-6 py-3 bg-gradient-to-r from-secondary-teal to-accent-blue text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  View Application Status
                </Link>
                <Link
                  to="/executor/opportunities"
                  className="w-full px-6 py-3 border border-secondary-teal text-secondary-teal rounded-lg font-medium hover:bg-secondary-teal/10 transition-colors"
                >
                  Browse More Opportunities
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExecutorOpportunityDetail;
