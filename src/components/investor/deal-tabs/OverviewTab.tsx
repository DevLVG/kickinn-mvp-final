interface OverviewTabProps {
  deal: {
    problem_statement: string;
    solution_description: string;
    key_features: Array<{
      title: string;
      description: string;
    }>;
    mvp_demo_url: string;
    mvp_live_link: string;
    validation: {
      market_depth: number;
      problem_urgency: number;
      solution_uniqueness: number;
    };
    validation_score: number;
  };
}

const OverviewTab = ({ deal }: OverviewTabProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8.0) return '#10b981';
    if (score >= 7.0) return '#3b82f6';
    if (score >= 6.0) return '#f59e0b';
    return '#6b7280';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 9.0) return 'Excellent';
    if (score >= 8.0) return 'Very Good';
    if (score >= 7.0) return 'Good';
    return 'Fair';
  };

  return (
    <div className="space-y-8">
      {/* Problem Statement */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">The Problem</h2>
        <p className="text-base text-gray-700 leading-relaxed mb-6 max-w-3xl">
          {deal.problem_statement}
        </p>
      </section>

      {/* Solution */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Our Solution</h2>
        <p className="text-base text-gray-700 leading-relaxed mb-6 max-w-3xl">
          {deal.solution_description}
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {deal.key_features.map((feature, index) => (
            <div
              key={index}
              className="bg-accent-blue/5 border border-accent-blue/20 p-5 rounded-lg"
            >
              <div className="text-xl mb-2">✨</div>
              <h3 className="font-bold text-base text-primary-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MVP Demo */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">MVP Demonstration</h2>
        
        {deal.mvp_demo_url ? (
          <div className="bg-black aspect-video rounded-xl overflow-hidden mb-4">
            <video
              controls
              className="w-full h-full"
              poster="/api/placeholder/800/450"
            >
              <source src={deal.mvp_demo_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="bg-gray-100 aspect-video rounded-xl flex items-center justify-center mb-4">
            <p className="text-base text-gray-500">Demo video coming soon</p>
          </div>
        )}

        {deal.mvp_live_link && (
          <a
            href={deal.mvp_live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-blue/10 border border-accent-blue p-4 rounded-lg flex items-center justify-between hover:bg-accent-blue/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <span className="font-bold text-base text-accent-blue">Try Live MVP</span>
            </div>
            <span className="text-lg">→</span>
          </a>
        )}
      </section>

      {/* Validation Scorecard */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">AI Validation Breakdown</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div
            className="bg-white border-2 rounded-xl p-5 text-center"
            style={{ borderColor: getScoreColor(deal.validation.market_depth) }}
          >
            <div className="text-3xl mb-3">🎯</div>
            <p
              className="text-3xl font-bold mb-2"
              style={{ color: getScoreColor(deal.validation.market_depth) }}
            >
              {deal.validation.market_depth.toFixed(1)}/10
            </p>
            <p className="font-medium text-sm text-gray-600 mb-1">Market Depth</p>
            <p className="text-xs text-gray-500">Size and accessibility of target market</p>
          </div>

          <div
            className="bg-white border-2 rounded-xl p-5 text-center"
            style={{ borderColor: getScoreColor(deal.validation.problem_urgency) }}
          >
            <div className="text-3xl mb-3">⚡</div>
            <p
              className="text-3xl font-bold mb-2"
              style={{ color: getScoreColor(deal.validation.problem_urgency) }}
            >
              {deal.validation.problem_urgency.toFixed(1)}/10
            </p>
            <p className="font-medium text-sm text-gray-600 mb-1">Problem Urgency</p>
            <p className="text-xs text-gray-500">How pressing is this problem</p>
          </div>

          <div
            className="bg-white border-2 rounded-xl p-5 text-center"
            style={{ borderColor: getScoreColor(deal.validation.solution_uniqueness) }}
          >
            <div className="text-3xl mb-3">💎</div>
            <p
              className="text-3xl font-bold mb-2"
              style={{ color: getScoreColor(deal.validation.solution_uniqueness) }}
            >
              {deal.validation.solution_uniqueness.toFixed(1)}/10
            </p>
            <p className="font-medium text-sm text-gray-600 mb-1">Solution Uniqueness</p>
            <p className="text-xs text-gray-500">Differentiation from competitors</p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-secondary-teal/10 to-accent-blue/10 p-4 rounded-lg text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Overall Validation Score</p>
          <p className="text-4xl font-bold text-primary-dark mb-2">
            {deal.validation_score.toFixed(1)}/10
          </p>
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: getScoreColor(deal.validation_score) }}
          >
            {getScoreBadge(deal.validation_score)}
          </span>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
