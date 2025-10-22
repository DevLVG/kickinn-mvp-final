import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface VentureTransitionProps {
  ventureId: string;
}

const VentureTransition = ({ ventureId }: VentureTransitionProps) => {
  const [showNextSteps, setShowNextSteps] = useState(false);

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-500 rounded-xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🚀</span>
        <div>
          <h2 className="text-2xl font-bold text-green-600">Your Idea is Now a Venture!</h2>
          <p className="text-sm text-gray-700">
            Congratulations! Your validated idea has transitioned to venture build phase.
          </p>
        </div>
      </div>

      {/* Venture Info Card */}
      <div className="bg-white rounded-lg p-6 my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Venture ID</div>
              <div className="font-mono text-sm text-gray-700">VNT-00234</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                Matching Executors
              </span>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Created</div>
              <div className="text-sm text-gray-700">March 18, 2024</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Your equity stake</div>
              <div className="text-2xl font-bold text-secondary-teal">10%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Upon funding</div>
              <div className="text-sm text-gray-700">~10,000 tokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="font-bold text-base text-primary-dark mb-4">Progress Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">✓</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-primary-dark">Idea Validated</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white animate-pulse">🔄</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-primary-dark">Matching Executors</div>
              <div className="text-xs text-blue-600">In progress</div>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">⏳</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-gray-600">MVP Build</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">⏳</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-gray-600">Funding</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link to={`/ventures/${ventureId}`}>
        <Button className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white h-12 text-base mb-4">
          View Venture Dashboard
          <span className="ml-2">→</span>
        </Button>
      </Link>

      {/* What Happens Next */}
      <button
        onClick={() => setShowNextSteps(!showNextSteps)}
        className="text-sm text-secondary-teal font-medium hover:underline"
      >
        {showNextSteps ? 'Hide next steps ▲' : 'What happens next? ▼'}
      </button>

      {showNextSteps && (
        <div className="mt-4 bg-white rounded-lg p-5">
          <h4 className="font-bold text-sm text-primary-dark mb-3">Timeline & Next Steps</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <div>
                <span className="text-gray-700">AI matches 3-5 Executors based on required skills</span>
                <span className="text-gray-500 text-xs block">1-3 days</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <div>
                <span className="text-gray-700">Executors review and apply for roles</span>
                <span className="text-gray-500 text-xs block">2-5 days</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <div>
                <span className="text-gray-700">MVP build starts with smart contract milestones</span>
                <span className="text-gray-500 text-xs block">3-6 weeks</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <div>
                <span className="text-gray-700">Funding round opens once MVP is validated</span>
                <span className="text-gray-500 text-xs block">1-2 weeks</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <div>
                <span className="text-gray-700">Tokens distributed to all stakeholders upon funding</span>
                <span className="text-gray-500 text-xs block">Instant</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentureTransition;
