import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Idea } from '@/pages/Ideas';

interface StatusBannerProps {
  idea: Idea;
}

const StatusBanner = ({ idea }: StatusBannerProps) => {
  if (idea.status === 'pending') {
    return (
      <div className="bg-amber-50 border border-amber-500 rounded-xl p-5 mb-6 flex items-start gap-4">
        <div className="text-4xl">⏳</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-600 mb-1">Idea Under Review</h3>
          <p className="text-sm text-gray-700 mb-3">
            Our AI is analyzing your submission. This typically takes 24 hours. You'll receive a notification when the review is complete.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-600 font-medium">Analyzing...</span>
            <div className="h-1 w-32 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (idea.status === 'validated') {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-500 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">✅</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-600 mb-1">Idea Validated! 🎉</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your idea scored {idea.validationScores?.average}/10 and has been approved for venture creation. Executors are being matched now.
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">AI Validation Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🔄</span>
                  <span className="text-gray-700">Matching Executors (in progress)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">⏳</span>
                  <span className="text-gray-500">MVP Build will start once team is assembled</span>
                </div>
              </div>
            </div>

            {idea.ventureId && (
              <Link to={`/ventures/${idea.ventureId}`}>
                <Button className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white">
                  View Venture Dashboard →
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (idea.status === 'rejected') {
    const attemptText = idea.rejectionCount === 1 ? '1st Attempt' : '2nd Attempt';
    const attemptsRemaining = 3 - (idea.rejectionCount || 0);
    
    return (
      <div className="bg-red-50 border border-red-500 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">❌</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-red-600">Idea Needs Revision</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                idea.rejectionCount === 1 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {attemptText}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Your submission didn't meet the validation threshold (score: {idea.validationScores?.average || 0}/10). Review the feedback below to improve your idea.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {attemptsRemaining} {attemptsRemaining === 1 ? 'revision' : 'revisions'} remaining
            </p>
            
            {idea.rejectionCount === 2 && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-700 font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  One more rejection will trigger a 30-day cooldown for this topic
                </p>
              </div>
            )}

            <Link to={`/submit-idea?edit=${idea.id}`}>
              <Button className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white">
                <span className="mr-2">✏️</span>
                Revise & Resubmit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (idea.status === 'building') {
    return (
      <div className="bg-blue-50 border border-blue-500 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🏗️</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-600 mb-1">MVP Building</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your idea is now a venture! Executors are building the MVP. Track progress in your venture dashboard.
            </p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{idea.buildProgress || 0}% complete</span>
                <span className="text-sm text-gray-600">{idea.executorCount || 0} Executors working</span>
              </div>
              <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                  style={{ width: `${idea.buildProgress || 0}%` }}
                ></div>
              </div>
            </div>

            {idea.ventureId && (
              <Link to={`/ventures/${idea.ventureId}`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  View Progress
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StatusBanner;
