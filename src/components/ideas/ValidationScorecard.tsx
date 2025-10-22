import { useState } from 'react';

interface ValidationScorecardProps {
  scores: {
    marketDepth: number;
    urgency: number;
    uniqueness: number;
    average: number;
  };
  status: 'validated' | 'rejected';
}

const ValidationScorecard = ({ scores, status }: ValidationScorecardProps) => {
  const [expandedScore, setExpandedScore] = useState<string | null>(null);

  const isValidated = status === 'validated';
  const circleColor = scores.average >= 7.5 ? 'border-green-500' : 'border-amber-500';
  const badgeBg = isValidated 
    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
    : 'bg-gradient-to-r from-red-500 to-red-600';

  const scoreDetails = [
    {
      id: 'market',
      icon: '📊',
      label: 'Market Depth',
      description: 'How many people face this problem',
      score: scores.marketDepth,
      color: 'secondary-teal',
      feedback: 'The textile waste problem affects approximately 15,000 small shops in the UAE alone, with similar patterns across MENA regions. The addressable market is significant and growing with increased sustainability awareness.'
    },
    {
      id: 'urgency',
      icon: '⏰',
      label: 'Urgency',
      description: 'How painful or disruptive the problem is',
      score: scores.urgency,
      color: 'accent-blue',
      feedback: 'Daily waste generation creates immediate costs and operational burden. The environmental impact and regulatory pressure add to the urgency. This is an active, ongoing pain point rather than a future concern.'
    },
    {
      id: 'uniqueness',
      icon: '💎',
      label: 'Uniqueness',
      description: 'How under-addressed the issue is',
      score: scores.uniqueness,
      color: 'light-teal',
      feedback: 'While fabric recycling exists, peer-to-peer marketplaces specifically for business-to-business fabric scrap exchange are relatively rare. The local, community-focused approach adds differentiation.'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Validation Scorecard</h2>
        <p className="text-sm text-gray-600">AI analysis of your idea</p>
      </div>

      {/* Overall Score Circle */}
      <div className="flex flex-col items-center mb-8">
        <div className={`w-32 h-32 rounded-full border-8 ${circleColor} flex items-center justify-center bg-white shadow-lg`}>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-dark">{scores.average}</div>
            <div className="text-xl text-gray-600">/10</div>
          </div>
        </div>
        <div className={`mt-4 ${badgeBg} text-white px-5 py-2 rounded-full font-bold text-base`}>
          {isValidated ? 'Validated ✓' : 'Needs Revision'}
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Individual Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scoreDetails.map((detail) => (
          <div key={detail.id} className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{detail.icon}</span>
              <div>
                <h4 className="font-bold text-base text-primary-dark">{detail.label}</h4>
                <p className="text-xs text-gray-600 leading-tight">{detail.description}</p>
              </div>
            </div>

            <div className="text-3xl font-bold text-secondary-teal mb-2">
              {detail.score}<span className="text-xl text-gray-600">/10</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary-teal rounded-full transition-all duration-300"
                style={{ width: `${detail.score * 10}%` }}
              ></div>
            </div>

            <button
              onClick={() => setExpandedScore(expandedScore === detail.id ? null : detail.id)}
              className="text-xs text-secondary-teal font-medium hover:underline"
            >
              {expandedScore === detail.id ? 'Hide Details ▲' : 'View Details ▼'}
            </button>

            {expandedScore === detail.id && (
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {detail.feedback}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic flex items-start gap-2">
          <span>ℹ️</span>
          <span>
            Scores are calculated using AI analysis of market data, problem patterns, and existing solutions.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ValidationScorecard;
