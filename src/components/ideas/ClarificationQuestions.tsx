import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ClarificationQuestionsProps {
  ideaId: string;
}

interface Question {
  id: string;
  question: string;
  helperText: string;
}

const ClarificationQuestions = ({ ideaId }: ClarificationQuestionsProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [clarificationId, setClarificationId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  useEffect(() => {
    const loadClarificationQuestions = async () => {
      try {
        // Check if clarification already exists
        const { data: existing, error: fetchError } = await supabase
          .from('idea_clarifications')
          .select('*')
          .eq('idea_id', ideaId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (existing) {
          // Load existing questions
          setQuestions((existing.questions as unknown as Question[]) || []);
          setClarificationId(existing.id);
          setExpiresAt(new Date(existing.expires_at));
          
          if (existing.status === 'answered') {
            setSubmitted(true);
            setAnswers((existing.answers as unknown as Record<string, string>) || {});
          } else {
            // Initialize empty answers
            const initialAnswers: Record<string, string> = {};
            const questionsList = (existing.questions as unknown as Question[]) || [];
            questionsList.forEach((q: Question) => {
              initialAnswers[q.id] = '';
            });
            setAnswers(initialAnswers);
          }
        } else {
          // Generate new questions via AI
          const { data: functionData, error: functionError } = await supabase.functions.invoke(
            'generate-clarification-questions',
            {
              body: {
                ideaId,
                ideaContent: 'Mock idea content - in production, load from ideas table'
              }
            }
          );

          if (functionError) {
            throw functionError;
          }

          if (functionData?.clarification) {
            const questionsList = (functionData.clarification.questions as unknown as Question[]) || [];
            setQuestions(questionsList);
            setClarificationId(functionData.clarification.id);
            setExpiresAt(new Date(functionData.clarification.expires_at));
            
            // Initialize empty answers
            const initialAnswers: Record<string, string> = {};
            questionsList.forEach((q: Question) => {
              initialAnswers[q.id] = '';
            });
            setAnswers(initialAnswers);
          }
        }
      } catch (error) {
        console.error('Error loading clarification questions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load clarification questions. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadClarificationQuestions();
  }, [ideaId, toast]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isFormValid = () => {
    return Object.values(answers).every(answer => answer.trim().length >= 20 && answer.length <= 500);
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !clarificationId) return;

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        'submit-clarification-answers',
        {
          body: {
            clarificationId,
            answers
          }
        }
      );

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: 'Answers Submitted!',
        description: data?.message || 'The AI will re-analyze your submission with the new information.',
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit answers. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimeRemaining = () => {
    if (!expiresAt) return '48h 00m';
    
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="bg-white border-2 border-purple-500 rounded-xl p-8 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white border-2 border-purple-500 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Answers Submitted!</h3>
        <p className="text-sm text-gray-700 mb-4">
          Thank you. The AI will re-analyze your submission with the new information. 
          You'll be notified when the review is complete.
        </p>
        <p className="text-sm text-purple-600 font-medium">
          Estimated completion: 24 hours
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white border-2 border-purple-500 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Questions Available</h3>
        <p className="text-sm text-gray-600">
          Unable to generate clarification questions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-purple-500 rounded-xl p-8">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-3xl">❓</span>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">AI Needs More Information</h3>
          <p className="text-sm text-gray-700 mb-2">
            Please answer these questions to improve your validation score.
          </p>
          <div className="text-base font-bold text-purple-600">
            ⏱️ {getTimeRemaining()} remaining
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <div className="mb-3">
              <div className="text-xs text-purple-600 font-bold uppercase mb-2">
                Question {index + 1}/{questions.length}
              </div>
              <h4 className="font-bold text-base text-primary-dark mb-1">{q.question}</h4>
              {q.helperText && (
                <p className="text-xs text-gray-600 italic">{q.helperText}</p>
              )}
            </div>
            
            <Textarea
              value={answers[q.id]}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder="Your answer..."
              className="min-h-[120px] bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500/20"
            />
            
            <div className={`text-xs mt-2 text-right ${
              answers[q.id].length > 500 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {answers[q.id].length}/500 characters
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
        className="w-full mt-6 bg-gradient-to-r from-secondary-teal to-accent-blue text-white h-12 text-base"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Submitting...
          </>
        ) : (
          <>
            Submit Answers
            <span className="ml-2">→</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ClarificationQuestions;
