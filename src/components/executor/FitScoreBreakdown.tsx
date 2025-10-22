interface FitComponent {
  score: number;
  weight: number;
  explanation: string;
}

interface FitScoreBreakdownProps {
  fitScore: number;
  breakdown: {
    skillsMatch: FitComponent;
    experienceLevel: FitComponent;
    successRate: FitComponent;
    deliverySpeed: FitComponent;
  };
}

const FitScoreBreakdown = ({ fitScore, breakdown }: FitScoreBreakdownProps) => {
  const components = [
    { key: 'skillsMatch', label: 'Skills Match', data: breakdown.skillsMatch },
    { key: 'experienceLevel', label: 'Experience Level', data: breakdown.experienceLevel },
    { key: 'successRate', label: 'Success Rate', data: breakdown.successRate },
    { key: 'deliverySpeed', label: 'Delivery Speed', data: breakdown.deliverySpeed },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-success to-success/80';
    if (score >= 75) return 'from-info to-info/80';
    if (score >= 60) return 'from-warning to-warning/80';
    return 'from-muted to-muted/80';
  };

  return (
    <div className="bg-gradient-to-br from-secondary-teal/10 to-accent-blue/10 border border-secondary-teal/30 rounded-2xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Your Fit Score Breakdown</h2>
        <p className="text-sm text-muted-foreground">Why this opportunity matches your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <div key={component.key} className="bg-white/80 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-sm text-foreground">{component.label}</span>
              <span className="text-xs text-muted-foreground">{component.data.weight}% weight</span>
            </div>

            {/* Score Bar */}
            <div className="mb-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(component.data.score)} transition-all duration-500`}
                  style={{ width: `${component.data.score}%` }}
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-bold text-primary-dark">{component.data.score}%</span>
            </div>

            <p className="text-sm text-muted-foreground">{component.data.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitScoreBreakdown;
