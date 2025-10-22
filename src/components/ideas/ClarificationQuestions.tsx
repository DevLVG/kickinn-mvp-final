import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ClarificationQuestionsProps {
  ideaId: string;
}

const ClarificationQuestions = ({ ideaId }: ClarificationQuestionsProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      number: 1,
      question: 'Who feels this problem most?',
      helperText: 'Be specific about the target audience'
    },
    {
      id: 'q2',
      number: 2,
      question: 'How often does this problem occur?',
      helperText: 'Daily, weekly, monthly, or seasonally?'
    },
    {
      id: 'q3',
      number: 3,
      question: 'What solutions have been tried before?',
      helperText: 'Existing alternatives or workarounds'
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isFormValid = () => {
    return Object.values(answers).every(answer => answer.trim().length >= 20 && answer.length <= 500);
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Answers Submitted!",
        description: "The AI will re-analyze your submission with the new information.",
      });
    }, 1500);
  };

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
            ⏱️ 47h 23m remaining
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <div className="mb-3">
              <div className="text-xs text-purple-600 font-bold uppercase mb-2">
                Question {q.number}/3
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
