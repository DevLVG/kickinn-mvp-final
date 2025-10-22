import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import SubmissionCounter from '@/components/submission/SubmissionCounter';
import InputModeSelector from '@/components/submission/InputModeSelector';
import VoiceRecorder from '@/components/submission/VoiceRecorder';
import VideoRecorder from '@/components/submission/VideoRecorder';
import TextEditor from '@/components/submission/TextEditor';
import FileUploader from '@/components/submission/FileUploader';
import AIAssistantPanel from '@/components/submission/AIAssistantPanel';
import HelpModal from '@/components/submission/HelpModal';
import { Button } from '@/components/ui/button';

type InputMode = 'voice' | 'video' | 'text' | 'file';

const SubmitIdea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ id: '', name: '', email: '', initials: '' });
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [activeSubmissions, setActiveSubmissions] = useState(0);
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const email = session.user.email || '';
      
      // Get user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      const rolesArray = roles ? roles.map((r: any) => r.role) : [];
      
      // Check if user has ideator role
      if (!rolesArray.includes('ideator')) {
        toast({
          title: "Access Denied",
          description: "You need to be an Ideator to submit ideas.",
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

      // Get active submissions count (mock for now)
      setActiveSubmissions(0); // TODO: Fetch from API

      setIsLoading(false);
    };

    loadUserData();
  }, [navigate, toast]);

  const handleModeChange = (newMode: InputMode) => {
    if (content || file || recordingBlob) {
      const confirmed = window.confirm('Switch mode? Current content will be cleared.');
      if (!confirmed) return;
    }
    
    setInputMode(newMode);
    setContent('');
    setFile(null);
    setRecordingBlob(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!content && !file && !recordingBlob) {
      toast({
        title: "Content Required",
        description: "Please provide your idea in any format.",
        variant: "destructive",
      });
      return;
    }

    if (activeSubmissions >= 3) {
      toast({
        title: "Submission Limit Reached",
        description: "You have reached the maximum of 3 active submissions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual submission logic
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Idea Submitted!",
        description: "AI validation in progress...",
      });

      // Navigate to ideas page after animation
      setTimeout(() => {
        navigate('/ideas');
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="w-6 h-6 text-secondary-teal" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-primary-dark text-center mb-2">
            What problem do you see?
          </h1>
          <p className="text-base text-gray-600 text-center">
            Submit your insight in any format — we'll help structure it
          </p>
        </div>

        {/* Submission Counter */}
        <SubmissionCounter 
          activeCount={activeSubmissions} 
          maxCount={3}
        />

        {/* Warning Banner if max reached */}
        {activeSubmissions >= 3 && (
          <div 
            className="rounded-lg p-4 mb-6 flex items-start gap-3"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444'
            }}
          >
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
                You've reached the maximum of 3 active submissions. Complete or archive one to continue.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/ideas')}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              View My Ideas
            </Button>
          </div>
        )}

        {/* Input Mode Selector */}
        <InputModeSelector 
          selectedMode={inputMode}
          onModeChange={handleModeChange}
        />

        {/* Input Area */}
        <div className="bg-white rounded-2xl p-8 mb-6" style={{ border: '1px solid rgba(103, 159, 131, 0.15)' }}>
          {inputMode === 'voice' && (
            <VoiceRecorder 
              onRecordingComplete={setRecordingBlob}
            />
          )}
          {inputMode === 'video' && (
            <VideoRecorder 
              onRecordingComplete={setRecordingBlob}
            />
          )}
          {inputMode === 'text' && (
            <TextEditor 
              value={content}
              onChange={setContent}
            />
          )}
          {inputMode === 'file' && (
            <FileUploader 
              onFileSelect={setFile}
            />
          )}
        </div>

        {/* AI Assistant Panel */}
        {(content.length > 100 || recordingBlob || file) && (
          <AIAssistantPanel 
            content={content}
            type={inputMode}
          />
        )}

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white border-t p-5 -mx-8 flex justify-center" style={{ borderColor: 'rgba(103, 159, 131, 0.1)' }}>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || activeSubmissions >= 3 || (!content && !file && !recordingBlob)}
            className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white max-w-md w-full disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Idea for Validation'}
          </Button>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal 
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </DashboardLayout>
  );
};

export default SubmitIdea;
