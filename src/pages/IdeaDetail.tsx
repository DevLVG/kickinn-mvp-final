import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBanner from '@/components/ideas/StatusBanner';
import OriginalSubmission from '@/components/ideas/OriginalSubmission';
import AIStructuredPitch from '@/components/ideas/AIStructuredPitch';
import ClarificationQuestions from '@/components/ideas/ClarificationQuestions';
import ValidationScorecard from '@/components/ideas/ValidationScorecard';
import RejectionFeedback from '@/components/ideas/RejectionFeedback';
import VentureTransition from '@/components/ideas/VentureTransition';
import IdeaTimeline from '@/components/ideas/IdeaTimeline';
import { Idea } from './Ideas';

const IdeaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ id: '', name: '', email: '', initials: '' });
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [idea, setIdea] = useState<Idea | null>(null);

  useEffect(() => {
    const loadData = async () => {
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
          description: "You need to be an Ideator to view idea details.",
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

      // Mock data for the specific idea
      const mockIdea: Idea = {
        id: id || '1',
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
      };

      setIdea(mockIdea);
      setIsLoading(false);
    };

    loadData();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <LoadingSpinner />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Idea Not Found</h1>
          <p className="text-base text-gray-600 mb-6">
            This idea doesn't exist or you don't have permission to view it.
          </p>
          <Link
            to="/ideas"
            className="inline-block bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to My Ideas
          </Link>
        </div>
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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/dashboard" className="hover:text-primary-dark transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/ideas" className="hover:text-primary-dark transition-colors">
            My Ideas
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-bold text-primary-dark truncate max-w-[200px]">
            {idea.title}
          </span>
        </nav>

        {/* Status Banner */}
        <StatusBanner idea={idea} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Original Submission */}
            <OriginalSubmission idea={idea} />

            {/* AI Structured Pitch */}
            {(idea.status === 'validated' || idea.status === 'building') && (
              <AIStructuredPitch />
            )}

            {/* Clarification Questions */}
            {idea.status === 'pending' && (
              <ClarificationQuestions ideaId={idea.id} />
            )}

            {/* Validation Scorecard */}
            {(idea.status === 'validated' || idea.status === 'rejected') && idea.validationScores && (
              <ValidationScorecard scores={idea.validationScores} status={idea.status} />
            )}

            {/* Rejection Feedback */}
            {idea.status === 'rejected' && idea.rejectionCount && (
              <RejectionFeedback
                issues={[
                  'Problem statement lacks specificity about target market',
                  'No clear indication of problem frequency or scale',
                  'Similar solutions exist but weren\'t mentioned or differentiated'
                ]}
                suggestions={[
                  'Be more specific about who experiences this problem daily. Example: "Small textile shops with 5-15 employees" instead of "textile businesses"',
                  'Include rough estimates of scale. Example: "affects approximately X shops" or "happens Y times per week"',
                  'Research existing fabric waste solutions and explain how your idea differs or improves upon them'
                ]}
                rejectionCount={idea.rejectionCount}
                ideaId={idea.id}
              />
            )}

            {/* Venture Transition */}
            {idea.status === 'validated' && idea.ventureId && (
              <VentureTransition ventureId={idea.ventureId} />
            )}
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-1">
            <IdeaTimeline idea={idea} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IdeaDetail;
