interface Venture {
  description: {
    problem: string;
    solution: string;
    target_market: string;
  };
  validation_score: {
    overall: number;
    market_viability: number;
    problem_clarity: number;
    solution_feasibility: number;
    business_model: number;
  };
  team: Array<{
    role: string;
    reputation_score: number;
    completed_projects: number;
    on_time_delivery: number;
  }>;
}

interface VentureOverviewTabProps {
  venture: Venture;
}

const VentureOverviewTab = ({ venture }: VentureOverviewTabProps) => {
  const getProgressColor = (score: number) => {
    if (score >= 8.5) return '#10b981';
    if (score >= 7.0) return '#3b82f6';
    if (score >= 6.0) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="space-y-6">
      {/* Venture Description */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <h2 className="text-xl font-bold text-[#194a61] mb-6">About This Venture</h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🎯</span>
              <h3 className="font-bold text-sm text-gray-700">Problem</h3>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed">{venture.description.problem}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">💡</span>
              <h3 className="font-bold text-sm text-gray-700">Solution</h3>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed">{venture.description.solution}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🎯</span>
              <h3 className="font-bold text-sm text-gray-700">Target Market</h3>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed">{venture.description.target_market}</p>
          </div>
        </div>
      </div>

      {/* Validation Score */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#194a61]">AI Validation Score</h2>
          <div
            className="px-4 py-2 rounded-full font-bold text-lg"
            style={{
              backgroundColor: `${getProgressColor(venture.validation_score.overall)}15`,
              color: getProgressColor(venture.validation_score.overall)
            }}
          >
            {venture.validation_score.overall.toFixed(1)}/10
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Market Viability', score: venture.validation_score.market_viability },
            { label: 'Problem Clarity', score: venture.validation_score.problem_clarity },
            { label: 'Solution Feasibility', score: venture.validation_score.solution_feasibility },
            { label: 'Business Model', score: venture.validation_score.business_model }
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-bold" style={{ color: getProgressColor(item.score) }}>
                  {item.score.toFixed(1)}/10
                </span>
              </div>
              <div className="h-2 bg-[rgba(103,159,131,0.1)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(item.score / 10) * 100}%`,
                    background: `linear-gradient(90deg, ${getProgressColor(item.score)}, ${getProgressColor(item.score)}CC)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Reputation */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <h2 className="text-xl font-bold text-[#194a61] mb-6">Team Reputation</h2>

        <div className="bg-[rgba(103,159,131,0.1)] border-l-4 border-[#679f83] p-4 rounded-r-lg mb-6">
          <p className="text-sm text-gray-700">
            For privacy protection, executor identities are anonymized. Reputation scores reflect past performance on Kick Inn platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venture.team.map((member, index) => (
            <div
              key={index}
              className="bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.15)] rounded-lg p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl" style={{ filter: 'grayscale(1)' }}>👤</span>
                <h3 className="font-bold text-[15px] text-[#194a61]">{member.role}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">★</span>
                  <span className="text-gray-700">{member.reputation_score.toFixed(1)}/10 Reputation</span>
                </div>
                <div className="text-xs text-gray-600">{member.completed_projects} projects completed</div>
                <div className="text-xs text-[#10b981]">{member.on_time_delivery}% on-time delivery</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VentureOverviewTab;
