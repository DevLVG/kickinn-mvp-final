import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface RejectionFeedbackProps {
  issues: string[];
  suggestions: string[];
  rejectionCount: number;
  ideaId: string;
}

const RejectionFeedback = ({ issues, suggestions, rejectionCount, ideaId }: RejectionFeedbackProps) => {
  const [showTips, setShowTips] = useState(false);

  const revisionTips = [
    'Use specific numbers and data when possible',
    'Name your target audience clearly and specifically',
    'Include examples from real experiences',
    'Research and acknowledge existing solutions',
    'Explain why this problem matters now'
  ];

  return (
    <div className="bg-red-50 border border-red-500 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📝</span>
        <h2 className="text-2xl font-bold text-red-600">Why This Idea Needs Revision</h2>
      </div>

      {/* Key Issues */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-primary-dark mb-4">Key Issues</h3>
        <ul className="space-y-3">
          {issues.map((issue, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-red-500 text-xl mt-0.5">•</span>
              <span className="text-sm text-gray-800 leading-relaxed flex-1">{issue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement Suggestions */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-primary-dark mb-4">How to Improve</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="bg-white border-l-4 border-green-500 rounded-lg p-4 flex gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-gray-800 leading-relaxed flex-1">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white border-2 border-dashed border-red-500 rounded-lg p-6">
        <p className="text-sm text-gray-700 mb-4">
          Ready to revise your idea? Use the feedback above to strengthen your submission.
        </p>
        
        <Link to={`/submit-idea?edit=${ideaId}`}>
          <Button className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white h-12 mb-4">
            <span className="mr-2">✏️</span>
            Revise & Resubmit
          </Button>
        </Link>

        <button
          onClick={() => setShowTips(!showTips)}
          className="text-sm text-secondary-teal font-medium hover:underline"
        >
          {showTips ? 'Hide Revision Tips ▲' : 'Show Revision Tips ▼'}
        </button>

        {showTips && (
          <div className="mt-4 bg-secondary-teal/5 rounded-lg p-4">
            <h4 className="font-bold text-sm text-primary-dark mb-3">Quick Revision Tips</h4>
            <ul className="space-y-2">
              {revisionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-secondary-teal">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectionFeedback;
